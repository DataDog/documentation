---
"app_id": "lacework"
"app_uuid": "e23af0ca-003e-4b3d-b6c5-24894b710750"
"assets":
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": []
      "metadata_path": metadata.csv
      "prefix": lacework.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10079"
    "source_type_name": Lacework
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Datadog
  "sales_email": help@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- security
- log collection
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/lacework/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "lacework"
"integration_id": "lacework"
"integration_title": "Lacework"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "lacework"
"public_title": "Lacework"
"short_description": "Lacework is security platform for your all your cloud environments"
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
  - "Category::Security"
  - "Category::Log Collection"
  "configuration": "README.md#Setup"
  "description": Lacework is security platform for your all your cloud environments
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Lacework
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Use the Datadog-Lacework integration to forward your Lacework logs and events to Datadog.

## Setup

All configuration happens on Lacework Dashboard. Find details on how to set it up in the [Lacework Documentation][1]. Datadog automatically enables the right logs processing pipeline when it detects Lacework logs.

### Installation

1. In Lacework, go to _Settings_ and select _Integrations_.
2. In the _Outgoing_ section (on the left panel) select Datadog.
3. Fill in the following details:

   - **Name**: Enter a name for the integration. For example, `Datadog-Lacework`.
   - **Datadog Type**: Select the type of logs sent to Datadog:

    | Datadog Type     | Description                                                |
    | ---------------- | ---------------------------------------------------------- |
    | `Logs Details`   | Sends Lacework detailed logs to the Datadog logs platform. |
    | `Logs Summary`   | Sends a Lacework summary to the Datadog logs platform.     |
    | `Events Summary` | Sends a Lacework summary to the Datadog Events platform.   |

   - **Datadog Site**:
     - Select `com` if you use the Datadog US region.
     - Select `eu` if you use the Datadog EU region.
   - **API KEY**: Enter your [Datadog API key][2].
   - **Alert Security Level**: Select the minimum log severity level of forwarded logs

## Data Collected

### Metrics

The Lacework integration does not collect any metrics.

### Service Checks

The Lacework integration does not include any service checks.

### Log collection

The Lacework integration can be configured to send Logs.

### Events

The Lacework integration can be configured to send Events.

## Troubleshooting

Need help? Contact [Datadog support][3].

[1]: https://docs.lacework.net/onboarding/datadog
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://docs.datadoghq.com/help/

