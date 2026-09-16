const selections = [
  ['A2 · C1 · D2 · D3 · G1','01'],
  ['G4 · N2 · N4 · N5 · P1','02'],
  ['P3 · Q1 · Q2 · Q3 · S1','03'],
  ['U2 · W5 · Y5 · AA2 · AA5','04'],
  ['AC1 · AD1 · AF1 · AF2 · AI3','05'],
  ['AJ3 · AJ4 · AM1 · AO1 · AP3','06'],
  ['AQ1 · AR2 · AS3 · AU1 · BA1','07']
];

const families = [
  {
    id:'01', title:'L’initiale comme matière',
    codes:['A2','C1','AD1','AF1','AI3','AJ3','AM1'],
    value:'Création × fabrication',
    text:'Le A n’est plus une initiale décorative. Il est découpé, plié ou mis en tension comme une pièce sortie de l’atelier. Le dessin et la fabrication apparaissent dans un même geste.'
  },
  {
    id:'02', title:'L’assemblage central',
    codes:['W5','S1','AC1','AF2'],
    value:'Médiation × équilibre',
    text:'Deux éléments autonomes trouvent leur justesse autour d’un point de liaison. La famille traduit le rôle d’Atelier Signature : devenir l’interface active entre l’intention, l’artisan et la réalisation.'
  },
  {
    id:'03', title:'Le bloc architectural',
    codes:['D2','D3','Q2','Q3','U2','AQ1','AU1'],
    value:'Structure × précision',
    text:'Le nom se comporte comme une construction : lignes porteuses, masses, vides et alignements. Le logotype ne flotte pas sur son support ; il l’organise avec une présence compacte et maîtrisée.'
  },
  {
    id:'04', title:'La jointure productive',
    codes:['G1','G4','N2','N4','N5','P1','P3'],
    value:'Co-conception × savoir-faire',
    text:'La singularité apparaît exactement au raccord entre les lettres. Cette transformation typographique raconte une conviction fondatrice : les meilleures formes naissent du dialogue avec ceux qui savent fabriquer.'
  },
  {
    id:'05', title:'La signature collective',
    codes:['Q1','Y5','AA2','AA5','AJ4','AP3'],
    value:'Autorité × silence',
    text:'Aucun emblème supplémentaire : le nom assume seul sa fonction de label. Le prestige vient de la proportion, du rythme et de la retenue — une signature portée par un collectif plutôt que par un auteur unique.'
  },
  {
    id:'06', title:'Le repère contemporain',
    codes:['AO1','AR2','AS3','BA1'],
    value:'Clarté × système',
    text:'Une écriture plus rationnelle et immédiatement reproductible relie les plans, les devis, le chantier et le digital. L’identité devient un outil commun, stable et lisible pour tous les interlocuteurs.'
  }
];

const mockupGrid = document.querySelector('#mockupGrid');
const familyList = document.querySelector('#familyList');

families.forEach(family => {
  const article = document.createElement('article');
  article.className = 'family';
  article.id = `family-${family.id}`;
  article.innerHTML = `
    <header class="family-head">
      <p class="family-number">${family.id}</p>
      <div><p class="family-value">${family.value}</p><h3>${family.title}</h3></div>
      <p class="family-codes">${family.codes.join(' · ')}</p>
    </header>
    <div class="family-body">
      <p>${family.text}</p>
      <a href="#applications">Voir les applications <span>↓</span></a>
    </div>
    <div class="family-visuals">
      <figure><img src="assets/families/family-${family.id}.webp" alt="Propositions de la famille ${family.title}" loading="lazy"><figcaption>Formes / ${family.codes.length} propositions</figcaption></figure>
      <figure><img src="assets/families/family-${family.id}-mockups.webp" alt="Projections de la famille ${family.title}" loading="lazy"><figcaption>Épreuves / sélection papetière</figcaption></figure>
    </div>`;
  familyList.append(article);
});

const plate = ({src,title,ref,kind}) => {
  const article = document.createElement('article');
  article.className = 'plate';
  article.dataset.kind = kind || 'raw';
  article.innerHTML = `<button class="plate-view" type="button" data-view="${src}" data-title="${title}" aria-label="Agrandir ${ref}"><img src="${src}" alt="${ref} — ${title}" loading="lazy" decoding="async"></button><p class="caption"><b>${ref}</b><span>${title}</span></p>`;
  return article;
};

['paper','material'].forEach(kind => selections.forEach(([codes,n]) => mockupGrid.append(plate({
  src:`assets/mockups-clean/${kind}-${n}.webp`, title:codes,
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
  const container = trigger.closest('#mockupGrid');
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
