---
title: Composant API Gateway
---
## Présentation

Utilisez le composant API Gateway pour représenter les API RESTful, HTTP et WebSocket de votre architecture Amazon Web Services.

{{< img src="cloudcraft/components-aws/api-gateway/component-api-gateway-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft montrant le composant AWS 'API gateway'." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d'outils pour configurer et personnaliser votre composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez une couleur prédéfinie ou indiquez sa valeur hexadécimale pour le composant et son accent. Vous pouvez appliquer la même couleur aux vues 2D et 3D, ou choisir une couleur différente pour chaque vue.
- **Rotate item** : faites pivoter le composant et modifiez son orientation.
- **API Type** : sélectionnez le type d'API pour la passerelle.
- **M req./month** : saisissez le nombre de requêtes envoyées par mois, en millions.
- **M min./month** : saisissez le nombre de messages envoyés par minute, en millions. Disponible uniquement pour les API de type `websocket`.
- **Cache Memory (GB)**. Sélectionnez la quantité de mémoire utilisée pour la mise en cache des réponses d'API, en gigaoctets. Disponible uniquement pour les API de type `rest`.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON.

### Schéma

Voici un exemple d'objet JSON d'un API Gateway :

```json
{
  "type": "apigateway",
  "id": "5635395f-9441-494d-bcc7-5dd4f5c93ce1",
  "region": "us-east-1",
  "mapPos": [0,10],
  "direction": "down",
  "apiType": "rest",
  "apiCalls": "10",
  "connectionMinutes": 0,
  "cache": 1.6,
  "color": {
    "isometric": "#3c3c3c",
    "2d": "#693cc5"
  },
  "accentColor": {
    "isometric": "#f4b934",
    "2d": "#ffffff"
  },
  "link": "https://aws.amazon.com/api-gateway/",
  "locked": true
}
```

- **type: apigateway** : le type de composant.
- **id: string** : un identifiant unique pour le composant au format `uuid`.
- **region: string** : la région AWS dans laquelle l'API Gateway est déployé. Toutes les régions globales sont prises en charge, à l'exception des régions `cn-`.
- **mapPos: [nombre, nombre]**. la position du composant dans le blueprint, exprimée par une paire de coordonnées x et y.
- **direction: string** : la rotation ou la direction du composant. Les valeurs acceptées sont `down` ou `right`. Valeur par défaut : `down`.
- **apiType: string** : le type d'API utilisé pour la passerelle. Les valeurs acceptées sont `rest`, `http` et `websocket`.
- **apiCalls: number** : le nombre d'appels d'API effectués par mois, en millions. Valeur par défaut : `5`.
- **connectionMinutes: number** : le nombre de messages envoyés par minute, en millions. Applicable uniquement si `apiType` est défini sur `websocket`. Valeur par défaut : `0`.
- **cache: number** : la quantité de mémoire utilisée pour la mise en cache des réponses d'API, en gigaoctets. Applicable uniquement si `apiType` est défini sur `rest`. Consultez la section [Valeurs acceptées pour cache](#valeurs-acceptees-pour-cache) pour plus d'informations. 
- **color: object** : la couleur de remplissage du corps du composant.
  - **isometric: string** : couleur de remplissage du composant dans la vue 3D. Doit être une couleur hexadécimale.
  - **2d: string** : la couleur de remplissage du composant dans la vue en 2D. Doit être une couleur hexadécimale.
- **accentColor: object** : couleur d'accent utilisée pour afficher le logo du composant sur le bloc.
  - **isometric: string** : la couleur d'accent du composant dans la vue en 3D. Doit être une couleur hexadécimale.
  - **2d: string** : la couleur d'accent du composant dans la vue en 2D. Doit être une couleur hexadécimale.
- **link: uri** : liez le composant à un autre diagramme en utilisant le format `blueprint://ID` ou à un site externe avec le format `https://LINK`.
- **locked: boolean** : si `true`, les modifications apportées au composant via l'application sont désactivées jusqu'à ce qu'il soit déverrouillé.

## Valeurs acceptées pour cache

La clé `cache` a pour valeur par défaut `1.6` et accepte les valeurs suivantes :

```
0, 0.5, 1.6, 6.1, 13.5, 28.4, 58.2, 118.0, 237.0
```

[1]: https://developers.cloudcraft.co/