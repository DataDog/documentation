---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "moogsoft"
"app_uuid": "db3d32c6-1127-4bd5-b270-01aa573616b7"
"assets":
  "dashboards":
    "Moogsoft Overview": assets/dashboards/moogsoft_overview.json
  "integration":
    "auto_install": false
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": moogsoft.incident.count
      "metadata_path": metadata.csv
      "prefix": moogsoft.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10151"
    "source_type_name": Moogsoft
"author":
  "homepage": "https://moogsoft.com"
  "name": Moogsoft
  "sales_email": subscriptions@moogsoft.com
  "support_email": support@moogsoft.com
  "vendor_id": moogsoft
"categories":
- automation
- incidents
- marketplace
- notifications
- ai/ml
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "moogsoft"
"integration_id": "moogsoft"
"integration_title": "Moogsoft"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/eula.pdf
"manifest_version": "2.0.0"
"name": "moogsoft"
"pricing":
- "billing_type": tag_count
  "includes_assets": true
  "metric": datadog.marketplace.moogsoft
  "product_id": cloud
  "short_description": Pricing tiers based on event/metric volumes
  "tag": core
  "unit_label": Moogsoft Event or 500 Moogsoft Metrics
  "unit_price": !!float "0.05"
"public_title": "Moogsoft"
"short_description": "Advanced self-servicing AI-driven observability platform"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Automation"
  - "Category::Incidents"
  - "Category::Marketplace"
  - "Category::Notifications"
  - "Category::AI/ML"
  - "Offering::Integration"
  - "Offering::Software License"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Submitted Data Type::Metrics"
  - "Submitted Data Type::Incidents"
  "configuration": "README.md#Setup"
  "description": Advanced self-servicing AI-driven observability platform
  "media":
  - "caption": Moogsoft Correlation
    "image_url": images/moogsoft.correlation.png
    "media_type": image
  - "caption": Moogsoft Dashboard
    "image_url": images/moogsoft.dashboard.png
    "media_type": image
  - "caption": Moogsoft Incident Correlation
    "image_url": images/moogsoft.main.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Moogsoft
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

Easily integrate Datadog and Moogsoft for combined AI monitoring and observability power!  Whether you are completely digital or have legacy applications, or a hybrid of both, this solution reduces the alert noise and improves operational efficiency across teams and IT Operations.

Moogsoft provides an advanced self-servicing AI-driven observability platform that allows software engineers, developers, and operations to instantly see everything, know what's wrong, and fix things faster.

Moogsoft delivers an enterprise-class, cloud-native platform that empowers customers to drive adoption at their own pace at a much lower cost.

### Observe

Improve service delivery quality. We only elevate critical situations, so you and your team can move swiftly, stay focused, and resolve incidents before they cause outages.

### Monitor

Watch alert volumes go down and see productivity go up. We help eliminate event fatigue with a consolidated monitoring panel and by correlating similar events to significantly minimize actionable alerts.

### Collaborate

See everything in one view. We aggregate all of your apps, services, and infrastructure alerts to a single console for increased agility, fewer alerts, and faster resolution times.

### Moogsoft Data Flow

Data flows through Moogsoft gaining context and reducing noise at each step. Metrics become events, events become stateful alerts, and alerts are correlated into incidents.

## Support
Contact Moogsoft Support at [https://support.moogsoft.com][1].

[1]: https://support.moogsoft.com

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/moogsoft" target="_blank">Click Here</a> to purchase this application.
