'use strict';

/* =====================================================================
   TaalFlitser: foto van je woordenlijst -> flitskaarten.
   Het lezen (OCR) en alle data blijven lokaal in je browser.
   ===================================================================== */

/* ---------- teksten ---------- */
const STR = {
  nl: {
    heroA: 'Foto in.', heroB: 'Kaarten uit.',
    tagline: 'Maak een foto van je woordenlijst. TaalFlitser leest de woorden en maakt er flitskaarten van. Alles blijft op dit apparaat.',
    dropTitle: 'Foto van je woordenlijst', dropSub: 'Sleep, plak of tik om te kiezen. Meerdere foto’s mag.',
    langsLabel: 'Taal op het papier', myLists: 'Mijn lijsten', typeOwn: 'Zelf typen',
    words: '{0} woorden', words_1: '{0} woord', last: 'laatst {0}%',
    practice: 'Oefenen', back: '← Lijsten',
    scanning: 'Foto lezen', loadingScanner: 'Scanner laden…', loadingLang: 'Taal laden…', reading: 'Woorden lezen…', preparing: 'Foto voorbereiden…',
    cancel: 'Annuleren', photoOf: 'Foto {0} van {1}',
    nothingFound: 'Geen woorden gevonden. Typ ze zelf, of probeer een scherpere foto.',
    scanFailed: 'De scanner werkte niet. Je kunt de woorden zelf typen.',
    found: '{0} woordparen gevonden', found_1: '{0} woordpaar gevonden',
    listName: 'Lijst {0}',
    whatTitle: 'Wat flitsen?', whatOn: 'Aangevinkt ({0})', whatHard: 'Moeilijke ({0})', whatAll: 'Alles ({0})',
    orderTitle: 'Volgorde', orderShuffle: 'Door elkaar', orderKeep: 'In volgorde',
    dirTitle: 'Richting', dirFb: 'Voor → achter', dirBf: 'Achter → voor', dirMix: 'Door elkaar',
    repeat: 'Fouten herhalen', strict: 'Streng nakijken',
    start: 'Start ({0})', nothing: 'Geen woorden om te flitsen. Vink er een paar aan.',
    selectAll: 'Alles', front: 'Voorkant', backSide: 'Achterkant', swap: 'Wissel kanten', addWord: '+ Woord toevoegen',
    addPhoto: '+ Foto toevoegen', delList: 'Lijst verwijderen', rename: 'Hernoemen', listName2: 'Naam van lijst',
    save: 'Opslaan', del: 'Verwijderen', remove: 'Verwijder', unsure: 'Niet zeker gelezen, controleer dit woord',
    wrongRead: 'Klopt het niet? Lees opnieuw', layout: 'Indeling', layoutSide: 'Naast elkaar (hond – dog)', layoutStack: 'Onder elkaar (regel 1 = woord, regel 2 = vertaling)',
    reread: 'Opnieuw lezen', rereadWarn: 'Dit vervangt de herkende woorden door een nieuwe lezing. Zelf getypte woorden blijven staan.',
    confirmDelList: 'Deze lijst verwijderen?', ok: 'OK',
    typeHere: 'Typ het antwoord', check: 'Controleer', dontKnow: 'Weet ik niet', next: 'Volgende →', stillRight: 'Toch goed',
    right: 'Goed', almost: 'Bijna', wrong: 'Fout', youTyped: 'Jij typte', mindSpelling: 'Let op de spelling',
    done: 'Klaar.', score: 'Goed in één keer', accuracy: 'Score', time: 'Tijd', missed: 'Om te herhalen',
    retryMissed: 'Fouten opnieuw', again: 'Alles opnieuw', toList: 'Naar lijst',
    keys: 'Enter = controleer / volgende · Esc = stoppen',
    export: 'Exporteren', import: 'Importeren', exported: 'Geëxporteerd', imported: '{0} lijsten geïmporteerd', importFail: 'Dat bestand kon niet worden geïmporteerd',
    local: 'Alles blijft op dit apparaat', noImages: 'Geen foto gevonden',
    close: 'Sluiten', emptyList: 'Nog geen woorden. Voeg er een toe of voeg een foto toe.',
    ocrNote: 'Getypte of nette handgeschreven woorden lezen het best. Controleer het resultaat altijd even.',
  },
  en: {
    heroA: 'Photo in.', heroB: 'Cards out.',
    tagline: 'Take a photo of your word list. TaalFlitser reads the words and turns them into flashcards. Everything stays on this device.',
    dropTitle: 'Photo of your word list', dropSub: 'Drop, paste or tap to choose. Several photos are fine.',
    langsLabel: 'Language on the paper', myLists: 'My lists', typeOwn: 'Type it myself',
    words: '{0} words', words_1: '{0} word', last: 'last {0}%',
    practice: 'Practise', back: '← Lists',
    scanning: 'Reading photo', loadingScanner: 'Loading scanner…', loadingLang: 'Loading language…', reading: 'Reading words…', preparing: 'Preparing photo…',
    cancel: 'Cancel', photoOf: 'Photo {0} of {1}',
    nothingFound: 'No words found. Type them yourself, or try a sharper photo.',
    scanFailed: 'The scanner did not work. You can type the words yourself.',
    found: '{0} word pairs found', found_1: '{0} word pair found',
    listName: 'List {0}',
    whatTitle: 'What to flash?', whatOn: 'Ticked ({0})', whatHard: 'Difficult ({0})', whatAll: 'Everything ({0})',
    orderTitle: 'Order', orderShuffle: 'Shuffled', orderKeep: 'In order',
    dirTitle: 'Direction', dirFb: 'Front → back', dirBf: 'Back → front', dirMix: 'Mixed',
    repeat: 'Repeat mistakes', strict: 'Strict marking',
    start: 'Start ({0})', nothing: 'No words to flash. Tick a few.',
    selectAll: 'All', front: 'Front', backSide: 'Back', swap: 'Swap sides', addWord: '+ Add word',
    addPhoto: '+ Add photo', delList: 'Delete list', rename: 'Rename', listName2: 'List name',
    save: 'Save', del: 'Delete', remove: 'Remove', unsure: 'Not sure this was read right, please check',
    wrongRead: 'Not right? Read again', layout: 'Layout', layoutSide: 'Side by side (dog – hond)', layoutStack: 'Stacked (line 1 = word, line 2 = translation)',
    reread: 'Read again', rereadWarn: 'This replaces the recognised words with a fresh reading. Words you typed yourself stay.',
    confirmDelList: 'Delete this list?', ok: 'OK',
    typeHere: 'Type the answer', check: 'Check', dontKnow: 'I don’t know', next: 'Next →', stillRight: 'I was right',
    right: 'Correct', almost: 'Almost', wrong: 'Wrong', youTyped: 'You typed', mindSpelling: 'Mind the spelling',
    done: 'Done.', score: 'Right first time', accuracy: 'Score', time: 'Time', missed: 'To repeat',
    retryMissed: 'Retry mistakes', again: 'Everything again', toList: 'To list',
    keys: 'Enter = check / next · Esc = leave',
    export: 'Export', import: 'Import', exported: 'Exported', imported: 'Imported {0} lists', importFail: 'That file could not be imported',
    local: 'Everything stays on this device', noImages: 'No picture found',
    close: 'Close', emptyList: 'No words yet. Add one, or add a photo.',
    ocrNote: 'Printed or neat handwritten words read best. Always check the result.',
  },
};
let lang = (() => { try { const s = localStorage.getItem('tf-lang'); if (s === 'en' || s === 'nl') return s; } catch (e) { /* ignore */ } return 'nl'; })();
function t(key, ...args) {
  let s = (STR[lang] && STR[lang][key]) ?? STR.nl[key] ?? key;
  args.forEach((v, i) => { s = s.split('{' + i + '}').join(v); });
  return s;
}
const tn = (key, n) => t(n === 1 && (key + '_1') in STR.nl ? key + '_1' : key, n);

