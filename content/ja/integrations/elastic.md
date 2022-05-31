---
aliases:
- /ja/integrations/elasticsearch
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    elasticsearch: assets/dashboards/overview.json
    elasticsearch_timeboard: assets/dashboards/metrics.json
  logs:
    source: elasticsearch
  metrics_metadata: metadata.csv
  monitors:
    '[ElasticSearch] Number of pending tasks is high': assets/monitors/elastic_pending_tasks_high.json
    '[ElasticSearch] Query load is high': assets/monitors/elastic_query_load_high.json
    '[ElasticSearch] Time spent on queries is high': assets/monitors/elastic_query_latency_high.json
    '[ElasticSearch] Unsuccessful requests rate is high': assets/monitors/elastic_requests.json
  saved_views:
    elasticsearch_processes: assets/saved_views/elasticsearch_processes.json
  service_checks: assets/service_checks.json
categories:
- data store
- log collection
- autodiscovery
creates_events: true
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/elastic/README.md
display_name: Elasticsearch
draft: false
git_integration_title: elastic
guid: d91d91bd-4a8e-4489-bfb1-b119d4cc388a
integration_id: elasticsearch
integration_title: ElasticSearch
integration_version: 5.1.1
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



![Elastic search ダッシュボード][1]

## 概要

Elasticsearch クラスターの健全性について、全体的なステータスから JVM のヒープ使用量まで、クラスター内のすべての情報を最新の状態で把握します。レプリカを回復したり、クラスターに容量を追加したり、構成を調整したりする必要があるときに通知を受けます。その後、クラスターメトリクスがどのように反応するかを追跡します。

Datadog Agent の Elasticsearch チェックは、検索とインデックス化のパフォーマンス、メモリ使用量とガベージコレクション、ノード可用性、シャード統計、ディスク容量とパフォーマンス、保留状態のタスクなど多数のメトリクスを収集します。Agent は、クラスターの全体的なステータスに関するイベントとサービスチェックも送信します。

## セットアップ

### インストール

Elasticsearch チェックは [Datadog Agent][2] パッケージに含まれています。追加のインストールは必要ありません。

### コンフィギュレーション

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

##### メトリクスの収集

1. Elasticsearch の[メトリクス](#metrics)を収集するには、[Agent の構成ディレクトリ][1]のルートにある `conf.d/` フォルダーの `elastic.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションについては、[サンプル elastic.d/conf.yaml][2] を参照してください。

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

      - クラスターの外で実行されている 1 つの Datadog Agent からのみ Elasticsearch メトリクスを収集する場合は (ホステッド Elasticsearch を使用する場合など)、`cluster_stats` を `true` に設定します。
      - [Agent レベルのタグ][3]は、Agent を実行していないクラスターのホストには適用されません。**すべての** メトリクスが一定のタグを持つようにするには、`<integration>.d/conf.yaml` でインテグレーションレベルのタグを使用します。

        ```yaml
        init_config:
        instances:
          - url: "%%env_MONITOR_ES_HOST%%"
            username: "%%env_MONITOR_ES_USER%%"
            password: *********
            auth_type: basic
            cluster_stats: true
            tags:
            - service.name:elasticsearch
            - env:%%env_DD_ENV%%
        ```

      - AWS Elasticsearch サービスに Agent の Elasticsearch インテグレーションを使用するには、`url` パラメーターを AWS Elasticsearch stats の URL に設定します。
      - Amazon ES コンフィギュレーション API へのすべてのリクエストには、署名が必要です。詳細は、[OpenSearch サービスリクエストの作成と署名][4]を参照してください。
      - `aws` の認証タイプは、[boto3][5] に依存して `.aws/credentials` から自動的に AWS 認証情報を収集します。`conf.yaml` で `auth_type: basic` を使用して、認証情報を `username: <USERNAME>`、`password: <PASSWORD>` で定義します。

2. [Agent を再起動します][6]。

###### カスタムクエリ

ElasticSearch とのインテグレーションでは、`custom_queries` 構成オプションを使用することで、カスタムクエリによるカスタムメトリクスの収集が可能です。

**注:** カスタムクエリを実行する際は、ElasticSearch のインスタンスが変更されないよう、読み取り専用アカウントを使用してください。

```yaml
custom_queries:
 - endpoint: /_search
   data_path: aggregations.genres.buckets
   payload:
     aggs:
       genres:
         terms:
           field: "id"
   columns:
   - value_path: key
     name: id
     type: tag
   - value_path: doc_count
     name: elasticsearch.doc_count
   tags:
   - custom_tag:1
```
カスタムクエリは `GET` リクエストとして送信されます。オプションの `payload` パラメーターを使用すると、`POST` リクエストとして送信されます。

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
     }'
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
     }'
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

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/elastic/datadog_checks/elastic/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/getting_started/tagging/assigning_tags?tab=noncontainerizedenvironments#file-location
[4]: https://docs.aws.amazon.com/opensearch-service/latest/developerguide/ac.html#managedomains-signing-service-requests
[5]: https://boto3.amazonaws.com/v1/documentation/api/latest/guide/configuration.html#configuring-credentials
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/tracing/send_traces/
[8]: https://docs.datadoghq.com/ja/tracing/setup/
[9]: https://docs.datadoghq.com/ja/integrations/faq/why-isn-t-elasticsearch-sending-all-my-metrics/
{{% /tab %}}
{{% tab "Docker" %}}

