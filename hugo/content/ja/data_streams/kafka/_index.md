---
aliases:
- /ja/data_streams/live_messages
- /ja/data_streams/messages
- /ja/data_streams/kafka/messages
description: Kafka Consoleを使用して、Kafkaクラスターの健全性を監視し、サービスをトピックに接続し、スキーマとメッセージを調査します。
further_reading:
- link: https://www.datadoghq.com/blog/kafka-console/
  tag: ブログ
  text: Kafka Consoleを使用して、スタックのあらゆるレイヤーにわたるKafkaの問題をトラブルシューティングしてください。
title: Kafka Console
---
Data Streams MonitoringのKafka Consoleでは、Datadog AgentがチェックすることでKafkaクラスターに接続し、健全性とパフォーマンスのメトリクスの収集を開始します。Kafka Consoleでは、以下のことが可能です。

- **Kafkaの健全性を監視する**: スループット、ラグ、レプリケーションのメトリクスを使用して、クラスター、ブローカー、トピック、パーティションの健全性を確認します。
- **根本原因を特定**: 構成とスキーマの変更をラグ、スループット、エラーと関連付け、トレースすることで、問題の原因となる正確なトピック、スキーマバージョン、または構成変更を特定します。
- **サービスをトピックに接続**: 各トピックに対して、どのプロデューサーとコンシューマーが連携しているかを確認し、リンクされた所有者、リポジトリ、オンコールローテーション、およびトレースする情報とエラーログを表示します。
- **トピックのスキーマとメッセージを調査**: スキーマの表示、バージョンの比較、メッセージへのアクセスを行い、不正なペイロードのデバッグやトピックの調査を行います。
- **アラートと応答の自動化**: [推奨モニターテンプレート][4]を使用して、Kafkaの条件がトリガーされたときにWorkflow AutomationまたはWebhookを起動します。

開始するには、[Kafka Consoleのセットアップ][2]を参照してください。

## ワークフロー {#workflows}

### クラスターの健全性とパフォーマンスの監視{#monitor-cluster-health-and-performance}

{{< ui >}}Clusters{{< /ui >}}、{{< ui >}}Topics{{< /ui >}}、および{{< ui >}}Brokers{{< /ui >}}タブには、Kafkaインフラストラクチャー全体の健全性ステータスが表示されます。各トピックについて、パーティション数、レプリケーション不足およびオフラインのパーティション、メッセージスループット、コンシューマーラグを確認できます。

{{< img src="data_streams/kafka_clusters_overview-2.png" alt="ブローカー数、トピック名、レプリケーションステータス、メッセージ受信レートを含むクラスターリストを表示するKafka Consoleのクラスタービュー" >}}

任意のトピックをクリックしてください。すると、受信メッセージレート、全パーティションの最大ラグ、および現在のラグが保持制限に近づいているかどうかを含む詳細な概要が表示されます。

{{< img src="data_streams/kafka_topic_summary-2.png" alt="受信メッセージレート0.8 msg/秒、現在のラグ1.15秒、ラグ対保持ステータスを示すトピック詳細概要ページ" >}}

任意のメトリクスから、Datadogモニター、SLO、ダッシュボードを作成できます。

### 構成とスキーマの変更を健全性メトリクスと関連付ける{#correlate-configuration-and-schema-changes-with-health-metrics}

変更イベントはスループットとラグのグラフに直接オーバーレイされるため、構成やスキーマの変更がパフォーマンスの低下と一致しているかどうかを確認できます。

{{< img src="data_streams/kafka_topics_lag_change-2.png" alt="17:02:42のtopic_config変更アノテーションがトピックごとのラググラフにオーバーレイ表示されたトピックビュー。変更イベントと相関するスパイクが示されています。" >}}

何が変更されたかを正確に特定するには、オーバーレイ上で検出された変更をクリックし、{{< ui >}}View config change{{< /ui >}}を選択してください。

{{< img src="data_streams/lag-by-topic-overlay.png" alt="バージョン625と626を比較するトピック構成差分ビュー。max.message.bytesが1000012から1024に変更された箇所が強調表示されています。" >}}

### プロデューサーサービスとコンシューマーサービスをトピックに接続する{#connect-producer-and-consumer-services-to-topics}

各トピックの{{< ui >}}Producers{{< /ui >}}および{{< ui >}}Consumers{{< /ui >}}セクションには、どのサービスがそのトピックから読み取り、書き込みを行っているかが表示されます。サービスにカーソルを合わせると、Service Catalogの所有権情報（チーム、コードリポジトリ、オンコールエンジニア、Slackチャンネル）が表示されます。

{{< img src="data_streams/kafka_topic_service_ownership.png" alt="所有権チーム（Frameworks）、コードリポジトリ、オンコールエンジニア、Slackチャンネル、および健全性ステータスを表示するサービスパネルが開いたトピックプロデューサーおよびコンシューマービュー。" >}}

コンシューマーのラグが発生している場合やプロデューサーが正しく動作していない場合に、この情報を使用して適切なチームに連絡してください。

### トピックのスキーマとメッセージを調査する{#inspect-topic-schemas-and-messages}

{{< ui >}}Schema{{< /ui >}}セクションには、トピックのキーまたは値の現在のスキーマとバージョン履歴が表示されます。バージョンセレクターを使用して、バージョン間でスキーマを比較します。

{{< ui >}}Messages{{< /ui >}}セクションでは、パーティションとオフセットを指定してメッセージを取得し、ペイロードを直接調査できます。これは、不正なペイロードのデバッグや、スキーマ変更後のメッセージ構造の検証に役立ちます。メッセージを取得するために必要な追加の前提条件と権限については、[Enable message inspection][3]を参照してください。

{{< img src="data_streams/kafka_schema_messages.png" alt="Protobufスキーマ定義と、日付、パーティション、オフセット、メッセージ値を含む最近のメッセージのテーブルが表示されたトピックスキーマおよびメッセージ表示。" >}}

[2]: /ja/data_streams/kafka/setup/
[3]: /ja/data_streams/kafka/setup/#enable-message-inspection
[4]: /ja/data_streams/kafka/monitors_and_automation/

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}