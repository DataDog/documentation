---
title: Composant Lambda
---
## Présentation

Utilisez le composant Lambda pour représenter les instances Lambda de votre architecture Amazon Web Services.

{{< img src="cloudcraft/components-aws/lambda/component-lambda-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft affichant le composant AWS 'Lambda'." responsive="true" style="width:60%;">}}

## Barre d'outils

Servez-vous de la barre d'outils pour configurer et personnaliser le composant selon vos besoins. Voici les options disponibles :

- **Color** : sélectionnez une couleur prédéfinie ou indiquez sa valeur hexadécimale pour le composant et son accent. Vous pouvez appliquer la même couleur aux vues 2D et 3D, ou choisir une couleur différente pour chaque vue.
- **Architecture** : le type de processeur utilisé par l'instance.
- **Memory** : la quantité de mémoire allouée à l'instance.
- **Requests per month** : le nombre de requêtes par mois, en millions.
- **Seconds per request** : la durée de chaque requête, en secondes.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON.

### Schéma

Voici un exemple d'objet JSON d'un composant Lambda :

```json
{
  "type": "lambda",
  "id": "1bc08394-f884-497b-ae7f-fecc5e23d731",
  "region": "us-east-2",
  "mapPos": [-3, 10],
  "architecture":"x86_64",
  "memory": 128,
  "mRequests": 0.5,
  "computeDuration": 60,
  "color": {
    "2d": "#d86613",
    "isometric": "#3c3c3c"
  },
  "accentColor": {
    "2d": "#4286c5",
    "isometric": "#4286c5"
  },
  "link": "https://aws.amazon.com/lambda/",
  "locked": true
}
```

- **type: lambda** : le type de composant.
- **id: string** : identifiant unique du composant au format `uuid`.
- **region: string** : région AWS dans laquelle l'instance Lambda est déployée. Toutes les régions globales sont prises en charge, à l'exception des régions `cn-`.
- **mapPos: [number, number]** : position du composant dans le blueprint, exprimée par une paire de coordonnées x et y.
- **architecture: string** : le type de processeur utilisé par l'instance. Accepte l'une des valeurs suivantes : `x86_64` ou `arm64`.
- **memory: number** : la quantité de mémoire allouée à l'instance, en mégaoctets.
- **mRequests: number** : nombre de requêtes par mois, en millions.
- **computeDuration: number** : durée de chaque requête, en secondes.
- **color: object** : couleur de remplissage du corps du composant.
  - **isometric: string** : couleur de remplissage du composant dans la vue 3D. Doit être une couleur hexadécimale.
  - **2d: string** : couleur de remplissage du composant dans la vue en 2D. Doit être une couleur hexadécimale.
- **accentColor: object** : couleur d'accent utilisée pour afficher le logo du composant au-dessus du bloc.
  - **isometric: string** : couleur d'accent du composant dans la vue en 3D. Doit être une couleur hexadécimale.
  - **2d: string** : couleur d'accent du composant dans la vue en 2D. Doit être une couleur hexadécimale.
- **link: uri** : liez le composant à un autre diagramme en utilisant le format `blueprint://ID` ou à un site externe avec le format `https://LINK`.
- **locked: boolean** : si `true`, les modifications apportées au composant via l'application sont désactivées jusqu'à ce qu'il soit déverrouillé.

[1]: https://developers.cloudcraft.co/