---
title: Composant VPC
---
## Présentation

Utilisez le composant VPC pour représenter un réseau virtuel isolé dans votre architecture Amazon Web Services.

{{< img src="cloudcraft/components-aws/vpc/component-vpc-diagram.png" alt="Capture d’écran d’un diagramme isométrique Cloudcraft affichant le composant AWS 'VPC'." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez une couleur prédéfinie ou indiquez sa valeur hexadécimale pour le composant et son accent. Vous pouvez appliquer la même couleur aux vues 2D et 3D, ou choisir une couleur différente pour chaque vue.
- **Name** : attribuez un nom au VPC.
- **Shape** : choisissez une forme pour le VPC.
- **Padding** : augmentez ou réduisez l’espace intérieur du VPC.
- **Peering** : affichez, supprimez ou ajoutez des connexions d’appairage avec d’autres VPC.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON.

### Schéma

Voici un exemple d'objet JSON d'un composant VPC :

```json
{
  "type": "vpc",
  "id": "5631f2ca-3d93-4591-a7d9-85d5f0d011eb",
  "region": "us-east-1",
  "name": "cloudcraft-vpc-example",
  "shape": "rectangular",
  "padding": 1.5,
  "nodes": [
    "e99bad32-82f6-49a7-b145-11963a3d7775"
  ],
  "peeringConnections": [
    {
      "id": "1a367d09-beea-4a87-9740-1831c1809d00",
      "name": "Example Peering",
      "accepterVpc": "f38bc8ae-98c1-45c5-b7ad-54e9bb9ee166",
      "hidden": false
    }
  ],
  "color": {
    "isometric": "#03a9f4",
    "2d": "#03a9f4"
  },
  "locked": true
}
```

- **type: vpc** : le type du composant.
- **id: string** : identifiant unique du composant au format `uuid`.
- **region: string** : région AWS dans laquelle ce VPC est déployé. Toutes les régions globales sont prises en charge, à l’exception des régions `cn-`.
- **name: string** : nom du VPC.
- **shape: string** : forme du VPC. Valeurs acceptées : `dynamic` ou `rectangular`.
- **padding: number** : marge intérieure du VPC. Par défaut : `1.5`.
- **nodes: array** : composants inclus dans le VPC. Consultez [valeurs acceptées pour `nodes`](#valeurs-acceptees-pour-nodes) pour en savoir plus.
- **peeringConnections: array** : VPC établissant une connexion d’appairage avec ce VPC. Consultez [valeurs acceptées pour `peeringConnections`](#valeurs-acceptées-pour-peeringConnections) pour en savoir plus.
- **color: object** : couleur de remplissage du composant.
  - **isometric: string** : couleur de remplissage du composant dans la vue 3D. Doit être une couleur hexadécimale.
  - **2d: string** : couleur de remplissage du composant dans la vue en 2D. Doit être une couleur hexadécimale.
- **locked: boolean** : si `true`, les modifications apportées au composant via l'application sont désactivées jusqu'à ce qu'il soit déverrouillé.

### Valeurs acceptées pour `nodes`

La clé `nodes` accepte un tableau d’identifiants uniques représentant les composants à l’intérieur du VPC.

Les composants AWS suivants peuvent être inclus dans un VPC :

```
asg, ec2, lambda, efs, fsx, elb, subnet, sg, rds, docdb, elasticache, redshift, es, natgateway, internetgateway, vpngateway, customergateway
```

En plus des composants AWS, les éléments génériques suivants peuvent aussi être intégrés dans un VPC :

```
block, isotext, icon, image, area
```

### Valeurs acceptées pour `peeringConnections`

La clé `peeringConnections` accepte un tableau, chaque connexion d’appairage étant représentée par un objet JSON :

```
{
  "peeringConnections": [
    {
      "id": "1a367d09-beea-4a87-9740-1831c1809d00",
      "name": "Example Peering",
      "accepterVpc": "f38bc8ae-98c1-45c5-b7ad-54e9bb9ee166",
      "hidden": false
    }
  ]
}
```

- **id: string** : identifiant unique de la connexion d’appairage, au format `uuid`.
- **name: string** : nom de cette connexion. Voir l’image du composant en haut de la page pour savoir comment il est affiché.
- **accepterVpc: string** : l’`id` du VPC accepteur.
- **hidden: boolean** : si `true`, la connexion d'appairage nʼest pas affichée dans le diagramme. La valeur par défaut est `false`.

[1]: https://developers.cloudcraft.co/