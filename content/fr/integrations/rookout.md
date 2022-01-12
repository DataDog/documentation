---
"app_id": "rookout"
"app_uuid": "a82a4f89-0690-48cf-bad0-9603fb652f44"
"assets":
  "dashboards":
    "rookout_overview": assets/dashboards/rookout_overview.json
  "integration":
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": ""
      "metadata_path": metadata.csv
      "prefix": rookout.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_name": Rookout pour Datadog
"author":
  "homepage": "https://rookout.com"
  "name": Rookout
  "support_email": support@rookout.com
"categories": []
"classifier_tags":
- "Supported OS::Linux"
- "Supported OS::Mac OS"
- "Supported OS::Windows"
- "Offering::UI Extension"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/rookout/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "rookout"
"integration_id": "rookout"
"integration_title": "Debugging en temps réel Rookout"
"integration_version": ""
"is_public": true
"kind": "integration"
"manifest_version": "2.0.0"
"name": "rookout"
"oauth": {}
"public_title": "Debugging en temps réel Rookout"
"short_description": "Utilisez Rookout pour recueillir des métriques depuis votre code exécuté en production"
"supported_os":
- linux
- mac os
- windows
"tile":
  "configuration": "README.md#Setup"
  "description": Utilisez Rookout pour recueillir des métriques depuis votre code exécuté en production
  "media":
  - "caption": Démonstration de l'intégration Datadog/Rookout
    "image_url": images/video_thumbnail.png
    "media_type": video
    "vimeo_id": !!int "642104223"
  - "caption": Outil de debugging Rookout
    "image_url": images/app1.png
    "media_type": image
  - "caption": Configuration d'une session de debugging Rookout
    "image_url": images/app2.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Debugging en temps réel Rookout
---



## Présentation

### Description

[Rookout][1] est un outil innovant qui permet d'effectuer des opérations de debugging en natif dans le cloud et de recueillir des données en temps réel. Les points d'arrêt « non interruptifs » (ou non-breaking endpoints) de Rookout vous offre la possibilité de recueillir n'importe quel type de données à la volée, sans code supplémentaire ni redéploiement ou redémarrage.

Rookout a été entièrement pensé pour les environnements de production et le debugging d'architectures modernes, notamment les applications basées sur Kubernetes, sur des microservices, sur le sans serveur ou sur le maillage de services.

L'intégration Rookout vous permet de recueillir des métriques à partir de votre code exécuté en production ou dans n'importe quel autre environnement, sans aucun arrêt ni redéploiement nécessaire.

### Utilisation

L'intégration Rookout comporte deux éléments : une option de menu contextuel pour vos widgets de dashboard qui vous permet de recueillir des points de métrique à partir de votre code, et un widget personnalisé qui affiche l'ensemble des points de métrique que vous avez définis dans Rookout.

**Option de menu contextuel**

Lorsque vous cliquez sur un widget de série temporelle qui représente un ou plusieurs serveurs ou services, une nouvelle option apparaît dans le menu contextuel.

Lorsque vous cliquez sur Set metric points, l'application Rookout s'ouvre et les instances appropriées sont automatiquement sélectionnées.

**Widget de dashboard personnalisé**

Ajoutez le widget Rookout à votre dashboard pour visualiser les points de métrique définis.

## Configuration

### Procédure à suivre

Pour ajouter l'option de menu contextuel Rookout à un widget de série temporelle dans votre dashboard, vous devez ajouter un filtre d'étiquette Rookout dans son titre.

Par exemple, si une série temporelle affiche une métrique dans un service intitulé "cartservice", faites en sorte que l'option de menu contextuel Rookout lance automatiquement une session Rookout à l'aide du filtre d'étiquette : "k8s_deployment:cartservice".

Pour ce faire, ajoutez "\[k8s_deployment:cartservice\]" dans le titre du widget de série temporelle.

## Données collectées

### Métriques

Rookout n'inclut aucune métrique.

### Checks de service

Rookout n'inclut aucun check de service.

### Événements

Rookout n'inclut aucun événement.

## Assistance

N'hésitez pas à nous contacter à l'adresse [support@rookout.com][2]

[1]: https://rookout.com
[2]: mailto:support@rookout.com

