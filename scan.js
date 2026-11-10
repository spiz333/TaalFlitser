'use strict';
/* =====================================================================
   scan.js: foto -> woordparen
   - preprocess(): schaduw/liniaal weg, zwart-wit (adaptieve drempel)
   - recognize(): Tesseract OCR in de browser (lokaal, geen server)
   - parse():     OCR-regels -> [{front, back, ...}] met slimme kolomherkenning
   parse() is pure (geen DOM) zodat het in Node te testen is.
   ===================================================================== */
(function (root) {
  const SEP_TOKENS = new Set(['-', '–', '—', '=', ':', '→', '->', '=>', '>', '|', '/', '~', '•', '·']);
  const median = a => { if (!a.length) return 0; const s = [...a].sort((x, y) => x - y); const m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
  const hasLetter = s => /\p{L}/u.test(s);

  /* ---------- preprocess ---------- */
  /** Zet een <img> om naar een zwart-wit canvas dat Tesseract goed kan lezen. */
  function preprocess(img) {
    const nw = img.naturalWidth || img.width, nh = img.naturalHeight || img.height;
    const s = Math.min(3, 2400 / Math.max(nw, nh));
    const w = Math.max(8, Math.round(nw * s)), h = Math.max(8, Math.round(nh * s));
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const ctx = c.getContext('2d', { willReadFrequently: true });
    ctx.imageSmoothingQuality = 'high';
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);
    const im = ctx.getImageData(0, 0, w, h), d = im.data;
    const n = w * h;
    // grijswaarden
    const g = new Uint8ClampedArray(n);
    for (let i = 0, p = 0; i < n; i++, p += 4) g[i] = (d[p] * 77 + d[p + 1] * 150 + d[p + 2] * 29) >> 8;
    // integraalbeeld voor lokaal gemiddelde (Bradley-Roth)
    const W1 = w + 1;
    const integ = new Float64Array(W1 * (h + 1));
    for (let y = 0; y < h; y++) {
      let row = 0;
      for (let x = 0; x < w; x++) { row += g[y * w + x]; integ[(y + 1) * W1 + x + 1] = integ[y * W1 + x + 1] + row; }
    }
    const r = Math.max(12, Math.round(Math.min(w, h) / 20));
    const T = 0.2; // pixel is inkt als hij >20% donkerder is dan zijn omgeving
    for (let y = 0; y < h; y++) {
      const y0 = Math.max(0, y - r), y1 = Math.min(h, y + r + 1);
      for (let x = 0; x < w; x++) {
        const x0 = Math.max(0, x - r), x1 = Math.min(w, x + r + 1);
        const sum = integ[y1 * W1 + x1] - integ[y0 * W1 + x1] - integ[y1 * W1 + x0] + integ[y0 * W1 + x0];
        const cnt = (x1 - x0) * (y1 - y0);
        const ink = g[y * w + x] * cnt < sum * (1 - T);
        const v = ink ? 0 : 255, p = (y * w + x) * 4;
        d[p] = d[p + 1] = d[p + 2] = v; d[p + 3] = 255;
      }
    }
    ctx.putImageData(im, 0, 0);
    return c;
  }

  /* ---------- OCR ---------- */
  const LANG_CODE = { nl: 'nld', en: 'eng', fr: 'fra', de: 'deu', es: 'spa' };
  let worker = null, workerKey = '', workerLoading = null;

  function loadScript(src) {
    return new Promise((res, rej) => {
      if (root.Tesseract) return res();
      const s = document.createElement('script');
      s.src = src; s.onload = () => res(); s.onerror = () => rej(new Error('scanner kon niet laden'));
      document.head.append(s);
    });
  }

  /** @param langs bv. ['nl','en']  @param onProgress ({status, progress}) */
  async function getWorker(langs, onProgress) {
    const key = langs.map(l => LANG_CODE[l]).filter(Boolean).sort().join('+') || 'nld+eng';
    if (worker && workerKey === key) return worker;
    if (workerLoading) await workerLoading.catch(() => { });
    if (worker) { await worker.terminate().catch(() => { }); worker = null; }
    const base = new URL('vendor/tesseract/', document.baseURI).href;
    await loadScript(base + 'tesseract.min.js');
    workerLoading = root.Tesseract.createWorker(key, 1, {
      workerPath: base + 'worker.min.js', corePath: base + 'core', langPath: base + 'lang', gzip: true,
      logger: m => { if (typeof onProgress === 'function') onProgress(m); },
    });
    try { worker = await workerLoading; } finally { workerLoading = null; }
    workerKey = key;
    await worker.setParameters({ tessedit_pageseg_mode: '6', preserve_interword_spaces: '1' });
    return worker;
  }
  async function cancel() { if (worker) { const w = worker; worker = null; workerKey = ''; await w.terminate().catch(() => { }); } }

  /** Geeft genormaliseerde regels (coordinaten 0..1) terug. */
  async function recognize(canvas, langs, onProgress) {
    const w = await getWorker(langs, onProgress);
    const { data } = await w.recognize(canvas);
    const W = canvas.width, H = canvas.height;
    const r4 = v => Math.round(v * 10000) / 10000;
    return (data.lines || []).map(l => ({
      words: l.words.map(x => ({ t: x.text, c: Math.round(x.confidence), x0: r4(x.bbox.x0 / W), x1: r4(x.bbox.x1 / W), y0: r4(x.bbox.y0 / H), y1: r4(x.bbox.y1 / H) })),
    }));
  }

  /* ---------- parse ---------- */
  function cleanText(s) {
    return s
      .replace(/^\s*(?:\d{1,3}\s*[.)]|[•·*▪◦●\-–—>])\s+/u, '')   // "1." "•" "-" aan het begin
      .replace(/^[|_~`^\[\]{}<>\\"'„“”‘’,;.:\s]+/u, '')
      .replace(/[|_~`^\[\]{}<>\\"'„“”‘’,;:\s]+$/u, '')
      .replace(/\s+/g, ' ').trim();
  }

  /** Verwijder ruis-woorden en bereken per regel een nette lijst. */
  function tidyLines(lines) {
    const out = [];
    for (const l of lines) {
      const words = l.words.filter(w => {
        const t = (w.t || '').trim();
        if (!t) return false;
        if (SEP_TOKENS.has(t)) return true;
        if (!/[\p{L}\p{N}]/u.test(t)) return false;           // alleen leestekens: ruis
        if (w.c < 40 && t.length <= 3) return false;          // korte, onzekere snippers
        if (w.c < 15) return false;
        return true;
      });
      const letters = words.filter(w => hasLetter(w.t));
      if (!letters.length) continue;
      const conf = letters.reduce((s, w) => s + w.c, 0) / letters.length;
      const nLetters = letters.reduce((s, w) => s + (w.t.match(/\p{L}/gu) || []).length, 0);
      if (nLetters < 2 || conf < 25) continue;
      out.push({ words, conf });
    }
    return out;
  }

  const lineBox = ws => {
    const x0 = Math.min(...ws.map(w => w.x0)), x1 = Math.max(...ws.map(w => w.x1));
    const y0 = Math.min(...ws.map(w => w.y0)), y1 = Math.max(...ws.map(w => w.y1));
    return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
  };
  const joinWords = ws => ws.map(w => w.t.trim()).join(' ');

  /** Splits een regel in [links, rechts] woorden, of null als er maar 1 cel is. */
  function splitByToken(words) {
    // 1. los scheidingsteken (" - ", " = ", " | ")
    const i = words.findIndex((w, k) => k > 0 && k < words.length - 1 && SEP_TOKENS.has(w.t.trim()));
    if (i > 0) return [words.slice(0, i), words.slice(i + 1)];
    // 2. vastgeplakt: "hond=dog", "hond:dog", "hond->dog", "hond–dog"
    for (let k = 0; k < words.length; k++) {
      const m = words[k].t.match(/^(.*?\p{L}.*?)(=>|->|=|→|:|–|—)(.*\p{L}.*)$/u);
      if (m) {
        const L = { ...words[k], t: m[1] }, R = { ...words[k], t: m[3] };
        const left = [...words.slice(0, k), L], right = [R, ...words.slice(k + 1)];
        return [left, right];
      }
    }
    return null;
  }

  /** Grootste gat tussen woorden, relatief aan lettergrootte. */
  function gapSplit(words) {
    if (words.length < 2) return null;
    const cw = median(words.map(w => (w.x1 - w.x0) / Math.max(1, w.t.length)));
    if (!cw) return null;
    const gaps = [];
    for (let k = 1; k < words.length; k++) gaps.push(words[k].x0 - words[k - 1].x1);
    let gi = 0; gaps.forEach((g, k) => { if (g > gaps[gi]) gi = k; });
    const g = gaps[gi];
    const others = gaps.filter((_, k) => k !== gi);
    if (g >= 2.2 * cw && (!others.length || g >= 1.8 * median(others))) return { at: gi + 1, gap: g, cw };
    return null;
  }

  /**
   * @param lines  genormaliseerde OCR-regels  [{words:[{t,c,x0,x1,y0,y1}]}]
   * @param layout 'side' (woord naast vertaling) | 'stack' (regel voor, regel achter)
   * @returns [{front, back, conf, box, low}]
   */
  function parse(lines, layout) {
    const ls = tidyLines(lines);
    if (layout === 'stack') {
      const rows = [];
      for (let i = 0; i < ls.length; i += 2) {
        const a = ls[i], b = ls[i + 1];
        const ws = [...a.words, ...(b ? b.words : [])];
        rows.push(mk(cleanText(joinWords(a.words)), b ? cleanText(joinWords(b.words)) : '', ((a.conf + (b ? b.conf : a.conf)) / 2), lineBox(ws)));
      }
      return rows.filter(r => r.front || r.back);
    }
    // eerst: zekere splitsingen
    const cand = ls.map(l => {
      const tok = splitByToken(l.words);
      if (tok) return { l, left: tok[0], right: tok[1], kind: 'tok' };
      const gs = gapSplit(l.words);
      if (gs) return { l, left: l.words.slice(0, gs.at), right: l.words.slice(gs.at), kind: 'gap', gs };
      return { l, left: l.words, right: null, kind: 'none' };
    });
    // kolomrand schatten uit zekere gat-splitsingen, om ook krappe regels goed te splitsen
    const starts = cand.filter(c => c.kind === 'gap').map(c => c.right[0].x0);
    if (starts.length >= 3) {
      const col = median(starts);
      for (const c of cand) {
        if (c.kind !== 'none' || c.l.words.length < 2) continue;
        const cw = median(c.l.words.map(w => (w.x1 - w.x0) / Math.max(1, w.t.length)));
        const k = c.l.words.findIndex((w, i) => i > 0 && Math.abs(w.x0 - col) <= 1.6 * cw);
        if (k > 0) { c.left = c.l.words.slice(0, k); c.right = c.l.words.slice(k); c.kind = 'col'; }
      }
    }
    return cand.map(c => mk(
      cleanText(joinWords(c.left)), c.right ? cleanText(joinWords(c.right)) : '',
      c.l.conf, lineBox([...c.left, ...(c.right || [])]))).filter(r => r.front || r.back);
  }
  function mk(front, back, conf, box) {
    const C = v => Math.max(0, Math.min(1, v));
    return { front, back, conf: Math.round(conf), box: { x: C(box.x), y: C(box.y), w: C(box.w), h: C(box.h) }, low: conf < 45 || !front || !back };
  }

  const api = { preprocess, recognize, parse, cancel, cleanText, LANG_CODE };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.Scan = api;
})(typeof window !== 'undefined' ? window : globalThis);
