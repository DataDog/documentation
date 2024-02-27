---
app_id: neo4j
app_uuid: f2657bb8-ded4-48f3-8095-f703cc203149
assets:
  dashboards:
    Neo4j V4 Dashboard: assets/dashboards/Neo4j4.xDefaultDashboard.json
    Neo4j V5 Cluster Dashboard: assets/dashboards/Neo4j5ClusterDashboard.json
    Neo4j V5 Dashboard: assets/dashboards/Neo4j5DefaultDashboard.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: neo4j.dbms.page_cache.hits
      metadata_path: metadata.csv
      prefix: neo4j.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Neo4j
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Neo4j
  sales_email: support@neotechnology.com
  support_email: support@neotechnology.com
categories:
- data store
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/neo4j/README.md
display_on_public_website: true
draft: false
git_integration_title: neo4j
integration_id: neo4j
integration_title: Neo4j
integration_version: 3.0.0
is_public: true
kind: integration
manifest_version: 2.0.0
name: neo4j
public_title: Neo4j
short_description: Neo4j のメトリクスを収集する
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
  - Category::Data Store
  configuration: README.md#Setup
  description: Neo4j のメトリクスを収集する
  media:
  - caption: Neo4j 5 ダッシュボード
    image_url: images/Neo4j_5_Dashboard.png
    media_type: image
  - caption: Neo4j 5 データベース
    image_url: images/neo4j_graph.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Neo4j
---



## 概要

[Neo4j][1] は、ネイティブのグラフストレージ、高度なセキュリティ、スケーラブルな速度最適化アーキテクチャ、ACID コンプライアンスをインテグレーションし、関係ベースのクエリの予測可能性と整合性を確保するエンタープライズ強度の高いグラフデータベースです。Neo4j は、より自然でつながった状態でデータを保存・管理し、データ関係を維持することで、高速なクエリ、分析のためのより深いコンテキスト、そして苦痛のない変更可能なデータモデルを提供します。

Neo4j メトリクスは、データベース管理者が Neo4j のデプロイをモニターできるようにします。DBA は、メモリ使用量 (ヒープとページキャッシュ)、トランザクション数、クラスターのステータス、データベースサイズ (ノード数、関係、プロパティを含む)、クエリパフォーマンスを把握したいと考えます。

このインテグレーションにより、すぐに使えるダッシュボードで Neo4j の重要なメトリクスを視覚化し、DBA が Neo4j データベースのトラブルシューティングと健全性のモニタリングを行えるようになります。

### メトリクス
{{< get-metrics-from-git "neo4j" >}}
ホスト上で動作する Agent の場合。コンテナ環境では、これらの指示を適用するためのガイダンスとして、[オートディスカバリーインテグレーションテンプレート][5]を参照してください。

### インストール

neo4j チェックをホストにインストールするには

1. [Datadog Agent][6] をダウンロードしてインストールします。
2. neo4j チェックをホストにインストールするには

   ```shell
   datadog-agent integration install -t datadog-neo4j==<INTEGRATION_VERSION>
   ```

### コンフィギュレーション

1. neo4j のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `neo4j.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[neo4j.d/conf.yaml のサンプル][4]を参照してください。

2. Datadog は、dogstatsd_stats_port と expvar_port をポート 5000 でリッスンしています。neo4j.conf ファイルで、server.discovery.listen_address と server.discovery.advertised_address を 5000 以外のポートを使用するように変更する必要があります。

3. [Agent を再起動します][8]。

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションで `neo4j` を探します。

## 収集データ

### サービスのチェック

サービスチェック `neo4j.prometheus.health` はベースチェックで送信されます

### イベント

Neo4j には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Neo4j サポート][10]までお問い合わせください。

[1]: https://neo4j.com/
[2]: https://neo4j.com/docs/operations-manual/4.4/monitoring/metrics/reference/
[3]: https://neo4j.com/docs/operations-manual/5/monitoring/metrics/reference/
[4]: https://github.com/DataDog/integrations-extras/blob/master/neo4j/metadata.csv
[5]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[6]: https://app.datadoghq.com/account/settings#agent
[7]: https://github.com/DataDog/integrations-extras/blob/master/neo4j/datadog_checks/neo4j/data/conf.yaml.example
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[10]: mailto:support@neo4j.com