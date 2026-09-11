---
title: Composant DynamoDB
---
## Section Overview

Utilisez le composant DynamoDB pour représenter et visualiser les bases de données NoSQL, serverless et gérées dans votre architecture Amazon Web Services. 

{{< img src="cloudcraft/components-aws/dynamodb/component-dynamodb-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft montrant le composant AWS 'DynamoDB'." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d'outils pour configurer le composant. Les options disponibles incluent :

- **Color** : sélectionnez une couleur de remplissage pour le corps du composant et une couleur d'accent pour son symbole. Vous pouvez utiliser les mêmes couleurs pour les vues 2D et 3D, ou choisir des couleurs différentes pour chacune. 
- **Table class** : sélectionnez la classe de la table DynamoDB.
- **Capacity mode** : sélectionnez le mode de capacité de la table DynamoDB.
- **Dataset (GiB)** : saisissez la taille de l'ensemble de données en GiB.
- **Read units** : saisissez le nombre d'unités de capacité de lecture.
- **Write units** : saisissez le nombre d'unités de capacité d'écriture.
- **Read consistency** : sélectionnez la cohérence de lecture de la table DynamoDB.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON.

### Schéma

Voici un exemple d'objet JSON d'un composant DynamoDB :

```json
{
    "type": "dynamodb",
    "id": "29c1f0fa-3f1c-4566-ad33-ae307feee4f0-0",
    "region": "us-east-1",
    "mapPos": [39,148],
    "tableClass": "standard",
    "capacityMode": "on-demand",
    "datasetGb": 0,
    "readUnits": 0,
    "writeUnits": 0,
    "readConsistency": "strong",
    "color": {
        "isometric": "#ececed",
        "2d": "#ececed"
    },
    "accentColor": {
        "isometric": "#4286c5",
        "2d": "#4286c5"
    },
    "link": "https://aws.amazon.com/dynamodb/",
    "locked": true
}
```

- **type: string** : le type de composant. Doit être `dynamodb`.
- **id: string, uuid** : l'identifiant unique du composant. Généralement un UUID v4.
- **arn: string** : l'[Amazon Resource Name (ARN)][2] du composant.
- **region: string** : la région AWS associée au composant. Toutes les régions globales sont prises en charge, [sauf la Chine AWS][3]. 
- **mapPos: array** : la position du composant dans le plan, définie sous forme de paire de coordonnées `[x, y]`.
- **tableClass: string** : la classe de la table DynamoDB. Accepte `standard` ou `standardInfrequentAccess`. Valeur par défaut : `standard`.
- **capacityMode: string** : le mode de capacité de la table DynamoDB. Accepte `provisioned` ou `on-demand`. Valeur par défaut : `provisioned`.
- **datasetGb: number** : la taille de l'ensemble de données en GiB. Valeur par défaut : `10`.
- **readUnits: number** : le nombre d'unités de capacité de lecture. Valeur par défaut : `5`.
- **writeUnits: number** : le nombre d'unités de capacité d'écriture. Valeur par défaut : `5`.
- **readConsistency: string** : la cohérence de lecture de la table DynamoDB. Accepte `strong` ou `eventual`. Valeur par défaut : `strong`.
- **color: object** : la couleur de remplissage du corps du composant.
  - **isometric: string** : couleur hexadécimale du corps du composant en vue 3D. Par défaut `#ECECED`.
  - **2d: string** : une couleur hexadécimale pour le corps du composant dans la vue 2D. Valeur par défaut : `#ECECED`.
- **accentColor: object** : la couleur d'accentuation du logo du composant.
  - **isometric: string** : couleur hexadécimale du logo en vue 3D. Par défaut `#4286C5`.
  - **2d: string** : une couleur hexadécimale pour le logo du composant dans la vue 2D. Valeur par défaut : `#4286C5`.
- **link: string, uri** : un URI qui lie le composant à un autre diagramme ou à un site Web externe. Accepte les formats suivants : `blueprint://` ou `https://`.
- **locked : boolean** : Autorise ou non la modification de la position du composant par l'intermédiaire de l'interface web. La valeur par défaut est `false`.

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /fr/cloudcraft/faq/scan-error-aws-china-region/