/* ---------- helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const app = $('#app');
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const uid = () => (globalThis.crypto && crypto.randomUUID) ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
const LANGS = [['nl', 'NL', 'Nederlands'], ['en', 'EN', 'English'], ['fr', 'FR', 'Français'], ['de', 'DE', 'Deutsch'], ['es', 'ES', 'Español']];
const OPTS_DEFAULT = { what: 'on', order: 'shuffle', dir: 'fb', strict: false, repeat: true };
const go = hash => { if (location.hash === hash) route(); else location.hash = hash; };

function h(tag, props, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(props || {})) {
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k === 'style') {
      if (typeof v === 'string') el.style.cssText = v;
      else for (const [s, x] of Object.entries(v)) s.startsWith('--') ? el.style.setProperty(s, x) : (el.style[s] = x);
    }
    else if (k === 'dataset') Object.assign(el.dataset, v);
    else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else if (k === 'value' || k === 'checked' || k === 'disabled' || k === 'src') el[k] = v;
    else el.setAttribute(k, v === true ? '' : v);
  }
  for (const kid of kids.flat(Infinity)) if (kid != null && kid !== false) el.append(kid instanceof Node ? kid : String(kid));
  return el;
}
let toastTimer;
function toast(msg) {
  const el = $('#toast'); el.textContent = msg; el.classList.add('on');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('on'), 2600);
}
function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
const fmtDate = d => d.toLocaleDateString(lang === 'nl' ? 'nl-NL' : 'en-GB', { day: 'numeric', month: 'short' });

const settings = (() => {
  let s = { langs: ['nl', 'en'] };
  try { s = { ...s, ...JSON.parse(localStorage.getItem('tf-settings') || '{}') }; } catch (e) { /* ignore */ }
  if (!Array.isArray(s.langs) || !s.langs.length) s.langs = ['nl', 'en'];
  return s;
})();
const saveSettings = () => { try { localStorage.setItem('tf-settings', JSON.stringify(settings)); } catch (e) { /* ignore */ } };

