---
title: Composant Icône
---

## Présentation

Le composant Icône est l'un des composants de base disponibles. Conjointement aux composants Image** et Bloc, il permet de représenter les composants cloud qui ne sont pas encore disponibles.

{{< img src="cloudcraft/components-common/icon/component-icon.png" alt="Capture d'écran d'une représentation 3D du composant Icône dans Cloudcraft" responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez une couleur d'arrière-plan et d'icône prédéfinie ou saisissez la valeur hexadécimale de la couleur de votre choix. Vous pouvez utiliser les mêmes couleurs pour les vues 2D et 3D ou des couleurs différentes.
- **Icon set** : sélectionnez le jeu d'icônes contenant l'icône souhaitée. Jeux acceptés : AWS, AWS (ancien), Azure et Font Awesome.
- **Icon name** : le nom de l'icône utilisé dans le diagramme. Ce champ permet également de rechercher les icônes disponibles.
- **Toggle 3D/2D projection** : affichez l'icône dans une vue 2D ou 3D lorsque le diagramme est en vue 3D. Non disponible pour les diagrammes 2D.
- **Toggle flat/standing projection** : affichez l'étiquette à plat ou debout. Non disponible lorsque la projection 2D est activée ou sur les diagrammes 2D.
- **Size** : augmentez ou diminuez la taille d'une icône.
- **Rotate item** : faites pivoter une icône et modifiez son orientation.
- **Raise** : placez le composant Icône sur les autres icônes.
- **Lower** : placez le composant Icône sous les autres icônes.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON. Voici un exemple d'objet JSON d'un composant Icône :

```json
{
  "type": "icon",
  "id": "a65bf697-3f17-46dd-8801-d38fcc3827b6",
  "mapPos": [4.5, 13.5],
  "iconSet": "fa",
  "name": "firefox",
  "iconSize": 6,
  "isometric": true,
  "standing": false,
  "direction": "down",
  "color": {
    "2d": "#ffffff",
    "isometric": "#ffffff"
  },
  "background": {
    "2d": "#000000",
    "isometric": "#0e141f"
  },
  "link": "blueprint://5dccf526-bb9b-44ba-abec-3b5e7c8076a6",
  "locked": true
}
```

- **type: icon** : le type de composant.
- **id: chaîne** : un identifiant unique pour le composant au format `uuid`.
- **mapPos: [nombre, nombre]** : la position du composant dans le blueprint, exprimée par une paire de coordonnées x et y.
- **iconSet: chaîne** : le nom du jeu d'icônes utilisé. Valeurs acceptées : `aws, aws2, azure, fa`.
- **name: chaîne** : le nom de l'icône dans le jeu d'icônes. Les noms sont accessibles dans l’application à l'aide de la barre d'outils du composant.
- **iconSize: nombre** : la taille de l'icône. Valeur par défaut : 3.
- **isometric: boolean** : si true, l'icône est affichée à l'aide d'une projection 3D. Si false, l'image est affichée dans une projection 2D. Valeur par défaut : true.
- **standing: boolean** : si true, l'icône est affichée en position debout plutôt qu'à plat. Valeur par défaut : false.
- **direction: chaîne** : la rotation ou l'orientation de l'icône. Valeur acceptées : `down, up, right, left`. Valeur par défaut : `down`.
- **color: objet** : la couleur de remplissage du corps du composant.
  - **isometric: chaîne** : la couleur de remplissage du composant dans la vue 3D. Doit être une couleur hexadécimale.
  - **2d: chaîne** : la couleur de remplissage du composant dans la vue 2D. Doit être une couleur hexadécimale.
- **background: objet** : la couleur d'arrière-plan du composant.
  - **isometric: chaîne** : la couleur d'arrière-plan de l'icône dans la vue 3D. Doit être une couleur hexadécimale.
  - **2d: chaîne** : la couleur d'arrière-plan de l'icône dans la vue 2D. Doit être une couleur hexadécimale.
- **link: uri** : liez le composant à un autre diagramme en utilisant le format `blueprint://ID` ou à un site externe avec le format `https://LINK`.
- **locked: booléen** : si true, les modifications apportées au composant via l'application sont désactivées jusqu'à ce qu'il soit déverrouillé.

[1]: https://developers.cloudcraft.co/