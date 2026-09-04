---
title: Composant Elasticsearch
---
## Présentation

Utilisez le composant Elasticsearch pour représenter les clusters Elasticsearch de votre architecture Amazon Web Services.

{{< img src="cloudcraft/components-aws/elasticsearch/component-elasticsearch-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft représentant le composant Elasticsearch AWS." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez une couleur prédéfinie ou indiquez sa valeur hexadécimale pour le composant et son accent. Vous pouvez appliquer la même couleur aux vues 2D et 3D, ou choisir une couleur différente pour chaque vue.
- **Role** : sélectionnez le rôle de l'instance Elasticsearch.
- **Instance count** : saisissez le nombre d'instances du cluster Elasticsearch.
- **Instance type** : sélectionnez le type d’instance. Ce choix modifie les détails matériels affichés dans la barre d’outils, en fonction du matériel utilisé par l’hyperviseur. 
- **Size** : sélectionnez la taille de l’instance. Comme pour le type d’instance, les détails matériels affichés s’ajustent à la taille sélectionnée. 
- **Billing option** : le modèle de tarification utilisé pour l'instance.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON.

### Schéma

Voici un exemple d'objet JSON représentant un composant Elasticsearch :

```json
{
  "type": "es",
  "id": "5f8df311-0641-410e-b427-89b7dc5e5b84",
  "region": "us-west-2",
  "mapPos": [0,10],
  "role": "data",
  "instanceCount": 2,
  "instanceType": "t3",
  "instanceSize": "medium",
  "billingOptions": {
    "type": "ri",
    "leaseContractLength": 36,
    "purchaseOption": "Partial Upfront"
  },
  "color": {
    "isometric": "#ececed",
    "2d": "#693cc5"
  },
  "accentColor": {
    "isometric": "#4286c5",
    "2d": "#ffffff"
  },
  "link": "https://aws.amazon.com/elasticsearch-service/",
  "locked": true
}
```

- **type: es** : le type de composant.
- **id: chaîne** : un identifiant unique pour le composant au format `uuid`.
- **region: chaîne** : la région AWS dans laquelle l'instance Elasticsearch est déployée. Toutes les régions globales sont prises en charge, à l'exception des régions `cn-`.
- **mapPos: [nombre, nombre]** : la position du composant dans le blueprint, exprimée par une paire de coordonnées x et y.
- **role: chaîne** : le rôle utilisé pour l'instance Elasticsearch. Valeurs acceptées : `data` et `master`.
- **instanceCount: nombre** : le nombre d'instances dans le cluster Elasticsearch. Valeur par défaut : `1`.
- **instanceType: chaîne** : le type d’instance. Consultez la rubrique [Valeurs acceptées pour `instanceType`](#valeurs-acceptees-pour-instancetype) pour en savoir plus.
- **instanceSize: chaîne** : la taille de l’instance. Consultez la rubrique [Valeurs acceptées pour `instanceSize`](#valeurs-acceptees-pour-instancesize) pour en savoir plus.
- **billingOptions: objet** : le modèle de tarification utilisé pour l'instance. Consultez la rubrique [Valeurs acceptées pour `billingOptions`](#valeurs-acceptees-pour-billingoptions) pour en savoir plus.
- **color: objet** : la couleur de remplissage du corps du composant.
  - **isometric: chaîne** : la couleur de remplissage du composant dans la vue 3D. Doit être une couleur hexadécimale.
  - **2d: chaîne** : la couleur de remplissage du composant dans la vue 2D. Doit être une couleur hexadécimale.
- **accentColor: objet** : la couleur d'accent utilisée pour afficher le logo du composant sur le bloc.
  - **isometric: chaîne** : la couleur d'accent du composant dans la vue 3D. Doit être une couleur hexadécimale.
  - **2d: chaîne** : la couleur d'accent du composant dans la vue 2D. Doit être une couleur hexadécimale.
- **link: uri** : liez le composant à un autre diagramme en utilisant le format `blueprint://ID` ou à un site externe avec le format `https://LINK`.
- **locked: booléen** : si `true`, les modifications apportées au composant via l'application sont désactivées jusqu'à ce qu'il soit déverrouillé.

Le composant Elasticsearch peut être ajouté aux [VPC][2], aux [groupes de sécurité][3] et aux [sous-réseaux][4].

## Valeurs acceptées pour `instanceType`

La clé `instanceType` accepte les valeurs suivantes :

```
c4, c5, i2, i3, m3, m4, m5, r3, r4, r5, t2, t3, ultrawarm1
```

## Valeurs acceptées pour `instanceSize`

La clé `instanceSize` accepte les valeurs suivantes :

```
micro, small, medium, large, xlarge, 2xlarge, 4xlarge, 8xlarge, 9xlarge, 10xlarge, 12xlarge, 16xlarge, 18xlarge, 24xlarge, 32xlarge
```

## Valeurs acceptées pour `billingOptions`

La clé `billingOptions` accepte toutes les options de facturation prises en charge par l'application web Cloudcraft :

- À la demande
- Instance réservée

Chaque option est représentée différemment dans l'objet `billingOptions`.

### À la demande

```json
{
  "billingOptions": {
    "type": "od",
    "utilization": 1
  }
}
```

- **type: od** : la valeur de l'option de facturation à la demande est toujours `od`.
- **utilization: nombre** : un nombre à virgule flottante représentant le taux d'utilisation de l'instance sur un mois donné.

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

- **type: ri** : la valeur de l'option de facturation pour une instance réservée est toujours `ri`.
- **leaseContractLength: nombre** : la durée pendant laquelle l'instance est réservée. Valeurs acceptées : `12` ou `36`.
- **purchaseOption: chaîne** : l'option d'achat de l'instance. Valeurs acceptées : `No Upfront`, `Partial Upfront` et `All Upfront`.

[1]: https://developers.cloudcraft.co/
[2]: /fr/cloudcraft/components-aws/vpc/
[3]: /fr/cloudcraft/components-aws/security-group/
[4]: /fr/cloudcraft/components-aws/subnet/