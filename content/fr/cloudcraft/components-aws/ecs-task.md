---
title: Composant ECS Task
---
## Présentation

Utilisez le composant ECS Task pour visualiser les tâches Amazon ECS de votre architecture Amazon Web Services.

{{< img src="cloudcraft/components-aws/ecs-task/component-ecs-task-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft montrant des composants AWS interconnectés." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez une couleur de remplissage pour le corps du composant. Vous pouvez utiliser les mêmes couleurs pour les vues 2D et 3D ou des couleurs différentes pour chacune. 
- **Launch type** : sélectionnez le type de lancement pour votre tâche autonome. Les options prises en charge sont Fargate et EC2.
- **CPU** : sélectionnez le CPU au niveau de la tâche. Cette option n'est pas disponible pour EC2.
- **Memory (GB)** : sélectionnez la quantité de mémoire disponible au niveau de la tâche. Cette option n'est pas disponible pour EC2. 
- **Storage (GiB)** : saisissez la quantité de stockage provisionnée pour la tâche, en gibioctets. Cette option n'est pas disponible pour EC2.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON. 

### Schéma

Voici un exemple d'objet JSON d'un composant ECS Task :

```json
{
    "type": "ecstask",
    "id": "d76098b3-0d07-4362-80c9-018e474bb910",
    "arn": "arn:aws:ecs:us-east-1:746399320916:task/ecs-cluster/9790893504785954834",
    "region": "us-west-2",
    "mapPos": [7.5,3],
    "launchType": "fargate",
    "cpu": "256",
    "memoryGB": "0.5",
    "storageGB": 20,
    "color": {
        "isometric": "#ffeb3b",
        "2d": "#ffeb3b"
    },
    "link": "https://aws.amazon.com/ecs/",
    "locked": true
}
```

- **type: string** : le type de composant. Doit être une chaîne de valeur `ecstask` pour ce composant.
- **id: string, uuid** : l'identifiant unique du composant. L’API utilise un UUID v4 en interne mais accepte toute chaîne unique.
- **arn: string** : l'identifiant globalement unique du composant au sein d'AWS, aussi appelé [Amazon Resource Names][2]. 
- **region: string** : la région AWS du composant. L'API prend en charge toutes les régions globales, [à l'exception d'AWS China][3].
- **mapPos: array** : la position du composant dans le blueprint, exprimée par une paire de coordonnées x et y.
- **launchType: string** : le type de lancement pour la tâche autonome. Accepte l'une des valeurs suivantes : `fargate` ou `ec2`. Valeur par défaut : `ec2`.
- **cpu: number** : le nombre de vCPU au niveau de la tâche. Consultez la section [Valeurs acceptées pour cpu](#valeurs-acceptees-pour-cpu) pour plus d'informations. Valeur par défaut : `256`.
- **memoryGB: number** : la quantité de mémoire au niveau de la tâche. Consultez la section [Valeurs acceptées pour memoryGB](#valeurs-acceptees-pour-memorygb) pour plus d'informations. Valeur par défaut : `0.5`.
- **storageGB: number** : la quantité de stockage provisionnée pour la tâche, en gibioctets. Accepte une valeur entre `20` et `200`. Valeur par défaut : `20`. 
- **color: object** : la couleur de remplissage du corps du composant.
  - **isometric: string** : une couleur hexadécimale pour le corps du composant dans la vue 3D. Valeur par défaut : `#ececed` pour EC2 et `#3c3c3c` pour Fargate. 
  - **2d: string** : une couleur hexadécimale pour le corps du composant dans la vue 2D. Valeur par défaut : `#d86613`. 
- **link: string, uri** : une URI permettant de lier le composant à un autre diagramme ou à un site externe. Accepte les formats `blueprint://` ou `https://`.
- **locked : boolean** : Autorise ou non la modification de la position du composant par l'intermédiaire de l'interface web. La valeur par défaut est `false`.

## Valeurs acceptées pour `cpu`

La clé `cpu` accepte les valeurs suivantes :

```
256, 512, 1024, 2048, 4096
```

**Remarque** : cette clé n'a aucun effet si vous définissez `launchType` sur `ec2`.

## Valeurs acceptées pour `memoryGB`

La clé `memoryGB` accepte les valeurs suivantes :

```
0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
```

**Remarque** : cette clé n'a aucun effet si vous définissez `launchType` sur `ec2`.

## Combinaisons valides pour `cpu` et `memoryGB`

Les clés `cpu` et `memoryGB` déterminent ensemble la taille de votre tâche, mais vous devez fournir une combinaison valide de valeurs.

Le tableau ci-dessous indique quelles combinaisons sont valides.

CPU  | memoryGB
---- | ---------
256  | 0,5, 1, 2
512  | {1..4}
1024 | {2..8}
2048 | {4..16}
4096 | {8..30}

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /fr/cloudcraft/faq/scan-error-aws-china-region/