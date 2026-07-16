---
title: Region
---

## Présentation

Utilisez le composant Region pour représenter les emplacements physiques de votre architecture Amazon Web Services.

{{< img src="cloudcraft/components-aws/region/component-region-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft montrant le composant Region AWS." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Visibility** : activez ou désactivez la visibilité du composant dans le diagramme.
- **Color** : sélectionnez une couleur de remplissage pour le corps du composant et une couleur d'accent pour son symbole. Vous pouvez utiliser les mêmes couleurs pour les vues 2D et 3D ou des couleurs différentes. 
- **Padding** : saisissez une valeur de marge pour ajuster l'espacement entre la bordure du composant et son contenu.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON.

### Schéma

Voici un exemple d'objet JSON d'un composant Region :

```json
{
    "type": "region",
    "id": "1063814395",
    "arn":"arn:aws::us-east-1::",
    "region": "us-east-1",
    "visible": true,
    "padding": 2,
    "shape": "rectangular",
    "nodes": [
        "6acd2c2e-60aa-44bd-93e8-aca071ef85ff"
    ],
    "color": {
        "isometric": "#a991e1",
        "2d": "#a991e1"
    },
    "link": "https://aws.amazon.com/",
    "locked": true
}
```

- **type: chaîne** : le type de composant.
- **id: chaîne** : un identifiant unique pour le composant composé de 10 chiffres aléatoires.
- **arn: string** : l'identifiant global unique du composant dans AWS, aussi appelé [Amazon Resource Name](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html). Le composant Region prend une valeur ARN fictive qui est toujours égale à `arn:aws::region::`.
- **region: chaîne** : la région AWS pertinente. Toutes les régions globales sont prises en charge, à l’exception des régions `cn-`.
- **visible: booléen** : si `false`, le composant apparaît en semi-transparence dans le diagramme.
- **padding: nombre** : la valeur d'espacement du composant.
- **shape: chaîne** : la forme du composant. Le composant Region prend uniquement en charge la forme `rectangular`.
- **nodes: tableau** : un tableau d'ID de nœuds inclus dans la région. Les ID de nœuds sont au format `uuid`.
- **color: objet** : la couleur de remplissage du corps du composant.
  - **isometric: chaîne** : la couleur de remplissage pour le composant dans la vue 3D. Doit être une couleur hexadécimale. Valeur par défaut : `#ECECED`.
  - **2d: chaîne** : la couleur de remplissage pour le composant dans la vue 2D. Doit être une couleur hexadécimale. Valeur par défaut : `#CC2264`.
- **link: uri** : liez le composant à un autre diagramme en utilisant le format `blueprint://ID` ou à un site externe avec le format `https://LINK`.
- **locked: booléen** : si `true`, les modifications apportées au composant via l'application sont désactivées jusqu'à ce qu'il soit déverrouillé.