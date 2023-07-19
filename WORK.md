J'ai du passer en tout un 17 heures sur ce projet en 4 ou 5 sessions de travail.

# Stack techno
 - Typescript
 - React
 - Framework UI [Material-ui](https://mui.com/)
 - [Maplibre](https://maplibre.org/)
 - [Turf](https://turfjs.org/)

**Maplibre** => Pour la carto je suis habitué à Mapbox V1 et V2, mais il faut une clé d'API pour utiliser leurs styles. J'ai donc testé maplibre, un fork de Mapbox V1 open source, et cette lib semble bien fonctionner.

**Turf** => utilisé pour faire des calculs geospatial, ici utilisé pour 2 choses:
 - calculer le centroid d'un polygon
 - calculer le boundary box d'un array de feature 

# Introduction

Je n'ai pas utilisé mon setup de build habituel, car c'est une usine non adapté pour cette simple page.

J'ai simplement créé l'application en utilisant [react-create-app](https://create-react-app.dev/).

Ce que je n'ai pas traité pour ce petit exercice:
 - Mise en place d'un build paramétrable, d'ailleurs j'ai laissé <React.StrictMode> pour mon dev, mais je l'aurais enlevé pour la prod.
 - Gestion de plusieurs locales (c'est agréable de ne pas tout traduire ...)
 - Pas besoin de router
 - Pour poper les erreurs, j'utilise simplement alert, pour ce petit exercice ca suffit, mais habituellement j'aurais utilisé mon service d'affichage.
 - Je n'ai pas joué avec les couleurs, j'ai utilisé celles du theme par defaut de [Material-ui](https://mui.com/material-ui/)

Le logo (la loupe en SVG) ce n'est pas mon oeuvre mais celle d'un ami qui me l'a fait suite a ma demande.

Je charge la librairie turf de manière asynchrone, sinon elle alourdi significativement la taille du bundle.

La page se sépare en deux fonctionnalités :
 - SEARCH : le tab ou l'on recherche en saisissant l'adresse
 - EXPLORE : le tab ou l'on parcours les regions et departements

On retrouve partout les noms "search" et "explore" dans le code source pour faire référence à ces deux fonctionnalités.

# CSS

J'utilise un seul fichier css "global", dans src/app/components/App.css. Material-ui propose de pouvoir définir en JSX un style global mais comme create-react-app avait déjà créé le fichier je l'ai utilisé. 

Je charge au démmarage une Google font "Poppins", puis j'applique une sorte de reset css (que je traîne depuis longtemps dans mes projets).

Pour le style des components, j'utilise la propriété "sx", présente sur tous les composants de Material-ui. Cette propriété prend du JSX, et à l'execution material génère une classe CSS dynamique qui est appliqué aux éléments du DOM correspondant au component.

Pour acceder au theme de material, rien de plus simple au lieu de passer un string on passe une fonction, et le parametre d'entrée est le theme. Ex:
 - color: "#f2f2f2" // sans theme
 - color: theme => theme.palette.text.primary // utilisera la couleur text primary du theme qui est actif

# React

J'utilise React reducer au lieu de Redux (c'était l'occasion que je l'essaye enfin ...)

J'utilise React.memo pour éviter de refresh si les props ne changent pas

Je suis partisant de l'utilisation de plusieurs useEffect dans un même component, suivant le besoin. C'est une bonne pratique qui permet le fameux "separation of concern". Et puis si on ne le fait pas on finit avec des useEffect indebuggable car trop compliqué.

# Conventions

 - J'organise le code en feature, ici il n'y en avait pas beaucoup
 - Pour chaque feature:
   - Tous les calls au serveur sont font dans un fichier repository.ts. Ici c'est simple il n'y en avait besoin que dans la feature geo.
   - Les composants React dans un repertoire "components"
   - Les tests dans un repertoire "test"
   - La logique qui n'est pas de la logique de controleur, et donc reutilissble, dans un repertoire tools 
   - La logique de controleur directement dans les composants.
   - Un fichier model.ts qui centralise pour chaque feature ses constantes, ses enum, ses types et ses interfaces. Seule exception les interfaces pour les props des components restent dans le component (elles sont souvent modifiés c'est plus pratique de les avoir sous le coude).
   - Quand j'utilise redux chaque feature a son repertoire store dans lequel je mets 3 fichiers :
     - state => state par default
     - reducer => reducer de la feature
     - actions => actions typé de la feature

# Présentation des répertoires dans src:
  - app: (feature) contient ce qui est relatif au niveau applicatif (SPA)
  - geo: (feature) contient tout ce qui se rapporte au code qui est propre au geospatiale
  - map: (feature) ce qui concerne maplibre
  - resources: contient les ressources statiques du projet, ex: images, json, etc...
  - ui: (feature) UI reutilisable utilisable par tous les autres répertoires

# Methodologie

Après avoir analysé un peu le besoin, et quand j'ai vu que l'API retourné des features, j'ai opté pour l'utilisation d'une map.

J'ai commencé par écrire l'interface du repository geo, puis je l'ai implémenté en écrivant ses tests d'intégrations, ce qui m'a permis de jouer un peu avec l'API et de me familiariser avec.

Une fois que j'ai eu une meilleure comprehension de l'API, j'ai pu commençer le UI.

J'utilise toujours Redux dans mes applications, car je design en API, et cela permet de découpler les components de mes methodes de services (que je peux tester facilement ainsi), mais pour ce simple exercice je n'en avais pas besoin. J'ai donc utiliser simplement utilisé React reducer pour propager un state global, qui se limite aux components. Je découpe les reducers par fonctionnalité, mais ici pour une seule page j'ai laissé un seul reducer global.

Les recherches sont paginés pour éviter un bug de perf avec les gros résultats (même si la limite max au niveau de l'API n'est que de 100).

J'ai décidé d'afficher toutes les communes sur la carte pour un departement car je sais que pour Mapbox même 5000 feature s'affichent sans soucis, et j'ai vérifié le département qui en a le plus, le Nord pas de calais, n'en possède que 890.

# TODO par manque de temps

## Les idées non implémentées:
 - Rendre responsive pour les petits écrans. Dans ce cas j'aurais mis le panel fix sur la gauche (qui slide de gauche a droite), et qui se déplie pour rechercher/explorer, puis se repli tout seul quand on clique sur une ligne de résultat d'une liste pour afficher la map. Mais comme ce n'était pas un pré-requis de l'énoncé je n'ai pas passé mon temps dessus.
 - J'aurais mis un slider horizontal pour faire une transition entre la vue "toutes les régions" et la vue "Détail d'un département" (dans le tab explorer), mais là je suis resté simple pour pas perdre de temps.
 - Mettre une légende pour comprendre ce qui est affiché
 - Permettre de filtrer rapidement les résultats de recherche sur le nom (un input en haut à droite des listes), ca serait fait client side.
 - Pouvoir sélectionner/déselectionner dans la liste en cliquant directement sur la carte, mais trop compliqué avec le scope limité aux components de react reducer, mais ca serait très simple avec Redux qui a un scope applicatif
 - Mettre au moins un dark theme, material-ui permet de faire ce que l'on veux mais pas le temps dans le scope de ce projet.

## Pour les warnings dans la console:
 - Cannot update a component (`App`) while rendering a different component  => après debbugage il en ressort que je ne les aurais pas eu si j'avais utilisé Redux (le scope limité au component de react reducer m'embête), alors je n'ai pas perdu de temps avec, c'est en rapport avec la popup sur la map.
 - "text-field" requires a style "glyphs" property => le style que j'utilise ("https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json") est censé déclarer un glyph, j'ai vérifié il le fait bien, mais j'ai quand même le warning. Je n'ai pas perdu de temps pour ça.
