---
title: Composant Service Bus Queue
---

## Présentation

Vous pouvez utiliser le composant Service Bus Queue pour représenter et visualiser les intégrations de messagerie cloud en tant que service de votre environnement Azure.

{{< img src="cloudcraft/components-azure/service-bus-queue/component-service-bus-queue-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft montrant des composants Azure interconnectés." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez les couleurs d’accent et de remplissage du corps du composant en vue 3D.
- **Tier** : sélectionnez le niveau de service de votre file d'attente Service Bus.
- **Operations (M/month)** : saisissez le nombre d'opérations mensuelles, en millions. Cette option n'est pas disponible pour le niveau de service Premium.
- **Brokered connections** : saisissez le nombre de connexions réparties de votre file d'attente. Cette option est uniquement disponible pour le niveau de service Standard.
- **Hybrid connections** : saisissez le nombre de connexions hybrides de votre file d'attente. Cette option est uniquement disponible pour le niveau de service Standard.
- **Data transfer (GB)** : saisissez le volume total de données mensuelles transférées, en gigaoctets. Cette option est uniquement disponible pour le niveau de service Standard.
- **Relay hours** : saisissez le nombre d'heures de relais de votre file d'attente. Cette option est uniquement disponible pour le niveau de service Standard.
- **Relay messages (K/mo)** : saisissez le nombre de messages mensuels relayés, en milliers. Cette option est uniquement disponible pour le niveau de service Standard.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON. Voici un exemple d'objet JSON d'un composant Service Bus Queue :

### Schéma

```json
{
    "type": "azuresbqueue",
    "id": "6bf0b7c5-20c4-46ac-8afb-48ea207c3961",
    "region": "northcentralus",
    "mapPos": [4,2],
    "tier": "Standard",
    "operationsPerMonth": 0,
    "brokeredConnections": 0,
    "hybridConnections": 0,
    "dataTransferGb": 0,
    "relayHours": 0,
    "relayMessages": 0,
    "color": {
        "isometric": null,
        "2d": null
    },
    "accentColor": {
        "isometric": null,
        "2d": null
    },
    "link": "https://azure.microsoft.com/products/service-bus",
    "locked": true
}
```

- **type: chaîne** : le type de composant. Doit être une chaîne ayant pour valeur `azuresbqueue` pour ce composant.
- **id: chaîne, uuid** : l'identifiant unique du composant. L’API utilise un UUID v4 en interne mais accepte toute chaîne unique.
- **resourceId: chaîne** : l'identifiant unique global du composant dans Azure.
- **region: chaîne** : la région Azure du composant. L'API prend en charge toutes les régions globales, sauf la Chine.
- **mapPos: tableau** : la position du composant dans le blueprint. L'API utilise une paire de coordonnées X et Y pour indiquer la position.
- **tier: chaîne** : le niveau de service de la file d'attente. Valeurs acceptées : `Basic`, `Standard` et `Premium`. Valeur par défaut : `Standard`.
- **operationsPerMonth: nombre** : le nombre d'opérations par mois, en millions. Valeur par défaut : `0`.
- **brokeredConnections: nombre** : le nombre de connexions réparties de la file d'attente. Valeur par défaut : `0`.
- **hybridConnections: nombre** : le nombre de connexions hybrides de la file d'attente. Valeur par défaut : `0`.
- **dataTransferGb: nombre** : le volume total de données mensuelles transférées, en gigaoctets. Valeur par défaut : `0`.
- **relayHours: nombre** : le nombre d'heures de relais de la file d'attente. Valeur par défaut : `0`.
- **relayMessages: nombre** : le nombre de messages relayés par mois, en milliers. Valeur par défaut : `0`.
- **color: objet** : la couleur de remplissage du corps du composant.
  - **isometric: chaîne** : la couleur hexadécimale du corps du composant dans la vue 3D. Valeur par défaut : `#CEE0F5`.
  - **2d: chaîne** : la couleur hexadécimale du corps du composant dans la vue 2D. Valeur par défaut : `null`.
- **accentColor: objet** : la couleur d'accent du logo du composant.
  - **isometric: chaîne** : la couleur hexadécimale du logo du composant dans la vue 3D. Valeur par défaut : `#0078D4`.
  - **2d: chaîne** : la couleur hexadécimale du logo du composant dans la vue 2D. Valeur par défaut : `null`.
- **link: string, uri** : une URI permettant de lier le composant à un autre diagramme ou à un site externe. Accepte le format `blueprint://` ou le format `https://`.
- **locked: booléen** : détermine si la position du composant peut être modifiée via l’interface web. Valeur par défaut : `false`.

[1]: https://developers.cloudcraft.co/