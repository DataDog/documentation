---
title: Composant Customer Gateway
---
## Présentation

Utilisez le composant Customer Gateway pour représenter le périphérique de passerelle client de votre architecture Amazon Web Services.

{{< img src="cloudcraft/components-aws/customer-gateway/component-customer-gateway-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft montrant le composant AWS 'Customer gateway'." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez une couleur prédéfinie ou indiquez sa valeur hexadécimale pour le composant et son accent. Vous pouvez appliquer la même couleur aux vues 2D et 3D, ou choisir une couleur différente pour chaque vue.
- **Rotate** : faites pivoter le composant et modifiez son orientation.
- **Connections** : consultez, ajoutez ou supprimez des connexions VPN à cette passerelle.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON.

### Schéma

Voici un exemple d'objet JSON d'un composant Customer Gateway :

```json
{
  "type": "customergateway",
  "id": "677145c5-aeb4-4560-8459-112bcfc21ce3",
  "region": "us-east-1",
  "mapPos": [20,10],
  "color": {
    "isometric": "#000000",
    "2d": "#000000"
  },
  "accentColor": {
    "isometric": "#ffeb3b",
    "2d": "#ffeb3b"
  },
  "direction": "down",
  "link": " blueprint://58c2aeae-d5b7-4a50-83ea-b3fa9d17d3f5",
  "locked": true
}
```

- **type: customergateway** : le type de composant.
- **id: string** : un identifiant unique pour le composant au format `uuid`.
- **region: chaîne** : la région AWS dans laquelle cette passerelle est déployée. Toutes les régions globales sont prises en charge, à l’exception des régions `cn-`.
- **mapPos: [nombre, nombre]** : la position du composant dans le blueprint, exprimée par une paire de coordonnées x et y.
- **color: object** : la couleur de remplissage du corps du composant.
  - **isometric: string** : couleur de remplissage du composant dans la vue 3D. Doit être une couleur hexadécimale.
  - **2d: string** : la couleur de remplissage du composant dans la vue en 2D. Doit être une couleur hexadécimale.
- **accentColor: object** : couleur d'accent utilisée pour afficher le logo du composant sur le bloc.
  - **isometric: string** : la couleur d'accent du composant dans la vue en 3D. Doit être une couleur hexadécimale.
  - **2d: string** : la couleur d'accent du composant dans la vue en 2D. Doit être une couleur hexadécimale.
- **direction: chaîne** : la rotation ou l'orientation du composant. Valeurs acceptées :  `down` et `right`. Valeur par défaut : `down`.
- **link: uri** : liez le composant à un autre diagramme en utilisant le format `blueprint://ID` ou à un site externe avec le format `https://LINK`.
- **locked: boolean** : autoriser ou non les modifications de la position du composant via l'interface Web. Si `true`, les modifications apportées au composant à l'aide de l'application sont désactivées jusqu'au déverrouillage.

Le composant Customer Gateway ne peut être ajouté qu'aux [VPC][2].

[1]: https://developers.cloudcraft.co/
[2]: /fr/cloudcraft/components-aws/vpc