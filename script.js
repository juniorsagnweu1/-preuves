/* script.js
 - Mobile menu toggle
 - submenu accessibility
 - chargement de site-index.json pour recherche client-side
 - recherche simple (tokenize + score)
*/

const INDEX_URL = 'site-index.json';

// DOM refs
const mobileBtn = document.getElementById('mobileMenuBtn');
const nav = document.getElementById('mainNav');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const resultsSection = document.getElementById('searchResults');
const resultsList = document.getElementById('resultsList');
const searchSummary = document.getElementById('searchSummary');

// mobile toggle
if(mobileBtn && nav){
  mobileBtn.addEventListener('click', () => {
    const expanded = mobileBtn.getAttribute('aria-expanded') === 'true';
    mobileBtn.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('mobile-show');
  });
}

// submenu toggle buttons
document.querySelectorAll('.submenu-toggle').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    const parent = btn.parentElement;
    const submenu = parent.querySelector('.sub');
    if(!submenu) return;
    submenu.style.display = expanded ? 'none' : 'block';
  });
});

let SITE_INDEX = [];

// load index json
fetch(INDEX_URL)
  .then(r => r.ok ? r.json() : Promise.reject('index not found'))
  .then(j => { SITE_INDEX = j; })
  .catch(err => {
    console.warn('Impossible de charger site-index.json — la recherche locale sera limitée.', err);
    SITE_INDEX = [];
  });

// utils
function tokenize(s){ return String(s || '').toLowerCase().trim().split(/\s+/).filter(Boolean); }
function escapeHtml(s){ return String(s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function scoreItem(item, tokens){
  const hay = (item.title + ' ' + (item.description || '') + ' ' + (item.content || '')).toLowerCase();
  let score = 0;
  tokens.forEach(t => { if(hay.includes(t)) score += (t.length > 3 ? 10 : 3); });
  return score;
}
function search(query){
  const tokens = tokenize(query);
  if(tokens.length === 0) return [];
  return SITE_INDEX
    .map(it => ({...it, score: scoreItem(it, tokens)}))
    .filter(i => i.score > 0)
    .sort((a,b) => b.score - a.score);
}

// handle search
if(searchForm){
  searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const q = searchInput.value.trim();
    const results = search(q);
    resultsList.innerHTML = '';
    if(results.length === 0){
      resultsList.innerHTML = `<li>Aucun résultat pour «${escapeHtml(q)}»</li>`;
    } else {
      results.forEach(r => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${r.url}">${escapeHtml(r.title)}</a>
          <div class="muted small">${escapeHtml(r.description || r.content || '')}</div>`;
        resultsList.appendChild(li);
      });
    }
    searchSummary.textContent = `${results.length} résultat(s) pour «${q}»`;
    resultsSection.hidden = false;
    window.scrollTo({top: document.getElementById('main').offsetTop - 10, behavior: 'smooth'});
  });
}

// footer year
const yearEl = document.getElementById('year');
if(yearEl) yearEl.textContent = new Date().getFullYear();
