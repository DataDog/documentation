---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - processing
  - messaging
  - log collection
  - autodiscovery
creates_events: false
ddtype: チェック
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/kafka/README.md'
display_name: Kafka
git_integration_title: kafka
guid: f201c0b7-4b31-4528-9955-ae756a4580b8
integration_id: kafka
integration_title: Kafka
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: kafka.
metric_to_check: kafka.net.bytes_out.rate
name: kafka
process_signatures:
  - java kafka.kafka
public_title: Datadog-Kafka インテグレーション
short_description: プロデューサーとコンシューマー、レプリケーション、最大ラグなどのメトリクスを収集
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
![Kafka ダッシュボード][1]

## 概要

Kafka を Datadog に接続して、以下のことができます。

- クラスターのパフォーマンスをリアルタイムに可視化できます。
- Kafka のパフォーマンスを他のアプリケーションと関連付けることができます。

このチェックでは、インスタンスあたりのメトリクス数が 350 に制限されています。返されたメトリクスの数は、情報ページに表示されます。以下で説明する構成を編集することで、関心があるメトリクスを指定します。収集するメトリクスをカスタマイズする方法については、[JMX チェックのドキュメント][2]で詳細な手順を参照してください。

Kafka コンシューマーメトリクスを収集する方法については、[kafka_consumer チェック][3]を参照してください。

## セットアップ

### インストール

Agent の Kafka チェックは [Datadog Agent][4] パッケージに含まれています。Kafka ノードに追加でインストールする必要はありません。

このチェックは、メトリクスを JMX 経由で収集するため、Agent が [jmxfetch][5] をフォークできるように、各 kafka ノード上に JVM が必要です。Kafka が使用している JVM を使用できます。

### コンフィギュレーション

#### ホスト

ホストで実行されている Agent 用にこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#containerized)セクションを参照してください。

##### メトリクスの収集

1. [Agent の構成ディレクトリ][6]のルートにある `conf.d/` フォルダーの `kafka.d/conf.yaml` ファイルを編集します。Kafka Bean 名は、実行している Kafka のバージョンに依存します。Agent と一緒にパッケージ化されている[サンプル構成ファイル][7]は最新の構成なので、これをベースとして使用してください。**注**: サンプル内の Agent バージョンは、インストールされている Agent のバージョンより新しいバージョンである場合があります。

2. [Agent を再起動します][8]。

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

1. Kafka はデフォルトで `log4j` ロガーを使用します。ファイルへのログ記録をアクティブにし、フォーマットをカスタマイズするには、`log4j.properties` ファイルを編集します。

   ```text
     # Set root logger level to INFO and its only appender to R
     log4j.rootLogger=INFO, R
     log4j.appender.R.File=/var/log/kafka/server.log
     log4j.appender.R.layout=org.apache.log4j.PatternLayout
     log4j.appender.R.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %m%n
   ```

2. Datadog のインテグレーションパイプラインは、デフォルトで、次の変換パターンをサポートします。

   ```text
     %d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %m%n
     %d [%t] %-5p %c - %m%n
     %r [%t] %p %c %x - %m%n
   ```

    フォーマットが異なる場合は、[インテグレーションパイプライン][9]を複製して編集してください。

3. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

4. 次の構成ブロックを `kafka.d/conf.yaml` ファイルに追加します。環境に基づいて、`path` パラメーターと `service` パラメーターの値を変更してください。使用可能なすべての構成オプションの詳細については、[サンプル kafka.d/conf.yaml][7] を参照してください。

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

5. [Agent を再起動します][8]。

#### コンテナ化

##### メトリクスの収集

コンテナ環境の場合は、[JMX を使用したオートディスカバリー][10]のガイドを参照してください。

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Docker ログ収集][11]を参照してください。

| パラメーター      | 値                                              |
| -------------- | -------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "kafka", "service": "<サービス名>"}` |

### 検証

[Agent の status サブコマンドを実行][12]し、**JMXFetch** セクションの `kafka` を探します。

```text
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

- [Kafka のトラブルシューティングと詳細な調査][14]
- [Agent が RMIServer スタブの取得に失敗します][15]
- [Datadog アプリケーションにプロデューサーメトリクスとコンシューマーメトリクスが表示されません][16]

## その他の参考資料

