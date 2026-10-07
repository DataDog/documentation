---
app_id: rapdev-terraform
app_uuid: d7240832-9c24-4fc0-9a02-916bc57882c1
assets:
  dashboards:
    RapDev Terraform Dashboard: assets/dashboards/rapdev_terraform_overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.terraform.org.count
      metadata_path: metadata.csv
      prefix: rapdev.terraform.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: RapDev et Terraform
  logs: {}
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: datadog-engineering@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_terraform
integration_id: rapdev-terraform
integration_title: Terraform
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_terraform
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: terraform
  short_description: Coût unique pour cette intégration
  unit_price: 100
public_title: Intégration Terraform
short_description: Surveiller votre compte Terraform et les exécutions ayant échoué
supported_os:
- linux
- mac os
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Mac OS
  - Supported OS::Windows
  - Category::Marketplace
  - Offering::Integration
  configuration: README.md#Setup
  description: Surveiller votre compte Terraform et les exécutions ayant échoué
  media:
  - caption: Dashboard Terraform
    image_url: images/terraform_dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Intégration Terraform
---



## Présentation

L'intégration Terraform permet à votre organisation de surveiller activement ses comptes Terraform, afin de mieux comprendre leur fonctionnement et leur fréquence d'utilisation. L'intégration propose même une fonctionnalité d'audit des autorisations.

### Dashboards

1. Dashboard RapDev et Terraform

## Assistance
Pour obtenir de l'aide ou demander l'ajout d'une fonctionnalité, contactez RapDev.io aux coordonnées suivantes :

- Assistance : datadog-engineering@rapdev.io
- Service commercial : sales@rapdev.io
- Chat : [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- Téléphone : 855-857-0222

---
Développé avec ❤️ à Boston

*Ce n'est pas l'intégration que vous recherchez ? Une fonctionnalité importante pour votre organisation est manquante ? [Écrivez à RapDev](mailto:datadog-engineering@rapdev.io) et nous l'ajouterons !*

[1]: https://www.terraform.io/docs/cloud/users-teams-organizations/users.html#api-tokens
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information

---
Cette application est disponible sur le Marketplace et développée par un partenaire technologique de Datadog. <a href="https://app.datadoghq.com/marketplace/app/rapdev-terraform" target="_blank">Cliquez ici</a> pour l'acheter.