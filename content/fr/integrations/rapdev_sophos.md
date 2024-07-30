---
algolia:
  subcategory: Intégrations du Marketplace
app_id: rapdev-sophos
app_uuid: 86b68ae7-ba52-4160-bbf5-e1455fafa677
assets:
  dashboards:
    RapDev Sophos Dashboard: assets/dashboards/rapdev_sophos_dashboard.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.sophos.endpoint.registered
      metadata_path: metadata.csv
      prefix: rapdev.sophos.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: RapDev Sophos
  logs: {}
  monitors:
    '[RapDev Sophos] Managed Endpoint Health has Changed': assets/monitors/sophos_endpoint_health.json
    '[RapDev Sophos] Sophos Service on Managed Endpoint is Stopped': assets/monitors/sophos_service_running.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
- security
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_sophos
integration_id: rapdev-sophos
integration_title: Sophos
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_sophos
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.sophos
  product_id: sophos
  short_description: Prix unitaire par endpoint
  tag: endpoint_name
  unit_label: Endpoint enregistré
  unit_price: 1
public_title: Sophos
short_description: Surveiller la santé de vos endpoints gérés Sophos
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Category::Security
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Surveiller la santé de vos endpoints gérés Sophos
  media:
  - caption: Dashboard Sophos
    image_url: images/dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Sophos
  uninstallation: README.md#Uninstallation
---



## Présentation

L'intégration Sophos surveille la santé globale de vos endpoints gérés Sophos, afin de vérifier que vos appareils gérés se portent bien. L'intégration est fournie avec un dashboard par défaut. Celui-ci offre une vue d'ensemble de plusieurs métriques permettant de surveiller la santé de vos appareils. L'intégration Sophos contient également deux monitors capables d'envoyer des alertes lorsqu'un appareil n'est plus en bonne santé, ou lorsque l'un des services Sophos s'interrompt sur un appareil.

### Monitors
1. Managed Endpoint Health has Changed
2. Sophos Service on Managed Endpoint is Stopped

### Dashboards
1. Dashboard RapDev Sophos

## Assistance
Pour obtenir de l'aide ou demander l'ajout d'une fonctionnalité, contactez RapDev.io aux coordonnées suivantes :

- Assistance : support@rapdev.io
- Service commercial : sales@rapdev.io
- Chat : [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- Téléphone : 855-857-0222

---
Développé avec ❤️ à Boston

*Ce n'est pas l'intégration que vous recherchez ? Une fonctionnalité importante pour votre organisation est manquante ? [Écrivez-nous](mailto:support@rapdev.io) et nous l'ajouterons !*

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[2]: https://github.com/DataDog/integrations-core/blob/master/rapdev_sophos/datadog_checks/rapdev_sophos/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information

---
Cette application est disponible sur le Marketplace et développée par un partenaire technologique de Datadog. <a href="https://app.datadoghq.com/marketplace/app/rapdev-sophos" target="_blank">Cliquez ici</a> pour l'acheter.