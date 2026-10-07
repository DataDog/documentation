---
title: Composant Virtual machine
---

## Présentation

Vous pouvez utiliser le composant Virtual Machine pour représenter et visualiser les machines virtuelles de votre environnement Azure.

{{< img src="cloudcraft/components-azure/virtual-machine/component-virtual-machine-diagram.png" alt="Capture d'écran d'un diagramme Cloudcraft isométrique montrant des composants de machines virtuelles Azure interconnectés." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionner les couleurs d’accent et de remplissage du corps du composant en vue 3D.
- **Platform** : sélectionnez la plateforme de votre machine virtuelle. Les options disponibles sont Windows et Linux.
- **Tier** : sélectionnez le niveau de service de votre machine virtuelle.
- **Series** : sélectionnez la série de votre machine virtuelle. Cette option détermine les types d'instances disponibles.
- **Instance** : sélectionnez un type d'instance pour votre machine virtuelle. Modifier le type d'instance met également à jour les détails matériels affichés dans la barre d'outils pour refléter les caractéristiques utilisées par l'hyperviseur.

## API

Utilisez [l'API Cloudcraft][1] pour accéder et afficher vos diagrammes d'architecture sous forme d'objets JSON. Voici un exemple d'objet JSON représentant un composant Virtual machine :

### Schéma

```json
{
    "type": "azurevm",
    "id": "c46c4a24-e3b5-4830-9217-0276e92ac927",
    "resourceId": "/subscriptions/451da5fc-e712-4a34-b236-3c6992a1c2c0/resourceGroups/VMGROUP1/providers/Microsoft.Compute/virtualMachines/hello",
    "region": "eastus",
    "mapPos": [4.5, 7.5],
    "platform": "linux",
    "tier": "Standard",
    "instance": "B1ms",
    "reservationTerm": "OnDemand",
    "color": {
        "isometric": "#ececed",
        "2d": null
    },
    "accentColor": {
        "isometric": "#4286c5",
        "2d": null
    },
    "link": "https://azure.microsoft.com/products/virtual-machines/",
    "locked": true
}

```

- **type: string** : le type de composant. Doit être une chaîne ayant pour valeur `azurevm` pour ce composant.
- **id: string, uuid** : l’identifiant unique du composant. L’API utilise un UUID v4 en interne mais accepte toute chaîne unique.
- **resourceId: string** : l’identifiant globalement unique du composant dans Azure.
- **region: string** : la région Azure du composant. L’API prend en charge toutes les régions globales, sauf la Chine.
- **mapPos: array** : la position du composant dans le blueprint. L’API utilise une paire de coordonnées X et Y pour indiquer la position.
- **platform: string* : plateforme de la machine virtuelle. Accepte l'une des deux valeurs `windows` ou `linux`. Valeur par défaut : `linux`.
- **tier: string** : niveau de service de la machine virtuelle. Accepte l'une des trois valeurs `Low Priority`, `Standard` ou `Basic`. Valeur par défaut : `Standard`.
- **instance: string** : type d'instance de la machine virtuelle. [Consultez Microsoft Learn pour plus d'informations.][2]. Valeur par défaut : `A1 v2`.
- **color: object** : couleur de remplissage du corps du composant.
  - **isometric: string** : couleur hexadécimale pour le corps du composant en vue 3D. Valeur par défaut : `#ececed`.
  - **2d: string** : couleur hexadécimale du corps en vue 2D. Par défaut `null`.
- **accentColor: object** : couleur d'accentuation du logo du composant.
  - **isometric: string** : couleur hexadécimale du logo du composant en vue 3D. Valeur par défaut : `#4286c5`.
  - **2d: string** : couleur hexadécimale du logo en vue 2D. Par défaut `null`.
- **link: string, uri** : URI permettant de lier le composant à un autre diagramme ou à une page externe. Accepte le format `blueprint://` ou `https://`.
- **locked: boolean** : détermine si la position du composant peut être modifiée via l’interface web. Valeur par défaut : `false`.

[1]: https://developers.cloudcraft.co/
[2]: https://learn.microsoft.com/en-us/azure/virtual-machines/sizes