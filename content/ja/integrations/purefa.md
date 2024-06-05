---
app_id: purefa
app_uuid: a2d8f393-62cd-4ece-bfab-e30797698b12
assets:
  dashboards:
    purefa_overview: assets/dashboards/purefa_overview.json
    purefa_overview_legacy: assets/dashboards/purefa_overview_legacy.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: purefa.info
      metadata_path: metadata.csv
      prefix: purefa.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10256
    source_type_name: PureFA
author:
  homepage: https://purestorage.com
  name: Pure Storage
  sales_email: sales@purestorage.com
  support_email: pure-observability@purestorage.com
categories:
- data stores
- OS & システム
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/purefa/README.md
display_on_public_website: true
draft: false
git_integration_title: purefa
integration_id: purefa
integration_title: Pure Storage FlashArray
integration_version: 1.2.0
is_public: true
kind: integration
manifest_version: 2.0.0
name: purefa
public_title: Pure Storage FlashArray
short_description: Pure Storage FlashArrays のパフォーマンスと利用状況を監視
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
  description: Pure Storage FlashArrays のパフォーマンスと利用状況を監視
  media:
  - caption: Pure Storage FlashArray ダッシュボード - 概要 (上)
    image_url: images/FA-overview-1.png
    media_type: image
  - caption: Pure Storage FlashArray ダッシュボード - 概要 (中)
    image_url: images/FA-overview-2.png
    media_type: image
  - caption: Pure Storage FlashArray ダッシュボード - 概要 (下)
    image_url: images/FA-overview-3.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Pure Storage FlashArray
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

このチェックでは、[Datadog Agent][2] と [Pure Storage OpenMetrics エクスポーター][3]を通して [Pure Storage FlashArray][1] を監視します。

このインテグレーションにより、アレイ、ホスト、ボリューム、ポッドレベルのパフォーマンスデータ、および容量と構成の概要情報を提供することができます。

複数の FlashArray を監視し、それらを 1 つのダッシュボードに集計したり、顧客定義環境ごとにまとめたりすることが可能です。

**このインテグレーションには以下が必要です**。

 - Agent v7.26.x+、OpenMetricsBaseCheckV2 を利用するため
 - Python 3
 - Pure Storage OpenMetrics エクスポーターは、コンテナ環境でインストールされ、実行されます。インストール方法は、[GitHub リポジトリ][3]を参照してください。

## 計画と使用

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、オートディスカバリーのインテグレーションテンプレートのガイドを参照してこの手順を行ってください。

### インフラストラクチャーリスト

1. [Datadog Agent をダウンロードして起動][2]します。
2. Pure FlashArray インテグレーションを手動でインストールします。環境に応じた詳細は、[コミュニティインテグレーションを利用する][4]を参照してください。


#### メトリクスベース SLO

ホスト上で動作している Agent に対してこのチェックを構成するには、`sudo -u dd-agent -- datadog-agent integration install -t datadog-purefa==<INTEGRATION_VERSION>` を実行します。

注: `<INTEGRATION_VERSION>` は、Datadog Integration Extras の [CHANGELOG.md][5] 内に記載されています。
  * 例: `sudo -u dd-agent -- datadog-agent integration install -t datadog-purefa==1.2.0`

### ブラウザトラブルシューティング

1. FlashArray に Read-Only ロールのローカルユーザーを作成し、このユーザー用の API トークンを生成します。
   ![API キーの生成][6]
2. PureFA のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `purefa.d/conf.yaml` ファイルに以下の構成ブロックを追加します。使用可能なすべてのコンフィギュレーションオプションについては、サンプル [purefa.d/conf.yaml][7] を参照してください。

**注**: コンフィギュレーションファイルを作成する際には、最低限 `/array` エンドポイントが必要です。

