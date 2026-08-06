---
app_id: rapdev-validator
app_uuid: d66f715a-4218-40f0-af35-a147c45c1d11
assets:
  dashboards:
    RapDev Validator Dashboard: assets/dashboards/rapdev_validator_dashboard.json
    RapDev Validator Host Dashboard: assets/dashboards/host_dashboard.json
    RapDev Validator Synthetic Dashboard: assets/dashboards/synthetic_dashboard.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.validator.agent.installed
      metadata_path: metadata.csv
      prefix: rapdev.validator.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Validateur RapDev
  logs: {}
  monitors:
    Host has non-compliant value for tag key: assets/monitors/host_non_compliant_value.json
    Host is missing required tag key: assets/monitors/host_missing_tag_key.json
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
git_integration_title: rapdev_validator
integration_id: rapdev-validator
integration_title: Validateur de tags
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_validator
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: validator
  short_description: Coût unique pour cette intégration
  unit_price: 500
public_title: Validateur de tags
short_description: Valider des tags de monitor et garantir la conformité de l'Agent
  dans un environnement Datadog
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
  - Offering::Integration
  configuration: README.md#Setup
  description: Valider des tags de monitor et garantir la conformité de l'Agent dans
    un environnement Datadog
  media:
  - caption: Dashboard du validateur
    image_url: images/validator.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Validateur de tags
  uninstallation: README.md#Uninstallation
---



## Présentation
Le validateur RapDev simplifie la surveillance de la conformité de l'Agent et des tags dans votre environnement Datadog. Cette intégration accepte une liste de clés et de valeurs de tag acceptables d'après la stratégie de tagging de vos environnements. Elle transmet à votre instance Datadog ces clés et valeurs sous la forme de métriques et de checks de service. Ainsi, vous pouvez vérifier visuellement si les hosts de vos environnements possèdent les bons tags.

### Dashboards
1. Dashboard du validateur RapDev

### Monitors
1. Host is missing required tag key
2. Host has non-compliant value for tag key

## Assistance
Pour obtenir de l'aide ou demander l'ajout d'une fonctionnalité, contactez RapDev.io aux coordonnées suivantes :

- E-mail : support@rapdev.io
- Chat : [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- Téléphone : 855-857-0222

---
Développé avec ❤️ à Boston

*Ce n'est pas l'intégration que vous recherchez ? Une fonctionnalité importante pour votre organisation est manquante ? [Écrivez-nous](mailto:support@rapdev.io) et nous l'ajouterons !*

---
Cette application est disponible sur le Marketplace et développée par un partenaire technologique de Datadog. <a href="https://app.datadoghq.com/marketplace/app/rapdev-validator" target="_blank">Cliquez ici</a> pour l'acheter.