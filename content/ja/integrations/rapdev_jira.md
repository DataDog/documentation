---
algolia:
  subcategory: Marketplace Integrations
app_id: rapdev-jira
app_uuid: 745eddf9-460c-4189-a7d1-00c297371519
assets:
  dashboards:
    RapDev Jira Overview Dashboard: assets/dashboards/rapdev_jira_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.jira.user.count
      metadata_path: metadata.csv
      prefix: rapdev.jira
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10428
    source_type_name: RapDev Jira
  logs: {}
  monitors:
    Rapdev Jira Integration is Unable to Run: assets/monitors/jira_api.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- developer tools
- marketplace
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_jira
integration_id: rapdev-jira
integration_title: Jira
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_jira
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: jira
  short_description: Flat fee for this integration
  unit_price: 100
public_title: Jira
short_description: Monitor Jira Cloud issues and users.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Developer Tools
  - Category::Marketplace
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Monitor Jira Cloud issues and users.
  media:
  - caption: Overview Dashboard
    image_url: images/overview_sample_tvmode.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Jira
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

Jira is a cloud-based or self-hosted service that allows you to plan, track, and manage your software projects. It is a product of Atlassian, a company that provides tools for teams to collaborate and deliver great products. Jira Software supports Agile teams that utilize Scrum, Kanban, and DevOps.

The Jira integration allows organizations to monitor their overall system health by reporting on Summary Reports, Workflows, and Issue metrics. The integration supports the Atlassian-hosted Jira Cloud, the self-hosted Jira Data Center (9.x.x), and the legacy Jira Server (7.6.1+, 8.x.x, 9.x.x).

## Support
For support or feature requests, contact RapDev.io through the following channels:

- Support: [support@rapdev.io][6]
- Sales: [sales@rapdev.io][7]
- Chat: [rapdev.io][5]
- Phone: 855-857-0222

---
Made with ❤️ in Boston

*This isn't the integration you're looking for? Missing a critical feature for your organization? Drop RapDev a [note][6], and we'll build it!!*

[1]: https://confluence.atlassian.com/adminjiraserver/create-edit-or-remove-a-user-938847025.html
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[5]: https://www.rapdev.io/#Get-in-touch
[6]: mailto:support@rapdev.io
[7]: mailto:sales@rapdev.io

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/rapdev-jira" target="_blank">Click Here</a> to purchase this application.