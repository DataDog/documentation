---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "rapdev-maxdb"
"app_uuid": "f30ae17c-d58a-43f4-a8a6-693279394101"
"assets":
  "dashboards":
    "RapDev MaxDB Dashboard": assets/dashboards/rapdev_maxdb_dashboard.json
  "integration":
    "auto_install": false
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": rapdev.maxdb.db_state
      "metadata_path": metadata.csv
      "prefix": rapdev.maxdb.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10131"
    "source_type_name": RapDev MaxDB
  "monitors":
    "RapDev MaxDB Data Volume Usage": assets/monitors/rapdev_maxdb_data_volume_usage.json
    "RapDev MaxDB Database Connection Check": assets/monitors/rapdev_maxdb_connection_check.json
    "RapDev MaxDB Database State": assets/monitors/rapdev_maxdb_state.json
    "RapDev MaxDB Lock Utilization": assets/monitors/rapdev_maxdb_lock_utilization.json
    "RapDev MaxDB Log Area Usage": assets/monitors/rapdev_maxdb_log_area_usage.json
"author":
  "homepage": "https://www.rapdev.io"
  "name": RapDev
  "sales_email": ddsales@rapdev.io
  "support_email": support@rapdev.io
  "vendor_id": rapdev
"categories":
- caching
- data stores
- marketplace
- sap
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "rapdev_maxdb"
"integration_id": "rapdev-maxdb"
"integration_title": "MaxDB"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/EULA.pdf
"manifest_version": "2.0.0"
"name": "rapdev_maxdb"
"pricing":
- "billing_type": tag_count
  "includes_assets": true
  "metric": datadog.marketplace.rapdev.maxdb
  "product_id": maxdb
  "short_description": Unit price per db
  "tag": db
  "unit_label": Database
  "unit_price": !!int "50"
"public_title": "MaxDB"
"short_description": "Monitor volume, cache, schema, table and more from MaxDB databases"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Caching"
  - "Category::Data Stores"
  - "Category::Marketplace"
  - "Category::SAP"
  - "Offering::Integration"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Submitted Data Type::Metrics"
  "configuration": "README.md#Setup"
  "description": Monitor volume, cache, schema, table and more from MaxDB databases
  "media":
  - "caption": Database Status & Data/Log Metrics
    "image_url": images/1.png
    "media_type": image
  - "caption": Database Cache Metrics
    "image_url": images/2.png
    "media_type": image
  - "caption": Session, OMS, and Schema Metrics
    "image_url": images/3.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": MaxDB
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->
## Overview

The MaxDB integration monitors data and log areas and volumes, caches, sessions, locks, and other metrics for MaxDB instances to ensure the databases are running as they should be. The integration comes with a dashboard which can be filtered by database, as well as database host. The MaxDB integration also comes with monitors for some common metrics that relate to the overall health of the database.

### Monitors
1. MaxDB Connection Check
2. MaxDB State
3. MaxDB Data Volume Usage
4. MaxDB Lock Utilization
5. MaxDB Log Area Usage

## Support

For support or feature requests, contact RapDev.io through the following channels: 

 - Email: support@rapdev.io 
 - Chat: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
 - Phone: 855-857-0222 

---
Made with ❤️  in Boston

*This isn't the integration you're looking for? Missing a critical feature for your organization? Drop us a [note](mailto:support@rapdev.io) and we'll build it!!*

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/rapdev-maxdb" target="_blank">Click Here</a> to purchase this application.
