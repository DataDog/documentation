---
title: Composant Load Balancer
---
## Présentation

Utiliser le composant Load Balancer pour représenter les répartiteurs de charge applicatifs et réseau de votre architecture Amazon Web Services.

{{< img src="cloudcraft/components-aws/load-balancer/component-load-balancer-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft montrant le composant AWS 'Load balancer'." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez une couleur prédéfinie ou indiquez sa valeur hexadécimale pour le composant et son accent. Vous pouvez appliquer la même couleur aux vues 2D et 3D, ou choisir une couleur différente pour chaque vue.
- **Type** : sélectionnez le type de répartiteur de charge élastique, classique, applicatif ou réseau.
- **Données traitées** : volume total de données traitées par heure, en gigaoctets. Disponible uniquement pour le type `classic`.
- **LCUs** : nombre d'unités de capacité de répartiteur de charge. Disponible uniquement pour les répartiteurs de charge de type applicatif et réseau.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON.

### Schéma

Voici un exemple d'objet JSON d'un composant Load Balancer :

```json
{
  "type": "elb",
  "id": "811ac6d8-bd6b-4d19-8504-d68d6c8381a9",
  "region": "us-east-2",
  "mapPos": [0,10],
  "elbType": "application",
  "dataGb": 10,
  "lcu": 1,
  "color": {
    "2d": "#693cc5",
    "isometric": "#ececed"
  },
  "accentColor": {
    "2d": "#ffffff",
    "isometric": "#4286c5"
  },
  "link": "blueprint://e2fd00f6-84d9-4a40-acf0-ff2ea01ae59c",
  "locked": true
}
```

- **type: elb** : le type de composant.
- **id : string** : un identifiant unique pour le composant au format `uuid`.
- **region: string** : la région AWS dans laquelle le répartiteur de charge est déployé. Toutes les régions globales sont prises en charge, à l'exception des régions `cn-`.
- **mapPos: [number, number]** : la position du composant dans le blueprint, exprimée par une paire de coordonnées x et y.
- **elbType: string** : le type de répartiteur de charge élastique. Accepte les valeurs `classic`, `application` ou `network`.
- **dataGb: number** : le volume de données traitées par heure par le répartiteur de charge, en gigaoctets. Applicable uniquement aux répartiteurs de charge de type `classic`.
- **lcu: number** : le nombre d'unités de capacité de répartiteur de charge. Applicable uniquement aux répartiteurs de charge de type applicatif ou réseau.
- **color: object** : la couleur de remplissage du corps du composant.
  - **isometric: string** : la couleur de remplissage du composant dans la vue 3D. Doit être une couleur hexadécimale.
  - **2d: string** : la couleur de remplissage du composant dans la vue en 2D. Doit être une couleur hexadécimale.
- **accentColor: object** : couleur d'accent utilisée pour afficher le logo du composant au-dessus du bloc.
  - **isometric: string** : la couleur d'accent du composant dans la vue en 3D. Doit être une couleur hexadécimale.
  - **2d: string** : la couleur d'accent du composant dans la vue en 2D. Doit être une couleur hexadécimale.
- **link: uri** : liez le composant à un autre diagramme en utilisant le format `blueprint://ID` ou à un site externe avec le format `https://LINK`.
- **locked: boolean** : si `true`, les modifications apportées au composant via l'application sont désactivées jusqu'à ce qu'il soit déverrouillé.

[1]: https://developers.cloudcraft.co/