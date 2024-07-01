---
"app_id": "datazoom"
"app_uuid": "3c289cc6-b148-4e99-98ae-66c01386f767"
"assets":
  "dashboards":
    "Datazoom Overview": assets/dashboards/datazoom_overview.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": []
      "metadata_path": metadata.csv
      "prefix": datazoom.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10260"
    "source_type_name": Datazoom
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Datadog
  "sales_email": help@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- log collection
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/datazoom/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "datazoom"
"integration_id": "datazoom"
"integration_title": "Datazoom"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "datazoom"
"public_title": "Datazoom"
"short_description": "View Datazoom Collector data in Log Explorer."
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Log Collection"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": View Datazoom Collector data in Log Explorer.
  "media": []
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": blog
    "url": "https://www.datadoghq.com/blog/monitor-datazoom/"
  "support": "README.md#Support"
  "title": Datazoom
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Datazoom is a video data platform that gathers data from endpoints through an ecosystem of collectors.

The [Datazoom Datadog Connector][1] sends collector data to Datadog, where you can query the data in your [Log Explorer][2].

Datazoom sends data set at the INFO level.

## Setup

### Installation

The Datazoom integration emits logs to Datadog. No installation is required on the Datadog side.

### Configuration

- Visit Datazoom's integration [documentation][1] for details on how to configure the Datazoom Datadog Connector.

### Dashboard

See the [Datazoom logs dashboard][3].

## Data Collected

### Metrics

Datazoom does not include any metrics.

### Service Checks

Datazoom does not include any service checks.

### Events

Datazoom does not include any events.

## Troubleshooting

Need help? Contact [Datadog support][4].

## Further Reading

Additional helpful documentation, links, and articles:

- [Blog: Monitor Datazoom telemetry with Datadog][5]

[1]: https://help.datazoom.io/hc/en-us/articles/360042494512-Datadog
[2]: https://app.datadoghq.com/logs
[3]: https://app.datadoghq.com/dashboard/lists/preset/3?q=datazoom
[4]: https://docs.datadoghq.com/help/
[5]: https://www.datadoghq.com/blog/monitor-datazoom/

