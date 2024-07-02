---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "rapdev-apache-iotdb"
"app_uuid": "dfc14c35-0fb0-457c-abf2-cde174b9e113"
"assets":
  "dashboards":
    "RapDev Apache IoTDB Dashboard": assets/dashboards/rapdev_apache_iotdb_dashboard.json
  "integration":
    "auto_install": false
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": rapdev.apache_iotdb.connections
      "metadata_path": metadata.csv
      "prefix": rapdev.apache_iotdb.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10430"
    "source_type_name": RapDev Apache IoTDB
  "monitors":
    "Connection to Prometheus Metrics Endpoint is failing": assets/monitors/failed_prometheus_health.json
"author":
  "homepage": "https://www.rapdev.io"
  "name": RapDev
  "sales_email": ddsales@rapdev.io
  "support_email": support@rapdev.io
  "vendor_id": rapdev
"categories":
- marketplace
- developer tools
- iot
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "rapdev_apache_iotdb"
"integration_id": "rapdev-apache-iotdb"
"integration_title": "Apache IoTDB"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/EULA.pdf
"manifest_version": "2.0.0"
"name": "rapdev_apache_iotdb"
"pricing":
- "billing_type": tag_count
  "includes_assets": true
  "metric": datadog.marketplace.rapdev.apache_iotdb
  "product_id": apache-iotdb
  "short_description": Unit price per instance.
  "tag": apache_iotdb_endpoint
  "unit_label": ApacheIoTDB Node
  "unit_price": !!int "10"
"public_title": "Apache IoTDB"
"short_description": "Monitor Apache IoTDB Config and Data Nodes"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Marketplace"
  - "Offering::Integration"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Category::Developer Tools"
  - "Category::IoT"
  - "Submitted Data Type::Metrics"
  - "Submitted Data Type::Logs"
  "configuration": "README.md#Setup"
  "description": Monitor Apache IoTDB Config and Data Nodes
  "media":
  - "caption": Apache IoTDB Dashboard - Cluster Overview
    "image_url": images/cluster_overview.png
    "media_type": image
  - "caption": Apache IoTDB Dashboard - Write Performance
    "image_url": images/write_performance.png
    "media_type": image
  - "caption": Apache IoTDB Dashboard - Query Interface
    "image_url": images/query_interface.png
    "media_type": image
  - "caption": Apache IoTDB Dashboard - JVM
    "image_url": images/jvm.png
    "media_type": image
  - "caption": Apache IoTDB Dashboard - Connections & Networking
    "image_url": images/connections_networking.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Apache IoTDB
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

Apache IoTDB (Internet of Things Database) is an integrated data management engine designed for timeseries data, which can provide users specific services for data collection, storage and analysis. The Apache IoTDB integration allows users to monitor their config and data nodes for compaction, query, metadata, and scheduling operations, as well as overall JVM health.

## Support
For support or feature requests, contact RapDev.io through the following channels:

- Support: support@rapdev.io
- Sales: sales@rapdev.io
- Chat: [rapdev.io][4]
- Phone: 855-857-0222

---
Made with ❤️ in Boston

*This isn't the integration you're looking for? Missing a critical feature for your organization? Drop RapDev a [note][5], and we'll build it!!*

[1]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[4]: https://www.rapdev.io/#Get-in-touch
[5]: mailto:support@rapdev.io
---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/rapdev-apache-iotdb" target="_blank">Click Here</a> to purchase this application.
