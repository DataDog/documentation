---
title: Composant VPN Gateway
---

## Présentation

Vous pouvez utiliser le composant **VPN Gateway** pour représenter et visualiser les connexions privées de votre environnement Azure.

{{< img src="cloudcraft/components-azure/vpn-gateway/component-vpn-gateway-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft montrant des composants Azure interconnectés." responsive="true" style="width:60%;">}}


## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez une couleur de remplissage pour le corps du composant et une couleur d'accent pour son symbole. Vous pouvez utiliser les mêmes couleurs pour les vues 2D et 3D ou des couleurs différentes. 
- **Gateway type** : sélectionnez le type de passerelle réseau virtuelle que vous souhaitez représenter.
- **SKU** : sélectionnez le SKU de la passerelle réseau virtuelle que vous souhaitez représenter.
- **S2S tunnels** : saisissez le nombre de tunnels de site à site de la passerelle réseau virtuelle. Cette option est uniquement disponible pour les passerelles VPN.
- **P2S tunnels** : saisissez le nombre de tunnels de point à site de la passerelle réseau virtuelle. Cette option est uniquement disponible pour les passerelles VPN.
- **Rotate item** : faites pivoter le composant de 90 degrés et modifiez son orientation.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON. Voici un exemple d'objet JSON d'un composant VPN Gateway :

### Schéma

```json
{
    "type": "azurevngw",
    "id": "817a218d-8556-4e8f-b32c-b13e454b9106",
    "region": "eastus",
    "mapPos": [6,9.25],
    "gatewayType": "Vpn",
    "tier": "Basic",
    "s2sTunnels": 0,
    "p2sTunnels": 0,
    "direction": "down",
    "color": {
        "isometric": "#CEE0F5",
        "2d": null
    },
    "accentColor": {
        "isometric": "#0078D4",
        "2d": null
    },
    "link": "https://azure.microsoft.com/products/vpn-gateway",
    "locked": true
}
```

- **type: string** : le type de composant. Doit être une chaîne ayant pour valeur `azurevngw` pour ce composant.
- **id: chaîne, uuid** : l'identifiant unique du composant. L’API utilise un UUID v4 en interne mais accepte toute chaîne unique.
- **resourceId: chaîne** : l'identifiant unique global du composant dans Azure.
- **region: chaîne** : la région Azure du composant. L'API prend en charge toutes les régions globales, sauf la Chine.
- **mapPos: tableau** : la position du composant dans le blueprint. L'API utilise une paire de coordonnées X et Y pour indiquer la position.
- **gatewayType: chaîne** : le type de passerelle réseau virtuelle que vous souhaitez représenter. Valeurs acceptées : `Vpn` et `ExpressRoute`. Valeur par défaut : `Vpn`.
- **tier: chaîne** : le niveau de la passerelle réseau virtuelle. [Consultez Microsoft Learn pour en savoir plus][2]. Valeur par défaut : `Basic` ou `Standard`, selon la valeur de `gatewayType`.
- **s2sTunnels: nombre** : le nombre de tunnels de site à site de la passerelle réseau virtuelle. Valeur par défaut : `0`.
- **p2sTunnels: nombre** : le nombre de tunnels de point à site de la passerelle réseau virtuelle. Valeur par défaut : `0`.
- **direction: chaîne** : l'orientation du composant. Valeurs acceptées : `right` et `down`. Valeur par défaut : `down`.
- **color: objet** : la couleur de remplissage du corps du composant.
  - **isometric: chaîne** : la couleur hexadécimale du corps du composant dans la vue 3D. Valeur par défaut : `#CEE0F5`.
  - **2d: chaîne** : la couleur hexadécimale du corps du composant dans la vue 2D. Valeur par défaut : `null`.
- **accentColor: objet** : la couleur d'accent du logo du composant.
  - **isometric: chaîne** : la couleur hexadécimale du logo du composant dans la vue 3D. Valeur par défaut : `#0078D4`.
  - **2d: chaîne** : la couleur hexadécimale du logo du composant dans la vue 2D. Valeur par défaut : `null`.
- **link: string, uri** : une URI permettant de lier le composant à un autre diagramme ou à un site externe. Accepte le format `blueprint://` ou le format `https://`.
- **locked : boolean** : Autorise ou non la modification de la position du composant par l'intermédiaire de l'interface web. La valeur par défaut est `false`.

[1]: https://developers.cloudcraft.co/
[2]: https://learn.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-about-vpn-gateway-settings#gwsku