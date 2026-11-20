---
title: Composant Security Group
---
## Présentation

Utilisez le composant Security Group pour représenter les groupes de sécurité de votre architecture Amazon Web Services.

{{< img src="cloudcraft/components-aws/security-group/component-security-group-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft montrant le composant AWS 'Security Group'." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez une couleur prédéfinie ou indiquez sa valeur hexadécimale pour le composant et son accent. Vous pouvez appliquer la même couleur aux vues 2D et 3D, ou choisir une couleur différente pour chaque vue.
- **Name** : attribuez un nom au groupe de sécurité.
- **Shape** : sélectionnez une forme pour le groupe de sécurité, dynamique ou rectangulaire.
- **Padding** : augmentez ou réduisez l'espace à l'intérieur du groupe de sécurité.
- **Inbound/Outbound** : affichez, supprimez ou ajoutez des règles entrantes et sortantes pour les composants à l'intérieur de ce groupe de sécurité.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON.

### Schéma

Voici un exemple d'objet JSON d'un composant Security Group :

```json
{
  "type": "sg",
  "id": "a699dbeb-2fe5-49a5-beea-b24695c247e4",
  "region": "us-east-1",
  "name": "cloudcraft-sg-example",
  "shape": "dynamic",
  "padding": 1.5,
  "nodes": [
    "e99bad32-82f6-49a7-b145-11963a3d7775"
  ],
  "inboundRules": [
    {
      "portRange": "80",
      "protocol": "tcp",
      "target": "bc883fec-e97c-4c27-b9a7-64e3d154452b",
      "targetType": "sg",
      "description": "HTTP Traffic",
      "hidden": false
    },
    {
      "portRange": "443",
      "protocol": "tcp",
      "target": "bc883fec-e97c-4c27-b9a7-64e3d154452b",
      "targetType": "sg",
      "description": "HTTPS Traffic",
      "hidden": false
    },
    {
      "portRange": "22",
      "protocol": "tcp",
      "target": "65e16268-d9ee-440a-9a4d-29b92520572e",
      "targetType": "sg",
      "description": "Bastion server",
      "hidden": false
    }
  ],
  "outboundRules": [
    {
      "portRange": "25",
      "protocol": "tcp",
      "target": "199.255.192.0/22",
      "targetType": "ip",
      "description": "AWS SES",
      "hidden": false
    }
  ],
  "color": {
    "isometric": "#4286c5",
    "2d": "#4286c5"
  },
  "link": "blueprint://33a8bf46-7326-4999-ba0a-789bcd94f0a2",
  "locked": true
}
```

- **type: sg** : le type de composant.
- **id : string** : un identifiant unique pour le composant au format `uuid`.
- **region: string** : la région AWS dans laquelle le groupe de sécurité est déployé. Toutes les régions globales sont prises en charge, sauf les régions `cn-`.
- **name: string**: le nom du groupe de sécurité.
- **shape: string** : forme du groupe de sécurité. Valeurs acceptées : `dynamic` ou `rectangular`.
- **padding: number** : la marge intérieure du groupe de sécurité. Par défaut : `1.5`.
- **nodes: array** : composants inclus dans le groupe de sécurité. Consultez [valeurs acceptées pour `nodes`](#valeurs-acceptees-pour-nodes) pour en savoir plus.
- **inboundRules: array** : les règles pour le trafic entrant des composants à l'intérieur de ce groupe de sécurité. Consultez la section [Valeurs acceptées pour `inboundRules` et `outboundRules`](#valeurs-acceptees-pour-inboundrules-et-outboundrules) pour plus d'informations.
- **outboundRules: array** : les règles pour le trafic sortant des composants à l'intérieur de ce groupe de sécurité. Consultez la section [Valeurs acceptées pour `inboundRules` et `outboundRules`](#valeurs-acceptees-pour-inboundrules-et-outboundrules) pour plus d'informations.
- **color: object** : la couleur de remplissage du composant.
  - **isometric: string** : la couleur de remplissage du composant dans la vue 3D. Doit être une couleur hexadécimale.
  - **2d: string** : la couleur de remplissage du composant dans la vue en 2D. Doit être une couleur hexadécimale.
- **link: uri** : liez le composant à un autre diagramme en utilisant le format `blueprint://ID` ou à un site externe avec le format `https://LINK`.
- **locked: boolean** : si `true`, les modifications apportées au composant via l'application sont désactivées jusqu'à ce qu'il soit déverrouillé.

### Valeurs acceptées pour `nodes`

La clé `nodes` accepte un tableau d’identifiants uniques représentant les composants à l’intérieur du groupe de sécurité.

Les composants AWS suivants peuvent être ajoutés à un groupe de sécurité :

```
asg, ec2, lambda, efs, fsx, elb, rds, docdb, elasticache, redshift, es
```

En plus des composants AWS, les éléments génériques suivants peuvent aussi être ajoutés à des groupes de sécurité :

```
block, isotext, icon, image, area
```

### Valeurs acceptées pour `inboundRules` et `outboundRules`

Les clés `inboundRules` et `outboundRules` acceptent un tableau contenant des règles représentées par des objets JSON.

```json
{
  "inboundRules": [
    {
      "portRange": "22",
      "protocol": "tcp",
      "target": "192.0.2.0/24",
      "targetType": "ip",
      "description": "RFC 5737",
      "hidden": false
    }
  ],
  "outboundRules": [
    {
      "portRange": "25",
      "protocol": "tcp",
      "target": "199.255.192.0/22",
      "targetType": "ip",
      "description": "AWS SES",
      "hidden": false
    }
  ]
}

```

- **portRange: number** : le numéro du port affecté par cette règle. Accepte un port unique ou une plage de ports, par exemple `42000-42222`.
- **protocol: string** : le protocole réseau affecté par cette règle.
- **target: string** : le CIDR ou l'`id` d'un groupe de sécurité qui est la source du trafic vers les composants.
- **targetType: string** : le type de source utilisé pour `target`. Les valeurs acceptées sont `ip` ou `sg`.
- **description: string** : une courte description de la règle entrante ou sortante.
- **hidden: boolean** : si `true`, la règle entrante ou sortante n'est pas affichée dans le diagramme. Consultez l'image du composant en haut de la page pour voir comment elle est affichée. La valeur par défaut est `false`.

[1]: https://developers.cloudcraft.co/