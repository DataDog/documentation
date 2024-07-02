---
"app_id": "hudi"
"app_uuid": "ee9cd120-9667-4a81-a309-c34f5942406a"
"assets":
  "dashboards":
    "Hudi Overview": assets/dashboards/overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": hudi.action.duration
      "metadata_path": metadata.csv
      "prefix": hudi.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10217"
    "source_type_name": Hudi
  "monitors":
    "commit_duration": assets/monitors/commit_duration.json
  "saved_views":
    "hudi_error_logs": assets/saved_views/error_logs.json
    "hudi_overview": assets/saved_views/hudi_overview.json
    "hudi_patterns": assets/saved_views/hudi_patterns.json
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- log collection
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/hudi/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "hudi"
"integration_id": "hudi"
"integration_title": "Hudi"
"integration_version": "2.3.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "hudi"
"public_title": "Hudi"
"short_description": "Track metrics for your Hudi configuration."
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Log Collection"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Track metrics for your Hudi configuration.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Hudi
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは [Hudi][1] を監視しています。
Hudi [バージョン][2] `0.10.0` 以降と互換性があります。

## セットアップ

### インストール

Hudi チェックは [Datadog Agent][3] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### 構成

1. Hudi で [JMX Metrics Reporter][5] を[構成][4]します。

    ```
    hoodie.metrics.on=true
    hoodie.metrics.reporter.type=JMX
    hoodie.metrics.jmx.host=<JMX_HOST>
    hoodie.metrics.jmx.port=<JMX_PORT>
    ```


2. Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `hudi.d/conf.yaml` ファイルを編集して、
   hudi パフォーマンスデータの収集を開始します。
   使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル hudi.d/conf.yaml][6] を参照してください。

   このチェックは、1 インスタンスあたり 350 メトリクスの制限があります。返されたメトリクスの数は、Datadog Agent の [status コマンド][7]を実行したときに表示されます。
   [構成][6]を編集することで、関心があるメトリクスを指定できます。
   収集するメトリクスをカスタマイズする方法については、[JMX チェックのドキュメント][8]で詳細な手順を参照してください。
    制限以上のメトリクスを監視する必要がある場合は、[Datadog のサポートチーム][9]までお問い合わせください。

3. [Agent を再起動します][10]


### 検証

[Agent の `status` サブコマンドを実行][11]し、Checks セクションで `hudi` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "hudi" >}}



### ログ収集

_Agent バージョン 6.0 以降で利用可能_

1. Hudi はデフォルトで `log4j` というロガーを使用します。フォーマットをカスタマイズするには、[Flink][13] または [Spark][14] の `conf` ディレクトリにある `log4j.properties` ファイルを編集してください。以下に `log4j.properties` ファイルの例を挙げます。

   ```conf
    log4j.rootCategory=INFO, file
    log4j.appender.file=org.apache.log4j.FileAppender
    log4j.appender.file.File=/var/log/hudi.log
    log4j.appender.file.append=false
    log4j.appender.file.layout=org.apache.log4j.PatternLayout
    log4j.appender.file.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss,SSS} %-5p %-60c %x - %m%n
   ```

2. Datadog のインテグレーションパイプラインは、デフォルトで、次の変換パターンをサポートします。

    ```text
    %d{yyyy-MM-dd HH:mm:ss,SSS} %-5p %-60c %x - %m%n
    ```

   タイムスタンプの部分には、たとえば `2020-02-03 18:43:12,251` などが入ります。

     フォーマットが異なる場合は、[インテグレーションパイプライン][15]を複製して編集してください。

3. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

4. `hudi.d/conf.yaml` ファイルのコメントを解除して、ログコンフィギュレーションブロックを編集します。環境に基づいて、`path` パラメーターと `service` パラメーターの値を変更してください。使用可能なすべてのコンフィギュレーションオプションの詳細については、[hudi.d/conf.yaml のサンプル][6]を参照してください。

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

### サービスチェック
{{< get-service-checks-from-git "hudi" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。


[1]: https://hudi.apache.org/
[2]: https://github.com/apache/hudi/releases
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://hudi.apache.org/docs/configurations#Metrics-Configurations
[5]: https://hudi.apache.org/docs/metrics/#jmxmetricsreporter
[6]: https://github.com/DataDog/integrations-core/blob/master/hudi/datadog_checks/hudi/data/conf.yaml.example
[7]: https://github.com/DataDog/integrations-core/blob/master/hudi/assets/service_checks.json
[8]: https://docs.datadoghq.com/integrations/java/
[9]: https://docs.datadoghq.com/help/
[10]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[11]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[12]: https://github.com/DataDog/integrations-core/blob/master/hudi/metadata.csv
[13]: https://github.com/apache/flink/tree/release-1.11.4/flink-dist/src/main/flink-bin/conf
[14]: https://github.com/apache/spark/tree/v3.1.2/conf
[15]: https://docs.datadoghq.com/logs/processing/#integration-pipelines

