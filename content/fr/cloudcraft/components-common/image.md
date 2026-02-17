---
title: Composant Image
---

## Présentation

Le composant Image est un élément simple mais puissant pour concevoir des diagrammes. Avec Icon et Blocks, il peut servir à représenter des composants cloud encore non disponibles, ainsi qu'à ajouter de nouveaux ensembles d'icônes et des piles logicielles.

{{< img src="cloudcraft/components-common/image/component-image.png" alt="Capture d'écran d'une représentation 3D du composant image dans Cloudcraft" responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Image name** : nom de l'image téléversée, avec extension de fichier. Cliquer sur le nom de l'image permet de téléverser une nouvelle image pour remplacer l'image actuelle.
- **Toggle 3D/2D projection** : affichez l'image en vue 3D ou 2D lorsque le diagramme est en vue 3D. Non disponible pour les diagrammes 2D.
- **Toggle flat/standing projection** : affichez l'image à plat ou debout sur le diagramme. Non disponible lorsque la projection 2D est activée ou sur les diagrammes 2D.
- **Scale** : augmentez ou réduisez la taille d'une image.
- **Rotate item** : faites pivoter une image et modifiez son orientation.
- **Raise** : élève le composant de l'image au-dessus des autres images.
- **Lower** : placez le composant image sous les autres images.

## API

<div class ="alert alert-info">
  <p>Vous pouvez manipuler une image dans un diagramme via notre API, mais l'image elle-même doit être téléversée depuis l'interface Cloudcraft.</p>
</div>

Utilisez [l'API Cloudcraft][1] pour accéder et afficher vos diagrammes d'architecture sous forme d'objets JSON. Voici un exemple d'objet JSON représentant un composant Image :

```json
{
  "type": "image",
  "id": "53c342f3-3f13-4ba5-bffa-f4e0db874f95",
  "mapPos": [2.25, 9.75],
  "key": "a5a840d9-c1f9-4e19-b67c-6b2bd1bfcdaa/nginx-logo.webp",
  "isometric": true,
  "standing": false,
  "scale": 0.10000000000000014,
  "direction": "down",
  "link": "https://nginx.org/",
  "locked": true
}
```

- **type: image** : le type de composant.
- **id : string** : un identifiant unique pour le composant au format `uuid`.
- **mapPos: [number, number]** : la position du composant dans le blueprint, exprimée par une paire de coordonnées x et y.
- **key: string** : un identifiant unique pour l'image composé d'un UUID, d'un nom de fichier et d'une extension.
- **isometric: boolean** : si true, l'image est affichée à l'aide d'une projection 3D, tandis que false affiche l'image dans une projection 2D. La valeur par défaut est true.
- **standing: boolean** : si true, affiche l'image en position debout plutôt qu'à plat. La valeur par défaut est false.
- **scale: number** : permet d'augmenter ou de réduire la taille de l'image.
- **direction: string** : la rotation ou la direction de l'image. Accepte `down, up, right, left` comme valeur, avec `down` comme valeur par défaut.
- **link: uri** : liez le composant à un autre diagramme en utilisant le format `blueprint://ID` ou à un site externe avec le format `https://LINK`.
- **locked: boolean** : si true, les modifications apportées au composant via l'application sont désactivées jusqu'à ce qu'il soit déverrouillé.

[1]: https://developers.cloudcraft.co/