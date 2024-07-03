---
algolia:
  subcategory: Marketplace Integrations
app_id: rapdev-spacelift
app_uuid: 6d7f8c87-ddef-4210-ba7c-7509ff92cf50
assets:
  dashboards:
    RapDev Spacelift Dashboard: assets/dashboards/rapdev_spacelift_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.spacelift.usage.used_seats
      metadata_path: metadata.csv
      prefix: rapdev.spacelift.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10382
    source_type_name: RapDev Spacelift
  monitors:
    '[RapDev Spacelift] Spacelift Stack Run Failed': assets/monitors/spacelift_stack_run_failed.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
- developer tools
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_spacelift
integration_id: rapdev-spacelift
integration_title: Spacelift
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_spacelift
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: spacelift
  short_description: Flat fee for this integration
  unit_price: 100
public_title: Spacelift
short_description: Monitor Spacelift Stacks, Runs, Workerpools, and Usage
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
  - Category::Developer Tools
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Monitor Spacelift Stacks, Runs, Workerpools, and Usage
  media:
  - caption: Spacelift Dashboard - Stacks
    image_url: images/dashboard1.png
    media_type: image
  - caption: Spacelift Dashboard - Stack Runs
    image_url: images/dashboard2.png
    media_type: image
  - caption: Spacelift Dashboard - WorkerPools & Usage
    image_url: images/dashboard3.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Spacelift
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

Spacelift is a CI/CD platform that automates infrastructure as code workflows, providing state management, preview environments, and compliance checks. The Spacelift integration allows organizations to actively monitor their Spacelift accounts to track their Stacks, Runs, Workerpools, and billing data by submitting metrics relevant to Stack locking and blocking, Stack run statuses, Workerpool statuses, and licensing consumption. 

## Support
For support or feature requests, contact RapDev.io through the following channels:

- Support: support@rapdev.io
- Sales: sales@rapdev.io
- Chat: [rapdev.io][5]
- Phone: 855-857-0222

---
Made with ❤️ in Boston

*This isn't the integration you're looking for? Missing a critical feature for your organization? Drop RapDev a [note][6], and we'll build it!!*

[1]: https://docs.spacelift.io/integrations/api#spacelift-api-key-token
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[5]: https://www.rapdev.io/#Get-in-touch
[6]: mailto:support@rapdev.io
---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/rapdev-spacelift" target="_blank">Click Here</a> to purchase this application.