```yaml
init_config:
   timeout: 60

instances:

  - openmetrics_endpoint: http://<exporter_ip_or_fqdn>:<port>/metrics/array?endpoint=<array_ip_or_fqdn>
    tags:
       - env:<env>
       - fa_array_name:<full_fqdn>
       - host:<full_fqdn>
    headers:
       Authorization: Bearer <api_token>
    min_collection_interval: 120

  - openmetrics_endpoint: http://<exporter_ip_or_fqdn>:<port>/metrics/volumes?endpoint=<array_ip_or_fqdn>
    tags:
       - env:<env>
       - fa_array_name:<full_fqdn>
    headers:
       Authorization: Bearer <api_token>
    min_collection_interval: 120

  - openmetrics_endpoint: http://<exporter_ip_or_fqdn>:<port>/metrics/hosts?endpoint=<array_ip_or_fqdn>
    tags:
       - env:<env>
       - fa_array_name:<full_fqdn>
    headers:
       Authorization: Bearer <api_token>
    min_collection_interval: 120

  - openmetrics_endpoint: http://<exporter_ip_or_fqdn>:<port>/metrics/pods?endpoint=<array_ip_or_fqdn>
    tags:
       - env:<env>
       - fa_array_name:<full_fqdn>
       - host:<full_fqdn>
    headers:
       Authorization: Bearer <api_token>
    min_collection_interval: 120

  - openmetrics_endpoint: http://<exporter_ip_or_fqdn>:<port>/metrics/directories?endpoint=<array_ip_or_fqdn>
    tags:
       - env:<env>
       - fa_array_name:<full_fqdn>
       - host:<full_fqdn>
    headers:
       Authorization: Bearer <api_token>
    min_collection_interval: 120
```

2. [Agent を再起動します][8]。

### 検証

[Agent の status サブコマンドを実行][9]し、Checks セクションの `purefa` を探します。



### 本インテグレーションの新しいバージョンへのアップグレード

#### PureFA Agent Check 1.0.x から 1.1.x へ

1.1.x では、[Pure Storage OpenMetrics エクスポーター][3]と非推奨の [Pure Storage Prometheus エクスポーター][10]の両方がサポートされています。

非推奨の [Pure Storage Prometheus エクスポーター][10]のダッシュボードは、`Pure FlashArray - Overview (Legacy Exporter)` に名称が変更されました。

各エクスポーターで共有されるメトリクスと固有のメトリクスの一覧は、[metrics.py][11] に記載されています。Pure Storage Prometheus エクスポーター][10]から [Pure Storage OpenMetrics エクスポーター][3]に移行する場合、新しいメトリクス名に合わせてダッシュボードやアラートを更新する必要がある場合があります。ご不明な点がございましたら、 Support タブの情報をもとに Pure Storage にお問い合わせください。

[Pure Storage Prometheus エクスポーター][10]から [Pure Storage OpenMetrics エクスポーター][3]に移行する際、エンドポイント URI に `/flasharray` が含まれないようになりました。

PureFA Agent Check の将来のバージョンでは、Pure Storage Prometheus エクスポーターからのメトリクス名は削除されます。

### ヘルプ

#### ダッシュボードにアレイが表示されない

このインテグレーションに含まれるダッシュボードでは、`env` と `fa_array_name` というタグが使用されます。これらはインスタンスごとに設定されていることを確認してください。また、`purefa.d/conf.yaml` で `/array` と `/pods` のエンドポイントに `host` を設定する必要があります。

```yaml
- tags:
   - env:<env>
   - fa_array_name:<full_fqdn>
   - host:<full_fqdn>
```

#### 収集間隔を長くする

Pure Storage FlashArray のチェックでは、デフォルトで `min_collection_interval` が `120` に設定されており、推奨される最小値は `20` です。必要に応じて `purefa.d/conf.yaml` ファイルで `min_collection_interval` を増やしたり減らしたりすることができます。

```yaml
min_collection_interval: 120
```


## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "purefa" >}}


### ヘルプ

PureFA インテグレーションには、イベントは含まれません。

### ヘルプ

このインテグレーションによって提供されるサービスチェックのリストについては、[service_checks.json][13] を参照してください。

## Agent

サポートまたは機能リクエストをご希望の場合は、以下の方法で Pure Storage にお問い合わせください。
* メール: pure-observability@purestorage.com
* Slack: [Pure Storage Code// Observability Channel][14]

[1]: https://www.purestorage.com/products.html
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/PureStorage-OpenConnect/pure-fa-openmetrics-exporter
[4]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent
[5]: https://github.com/DataDog/integrations-extras/blob/master/purefa/CHANGELOG.md
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/purefa/images/API.png
[7]: https://github.com/datadog/integrations-extras/blob/master/purefa/datadog_checks/purefa/data/conf.yaml.example
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/PureStorage-OpenConnect/pure-exporter
[11]: https://github.com/datadog/integrations-extras/blob/master/purefa/datadog_checks/purefa/metrics.py
[12]: https://github.com/DataDog/integrations-extras/blob/master/purefa/metadata.csv
[13]: https://github.com/DataDog/integrations-extras/blob/master/purefa/assets/service_checks.json
[14]: https://code-purestorage.slack.com/messages/C0357KLR1EU