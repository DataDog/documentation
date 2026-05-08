---
title: Composant ElastiCache
---
## Présentation

Utilisez le composant ElastiCache pour représenter des caches en mémoire ou des magasins de données de votre architecture Amazon Web Services.

{{< img src="cloudcraft/components-aws/elasticache/component-elasticache-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft montrant le composant AWS 'ElastiCache'." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Colors** : sélectionnez une couleur prédéfinie ou indiquez sa valeur hexadécimale pour le composant et son accent. Vous pouvez appliquer la même couleur aux vues 2D et 3D, ou choisir une couleur différente pour chaque vue.
- **Engine** : sélectionnez le moteur utilisé pour alimenter l'instance ElastiCache.
- **Instance type** : sélectionnez le type d'instance. Ce choix modifie les détails matériels affichés dans la barre d'outils, en fonction du matériel utilisé par l'hyperviseur.
- **Size** : sélectionnez la taille de l'instance ElastiCache. Comme pour le type d'instance, les détails matériels affichés dans la barre d'outils changent pour refléter la taille.
- **Billing option** : le modèle de tarification utilisé pour l'instance.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON. 

### Schéma

Voici un exemple d'objet JSON représentant un composant ElastiCache :

```json
{
  "type": "elasticache",
  "id": "a1cebccc-d9ed-481f-b5e6-1088818ab2c6",
  "region": "us-east-1",
  "mapPos": [-1,12],
  "engine": "memcached",
  "instanceType": "m4",
  "instanceSize": "large",
  "billingOptions": {
    "type": "ri",
    "leaseContractLength": 36,
    "purchaseOption": "Heavy Utilization"
  },
  "color": {
    "isometric": "#d82f27",
    "2d": "#3b48cc"
  },
  "accentColor": {
    "isometric": "#ffffff",
    "2d": "#ffffff"
  },
  "link": "https://aws.amazon.com/elasticache/",
  "locked": true
}
```

- **type: elasticache** : le type de composant.
- **id: string** : un identifiant unique pour le composant au format `uuid`.
- **region: string** : la région AWS dans laquelle l'instance RDS est déployée. Toutes les régions globales sont prises en charge, à l'exception des régions `cn-`.
- **mapPos: [nombre, nombre]** : la position du composant dans le blueprint, exprimée par une paire de coordonnées x et y.
- **engine: string** : le moteur de base de données utilisé pour l'instance ElastiCache. Les valeurs acceptées sont `redis` et `memcached`.
- **instanceType: string** : le type d’instance. Consultez la section [Valeurs acceptées pour `instanceType`](#valeurs-acceptees-pour-instancetype) pour en savoir plus. 
- **instanceSize: chaîne** : la taille de l’instance. Consultez la rubrique [Valeurs acceptées pour `instanceSize`](#valeurs-acceptees-pour-instancesize) pour en savoir plus.
- **billingOptions: object** : le modèle de tarification utilisé pour l'instance. Consultez la section [Valeurs acceptées pour `instanceSize`](#valeurs-acceptees-pour-billingoptions) pour plus d'informations.
- **color: objet** : la couleur de remplissage du corps du composant.
  - **isometric: chaîne** : la couleur de remplissage du composant dans la vue 3D. Doit être une couleur hexadécimale.
  - **2d: string** : la couleur de remplissage du composant dans la vue en 2D. Doit être une couleur hexadécimale.
- **accentColor: object** : couleur d'accent utilisée pour afficher le logo du composant sur le bloc.
  - **isometric: string** : la couleur d'accent du composant dans la vue en 3D. Doit être une couleur hexadécimale.
  - **2d: string** : la couleur d'accent du composant dans la vue en 2D. Doit être une couleur hexadécimale.
- **link: uri** : liez le composant à un autre diagramme en utilisant le format `blueprint://ID` ou à un site externe avec le format `https://LINK`.
- **locked: boolean** : si true, les modifications apportées au composant via l'application sont désactivées jusqu'à ce qu'il soit déverrouillé.

Le composant ElastiCache peut être ajouté aux [VPC][2], [groupes de sécurité][3] et [sous-réseaux][4].

## Valeurs acceptées pour `instanceType`

La clé `instanceType` accepte les valeurs suivantes :

```
c1, m1, m2, m3, m4, m5, m6g, r3, r4, r5, r6g, t1, t2, t3
```

## Valeurs acceptées pour `instanceSize`

La clé `instanceSize` accepte les valeurs suivantes :

```
micro, small, medium, large, xlarge, 2xlarge, 4xlarge, 8xlarge, 10xlarge, 12xlarge, 16xlarge, 24xlarge, 32xlarge
```

## Valeurs acceptées pour `billingOptions`

La clé `billingOptions` prend en charge toutes les options de facturation acceptées par l'application Web Cloudcraft :

- On-demand
- Instance réservée

Chaque option est représentée différemment dans l'objet `billingOptions`.

### On-demand

```json
{
  "billingOptions": {
    "type": "od",
    "utilization": 1
  }
}
```

- **type: od** : la valeur de l'option de facturation à la demande est toujours `od`.
- **utilization: number** : un nombre à virgule flottante représentant la quantité d'utilisation de l'instance au cours d'un mois donné.

### Instance réservée

```json
{
  "billingOptions": {
    "type": "ri",
    "leaseContractLength": 36,
    "purchaseOption": "Heavy Utilization"
  }
}
```

- **type: ri** : la valeur de l'option de facturation pour une instance réservée est toujours `ri`.
- **leaseContractLength: number** : la durée pendant laquelle l'instance est réservée. Les valeurs acceptées sont `12` ou `36`.
- **purchaseOption: string** : l'option d'achat pour l'instance. Les valeurs acceptées sont `Heavy Utilization`, `No Upfront`, `Partial Upfront` et `All Upfront`.

[1]: https://developers.cloudcraft.co/
[2]: /fr/cloudcraft/components-aws/vpc/
[3]: /fr/cloudcraft/components-aws/security-group/
[4]: /fr/cloudcraft/components-aws/subnet/