---
title: Composant Timestream
---
## Présentation

Utilisez le composant Timestream pour représenter des bases de données de séries temporelles serverless dans votre architecture Amazon Web Services.

{{< img src="cloudcraft/components-aws/timestream/component-timestream-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft montrant des composants AWS interconnectés." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color**: sélectionnez une couleur de remplissage pour le corps du composant et une couleur d'accent pour son symbole. Vous pouvez utiliser les mêmes couleurs pour les vues 2D et 3D ou des couleurs différentes. 
- **Written Data (GB)** : indiquez le volume total de données écrites, en gigaoctets.
- **Queried Data (GB)** : indiquez le volume total de données interrogées, en gigaoctets.
- **Memory Storage/hr (GB)** : indiquez la quantité totale de stockage en mémoire par heure pour votre base de données Timestream, en gigaoctets.
- **Magnetic Storage/mo (GB)** : indiquez la quantité totale de stockage magnétique mensuel alloué à votre base de données Timestream, en gigaoctets.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON.

### Schéma

Voici un exemple d'objet JSON représentant un composant Timestream :

```json
{
    "type": "timestream",
    "id": "1d939183-0078-440a-bcf6-6418c9c2e419",
    "region": "us-east-1",
    "mapPos": [6, 6],
    "writeDataGb": 1,
    "scanDataGb": 1,
    "memoryDataGbHr": 10,
    "magneticDataGbMo": 10,
    "color": {
        "isometric": "#ECECED",
        "2d": "#3B48CC"
    },
    "accentColor": {
        "isometric": "#4286C5",
        "2d": "#FFFFFF"
    },
    "link": "https://aws.amazon.com/timestream/",
    "locked": true
}
```

- **type: string** : le type de composant. Doit être une chaîne ayant pour valeur `timestream` pour ce composant. 
- **id: string, uuid** : l’identifiant unique du composant. L’API utilise un UUID v4 en interne mais accepte toute chaîne unique.
- **arn: string** : identifiant globalement unique du composant au sein d'AWS, aussi appelé [Amazon Resource Names][2]. 
- **region: string** : région AWS associée au composant. Toutes les régions globales sont prises en charge, [sauf la Chine AWS][3]. 
- **mapPos: array** : position du composant dans le blueprint, exprimée par une paire de coordonnées x et y. 
- **writeDataGb: number** : le volume total de données écrites, en gigaoctets. Valeur par défaut `100`. 
- **scanDataGb: number** : le volume total de données interrogées, en gigaoctets. Valeur par défaut `100`.
- **memoryDataGbHr: number** : la quantité totale de stockage en mémoire disponible par heure pour la base de données, en gigaoctets. Valeur par défaut `1`. 
- **magneticDataGbMo: number** : la quantité totale de stockage magnétique mensuel disponible pour la base de données, en gigaoctets. Valeur par défaut `1000`. 
- **color: object** : la couleur de remplissage du corps du composant.
  - **isometric: string** : couleur hexadécimale du corps du composant en vue 3D. Par défaut `#ECECED`.
  - **2d: string** : une couleur hexadécimale pour le corps du composant en vue 2D. Valeur par défaut `##3B48CC`.
- **accentColor: object** : la couleur d’accentuation du logo du composant.
  - **isometric: string** : couleur hexadécimale du logo en vue 3D. Par défaut `#4286C5`.
  - **2d: string** : couleur hexadécimale du logo en vue 2D. Par défaut `#FFFFFF`.
- **link: string, uri** : URI permettant de lier le composant à un autre diagramme ou à un site externe. Accepte les formats `blueprint://` ou `https://`. 
- **locked: boolean** : détermine si la position du composant peut être modifiée via l’interface web. Valeur par défaut : `false`.

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /fr/cloudcraft/faq/scan-error-aws-china-region/