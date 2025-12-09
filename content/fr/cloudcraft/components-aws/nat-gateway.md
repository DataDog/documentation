---
title: Composant NAT Gateway
---
## Présentation

Utilisez le composant NAT Gateway pour représenter les passerelles de traduction d'adresses réseau de votre architecture Amazon Web Services.

{{< img src="cloudcraft/components-aws/nat-gateway/component-nat-gateway-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft affichant le composant NAT Gateway AWS." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez une couleur prédéfinie ou indiquez sa valeur hexadécimale pour le composant et son accent. Vous pouvez appliquer la même couleur aux vues 2D et 3D, ou choisir une couleur différente pour chaque vue.
- **Data processed** : le volume total de données traitées par mois, en gigaoctets.
- **Rotate** : faites pivoter le composant et modifiez son orientation.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON.

### Schéma

Voici un exemple d'objet JSON d'un composant NAT Gateway :

```json
{
  "type": "natgateway",
  "id": "8f15adc1-da34-4f6b-b69c-cdfc240f694a",
  "region": "us-east-1",
  "mapPos": [-1.5,2],
  "dataGb": 10,
  "color": {
    "isometric": "#e91e63",
    "2d": "#e91e63"
  },
  "accentColor": {
    "isometric": "#ffffff",
    "2d": "#ffffff"
  },
  "direction": "down",
  "link": "blueprint://b07827f7-2ead-4911-bb78-ddc02dc07b24",
  "locked": true
}
```

- **type: natgateway** : le type de composant.
- **id: chaîne** : un identifiant unique pour le composant au format `uuid`.
- **region: chaîne** : la région AWS dans laquelle la passerelle est déployée. Toutes les régions globales sont prises en charge, à l’exception des régions `cn-`.
- **mapPos: [nombre, nombre]** : la position du composant dans le blueprint, exprimée par une paire de coordonnées x et y.
- **dataGb: nombre** : le volume de données traitées par mois par la passerelle, en gigaoctets.
- **color: objet** : la couleur de remplissage du corps du composant.
  - **isometric: chaîne** : la couleur de remplissage du composant dans la vue 3D. Doit être une couleur hexadécimale.
  - **2d: chaîne** : la couleur de remplissage du composant dans la vue 2D. Doit être une couleur hexadécimale.
- **accentColor: objet** : la couleur d'accent utilisée pour afficher le logo du composant sur le bloc.
  - **isometric: chaîne** : la couleur d'accent du composant dans la vue 3D. Doit être une couleur hexadécimale.
  - **2d: chaîne** : la couleur d'accent du composant dans la vue 2D. Doit être une couleur hexadécimale.
- **direction: chaîne** : la rotation ou l'orientation du composant. Valeurs acceptées :  `down` et `right`. Valeur par défaut : `down`.
- **link: uri** : liez le composant à un autre diagramme en utilisant le format `blueprint://ID` ou à un site externe avec le format `https://LINK`.
- **locked: booléen** : si `true`, les modifications apportées au composant via l'application sont désactivées jusqu'à ce qu'il soit déverrouillé.

Le composant NAT Gateway peut être ajouté aux [VPC][2], et aux [sous-réseaux][3].

[1]: https://developers.cloudcraft.co/
[2]: /fr/cloudcraft/components-aws/vpc/
[3]: /fr/cloudcraft/components-aws/subnet/