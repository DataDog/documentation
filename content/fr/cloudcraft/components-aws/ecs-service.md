---
title: Composant ECS Service
---
## Présentation

Utilisez le composant ECS Service pour visualiser les services Amazon ECS de votre architecture Amazon Web Services.

{{< img src="cloudcraft/components-aws/ecs-service/component-ecs-service-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft montrant des composants AWS interconnectés." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionner une couleur de remplissage pour le haut du composant et une couleur d'accent pour le bas. Vous pouvez utiliser les mêmes couleurs dans les vues 2D et 3D ou des couleurs différentes pour chacune.
- **Name** : saisir un nom pour le service.

Vous pouvez également ajouter le composant **ECS Service** aux [VPC][1], [groupes de sécurité][2] et [sous-réseaux][3].

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON.

### Schéma

Voici un exemple d'objet JSON d'un composant ECS Service :

```json
{
    "type": "ecsservice",
    "id": "58c88e1f-b9c7-47a0-aed1-ee8324bf0fd0",
    "arn": "arn:aws:ecs:us-east-1:746399320916:service/ecs-service",
    "region": "us-east-1",
    "mapPos": [6,1],
    "name": "ECS Service",
    "nodes": [
        "1005e737-2ccc-4325-abdf-b0f6c5c78ea1",
        "319c40a5-d5f2-4394-8784-f613aa1d313b"
    ],
    "color": {
        "isometric": "#000000",
        "2d": "#000000"
    },
    "accentColor": {
        "isometric": "#03a9f4",
        "2d": "#03a9f4"
    },
    "link": "https://aws.amazon.com/ecs/",
    "locked": true
}
```

- **type: string** : le type de composant. Doit être une chaîne de valeur `ecsservice` pour ce composant.
- **id: string, uuid** : l'identifiant unique du composant. L’API utilise un UUID v4 en interne mais accepte toute chaîne unique.
- **arn: string** : l'identifiant globalement unique du composant au sein d'AWS, aussi appelé [Amazon Resource Names][5].
- **region: string** : la région AWS du composant. L'API prend en charge toutes les régions globales, [à l'exception d'AWS China][6].
- **mapPos: array** : la position du composant dans le blueprint, exprimée par une paire de coordonnées x et y.
- **name: string** : le nom du service. Valeur par défaut : `ECS Service`.
- **nodes: array** : les tâches s'exécutant dans le service. Accepte un tableau d'identifiants uniques pour les tâches de type de lancement EC2 ou Fargate.
- **color: object** : la couleur de remplissage pour le haut du corps du composant.
  - **isometric: string** : une couleur hexadécimale pour le corps du composant dans la vue 3D. Valeur par défaut : `#ffffff`.
  - **2d: string** : une couleur hexadécimale pour le corps du composant dans la vue 2D. Valeur par défaut : `#ffffff`.
- **accentColor: object** : la couleur d'accent pour le bas du corps du composant.
  - **isometric: string** : couleur hexadécimale du logo en vue 3D. Par défaut `#4286c5`.
  - **2d: string** : une couleur hexadécimale pour le logo du composant dans la vue 2D. Valeur par défaut : `#693cc5`.
- **link: string, uri** : une URI permettant de lier le composant à un autre diagramme ou à un site externe. Accepte les formats `blueprint://` ou `https://`.
- **locked: boolean** : autorise ou non la modification de la position du composant par l'intermédiaire de l'interface web. La valeur par défaut est `false`.

[1]: /fr/cloudcraft/components-aws/vpc/
[2]: /fr/cloudcraft/components-aws/security-group/
[3]: /fr/cloudcraft/components-aws/subnet/
[4]: https://developers.cloudcraft.co/
[5]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[6]: /fr/cloudcraft/faq/scan-error-aws-china-region/