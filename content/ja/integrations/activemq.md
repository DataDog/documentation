---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs:
    source: activemq
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - log collection
  - processing
  - messaging
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/activemq/README.md'
display_name: ActiveMQ
git_integration_title: activemq
guid: 496df16d-5ad0-438c-aa2a-b8ba8ee3ae05
integration_id: activemq
integration_title: ActiveMQ
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: activemq.
metric_to_check: activemq.queue.size
name: activemq
process_signatures:
  - activemq
public_title: Datadog-ActiveMQ インテグレーション
short_description: ブローカーとキュー、プロデューサーとコンシューマーなどのメトリクスを収集。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

ActiveMQ チェックは、ブローカーとキュー、プロデューサーとコンシューマーなどのメトリクスを収集します。

**注**: バージョン 5.8.0 以前の ActiveMQ を実行している場合は、[Agent 5.10.x リリースのサンプルファイル][1]を参照してください。

## セットアップ

### インストール

Agent の ActiveMQ チェックは [Datadog Agent][2] パッケージに含まれています。ActiveMQ ノードに追加でインストールする必要はありません。

このチェックは、メトリクスを JMX 経由で収集するため、Agent が [jmxfetch][3] をフォークできるように、各ノード上に JVM が必要です。Oracle 提供の JVM を使用することをお勧めします。

### 構成

#### ホスト

ホストで実行中の Agent でこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#コンテナ化)セクションを参照してください。

1. **ActiveMQ サーバーで [JMX Remote が有効になっている][4]ことを確認します。**
2. ActiveMQ に接続するように Agent を構成します。[Agent の構成ディレクトリ][5]のルートにある `conf.d/` フォルダーの `activemq.d/conf.yaml` を編集します。使用可能なすべての構成オプションの詳細については、[サンプル activemq.d/conf.yaml][6] を参照してください。

   ```yaml
   instances:
     - host: localhost
       port: 1616
       user: username
       password: password
       name: activemq_instance
   # List of metrics to be collected by the integration
   # You should not have to modify this.
   init_config:
     conf:
       - include:
         Type: Queue
         attribute:
           AverageEnqueueTime:
             alias: activemq.queue.avg_enqueue_time
             metric_type: gauge
           ConsumerCount:
             alias: activemq.queue.consumer_count
             metric_type: gauge
           ProducerCount:
             alias: activemq.queue.producer_count
             metric_type: gauge
           MaxEnqueueTime:
             alias: activemq.queue.max_enqueue_time
             metric_type: gauge
           MinEnqueueTime:
             alias: activemq.queue.min_enqueue_time
             metric_type: gauge
           MemoryPercentUsage:
             alias: activemq.queue.memory_pct
             metric_type: gauge
           QueueSize:
             alias: activemq.queue.size
             metric_type: gauge
           DequeueCount:
             alias: activemq.queue.dequeue_count
             metric_type: counter
           DispatchCount:
             alias: activemq.queue.dispatch_count
             metric_type: counter
           EnqueueCount:
             alias: activemq.queue.enqueue_count
             metric_type: counter
           ExpiredCount:
             alias: activemq.queue.expired_count
             type: counter
           InFlightCount:
             alias: activemq.queue.in_flight_count
             metric_type: counter

       - include:
         Type: Broker
         attribute:
           StorePercentUsage:
             alias: activemq.broker.store_pct
             metric_type: gauge
           TempPercentUsage:
             alias: activemq.broker.temp_pct
             metric_type: gauge
           MemoryPercentUsage:
             alias: activemq.broker.memory_pct
             metric_type: gauge
   ```

3. [Agent を再起動します][7]。

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. Riak のログの収集を開始するには、次の構成ブロックを `activemq.d/conf.yaml` ファイルに追加します。

   ```yaml
   logs:
     - type: file
       path: "<ACTIVEMQ_BASEDIR>/data/activemq.log"
       source: activemq
       service: "<SERVICE_NAME>"
     - type: file
       path: "<ACTIVEMQ_BASEDIR>/data/audit.log"
       source: activemq
       service: "<SERVICE_NAME>"
   ```

