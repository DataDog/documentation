---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "agentil-software-sap-netweaver"
"app_uuid": "5b070928-c509-4826-93db-8b5e9206c355"
"assets":
  "dashboards":
    "ABAP transactions response times": assets/dashboards/agentil_software_abap_transactions_response_times.json
    "SAP ABAP Transactions Details": assets/dashboards/agentil_software_abap_transactions_details.json
    "SAP Netweaver overview": assets/dashboards/agentil_software_sap_global_overview.json
    "SAP Netweaver system dashboard": assets/dashboards/agentil_software_sap_netweaver_system.json
    "SAP System IDOCS": assets/dashboards/agentil_software_system_idocs.json
    "SAP System Shortdumps": assets/dashboards/agentil_software_system_shortdumps.json
    "SAP jobs details": assets/dashboards/agentil_software_sap_jobs_details.json
  "integration":
    "auto_install": false
    "configuration": {}
    "events":
      "creates_events": true
    "metrics":
      "check": datadog.marketplace.agentil_software.sap_netweaver.system
      "metadata_path": metadata.csv
      "prefix": agentil_software
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10218"
    "source_type_name": AGENTIL Software SAP NetWeaver
"author":
  "homepage": "https://www.agentil-software.com"
  "name": Agentil Software
  "sales_email": sales@agentil-software.com
  "support_email": support@agentil-software.com
  "vendor_id": agentil-software
"categories":
- marketplace
- sap
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "agentil_software_sap_netweaver"
"integration_id": "agentil-software-sap-netweaver"
"integration_title": "SAP S/4HANA & NetWeaver"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/eula.pdf
"manifest_version": "2.0.0"
"name": "agentil_software_sap_netweaver"
"pricing":
- "billing_type": tag_count
  "includes_assets": true
  "metric": datadog.marketplace.agentil_software.sap_netweaver.system
  "product_id": sap-netweaver
  "short_description": Count one license unit per monitored SAP system (identified by SID)
  "tag": uri
  "unit_label": SAP system ID (SID)
  "unit_price": !!int "250"
"public_title": "SAP S/4HANA & NetWeaver"
"short_description": "Monitor ABAP and J2EE stacks of your S/4HANA and NetWeaver systems"
"supported_os":
- linux
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Marketplace"
  - "Category::SAP"
  - "Offering::Integration"
  - "Supported OS::Linux"
  - "Submitted Data Type::Metrics"
  - "Submitted Data Type::Events"
  "configuration": "README.md#Setup"
  "description": Monitor ABAP and J2EE stacks of your S/4HANA and NetWeaver systems
  "media":
  - "caption": SAP NetWeaver global overview
    "image_url": images/dashboard_overview.png
    "media_type": image
  - "caption": SAP NetWeaver system dashboard
    "image_url": images/dashboard_netweaver.png
    "media_type": image
  - "caption": SAP NetWeaver job logs
    "image_url": images/logs_example_jobs.png
    "media_type": image
  - "caption": SAP ABAP transaction times
    "image_url": images/abap_transaction_response_time.png
    "media_type": image
  - "caption": SAP ABAP transaction details
    "image_url": images/abap_transaction_details.png
    "media_type": image
  - "caption": SAP IDOC messages
    "image_url": images/abap_idocs.png
    "media_type": image
  - "caption": SAP background jobs
    "image_url": images/abap_background_jobs.png
    "media_type": image
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": blog
    "url": "https://www.datadoghq.com/blog/sap-netweaver-monitoring-agentil-datadog-marketplace/"
  "support": "README.md#Support"
  "title": SAP S/4HANA & NetWeaver
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview
The SAP NetWeaver integration monitors ABAP and J2EE stacks of the SAP **NetWeaver** and **S/4HANA** application platforms.

Using remote **agentless** connection and preconfigured monitoring templates, this integration can go live in just a **few minutes**.

Monitoring is powered by AGENTIL Software's [Pro.Monitor platform][1]. It is configured out-of-the-box to cover the most relevant modules and transactions of your SAP systems: **shortdumps, SAP jobs, transaction response times, work processes, and more**.

This integration collects and analyzes data from systems in real time and produces metrics and actionable events. You can finely tune the alerts by configuring Pro.Monitor and create Datadog monitors directly on the metrics.

### Monitored modules

- ABAP instance memory
- ABAP instance response time
- ABAP locks
- ABAP parameters
- ABAP shortdumps
- Application logs
- Batch inputs
- Certificates
- Custom CCMS monitoring
- Database backups
- Database size
- DB exclusive locks
- Dispatcher queues
- ICM status and usage
- IDOC exchange monitoring
- Instances availability
- Number ranges
- PI/XI messages ABAP
- Process chains monitoring
- QRFC/TRFC
- Real time data
- RFC destinations availability
- SAP buffers
- SAP clients change settings
- SAPconnect (SCOT/SOST)
- SAP jobs monitoring
- SAP transaction times
- SAP transports
- SAP users
- Spools
- System logs
- Update requests
- Update service
- Work processes

## Support

For support or feature requests, contact AGENTIL Software through the following channel:

- Email: [support@agentil-software.com][2]

### Further Reading

Additional helpful documentation, links, and articles:

- [Monitor SAP NetWeaver with Agentil's offering in the Datadog Marketplace][5]

*If you are looking for a trustworthy partner for specific integrations with SAP or other platforms, you are in the right place - just get in touch with us.*

---
This product is engineered and developed in Geneva, Switzerland. 

[1]: https://www.agentil-software.com
[2]: mailto:support@agentil-software.com
[3]: https://softwaredownloads.sap.com/file/0020000000507122021
[4]: https://wiki.agentil-software.com/doku.php?id=products:promonitor:6.8:userguide:configuration
[5]: https://www.datadoghq.com/blog/sap-netweaver-monitoring-agentil-datadog-marketplace/
---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/agentil-software-sap-netweaver" target="_blank">Click Here</a> to purchase this application.
