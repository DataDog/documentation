---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Flink Overview: assets/dashboards/overview.json
  logs:
    source: flink
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - 処理
  - ログの収集
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/flink/README.md'
display_name: flink
draft: false
git_integration_title: flink
guid: 8b3e5591-533e-4504-aabb-e697f07461ca
integration_id: flink
integration_title: Flink
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: flink.
metric_to_check: flink.taskmanager.Status.JVM.CPU.load
name: flink
public_title: Datadog-Flink インテグレーション
short_description: Flink ジョブのメトリクスを追跡する。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは [Flink][1] を監視します。Datadog は Flink の [Datadog HTTP Reporter][2] を使用し、[Datadog の HTTP API][3] によって Flink のメトリクスを収集します。

## セットアップ

### インストール

Flink チェックは [Datadog Agent][4] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

#### メトリクスの収集

1. Flink で [Datadog HTTP Reporter][2] を構成します。

     `<FLINK_HOME>/opt/flink-metrics-datadog-<DATADOG_REPORTER_VERSION>.jar` を `<FLINK_HOME>/lib` フォルダーにコピーします。`<FLINK_HOME>/conf/flink-conf.yaml` に以下の行を追加し、`<DATADOG_API_KEY>` に Datadog [API キー][5]を入力してください。

    ```yaml
    metrics.reporter.dghttp.class: org.apache.flink.metrics.datadog.DatadogHttpReporter
    metrics.reporter.dghttp.apikey: <DATADOG_API_KEY>
    metrics.reporter.dghttp.dataCenter: {{< region-param key="dd_datacenter" >}}
    ```

2. `<FLINK_HOME>/conf/flink-conf.yaml` で、システムのスコープを再マッピングします。

    ```yaml
    metrics.scope.jm: flink.jobmanager
    metrics.scope.jm.job: flink.jobmanager.job
    metrics.scope.tm: flink.taskmanager
    metrics.scope.tm.job: flink.taskmanager.job
    metrics.scope.task: flink.task
    metrics.scope.operator: flink.operator
    ```

     **注**: Flink のメトリクスをサポートするには、システムスコープをマッピングし直す必要があります。しない場合は、カスタムメトリクスとして送信されます。

3. `<FLINK_HOME>/conf/flink-conf.yaml` に、たとえば以下のカスタムタグのような[タグ][2]を追加します。

    ```yaml
    metrics.reporter.dghttp.tags: <KEY1>:<VALUE1>, <KEY1>:<VALUE2>
    ```

     **注**: デフォルトでは、メトリクスの名前はタグとして送信され、識別されるため、`job_id` や `task_id` などのカスタムタグを追加する必要はありません。

4. Flink を再起動すると、Flink のメトリクスが Datadog に送信されます。

#### ログの収集

_Agent バージョン 6.0 以降で利用可能_

1. Flink はデフォルトで `log4j` ロガーを使用します。ファイルへのログ記録をアクティブにし、フォーマットをカスタマイズするには、`log4j.properties`、`log4j-cli.properties`、`log4j-yarn-session.properties`、または `log4j-console.properties` ファイルを編集します。デフォルトのコンフィギュレーションについては、[Flink に関するドキュメント][6]を参照してください。たとえば、`log4j.properties` にはデフォルトで以下のコンフィギュレーションが含まれます。

   ```conf
   log4j.appender.file=org.apache.log4j.FileAppender
   log4j.appender.file.file=${log.file}
   log4j.appender.file.append=false
   log4j.appender.file.layout=org.apache.log4j.PatternLayout
   log4j.appender.file.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss,SSS} %-5p %-60c %x - %m%n
   ```

2. Datadog のインテグレーションパイプラインは、デフォルトで、次の変換パターンをサポートします。

    ```text
    %d{yyyy-MM-dd HH:mm:ss,SSS} %-5p %-60c %x - %m%n
    ```

   タイムスタンプの部分には、たとえば `2020-02-03 18:43:12,251` などが入ります。

     フォーマットが異なる場合は、[インテグレーションパイプライン][7]を複製して編集してください。

3. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

4. `flink.d/conf.yaml` ファイルのコメントを解除して、ログコンフィギュレーションブロックを編集します。環境に基づいて、`path` パラメーターと `service` パラメーターの値を変更してください。使用可能なすべてのコンフィギュレーションオプションの詳細については、[flink.d/conf.yaml のサンプル][8]を参照してください。

   ```yaml
   logs:
     - type: file
       path: /var/log/flink/server.log
       source: flink
       service: myapp
       #To handle multi line that starts with yyyy-mm-dd use the following pattern
       #log_processing_rules:
       #  - type: multi_line
       #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
       #    name: new_log_start_with_date
   ```

5. [Agent を再起動します][9]。

### 検証

[Agent の status サブコマンドを実行][10]し、Checks セクションで `flink` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "flink" >}}


### サービスのチェック

Flink には、サービスのチェック機能は含まれません。

### イベント

Flink には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。

[1]: https://flink.apache.org/
[2]: https://ci.apache.org/projects/flink/flink-docs-release-1.9/monitoring/metrics.html#datadog-orgapacheflinkmetricsdatadogdatadoghttpreporter
[3]: https://docs.datadoghq.com/ja/api/?lang=bash#api-reference
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://app.datadoghq.com/account/settings#api
[6]: https://github.com/apache/flink/tree/master/flink-dist/src/main/flink-bin/conf
[7]: https://docs.datadoghq.com/ja/logs/processing/#integration-pipelines
[8]: https://github.com/DataDog/integrations-core/blob/master/flink/datadog_checks/flink/data/conf.yaml.example
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[11]: https://github.com/DataDog/integrations-core/blob/master/flink/metadata.csv
[12]: https://docs.datadoghq.com/ja/help/