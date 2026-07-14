---
title: Composant SES
---
## Présentation

Utilisez le composant SES pour représenter les services d'emails transactionnels et marketing dans votre architecture Amazon Web Services.

{{< img src="cloudcraft/components-aws/ses/component-ses-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft montrant le composant AWS 'SES'." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez une couleur prédéfinie ou indiquez sa valeur hexadécimale pour le composant et son accent. Vous pouvez appliquer la même couleur aux vues 2D et 3D, ou choisir une couleur différente pour chaque vue.
- **Emails/month (K)** : indiquez le nombre de messages email envoyés par mois, en milliers.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON.

### Schéma

Voici un exemple d'objet JSON d'un composant SES :

```json
{
  "type": "ses",
  "id": "11f3e4bc-f827-48b6-9d9c-73e99ca3e289",
  "region": "us-west-2",
  "mapPos": [0,10],
  "emailsOut": 400,
  "color": {
    "isometric": "#0a1538",
    "2d": "#0a1538"
  },
  "accentColor": {
    "isometric": "#2457f2",
    "2d": "#2457f2"
  },
  "link": "https://aws.amazon.com/ses/",
  "locked": true
}
```

- **type: ses** : le type de composant. 
- **id: string** : identifiant unique du composant au format `uuid`.
- **region: string** : la région AWS dans laquelle l’instance SES est déployée. Toutes les régions mondiales sont prises en charge, à l’exception des régions `cn-`.
- **mapPos: [number, number]** : position du composant dans le blueprint, exprimée par une paire de coordonnées x et y.
- **emailsOut: number** : nombre de messages email envoyés par mois, en milliers. Valeur par défaut : `10`. 
- **color: object** : la couleur de remplissage du corps du composant.
  - **isometric: string** : couleur de remplissage du composant dans la vue 3D. Doit être une couleur hexadécimale.
  - **2d: string** : couleur de remplissage du composant dans la vue en 2D. Doit être une couleur hexadécimale.
- **accentColor: object** : couleur d'accent utilisée pour afficher le logo du composant sur le bloc.
  - **isometric: string** : couleur d'accent du composant dans la vue en 3D. Doit être une couleur hexadécimale.
  - **2d: string** : couleur d'accent du composant dans la vue en 2D. Doit être une couleur hexadécimale.
- **link: uri** : liez le composant à un autre diagramme en utilisant le format `blueprint://ID` ou à un site externe avec le format `https://LINK`.
- **locked: boolean** : si `true`, les modifications apportées au composant via l'application sont désactivées jusqu'à ce qu'il soit déverrouillé.

[1]: https://developers.cloudcraft.co/