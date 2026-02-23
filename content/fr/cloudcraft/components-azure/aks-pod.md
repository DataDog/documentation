---
title: Composant AKS Pod
---

## Présentation

Vous pouvez utiliser le composant AKS Pod pour représenter et visualiser les conteneurs d'application de votre environnement Azure avec Cloudcraft.

{{< img src="cloudcraft/components-azure/aks-pod/component-aks-pod-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft montrant des composants Azure interconnectés." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez une couleur de remplissage pour le corps du composant et une couleur d'accent pour son symbole. Vous pouvez utiliser les mêmes couleurs pour les vues 2D et 3D ou des couleurs différentes. 

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON. Voici un exemple d'objet JSON d'un composant AKS Pod :

### Schéma

```json
{
    "type": "azureakspod",
    "id": "28efba36-1f3f-48ef-a1df-0d5473bcbf6e",
    "resourceId":"/subscriptions/fd182fc4-48dc-4825-88da-1c1c59c7eab5/resourceGroups/DOC-RESOURCE-GROUP/providers/Microsoft.ContainerService/managedClusters/doc-cluster/pods/default/doc-agent-fdf8f8fb7",
    "region": "eastus",
    "mapPos": [4,5.25],
    "color": {
        "isometric": "#075693",
        "2d": "#075693"
    },
    "accentColor": {
        "isometric": "#2EC8EA",
        "2d": "#2EC8EA"
    },
    "link": "https://azure.microsoft.com/products/kubernetes-service",
    "locked": true
}
```

- **type: chaîne** : le type de composant. Doit être une chaîne ayant pour valeur `azureakspod` pour ce composant.
- **id: chaîne, uuid** : l'identifiant unique du composant. L’API utilise un UUID v4 en interne mais accepte toute chaîne unique.
- **resourceId: chaîne** : l'identifiant unique global du composant dans Azure.
- **region: chaîne** : la région Azure du composant. L'API prend en charge toutes les régions globales, sauf la Chine.
- **mapPos: tableau** : la position du composant dans le blueprint. L'API utilise une paire de coordonnées X et Y pour indiquer la position.
- **color: objet** : la couleur de remplissage du corps du composant.
  - **isometric: chaîne** : la couleur hexadécimale du corps du composant dans la vue 3D. Valeur par défaut : `#075693`.
  - **2d: chaîne** : la couleur hexadécimale du corps du composant dans la vue 2D. Valeur par défaut : `#075693`.
- **accentColor: objet** : la couleur d'accent du logo du composant.
  - **isometric: chaîne** : la couleur hexadécimale du logo du composant dans la vue 3D. Valeur par défaut : `#2EC8EA`.
  - **2d: chaîne** : la couleur hexadécimale du logo du composant dans la vue 2D. Valeur par défaut : `#2EC8EA`.
- **link: string, uri** : une URI permettant de lier le composant à un autre diagramme ou à un site externe. Accepte le format `blueprint://` ou le format `https://`.
- **locked: booléen** : détermine si la position du composant peut être modifiée via l’interface web. Valeur par défaut : `false`.

[1]: https://developers.cloudcraft.co/