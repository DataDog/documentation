---
title: Composant Auto Scaling Group
---
## Présentation

Utilisez le composant Auto Scaling Group pour représenter les groupes Auto Scaling de votre architecture Amazon Web Services.

{{< img src="cloudcraft/components-aws/auto-scaling-group/component-auto-scaling-group-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft montrant le composant AWS 'Auto scaling group'." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d'outils pour configurer et personnaliser votre composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez une couleur prédéfinie ou saisir la valeur hexadécimale de la couleur pour le composant. Le composant peut utiliser la même couleur pour la vue 2D et 3D, ou des couleurs différentes pour chacune.
- **Layout** : sélectionner la disposition pour le groupe Auto Scaling, « even », où les membres sont répartis uniformément dans l'espace disponible, ou « manual », où les membres sont positionnés manuellement. 

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON.

### Schéma

Voici un exemple d'objet JSON d'un composant Auto Scaling Group :

```json
{
  "type": "asg",
  "id": "0998cf01-d22e-4324-83a9-b06ffbd93188",
  "region": "us-east-2",
  "mapPos": [-2.75, 9],
  "mapSize": [3.25, 1],
  "layout": "even",
  "nodes": [
    "056b4f94-fe18-43de-9e55-325d31813a80",
    "d037dd26-252e-4ba0-95f7-e6656cd00413"
  ],
  "color": {
    "2d": "#f5b720",
    "isometric": "#f5b720"
  },
  "link": "blueprint://bbb22829-4abb-4fba-8a25-1896545eb9d1",
  "locked": true
}
```

- **type: asg** : le type de composant.
- **id: string** : un identifiant unique pour le composant au format `uuid`.
- **region: string** : la région AWS dans laquelle le groupe Auto Scaling est déployé. Toutes les régions globales sont prises en charge, à l'exception des régions `cn-`.
- **mapPos: [nombre, nombre]** : la position du composant dans le blueprint, exprimée par une paire de coordonnées x et y.
- **mapSize: [nombre, nombre]** : la taille du groupe Auto Scaling dans le plan.
- **layout: string** : la disposition du groupe Auto Scaling. Les valeurs acceptées sont `even` ou `manual`.
- **nodes: array** : les instances EC2 à l'intérieur du groupe Auto Scaling. Doit être composé d'un tableau d'identifiants uniques émis par Cloudcraft pour les instances EC2.
- **color: object** : la couleur de remplissage du corps du composant.
  - **isometric: string** : couleur de remplissage du composant dans la vue 3D. Doit être une couleur hexadécimale.
  - **2d: string** : la couleur de remplissage du composant dans la vue en 2D. Doit être une couleur hexadécimale.
- **link: uri** : liez le composant à un autre diagramme en utilisant le format `blueprint://ID` ou à un site externe avec le format `https://LINK`.
- **locked: boolean** : si `true`, les modifications apportées au composant via l'application sont désactivées jusqu'à ce qu'il soit déverrouillé.

[1]: https://developers.cloudcraft.co/