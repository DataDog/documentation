---
title: Composant SNS Subscriptions
---
## Présentation

Utilisez le composant SNS Subscriptions pour visualiser les abonnements SNS de votre architecture Amazon Web Services.

{{< img src="cloudcraft/components-aws/sns-subscriptions/component-sns-subscriptions-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft montrant des composants AWS interconnectés." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez une couleur de remplissage pour le corps du composant et une couleur d'accent pour son symbole. Vous pouvez utiliser les mêmes couleurs pour les vues 2D et 3D ou des couleurs différentes.
- **Notifications/mo (K)** : saisissez le nombre de notifications par mois, en milliers.
- **Notification type** : sélectionnez le type de notification pour le composant SNS.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON.

### Schéma

Voici un exemple d'objet JSON d'un composant SNS Subscriptions :

```
{
    "type": "snssubscriptions",
    "id": "ba29170b-5015-419f-b617-86fe788bafcb",
    "region": "us-east-1",
    "mapPos": [0,8],
    "notifications": 1,
    "notificationType": "mobile"
    "color": {
        "isometric": "#ECECED",
        "2d": "#CC2264"
    },
    "accentColor": {
        "isometric": "#4286C5",
        "2d": "#FFFFFF"
    },
    "link": "https://aws.amazon.com/sns/",
    "locked": true
}
```

- **type: chaîne** : le type de composant. Doit être une chaîne ayant pour valeur `snssubscriptions` pour ce composant.
- **id: chaîne, uuid** : l'identifiant unique du composant. L’API utilise un UUID v4 en interne mais accepte toute chaîne unique.
- **arn: chaîne** : l'identifiant global unique du composant dans AWS, aussi appelé [Amazon Resource Name][2].
- **region: chaîne** : la région AWS associée au composant. Toutes les régions globales sont prises en charge, [sauf la Chine AWS][3].
- **mapPos: tableau** : la position du composant dans le blueprint, exprimée par une paire de coordonnées x et y.
- **notifications: nombre** : le nombre de notifications par mois, en milliers. Valeur par défaut : `1`.
- **notificationType: chaîne** : le type de notification pour SNS. Consultez la section [Valeurs acceptées pour `notificationType`](#valeurs-acceptees-pour-notificationtype) pour en savoir plus. Valeur par défaut : `mobile`.
- **color: objet** : la couleur de remplissage du corps du composant.
  - **isometric: chaîne** : la couleur hexadécimale du corps du composant dans la vue 3D. Valeur par défaut : `#ECECED`.
  - **2d: chaîne** : la couleur hexadécimale du corps du composant dans la vue 2D. Valeur par défaut : `#CC2264`.
- **accentColor: objet** : la couleur d'accent du logo du composant.
  - **isometric: chaîne** : la couleur hexadécimale du logo du composant dans la vue 3D. Valeur par défaut : `#4286C5`.
  - **2d: chaîne** : la couleur hexadécimale du logo du composant dans la vue 2D. Valeur par défaut : `#FFFFFF`.
- **link: string, uri** : une URI permettant de lier le composant à un autre diagramme ou à un site externe. Accepte les formats `blueprint://` ou `https://`.
- **locked: booléen** : détermine si la position du composant peut être modifiée via l’interface web. Valeur par défaut : `false`.

## Valeurs acceptées pour `notificationType`

La clé `notificationType` accepte les valeurs suivantes :

```
mobile, sms, email, emil-json, http, https, sqs, lambda
```

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: https://help.cloudcraft.co/article/110-scan-error-aws-china-region