/* ---------- IndexedDB ---------- */
let db;
function openDB() {
  return new Promise((res, rej) => {
    const r = indexedDB.open('taalflitser-woorden', 1);
    r.onupgradeneeded = () => { const d = r.result; d.createObjectStore('lists', { keyPath: 'id' }); d.createObjectStore('images', { keyPath: 'id' }); };
    r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
  });
}
const req = r => new Promise((res, rej) => { r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
const os = (n, m = 'readonly') => db.transaction(n, m).objectStore(n);
const dbAll = n => req(os(n).getAll());
const dbGet = (n, k) => req(os(n).get(k));
const dbPut = (n, v) => req(os(n, 'readwrite').put(v));
function batch(names, fn) {
  return new Promise((res, rej) => {
    const tx = db.transaction(names, 'readwrite'); fn(...names.map(n => tx.objectStore(n)));
    tx.oncomplete = () => res(); tx.onerror = tx.onabort = () => rej(tx.error);
  });
}
const saveList = l => { l.updated = Date.now(); return dbPut('lists', l); };
const timers = new Map();
function saveSoon(list) { clearTimeout(timers.get(list.id)); timers.set(list.id, setTimeout(() => { timers.delete(list.id); saveList(list).catch(console.error); }, 350)); }
function flushSave(list) { if (list && timers.has(list.id)) { clearTimeout(timers.get(list.id)); timers.delete(list.id); return saveList(list); } return Promise.resolve(); }

const urlCache = new Map();
async function imgURL(id) {
  if (urlCache.has(id)) return urlCache.get(id);
  const rec = await dbGet('images', id); if (!rec) return '';
  const u = URL.createObjectURL(rec.blob); urlCache.set(id, u); return u;
}

/* ---------- lijsten & woorden ---------- */
const newList = name => ({ id: uid(), name, created: Date.now(), updated: Date.now(), words: [], images: [], raw: [], layout: 'side', langs: [...settings.langs], opts: { ...OPTS_DEFAULT }, last: null });
const newWord = (front = '', back = '', extra = {}) => ({ id: uid(), front, back, on: true, ok: 0, bad: 0, lastBad: false, low: false, ...extra });
const flashable = w => !!(w.front.trim() && w.back.trim());
const isHard = w => w.lastBad || w.bad > w.ok;
function pick(list) {
  const fl = list.words.filter(flashable);
  const o = (list.opts && list.opts.what) || 'on';
  return o === 'all' ? fl : o === 'hard' ? fl.filter(isHard) : fl.filter(w => w.on);
}
function wordsFromRaw(list) {
  const out = [];
  for (const r of list.raw) for (const p of Scan.parse(r.lines, list.layout)) out.push(newWord(p.front, p.back, { on: !p.low, low: p.low, img: r.img, box: p.box }));
  return out;
}

/* ---------- nakijken ---------- */
const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^\p{L}\p{N}\s]/gu, '').replace(/\s+/g, ' ').trim();
function lev(a, b) {
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[b.length];
}
const ARTICLE = /^(de|het|een|the|a|an|to|le|la|les|l|un|une|der|die|das|ein|eine|el|los|las|una|il|lo)\s+/;
const stripArticle = s => s.replace(ARTICLE, '');
/** Meerdere goede antwoorden: "hond / pup", "kat; poes". Tekst tussen haakjes is optioneel. */
function variants(answer) {
  const out = new Set();
  for (const part of answer.split(/[\/;|]|,(?![^(]*\))/)) {
    const p = part.trim(); if (!p) continue;
    out.add(norm(p)); out.add(norm(p.replace(/\([^)]*\)/g, ' '))); out.add(norm(p.replace(/[()]/g, ' ')));
  }
  out.delete(''); return [...out];
}
/** 'ok' | 'almost' (typfout of lidwoord vergeten) | 'wrong' */
function checkAnswer(input, answer) {
  const x = norm(input); if (!x) return 'wrong';
  let best = 'wrong';
  for (const v of variants(answer)) {
    if (v === x) return 'ok';
    if (stripArticle(v) === x || stripArticle(x) === v) best = 'almost';
    const tol = v.length >= 9 ? 2 : v.length >= 5 ? 1 : 0;
    if (tol && lev(v, x) <= tol) best = 'almost';
  }
  return best;
}

/* ---------- dialogen ---------- */
function dlg(title, body, actions) {
  const d = h('dialog', { 'aria-label': title }, h('div', { class: 'dlg-h' }, title), body ? h('div', { class: 'dlg-b' }, body) : null, h('div', { class: 'dlg-f' }, actions));
  d.addEventListener('close', () => d.remove());
  document.body.append(d); d.showModal(); return d;
}
function askText(title, value = '') {
  return new Promise(res => {
    let out = null;
    const inp = h('input', { type: 'text', value, maxlength: '80', 'aria-label': title });
    const d = dlg(title, inp, [
      h('button', { type: 'button', onclick: () => d.close() }, t('cancel')),
      h('button', { type: 'button', class: 'solid', onclick: () => { out = inp.value.trim(); d.close(); } }, t('save'))]);
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') { out = inp.value.trim(); d.close(); } });
    d.addEventListener('close', () => res(out || null));
    inp.focus(); inp.select();
  });
}
function confirmDlg(msg, okLabel = t('ok')) {
  return new Promise(res => {
    let yes = false;
    const d = dlg(msg, null, [
      h('button', { type: 'button', onclick: () => d.close() }, t('cancel')),
      h('button', { type: 'button', class: 'solid', onclick: () => { yes = true; d.close(); } }, okLabel)]);
    d.addEventListener('close', () => res(yes));
  });
}

/* ---------- router ---------- */
let current = { view: 'home', id: null };
async function route() {
  stopPlay();
  const [path, query] = location.hash.slice(1).split('?');
  const [, view, id] = path.split('/');
  current = { view: view || 'home', id: id || null };
  window.scrollTo(0, 0);
  try {
    if (scanning) { current = { view: 'scan', id: null }; renderScanning(); }
    else if (view === 'list' && id) await renderList(id);
    else if (view === 'play' && id) await renderPlay(id, new URLSearchParams(query || '').has('retry'));
    else { current = { view: 'home', id: null }; await renderHome(); }
  } catch (err) {
    console.error(err);
    app.replaceChildren(h('p', { class: 'empty' }, String(err.message || err)));
  }
  document.documentElement.lang = lang;
  $('#btn-lang').textContent = lang.toUpperCase();
}

