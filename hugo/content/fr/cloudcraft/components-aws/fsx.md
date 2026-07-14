---
title: Composant FSx
---
## Présentation

Utilisez le composant FSx pour représenter les systèmes de fichiers FSx de votre architecture Amazon Web Services.

{{< img src="cloudcraft/components-aws/fsx/component-fsx-diagram.png" alt="Capture d'écran d'un diagramme isométrique Cloudcraft affichant le composant FSx AWS." responsive="true" style="width:60%;">}}

## Barre d'outils

Utilisez la barre d’outils pour configurer et personnaliser le composant. Les options suivantes sont disponibles :

- **Color** : sélectionnez une couleur prédéfinie ou indiquez sa valeur hexadécimale pour le composant et son accent. Vous pouvez appliquer la même couleur aux vues 2D et 3D, ou choisir une couleur différente pour chaque vue.
- **File system** : le système de fichiers utilisé pour FSx.
- **Storage (GiB)** : le volume de stockage provisionné pour le système de fichiers.
- **Storage type** : sélectionnez un type de stockage pour le système de fichiers. Cette option n'est pas disponible pour le système de fichiers Lustre.
- **Throughput (MiB/s)** : la capacité de débit agrégé. Cette option n'est pas disponible pour le système de fichiers Lustre.
- **Backup size (GiB)** : le volume de stockage provisionné pour la déduplication des données. Cette option n'est pas disponible pour le système de fichiers Lustre.
- **Deployment type** : le type de déploiement pour le système de fichiers, avec une seule ou plusieurs zones de disponibilité. Cette option n'est pas disponible pour le système de fichiers Lustre.

## API

Utilisez l'[API Cloudcraft][1] pour accéder de manière programmatique à vos diagrammes d'architecture et les rendre sous forme d'objets JSON.

### Schéma

Voici un exemple d'objet JSON d'un composant FSx :

```json
{
  "type": "fsx",
  "id": "df89904a-a53e-4c2d-b63c-757c7ad6b4aa",
  "region": "us-east-1",
  "mapPos": [0,10],
  "fileSystemType": "windows",
  "storageCapacity": 32,
  "storageType": "ssd",
  "throughputCapacity": 8,
  "backupCapacity": 600,
  "multiAZ": false,
  "color": {
    "isometric": "#3f8624",
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

- **type : fsx** : le type de composant.
- **id: chaîne** : un identifiant unique pour le composant au format `uuid`.
- **region: chaîne** : la région AWS dans laquelle le composant est déployé. Toutes les régions globales sont prises en charge, à l'exception des régions `cn-`.
- **mapPos: [nombre, nombre]** : la position du composant dans le blueprint, exprimée par une paire de coordonnées x et y.
- **fileSystemType: chaîne** : le système de fichiers utilisé pour le composant FSx. Valeurs acceptées : `windows` et `lustre`.
- **storageCapacity: nombre** : le volume de données provisionné pour le système de fichiers, en gibioctets.
- **storageType: chaîne** : sélectionnez un type de stockage pour le système de fichiers. Valeurs acceptées : `ssd` et `hdd`. Uniquement applicable si `fileSystemType` est défini sur `windows`.
- **throughputCapacity: nombre** : la capacité de débit agrégé, en mébioctets par seconde. Consultez la rubrique [Valeurs acceptées pour `throughputCapacity`](#valeur-acceptees-pour-throughputcapacity) pour en savoir plus.
- **backupCapacity: nombre** : le volume de stockage provisionné pour la déduplication des données, en gibioctets. Uniquement applicable si `fileSystemType` est défini sur `windows`.
- **multiAZ: booléen** : si `true`, le système de fichiers FSx est déployé dans plusieurs zones de disponibilité AWS. Uniquement applicable si `fileSystemType` est défini sur `windows`.
- **color: objet** : la couleur de remplissage du corps du composant.
  - **isometric: chaîne** : la couleur de remplissage du composant dans la vue 3D. Doit être une couleur hexadécimale.
  - **2d: chaîne** : la couleur de remplissage du composant dans la vue 2D. Doit être une couleur hexadécimale.
- **accentColor: objet** : la couleur d'accent utilisée pour afficher le logo du composant sur le bloc.
  - **isometric: chaîne** : la couleur d'accent du composant dans la vue 3D. Doit être une couleur hexadécimale.
  - **2d: chaîne** : la couleur d'accent du composant dans la vue 2D. Doit être une couleur hexadécimale.
- **link: uri** : liez le composant à un autre diagramme en utilisant le format `blueprint://ID` ou à un site externe avec le format `https://LINK`.
- **locked: booléen** : si `true`, les modifications apportées au composant via l'application sont désactivées jusqu'à ce qu'il soit déverrouillé.

Le composant FSx peut être ajouté aux [VPC][2], aux [groupes de sécurité][3] et aux [sous-réseaux][4].

## Valeurs acceptées pour `throughputCapacity`

La clé `throughputCapacity` accepte les valeurs suivantes :

```
8, 16, 32, 64, 128, 256, 512, 1024, 2048
```

La clé `throughputCapacity` est seulement applicable si `fileSystemType` est défini sur `windows`.

[1]: https://developers.cloudcraft.co/
[2]: /fr/cloudcraft/components-aws/vpc/
[3]: /fr/cloudcraft/components-aws/security-group/
[4]: /fr/cloudcraft/components-aws/subnet/