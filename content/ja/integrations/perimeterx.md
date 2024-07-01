---
"app_id": "perimeterx"
"app_uuid": "47527216-ad8e-454b-8291-494f05c2d5c9"
"assets":
  "dashboards":
    "PerimeterX Overview": assets/dashboards/PerimeterX_Bot_Defender_Dashboard.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": true
    "metrics":
      "check": []
      "metadata_path": metadata.csv
      "prefix": perimeterx.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10105"
    "source_type_name": PerimeterX
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": PerimeterX
  "sales_email": support@perimeterx.com
  "support_email": support@perimeterx.com
"categories":
- log collection
- security
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/perimeterx/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "perimeterx"
"integration_id": "perimeterx"
"integration_title": "PerimeterX"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "perimeterx"
"public_title": "PerimeterX"
"short_description": "Integrate PerimeterX Logs and Metrics with DataDog"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Log Collection"
  - "Category::Security"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Integrate PerimeterX Logs and Metrics with DataDog
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": PerimeterX
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

This integration allows [PerimeterX][1] customers to forward their PerimeterX related logs and events to Datadog.

## Setup

All configuration is done by PerimeterX. See the [PerimeterX documentation][2] regarding third party integrations.

### Installation

No installation is required on your host.

### Configuration

1. Generate a new Integration API Key in your [Datadog portal][3].
2. Open a support ticket with [PerimeterX Support][4] and request the Datadog log export integration. Support needs the following information:
   - Your Datadog Integration API Key
   - Whether you want to send metrics and/or logs
   - The PerimeterX Application ID(s) that should be forwarded to Datadog

### Validation

Once PerimeterX Support has confirmed the Datadog integration is complete, perform the following steps to confirm the integration is working as expected:

1. Login to your Datadog portal.
2. Navigate to Logs -> Search
3. Perform a search with a query filter of "Source:perimeterx"
4. Confirm you are receiving logs from PerimeterX (it may take a few minutes before logs start appearing).

## Data Collected

### Metrics

PerimeterX does not include metrics for [requests][5].

### Service Checks

PerimeterX does not include any service checks.

### Events

PerimeterX does not include any events.

## Troubleshooting

Need help? Contact [Datadog support][6].

[1]: https://www.perimeterx.com/
[2]: https://edocs.humansecurity.com/docs/configuring-the-export-via-portal
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: mailto:support@perimeterx.com
[5]: https://docs.perimeterx.com/pxconsole/docs/data-schema-metrics
[6]: https://docs.datadoghq.com/help/

