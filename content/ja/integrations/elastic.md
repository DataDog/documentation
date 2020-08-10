---
aliases:
  - /ja/integrations/elasticsearch
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs:
    source: elasticsearch
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
  - log collection
  - autodiscovery
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/elastic/README.md'
display_name: Elasticsearch
git_integration_title: elastic
guid: d91d91bd-4a8e-4489-bfb1-b119d4cc388a
integration_id: elasticsearch
integration_title: ElasticSearch
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: elasticsearch.
metric_to_check: elasticsearch.search.query.total
name: elastic
process_signatures:
  - java org.elasticsearch.bootstrap.Elasticsearch
public_title: Datadog-ElasticSearch インテグレーション
short_description: クラスター全体のステータスから JVM のヒープ使用量まで、すべてを監視
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
![Elasitc search ダッシュボード][1]

## 概要

Elasticsearch クラスターの健全性について、全体的なステータスから JVM のヒープ使用量まで、クラスター内のすべての情報を最新の状態で把握します。レプリカを回復したり、クラスターに容量を追加したり、構成を調整したりする必要があるときに通知を受けます。その後、クラスターメトリクスがどのように反応するかを追跡します。

Datadog Agent の Elasticsearch チェックは、検索とインデックス化のパフォーマンス、メモリ使用量とガベージコレクション、ノード可用性、シャード統計、ディスク容量とパフォーマンス、保留状態のタスクなど多数のメトリクスを収集します。Agent は、クラスターの全体的なステータスに関するイベントとサービスチェックも送信します。

## セットアップ

### インストール

Elasticsearch チェックは [Datadog Agent][2] パッケージに含まれています。追加のインストールは必要ありません。

### 構成

#### ホスト

ホストで実行中の Agent でこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#コンテナ化)セクションを参照してください。

##### メトリクスの収集

