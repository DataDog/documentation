---
title: Composant Keyspaces
---
## Présentation

Utilisez le composant Keyspaces pour visualiser les services de base de données compatibles avec Apache Cassandra de votre architecture Amazon Web Services.

{{< img src="cloudcraft/components-aws/keyspaces/component-keyspaces-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft montrant des composants AWS interconnectés." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez une couleur de remplissage pour le corps du composant et une couleur d'accent pour son symbole. Vous pouvez utiliser les mêmes couleurs pour les vues 2D et 3D ou des couleurs différentes.
- **Capacity mode** : sélectionnez le mode de capacité de votre base de données Keyspaces.
- **Writes (millions)** : saisissez le volume total d'écritures sur la base de données, en millions.
- **Reads (millions)** : saisissez le volume total de lectures sur la base de données, en millions.
- **Quorum %** : saisissez le pourcentage de vos lectures qui utilisent la cohérence `LOCAL_QUORUM`.
- **Dataset (GB)** : saisissez le volume total de données de votre base de données, en gigaoctets.
- **TTL Deletes (millions)** : saisissez le volume total d'opérations `DELETE` déclenchées par le processus TTL, en millions.
- **Point-in-time recovery** : indiquez si la restauration à un instant donné doit être utilisée pour votre base de données.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON.

### Schéma

Voici un exemple d'objet JSON d'un composant Keyspaces :

```json
{
    "type": "keyspaces",
    "id": "bd6da627-e07c-497e-bdbc-bec11655112a",
    "region": "us-east-1",
    "mapPos": [6,6],
    "capacityMode": "on-demand",
    "writeUnits": 5,
    "readUnits": 5,
    "quorumPercentage": 0,
    "datasetGb": 10,
    "ttlDeletes": 0,
    "pointInTimeRecoveryEnabled": false,
    "color": {
        "isometric": "#ECECED",
        "2d": "#3B48CC"
    },
    "accentColor": {
        "isometric": "#4286C5",
        "2d": "#FFFFFF"
    },
    "link": "https://aws.amazon.com/keyspaces/",
    "locked": true
}
```

- **type: chaîne** : le type de composant. Doit être une chaîne ayant pour valeur `keyspaces` pour ce composant.
- **id: chaîne, uuid** : l'identifiant unique du composant. L’API utilise un UUID v4 en interne mais accepte toute chaîne unique.
- **arn: chaîne** : l'identifiant global unique du composant dans AWS, aussi appelé [Amazon Resource Name][2].
- **region: chaîne** : la région AWS associée au composant. Toutes les régions globales sont prises en charge, [sauf la Chine AWS][3].
- **mapPos: tableau** : la position du composant dans le blueprint, exprimée par une paire de coordonnées x et y. 
- **capacityMode: chaîne** : le mode de capacité de la base de données Keyspaces. Valeurs acceptées : `on-demand` et `provisioned`. Valeur par défaut : `on-demand`.
- **writeUnits: nombre** : le volume total d'écritures sur la base de données, en millions. Valeur par défaut : `5`.
- **readUnits: nombre** : le volume total de lectures sur la base de données, en millions. Valeur par défaut : `5`.
- **quorumPercentage: nombre** : le pourcentage de lectures qui utilisent la cohérence `LOCAL_QUORUM`. Valeur par défaut : `0`.
- **datasetGb: nombre** : le volume total de données de la base de données, en gigaoctets. Valeur par défaut : `10`.
- **ttlDeletes: nombre** : le volume total des opérations `DELETE` déclenchées par le processus TTL, en millions. Valeur par défaut : `0`.
- **pointInTimeRecoveryEnabled: booléen** : indiquez si la restauration à un instant donné doit être utilisée pour votre base de données. Valeur par défaut : `false`.
- **color: objet** : la couleur de remplissage du corps du composant.
  - **isometric: chaîne** : la couleur hexadécimale du corps du composant dans la vue 3D. Valeur par défaut : `#ECECED`.
  - **2d: string** : la couleur hexadécimale du corps du composant dans la vue 2D. Valeur par défaut : `#3B48CC`.
- **accentColor: objet** : la couleur d'accent du logo du composant.
  - **isometric: chaîne** : la couleur hexadécimale du logo du composant dans la vue 3D. Valeur par défaut : `#4286C5`.
  - **2d: chaîne** : la couleur hexadécimale du logo du composant dans la vue 2D. Valeur par défaut : `#FFFFFF`.
- **link: string, uri** : une URI permettant de lier le composant à un autre diagramme ou à un site externe. Accepte les formats `blueprint://` ou `https://`.
- **locked: booléen** : détermine si la position du composant peut être modifiée via l’interface web. Valeur par défaut : `false`.

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /fr/cloudcraft/faq/scan-error-aws-china-region/