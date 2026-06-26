---
title: Composant EBS
---
## Présentation

Utilisez le composant EBS pour représenter les volumes EBS de votre architecture Amazon Web Services.

{{< img src="cloudcraft/components-aws/ebs/component-ebs-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft montrant le composant AWS 'EBS'." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez une couleur prédéfinie ou indiquez sa valeur hexadécimale pour le composant et son accent. Vous pouvez appliquer la même couleur aux vues 2D et 3D, ou choisir une couleur différente pour chaque vue.
- **Volume type** : le type de volume utilisé.
- **Storage** : quantité de stockage pour le volume en gibioctets.
- **IOPS** : limite d'IOPS pour le volume. Disponible uniquement pour les volumes SSD.
- **Throughput** : limite de débit pour le volume. Disponible uniquement pour les volumes `gp3`.
- **I/O requests per second** : limite d'E/S pour le volume. Disponible uniquement pour les volumes HDD magnétiques d'ancienne génération.
- **Snapshot** : quantité de stockage pour les snapshots en gibioctets.


## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON.

### Schéma

Voici un exemple d'objet JSON d'un composant de volume EBS :

```json
{
  "type": "ebs",
  "id": "100b1d12-49e7-4dfb-8948-0e0abf0e5d33",
  "region": "us-east-1",
  "mapPos": [-1,9],
  "volume": "gp3",
  "storage": "200",
  "iops": "4000",
  "throughput": "500",
  "snapshots": "0",
  "color": {
    "isometric": "#000000",
    "2d": "#000000"
  },
  "accentColor": {
    "isometric": "#ffeb3b",
    "2d": "#ffeb3b"
  },
  "link": "blueprint://ae6349e1-fa15-41c8-8e89-d201f9fa3cc9",
  "locked": true
}
```

- **type: ebs** : le type de composant.
- **id: string** : un identifiant unique pour le composant au format `uuid`.
- **region: string** : la région AWS dans laquelle le volume EBS est déployé. Toutes les régions globales sont prises en charge, à l'exception des régions `cn-`.
- **mapPos: [nombre, nombre]** : la position du composant dans le blueprint, exprimée par une paire de coordonnées x et y.
- **volume: string** : le type du volume. Les valeurs acceptées sont `gp3`, `gp2`, `io2`, `io1`, `st1`, `sc1` ou `magnetic`.
- **storage: number** : quantité de stockage pour le volume en gibioctets.
- **iops: number** : limite d'IOPS pour le volume. Non applicable pour les types de volume `st1` et `sc1`.
- **throughput: number** : limite de débit pour le volume. Applicable uniquement pour le type de volume `gp3`.
- **snapshots: number** : quantité de stockage pour les snapshots en gibioctets.
- **color: object** : la couleur de remplissage du corps du composant.
  - **isometric: string** : couleur de remplissage du composant dans la vue 3D. Doit être une couleur hexadécimale.
  - **2d: string** : la couleur de remplissage du composant dans la vue 2D. Doit être une couleur hexadécimale.
- **accentColor: object** : la couleur d'accent utilisée pour afficher le logo du composant sur le bloc.
  - **isometric: string**. La couleur d'accent du composant dans la vue en 3D. Doit être une couleur hexadécimale.
  - **2d: string**. La couleur d'accent du composant dans la vue en 2D. Doit être une couleur hexadécimale.
- **link: uri** : liez le composant à un autre diagramme en utilisant le format `blueprint://ID` ou à un site Web externe en utilisant le format `https://LINK`.
- **locked: boolean** : si `true`, les modifications apportées au composant via l'application sont désactivées jusqu'à ce qu'il soit déverrouillé.

[1]: https://developers.cloudcraft.co/