/* ---------- scannen ---------- */
let scanning = null; // {text, p, index, count, cancelled}
function renderScanning() {
  const s = scanning; if (!s) return;
  app.replaceChildren(
    h('div', { class: 'scan' },
      h('p', { class: 'mono mute' }, s.count > 1 ? t('photoOf', s.index + 1, s.count) : t('scanning')),
      h('h1', {}, s.text),
      h('div', { class: 'prog big', role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': '100', 'aria-valuenow': String(Math.round(s.p * 100)) }, h('i', { style: { width: (s.p * 100) + '%' } })),
      h('button', { type: 'button', onclick: cancelScan }, t('cancel'))));
}
function setScan(patch) { if (!scanning) return; Object.assign(scanning, patch); if (current.view === 'scan') renderScanning(); }
function startScanView(me) { scanning = me; current = { view: 'scan', id: null }; if (location.hash !== '#/') location.hash = '#/'; else renderScanning(); }
function cancelScan() { if (!scanning) return; scanning.cancelled = true; scanning = null; Scan.cancel(); go('#/'); }

function loadImage(blob) {
  return new Promise((res, rej) => {
    const url = URL.createObjectURL(blob), im = new Image();
    im.onload = () => { URL.revokeObjectURL(url); res(im); };
    im.onerror = () => { URL.revokeObjectURL(url); rej(new Error('bad image')); };
    im.src = url;
  });
}
/** Verkleinde JPEG om te bewaren en te tonen. */
async function makePreview(im) {
  const s = Math.min(1, 1600 / Math.max(im.naturalWidth, im.naturalHeight));
  const w = Math.max(1, Math.round(im.naturalWidth * s)), hh = Math.max(1, Math.round(im.naturalHeight * s));
  const c = document.createElement('canvas'); c.width = w; c.height = hh;
  const ctx = c.getContext('2d'); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, hh); ctx.drawImage(im, 0, 0, w, hh);
  const blob = await new Promise(r => c.toBlob(r, 'image/jpeg', 0.85));
  return { blob, w, h: hh };
}
/** OCR met voortgangsbalk. Geeft [] terug als de scanner niet kan starten. */
async function readLines(im, langs, base, span) {
  setScan({ text: t('preparing'), p: base });
  await new Promise(r => setTimeout(r, 30));
  const canvas = Scan.preprocess(im);
  try {
    return await Scan.recognize(canvas, langs, m => {
      if (!scanning) return;
      const st = m.status || '', pr = m.progress || 0;
      if (st.includes('recognizing')) setScan({ text: t('reading'), p: base + span * (0.25 + 0.75 * pr) });
      else if (st.includes('language')) setScan({ text: t('loadingLang'), p: base + span * (0.05 + 0.15 * pr) });
      else setScan({ text: t('loadingScanner'), p: base + span * 0.05 * pr });
    });
  } catch (e) { console.error(e); toast(t('scanFailed')); return []; }
}

/** Foto('s') inlezen. list = bestaande lijst of null voor een nieuwe. */
async function scanFiles(files, list) {
  files = files.filter(f => f.type.startsWith('image/'));
  if (!files.length) { toast(t('noImages')); return; }
  if (scanning) return;
  const me = { text: t('preparing'), p: 0, index: 0, count: files.length, cancelled: false };
  if (!list) list = newList(t('listName', fmtDate(new Date())));
  startScanView(me);
  let found = 0;
  try {
    for (let i = 0; i < files.length; i++) {
      me.index = i;
      const im = await loadImage(files[i]).catch(() => null);
      if (!im) continue;
      const prev = await makePreview(im);
      const lines = await readLines(im, list.langs, i / files.length, 1 / files.length);
      if (me.cancelled) return;
      const imageId = uid(), idx = list.images.length;
      list.images.push({ id: imageId, w: prev.w, h: prev.h });
      await dbPut('images', { id: imageId, blob: prev.blob });
      list.raw.push({ img: idx, lines });
      const words = Scan.parse(lines, list.layout).map(p => newWord(p.front, p.back, { on: !p.low, low: p.low, img: idx, box: p.box }));
      list.words.push(...words); found += words.length;
    }
  } finally { if (scanning === me) scanning = null; }
  if (me.cancelled) return;
  await saveList(list);
  toast(found ? tn('found', found) : t('nothingFound'));
  go('#/list/' + list.id);
}
/** Dezelfde foto's opnieuw lezen (andere taal of indeling). */
async function rereadList(list) {
  const me = { text: t('preparing'), p: 0, index: 0, count: list.images.length, cancelled: false };
  startScanView(me);
  try {
    const raws = [];
    for (let i = 0; i < list.images.length; i++) {
      me.index = i;
      const rec = await dbGet('images', list.images[i].id);
      const im = await loadImage(rec.blob);
      const lines = await readLines(im, list.langs, i / list.images.length, 1 / list.images.length);
      if (me.cancelled) return;
      raws.push({ img: i, lines });
    }
    list.raw = raws;
  } finally { if (scanning === me) scanning = null; }
  list.words = [...wordsFromRaw(list), ...list.words.filter(w => w.img == null)];
  await saveList(list);
  go('#/list/' + list.id);
}

/* ---------- home ---------- */
function langChips(selected, onToggle) {
  return h('div', { class: 'chips', role: 'group', 'aria-label': t('langsLabel') },
    h('span', { class: 'mono mute' }, t('langsLabel')),
    ...LANGS.map(([code, short, name]) => {
      const b = h('button', { type: 'button', class: 'chip', title: name, 'aria-pressed': String(selected.has(code)) }, short);
      b.addEventListener('click', () => {
        const on = selected.has(code);
        if (on && selected.size === 1) return;
        on ? selected.delete(code) : selected.add(code);
        b.setAttribute('aria-pressed', String(!on)); onToggle && onToggle();
      });
      return b;
    }));
}

async function renderHome() {
  const lists = (await dbAll('lists')).sort((a, b) => (b.updated || 0) - (a.updated || 0));
  const fileIn = $('#file-in');
  fileIn.onchange = () => { const fs = [...fileIn.files]; fileIn.value = ''; scanFiles(fs, null); };
  const drop = h('div', { class: 'drop', tabindex: '0', role: 'button', 'aria-label': t('dropTitle') },
    h('big', {}, '+'), h('strong', {}, t('dropTitle')), h('span', { class: 'sub' }, t('dropSub')));
  drop.addEventListener('click', () => fileIn.click());
  drop.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileIn.click(); } });
  ['dragenter', 'dragover'].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.add('over'); }));
  ['dragleave', 'drop'].forEach(ev => drop.addEventListener(ev, () => drop.classList.remove('over')));

  const imp = $('#import-in');
  imp.onchange = async () => { const f = imp.files[0]; imp.value = ''; if (f) await importAll(f); };

  const sel = new Set(settings.langs);
  const rows = lists.map(l => {
    const n = l.words.filter(flashable).length;
    return h('div', { class: 'row' },
      h('div', {},
        h('a', { class: 'name', href: '#/list/' + l.id }, l.name),
        h('div', { class: 'mono mute' }, [tn('words', n), l.last ? t('last', l.last.pct) : null].filter(Boolean).join(' · '))),
      h('div', { class: 'actions' },
        h('button', { type: 'button', class: 'solid', disabled: !pick(l).length, onclick: () => { location.hash = '#/play/' + l.id; } }, t('practice'))));
  });

  app.replaceChildren(
    h('section', { class: 'hero' }, h('h1', {}, t('heroA'), h('br'), t('heroB')), h('p', { class: 'mute' }, t('tagline'))),
    drop,
    langChips(sel, () => { settings.langs = [...sel]; saveSettings(); }),
    h('p', { class: 'note mono mute' }, t('ocrNote')),
    ...(lists.length ? [h('h2', { class: 'sec mono' }, t('myLists'))] : []),
    ...rows,
    h('div', { class: 'foot' },
      h('span', { class: 'mono mute' }, t('local')),
      h('button', { type: 'button', onclick: async () => { const l = newList(t('listName', fmtDate(new Date()))); l.words.push(newWord(), newWord(), newWord()); await saveList(l); location.hash = '#/list/' + l.id; } }, t('typeOwn')),
      lists.length ? h('button', { type: 'button', onclick: exportAll }, t('export')) : null,
      h('button', { type: 'button', onclick: () => imp.click() }, t('import'))));
}

