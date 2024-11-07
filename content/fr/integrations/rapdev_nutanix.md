---
app_id: rapdev-nutanix
app_uuid: 53711ca7-b5f8-4472-b921-e70a3103ede4
assets:
  dashboards:
    RapDev Nutanix Cluster Overview: assets/dashboards/rapdev_nutanix_overview_dashboard.json
    RapDev Nutanix Clusters Dashboard: assets/dashboards/rapdev_nutanix_clusters_dashboard.json
    RapDev Nutanix Hosts and Disks Dashboard: assets/dashboards/rapdev_nutanix_hosts_and_disks_dashboard.json
    RapDev Nutanix Protection Domain Dashboard: assets/dashboards/rapdev_nutanix_protection_domain_dashboard.json
    RapDev Nutanix VMs Dashboard: assets/dashboards/rapdev_nutanix_vms_dashboard.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.nutanix.clusters.count
      metadata_path: metadata.csv
      prefix: rapdev.nutanix.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Nutanix par RapDev
  logs: {}
  monitors:
    Nutanix Cluster CPU: assets/monitors/nutanix_cpu_monitor.json
    Nutanix Compression Saving: assets/monitors/nutanix_compression_saving_monitor.json
    Nutanix Deduplication: assets/monitors/nutanix_deduplication_monitor.json
    Nutanix Storage Usage: assets/monitors/nutanix_storage_monitor.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_nutanix
integration_id: rapdev-nutanix
integration_title: Nutanix
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_nutanix
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.nutanix
  product_id: nutanix
  short_description: Prix unitaire par cœur
  tag: core
  unit_label: Cores de host Nutanix
  unit_price: 5
public_title: Nutanix
short_description: Surveiller l'utilisation des ressources Nutanix pour mieux comprendre
  votre environnement
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Surveiller l'utilisation des ressources Nutanix pour mieux comprendre
    votre environnement
  media:
  - caption: Dashboard de vue d'ensemble Nutanix
    image_url: images/4.png
    media_type: image
  - caption: Dashboard sur les machines virtuelles Nutanix
    image_url: images/5.png
    media_type: image
  - caption: Dashboard sur les clusters Nutanix
    image_url: images/6.png
    media_type: image
  - caption: Dashboard sur les hosts et disques Nutanix
    image_url: images/7.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Nutanix
  uninstallation: README.md#Uninstallation
---



## Présentation
L'intégration Nutanix est conçue pour surveiller le stockage, la charge CPU, l'IOPS en lecture/écriture ainsi que d'autres métriques liées à vos clusters Nutanix, vous permettant ainsi de vérifier que votre environnement fonctionne de façon optimale en permanence. L'intégration intègre quatre dashboards qui offrent une vue d'ensemble de vos clusters Nutanix ainsi que des données granulaires pour identifier avec précision les problèmes de performance potentiels.  Elle comprend également des monitors pour les métriques clés telles que l'utilisation du stockage et les économies associées à la déduplication, qui font partie des principaux indicateurs de la performance globale de l'environnement Nutanix.

### Monitors

1. Utilisation du stockage pour les clusters Nutanix
2. Charge CPU pour les clusters Nutanix
3. Économies issues de la déduplication pour les clusters Nutanix
4. Économies issues de la compression pour les clusters Nutanix

### Dashboards

Vue d'ensemble de Nutanix par RapDev
Clusters Nutanix par RapDev
Hosts et disques Nutanix par RapDev
Machines virtuelles Nutanix par RapDev

## Assistance
Pour obtenir de l'aide ou demander l'ajout d'une fonctionnalité, contactez RapDev.io aux coordonnées suivantes :

- E-mail : support@rapdev.io
- Chat : [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- Téléphone : 855-857-0222

---
Développé avec ❤️ à Boston

*Ce n'est pas l'intégration que vous recherchez ? Une fonctionnalité importante pour votre organisation est manquante ? [Écrivez-nous](mailto:support@rapdev.io) et nous l'ajouterons !*

---
Cette application est disponible sur le Marketplace et développée par un partenaire technologique de Datadog. <a href="https://app.datadoghq.com/marketplace/app/rapdev-nutanix" target="_blank">Cliquez ici</a> pour l'acheter.