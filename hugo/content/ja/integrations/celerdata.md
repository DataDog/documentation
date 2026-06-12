---
app_id: celerdata
app_uuid: 790d8932-0833-43ac-b9d8-d6d0a4f11517
assets:
  dashboards:
    CelerData Default Dashboard: assets/dashboards/CelerData.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: celerdata.fe.job
      metadata_path: metadata.csv
      prefix: celerdata.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10130457
    source_type_name: celerdata
author:
  homepage: https://celerdata.com
  name: CelerData
  sales_email: Sales@celerdata.com
  support_email: support@celerdata.com
categories:
- ログの収集
- data stores
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/celerdata/README.md
display_on_public_website: true
draft: false
git_integration_title: celerdata
integration_id: celerdata
integration_title: CelerData
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: celerdata
public_title: CelerData
short_description: CelerData メトリクスとログを収集します
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Data Stores
  - Offering::Integration
  - Supported OS::Linux
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: CelerData メトリクスとログを収集します
  media:
  - caption: CelerData ダッシュボード
    image_url: images/celerdata-dashboard.png
    media_type: image
  - caption: CelerData ログ
    image_url: images/celerdata-logs.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: CelerData
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

[CelerData][1] は、オープンソースの OLAP データベース StarRocks のエンタープライズ版です。StarRocks/CelerData は、データレイクハウス上で低レイテンシーの分析を直接行うように設計されています。

このインテグレーションにより、ユーザーはメトリクスとログを収集できます。このインテグレーションを利用することで、クエリのパフォーマンス、システムの健全性、リソースの使用状況に関する洞察を得ることができ、データベースの可視性が向上します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

StarRocks の[メトリクス][3]とログを収集するには

1. [Datadog Agent][4] をダウンロードしてインストールします。
2. 次のコマンドを使用して、CelerData チェックをホストにインストールします。

   ```shell
   datadog-agent integration install -t datadog-celerdata==1.0.0
   ```

### 構成

1. メトリクスとログの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `celerdata.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については[celerdata.d/conf.yaml.example][5] を参照してください。

2. Datadog は、`dogstatsd_stats_port` と `expvar_port` をポート 5000 でリッスンしています。`celerdata.conf` ファイルで、`server.discovery.listen_address` と `server.discovery.advertised_address` を 5000 以外のポートを使用するように変更する必要があります。

3. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `celerdata` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "celerdata" >}}


### イベント

CelerData インテグレーションには、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[CelerData サポート][10]までお問い合わせください。

[1]: https://celerdata.com/
[2]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[3]: https://docs.starrocks.io/docs/administration/metrics/
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://github.com/DataDog/integrations-extras/blob/master/celerdata/datadog_checks/celerdata/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/celerdata/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/celerdata/service_checks.json
[10]: mailto:support@celerdata.com