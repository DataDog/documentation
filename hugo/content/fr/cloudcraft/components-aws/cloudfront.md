---
title: Composant CloudFront
---
## Présentation

Utilisez le composant CloudFront pour représenter CloudFront de votre architecture Amazon Web Services. 

{{< img src="cloudcraft/components-aws/cloudfront/component-cloudfront-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft montrant le composant AWS 'CloudFront'." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez une couleur prédéfinie ou indiquez sa valeur hexadécimale pour le composant et son accent. Vous pouvez appliquer la même couleur aux vues 2D et 3D, ou choisir une couleur différente pour chaque vue.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON.

### Schéma

Voici un exemple d'objet JSON d'un composant CloudFront :

```json
{
  "type": "cloudfront",
  "id": "215b4ef1-dfce-4360-a0d1-e109a2e58f0c",
  "mapPos": [1,2],
  "color": {
    "isometric": "#ececed",
    "2d": "#693cc5"
  },
  "accentColor": {
    "isometric": "#4286c5",
    "2d": "#ffffff"
  },
  "link": "https://aws.amazon.com/cloudfront/",
  "locked": true
}
```

- **type: cloudfront** : le type de composant.
- **id: string** : un identifiant unique pour le composant au format `uuid`.
- **mapPos: [nombre, nombre]** : la position du composant dans le blueprint, exprimée par une paire de coordonnées x et y.
- **color: object** : la couleur de remplissage du corps du composant.
  - **isometric: string** : couleur de remplissage du composant dans la vue 3D. Doit être une couleur hexadécimale.
  - **2d: string** : la couleur de remplissage du composant dans la vue en 2D. Doit être une couleur hexadécimale.
- **accentColor: object** : couleur d'accent utilisée pour afficher le logo du composant sur le bloc.
  - **isometric: string** : la couleur d'accent du composant dans la vue en 3D. Doit être une couleur hexadécimale.
  - **2d: string** : la couleur d'accent du composant dans la vue 2D. Doit être une couleur hexadécimale.
- **link: uri** : liez le composant à un autre diagramme en utilisant le format `blueprint://ID` ou à un site externe avec le format `https://LINK`.
- **locked: boolean** : si `true`, les modifications apportées au composant via l'application sont désactivées jusqu'à ce qu'il soit déverrouillé.

[1]: https://developers.cloudcraft.co/