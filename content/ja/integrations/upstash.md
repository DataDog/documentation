---
"app_id": "upstash"
"app_uuid": "fe1f17e3-11a4-4e44-b819-8781ebcc86f8"
"assets":
  "dashboards":
    "Upstash-Kafka-Overview": assets/dashboards/upstash_kafka_overview.json
    "Upstash-Overview": assets/dashboards/upstash_overview.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check":
      - upstash.metadata.metric_publish
      "metadata_path": metadata.csv
      "prefix": upstash.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10412"
    "source_type_name": Upstash
  "oauth": assets/oauth_clients.json
"author":
  "homepage": "https://upstash.com"
  "name": Upstash
  "sales_email": sales@upstash.com
  "support_email": support@upstash.com
"categories":
- cloud
- ai/ml
- data stores
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/upstash/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "upstash"
"integration_id": "upstash"
"integration_title": "Upstash"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "upstash"
"public_title": "Upstash"
"short_description": "Visualize metrics for databases and kafka clusters from Upstash"
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
  - "Offering::Integration"
  - "Category::Cloud"
  - "Category::AI/ML"
  - "Category::Data Stores"
  - "Submitted Data Type::Metrics"
  "configuration": "README.md#Setup"
  "description": Visualize metrics for databases and kafka clusters from Upstash
  "media":
  - "caption": Upstash Database Metrics
    "image_url": images/upstash-dashboard.png
    "media_type": image
  - "caption": Upstash Kafka Metrics
    "image_url": images/upstash-kafka-overview-dashboard.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Upstash
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Upstash is a serverless data provider enabling Redis®, Kafka, and messaging/scheduling solutions for a diverse range of applications that provides speed, simplicity, and a seamless developer experience. Upstash uses the Redis and Kafka APIs, and is designed for:

* Serverless functions (AWS Lambda)
* Cloudflare Workers
* Fastly Compute@Edge
* Next.js Edge, Remix, and more
* Client-side web or mobile applications
* AI development
* WebAssembly and other environments where HTTP is preferred over TCP connections

To centralize your monitoring stack and enable a comprehensive view of your data, the Upstash integration sends the following metrics to Datadog:
    * Hit/Miss Rate
    * Read/Write Latency (p99)
    * Keyspace
    * Number of Connections
    * Bandwidth
    * Total Data Size
    * Throughput

## Setup

### Installation

Visit [Upstash][1] to sign up for free. Once registered, visit the [Upstash integration tile][2] in Datadog and install the integration. Once installed, navigate to the **Configure** tab and click **Connect Accounts**. This guides you through the Datadog OAuth flow to grant Upstash access to your database metrics.

## Uninstallation

To remove the Datadog integration from Upstash, navigate to the [Upstash integrations page][3] and click **Remove**. Additionally, uninstall this integration from Datadog by clicking the **Uninstall Integration** button on the [integration tile][2]. Once you uninstall this integration, any previous authorizations are revoked.

Additionally, ensure that all API keys associated with this integration have been disabled by searching for `upstash` on the [API Keys management page][4].

## Data Collected

### Metrics
{{< get-metrics-from-git "upstash" >}}

### Events
The Upstash integration does not include any events.

### Service Checks

The Upstash integration does not include any service checks.

## Support
Need help? Contact [Upstash support][6].

[1]: https://upstash.com
[2]: https://app.datadoghq.com/integrations/upstash
[3]: https://console.upstash.com/integration/datadog
[4]: https://app.datadoghq.com/organization-settings/api-keys?filter=Upstash
[5]: https://github.com/DataDog/integrations-extras/blob/master/upstash/metadata.csv
[6]: mailto:support@upstash.com

