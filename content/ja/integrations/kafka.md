---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - processing
  - messaging
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/kafka/README.md'
display_name: Kafka
git_integration_title: kafka
guid: f201c0b7-4b31-4528-9955-ae756a4580b8
integration_id: kafka
integration_title: Kafka
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: kafka.
metric_to_check: kafka.net.bytes_out
name: kafka
process_signatures:
  - java kafka.kafka
public_title: Datadog-Kafka インテグレーション
short_description: プロデューサーとコンシューマー、レプリケーション、最大ラグなどのメトリクスを収集 and more.
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
![Kafka ダッシュボード][1]

## 概要

Kafka を Datadog に接続して、以下のことができます。

* クラスターのパフォーマンスをリアルタイムに可視化できます。
* Kafka のパフォーマンスを他のアプリケーションと関連付けることができます。

このチェックでは、インスタンスあたりのメトリクス数が 350 に制限されています。返されたメトリクスの数は、情報ページに表示されます。以下で説明する構成を編集することで、関心があるメトリクスを指定します。収集するメトリクスをカスタマイズする方法については、[JMX チェックのドキュメント][2]で詳細な手順を参照してください。

Kafka コンシューマーメトリクスを収集する方法については、[kafka_consumer チェック][3]を参照してください。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][4]のガイドを参照してこの手順を行ってください。

### インストール

Agent の Kafka チェックは [Datadog Agent][5] パッケージに含まれています。Kafka ノードに追加でインストールする必要はありません。

このチェックは、メトリクスを JMX 経由で収集するため、Agent が [jmxfetch][6] をフォークできるように、各 kafka ノード上に JVM が必要です。Kafka が使用している JVM を使用できます。

### コンフィグレーション

[Agent の構成ディレクトリ][7]のルートにある `conf.d/` フォルダーの `kafka.d/conf.yaml` ファイルを編集します。

#### メトリクスの収集

Kafka Bean 名は、実行している Kafka のバージョンに依存します。Agent と一緒にパッケージ化されている[サンプル構成ファイル][9]は最新の構成なので、これをベースとして使用してください。**注**: サンプル内の Agent バージョンは、インストールされている Agent のバージョンより新しいバージョンである場合があります。

`kafka.yaml` を構成したら、[Agent を再起動][10]すると、Kafka メトリクスの Datadog への送信が始まります。

#### ログの収集

**Agent 6.0 以上で使用可能**

1. Kafka はデフォルトで `log4j` ロガーを使用します。ファイルへのログ記録をアクティブにし、フォーマットをカスタマイズするには、`log4j.properties` ファイルを編集します。

    ```
      # Set root logger level to INFO and its only appender to R
      log4j.rootLogger=INFO, R
      log4j.appender.R.File=/var/log/kafka/server.log
      log4j.appender.R.layout=org.apache.log4j.PatternLayout
      log4j.appender.R.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %m%n
    ```

2. Datadog のインテグレーションパイプラインは、デフォルトで、次の変換パターンをサポートします。

    ```
      %d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %m%n
      %d [%t] %-5p %c - %m%n
      %r [%t] %p %c %x - %m%n
    ```

    フォーマットが異なる場合は、[インテグレーションパイプライン][11]を複製して編集してください。

3. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

    ```yaml
      logs_enabled: true
    ```

4. 次の構成ブロックを `kafka.d/conf.yaml` ファイルに追加します。環境に基づいて、`path` パラメーターと `service` パラメーターの値を変更してください。使用可能なすべての構成オプションの詳細については、[サンプル kafka.d/conf.yaml][9] を参照してください。

    ```yaml
      logs:
        - type: file
          path: /var/log/kafka/server.log
          source: kafka
          service: myapp
          #To handle multi line that starts with yyyy-mm-dd use the following pattern
          #log_processing_rules:
          #  - type: multi_line
          #    name: log_start_with_date
          #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
    ```

5. [Agent を再起動します][10]。

### 検証

[Agent の status サブコマンドを実行][13]し、**JMXFetch** セクションの `kafka` を探します。

```
========
JMXFetch
========
  Initialized checks
  ==================
    kafka
      instance_name : kafka-localhost-9999
      message :
      metric_count : 46
      service_check_count : 0
      status : OK
```

## 収集データ
### メトリクス
{{< get-metrics-from-git "kafka" >}}


### イベント
Kafka チェックには、イベントは含まれません。

### サービスのチェック
**kafka.can_connect**:<br>
Agent が監視対象の Kafka インスタンスに接続できず、メトリクスを収集できない場合は、`CRITICAL` が返されます。そうでない場合は `OK` が返されます。

## トラブルシューティング

