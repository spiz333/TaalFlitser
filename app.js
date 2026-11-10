'use strict';

/* =====================================================================
   TaalFlitser: pictures -> flashcards. No AI, no server.
   Everything lives in IndexedDB inside the browser.
   ===================================================================== */

/* ---------- i18n ---------- */
const STR = {
  en: {
    tagline: 'Pictures into flashcards. No AI. Everything stays in your browser.',
    decks: 'Decks', newDeck: 'New deck name', create: 'Create',
    noDecks: 'No decks yet. Name one above to begin.',
    cards: '{0} cards', cards_1: '{0} card',
    due: '{0} due', fresh: '{0} new',
    today: 'Today', streak: 'Streak', days: '{0} days', days_1: '{0} day',
    totalCards: 'Cards', studyDue: 'Study all due ({0})',
    study: 'Study', cram: 'Cram all', back: '← Decks',
    addPictures: 'Add pictures', rename: 'Rename', delDeck: 'Delete deck',
    drop: 'Drop pictures, paste, or click to browse',
    typeAnswers: 'Type answers', shuffle: 'Shuffle',
    emptyDeck: 'Empty deck. Add a few pictures.',
    answer: 'Answer', promptOpt: 'Prompt (optional)', perRegion: 'Answers are set per region',
    mask: 'Hide parts', editMask: 'Edit regions', remove: 'Remove',
    addN: 'Add {0} cards', addN_1: 'Add {0} card', cancel: 'Cancel', save: 'Save', done: 'Done',
    importTitle: 'New cards', maskTitle: 'Hide parts of the picture',
    maskHelp: 'Drag on the picture to cover a part. Every region becomes its own card.',
    regionLabel: 'Answer for region {0}', undo: 'Undo', clear: 'Clear',
    editCard: 'Edit card', reset: 'Reset progress', del: 'Delete',
    confirmDelCard: 'Delete this card?', confirmDelDeck: 'Delete this deck and all its cards?',
    deckName: 'Deck name', ok: 'OK',
    show: 'Show answer', again: 'Again', hard: 'Hard', good: 'Good', easy: 'Easy',
    typeHere: 'Type your answer', correct: 'Correct', almost: 'Almost', wrong: 'Wrong', youTyped: 'You typed',
    nothingDue: 'Nothing due', nothingDueText: 'You are all caught up. Come back later, or cram the lot.',
    finished: 'Done.', reviewed: 'Reviewed', accuracy: 'Accuracy', time: 'Time',
    studyMore: 'Study more', home: 'Back',
    export: 'Export', import: 'Import', backupNote: 'Backup everything to a file.',
    exported: 'Exported', imported: 'Imported {0} cards', importFail: 'That file could not be imported',
    unreadable: '{0} file(s) could not be read', noImages: 'No pictures found',
    savedLocal: 'Stored in this browser only',
    keys: 'Space flip · 1-4 grade · Esc leave',
    close: 'Close', loading: 'Preparing…', saving: 'Saving…',
    new_: 'new', due_: 'due', learned: 'learned',
    prompt: 'Prompt',
  },
  nl: {
    tagline: 'Foto’s worden flitskaarten. Geen AI. Alles blijft in je browser.',
    decks: 'Stapels', newDeck: 'Naam nieuwe stapel', create: 'Maak aan',
    noDecks: 'Nog geen stapels. Geef er hierboven een naam om te beginnen.',
    cards: '{0} kaarten', cards_1: '{0} kaart',
    due: '{0} te doen', fresh: '{0} nieuw',
    today: 'Vandaag', streak: 'Reeks', days: '{0} dagen', days_1: '{0} dag',
    totalCards: 'Kaarten', studyDue: 'Alles van vandaag leren ({0})',
    study: 'Leren', cram: 'Alles oefenen', back: '← Stapels',
    addPictures: 'Foto’s toevoegen', rename: 'Hernoemen', delDeck: 'Stapel verwijderen',
    drop: 'Sleep foto’s hierheen, plak ze, of klik om te kiezen',
    typeAnswers: 'Antwoord typen', shuffle: 'Door elkaar',
    emptyDeck: 'Lege stapel. Voeg wat foto’s toe.',
    answer: 'Antwoord', promptOpt: 'Vraag (optioneel)', perRegion: 'Antwoorden per gebied',
    mask: 'Delen verbergen', editMask: 'Gebieden bewerken', remove: 'Weg',
    addN: '{0} kaarten toevoegen', addN_1: '{0} kaart toevoegen', cancel: 'Annuleren', save: 'Opslaan', done: 'Klaar',
    importTitle: 'Nieuwe kaarten', maskTitle: 'Verberg delen van de foto',
    maskHelp: 'Sleep over de foto om een deel af te dekken. Elk gebied wordt een eigen kaart.',
    regionLabel: 'Antwoord voor gebied {0}', undo: 'Ongedaan', clear: 'Wissen',
    editCard: 'Kaart bewerken', reset: 'Voortgang wissen', del: 'Verwijderen',
    confirmDelCard: 'Deze kaart verwijderen?', confirmDelDeck: 'Deze stapel met alle kaarten verwijderen?',
    deckName: 'Naam van stapel', ok: 'OK',
    show: 'Toon antwoord', again: 'Opnieuw', hard: 'Moeilijk', good: 'Goed', easy: 'Makkelijk',
    typeHere: 'Typ je antwoord', correct: 'Goed', almost: 'Bijna', wrong: 'Fout', youTyped: 'Jij typte',
    nothingDue: 'Niets te doen', nothingDueText: 'Alles is bij. Kom later terug, of oefen alles.',
    finished: 'Klaar.', reviewed: 'Herhaald', accuracy: 'Score', time: 'Tijd',
    studyMore: 'Meer leren', home: 'Terug',
    export: 'Exporteren', import: 'Importeren', backupNote: 'Maak een back-up in een bestand.',
    exported: 'Geexporteerd', imported: '{0} kaarten geimporteerd', importFail: 'Dat bestand kon niet worden geimporteerd',
    unreadable: '{0} bestand(en) onleesbaar', noImages: 'Geen foto’s gevonden',
    savedLocal: 'Alleen in deze browser opgeslagen',
    keys: 'Spatie omdraaien · 1-4 beoordelen · Esc stoppen',
    close: 'Sluiten', loading: 'Bezig…', saving: 'Opslaan…',
    new_: 'nieuw', due_: 'nu', learned: 'geleerd',
    prompt: 'Vraag',
  },
};

