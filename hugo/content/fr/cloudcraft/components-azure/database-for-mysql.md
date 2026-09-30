---
title: Composant Database for MySQL
---

## Présentation

Vous pouvez utiliser le composant Database for MySQL pour représenter et visualiser des bases de données MySQL dans votre environnement Azure.

{{< img src="cloudcraft/components-azure/database-for-mysql/component-database-for-mysql-diagram.png" alt="Capture d'écran d'un diagramme Cloudcraft isométrique affichant des composants Azure interconnectés." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez les couleurs d’accent et de remplissage du corps du composant en vue 3D.
- **Deployment option** : sélectionnez le type de déploiement de votre base de données. 
- **Tier** : sélectionnez le niveau de performance de votre base de données.
- **Instance** : sélectionnez le type d'instance de votre base de données. Modifier ce paramètre met à jour les informations matérielles affichées dans la barre des commandes pour refléter celles utilisées par l'hyperviseur. 
- **High availability** : sélectionnez une option de haute disponibilité pour votre base de données. Disponible uniquement lorsque **Deployment option** est défini sur **Flexible server**.
- **Storage (GiB)** : saisissez le volume total de stockage disponible pour votre base de données, en gibioctets.

## API

Utilisez [l'API Cloudcraft][1] pour accéder et afficher vos diagrammes d'architecture sous forme d'objets JSON. Voici un exemple d'objet JSON représentant un composant Database for MySQL :

### Schéma

```json
{
    "type": "azuremysql",
    "id": "db7da7f6-9d1a-46df-808c-6979e02d5182",
    "region": "northcentralus",
    "mapPos": [5,0],
    "deploymentOption": "Single",
    "tier": "GeneralPurpose",
    "instance": "GP_Gen5_2",
    "storageMB": 20480,
    "haEnabled": false,
    "backupRetention": 7,
    "color": {
        "isometric": null,
        "2d": null
    },
    "accentColor": {
        "isometric": null,
        "2d": null
    },
    "link": "https://azure.microsoft.com/products/mysql",
    "locked": true
}
```

- **type: string** : le type de composant. Doit être une chaîne ayant pour valeur `azuremysql` pour ce composant.
- **id: string, uuid** : l'identifiant unique du composant. L’API utilise un UUID v4 en interne mais accepte toute chaîne unique.
- **resourceId : string** : L'identifiant unique global du composant dans Azure.
- **region: string** : la région Azure du composant. L'API prend en charge toutes les régions globales, sauf la Chine.
- **mapPos: array** : la position du composant dans le blueprint. L'API utilise une paire de coordonnées X et Y pour indiquer la position.
- **deploymentOption: string** : type de déploiement de la base de données. La valeur par défaut est `Single`.
- **tier: string** : niveau de performance de la base de données. La valeur par défaut est `GeneralPurpose`.
- **instance: string** : type d'instance de la base de données. La valeur par défaut est `GP_Gen5_2`.
- **storageMB: string** : volume total de stockage disponible pour la base de données, en mégaoctets. La valeur par défaut est `20480`.
- **haEnabled: boolean** : indique si la haute disponibilité est activée. La valeur par défaut est `false`.
- **color : object** : La couleur de remplissage du corps du composant.
  - **isometric: string** : couleur hexadécimale pour le corps du composant en vue 3D. La valeur par défaut est `#CEE0F5`.
  - **2d: string** : couleur hexadécimale du corps en vue 2D. La valeur par défaut est `null`.
- **accentColor: object** : couleur d'accentuation du logo du composant.
  - **isometric: string** : couleur hexadécimale du logo en vue 3D. La valeur par défaut est `#0078D4`.
  - **2d: string** : couleur hexadécimale du logo en vue 2D. La valeur par défaut est `null`.
- **link: string, uri** : URI permettant de lier le composant à un autre diagramme ou à une page externe. Accepte le format `blueprint://` ou `https://`.
- **locked: boolean** : détermine si la position du composant peut être modifiée via l’interface web. La valeur par défaut est `false`.

[1]: https://developers.cloudcraft.co/