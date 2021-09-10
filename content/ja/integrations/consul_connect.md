---
assets:
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - network
  - ログの収集
  - containers
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-core/blob/master/consul_connect/README.md
display_name: Consul Connect
draft: false
git_integration_title: consul_connect
guid: 9eb2d74b-32df-41f3-9248-bc87ccdda983
integration_id: consul-connect
integration_title: Consul Connect
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: consul_connect.
metric_to_check: ''
name: consul_connect
public_title: Consul Connect
short_description: Consul Connect Envoy サイドカープロキシを監視します。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

[Datadog Envoy インテグレーション][2]で、[Consul Connect][1] Envoy サイドカープロキシを監視します。現在、Consul Connect インテグレーションは [Envoy で構成された Consul Connect][3]のみをサポートしています。

## セットアップ

### インストール

Consul Connect を実行しているサービスで Datadog Agent をインストールし、適切な環境の[コンフィギュレーション](#configuration)手順に従います。

### コンフィギュレーション
ホストで実行中の Agent でこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#コンテナ化)セクションを参照してください。

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

##### メトリクスの収集
1. Consul Connect でコンフィグオプション [`-admin-bind`][1] を有効にし、Envoy Admin API が公開されるポートを構成します。

2. [Envoy インテグレーション][2]を有効にしてメトリクスの収集を有効にします。

##### ログの収集
[Envoy ホスト][3]の手順に従いログ収集を構成します。

[1]: https://www.consul.io/commands/connect/envoy#admin-bind
[2]: https://docs.datadoghq.com/ja/integrations/envoy/?tab=host#metric-collection
[3]: https://docs.datadoghq.com/ja/integrations/envoy/?tab=host#log-collection
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

[Envoy コンテナ化手順][1]に従い、Datadog Agent を Envoy 用に構成します。

##### メトリクスの収集
1. Consul Connect でコンフィグオプション [`envoy_stats_bind_addr`][2] を有効にし、公開ネットワークで `/stats` エンドポイントが公開されるようにします。

 2. [Envoy インテグレーションをコンテナ化環境手順用][3]に構成し、メトリクスの収集を開始します。

##### ログの収集
[Envoy コンテナ化手順][4]に従いログ収集を構成します。

[1]: https://docs.datadoghq.com/ja/integrations/envoy/?tab=containerized#containerized
[2]: https://www.consul.io/docs/connect/proxies/envoy#envoy_stats_bind_addr
[3]: https://docs.datadoghq.com/ja/integrations/envoy/?tab=containerized#metric-collection
[4]: https://docs.datadoghq.com/ja/integrations/envoy/?tab=containerized#log-collection
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][4]し、Checks セクションで `envoy` を探します。

## 収集データ

### メトリクス

収集されたメトリクスのリストについては、[Envoy インテグレーションドキュメント][5]を参照してください。

### サービスのチェック

収集されたサービスチェックのリストについては、[Envoy インテグレーションドキュメント][6]を参照してください。

### イベント

Consul Connect には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問合せください。


[1]: https://www.consul.io/docs/connect#connect
[2]: https://docs.datadoghq.com/ja/integrations/envoy/
[3]: https://www.consul.io/docs/connect/proxies/envoy#envoy-integration
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?#agent-status-and-information
[5]: https://docs.datadoghq.com/ja/integrations/envoy/?tab=host#metrics
[6]: https://docs.datadoghq.com/ja/integrations/envoy/?tab=host#service-checks
[7]: https://docs.datadoghq.com/ja/help/