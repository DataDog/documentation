---
title: Composant RDS
---
## Présentation

Utilisez le composant RDS pour représenter les bases de données relationnelles de votre architecture Amazon Web Services.

{{< img src="cloudcraft/components-aws/rds/component-rds-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft montrant le composant AWS 'RDS'." responsive="true" style="width:60%;">}}

## Barre d'outils
Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez une couleur prédéfinie ou indiquez sa valeur hexadécimale pour le composant et son accent. Vous pouvez appliquer la même couleur aux vues 2D et 3D, ou choisir une couleur différente pour chaque vue.
- **Role** : le rôle de l'instance RDS.
- **Engine** : sélectionnez le moteur de base de données utilisé pour l'instance RDS.
- **Min capacity unit** : la quantité minimale d'unités de capacité Aurora. Uniquement disponible pour le rôle serverless.
- **Max capacity unit** : la quantité maximale d'unités de capacité Aurora. Uniquement disponible pour le rôle serverless.
- **Instance type** : le type d’instance. Ce choix modifie les détails matériels affichés dans la barre d’outils, en fonction du matériel utilisé par l’hyperviseur. 
- **Size** : la taille de l’instance. Comme pour le type d’instance, les détails matériels affichés s’ajustent à la taille sélectionnée. 
- **Deployment option** : le type de déploiement de l'instance, Single-AZ ou Multi-AZ Standby.
- **Billing option** : le modèle de tarification utilisé pour l'instance.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON.

### Schéma

Voici un exemple d'objet JSON d'un composant RDS :

```json
{
  "type": "rds",
  "id": "f184b0b6-c732-4881-841c-68477f7eb365",
  "region": "us-east-1",
  "mapPos": [-3,3],
  "role": "primary",
  "engine": "mariadb",
  "instanceType": "r6g",
  "instanceSize": "large",
  "multiAZ": false,
  "minimumCapacityUnit": 2,
  "maximumCapacityUnit": 2,
  "billingOptions": {
    "type": "ri",
    "leaseContractLength": 12,
    "purchaseOption": "No Upfront"
  },
  "color": {
    "isometric": "#ececed",
    "2d": "#3b48cc"
  },
  "accentColor": {
    "isometric": "#4286c5",
    "2d": "#ffffff"
  },
  "link": "https://aws.amazon.com/rds/",
  "locked": true
}
```

- **type: rds** : le type de composant. 
- **id : string** : un identifiant unique pour le composant au format `uuid`.
- **region: string** : la région AWS dans laquelle l'instance RDS est déployée. Toutes les régions globales sont prises en charge, à l'exception des régions `cn-`.
- **mapPos: [number, number]** : la position du composant dans le blueprint, exprimée par une paire de coordonnées x et y.
- **role: string** : le rôle utilisé pour l'instance RDS. Les valeurs acceptées sont `primary`, `standby`, `readReplica` et `serverless`.
- **engine: string** : le moteur de base de données utilisé pour l'instance RDS. Consultez la section [Valeurs acceptées pour `engine`](#valeurs-acceptees-pour-engine) pour plus d'informations.
- **instanceType: string** : le type d’instance. Consultez la section [Valeurs acceptées pour `instanceType`](#valeurs-acceptees-pour-instancetype) pour en savoir plus. 
- **instanceSize: string** : la taille de l’instance. Consultez la section [Valeurs acceptées pour `instanceSize`](#valeurs-acceptees-pour-instancesize) pour en savoir plus.
- **multiAZ: boolean** : si `true`, la base de données est déployée dans plusieurs zones de disponibilité AWS. Non disponible si `role` est défini sur `serverless`.
- **minimumCapacityUnit: number** : la quantité minimale d'unités de capacité Aurora. Applicable uniquement si `role` est défini sur `serverless`.
- **maximumCapacityUnit: number** : la quantité maximale d'unités de capacité Aurora. Applicable uniquement si `role` est défini sur `serverless`.
- **billingOptions: object** : le modèle de tarification utilisé pour l'instance. Consultez la section [Valeurs acceptées pour `billingOptions`](#valeurs-acceptees-pour-billingoptions) pour plus d'informations.
- **color: object** : la couleur de remplissage du corps du composant.
  - **isometric: string** : la couleur de remplissage du composant dans la vue 3D. Doit être une couleur hexadécimale.
  - **2d: string** : la couleur de remplissage du composant dans la vue en 2D. Doit être une couleur hexadécimale.
- **accentColor: object** : la couleur d'accent utilisée pour afficher le logo du composant sur le bloc.
  - **isometric: string** : la couleur d'accent du composant dans la vue en 3D. Doit être une couleur hexadécimale.
  - **2d: string** : la couleur d'accent du composant dans la vue en 2D. Doit être une couleur hexadécimale.
- **link: uri** : liez le composant à un autre diagramme en utilisant le format `blueprint://ID` ou à un site externe avec le format `https://LINK`.
- **locked: boolean** : si `true`, les modifications apportées au composant via l'application sont désactivées jusqu'à ce qu'il soit déverrouillé.

Le composant RDS peut être ajouté aux [VPC][2], aux [groupes de sécurité][3] et aux [sous-réseaux][4]. 

## Valeurs acceptées pour `engine`

La clé `engine` accepte les valeurs suivantes :

```
none, aurora-mysql, aurora-postgresql, mysql, mariadb, postgresql, oracle, sqlserver-ex, sqlserver-web, sqlserver-se, sqlserver-ee
```

**Remarque** : si `role` est défini sur `serverless`, la clé `engine` accepte uniquement `none`, `aurora-mysql` et `aurora-postgresql`.

## Valeurs acceptées pour `instanceType`

La clé `instanceType` accepte les valeurs suivantes :

```
m1, m2, m3, m4, m6g, r5, r5b, r6g, t1, t2, t3, x1, x1e, z1d
```

## Valeurs acceptées pour `instanceSize`

La clé `instanceSize` accepte les valeurs suivantes :

```
micro, small, medium, large, xlarge, 2xlarge, 4xlarge, 8xlarge, 12xlarge, 16xlarge, 24xlarge, 32xlarge
```

## Valeurs acceptées pour `billingOptions`

La clé `billingOptions` accepte toutes les options de tarification actuellement prises en charge par l'application web Cloudcraft :

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

- **type: od** : la valeur de l'option de tarification à la demande est toujours `od`.
- **utilization: number** : un nombre à virgule flottante représentant le taux d'utilisation de l'instance sur un mois donné.

### Instance réservée

```json
{
  "billingOptions": {
    "type": "ri",
    "leaseContractLength": 36,
    "purchaseOption": "Partial Upfront"
  }
}
```

- **type: ri** : la valeur de l'option de tarification pour une instance réservée est toujours `ri`.
- **leaseContractLength: number** : la durée pendant laquelle l'instance est réservée. Les valeurs acceptées sont `12` ou `36`.
- **purchaseOption: string** : l'option d'achat de l'instance. Les valeurs acceptées sont `No Upfront`, `Partial Upfront` et `All Upfront`.

[1]: https://developers.cloudcraft.co/
[2]: /fr/cloudcraft/components-aws/vpc/
[3]: /fr/cloudcraft/components-aws/security-group/
[4]: /fr/cloudcraft/components-aws/subnet/