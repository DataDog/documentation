---
app_id: purefb
app_uuid: 50ae3c61-a87d-44ee-9917-df981184ff8a
assets:
  dashboards:
    purefb_overview: assets/dashboards/purefb_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: purefb.info
      metadata_path: metadata.csv
      prefix: purefb.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10269
    source_type_name: PureFB
author:
  homepage: https://purestorage.com
  name: Pure Storage
  sales_email: sales@purestorage.com
  support_email: pure-observability@purestorage.com
categories:
- data stores
- OS & システム
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/purefb/README.md
display_on_public_website: true
draft: false
git_integration_title: purefb
integration_id: purefb
integration_title: Pure Storage FlashBlade
integration_version: 1.0.4
is_public: true
kind: integration
manifest_version: 2.0.0
name: purefb
public_title: Pure Storage FlashBlade
short_description: Pure Storage FlashBlade のパフォーマンスと利用状況を監視
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Data Stores
  - Category::OS & System
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Pure Storage FlashBlade のパフォーマンスと利用状況を監視
  media:
  - caption: Pure Storage FlashBlade ダッシュボード - 概要 (上)
    image_url: images/FB-overview-1.png
    media_type: image
  - caption: Pure Storage FlashBlade ダッシュボード - 概要 (中)
    image_url: images/FB-overview-2.png
    media_type: image
  - caption: Pure Storage FlashBlade ダッシュボード - 概要 (下)
    image_url: images/FB-overview-3.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Pure Storage FlashBlade
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

このチェックでは、[Datadog Agent][2] と [Pure Storage FlashBlade OpenMetrics エクスポーター][3]を通して [Pure Storage FlashBlade][1] を監視します。

このインテグレーションにより、アレイ、クライアント、シェア、バケットレベルのパフォーマンスデータ、および容量と構成の概要情報を提供することができます。

複数の FlashBlade を監視し、それらを 1 つのダッシュボードに集計したり、顧客定義環境ごとにまとめたりすることが可能です。

**このインテグレーションには以下が必要です**。

 - FlashBlade Purity 3.2.x+
 - Datadog Agent v7.26.x+、OpenMetricsBaseCheckV2 を利用するため
 - Python 3
 - Pure Storage FlashBlade OpenMetrics エクスポーターは、コンテナ環境でインストールされ、実行されます。インストール方法は、[Pure Storage GitHub リポジトリ][3]を参照してください。

## 計画と使用

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][4]のガイドを参照してこの手順を行ってください。

### インフラストラクチャーリスト

1. [Datadog Agent をダウンロードして起動][2]します。
2. Pure FlashBlade インテグレーションを手動でインストールします。環境に応じた詳細は、[コミュニティインテグレーションを利用する][5]を参照してください。


#### メトリクスベース SLO

ホスト上で動作している Agent に対してこのチェックを構成するには、`datadog-agent integration install -t datadog-purefb==1.0.4` を実行します。


### ブラウザトラブルシューティング

1. FlashBlade に Read-Only ロールのユーザーを作成し、このユーザー用の API トークンを生成します。

2. PureFB のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `purefb.d/conf.yaml` ファイルに以下の構成ブロックを追加します。使用可能なすべてのコンフィギュレーションオプションについては、サンプル [purefb.d/conf.yaml][6] を参照してください。

**注**: コンフィギュレーションファイルを作成する際には、最低限 `/array` エンドポイントが必要です。

```yaml
init_config:
   timeout: 120

instances:

  - openmetrics_endpoint: http://<exporter_ip_or_fqdn>:<port>/metrics/array?endpoint=<array_ip_or_fqdn>
    tags:
       - env:<env>
       - fb_array_name:<full_fqdn>
       - host:<full_fqdn>
    headers:
       Authorization: Bearer <api_token>
    min_collection_interval: 120

  - openmetrics_endpoint: http://<exporter_ip_or_fqdn>:<port>/metrics/clients?endpoint=<array_ip_or_fqdn>
    tags:
       - env:<env>
       - fb_array_name:<full_fqdn>
       - host:<full_fqdn>
    headers:
       Authorization: Bearer <api_token>
    min_collection_interval: 600

  - openmetrics_endpoint: http://<exporter_ip_or_fqdn>:<port>/metrics/usage?endpoint=<array_ip_or_fqdn>
    tags:
       - env:<env>
       - fb_array_name:<full_fqdn>
       - host:<full_fqdn>
    headers:
       Authorization: Bearer <api_token>
    min_collection_interval: 600

```

2. [Agent を再起動します][7]。

### 検証

[Agent の status サブコマンドを実行][8]し、Checks セクションの `purefb` を探します。

### ヘルプ

#### ダッシュボードにアレイが表示されない

このインテグレーションに含まれるダッシュボードでは、`env`、`host`、`fb_array_name` というタグが使用されます。これらはインスタンスごとに設定されていることを確認してください。

```yaml
 tags:
    - env:<env>
    - fb_array_name:<full_fqdn>
    - host:<full_fqdn>
```

#### 収集間隔を長くする

`/array` エンドポイントの場合、Pure Storage FlashBlade のチェックでは、デフォルトで `min_collection_interval` が `120` に設定されており、推奨される最小値は `15` です。必要に応じて `purefb.d/conf.yaml` ファイルで `min_collection_interval` を増やしたり減らしたりすることができます。

```yaml
min_collection_interval: 120
```

`/clients`、および `/usage` エンドポイントの場合、Pure Storage FlashBlade のチェックでは、デフォルトで `min_collection_interval` が `600` に設定されており、推奨される最小値は `120` です。必要に応じて `purefb.d/conf.yaml` ファイルで `min_collection_interval` を増やしたり減らしたりすることができます。

```yaml
min_collection_interval: 600
```


## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "purefb" >}}


### ヘルプ

PureFB インテグレーションには、イベントは含まれません。

### ヘルプ

このインテグレーションによって提供されるサービスチェックのリストについては、[service_checks.json][10] を参照してください。

## Agent

サポートまたは機能リクエストをご希望の場合は、以下の方法で Pure Storage にお問い合わせください。
* メール: pure-observability@purestorage.com
* Slack: [Pure Storage Code// Observability Channel][11]

[1]: https://www.purestorage.com/products.html
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/PureStorage-OpenConnect/pure-fb-openmetrics-exporter
[4]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[5]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent
[6]: https://github.com/DataDog/integrations-extras/blob/master/purefb/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-extras/blob/master/purefb/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/purefb/assets/service_checks.json
[11]: https://code-purestorage.slack.com/messages/C0357KLR1EU