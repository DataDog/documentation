---
title: Composant Direct Connect Connection
---
## Présentation

Utilisez le composant Direct Connect Connection pour visualiser les connexions entre votre réseau interne et un emplacement AWS Direct Connect.

{{< img src="cloudcraft/components-aws/direct-connect-connection/component-direct-connect-connection-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft montrant des composants AWS interconnectés." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionner une couleur de remplissage pour le corps du composant et une couleur d'accent pour son symbole. Vous pouvez utiliser les mêmes couleurs dans les vues 2D et 3D ou des couleurs différentes pour chacune.
- **Location** : sélectionner l'emplacement Direct Connect.
- **Number of Ports** : saisir le nombre de ports utilisés par Direct Connect. Disponible uniquement pour les connexions dédiées.
- **Type** : sélectionner le type de connexion.
- **Capacity (bps)** : sélectionner la capacité de connexion en bits par seconde.
- **Transfer from** : sélectionnez la région AWS à partir de laquelle transférer.
- **Data out (GB)** : saisissez le volume total de données sortantes en gigaoctets.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON.

### Schéma

Voici un exemple d'objet JSON d'un composant Direct Connect Connection :

```json
{
    "type": "dxconnection",
    "id": "cff376f0-b1e3-459b-af10-a7133ad10232",
    "region": "us-east-1",
    "mapPos": [36,21],
    "site": "165HS",
    "numberPorts": 1,
    "connectionType": "Dedicated",
    "capacity": "1G",
    "transferRegion1": "us-east-1",
    "transferDataGb1": 0,
    "color": {
        "isometric": "#ECECED",
        "2d": "#693CC5"
    },
    "accentColor": {
        "isometric": "#4286C5",
        "2d": "#FFFFFF"
    },
    "link": "https://aws.amazon.com/directconnect/",
    "locked": true
}
```

- **type: string** : le type de composant. Doit être une chaîne de valeur `dxconnection` pour ce composant.
- **id: string, uuid** : l'identifiant unique du composant. L’API utilise un UUID v4 en interne mais accepte toute chaîne unique.
- **arn: string** : identifiant global unique (ARN) du composant dans AWS, voir [Amazon Resource Names][2]. 
- **region: string** : la région AWS du composant. L'API prend en charge toutes les régions globales, [à l'exception d'AWS China][3].
- **mapPos: array** : la position du composant dans le blueprint, exprimée par une paire de coordonnées x et y.
- **site: string** : l'emplacement Direct Connect. [Consultez la documentation AWS pour plus d'informations][4]. Valeur par défaut : `165HS`.
- **numberPorts: number** : le nombre de ports utilisés par Direct Connect. Valeur par défaut : `1`.
- **connectionType: string** : le type de connexion Direct Connect. Accepte l'une des valeurs suivantes : `Dedicated` ou `Hosted`. Valeur par défaut : `Dedicated`.
- **capacity: string** : la capacité de connexion en bits par seconde. Accepte l'une des valeurs suivantes : `1G`, `10G` ou `100G`. Valeur par défaut : `1G`.
- **transferRegion1: string** : la région AWS à partir de laquelle transférer. Accepte [toutes les régions AWS prises en charge par Cloudcraft][3]. Valeur par défaut : `us-east-1`.
- **transferDataGb1: number** : le volume total de données sortantes en gigaoctets. Valeur par défaut : `0`.
- **color: object** : la couleur de remplissage du corps du composant.
  - **isometric: string** : couleur hexadécimale du corps du composant en vue 3D. Par défaut `#ECECED`.
  - **2d: string** : une couleur hexadécimale pour le corps du composant dans la vue 2D. Valeur par défaut : `#693CC5`.
- **accentColor: object** : la couleur d'accentuation du logo du composant.
  - **isometric: string** : couleur hexadécimale du logo en vue 3D. Par défaut `#4286C5`.
  - **2d: string** : la couleur hexadécimale du logo en vue 2D. La valeur par défaut est `#FFFFFF`.
- **link: string, uri** : une URI permettant de lier le composant à un autre diagramme ou à un site externe. Accepte les formats `blueprint://` ou `https://`.
- **locked: boolean** : Autorise ou non la modification de la position du composant par l'intermédiaire de l'interface web. La valeur par défaut est `false`.

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /fr/cloudcraft/faq/scan-error-aws-china-region/
[4]: https://aws.amazon.com/directconnect/locations/