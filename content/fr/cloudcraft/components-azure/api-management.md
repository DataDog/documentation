---
title: Composant API Management
---

## Présentation

Vous pouvez utiliser le composant API Management pour représenter et visualiser les plateformes de gestion des API issues de votre environnement Azure.

{{< img src="cloudcraft/components-azure/api-management/component-api-management-diagram.png" alt="Capture d'écran d'un diagramme Cloudcraft en vue isométrique montrant des composants Azure interconnectés." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionner les couleurs d’accent et de remplissage du corps du composant en vue 3D.
- **Tier** : sélectionnez le niveau de service de votre plateforme de gestion des API.
- **Calls** : saisissez le nombre total d'appels à l'API. Disponible uniquement pour le niveau **Consumption**.
- **Unités** : saisissez le nombre d'unités pour la plateforme de gestion des API. Disponible uniquement pour le niveau **Premium**.
- **Passerelles auto-hébergées** : saisissez le nombre de passerelles API autohébergées. Disponible uniquement pour le niveau **Premium**.
- **Tourner l'élément** : faites pivoter le composant par rapport au plan. Disponible uniquement en vue 3D.

## API

Utilisez [l'API Cloudcraft][1] pour accéder et afficher vos diagrammes d'architecture sous forme d'objets JSON. Voici un exemple d'objet JSON représentant un composant API Management :

### Schéma

```json
{
    "type": "azureapimanagement",
    "id": "ccff5631-c1cd-4ed6-8d21-bb60e676fedf",
    "region": "northcentralus",
    "mapPos": [5,0.25],
    "tier": "Consumption",
    "calls": 0,
    "units": 1,
    "gateways": 0,
    "direction": "down",
    "color": {
        "isometric": null,
        "2d": null
    },
    "accentColor": {
        "isometric": null,
        "2d": null
    },
    "link": "https://azure.microsoft.com/products/api-management/",
    "locked": true
}
```

- **type: string** : type du composant. Doit être la chaîne `azureapimanagement` pour ce composant.
- **id: string, uuid** : l’identifiant unique du composant. L’API utilise un UUID v4 en interne mais accepte toute chaîne unique.
- **resourceId: string** : l’identifiant globalement unique du composant dans Azure.
- **region: string** : la région Azure du composant. L’API prend en charge toutes les régions globales, sauf la Chine.
- **mapPos: array** : la position du composant dans le blueprint. L’API utilise une paire de coordonnées X et Y pour indiquer la position.
- **tier: string** : niveau de service de la plateforme de gestion des API. [Voir la documentation Azure pour plus d'informations][2]. Par défaut `Consumption`.
- **calls: number** : nombre d'appels à l'API. Par défaut `0`.
- **units: number** : nombre d'unités de la plateforme de gestion des API. Par défaut `1`.
- **gateways: number** : nombre de passerelles API autohébergées. Par défaut `0`.
- **direction: string** : orientation du composant par rapport au blueprint. Accepte `down` ou `right`. Par défaut `down`.
- **color: object** : couleur de remplissage du corps du composant.
  - **isometric: string** : couleur hexadécimale du corps en vue 3D. Par défaut `#075693`.
  - **2d: string** : couleur hexadécimale du corps en vue 2D. Par défaut `null`.
- **accentColor: object** : couleur d'accentuation du logo du composant.
  - **isometric: string** : couleur hexadécimale du logo en vue 3D. Par défaut `#2EC8EA`.
  - **2d: string** : couleur hexadécimale du logo en vue 2D. Par défaut `null`.
- **link: string, uri** : URI permettant de lier le composant à un autre diagramme ou à une page externe. Accepte le format `blueprint://` ou `https://`.
- **locked: boolean** : détermine si la position du composant peut être modifiée via l’interface web. Valeur par défaut : `false`.

[1]: https://developers.cloudcraft.co/
[2]: https://learn.microsoft.com/en-us/azure/api-management/api-management-features