---
title: Composant EKS Cluster
---
## Présentation

<div class="alert alert-info">L'analyse des composants Amazon EKS nécessite d'<a href="https://docs.datadoghq.com/cloudcraft/getting-started/connect-amazon-eks-cluster-with-cloudcraft/">autoriser le rôle IAM de Cloudcraft pour un accès en lecture seule</a>.</div>

Utilisez le composant EKS Cluster pour visualiser les clusters Amazon EKS de votre architecture Amazon Web Services.

{{< img src="cloudcraft/components-aws/eks-cluster/component-eks-cluster-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft montrant des composants AWS interconnectés." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez une couleur de remplissage pour le haut du composant et une couleur d'accent pour le bas et le logo. Vous pouvez utiliser les mêmes couleurs pour les vues 2D et 3D ou des couleurs différentes pour chacune. 
- **Name** : saisissez un nom pour le cluster.

Vous pouvez également ajouter le composant **EKS Cluster** aux [VPC][1], [groupes de sécurité][2] et [sous-réseaux][2].

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON.

### Schéma

Voici un exemple d'objet JSON d'un composant EKS Cluster :

```json
{
    "type": "ekscluster",
    "id": "0b9f9ea3-2ba7-46fd-bd40-cd694dc38af6",
    "arn": "arn:aws:eks:us-east-1:987867537671:cluster/eks-cluster",
    "region": "us-east-1",
    "mapPos": [2.5,-1.75],
    "name": "EKS Cluster",
    "nodes": [
        "c00c8af0-d409-4a1c-9db4-e2f96128ad56",
        "3d911e8b-2d8e-4cb7-8eb8-61b2e96c75b3"
    ],
    "color": {
        "isometric": "#000000",
        "2d": "#000000"
    },
    "accentColor": {
        "isometric": "#ff5722",
        "2d": "#ff5722"
    },
    "link": "https://aws.amazon.com/eks/",
    "locked": true
}
```

- **type: string** : le type de composant. Doit être une chaîne de valeur `ekscluster` pour ce composant.
- **id: string, uuid** : l'identifiant unique du composant. L’API utilise un UUID v4 en interne mais accepte toute chaîne unique.
- **arn: string** : l'identifiant globalement unique du composant au sein d'AWS, aussi appelé [Amazon Resource Names][5].
- **region: chaîne** : la région AWS associée au composant. Toutes les régions globales sont prises en charge, [sauf la Chine AWS][6].
- **mapPos: array** : la position du composant dans le blueprint, exprimée par une paire de coordonnées x et y.
- **name: string** : le nom du cluster. Valeur par défaut : `EKS Cluster`.
- **nodes: array** : les charges de travail exécutées dans le cluster. Accepte un tableau d'identifiants uniques pour [le composant EKS Workload][7].
- **color: object** : la couleur de remplissage pour le haut du corps du composant.
  - **isometric: string** : couleur hexadécimale du corps du composant en vue 3D. Par défaut `#ECECED`.
  - **2d: string** : une couleur hexadécimale pour le corps du composant dans la vue 2D. Valeur par défaut : `#ECECED`.
- **accentColor: object** : la couleur d'accent pour le bas du corps du composant et son logo.
  - **isometric: string** : couleur hexadécimale pour le bas du corps du composant et son logo en vue 3D. Par défaut `#4286C5`.
  - **2d: string** : une couleur hexadécimale pour le logo du composant dans la vue 2D. Valeur par défaut : `#693CC5`.
- **link: string, uri** : une URI permettant de lier le composant à un autre diagramme ou à un site externe. Accepte les formats `blueprint://` ou `https://`.
- **locked: boolean** : autorise ou non la modification de la position du composant par l'intermédiaire de l'interface web. La valeur par défaut est `false`.

[1]: /fr/cloudcraft/components-aws/vpc/
[2]: /fr/cloudcraft/components-aws/security-group/
[3]: /fr/cloudcraft/components-aws/subnet/
[4]: https://developers.cloudcraft.co/
[5]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[6]: /fr/cloudcraft/faq/scan-error-aws-china-region/
[7]: /fr/cloudcraft/components-aws/eks-workload/