let lang = (() => {
  try { const s = localStorage.getItem('tf-lang'); if (s === 'en' || s === 'nl') return s; } catch (e) { /* ignore */ }
  return (navigator.language || 'en').toLowerCase().startsWith('nl') ? 'nl' : 'en';
})();

function t(key, ...args) {
  let s = (STR[lang] && STR[lang][key]) ?? STR.en[key] ?? key;
  args.forEach((v, i) => { s = s.split('{' + i + '}').join(v); });
  return s;
}
/** Plural-aware: uses key_1 when n === 1 */
function tn(key, n) { return t(n === 1 && (key + '_1') in STR.en ? key + '_1' : key, n); }

/* ---------- tiny helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const app = $('#app');
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const uid = () => (globalThis.crypto && crypto.randomUUID) ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
const DAY = 864e5, MIN = 6e4, NEW_LIMIT = 20;

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
  const el = $('#toast');
  el.textContent = msg; el.classList.add('on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('on'), 2600);
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

const dayKey = (d = new Date()) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
function streakOf(log) {
  let n = 0; const d = new Date();
  if (!log[dayKey(d)]) d.setDate(d.getDate() - 1);
  while (log[dayKey(d)]) { n++; d.setDate(d.getDate() - 1); }
  return n;
}
function fmtInterval(days, minutes) {
  if (minutes) return minutes + 'm';
  if (days < 30) return days + 'd';
  if (days < 365) return Math.round(days / 30) + 'mo';
  return (Math.round(days / 36.5) / 10) + 'y';
}

/* ---------- settings ---------- */
const settings = (() => {
  let s = { type: false, shuffle: true };
  try { s = { ...s, ...JSON.parse(localStorage.getItem('tf-settings') || '{}') }; } catch (e) { /* ignore */ }
  return s;
})();
function saveSettings() { try { localStorage.setItem('tf-settings', JSON.stringify(settings)); } catch (e) { /* ignore */ } }

