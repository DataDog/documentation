---
title: Composant Web App
---

## Présentation

Vous pouvez utiliser le composant Web App pour représenter et visualiser les applications web de votre environnement Azure.

{{< img src="cloudcraft/components-azure/web-app/component-web-app-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft montrant des composants Web App Azure interconnectés." responsive="true" style="width:60%;">}}

## Toolbar

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez les couleurs d’accent et de remplissage du corps du composant en vue 3D.
- **Platform** : sélectionnez la plateforme de votre application web. Les options disponibles sont Windows et Linux.
- **Tier** : sélectionnez le niveau de service de votre application web.
- **Instance** : sélectionnez le type d'instance de votre application web.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON. Voici un exemple d'objet JSON d'un composant Web App :

### Schéma

```json
{
  "type": "azurewebapp",
  "id": "274993bf-646d-4046-a20a-063a243e22b7",
  "resourceId": "/subscriptions/4f02467b-945a-4d06-8789-66b52d1c92a3/resourceGroups/CLOUDCRAFT/providers/Microsoft.Web/sites/docsite#componentType=azurewebapp",
  "region": "eastus",
  "mapPos": [0, 8],
  "platform": "Windows",
  "tier": "Basic",
  "instance": "B1",
  "color": {
      "isometric": "#ececed",
      "2d": null
  },
  "accentColor": {
      "isometric": "#4286c5",
      "2d": null
  },
  "link": "https://azure.microsoft.com/products/app-service/web/",
  "locked": true
}
```

- **type: chaîne** : le type de composant. Doit être une chaîne ayant pour valeur `azurewebapp` pour ce composant.
- **id: chaîne, uuid** : l'identifiant unique du composant. L’API utilise un UUID v4 en interne mais accepte toute chaîne unique.
- **resourceId: chaîne** : l'identifiant unique global du composant dans Azure.
- **region: chaîne** : la région Azure du composant. L'API prend en charge toutes les régions globales, sauf la Chine.
- **mapPos: tableau** : la position du composant dans le blueprint. L'API utilise une paire de coordonnées X et Y pour indiquer la position.
- **platform: chaîne** : la plateforme de l'application web. Valeurs acceptées : `Windows` et `Linux`. Valeur par défaut : `Linux`.
- **tier: chaîne** : le niveau de service de l'application web. [Consultez la rubrique ci-dessous pour en savoir plus](#valeurs-acceptees-pour-tier). Valeur par défaut : `Basic`.
- **instance: chaîne** : le type d'instance de l'application web. [Consultez la rubrique ci-dessous pour en savoir plus](#valeurs-acceptees-pour-instance). Valeur par défaut : `B1`.
- **color: objet** : la couleur de remplissage du corps du composant.
  - **isometric: chaîne** : la couleur hexadécimale du corps du composant dans la vue 3D. Valeur par défaut : `#ececed`.
  - **2d: chaîne** : la couleur hexadécimale du corps du composant dans la vue 2D. Valeur par défaut : `null`.
- **accentColor: objet** : la couleur d'accent du logo du composant.
  - **isometric: string** : couleur hexadécimale du logo du composant en vue 3D. Valeur par défaut : `#4286c5`.
  - **2d: chaîne** : la couleur hexadécimale du logo du composant dans la vue 2D. Valeur par défaut : `null`.
- **link: string, uri** : une URI permettant de lier le composant à un autre diagramme ou à un site externe. Accepte le format `blueprint://` ou le format `https://`.
- **locked: booléen** : détermine si la position du composant peut être modifiée via l’interface web. Valeur par défaut : `false`.

## Valeurs acceptées pour tier

La clé `tier` accepte les valeurs suivantes :

```
Basic, Free, Isolated, "Isolated v2", "Premium v2", "Premium v3", Shared, Standard
```

## Valeurs acceptées pour instance

La clé `instance` accepte les valeurs suivantes :

```
B1, B2, B3, F1, I1, I2, I3, "I1 v2", "I2 v2", "I3 v2", "I4 v2", "I5 v2",
"I6 v2", "P1 v2", "P2 v2", "P3 v2", P0v3, "P1 v3", P1mv3, "P2 v3",
P2mv3, "P3 v3", P3mv3, P4mv3, P5mv3, D1, S1, S2, S3
```

## Combinaisons valides pour les clés tier et instance

Les clés `tier` et `instance` définissent conjointement les ressources allouées à une application. Vous devez néanmoins fournir une combinaison de valeurs valide.

Le tableau suivant répertorie les combinaisons valides.

tier        | instance
----------- | ---------
Basic       | B1, B2, B3
Free        | F1
Isolated    | I1, I2, I3
Isolated v2 | I1 v2, I2 v2, I3 v2, I4 v2, I5 v2, I6 v2
Premium v2  | P1 v2, P2 v2, P3 v2
Premium v3  | P0v3, P1 v3, P1mv3, P2 v3, P2mv3, P3 v3, P3mv3, P4mv3, P5mv3
Shared      | D1
Standard    | S1, S2, S3

[1]: https://developers.cloudcraft.co/