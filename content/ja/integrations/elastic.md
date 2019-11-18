---
aliases:
  - /ja/integrations/elasticsearch
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
  - log collection
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
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: elasticsearch.
metric_to_check: elasticsearch.search.query.total
name: elastic
process_signatures:
  - java org.elasticsearch.bootstrap.Elasticsearch
public_title: Datadog-ElasticSearch インテグレーション
short_description: クラスター全体のステータスから JVM のヒープ使用量まで、すべてを監視 in between.
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

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Elasticsearch チェックは [Datadog Agent][3] パッケージに含まれています。Elasticsearch ノードや何か別のサーバー (Elastic Cloud などのホステッド Elasticsearch を使用する場合) に追加でインストールする必要はありません。

### コンフィグレーション

1. Elasticsearch の[メトリクス](#metric-collection)と[ログ](#log-collection)の収集を開始するには、[Agent の構成ディレクトリ][4]のルートにある `conf.d/` フォルダーの `elastic.d/conf.yaml` ファイルを編集します。
  使用可能なすべての構成オプションの詳細については、[サンプル elastic.d/conf.yaml][5] を参照してください。

2. [Agent を再起動します][6]。

#### メトリクスの収集

*  [ElasticSearch のメトリクス](#metrics)の収集を開始するには、`elastic.yaml` ファイルに次の構成ブロックを追加します。

```yaml
init_config:

instances:
  - url: http://localhost:9200 # または、クラスター API がリスニングしている場所
    cluster_stats: false # チェックを各クラスターノードで実行していない場合にのみ true に設定
    pshard_stats: true # Agent はプライマリシャードメトリクスを送信
    index_stats: true # Agent はインデックスレベルメトリクスを送信
    pending_task_stats: true # Agent はクラスター全体の保留状態のタスクメトリクスを送信
```

**注**:

* クラスターの外で実行されている 1 つの Datadog Agent からのみ Elasticsearch メトリクスを収集する場合は (ホステッド Elasticsearch を使用する場合など)、`cluster_stats` を true に設定します。

* AWS Elasticsearch サービスに Agent の Elasticsearch インテグレーションを使用するには、`url` パラメーターを AWS Elasticsearch stats の URL に設定します。

クラスターの API `url` への認証や SSL 検証のオプションなど、使用できるすべての構成オプションについては、[サンプル elastic.yaml][5] を参照してください。

最後に、[Agent を再起動][6]すると、Datadog への Elasticsearch メトリクスの送信が開始されます。

#### ログの収集

**Agent 6.0 以上で使用可能**

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

    ```yaml
      logs_enabled: true
    ```

2. Elasticsearch のログの収集を開始するには、次の構成ブロックを `elastic.d/conf.yaml` ファイルに追加します。

    ```yaml
      logs:
          - type: file
            path: /var/log/elasticsearch/*.log
            source: elasticsearch
            service: myservice
    ```

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。

3. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンドを実行][8]し、Checks セクションで `elastic` を探します。

## 収集データ

デフォルトでは、次のすべてのメトリクスが Agent によって送信されるわけではありません。すべてのメトリクスを送信するには、上述のように `elastic.yaml` でフラグを構成します。

* `pshard_stats` は、**elasticsearch.primaries.\*** および **elasticsearch.indices.count** メトリクスを送信します。
* `index_stats` は、**elasticsearch.index.\*** メトリクスを送信します。
* `pending_task_stats` は、**elasticsearch.pending_\*** メトリクスを送信します。

バージョン 6.3.0 以降で、すべての `elasticsearch.thread_pool.write.*` メトリクスを収集するには、Elasticsearch 構成で `xpack.monitoring.collection.enabled` 構成を `true` に設定します。[Elasticsearch のリリースノートで Monitoring のセクション][9]を参照してください。

### メトリクス
{{< get-metrics-from-git "elastic" >}}


### イベント

Elasticsearch チェックは、Elasticsearch クラスターの全体的なステータスが赤、黄、緑に変化するたびに、Datadog にイベントを送信します。

### サービスのチェック

`elasticsearch.cluster_health`:

クラスターステータスが緑色の場合は `OK`、黄色の場合は `Warn`、その他の場合は `Critical` を返します。

`elasticsearch.can_connect`:

Agent が Elasticsearch に接続してメトリクスを収集できない場合は、`Critical` を返します。

## トラブルシューティング

* [Agent が接続できない][11]
* [Elasticsearch からすべてのメトリクスが送信されないのはなぜですか?][12]

## その他の参考資料
Elasticsearch クラスターを Datadog と統合する方法 (または理由) について理解するには、Datadog の[一連のブログ記事][13]を参照してください。


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/elastic/images/elasticsearch-dash.png
[2]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/elastic/datadog_checks/elastic/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[9]: https://www.elastic.co/guide/en/elasticsearch/reference/6.3/release-notes-6.3.0.html
[10]: https://github.com/DataDog/integrations-core/blob/master/elastic/metadata.csv
[11]: https://docs.datadoghq.com/ja/integrations/faq/elastic-agent-can-t-connect
[12]: https://docs.datadoghq.com/ja/integrations/faq/why-isn-t-elasticsearch-sending-all-my-metrics
[13]: https://www.datadoghq.com/blog/monitor-elasticsearch-performance-metrics


{{< get-dependencies >}}