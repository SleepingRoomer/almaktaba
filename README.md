# Al Maktaba

La bibliothèque ouverte d'Al Maydan : livres, articles, films, documentaires, vidéos, podcasts, personnalités, associations, initiatives et événements, « pour une élévation spirituelle, culturelle et intellectuelle ». Les ressources sont proposées par la communauté et relues avant publication.

Site : https://sleepingroomer.github.io/almaktaba/

## Organisation

```
index.html        la page et sa feuille de style
assets/data.js    les ressources (window.AM)
assets/app.js     l'application, compilée depuis src/app.jsx
src/app.jsx       le code source (React, routes par #)
build.sh          recompile assets/app.js
```

Pour ajouter une ressource, ajoutez un bloc dans `assets/data.js`. Pour modifier les pages, modifiez `src/app.jsx` puis lancez `npm install esbuild` (une fois) et `./build.sh`.

React 18 est chargé depuis cdnjs ; les polices (Cormorant Garamond, Spectral, Amiri) depuis Google Fonts.
