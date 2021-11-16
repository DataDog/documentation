---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Confluent Platform Overview: assets/dashboards/overview.json
  logs:
    source: confluent_platform
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - 処理
  - メッセージング
  - オートディスカバリー
  - ログの収集
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/confluent_platform/README.md'
display_name: Confluent Platform
draft: false
git_integration_title: confluent_platform
guid: 8e4a6d7e-44bc-440c-aafa-a0f98df87cc0
integration_id: confluent-platform
integration_title: Confluent Platform
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: confluent.
metric_to_check: confluent.kafka.producer.outgoing_byte_rate
name: confluent_platform
public_title: Datadog-Confluent Platform インテグレーション
short_description: Confluent Platform のコンポーネントを監視する。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
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


### コンフィギュレーション

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

##### ログの収集

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

### サービスのチェック
{{< get-service-checks-from-git "confluent_platform" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://github.com/DataDog/jmxfetch
[3]: https://github.com/DataDog/integrations-core/blob/master/confluent_platform/datadog_checks/confluent_platform/data/conf.yaml.example
[4]: https://github.com/DataDog/integrations-core/blob/master/confluent_platform/datadog_checks/confluent_platform/data/metrics.yaml
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://github.com/DataDog/integrations-core/blob/master/confluent_platform/metadata.csv
[7]: https://docs.datadoghq.com/ja/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/confluent_platform/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/