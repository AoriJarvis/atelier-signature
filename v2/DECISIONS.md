# Décisions — Atelier Signature (site web)

## 2026-08-27 — Pivot après lecture du brief réel (site_internet.docx)

**Constat.** La v1 du site avait été construite à partir des captures d'écran du deck
(images postées dans la conversation), sans accès aux .docx sources. Une fois l'accès
débloqué, `260827_ATELIER SIGNATURE_site_internet.docx` s'est révélé être un brief UX
complet et très directif — pas une simple retranscription du deck. Il spécifie :
- une architecture multi-pages (Home + Projects, Collection, Approach, About, Contact),
  pas un one-page qui empile les 25 slides du deck ;
- une Home construite comme narration progressive en 12 écrans précis (objectif, message,
  contenu, visuel, interaction, CTA définis pour chacun) ;
- une direction visuelle explicitement **anti-luxe-générique** : le brief liste noir sur
  blanc les clichés à éviter — « beige luxury générique, dorures omniprésentes, esthétique
  hôtel cinq étoiles, photos stock d'artisans, typographie serif utilisée uniquement pour
  faire luxe, site portfolio d'architecte interchangeable ». La v1 (noir/beige/or, serif
  décoratif partout) reproduisait exactement ce que le brief demande d'éviter.
- direction demandée à la place : éditorial, architectural, matériel, précis, contemporain,
  sobre. « Show, don't explain » et « matter before people ».
- contenu à ne jamais inventer : clients, réalisations, chiffres, témoignages (§31). Toute
  visualisation non réelle doit être étiquetée Concept/Study/In development.

**Décision.** Reconstruction du site selon ce brief plutôt que la lecture littérale du
deck. Nouvelle direction visuelle « plan technique / atelier » : papier légèrement froid
(pas de crème luxe), grille technique fine, repères d'angle façon calque, étiquettes en
police mono façon cotation de plan, une seule couleur d'accent (oxyde/terracotta — matière,
pas métal précieux). Réservé le serif (Fraunces) aux seules phrases-thèse de la marque
(hero, inversion du modèle, north star), jamais en décoration générale — conforme à la
mise en garde explicite du brief contre le serif "pour faire luxe".

**Polices.** Auto-hébergées (`assets/fonts/`, woff2 récupérés depuis Google Fonts,
licence OFL) : Archivo (corps/UI), Fraunces (phrases-signature uniquement), IBM Plex Mono
(étiquettes, cotations, labels techniques). Choix justifié par la direction "architectural,
précis" du brief — pas un choix par défaut.

**Ce qui reste MVP / non construit.** Le formulaire de contact n'a pas de backend (aucun
serveur fourni) — il utilise une action `mailto:` transparente, pas de simulation de
soumission réussie. Les pages Projects/Collection ne montrent aucune réalisation inventée :
tout y est étiqueté Concept ou Territoire, conformément à la section 31 du brief.