/* ---------- lijstpagina ---------- */
async function renderList(id) {
  const list = await dbGet('lists', id);
  if (!list) { location.hash = '#/'; return; }
  const opts = list.opts = { ...OPTS_DEFAULT, ...list.opts };
  const fileIn = $('#file-in');
  fileIn.onchange = () => { const fs = [...fileIn.files]; fileIn.value = ''; flushSave(list).then(() => scanFiles(fs, list)); };

  /* foto */
  let photoIdx = 0;
  const photoImg = h('img', { alt: '', draggable: 'false' });
  const hl = h('span', { class: 'hl', hidden: true });
  const stage = h('span', { class: 'stage' }, photoImg, hl);
  const tabs = h('div', { class: 'tabs' });
  const photo = list.images.length ? h('aside', { class: 'photo' }, tabs, stage) : null;
  const showPhoto = async i => {
    photoIdx = clamp(i, 0, list.images.length - 1);
    const im = list.images[photoIdx]; if (!im) return;
    stage.style.setProperty('--r', im.w / im.h);
    photoImg.src = await imgURL(im.id);
    hl.hidden = true;
    tabs.replaceChildren(...(list.images.length > 1 ? list.images.map((_, k) => h('button', { type: 'button', class: 'ghost' + (k === photoIdx ? ' on' : ''), onclick: () => showPhoto(k) }, k + 1)) : []));
  };
  const highlight = w => {
    if (!w || !w.box || w.img == null || !list.images[w.img]) { hl.hidden = true; return; }
    if (w.img !== photoIdx) showPhoto(w.img);
    const b = w.box, pad = 0.004;
    Object.assign(hl.style, { left: (clamp(b.x - pad, 0, 1) * 100) + '%', top: (clamp(b.y - pad, 0, 1) * 100) + '%', width: (clamp(b.w + 2 * pad, 0, 1) * 100) + '%', height: (clamp(b.h + 2 * pad, 0, 1) * 100) + '%' });
    hl.hidden = false;
  };

  /* teller / meta */
  const meta = h('div', { class: 'mono mute', style: 'margin-top:10px' });
  const lblOn = h('span'), lblHard = h('span'), lblAll = h('span');
  const startBtn = h('button', { type: 'button', class: 'solid big', id: 'start' });
  const selAll = h('input', { type: 'checkbox', 'aria-label': t('selectAll') });
  const update = () => {
    const fl = list.words.filter(flashable);
    const nOn = fl.filter(w => w.on).length, nHard = fl.filter(isHard).length;
    meta.textContent = tn('words', fl.length) + (list.last ? ' · ' + t('last', list.last.pct) : '');
    lblOn.textContent = t('whatOn', nOn); lblHard.textContent = t('whatHard', nHard); lblAll.textContent = t('whatAll', fl.length);
    const n = pick(list).length;
    startBtn.textContent = t('start', n); startBtn.disabled = !n;
    selAll.checked = fl.length > 0 && nOn === fl.length;
    selAll.indeterminate = nOn > 0 && nOn < fl.length;
  };
  startBtn.addEventListener('click', async () => { await flushSave(list); location.hash = '#/play/' + list.id; });
  selAll.addEventListener('change', () => { list.words.forEach(w => { if (flashable(w)) w.on = selAll.checked; }); saveSoon(list); drawRows(); });

  /* oefen-opties */
  const seg = (title, key, choices) => h('fieldset', { class: 'seg' }, h('legend', {}, title),
    choices.map(([v, label]) => h('label', {},
      h('input', { type: 'radio', name: 'o-' + key, value: v, checked: opts[key] === v, onchange: () => { opts[key] = v; saveSoon(list); update(); } }),
      h('span', {}, label))));
  const tog = (key, label) => h('label', { class: 'chk' }, h('input', { type: 'checkbox', checked: opts[key], onchange: e => { opts[key] = e.target.checked; saveSoon(list); } }), label);
  const panel = h('section', { class: 'panel' },
    h('div', { class: 'opts' },
      seg(t('whatTitle'), 'what', [['on', lblOn], ['hard', lblHard], ['all', lblAll]]),
      seg(t('orderTitle'), 'order', [['shuffle', t('orderShuffle')], ['order', t('orderKeep')]]),
      seg(t('dirTitle'), 'dir', [['fb', t('dirFb')], ['bf', t('dirBf')], ['mix', t('dirMix')]])),
    h('div', { class: 'panel-f' }, tog('repeat', t('repeat')), tog('strict', t('strict')), h('span', { class: 'grow' }), startBtn));

  /* woordrijen */
  const rowsBox = h('div', { class: 'wrows' });
  const stat = w => (w.ok || w.bad) ? '✓' + w.ok + ' ✗' + w.bad : '';
  const rowEl = w => {
    const front = h('input', { type: 'text', value: w.front, 'aria-label': t('front'), maxlength: '200', autocomplete: 'off', spellcheck: 'false' });
    const back = h('input', { type: 'text', value: w.back, 'aria-label': t('backSide'), maxlength: '200', autocomplete: 'off', spellcheck: 'false' });
    const on = h('input', { type: 'checkbox', checked: w.on, 'aria-label': t('selectAll') });
    const row = h('div', { class: 'wrow' + (w.low ? ' low' : '') + (flashable(w) ? '' : ' incomplete'), title: w.low ? t('unsure') : null },
      h('label', { class: 'chk box' }, on),
      front, back, h('span', { class: 'st mono' }, stat(w)),
      h('button', { type: 'button', class: 'ghost x', 'aria-label': t('remove'), onclick: () => { list.words.splice(list.words.indexOf(w), 1); saveSoon(list); drawRows(); } }, '×'));
    const edited = () => { row.classList.toggle('incomplete', !flashable(w)); update(); saveSoon(list); };
    on.addEventListener('change', () => { w.on = on.checked; update(); saveSoon(list); });
    front.addEventListener('input', () => { w.front = front.value; edited(); });
    back.addEventListener('input', () => { w.back = back.value; edited(); });
    front.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); back.focus(); } });
    back.addEventListener('keydown', e => {
      if (e.key !== 'Enter') return; e.preventDefault();
      const nxt = row.nextElementSibling;
      if (nxt) nxt.querySelector('input[type=text]').focus();
      else { list.words.push(newWord()); saveSoon(list); drawRows(true); }
    });
    row.addEventListener('focusin', () => highlight(w));
    row.addEventListener('mouseenter', () => highlight(w));
    return row;
  };
  function drawRows(focusLast) {
    rowsBox.replaceChildren(...(list.words.length ? list.words.map(rowEl) : [h('p', { class: 'mute empty' }, t('emptyList'))]));
    update();
    if (focusLast) { const i = rowsBox.querySelector('.wrow:last-child input[type=text]'); if (i) i.focus(); }
  }

  /* verkeerd gelezen */
  const langSel = new Set(list.langs);
  const reread = h('details', { class: 'reread' },
    h('summary', { class: 'mono' }, t('wrongRead')),
    h('div', { class: 'reread-b' },
      h('fieldset', { class: 'seg' }, h('legend', {}, t('layout')),
        [['side', t('layoutSide')], ['stack', t('layoutStack')]].map(([v, label]) => h('label', {},
          h('input', { type: 'radio', name: 'layout', value: v, checked: list.layout === v, onchange: () => { list.layout = v; } }), h('span', {}, label)))),
      langChips(langSel),
      h('button', { type: 'button', id: 'reread', onclick: async () => {
        if (!await confirmDlg(t('rereadWarn'))) return;
        list.langs = [...langSel];
        timers.delete(list.id);
        if (list.images.length) await rereadList(list);
      } }, t('reread'))));

  app.replaceChildren(
    h('a', { class: 'crumb', href: '#/' }, t('back')),
    h('div', { class: 'deckhead' },
      h('div', {}, h('h1', {}, list.name), meta),
      h('div', { class: 'btns' },
        h('button', { type: 'button', class: 'ghost', onclick: async () => { const n = await askText(t('listName2'), list.name); if (n) { list.name = n; await saveList(list); renderList(id); } } }, t('rename')))),
    panel,
    h('div', { class: 'editor' + (photo ? ' with-photo' : '') },
      photo,
      h('div', { class: 'words' },
        h('div', { class: 'whead mono' },
          h('label', { class: 'chk box' }, selAll), h('span', {}, t('front')), h('span', {}, t('backSide')),
          h('span', { class: 'grow' }),
          h('button', { type: 'button', class: 'ghost', onclick: () => { list.words.forEach(w => { [w.front, w.back] = [w.back, w.front]; }); saveSoon(list); drawRows(); } }, t('swap'))),
        rowsBox,
        h('div', { class: 'wfoot' },
          h('button', { type: 'button', class: 'ghost', onclick: () => { list.words.push(newWord()); saveSoon(list); drawRows(true); } }, t('addWord')),
          h('button', { type: 'button', class: 'ghost', onclick: () => fileIn.click() }, t('addPhoto'))),
        list.raw.length ? reread : null)),
    h('div', { class: 'foot' },
      h('span', { class: 'mono mute' }, t('local')),
      h('button', { type: 'button', onclick: async () => {
        if (!await confirmDlg(t('confirmDelList'), t('del'))) return;
        clearTimeout(timers.get(list.id)); timers.delete(list.id);
        await batch(['lists', 'images'], (ls, im) => { ls.delete(list.id); list.images.forEach(x => im.delete(x.id)); });
        list.images.forEach(x => { const u = urlCache.get(x.id); if (u) { URL.revokeObjectURL(u); urlCache.delete(x.id); } });
        location.hash = '#/';
      } }, t('delList'))));
  drawRows();
  if (list.images.length) showPhoto(0);
}

