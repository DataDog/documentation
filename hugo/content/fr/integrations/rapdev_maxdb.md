---
algolia:
  subcategory: Intégrations du Marketplace
app_id: rapdev-maxdb
app_uuid: f30ae17c-d58a-43f4-a8a6-693279394101
assets:
  dashboards:
    RapDev MaxDB Dashboard: assets/dashboards/rapdev_maxdb_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.maxdb.db_state
      metadata_path: metadata.csv
      prefix: rapdev.maxdb.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10131
    source_type_name: MaxDB par RapDev
  monitors:
    Data volume usage is high: assets/monitors/rapdev_maxdb_data_volume_usage.json
    Database connection is failing: assets/monitors/rapdev_maxdb_connection_check.json
    Database is not online: assets/monitors/rapdev_maxdb_state.json
    Lock utilization is high: assets/monitors/rapdev_maxdb_lock_utilization.json
    Log area usage is high: assets/monitors/rapdev_maxdb_log_area_usage.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- caching
- data stores
- marketplace
- sap
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_maxdb
integration_id: rapdev-maxdb
integration_title: MaxDB
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_maxdb
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.maxdb
  product_id: maxdb
  short_description: Prix unitaire par base de données
  tag: db
  unit_label: Base de données
  unit_price: 50
public_title: MaxDB
short_description: Surveiller les volumes, les caches, les schémas, les tables et
  d'autres éléments de vos bases de données MaxDB
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Category::Data Stores
  - Category::Marketplace
  - Category::SAP
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Surveiller le volume, le cache, les schémas, les tables et d'autres
    éléments de vos bases de données MaxDB
  media:
  - caption: Statut de la base de données et métriques de données/logs
    image_url: images/1.png
    media_type: image
  - caption: Métriques de cache de base de données
    image_url: images/2.png
    media_type: image
  - caption: Métriques de session, d'OMS et de schéma
    image_url: images/3.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: MaxDB
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->
## Présentation

L'intégration MaxDB permet de surveiller des métriques liées aux données, aux logs, aux volumes, aux caches, aux sessions et aux locks ainsi que d'autres métriques à partir de vos instances MaxDB afin de s'assurer que vos bases de données fonctionnent de façon optimale. L'intégration offre un dashboard dont les informations peuvent être filtrées par base de données ou par host de base de données. Elle propose également des monitors pour surveiller des métriques courantes liées à la santé globale de la base de données.

### Monitors
1. Check de connexion MaxDB
2. Statut MaxDB
3. Utilisation des volumes de données MaxDB
4. Utilisation des locks MaxDB
5. Utilisation des volumes de logs MaxDB

## Agent

Pour obtenir de l'aide ou demander l'ajout d'une fonctionnalité, contactez RapDev.io aux coordonnées suivantes :

 - E-mail : support@rapdev.io
 - Chat : [rapdev.io](https://www.rapdev.io/#Get-in-touch)
 - Téléphone : 855-857-0222 

---
Développé avec ❤️  à Boston

*Ce n'est pas l'intégration que vous recherchez ? Une fonctionnalité importante pour votre organisation est manquante ? [Écrivez-nous](mailto:support@rapdev.io) et nous l'ajouterons !*

---
Cette application est disponible sur le Marketplace et développée par un partenaire technologique de Datadog. <a href=https://app.datadoghq.com/marketplace/app/rapdev-maxdb" target="_blank">Cliquez ici</a> pour l'acheter.