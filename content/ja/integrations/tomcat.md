---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/tomcat/README.md'
display_name: Tomcat
git_integration_title: tomcat
guid: 60f37d34-3bb7-43c9-9b52-2659b8898997
integration_id: tomcat
integration_title: Tomcat
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: tomcat.
metric_to_check: tomcat.threads.count
name: tomcat
process_signatures:
  - java tomcat
public_title: Datadog-Tomcat インテグレーション
short_description: 毎秒のリクエスト数、処理バイト数、キャッシュヒット数、サーブレットメトリクスなどを追跡 and more.
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
![Tomcat ダッシュボード][1]

## 概要

このチェックは、次のような Tomcat メトリクスを収集します。

* 全体的なアクティビティメトリクス: エラー数、リクエスト数、処理時間
* スレッドプールメトリクス: スレッド数、ビジースレッド数
* サーブレット処理時間

これらは一例です。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Tomcat チェックは [Datadog Agent][3] パッケージに含まれています。Tomcat サーバーに追加でインストールする必要はありません。

このチェックは JMX ベースなので、Tomcat サーバーで JMX リモートを有効にする必要があります。この方法については、[Tomcat のドキュメント][4]の手順に従ってください。

### コンフィグレーション

1. Tomcat の[メトリクス](#metric-collection)と[ログ](#log-collection)の収集を開始するには、[Agent の構成ディレクトリ][5]のルートにある `conf.d/` フォルダーの `tomcat.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル tomcat.d/conf.yaml][6] を参照してください。

2. [Agent を再起動します][7]。

#### メトリクスの収集

*  [Tomcat のメトリクス](#metrics)の収集を開始するには、`tomcat.yaml` ファイルに次の構成ブロックを追加します。

```
instances:
    -   host: localhost
        port: 7199
        user: <TOMCAT_USERNAME>
        password: <PASSWORD>
        name: my_tomcat

init_config:
  conf:
    - include:
        type: ThreadPool
        attribute:
          maxThreads:
            alias: tomcat.threads.max
            metric_type: gauge
          currentThreadCount:
            alias: tomcat.threads.count
            metric_type: gauge
          currentThreadsBusy:
            alias: tomcat.threads.busy
            metric_type: gauge
    - include:
        type: GlobalRequestProcessor
        attribute:
          bytesSent:
            alias: tomcat.bytes_sent
            metric_type: counter
          bytesReceived:
            alias: tomcat.bytes_rcvd
            metric_type: counter
          errorCount:
            alias: tomcat.error_count
            metric_type: counter
          requestCount:
            alias: tomcat.request_count
            metric_type: counter
          maxTime:
            alias: tomcat.max_time
            metric_type: gauge
          processingTime:
            alias: tomcat.processing_time
            metric_type: counter
    - include:
        j2eeType: Servlet
        attribute:
          processingTime:
            alias: tomcat.servlet.processing_time
            metric_type: counter
          errorCount:
            alias: tomcat.servlet.error_count
            metric_type: counter
          requestCount:
            alias: tomcat.servlet.request_count
            metric_type: counter
    - include:
        type: Cache
        attribute:
          accessCount:
            alias: tomcat.cache.access_count
            metric_type: counter
          hitsCounts:
            alias: tomcat.cache.hits_count
            metric_type: counter
    - include:
        type: JspMonitor
        attribute:
          jspCount:
            alias: tomcat.jsp.count
            metric_type: counter
          jspReloadCount:
            alias: tomcat.jsp.reload_count
            metric_type: counter
```

JMX ベースのすべてのチェックで使用可能な構成オプションのリストについては、[JMX チェックに関するドキュメント][8]を参照してください。このページには、Agent が JMX メトリクスをどのようにタグ付けするかについても記載されています。

[Agent を再起動][7]すると、Datadog への Tomcat メトリクスの送信が開始されます。

構成オプション

| オプション                                        | 必須 | 説明                                                                                                                                                                |
|-----------------------------------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `user` と `password`                         | いいえ       | ユーザー名とパスワード                                                                                                                                                      |
| `process_name_regex`                          | いいえ       | ホストとポートまたは `jmx_url` を指定する代わりに、Agent は接続 API を使用して接続できます。それには、JDK をインストールして tools.jar のパスを設定する必要があります。 |
| `tools_jar_path`                              | いいえ       | `process_name_regex` が設定される場合に設定する必要があります。                                                                                                                            |
| `java_bin_path`                               | いいえ       | Agent が Java 実行可能ファイルを検出できない場合に設定する必要があります。                                                                                                               |
| `java_options`                                | いいえ       | Java JVM オプション                                                                                                                                                           |
| `trust_store_path` および `trust_store_password` | いいえ       | ターゲットの JVM で `com.sun.management.jmxremote.ssl` が true に設定されている場合に、設定する必要があります。                                                                                      |
| `key_store_path` と `key_store_password`     | いいえ       | ターゲットの JVM で `com.sun.management.jmxremote.ssl.need.client.auth` が true に設定されている場合に、設定する必要があります。                                                                     |
| `rmi_registry_ssl`                            | いいえ       | ターゲットの JVM で `com.sun.management.jmxremote.registry.ssl` が true に設定されている場合は、このオプションも true に設定する必要があります。                                                                     |

`conf` パラメーターは、辞書のリストです。この辞書では、次の 2 つのキーのみが許可されます。

| キー       | 必須 | 説明                                                                                                                   |
|-----------|----------|-------------------------------------------------------------------------------------------------------------------------------|
| `include` | はい      | フィルターの辞書。これらのフィルターに一致する属性は、"exclude" フィルターにも一致している場合を除き、収集されます。 |
| `exclude` | いいえ       | フィルターの辞書。これらのフィルターに一致する属性は収集されません。                                              |

特定の Bean に対して、メトリクスは次のようにタグ付けされます。

    mydomain:attr0=val0,attr1=val1

メトリクスは mydomain (Bean 内の属性によっては多少異なる) になり、タグ `attr0:val0、attr1:val1、domain:mydomain` が付きます。

`include` キー内の指定したエイリアスがキャメルケースとして書式設定されている場合、スネークケースに変換されます。たとえば `MyMetricName` は、Datadog では `my_metric_name` と表示されます。

使用可能なすべての構成オプションの詳細については、[サンプル tomcat.yaml][6] を参照してください。

##### 属性フィルター

`attribute` フィルターは、次の 2 種類の値を受け入れます。

* キーが属性名の辞書。

```
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

この場合は、指定されたメトリクスエイリアスが Datadog のメトリクス名になります。また、メトリクスタイプとして、ゲージまたはカウンターを指定できます。カウンターを選択した場合は、このメトリクスの秒あたりの速度が計算されます。

* 属性名のリスト。

```
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

この場合、

  * メトリクスタイプはゲージです。
  * メトリクス名は `jmx.\[DOMAIN_NAME].\[ATTRIBUTE_NAME]` です。

これは別のフィルタリングの例です。

```
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
```

<div class="alert alert-warning">
  <b>注:</b> フィルターのリストは、5.3.0 より新しい Datadog Agent でのみサポートされます。以前のバージョンを使用している場合は、代わりにシングルトンと複数の <code>include</code> ステートメントを使用します。
</div>

```
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
```

#### ログの収集

**Agent 6.0 以上で使用可能**

1. Tomcat は、デフォルトで `log4j` ロガーを使用します。ファイルへのログ記録を有効にし、ログ形式をカスタマイズするには、`$CATALINA_BASE/lib` ディレクトリにある `log4j.properties` ファイルを以下のように編集します。

    ```
      log4j.rootLogger = INFO, CATALINA

      # Define all the appenders
      log4j.appender.CATALINA = org.apache.log4j.DailyRollingFileAppender
      log4j.appender.CATALINA.File = /var/log/tomcat/catalina.log
      log4j.appender.CATALINA.Append = true

      # Roll-over the log once per day
      log4j.appender.CATALINA.layout = org.apache.log4j.PatternLayout
      log4j.appender.CATALINA.layout.ConversionPattern = %d{yyyy-MM-dd HH:mm:ss} %-5p [%t] %c{1}:%L - %m%n

      log4j.appender.LOCALHOST = org.apache.log4j.DailyRollingFileAppender
      log4j.appender.LOCALHOST.File = /var/log/tomcat/localhost.log
      log4j.appender.LOCALHOST.Append = true
      log4j.appender.LOCALHOST.layout = org.apache.log4j.PatternLayout
      log4j.appender.LOCALHOST.layout.ConversionPattern = %d{yyyy-MM-dd HH:mm:ss} %-5p [%t] %c{1}:%L - %m%n

      log4j.appender.MANAGER = org.apache.log4j.DailyRollingFileAppender
      log4j.appender.MANAGER.File = /var/log/tomcat/manager.log
      log4j.appender.MANAGER.Append = true
      log4j.appender.MANAGER.layout = org.apache.log4j.PatternLayout
      log4j.appender.MANAGER.layout.ConversionPattern = %d{yyyy-MM-dd HH:mm:ss} %-5p [%t] %c{1}:%L - %m%n

      log4j.appender.HOST-MANAGER = org.apache.log4j.DailyRollingFileAppender
      log4j.appender.HOST-MANAGER.File = /var/log/tomcat/host-manager.log
      log4j.appender.HOST-MANAGER.Append = true
      log4j.appender.HOST-MANAGER.layout = org.apache.log4j.PatternLayout
      log4j.appender.HOST-MANAGER.layout.ConversionPattern = %d{yyyy-MM-dd HH:mm:ss} %-5p [%t] %c{1}:%L - %m%n

      log4j.appender.CONSOLE = org.apache.log4j.ConsoleAppender
      log4j.appender.CONSOLE.layout = org.apache.log4j.PatternLayout
      log4j.appender.CONSOLE.layout.ConversionPattern = %d{yyyy-MM-dd HH:mm:ss} %-5p [%t] %c{1}:%L - %m%n

      # Configure which loggers log to which appenders
      log4j.logger.org.apache.catalina.core.ContainerBase.[Catalina].[localhost] = INFO, LOCALHOST
      log4j.logger.org.apache.catalina.core.ContainerBase.[Catalina].[localhost].[/manager] =\
        INFO, MANAGER
      log4j.logger.org.apache.catalina.core.ContainerBase.[Catalina].[localhost].[/host-manager] =\
        INFO, HOST-MANAGER
    ```

2. Datadog のインテグレーションパイプラインは、デフォルトで、次の変換パターンをサポートします。

    ```
      %d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %m%n
      %d [%t] %-5p %c - %m%n
    ```

    フォーマットが異なる場合は、[インテグレーションパイプライン][10]を複製して編集してください。Tomcat のログ機能の詳細については、Tomcat の[ログに関するドキュメント][9]を確認してください。

3. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

    ```yaml
      logs_enabled: true
    ```

4. Tomcat のログの収集を開始するには、次の構成ブロックを `tomcat.d/conf.yaml` ファイルに追加します。

    ```yaml
      logs:
        - type: file
          path: /var/log/tomcat/*.log
          source: tomcat
          service: myapp
          #To handle multi line that starts with yyyy-mm-dd use the following pattern
          #log_processing_rules:
          #  - type: multi_line
          #    name: log_start_with_date
          #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
    ```

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。使用可能なすべての構成オプションの詳細については、[サンプル tomcat.yaml][6] を参照してください。

5. [Agent を再起動します][7]。

### 検証

[Agent の status サブコマンドを実行][11]し、**Checks** セクションで `tomcat` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "tomcat" >}}


### イベント
Tomcat チェックには、イベントは含まれません。

### サービスのチェック

**tomcat.can_connect**:<br>
Agent が監視対象の Tomcat インスタンスに接続できず、メトリクスを収集できない場合は、`CRITICAL` を返します。そうでない場合は、`OK` を返します。

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
お役に立つドキュメント、リンクや記事:

* [Datadog を使用した Tomcat メトリクスの監視][13]
* [Tomcat 監視のためのキーメトリクス][14]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/tomcat/images/tomcat_dashboard.png
[2]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://tomcat.apache.org/tomcat-6.0-doc/monitoring.html
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/integrations/java
[9]: https://tomcat.apache.org/tomcat-7.0-doc/logging.html
[10]: https://docs.datadoghq.com/ja/logs/processing/#integration-pipelines
[11]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[12]: https://github.com/DataDog/integrations-core/blob/master/tomcat/metadata.csv
[13]: https://www.datadoghq.com/blog/monitor-tomcat-metrics
[14]: https://www.datadoghq.com/blog/tomcat-architecture-and-performance


{{< get-dependencies >}}