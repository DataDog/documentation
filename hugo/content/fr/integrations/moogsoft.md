---
algolia:
  subcategory: Intégrations du Marketplace
app_id: moogsoft
app_uuid: db3d32c6-1127-4bd5-b270-01aa573616b7
assets:
  dashboards:
    Moogsoft Overview: assets/dashboards/moogsoft_overview.json
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: moogsoft.incident.count
      metadata_path: metadata.csv
      prefix: moogsoft.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Moogsoft
author:
  homepage: https://moogsoft.com
  name: Moogsoft
  sales_email: subscriptions@moogsoft.com
  support_email: support@moogsoft.com
  vendor_id: moogsoft
categories:
- automation
- incidents
- marketplace
- notification
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: moogsoft
integration_id: moogsoft
integration_title: Moogsoft
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: moogsoft
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.moogsoft
  product_id: cloud
  short_description: Différentes niveaux de tarification en fonction du volume d'événements
    et de métriques
  tag: core
  unit_label: Événement Moogsoft ou 500 métriques Moogsoft
  unit_price: 0.05
public_title: Moogsoft
short_description: Plateforme d'observabilité avancée en libre service basée sur l'IA
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Category::Incidents
  - Category::Marketplace
  - Category::Notification
  - Offering::Integration
  - Offering::Software License
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Plateforme d'observabilité avancée en libre service basée sur l'IA
  media:
  - caption: Corrélation Moogsoft
    image_url: images/moogsoft.correlation.png
    media_type: image
  - caption: Dashboard Moogsoft
    image_url: images/moogsoft.dashboard.png
    media_type: image
  - caption: Corrélation d'incidents Moogsoft
    image_url: images/moogsoft.main.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Moogsoft
  uninstallation: README.md#Uninstallation
---



## Présentation

Intégrez facilement Moogsoft à Datadog pour profiter de la puissance d'une visibilité et d'une surveillance reposant sur l'IA. Que vous utilisiez des applications entièrement numériques, des applications héritées ou une combinaison des deux, cette solution réduit les alertes inutiles et améliore l'efficacité opérationnelle entre les équipes et les opérations IT.

Moogsoft est une plateforme d'observabilité avancée en libre service basée sur l'IA qui permet aux ingénieurs logiciel, aux développeurs et aux responsables des infrastructures de tout voir instantanément, de déterminer où se trouvent les problèmes et de les corriger plus rapidement.

Moogsoft est une solution professionnelle basée sur le cloud qui permet aux clients de suivre leur propre rythme d'adoption à un coût largement inférieur.

### Observer

Optimisez la qualité de vos services. Moogsoft ne vous alerte qu'en cas de problème critique, ce qui vous permet d'intervenir plus rapidement, de vous concentrer sur l'essentiel et de résoudre des incidents avant qu'ils ne provoquent des pannes.

### Monitor

Limitez le volume d'alertes tout en augmentant votre productivité. Nous vous aidons à éliminer les événements inutiles en proposant une interface de surveillance centralisée et en regroupant les événements similaires afin de réduire au minimum les alertes nécessitant une intervention.

### Collaborer

Visualisez toutes les informations sur un même écran. Toutes les alertes relatives à vos applications, services et infrastructures sont regroupées dans une console unique pour une agilité accrue, un nombre d'alertes réduit et des temps de résolution accélérés.

### Flux de données Moogsoft

Les données passent par Moogsoft afin de proposer plus de contexte et de réduire la quantité d'informations parasites. Les métriques sont converties en événements, qui sont à leur tour transformés en alertes avec état. Enfin, les alertes sont mises en corrélation avec les incidents.

## Assistance
Contactez l'assistance Moogsoft sur [https://support.moogsoft.com][1].

[1]: https://support.moogsoft.com

---
Cette application est disponible sur le Marketplace et développée par un partenaire technologique de Datadog. <a href="https://app.datadoghq.com/marketplace/app/moogsoft" target="_blank">Cliquez ici</a> pour l'acheter.