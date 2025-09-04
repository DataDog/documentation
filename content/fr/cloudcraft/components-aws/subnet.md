---
title: Composant Subnet
---

## Présentation

Utilisez le composant Subnet pour représenter des sous-réseaux de votre architecture Amazon Web Services.

{{< img src="cloudcraft/components-aws/subnet/component-subnet.png" alt="Capture d'écran d'une représentation 3D du composant AWS Subnet dans Cloudcraft" responsive="true" style="width:60%;">}}


## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez une couleur prédéfinie ou indiquez sa valeur hexadécimale pour le composant et son accent. Vous pouvez appliquer la même couleur aux vues 2D et 3D, ou choisir une couleur différente pour chaque vue.
- **Name** : attribuez un nom au sous-réseau.
- **Shape** : choisissez la forme du sous-réseau.
- **Padding** : ajustez l'espace intérieur du sous-réseau.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON. 

### Schéma

Voici un exemple d'objet JSON représentant un composant Subnet :

```json
{
  "type": "subnet",
  "id": "838f6f30-9cdd-4c6b-9eb2-dd71b9c64047",
  "region": "us-east-1",
  "name": "example-cloudcraft-sb",
  "shape": "dynamic",
  "padding": 1.5,
  "nodes": [
    "e99bad32-82f6-49a7-b145-11963a3d7775"
  ],
  "color": {
    "isometric": "#000000",
    "2d": "#000000"
  },
  "link": "blueprint://90fb6b0b-f66e-4196-8d16-d68921448fdb",
  "locked": true
}
```

- **type: subnet** : le type de composant. 
- **id: string** : identifiant unique du composant au format `uuid`.
- **region: string** : région AWS dans laquelle ce sous-réseau est déployé. Toutes les régions globales sont prises en charge, à l’exception des régions `cn-`.
- **name: string** : nom du sous-réseau.
- **shape: string** : forme du sous-réseau. Valeurs acceptées : `dynamic` ou `rectangular`.
- **padding: number** : marge intérieure du sous-réseau. Par défaut : `1.5`.
- **nodes: array** : composants inclus dans le sous-réseau. Consultez [valeurs acceptées pour `nodes`](#valeurs-acceptees-pour-nodes) pour en savoir plus.
- **color: object** : couleur de remplissage du composant.
  - **isometric: string** : couleur de remplissage du composant dans la vue 3D. Doit être une couleur hexadécimale.
  - **2d: string** : couleur de remplissage du composant dans la vue en 2D. Doit être une couleur hexadécimale.
- **link: uri** : liez le composant à un autre diagramme en utilisant le format `blueprint://ID` ou à un site externe avec le format `https://LINK`.
- **locked: boolean** : si `true`, les modifications apportées au composant via l'application sont désactivées jusqu'à ce qu'il soit déverrouillé.

### Valeurs acceptées pour `nodes`

La clé `nodes` accepte un tableau d’identifiants uniques représentant les composants à l’intérieur du sous-réseau.

Les composants AWS suivants peuvent être inclus dans un sous-réseau :

```
asg, ec2, lambda, efs, fsx, elb, rds, docdb, elasticache, redshift, es, natgateway
```

En plus des composants AWS, les éléments génériques suivants peuvent aussi être intégrés dans un sous-réseau :

```
block, isotext, icon, image, area
```

[1]: https://developers.cloudcraft.co/