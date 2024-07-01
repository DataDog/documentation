---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "rapdev-rapid7"
"app_uuid": "388017a0-e4cc-45ad-b038-c2141abf20c1"
"assets":
  "dashboards":
    "RapDev rapid7 Investigations": assets/dashboards/rapdev_rapid7_investigations.json
    "RapDev rapid7 Overview": assets/dashboards/rapdev_rapid7_overview.json
  "integration":
    "auto_install": false
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": true
    "metrics":
      "check": rapdev.rapid7.logs.processed
      "metadata_path": metadata.csv
      "prefix": rapdev.rapid7.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10191"
    "source_type_name": RapDev Rapid7
  "logs":
    "source": rapid7
"author":
  "homepage": "https://www.rapdev.io"
  "name": RapDev
  "sales_email": ddsales@rapdev.io
  "support_email": support@rapdev.io
  "vendor_id": rapdev
"categories":
- log collection
- marketplace
- security
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "rapdev_rapid7"
"integration_id": "rapdev-rapid7"
"integration_title": "Rapid7"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/EULA.pdf
"manifest_version": "2.0.0"
"name": "rapdev_rapid7"
"pricing":
- "billing_type": flat_fee
  "includes_assets": true
  "product_id": rapid7
  "short_description": Flat fee for this integration
  "unit_price": !!int "500"
"public_title": "Rapid7"
"short_description": "Monitor your Rapid7 logs and investigation activity"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Log Collection"
  - "Category::Marketplace"
  - "Category::Security"
  - "Offering::Integration"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Submitted Data Type::Metrics"
  - "Submitted Data Type::Events"
  - "Submitted Data Type::Logs"
  "configuration": "README.md#Setup"
  "description": Monitor your Rapid7 logs and investigation activity
  "media":
  - "caption": Investigations
    "image_url": images/R7_investigations_dash_redacted.png
    "media_type": image
  - "caption": High-level Statuses
    "image_url": images/rapdev_rapid7_dashboard_.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Rapid7
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview
This integration tracks the status of currently open and recently closed Rapid7 investigations. This integration will post to the event stream when an event opens and closes, and aggregates these events around the investigation's ID.

The log portion of the check (if enabled) uses the Rapid7 REST API to query IDR log streams. The integration returns all logs that are not considered Rapid7 platform-level logs. These logs are submitted to Datadog. **Note:** Submission of these logs may incur extra fees based on your Datadog pricing plan, as described in the [Datadog Log Management pricing structure](https://www.datadoghq.com/pricing/?product=log-management#log-management). These logs are typically composed of Rapid7 endpoint agent summaries and the statuses of their processes at a given time. 

### Dashboards
1. This integration comes with an out-of-the-box dashboard that summarizes Rapid 7 Investigations
2. This integration also includes an example dashboard based on logs. This dashboard is available upon installation of the integration, but it requires creating a facet for the R7 log source in order to begin seeing data flow.

### Events
This integration generates Datadog events for new open/closed investigations. The integration tracks the state of an investigation based on its ID and aggregates the open and close events generated together.

### Metrics
The count of logs processed per check is reported as a metric.

### Log Collection
Log collection is optional and disabled by default.
This integration calls to Rapid7 logs API to query all logs available in the last time interval. The default time interval is the last minute. You can specify 
specific [Log Sets][4] as detailed in Rapid7 insightIDR [Log Search Documentation][5] to get only those logs.

## Support
For support or feature requests, contact RapDev.io through the following channels:

- Support: support@rapdev.io
- Sales: sales@rapdev.io
- Chat: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- Phone: 855-857-0222

---
Made with ❤️ in Boston

*This isn't the integration you're looking for? Missing a critical feature for your organization? Drop RapDev a [note](mailto:support@rapdev.io), and we'll build it!!*

[1]: https://insight.rapid7.com/platform#/apiKeyManagement/organization
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[4]: https://us.idr.insight.rapid7.com/op/D8A1412BEA86A11F15E5#/search
[5]: https://docs.rapid7.com/insightidr/log-search/

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/rapdev-rapid7" target="_blank">Click Here</a> to purchase this application.
