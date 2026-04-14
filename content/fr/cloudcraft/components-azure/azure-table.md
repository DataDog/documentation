---
title: Composant Azure Table
---

## Présentation

Vous pouvez utiliser le composant Azure Table pour représenter et visualiser les magasins clé-valeur NoSQL de votre environnement Azure.

{{< img src="cloudcraft/components-azure/azure-table/component-azure-table-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft montrant des composants Azure interconnectés." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez les couleurs d’accent et de remplissage du corps du composant en vue 3D.
- **Redundancy** : sélectionnez la manière dont vos données sont répliquées dans les régions principale et secondaire.
- **Storage (GiB)** : saisissez le volume total de données disponibles pour le magasin clé-valeur.
- **Request Units (10k)** : saisissez le nombre de requêtes, en unités de 10 000 requêtes.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON. Voici un exemple d'objet JSON d'un composant Azure Table :

### Schéma

```json
{
    "type": "azuretable",
    "id": "e3b7f697-3ae6-4d3b-bd7f-bac3e0cc05ae",
    "region": "northcentralus",
    "mapPos": [1,7.75],
    "redundancy": "LRS",
    "storageGb": 10,
    "requestUnits": 0,
    "color": {
        "isometric": null,
        "2d": null
    },
    "accentColor": {
        "isometric": null,
        "2d": null
    },
    "link": "https://azure.microsoft.com/products/storage/tables/",
    "locked": true
}
```

- **type: chaîne** : le type de composant. Doit être une chaîne ayant pour valeur `azuretable` pour ce composant.
- **id: chaîne, uuid** : l'identifiant unique du composant. L’API utilise un UUID v4 en interne mais accepte toute chaîne unique.
- **resourceId: chaîne** : l'identifiant unique global du composant dans Azure.
- **region: chaîne** : la région Azure du composant. L'API prend en charge toutes les régions globales, sauf la Chine.
- **mapPos: tableau** : la position du composant dans le blueprint. L'API utilise une paire de coordonnées X et Y pour indiquer la position.
- **redundancy: chaîne** : l'option de redondance définissant la manière dont les données sont répliquées entre les régions. Valeurs acceptées : `LRS`, `ZRS` `GRS`, `GZRS`, `RA-GRS` et `RA-GRS`. Valeur par défaut : `LRS`.
- **storageGb: nombre** : le volume total de données disponibles pour le magasin clé-valeur, en gibioctets. Valeur par défaut : `0`.
- **requestUnits: nombre** : le nombre de requêtes, en unités de 10 000. Valeur par défaut : `0`.
- **color: objet** : la couleur de remplissage du corps du composant.
  - **isometric: chaîne** : la couleur hexadécimale du corps du composant dans la vue 3D. Valeur par défaut : `#CEE0F5`.
  - **2d: chaîne** : la couleur hexadécimale du corps du composant dans la vue 2D. Valeur par défaut : `null`.
- **accentColor: objet** : la couleur d'accent du logo du composant.
  - **isometric: chaîne** : la couleur hexadécimale du logo du composant dans la vue 3D. Valeur par défaut : `#0078D4`.
  - **2d: chaîne** : la couleur hexadécimale du logo du composant dans la vue 2D. Valeur par défaut : `null`.
- **link: string, uri** : une URI permettant de lier le composant à un autre diagramme ou à un site externe. Accepte le format `blueprint://` ou le format `https://`.
- **locked: booléen** : détermine si la position du composant peut être modifiée via l’interface web. Valeur par défaut : `false`.

[1]: https://developers.cloudcraft.co/