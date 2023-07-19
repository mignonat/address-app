J'ai du passer en tout un 17 heures sur ce projet en 4 ou 5 sessions de travail.

Stack:
 - Typescript
 - React
 - Framework UI material-ui : https://mui.com/
 - Maplibre

Je n'ai pas utilisé mon setup de build habituel car c'est une usine non adapté pour cette simple page.

J'ai créé l'application avec react-create-app.

Non traité pour ce petit exercice:
 - Pas de gestion de plusieurs locales (c'est agréable de ne pas tout traduire ...)
 - Pas besoin de router ici
 - Pour prévenir le user d'erreurs, j'utilise simplement alert, je sais, c'est le mal absolu, mais pour ce petit exercice ca suffit, je n'allais pas mettre en place un service d'affichage pour ça.
 - J'ai laissé <React.StrictMode>, mais je l'aurais enlevé pour la prod
 - Je ne me suis pas amusé avec les couleurs, j'ai laissé les couleurs de theme par defaut de [Material-ui](https://mui.com/material-ui/)

Je charge la librairie turf de manière asynchrone, sinon elle alourdi significativement la taille du bundle.

Repertoire dans src:
  - app: contient ce qui est relatif au niveau applicatif
  - geo: contient tout ce qui se rapporte au code qui est propre au geospatiale
  - map: ce qui concerne maplibre
  - resources: images, json, etc... pour ce projet que images ..
  - ui: UI reutilisable utilisable par tous les autres répertoires

Les calls au serveur sont fait uniquement dans un fichier repository.ts, ici c'est simple il n'y en a qu'un, dans le repertoire geo.

Après avoir analysé un peu le besoin, et quand j'ai vu que l'API retourné des features, je me suis motivé pour utiliser une map, c'est quand même bien mieux.

J'ai commencé par écrire l'interface du repository, puis je l'ai implémenté et testé en écrivant ses tests d'intégrations, ce qui m'a permis de jouer un peu avec l'API et de me familiariser avec.

Une fois que j'ai eu une meilleure comprehension de l'API, j'ai commençé le UI.

Je suis habitué à Mapbox V2, mais il faut une clé d'API pour utiliser leurs styles, alors j'ai testé maplibre, fork de Mapbox V1, qui semble pas trop mal fonctionner.

J'utilise toujours Redux dans mes applications, car je design en API, et cela permet de découpler les components de mes methodes de services (que je peux tester facilement ainsi), mais pour ce simple exercice je n'en avais pas besoin. J'ai donc utiliser simplement utilisé React reducer pour propager un state global, qui se limite aux components. Je découpe les reducers par fonctionnalité, mais ici pour une seule page j'ai laissé un seul reducer global.

Les recherches sont paginés pour éviter un bug de perf avec les gros résultats (même si la limite max au niveau de l'API n'est que de 100).

J'ai décidé d'afficher toutes les communes sur la carte pour un departement car je sais que pour Mapbox même 5000 feature s'affichent sans soucis, et j'ai vérifié le département qui en a le plus, le Nord pas de calais, n'en possède que 890.

Les idées non implémentées par manque de temps:
 - Rendre responsive pour les petits écrans. Dans ce cas j'aurais mis le panel fix sur la gauche (qui slide de gauche a droite), et qui se déplie pour rechercher/explorer, puis se repli tout seul quand on clique sur une ligne de résultat d'une liste pour afficher la map. Mais comme ce n'était pas un pré-requis de l'énoncé je n'ai pas passé mon temps dessus.
 - J'aurais mis un slider horizontal pour faire une transition entre la vue "toutes les régions" et la vue "Détail d'un département" (dans le tab explorer), mais là je suis resté simple pour pas perdre de temps.
 - Mettre une légende pour comprendre ce qui est affiché
 - Permettre de filtrer rapidement les résultats de recherche sur le nom (un input en haut à droite des listes), ca serait fait client side.
 - Pouvoir sélectionner/déselectionner dans la liste en cliquant sur la carte, compliqué avec le scope limité aux component de react reducer, mais serait simple avec Redux qui a un scope applicatif
 - Mettre au moins un dark theme, material-ui permet de faire ce que l'on veux mais pas le temps dans le scope de ce projet.

Pour les warnings dans la console:
 - Cannot update a component (`App`) while rendering a different component  => après debbugage il en ressort que je ne les aurais pas eu si j'avais utilisé Redux (le scope limité au component de react reducer m'embête), alors je n'ai pas perdu de temps avec, c'est en rapport avec la popup sur la map.
 - "text-field" requires a style "glyphs" property => le style que j'utilise ("https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json") est censé déclarer un glyph, j'ai vérifié il le fait bien, mais j'ai quand même le warning. Je n'ai pas perdu de temps sur ça

Pour finir, le logo (la loupe en SVG) ce n'est pas mon oeuvre mais celle d'un ami qui me l'a fait rapido suite a ma demande.
