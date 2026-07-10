---
title: Composant ECR Repository
---
## Présentation

Utilisez le composant ECR Repository pour visualiser les référentiels de conteneurs de votre architecture Amazon Web Services. 

{{< img src="cloudcraft/components-aws/ecr-repository/component-ecr-repository-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft montrant des composants AWS interconnectés." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez une couleur de remplissage pour le corps du composant et une couleur d'accent pour son symbole. Vous pouvez utiliser les mêmes couleurs pour les vues 2D et 3D ou des couleurs différentes.
- **Data stored (GB)** : saisir la quantité de données que vous stockez dans vos référentiels.
- **Private** : sélectionner si votre référentiel est public ou privé.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON.

### Schéma

Voici un exemple d'objet JSON d'un composant ECR Repository :

```json
{
    "type": "ecr",
    "id": "15e88546-33f3-40d5-b88c-e7cdae335da8",
    "arn": "arn:aws:ecr:us-east-1:728720640411:repository/cloudcraft",
    "region": "us-east-1",
    "mapPos": [7.5,6],
    "storageGB": 1,
    "private": true,
    "color": {
        "isometric": "#ff9800",
        "2d": "#ff9800"
    },
    "accentColor": {
        "isometric": "#ffffff",
        "2d": "#ffffff"
    },
    "link": "https://aws.amazon.com/ecr/",
    "locked": true
}
```

- **type: string** : le type de composant. Doit être une chaîne de valeur `ecr` pour ce composant.
- **id: string, uuid** : l'identifiant unique du composant. L’API utilise un UUID v4 en interne mais accepte toute chaîne unique.
- **arn: string** : l'identifiant globalement unique du composant au sein d'AWS, aussi appelé [Amazon Resource Names][2]. 
- **region: string** : la région AWS du composant. L'API prend en charge toutes les régions globales, [à l'exception d'AWS China][3].
- **mapPos: array** : la position du composant dans le blueprint, exprimée par une paire de coordonnées x et y.
- **storageGB: number** : la quantité de données stockées dans les référentiels à l'intérieur du registre, en gigaoctets. Valeur par défaut : `1`.
- **private: boolean** : si le référentiel est privé. Valeur par défaut : `true`.
- **color: object** : la couleur de remplissage du corps du composant.
  - **isometric: string** : une couleur hexadécimale pour le corps du composant dans la vue 3D. Valeur par défaut : `#3F7DDE`.
  - **2d: string** : une couleur hexadécimale pour le corps du composant dans la vue 2D. Valeur par défaut : `#D86613`.
- **accentColor: object** : la couleur d'accentuation du logo du composant.
  - **isometric: string** : une couleur hexadécimale pour le logo du composant dans la vue 3D. Valeur par défaut : `#052048`.
  - **2d: string** : la couleur hexadécimale du logo en vue 2D. La valeur par défaut est `#FFFFFF`.
- **link: string, uri** : une URI permettant de lier le composant à un autre diagramme ou à un site externe. Accepte les formats `blueprint://` ou `https://`.
- **locked: boolean** : autorise ou non la modification de la position du composant par l'intermédiaire de l'interface web. La valeur par défaut est `false`.

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /fr/cloudcraft/faq/scan-error-aws-china-region/