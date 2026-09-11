---
title: Composant Redshift
---
## Présentation

Utilisez le composant Redshift pour représenter les entrepôts de données de votre architecture Amazon Web Services.

{{< img src="cloudcraft/components-aws/redshift/component-redshift-diagram.png" alt="Capture d'écran d'un diagramme Cloudcraft isométrique affichant le composant AWS 'Redshift'." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez une couleur prédéfinie ou indiquez sa valeur hexadécimale pour le composant et son accent. Vous pouvez appliquer la même couleur aux vues 2D et 3D, ou choisir une couleur différente pour chaque vue.
- **Nodes** : saisissez le nombre de nœuds du cluster Redshift. 
- **Instance type** : sélectionnez le type d’instance Redshift. Ce choix modifie les détails matériels affichés dans la barre d’outils, en fonction du matériel utilisé par l’hyperviseur. 
- **Size** : sélectionnez la taille de l’instance Redshift. Comme pour le type d’instance, les détails matériels affichés s’ajustent à la taille sélectionnée. 

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON.

### Schéma

Voici un exemple d'objet JSON d'un composant Redshift :

```json
{
  "type": "redshift",
  "id": "c1aa0ae1-8e0d-466d-a8a8-51cc9b8a6b35",
  "region": "us-west-2",
  "mapPos": [1,2],
  "nodeCount": 2,
  "instanceType": "ra3",
  "instanceSize": "xlplus",
  "color": {
    "isometric": "#80b1dc",
    "2d": "#000000"
  },
  "accentColor": {
    "isometric": "#03a9f4",
    "2d": "#03a9f4"
  },
  "link": "https://aws.amazon.com/redshift/",
  "locked": true
}
```

- **type: redshift** : le type de composant. 
- **id: string** : identifiant unique du composant au format `uuid`.
- **region: string** : région AWS dans laquelle l'instance Redshift est déployée. Toutes les régions globales sont prises en charge, à l'exception des régions `cn-`.
- **mapPos: [number, number]** : position du composant dans le blueprint, exprimée par une paire de coordonnées x et y.
- **nodeCount: number** : le nombre de nœuds du cluster Redshift. La valeur par défaut est `1`. 
- **instanceType: string** : le type d’instance. Consultez la section [Valeurs acceptées pour `instanceType`](#valeurs-acceptees-pour-instancetype) pour en savoir plus. 
- **instanceSize: string** : la taille de l’instance. Consultez la section [Valeurs acceptées pour `instanceSize`](#valeurs-acceptees-pour-instancesize) pour en savoir plus.
- **color: object** : la couleur de remplissage du corps du composant.
  - **isometric: string** : couleur de remplissage du composant dans la vue 3D. Doit être une couleur hexadécimale.
  - **2d: string** : couleur de remplissage du composant dans la vue en 2D. Doit être une couleur hexadécimale.
- **accentColor: object** : couleur d'accent utilisée pour afficher le logo du composant sur le bloc.
  - **isometric: string** : couleur d'accent du composant dans la vue en 3D. Doit être une couleur hexadécimale.
  - **2d: string** : couleur d'accent du composant dans la vue en 2D. Doit être une couleur hexadécimale.
- **link: uri** : liez le composant à un autre diagramme en utilisant le format `blueprint://ID` ou à un site externe avec le format `https://LINK`.
- **locked: boolean** : si `true`, les modifications apportées au composant via l'application sont désactivées jusqu'à ce qu'il soit déverrouillé.

Le composant Redshift peut être ajouté aux [VPC][2], aux [groupes de sécurité][3] et aux [sous-réseaux][4]. 

## Valeurs acceptées pour `instanceType`

La clé `instanceType` accepte les valeurs suivantes :

```
dc1, dc2, ds1, ds2, ra3
```

## Valeurs acceptées pour `instanceSize`

La touche `instanceSize` accepte les valeurs suivantes :

```
large, xlarge, xlplus, 4xlarge, 8xlarge, 16xlarge
```

[1]: https://developers.cloudcraft.co/
[2]: /fr/cloudcraft/components-aws/vpc/
[3]: /fr/cloudcraft/components-aws/security-group/
[4]: /fr/cloudcraft/components-aws/subnet/