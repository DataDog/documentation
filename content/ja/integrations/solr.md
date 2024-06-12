---
app_id: solr
app_uuid: 3733c24e-8466-4f3b-8411-59ef85c28302
assets:
  dashboards:
    solr: assets/dashboards/solr_dashboard.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: solr.searcher.numdocs
      metadata_path: metadata.csv
      prefix: solr.
    process_signatures:
    - solr start
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Solr
  logs:
    source: solr
  saved_views:
    solr_processes: assets/saved_views/solr_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- caching
- data store
- log collection
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/solr/README.md
display_on_public_website: true
draft: false
git_integration_title: solr
integration_id: solr
integration_title: Solr
integration_version: 1.12.1
is_public: true
manifest_version: 2.0.0
name: solr
public_title: Solr
short_description: リクエスト率、ハンドラーエラー、キャッシュミス、エビクションなどを監視
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::キャッシュ
  - Category::データストア
  - Category::ログの収集
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: リクエスト率、ハンドラーエラー、キャッシュミス、エビクションなどを監視
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Solr
---



![Solr グラフ][1]

## 概要

Solr チェックは、Solr クラスターの状態とパフォーマンスを追跡します。インデックス化されたドキュメント数、キャッシュのヒット数、エビクション数、平均リクエスト時間、毎秒の平均リクエスト数などのメトリクスを収集します。

## セットアップ

### インストール

Solr チェックは [Datadog Agent][2] パッケージに含まれています。Solr ノードに追加でインストールする必要はありません。

このチェックは JMX ベースなので、Solr サーバーで JMX リモートを有効にする必要があります。詳細については、[JMX チェックに関するドキュメント][3]を参照してください。

### コンフィギュレーション

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

