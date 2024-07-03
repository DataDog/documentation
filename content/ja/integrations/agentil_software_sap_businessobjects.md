---
algolia:
  subcategory: Marketplace Integrations
app_id: agentil-software-sap-businessobjects
app_uuid: cac9d777-3bd1-40a1-aef3-28a8141804f1
assets:
  dashboards:
    SAP BusinessObjects overview: assets/dashboards/agentil_software_sap_businessobjects_global_overview.json
    SAP BusinessObjects system dashboard: assets/dashboards/agentil_software_sap_businessobjects_system.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: datadog.marketplace.agentil_software.sap_businessobjects.system
      metadata_path: metadata.csv
      prefix: agentil_software
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10252
    source_type_name: AGENTIL Software SAP BusinessObjects
author:
  homepage: https://www.agentil-software.com
  name: Agentil Software
  sales_email: sales@agentil-software.com
  support_email: support@agentil-software.com
  vendor_id: agentil-software
categories:
- marketplace
- sap
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: agentil_software_sap_businessobjects
integration_id: agentil-software-sap-businessobjects
integration_title: SAP BusinessObjects
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: agentil_software_sap_businessobjects
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.agentil_software.sap_businessobjects.system
  product_id: sap-businessobjects
  short_description: Priced per each unique monitored SAP system (identified by SID)
  tag: uri
  unit_label: SAP BusinessObjects instance
  unit_price: 160
public_title: SAP BusinessObjects
short_description: Monitor SAP business objects systems
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Category::SAP
  - Offering::Integration
  - Supported OS::Linux
  - Submitted Data Type::Metrics
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: Monitor SAP business objects systems
  media:
  - caption: SAP BusinessObjects global overview
    image_url: images/sap_businessobjects_global_overview_dashboard.png
    media_type: image
  - caption: SAP BusinessObjects system overview
    image_url: images/sap_businessobjects_system_dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: SAP BusinessObjects
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview
The SAP BusinessObjects integration monitors SAP **BusinessObjects** systems.

This integration uses a remote agentless connection and preconfigured monitoring templates, enabling it to go live in a few minutes.

Monitoring is powered by AGENTIL Software's [Pro.Monitor](https://www.agentil-software.com) platform, which is configured out of the box to cover the most relevant modules and transactions of your SAP systems: **connections**, **services**, **reports**, **schedules**, **audit warnings**, etc.

This integration collects and analyzes data from systems in real time, and produces metrics and actionable events. You can create customized alerts on this data by configuring Pro.Monitor or by creating Datadog monitors directly on the metrics.

### Monitored modules

- Server status
- Concurrent users
- Server metrics
- Server properties
- Schedules and reports
- CMC and audit warnings

## Support
For support or feature requests, contact AGENTIL Software at support@agentil-software.com

*If you are looking for a trustworthy partner for specific integrations with SAP or other platforms, you are in the right place - just get in touch with us.*

---
This product is engineered and developed in Geneva, Switzerland. 


---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/agentil-software-sap-businessobjects" target="_blank">Click Here</a> to purchase this application.