/* ---------- IndexedDB ---------- */
let db;
function openDB() {
  return new Promise((res, rej) => {
    const r = indexedDB.open('taalflitser', 1);
    r.onupgradeneeded = () => {
      const d = r.result;
      d.createObjectStore('decks', { keyPath: 'id' });
      d.createObjectStore('cards', { keyPath: 'id' }).createIndex('deckId', 'deckId');
      d.createObjectStore('images', { keyPath: 'id' });
      d.createObjectStore('meta', { keyPath: 'key' });
    };
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
}
const req = r => new Promise((res, rej) => { r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
const os = (name, mode = 'readonly') => db.transaction(name, mode).objectStore(name);
const dbAll = n => req(os(n).getAll());
const dbGet = (n, k) => req(os(n).get(k));
const dbPut = (n, v) => req(os(n, 'readwrite').put(v));
const cardsOf = deckId => req(os('cards').index('deckId').getAll(deckId));
function batch(names, fn) {
  return new Promise((res, rej) => {
    const tx = db.transaction(names, 'readwrite');
    fn(...names.map(n => tx.objectStore(n)));
    tx.oncomplete = () => res();
    tx.onerror = tx.onabort = () => rej(tx.error);
  });
}

/* ---------- images ---------- */
const urlCache = new Map();
async function imgURL(id) {
  if (urlCache.has(id)) return urlCache.get(id);
  const rec = await dbGet('images', id);
  if (!rec) return '';
  const u = URL.createObjectURL(rec.blob);
  urlCache.set(id, u);
  return u;
}
function hydrate(root) {
  root.querySelectorAll('img[data-img]').forEach(img => {
    if (img.getAttribute('src')) return;
    imgURL(img.dataset.img).then(u => { if (u) img.src = u; });
  });
}

function loadImage(file) {
  return new Promise((res, rej) => {
    const url = URL.createObjectURL(file);
    const im = new Image();
    im.onload = () => { URL.revokeObjectURL(url); res(im); };
    im.onerror = () => { URL.revokeObjectURL(url); rej(new Error('bad image')); };
    im.src = url;
  });
}
/** Downscale to max 1600px and re-encode, so the library stays light. */
async function prepareImage(file) {
  const im = await loadImage(file);
  const max = 1600, s = Math.min(1, max / Math.max(im.naturalWidth, im.naturalHeight));
  const w = Math.max(1, Math.round(im.naturalWidth * s)), hh = Math.max(1, Math.round(im.naturalHeight * s));
  const c = document.createElement('canvas'); c.width = w; c.height = hh;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, hh);
  ctx.drawImage(im, 0, 0, w, hh);
  const blob = await new Promise(r => c.toBlob(r, 'image/jpeg', 0.86));
  return { blob, w, h: hh };
}
/** "IMG_2231.jpg" -> '' (useless), "la_boulangerie-1.png" -> "la boulangerie" */
function nameToAnswer(filename) {
  let s = filename.replace(/\.[^.]+$/, '').replace(/[_\-+]+/g, ' ').replace(/\s*\(\d+\)$/, '').replace(/\s+/g, ' ').trim();
  const generic = /^(img|dsc|dscn|pxl|image|photo|foto|screenshot|screen ?shot|schermafbeelding|whatsapp image|unnamed|untitled|download)?([\d\s().:]|\bat\b|\bom\b)*$/i;
  return generic.test(s) ? '' : s;
}

/* ---------- scheduling (SM-2 flavoured, deterministic) ---------- */
function schedule(card, grade) {
  let { reps = 0, interval = 0, ease = 2.5, lapses = 0 } = card;
  let nInterval = 0, due, minutes = 0;
  if (grade === 0) {
    lapses++; reps = 0; ease = Math.max(1.3, ease - 0.2); minutes = 1; due = Date.now() + MIN;
  } else {
    if (grade === 1) { nInterval = reps === 0 ? 1 : Math.max(interval + 1, Math.round(interval * 1.2)); ease = Math.max(1.3, ease - 0.15); }
    else if (grade === 2) { nInterval = reps === 0 ? 1 : reps === 1 ? 3 : Math.max(interval + 1, Math.round(interval * ease)); }
    else { nInterval = reps === 0 ? 4 : Math.max(interval + 2, Math.round(interval * ease * 1.3)); ease += 0.15; }
    reps++; due = Date.now() + nInterval * DAY;
  }
  return { next: { ...card, reps, interval: nInterval, ease, lapses, due, seen: true, last: Date.now() }, label: fmtInterval(nInterval, minutes) };
}

const isDue = (c, now = Date.now()) => c.seen && c.due <= now;
function counts(cs) {
  const now = Date.now();
  let due = 0, fresh = 0, mature = 0, learning = 0;
  for (const c of cs) {
    if (!c.seen) fresh++;
    else { if (c.due <= now) due++; if (c.interval >= 21) mature++; else learning++; }
  }
  return { total: cs.length, due, fresh, mature, learning };
}

/* ---------- typed-answer checking ---------- */
const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^\p{L}\p{N}\s]/gu, '').replace(/\s+/g, ' ').trim();
function lev(a, b) {
  const m = a.length, n = b.length;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[n];
}
/** 'ok' | 'typo' | 'wrong'. Several accepted answers can be split with / ; | */
function checkAnswer(input, answer) {
  const x = norm(input);
  let best = 'wrong';
  for (const v of answer.split(/[\/;|]/).map(norm).filter(Boolean)) {
    if (v === x) return 'ok';
    const tol = v.length >= 9 ? 2 : v.length >= 5 ? 1 : 0;
    if (x && tol && lev(v, x) <= tol) best = 'typo';
  }
  return best;
}

/* ---------- dialogs ---------- */
function dlg(title, body, actions, wide) {
  const d = h('dialog', { class: wide ? 'wide' : '', 'aria-label': title },
    h('div', { class: 'dlg-h' }, title),
    h('div', { class: 'dlg-b' }, body),
    h('div', { class: 'dlg-f' }, actions));
  d.addEventListener('close', () => d.remove());
  document.body.append(d);
  d.showModal();
  return d;
}
function askText(title, value = '', okLabel = t('save')) {
  return new Promise(res => {
    let out = null;
    const inp = h('input', { type: 'text', value, maxlength: '80', 'aria-label': title });
    const d = dlg(title, inp, [
      h('button', { type: 'button', onclick: () => d.close() }, t('cancel')),
      h('button', { type: 'button', class: 'solid', onclick: () => { out = inp.value.trim(); d.close(); } }, okLabel),
    ]);
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') { out = inp.value.trim(); d.close(); } });
    d.addEventListener('close', () => res(out || null));
    inp.focus(); inp.select();
  });
}
function confirmDlg(msg, okLabel = t('del')) {
  return new Promise(res => {
    let yes = false;
    const d = dlg(msg, h('span'), [
      h('button', { type: 'button', onclick: () => d.close() }, t('cancel')),
      h('button', { type: 'button', class: 'solid', onclick: () => { yes = true; d.close(); } }, okLabel),
    ]);
    d.querySelector('.dlg-b').remove();
    d.addEventListener('close', () => res(yes));
  });
}

/* ---------- card rendering ---------- */
const pct = v => (v * 100).toFixed(3) + '%';
function maskEl(r, cls, text) {
  return h('span', { class: 'mask ' + cls, style: { left: pct(r.x), top: pct(r.y), width: pct(r.w), height: pct(r.h) } }, text);
}
/** mode: 'front' (mask covers), 'back' (mask outlined) */
function stageEl(card, mode, study) {
  const cached = urlCache.get(card.imageId);
  const st = h('span', { class: 'stage' + (study ? ' study' : ''), style: { '--r': card.iw / card.ih } },
    h('img', { alt: '', draggable: 'false', dataset: { img: card.imageId }, src: cached }));
  if (card.rect) st.append(maskEl(card.rect, mode === 'front' ? '' : 'open', mode === 'front' ? '?' : ''));
  return st;
}

/* ---------- router ---------- */
let currentDeckId = null;
async function route() {
  stopStudy();
  currentDeckId = null;
  const [path, query] = location.hash.slice(1).split('?');
  const [, view, id] = path.split('/');
  window.scrollTo(0, 0);
  try {
    if (view === 'deck' && id) await renderDeck(id);
    else if (view === 'study' && id) await renderStudy(id, new URLSearchParams(query || '').has('cram'));
    else await renderHome();
  } catch (err) {
    console.error(err);
    app.replaceChildren(h('p', { class: 'empty' }, String(err.message || err)));
  }
  document.documentElement.lang = lang;
  $('#btn-lang').textContent = lang.toUpperCase();
}

/* ---------- home ---------- */
async function renderHome() {
  const [decks, cards, logRec] = await Promise.all([dbAll('decks'), dbAll('cards'), dbGet('meta', 'log')]);
  const log = logRec ? logRec.value : {};
  decks.sort((a, b) => a.created - b.created);
  const byDeck = new Map();
  for (const c of cards) (byDeck.get(c.deckId) || byDeck.set(c.deckId, []).get(c.deckId)).push(c);
  const all = counts(cards);
  const streak = streakOf(log);

  const nameIn = h('input', { type: 'text', placeholder: t('newDeck'), maxlength: '80', 'aria-label': t('newDeck') });
  const make = async () => {
    const name = nameIn.value.trim();
    if (!name) { nameIn.focus(); return; }
    const deck = { id: uid(), name, created: Date.now() };
    await dbPut('decks', deck);
    location.hash = '#/deck/' + deck.id;
  };
  nameIn.addEventListener('keydown', e => { if (e.key === 'Enter') make(); });

  const rows = decks.map(d => {
    const cs = byDeck.get(d.id) || [];
    const c = counts(cs);
    const pm = c.total ? c.mature / c.total * 100 : 0, pl = c.total ? c.learning / c.total * 100 : 0;
    return h('div', { class: 'row' },
      h('div', {},
        h('a', { class: 'name', href: '#/deck/' + d.id }, d.name),
        h('div', { class: 'mono mute' }, [tn('cards', c.total), c.due ? t('due', c.due) : null, c.fresh ? t('fresh', c.fresh) : null].filter(Boolean).join(' · '))),
      h('div', { class: 'actions' },
        h('button', { type: 'button', class: c.due + c.fresh ? 'solid' : '', disabled: !c.total, onclick: () => { location.hash = '#/study/' + d.id; } }, t('study'))),
      h('div', { class: 'meter', 'aria-hidden': 'true' }, h('i', { class: 'm1', style: { width: pm + '%' } }), h('i', { class: 'm2', style: { width: pl + '%' } })));
  });

  const imp = $('#import-in');
  imp.onchange = async () => { const f = imp.files[0]; imp.value = ''; if (f) await importAll(f); };

  app.replaceChildren(
    h('section', { class: 'hero' }, h('h1', {}, t('decks') + '.'), h('p', { class: 'mute' }, t('tagline'))),
    h('div', { class: 'stats mono mute' },
      h('span', {}, t('today') + ' ', h('b', {}, log[dayKey()] || 0)),
      h('span', {}, t('streak') + ' ', h('b', {}, tn('days', streak))),
      h('span', {}, t('totalCards') + ' ', h('b', {}, all.total)),
      all.due ? h('span', {}, h('button', { type: 'button', class: 'solid', onclick: () => { location.hash = '#/study/all'; } }, t('studyDue', all.due))) : null),
    h('div', { class: 'newdeck' }, nameIn, h('button', { type: 'button', class: 'solid', onclick: make }, t('create'))),
    ...(rows.length ? rows : [h('p', { class: 'empty mute' }, t('noDecks'))]),
    h('div', { class: 'foot' },
      h('span', { class: 'mono mute' }, t('savedLocal')),
      h('button', { type: 'button', onclick: exportAll }, t('export')),
      h('button', { type: 'button', onclick: () => imp.click() }, t('import'))));
}

/* ---------- deck page ---------- */
async function renderDeck(id) {
  const deck = await dbGet('decks', id);
  if (!deck) { location.hash = '#/'; return; }
  currentDeckId = id;
  const cards = (await cardsOf(id)).sort((a, b) => a.created - b.created);
  const c = counts(cards);

  const fileIn = $('#file-in');
  fileIn.onchange = () => { const fs = [...fileIn.files]; fileIn.value = ''; handleFiles(fs, id); };
  const drop = h('div', { class: 'drop', tabindex: '0', role: 'button', 'aria-label': t('addPictures') },
    h('big', {}, '+'), t('drop'));
  drop.addEventListener('click', () => fileIn.click());
  drop.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileIn.click(); } });
  ['dragenter', 'dragover'].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.add('over'); }));
  ['dragleave', 'drop'].forEach(ev => drop.addEventListener(ev, () => drop.classList.remove('over')));

  const chk = (key, label) => h('label', { class: 'chk' },
    h('input', { type: 'checkbox', checked: settings[key], onchange: e => { settings[key] = e.target.checked; saveSettings(); } }), label);

  const tiles = cards.map(card => {
    const state = !card.seen ? t('new_') : isDue(card) ? t('due_') : fmtInterval(card.interval);
    return h('button', { type: 'button', class: 'tile', onclick: () => editCard(card.id, id) },
      stageEl(card, 'back'),
      h('span', { class: 'cap' },
        h('span', { class: card.answer ? '' : 'none' }, card.answer || '—'),
        h('em', {}, state)));
  });

  app.replaceChildren(
    h('a', { class: 'crumb', href: '#/' }, t('back')),
    h('div', { class: 'deckhead' },
      h('div', {},
        h('h1', {}, deck.name),
        h('div', { class: 'mono mute', style: 'margin-top:10px' }, [tn('cards', c.total), c.due ? t('due', c.due) : null, c.fresh ? t('fresh', c.fresh) : null].filter(Boolean).join(' · '))),
      h('div', { class: 'btns' },
        h('button', { type: 'button', class: 'ghost', onclick: async () => { const n = await askText(t('deckName'), deck.name); if (n) { deck.name = n; await dbPut('decks', deck); renderDeck(id); } } }, t('rename')),
        h('button', { type: 'button', class: 'ghost', onclick: async () => {
          if (!await confirmDlg(t('confirmDelDeck'))) return;
          await batch(['decks', 'cards', 'images'], (d, cs, im) => { d.delete(id); for (const x of cards) { cs.delete(x.id); im.delete(x.imageId); } });
          cards.forEach(x => { const u = urlCache.get(x.imageId); if (u) { URL.revokeObjectURL(u); urlCache.delete(x.imageId); } });
          location.hash = '#/';
        } }, t('delDeck')))),
    h('div', { class: 'toolbar' },
      h('div', { class: 'btns' },
        h('button', { type: 'button', class: 'solid', disabled: !(c.due + c.fresh), onclick: () => { location.hash = '#/study/' + id; } }, t('study') + (c.due + c.fresh ? ' (' + (c.due + Math.min(c.fresh, NEW_LIMIT)) + ')' : '')),
        h('button', { type: 'button', disabled: !c.total, onclick: () => { location.hash = '#/study/' + id + '?cram'; } }, t('cram'))),
      h('div', { class: 'grow' }),
      chk('type', t('typeAnswers')), chk('shuffle', t('shuffle'))),
    drop,
    cards.length ? h('div', { class: 'grid' }, tiles) : h('p', { class: 'mute', style: 'text-align:center' }, t('emptyDeck')));
  hydrate(app);
}

