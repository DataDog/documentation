---
"app_id": "neoload"
"app_uuid": "3d16e6da-7ac2-47b4-95c0-0d221686f05a"
"assets":
  "dashboards":
    "NeoLoad Performance Testing": assets/dashboards/neoload_overview.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": true
    "metrics":
      "check": NeoLoad.Controller.User.Load
      "metadata_path": metadata.csv
      "prefix": NeoLoad.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10317"
    "source_type_name": neoload
  "logs": {}
"author":
  "homepage": "https://www.tricentis.com/products/performance-testing-neoload"
  "name": Tricentis
  "sales_email": sales@tricentis.com
  "support_email": support@tricentis.com
"categories":
- notifications
- testing
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/neoload/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "neoload"
"integration_id": "neoload"
"integration_title": "NeoLoad"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "neoload"
"public_title": "NeoLoad"
"short_description": "Monitor and Analyze NeoLoad Performance Test Results"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Notifications"
  - "Category::Testing"
  - "Offering::Integration"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Monitor and Analyze NeoLoad Performance Test Results
  "media":
  - "caption": NeoLoad Performance Testing dashboard
    "image_url": images/neoload-dashboard.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": NeoLoad
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

[Tricentis NeoLoad][1] simplifies and scales performance testing for APIs and microservices, as well as end-to-end application testing through protocol and browser-based capabilities.

With the NeoLoad integration, you can track NeoLoad test performance metrics to:

- Correlate application performance with load testing metrics in NeoLoad.
- Analyze and visualize NeoLoad metrics in Datadog like throughput, errors, and performance using the out-of-the-box dashboard or [Metrics Explorer][2].

## Setup

### Configuration

For detailed instructions on NeoLoad configuration, follow the [NeoLoad documentation][3]. Since NeoLoad version 9.1, you can choose which metrics to send in the **Push Counters** configuration of the Datadog Connector in NeoLoad.

Install the NeoLoad integration in Datadog to add the default NeoLoad dashboard to your dashboard list.


## Data Collected

### Metrics
{{< get-metrics-from-git "neoload" >}}


### Events

All NeoLoad performance tests events are sent to your [Datadog Events Explorer][5].
NeoLoad sends events to the Datadog API when a performance test starts and ends.
Set the option in the **Push Counters** configuration of the Datadog Connector in NeoLoad. Available since NeoLoad 9.1.

## Troubleshooting

Need help? Contact [Datadog support][6] or [Tricentis NeoLoad support][7].

[1]: https://www.tricentis.com/products/performance-testing-neoload
[2]: /metrics/explorer
[3]: https://documentation.tricentis.com/neoload/latest/en/content/reference_guide/datadog.htm
[4]: https://github.com/DataDog/integrations-extras/blob/master/neoload/metadata.csv
[5]: https://docs.datadoghq.com/events/
[6]: https://docs.datadoghq.com/help/
[7]: https://support-hub.tricentis.com/