1. [Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `solr.d/conf.yaml` ファイルを編集します。使用可能な全コンフィギュレーションオプションの詳細については、[サンプル solr.d/conf.yaml][2] を参照してください。

   ```yaml
   init_config:

     ## @param is_jmx - boolean - required
     ## Whether or not this file is a configuration for a JMX integration.
     #
     is_jmx: true

     ## @param collect_default_metrics - boolean - required
     ## Whether or not the check should collect all default metrics.
     #
     collect_default_metrics: true

   instances:
     ## @param host - string - required
     ## Solr host to connect to.
     - host: localhost

       ## @param port - integer - required
       ## Solr port to connect to.
       port: 9999
   ```

2. [Agent を再起動します][3]。

#### メトリクスのリスト

`conf` パラメーターは、インテグレーションによって収集されるメトリクスのリストです。次の 2 つのキーのみが許可されます。

- `include` (**必須**): フィルターの辞書。これらのフィルターに一致する属性は、`exclude` フィルターにも一致している場合を除き、収集されます (以下を参照)。
- `exclude` (**オプション**): フィルターの辞書。これらのフィルターに一致する属性は収集されません。

特定の Bean に対して、メトリクスは次のようにタグ付けされます。

```text
mydomain:attr0=val0,attr1=val1
```

この例では、メトリクスは `mydomain` (Bean 内の属性によっては多少異なる) になり、タグ `attr0:val0`、`attr1:val1`、`domain:mydomain` が付きます。

`include` キー内の指定したエイリアスが_キャメルケース_として書式設定されている場合、_スネークケース_に変換されます。たとえば `MyMetricName` は、Datadog では `my_metric_name` と表示されます。

##### 属性フィルター

`attribute` フィルターは、次の 2 種類の値を受け入れます。

- キーが属性名の辞書（以下を参照）。この場合、メトリクスのエイリアスを指定でき、それが Datadog でメトリクス名になります。ゲージまたはカウンターとしてメトリクスタイプを指定することもできます。カウンターを選択した場合は、メトリクスの秒あたりの速度が計算されます。

  ```yaml
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
  ```

- 属性名のリスト（以下を参照）。この場合、メトリクスタイプはゲージで、メトリクス名は `jmx.\[ドメイン名].\[属性名]` です。

  ```yaml
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
  ```

#### 以前のバージョン

フィルターのリストは、5.3.0 よりも新しい Datadog Agent でのみサポートされます。以前のバージョンを使用している場合は、代わりにシングルトンと複数の `include` ステートメントを使用します。

```yaml
# Datadog Agent > 5.3.0
  conf:
    - include:
      domain: domain_name
      bean:
        - first_bean_name
        - second_bean_name
# Older Datadog Agent versions
  conf:
    - include:
      domain: domain_name
      bean: first_bean_name
    - include:
      domain: domain_name
      bean: second_bean_name
```

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/solr/datadog_checks/solr/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[JMX を使用したオートディスカバリー][1]のガイドを参照してください。

##### ログの収集

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

      ```yaml
       logs_enabled: true
     ```

2. Solr はデフォルトで `log4j` ロガーを使用します。ログ出力のフォーマットをカスタマイズするには、[`server/resources/log4j2.xml`][2] ファイルを編集します。デフォルトでは、Datadog のインテグレーションパイプラインが以下のコンバージョン[パターン][3]をサポートします。

   ```text
   %maxLen{%d{yyyy-MM-dd HH:mm:ss.SSS} %-5p (%t) [%X{collection} %X{shard} %X{replica} %X{core}] %c{1.} %m%notEmpty{ =>%ex{short}}}{10240}%n
   ```

    フォーマットが異なる場合は、[インテグレーションパイプライン][4]を複製して編集してください。


3. `solr.d/conf.yaml` ファイルのコメントを解除して、ログコンフィギュレーションブロックを編集します。環境に基づいて、 `type`、`path`、`service` パラメーターの値を変更してください。使用可能なすべての構成オプションの詳細については、[サンプル solr.d/solr.yaml][5] を参照してください。

      ```yaml
       logs:
         - type: file
           path: /var/solr/logs/solr.log
           source: solr
           # To handle multi line that starts with yyyy-mm-dd use the following pattern
           # log_processing_rules:
           #   - type: multi_line
           #     pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
           #     name: new_log_start_with_date
     ```

4. [Agent を再起動します][6]。

Kubernetes 環境のログを有効にするには、[Kubernetes ログ収集][7]を参照してください。

[1]: https://docs.datadoghq.com/ja/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[2]: https://lucene.apache.org/solr/guide/configuring-logging.html#permanent-logging-settings
[3]: https://logging.apache.org/log4j/2.x/manual/layouts.html#Patterns
[4]: https://docs.datadoghq.com/ja/logs/processing/#integration-pipelines
[5]: https://github.com/DataDog/integrations-core/blob/master/solr/datadog_checks/solr/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/docker/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][4]し、Checks セクションで `solr` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "solr" >}}


### イベント

Solr チェックには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "solr" >}}


## トラブルシューティング

### 使用可能なメトリクスを表示するコマンド

バージョン 4.1.0 で `datadog-agent jmx` コマンドが追加されました。

- 1 つ以上のインスタンス構成に一致する属性をリストする:
  `sudo datadog-agent jmx list matching`
- インスタンス構成の 1 つに一致するが、収集可能なメトリクス数を超えるために収集されない属性をリストする:
  `sudo datadog-agent jmx list limited`
- 現在のインスタンス構成によって収集されると予想される属性をリストします。
  `sudo datadog-agent jmx list collected`
- どのインスタンス構成にも一致しない属性をリストする:
  `sudo datadog-agent jmx list not-matching`
- JMXFetch でサポートされているタイプのすべての使用可能な属性をリストする:
  `sudo datadog-agent jmx list everything`
- 現在の構成に基づいてメトリクスの収集を開始し、コンソールに表示する:
  `sudo datadog-agent jmx collect`

## その他の参考資料

### 文字列値を数値にパースする

jmxfetch が **false** や **true** といった文字列値のみを返す場合は、それを Datadog のゲージメトリクスに変換して使用できます。たとえば、jmxfetch で次のような値を返すとします。

```text
"myJmxfetch:false" = myJmxfetch:0
"myJmxfetch:true" = myJmxfetch:1
```

次のように `attribute` フィルターを使用します。

```yaml
# ...
attribute:
  myJmxfetch:
    alias: your_metric_name
    metric_type: gauge
    values:
      "false": 0
      "true": 1
```


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/solr/images/solrgraph.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/integrations/java/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information