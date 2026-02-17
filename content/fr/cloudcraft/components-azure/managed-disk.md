---
title: Composant Managed Disk
---

## Présentation

Utilisez le composant Managed Disk pour représenter et visualiser les volumes de stockage bloc managés depuis votre environnement Azure.

{{< img src="cloudcraft/components-azure/managed-disk/component-managed-disk-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft montrant des composants Azure interconnectés." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez les couleurs d’accent et de remplissage du corps du composant en vue 3D.
- **Type** : sélectionnez votre type de disque.
- **Size** : sélectionnez la taille de votre disque.

## API

Utilisez [l'API Cloudcraft][1] pour accéder et afficher vos diagrammes d'architecture sous forme d'objets JSON. Voici un exemple d'objet JSON représentant un composant Managed disk :

### Schéma

```json
{
    "type": "azuredisk",
    "id": "17e69a0d-4632-42bd-a6c1-f3b9213604ea",
    "resourceId": "/subscriptions/b59a176b-3a5d-4cc6-ab8c-585984717c32/resourceGroups/CLOUDCRAFT/providers/Microsoft.Compute/disks/documentation-volume",
    "region": "eastus",
    "mapPos": [-2,12],
    "tier": "P4",
    "diskSizeGb": 32,
    "color": {
        "isometric": "#CEE0F5",
        "2d": "null"
    },
    "accentColor": {
        "isometric": "#0078D4",
        "2d": "null"
    },
    "link": "https://azure.microsoft.com/products/storage/disks",
    "locked": true
}
```

- **type: string** : le type de composant. Doit être une chaîne ayant pour valeur `azuredisk` pour ce composant.
- **id: string, uuid** : l'identifiant unique du composant. L’API utilise un UUID v4 en interne mais accepte toute chaîne unique.
- **resourceId : string** : l'identifiant unique global du composant dans Azure.
- **region: string** : la région Azure du composant. L'API prend en charge toutes les régions globales, sauf la Chine.
- **mapPos: array** : la position du composant dans le blueprint. L'API utilise une paire de coordonnées X et Y pour indiquer la position.
- **tier: string** : le niveau du type de disque.
- **diskSizeGb: number** : la quantité de stockage disponible sur le disque en gigaoctets.
- **color: object** : la couleur de remplissage du corps du composant.
  - **isometric: string** : la couleur hexadécimale pour le corps du composant en vue 3D. La valeur par défaut est `#CEE0F5`.
  - **2d: string** : la couleur hexadécimale du corps en vue 2D. La valeur par défaut est `null`.
- **accentColor: object** : la couleur d'accentuation du logo du composant.
  - **isometric: string** : la couleur hexadécimale du logo en vue 3D. La valeur par défaut est `#0078D4`.
  - **2d: string** : la couleur hexadécimale du logo en vue 2D. La valeur par défaut est `null`.
- **link: string, uri** : URI permettant de lier le composant à un autre diagramme ou à une page externe. Accepte le format `blueprint://` ou `https://`.
- **locked: boolean** : détermine si la position du composant peut être modifiée via l’interface web. La valeur par défaut est `false`.

[1]: https://developers.cloudcraft.co/