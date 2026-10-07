---
title: Composant Étiquette de texte
---

## Présentation

Le composant Étiquette de texte sert à étiqueter des composants, des icônes et des zones dans un diagramme. Il améliore ainsi la lisibilité de vos diagrammes et les rend visuellement plus attrayants.

{{< img src="cloudcraft/components-common/text-label/component-text-label.png" alt="Capture d'écran d'une représentation 3D du composant Étiquette de texte dans Cloudcraft" responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez une couleur prédéfinie ou saisissez la valeur hexadécimale de la couleur de votre choix. Vous pouvez utiliser les mêmes couleurs pour les vues 2D et 3D ou des couleurs différentes.
- **Toggle 3D/2D projection** : affichez l'étiquette en 3D ou 2D.
- **Toggle flat/standing projection** : affichez l'étiquette à plat ou debout. Non disponible lorsque la projection 2D est activée.
- **Size** : la taille de l'étiquette de texte. Valeur maximale : 112.
- **Rotate item** : faites pivoter le composant Étiquette de texte et modifiez son orientation.
- **Outline** : ajoutez un contour à l'étiquette de texte afin de renforcer le contraste des couleurs.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON. Voici un exemple d'objet JSON d'un composant Text Label :

```json
{
  "type": "isotext",
  "id": "8f2a0f5f-c373-42dd-b4df-f06f455f5f94",
  "mapPos": [3.5, 9],
  "text": "Hello world!",
  "textSize": 56,
  "isometric": true,
  "standing": false,
  "direction": "down",
  "outline": true,
  "color": {
    "2d": "#000000",
    "isometric": "#000000"
  },
  "link": "https://blog.cloudcraft.co/welcome-to-cloudcraft/",
  "locked": true
}
```

- **type : isotext** : le type de composant.
- **id: chaîne** : un identifiant unique pour le composant au format `uuid`.
- **mapPos: [nombre, nombre]** : la position du composant dans le blueprint, exprimée par une paire de coordonnées x et y.
- **text: chaîne** : le texte de l'étiquette.
- **textSize: nombre** : la taille de l'étiquette de texte. Valeur par défaut : 25.
- **isometric: boolean** : si true, l'étiquette est affichée à l'aide d'une projection 3D. Si false, l'image est affichée dans une projection 2D. Valeur par défaut : true.
- **standing: boolean** : si true, l'étiquette est affichée en position debout plutôt qu'à plat. Valeur par défaut : false.
- **direction: chaîne** : la rotation ou l'orientation de l'étiquette. Valeur acceptées : `down, up, right, left`. Valeur par défaut : `down`.
- **outline: booléen**: si true, permet d'ajouter un contour au texte pour renforcer le contraste des couleurs. Valeur par défaut : false.
- **color: objet** : la couleur de remplissage du composant.
  - **isometric: chaîne** : la couleur de remplissage du composant dans la vue 3D. Doit être une couleur hexadécimale.
  - **2d: chaîne** : la couleur de remplissage du composant dans la vue 2D. Doit être une couleur hexadécimale.
- **link: uri** : liez le composant à un autre diagramme en utilisant le format `blueprint://ID` ou à un site externe avec le format `https://LINK`.
- **locked: booléen** : si true, les modifications apportées au composant via l'application sont désactivées jusqu'à ce qu'il soit déverrouillé.

[1]: https://developers.cloudcraft.co/