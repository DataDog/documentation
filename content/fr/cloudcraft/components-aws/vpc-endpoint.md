---
title: Composant VPC Endpoint
---
## Présentation

Utilisez le composant VPC Endpoint pour visualiser les endpoints VPC dans votre architecture Amazon Web Services.

{{< img src="cloudcraft/components-aws/vpc-endpoint/component-vpc-endpoint-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft montrant des composants AWS interconnectés." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color**: sélectionnez une couleur de remplissage pour le corps du composant et une couleur d'accent pour son symbole. Vous pouvez utiliser les mêmes couleurs pour les vues 2D et 3D ou des couleurs différentes. 
- **Type** : sélectionnez le type de votre endpoint VPC.
- **Data processed (GB)** : indiquez le volume total de données traité par l'endpoint, en gigaoctets. Non disponible pour le type gateway.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON.

### Schéma

Voici un exemple d'objet JSON représentant un composant VPC Endpoint :

```json
{
    "type": "vpcendpoint",
    "id": "b1c1f99c-4b2b-437c-bcf4-36597da7e369",
    "region": "us-east-1",
    "mapPos": [17,4],
    "endpointType": "interface",
    "dataGb": 10,
    "color": {
        "isometric": "#ECECED",
        "2d": "#693CC5"
    },
    "accentColor": {
        "isometric": null,
        "2d": null
    },
    "locked": true
}
```

- **type: string** : type du composant. Doit être une chaîne ayant pour valeur `vpcendpoint`. 
- **id: string, uuid** : l’identifiant unique du composant. L’API utilise un UUID v4 en interne mais accepte toute chaîne unique.
- **arn: string** : identifiant globalement unique du composant au sein d'AWS, aussi appelé [Amazon Resource Names][2]. 
- **region: string** : région AWS associée au composant. Toutes les régions globales sont prises en charge, [sauf la Chine AWS][3]. 
- **mapPos: array** : position du composant dans le blueprint, exprimée par une paire de coordonnées x et y. 
- **endpointType: string** : type d'endpoint. Accepte l'une des valeurs suivantes : `interface`, `gateway` ou `gatewayloadbalancer`. Valeur par défaut : `interface`. 
- **dataGb: number** : volume total de données traité par l'endpoint, en gigaoctets. Valeur par défaut : `10`. 
- **color: object** : la couleur de remplissage du corps du composant.
  - **isometric: string** : couleur hexadécimale du corps du composant en vue 3D. Par défaut `#ECECED`.
  - **2d: string** : couleur hexadécimale du corps du composant en vue 2D. Par défaut `#CC2264`.
- **accentColor: object** : la couleur d’accentuation du logo du composant.
  - **isometric: string** : couleur hexadécimale du logo en vue 3D. Par défaut `#4286C5`.
  - **2d: string** : couleur hexadécimale du logo en vue 2D. Par défaut `#FFFFFF`.
- **link: string, uri** : URI permettant de lier le composant à un autre diagramme ou à un site externe. Accepte les formats `blueprint://` ou `https://`. 
- **locked: boolean** : détermine si la position du composant peut être modifiée via l’interface web. Valeur par défaut : `false`.

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /fr/cloudcraft/faq/scan-error-aws-china-region/