---
app_id: rapdev-oracle-timesten
app_uuid: bddd0f6a-efe0-4e3f-bff4-46df8bb839f9
assets:
  dashboards:
    Oracle TimesTen: assets/dashboards/oracle_timesten.json
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: rapdev.oracle_timesten.reportduration
      metadata_path: metadata.csv
      prefix: rapdev.oracle_timesten.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Oracle TimesTen
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- caching
- data store
- marketplace
- oracle
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: oracle_timesten
integration_id: rapdev-oracle-timesten
integration_title: Oracle TimesTen
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: oracle_timesten
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.oracle_timesten
  product_id: oracle-timesten
  short_description: Prix unitaire par host
  tag: host
  unit_label: Base de données Oracle TimesTen
  unit_price: 500
public_title: Oracle TimesTen
short_description: Surveillez les performances de vos bases de données Oracle TimesTen
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Category::Data Store
  - Category::Marketplace
  - Category::Oracle
  - Offering::Integration
  - Supported OS::Linux
  configuration: README.md#Setup
  description: Surveillez les performances de vos bases de données Oracle TimesTen
  media:
  - caption: Intégration Datadog/Oracle TimesTen
    image_url: images/video.png
    media_type: video
    vimeo_id: 630489692
  - caption: Vue d'ensemble des statuts
    image_url: images/1.png
    media_type: image
  - caption: Métriques de réplication
    image_url: images/2.png
    media_type: image
  - caption: Statistiques SQL
    image_url: images/3.png
    media_type: image
  - caption: Vue d'ensemble du dashboard
    image_url: images/4.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Oracle TimesTen
  uninstallation: README.md#Uninstallation
---



## Présentation

L'intégration Oracle TimesTen vous permet de surveiller vos bases de données en mémoire TimesTen. Cette intégration couvre plus de 200 métriques et fournit des détails sur les requêtes les plus courantes, le statut des bases de données, les temps d'exécution et plus encore.

L'intégration inclut un dashboard prêt à l'emploi qui fournit une vue d'ensemble des statuts et métriques de vos bases de données TimesTen.

## Assistance

Pour obtenir de l'aide ou demander l'ajout d'une fonctionnalité, contactez RapDev.io aux coordonnées suivantes :

 - E-mail : support@rapdev.io
 - Chat : [rapdev.io](https://www.rapdev.io/#Get-in-touch)
 - Téléphone : 855-857-0222

---
Développé avec ❤️  à Boston

*Ce n'est pas l'intégration que vous recherchez ? Une fonctionnalité importante pour votre organisation est manquante ? [Écrivez-nous](mailto:support@rapdev.io) et nous l'ajouterons !*

---
Cette application est disponible sur le Marketplace et développée par un partenaire technologique de Datadog. <a href="https://app.datadoghq.com/marketplace/app/rapdev-oracle-timesten" target="_blank">Cliquez ici</a> pour l'acheter.