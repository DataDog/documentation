---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs:
    source: tomcat
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - log collection
  - autodiscovery
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
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: tomcat.
metric_to_check: tomcat.threads.count
name: tomcat
process_signatures:
  - java tomcat
public_title: Datadog-Tomcat インテグレーション
short_description: 毎秒のリクエスト数、処理バイト数、キャッシュヒット数、サーブレットメトリクスなどを追跡。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
![Tomcat ダッシュボード][1]

## 概要

このチェックは、次のような Tomcat メトリクスを収集します。

- 全体的なアクティビティメトリクス: エラー数、リクエスト数、処理時間など
- スレッドプールメトリクス: スレッド数、ビジースレッド数など
- サーブレット処理時間

## セットアップ

### インストール

Tomcat チェックは [Datadog Agent][2] パッケージに含まれています。Tomcat サーバーに追加でインストールする必要はありません。

このチェックは JMX ベースなので、Tomcat サーバーで JMX リモートを有効にする必要があります。この方法については、[Tomcat のドキュメント][3]の手順に従ってください。

### 構成

#### ホスト

ホストで実行中の Agent でこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#コンテナ化)セクションを参照してください。

1. Tomcat のメトリクスと[ログ](#log-collection)を収集するには、[Agent のコンフィギュレーションディレクトリ][4]のルートにある `conf.d/` フォルダーの `tomcat.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[tomcat.d/conf.yaml のサンプル][5]を参照してください。

2. [Agent を再起動します][6]。

JMX ベースのすべてのチェックで使用可能なコンフィギュレーションオプションのリストについては、[JMX チェックに関するドキュメント][7]を参照してください。

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

#### ログの収集

_Agent バージョン 6.0 以降で利用可能_

1. Tomcat は、デフォルトで `log4j` ロガーを使用します。ファイルへのログ記録を有効にし、ログ形式をカスタマイズするには、`$CATALINA_BASE/lib` ディレクトリにある `log4j.properties` ファイルを以下のように編集します。

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

2. Datadog のインテグレーションパイプラインは、デフォルトで、次の変換パターンをサポートします。

   ```text
     %d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %m%n
     %d [%t] %-5p %c - %m%n
   ```

    フォーマットが異なる場合は、[インテグレーションパイプライン][8]を複製して編集してください。Tomcat のログ機能の詳細については、Tomcat の[ログに関するドキュメント][9]を確認してください。

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

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル tomcat.yaml][5] を参照してください。

5. [Agent を再起動します][6]。

#### コンテナ化

コンテナ環境の場合は、[JMX を使用したオートディスカバリー][10]のガイドを参照してください。

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

- 1 つ以上のインスタンス構成に一致する属性をリストする:
  `sudo /etc/init.d/datadog-agent jmx list_matching_attributes`
- インスタンス構成の 1 つに一致するが、収集可能なメトリクス数を超えるために収集されない属性をリストする:
  `sudo /etc/init.d/datadog-agent jmx list_limited_attributes`
- 現在のインスタンス構成によって実際に収集される属性をリストする:
  `sudo /etc/init.d/datadog-agent jmx list_collected_attributes`
- どのインスタンス構成にも一致しない属性をリストする:
  `sudo /etc/init.d/datadog-agent jmx list_not_matching_attributes`
- JMXFetch でサポートされているタイプのすべての使用可能な属性をリストする:
  `sudo /etc/init.d/datadog-agent jmx list_everything`
- 現在の構成に基づいてメトリクスの収集を開始し、コンソールに表示する:
  `sudo /etc/init.d/datadog-agent jmx collect`

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog を使用した Tomcat メトリクスの監視][13]
- [Tomcat 監視のためのキーメトリクス][14]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/tomcat/images/tomcat_dashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://tomcat.apache.org/tomcat-6.0-doc/monitoring.html
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/integrations/java/
[8]: https://docs.datadoghq.com/ja/logs/processing/#integration-pipelines
[9]: https://tomcat.apache.org/tomcat-7.0-doc/logging.html
[10]: https://docs.datadoghq.com/ja/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[11]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[12]: https://github.com/DataDog/integrations-core/blob/master/tomcat/metadata.csv
[13]: https://www.datadoghq.com/blog/monitor-tomcat-metrics
[14]: https://www.datadoghq.com/blog/tomcat-architecture-and-performance