---
title: Network ACL
---

## Présentation

Utilisez le composant Network ACL pour visualiser les listes de contrôle d'accès réseau (ACL) dans votre architecture Amazon Web Services.

{{< img src="cloudcraft/components-aws/network-acl/component-network-acl-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft montrant le composant AWS 'Network ACL'." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Visibility** : activez ou désactivez la visibilité du composant dans le diagramme.
- **Color**: sélectionnez une couleur de remplissage pour le corps du composant et une couleur d'accent pour son symbole. Vous pouvez utiliser les mêmes couleurs pour les vues 2D et 3D ou des couleurs différentes. 
- **Name** : attribuez un nom à l'ACL.
- **Shape** : choisissez la forme du composant.
- **Padding** : ajustez l'espace intérieur du composant.
- **Rules** : affichez les règles entrantes et sortantes de l'ACL.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON.

### Schéma

Voici un exemple d'objet JSON d'un composant Network ACL :

```json
{
    "type": "networkacl",
    "id": "acl-0mqj0d4dxpmf9iru3",
    "arn": "arn:aws:ec2:us-east-1:762056483071:network-acl/acl-0mqj0d4dxpmf9iru3",
    "region": "us-east-1",
    "visible": true,
    "name": "acl-0mqj0d4dxpmf9iru3",
    "shape": "rectangular",
    "padding": 2,
    "nodes": [
        "1ae68ef4-f3cb-4e07-8660-2a4a4bc30e36",
        "subnet-0752f314ffbf0126e"
    ],
    "inboundRules": [
        {
            "ruleNumber": 100,
            "protocol": "-1",
            "portRange": "0",
            "target": "0.0.0.0/0",
            "targetType": "ip",
            "access": "allow"
        },
        {
            "ruleNumber": 32767,
            "protocol": "-1",
            "portRange": "0",
            "target": "0.0.0.0/0",
            "targetType": "ip",
            "access": "deny"
        }
    ],
    "outboundRules": [
        {
            "ruleNumber": 100,
            "protocol": "-1",
            "portRange": "0",
            "target": "0.0.0.0/0",
            "targetType": "ip",
            "access": "allow"
        },
        {
            "ruleNumber": 32767,
            "protocol": "-1",
            "portRange": "0",
            "target": "0.0.0.0/0",
            "targetType": "ip",
            "access": "deny"
        }
    ],
    "color": {
        "isometric": "#5698ff",
        "2d": "#5698ff"
    },
    "link": "https://aws.amazon.com/",
    "locked": true
}
```

- **type: string** : le type de composant. 
- **id: string** : identifiant unique du composant, constitué du préfixe `acl-` suivi d'une chaîne alphanumérique aléatoire de 17 caractères.
- **arn: string** : identifiant global unique (ARN) du composant dans AWS, voir [Amazon Resource Names][2]. 
- **region: string** : région AWS dans laquelle se trouve le composant. Toutes les régions globales sont prises en charge, à l'exception des régions `cn-`.
- **visible: boolean** : si `false`, le composant apparaît en semi-transparence dans le diagramme. La valeur par défaut est `true`. 
- **name: string** : nom de l'ACL.
- **shape: string** : forme du composant. Accepte `dynamic` ou `rectangular`. Valeur par défaut : `rectangular`.
- **padding: number** : valeur d'espacement interne du composant. Valeur par défaut : `2`. 
- **nodes: array** : tableau d'identifiants de composants inclus dans l'ACL.
- **inboundRules: array** : règles pour le trafic entrant à destination des composants dans l'ACL.
  - **ruleNumber: number** : numéro de la règle pour l'ACL. 
  - **protocol: string** : protocole concerné. Accepte `-1` (signifiant "Tous") ou un protocole spécifique.
  - **portRange: string** : port ou plage de ports écoutés.
  - **target: string** : source du trafic (plage CIDR).
  - **targetType: string** : type de cible. Accepte `ip` ou `ipv6`.
  - **access: string** : type d'accès. Accepte `allow` ou `deny`.
- **outboundRules: array** : règles pour le trafic sortant émis par les composants dans l'ACL.
  - **ruleNumber: number** : numéro de la règle pour l'ACL.
  - **protocol: string** : protocole concerné. Accepte `-1` (signifiant "Tous") ou un protocole spécifique.
  - **portRange: string** : port ou plage de ports écoutés.
  - **target: string** : destination du trafic (plage CIDR). 
  - **targetType: string** : type de cible. Accepte `ip` ou `ipv6`.
  - **access: string** : type d'accès. Accepte `allow` ou `deny`.
- **color: object** : la couleur de remplissage du corps du composant.
  - **isometric: string** : couleur de remplissage pour la vue 3D. Doit être un code hexadécimal. Valeur par défaut : `#ECECED`.
  - **2d: string** : couleur de remplissage pour la vue 2D. Doit être un code hexadécimal. Valeur par défaut : `#CC2264`. 
- **link: uri** : liez le composant à un autre diagramme en utilisant le format `blueprint://ID` ou à un site externe avec le format `https://LINK`.
- **locked: boolean** : si `true`, les modifications apportées au composant via l'application sont désactivées jusqu'à ce qu'il soit déverrouillé.

[1]: /fr/cloudcraft/api/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html