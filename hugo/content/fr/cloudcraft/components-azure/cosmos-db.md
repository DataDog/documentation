---
title: Composant Cosmos DB
---

## Présentation

Vous pouvez utiliser le composant Cosmos DB pour représenter et visualiser les bases de données sans serveur de votre environnement Azure.

{{< img src="cloudcraft/components-azure/cosmos-db/component-cosmos-db-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft montrant des composants Azure interconnectés." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez les couleurs d’accent et de remplissage du corps du composant en vue 3D.
- **API** : sélectionnez l'API de votre base de données.
- **Capacity mode** : sélectionnez le mode de capacité des opérations de votre base de données. Cette option n'est pas disponible pour PostgreSQL.
- **Replicate mode** : sélectionnez le mode de réplication de votre base de données. Cette option n'est pas disponible pour PostgreSQL.
- **Request units** : saisissez le nombre d'unités de requête par seconde. Cette option n'est pas disponible pour PostgreSQL.
- **Storage (GiB)** : saisissez le volume total de stockage transactionnel de votre base de données, en gibioctets. Cette option n'est pas disponible pour PostgreSQL.
- **Node Count** : sélectionnez le nombre de nœuds Worker disponibles pour votre workload. Cette option est uniquement disponible pour PostgreSQL.
- **Node vCores** : sélectionnez le nombre de cœurs virtuels disponibles pour chaque nœud. Cette option est uniquement disponible pour PostgreSQL.
- **Node Storage** : sélectionnez le volume de stockage disponible pour chaque nœud. Cette option est uniquement disponible pour PostgreSQL.
- **HA** : choisissez si la base de données s'exécute en mode Haute disponibilité. Cette option est uniquement disponible pour PostgreSQL.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON. Voici un exemple d'objet JSON d'un composant Cosmos DB :

### Schéma

```json
{
    "type": "azurecosmosdb",
    "id": "c7fcbf73-87b1-48fd-886b-1ccdd38e0076",
    "region": "centralus",
    "mapPos": [-5,11],
    "api": "sql",
    "capacityMode": "provisioned",
    "replicationMode": "standard",
    "requestUnits": 400,
    "storageGb": 1,
    "postgresqlNodes": 1,
    "postgresqlCoordinatorCores": 4,
    "postgresqlCoordinatorStorage": 512,
    "postgresqlWorkerCores": 2,
    "postgresqlWorkerStorage": 128,
    "postgresqlHighAvailability": false,
    "color": {
        "isometric": null,
        "2d": null
    },
    "accentColor": {
        "isometric": null,
        "2d": null
    },
    "link": "https://azure.microsoft.com/products/cosmos-db/",
    "locked": true
}

```

- **type: chaîne** : le type de composant. Doit être une chaîne ayant pour valeur `azurecosmosdb` pour ce composant.
- **id: chaîne, uuid** : l'identifiant unique du composant. L’API utilise un UUID v4 en interne mais accepte toute chaîne unique.
- **resourceId: chaîne** : l'identifiant unique global du composant dans Azure.
- **region: chaîne** : la région Azure du composant. L'API prend en charge toutes les régions globales, sauf la Chine.
- **mapPos: tableau** : la position du composant dans le blueprint. L'API utilise une paire de coordonnées X et Y pour indiquer la position.
- **api: chaîne** : l'API de la base de données. [Consultez la documentation Azure sur Cosmos DB pour en savoir plus][2]. Valeur par défaut : `sql`.
- **capacityMode: chaîne** : le mode de capacité des opérations de base de données. Valeurs acceptées : `provisioned` et `serverless`. Valeur par défaut : `provisioned`.
- **replicationMode: chaîne** : le mode de réplication de la base de données. Valeurs acceptées : `standard`, `with-zones` et `multi-master`. Valeur par défaut : `standard`.
- **requestUnits: nombre** : le nombre d'unités de requête par seconde. Valeur par défaut : `400`.
- **storageGb: chaîne** : le volume total de stockage transactionnel de la base de données, en gibioctets. Valeur par défaut : `1`.
- **postgresqlNodes: nombre** : le nombre de nœuds Worker disponibles pour le workload. Valeur par défaut : `1`.
- **postgresqlCoordinatorCores: nombre** : le nombre de cœurs virtuels disponibles pour le coordinateur. Valeur par défaut : `4`.
- **postgresqlCoordinatorStorage: nombre** : le volume de stockage disponible pour le coordinateur. Valeur par défaut : `512`.
- **postgreesqlWorkerCores: nombre** : le nombre de cœurs virtuels disponibles pour chaque nœud. Valeur par défaut : `2`.
- **postgreesqlWorkerStorage: nombre** : le volume de stockage disponible pour chaque nœud. Valeur par défaut : `128`.
- **postgresqlHighAvailability: booléne** : indique si la base de données s'exécute en mode Haute disponibilité. Valeur par défaut : `false`.
- **color: objet** : la couleur de remplissage du corps du composant.
  - **isometric: chaîne** : la couleur hexadécimale du corps du composant dans la vue 3D. Valeur par défaut : `#CEE0F5`.
  - **2d: chaîne** : la couleur hexadécimale du corps du composant dans la vue 2D. Valeur par défaut : `null`.
- **accentColor: objet** : la couleur d'accent du logo du composant.
  - **isometric: chaîne** : la couleur hexadécimale du logo du composant dans la vue 3D. Valeur par défaut : `#0078D4`.
  - **2d: chaîne** : la couleur hexadécimale du logo du composant dans la vue 2D. Valeur par défaut : `null`.
- **link: string, uri** : une URI permettant de lier le composant à un autre diagramme ou à un site externe. Accepte le format `blueprint://` ou le format `https://`.
- **locked: booléen** : détermine si la position du composant peut être modifiée via l’interface web. Valeur par défaut : `false`.

[1]: https://developers.cloudcraft.co/
[2]: https://learn.microsoft.com/azure/cosmos-db/