---
algolia:
  subcategory: Marketplace Integrations
app_id: rapdev-terraform
app_uuid: d7240832-9c24-4fc0-9a02-916bc57882c1
assets:
  dashboards:
    RapDev Terraform Dashboard: assets/dashboards/rapdev_terraform_overview.json
  integration:
    auto_install: false
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
    source_type_id: 10193
    source_type_name: RapDev Terraform
  logs: {}
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- configuration & deployment
- developer tools
- marketplace
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_terraform
integration_id: rapdev-terraform
integration_title: Terraform
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_terraform
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: terraform
  short_description: Flat fee for this integration
  unit_price: 100
public_title: Terraform
short_description: Monitor your terraform account and failed runs
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Configuration & Deployment
  - Category::Developer Tools
  - Category::Marketplace
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Monitor your terraform account and failed runs
  media:
  - caption: Terraform Organization and Workspace Runs
    image_url: images/1.jpg
    media_type: image
  - caption: Terraform Organization Tokens and Permissions
    image_url: images/2.jpg
    media_type: image
  - caption: Terraform Permission Audits and Agents
    image_url: images/3.jpg
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Terraform
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

The Terraform integration allows organizations to actively monitor their Terraform accounts to gain a better understanding of how well it's working and how often it's being used. The integration even goes as deep as providing a permissions audit. 

### Dashboards

1. RapDev Terraform Dashboard

## Support
For support or feature requests, contact RapDev.io through the following channels:

- Support: support@rapdev.io
- Sales: sales@rapdev.io
- Chat: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- Phone: 855-857-0222

---
Made with ❤️ in Boston

*This isn't the integration you're looking for? Missing a critical feature for your organization? Drop RapDev a [note](mailto:support@rapdev.io), and we'll build it!!*

[1]: https://www.terraform.io/docs/cloud/users-teams-organizations/users.html#api-tokens
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/rapdev-terraform" target="_blank">Click Here</a> to purchase this application.