---
title: Composant Neptune
---
## Présentation

Utilisez le composant Neptune pour visualiser les bases de données graphiques sans serveur de votre infrastructure Amazon Web Services.

{{< img src="cloudcraft/components-aws/neptune/component-neptune-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft montrant des composants AWS interconnectés." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez une couleur de remplissage pour le corps du composant et une couleur d'accent pour son symbole. Vous pouvez utiliser les mêmes couleurs pour les vues 2D et 3D ou des couleurs différentes.
- **Role** : sélectionnez le rôle de la base de données Neptune.
- **Instance type** : sélectionnez le type d’instance Neptune. Ce choix modifie les détails matériels affichés dans la barre d’outils, en fonction du matériel utilisé par l’hyperviseur.
- **Size** : sélectionnez la taille de l’instance Neptune. Comme pour le type d’instance, les détails matériels affichés s’ajustent à la taille sélectionnée.
- **Storage (GB)** : saisissez le volume de stockage total disponible pour la base de données, en gigaoctets. Cette option n'est pas disponible pour le rôle reader.
- **Snapshot (GB)** : saisissez le volume de stockage total provisionné pour les snapshots, en gigaoctets. Cette option n'est pas disponible pour le rôle reader.
- **IOPS (Millions)** : saisissez la limite mensuelle d'E/S pour l'instance, en millions. Cette option n'est pas disponible pour le rôle reader.
- **Instances** : saisissez le nombre d'instances Neptune. Cette option est uniquement disponible pour le rôle serverless.
- **Min NCUs** : saisissez le nombre minimum d'unités de capacité Neptune (NCU) disponibles pour la base de données. Cette option est disponible uniquement pour le rôle serverless.
- **Max NCUs** : saisissez le nombre maximum d'unités de capacité Neptune (NCU) disponibles pour la base de données. Cette option est disponible uniquement pour le rôle serverless.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON.

### Schéma

Voici un exemple d'objet JSON représentant un composant Neptune :

```json
{
    "type": "neptune",
    "id": "7d2ac4f8-2b7d-4617-98cb-ff792963df6d",
    "region": "us-east-1",
    "mapPos": [-2,12],
    "role": "writer",
    "instanceType": "r5",
    "instanceSize": "large",
    "storage": 10,
    "snapshots": 0,
    "iops": 0,
    "instances": "1",
    "minNCUs": 1,
    "maxNCUs": 2.5,
    "color": {
        "isometric": "#ECECED",
        "2d": "#3B48CC"
    },
    "accentColor": {
        "isometric": "#4286C5",
        "2d": "#FFFFFF"
    },
    "link": "https://aws.amazon.com/neptune/",
    "locked": true
}
```

- **type: chaîne** : le type de composant. Doit être une chaîne ayant pour valeur `neptune` pour ce composant.
- **id: chaîne, uuid** : l'identifiant unique du composant. L’API utilise un UUID v4 en interne mais accepte toute chaîne unique.
- **arn: chaîne** : l'identifiant global unique du composant dans AWS, aussi appelé [Amazon Resource Name][2].
- **region: chaîne** : la région AWS associée au composant. Toutes les régions globales sont prises en charge, [sauf la Chine AWS][3].
- **mapPos: tableau** : la position du composant dans le blueprint, exprimée par une paire de coordonnées x et y.
- **role: chaîne** : le rôle de la base de données Neptune. Valeurs acceptées : `serverless`, `writer` et `reader`. Valeur par défaut : `writer`.
- **instanceType: chaîne** : le type d’instance Neptune. Consultez la rubrique [Valeurs acceptées pour `instanceType`](#valeurs-acceptees-pour-instancetype) pour en savoir plus. Valeur par défaut : `r5`.
- **instanceSize: chaîne** : la taille de l'instance Neptune. Non applicable si `role` est défini sur `reader`. Valeur par défaut : `large`.
- **storage: nombre** : le volume de stockage total disponible pour la base de données, en gigaoctets. Non applicable si `role` est défini sur `reader`. Valeur par défaut : `10`.
- **snapshots: nombre** : le volume de stockage total provisionné pour les snapshots, en gigaoctets. Non applicable si `role` est défini sur `reader`. Valeur par défaut : `0`.
- **iops : number** : la limite mensuelle d'E/S pour l'instance, en millions. Non applicable si `role` est défini sur `reader`. Valeur par défaut : `0`.
- **instances: nombre** : le nombre d'instances Neptune. Uniquement applicable si `role` est défini sur `serverless`. Valeur par défaut : `1`.
- **minNCUs: nombre** : le nombre minimum de NCU disponibles pour la base de données. Uniquement applicable si `role` est défini sur `serverless`. Valeur par défaut : `1`.
- **maxNCUs: nombre** : le nombre maximum de NCU disponibles pour la base de données. Uniquement applicable si `role` est défini sur `serverless`. Valeur par défaut : `2.5`.
- **color: objet** : la couleur de remplissage du corps du composant.
  - **isometric: chaîne** : la couleur hexadécimale du corps du composant dans la vue 3D. Valeur par défaut : `#ECECED`.
  - **2d: string** : la couleur hexadécimale du corps du composant dans la vue 2D. Valeur par défaut : `#3B48CC`.
- **accentColor: objet** : la couleur d'accent du logo du composant.
  - **isometric: chaîne** : la couleur hexadécimale du logo du composant dans la vue 3D. Valeur par défaut : `#4286C5`.
  - **2d: chaîne** : la couleur hexadécimale du logo du composant dans la vue 2D. Valeur par défaut : `#FFFFFF`.
- **link: string, uri** : une URI permettant de lier le composant à un autre diagramme ou à un site externe. Accepte les formats `blueprint://` ou `https://`.
- **locked: booléen** : détermine si la position du composant peut être modifiée via l’interface web. Valeur par défaut : `false`.

## Valeurs acceptées pour `instanceType`

La clé `instanceType` accepte les valeurs suivantes :

```
t4g, t3, x2g, x2iedn, r6g, r6i, r5, r5d, r4
```

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /fr/cloudcraft/faq/scan-error-aws-china-region/