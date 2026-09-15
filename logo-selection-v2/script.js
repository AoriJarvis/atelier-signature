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
  article.innerHTML = `<button class="plate-view" type="button" data-view="${src}" data-title="${title}" aria-label="Agrandir ${ref}"><img src="${src}" alt="${ref} — ${title}" loading="lazy" decoding="async"></button><p class="caption"><b>${ref}</b><span>${title}</span></p>`;
  return article;
};

selections.forEach(([codes,n]) => rawGrid.append(plate({
  src:`../logo-selection/assets/selection-${n}.webp`, title:codes, ref:`Planche ${n} / 07`, kind:'raw'
})));

['paper','material'].forEach(kind => selections.forEach(([codes,n]) => mockupGrid.append(plate({
  src:`../logo-selection/assets/${kind}-${n}.webp`, title:codes,
  ref:`${kind === 'paper' ? 'Papier' : 'Matière'} ${n} / 07`, kind
}))));

document.querySelectorAll('.filters button').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filters button').forEach(item => item.classList.toggle('is-active', item === button));
  const filter = button.dataset.filter;
  document.querySelectorAll('#mockupGrid .plate').forEach(item => {
    item.hidden = filter !== 'all' && item.dataset.kind !== filter;
  });
}));

const indexPanel = document.querySelector('#index');
const indexToggle = document.querySelector('.index-toggle');
const indexClose = document.querySelector('.index-close');
const setIndex = open => {
  indexPanel.classList.toggle('is-open', open);
  indexPanel.setAttribute('aria-hidden', String(!open));
  indexToggle.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('index-open', open);
  if (open) indexClose.focus(); else indexToggle.focus();
};
indexToggle.addEventListener('click', () => setIndex(!indexPanel.classList.contains('is-open')));
indexClose.addEventListener('click', () => setIndex(false));
indexPanel.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setIndex(false)));

const dialog = document.querySelector('#lightbox');
const dialogImg = dialog.querySelector('img');
const dialogCaption = dialog.querySelector('figcaption');
const dialogLabel = dialog.querySelector('.lightbox-head p');
let views = [];
let current = 0;

const galleryFor = trigger => {
  const container = trigger.closest('#rawGrid') || trigger.closest('#mockupGrid');
  return [...container.querySelectorAll('[data-view]')].filter(item => !item.closest('[hidden]'));
};
const show = next => {
  current = (next + views.length) % views.length;
  const item = views[current];
  dialogImg.src = item.dataset.view;
  dialogImg.alt = item.dataset.title;
  dialogCaption.textContent = item.dataset.title;
  dialogLabel.textContent = `${String(current + 1).padStart(2,'0')} / ${String(views.length).padStart(2,'0')}`;
};
document.addEventListener('click', event => {
  const trigger = event.target.closest('[data-view]');
  if (!trigger) return;
  views = galleryFor(trigger);
  show(views.indexOf(trigger));
  dialog.showModal();
});
dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
dialog.querySelector('.lightbox-prev').addEventListener('click', () => show(current - 1));
dialog.querySelector('.lightbox-next').addEventListener('click', () => show(current + 1));
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
document.addEventListener('keydown', event => {
  if (indexPanel.classList.contains('is-open') && event.key === 'Escape') setIndex(false);
  if (!dialog.open) return;
  if (event.key === 'ArrowLeft') show(current - 1);
  if (event.key === 'ArrowRight') show(current + 1);
});
