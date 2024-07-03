---
algolia:
  subcategory: Marketplace Integrations
app_id: rapdev-validator
app_uuid: d66f715a-4218-40f0-af35-a147c45c1d11
assets:
  dashboards:
    RapDev Validator Dashboard: assets/dashboards/rapdev_validator_dashboard.json
    RapDev Validator Host Dashboard: assets/dashboards/host_dashboard.json
    RapDev Validator Synthetic Dashboard: assets/dashboards/synthetic_dashboard.json
  integration:
    auto_install: false
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
    source_type_id: 10183
    source_type_name: RapDev Validator
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
- compliance
- configuration & deployment
- marketplace
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_validator
integration_id: rapdev-validator
integration_title: Tag Validator
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_validator
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: validator
  short_description: Flat fee for this integration
  unit_price: 500
public_title: Tag Validator
short_description: Validate monitor tags and ensure agent compliance in DD environment
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Compliance
  - Category::Configuration & Deployment
  - Category::Marketplace
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Validate monitor tags and ensure agent compliance in DD environment
  media:
  - caption: Validator Dashboard
    image_url: images/validator.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Tag Validator
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview
The RapDev validator solves the problem for monitoring tag and Agent compliance in your Datadog environment. The integration accepts a list of tag keys and their values that you deem as acceptable per your environments tagging strategy, then reports these as metrics and service checks into your Datadog instance. This way, you can display whether the hosts in your environment have the correct tags applied to them.

### ダッシュボード
1. RapDev Validator Host Dashboard
2. RapDev Validator Synthetic Dashboard
3. RapDev Validator Dashboard

### モニター
1. Host is missing required tag key
2. Host has non-compliant value for tag key

## Support
For support or feature requests, contact RapDev.io through the following channels:

- Email: support@rapdev.io
- Chat: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- Phone: 855-857-0222

---
Made with ❤️ in Boston

*This isn't the integration you're looking for? Missing a critical feature for your organization? Drop us a [note](mailto:support@rapdev.io), and we'll build it!!*

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/rapdev-validator" target="_blank">Click Here</a> to purchase this application.