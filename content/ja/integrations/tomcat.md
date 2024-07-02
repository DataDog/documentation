---
"app_id": "tomcat"
"app_uuid": "9497c2d8-63cb-4d90-b73c-f32065349fe1"
"assets":
  "dashboards":
    "tomcat": "assets/dashboards/metrics.json"
    "tomcat--overview": "assets/dashboards/overview.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "tomcat.threads.count"
      "metadata_path": "metadata.csv"
      "prefix": "tomcat."
    "process_signatures":
    - "java tomcat"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "43"
    "source_type_name": "Tomcat"
  "monitors":
    "[Tomcat] % of busy threads is high for host: {{host.name}}": "assets/monitors/thread_busy.json"
    "[Tomcat] % of thread count managed by the thread pool is high for host: {{host.name}}": "assets/monitors/thread_count_max.json"
    "[Tomcat] Anomalous average processing time for host {{host.name}}": "assets/monitors/processing_time.json"
    "[Tomcat] Anomalous max processing time for host {{host.name}}": "assets/monitors/max_proc_time.json"
    "[Tomcat] Anomalous request rate for host {{host.name}}": "assets/monitors/req_count.json"
    "[Tomcat] Increase of the errors/second rate for host: {{host.name}}": "assets/monitors/error_count.json"
  "saved_views":
    "tomcat_4xx": "assets/saved_views/tomcat_4xx.json"
    "tomcat_5xx": "assets/saved_views/tomcat_5xx.json"
    "tomcat_overview": "assets/saved_views/tomcat_overview.json"
    "tomcat_processes": "assets/saved_views/tomcat_processes.json"
    "tomcat_status_code_overview": "assets/saved_views/tomcat_status_code_overview.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "caching"
- "log collection"
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/tomcat/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "tomcat"
"integration_id": "tomcat"
"integration_title": "Tomcat"
"integration_version": "2.0.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "tomcat"
"public_title": "Tomcat"
"short_description": "毎秒のリクエスト数、処理バイト数、キャッシュヒット数、サーブレットメトリクスなどを追跡。"
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::キャッシュ"
  - "Category::ログの収集"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": "毎秒のリクエスト数、処理バイト数、キャッシュヒット数、サーブレットメトリクスなどを追跡。"
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Tomcat"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Tomcat ダッシュボード][1]

## 概要

このチェックは、次のような Tomcat メトリクスを収集します。

- 全体的なアクティビティメトリクス: エラー数、リクエスト数、処理時間など
- スレッドプールメトリクス: スレッド数、ビジースレッド数など
- サーブレット処理時間

## セットアップ

### インストール

Tomcat チェックは [Datadog Agent][2] パッケージに含まれています。Tomcat サーバーに追加でインストールする必要はありません。

このチェックは JMX ベースなので、Tomcat サーバーで JMX リモートを有効にする必要があります。この方法については、[Tomcat の監視と管理][3]の手順に従ってください。

### 構成

