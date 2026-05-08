---
title: Composant EKS Workload
---
## Présentation

<div class="alert alert-info">L'analyse des composants Amazon EKS nécessite d'<a href="https://docs.datadoghq.com/cloudcraft/getting-started/connect-amazon-eks-cluster-with-cloudcraft/">autoriser le rôle IAM de Cloudcraft pour un accès en lecture seule</a>.</div>

Utilisez le composant EKS Workload pour visualiser les charges de travail Amazon EKS de votre architecture Amazon Web Services.

{{< img src="cloudcraft/components-aws/eks-workload/component-eks-workload-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft montrant des composants AWS interconnectés." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez une couleur de remplissage pour le haut du composant et une couleur d'accent pour le bas. Vous pouvez utiliser les mêmes couleurs pour les vues 2D et 3D ou des couleurs différentes pour chacune. 
- **Name** : saisissez un nom pour la charge de travail. 
- **Type** : sélectionnez le type de charge de travail à utiliser. 

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON.

### Schéma

Voici un exemple d'objet JSON d'un composant EKS Workload :

```json
{
    "type": "eksworkload",
    "id": "a5cad956-3366-4582-a73a-2709d53e975f",
    "region": "us-east-1",
    "mapPos": [3.5,-0.75],
    "name": "EKS Workload",
    "workloadType": "deployment",
    "nodes": [
        "cadf6a3f-67d2-4df9-ad40-f892030af58b",
        "a9437fdf-56f9-4c3b-8acf-6f0f37f70980",
        "b15e51da-b99b-4072-b4c4-e9e85df7e285",
        "b5878fa9-bf1a-44d0-bc8d-336f99763fce"
    ],
    "color": {
        "isometric": "#f44336",
        "2d": "#f44336"
    },
    "accentColor": {
        "isometric": "#f44336",
        "2d": "#f44336"
    },
    "link": "https://aws.amazon.com/eks/",
    "locked": true
}
```

- **type: string** : le type de composant. Doit être une chaîne de valeur `eksworkload` pour ce composant.
- **id: string, uuid** : l'identifiant unique du composant. L’API utilise un UUID v4 en interne mais accepte toute chaîne unique.
- **arn: string** : l'identifiant globalement unique du composant au sein d'AWS, aussi appelé [Amazon Resource Names][2]. 
- **region: string** : la région AWS associée au composant. Toutes les régions globales sont prises en charge, [sauf la Chine AWS][3]. 
- **mapPos: array** : la position du composant dans le blueprint, exprimée par une paire de coordonnées x et y.
- **name: string** : le nom de la charge de travail. Valeur par défaut : `EKS Workload`.
- **workloadType: string** : le type de charge de travail sur le cluster. Consultez la section [Valeurs acceptées pour `workloadType`](#valeurs-acceptees-pour-workloadtype) pour plus d'informations. Valeur par défaut : `deployment`.
- **nodes: array** : les pods s'exécutant sur cette charge de travail. Accepte un tableau d'identifiants uniques de pods EKS.
- **color: object** : la couleur de remplissage pour le haut du corps du composant.
  - **isometric: string** : une couleur hexadécimale pour le corps du composant dans la vue 3D. Valeur par défaut : `#FFFFFF`.
  - **2d: string** : une couleur hexadécimale pour le corps du composant dans la vue 2D. Valeur par défaut : `#FFFFFF`.
- **accentColor: object** : la couleur d'accent pour le bas du corps du composant.
  - **isometric: string** : couleur hexadécimale du logo en vue 3D. Par défaut `#4286C5`.
  - **2d: string** : une couleur hexadécimale pour le logo du composant dans la vue 2D. Valeur par défaut : `#693CC5`.
- **link: string, uri** : une URI permettant de lier le composant à un autre diagramme ou à un site externe. Accepte les formats `blueprint://` ou `https://`.
- **locked : boolean** : Autorise ou non la modification de la position du composant par l'intermédiaire de l'interface web. La valeur par défaut est `false`.

## Valeurs acceptées pour `workloadType`

La clé `workloadType` accepte l'une des valeurs de chaîne suivantes :

```
deployment, statefulSet, daemonSet, job, cronJob
```

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /fr/cloudcraft/faq/scan-error-aws-china-region/