---
title: Composant Internet Gateway
---
## Présentation

Utilisez le composant Internet Gateway pour représenter les passerelles vers Internet de votre architecture Amazon Web Services.

{{< img src="cloudcraft/components-aws/internet-gateway/component-internet-gateway-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft affichant le composant Internet Gateway AWS." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez une couleur prédéfinie ou indiquez sa valeur hexadécimale pour le composant et son accent. Vous pouvez appliquer la même couleur aux vues 2D et 3D, ou choisir une couleur différente pour chaque vue.
- **Rotate** : faites pivoter le composant et modifiez son orientation.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON.

### Schéma

Voici un exemple d'objet JSON d'un composant Internet Gateway :

```json
{
  "type": "internetgateway",
  "id": "aacf299e-1336-46a3-98d7-3ef75eef8116",
  "region": "us-east-1",
  "mapPos": [-4.25,9],
  "color": {
    "isometric": "#4286c5",
    "2d": "#4286c5"
  },
  "accentColor": {
    "isometric": "#ffffff",
    "2d": "#ffffff"
  },
  "direction": "down",
  "link": "blueprint://b07827f7-2ead-4911-bb78-ddc02dc07b24",
  "locked": true
}
```

- **type: internetgateway** : le type de composant. 
- **id: chaîne** : un identifiant unique pour le composant au format `uuid`.
- **region: chaîne** : la région AWS dans laquelle la passerelle est déployée. Toutes les régions globales sont prises en charge, à l’exception des régions `cn-`.
- **mapPos: [nombre, nombre]** : la position du composant dans le blueprint, exprimée par une paire de coordonnées x et y.
- **color: objet** : la couleur de remplissage du corps du composant.
  - **isometric: chaîne** : la couleur de remplissage du composant dans la vue 3D. Doit être une couleur hexadécimale.
  - **2d: chaîne** : la couleur de remplissage du composant dans la vue 2D. Doit être une couleur hexadécimale.
- **accentColor: objet** : la couleur d'accent utilisée pour afficher le logo du composant sur le bloc.
  - **isometric: chaîne** : la couleur d'accent du composant dans la vue 3D. Doit être une couleur hexadécimale.
  - **2d: chaîne** : la couleur d'accent du composant dans la vue 2D. Doit être une couleur hexadécimale.
- **direction: chaîne** : la rotation ou l'orientation du composant. Valeurs acceptées :  `down` et `right`. Valeur par défaut : `down`.
- **link: uri** : liez le composant à un autre diagramme en utilisant le format `blueprint://ID` ou à un site externe avec le format `https://LINK`.
- **locked: booléen** : si `true`, les modifications apportées au composant via l'application sont désactivées jusqu'à ce qu'il soit déverrouillé.

Le composant Internet Gateway ne peut être ajouté qu'aux [VPC][2].

[1]: https://developers.cloudcraft.co/
[2]: /fr/cloudcraft/components-aws/vpc/