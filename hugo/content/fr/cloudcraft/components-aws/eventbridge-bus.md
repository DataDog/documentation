---
title: Composant EventBridge Bus
---

## Présentation

Utilisez le composant EventBridge Bus pour représenter les bus d'événements sans serveur de votre architecture Amazon Web Services.

{{< img src="cloudcraft/components-aws/eventbridge-bus/component-eventbridge-bus-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft représentant le composant EventBridge Bus AWS." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez une couleur de remplissage pour le corps du composant et une couleur d'accent pour son symbole. Vous pouvez utiliser les mêmes couleurs pour les vues 2D et 3D ou des couleurs différentes. 
- **Type** : sélectionnez le type de votre bus d'événements.
- **Event size** : saisissez la taille de votre événement, en kilooctets.
- **Custom evnt./mo** : saisissez le nombre d'événements personnalisés traités par mois, en millions.
- **Partner evnt./mo** : saisissez le nombre d'événements de partenaire traités par mois, en millions.
- **Cross-region evnt./mo** : saisissez le nombre d'événements interrégion traités par mois, en millions.
- **Bus-2-bus evnt./mo** : saisissez le nombre d'événements d'un bus à un autre traités par mois, en millions.
- **Rotate item** : faites pivoter le composant pour modifier son orientation.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON.

### Schéma

Voici un exemple d'objet JSON d'un composant EventBridge Bus :

```json
{
    "type": "eventbus",
    "id": "2791cea2-f727-428f-a504-3358bfcba66f",
    "region": "us-east-1",
    "mapPos": [-2,11],
    "direction": "down",
    "eventBusType": "default",
    "eventSize": 1,
    "numCustomEvents": 0,
    "numPartnerEvents": 0,
    "numCrossRegionEvents": 0,
    "numBus2BusEvents": 0,
    "color": {
        "isometric": "#ECECED",
        "2d": "#CC2264"
    },
    "accentColor": {
        "isometric": "#4286C5",
        "2d": "#FFFFFF"
    },
    "link": "https://aws.amazon.com/eventbridge/",
    "locked": true
}
```

- **type: chaîne** : le type de composant.
- **id: chaîne** : un identifiant unique pour le composant au format `uuid`.
- **arn: chaîne** : l'identifiant unique global du composant dans AWS, désigné par le terme [Amazon Resource Name (ARN)](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html).
- **region: chaîne** : la région AWS dans laquelle le répartiteur de charge est déployé. Toutes les régions globales sont prises en charge, à l'exception des régions `cn-`.
- **mapPos: [nombre, nombre]** : la position du composant dans le blueprint, exprimée par une paire de coordonnées x et y.
- **direction: chaîne** : la rotation du composant dans le blueprint. Valeurs acceptées : `down` et `right`. Valeur par défaut : `down`.
- **eventBusType: chaîne** : le type de bus d'événements. Valeurs acceptées : `default` et `custom`. Valeur par défaut : `default`.
- **eventSize: nombre** : la taille de l'événement, en kilooctets. Valeur par défaut : `1`.
- **numCustomEvents: nombre** : le nombre d'événements personnalisés traités par mois, en millions. Valeur par défaut : `0`.
- **numPartnerEvents: nombre** : le nombre d'événements de partenaire traités par mois, en millions. Valeur par défaut : `0`.
- **numCrossRegionEvents: nombre** : le nombre d'événements interrégion traités par mois, en millions. Valeur par défaut : `0`.
- **numBus2BusEvents: nombre** : le nombre d'événements d'un bus à un autre traités par mois, en millions. Valeur par défaut : `0`.
- **color: objet** : la couleur de remplissage du corps du composant.
  - **isometric: chaîne** : la couleur de remplissage pour le composant dans la vue 3D. Doit être une couleur hexadécimale. Valeur par défaut : `#ECECED`.
  - **2d: chaîne** : la couleur de remplissage pour le composant dans la vue 2D. Doit être une couleur hexadécimale. Valeur par défaut : `#CC2264`.
- **accentColor: objet** : la couleur d'accent utilisée pour afficher le logo du composant au-dessus du bloc.
  - **isometric: chaîne** : la couleur d'accent pour le composant dans la vue 3D. Doit être une couleur hexadécimale. Valeur par défaut : `#4286C5`.
  - **2d: chaîne** : la couleur d'accent pour le composant dans la vue 2D. Doit être une couleur hexadécimale. Valeur par défaut : `#FFFFFF`.
- **link: uri** : liez le composant à un autre diagramme en utilisant le format `blueprint://ID` ou à un site externe avec le format `https://LINK`.
- **locked: booléen** : si `true`, les modifications apportées au composant via l'application sont désactivées jusqu'à ce qu'il soit déverrouillé.