#### Docker

コンテナで実行中の Agent に対してこのチェックを構成するには:

##### メトリクスの収集

アプリケーションのコンテナで、[オートディスカバリーのインテグレーションテンプレート][1]を Docker ラベルとして設定します。

```yaml
LABEL "com.datadoghq.ad.check_names"='["elastic"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"url": "http://%%host%%:9200"}]'
```

##### ログの収集


Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Docker ログ収集][2]を参照してください。

次に、[ログインテグレーション][3]を Docker ラベルとして設定します。

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source":"elasticsearch","service":"<SERVICE_NAME>"}]'
```

##### トレースの収集

コンテナ化されたアプリケーションの APM は、Agent v6 以降でサポートされていますが、トレースの収集を開始するには、追加のコンフィギュレーションが必要です。

Agent コンテナで必要な環境変数

| パラメーター            | 値                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | true                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | true |

利用可能な環境変数とコンフィギュレーションの完全なリストについては、[Kubernetes アプリケーションのトレース][4]および [Kubernetes Daemon のセットアップ][5]を参照してください。

次に、[アプリケーションコンテナをインスツルメント][6]し、Agent コンテナの名前に `DD_AGENT_HOST` を設定します。


[1]: https://docs.datadoghq.com/ja/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/ja/agent/docker/log/?tab=containerinstallation#installation
[3]: https://docs.datadoghq.com/ja/agent/docker/log/?tab=containerinstallation#log-integrations
[4]: https://docs.datadoghq.com/ja/agent/kubernetes/apm/?tab=java
[5]: https://docs.datadoghq.com/ja/agent/kubernetes/daemonset_setup/?tab=k8sfile#apm-and-distributed-tracing
[6]: https://docs.datadoghq.com/ja/tracing/setup/
{{% /tab %}}
{{% tab "Kubernetes" %}}

#### Kubernetes

このチェックを、Kubernetes で実行している Agent に構成します。

##### メトリクスの収集

アプリケーションのコンテナで、[オートディスカバリーのインテグレーションテンプレート][1]をポッドアノテーションとして設定します。他にも、[ファイル、ConfigMap、または key-value ストア][2]を使用してテンプレートを構成できます。

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: elasticsearch
  annotations:
    ad.datadoghq.com/elasticsearch.check_names: '["elastic"]'
    ad.datadoghq.com/elasticsearch.init_configs: '[{}]'
    ad.datadoghq.com/elasticsearch.instances: |
      [
        {
          "url": "http://%%host%%:9200"
        }
      ]
spec:
  containers:
    - name: elasticsearch
```

##### ログの収集


Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][3]を参照してください。

次に、[ログのインテグレーション][4]をポッドアノテーションとして設定します。これは、[ファイル、ConfigMap、または key-value ストア][5]を使用して構成することも可能です。

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: elasticsearch
  annotations:
    ad.datadoghq.com/elasticsearch.logs: '[{"source":"elasticsearch","service":"<SERVICE_NAME>"}]'
spec:
  containers:
    - name: elasticsearch