3. [Agent を再起動します][7]。

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][8]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                |
| -------------------- | ------------------------------------ |
| `<インテグレーション名>` | `activemq`                           |
| `<初期コンフィギュレーション>`      | 空白または `{}`                        |
| `<インスタンスコンフィギュレーション>`  | `{"host": "%%host%%","port":"1099"}` |

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集のドキュメント][9]を参照してください。

| パラメーター      | 値                                                  |
| -------------- | ------------------------------------------------------ |
| `<LOG_CONFIG>` | `{"source": "activemq", "service": "<YOUR_APP_NAME>"}` |

### 検証

[Agent の status サブコマンドを実行][10]し、Checks セクションで `activemq` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "activemq" >}}


### イベント

ActiveMQ チェックには、イベントは含まれません。

### サービスのチェック

**activemq.can_connect**:<br>
Agent が監視対象の ActiveMQ インスタンスに接続できず、メトリクスを収集できない場合は、`CRITICAL` が返されます。そうでない場合は `OK` が返されます。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [ActiveMQ のアーキテクチャとキーメトリクス][12]
- [ActiveMQ のメトリクスとパフォーマンスの監視][13]




## ActiveMQ XML インテグレーション

## 概要

ActiveMQ XML からメトリクスをリアルタイムに取得すると、以下のことが可能になります。

- ActiveMQ XML の状態を視覚化および監視できます。
- ActiveMQ XML のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ

### インストール

ActiveMQ XML チェックは [Datadog Agent][2] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### 構成

ホストで実行中の Agent でこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#コンテナ化)セクションを参照してください。

#### ホスト

1. ご使用の統計 `url` で、[Agent のコンフィギュレーションディレクトリ][5]のルートにある `conf.d/` フォルダーの `activemq_xml.d/conf.yaml` を編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル activemq_xml.d/conf.yaml][14] を参照してください。

   **注**: ActiveMQ XML インテグレーションでは[カスタムメトリクス][15]を送信することができますが、これはお客様の[請求][16]に影響します。デフォルトでは、メトリクス数は 350 に制限されています。メトリクスの追加が必要な場合は、[Datadog のサポートチーム][11]にお問い合わせください。

2. [Agent を再起動します][7]。

#### コンテナ化

コンテナ環境の場合は、[JMX を使用したオートディスカバリー][17]のガイドを参照してください。

### 検証

[Agent の status サブコマンドを実行][10]し、Checks セクションで `activemq_xml` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "activemq_xml" >}}


### イベント

ActiveMQ XML チェックには、イベントは含まれません。

### サービスのチェック

ActiveMQ XML チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

## その他の参考資料

- [ActiveMQ のメトリクスとパフォーマンスの監視][13]


[1]: https://raw.githubusercontent.com/DataDog/dd-agent/5.10.1/conf.d/activemq.yaml.example
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://github.com/DataDog/jmxfetch
[4]: https://activemq.apache.org/jmx.html
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[9]: https://docs.datadoghq.com/ja/agent/kubernetes/log/?tab=containerinstallation#setup
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[11]: https://docs.datadoghq.com/ja/help/
[12]: https://www.datadoghq.com/blog/activemq-architecture-and-metrics
[13]: https://www.datadoghq.com/blog/monitor-activemq-metrics-performance
[14]: https://github.com/DataDog/integrations-core/blob/master/activemq_xml/datadog_checks/activemq_xml/data/conf.yaml.example
[15]: https://docs.datadoghq.com/ja/developers/metrics/custom_metrics/
[16]: https://docs.datadoghq.com/ja/account_management/billing/custom_metrics/
[17]: https://docs.datadoghq.com/ja/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent