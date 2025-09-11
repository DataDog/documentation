---
title: Composant SQS
---
## Présentation

Utilisez le composant SQS pour représenter des files de messages dans votre architecture Amazon Web Services.

{{< img src="cloudcraft/components-aws/sqs/component-sqs-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft affichant le composant AWS 'SQS'." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez une couleur prédéfinie ou indiquez sa valeur hexadécimale pour le composant et son accent. Vous pouvez appliquer la même couleur aux vues 2D et 3D, ou choisir une couleur différente pour chaque vue.
- **Rotate item** : faites pivoter le composant et modifiez son orientation.
- **Type** : sélectionnez le type de file de messages pour l’instance SQS.
- **Req./month (M)** : indiquez le nombre de requêtes envoyées par mois, en millions.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON.

### Schéma

Voici un exemple d'objet JSON d'un composant SQS :

```json
{
  "type": "sqs",
  "id": "c671ec0c-3103-4312-9c85-286a58dbc457",
  "region": "us-east-1",
  "mapPos": [0,10],
  "direction": "down",
  "queueType": "standard",
  "requests": 1,
  "color": {
    "isometric": "#ececed",
    "2d": "#cc2264"
  },
  "accentColor": {
    "isometric": "#f4b934",
    "2d": "#ffffff"
  },
  "link": "https://aws.amazon.com/sqs/",
  "locked": true
}
```

- **type: sqs** : le type de composant. 
- **id: string** : identifiant unique du composant au format `uuid`.
- **region: string** : la région AWS dans laquelle l’instance SQS est déployée. Toutes les régions mondiales sont prises en charge, à l’exception des régions `cn-`.
- **mapPos: [number, number]** : position du composant dans le blueprint, exprimée par une paire de coordonnées x et y.
- **direction: string** : rotation ou orientation du composant. Les valeurs acceptées sont `down`, `up`, `right` ou `left`. Par défaut, `down`.
- **queueType: string** : le type de file de messages pour l’instance SQS. Valeurs acceptées : `standard` ou `fifo`.
- **requests: number** : le nombre de requêtes envoyées par mois, en millions. Valeur par défaut : `1`. 
- **color: object** : la couleur de remplissage du corps du composant.
  - **isometric: string** : couleur de remplissage du composant dans la vue 3D. Doit être une couleur hexadécimale.
  - **2d: string** : couleur de remplissage du composant dans la vue en 2D. Doit être une couleur hexadécimale.
- **accentColor: object** : couleur d'accent utilisée pour afficher le logo du composant sur le bloc.
  - **isometric: string** : couleur d'accent du composant dans la vue en 3D. Doit être une couleur hexadécimale.
  - **2d: string** : couleur d'accent du composant dans la vue en 2D. Doit être une couleur hexadécimale.
- **link: uri** : liez le composant à un autre diagramme en utilisant le format `blueprint://ID` ou à un site externe avec le format `https://LINK`.
- **locked: boolean** : si `true`, les modifications apportées au composant via l'application sont désactivées jusqu'à ce qu'il soit déverrouillé.

[1]: https://developers.cloudcraft.co/