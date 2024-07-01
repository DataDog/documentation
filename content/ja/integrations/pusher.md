---
"app_id": "pusher"
"app_uuid": "5ee7a117-c7d9-4389-ab02-1566c904a896"
"assets":
  "dashboards":
    "pusher": "assets/dashboards/pusher_dashboard.json"
  "integration":
    "auto_install": true
    "events":
      "creates_events": false
    "metrics":
      "check":
      - "pusher.messages"
      "metadata_path": "metadata.csv"
      "prefix": "pusher."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "165"
    "source_type_name": "Pusher"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "metrics"
- "message queues"
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "pusher"
"integration_id": "pusher"
"integration_title": "Pusher"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "pusher"
"public_title": "Pusher"
"short_description": "Get metrics from Pusher into Datadog to see and monitor app engagement."
"supported_os": []
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Metrics"
  - "Category::Message Queues"
  "configuration": "README.md#Setup"
  "description": "Get metrics from Pusher into Datadog to see and monitor app engagement."
  "media": []
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": "blog"
    "url": "https://www.datadoghq.com/blog/pusher-monitoring/"
  "support": "README.md#Support"
  "title": "Pusher"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
{{< img src="integrations/pusher/pusher_dashboard.png" alt="Pusher dashboard" popup="true">}}

## Overview

Monitor your realtime messages and connection analytics across your Pusher apps:

- Visualize concurrent connections in realtime.
- Track messages sent by type, including broadcast, client events, webhooks, and API messages.
- Get a statistical breakdown of message size, including average, median, max, and 95th percentile.
- Monitor usage within billing timetables.

## Setup

### Installation

In order to monitor your metrics from Pusher:

1. Copy your [Datadog API key][1].

2. Go to your Pusher account settings and select **Datadog Integration** or [sign in][2].

3. Paste your Datadog API key and click **Save**.

4. Return to your Datadog dashboard to see metrics begin to populate the default Pusher dashboard view.

<div class="alert alert-info">
Metrics populate in real time. Your historical data populates once your integration is successfully installed.
</div>

## Data Collected

### Metrics
{{< get-metrics-from-git "pusher" >}}


### Events

The Pusher integration does not include any events.

### Service Checks

The Pusher integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][4].

## Further Reading

Additional helpful documentation, links, and articles:

- [Introducing real-time monitoring for Pusher][5]

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://dashboard.pusher.com/accounts/sign_in
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/pusher/pusher_metadata.csv
[4]: https://docs.datadoghq.com/help/
[5]: https://www.datadoghq.com/blog/pusher-monitoring/

