---
"app_id": "gremlin"
"app_uuid": "451a4863-1767-4c11-8831-d196ae4643d0"
"assets":
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": true
    "metrics":
      "check": []
      "metadata_path": metadata.csv
      "prefix": gremlin.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10031"
    "source_type_name": Gremlin
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Gremlin
  "sales_email": support@gremlin.com
  "support_email": support@gremlin.com
"categories":
- issue tracking
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/gremlin/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "gremlin"
"integration_id": "gremlin"
"integration_title": "Gremlin"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "gremlin"
"public_title": "Gremlin"
"short_description": "Send events occurring in Gremlin to Datadog"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Issue Tracking"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Send events occurring in Gremlin to Datadog
  "media": []
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": blog
    "url": "https://www.datadoghq.com/blog/gremlin-datadog/"
  "support": "README.md#Support"
  "title": Gremlin
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

View, rerun, and halt Gremlin attacks directly from Datadog!

Pairing Gremlin with Datadog's [Events][1] is an effective way to add failure-testing context to your Datadog workflows.

- Overlay attack events on top of your dashboards to pinpoint exactly how and when Gremlin is impacting your metrics.
- Show, Rerun, and Halt Gremlin attacks from your Datadog [Event Stream][2]

![snapshot][3]

## Setup

### Configuration

To activate this integration, you need to pass your Datadog API key to Gremlin. This is done on the [Integrations Page][4], by clicking the **Add** button on the row for **Datadog**. You are prompted for your **Datadog API key**. Once entered, the integration is initialized.

- API key: <span class="hidden-api-key">\${api_key}</span>

You should start seeing events from this integration in your [Event Stream][2].

## Data Collected

### Metrics

The Gremlin integration does not provide any metrics.

### Events

The Gremlin integration sends events to your [Datadog Event Stream][4] when attacks are started or stopped on Gremlin.

### Service Checks

The Gremlin integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][5].

## Further Reading

Additional helpful documentation, links, and articles:

- [How Gremlin monitors its own Chaos Engineering service with Datadog][6]

[1]: https://docs.datadoghq.com/getting_started/#events
[2]: https://app.datadoghq.com/event/stream
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/gremlin/images/events-overlay.png
[4]: https://app.gremlin.com/settings/integrations
[5]: https://docs.datadoghq.com/help/
[6]: https://www.datadoghq.com/blog/gremlin-datadog/

