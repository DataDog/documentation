---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "rapdev-oracle-timesten"
"app_uuid": "bddd0f6a-efe0-4e3f-bff4-46df8bb839f9"
"assets":
  "dashboards":
    "Oracle TimesTen": assets/dashboards/oracle_timesten.json
  "integration":
    "auto_install": false
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": rapdev.oracle_timesten.reportduration
      "metadata_path": metadata.csv
      "prefix": rapdev.oracle_timesten.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10116"
    "source_type_name": Oracle TimesTen
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
- oracle
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "oracle_timesten"
"integration_id": "rapdev-oracle-timesten"
"integration_title": "Oracle TimesTen"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/EULA.pdf
"manifest_version": "2.0.0"
"name": "oracle_timesten"
"pricing":
- "billing_type": tag_count
  "includes_assets": true
  "metric": datadog.marketplace.rapdev.oracle_timesten
  "product_id": oracle-timesten
  "short_description": Unit price per host
  "tag": host
  "unit_label": Oracle Times Ten Database
  "unit_price": !!int "500"
"public_title": "Oracle TimesTen"
"short_description": "Monitor Oracle TimesTen database performance"
"supported_os":
- linux
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Caching"
  - "Category::Data Stores"
  - "Category::Marketplace"
  - "Category::Oracle"
  - "Offering::Integration"
  - "Supported OS::Linux"
  - "Submitted Data Type::Metrics"
  "configuration": "README.md#Setup"
  "description": Monitor Oracle TimesTen database performance
  "media":
  - "caption": Oracle TimesTen Datadog Integration
    "image_url": images/video.png
    "media_type": video
    "vimeo_id": !!int "630489692"
  - "caption": Status Overview
    "image_url": images/1.png
    "media_type": image
  - "caption": Replication Metrics
    "image_url": images/2.png
    "media_type": image
  - "caption": SQL Statistics
    "image_url": images/3.png
    "media_type": image
  - "caption": Dashboard Overview
    "image_url": images/4.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Oracle TimesTen
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

The Oracle TimesTen integration enables you to monitor your TimesTen in-memory databases. This integration covers over 200 metrics and provides details about your top queries, database status, execution times, and much more.

The integration includes an out-of-the-box dashboard that shows an overview of your TimesTen databases' status and metrics.

## Support

For support or feature requests please contact RapDev.io through the following channels:

 - Email: support@rapdev.io
 - Chat: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
 - Phone: 855-857-0222

---
Made with ❤️  in Boston

*This isn't the integration you're looking for? Missing a critical feature for your organization? Drop us a [note](mailto:support@rapdev.io) and we'll build it!!*

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/rapdev-oracle-timesten" target="_blank">Click Here</a> to purchase this application.
