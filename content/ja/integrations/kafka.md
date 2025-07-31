---
app_id: kafka
app_uuid: 39640d5e-54be-48ff-abf1-8871499e2fd3
assets:
  dashboards:
    kafka: assets/dashboards/kafka_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - kafka.net.bytes_out
      - kafka.net.bytes_out.rate
      metadata_path: metadata.csv
      prefix: kafka.
    process_signatures:
    - java kafka.kafka
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 64
    source_type_name: Kafka
  monitors:
    Partition is offline: assets/monitors/kafka_offline_partition.json
    Produce latency is high: assets/monitors/broker_produce_latency.json
    Produce request rate is high: assets/monitors/kafka_high_producer_request_rate.json
  saved_views:
    error_warning_status: assets/saved_views/error_warning_status.json
    kafka_patterns: assets/saved_views/kafka_patterns.json
    kafka_processes: assets/saved_views/kafka_processes.json
    logger_overview: assets/saved_views/logger_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- message queues
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/kafka/README.md
display_on_public_website: true
draft: false
git_integration_title: kafka
integration_id: kafka
integration_title: Kafka Broker
integration_version: 4.0.0
is_public: true
manifest_version: 2.0.0
name: kafka
public_title: Kafka Broker
short_description: プロデューサーとコンシューマー、レプリケーション、最大ラグなどのメトリクスを収集
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::ログの収集
  - Category::Message Queues
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  - Offering::Integration
  - Product::Data Streams Monitoring
  configuration: README.md#Setup
  description: プロデューサーとコンシューマー、レプリケーション、最大ラグなどのメトリクスを収集
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitoring-kafka-performance-metrics
  - resource_type: blog
    url: https://www.datadoghq.com/blog/collecting-kafka-performance-metrics
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitor-kafka-with-datadog
  - resource_type: その他
    url: https://www.datadoghq.com/knowledge-center/apache-kafka/
  support: README.md#Support
  title: Kafka Broker
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Kafka ダッシュボード][1]

## 概要

収集した Kafka ブローカーのメトリクスを表示し、Kafka クラスターの健全性とパフォーマンスを 360 度リアルタイムで確認できます。このインテグレーションにより、Kafka デプロイメントからメトリクスとログを収集し、Kafka スタックのパフォーマンスに関するテレメトリーデータの可視化やアラートの発行が可能です。

**注**:
- このチェックでは、インスタンスごとに 350 メトリクスの制限があります。返されたメトリクスの数は、Agent のステータス出力に表示されます。以下の構成を編集して、関心のあるメトリクスを指定します。収集するメトリクスのカスタマイズの詳細については、[JMX チェックのドキュメント][2]を参照してください。
- このインテグレーションに付属するサンプル構成は、Kafka バージョン 0.8.2 以降でのみ動作します。
それ以前のバージョンを使用している場合は、[Agent v5.2.x リリースサンプルファイル][3]を参照してください。
- Kafka コンシューマーメトリクスを収集する方法については、[kafka_consumer チェック][4]を参照してください。

Kafka インテグレーションを強化する手段として、[Data Streams Monitoring][5] の利用を検討してください。このソリューションではパイプラインを可視化し、ラグ (遅延) を追跡できるため、ボトルネックの特定と解消に役立ちます。

## セットアップ

### インストール

Agent の Kafka チェックは [Datadog Agent][6] パッケージに含まれています。Kafka ノードに追加でインストールする必要はありません。

チェックは、[JMXFetch][7] を使用して JMX からメトリクスを収集します。Agent が JMXFetch を実行できるように、各 kafka ノードで JVM が必要です。Kafka が使用しているのと同じ JVM を使用することができます。

**注**: Kafka チェックは Managed Streaming for Apache Kafka (Amazon MSK) と共に使用することはできません。代わりに [Amazon MSK インテグレーション][8]を使用してください。

### 構成

