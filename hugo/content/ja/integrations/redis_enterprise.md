---
app_id: redis-enterprise
app_uuid: b569beaa-dbf6-4c40-a640-fab0ea2b9cab
assets:
  dashboards:
    redis-enterprise-database: assets/dashboards/redis_enterprise_database.json
    redis-enterprise-node: assets/dashboards/redis_enterprise_node.json
    redis-enterprise-overview: assets/dashboards/redis_enterprise_overview.json
    redis-enterprise-proxy: assets/dashboards/redis_enterprise_proxy.json
    redis-enterprise-proxy-threads: assets/dashboards/redis_enterprise_proxy-threads.json
    redis-enterprise-replication: assets/dashboards/redis_enterprise_active-active.json
    redis-enterprise-shard: assets/dashboards/redis_enterprise_shard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rdse.bdb_conns
      metadata_path: metadata.csv
      prefix: rdse
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 7769393
    source_type_name: Redis Enterprise V2
  logs: {}
author:
  homepage: https://redis.com/redis-enterprise-software/overview
  name: Redis, Inc.
  sales_email: press@redis.com
  support_email: support@redis.com
categories:
- ai/ml
- caching
- data stores
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/redis_enterprise/README.md
display_on_public_website: true
draft: false
git_integration_title: redis_enterprise
integration_id: redis-enterprise
integration_title: Redis Enterprise
integration_version: 1.1.2
is_public: true
manifest_version: 2.0.0
name: redis_enterprise
public_title: Redis Enterprise
short_description: Redis Enterprise Datadog インテグレーション
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
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Redis Enterprise Datadog インテグレーション
  media:
  - caption: ノード CPU 使用率のグラフ
    image_url: images/datadog-detail-node-cpu.png
    media_type: image
  - caption: ノード メモリ使用量のグラフ
    image_url: images/datadog-detail-node-memory.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Redis Enterprise
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Redis は、高速で多用途なデータ ストアであり、文字列、ハッシュ、リスト、セット、ストリームなど、さまざまなデータ構造をサポートします。さらに、プログラマビリティ、拡張性、永続化、クラスタリング、高可用性も提供します。Redis のコミュニティ エディションは、ベクター 検索、確率的 データ 構造、JSON サポート、フル テキスト 検索など、追加のデータ モデルと機能を提供します。

このインテグレーションは、オンプレミスおよびプライベート クラウドにインストールされた [Redis Enterprise][1] で動作します。
このインテグレーションは、クラスターの 3 つの重要なコンポーネントであるデータベース、ノード、シャードに関するメトリクスを提供します。これにより、Datadog 内でデータベースのスループット、メモリ使用率、CPU 使用率、接続数、レプリケーション 健全性、およびそのほか多様なメトリクスを監視できます。
これらの情報を使用して、Redis Enterprise クラスター全体の健全性を把握し、アプリケーションのパフォーマンス問題を診断し、ダウンタイムを防止できます。

サポートされるメトリクスの完全な一覧は、以下の [メトリクス](#metrics) セクションを参照してください。

## セットアップ

### インストール

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。
   ```shell
   datadog-agent integration install -t datadog-redis_enterprise==1.1.2
   ```

2. インテグレーションを構成し、`openmetrics_endpoint` をクラスターのマスター ノードに設定します。詳しくは [インテグレーション][2] を参照してください。

3. Agent を [再起動][3] します。


### 構成

`openmetrics_endpoint` をクラスターを指すように設定し、`tls_verify` は false のままにします。

複数のエンドポイントがある場合は、それぞれの URL を持つ追加のインスタンスを作成する必要があります。
以下の例を参照してください。この例は [conf.yaml.multi.example][5] にもあります:

```instances:
  - openmetrics_endpoint: 'https://<host1>:8070/metrics'
    tls_verify: false

  - openmetrics_endpoint: 'https://<host1>:8070/metrics'
    tls_verify: false
```

オプション パラメーターとして `extra_metrics` と `excluded_metrics` の 2 つがあります。例の構成ファイルを参照してください。

extra_metrics パラメータはメトリクス グループのリストを受け取ります。利用可能なグループは次のとおりです: RDSE.REPLICATION、RDSE.LISTENER、RDSE.PROXY、RDSE.BIGSTORE、RDSE.FLASH、RDSE.SHARDREPL。デフォルトのメトリクス グループである RDSE.NODE、RDSE.DATABASE、RDSE.SHARD は、インテグレーションにより自動的に挿入されます。

exclude_metrics パラメータは除外する個別メトリクスのリストを受け取ります。ここで指定した情報は Datadog に渡されません。個別メトリクスはプレフィックスを取り除いた形で指定してください。たとえば、'rdse.bdb_up' は 'bdb_up' になります。メトリクスの完全な一覧は、インテグレーション ページの「'Data Collected'」タブ、または [メトリクス](#metrics) セクションのリンクから確認できます。以下の追加グループは関連するプレフィックスを使用しており、収集データ ページで個別メトリクスを検索する際に利用できます。

| グループ            | プレフィックス                      | 注                                                |
|------------------|-----------------------------|------------------------------------------------------|
| RDSE.NODE        | rdse.node_                  | Bigstore と Flash メトリクスも返します  |
| RDSE.DATABASE    | rdse.bdb_                   | レプリケーション メトリクスも返します         |
| RDSE.SHARD       | rdse.redis_                 | シャード レプリケーション メトリクスも返します   |
| RDSE.REPLICATION | rdse.bdb_crdt_              |                                                      |
| RDSE.REPLICATION | rdse.bdb_replicaof_         |                                                      |
| RDSE.SHARDREPL   | rdse.redis_crdt_            |                                                      |
| RDSE.PROXY       | rdse.dmcproxy_              |                                                      |
| RDSE.LISTENER    | rdse.listener_              |                                                      |
| RDSE.BIGSTORE    | rdse.node_bigstore_         |                                                      |
| RDSE.FLASH       | rdse.node_available_flash   | すべての Flash メトリクスは次の形式です: rdse.node_*_flash |

### 検証

1. クラウド 環境では特に、マシンに ping できることを確認してください。`wget --no-check-certificate <endpoint>`
または `curl -k <endpoint>` を実行して、メトリクスを受信できることを確認します。

2. Datadog Agent の [ステータス][6] もチェックしてください。


## 収集データ

現在のリリースは、データベース、ノード、シャードのすべてのメトリクスを収集します。オプションで、extra_metrics パラメータによりレプリケーション、プロキシ、リスナーなどのデータも収集できます。詳細は [設定](#configuration) セクションの一覧を参照してください。


### メトリクス
{{< get-metrics-from-git "redis_enterprise" >}}



### サービス チェック

Redis Enterprise には、サービス チェックは含まれません。


### イベント

Redis Enterprise には、イベントは含まれません。


## トラブルシューティング

お困りの場合は、[Redis サポート][8] にお問い合わせください。

[1]: https://redis.com/redis-enterprise-software/overview/
[2]: https://docs.datadoghq.com/ja/getting_started/integrations/
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://github.com/DataDog/integrations-extras/blob/master/redis_enterprise/datadog_checks/redis_enterprise/data/conf.yaml.example
[5]: https://github.com/DataDog/integrations-extras/blob/master/redis_enterprise/datadog_checks/redis_enterprise/data/conf.yaml.multi.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-extras/blob/master/redis_enterprise/metadata.csv
[8]: https://redis.io/support/