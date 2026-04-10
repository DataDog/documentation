---
app_id: activemq
categories:
- log collection
- message queues
custom_kind: integration
description: ブローカーやキュー、プロデューサー、コンシューマーなどのメトリクスを収集します。
further_reading:
- link: 'https://www.datadoghq.com/blog/activemq-architecture-and-metrics '
  tag: ブログ
  text: ActiveMQ のアーキテクチャと主要メトリクス
- link: 'https://www.datadoghq.com/blog/monitor-activemq-metrics-performance '
  tag: ブログ
  text: ActiveMQ ブログ
integration_version: 5.0.0
media: []
supported_os:
- linux
- windows
- macos
title: ActiveMQ
---
## 概要

ActiveMQ チェックは、ブローカー、キュー、プロデューサー、コンシューマーなどのメトリクスを収集します。

**注:** このチェックは ActiveMQ Artemis (将来の ActiveMQ バージョン `6`) もサポートしており、メトリクスは `activemq.artemis` ネームスペースで報告されます。このインテグレーションが提供するメトリクスの一覧は、[metadata.csv](https://github.com/DataDog/integrations-core/blob/master/activemq/metadata.csv) を参照してください。

**注:** ActiveMQ バージョンが 5.8.0 より古い場合は、[Agent 5.10.x リリース時のサンプル ファイル](https://raw.githubusercontent.com/DataDog/dd-agent/5.10.1/conf.d/activemq.yaml.example) を参照してください。

## セットアップ

### インストール

Agent の ActiveMQ チェックは [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) パッケージに含まれているため、ActiveMQ ノードに追加でインストールする必要はありません。

このチェックは、[JMXFetch](https://github.com/DataDog/jmxfetch) を利用して JMX からメトリクスを収集します。Agent が JMXFetch を実行できるように、各ノードに JVM が必要です。Datadog では Oracle 提供の JVM の使用を推奨しています。

### 設定

{{< tabs >}}

{{% tab "Host" %}}

#### ホスト

ホスト上で稼働している Agent 向けにこのチェックを設定するには、次の手順を行います。

1. **ActiveMQ サーバーで [JMX Remote が有効](https://activemq.apache.org/jmx.html) になっていることを確認してください。**

1. Agent が ActiveMQ に接続できるように設定します。[Agent の構成ディレクトリ](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) 直下の `conf.d/` フォルダーにある `activemq.d/conf.yaml` を編集してください。利用可能な設定オプションの全一覧は、[activemq.d/conf.yaml のサンプル](https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/conf.yaml.example) を参照してください。デフォルトで収集されるメトリクスは、[`metrics.yaml` ファイル](https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/metrics.yaml) に記載されています。

   ```yaml
   init_config:
     is_jmx: true
     collect_default_metrics: true

   instances:
     - host: localhost
       port: 1616
       user: username
       password: password
       name: activemq_instance
   ```

1. [Agent を再起動](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent) してください。

##### ログ収集

_Agent バージョン >6.0 で利用可能_

1. Datadog Agent ではログ収集がデフォルトで無効になっているため、`datadog.yaml` ファイルで有効化してください:

   ```yaml
   logs_enabled: true
   ```

1. ActiveMQ のログ収集を開始するには、`activemq.d/conf.yaml` ファイルに次の設定ブロックを追加します:

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

1. [Agent を再起動](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent) してください。

{{% /tab %}}

{{% tab "Containerized" %}}

#### コンテナ化

コンテナ化環境の場合は、以下のパラメーターの適用方法について [Autodiscovery インテグレーション テンプレート](https://docs.datadoghq.com/containers/guide/autodiscovery-with-jmx/?tab=containeragent) を参照してください。

##### メトリクスの収集

| パラメーター            | 値                                |
| -------------------- | ------------------------------------ |
| `<INTEGRATION_NAME>` | `activemq`                           |
| `<INIT_CONFIG>`      | `"is_jmx": true`                     |
| `<INSTANCE_CONFIG>`  | `{"host": "%%host%%","port":"1099"}` |

##### ログ収集

_Agent バージョン >6.0 で利用可能_

Datadog Agent では、ログ収集はデフォルトで無効になっています。有効化するには、[Kubernetes ログ収集](https://docs.datadoghq.com/agent/kubernetes/log/) を参照してください。

| パラメーター      | 値                                                  |
| -------------- | ------------------------------------------------------ |
| `<LOG_CONFIG>` | `{"source": "activemq", "service": "<YOUR_APP_NAME>"}` |

{{% /tab %}}

{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) し、出力の Checks セクションに `activemq` が表示されていることを確認してください。

## 収集データ

### メトリクス

| | |
| --- | --- |
| **activemq.artemis.address.bytes_per_page** <br>(gauge) | (Artemis のみ) このアドレスにおける 1 ページあたりの使用バイト数。<br>_表示単位: byte_ |
| **activemq.artemis.address.number_of_messages** <br>(rate) | (Artemis のみ) 配信中のメッセージを含む、キュー上のメッセージ合計。<br>_表示単位: message_ |
| **activemq.artemis.address.pages_count** <br>(gauge) | (Artemis のみ) このアドレスで使用されているページ数。<br>_表示単位: page_ |
| **activemq.artemis.address.routed_messages** <br>(rate) | (Artemis のみ) 1 つ以上のバインディングにルーティングされたメッセージ数 (レート)。<br>_表示単位: message_ |
| **activemq.artemis.address.size** <br>(gauge) | (Artemis のみ) このアドレスにバインドされている全キューが使用している推定バイト数。ページングやブロッキング制御に使用されます。<br>_表示単位: byte_ |
| **activemq.artemis.address.unrouted_messages** <br>(rate) | (Artemis のみ) どのバインディングにもルーティングされなかったメッセージ数 (レート)。<br>_表示単位: message_ |
| **activemq.artemis.address_memory_usage** <br>(gauge) | (Artemis のみ) ブローカー上の全アドレスにおける、インメモリ メッセージの使用メモリ量。<br>_表示単位: byte_ |
| **activemq.artemis.address_memory_usage_pct** <br>(gauge) | (Artemis のみ) ブローカー上の全アドレスの使用メモリ量を、global-max-size に対する割合で表したもの。<br>_表示単位: percent_ |
| **activemq.artemis.connection_count** <br>(gauge) | (Artemis のみ) このサーバーに接続しているクライアント数。<br>_表示単位: connection_ |
| **activemq.artemis.disk_store_usage_pct** <br>(gauge) | (Artemis のみ) ディスク ストアの総使用量の割合。<br>_表示単位: percent_ |
| **activemq.artemis.max_disk_usage** <br>(gauge) | (Artemis のみ) ディスク使用率の上限(%)。<br>_表示単位: percent_ |
| **activemq.artemis.queue.consumer_count** <br>(gauge) | (Artemis のみ) このキューからメッセージを消費しているコンシューマー数。|
| **activemq.artemis.queue.max_consumers** <br>(gauge) | (Artemis のみ) このキューで同時に許可されるコンシューマー数の上限。|
| **activemq.artemis.queue.message_count** <br>(gauge) | (Artemis のみ) 現在このキューに存在するメッセージ数 (スケジュール済み、ページング中、配信中を含む) (レート)。<br>_表示単位: message_ |
| **activemq.artemis.queue.messages_acknowledged** <br>(rate) | (Artemis のみ) キュー作成以降、このキューで ACK されたメッセージ数 (レート)。<br>_表示単位: message_ |
| **activemq.artemis.queue.messages_added** <br>(rate) | (Artemis のみ) キュー作成以降、このキューに追加されたメッセージ数 (レート)。<br>_表示単位: message_ |
| **activemq.artemis.queue.messages_expired** <br>(rate) | (Artemis のみ) キュー作成以降、このキューで期限切れになったメッセージ数(レート)。<br>_表示単位: message_ |
| **activemq.artemis.queue.messages_killed** <br>(rate) | (Artemis のみ) キュー作成以降、最大配信試行回数を超えたために削除されたメッセージ数 (レート)。<br>_表示単位: message_ |
| **activemq.artemis.total_connection_count** <br>(rate) | (Artemis のみ) サーバー起動以降、このサーバーに接続したクライアント数 (レート)。<br>_表示単位: connection_ |
| **activemq.artemis.total_consumer_count** <br>(rate) | (Artemis のみ) サーバー上の全キューでメッセージを消費しているコンシューマー数 (レート)。|
| **activemq.artemis.total_message_count** <br>(rate) | (Artemis のみ) サーバー上の全キューに存在するメッセージ数 (レート)。<br>_表示単位: connection_ |
| **activemq.artemis.total_messages_acknowledged** <br>(rate) | (Artemis のみ) サーバー起動以降、全キューで ACK されたメッセージ数 (レート)。<br>_表示単位: connection_ |
| **activemq.artemis.total_messages_added** <br>(rate) | (Artemis のみ) サーバー起動以降、このサーバーに送信されたメッセージ数 (レート)。<br>_表示単位: connection_ |
| **activemq.broker.memory_pct** <br>(gauge) | 使用中メモリの割合。<br>_表示単位: percent_ |
| **activemq.broker.store_pct** <br>(gauge) | 使用中ストアの割合。<br>_表示単位: percent_ |
| **activemq.broker.temp_pct** <br>(gauge) | 使用中の一時領域の割合。<br>_表示単位: percent_ |
| **activemq.queue.avg_enqueue_time** <br>(gauge) | メッセージがキューに滞留していた時間 (ms) の平均。<br>_表示単位: millisecond_ |
| **activemq.queue.consumer_count** <br>(gauge) | 接続中のコンシューマー数。|
| **activemq.queue.dequeue_count** <br>(gauge) | デキューされているメッセージ数 (レート)。<br>_表示単位: message_ |
| **activemq.queue.dispatch_count** <br>(gauge) | ディスパッチされているメッセージ数 (レート)。<br>_表示単位: message_ |
| **activemq.queue.enqueue_count** <br>(gauge) | エンキューされているメッセージ数 (レート)。<br>_表示単位: message_ |
| **activemq.queue.expired_count** <br>(gauge) | 期限切れになっているメッセージ数 (レート)。<br>_表示単位: message_ |
| **activemq.queue.in_flight_count** <br>(gauge) | 処理中 (in flight) のメッセージ数 (レート)。<br>_表示単位: message_ |
| **activemq.queue.max_enqueue_time** <br>(gauge) | メッセージがキューに滞留していた時間 (ms) の最大値。<br>_表示単位: millisecond_ |
| **activemq.queue.memory_pct** <br>(gauge) | 現在使用中のメモリの割合。<br>_表示単位: percent_ |
| **activemq.queue.min_enqueue_time** <br>(gauge) | メッセージがキューに滞留していた時間 (ms) の最小値。<br>_表示単位: millisecond_ |
| **activemq.queue.producer_count** <br>(gauge) | 接続中のプロデューサー数。|
| **activemq.queue.size** <br>(gauge) | キューに残っているメッセージ数。<br>_表示単位: message_ |

### イベント

ActiveMQ チェックには、イベントは含まれません。

### サービス チェック

**activemq.can_connect**

監視対象の ActiveMQ インスタンスに Agent が接続できず、メトリクスを収集できない場合は `CRITICAL` を返します。メトリクスが 1 つも収集できない場合は `WARNING`、それ以外は `OK` です。

_ステータス: ok, critical, warning_

## トラブルシューティング

お困りの場合は、[Datadog サポート](https://docs.datadoghq.com/help/) までお問い合わせください。

## その他の参考資料

役立つドキュメント、リンク、記事:

- [ActiveMQ のアーキテクチャと主要メトリクス](https://www.datadoghq.com/blog/activemq-architecture-and-metrics)
- [ActiveMQ のメトリクスとパフォーマンスを監視する](https://www.datadoghq.com/blog/monitor-activemq-metrics-performance)