/* ---------- flitsen ---------- */
let play = null, lastMissed = null;
function stopPlay() { if (play) document.removeEventListener('keydown', onPlayKey); play = null; }
async function renderPlay(id, retry) {
  const list = await dbGet('lists', id);
  if (!list) { location.hash = '#/'; return; }
  const opts = { ...OPTS_DEFAULT, ...list.opts };
  const words = (retry && lastMissed) ? list.words.filter(w => lastMissed.has(w.id) && flashable(w)) : pick(list);
  if (!words.length) { toast(t('nothing')); location.hash = '#/list/' + id; return; }
  const items = words.map(w => ({ w, rev: opts.dir === 'bf' ? true : opts.dir === 'mix' ? Math.random() < 0.5 : false }));
  if (opts.order === 'shuffle') shuffle(items);
  play = { list, opts, queue: items, total: items.length, done: 0, first: new Map(), phase: 'ask', typed: '', verdict: null, started: Date.now(), retry: !!retry };
  document.addEventListener('keydown', onPlayKey);
  drawPlay();
}
function leavePlay() { const l = play && play.list; flushSave(l); location.hash = l ? '#/list/' + l.id : '#/'; }

function drawPlay() {
  const p = play; if (!p) return;
  if (!p.queue.length) return drawSummary();
  const it = p.queue[0];
  const prompt = it.rev ? it.w.back : it.w.front;
  const answer = it.rev ? it.w.front : it.w.back;
  let inp = null;
  const face = h('div', { class: 'face q' }, h('p', { class: 'qword' }, prompt));

  if (p.phase === 'ask') {
    inp = h('input', { type: 'text', placeholder: t('typeHere'), 'aria-label': t('typeHere'), value: p.typed, autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false', enterkeyhint: 'done' });
    inp.addEventListener('input', () => { p.typed = inp.value; });
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); if (!e.isComposing) checkNow(); } });
    face.append(h('div', { class: 'typein' }, inp),
      h('div', { class: 'btns' }, h('button', { type: 'button', class: 'solid big', onclick: checkNow }, t('check')), h('button', { type: 'button', class: 'ghost', onclick: giveUp }, t('dontKnow'))));
  } else {
    const v = p.verdict;
    face.append(h('div', { class: 'verdict ' + (v.correct ? 'good' : 'bad') }, v.correct ? (v.v === 'almost' ? t('almost') : t('right')) : t('wrong')));
    if (!v.correct || v.v === 'almost') face.append(h('p', { class: 'answer' }, answer));
    if (v.v === 'almost') face.append(h('p', { class: 'mono mute' }, t('mindSpelling')));
    if (!v.correct && v.typed.trim()) face.append(h('p', { class: 'mono mute' }, t('youTyped') + ': ', h('s', {}, v.typed)));
    face.append(h('div', { class: 'btns' },
      h('button', { type: 'button', class: 'solid big', id: 'next', onclick: next }, t('next')),
      !v.correct ? h('button', { type: 'button', class: 'ghost', id: 'override', onclick: override }, t('stillRight')) : null));
  }

  app.replaceChildren(
    h('div', { class: 'studybar' },
      h('button', { type: 'button', class: 'ghost', onclick: leavePlay, 'aria-label': t('close') }, '×'),
      h('div', { class: 'prog', role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': String(p.total), 'aria-valuenow': String(p.done) }, h('i', { style: { width: (p.done / p.total * 100) + '%' } })),
      h('span', {}, p.done + '/' + p.total)),
    face,
    h('p', { class: 'hint', style: 'text-align:center' }, t('keys')));
  if (inp) inp.focus();
  else setTimeout(() => { const b = $('#next'); if (b && play === p) b.focus(); }, 0);
}

function record(it, correct) {
  const p = play, w = it.w;
  if (p.first.has(w.id)) return false;
  p.first.set(w.id, correct);
  if (correct) w.ok++; else w.bad++;
  w.lastBad = !correct;
  saveSoon(p.list);
  return true;
}
function checkNow() {
  const p = play; if (!p || p.phase !== 'ask' || !p.typed.trim()) return;
  const it = p.queue[0], answer = it.rev ? it.w.front : it.w.back;
  const v = checkAnswer(p.typed, answer);
  const correct = v === 'ok' || (v === 'almost' && !p.opts.strict);
  p.verdict = { v, correct, typed: p.typed, isFirst: record(it, correct) };
  p.phase = 'result'; drawPlay();
}
function giveUp() {
  const p = play; if (!p || p.phase !== 'ask') return;
  p.verdict = { v: 'wrong', correct: false, typed: '', isFirst: record(p.queue[0], false) };
  p.phase = 'result'; drawPlay();
}
function override() {
  const p = play; if (!p || p.phase !== 'result' || p.verdict.correct) return;
  const w = p.queue[0].w;
  if (p.verdict.isFirst) { p.first.set(w.id, true); w.bad = Math.max(0, w.bad - 1); w.ok++; w.lastBad = false; saveSoon(p.list); }
  p.verdict.correct = true; p.verdict.v = 'ok';
  drawPlay();
}
function next() {
  const p = play; if (!p || p.phase !== 'result') return;
  const it = p.queue.shift();
  if (p.verdict.correct || !p.opts.repeat) p.done++;
  else p.queue.splice(Math.min(3, p.queue.length), 0, it);
  p.phase = 'ask'; p.typed = ''; p.verdict = null;
  drawPlay();
}
function onPlayKey(e) {
  const p = play; if (!p || e.metaKey || e.ctrlKey || e.altKey) return;
  if (document.querySelector('dialog[open]')) return;
  if (e.key === 'Escape') { leavePlay(); return; }
  if (e.key === 'Enter' && p.phase === 'result' && !e.repeat && (e.target === document.body || e.target === document.documentElement)) { e.preventDefault(); next(); }
}

function drawSummary() {
  const p = play, list = p.list;
  const res = [...p.first.values()];
  const right = res.filter(Boolean).length, n = res.length;
  const pct = n ? Math.round(right / n * 100) : 100;
  const missedWords = list.words.filter(w => p.first.get(w.id) === false);
  lastMissed = new Set(missedWords.map(w => w.id));
  if (!p.retry) list.last = { ts: Date.now(), pct, n };
  saveSoon(list);
  const secs = Math.max(1, Math.round((Date.now() - p.started) / 1000));
  const dur = secs >= 60 ? Math.floor(secs / 60) + 'm' + String(secs % 60).padStart(2, '0') : secs + 's';
  app.replaceChildren(
    h('div', { class: 'sum' },
      h('h1', {}, t('done')),
      h('div', { class: 'nums mono mute' },
        h('span', {}, h('b', {}, right + '/' + n), t('score')),
        h('span', {}, h('b', {}, pct + '%'), t('accuracy')),
        h('span', {}, h('b', {}, dur), t('time'))),
      missedWords.length ? h('div', { class: 'missed' },
        h('h2', { class: 'sec mono' }, t('missed')),
        ...missedWords.map(w => h('div', { class: 'mrow' }, h('span', {}, w.front), h('span', {}, w.back)))) : null,
      h('div', { class: 'btns' },
        missedWords.length ? h('button', { type: 'button', class: 'solid', id: 'retry', onclick: () => go('#/play/' + list.id + '?retry=1') }, t('retryMissed')) : null,
        h('button', { type: 'button', class: missedWords.length ? '' : 'solid', id: 'again', onclick: () => go('#/play/' + list.id) }, t('again')),
        h('button', { type: 'button', class: 'ghost', onclick: leavePlay }, t('toList')))));
}

/* ---------- back-up ---------- */
const blobToDataURL = b => new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = () => rej(r.error); r.readAsDataURL(b); });
async function exportAll() {
  const [lists, images] = await Promise.all([dbAll('lists'), dbAll('images')]);
  const imgs = await Promise.all(images.map(async i => ({ id: i.id, data: await blobToDataURL(i.blob) })));
  const json = JSON.stringify({ app: 'taalflitser', version: 2, lists, images: imgs });
  const a = h('a', { href: URL.createObjectURL(new Blob([json], { type: 'application/json' })), download: 'taalflitser-' + new Date().toISOString().slice(0, 10) + '.json' });
  document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  toast(t('exported'));
}
async function importAll(file) {
  try {
    const data = JSON.parse(await file.text());
    if (data.app !== 'taalflitser' || data.version !== 2 || !Array.isArray(data.lists) || !Array.isArray(data.images)) throw new Error('format');
    const imgs = await Promise.all(data.images.map(async i => ({ id: i.id, blob: await (await fetch(i.data)).blob() })));
    await batch(['lists', 'images'], (l, i) => { data.lists.forEach(x => l.put(x)); imgs.forEach(x => i.put(x)); });
    urlCache.clear(); toast(t('imported', data.lists.length)); route();
  } catch (e) { console.error(e); toast(t('importFail')); }
}