/* ---------- adding pictures ---------- */
async function prepareItems(files) {
  const items = []; let failed = 0;
  for (const f of files.filter(f => f.type.startsWith('image/'))) {
    try {
      const p = await prepareImage(f);
      items.push({ ...p, url: URL.createObjectURL(p.blob), name: f.name, answer: nameToAnswer(f.name), prompt: '', rects: [] });
    } catch (e) { failed++; }
  }
  if (failed) toast(t('unreadable', failed));
  return items;
}

async function handleFiles(files, deckId) {
  if (!files.some(f => f.type.startsWith('image/'))) { toast(t('noImages')); return; }
  toast(t('loading'));
  const items = await prepareItems(files);
  if (items.length) await openStaging(items, deckId);
}

function openStaging(items, deckId) {
  return new Promise(resolve => {
    const list = h('div');
    const addBtn = h('button', { type: 'button', class: 'solid' });
    const total = () => items.reduce((n, it) => n + (it.rects.length || 1), 0);

    const draw = () => {
      list.replaceChildren(...items.map((it, i) => {
        const thumb = h('span', { class: 'stage', style: { '--r': it.w / it.h } }, h('img', { alt: '', src: it.url, draggable: 'false' }));
        it.rects.forEach((r, n) => thumb.append(maskEl(r, 'draw', n + 1)));
        const ans = h('input', { type: 'text', placeholder: it.rects.length ? t('perRegion') : t('answer'), 'aria-label': t('answer'), value: it.answer, disabled: it.rects.length > 0, maxlength: '200' });
        ans.addEventListener('input', () => { it.answer = ans.value; });
        const pr = h('input', { type: 'text', placeholder: t('promptOpt'), 'aria-label': t('prompt'), value: it.prompt, maxlength: '200' });
        pr.addEventListener('input', () => { it.prompt = pr.value; });
        return h('div', { class: 'srow' },
          thumb,
          h('div', { class: 'fields' }, h('div', { class: 'fname' }, it.name), ans, pr),
          h('div', { class: 'acts' },
            h('button', { type: 'button', onclick: async () => { await openMasker(it); draw(); } }, it.rects.length ? t('editMask') + ' (' + it.rects.length + ')' : t('mask')),
            h('button', { type: 'button', class: 'ghost', onclick: () => { URL.revokeObjectURL(it.url); items.splice(i, 1); if (!items.length) d.close(); else draw(); } }, t('remove'))));
      }));
      addBtn.textContent = tn('addN', total());
    };

    const cleanup = () => items.forEach(it => URL.revokeObjectURL(it.url));
    const more = h('input', { type: 'file', accept: 'image/*', multiple: true, hidden: true });
    more.addEventListener('change', async () => {
      const fs = [...more.files]; more.value = '';
      items.push(...await prepareItems(fs)); draw();
    });
    const d = dlg(t('importTitle'), [list, more], [
      h('button', { type: 'button', class: 'sp', onclick: () => more.click() }, '+ ' + t('addPictures')),
      h('button', { type: 'button', onclick: () => d.close() }, t('cancel')),
      addBtn], true);
    addBtn.addEventListener('click', async () => {
      addBtn.disabled = true; addBtn.textContent = t('saving');
      const base = Date.now(); let n = 0;
      const newCards = [], newImages = [];
      for (const it of items) {
        const imageId = uid();
        newImages.push({ id: imageId, blob: it.blob, w: it.w, h: it.h });
        const mk = (extra) => ({
          id: uid(), deckId, imageId, iw: it.w, ih: it.h, prompt: it.prompt.trim(), answer: '', rect: null,
          created: base + (n++), seen: false, due: 0, reps: 0, interval: 0, ease: 2.5, lapses: 0, ...extra,
        });
        if (it.rects.length) it.rects.forEach(r => newCards.push(mk({ rect: { x: r.x, y: r.y, w: r.w, h: r.h }, answer: (r.label || '').trim() })));
        else newCards.push(mk({ answer: it.answer.trim() }));
      }
      await batch(['images', 'cards'], (im, cs) => { newImages.forEach(x => im.put(x)); newCards.forEach(x => cs.put(x)); });
      toast(tn('cards', newCards.length));
      d.close();
    });
    d.addEventListener('close', () => {
      cleanup();
      // pictures added via the "+" button in this dialog are handled by a fresh dialog; here we just refresh
      resolve();
      if (currentDeckId === deckId) renderDeck(deckId);
    });
    draw();
  });
}

