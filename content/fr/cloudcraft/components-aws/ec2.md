---
title: Composant EC2
---
## Présentation

Utilisez le composant EC2 pour représenter des instances de calcul élastique de votre architecture Amazon Web Services.

{{< img src="cloudcraft/components-aws/ec2/component-ec2-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft montrant le composant AWS EC2." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez une couleur prédéfinie ou indiquez sa valeur hexadécimale pour le composant et sa couleur d'accent. Vous pouvez appliquer la même couleur aux vues 2D et 3D, ou choisir une couleur différente pour chaque vue.
- **Transparency** : choisissez si le bloc EC2 est solide ou semi-transparent. 
- **Platform** : sélectionnez la plateforme utilisée dans l'instance de calcul élastique. Lors du choix d'une plateforme avec des frais de licence, l'estimation des coûts est incluse dans les frais.
- **Instance type** : le type d’instance. Ce choix modifie les détails matériels affichés dans la barre d’outils, en fonction du matériel utilisé par l’hyperviseur. 
- **Size** : la taille de l’instance. Comme pour le type d’instance, les détails matériels affichés s’ajustent à la taille sélectionnée.
- **Billing option** : le modèle de tarification utilisé pour l'instance. Les options prises en charge sont actuellement À la demande, Instance réservée et Instance spot.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON.

### Schéma

Voici un exemple d'objet JSON d'un bloc EC2 :

```json
{
  "type": "ec2",
  "id": "d2ee1b7c-4368-4384-81dc-19c9c7866623",
  "region": "us-west-1",
  "mapPos": [3, 9],
  "transparent": false,
  "platform": "linux",
  "instanceType": "t3a",
  "instanceSize": "xlarge",
  "billingOptions": {
    "type": "si",
    "utilization": 0.42
  },
  "color": {
    "isometric": "#e6e7e8",
    "2d": "#e6e7e8"
  },
  "accentColor": {
    "isometric": "#4286c5",
    "2d": "#4286c5"
  },
  "link": "blueprint://ae6349e1-fa15-41c8-8e89-d201f9fa3cc9",
  "locked": true
}
```

- **type: ec2** : le type de composant.
- **id: string** : un identifiant unique pour le composant au format `uuid`.
- **region: string** : la région AWS dans laquelle cette instance EC2 est déployée. Toutes les régions globales sont prises en charge, à l'exception des régions `cn-`.
- **mapPos: [nombre, nombre]** : la position du composant dans le blueprint, exprimée par une paire de coordonnées x et y.
- **transparent: boolean** : si `true`, le composant est semi-transparent dans la vue 3D. Cela n'a aucun effet dans la vue 2D.
- **platform: string** : la plateforme utilisée pour l'instance. Consultez la section [Valeurs acceptées pour la plateforme](#valeurs-acceptees-pour-la-plateforme) pour plus d'informations.
- **instanceType: string** : le type d’instance. Consultez la section [Valeurs acceptées pour instanceType](#valeurs-acceptees-pour-instancetype) pour en savoir plus. 
- **instanceSize: string** : la taille utilisée pour l'instance. Consultez la section [Valeurs acceptées pour instanceSize](#valeurs-acceptees-pour-instancesize) pour plus d'informations.
- **billingOptions: object** : le modèle de tarification utilisé pour l'instance dans AWS. Consultez la section [Valeurs acceptées pour billingOptions](#valeurs-acceptees-pour-billingoptions) pour plus d'informations. 
- **color: object** : la couleur de remplissage du corps du composant.
  - **isometric: string** : couleur de remplissage du composant dans la vue 3D. Doit être une couleur hexadécimale.
  - **2d: string** : la couleur de remplissage du composant dans la vue en 2D. Doit être une couleur hexadécimale.
- **accentColor: object** : couleur d'accent utilisée pour afficher le logo du composant au-dessus du bloc.
  - **isometric: string** : la couleur d'accent du composant dans la vue en 3D. Doit être une couleur hexadécimale.
  - **2d: string** : la couleur d'accent du composant dans la vue en 2D. Doit être une couleur hexadécimale.
- **link: uri** : liez le composant à un autre diagramme en utilisant le format `blueprint://ID` ou à un site externe avec le format `https://LINK`.
- **locked: boolean** : si `true`, les modifications apportées au composant via l'application sont désactivées jusqu'à ce qu'il soit déverrouillé.

Le composant EC2 peut être ajouté aux [VPC][2], [groupes de sécurité][3], [groupes Auto Scaling][4] et [sous-réseaux][5].

## Valeurs acceptées pour `platform`

La clé `platform` accepte les valeurs suivantes :

```
linux, linuxSQL, linuxSQLWeb, linuxSQLEnterprise, rhel, sles, mswin, mswinSQL, mswinSQLWeb, mswinSQLEnterprise
```

## Valeurs acceptées pour `instanceType`

La clé `instanceType` accepte les valeurs suivantes :

```
a1, c1, c3, c4, c5, c5a, c5ad, c5d, c5n, c6g, c6gd, c6gn, cc2, cr1, d2, d3, d3en, f1, g2, g3, g3s, g4ad, g4dn, h1, hs1, i2, i3, i3en, inf1, m1, m2, m3, m4, m5, m5a, m5ad, m5d, m5dn, m5n, m5zn, m6g, m6gd, p2, p3, p3dn, p4d, r3, r4, r5, r5a, r5ad, r5b, r5d, r5dn, r5n, r6g, r6gd, t1, t2, t3, t3a, t4g, x1, x1e, z1d
```

## Valeurs acceptées pour `instanceSize`

La clé `instanceSize` accepte les valeurs suivantes :

```
micro, nano, small, medium, large, xlarge, 2xlarge, 3xlarge, 4xlarge, 6xlarge, 8xlarge, 9xlarge,  10xlarge, 12xlarge, 16xlarge, 18xlarge, 24xlarge, 32xlarge, metal
```

## Valeurs acceptées pour `billingOptions`

La clé `billingOptions` prend en charge toutes les options de facturation acceptées par Cloudcraft :

- On-demand
- Instance réservée
- Instance spot

Chaque option est représentée différemment dans l'objet `billingOptions`.

### On-demand

```
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

```
{
  "billingOptions": {
    "type": "ri",
    "leaseContractLength": 36,
    "purchaseOption": "Partial Upfront",
    "offeringClass": "convertible"
  }
}
```

- **type: ri** : la valeur de l'option de facturation pour une instance réservée est toujours `ri`.
- **leaseContractLength: number** : la durée pendant laquelle l'instance est réservée. Les valeurs acceptées sont 12 ou 36.
- **purchaseOption: string** : l'option d'achat de l'instance. Les valeurs acceptées sont `No Upfront`, `Partial Upfront` et `All Upfront`.
- **offeringClass: string** : la classe d'offre pour l'instance. Les valeurs acceptées sont `standard` et `convertible`. 

### Instance spot

```
{
  "billingOptions": {
    "type": "si",
    "utilization": 0.42
  }
}
```

- **type: si** : la valeur de l'option de facturation pour une instance spot est toujours `si`.
- **utilization: number** : un nombre à virgule flottante représentant la quantité d'utilisation de l'instance au cours d'un mois donné.

[1]: https://developers.cloudcraft.co/
[2]: /fr/cloudcraft/components-aws/vpc/
[3]: /fr/cloudcraft/components-aws/security-group/
[4]: /fr/cloudcraft/components-aws/auto-scaling-group/
[5]: /fr/cloudcraft/components-aws/subnet/