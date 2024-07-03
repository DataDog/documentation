---
algolia:
  subcategory: Marketplace Integrations
app_id: rapdev-snaplogic
app_uuid: c3f2e4a6-a17f-4b66-b72d-4be62b648fb8
assets:
  dashboards:
    RapDev SnapLogic Snaplex Dashboard: assets/dashboards/snaplex_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.snaplogic.snaplex_node.running
      metadata_path: metadata.csv
      prefix: rapdev.snaplogic.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 6643655
    source_type_name: RapDev SnapLogic
  monitors:
    Connection to SnapLogic API is Failing: assets/monitors/snaplogic_can_connect.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: datadog-engineering@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
- developer tools
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_snaplogic
integration_id: rapdev-snaplogic
integration_title: SnapLogic
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_snaplogic
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.snaplogic
  product_id: snaplogic
  short_description: Unit price per snaplex
  tag: snaplex_label
  unit_label: SnapLogic Snaplexes
  unit_price: 10
public_title: SnapLogic
short_description: Monitor SnapLogic Pipelines and Snaplexes
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
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Monitor SnapLogic Pipelines and Snaplexes
  media:
  - caption: SnapLogic Dashboard
    image_url: images/dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: SnapLogic
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview
SnapLogic is a software company that provides Integration Platform as a Service (iPaaS) tools for connecting cloud data sources, SaaS applications, and on-premises business applications. The SnapLogic integration by RapDev is an Agent check-based integration that queries the SnapLogic REST API to retrieve data for [snaplexes][8] and pipelines as metrics, and organizational activities as logs.

### Logs
This integration only collects SnapLogic Organization Activity Logs if `collect_activity_logs` is enabled in the `conf.yaml` file. 

## Support
For support or feature requests, contact RapDev.io through the following channels:

- Support: [support@rapdev.io][7]
- Sales: [sales@rapdev.io][1]
- Chat: [rapdev.io][6]
- Phone: 855-857-0222

---
Made with ❤️ in Boston

*This isn't the integration you're looking for? Missing a critical feature for your organization? Drop us a [note][7], and we'll build it!!*

---
[1]: mailto:sales@rapdev.io
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://docs-snaplogic.atlassian.net/wiki/spaces/SD/pages/1439028/Creating+a+User
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#agent-information
[6]: https://www.rapdev.io/#Get-in-touch
[7]: mailto:support@rapdev.io
[8]: https://docs-snaplogic.atlassian.net/wiki/spaces/SD/pages/1437953/The+SnapLogic+Snaplex
---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/rapdev-snaplogic" target="_blank">Click Here</a> to purchase this application.