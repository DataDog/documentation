---
title: Composant VPN Gateway
---
## Présentation

Utilisez le composant VPN Gateway pour représenter les connexions VPN intersite dans votre architecture Amazon Web Services.

{{< img src="cloudcraft/components-aws/vpn-gateway/component-vpn-gateway-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft affichant le composant VPN Gateway AWS." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez une couleur prédéfinie ou indiquez sa valeur hexadécimale pour le composant et son accent. Vous pouvez appliquer la même couleur aux vues 2D et 3D, ou choisir une couleur différente pour chaque vue.
- **Rotate** : faites pivoter le composant et modifiez son orientation.
- **Connections** : consultez, ajoutez ou supprimez des connexions VPN à cette passerelle.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON.

### Schéma

Voici un exemple d'objet JSON d'un composant VPN Gateway :

```json
{
  "type": "vpngateway",
  "id": "1a4851fe-8357-4896-876b-f2d3040d108c",
  "region": "us-east-1",
  "mapPos": [11.5,12],
  "color": {
    "isometric": "#000000",
    "2d": "#000000"
  },
  "accentColor": {
    "isometric": "#ffeb3b",
    "2d": "#ffeb3b"
  },
  "direction": "down",
  "link":" blueprint://58c2aeae-d5b7-4a50-83ea-b3fa9d17d3f5",
  "locked": true
}
```

- **type: vpngateway** : le type de composant.
- **id: chaîne** : un identifiant unique pour le composant au format `uuid`.
- **region: chaîne** : la région AWS dans laquelle cette passerelle est déployée. Toutes les régions globales sont prises en charge, à l’exception des régions `cn-`.
- **mapPos: [nombre, nombre]** : la position du composant dans le blueprint, exprimée par une paire de coordonnées x et y.
- **color: objet** : la couleur de remplissage du corps du composant.
  - **isometric: chaîne** : la couleur de remplissage du composant dans la vue 3D. Doit être une couleur hexadécimale.
  - **2d: chaîne** : la couleur de remplissage du composant dans la vue 2D. Doit être une couleur hexadécimale.
- **accentColor: objet** : la couleur d'accent utilisée pour afficher le logo du composant sur le bloc.
  - **isometric: chaîne** : la couleur d'accent du composant dans la vue 3D. Doit être une couleur hexadécimale.
  - **2d: chaîne** : la couleur d'accent du composant dans la vue 2D. Doit être une couleur hexadécimale.
- **direction: chaîne** : la rotation ou l'orientation du composant. Valeurs acceptées :  `down` et `right`. Valeur par défaut : `down`.
- **link: uri** : liez le composant à un autre diagramme en utilisant le format `blueprint://ID` ou à un site externe avec le format `https://LINK`.
- **locked: booléen** : si `true`, les modifications apportées au composant via l'application sont désactivées jusqu'à ce qu'il soit déverrouillé.

Le composant VPN Gateway ne peut être ajouté qu'aux [VPC][2].

[1]: https://developers.cloudcraft.co/
[2]: /fr/cloudcraft/components-aws/vpc/