---
title: Composant Bastion
---

## Présentation

Vous pouvez utiliser le composant Bastion pour représenter et visualiser les serveurs Bastion de votre environnement Azure.

{{< img src="cloudcraft/components-azure/bastion/component-bastion-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft montrant des composants Azure interconnectés." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez les couleurs d’accent et de remplissage du corps du composant en vue 3D.
- **Tier** : sélectionnez le niveau de service de votre serveur Bastion.
- **Scale units** : saisissez le nombre d'unités d'échelle de votre serveur Bastion. Cette option est uniquement disponible pour le niveau Standard.
- **Outbound data transfer (GB)** : saisissez le volume total de données sortantes transférées par votre serveur Bastion, en gigaoctets.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON. Voici un exemple d'objet JSON d'un composant Bastion :

### Schéma

```json
{
    "type": "azurebastion",
    "id": "efe6a642-dc6d-4ea3-ab3c-465358f10e15",
    "resourceId": "/subscriptions/14cc8259-0159-45d7-801b-2b209bac6e98/resourceGroups/CLOUDCRAFT/providers/Microsoft.Network/bastionHosts/BastionDoc",
    "region": "eastus",
    "mapPos": [2,10],
    "tier": "Basic",
    "scaleUnits": 1,
    "outboundDataTransfer": 0,
    "color": {
        "isometric": "#CEE0F5",
        "2d": "null"
    },
    "accentColor": {
        "isometric": "#0078D4",
        "2d": "null"
    },
    "link": "https://azure.microsoft.com/products/azure-bastion/",
    "locked": true
}
```

- **type: chaîne** : le type de composant. Doit être une chaîne ayant pour valeur `azurebastion` pour ce composant.
- **id: chaîne, uuid** : l'identifiant unique du composant. L’API utilise un UUID v4 en interne mais accepte toute chaîne unique.
- **resourceId: chaîne** : l'identifiant unique global du composant dans Azure.
- **region: chaîne** : la région Azure du composant. L'API prend en charge toutes les régions globales, sauf la Chine.
- **mapPos: tableau** : la position du composant dans le blueprint. L'API utilise une paire de coordonnées X et Y pour indiquer la position.
- **tier: chaîne** : le niveau de service de votre serveur Bastion. Valeurs acceptées : `Basic` et `Standard`. Valeur par défaut : `Standard`.
- **scaleUnits: nombre** : le nombre d'unités d'échelle du serveur Bastion.
- **outboundDataTransfer: nombre** : le volume total de données sortantes transférées par le serveur Bastion, en gigaoctets. Valeur par défaut : `0`.
- **color: objet** : la couleur de remplissage du corps du composant.
  - **isometric: chaîne** : la couleur hexadécimale du corps du composant dans la vue 3D. Valeur par défaut : `#ececed`.
  - **2d: chaîne** : la couleur hexadécimale du corps du composant dans la vue 2D. Valeur par défaut : `null`.
- **accentColor: objet** : la couleur d'accent du logo du composant.
  - **isometric: chaîne** : la couleur hexadécimale du logo du composant dans la vue 3D. Valeur par défaut : `#0078d4`.
  - **2d: chaîne** : la couleur hexadécimale du logo du composant dans la vue 2D. Valeur par défaut : `null`.
- **link: string, uri** : une URI permettant de lier le composant à un autre diagramme ou à un site externe. Accepte le format `blueprint://` ou le format `https://`.
- **locked: booléen** : détermine si la position du composant peut être modifiée via l’interface web. Valeur par défaut : `false`.

[1]: https://developers.cloudcraft.co/