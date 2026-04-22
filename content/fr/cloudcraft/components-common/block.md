---
title: Composant Bloc
---
## Présentation

Le composant Bloc est le composant le plus simple à utiliser. Conjointement aux composants Image et Icône, il permet de représenter les composants cloud qui ne sont pas encore disponibles.

{{< img src="cloudcraft/components-common/block/component-block.png" alt="Capture d'écran d'une représentation 3D du composant Bloc dans Cloudcraft" responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez une couleur prédéfinie ou saisissez la valeur hexadécimale de la couleur de votre choix. Vous pouvez utiliser la même couleur pour les vues 2D et 3D ou choisir des couleurs différentes.
- **Width** : choisissez la largeur de votre composant Bloc.
- **Height** : choisissez la hauteur de votre composant Bloc.
- **Depth** : choisissez la profondeur de votre composant Bloc.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON. Voici un exemple d'objet JSON d'un composant Bloc :

```json
{
  "type": "block",
  "id": "76cddb57-6368-4e8b-805f-1306f558812b",
  "mapPos": [3, 9],
  "width": 2,
  "height": 1,
  "depth": 2,
  "color": {
    "isometric": "#ececed",
    "2d": "#4286c5"
  },
  "locked": true,
  "link": "blueprint://34b7a049-e92b-4146-b937-7eee9ae788b5"
}
```

- **type: block** : le type de composant.
- **id: chaîne** : un identifiant unique pour le composant au format `uuid`.
- **mapPos: [nombre, nombre]** : la position du composant dans le blueprint, exprimée par une paire de coordonnées x et y.
- **width: nombre** : la largeur du composant Bloc. Valeur par défaut : 2.
- **height: nombre** : la hauteur du composant Bloc. Valeur par défaut : 1.
- **depth: nombre** : la profondeur du composant Bloc. Valeur par défaut : 2.
- **color: objet** : la couleur de remplissage du corps du composant.
  - **isometric: chaîne** : la couleur de remplissage du composant dans la vue 3D. Doit être une couleur hexadécimale.
  - **2d: chaîne** : la couleur de remplissage du composant dans la vue 2D. Doit être une couleur hexadécimale.
- **link: uri** : liez le composant à un autre diagramme en utilisant le format `blueprint://ID` ou à un site externe avec le format `https://LINK`.
- **locked: booléen** : si true, les modifications apportées au composant via l'application sont désactivées jusqu'à ce qu'il soit déverrouillé.

Le composant Bloc peut être ajouté aux [VPC][2], aux [groupes de sécurité][3] et aux [sous-réseaux][4].

[1]: https://developers.cloudcraft.co/
[2]: https://help.cloudcraft.co/article/118-component-vpc
[3]: https://help.cloudcraft.co/article/119-component-security-group
[4]: /fr/cloudcraft/components-aws/subnet/