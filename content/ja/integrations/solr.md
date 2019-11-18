---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/solr/README.md'
display_name: Solr
git_integration_title: Solr
guid: 0235124a-0207-44dd-aede-f578a6d46b26
integration_id: Solr
integration_title: Solr
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: Solr.
metric_to_check: solr.cache.hits
name: Solr
process_signatures:
  - solr start
public_title: Datadog-Solr インテグレーション
short_description: リクエスト率、ハンドラーエラー、キャッシュミス、エビクションを監視 and more.
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
![Solr グラフ][1]

## 概要

Solr チェックは、Solr クラスターの状態とパフォーマンスを追跡します。インデックス化されたドキュメント数、キャッシュのヒット数、エビクション数、平均リクエスト時間、毎秒の平均リクエスト数などのメトリクスを収集します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Solr チェックは [Datadog Agent][3] パッケージに含まれています。Solr ノードに追加でインストールする必要はありません。

このチェックは JMX ベースなので、Solr サーバーで JMX リモートを有効にする必要があります。詳細については、[JMX チェックに関するドキュメント][4]を参照してください。

### コンフィグレーション

[Agent の構成ディレクトリ][5]のルートにある `conf.d/` フォルダーの `solr.d/conf.yaml` ファイルを編集します。使用可能な全構成オプションの詳細については、[サンプル solr.d/conf.yaml][6] を参照してください。

```
instances:
  # Tomcat の場所
  - host: localhost
    port: 9999

  # Tomcat で認証が必要な場合
  #   user: <SOLR_USERNAME>
  #   password: <SOLR_PASSWORD>

init_config:
  conf:
    - include:
      type: searcher
      attribute:
        maxDoc:
          alias: solr.searcher.maxdoc
          metric_type: gauge
        numDocs:
          alias: solr.searcher.numdocs
          metric_type: gauge
        warmupTime:
          alias: solr.searcher.warmup
          metric_type: gauge
    - include:
      id: org.apache.solr.search.FastLRUCache
      attribute:
        cumulative_lookups:
          alias: solr.cache.lookups
          metric_type: counter
        cumulative_hits:
          alias: solr.cache.hits
          metric_type: counter
        cumulative_inserts:
          alias: solr.cache.inserts
          metric_type: counter
        cumulative_evictions:
          alias: solr.cache.evictions
          metric_type: counter
    - include:
      id: org.apache.solr.search.LRUCache
      attribute:
        cumulative_lookups:
          alias: solr.cache.lookups
          metric_type: counter
        cumulative_hits:
          alias: solr.cache.hits
          metric_type: counter
        cumulative_inserts:
          alias: solr.cache.inserts
          metric_type: counter
        cumulative_evictions:
          alias: solr.cache.evictions
          metric_type: counter
    - include:
      id: org.apache.solr.handler.component.SearchHandler
      attribute:
        errors:
          alias: solr.search_handler.errors
          metric_type: counter
        requests:
          alias: solr.search_handler.requests
          metric_type: counter
        timeouts:
          alias: solr.search_handler.timeouts
          metric_type: counter
        totalTime:
          alias: solr.search_handler.time
          metric_type: counter
        avgTimePerRequest:
          alias: solr.search_handler.avg_time_per_req
          metric_type: gauge
        avgRequestsPerSecond:
          alias: solr.search_handler.avg_requests_per_sec
          metric_type: gauge
```

JMX ベースのすべてのチェックで使用可能な構成オプションのリストについては、[JMX チェックに関するドキュメント][4]を参照してください。このページには、Agent が JMX メトリクスをどのようにタグ付けするかについても記載されています。

[Agent を再起動][7]すると、Datadog への Solr メトリクスの送信が開始されます。

構成オプション

* `user` および `password` (オプション) - ユーザー名とパスワード。
* `process_name_regex` - (オプション) - ホストとポートまたは jmx_url を指定する代わりに、Agent は接続 API を使用して接続できます。それには、JDK をインストールして tools.jar のパスを設定する必要があります。
* `tools_jar_path` - (オプション) - process_name_regex を設定した場合は、このオプションも設定する必要があります。
* `java_bin_path` - (オプション) - Agent が Java 実行可能ファイルを検出できない場合に設定する必要があります。
* `java_options` - (オプション) - Java JVM オプション。
* `trust_store_path` および `trust_store_password` - (オプション) - ターゲットの JVM で "com.sun.management.jmxremote.ssl" が true に設定されている場合は、このオプションも設定する必要があります。
* `key_store_path` および `key_store_password` - (オプション) - ターゲットの JVM で "com.sun.management.jmxremote.ssl.need.client.auth" が true に設定されている場合は、このオプションも設定する必要があります。
* `rmi_registry_ssl` - (オプション) - ターゲットの JVM で "com.sun.management.jmxremote.registry.ssl" が true に設定されている場合は、このオプションも true に設定する必要があります。


`conf` パラメーターは、辞書のリストです。この辞書では、次の 2 つのキーのみが許可されます。

