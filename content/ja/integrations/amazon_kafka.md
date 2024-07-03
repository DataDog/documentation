---
app_id: amazon-kafka
app_uuid: e6dc171a-911d-4440-a409-7951eaadf69f
assets:
  dashboards:
    Amazon MSK Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: aws.msk.go.threads
      metadata_path: metadata.csv
      prefix: aws.msk.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10080
    source_type_name: Amazon Kafka
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/amazon_msk/README.md
display_on_public_website: true
draft: false
git_integration_title: amazon_kafka
integration_id: amazon-kafka
integration_title: Amazon MSK (Agent)
integration_version: 4.8.0
is_public: true
manifest_version: 2.0.0
name: amazon_kafka
public_title: Amazon MSK (Agent)
short_description: Monitor the health and performance of your Amazon MSK clusters.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Monitor the health and performance of your Amazon MSK clusters.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon MSK (Agent)
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

Amazon Managed Streaming for Apache Kafka (MSK) is a fully managed service that makes it easy to build and run applications that use Apache Kafka to process streaming data.

You can collect metrics from this integration in two ways-with the [Datadog Agent](#setup) or with a [Crawler][1] that collects metrics from CloudWatch. 

## セットアップ

The Agent check monitors Amazon Managed Streaming for Apache Kafka ([Amazon MSK][2]) through the Datadog Agent.

Follow the instructions below to install and configure this check for an Agent running on a host. For containerized environments, see the [Autodiscovery Integration Templates][3] for guidance on applying these instructions.

This OpenMetrics-based integration has a latest mode (`use_openmetrics`: true) and a legacy mode (`use_openmetrics`: false). To get all the most up-to-date features, Datadog recommends enabling the latest mode. For more information, see [Latest and Legacy Versioning For OpenMetrics-based Integrations][4].

### インストール

1. [Create a client machine][5] if one does not already exist.
2. Ensure the client machine has been [granted][6] the permission policy [arn:aws:iam::aws:policy/AmazonMSKReadOnlyAccess][7] or equivalent [credentials][8] are available.
3. Enable [open monitoring with Prometheus][9] on the MSK side to enable the JmxExporter and the NodeExporter.
4. Install the [Datadog Agent][10] on the client machine just created.

### 構成

1. Edit the `amazon_msk.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your Amazon MSK performance data. 

   Include custom [tags][11] that attach to every metric and service check provided by this integration.

   ```
   tags:
     - <KEY_1>:<VALUE_1>
     - <KEY_2>:<VALUE_2>
   ```

   See the [sample amazon_msk.d/conf.yaml][12] for all available configuration options for the latest mode. For the legacy mode of this integration, see the [legacy example][13].

2. [Restart the Agent][14].

### Validation

[Run the Agent's status subcommand][15] and look for `amazon_msk` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_kafka" >}}


### イベント

The Amazon MSK check does not include any events.

### サービスチェック

See [service_checks.json][17] for a list of service checks provided by this integration.

## トラブルシューティング

Need help? Contact [Datadog support][18].

## Further Reading

Additional helpful documentation, links, and articles:

- [Monitor Amazon Managed Streaming for Apache Kafka with Datadog][19]

[1]: https://docs.datadoghq.com/ja/integrations/amazon_msk
[2]: https://aws.amazon.com/msk
[3]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[4]: https://docs.datadoghq.com/ja/integrations/guide/versions-for-openmetrics-based-integrations
[5]: https://docs.aws.amazon.com/msk/latest/developerguide/create-client-machine.html
[6]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html#attach-iam-role
[7]: https://console.aws.amazon.com/iam/home?#/policies/arn:aws:iam::aws:policy/AmazonMSKReadOnlyAccess
[8]: https://boto3.amazonaws.com/v1/documentation/api/latest/guide/configuration.html#configuring-credentials
[9]: https://docs.aws.amazon.com/msk/latest/developerguide/open-monitoring.html
[10]: https://docs.datadoghq.com/ja/agent/
[11]: https://docs.datadoghq.com/ja/getting_started/tagging/
[12]: https://github.com/DataDog/integrations-core/blob/master/amazon_msk/datadog_checks/amazon_msk/data/conf.yaml.example
[13]: https://github.com/DataDog/integrations-core/blob/7.31.x/amazon_msk/datadog_checks/amazon_msk/data/conf.yaml.example
[14]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[15]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[16]: https://github.com/DataDog/integrations-core/blob/master/amazon_msk/metadata.csv
[17]: https://github.com/DataDog/integrations-core/blob/master/amazon_msk/assets/service_checks.json
[18]: https://docs.datadoghq.com/ja/help/
[19]: https://www.datadoghq.com/blog/monitor-amazon-msk/