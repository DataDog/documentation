---
aliases:
- /ja/integrations/activemq_xml
app_id: activemq-xml
categories:
- log collection
- message queues
custom_kind: integration
description: ブローカーやキュー、プロデューサー、コンシューマーなどのメトリクスを収集します。
further_reading:
- link: https://www.datadoghq.com/blog/monitor-activemq-metrics-performance
  tag: blog
  text: ActiveMQ XML ブログ
integration_version: 5.1.0
media: []
supported_os:
- linux
- windows
- macos
title: ActiveMQ XML
---
## 概要

ActiveMQ XML からメトリクスをリアルタイムに取得すると、以下のことが可能になります。

- ActiveMQ XML の状態を視覚化および監視できます。
- ActiveMQ XML のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ

### インストール

ActiveMQ XML チェックは [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) パッケージに含まれているため、サーバーに追加でインストールする必要はありません。

### 設定

ホストで実行中の Agent でこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#コンテナ化)セクションを参照してください。

{{< tabs >}}

{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには

1. [Agent の構成ディレクトリ](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) 直下の `conf.d/` フォルダーにある `activemq_xml.d/conf.yaml` を編集し、統計情報の `url` を設定してください。利用可能な設定オプションの全一覧は、[activemq_xml.d/conf.yaml のサンプル](https://github.com/DataDog/integrations-core/blob/master/activemq_xml/datadog_checks/activemq_xml/data/conf.yaml.example) を参照してください。

   **注**: ActiveMQ XML インテグレーションは、状況によっては [カスタム メトリクス](https://docs.datadoghq.com/developers/metrics/custom_metrics/) を送信する可能性があり、[課金](https://docs.datadoghq.com/account_management/billing/custom_metrics/) に影響する場合があります。デフォルトでは 350 メトリクスが上限です。追加のメトリクスが必要な場合は、[Datadog サポート](https://docs.datadoghq.com/help/) にお問い合わせください。

1. [Agent を再起動](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent) してください。

##### ログ収集

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

1. ActiveMQ のログ収集を開始するには、次のコンフィギュレーションブロックを `activemq_xml.d/conf.yaml` または `activemq.d/conf.yaml` ファイルに追加します。

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

コンテナ化 環境の場合は、[Autodiscovery with JMX](https://docs.datadoghq.com/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent) ガイドを参照してください。

{{% /tab %}}

{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) し、Checks セクションに `activemq_xml` が表示されていることを確認してください。

## 収集データ

### メトリクス

| | |
| --- | --- |
| **activemq.queue.consumer_count** <br>(gauge) | キューのコンシューマー数。|
| **activemq.queue.count** <br>(gauge) | キュー数。|
| **activemq.queue.dequeue_count** <br>(gauge) | 前回の再起動以降にキューへ送信されたメッセージ総数。<br>_表示単位: message_ |
| **activemq.queue.enqueue_count** <br>(gauge) | 前回の再起動以降にキューから削除されたメッセージ総数 (コンシューマーが ACK したもの)。<br>_表示単位: message_ |
| **activemq.queue.size** <br>(gauge) | キューのサイズ。|
| **activemq.subscriber.count** <br>(gauge) | サブスクライバー数。|
| **activemq.subscriber.dequeue_counter** <br>(gauge) | クライアントへ送信され、かつクライアントが ACK したメッセージ数。<br>_表示単位: message_ |
| **activemq.subscriber.dispatched_counter** <br>(gauge) | クライアントへ送信されたメッセージ数。<br>_表示単位: message_ |
| **activemq.subscriber.dispatched_queue_size** <br>(gauge) | ACK 待ちのディスパッチ済みメッセージ数。<br>_表示単位: message_ |
| **activemq.subscriber.enqueue_counter** <br>(gauge) | サブスクリプションにマッチしたメッセージ数。<br>_表示単位: message_ |
| **activemq.subscriber.pending_queue_size** <br>(gauge) | 配信待ちのメッセージ数。<br>_表示単位: message_ |
| **activemq.topic.consumer_count** <br>(gauge) | トピックのコンシューマー数。|
| **activemq.topic.count** <br>(gauge) | トピック数。|
| **activemq.topic.dequeue_count** <br>(gauge) | 前回の再起動以降にトピックへ送信されたメッセージ総数。<br>_表示単位: message_ |
| **activemq.topic.enqueue_count** <br>(gauge) | 前回の再起動以降にトピックから削除されたメッセージ総数 (コンシューマーが ACK したもの)。<br>_表示単位: message_ |
| **activemq.topic.size** <br>(gauge) | トピックのサイズ。|

### イベント

ActiveMQ XML チェックには、イベントは含まれません。

### サービス チェック

ActiveMQ XML チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

お問合せは、[Datadog サポート](https://docs.datadoghq.com/help/) まで。

## その他の参考資料

- [ActiveMQ のメトリクスとパフォーマンスを監視する](https://www.datadoghq.com/blog/monitor-activemq-metrics-performance)