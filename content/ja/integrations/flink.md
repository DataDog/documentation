---
app_id: flink
app_uuid: 39d70c50-017c-407a-9117-2055d8e03427
assets:
  dashboards:
    Flink Overview: assets/dashboards/overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: flink.taskmanager.Status.JVM.CPU.Load
      metadata_path: metadata.csv
      prefix: flink.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: flink
  logs:
    source: flink
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ログの収集
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/flink/README.md
display_on_public_website: true
draft: false
git_integration_title: flink
integration_id: flink
integration_title: Flink
integration_version: 1.4.0
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: flink
oauth: {}
public_title: Flink
short_description: Flink ジョブのメトリクスを追跡する。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Flink ジョブのメトリクスを追跡する。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Flink
---



## 概要

このチェックは [Flink][1] を監視します。Datadog は Flink の [Datadog HTTP Reporter][2] を使用し、[Datadog の HTTP API][3] によって Flink のメトリクスを収集します。

## セットアップ

### APM に Datadog Agent を構成する

Flink チェックは [Datadog Agent][4] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

#### メトリクスの収集

1. Flink で [Datadog HTTP Reporter][2] を構成します。

   `<FLINK_HOME>/conf/flink-conf.yaml` に以下の行を追加し、`<DATADOG_API_KEY>` を Datadog [API キー][5]と置き換えます。

    ```yaml
    metrics.reporter.dghttp.factory.class: org.apache.flink.metrics.datadog.DatadogHttpReporterFactory
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
    metrics.reporter.dghttp.scope.variables.additional: <KEY1>:<VALUE1>, <KEY1>:<VALUE2>
    ```

     **注**: デフォルトでは、メトリクスの名前はタグとして送信され、識別されるため、`job_id` や `task_id` などのカスタムタグを追加する必要はありません。

4. Flink を再起動すると、Flink のメトリクスが Datadog に送信されます。

#### ログの収集

_Agent バージョン 6.0 以降で利用可能_

1. Flink はデフォルトで `log4j` ロガーを使用します。ファイルへのロギングを有効にするには、Flink ディストリビューションの `conf/` ディレクトリにある `log4j*.properties` コンフィギュレーションファイルを編集して、フォーマットをカスタマイズします。どのコンフィギュレーションファイルがあなたのセットアップに関連するかについては、[Flink のロギングに関するドキュメント][6]を参照してください。デフォルトの構成については、[Flink のリポジトリ][7]を参照してください。

2. インテグレーションパイプラインは、デフォルトで、次のレイアウトパターンをサポートします。

    ```text
    %d{yyyy-MM-dd HH:mm:ss,SSS} %-5p %-60c %x - %m%n
    ```

   タイムスタンプの部分には、たとえば `2020-02-03 18:43:12,251` などが入ります。

     フォーマットが異なる場合は、[インテグレーションパイプライン][8]を複製して編集してください。

3. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

4. `flink.d/conf.yaml` ファイルのコメントを解除して、ログコンフィギュレーションブロックを編集します。環境に基づいて、`path` パラメーターと `service` パラメーターの値を変更してください。使用可能なすべてのコンフィギュレーションオプションの詳細については、[flink.d/conf.yaml のサンプル][9]を参照してください。

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

5. [Agent を再起動します][10]。

### 検証

[Agent の status サブコマンドを実行][11]し、Checks セクションで `flink` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "flink" >}}


### サービスのチェック

Flink には、サービスのチェック機能は含まれません。

### イベント

Flink には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][13]までお問合せください。


[1]: https://flink.apache.org/
[2]: https://nightlies.apache.org/flink/flink-docs-release-1.16/docs/deployment/metric_reporters/#datadog
[3]: https://docs.datadoghq.com/ja/api/?lang=bash#api-reference
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://nightlies.apache.org/flink/flink-docs-release-1.16/docs/deployment/advanced/logging/
[7]: https://github.com/apache/flink/tree/release-1.16/flink-dist/src/main/flink-bin/conf
[8]: https://docs.datadoghq.com/ja/logs/processing/#integration-pipelines
[9]: https://github.com/DataDog/integrations-core/blob/master/flink/datadog_checks/flink/data/conf.yaml.example
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[11]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[12]: https://github.com/DataDog/integrations-core/blob/master/flink/metadata.csv
[13]: https://docs.datadoghq.com/ja/help/