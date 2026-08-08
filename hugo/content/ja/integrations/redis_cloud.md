---
app_id: redis-cloud
app_uuid: 0b59b80e-db72-44a6-8c2b-67475d10ad71
assets:
  dashboards:
    redis-cloud-active-active: assets/dashboards/redis_cloud_active-active.json
    redis-cloud-database: assets/dashboards/redis_cloud_database.json
    redis-cloud-networking: assets/dashboards/redis_cloud_networking.json
    redis-cloud-overview: assets/dashboards/redis_cloud_overview.json
    redis-cloud-proxy: assets/dashboards/redis_cloud_proxy.json
    redis-cloud-proxy-threads: assets/dashboards/redis_cloud_proxy-threads.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rdsc.bdb_conns
      metadata_path: metadata.csv
      prefix: rdsc
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 7769531
    source_type_name: Redis Cloud
  logs: {}
author:
  homepage: https://redis.com/cloud/overview/
  name: Redis, Inc.
  sales_email: press@redis.com
  support_email: support@redis.com
categories:
- ai/ml
- caching
- data stores
- cloud
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/redis_cloud/README.md
display_on_public_website: true
draft: false
git_integration_title: redis_cloud
integration_id: redis-cloud
integration_title: Redis Cloud
integration_version: 1.1.0
is_public: true
manifest_version: 2.0.0
name: redis_cloud
public_title: Redis Cloud
short_description: Redis Cloud Integration
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::AI/ML
  - Category::Caching
  - Category::Data Stores
  - Category::Cloud
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Redis Cloud Integration
  media:
  - caption: redis cloud overview display
    image_url: images/datadog-cloud-overview-dashboard.png
    media_type: image
  - caption: redis cloud cluster details
    image_url: images/datadog-cloud-cluster-database.png
    media_type: image
  - caption: redis cloud node details
    image_url: images/datadog-cloud-node-dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Redis Cloud
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Redis は、高速で多機能なデータ ストアであり、文字列、ハッシュ、リスト、セット、ストリームなど、さまざまなデータ構造をサポートします。さらに、プログラマビリティ、拡張性、永続化、クラスタリング、高可用性も提供します。Redis の Community Edition では、ベクター サーチ、確率的データ構造、JSON サポート、全文検索など、追加のデータ モデルと機能が利用できます。

[Redis Cloud][1] インテグレーションは、Redis ソフトウェアの Redis Cloud デプロイで使用することを想定しています。Redis Enterprise 環境では使用しません。Redis Enterprise をご利用の場合は、[Datadog Redis Enterprise インテグレーション][3] を参照してください。

このインテグレーションは、Datadog Agent を使用して、データベース、ノード、シャードというクラスターの 3 つの重要コンポーネントのメトリクスを提供します。これにより、Datadog 内でデータベース スループット、メモリ使用率、CPU 使用率、接続数、レプリケーションの健全性、その他多数のメトリクスを監視できます。これらの情報を使用して、Redis Cloud クラスター全体の健全性を把握し、アプリケーション パフォーマンスの問題を診断し、ダウンタイムを防止できます。

サポートされているメトリクスの完全な一覧については、下記 **メトリクス** セクションを参照してください。

## セットアップ

### インストール

1. 次のコマンドを実行して Agent インテグレーションをインストールします。
- Datadog Agent v6 の場合:
   ```shell
   datadog-agent integration install -t datadog-redis_cloud==1.1.0
   ```
- Datadog Agent v7 の場合:
   ```shell
   agent integration install -t datadog-redis_cloud==1.1.0
   ```

2. `openmetrics_endpoint` をクラスターのマスター ノードに設定してインテグレーションを構成します。詳細は [インテグレーションの概要][4] を参照してください。
3. 設定後、Agent を [再起動][5] します。


### 構成

`openmetrics_endpoint` をクラスターを指すように設定し、`tls_verify` は false のままにします。

オプション パラメーターとして `extra_metrics` と `excluded_metrics` の 2 つがあります。例の構成ファイルを参照してください。

**extra_metrics** パラメーターにはメトリクス グループのリストを指定します。利用可能なグループは RDSC.REPLICATION、RDSC.NODE、RDSC.BIGSTORE、RDSC.FLASH、RDSC.SHARDREPL です。デフォルトのメトリクス グループ RDSC.DATABASE、RDSC.PROXY、RDSC.LISTENER、RDSC.SHARD はインテグレーションによって自動的に追加されます。

`exclude_metrics` パラメーターには除外する個別メトリクスのリストを指定します。指定したメトリクスは Datadog に送信されません。各メトリクス名はプレフィックスを外して指定してください。たとえば 'rdsc.bdb_up' は 'bdb_up' になります。メトリクスの完全な一覧は、インテグレーション ページの **Data Collected** タブおよび [メトリクス](#metrics) セクションで確認できます。 以下の追加グループでは、それぞれ関連付けられたプレフィックスを使用しており、**Data Collected** ページで個別メトリクスを検索する際に利用できます。

| グループ            | プレフィックス                    | 注                                                 |
|------------------|---------------------------|-------------------------------------------------------|
| RDSC.NODE        | rdsc.node_                | Bigstore と Flash のメトリクスも返します。  |
| RDSC.DATABASE    | rdsc.bdb_                 | レプリケーションのメトリクスも返します。         |
| RDSC.SHARD       | rdsc.redis_               | シャード レプリケーションのメトリクスも返します。   |
| RDSC.REPLICATION | rdsc.bdb_crdt_            |                                                       |
| RDSC.REPLICATION | rdsc.bdb_replicaof_       |                                                       |
| RDSC.SHARDREPL   | rdsc.redis_crdt_          |                                                       |
| RDSC.PROXY       | rdsc.dmcproxy_            |                                                       |
| RDSC.LISTENER    | rdsc.listener_            |                                                       |
| RDSC.BIGSTORE    | rdsc.node_bigstore_       |                                                       |
| RDSC.FLASH       | rdsc.node_available_flash | すべての Flash メトリクスは rdsc.node_*_flash 形式です。 |


### 検証

1. クラウド環境では特に、対象マシンに ping できることを確認してください。`wget --no-check-certificate <endpoint>` または `curl -k <endpoint>` を実行し、メトリクスを受信できることを確認します。

2. Datadog Agent の [ステータス][6] もチェックしてください。


## 収集データ

Redis Cloud インテグレーションは、データベース、ノード、シャードのすべてのメトリクスを収集します。


### メトリクス
{{< get-metrics-from-git "redis_cloud" >}}



### サービス チェック

Redis Cloud インテグレーションにはサービス チェックは含まれていません。


### イベント

Redis Cloud インテグレーションにはイベントは含まれていません。


## トラブルシューティング

お困りの場合は、[Redis Field Engineering][8] までお問い合わせください。

[1]: https://redis.io/docs/latest/operate/rc/
[2]: https://redis.io/docs/latest/operate/rs/
[3]: https://app.datadoghq.com/integrations?integrationId=redis-enterprise
[4]: https://docs.datadoghq.com/ja/getting_started/integrations/
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-extras/blob/master/redis_cloud/metadata.csv
[8]: mailto:support@redis.com