/* ---------- globaal ---------- */
async function filesToScan(files) {
  const list = current.view === 'list' && current.id ? await dbGet('lists', current.id) : null;
  if (list) await flushSave(list);
  scanFiles(files, list || null);
}
const canDrop = () => (current.view === 'home' || current.view === 'list') && !document.querySelector('dialog[open]');
window.addEventListener('hashchange', route);
window.addEventListener('dragover', e => e.preventDefault());
window.addEventListener('drop', e => {
  e.preventDefault();
  if (canDrop() && e.dataTransfer && e.dataTransfer.files.length) filesToScan([...e.dataTransfer.files]);
});
window.addEventListener('paste', e => {
  if (!canDrop()) return;
  const files = [...(e.clipboardData ? e.clipboardData.files : [])].filter(f => f.type.startsWith('image/'));
  if (files.length) { e.preventDefault(); filesToScan(files); }
});
$('#btn-lang').addEventListener('click', () => {
  lang = lang === 'nl' ? 'en' : 'nl';
  try { localStorage.setItem('tf-lang', lang); } catch (e) { /* ignore */ }
  route();
});
$('#btn-theme').addEventListener('click', () => {
  const dark = document.documentElement.dataset.theme !== 'dark';
  if (dark) document.documentElement.dataset.theme = 'dark'; else delete document.documentElement.dataset.theme;
  try { localStorage.setItem('tf-theme', dark ? 'dark' : 'light'); } catch (e) { /* ignore */ }
});

openDB().then(d => { db = d; route(); }).catch(err => {
  console.error(err);
  app.replaceChildren(h('p', { class: 'empty' }, 'Opslag is niet beschikbaar in deze browsermodus (privévenster?).'));
});