/** Region editor: drag rectangles over the picture. */
function openMasker(it) {
  return new Promise(resolve => {
    let rects = it.rects.map(r => ({ ...r }));
    let anchor = null, tmp = null;
    const stage = h('span', { class: 'stage draw', style: { '--r': it.w / it.h } }, h('img', { alt: '', src: it.url, draggable: 'false' }));
    const list = h('ol', { class: 'regions' });

    const paint = () => {
      stage.querySelectorAll('.mask').forEach(m => m.remove());
      rects.forEach((r, n) => stage.append(maskEl(r, 'draw', n + 1)));
      if (tmp) stage.append(maskEl(tmp, 'tmp'));
    };
    const drawList = (focusLast) => {
      list.replaceChildren(...rects.map((r, n) => {
        const inp = h('input', { type: 'text', placeholder: t('regionLabel', n + 1), 'aria-label': t('regionLabel', n + 1), value: r.label || '', maxlength: '200' });
        inp.addEventListener('input', () => { r.label = inp.value; });
        return h('li', {}, h('b', {}, n + 1), inp,
          h('button', { type: 'button', class: 'ghost', onclick: () => { rects.splice(n, 1); paint(); drawList(); } }, '×'));
      }));
      undoBtn.disabled = clearBtn.disabled = !rects.length;
      if (focusLast) { const i = list.querySelector('li:last-child input'); if (i) i.focus(); }
    };
    const pt = e => { const b = stage.getBoundingClientRect(); return { x: clamp((e.clientX - b.left) / b.width, 0, 1), y: clamp((e.clientY - b.top) / b.height, 0, 1) }; };
    stage.addEventListener('pointerdown', e => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      e.preventDefault(); stage.setPointerCapture(e.pointerId);
      anchor = pt(e); tmp = { x: anchor.x, y: anchor.y, w: 0, h: 0 }; paint();
    });
    stage.addEventListener('pointermove', e => {
      if (!anchor) return;
      const p = pt(e);
      tmp = { x: Math.min(anchor.x, p.x), y: Math.min(anchor.y, p.y), w: Math.abs(p.x - anchor.x), h: Math.abs(p.y - anchor.y) };
      paint();
    });
    stage.addEventListener('pointerup', () => {
      if (!anchor) return;
      const added = tmp && tmp.w > 0.015 && tmp.h > 0.015;
      if (added) rects.push({ ...tmp, label: '' });
      anchor = tmp = null; paint(); drawList(added);
    });
    stage.addEventListener('pointercancel', () => { anchor = tmp = null; paint(); });

    const undoBtn = h('button', { type: 'button', onclick: () => { rects.pop(); paint(); drawList(); } }, t('undo'));
    const clearBtn = h('button', { type: 'button', onclick: () => { rects = []; paint(); drawList(); } }, t('clear'));
    const d = dlg(t('maskTitle'), [h('p', { class: 'mute' }, t('maskHelp')), h('div', { style: 'margin-top:14px' }, stage), list], [
      h('span', { class: 'sp' }, undoBtn, ' ', clearBtn),
      h('button', { type: 'button', onclick: () => d.close() }, t('cancel')),
      h('button', { type: 'button', class: 'solid', onclick: () => { it.rects = rects; d.close(); } }, t('done'))], true);
    d.addEventListener('close', resolve);
    paint(); drawList();
  });
}

