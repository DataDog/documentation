---
algolia:
  subcategory: Marketplace Integrations
app_id: rapdev-veeam
app_uuid: 2d85c606-5d60-11ee-8c99-0242ac120002
assets:
  dashboards:
    RapDev Veeam Overview Dashboard: assets/dashboards/overview_dashboard.json
    RapDev Veeam Session Dashboard: assets/dashboards/session_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: rapdev.veeam.overview.backup_servers
      metadata_path: metadata.csv
      prefix: rapdev.veeam.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10404
    source_type_name: RapDev Veeam
  monitors:
    '[RapDev Veeam] Backup Job Session Failed': assets/monitors/veeam_backup_job_failed.json
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
git_integration_title: rapdev_veeam
integration_id: rapdev-veeam
integration_title: Veeam Backup
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_veeam
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.veeam
  product_id: veeam
  short_description: Unit price per VM
  tag: vm
  unit_label: VM
  unit_price: 1
public_title: Veeam Backup
short_description: Monitor Veeam Enterprise Summary Reports, System & Backup Job Sessions
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
  description: Monitor Veeam Enterprise Summary Reports, System & Backup Job Sessions
  media:
  - caption: Overview Dashboard - General & VMs
    image_url: images/general_vms_overview.png
    media_type: image
  - caption: Overview Dashboard - Jobs & Repos
    image_url: images/job_repo_overview.png
    media_type: image
  - caption: Session Dashboard - System Sessions
    image_url: images/system_sessions.png
    media_type: image
  - caption: Session Dashboard - Backup Job Sessions
    image_url: images/backup_job_sessions.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Veeam Backup
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

Veeam Backup Enterprise Manager is a management and reporting component that allows you to manage multiple Veeam Backup & Replication installations from a single web console. Veeam Backup Enterprise Manager helps you optimize performance in remote office/branch office (ROBO) and large-scale deployments and maintain a view of your entire virtual environment. 

The Veeam integration allows organizations to monitor their overall Veeam Backup health by reporting metrics on the summary reports produced within Veeam, System Backup Job Session statuses and duration, and Backup Files.

## Support
For support or feature requests, contact RapDev.io through the following channels:

- Support: [support@rapdev.io][6]
- Sales: [sales@rapdev.io][7]
- Chat: [rapdev.io][5]
- Phone: 855-857-0222

---
Made with ❤️ in Boston

*This isn't the integration you're looking for? Missing a critical feature for your organization? Drop RapDev a [note][6], and we'll build it!!*

[1]: https://helpcenter.veeam.com/docs/backup/em/em_managing_accounts.html?ver=120#add
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[5]: https://www.rapdev.io/#Get-in-touch
[6]: mailto:support@rapdev.io
[7]: mailto:sales@rapdev.io
---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/rapdev-veeam" target="_blank">Click Here</a> to purchase this application.