---
algolia:
  subcategory: Marketplace Integrations
app_id: rapdev-atlassian-bamboo
app_uuid: 8368c74f-4620-490f-aba2-f4eb296adb72
assets:
  dashboards:
    Rapdev - Atlassian Bamboo: assets/dashboards/rapdev_atlassian_bamboo.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.atlassian_bamboo.status
      metadata_path: metadata.csv
      prefix: rapdev.atlassian_bamboo.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 13192871
    source_type_name: rapdev_atlassian_bamboo
  logs: {}
  monitors:
    Rapdev - Atlassian Bamboo: assets/monitors/monitor.json
author:
  contact_link: https://meetings.hubspot.com/ewilliams/rapdev-marketplace
  homepage: https://rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- collaboration
- marketplace
- metrics
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_atlassian_bamboo
integration_id: rapdev-atlassian-bamboo
integration_title: Atlassian Bamboo
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_atlassian_bamboo
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.atlassian_bamboo
  product_id: bamboo
  short_description: Unit price per billable Atlassian Bamboo Entity
  tag: billable_entity
  unit_label: Bamboo Project
  unit_price: 1
public_title: Atlassian Bamboo
short_description: Monitor Atlassian Bamboo failed build metrics across projects,
  plans, and branches
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Collaboration
  - Category::Marketplace
  - Category::Metrics
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Monitor Atlassian Bamboo failed build metrics across projects, plans,
    and branches
  media:
  - caption: Bamboo Overview
    image_url: images/image1.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Atlassian Bamboo
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

Atlassian Bamboo is a continuous integration and continuous deployment (CI/CD) server that automates the process of building, testing, and deploying software projects. This integration collects data from your Bamboo instance to gather information about build, remote agent, and general Bamboo stats.

With this integration you can gain insight into the operational status and efficiency of your remote agent, execution status of builds, and overall health of the Bamboo instance. 


## Support

For support or feature requests, contact RapDev.io through the following channels:

- Support: support@rapdev.io
- Sales: sales@rapdev.io
- Chat: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- Phone: 855-857-0222
- [Atlassian Bamboo Documentation][1]

---
Made with ❤️ in Boston

*This isn't the integration you're looking for? Missing a critical feature for your organization? Drop RapDev a [note](mailto:support@rapdev.io), and we'll build it!!*

[1]: https://confluence.atlassian.com/bamboo/bamboo-documentation-289276551.html
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[4]: https://github.com/DataDog/integrations-core/blob/master/rapdev_atlassian_bamboo/datadog_checks/atlassian_bamboo/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://confluence.atlassian.com/bamboo/personal-access-tokens-976779873.html
[9]: https://docs.datadoghq.com/ja/help/

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/rapdev-atlassian-bamboo" target="_blank">Click Here</a> to purchase this application.