{{< tabs >}}
{{% tab "ホスト" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには

1. Tomcat のメトリクスと[ログ](#ログ収集)を収集するには、[Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `tomcat.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[tomcat.d/conf.yaml のサンプル][2]を参照してください。

2. [Agent を再起動します][3]。

JMX ベースのすべてのチェックで使用可能なコンフィギュレーションオプションのリストについては、[JMX チェックに関するドキュメント][4]を参照してください。

#### メトリクスのリスト

`conf` パラメーターは、インテグレーションによって収集されるメトリクスのリストです。次の 2 つのキーのみが許可されます。

- `include` (**必須**): フィルターの辞書。これらのフィルターに一致する属性は、`exclude` フィルターにも一致している場合を除き、収集されます (以下を参照)。
- `exclude` (**任意**): フィルターの辞書。これらのフィルターに一致する属性は収集されません。

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

#### ログ収集


1. ログを Datadog に送信する際、Tomcat は `log4j` ロガーを使用します。バージョン 8.0 より前の Tomcat では、`log4j` がデフォルトで構成されています。バージョン 8.0+ の Tomcat では、Tomcat を構成し `log4j` を使用する必要があります。[Log4 の使用][5]を参照してください。この手順の初めに、以下の要領で  `$CATALINA_BASE/lib` ディレクトリにある `log4j.properties` ファイルを編集します。

   ```conf
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
   そして、[Tomcat ドキュメント][5] の残りの手順に従い `log4j` を構成します。

2. Datadog のインテグレーションパイプラインは、デフォルトで、次の変換パターンをサポートします。

   ```text
     %d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %m%n
     %d [%t] %-5p %c - %m%n
   ```

    フォーマットが異なる場合は、[インテグレーションパイプライン][6]を複製して編集します。Tomcat のログ機能については、[Tomcat のログ][7]を参照してください。

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
       service: "<SERVICE>"
       #To handle multi line that starts with yyyy-mm-dd use the following pattern
       #log_processing_rules:
       #  - type: multi_line
       #    name: log_start_with_date
       #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
   ```

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル tomcat.yaml][2] を参照してください。

5. [Agent を再起動します][3]。

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/integrations/java/
[5]: https://tomcat.apache.org/tomcat-8.0-doc/logging.html#Using_Log4j
[6]: https://docs.datadoghq.com/logs/processing/#integration-pipelines
[7]: https://tomcat.apache.org/tomcat-7.0-doc/logging.html
{{% /tab %}}
{{% tab "コンテナ化" %}}

#### コンテナ化

コンテナ環境の場合は、[JMX を使用したオートディスカバリー][1]のガイドを参照してください。

[1]: https://docs.datadoghq.com/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][4]し、**Checks** セクションで `tomcat` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "tomcat" >}}


### イベント

Tomcat チェックには、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "tomcat" >}}


## トラブルシューティング

### `tomcat.*` メトリクスの欠落

The Datadog Agent collects JMX metrics with either `Catalina` or `Tomcat` as bean domain names with the Datadog Agent version **7.49.0** or later. Older versions only collect metrics with `Catalina` as the bean domain name.
Standalone Tomcat deployments have metrics under domain `Catalina`, but embedded Tomcat deployments (such as with Spring Boot) have metrics under domain `Tomcat`.

If the Datadog Agent version is older than **7.49.0**, and if the exposed Tomcat metrics are prefixed with a different bean domain name such as `Tomcat`, copy the default metrics from the `metrics.yaml` file to the `conf` section of the `tomcat.d/conf.yaml` file and modify the `domain` filter to use the applicable bean domain name.

```yaml
- include:
    domain: Tomcat
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
```

詳細については、[JMX Check ドキュメント][5]を参照してください。

### 使用可能なメトリクスを表示するコマンド

The `datadog-agent jmx` command allows you to run troubleshooting commands on JMXFetch integrations. On Linux systems, you will need to prepend the command with `sudo -u dd-agent` so that the Datadog Agent runs as the correct user.

#### datadog-agent jmx collect
Running `datadog-agent jmx collect` starts the collection of metrics based on your current configuration and displays them in the console.

#### datadog-agent jmx list
The `datadog-agent jmx list` has a number of available subcommands:
- `collected` - List attributes that will actually be collected by your current instance's configuration.
- `everything` - List every attribute available that has a type supported by JMXFetch.
- `limited` - List attributes that match one of your instances' configurations but that are not being collected because it would exceed the number of metrics that can be collected.
- `matching` - List attributes that match at least one of your instances' configurations.
- `not-matching` - List attributes that don't match any of your instances' configurations.
- `with-metrics` - List attributes and metrics data that match at least one of your instances' configurations.
- `with-rate-metrics` - List attributes and metrics data that match at least one of your instances' configurations, including rates and counters.

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog を使用した Tomcat メトリクスの監視][6]
- [Tomcat 監視のためのキーメトリクス][7]
- [Analyzing Tomcat logs and metrics with Datadog][8]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/tomcat/images/tomcat_dashboard_2.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://tomcat.apache.org/tomcat-10.1-doc/monitoring.html
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/integrations/java/
[6]: https://www.datadoghq.com/blog/monitor-tomcat-metrics
[7]: https://www.datadoghq.com/blog/tomcat-architecture-and-performance
[8]: https://www.datadoghq.com/blog/analyzing-tomcat-logs-and-metrics-with-datadog
