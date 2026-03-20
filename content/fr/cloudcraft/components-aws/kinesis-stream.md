---
title: Composant Kinesis Stream
---
## Présentation

Utilisez le composant Kinesis Stream pour représenter les flux de données en temps réel de votre architecture Amazon Web Services.

{{< img src="cloudcraft/components-aws/kinesis-stream/component-kinesis-stream-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft montrant le composant AWS 'Kinesis Stream'." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez une couleur prédéfinie ou indiquez sa valeur hexadécimale pour le composant et son accent. Vous pouvez appliquer la même couleur aux vues 2D et 3D, ou choisir une couleur différente pour chaque vue.
- **Rotate item** : faites pivoter le composant Kinesis et changez sa direction.
- **Shards** : saisissez le nombre de shards pour le flux de données Kinesis.
- **PUT units (M)** : saisissez le nombre d'unités de charge utile `PUT` pour le flux de données Kinesis, en millions.
- **Extended data retention** : étendez le stockage du flux de données Kinesis au-delà de 24 heures.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON.

### Schéma

Voici un exemple d'objet JSON d'un composant Kinesis Stream :

```json
{
  "type": "kinesisstream",
  "id": "cc3c417b-3b09-4dff-bc22-52398b86adb6",
  "region": "us-west-2",
  "mapPos": [0,10],
  "direction": "down",
  "shards": 1,
  "putUnits": 500,
  "extendedRetention": true,
  "color": {
    "isometric": "#ececed",
    "2d": "#693cc5"
  },
  "accentColor": {
    "isometric": "#4286c5",
    "2d": "#ffffff"
  },
  "link": "https://aws.amazon.com/kinesis/data-streams/",
  "locked": true
}
```

- **type: kinesisstream** : le type de composant.
- **id : string** : un identifiant unique pour le composant au format `uuid`.
- **region: string** : la région AWS dans laquelle l'instance Kinesis stream est déployée. Toutes les régions globales sont prises en charge, à l'exception des régions `cn-`.
- **mapPos: [number, number]** : la position du composant dans le blueprint, exprimée par une paire de coordonnées x et y.
- **direction: string** : rotation ou orientation du composant. Les valeurs acceptées sont `down` et `right`. La valeur par défaut est `down`.
- **shards: number** : le nombre de shards pour le flux de données Kinesis. La valeur par défaut est `1`.
- **putUnits: number** : le nombre d'unités de charge utile `PUT` pour le flux de données Kinesis, en millions. La valeur par défaut est `500`.
- **extendedRetention: boolean** : si `true`, stocker les flux de données Kinesis pendant plus de 24 heures. La valeur par défaut est `false`.
- **color: object** : la couleur de remplissage du corps du composant.
  - **isometric: string** : la couleur de remplissage du composant dans la vue 3D. Doit être une couleur hexadécimale.
  - **2d: string** : la couleur de remplissage du composant dans la vue en 2D. Doit être une couleur hexadécimale.
- **accentColor: object** : la couleur d'accent utilisée pour afficher le logo du composant sur le bloc.
  - **isometric: string** : la couleur d'accent du composant dans la vue en 3D. Doit être une couleur hexadécimale.
  - **2d: string** : la couleur d'accent du composant dans la vue en 2D. Doit être une couleur hexadécimale.
- **link: uri** : liez le composant à un autre diagramme en utilisant le format `blueprint://ID` ou à un site externe avec le format `https://LINK`.
- **locked: boolean** : si `true`, les modifications apportées au composant via l'application sont désactivées jusqu'à ce qu'il soit déverrouillé.

[1]: https://developers.cloudcraft.co/