Stack:
 - Typescript
 - React
 - Framework UI material-ui : https://mui.com/
 - Maplibre

Creation de l'application avec react-create-app. D'habitude j'utilise un setup perso de build paramétrable avec gulp et webpack, mais pour une page ca aurait été trop compliqué pour rien.

Non traité pour ce petit exercice:
 - J'ai laissé les noms des datas en Français (code, nom, etc...), mais je ne l'aurais pas fait en réel
 - Pas de router ici, car pas besoin
 - Pas de gestion de plusieurs locale
 - J'utilise simplement alert (c'est mal ...) pour logguer les messages d'erreur pour ne pas avoir a mettre en place un service d'affichage 

Repertoire dans src:
  - app: contient ce qui est relatif au niveau applicatif
  - geo: contient tout ce qui se rapporte au code qui est propre au geospatiale
  - ui: UI reutilisable par tous les autres repertoires
  - resources: images, json, etc...

Les calls au serveur sont fait uniquement dans un fichier repository.ts.

Ici c'est simple, un seul repository pour les datas, celui dans le repertoire geo.

Après avoir analysé le besoin j'ai écris l'interface, puis je l'ai implémenté.

Enfin j'ai testé et écrit des tests pour chaque fonctions avant d'aller plus loin.

J'ai commençé le UI en décidant d'utiliser une carte pour proposer une meilleure experience UX. Je suis habitué à Mapbox V2, mais il faut une clé d'API pour utiliser leurs styles, alors j'ai décider de tester maplibre (fork de Mapbox V1), qui semble pas trop mal fonctionner.

J'utilise toujours Redux dans mes applications, car je design en API, et cela permet de découpler les components des methodes de services (que je peux tester facilement ainsi), mais pour ce simple exercice je n'en avais pas besoin. J'ai donc utiliser simplement utilisé React reducer pour propager un state global, qui se limite aux components.

Pour le state globale, d'habitude je découpe les reducers par fonctionnalité, mais ici pas besoin pour une seule page j'ai laissé un seul reducer.

Les recherches sont paginés pour éviter un bug de perf avec de tros gros résultat.

Je n'ai pas mis de theme en place pour ce petit projet mais material-ui permet de faire ce que l'on veux.

