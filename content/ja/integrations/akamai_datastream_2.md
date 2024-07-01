---
"app_id": "akamai-datastream-2"
"app_uuid": "9a772881-d31a-4ffb-92bb-7beef1088a55"
"assets":
  "dashboards":
    "Akamai DataStream 2": assets/dashboards/akamai_datastream_2_overview.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": []
      "metadata_path": metadata.csv
      "prefix": akamai_datastream.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10273"
    "source_type_name": Akamai DataStream 2
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Datadog
  "sales_email": help@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- caching
- log collection
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/akamai_datastream_2/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "akamai_datastream_2"
"integration_id": "akamai-datastream-2"
"integration_title": "Akamai DataStream 2"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "akamai_datastream_2"
"public_title": "Akamai DataStream 2"
"short_description": "Send your Akamai DataStream logs to Datadog"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Caching"
  - "Category::Log Collection"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Send your Akamai DataStream logs to Datadog
  "media": []
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": blog
    "url": "https://www.datadoghq.com/blog/monitor-akamai-datastream2/"
  "support": "README.md#Support"
  "title": Akamai DataStream 2
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Akamai DataStream 2 captures performance, security, and CDN health logs for your properties on the Akamai Intelligent Edge Platform. This integration streams the data in near real-time to Datadog.

You can use Akamai DataStream 2 logs to gain insight into long term trends, resolve performance and security issues, and monitor high-throughput data delivery streams. See the [DataStream 2 documentation][1] for further details and use cases.

## Setup

### Installation

Click **Install Integration** to enable a preset dashboard for viewing Akamai DataStream 2 logs and metrics.

### Configuration

To configure Akamai DataStream 2 to send logs to Datadog, follow [these instructions on the
Akamai techdocs site](https://techdocs.akamai.com/datastream2/docs/stream-datadog), make sure to set the log source to `akamai.datastream` and the log format to `JSON`.

Ensure that you have the Datadog Site selector on the right of the page set to your [Datadog Site][2], and copy the logs endpoint URL below:  

`https://{{< region-param key="http_endpoint" code="true" >}}/v1/input`

### Validation

To validate that this integration is configured properly, [search for logs with the source `akamai.datastream`][3]. You may have to wait a few minutes after configuring the datastream in Akamai before logs are visible in Datadog.

## Data Collected

### Metrics

Akamai DataStream 2 does not include any metrics.

### Service Checks

Akamai DataStream 2 does not include any service checks.

### Events

Akamai DataStream 2 does not include any events.

## Troubleshooting

Need help? Contact [Datadog support][4].

## Further Reading

Additional helpful documentation, links, and articles:

- [Monitor Akamai Datastream 2 with Datadog][2]

[1]: https://techdocs.akamai.com/datastream2/docs
[2]: https://www.datadoghq.com/blog/monitor-akamai-datastream2/
[3]: https://app.datadoghq.com/logs?query=source%3Aakamai.datastream
[4]: https://docs.datadoghq.com/help/

