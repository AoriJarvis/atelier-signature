const selections = [
  ['A2 · C1 · D2 · D3 · G1','01'],
  ['G4 · N2 · N4 · N5 · P1','02'],
  ['P3 · Q1 · Q2 · Q3 · S1','03'],
  ['U2 · W5 · Y5 · AA2 · AA5','04'],
  ['AC1 · AD1 · AF1 · AF2 · AI3','05'],
  ['AJ3 · AJ4 · AM1 · AO1 · AP3','06'],
  ['AQ1 · AR2 · AS3 · AU1 · BA1','07']
];
const rawGrid = document.querySelector('#rawGrid');
const mockupGrid = document.querySelector('#mockupGrid');

const plate = ({src,title,ref,kind}) => {
  const article = document.createElement('article');
  article.className = 'plate';
  article.dataset.kind = kind || 'raw';
  article.innerHTML = `<button type="button" data-view="${src}" data-title="${title}"><img src="${src}" alt="${title}" loading="lazy" decoding="async"></button><p class="caption"><b>${ref}</b><span>${title}</span></p>`;
  return article;
};

selections.forEach(([codes,n]) => rawGrid.append(plate({
  src:`assets/selection-${n}.webp`, title:codes, ref:`Planche ${n} / 07`
})));

['paper','material'].forEach((kind) => selections.forEach(([codes,n]) => mockupGrid.append(plate({
  src:`assets/${kind}-${n}.webp`, title:codes, ref:`${kind === 'paper' ? 'Papeterie' : 'Matières'} ${n} / 07`, kind
}))));

document.querySelectorAll('.filters button').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filters button').forEach(b => b.classList.toggle('is-active', b === button));
  const filter = button.dataset.filter;
  document.querySelectorAll('#mockupGrid .plate').forEach(item => item.hidden = filter !== 'all' && item.dataset.kind !== filter);
}));

const index = document.querySelector('#index');
const indexToggle = document.querySelector('.index-toggle');
const closeIndex = () => { index.classList.remove('is-open'); index.setAttribute('aria-hidden','true'); indexToggle.setAttribute('aria-expanded','false'); };
indexToggle.addEventListener('click', () => { index.classList.add('is-open'); index.setAttribute('aria-hidden','false'); indexToggle.setAttribute('aria-expanded','true'); });
document.querySelector('.index-close').addEventListener('click', closeIndex);
index.querySelectorAll('a').forEach(a => a.addEventListener('click', closeIndex));

const dialog = document.querySelector('#lightbox');
const dialogImg = dialog.querySelector('img');
const dialogCaption = dialog.querySelector('figcaption');
let views = [];
let current = 0;
const refreshViews = () => views = [...document.querySelectorAll('[data-view]')].filter(x => !x.closest('[hidden]'));
const show = index => { refreshViews(); current = (index + views.length) % views.length; dialogImg.src = views[current].dataset.view; dialogImg.alt = views[current].dataset.title; dialogCaption.textContent = views[current].dataset.title; };
document.addEventListener('click', e => { const trigger = e.target.closest('[data-view]'); if (!trigger) return; refreshViews(); show(views.indexOf(trigger)); dialog.showModal(); });
dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
dialog.querySelector('.lightbox-prev').addEventListener('click', () => show(current - 1));
dialog.querySelector('.lightbox-next').addEventListener('click', () => show(current + 1));
dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
document.addEventListener('keydown', e => { if (!dialog.open) return; if (e.key === 'ArrowLeft') show(current - 1); if (e.key === 'ArrowRight') show(current + 1); });
