---
title: Composant Availability Zone
---
## Présentation

Utilisez le composant Availability Zone pour représenter les zones de disponibilité de votre architecture Amazon Web Services.

{{< img src="cloudcraft/components-aws/availability-zone/component-availability-zone-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft montrant le composant AWS 'Availability zone'." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d'outils pour configurer et personnaliser votre composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez une couleur prédéfinie ou saisir la valeur hexadécimale de la couleur pour le composant. Le composant peut utiliser la même couleur pour la vue 2D et 3D, ou des couleurs différentes pour chacune. 
- **Raise** : élevez le composant de zone de disponibilité au-dessus des autres zones de disponibilité.
- **Lower** : abaissez le composant de zone de disponibilité en dessous des autres zones de disponibilité.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON.

### Schéma

Voici un exemple d'objet JSON d'un composant Availability Zone :

```json
{
  "type": "zone",
  "id": "a46cfaf2-ce78-4d44-9a41-a55fc7cd4ceb",
  "region": "us-east-2",
  "mapPos": [-6.75, 10.25],
  "mapSize": [2.5, 2.5],
  "color": {
    "2d": "#000000",
    "isometric": "#000000"
  },
  "link": "blueprint://34b7a049-e92b-4146-b937-7eee9ae788b5",
  "locked": true
}
```

- **type: zone** : le type de composant.
- **id: string** : un identifiant unique pour le composant au format `uuid`.
- **region: string** : la région AWS à laquelle appartient la zone de disponibilité. Toutes les régions globales sont prises en charge, à l'exception des régions `cn-`.
- **mapPos: [nombre, nombre]**. La position du composant dans le blueprint, exprimée par une paire de coordonnées x et y.
- **mapSize: [nombre, nombre]** : la taille de la zone de disponibilité dans le plan.
- **color: object**. La couleur de remplissage de la zone de disponibilité.
  - **isometric: string**. La couleur de remplissage du composant dans la vue 3D. Doit être une couleur hexadécimale.
  - **2d: string**. La couleur de remplissage du composant dans la vue 2D. Doit être une couleur hexadécimale.
- **link: uri**. Liez le composant à un autre diagramme en utilisant le format `blueprint://ID` ou à un site externe avec le format `https://LINK`.
- **locked: boolean**. Si `true`, les modifications apportées au composant via l'application sont désactivées jusqu'à ce qu'il soit déverrouillé.

[1]: https://developers.cloudcraft.co/