/* ---------- edit one card ---------- */
async function editCard(cardId, deckId) {
  const card = await dbGet('cards', cardId);
  if (!card) return;
  const pr = h('input', { type: 'text', value: card.prompt || '', maxlength: '200', 'aria-label': t('prompt') });
  const an = h('input', { type: 'text', value: card.answer || '', maxlength: '200', 'aria-label': t('answer') });
  const body = [
    h('div', { style: 'max-width:420px;margin:0 auto' }, stageEl(card, 'back')),
    h('div', { class: 'field', style: 'margin-top:18px' }, h('label', {}, t('prompt')), pr),
    h('div', { class: 'field' }, h('label', {}, t('answer')), an),
  ];
  const d = dlg(t('editCard'), body, [
    h('span', { class: 'sp' },
      h('button', { type: 'button', onclick: async () => {
        if (!await confirmDlg(t('confirmDelCard'))) return;
        const all = await dbAll('cards');
        const shared = all.some(c => c.imageId === card.imageId && c.id !== card.id);
        await batch(['cards', 'images'], (cs, im) => { cs.delete(card.id); if (!shared) im.delete(card.imageId); });
        if (!shared) { const u = urlCache.get(card.imageId); if (u) { URL.revokeObjectURL(u); urlCache.delete(card.imageId); } }
        d.close(); renderDeck(deckId);
      } }, t('del')), ' ',
      h('button', { type: 'button', onclick: async () => {
        await dbPut('cards', { ...card, seen: false, due: 0, reps: 0, interval: 0, ease: 2.5, lapses: 0 });
        d.close(); renderDeck(deckId);
      } }, t('reset'))),
    h('button', { type: 'button', onclick: () => d.close() }, t('cancel')),
    h('button', { type: 'button', class: 'solid', onclick: async () => {
      await dbPut('cards', { ...card, prompt: pr.value.trim(), answer: an.value.trim() });
      d.close(); renderDeck(deckId);
    } }, t('save'))]);
  hydrate(d);
  an.focus();
}

