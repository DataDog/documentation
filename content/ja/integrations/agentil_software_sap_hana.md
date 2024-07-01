---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "agentil-software-sap-hana"
"app_uuid": "75784ba6-6a1a-4059-849e-c4cbdb56f258"
"assets":
  "dashboards":
    "SAP HANA services overview": assets/dashboards/agentil_software_sap_hana_services_overview.json
    "SAP HANA systems overview": assets/dashboards/agentil_software_sap_hana_overview.json
    "SAP HANA tables overview": assets/dashboards/agentil_software_sap_hana_tables_overview.json
  "integration":
    "auto_install": false
    "configuration": {}
    "events":
      "creates_events": true
    "metrics":
      "check": datadog.marketplace.agentil_software.sap_hana.system
      "metadata_path": metadata.csv
      "prefix": agentil_software.hana
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10388"
    "source_type_name": AGENTIL Software SAP HANA
"author":
  "homepage": "https://www.agentil-software.com"
  "name": Agentil Software
  "sales_email": sales@agentil-software.com
  "support_email": support@agentil-software.com
  "vendor_id": agentil-software
"categories":
- marketplace
- sap
- data stores
- event management
- metrics
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "agentil_software_sap_hana"
"integration_id": "agentil-software-sap-hana"
"integration_title": "SAP HANA"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/eula.pdf
"manifest_version": "2.0.0"
"name": "agentil_software_sap_hana"
"pricing":
- "billing_type": tag_count
  "includes_assets": true
  "metric": datadog.marketplace.agentil_software.sap_hana.system
  "product_id": sap-hana
  "short_description": Count one license unit per monitored SAP HANA system (identified by SID)
  "tag": uri
  "unit_label": SAP system ID (SID)
  "unit_price": !!int "190"
"public_title": "SAP HANA"
"short_description": "Monitor SAP HANA databases centrally from a single collector"
"supported_os":
- linux
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Marketplace"
  - "Category::SAP"
  - "Offering::Integration"
  - "Category::Data Stores"
  - "Supported OS::Linux"
  - "Category::Event Management"
  - "Category::Metrics"
  - "Submitted Data Type::Metrics"
  - "Submitted Data Type::Logs"
  - "Submitted Data Type::Events"
  "configuration": "README.md#Setup"
  "description": Monitor SAP HANA databases centrally from a single collector
  "media":
  - "caption": SAP HANA database overview
    "image_url": images/dashboard_db_overview.png
    "media_type": image
  - "caption": SAP HANA tables overview
    "image_url": images/hana_tables_overview.png
    "media_type": image
  - "caption": SAP HANA services overview
    "image_url": images/hana_services_overview.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": SAP HANA
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview
The SAP HANA integration monitors SAP HANA in memory database systems.
A system can host several database schemas and can be deployed on multiple nodes.

Using remote **agentless** connection and preconfigured monitoring templates, this integration can go live in just a **few minutes**.

Monitoring is powered by AGENTIL Software's [Pro.Monitor platform][1]. It is configured out-of-the-box to cover the most relevant KPIs of your database, including **backups, transactions, service resources, table growth. and more**.

This integration collects and analyzes data from systems in real time and sends metrics and events to Datadog. You can fine tune the alerts by configuring Pro.Monitor and creating Datadog monitors directly on the metrics.

Unlike with agent-based solutions, all monitoring configuration of this platform is centralized in a single location, eliminating the need to modify or install anything on the monitored systems.

### Monitored modules

- HANA nodes
- Alerts
- Backups
- Service CPU
- Service memory
- Service disk
- Blocked transactions
- Connections
- Threads
- Replication status
- Replication statistics
- Table size (records, merge size, disk size)
- Custom SQL requests
- On demand monitors

## Support

At AGENTIL Software, our team of SAP experts and developers are here to provide support and accept requests for enhancements or additional functionality.
Contact us via the following channel:

- Email: [support@agentil-software.com][2]

*If you are looking for a trustworthy partner for specific integrations with SAP or other platforms, you are in the right place - just get in touch with us.*

---
This product is engineered and developed in Geneva, Switzerland. 

[1]: https://www.agentil-software.com
[2]: mailto:support@agentil-software.com
[3]: https://wiki.agentil-software.com/doku.php?id=products:promonitor:6.8:userguide:configuration
[4]: https://wiki.agentil-software.com/doku.php?id=products:cockpit:1.0:installguide:installjava
[5]: https://agentil.box.com/s/k0yp1tk58r666rfncf0nb9k1qa0guvdc


---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/agentil-software-sap-hana" target="_blank">Click Here</a> to purchase this application.
