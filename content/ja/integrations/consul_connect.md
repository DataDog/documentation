---
app_id: consul-connect
app_uuid: 580ac585-9e97-4b4f-ba56-34dba5050e06
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10174
    source_type_name: Consul Connect
  logs:
    source: envoy
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- network
- log collection
- containers
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/consul_connect/README.md
display_on_public_website: true
draft: false
git_integration_title: consul_connect
integration_id: consul-connect
integration_title: Consul Connect
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: consul_connect
public_title: Consul Connect
short_description: Monitor Consul Connect Envoy sidecar proxies.
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Network
  - Category::Log Collection
  - Category::Containers
  configuration: README.md#Setup
  description: Monitor Consul Connect Envoy sidecar proxies.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Consul Connect
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

Monitor your [Consul Connect][1] Envoy sidecar proxies with the [Datadog Envoy Integration][2]. The Consul Connect integration only supports [Consul Connect configured with Envoy][3]. 

## セットアップ

### インストール

Install the [Datadog Agent][4] on your services running Consul Connect and follow the [Configuration](#configuration) instructions for your appropriate environment.

### 構成
Follow the instructions below to configure this check for an Agent running on a host. For containerized environments, see the [Containerized](#containerized) section.

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

To configure this check for an Agent running on a host:

##### Metric collection
1. In Consul Connect, enable the config option [`-admin-bind`][1] to configure the port where the Envoy Admin API is exposed.

2. Enable the [Envoy integration][2] to configure metric collection.

##### Log collection

Follow the [Envoy host][3] instructions to configure log collection.  

[1]: https://www.consul.io/commands/connect/envoy#admin-bind
[2]: https://docs.datadoghq.com/ja/integrations/envoy/?tab=host#metric-collection
[3]: https://docs.datadoghq.com/ja/integrations/envoy/?tab=host#log-collection
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

Follow the [Envoy containerized instructions][1] to configure your Datadog Agent for Envoy. 

##### Metric collection

1. In Consul Connect, enable the config option [`envoy_stats_bind_addr`][2] to ensure the `/stats` endpoint is exposed on the public network.

 2. Configure the [Envoy integration for containerized environments][3] to start collecting metrics. 

##### Log collection

Follow the [Envoy containerized instructions][4] to configure log collection.

[1]: https://docs.datadoghq.com/ja/integrations/envoy/?tab=containerized#containerized
[2]: https://www.consul.io/docs/connect/proxies/envoy#envoy_stats_bind_addr
[3]: https://docs.datadoghq.com/ja/integrations/envoy/?tab=containerized#metric-collection
[4]: https://docs.datadoghq.com/ja/integrations/envoy/?tab=containerized#log-collection
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's status subcommand][5] and look for `envoy` under the Checks section.

## 収集データ

### メトリクス

See the [Envoy Integration documentation][6] for a list of metrics collected. 

### サービスチェック

See the [Envoy Integration documentation][7] for the list of service checks collected. 

### イベント

Consul Connect does not include any events.

## トラブルシューティング

Need help? Contact [Datadog support][8].


[1]: https://www.consul.io/docs/connect#connect
[2]: https://docs.datadoghq.com/ja/integrations/envoy/
[3]: https://www.consul.io/docs/connect/proxies/envoy#envoy-integration
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?#agent-status-and-information
[6]: https://docs.datadoghq.com/ja/integrations/envoy/?tab=host#metrics
[7]: https://docs.datadoghq.com/ja/integrations/envoy/?tab=host#service-checks
[8]: https://docs.datadoghq.com/ja/help/