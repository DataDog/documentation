---
title: Composant SNS (obsolète)
---
## Présentation

Utilisez le composant SNS pour représenter les services de notification de votre architecture Amazon Web Services.

{{< img src="cloudcraft/components-aws/sns/component-sns-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft montrant le composant AWS 'SNS'." responsive="true" style="width:60%;">}}

## Barre d'outils

Servez-vous de la barre d'outils pour configurer et personnaliser le composant selon vos besoins. Voici les options disponibles :

- **Color** : sélectionnez une couleur prédéfinie ou indiquez sa valeur hexadécimale pour le composant et son accent. Vous pouvez appliquer la même couleur aux vues 2D et 3D, ou choisir une couleur différente pour chaque vue.
- **Rotate item** : faites pivoter le composant et modifiez son orientation.
- **Requests/month (K)** : indiquez le nombre de requêtes envoyées par mois, en milliers.
- **Notifications/month (K)** : indiquez le nombre de notifications envoyées par mois, en milliers.
- **Notification type** : sélectionnez le type de notification pour le composant SNS.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON.

### Schéma

Voici un exemple d'objet JSON d'un composant SNS :

```json
{
  "type": "sns",
  "id": "76b1a724-2617-48e8-9be5-c71ccf5689cb",
  "region": "us-east-1",
  "mapPos": [0,10],
  "direction": "down",
  "requests": 20,
  "notifications": 20,
  "notificationType": "email",
  "color": {
    "isometric": "#333333",
    "2d": "#333333"
  },
  "accentColor": {
    "isometric": "#f5b720",
    "2d": "#f5b720"
  },
  "link": "https://aws.amazon.com/sns/",
  "locked": true
}
```

- **type: sns** : le type de composant.
- **id: string** : identifiant unique du composant au format `uuid`.
- **region: string** : région AWS dans laquelle l'instance SNS est déployée. Toutes les régions globales sont prises en charge, à l'exception des régions `cn-`.
- **mapPos: [number, number]** : position du composant dans le blueprint, exprimée par une paire de coordonnées x et y.
- **direction: string** : rotation ou orientation du composant. Les valeurs acceptées sont `down`, `up`, `right` ou `left`. Par défaut, `down`.
- **requests: number** : nombre de requêtes envoyées par mois, en milliers. Par défaut, `1`.
- **notifications: number** : nombre de notifications envoyées par mois, en milliers. Par défaut, `1`.
- **notificationType: string** : type de notification utilisé par SNS. Consultez la section [Valeurs acceptées pour `notificationType`](#valeurs-acceptees-pour-notificationtype) pour plus d'informations.
- **color: object** : couleur de remplissage du corps du composant.
  - **isometric: string** : couleur de remplissage du composant dans la vue 3D. Doit être une couleur hexadécimale.
  - **2d: string** : couleur de remplissage du composant dans la vue en 2D. Doit être une couleur hexadécimale.
- **accentColor: object** : couleur d'accent utilisée pour afficher le logo du composant sur le bloc.
  - **isometric: string** : couleur d'accent du composant dans la vue en 3D. Doit être une couleur hexadécimale.
  - **2d: string** : couleur d'accent du composant dans la vue en 2D. Doit être une couleur hexadécimale.
- **link: uri** : liez le composant à un autre diagramme en utilisant le format `blueprint://ID` ou à un site externe avec le format `https://LINK`.
- **locked: boolean** : si `true`, les modifications apportées au composant via l'application sont désactivées jusqu'à ce qu'il soit déverrouillé.

## Valeurs acceptées pour `notificationType`

La clé `notificationType` accepte les valeurs suivantes :

```
email, email-json, http, https, lambda, mobile, sms, sqs
```

[1]: https://developers.cloudcraft.co/