- [Kafka パフォーマンスメトリクスの監視][17]
- [Kafka パフォーマンスメトリクスの収集][18]
- [Datadog を使用した Kafka の監視][19]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/kafka/images/kafka_dashboard.png
[2]: https://docs.datadoghq.com/ja/integrations/java
[3]: https://docs.datadoghq.com/ja/integrations/kafka/#agent-check-kafka-consumer
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://github.com/DataDog/jmxfetch
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/conf.yaml.example
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/ja/logs/processing/#integration-pipelines
[10]: https://docs.datadoghq.com/ja/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[11]: https://docs.datadoghq.com/ja/agent/docker/log/
[12]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[13]: https://github.com/DataDog/integrations-core/blob/master/kafka/metadata.csv
[14]: https://docs.datadoghq.com/ja/integrations/faq/troubleshooting-and-deep-dive-for-kafka
[15]: https://docs.datadoghq.com/ja/integrations/faq/agent-failed-to-retrieve-rmierver-stub
[16]: https://docs.datadoghq.com/ja/integrations/faq/producer-and-consumer-metrics-don-t-appear-in-my-datadog-application
[17]: https://www.datadoghq.com/blog/monitoring-kafka-performance-metrics
[18]: https://www.datadoghq.com/blog/collecting-kafka-performance-metrics
[19]: https://www.datadoghq.com/blog/monitor-kafka-with-datadog



## Agent チェック: Kafka コンシューマー

![Kafka ダッシュボード][111]

## 概要

この Agent チェックは、メッセージオフセットのメトリクスのみを収集します。Kafka ブローカーまたは Java ベースのコンシューマー/プロデューサーから JMX メトリクスを収集する場合は、kafka チェックを参照してください。

このチェックは、Kafka ブローカーから High water mark オフセット、kafka または zookeeper (旧式コンシューマーの場合) に保存されているコンシューマーオフセット、および計算されたコンシューマーラグ (ブローカーオフセットとコンシューマーオフセットの差分) を取得します。

**注:** このインテグレーションは、コンシューマーオフセットを必ずブローカーオフセットの前にチェックします。そうすれば、最悪の場合でもコンシューマーラグが少し過大評価されるだけだからです。逆の順番でチェックすると、最悪の場合コンシューマーラグが負の値になるほど過小評価され、その多くでメッセージがスキップされることになります。

## セットアップ

### インストール

Agent の Kafka コンシューマーチェックは [Datadog Agent][112] パッケージに含まれています。Kafka ノードに追加でインストールする必要はありません。

### コンフィギュレーション

#### ホスト

ホストで実行されている Agent 用にこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#containerized)セクションを参照してください。

1. [Agent の構成ディレクトリ][114]のルートにある `conf.d/` フォルダーの `kafka_consumer.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル kafka_consumer.d/conf.yaml][113] を参照してください。

2. [Agent を再起動します][115]。

#### コンテナ化

コンテナ環境の場合は、[JMX を使用したオートディスカバリー][116]のガイドを参照してください。

### 検証

[Agent の status サブコマンドを実行][117]し、Checks セクションで `kafka_consumer` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "kafka_consumer" >}}


### イベント

**consumer_lag**:<br>
Datadog Agent は、`consumer_lag` メトリクスの値が 0 未満になると、`topic`、`partition`、および `consumer_group` のタグを付けてイベントを送信します。

### サービスのチェック

Kafka コンシューマーチェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

- [Kafka のトラブルシューティングと詳細な調査][119]
- [Agent が RMIServer スタブの取得に失敗します][1110]
- [Datadog アプリケーションにプロデューサーメトリクスとコンシューマーメトリクスが表示されません][1111]

## その他の参考資料

- [Kafka パフォーマンスメトリクスの監視][1112]
- [Kafka パフォーマンスメトリクスの収集][1113]
- [Datadog を使用した Kafka の監視][1114]

[111]: https://raw.githubusercontent.com/DataDog/integrations-core/master/kafka_consumer/images/kafka_dashboard.png
[112]: https://app.datadoghq.com/account/settings#agent
[113]: https://github.com/DataDog/integrations-core/blob/master/kafka_consumer/datadog_checks/kafka_consumer/data/conf.yaml.example
[114]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[115]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[116]: https://docs.datadoghq.com/ja/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[117]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[118]: https://github.com/DataDog/integrations-core/blob/master/kafka_consumer/metadata.csv
[119]: https://docs.datadoghq.com/ja/integrations/faq/troubleshooting-and-deep-dive-for-kafka
[1110]: https://docs.datadoghq.com/ja/integrations/faq/agent-failed-to-retrieve-rmierver-stub
[1111]: https://docs.datadoghq.com/ja/integrations/faq/producer-and-consumer-metrics-don-t-appear-in-my-datadog-application
[1112]: https://www.datadoghq.com/blog/monitoring-kafka-performance-metrics
[1113]: https://www.datadoghq.com/blog/collecting-kafka-performance-metrics
[1114]: https://www.datadoghq.com/blog/monitor-kafka-with-datadog