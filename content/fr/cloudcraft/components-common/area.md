---
title: Composant Zone
---
## Présentation

Le composant Zone est l'un des composants les plus utiles pour concevoir et organiser des diagrammes de grande taille. Conjointement au composant Étiquette de texte, il permet de représenter visuellement des sous-réseaux et des adresses IP, de séparer les architectures cloud publiques et privées, et plus encore.

{{< img src="cloudcraft/components-common/area/component-area.png" alt="Capture d'écran d'une représentation 3D du composant Zone dans Cloudcraft" responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Fill color** : sélectionnez une couleur prédéfinie pour remplir le centre du composant Zone, ou saisissez la valeur hexadécimale de la couleur de votre choix. Vous pouvez utiliser les mêmes couleurs pour les vues 2D et 3D ou des couleurs différentes.
- **Raise** : placez le composant Zone sur les autres zones.
- **Lower** : placez le composant Zone sous les autres zones.
- **Edge color** : sélectionnez une couleur prédéfinie pour remplir les bords du composant Zone ou saisissez la valeur hexadécimale de la couleur de votre choix. Vous pouvez utiliser les mêmes couleurs pour les vues 2D et 3D ou des couleurs différentes.
- **Add shadow** : ajoutez (ou supprimez) un effet d'ombre au niveau des bords pour augmenter le contraste.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON. Voici un exemple d'objet JSON d'un composant Zone :

```json
{
  "type": "area",
  "id": "09659366-c3b1-479f-9b4d-37c5753e1674",
  "mapPos": [2, 9],
  "points": [
    [0, 0],
    [4, 0],
    [4, 3],
    [0, 3]
  ],
  "shadow": true,
  "color": {
    "2d": "#e6e7e8",
    "isometric": "#e6e7e8"
  },
  "borderColor": {
    "2d": "#ffffff",
    "isometric": "#ffffff"
  },
  "link": "blueprint://6f6b20d9-1332-4141-bb74-0e3af3f61801",
  "locked": true
}
```

- **type: area** : le type de composant. 
- **id: chaîne** : un identifiant unique pour le composant au format `uuid`.
- **mapPos: [nombre, nombre]** : la position du composant dans le blueprint, exprimée par une paire de coordonnées x et y.
- **shadow: booléen** : si défini sur true, permet d'ajouter un effet d'ombre au bord de la zone pour augmenter le contraste. Valeur par défaut : false.
- **points: [nombre, nombre]** : la position des points servant à créer les bords de la zone.
- **color: objet** : la couleur de remplissage du corps du composant.
  - **isometric: chaîne** : la couleur de remplissage du composant dans la vue 3D. Doit être une couleur hexadécimale.
  - **2d: chaîne** : la couleur de remplissage du composant dans la vue 2D. Doit être une couleur hexadécimale.
- **borderColor: objet** : la couleur du bord de la zone.
  - **isometric: chaîne** : la couleur du bord de la zone dans la vue 3D. Doit être une couleur hexadécimale.
  - **2d: chaîne** : la couleur du bord de la zone dans la vue 2D. Doit être une couleur hexadécimale.
- **link: uri** : liez le composant à un autre diagramme en utilisant le format `blueprint://ID` ou à un site externe avec le format `https://LINK`.
- **locked: booléen** : si true, les modifications apportées au composant via l'application sont désactivées jusqu'à ce qu'il soit déverrouillé.

[1]: https://developers.cloudcraft.co/