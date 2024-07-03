---
algolia:
  subcategory: Marketplace Integrations
app_id: rapdev-redhat-satellite
app_uuid: fad53c37-82aa-466c-a2b6-cfa27a6c7d45
assets:
  dashboards:
    RapDev RedHat Satellite Inventory Dashboard: assets/dashboards/inventory_dashboard.json
    RapDev RedHat Satellite OpenMetrics Dashboard: assets/dashboards/openmetrics_dashboard.json
    RapDev RedHat Satellite Tasks & Jobs Dashboard: assets/dashboards/tasks_&_jobs_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - rapdev.redhat_satellite.openmetrics.http_requests.count
      - rapdev.redhat_satellite.organization.count
      metadata_path: metadata.csv
      prefix: rapdev.redhat_satellite.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 14094169
    source_type_name: RapDev RedHat Satellite
  logs:
    source: rapdev_redhat_satellite
  monitors:
    Foreman Task Failure: assets/monitors/foreman_task_failure.json
    HTTP 5xx Errors: assets/monitors/5xx_errors.json
    Job Invocation Failure: assets/monitors/job_invocation_failure.json
    OpenMetrics Connection: assets/monitors/openmetrics_connection.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
- developer tools
- configuration & deployment
- log collection
- metrics
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_redhat_satellite
integration_id: rapdev-redhat-satellite
integration_title: RedHat Satellite
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_redhat_satellite
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.redhat_satellite
  product_id: redhat-satellite
  short_description: Unit price per RedHat Satellite instance
  tag: satellite_host
  unit_label: RedHat Satellite Instance
  unit_price: 1000
public_title: RedHat Satellite
short_description: Monitor the health and performance of RedHat Satellite
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Category::Developer Tools
  - Category::Configuration & Deployment
  - Category::Log Collection
  - Category::Metrics
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Monitor the health and performance of RedHat Satellite
  media:
  - caption: Satellite OpenMetrics Dashboard
    image_url: images/openmetrics_dashboard.png
    media_type: image
  - caption: Satellite Inventory Dashboard
    image_url: images/inventory_dashboard.png
    media_type: image
  - caption: Satellite Tasks & Jobs Dashboard
    image_url: images/tasks_jobs_dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: RedHat Satellite
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

RedHat Satellite is an infrastructure management product that keeps RedHat infrastructure running efficiently, with security, and compliant with your organization's management standards. This integration comes with several out-of-the-box dashboards that show the overall health of the different components of RedHat Satellite—including content host errata, Foreman task and job invocation statuses, Satellite services statuses, and more.

To help you get started with monitoring your RedHat Satellite application, this integration also includes out-of-the-box monitors and a log pipeline for processing Satellite-related log files.

This integration was tested on Satellite v6.7.5 running Foreman v1.24.1.32, and is not guaranteed to function on earlier major versions.


## Support
For support or feature requests, contact RapDev.io through the following channels:

- Support: [support@rapdev.io][7]
- Sales: sales@rapdev.io
- Chat: [rapdev.io][8]
- Phone: 855-857-0222

---
Made with ❤️ in Boston

*This isn't the integration you're looking for? Missing a critical feature for your organization? Drop RapDev a [note][7], and we'll build it!!*

[0]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[1]: https://access.redhat.com/documentation/en-us/red_hat_satellite/6.7/html/monitoring_red_hat_satellite/installing-pcp-packages_monitoring-guide#configure-pcp-data-collection_monitoring-guide
[2]: https://access.redhat.com/documentation/en-us/red_hat_satellite/6.7/html-single/administering_red_hat_satellite/index#creating-a-user_admin
[3]: https://access.redhat.com/documentation/en-us/red_hat_satellite/6.7/html-single/administering_red_hat_satellite/index#creating-a-role_admin
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[7]: mailto:support@rapdev.io
[8]: https://www.rapdev.io/#Get-in-touch
[9]: mailto:sales@rapdev.io
---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/rapdev-redhat-satellite" target="_blank">Click Here</a> to purchase this application.