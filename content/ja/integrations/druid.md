---
app_id: druid
app_uuid: 15b15f01-b342-4001-89ac-9e92fc4f3234
assets:
  dashboards:
    Druid Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: druid.service.health
      metadata_path: metadata.csv
      prefix: druid.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10074
    source_type_name: Druid
  logs:
    source: druid
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- キャッシュ
- data stores
- ログの収集
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/druid/README.md
display_on_public_website: true
draft: false
git_integration_title: druid
integration_id: druid
integration_title: Druid
integration_version: 2.5.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: druid
public_title: Druid
short_description: クエリ、取り込み、コーディネーションに関するメトリクスを追跡。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Category::Data Stores
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: クエリ、取り込み、コーディネーションに関するメトリクスを追跡。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Druid
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Druid ダッシュボード][1]

## 概要

Datadog Agent は [DogStatsD][2] を使用して Druid からメトリクスを収集します。DogStatsD は Druid のクエリ、取り込み、コーディネーションデータに関するメトリクスを収集します。詳細については、[Druid メトリクスドキュメント][3]をご参照ください。

メトリクスの収集に加え、Agent はDruid の健全性に関連するサービスチェックも送信します。

## 計画と使用

### 前提条件

このインテグレーションが正常に動作するには Druid 0.16 以上が必要です。

### インフラストラクチャーリスト

Druid インテグレーショが正常に動作するためには、下記の 2 ステップを実施する必要があります。ステップを開始する前に [Datadog Agent][4] をインストールしてください。

#### ステップ 1: 健全性メトリクスとサービスチェックを収集するように Druid を構成する

健全性メトリクスとサービスチェックを収集するように、[Datadog Agent][5] パッケージに含まれている Druid チェックを構成します。

1. Agent のコンフィギュレーションディレクトリのルートにある `conf.d/`  フォルダーで `druid.d/conf.yaml` ファイルを編集し、Druid サービスチェックの収集を開始します。利用可能なすべてのコンフィギュレーションオプションについては、[ druid.d/conf.yaml のサンプル][6]をご参照ください。
2. [Agent を再起動します][7]。

#### ステップ 2: 拡張子 `statsd-emitter` を使用して Druid をDogStatsD (Datadog Agent に含まれる) に関連付け、メトリクスの収集を開始する

`statsd-emitter` 拡張子を構成して多数の [Druid メトリクス][3]を収集するためのステップを以下に示します。

1. Druid 拡張子 [`statsd-emitter`][8] をインストールします。

   ```shell
   $ java \
     -cp "lib/*" \
     -Ddruid.extensions.directory="./extensions" \
     -Ddruid.extensions.hadoopDependenciesDir="hadoop-dependencies" \
     org.apache.druid.cli.Main tools pull-deps \
     --no-default-hadoop \
     -c "org.apache.druid.extensions.contrib:statsd-emitter:0.15.0-incubating"
   ```

    本ステップの詳細情報については、[Druid 拡張子のロードに関する公式ガイド][9]をご確認ください。

2. 下記のコンフィギュレーションを追加して、Druid Java プロパティを更新します。

   ```conf
   # Add `statsd-emitter` to the extensions list to be loaded
   druid.extensions.loadList=[..., "statsd-emitter"]

   # By default druid emission period is 1 minute (PT1M).
   # We recommend using 15 seconds instead:
   druid.monitoring.emissionPeriod=PT15S

   # Use `statsd-emitter` extension as metric emitter
   druid.emitter=statsd

   # Configure `statsd-emitter` endpoint
   druid.emitter.statsd.hostname=127.0.0.1
   druid.emitter.statsd.port:8125

   # Configure `statsd-emitter` to use dogstatsd format. Must be set to true, otherwise tags are not reported correctly to Datadog.
   druid.emitter.statsd.dogstatsd=true
   druid.emitter.statsd.dogstatsdServiceAsTag=true
   ```

3. Druid を再起動すると、DogStatsD を通して Agent に向けて Druid メトリクスの送信が開始されます。

#### インテグレーションサービスチェック

`druid.d/conf.yaml` ファイルのデフォルトコンフィギュレーションを使用して、Druid サービスチェックの収集を有効にします。利用可能なすべてのコンフィギュレーションオプションについては、[druid.d/conf.yaml][6]  のサンプルをご参照ください。

#### 収集データ

_Agent バージョン 6.0 以降で利用可能_

1. デフォルトでは、Datadog Agent のログの収集は無効化されています。以下のように `datadog.yaml` ファイルを使用して有効化します。

   ```yaml
   logs_enabled: true
   ```

2. `druid.d/conf.yaml` の下部にある、コンフィギュレーションブロックのコメントを解除して編集します。

   ```yaml
   logs:
     - type: file
       path: '<PATH_TO_DRUID_DIR>/var/sv/*.log'
       source: druid
       service: '<SERVICE_NAME>'
       log_processing_rules:
         - type: multi_line
           name: new_log_start_with_date
           pattern: \d{4}\-\d{2}\-\d{2}
   ```

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成します。

3. [Agent を再起動します][7]。

### 検証

[Agent のステータスサブコマンドを実行][10]し、Checks セクションで `druid` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "druid" >}}


### ヘルプ

Druid チェックには イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "druid" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][13]までお問合せください。


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/druid/images/druid_dashboard_overview.png
[2]: https://docs.datadoghq.com/ja/developers/dogstatsd/
[3]: https://druid.apache.org/docs/latest/operations/metrics.html
[4]: https://docs.datadoghq.com/ja/agent/
[5]: https://app.datadoghq.com/account/settings/agent/latest
[6]: https://github.com/DataDog/integrations-core/blob/master/druid/datadog_checks/druid/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://druid.apache.org/docs/latest/development/extensions-contrib/statsd.html
[9]: https://druid.apache.org/docs/latest/operations/including-extensions.html
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[11]: https://github.com/DataDog/integrations-core/blob/master/druid/metadata.csv
[12]: https://github.com/DataDog/integrations-core/blob/master/druid/assets/service_checks.json
[13]: https://docs.datadoghq.com/ja/help/