* `include` (**必須**): フィルターの辞書。これらのフィルターに一致する属性は、"exclude" フィルターにも一致している場合を除き、収集されます (以下を参照)。
* `exclude` (**オプション**): フィルターの別の辞書。これらのフィルターに一致する属性は収集されません。

特定の Bean に対して、メトリクスは次のようにタグ付けされます。

    mydomain:attr0=val0,attr1=val1

メトリクスは mydomain (Bean 内の属性によっては多少異なる) になり、タグ `attr0:val0、attr1:val1、domain:mydomain` が付きます。

`include` キー内の指定したエイリアスがキャメルケースとして書式設定されている場合、スネークケースに変換されます。たとえば `MyMetricName` は、Datadog では `my_metric_name` と表示されます。

#### `attribute` フィルター

`attribute` フィルターは、次の 2 種類の値を受け入れます。

* キーが属性名の辞書。

      conf:
        - include:
          attribute:
            maxThreads:
              alias: tomcat.threads.max
              metric_type: gauge
            currentThreadCount:
              alias: tomcat.threads.count
              metric_type: gauge
            bytesReceived:
              alias: tomcat.bytes_rcvd
              metric_type: counter


この場合、メトリクスのエイリアスを指定でき、それが Datadog でメトリクス名になります。ゲージまたはカウンターのメトリクスタイプを指定することもできます。カウンターを選択した場合は、このメトリクスの秒あたりの速度が計算されます。

* 属性名のリスト。

      conf:
        - include:
          domain: org.apache.cassandra.db
          attribute:
            - BloomFilterDiskSpaceUsed
            - BloomFilterFalsePositives
            - BloomFilterFalseRatio
            - Capacity
            - CompressionRatio
            - CompletedTasks
            - ExceptionCount
            - Hits
            - RecentHitRate


この場合、

  * メトリクスタイプはゲージです。
  * メトリクス名は `jmx.\[DOMAIN_NAME].\[ATTRIBUTE_NAME]` です。

これは別のフィルタリングの例です。

    instances:
      - host: 127.0.0.1
        name: jmx_instance
        port: 9999

    init_config:
      conf:
        - include:
          bean: org.apache.cassandra.metrics:type=ClientRequest,scope=Write,name=Latency
          attribute:
            - OneMinuteRate
            - 75thPercentile
            - 95thPercentile
            - 99thPercentile


#### 備考

フィルターのリストは、5.3.0 よりも新しい Datadog Agent でのみサポートされます。以前のバージョンを使用している場合は、代わりにシングルトンと複数の `include` ステートメントを使用します。

    # Datadog Agent > 5.3.0
      conf:
        - include:
          domain: domain_name
          bean:
            - first_bean_name
            - second_bean_name

    # 古い Datadog Agent バージョン
      conf:
        - include:
          domain: domain_name
          bean: first_bean_name
        - include:
          domain: domain_name
          bean: second_bean_name


### 検証

[Agent の `status` サブコマンドを実行][8]し、Checks セクションで `solr` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "solr" >}}


### イベント
Solr チェックには、イベントは含まれません。

### サービスのチェック
**solr.can_connect**

Agent が監視対象の SolR インスタンスに接続できず、メトリクスを収集できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。


## トラブルシューティング
### 使用可能なメトリクスを表示するコマンド

バージョン 4.1.0 で `datadog-agent jmx` コマンドが追加されました。

  * 1 つ以上のインスタンス構成に一致する属性をリストする:
`sudo /etc/init.d/datadog-agent jmx list_matching_attributes`
  * インスタンス構成の 1 つに一致するが、収集可能なメトリクス数を超えるために収集されない属性をリストする:
`sudo /etc/init.d/datadog-agent jmx list_limited_attributes`
  * 現在のインスタンス構成によって実際に収集される属性をリストする:
`sudo /etc/init.d/datadog-agent jmx list_collected_attributes`
  * どのインスタンス構成にも一致しない属性をリストする:
`sudo /etc/init.d/datadog-agent jmx list_not_matching_attributes`
  * JMXFetch でサポートされているタイプのすべての使用可能な属性をリストする:
`sudo /etc/init.d/datadog-agent jmx list_everything`
  * 現在の構成に基づいてメトリクスの収集を開始し、コンソールに表示する:
`sudo /etc/init.d/datadog-agent jmx collect`

## その他の参考資料
### 文字列値を数値にパースする
jmxfetch が **false** や **true** といった文字列値のみを返す場合は、それを Datadog のゲージメトリクスに変換して使用できます。たとえば、jmxfetch で次のような値を返すとします。

```
"myJmxfetch:false" = myJmxfetch:0
"myJmxfetch:true" = myJmxfetch:1
```

次のように `attribute` フィルターを使用します。

```
...
    attribute:
          myJmxfetch:
            alias: your_metric_name
            metric_type: gauge
            values:
              "false": 0
              "true": 1
```


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/solr/images/solrgraph.png
[2]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/ja/integrations/java
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-core/blob/master/solr/datadog_checks/solr/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/solr/metadata.csv


{{< get-dependencies >}}