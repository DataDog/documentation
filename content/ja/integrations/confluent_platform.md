---
app_id: confluent-platform
app_uuid: 14e9ea66-bd7c-4c84-b642-a0290166deb4
assets:
  dashboards:
    Confluent Platform Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: confluent.kafka.producer.outgoing_byte_rate
      metadata_path: metadata.csv
      prefix: confluent.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10091
    source_type_name: Confluent Platform
  monitors:
    '[Confluent Platform] Unclean leader election': assets/monitors/unclean_leader_election.json
    '[Confluent Platform] Unused topic partition': assets/monitors/unused_partition.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/confluent_platform/README.md
display_on_public_website: true
draft: false
git_integration_title: confluent_platform
integration_id: confluent-platform
integration_title: Confluent Platform
integration_version: 1.10.2
is_public: true
manifest_version: 2.0.0
name: confluent_platform
public_title: Confluent Platform
short_description: Monitor Confluent Platform components.
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
  description: Monitor Confluent Platform components.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Confluent Platform
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは、Datadog Agent を通じて Confluent Platform と Kafka のコンポーネントを監視します。

このインテグレーションは、以下のコンポーネントの JMX メトリクスを収集します。

- Broker
- Connect
- Replicator
- Schema Registry
- ksqlDB サーバー
- Streams
- REST Proxy

## セットアップ


### インストール

Confluent Platform チェックは [Datadog Agent][1] パッケージに含まれています。Confluent Platform コンポーネントサーバーに追加でインストールする必要はありません。

**注**: このチェックはメトリクスを JMX を使用して収集するため、Agent が [jmxfetch][2] を実行できるように、各ノード上に JVM が必要です。Oracle 提供の JVM を使用することをお勧めします。


### 構成

1. Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `confluent_platform.d/conf.yaml` ファイルを編集し、Confluent Platform のパフォーマンスデータを収集します。使用可能なすべてのコンフィギュレーションオプションについては、[confluent_platform.d/conf.yaml のサンプル][3]を参照してください。

    各コンポーネントに対し、JMX メトリクスを収集するためのインスタンスを個別に作成する必要があります。[`metrics.yaml` ファイル][4]には、デフォルトで収集されるメトリクスのリストが、以下の例のように入力されます。

    ```yaml
    instances:
     - host: localhost
       port: 8686
       name: broker_instance
       user: username
       password: password
     - host: localhost
       port: 8687
       name: schema_registry_instance
     - host: localhost
       port: 8688
       name: rest_proxy_instance
    ```

2. [Agent を再起動します][5]。

##### ログ収集

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` でこれを有効にする必要があります。

   ```yaml
   logs_enabled: true
   ```

2. Confluent Platform コンポーネントのログの収集を開始するには、次のコンフィギュレーションブロックを `confluent_platform.d/conf.yaml` ファイルに追加します。

   ```yaml
     logs:
       - type: file
         path: <CONFLUENT_COMPONENT_PATH>/logs/*.log
         source: confluent_platform
         service: <SERVICE_NAME>
         log_processing_rules:
           - type: multi_line
             name: new_log_start_with_date
             pattern: \[\d{4}\-\d{2}\-\d{2}
   ```

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。使用可能なすべてのコンフィギュレーションオプションの詳細については、[confluent_platform.d/conf.yaml のサンプル][3]を参照してください。

3. [Agent を再起動します][6]。

##### メトリクスの収集

コンテナ環境の場合は、[JMX を使用したオートディスカバリー][7]のガイドを参照してください。

### 検証

[Agent の status サブコマンドを実行][8]し、**JMXFetch** セクションの `confluent_platform` を探します。

```
    ========
    JMXFetch
    ========

      Initialized checks
      ==================
        confluent_platform
          instance_name : confluent_platform-localhost-31006
          message :
          metric_count : 26
          service_check_count : 0
          status : OK
```

## 収集データ

### メトリクス
{{< get-metrics-from-git "confluent_platform" >}}


### イベント

Confluent Platform チェックには、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "confluent_platform" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://github.com/DataDog/jmxfetch
[3]: https://github.com/DataDog/integrations-core/blob/master/confluent_platform/datadog_checks/confluent_platform/data/conf.yaml.example
[4]: https://github.com/DataDog/integrations-core/blob/master/confluent_platform/datadog_checks/confluent_platform/data/metrics.yaml
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://github.com/DataDog/integrations-core/blob/master/confluent_platform/metadata.csv
[7]: https://docs.datadoghq.com/ja/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/confluent_platform/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/