/* ---------- study ---------- */
let study = null;
function stopStudy() {
  if (study) document.removeEventListener('keydown', onStudyKey);
  study = null;
}
async function renderStudy(id, cram) {
  let cards, label;
  if (id === 'all') { cards = await dbAll('cards'); label = t('decks'); }
  else {
    const deck = await dbGet('decks', id);
    if (!deck) { location.hash = '#/'; return; }
    cards = await cardsOf(id); label = deck.name;
  }
  const now = Date.now();
  let queue;
  if (cram) queue = [...cards];
  else {
    const due = cards.filter(c => isDue(c, now)).sort((a, b) => a.due - b.due);
    const fresh = cards.filter(c => !c.seen).sort((a, b) => a.created - b.created).slice(0, NEW_LIMIT);
    queue = [...due, ...fresh];
  }
  if (!queue.length) {
    app.replaceChildren(
      h('a', { class: 'crumb', href: id === 'all' ? '#/' : '#/deck/' + id }, t('home')),
      h('div', { class: 'sum' }, h('h1', {}, t('nothingDue') + '.'), h('p', { class: 'mute' }, t('nothingDueText')),
        cards.length && id !== 'all' ? h('div', { class: 'btns' }, h('button', { type: 'button', class: 'solid', onclick: () => { location.hash = '#/study/' + id + '?cram'; } }, t('cram'))) : null));
    return;
  }
  if (settings.shuffle) shuffle(queue);
  study = { queue, total: queue.length, done: 0, reviews: 0, fails: 0, cram, deckId: id, label, flipped: false, typed: '', result: null, busy: false, started: Date.now() };
  await Promise.all([...new Set(queue.map(c => c.imageId))].map(imgURL));
  document.addEventListener('keydown', onStudyKey);
  drawStudy();
}

function leaveStudy() { location.hash = study && study.deckId !== 'all' ? '#/deck/' + study.deckId : '#/'; }

function drawStudy() {
  const s = study;
  if (!s) return;
  if (!s.queue.length) { drawSummary(); return; }
  const c = s.queue[0];
  const wantType = settings.type && !!c.answer;
  const front = !s.flipped;
  let inp = null;

  const face = h('div', { class: 'face' });
  if (c.prompt) face.append(h('p', { class: 'prompt' }, c.prompt));
  face.append(stageEl(c, front ? 'front' : 'back', true));

  if (front && wantType) {
    inp = h('input', { type: 'text', placeholder: t('typeHere'), 'aria-label': t('typeHere'), value: s.typed, autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false' });
    inp.addEventListener('input', () => { s.typed = inp.value; });
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); flip(); } });
    face.append(h('div', { class: 'typein' }, inp));
  }
  if (!front) {
    if (c.answer) face.append(h('p', { class: 'answer' }, c.answer));
    if (s.result) {
      face.append(h('p', { class: 'verdict ' + s.result }, h('em', {}, t({ ok: 'correct', typo: 'almost', wrong: 'wrong' }[s.result])),
        s.typed ? [' · ' + t('youTyped') + ': ', h('span', { class: s.result === 'wrong' ? 'wrong' : '' }, s.typed)] : null));
    }
  }

  const suggest = s.result ? { ok: 2, typo: 1, wrong: 0 }[s.result] : -1;
  const controls = front
    ? h('button', { type: 'button', class: 'solid big', onclick: flip }, t('show'))
    : h('div', { class: 'grades' }, ['again', 'hard', 'good', 'easy'].map((k, g) =>
        h('button', { type: 'button', class: g === suggest ? 'suggest' : '', onclick: () => grade(g) },
          (g + 1) + ' ' + t(k), s.cram ? null : h('small', {}, schedule(c, g).label))));

  app.replaceChildren(
    h('div', { class: 'studybar' },
      h('button', { type: 'button', class: 'ghost', onclick: leaveStudy, 'aria-label': t('close') }, '×'),
      h('div', { class: 'prog', role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': String(s.total), 'aria-valuenow': String(s.done) }, h('i', { style: { width: (s.done / s.total * 100) + '%' } })),
      h('span', {}, s.done + '/' + s.total)),
    face,
    h('div', { class: 'face', style: 'padding-top:0' }, controls, h('p', { class: 'hint' }, t('keys'))));
  hydrate(app);
  if (inp) inp.focus();
}

function flip() {
  const s = study; if (!s || s.flipped) return;
  const c = s.queue[0];
  s.flipped = true;
  s.result = (settings.type && c.answer && s.typed.trim()) ? checkAnswer(s.typed, c.answer) : null;
  if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
  drawStudy();
}

async function grade(g) {
  const s = study; if (!s || !s.flipped || s.busy) return;
  s.busy = true;
  const c = s.queue.shift();
  s.reviews++;
  if (g === 0) s.fails++;
  if (!s.cram) {
    const { next } = schedule(c, g);
    await dbPut('cards', next);
    const rec = (await dbGet('meta', 'log')) || { key: 'log', value: {} };
    rec.value[dayKey()] = (rec.value[dayKey()] || 0) + 1;
    await dbPut('meta', rec);
    c.reps = next.reps; c.interval = next.interval; c.ease = next.ease; c.lapses = next.lapses; c.due = next.due; c.seen = true;
  }
  if (g === 0) s.queue.splice(Math.min(2, s.queue.length), 0, c); else s.done++;
  s.flipped = false; s.typed = ''; s.result = null; s.busy = false;
  drawStudy();
}

function drawSummary() {
  const s = study;
  const secs = Math.max(1, Math.round((Date.now() - s.started) / 1000));
  const acc = s.reviews ? Math.round((1 - s.fails / s.reviews) * 100) : 100;
  const back = s.deckId === 'all' ? '#/' : '#/deck/' + s.deckId;
  app.replaceChildren(
    h('div', { class: 'sum' },
      h('h1', {}, t('finished')),
      h('div', { class: 'nums mono mute' },
        h('span', {}, h('b', {}, s.reviews), t('reviewed')),
        h('span', {}, h('b', {}, acc + '%'), t('accuracy')),
        h('span', {}, h('b', {}, secs >= 60 ? Math.floor(secs / 60) + 'm' + String(secs % 60).padStart(2, '0') : secs + 's'), t('time'))),
      h('div', { class: 'btns' },
        h('button', { type: 'button', class: 'solid', onclick: () => { location.hash = back; } }, t('home')),
        !s.cram ? h('button', { type: 'button', onclick: () => renderStudy(s.deckId, false) }, t('studyMore')) : null)));
}

function onStudyKey(e) {
  if (!study || e.metaKey || e.ctrlKey || e.altKey) return;
  if (document.querySelector('dialog[open]')) return;
  const typing = e.target && e.target.tagName === 'INPUT';
  if (e.key === 'Escape') { leaveStudy(); return; }
  if (typing) return;
  if (!study.flipped) {
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); }
  } else if (e.key >= '1' && e.key <= '4') { grade(+e.key - 1); }
  else if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); grade(2); }
}

