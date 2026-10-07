---
title: Composant Azure Queue
---

## Présentation

Vous pouvez ttiliser le composant Azure Queue pour représenter et visualiser le stockage de files d'attente de votre environnement Azure.

{{< img src="cloudcraft/components-azure/azure-queue/component-azure-queue-diagram.png" alt="Capture d'écran d'un diagramme Cloudcraft en vue isométrique montrant des composants Azure interconnectés." responsive="true" style="width:60%;">}}


## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez les couleurs d’accent et de remplissage du corps du composant en vue 3D.
- **Kind** : sélectionnez le type de compte de stockage.
- **Redundancy** : sélectionnez la manière dont vos données sont répliquées dans les régions principale et secondaire.
- **Storage (GiB)** : saisissez le volume total de données disponible pour la file d'attente en gibioctets.
- **Class 1 Requests (10k)** : saisissez le nombre de requêtes de classe 1 par unités de 10 000 requêtes.
- **Class 2 Requests (10k)** : saisissez le nombre de requêtes de classe 2 par unités de 10 000 requêtes.
- **Replication (GiB)** : saisissez le volume total de transfert de données de géo-réplication pour la file d'attente.

## API

Utilisez [l'API Cloudcraft][1] pour accéder et afficher vos diagrammes d'architecture sous forme d'objets JSON. Voici un exemple d'objet JSON représentant un composant Azure Queue :

### Schéma

```json
{
    "type": "azurequeue",
    "id": "6cc7f504-a5a5-4354-ad34-0d250b462ce2",
    "region": "westeurope",
    "mapPos": [0,6],
    "kind": "Storage",
    "redundancy": "LRS",
    "storageGb": 1,
    "requestUnitsC1": 0,
    "requestUnitsC2": 0,
    "replicationGb": 0,
    "color": {
        "isometric": null,
        "2d": null
    },
    "accentColor": {
        "isometric": null,
        "2d": null
    },
    "link": "https://azure.microsoft.com/en-us/products/storage/queues/",
    "locked": true
}
```

- **type: string** : le type de composant. Doit être une chaîne ayant pour valeur `azurequeue` pour ce composant.
- **id: string, uuid** : l'identifiant unique du composant. L’API utilise un UUID v4 en interne mais accepte toute chaîne unique.
- **resourceId : string** : l'identifiant unique global du composant dans Azure.
- **region: string** : la région Azure du composant. L'API prend en charge toutes les régions globales, sauf la Chine.
- **mapPos: array** : la position du composant dans le blueprint. L'API utilise une paire de coordonnées X et Y pour indiquer la position.
- **kind: string** : le type de compte de stockage. Accepte l'une des deux valeurs, `Storage` et `StorageV2`. La valeur par défaut est `Storage`.
- **redundancy: string** : option de redondance définissant la manière dont les données sont répliquées entre les régions. Accepte l'une des six valeurs `LRS`, `ZRS`, `GRS`, `GZRS`, `RA-GRS` et `RA-GZRS`. La valeur par défaut est `LRS`.
- **storageGb: number** : le volume total de données disponible pour la file d'attente en gibioctets. La valeur par défaut est `0`.
- **requestUnitsC1: number** : le nombre de requêtes de classe 1 en unités de 10 000. La valeur par défaut est `0`.
- **requestUnitsC2: number** : le nombre de requêtes de classe 1 en unités de 10 000. La valeur par défaut est `0`.
- **replicationGb: number** : le volume total de transfert de données de géo-réplication pour la file d'attente. La valeur par défaut est `0`.
- **color: object** : la couleur de remplissage du corps du composant.
  - **isometric: string** : la couleur hexadécimale pour le corps du composant en vue 3D. La valeur par défaut est `#CEE0F5`.
  - **2d: string** : la couleur hexadécimale du corps en vue 2D. La valeur par défaut est `null`.
- **accentColor: object** : la couleur d'accentuation du logo du composant.
  - **isometric: string** : la couleur hexadécimale du logo en vue 3D. La valeur par défaut est `#0078D4`.
  - **2d: string** : la couleur hexadécimale du logo en vue 2D. La valeur par défaut est `null`.
- **link: string, uri** : URI permettant de lier le composant à un autre diagramme ou à une page externe. Accepte le format `blueprint://` ou `https://`.
- **locked: boolean** : détermine si la position du composant peut être modifiée via l’interface web. La valeur par défaut est `false`.

[1]: https://developers.cloudcraft.co/