{{< tabs >}}
{{% tab "ホスト" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには

##### メトリクスの収集

1. [Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `kafka.d/conf.yaml` ファイルを編集します。Kafka Bean 名は、実行している Kafka のバージョンに依存します。Agent と一緒にパッケージ化されている[サンプルコンフィギュレーションファイル][2]は最新の構成なので、これをベースとして使用してください。**注**: サンプル内の Agent バージョンは、インストールされている Agent のバージョンより新しいバージョンである場合があります。

2. [Agent を再起動します][3]。

##### ログ収集

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
     [%d] %p %m (%c)%n
   ```

    フォーマットが異なる場合は、[インテグレーションパイプライン][4]を複製して編集してください。

3. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

4. 次のコンフィギュレーションブロックを `kafka.d/conf.yaml` ファイルに追加します。環境に基づいて、`path` パラメーターと `service` パラメーターの値を変更してください。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル kafka.d/conf.yaml][2] を参照してください。

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

5. [Agent を再起動します][3]。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/ja/logs/processing/#integration-pipelines
{{% /tab %}}
{{% tab "コンテナ化" %}}

#### コンテナ化

##### メトリクスの収集

コンテナ環境の場合は、[JMX を使用したオートディスカバリー][1]のガイドを参照してください。

##### ログ収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][2]を参照してください。

| パラメーター      | 値                                              |
| -------------- | -------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "kafka", "service": "<サービス名>"}` |

[1]: https://docs.datadoghq.com/ja/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][9]し、**JMXFetch** セクションの `kafka` を探します。

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

### サービスチェック
{{< get-service-checks-from-git "kafka" >}}


## トラブルシューティング

- [Kafka のトラブルシューティングと詳細な調査][10]
- [Agent が RMIServer スタブの取得に失敗します][11]

## その他の参考資料

- [Kafka パフォーマンスメトリクスの監視][12]
- [Kafka パフォーマンスメトリクスの収集][13]
- [Datadog を使用した Kafka の監視][14]
- [ナレッジセンターの Kafka 概要][15]




<!-- SOURCED FROM https://github.com/DataDog/integrations-core -->
## Kafka コンシューマーインテグレーション

![Kafka ダッシュボード][16]

## 概要

この Agent インテグレーションは、Kafka コンシューマーからメッセージオフセットのメトリクスを収集します。このチェックでは、Kafka ブローカーからハイウォーターオフセットを取得し、Kafka (旧式のコンシューマーの場合は Zookeeper) に保存されているコンシューマーオフセットを取得して、ブローカーオフセットとコンシューマーオフセットの差であるコンシューマーラグを計算します。

**注:** 
- このインテグレーションでは、ブローカーオフセットより先にコンシューマーオフセットをチェックするよう保証されています。そのため最悪の場合でも、コンシューマーラグがわずかに過大評価される程度で済みます。これらのオフセットを逆の順序でチェックすると、コンシューマーラグが負の値になるまで過小評価される可能性があり、これは通常メッセージがスキップされていることを示す深刻なシナリオです。
- Kafka ブローカーや Java ベースのコンシューマー/プロデューサーから JMX メトリクスを収集したい場合は、[Kafka Broker インテグレーション][17]を参照してください。


## セットアップ

### インストール

Agent の Kafka コンシューマーチェックは、[Datadog Agent][6] パッケージに含まれています。Kafka ノードに追加インストールする必要はありません。

### 構成

<!-- xxx tabs xxx -->
<!-- xxx tab "Host" xxx -->

#### ホスト

Kafka コンシューマーが動作しているホスト上で Agent を実行している場合、このチェックを構成するには以下の手順に従います。

##### メトリクスの収集

1. [Agent のコンフィギュレーションディレクトリ][18]のルートにある `conf.d/` フォルダーの `kafka_consumer.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル kafka_consumer.d/conf.yaml][19] を参照してください。

2. [Agent を再起動します][20]。

##### ログ収集

このチェックは、その他のログを収集しません。Kafka ブローカーからログを収集するには、[Kafka のログコレクション手順][21]をご参照ください。

<!-- xxz tab xxx -->
<!-- xxx tab "コンテナ化" xxx -->

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][22]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                |
| -------------------- | ------------------------------------ |
| `<INTEGRATION_NAME>` | `kafka_consumer`                     |
| `<INIT_CONFIG>`      | 空白または `{}`                        |
| `<INSTANCE_CONFIG>`  | `{"kafka_connect_str": <KAFKA_CONNECT_STR>}` <br/>例: `{"kafka_connect_str": "server:9092"}` |

##### ログ収集

このチェックは、その他のログを収集しません。Kafka ブローカーからログを収集するには、[Kafka のログコレクション手順][21]をご参照ください。

<!-- xxz tab xxx -->
<!-- xxz tabs xxx -->

### 検証

[Agent の status サブコマンドを実行][9]し、Checks セクションで `kafka_consumer` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "kafka-consumer" >}}


### イベント

**consumer_lag**:<br>
Datadog Agent は、`consumer_lag` メトリクスの値が 0 未満になると、`topic`、`partition`、および `consumer_group` のタグを付けてイベントを送信します。

### サービスチェック

Kafka コンシューマーチェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

- [Kafka のトラブルシューティングと詳細な調査][10]
- [Agent が RMIServer スタブの取得に失敗します][11]

**Kerberos GSSAPI 認証**

Kafka クラスターの Kerberos 設定によっては、以下の構成が必要になる場合があります。

* Datadog Agent が Kafka ブローカーに接続するために構成された Kafka クライアント。Kafka クライアントは、Kerberos プリンシパルとして追加し、Kerberos keytab に追加する必要があります。また、Kafka クライアントには、有効な Kerberos チケットが必要です。
* Kafka ブローカーとのセキュアな接続を認証するための TLS 証明書。
  * JKS keystore を使用する場合、証明書は keystore からエクスポートする必要があり、ファイルパスは適切な `tls_cert` および `tls_ca_cert` オプションで構成される必要があります。
  * 証明書を認証するために秘密鍵が必要な場合、`tls_private_key` オプションで秘密鍵を構成する必要があります。また、秘密鍵のパスワードは `tls_private_key_password` オプションで構成する必要があります。
* Kafka クライアントの Kerberos keytab の場所がデフォルトのパスと異なる場合は、その場所を指す `KRB5_CLIENT_KTNAME` 環境変数 (例: `KRB5_CLIENT_KTNAME=/etc/krb5.keytab`)
* Kafka クライアントの Kerberos 資格情報チケットキャッシュがデフォルトのパスと異なる場合は、そのキャッシュを指す `KRB5CCNAME` 環境変数 (例: `KRB5CCNAME=/tmp/krb5cc_xxx`)
* Datadog Agent が環境変数にアクセスできない場合は、オペレーティングシステム用の Datadog Agent サービス構成オーバーライドファイルで環境変数を構成してください。Datadog Agent のサービスユニットファイルを変更する手順は、Linux オペレーティングシステムによって異なる場合があります。例えば、Linux の `systemd` 環境では、以下のようになります。

**Linux Systemd の例**

1. 環境ファイルで環境変数を構成します。
   例: `/path/to/environment/file`

  ```
  KRB5_CLIENT_KTNAME=/etc/krb5.keytab
  KRB5CCNAME=/tmp/krb5cc_xxx
  ```

2. Datadog Agent サービス構成オーバーライドファイル `sudo systemctl edit datadog-agent.service` を作成します。

3. オーバーライドファイルで以下のように構成します。

  ```
  [Service]
  EnvironmentFile=/path/to/environment/file
  ```

4. 以下のコマンドを実行して、systemd デーモン、datadog-agent サービス、および Datadog Agent を再ロードします。

```
sudo systemctl daemon-reload
sudo systemctl restart datadog-agent.service
sudo service datadog-agent restart
```

## その他の参考資料

- [Kafka パフォーマンスメトリクスの監視][12]
- [Kafka パフォーマンスメトリクスの収集][13]
- [Datadog を使用した Kafka の監視][14]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/kafka/images/kafka_dashboard.png
[2]: https://docs.datadoghq.com/ja/integrations/java/
[3]: https://raw.githubusercontent.com/DataDog/dd-agent/5.2.1/conf.d/kafka.yaml.example
[4]: https://docs.datadoghq.com/ja/integrations/kafka/?tab=host#kafka-consumer-integration
[5]: https://docs.datadoghq.com/ja/data_streams/
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: https://github.com/DataDog/jmxfetch
[8]: https://docs.datadoghq.com/ja/integrations/amazon_msk/#pagetitle
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[10]: https://docs.datadoghq.com/ja/integrations/faq/troubleshooting-and-deep-dive-for-kafka/
[11]: https://docs.datadoghq.com/ja/integrations/guide/agent-failed-to-retrieve-rmiserver-stub/
[12]: https://www.datadoghq.com/blog/monitoring-kafka-performance-metrics
[13]: https://www.datadoghq.com/blog/collecting-kafka-performance-metrics
[14]: https://www.datadoghq.com/blog/monitor-kafka-with-datadog
[15]: https://www.datadoghq.com/knowledge-center/apache-kafka/
[16]: https://raw.githubusercontent.com/DataDog/integrations-core/master/kafka_consumer/images/kafka_dashboard.png
[17]: https://app.datadoghq.com/integrations/kafka?search=kafka
[18]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[19]: https://github.com/DataDog/integrations-core/blob/master/kafka_consumer/datadog_checks/kafka_consumer/data/conf.yaml.example
[20]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[21]: https://docs.datadoghq.com/ja/integrations/kafka/#log-collection
[22]: https://docs.datadoghq.com/ja/containers/kubernetes/integrations/