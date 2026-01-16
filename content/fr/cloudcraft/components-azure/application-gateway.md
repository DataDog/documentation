---
title: Composant Application Gateway
---

## Présentation

Vous pouvez utiliser le composant Application Gateway pour représenter et visualiser les passerelles d'applications de votre environnement Azure.

{{< img src="cloudcraft/components-azure/application-gateway/component-application-gateway-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft montrant des composants d'application web interconnectés à un composant Azure Application Gateway." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez les couleurs d’accent et de remplissage du corps du composant en vue 3D.
- **Tier** : sélectionnez le niveau de service pour votre passerelle d'application.
- **Size** : sélectionnez la taille de votre passerelle d'application. Cette option est uniquement disponible pour les niveaux Standard et WAF.
- **Instances** : saisissez le nombre d'instances pour les scénarios de haute disponibilité. Cette option est uniquement disponible pour les niveaux Standard et WAF.
- **Compute units** : saisissez la mesure de la capacité de calcul consommée par votre passerelle d'application. Cette option est uniquement disponible pour les niveaux Standard V2 et WAF V2.
- **Persistent connections** : saisissez le nombre de connexions persistantes vers votre passerelle d'application. Cette option est uniquement disponible pour les niveaux Standard V2 et WAF V2.
- **Throughput (Mbps)** : saisissez le débit de votre passerelle d'application en mégabits par seconde. Cette option est uniquement disponible pour les niveaux Standard V2 et WAF V2.
- **Data processed (GB)** : saisissez le volume total de données traitées par mois par votre passerelle d'application en gigaoctets.
- **Outbound data processed (GB)** : saisissez le volume total de données sortantes traitées par mois par votre passerelle d'application en gigaoctets.

## API

Utilisez [l’API Cloudcraft][1] pour accéder à vos diagrammes d’architecture et les générer sous forme d’objets JSON. Voici un exemple d’objet JSON pour un composant Application Gateway :

### Schéma

```json
{
    "type": "azureappgw",
    "id": "900c9832-31d6-460a-9065-762fe63ec83c",
    "resourceId": "/subscriptions/c74c5de5-0170-405b-954a-e6491cf0c838/resourceGroups/CLOUDCRAFT/providers/Microsoft.Network/applicationGateways/DocTeamGateway",
    "region": "eastus",
    "mapPos": [1, 8],
    "tier": "Standard",
    "size": "Small",
    "instances": 2,
    "computeUnits": 0,
    "persistentConnections": 0,
    "throughput": 0,
    "dataProcessed": 0,
    "outboundDataTransfer": 0,
    "color": {
        "isometric": "#CEE0F5",
        "2d": null
    },
    "accentColor": {
        "isometric": "#0078D4",
        "2d": null
    },
    "link": "https://azure.microsoft.com/products/application-gateway",
    "locked": true
}
```

- **type: string** : le type de composant. Doit être une chaîne ayant pour valeur `azureappgw` pour ce composant.
- **id: string, uuid** : l'identifiant unique du composant. L’API utilise un UUID v4 en interne mais accepte toute chaîne unique.
- **resourceId : string** : l'identifiant unique global du composant dans Azure.
- **region: string** : la région Azure du composant. L'API prend en charge toutes les régions globales, sauf la Chine.
- **mapPos: array** : la position du composant dans le blueprint. L'API utilise une paire de coordonnées X et Y pour indiquer la position.
- **tier: string** : le niveau de service pour la passerelle d'application. Accepte l'une des quatre valeurs `Standard`, `Standard V2`, `WAF` ou `WAF V2`. La valeur par défaut est `Standard V2`.
- **size: string** : la taille de la passerelle d'application. Accepte l'une des trois valeurs `Small`, `Medium` ou `Large`. La valeur par défaut est `Medium`.
- **instances: number** : le nombre d'instances de passerelles d'application. La valeur par défaut est `2`.
- **computeUnits: number** : la mesure de la capacité de calcul consommée par la passerelle d'application. La valeur par défaut est `0`.
- **persistentConnections: number** : le nombre de connexions persistantes vers votre passerelle d'application. La valeur par défaut est `0`.
- **throughput: number** : le débit de la passerelle d'application en mégabits par seconde. La valeur par défaut est `0`.
- **dataProcessed: number** : le volume total de données mensuelles traitées par la passerelle d'application en gigaoctets. La valeur par défaut est `0`.
- **outboundDataTransfer: number** : le volume total de données sortantes mensuelles traitées par la passerelle d'application en gigaoctets. La valeur par défaut est `0`.
- **color: object** : la couleur de remplissage du corps du composant.
  - **isometric: string** : la couleur hexadécimale pour le corps du composant en vue 3D. La valeur par défaut est `#CEE0F5`.
  - **2d: string** : la couleur hexadécimale du corps en vue 2D. La valeur par défaut est `null`.
- **accentColor: object** : la couleur d'accentuation du logo du composant.
  - **isometric: string** : la couleur hexadécimale du logo en vue 3D. La valeur par défaut est `#0078D4`.
  - **2d: string** : la couleur hexadécimale du logo en vue 2D. La valeur par défaut est `null`.
- **link: string, uri** : URI permettant de lier le composant à un autre diagramme ou à une page externe. Accepte le format `blueprint://` ou `https://`.
- **locked: boolean** : détermine si la position du composant peut être modifiée via l’interface web. La valeur par défaut est `false`.

[1]: https://developers.cloudcraft.co/