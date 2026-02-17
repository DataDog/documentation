---
title: Composant ECS Cluster
---
## Présentation

Utilisez le composant ECS Cluster pour visualiser les clusters Amazon ECS de votre architecture Amazon Web Services.

{{< img src="cloudcraft/components-aws/ecs-cluster/component-ecs-cluster-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft montrant des composants AWS interconnectés." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez une couleur de remplissage pour le haut du composant et une couleur d'accent pour le bas. Vous pouvez utiliser les mêmes couleurs pour les vues 2D et 3D ou des couleurs différentes pour chacune. 
- **Name** : saisissez un nom pour le cluster. Vous pouvez utiliser jusqu'à 255 lettres, chiffres, traits d'union et traits de soulignement.

Vous pouvez également ajouter le composant ECS Cluster aux [VPC][1] et [sous-réseaux][2].

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON.

### Schéma

Voici un exemple d'objet JSON d'un composant ECS Cluster :

```json
{
    "type": "ecscluster",
    "id": "c28296e2-01b1-463c-be6d-fe748a3dba05",
    "arn": "arn:aws:ecs:us-east-1:746399320916:cluster/ecs-cluster",
    "region": "us-east-1",
    "mapPos": [3,-1.75],
    "name": "ECS Cluster",
    "nodes": [
        "35578835-bb50-43f6-b9bc-d9a7ff20f667",
        "adad4f6e-b1dc-4e90-a860-e6c34d1d707a",
        "6321a7c4-db1f-4b47-a2dd-2d4c1a3deaff",
        "bafdae24-a6af-47ad-896d-846d790c8b23",
        "117a0f24-a115-4f12-8627-e8c8b9665d86",
        "c4af84a8-a02d-400e-9277-ad1ed886390f",
        "93a34859-a6ef-451d-96c2-4cfccab86d70",
        "b0e607e8-8b01-492b-b4a0-f4eea35d19f1",
        "085ca535-3b23-420c-a19c-27ae3d11a2ab",
        "eb7cc62b-db25-4ce4-97dd-130bb288512a"
    ],
    "color": {
        "isometric": "#ffeb3b",
        "2d": "#ffeb3b"
    },
    "accentColor": {
        "isometric": "#000000",
        "2d": "#000000"
    },
    "link": "https://aws.amazon.com/ecs/",
    "locked": true
}
```

- **type: string** : le type de composant. Doit être une chaîne de valeur `ecscluster` pour ce composant.
- **id: string, uuid** : l'identifiant unique du composant. L’API utilise un UUID v4 en interne mais accepte toute chaîne unique.
- **arn: string** : l'identifiant globalement unique du composant au sein d'AWS, aussi appelé [Amazon Resource Names][4].
- **region: string** : la région AWS du composant. L'API prend en charge toutes les régions globales, [à l'exception d'AWS China][5].
- **mapPos: array** : la position du composant dans le blueprint, exprimée par une paire de coordonnées x et y.
- **name: string** : le nom du cluster. Accepte jusqu'à 255 lettres, chiffres, traits d'union et traits de soulignement.
- **nodes: array** : les services et tâches s'exécutant dans le cluster. Accepte un tableau d'identifiants uniques pour les composants de services et de tâches.
- **color: object** : la couleur de remplissage pour le haut du corps du composant.
  - **isometric: string** : une couleur hexadécimale pour le corps du composant dans la vue 3D. Valeur par défaut : `#ececed`.
  - **2d: string** : une couleur hexadécimale pour le corps du composant dans la vue 2D. Valeur par défaut : `#ececed`.
- **accentColor: object** : la couleur d'accent pour le bas du corps du composant.
  - **isometric: string** : couleur hexadécimale du logo en vue 3D. Par défaut `#4286c5`.
  - **2d: string** : une couleur hexadécimale pour le logo du composant dans la vue 2D. Valeur par défaut : `#693cc5`.
- **link: string, uri** : une URI permettant de lier le composant à un autre diagramme ou à un site externe. Accepte les formats `blueprint://` ou `https://`.
- **locked: boolean** : autorise ou non la modification de la position du composant par l'intermédiaire de l'interface web. La valeur par défaut est `false`.

[1]: /fr/cloudcraft/components-aws/vpc/
[2]: /fr/cloudcraft/components-aws/subnet/
[3]: https://developers.cloudcraft.co/
[4]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[5]: /fr/cloudcraft/faq/scan-error-aws-china-region/