* [Kafka のトラブルシューティングと詳細な調査][15]
* [Agent が RMIServer スタブの取得に失敗します][16]
* [Datadog アプリケーションにプロデューサーメトリクスとコンシューマーメトリクスが表示されません][17]

## その他の参考資料

* [Kafka パフォーマンスメトリクスの監視][18]
* [Kafka パフォーマンスメトリクスの収集][19]
* [Datadog を使用した Kafka の監視][20]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/kafka/images/kafka_dashboard.png
[2]: https://docs.datadoghq.com/ja/integrations/java
[3]: https://docs.datadoghq.com/ja/integrations/kafka/#agent-check-kafka-consumer
[4]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[5]: https://app.datadoghq.com/account/settings#agent
[6]: https://github.com/DataDog/jmxfetch
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[9]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/conf.yaml.example
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[11]: https://docs.datadoghq.com/ja/logs/processing/#integration-pipelines
[13]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[14]: https://github.com/DataDog/integrations-core/blob/master/kafka/metadata.csv
[15]: https://docs.datadoghq.com/ja/integrations/faq/troubleshooting-and-deep-dive-for-kafka
[16]: https://docs.datadoghq.com/ja/integrations/faq/agent-failed-to-retrieve-rmierver-stub
[17]: https://docs.datadoghq.com/ja/integrations/faq/producer-and-consumer-metrics-don-t-appear-in-my-datadog-application
[18]: https://www.datadoghq.com/blog/monitoring-kafka-performance-metrics
[19]: https://www.datadoghq.com/blog/collecting-kafka-performance-metrics
[20]: https://www.datadoghq.com/blog/monitor-kafka-with-datadog


{{< get-dependencies >}}


## Agent チェック: Kafka コンシューマー

![Kafka ダッシュボード][111]

## 概要

この Agent チェックは、メッセージオフセットのメトリクスのみを収集します。Kafka ブローカーまたは Java ベースのコンシューマー/プロデューサーから JMX メトリクスを収集する場合は、kafka チェックを参照してください。

このチェックは、Kafka ブローカーから High water mark オフセット、kafka または zookeeper (旧式コンシューマーの場合) に保存されているコンシューマーオフセット、および計算されたコンシューマーラグ (ブローカーオフセットとコンシューマーオフセットの差分) を取得します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][112]のガイドを参照してこの手順を行ってください。

### インストール

Agent の Kafka コンシューマーチェックは [Datadog Agent][113] パッケージに含まれています。Kafka ノードに追加でインストールする必要はありません。

### コンフィグレーション

[このサンプル構成ファイル][114]を例として使用して、`kafka_consumer.yaml` ファイルを作成します。[Datadog Agent を再起動][115]すると、Datadog へのメトリクスの送信が開始されます。

### 検証

[Agent の `status` サブコマンドを実行][116]し、Checks セクションで `kafka_consumer` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "kafka_consumer" >}}


### イベント

`consumer_lag`:

Datadog Agent は、`consumer_lag` メトリクスの値が 0 未満になると、`topic`、`partition`、および `consumer_group` のタグを付けて
イベントを送信します。

### サービスのチェック
Kafka コンシューマーチェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

* [Kafka のトラブルシューティングと詳細な調査][118]
* [Agent が RMIServer スタブの取得に失敗します][119]
* [Datadog アプリケーションにプロデューサーメトリクスとコンシューマーメトリクスが表示されません][120]

## その他の参考資料

* [Kafka パフォーマンスメトリクスの監視][121]
* [Kafka パフォーマンスメトリクスの収集][122]
* [Datadog を使用した Kafka の監視][123]

[111]: https://raw.githubusercontent.com/DataDog/integrations-core/master/kafka_consumer/images/kafka_dashboard.png
[112]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[113]: https://app.datadoghq.com/account/settings#agent
[114]: https://github.com/DataDog/integrations-core/blob/master/kafka_consumer/datadog_checks/kafka_consumer/data/conf.yaml.example
[115]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[116]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[117]: https://github.com/DataDog/integrations-core/blob/master/kafka_consumer/metadata.csv
[118]: https://docs.datadoghq.com/ja/integrations/faq/troubleshooting-and-deep-dive-for-kafka
[119]: https://docs.datadoghq.com/ja/integrations/faq/agent-failed-to-retrieve-rmierver-stub
[120]: https://docs.datadoghq.com/ja/integrations/faq/producer-and-consumer-metrics-don-t-appear-in-my-datadog-application
[121]: https://www.datadoghq.com/blog/monitoring-kafka-performance-metrics
[122]: https://www.datadoghq.com/blog/collecting-kafka-performance-metrics
[123]: https://www.datadoghq.com/blog/monitor-kafka-with-datadog


{{< get-dependencies >}}