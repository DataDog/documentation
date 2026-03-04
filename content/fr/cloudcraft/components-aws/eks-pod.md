---
title: Composant EKS Pod
---
## Présentation

<div class="alert alert-info">L'analyse des composants Amazon EKS nécessite d'<a href="https://docs.datadoghq.com/cloudcraft/getting-started/connect-amazon-eks-cluster-with-cloudcraft/">autoriser le rôle IAM de Cloudcraft pour un accès en lecture seule</a>.</div>

Utilisez le composant EKS Pod pour visualiser les conteneurs Amazon EKS de votre architecture Amazon Web Services.

{{< img src="cloudcraft/components-aws/eks-pod/component-eks-pod-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft montrant des composants AWS interconnectés." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez une couleur de remplissage pour le corps du composant et une couleur d'accent pour le symbole. Vous pouvez utiliser les mêmes couleurs pour les vues 2D et 3D ou des couleurs différentes.
- **Compute** : sélectionnez le type de nœud worker. Les options prises en charge sont Fargate et groupe de nœuds.
- **CPU** : sélectionnez la valeur vCPU pour votre pod. Cette option n'est pas disponible pour les groupes de nœuds.
- **Memory (GB)** : sélectionnez la quantité de mémoire disponible pour le pod. Cette option n'est pas disponible pour les groupes de nœuds.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON.

### Schéma

Voici un exemple d'objet JSON d'un composant EKS Pod :

```
{
    "type": "ekspod",
    "id": "cc5104b0-1747-441c-a7b7-b760796d475b",
    "region": "us-east-1",
    "mapPos": [6.5,2.5],
    "compute": "fargateProfile",
    "cpu": "0.25",
    "memoryGB": "0.5",
    "color": {
        "isometric": "#ff9800",
        "2d": "#ff9800"
    },
    "accentColor": {
        "isometric": "#000000",
        "2d": "#000000"
    },
    "link": "https://aws.amazon.com/eks/",
    "locked": true
}
```

La représentation du schéma du composant **EKS Pod** suit le format ci-dessus et définit tous les champs d'un diagramme pour ce composant.

- **type: string** : le type de composant. Doit être une chaîne de valeur `ekspod` pour ce composant.
- **id: string, uuid** : l'identifiant unique du composant. L’API utilise un UUID v4 en interne mais accepte toute chaîne unique.
- **arn: string** : l'identifiant globalement unique du composant au sein d'AWS, aussi appelé [Amazon Resource Names][2]. 
- **region: string** : la région AWS associée au composant. Toutes les régions globales sont prises en charge, [sauf la Chine AWS][3]. 
- **mapPos: array** : la position du composant dans le blueprint, exprimée par une paire de coordonnées x et y. 
- **compute: string** : le type de nœud worker pour le pod. Accepte l'une des valeurs suivantes : `fargateProfile` ou `nodeGroup`. Valeur par défaut : `nodeGroup`.
- **cpu: number** : le nombre de vCPU disponibles pour le pod. Consultez la section [Valeurs acceptées pour `cpu`](#valeurs-acceptees-pour-cpu) pour plus d'informations. Valeur par défaut : `0.25`.
- **memoryGB: number** : la quantité de mémoire disponible pour le pod. Consultez la section [Valeurs acceptées pour `memoryGB`](#valeurs-acceptees-pour-memorygb) pour plus d'informations. Valeur par défaut : `0.5`. 
- **color: object** : la couleur de remplissage du corps du composant.
  - **isometric: string** : une couleur hexadécimale pour le corps du composant dans la vue 3D. Valeur par défaut : `#3C3C3C`. 
  - **2d: string** : une couleur hexadécimale pour le corps du composant dans la vue 2D. Valeur par défaut : `#D86613`.
- **accentColor: object** : la couleur d'accentuation du logo du composant.
  - **isometric: string** : une couleur hexadécimale pour le logo du composant dans la vue 3D. Valeur par défaut : `#FF9800`.
  - **2d: string** : la couleur hexadécimale du logo en vue 2D. La valeur par défaut est `#FFFFFF`.
- **link: string, uri** : une URI permettant de lier le composant à un autre diagramme ou à un site externe. Accepte les formats `blueprint://` ou `https://`.
- **locked : boolean** : Autorise ou non la modification de la position du composant par l'intermédiaire de l'interface web. La valeur par défaut est `false`.

## Valeurs acceptées pour `cpu`

La clé `cpu` accepte les valeurs suivantes :

```
0.25, 0.5, 1, 2, 4
```

**Remarque** : cette clé affecte uniquement les pods lorsque `compute` est défini sur `fargateProfile`.

## Valeurs acceptées pour `memoryGB`

La clé `memoryGB` accepte les valeurs suivantes :

```
0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
```

**Remarque** : cette clé affecte uniquement les pods lorsque `compute` est défini sur `fargateProfile`.

## Combinaisons valides pour `cpu` et `memoryGB`

Les clés `cpu` et `memoryGB` déterminent ensemble les ressources allouées à chaque conteneur dans un pod, mais vous devez fournir une combinaison valide de valeurs.

Le tableau ci-dessous indique quelles combinaisons sont valides.

cpu   | memoryGB
----  | ---------
0.25  | 0,5, 1, 2
0.5   | {1..4}
1     | {2..8}
2     | {4..16}
4     | {8..30}

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /fr/cloudcraft/faq/scan-error-aws-china-region/