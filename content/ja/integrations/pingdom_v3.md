---
"app_id": "pingdom-v3"
"app_uuid": "d7f6a5a2-9614-45f1-9022-2ca1eba7bd5c"
"assets":
  "integration":
    "auto_install": false
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": pingdom.response_time
      "metadata_path": metadata.csv
      "prefix": pingdom.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "615"
    "source_type_name": Pingdom
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- metrics
- notifications
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "pingdom_v3"
"integration_id": "pingdom-v3"
"integration_title": "Pingdom"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "pingdom_v3"
"public_title": "Pingdom"
"short_description": "See Pingdom-collected uptimes, response times, and alerts in Datadog."
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Category::Metrics"
  - "Category::Notifications"
  "configuration": "README.md#Setup"
  "description": See Pingdom-collected uptimes, response times, and alerts in Datadog.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Troubleshooting"
  "title": Pingdom
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Overview

Track Pingdom user-centric performance metrics in Datadog, for correlation with other relevant events and metrics.

Pingdom V3 Integration acts similarly to the [Datadog Pingdom Integration (Deprecated)][1] but uses version 3.1 of the [Pingdom API][2].

{{< img src="integrations/pingdom/pingdom_dashboard.png" alt="Pingdom graphs on a Datadog dashboard" popup="true">}}

## Setup

### Generate API Token

1. Login to your [Pingdom account][3].
2. Navigate to _Settings_ > _Pingdom API_.
3. Click _Add API token_. Give the token a name and _Read-Write_ permissions. Save the token somewhere as you will not be able to access it again.

### Installation and configuration

1. Open the [Pingdom V3 Integration Tile][4].
2. Enter the name and API Token into the corresponding fields. Metrics and checks configured in Pingdom are collected into Datadog.
3. Manage tags of checks in Pingdom. Tags added to a check in Pingdom are automatically added to a check in Datadog. Exclude checks by adding the `datadog-exclude` tag. 

## Data Collected

### Metrics
{{< get-metrics-from-git "pingdom_v3" >}}


### Events

The Pingdom integration does not include any events.

### Service Checks

The Pingdom integration pulls in transaction checks and reports them as service checks.

For the `pingdom.status` check, Pingdom transaction check results correlate to Datadog service check results as follows:

| Datadog status | Pingdom status      |
| -------------- | ------------------- |
| `OK`           | `up`                |
| `CRITICAL`     | `down`              |
| `WARNING`      | `unconfirmed_down`  |
| `UNKNOWN`      | `unknown`, `paused` |

## Troubleshooting

Need help? Contact [Datadog support][6].

[1]: https://docs.datadoghq.com/integrations/pingdom/
[2]: https://docs.pingdom.com/api/
[3]: https://my.pingdom.com/
[4]: https://app.datadoghq.com/account/settings#integrations/pingdom-v3
[5]: https://github.com/DataDog/integrations-internal-core/blob/main/pingdom/metadata.csv
[6]: https://docs.datadoghq.com/help

