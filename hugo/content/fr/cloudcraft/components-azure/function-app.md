---
title: Composant Function App
---

## Présentation

Vous pouvez utiliser le composant Function App pour représenter et visualiser un groupe d’Azure Functions issues de votre environnement Azure.

{{< img src="cloudcraft/components-azure/function-app/component-function-app-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft montrant des fonctions Azure interconnectées." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionner les couleurs d’accent et de remplissage du corps du composant en vue 3D.
- **Tier** : sélectionner le plan d’hébergement de l’application Function.
- **vCPU** : indiquer le nombre moyen d’unités de calcul utilisées par les fonctions.
- **Memory (GB)** : indiquer la quantité moyenne de mémoire, en gigaoctets, utilisée par les fonctions.
- **Duration (ms)** : indiquer la durée moyenne d’exécution des fonctions, en millisecondes.
- **Executions (MM/m)** : indiquer le nombre d’invocations de fonctions par mois, en millions.

## API

Utilisez [l’API Cloudcraft][1] pour accéder à vos diagrammes d’architecture et les générer sous forme d’objets JSON. Voici un exemple d’objet JSON pour un composant Function App :

### Schéma

```json
{
  "type": "azurefunctionapp",
  "id": "939f0381-96aa-4e44-bc04-7993a121384e",
  "resourceId": "/subscriptions/76f00a52-98a8-4e61-892c-bb327ded2352/resourceGroups/CLOUDCRAFT/providers/Microsoft.Web/sites/doc-functions",
  "region": "eastus",
  "mapPos": [1, 8],
  "tier": "consumption",
  "vcpu": 1,
  "memoryGB": 0.5,
  "durationMS": 1000,
  "executionsMM": 3,
  "color": {
    "isometric": "#ececed",
    "2d": null
  },
  "accentColor": {
    "isometric": "#4286c5",
    "2d": null
  },
  "link": "https://azure.microsoft.com/en-us/products/functions/",
  "locked": true
}
```

- **type: string** : le type du composant. Doit être la chaîne `azurefunctionapp` pour ce composant.
- **id: string, uuid** : l’identifiant unique du composant. L’API utilise un UUID v4 en interne mais accepte toute chaîne unique.
- **resourceId: string** : l’identifiant globalement unique du composant dans Azure.
- **region: string** : la région Azure du composant. L’API prend en charge toutes les régions globales, sauf la Chine.
- **mapPos: array** : la position du composant dans le blueprint. L’API utilise une paire de coordonnées X et Y pour indiquer la position.
- **tier: string** : le plan d’hébergement de l’application. Accepte `consumption` ou `premium`. La valeur par défaut est `consumption`.
- **vcpu: number** : le nombre moyen d’unités de calcul utilisées par les fonctions. Valeur par défaut : `1`.
- **memoryGB: number** : la quantité moyenne de mémoire utilisée par les fonctions, en gigaoctets. Valeur par défaut : `0.5`.
- **durationMS: number** : la durée moyenne d’exécution des fonctions, en millisecondes. Valeur par défaut : `1000`.
- **executionsMM: number** : le nombre d’invocations par mois, en millions. Valeur par défaut : `3`.
- **color: object** : la couleur de remplissage du corps du composant.
  - **isometric: string** : couleur hexadécimale pour le corps du composant en vue 3D. Valeur par défaut : `#ececed`.
  - **2d: string** : couleur hexadécimale pour le corps du composant en vue 2D. Valeur par défaut : `null`.
- **accentColor: object** : la couleur d’accentuation du logo du composant.
  - **isometric: string** : couleur hexadécimale du logo en vue 3D. Valeur par défaut : `#1490df`.
  - **2d: string** : couleur hexadécimale du logo en vue 2D. Valeur par défaut : `null`.
- **link: string, uri** : URI permettant de lier le composant à un autre diagramme ou à une page externe. Accepte le format `blueprint://` ou `https://`.
- **locked: boolean** : détermine si la position du composant peut être modifiée via l’interface web. Valeur par défaut : `false`.

[1]: https://developers.cloudcraft.co/