/* ---------- backup ---------- */
const blobToDataURL = b => new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = () => rej(r.error); r.readAsDataURL(b); });
async function exportAll() {
  const [decks, cards, images, logRec] = await Promise.all([dbAll('decks'), dbAll('cards'), dbAll('images'), dbGet('meta', 'log')]);
  const imgs = await Promise.all(images.map(async i => ({ id: i.id, w: i.w, h: i.h, data: await blobToDataURL(i.blob) })));
  const json = JSON.stringify({ app: 'taalflitser', version: 1, decks, cards, images: imgs, log: logRec ? logRec.value : {} });
  const a = h('a', { href: URL.createObjectURL(new Blob([json], { type: 'application/json' })), download: 'taalflitser-' + dayKey() + '.json' });
  document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  toast(t('exported'));
}
async function importAll(file) {
  try {
    const data = JSON.parse(await file.text());
    if (data.app !== 'taalflitser' || !Array.isArray(data.cards) || !Array.isArray(data.decks) || !Array.isArray(data.images)) throw new Error('format');
    const imgs = await Promise.all(data.images.map(async i => ({ id: i.id, w: i.w, h: i.h, blob: await (await fetch(i.data)).blob() })));
    const logRec = (await dbGet('meta', 'log')) || { key: 'log', value: {} };
    for (const [k, v] of Object.entries(data.log || {})) logRec.value[k] = Math.max(logRec.value[k] || 0, v);
    await batch(['decks', 'cards', 'images', 'meta'], (d, c, i, m) => {
      data.decks.forEach(x => d.put(x)); data.cards.forEach(x => c.put(x)); imgs.forEach(x => i.put(x)); m.put(logRec);
    });
    urlCache.clear();
    toast(t('imported', data.cards.length));
    route();
  } catch (e) { console.error(e); toast(t('importFail')); }
}

/* ---------- global wiring ---------- */
window.addEventListener('hashchange', route);
window.addEventListener('dragover', e => e.preventDefault());
window.addEventListener('drop', e => {
  e.preventDefault();
  if (currentDeckId && !document.querySelector('dialog[open]') && e.dataTransfer && e.dataTransfer.files.length) handleFiles([...e.dataTransfer.files], currentDeckId);
});
window.addEventListener('paste', e => {
  if (!currentDeckId || document.querySelector('dialog[open]')) return;
  const files = [...(e.clipboardData ? e.clipboardData.files : [])].filter(f => f.type.startsWith('image/'));
  if (files.length) { e.preventDefault(); handleFiles(files, currentDeckId); }
});
$('#btn-lang').addEventListener('click', () => {
  lang = lang === 'en' ? 'nl' : 'en';
  try { localStorage.setItem('tf-lang', lang); } catch (e) { /* ignore */ }
  route();
});
$('#btn-theme').addEventListener('click', () => {
  const dark = document.documentElement.dataset.theme !== 'dark';
  if (dark) document.documentElement.dataset.theme = 'dark'; else delete document.documentElement.dataset.theme;
  try { localStorage.setItem('tf-theme', dark ? 'dark' : 'light'); } catch (e) { /* ignore */ }
});
$('#btn-theme').setAttribute('aria-label', 'Invert colours');

openDB().then(d => { db = d; route(); }).catch(err => {
  console.error(err);
  app.replaceChildren(h('p', { class: 'empty' }, 'Storage is unavailable in this browser mode (private window?).'));
});
