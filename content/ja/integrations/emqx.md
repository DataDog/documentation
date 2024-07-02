---
"app_id": "emqx"
"app_uuid": "fa40ec7e-e8f6-4c4b-a675-31716b23a9df"
"assets":
  "dashboards":
    "EMQX Overview": assets/dashboards/overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check":
      - emqx.cluster.nodes_running
      "metadata_path": metadata.csv
      "prefix": emqx.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "6726047"
    "source_type_name": emqx
"author":
  "homepage": "https://www.emqx.com/en"
  "name": EMQX
  "sales_email": contact@emqx.io
  "support_email": contact@emqx.io
"categories":
- モニター
- iot
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/emqx/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "emqx"
"integration_id": "emqx"
"integration_title": "EMQX"
"integration_version": "1.1.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "emqx"
"public_title": "EMQX"
"short_description": "Collect performance, health data, message throughput and message latency on MQTT brokers, and more."
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
  - "Category::IoT"
  - "Submitted Data Type::Metrics"
  "configuration": "README.md#Setup"
  "description": Collect performance, health data, message throughput and message latency on MQTT brokers, and more.
  "media":
  - "caption": EMQX Broker Metrics in Datadog dashboard(1)
    "image_url": images/emqx-overview-1.png
    "media_type": image
  - "caption": EMQX Broker Metrics in Datadog dashboard(2)
    "image_url": images/emqx-overview-2.png
    "media_type": image
  - "caption": EMQX Broker Metrics in Datadog dashboard(3)
    "image_url": images/emqx-overview-3.png
    "media_type": image
  - "caption": EMQX Broker Metrics in Datadog dashboard(4)
    "image_url": images/emqx-overview-4.png
    "media_type": image
  - "caption": EMQX Broker Metrics in Datadog dashboard(5)
    "image_url": images/emqx-overview-5.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": EMQX
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

[EMQX][1] is a highly scalable, open-source MQTT broker designed for IoT (Internet of Things). MQTT stands for Message Queuing Telemetry Transport, which is a lightweight, publish-subscribe network protocol that transports messages between devices.

**Key features of EMQX:**
- Scalability: EMQX can handle millions of concurrent MQTT connections, making it suitable for IoT applications that require handling a large number of devices.
- Reliability: It provides stable and reliable message delivery, ensuring that data is successfully transferred between devices and servers.
- Low latency: Designed for scenarios requiring low-latency communication.
- High throughput: Capable of processing a high volume of messages efficiently.
- Clustering: EMQX can be deployed in a distributed cluster to enhance performance and reliability.


The integration of EMQX with Datadog enriches monitoring capabilities, providing valuable insights into the performance and health of MQTT brokers. This is especially beneficial in IoT applications where efficient, reliable, and real-time data transmission is critical.

**Types of data sent to Datadog:**
- Metrics: This includes performance metrics like message throughput (messages sent/received per second), number of connected clients and more.

- Node performance: Monitoring individual node performance in a cluster, such as latency, load, and operational metrics.

- Operational health: Data about the health of the MQTT broker, including, error rates, and other critical indicators.


## セットアップ

### インストール

Manually install the EMQX check (note that [instructions may change based on your environment][2]):

Run `datadog-agent integration install -t datadog-emqx==1.1.0`.

### 構成

1. Edit the `emqx/conf.yaml` file, located in the `conf.d/` folder at the root of your Agent's configuration directory, to start collecting your EMQX performance data.

2. [Restart the Agent][3].

### Validation

[Run the Agent's status subcommand][4] and look for `emqx` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "emqx" >}}


### イベント

EMQX does not include any events.

## トラブルシューティング

Need help? Contact [EMQX support][7].

[1]: https://github.com/emqx/emqx
[2]: https://docs.datadoghq.com/agent/guide/community-integrations-installation-with-docker-agent
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[5]: https://github.com/DataDog/integrations-extras/blob/master/emqx/metadata.csv
[6]: https://github.com/DataDog/integrations-extras/blob/master/emqx/assets/service_checks.json
[7]: https://www.emqx.com/en/support

