---
app_id: hudi
categories:
- ログの収集
custom_kind: インテグレーション
description: Hudi の構成に関するメトリックスを追跡します。
integration_version: 4.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Hudi
---
## 概要

This check monitors [Hudi](https://hudi.apache.org/).
It is compatible with Hudi [versions](https://github.com/apache/hudi/releases) `0.10.0` and above.

## セットアップ

### インストール

The Hudi check is included in the [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) package.
No additional installation is needed on your server.

### 設定

1. [Configure](https://hudi.apache.org/docs/configurations#Metrics-Configurations) the [JMX Metrics Reporter](https://hudi.apache.org/docs/metrics/#jmxmetricsreporter) in Hudi:

   ```
   hoodie.metrics.on=true
   hoodie.metrics.reporter.type=JMX
   hoodie.metrics.jmx.host=<JMX_HOST>
   hoodie.metrics.jmx.port=<JMX_PORT>
   ```

1. Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `hudi.d/conf.yaml` ファイルを編集して、
   hudi パフォーマンスデータの収集を開始します。
   See the [sample hudi.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/hudi/datadog_checks/hudi/data/conf.yaml.example) for all available configuration options.

   This check has a limit of 350 metrics per instance. The number of returned metrics is indicated when running the Datadog Agent [status command](https://github.com/DataDog/integrations-core/blob/master/hudi/assets/service_checks.json).
   You can specify the metrics you are interested in by editing the [configuration](https://github.com/DataDog/integrations-core/blob/master/hudi/datadog_checks/hudi/data/conf.yaml.example).
   To learn how to customize the metrics to collect see the [JMX Checks documentation](https://docs.datadoghq.com/integrations/java/) for more detailed instructions.
   If you need to monitor more metrics, contact [Datadog support](https://docs.datadoghq.com/help/).

1. [Restart the Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent)

### 検証

[Run the Agent's `status` subcommand](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) and look for `hudi` under the Checks section.

## 収集データ

### メトリクス

| | |
| --- | --- |
| **hudi.action.bytes_written** <br>(rate) | The total amount of bytes written in an action (commit, deltacommit, replacecommit, compaction, etc)<br>_Shown as byte_ |
| **hudi.action.commit_time** <br>(gauge) | The commit time of an action (commit, deltacommit, replacecommit, compaction, etc)<br>_Shown as millisecond_ |
| **hudi.action.compacted_records_updated** <br>(rate) | The amount of compacted records updated in an action (commit, deltacommit, replacecommit, compaction, etc)<br>_Shown as record_ |
| **hudi.action.create_time** <br>(rate) | The creation time of an action (commit, deltacommit, replacecommit, compaction, etc)<br>_Shown as millisecond_ |
| **hudi.action.duration** <br>(gauge) | The amount of time it took to successfully perform an action on a batch of records (commit, deltacommit, replacecommit, compaction, etc)<br>_Shown as millisecond_ |
| **hudi.action.files_inserted** <br>(rate) | The amount of files inserted (commit, deltacommit, replacecommit, compaction, etc)<br>_Shown as file_ |
| **hudi.action.files_updated** <br>(rate) | The amount of files updated (commit, deltacommit, replacecommit, compaction, etc)<br>_Shown as file_ |
| **hudi.action.insert_records_written** <br>(rate) | The number of insert records written in an action (commit, deltacommit, replacecommit, compaction, etc)<br>_Shown as record_ |
| **hudi.action.log_files_compacted** <br>(rate) | The number of log files compacted in an action (commit, deltacommit, replacecommit, compaction, etc)<br>_Shown as file_ |
| **hudi.action.log_files_size** <br>(rate) | The size of all the log files in an action (commit, deltacommit, replacecommit, compaction, etc)<br>_Shown as byte_ |
| **hudi.action.partitions_written** <br>(rate) | The number of partitions written in an action (commit, deltacommit, replacecommit, compaction, etc)|
| **hudi.action.records_written** <br>(rate) | The number of records written in an action (commit, deltacommit, replacecommit, compaction, etc)<br>_Shown as record_ |
| **hudi.action.scan_time** <br>(rate) | The total time spent scanned in an action (commit, deltacommit, replacecommit, compaction, etc)<br>_Shown as millisecond_ |
| **hudi.action.time.50th_percentile** <br>(gauge) | Measures 50th percentile of time to complete the action (commit, deltacommit, replacecommit, compaction, etc)<br>_Shown as nanosecond_ |
| **hudi.action.time.75th_percentile** <br>(gauge) | Measures 75th percentile of time to complete an action (commit, deltacommit, replacecommit, compaction, etc)<br>_Shown as nanosecond_ |
| **hudi.action.time.95th_percentile** <br>(gauge) | Measures 95th percentile of time to complete an action (commit, deltacommit, replacecommit, compaction, etc)<br>_Shown as nanosecond_ |
| **hudi.action.time.98th_percentile** <br>(gauge) | Measures 98th percentile of time to complete an action (commit, deltacommit, replacecommit, compaction, etc)<br>_Shown as nanosecond_ |
| **hudi.action.time.999th_percentile** <br>(gauge) | Measures 999th percentile of time to complete an action (commit, deltacommit, replacecommit, compaction, etc)<br>_Shown as nanosecond_ |
| **hudi.action.time.99th_percentile** <br>(gauge) | Measures 99th percentile of time to complete an action (commit, deltacommit, replacecommit, compaction, etc)<br>_Shown as nanosecond_ |
| **hudi.action.time.count** <br>(rate) | Measures count of times to complete an action (commit, deltacommit, replacecommit, compaction, etc)|
| **hudi.action.time.max** <br>(gauge) | Measures maximum amount of time to complete an action (commit, deltacommit, replacecommit, compaction, etc)<br>_Shown as nanosecond_ |
| **hudi.action.time.mean** <br>(gauge) | Measures mean amount of time to complete an action (commit, deltacommit, replacecommit, compaction, etc)<br>_Shown as nanosecond_ |
| **hudi.action.time.min** <br>(gauge) | Measures minimum amount of time to complete an action (commit, deltacommit, replacecommit, compaction, etc)<br>_Shown as nanosecond_ |
| **hudi.action.time.std_dev** <br>(gauge) | Measures standard deviation of time to complete an action (commit, deltacommit, replacecommit, compaction, etc)<br>_Shown as nanosecond_ |
| **hudi.action.update_records_written** <br>(rate) | The amount of update records written in an action (commit, deltacommit, replacecommit, compaction, etc)<br>_Shown as record_ |
| **hudi.action.upsert_time** <br>(rate) | The upsert time of an action (commit, deltacommit, replacecommit, compaction, etc)<br>_Shown as millisecond_ |
| **hudi.clean.duration** <br>(gauge) | The total time spent cleaning<br>_Shown as millisecond_ |
| **hudi.clean.files_deleted** <br>(gauge) | The number of files deleted in cleans<br>_Shown as file_ |
| **hudi.finalize.duration** <br>(gauge) | The total time spent finalizing<br>_Shown as millisecond_ |
| **hudi.finalize.files_finalized** <br>(gauge) | The number of files finalized"<br>_Shown as file_ |
| **hudi.index.command.duration** <br>(gauge) | The time spent performing an index command (UPSERT, INSERT_OVERWRITE, etc)<br>_Shown as millisecond_ |
| **hudi.rollback.duration** <br>(gauge) | The total time spent in rollback<br>_Shown as millisecond_ |
| **hudi.rollback.files_deleted** <br>(gauge) | The number of files deleted in rollback<br>_Shown as file_ |

### ログ収集

_Agent バージョン 6.0 以降で利用可能_

1. Hudi uses the `log4j` logger by default. To customize the format, edit the `log4j.properties` file in either your [Flink](https://github.com/apache/flink/tree/release-1.11.4/flink-dist/src/main/flink-bin/conf) or [Spark](https://github.com/apache/spark/tree/v3.1.2/conf) `conf` directory. An example `log4j.properties` file is:

   ```conf
    log4j.rootCategory=INFO, file
    log4j.appender.file=org.apache.log4j.FileAppender
    log4j.appender.file.File=/var/log/hudi.log
    log4j.appender.file.append=false
    log4j.appender.file.layout=org.apache.log4j.PatternLayout
    log4j.appender.file.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss,SSS} %-5p %-60c %x - %m%n
   ```

1. Datadog のインテグレーションパイプラインは、デフォルトで、次の変換パターンをサポートします。

   ```text
   %d{yyyy-MM-dd HH:mm:ss,SSS} %-5p %-60c %x - %m%n
   ```

   An example of a valid timestamp is: `2020-02-03 18:43:12,251`.

   Clone and edit the [integration pipeline](https://docs.datadoghq.com/logs/processing/#integration-pipelines) if you have a different format.

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

1. Uncomment and edit the logs configuration block in your `hudi.d/conf.yaml` file. Change the `path` and `service` parameter values based on your environment. See the [sample hudi.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/hudi/datadog_checks/hudi/data/conf.yaml.example) for all available configuration options.

   ```yaml
   logs:
     - type: file
       path: /var/log/hudi.log
       source: hudi
       log_processing_rules:
         - type: multi_line
           pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
           name: new_log_start_with_date
   ```

### イベント

Hudi インテグレーションには、イベントは含まれません。

### サービス チェック

**hudi.can_connect**

Returns `CRITICAL` if the Agent is unable to connect to and collect metrics from the monitored Hudi instance, `WARNING` if no metrics are collected, and `OK` otherwise.

_Statuses: ok, critical, warning_

## トラブルシューティング

お問合せは、[Datadog サポート](https://docs.datadoghq.com/help/) まで。