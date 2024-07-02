---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "rapdev-influxdb"
"app_uuid": "e560c4c8-7983-4338-bc41-30b121a4ac98"
"assets":
  "dashboards":
    "RapDev InfluxDB API Statistics": assets/dashboards/RapDevInfluxDBAPIStatistics.json
    "RapDev InfluxDB Summary": assets/dashboards/RapDevInfluxDBSummary.json
    "RapDev InfluxDB System": assets/dashboards/RapDevInfluxDBSystem.json
    "RapDev InfluxDB Tasks and Services": assets/dashboards/RapDevInfluxDBTasksandServices.json
  "integration":
    "auto_install": false
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": rapdev.influxdb.go_info
      "metadata_path": metadata.csv
      "prefix": rapdev.influxdb.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10292"
    "source_type_name": RapDev InfluxDB
"author":
  "homepage": "https://www.rapdev.io"
  "name": RapDev
  "sales_email": ddsales@rapdev.io
  "support_email": support@rapdev.io
  "vendor_id": rapdev
"categories":
- data stores
- marketplace
- metrics
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "rapdev_influxdb"
"integration_id": "rapdev-influxdb"
"integration_title": "InfluxDB"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/EULA.pdf
"manifest_version": "2.0.0"
"name": "rapdev_influxdb"
"pricing":
- "billing_type": tag_count
  "includes_assets": true
  "metric": datadog.marketplace.rapdev.influxdb
  "product_id": influxdb
  "short_description": Unit price per instance.
  "tag": influxdb_endpoint
  "unit_label": InfluxDB Instance
  "unit_price": !!int "10"
"public_title": "InfluxDB"
"short_description": "Monitor the health and activity of your InfluxDB instances"
"supported_os":
- linux
- macos
- windows
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Supported OS::Windows"
  - "Category::Data Stores"
  - "Category::Marketplace"
  - "Category::Metrics"
  - "Offering::Integration"
  - "Submitted Data Type::Metrics"
  "configuration": "README.md#Setup"
  "description": Monitor the health and activity of your InfluxDB instances
  "media":
  - "caption": InfluxDB Integration Dashboard - API Statistics
    "image_url": images/rapdev-influxdb-api.png
    "media_type": image
  - "caption": InfluxDB Integration Dashboard - Summary
    "image_url": images/rapdev-influxdb-summary.png
    "media_type": image
  - "caption": InfluxDB Integration Dashboard - System
    "image_url": images/rapdev-influxdb-system.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": InfluxDB
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

This integration reports metrics about the health and operation of [InfluxDB][1] v2.0+.

### ダッシュボード

This integration provides several out-of-the-box dashboards named **InfluxDB Summary**, 
**InfluxDB API Statistics**, **InfluxDB System**, and **InfluxDB Tasks and Services**. 
These dashboards display the metrics produced by the integration and split them into different categories.

## Support
For support or feature requests, contact RapDev.io through the following channels:
- Support: support@rapdev.io
- Sales: sales@rapdev.io
- Chat: [rapdev.io][2]
- Phone: 855-857-0222

---

Made with ❤️ in Boston
*This isn't the integration you're looking for? Missing a critical feature for your organization? Drop RapDev a [note][4], and we'll build it!!*


[1]: https://www.influxdata.com/
[2]: https://www.rapdev.io/#Get-in-touch
[3]: mailto:sales@rapdev.io
[4]: mailto:support@rapdev.io

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/rapdev-influxdb" target="_blank">Click Here</a> to purchase this application.
