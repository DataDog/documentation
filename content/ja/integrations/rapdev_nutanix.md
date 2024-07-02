---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "rapdev-nutanix"
"app_uuid": "53711ca7-b5f8-4472-b921-e70a3103ede4"
"assets":
  "dashboards":
    "RapDev Nutanix Cluster Overview": assets/dashboards/rapdev_nutanix_overview_dashboard.json
    "RapDev Nutanix Clusters Dashboard": assets/dashboards/rapdev_nutanix_clusters_dashboard.json
    "RapDev Nutanix Hosts and Disks Dashboard": assets/dashboards/rapdev_nutanix_hosts_and_disks_dashboard.json
    "RapDev Nutanix Protection Domain Dashboard": assets/dashboards/rapdev_nutanix_protection_domain_dashboard.json
    "RapDev Nutanix VMs Dashboard": assets/dashboards/rapdev_nutanix_vms_dashboard.json
  "integration":
    "auto_install": false
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": rapdev.nutanix.clusters.count
      "metadata_path": metadata.csv
      "prefix": rapdev.nutanix.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10138"
    "source_type_name": RapDev Nutanix
  "logs": {}
  "monitors":
    "Nutanix Cluster CPU": assets/monitors/nutanix_cpu_monitor.json
    "Nutanix Compression Saving": assets/monitors/nutanix_compression_saving_monitor.json
    "Nutanix Deduplication": assets/monitors/nutanix_deduplication_monitor.json
    "Nutanix Storage Usage": assets/monitors/nutanix_storage_monitor.json
"author":
  "homepage": "https://www.rapdev.io"
  "name": RapDev
  "sales_email": ddsales@rapdev.io
  "support_email": support@rapdev.io
  "vendor_id": rapdev
"categories":
- marketplace
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "rapdev_nutanix"
"integration_id": "rapdev-nutanix"
"integration_title": "Nutanix"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/EULA.pdf
"manifest_version": "2.0.0"
"name": "rapdev_nutanix"
"pricing":
- "billing_type": tag_count
  "includes_assets": true
  "metric": datadog.marketplace.rapdev.nutanix
  "product_id": nutanix
  "short_description": Unit price per core
  "tag": core
  "unit_label": Nutanix Host Cores
  "unit_price": !!int "5"
"public_title": "Nutanix"
"short_description": "Monitor Nutanix resource usage to better understand your environment"
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
  - "Submitted Data Type::Metrics"
  "configuration": "README.md#Setup"
  "description": Monitor Nutanix resource usage to better understand your environment
  "media":
  - "caption": Nutanix Overview Dashboard
    "image_url": images/4.png
    "media_type": image
  - "caption": Nutanix VMs Dashboard
    "image_url": images/5.png
    "media_type": image
  - "caption": Nutanix Clusters Dashboard
    "image_url": images/6.png
    "media_type": image
  - "caption": Nutanix Hosts and Disks Dashboard
    "image_url": images/7.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Nutanix
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview
The Nutanix Integration monitors storage, CPU usage, read/write IOPS, and other metrics within Nutanix Clusters, to ensure that your environment is running at optimal performance at all times. The integration comes with 4 Dashboards which allows you to view your Nutanix Clusters from an overview, as well as getting granular and pin-pointing potential performance degradations. The Nutanix Integration also comes with monitors for key metrics such as storage utilization and deduplication savings, which are integral to the overall performance of the Nutanix environment.

### モニター

1. Nutanix Cluster Storage Utilization
2. Nutanix Cluster CPU Utilization
3. Nutanix Cluster Deduplication Savings Ratio
4. Nutanix Cluster Compression Savings Ratio

### ダッシュボード

1. RapDev Nutanix Overview
2. RapDev Nutanix Clusters
3. RapDev Nutanix Hosts and Disks
4. RapDev Nutanix VMs

## Support
For support or feature requests, contact RapDev.io through the following channels:

- Email: support@rapdev.io
- Chat: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- Phone: 855-857-0222

---
Made with ❤️ in Boston

*This isn't the integration you're looking for? Missing a critical feature for your organization? Drop us a [note](mailto:support@rapdev.io), and we'll build it!!*

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/rapdev-nutanix" target="_blank">Click Here</a> to purchase this application.
