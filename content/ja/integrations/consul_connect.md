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
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- network
- ログの収集
- containers
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/consul_connect/README.md
display_on_public_website: true
draft: false
git_integration_title: consul_connect
integration_id: consul-connect
integration_title: Consul Connect
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: consul_connect
public_title: Consul Connect
short_description: Consul Connect Envoy サイドカープロキシを監視します。
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
  description: Consul Connect Envoy サイドカープロキシを監視します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Consul Connect
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

[Datadog Envoy インテグレーション][2]で、[Consul Connect][1] Envoy サイドカープロキシを監視します。Consul Connect インテグレーションは [Envoy で構成された Consul Connect][3]のみをサポートしています。

## 計画と使用

### インフラストラクチャーリスト

Consul Connect を実行しているサービスで [Datadog Agent][4] をインストールし、適切な環境の[コンフィギュレーション](#configuration)手順に従います。

### ブラウザトラブルシューティング
ホストで実行中の Agent でこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#コンテナ化)セクションを参照してください。

{{< tabs >}}
{{% tab "ホスト" %}}

#### メトリクスベース SLO

ホストで実行中の Agent に対してこのチェックを構成するには

##### メトリクスの収集
1. Consul Connect でコンフィグオプション [`-admin-bind`][1] を有効にし、Envoy Admin API が公開されるポートを構成します。

2. [Envoy インテグレーション][2]を有効にしてメトリクスの収集を有効にします。

##### 収集データ

[Envoy ホスト][3]の手順に従いログ収集を構成します。

[1]: https://www.consul.io/commands/connect/envoy#admin-bind
[2]: https://docs.datadoghq.com/ja/integrations/envoy/?tab=host#metric-collection
[3]: https://docs.datadoghq.com/ja/integrations/envoy/?tab=host#log-collection
{{% /tab %}}
{{% tab "コンテナ化" %}}

#### コンテナ化

[Envoy コンテナ化手順][1]に従い、Datadog Agent を Envoy 用に構成します。

##### メトリクスの収集

1. Consul Connect でコンフィグオプション [`envoy_stats_bind_addr`][2] を有効にし、公開ネットワークで `/stats` エンドポイントが公開されるようにします。

 2. [Envoy インテグレーションをコンテナ化環境用][3]に構成し、メトリクスの収集を開始します。

##### 収集データ

[Envoy コンテナ化手順][4]に従いログ収集を構成します。

[1]: https://docs.datadoghq.com/ja/integrations/envoy/?tab=containerized#containerized
[2]: https://www.consul.io/docs/connect/proxies/envoy#envoy_stats_bind_addr
[3]: https://docs.datadoghq.com/ja/integrations/envoy/?tab=containerized#metric-collection
[4]: https://docs.datadoghq.com/ja/integrations/envoy/?tab=containerized#log-collection
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][5]し、Checks セクションで `envoy` を探します。

## リアルユーザーモニタリング

### データセキュリティ

収集されたメトリクスのリストについては、[Envoy インテグレーションドキュメント][6]を参照してください。

### ヘルプ

収集されたサービスチェックのリストについては、[Envoy インテグレーションドキュメント][7]を参照してください。

### ヘルプ

Consul Connect には、イベントは含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。


[1]: https://www.consul.io/docs/connect#connect
[2]: https://docs.datadoghq.com/ja/integrations/envoy/
[3]: https://www.consul.io/docs/connect/proxies/envoy#envoy-integration
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?#agent-status-and-information
[6]: https://docs.datadoghq.com/ja/integrations/envoy/?tab=host#metrics
[7]: https://docs.datadoghq.com/ja/integrations/envoy/?tab=host#service-checks
[8]: https://docs.datadoghq.com/ja/help/