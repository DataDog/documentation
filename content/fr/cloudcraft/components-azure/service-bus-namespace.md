---
title: Composant Service bus namespace
---

## Présentation

Vous pouvez utiliser le composant Service Bus Namespace pour représenter et visualiser les intégrations de services de messagerie en nuage à partir de votre environnement Azure.

{{< img src="cloudcraft/components-azure/service-bus-namespace/component-service-bus-namespace-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft montrant des composants Azure interconnectés." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez les couleurs d’accent et de remplissage du corps du composant en vue 3D.
- **Name** : saisissez le nom de votre espace de nommage.
- **Tier** : sélectionnez le niveau de service pour l'espace de nommage de votre bus de service.
- **Messaging units** : sélectionnez le nombre d'unités de messagerie disponibles pour votre namspace. Disponible uniquement pour le niveau **Premium**.

## API

Utilisez [l’API Cloudcraft][1] pour accéder à vos diagrammes d’architecture et les générer sous forme d’objets JSON. Voici un exemple d’objet JSON pour un composant Service bus namespace :

### Schéma

```json
{
    "type": "azuresbnamespace",
    "id": "5a5b710a-2a36-421b-9ac9-f94f545f8c46",
    "region": "northcentralus",
    "mapPos": [3,-1],
    "mapSize": [5,5],
    "nodes": [
        "3c9f4d24-3653-4da5-a6a5-e375448aff4e",
        "7f836b25-2a69-4be4-8b35-c0f67480eafd",
        "6bf0b7c5-20c4-46ac-8afb-48ea207c3961",
        "afb6e41c-32c6-4e6f-b11d-6606957e4588"
    ],
    "name": "Namespace",
    "tier": "Basic",
    "messagingUnits": 1,
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

- **type: string** : le type de composant. Doit être une chaîne ayant pour valeur `azuresbnamespace` pour ce composant.
- **id: string, uuid** : l'identifiant unique du composant. L’API utilise un UUID v4 en interne mais accepte toute chaîne unique.
- **resourceId : string** : l'identifiant unique global du composant dans Azure.
- **region: string** : la région Azure du composant. L'API prend en charge toutes les régions globales, sauf la Chine.
- **mapPos: array** : la position du composant dans le blueprint. L'API utilise une paire de coordonnées X et Y pour indiquer la position.
- **mapSize: array** : la taille du composant dans le blueprint. L'API utilise une paire de coordonnées X et Y pour indiquer la taille.
- **nodes: array** : les services exécutés dans l'espace de nommage. Accepte un tableau d'identifiants uniques pour les composants [Service Bus Queue][2] et [Service Bus Topic][3].
- **name: string** : le nom de l'espace de nommage. La valeur par défaut est `Namespace`.
- **tier: string** : le niveau de service de l'espace de nommage. Accepte l'une des trois valeurs suivantes : `Basic`, `Standard` et `Premium`. La valeur par défaut est `Basic`.
- **messagingUnits: number** : le nombre d'unités de messagerie disponibles pour l'espace de nommage. Accepte une valeur comprise entre `1` et `16`. La valeur par défaut est `1`.
- **color: object** : la couleur de remplissage du corps du composant.
  - **isometric: string** : la couleur hexadécimale pour le corps du composant en vue 3D. La valeur par défaut est `#CEE0F5`.
  - **2d: string** : la couleur hexadécimale du corps en vue 2D. La valeur par défaut est `null`.
- **accentColor: object** : la couleur d'accentuation du logo du composant.
  - **isometric: string** : la couleur hexadécimale du logo en vue 3D. La valeur par défaut est `#0078D4`.
  - **2d: string** : la couleur hexadécimale du logo en vue 2D. La valeur par défaut est `null`.
- **link: string, uri** : URI permettant de lier le composant à un autre diagramme ou à une page externe. Accepte le format `blueprint://` ou `https://`.
- **locked: boolean** : détermine si la position du composant peut être modifiée via l’interface web. La valeur par défaut est `false`.

[1]: https://developers.cloudcraft.co/
[2]: https://help.cloudcraft.co/article/189-component-service-bus-queue
[3]: https://help.cloudcraft.co/article/190-component-service-bus-topic