```

##### トレースの収集

コンテナ化されたアプリケーションの APM は、Agent v6 以降を実行するホストでサポートされていますが、トレースの収集を開始するには、追加のコンフィギュレーションが必要です。

Agent コンテナで必要な環境変数

| パラメーター            | 値                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | true                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | true |

利用可能な環境変数とコンフィギュレーションの完全なリストについては、[Kubernetes アプリケーションのトレース][6]および [Kubernetes Daemon のセットアップ][7]を参照してください。

次に、[アプリケーションコンテナをインスツルメント][8]し、Agent コンテナ名に `DD_AGENT_HOST` を設定します。

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/?tab=kubernetes
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/?tab=kubernetes#configuration
[3]: https://docs.datadoghq.com/ja/agent/kubernetes/log/?tab=containerinstallation#setup
[4]: https://docs.datadoghq.com/ja/agent/docker/log/?tab=containerinstallation#log-integrations
[5]: https://docs.datadoghq.com/ja/agent/kubernetes/log/?tab=daemonset#configuration
[6]: https://docs.datadoghq.com/ja/agent/kubernetes/apm/?tab=java
[7]: https://docs.datadoghq.com/ja/agent/kubernetes/daemonset_setup/?tab=k8sfile#apm-and-distributed-tracing
[8]: https://docs.datadoghq.com/ja/tracing/setup/
{{% /tab %}}
{{% tab "ECS" %}}

#### ECS

このチェックを、ECS で実行している Agent に構成するには:

##### メトリクスの収集

アプリケーションのコンテナで、[オートディスカバリーのインテグレーションテンプレート][1]を Docker ラベルとして設定します。

```json
{
  "containerDefinitions": [{
    "name": "elasticsearch",
    "image": "elasticsearch:latest",
    "dockerLabels": {
      "com.datadoghq.ad.check_names": "[\"elastic\"]",
      "com.datadoghq.ad.init_configs": "[{}]",
      "com.datadoghq.ad.instances": "[{\"url\": \"http://%%host%%:9200\"}]"
    }
  }]
}
```

##### ログの収集


Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[ECS ログ収集][2]を参照してください。

次に、[ログインテグレーション][3]を Docker ラベルとして設定します。

```json
{
  "containerDefinitions": [{
    "name": "elasticsearch",
    "image": "elasticsearch:latest",
    "dockerLabels": {
      "com.datadoghq.ad.logs": "[{\"source\":\"elasticsearch\",\"service\":\"<SERVICE_NAME>\"}]"
    }
  }]
}
```

##### トレースの収集

コンテナ化されたアプリケーションの APM は、Agent v6 以降でサポートされていますが、トレースの収集を開始するには、追加のコンフィギュレーションが必要です。

Agent コンテナで必要な環境変数

| パラメーター            | 値                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | true                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | true |

利用可能な環境変数とコンフィギュレーションの完全なリストについては、[Kubernetes アプリケーションのトレース][4]および [Kubernetes Daemon のセットアップ][5]を参照してください。

次に、[アプリケーションのコンテナをインスツルメント][6]し、[EC2 プライベート IP アドレス][7]に `DD_AGENT_HOST` を設定します。


[1]: https://docs.datadoghq.com/ja/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/ja/agent/amazon_ecs/logs/?tab=linux
[3]: https://docs.datadoghq.com/ja/agent/docker/log/?tab=containerinstallation#log-integrations
[4]: https://docs.datadoghq.com/ja/agent/kubernetes/apm/?tab=java
[5]: https://docs.datadoghq.com/ja/agent/kubernetes/daemonset_setup/?tab=k8sfile#apm-and-distributed-tracing
[6]: https://docs.datadoghq.com/ja/tracing/setup/
[7]: https://docs.datadoghq.com/ja/agent/amazon_ecs/apm/?tab=ec2metadataendpoint#setup
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][3]し、Checks セクションで `elastic` を探します。

## 収集データ

デフォルトでは、次のすべてのメトリクスが Agent によって送信されるわけではありません。すべてのメトリクスを送信するには、上述のように `elastic.yaml` でフラグを構成します。

- `pshard_stats` は、**elasticsearch.primaries.\*** および **elasticsearch.indices.count** メトリクスを送信します。
- `index_stats` は、**elasticsearch.index.\*** メトリクスを送信します。
- `pending_task_stats` は、**elasticsearch.pending\_\*** メトリクスを送信します。

バージョン 6.3.0 以降で、すべての `elasticsearch.thread_pool.write.*` メトリクスを収集するには、Elasticsearch 構成で `xpack.monitoring.collection.enabled` 構成を `true` に設定します。[Elasticsearch のリリースノートで Monitoring のセクション][4]を参照してください。

### メトリクス
{{< get-metrics-from-git "elastic" >}}


### イベント

Elasticsearch チェックは、Elasticsearch クラスターの全体的なステータスが赤、黄、緑に変化するたびに、Datadog にイベントを送信します。

### サービスのチェック
{{< get-service-checks-from-git "elastic" >}}


## トラブルシューティング

- [Agent が接続できない][5]
- [Elasticsearch からすべてのメトリクスが送信されないのはなぜですか？][6]

## その他の参考資料

- [Elasticsearch のパフォーマンスを監視する方法][7]



[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/elastic/images/elasticsearch-dash.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://www.elastic.co/guide/en/elasticsearch/reference/6.3/release-notes-6.3.0.html
[5]: https://docs.datadoghq.com/ja/integrations/faq/elastic-agent-can-t-connect/
[6]: https://docs.datadoghq.com/ja/integrations/faq/why-isn-t-elasticsearch-sending-all-my-metrics/
[7]: https://www.datadoghq.com/blog/monitor-elasticsearch-performance-metrics