---
app_id: nerdvision
app_uuid: dace6217-8e5b-4b96-ae65-b0b58d44cc3e
assets:
  dashboards:
    NerdVision Overview: assets/dashboards/overview.json
  integration:
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: nerdvision.clients
      metadata_path: metadata.csv
      prefix: nerdvision.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: NerdVision
author:
  homepage: https://nerd.vision
  name: NerdVision
  sales_email: support@nerd.vision
  support_email: support@nerd.vision
  vendor_id: nerdvision
categories:
- marketplace
- containers
- log collection
- monitoring
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: nerdvision
integration_id: nerdvision
integration_title: NerdVision
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: nerdvision
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.nerdvision.clients
  product_id: clients
  short_description: Outil de debugging et de collecte de données.
  tag: hostname
  unit_label: client
  unit_price: 2
public_title: NerdVision
short_description: Outil de debugging en temps réel pour .NET, Java, Python et Node
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Marketplace
  - Category::Containers
  - Category::Log Collection
  - Category::Monitoring
  - Offering::Software License
  - Offering::Integration
  configuration: README.md#Setup
  description: Outil de debugging en temps réel pour .NET, Java, Python et Node
  media:
  - caption: Outil de debugging interactif dans NerdVision.
    image_url: images/debugger.png
    media_type: image
  - caption: Liste des erreurs capturées dans NerdVision.
    image_url: images/error_list.png
    media_type: image
  - caption: Dashboard NerdVision dans Datadog.
    image_url: images/screenshot_datadog.png
    media_type: image
  - caption: Détails d'un snapshot dans NerdVision.
    image_url: images/snapshot_details.png
    media_type: image
  - caption: Liste des snapshots dans NerdVision.
    image_url: images/snapshot_list.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: NerdVision
  uninstallation: README.md#Uninstallation
---



## Présentation

### Qu'est-ce que NerdVision ?

NerdVision est une plateforme de debugging en temps réel qui vous permet d'analyser en profondeur votre application à tout moment. NerdVision vous offre la possibilité d'installer des tracepoints dans votre application afin de recueillir des données sur son état, sans redémarrage ni modification du code.

Une fois configurée, cette intégration crée un dashboard et synchronise l'ensemble des événements et logs du groupe NerdVision avec votre organisation Datadog.

#### Watchers et conditions

Utilisez des conditions pour faire en sorte que votre tracepoint se déclenche uniquement dans les situations qui vous intéressent. Ajoutez des watchers pour enrichir le contexte et inclure des données clés sur le problème ou des données non couvertes par la capture de variables.

### Dashboard NerdVision pour Datadog

Le dashboard Datadog vous permet de déterminer à quels endroits dans votre code les tracepoints se déclenchent de manière à identifier les principales sources d'activité de debugging.

### Événements

Chaque tracepoint déclenché est envoyé à Datadog en tant qu'événement, avec les tags appropriés et un lien pour visualiser les données dans NerdVision. Les tracepoints vous permettent de récupérer la stack complète ainsi que les variables actives au moment où le tracepoint s'est déclenché.

### Logs

Grâce au logging dynamique, vous pouvez injecter de nouveaux messages de log à n'importe quel endroit dans votre code pour ajouter les données qui ont été manquées. Lorsqu'un message de log se déclenche, il est synchronisé avec Datadog dès son traitement par NerdVision.

### Métriques

NerdVision génère des métriques pour les clients en ligne et les déclencheurs de tracepoint.

### Checks de service

NerdVision n'inclut aucun check de service.

## Assistance

Pour obtenir de l'aide ou communiquer une demande, contactez NerdVision aux coordonnées suivantes :

E-mail : support@nerd.vision

La documentation est disponible [ici](https://docs.nerd.vision/).

---
Cette application est disponible sur le Marketplace et développée par un partenaire technologique de Datadog. <a href="https://app.datadoghq.com/marketplace/app/nerdvision" target="_blank">Cliquez ici</a> pour l'acheter.