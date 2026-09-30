---
algolia:
  subcategory: Intégrations du Marketplace
app_id: rapdev-servicenow
app_uuid: 50d76130-5970-43e1-a055-0cd5d681d9b7
assets:
  dashboards:
    RapDev ServiceNow: assets/dashboards/servicenow.json
    RapDev ServiceNow ITSM: assets/dashboards/servicenow_itsm.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: rapdev.servicenow.incident
      metadata_path: metadata.csv
      prefix: rapdev.servicenow.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: RapDev et ServiceNow
  logs: {}
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- cloud
- incidents
- marketplace
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_servicenow
integration_id: rapdev-servicenow
integration_title: ServiceNow Performance Monitoring
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_servicenow
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.servicenow
  product_id: servicenow
  short_description: Prix unitaire par instance
  tag: instance_name
  unit_label: Instance ServiceNow
  unit_price: 1000
public_title: ServiceNow Performance Monitoring
short_description: Surveiller les performances des instances ServiceNow et les incidents
  ITSM
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Incidents
  - Category::Marketplace
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Surveiller les performances des instances ServiceNow et les incidents
    ITSM
  media:
  - caption: Dashboard sur les performances des instances ServiceNow
    image_url: images/1.png
    media_type: image
  - caption: Dashboard ITSM ServiceNow
    image_url: images/2.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: ServiceNow Performance Monitoring
  uninstallation: README.md#Uninstallation
---

## Présentation

L'intégration ServiceNow Performance Monitoring permet de surveiller la santé et les performances de vos instances ServiceNow, grâce à des insights détaillés sur les transactions, tâches, bases de données et métriques de cache. Elle effectue également le suivi des incidents ITSM en cours, en proposant des points de données exploitables sur les SLA et sur la durée des incidents ayant un réel impact commercial.

## Assistance
Pour obtenir de l'aide ou demander l'ajout d'une fonctionnalité, contactez RapDev.io aux coordonnées suivantes :

 - E-mail : support@rapdev.io
 - Chat : [rapdev.io](https://www.rapdev.io/#Get-in-touch)
 - Téléphone : +1 855-857-0222

---

Développé avec ❤️ à Boston

*Ce n'est pas l'intégration que vous recherchez ? Une fonctionnalité importante pour votre organisation est manquante ? [Écrivez-nous](mailto:support@rapdev.io) et nous l'ajouterons !*

---
Cette application est disponible sur le Marketplace et développée par un partenaire technologique de Datadog. <a href="https://app.datadoghq.com/marketplace/app/rapdev-servicenow" target="_blank">Cliquez ici</a> pour l'acheter.