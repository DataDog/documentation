---
title: Composant Glacier
---
## Présentation

Utilisez le composant Glacier pour visualiser les classes de stockage à long terme de votre architecture Amazon Web Services.

{{< img src="cloudcraft/components-aws/glacier/component-glacier-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft montrant des composants AWS interconnectés." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez une couleur de remplissage pour le corps du composant et une couleur d'accent pour son symbole. Vous pouvez utiliser les mêmes couleurs pour les vues 2D et 3D ou des couleurs différentes. 
- **Storage (GB)** : saisissez le volume total de stockage disponible pour votre coffre-fort, en gigaoctets.
- **Retrieval Type** : choisissez le type de récupération pour votre coffre-fort.
- **Retrieval Req. / mo (K)** : saisissez le nombre de demandes de récupération par mois, en milliers.
- **Retrieval Data (GB)** : saisissez le volume de données récupérées, en gigaoctets.
- **Upload Req. / mo (K)** : saisissez le nombre de demandes de chargement par mois, en milliers.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON. 

### Schéma

Voici un exemple d'objet JSON d'un composant Glacier :

```json
{
    "type": "glaciervault",
    "id": "a3dd25ed-5508-43f3-9041-8bd480906514",
    "region": "us-east-1",
    "mapPos": [4,6],
    "storageDataGb": 10,
    "retrievalType": "standard",
    "retrievalDataGb": 0,
    "retrievalRequests": 0,
    "uploadRequests": 0,
    "color": {
        "isometric": "#ECECED",
        "2d": "#3F8624"
    },
    "accentColor": {
        "isometric": "#4286C5",
        "2d": "#FFFFFF"
    },
    "link": "https://aws.amazon.com/glacier/",
    "locked": true
}
```

- **type: chaîne** : le type de composant. Doit être une chaîne ayant pour valeur `glaciervault` pour ce composant.
- **id: string, uuid** : l'identifiant unique du composant. L’API utilise un UUID v4 en interne mais accepte toute chaîne unique.
- **arn: chaîne** : l'identifiant global unique du composant dans AWS, aussi appelé [Amazon Resource Name][2].
- **region: chaîne** : la région AWS associée au composant. Toutes les régions globales sont prises en charge, [sauf la Chine AWS][6].
- **mapPos: tableau** : la position du composant dans le blueprint. L'API utilise une paire de coordonnées X et Y pour indiquer la position.
- **storageDataGb: nombre** : le volume total de stockage disponible pour le coffre-fort Glacier, en gigaoctets. Valeur par défaut : `10`.
- **retrievalType: chaîne** : le type de récupération pour le coffre-fort Glacier. Valeurs acceptées : `expedited`, `standard` et `bulk`. Valeur par défaut : `standard`.
- **retrievalDataGb: nombre** : le volume de données récupérées, en gigaoctets. Valeur par défaut : `0`.
- **retrievalRequests: nombre** : le nombre de demandes de récupération par mois, en milliers. Valeur par défaut : `0`.
- **uploadRequests: nombre** : le nombre de demandes de chargement par mois, en milliers. Valeur par défaut : `0`.
- **color: objet** : la couleur de remplissage du corps du composant.
  - **isometric: chaîne** : la couleur hexadécimale du corps du composant dans la vue 3D. Valeur par défaut : `#ECECED`.
  - **2d: string** : la couleur hexadécimale du corps du composant dans la vue 2D. Valeur par défaut : `#3F8624`.
- **accentColor: objet** : la couleur d'accent du logo du composant.
  - **isometric: chaîne** : la couleur hexadécimale du logo du composant dans la vue 3D. Valeur par défaut : `#4286C5`.
  - **2d: chaîne** : la couleur hexadécimale du logo du composant dans la vue 2D. Valeur par défaut : `#FFFFFF`.
- **link: string, uri** : une URI permettant de lier le composant à un autre diagramme ou à un site externe. Accepte les formats `blueprint://` ou `https://`.
- **locked: booléen** : détermine si la position du composant peut être modifiée via l’interface web. Valeur par défaut : `false`.

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /fr/cloudcraft/faq/scan-error-aws-china-region/