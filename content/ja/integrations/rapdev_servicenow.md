---
algolia:
  subcategory: Marketplace Integrations
app_id: rapdev-servicenow
app_uuid: 50d76130-5970-43e1-a055-0cd5d681d9b7
assets:
  dashboards:
    RapDev ServiceNow: assets/dashboards/servicenow.json
    RapDev ServiceNow ITSM: assets/dashboards/servicenow_itsm.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: rapdev.servicenow.record
      metadata_path: metadata.csv
      prefix: rapdev.servicenow.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10184
    source_type_name: RapDev ServiceNow
  logs: {}
  monitors:
    ServiceNow Pending Approval: assets/monitors/servicenow_pending_approval_monitor.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- cloud
- incidents
- marketplace
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_servicenow
integration_id: rapdev-servicenow
integration_title: ServiceNow Performance Monitoring
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_servicenow
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.servicenow
  product_id: servicenow
  short_description: Unit price per instance
  tag: instance_name
  unit_label: ServiceNow Instance
  unit_price: 1000
public_title: ServiceNow Performance Monitoring
short_description: Monitor ServiceNow instance performance and ITSM records
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Incidents
  - Category::Marketplace
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Monitor ServiceNow instance performance and ITSM records
  media:
  - caption: ServiceNow Instance Performance Dashboard
    image_url: images/1.png
    media_type: image
  - caption: ServiceNow ITSM Dashboard record stats 1 of 2
    image_url: images/2.png
    media_type: image
  - caption: ServiceNow ITSM Dashboard record stats 2 of 2
    image_url: images/3.png
    media_type: image
  - caption: ServiceNow ITSM Dashboard SLA stats
    image_url: images/4.png
    media_type: image
  - caption: ServiceNow ITSM Dashboard table connection stats
    image_url: images/5.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: ServiceNow Performance Monitoring
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->
## Overview

The ServiceNow Performance Monitoring integration monitors the health and performance of your ServiceNow instances with rich insights into transactions, jobs, database, and cache metrics. The integration also tracks open ITSM records, providing actionable data points on both SLAs and the age of business impacting records.

## Support
For support or feature requests, contact RapDev.io through the following channels:

 - Email: support@rapdev.io
 - Chat: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
 - Phone: 855-857-0222

---

Made with ❤️ in Boston

*This isn't the integration you're looking for? Missing a critical feature for your organization? Drop us a [note](mailto:support@rapdev.io) and we'll build it!!*

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/rapdev-servicenow" target="_blank">Click Here</a> to purchase this application.