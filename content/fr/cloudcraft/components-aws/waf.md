---
title: Composant WAF
---
## Présentation

Utilisez le composant WAF pour représenter et visualiser les pare-feux d'applications web de votre architecture Amazon Web Services.

{{< img src="cloudcraft/components-aws/waf/component-waf-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft montrant des composants AWS interconnectés." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

-  **Color** : sélectionnez une couleur de remplissage pour le corps du composant et une couleur d'accent pour son symbole. Vous pouvez utiliser les mêmes couleurs pour les vues 2D et 3D ou des couleurs différentes. 
-  **Rules & Groups** : indiquez le nombre de règles et de groupes souhaité par liste de contrôle d'accès web.
-  **Requests (millions/mo)** : indiquez le nombre de requêtes web que votre WAF reçoit par mois, en millions.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON.

### Schéma

Voici un exemple d'objet JSON représentant un composant WAF :

```json
{
    "type": "waf",
    "id": "7334ebd8-e980-45c6-9211-e8f090089c6e",
    "arn": "arn:aws:wafv2:us-east-1:746399320916:global/webacl/webacl-test-cdn/793709d6-e353-4cce-aeb7-b1fa5d8845d4",
    "region": "us-east-1",
    "mapPos": [-1,9],
    "aclCount": 5,
    "ruleCount": 5,
    "requestMillions": 5,
    "color": {
        "isometric": "#000000",
        "2d": "#000000"
    },
    "accentColor": {
        "isometric": "#f44336",
        "2d": "#f44336"
    },
    "link": "https://aws.amazon.com/waf/",
    "locked": true
}
```

- **type: string** : le type de composant. Doit être une chaîne ayant pour valeur `waf` pour ce composant.
- **id: string, uuid** : l'identifiant unique du composant. L’API utilise un UUID v4 en interne mais accepte toute chaîne unique.
- **arn: string** : l'identifiant globalement unique du composant au sein d'AWS, aussi appelé [Amazon Resource Names][2]. 
- **region: string** : la région AWS associée au composant. Toutes les régions globales sont prises en charge, [sauf la Chine AWS][3]. 
- **mapPos: array** : la position du composant dans le blueprint, exprimée par une paire de coordonnées x et y. 
- **aclCount: number** : le nombre de listes de contrôle d'accès web utilisées. La valeur par défaut est `1`.
- **ruleCount: number** : le nombre de règles ajoutées par liste de contrôle d'accès web. La valeur par défaut est `0`.
- **requestMillions: number** : le nombre de requêtes web reçues par mois, en millions. La valeur par défaut est `0`.
- **color: object** : la couleur de remplissage du corps du composant.
  - **isometric: string** : la couleur hexadécimale du corps du composant en vue 3D. La valeur par défaut est `#607D8B`.
  - **2d: string** : la couleur hexadécimale du corps du composant en vue 2D. La valeur par défaut est `#D6242D`.
- **accentColor: object** : la couleur d'accentuation du logo du composant.
  - **isometric: string** : la couleur hexadécimale du logo en vue 3D. La valeur par défaut est `#FF5722`.
  - **2d: string** : la couleur hexadécimale du logo en vue 2D. La valeur par défaut est `#FFFFFF`.
- **link: string, uri** : URI permettant de lier le composant à un autre diagramme ou à un site externe. Accepte les formats `blueprint://` ou `https://`.
- **locked: boolean** : détermine si la position du composant peut être modifiée via l’interface web. La valeur par défaut est `false`.

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /fr/cloudcraft/faq/scan-error-aws-china-region/