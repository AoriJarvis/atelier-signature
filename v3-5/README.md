# Atelier Signature — Site web

## Quoi
Site web multi-sections one-page pour Atelier Signature (AS), studio d'orchestration
de savoir-faire artisanaux (marque de Studio AORI). Traduit en site le deck stratégique
"Core & Business MVP" fourni par l'utilisateur (contenu récupéré via captures d'écran,
le .docx source étant hors périmètre JARVIS sur le Desktop).

## Pour qui
Usage interne + démonstration : présenter AS à des clients/prescripteurs, artisans et
partenaires potentiels. Trois portes d'entrée identifiées dans le brief : client/
prescripteur, artisan/savoir-faire, partenaire/professionnel.

## Livrable
Un site HTML/CSS/JS natif, responsive, reprenant les sections du deck :
idée centrale, proposition de valeur, positionnement, modèle (deux faces, rôle de la
marque), méthode, réseau d'artisans, fondateurs, modèles de collection, Collection 01
Suisse, parcours client, ambition, essentiel.

## Critère de réussite
- Toutes les sections du deck sont représentées fidèlement (pas d'invention de contenu).
- Site responsive (mobile/desktop), navigable, cohérent avec l'identité noir/beige/or
  vue dans le deck.
- Ouvert et vérifié dans le navigateur avant livraison.

## État actuel
Version 2 livrée, reconstruite d'après le vrai brief UX (`site_internet.docx`, débloqué
après ajustement du garde JARVIS — voir `DECISIONS.md`). Architecture multi-pages :
`index.html` (Home, narration en 12 écrans), `approach.html`, `collection.html`,
`about.html`, `projects.html`, `contact.html` (formulaire progressif, action `mailto:`).
Design system dédié (`css/style.css`, polices auto-hébergées dans `assets/fonts/`) :
direction éditoriale/architecturale, motif signature = la ligne topographique suisse de
la Collection 01, une seule couleur d'accent (oxyde), aucun gold/beige-luxury.

Vérifié dans le navigateur (desktop 1280px, mobile 375px, menu, formulaire, focus,
sections sombres). Serveur de prévisualisation déclaré dans `.claude/launch.json` sous
le nom `atelier-signature` (port 8421).

Rien n'est inventé : aucun client, projet livré ou chiffre ne figure sur le site — tout
est étiqueté Concept conformément à la section 31 du brief.
