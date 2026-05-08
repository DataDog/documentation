---
title: Composant EFS
---
## Présentation

Utilisez le composant de bloc EFS pour représenter les systèmes de fichiers élastiques de votre architecture Amazon Web Services.

{{< img src="cloudcraft/components-aws/efs/component-efs-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft montrant le composant AWS 'EFS'." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez une couleur prédéfinie ou indiquez sa valeur hexadécimale pour le composant et son accent. Vous pouvez appliquer la même couleur aux vues 2D et 3D, ou choisir une couleur différente pour chaque vue.
- **Storage** : la classe de stockage utilisée pour la charge de travail du système de fichiers.
- **Storage (GiB)** : quantité de données stockées par mois.
- **Access Requests (GiB)** : quantité de données demandées par mois. Disponible uniquement pour les classes de stockage Infrequent Access.
- **Throughput mode** : sélectionner un mode de débit pour le système de fichiers.
- **Throughput (MiB/s)** : quantité de débit supplémentaire fournie. Disponible uniquement pour le mode de débit provisionné.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON. 

### Schéma

Voici un exemple d'objet JSON d'un composant EFS :

```json
{
  "type": "efs",
  "id": "c7031016-107f-4bc7-a18a-b86321a135b7",
  "region": "us-east-1",
  "availabilityZone": "us-east-1a",
  "mapPos": [1,2],
  "usageGb": 10,
  "readWriteGb": 0,
  "infrequentAccess": false,
  "throughputMode": "bursting",
  "throughput": 0,
  "color": {
    "isometric": "#e05243",
    "2d": "#3f8624"
  },
  "accentColor": {
    "isometric": "#ffffff",
    "2d": "#ffffff"
  },
  "link": "blueprint://33a8bf46-7326-4999-ba0a-789bcd94f0a2",
  "locked": true
}
```

- **type: efs** : le type de composant.
- **id: string** : un identifiant unique pour le composant au format `uuid`.
- **region: string** : la région AWS dans laquelle le composant EFS est déployé. Toutes les régions globales sont prises en charge, à l'exception des régions `cn-`.
- **availabilityZone: string** : la zone de disponibilité AWS dans laquelle le système de fichiers élastique est déployé. Applicable uniquement pour le stockage dans une seule zone.
- **mapPos: [nombre, nombre]** : la position du composant dans le blueprint, exprimée par une paire de coordonnées x et y.
- **usageGb: number** : la quantité de données stockées dans EFS par mois, en gibioctets.
- **readWriteGb: number** : la quantité de données demandées par mois. Applicable uniquement si `infrequentAccess` est défini sur `true`.
- **infrequentAccess: boolean** : si `true`, le système de fichiers élastique utilise la classe de stockage Infrequent Access. Valeur par défaut : `false`.
- **throughputMode: string** : sélectionner un mode de débit pour le système de fichiers élastique. Les valeurs acceptées sont `bursting` ou `provisioned`.
- **throughput: number** : la quantité de débit supplémentaire en mébioctets par seconde par mois provisionnée pour le système de fichiers, en fonction de sa taille. Applicable uniquement si `throughputMode` est défini sur `provisioned`.
- **color: object** : la couleur de remplissage du corps du composant.
  - **isometric: string** : couleur de remplissage du composant dans la vue 3D. Doit être une couleur hexadécimale.
  - **2d: string** : la couleur de remplissage du composant dans la vue en 2D. Doit être une couleur hexadécimale.
- **accentColor: object** : couleur d'accent utilisée pour afficher le logo du composant sur le bloc.
  - **isometric: string** : la couleur d'accent du composant dans la vue en 3D. Doit être une couleur hexadécimale.
  - **2d: string** : la couleur d'accent du composant dans la vue en 2D. Doit être une couleur hexadécimale.
- **link: uri** : liez le composant à un autre diagramme en utilisant le format `blueprint://ID` ou à un site externe avec le format `https://LINK`.
- **locked: boolean** : si `true`, les modifications apportées au composant via l'application sont désactivées jusqu'à ce qu'il soit déverrouillé.

Le composant EFS peut être ajouté aux [VPC][2], [groupes de sécurité][3] et [sous-réseaux][4].

[1]: https://developers.cloudcraft.co/
[2]: /fr/cloudcraft/components-aws/vpc/
[3]: /fr/cloudcraft/components-aws/security-group/
[4]: /fr/cloudcraft/components-aws/subnet/