1. Elasticsearch の[メトリクス](#metrics)を収集するには、[Agent の構成ディレクトリ][3]のルートにある `conf.d/` フォルダーの `elastic.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションについては、[サンプル elastic.d/conf.yaml][4] を参照してください。

   ```yaml
   init_config:

   instances:
     ## @param url - string - required
     ## The URL where Elasticsearch accepts HTTP requests. This is used to
     ## fetch statistics from the nodes and information about the cluster health.
     #
     - url: http://localhost:9200
   ```

   **注**:

      - クラスターの外で実行されている 1 つの Datadog Agent からのみ Elasticsearch メトリクスを収集する場合は (ホステッド Elasticsearch を使用する場合など)、`cluster_stats` を true に設定します。
      - AWS Elasticsearch サービスに Agent の Elasticsearch インテグレーションを使用するには、`url` パラメーターを AWS Elasticsearch stats の URL に設定します。
      - Amazon ES コンフィギュレーション API へのリクエストは全て、署名されなければなりません。詳細は、[AWS ドキュメント][5]を参照してください。

2. [Agent を再起動します][6]。

##### トレースの収集

Datadog APM は、Elasticsearch と統合して分散システム全体のトレースを確認します。Datadog Agent v6 以降では、トレースの収集はデフォルトで有効化されています。トレースの収集を開始するには、以下の手順に従います。

1. [Datadog でトレースの収集を有効にします][7]。
2. [ElasticSearch へのリクエストを作成するアプリケーションをインスツルメントします][8]。

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. 検索スローログを収集してスローログのインデックスを作成するには、[Elasticsearch 設定を構成][9]します。デフォルトでは、スローログは有効になっていません。

   - 特定のインデックス `<インデックス>` のインデックススローログを構成するには

     ```shell
     curl -X PUT "localhost:9200/<INDEX>/_settings?pretty" -H 'Content-Type: application/json' -d' {
       "index.indexing.slowlog.threshold.index.warn": "0ms",
       "index.indexing.slowlog.threshold.index.info": "0ms",
       "index.indexing.slowlog.threshold.index.debug": "0ms",
       "index.indexing.slowlog.threshold.index.trace": "0ms",
       "index.indexing.slowlog.level": "trace",
       "index.indexing.slowlog.source": "1000"
     }
     ```

   - 特定のインデックス `<インデックス>` の検索スローログを構成するには

     ```shell
     curl -X PUT "localhost:9200/<INDEX>/_settings?pretty" -H 'Content-Type: application/json' -d' {
       "index.search.slowlog.threshold.query.warn": "0ms",
       "index.search.slowlog.threshold.query.info": "0ms",
       "index.search.slowlog.threshold.query.debug": "0ms",
       "index.search.slowlog.threshold.query.trace": "0ms",
       "index.search.slowlog.threshold.fetch.warn": "0ms",
       "index.search.slowlog.threshold.fetch.info": "0ms",
       "index.search.slowlog.threshold.fetch.debug": "0ms",
       "index.search.slowlog.threshold.fetch.trace": "0ms"
     }
     ```

3. Elasticsearch のログの収集を開始するには、次の構成ブロックを `elastic.d/conf.yaml` ファイルに追加します。

   ```yaml
   logs:
     - type: file
       path: /var/log/elasticsearch/*.log
       source: elasticsearch
       service: "<SERVICE_NAME>"
   ```

   - インスタンスを追加して、スローログの収集を開始します。

     ```yaml
     - type: file
       path: "/var/log/elasticsearch/\
             <CLUSTER_NAME>_index_indexing_slowlog.log"
       source: elasticsearch
       service: "<SERVICE_NAME>"

     - type: file
       path: "/var/log/elasticsearch/\
             <CLUSTER_NAME>_index_search_slowlog.log"
       source: elasticsearch
       service: "<SERVICE_NAME>"
     ```

     `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。

4. [Agent を再起動します][6]。

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][10]をガイドとして参照し、次のパラメーターを適用します。

##### メトリクスの収集

| パラメーター            | 値                              |
| -------------------- | ---------------------------------- |
| `<インテグレーション名>` | `elastic`                          |
| `<初期コンフィギュレーション>`      | 空白または `{}`                      |
| `<インスタンスコンフィギュレーション>`  | `{"url": "https://%%host%%:9200"}` |

##### トレースの収集

コンテナ化されたアプリケーションの APM は、Agent v6 以降を実行するホストでサポートされていますが、トレースの収集を開始するには、追加のコンフィギュレーションが必要です。

Agent コンテナで必要な環境変数

| パラメーター            | 値                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | true                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | true |

利用可能な環境変数とコンフィギュレーションの完全なリストについては、[Kubernetes アプリケーションのトレース][11]および [Kubernetes Daemon のセットアップ][12]を参照してください。

次に、[アプリケーションコンテナをインスツルメント][8]し、Agent コンテナ名に `DD_AGENT_HOST` を設定します。

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集のドキュメント][13]を参照してください。

| パラメーター      | 値                                                      |
| -------------- | ---------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "elasticsearch", "service": "<サービス名>"}` |

### 検証

[Agent の status サブコマンドを実行][14]し、Checks セクションで `elastic` を探します。

## 収集データ

デフォルトでは、次のすべてのメトリクスが Agent によって送信されるわけではありません。すべてのメトリクスを送信するには、上述のように `elastic.yaml` でフラグを構成します。

- `pshard_stats` は、**elasticsearch.primaries.\*** および **elasticsearch.indices.count** メトリクスを送信します。
- `index_stats` は、**elasticsearch.index.\*** メトリクスを送信します。
- `pending_task_stats` は、**elasticsearch.pending\_\*** メトリクスを送信します。

バージョン 6.3.0 以降で、すべての `elasticsearch.thread_pool.write.*` メトリクスを収集するには、Elasticsearch コンフィギュレーションで `xpack.monitoring.collection.enabled` コンフィギュレーションを `true` に設定します。[Elasticsearch のリリースノートで Monitoring セクション][15]を参照してください。

### メトリクス
{{< get-metrics-from-git "elastic" >}}


### イベント

Elasticsearch チェックは、Elasticsearch クラスターの全体的なステータスが赤、黄、緑に変化するたびに、Datadog にイベントを送信します。

### サービスチェック

`elasticsearch.cluster_health`:

クラスターステータスが緑色の場合は `OK`、黄色の場合は `Warn`、その他の場合は `Critical` を返します。

`elasticsearch.can_connect`:

Agent が Elasticsearch に接続してメトリクスを収集できない場合は、`Critical` を返します。

## トラブルシューティング

- [Agent が接続できない][17]
- [Elasticsearch からすべてのメトリクスが送信されないのはなぜですか？][9]

## その他の参考資料

Elasticsearch クラスターを Datadog と統合する方法 (または理由) について理解するには、Datadog の[一連のブログ記事][18]を参照してください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/elastic/images/elasticsearch-dash.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/elastic/datadog_checks/elastic/data/conf.yaml.example
[5]: https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-ac.html#es-managedomains-signing-service-requests
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/tracing/send_traces/
[8]: https://docs.datadoghq.com/ja/tracing/setup/
[9]: https://docs.datadoghq.com/ja/integrations/faq/why-isn-t-elasticsearch-sending-all-my-metrics/
[10]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[11]: https://docs.datadoghq.com/ja/agent/kubernetes/apm/?tab=java
[12]: https://docs.datadoghq.com/ja/agent/kubernetes/daemonset_setup/?tab=k8sfile#apm-and-distributed-tracing
[13]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
[14]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[15]: https://www.elastic.co/guide/en/elasticsearch/reference/6.3/release-notes-6.3.0.html
[16]: https://github.com/DataDog/integrations-core/blob/master/elastic/metadata.csv
[17]: https://docs.datadoghq.com/ja/integrations/faq/elastic-agent-can-t-connect/
[18]: https://www.datadoghq.com/blog/monitor-elasticsearch-performance-metrics