---
"app_id": "speedscale"
"app_uuid": "35e3ad0c-9189-4453-b3c3-2b4aefa7c176"
"assets":
  "dashboards":
    "speedscale": assets/dashboards/SpeedscaleOverview.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": true
    "metrics":
      "check": []
      "metadata_path": metadata.csv
      "prefix": speedscale.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10271"
    "source_type_name": Speedscale
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Speedscale
  "sales_email": support@speedscale.com
  "support_email": support@speedscale.com
"categories":
- containers
- kubernetes
- orchestration
- testing
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/speedscale/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "speedscale"
"integration_id": "speedscale"
"integration_title": "Speedscale"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "speedscale"
"public_title": "Speedscale"
"short_description": "Publish traffic replay results from Speedscale into Datadog."
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Containers"
  - "Category::Kubernetes"
  - "Category::Orchestration"
  - "Category::Testing"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Publish traffic replay results from Speedscale into Datadog.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Speedscale
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## Overview

This integration publishes traffic replay results from [Speedscale][1] into Datadog. This lets you combine your observability data from Datadog with the results of a particular Speedscale replay to investigate the root cause of poor performance. Find and troubleshoot potential performance issues before they show up in production with the Speedscale Datadog integration.

## Setup

### Configuration

1. To use this integration you need a Datadog [API Key][2] so that events can be submitted into Datadog.

    A best practice is to save this value into an environment variable. Most likely you will store this environment variable in your continuous integration system, but when doing a one-off test you can access it in your terminal like so:

   ```
   export DDOG_API_KEY=0
   ```

2. Gather the report ID of a specific report that you'd like to upload to Datadog. When working with continuous integration, get the report ID associated with your commit hash. Store this report ID in an environment variable:

   ```
   export SPD_REPORT_ID=0
   ```

3. With the specific report ID and the Datadog API key, run the `speedctl` command to export that traffic replay report as a Datadog event.

   ```
   speedctl export datadog ${SPD_REPORT_ID} --apiKey ${DDOG_API_KEY}
   {"status":"ok",...}
   ```
### Validation

View the Datadog [Event Stream][2] to see your exported report.

## Data Collected

### Metrics

Speedscale does not include any metrics.

### Service Checks

Speedscale does not include any service checks.

### Events

The Speedscale integration sends events to your [Datadog Event Stream][3] when a traffic replay is complete to help you understand the impact this has on your metrics.

## Troubleshooting

Need help? Contact [Datadog support][4].

[1]: https://docs.speedscale.com/reference/integrations/datadog/
[2]: https://docs.datadoghq.com/account_management/api-app-keys/
[3]: https://app.datadoghq.com/event/stream
[4]: https://docs.datadoghq.com/help/

