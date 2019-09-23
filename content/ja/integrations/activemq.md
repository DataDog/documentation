---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - log collection
  - processing
  - messaging
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
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: activemq.
metric_to_check: activemq.queue.size
name: activemq
process_signatures:
  - activemq
public_title: Datadog-ActiveMQ インテグレーション
short_description: ブローカーとキュー、プロデューサーとコンシューマーなどのメトリクスを収集 and more.
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

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][13]のガイドを参照してこの手順を行ってください。

### インストール

Agent の ActiveMQ チェックは [Datadog Agent][2] パッケージに含まれています。ActiveMQ ノードに追加でインストールする必要はありません。

このチェックは、メトリクスを JMX 経由で収集するため、Agent が [jmxfetch][3] をフォークできるように、各ノード上に JVM が必要です。Oracle 提供の JVM を使用することをお勧めします。

### コンフィグレーション

1. **ActiveMQ サーバーで [JMX Remote が有効になっている][4]ことを確認します。**
2. ActiveMQ に接続するように Agent を構成します。[Agent の構成ディレクトリ][5]のルートにある `conf.d/` フォルダーの `activemq.d/conf.yaml` を編集します。使用可能なすべての構成オプションの詳細については、[サンプル activemq.d/conf.yaml][6] を参照してください。

      ```yaml
      instances:
        - host: localhost
          port: 7199
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

#### ログの収集

 **Agent 6.0 以上で使用可能**

 1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

    ```yaml
      logs_enabled: true
    ```

 2. Riak のログの収集を開始するには、次の構成ブロックを `activemq.d/conf.yaml` ファイルに追加します。

     ```
      logs:
        - type: file
          path: <ACTIVEMQ_BASEDIR>/data/activemq.log
          source: activemq
          service: <SERVICE_NAME>
        - type: file
          path: <ACTIVEMQ_BASEDIR>/data/audit.log
          source: activemq
          service: <SERVICE_NAME>
    ```

 3. [Agent を再起動します][7]。


### 検証

[Agent の status サブコマンドを実行][8]し、Checks セクションの `activemq` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "activemq" >}}


### イベント
ActiveMQ チェックには、イベントは含まれません。

### サービスのチェック
**activemq.can_connect**:<br>
Agent が監視対象の ActiveMQ インスタンスに接続できず、メトリクスを収集できない場合は、`CRITICAL` が返されます。そうでない場合は `OK` が返されます。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

## その他の参考資料
お役に立つドキュメント、リンクや記事:

* [ActiveMQ のアーキテクチャとキーメトリクス][11]
* [ActiveMQ のメトリクスとパフォーマンスの監視][12]


[1]: https://raw.githubusercontent.com/DataDog/dd-agent/5.10.1/conf.d/activemq.yaml.example
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://github.com/DataDog/jmxfetch
[4]: https://activemq.apache.org/jmx.html
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/activemq/metadata.csv
[10]: https://docs.datadoghq.com/ja/help
[11]: https://www.datadoghq.com/blog/activemq-architecture-and-metrics
[12]: https://www.datadoghq.com/blog/monitor-activemq-metrics-performance
[13]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations


{{< get-dependencies >}}


## ActiveMQ XML インテグレーション

## 概要

ActiveMQ XML サービスからメトリクスをリアルタイムに取得すると、以下のことができます。

* ActiveMQ XML の状態を視覚化および監視できます。
* ActiveMQ XML のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][121]のガイドを参照してこの手順を行ってください。

### インストール

ActiveMQ XML チェックは [Datadog Agent][111] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィグレーション

1. ご使用の統計 `url` で、[Agent の構成ディレクトリ][112]のルートにある `conf.d/` フォルダーの `activemq_xml.d/conf.yaml` を編集します。使用可能なすべての構成オプションの詳細については、[サンプル activemq_xml.d/conf.yaml][113] を参照してください。

2. [Agent を再起動します][114]。

#### メトリクスの収集
ActiveMQ XML インテグレーションでは[カスタムメトリクス][115]を送信することができますが、これはお客様の[課金][116]に影響します。デフォルトでは、メトリクス数は 350 に制限されています。メトリクスの追加が必要な場合は、[Datadog のサポートチーム][117]にお問い合わせください。

### 検証

[Agent の status サブコマンドを実行][118]し、Checks セクションの `activemq_xml` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "activemq_xml" >}}


### イベント
ActiveMQ XML チェックには、イベントは含まれません。

### サービスのチェック
ActiveMQ XML チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][117]までお問合せください。

## その他の参考資料

* [ActiveMQ のメトリクスとパフォーマンスの監視][120]


[111]: https://app.datadoghq.com/account/settings#agent
[112]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[113]: https://github.com/DataDog/integrations-core/blob/master/activemq_xml/datadog_checks/activemq_xml/data/conf.yaml.example
[114]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[115]: https://docs.datadoghq.com/ja/developers/metrics/custom_metrics
[116]: https://docs.datadoghq.com/ja/account_management/billing/custom_metrics
[117]: https://docs.datadoghq.com/ja/help
[118]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[119]: https://github.com/DataDog/integrations-core/blob/master/activemq_xml/metadata.csv
[120]: https://www.datadoghq.com/blog/monitor-activemq-metrics-performance
[121]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations


{{< get-dependencies >}}