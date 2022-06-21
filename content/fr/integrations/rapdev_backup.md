---
app_id: rapdev-backup
app_uuid: f0a2c15e-9c53-4645-aedc-5a28af130308
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: ''
      metadata_path: ''
      prefix: rapdev.backup
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: "RapDev\_Backup"
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: datadog-engineering@rapdev.io
  vendor_id: rapdev
categories:
  - marketplace
  - cloud
  - collaboration
classifier_tags:
  - Supported OS::Linux
  - Supported OS::Mac OS
  - Supported OS::Windows
  - Category::Marketplace
  - Category::Cloud
  - Category::Collaboration
  - Offering::Integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_backup
integration_id: rapdev-backup
integration_title: "RapDev\_Backup"
integration_version: ''
is_public: true
kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_backup
oauth: {}
pricing:
  - billing_type: flat_fee
    includes_assets: true
    product_id: backup
    short_description: Coût unique pour cette intégration
    unit_price: 500
public_title: "RapDev\_Backup"
short_description: Effectuer une sauvegarde de vos dashboards, tests Synthetic, monitors et notebooks Datadog
supported_os:
  - linux
  - mac os
  - windows
tile:
  changelog: CHANGELOG.md
  configuration: README.md#Setup
  description: Effectuer une sauvegarde de vos dashboards, tests Synthetic, monitors et notebooks Datadog
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: "RapDev\_Backup"
---
## Présentation

Ce check d'Agent vous permet de créer une sauvegarde compressée des dashboards, tests Synthetic, monitors et notebooks de votre compte Datadog. La sauvegarde peut ensuite être stockée sur une machine locale ou sur le cloud d'un prestataire compatible (comme AWS ou Azure).

## Données collectées

### Métriques

Cette intégration n'inclut aucune métrique.

### Checks de service

Cette intégration comprend le check de service `rapdev.backup.can_connect`, qui renvoie `OK` si l'Agent parvient à communiquer avec l'API Datadog ou `CRITICAL` lorsque ce n'est pas le cas.

### Événements

Cette intégration n'inclut aucun événement.

## Assistance
Pour obtenir de l'aide ou demander l'ajout d'une fonctionnalité, contactez RapDev.io aux coordonnées suivantes :

- Asssistance : datadog-engineering@rapdev.io
- Service commercial : sales@rapdev.io
- Chat : [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- Téléphone : 855-857-0222

---
Développé avec ❤️ à Boston

*Ce n'est pas l'intégration que vous recherchez ? Une fonctionnalité importante pour votre organisation est manquante ? [Écrivez à RapDev](mailto:datadog-engineering@rapdev.io) et nous l'ajouterons !*

---
Cette application est disponible sur le Marketplace et développée par un partenaire technologique de Datadog. [Cliquez ici][3] pour l'acheter.

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[3]: https://app.datadoghq.com/marketplace/app/rapdev-backup/pricing