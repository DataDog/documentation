---
aliases:
- /ja/data_streams/troubleshooting
- /ja/data_streams/data_pipeline_lineage
- /ja/data_streams/business_transaction_tracking
cascade:
  algolia:
    rank: 70
further_reading:
- link: /integrations/kafka/
  tag: ドキュメント
  text: Kafka インテグレーション
- link: /integrations/amazon_sqs/
  tag: ドキュメント
  text: Amazon SQS インテグレーション
- link: /internal_developer_portal/catalog/
  tag: ドキュメント
  text: カタログ
- link: https://learn.datadoghq.com/courses/monitor-a-kafka-pipeline-with-dsm
  tag: ラーニングセンター
  text: Data Streams MonitoringでKafkaパイプラインを監視する
- link: https://www.datadoghq.com/blog/data-streams-monitoring/
  tag: ブログ
  text: Datadog Data Streams Monitoring でストリーミングデータパイプラインのパフォーマンスを追跡し、改善する
- link: https://www.datadoghq.com/blog/data-streams-monitoring-apm-integration/
  tag: ブログ
  text: Datadog Data Streams Monitoring を利用して、APM から直接ストリーミングデータパイプラインのトラブルシューティングを行う
- link: https://www.datadoghq.com/blog/data-streams-monitoring-sqs/
  tag: ブログ
  text: Data Streams Monitoring による SQS の監視
- link: https://www.datadoghq.com/blog/confluent-connector-dsm-autodiscovery/
  tag: ブログ
  text: Confluent Cloud のコネクタを自動的に検出し、Data Streams Monitoring でパフォーマンスを簡単に監視できます
- link: https://www.datadoghq.com/blog/data-observability/
  tag: ブログ
  text: Datadog Data Observabilityでデータライフサイクル全体の信頼性を確保する
- link: https://www.datadoghq.com/blog/data-pipeline-monitoring/
  tag: ブログ
  text: データパイプライン監視の基礎：データスタック全体の健全性とパフォーマンスを追跡する
- link: https://www.datadoghq.com/blog/kafka-console/
  tag: ブログ
  text: Kafka Consoleを使用してスタックのあらゆるレイヤーでKafkaの問題をトラブルシューティングする
- link: https://www.datadoghq.com/architecture/monitoring-financial-data-mesh-on-aws-using-datadog/
  tag: Architecture Center
  text: Datadogを使用したAWS上のFinancial Data Meshの監視
- link: https://www.datadoghq.com/architecture/observability-in-event-driven-architecture/
  tag: Architecture Center
  text: イベント駆動型アーキテクチャにおけるオブザーバビリティ
title: Data Streams Monitoring
---
{{< img src="data_streams/map_view2.png" alt="DatadogのData Streams Monitoringページ（マップビューを表示）。「authenticator」というサービスをハイライト表示します左から右へのデータフローを示すトポロジーマップの可視化。中央にauthenticatorサービスが表示され、そのアップストリームおよびダウンストリームのサービスとキューが示されています。" style="width:100%;" >}}

Data Streams Monitoring は、大規模なパイプラインを理解し管理するための標準的な方法を提供し、以下を容易にします。
* システム内を通過するイベントのエンドツーエンドのレイテンシーでパイプラインの健全性を測定します。
* 障害のあるプロデューサー、コンシューマー、キューを特定し、関連するログやクラスターにピボットして、トラブルシューティングを迅速に行います。
* バックアップされたイベントがダウンストリームのサービスを圧倒するのを阻止するために、サービスオーナーが対処できるようにすることで、連鎖的な遅延を防止します。

### サポートされている言語とテクノロジー {#supported-languages-and-technologies}

Data Streams Monitoringは、Kafkaの_クライアント_（コンシューマー/プロデューサー）にインスツルメンテーションを行いますクライアントインフラストラクチャにインスツルメンテーションを施すことができれば、Data Streams Monitoringを使用できます

|   | Java | Python | .NET | Node.js | Go | Ruby |
| - | ---- | ------ | ---- | ------- | -- | ---- |
| Apache Kafka <br/>（セルフホスト、Amazon MSK、Confluent Cloud、またはその他のホスティングプラットフォーム） | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| Amazon Kinesis | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | | |
| Amazon SNS | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | | |
| Amazon SQS | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | | |
| Azure Service Bus | | | {{< X >}} | | | |
| Google Pub/Sub | {{< X >}} | {{< X >}} | | {{< X >}} | | |
| IBM MQ | {{< X >}} | | {{< X >}} | | | |
| RabbitMQ | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | | |

Data Streams Monitoring には、Datadog SDK の最小バージョンが必要です。詳細は各セットアップページを参照してください。

#### OpenTelemetry のサポート {#support-for-opentelemetry}
Data Streams Monitoring は OpenTelemetry をサポートしています。Datadog APM を OpenTelemetry と連携するように設定している場合、Data Streams Monitoring を使用するための追加設定は不要です。[OpenTelemetry の互換性][11] を参照してください。

## セットアップ {#setup}

### 言語別 {#by-language}

{{< card-grid card_width="200px" >}}
  {{< image-card href="/data_streams/java/" src="integrations_logos/java.png" alt="java" >}}
  {{< image-card href="/data_streams/python" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="/data_streams/dotnet/" src="integrations_logos/dotnet_text.png" alt=".NET" >}}
  {{< image-card href="/data_streams/nodejs/" src="integrations_logos/node.png" alt="Node" >}}
  {{< image-card href="/data_streams/go" src="integrations_logos/go-metro.png" alt="Go" >}}
  {{< image-card href="/data_streams/ruby" src="integrations_logos/ruby.png" alt="Ruby" >}}
{{< /card-grid >}}


### テクノロジー別 {#by-technology}

{{< card-grid card_width="200px" >}}
  {{< image-card href="/data_streams/setup/technologies/kafka/" src="integrations_logos/kafka.png" alt="Kafka" >}}
  {{< image-card href="/data_streams/setup/technologies/sqs/" src="integrations_logos/sqs.png" alt="Amazon SQS" >}}
  {{< image-card href="/data_streams/setup/technologies/rabbitmq/" src="integrations_logos/rabbitmq.png" alt="RabbitMQ" >}}
  {{< image-card href="/data_streams/setup/technologies/sns/" src="integrations_logos/amazon_sns.png" alt="Amazon SNS" >}}
  {{< image-card href="/data_streams/setup/technologies/kinesis/" src="integrations_logos/amazon_kinesis.png" alt="Kinesis" >}}
  {{< image-card href="/data_streams/setup/technologies/google_pubsub/" src="integrations_logos/google_cloud_pubsub.png" alt="Google Cloud Pub/Sub" >}}
  {{< image-card href="/data_streams/setup/technologies/ibm_mq/" src="integrations_logos/ibm_mq.png" alt="IBM MQ" >}}
  {{< image-card href="/data_streams/setup/technologies/azure_service_bus/" src="integrations_logos/azure_service_bus.png" alt="Azure Service Bus" >}}
  {{< image-card href="/data_streams/setup/technologies/bullmq/" src="integrations_logos/bullmq2.png" alt="BullMQ" >}}
{{< /card-grid >}}

## Data Streams Monitoring を探索 {#explore-data-streams-monitoring}

### ストリーミングデータパイプラインのアーキテクチャを可視化 {#visualize-the-architecture-of-your-streaming-data-pipelines}

{{< img src="data_streams/topology_map.png" alt="DSM トポロジーマップの可視化。" style="width:100%;" >}}

Data Streams Monitoring はすぐに使える [トポロジーマップ][10] を提供するため、パイプライン全体のデータフローを可視化し、プロデューサー/コンシューマーサービス、キューの依存関係、サービスの所有権、主要な健全性メトリクスを特定できます。

### 新しいメトリクスでエンドツーエンドのパイプラインの健全性を測定する {#measure-end-to-end-pipeline-health-with-new-metrics}

Data Streams Monitoring を使用すると、非同期システム内の任意の 2 点間をイベントが通過するのにかかる時間を測定することができます。

| メトリクス名 | 注目タグ | 説明 |
|---|---|-----|
| data_streams.latency | `start`, `end`, `env` | 指定された送信元から宛先までの経路のエンドツーエンドのレイテンシー。|
| data_streams.kafka.lag_seconds | `consumer_group`, `partition`, `topic`, `env` | プロデューサーとコンシューマー間のラグ（秒単位）。Java: Agent v1.9.0 以降が必要です。|
| data_streams.payload_size | `consumer_group`, `topic`, `env` | バイト単位の受信および送信スループット。|


また、これらのメトリクスを任意のダッシュボードやノートブックでグラフ化し、視覚化することができます。

{{< img src="data_streams/data_streams_metric_monitor.png" alt="Datadog Data Streams Monitoring モニター" style="width:100%;" >}}

### あらゆる経路のエンドツーエンドのレイテンシーを監視する {#monitor-end-to-end-latency-of-any-pathway}

イベントがシステムをどのように通過するかによって、異なるパスがレイテンシーの増加につながる可能性があります。[{{< ui >}}Measure{{< /ui >}} タブ][7] を使用すると、エンドツーエンドのレイテンシー情報のために開始サービスと終了サービスを選択して、ボトルネックを特定し、パフォーマンスを最適化できます。その経路のモニターを簡単に作成したり、ダッシュボードにエクスポートしたりできます。

あるいは、サービスをクリックして詳細なサイドパネルを開き、{{< ui >}}Pathways{{< /ui >}} タブを表示して、サービスとアップストリームサービス間のレイテンシーを確認します。

### イベント駆動型アプリケーションの速度低下にアラートを送信する {#alert-on-slowdowns-in-event-driven-applications}

コンシューマーラグの増大や古いメッセージによって引き起こされるイベント駆動型アプリケーションの速度低下は、連鎖的な障害につながり、ダウンタイムを増加させる可能性があります。すぐに使えるアラートを送信することで、パイプライン内のどこでボトルネックが発生しているかを特定し、すぐに対応できます。補足的なメトリクスについては、Datadog は [Kafka][4] や [SQS][5] などのメッセージキューテクノロジー向けの追加インテグレーションを提供しています。

Data Streams Monitoring のすぐに使えるモニターテンプレートを通じて、コンシューマーラグ、スループット、レイテンシーなどのメトリクスに関するモニターをワンクリックで設定できます。

{{< img src="data_streams/add_monitors_and_synthetic_tests.png" alt="Datadog Data Streams Monitoring モニターテンプレート" style="width:100%;" caption="'Add Monitors and Synthetic Tests' をクリックして、モニターテンプレートを表示します" >}}

### 受信したメッセージを任意のキュー、サービス、クラスターに属性付けする {#attribute-incoming-messages-to-any-queue-service-or-cluster}

消費型サービスでの遅延の増加、Kafka ブローカーでのリソース使用の増加、RabbitMQ または Amazon SQS のキューサイズの増加は、隣接するサービスがこれらのエンティティに生成またはエンティティから消費する方法の変更によって、頻繁に説明されます。

Data Streams Monitoring の任意のサービスまたはキューで {{< ui >}}Throughput{{< /ui >}} タブをクリックすると、スループットの変化や、それらの変化がどのアップストリームまたはダウンストリームサービスに起因しているかを素早く検出できます。[Catalog][2] が構成されると、対応するチームの Slack チャンネルやオンコールエンジニアにすぐにピボットできます。

単一の Kafka、RabbitMQ または Amazon SQS のクラスターにフィルターをかけることで、そのクラスター上で動作するすべての検出されたトピックまたはキューについて、送受信トラフィックの変化を検出することができます。

### インフラストラクチャー、ログ、トレースから根本原因を特定するために素早くピボットする {#quickly-pivot-to-identify-root-causes-in-infrastructure-logs-or-traces}

Datadogは、[Unified Service Tagging][3]を通じてサービスを支えるインフラストラクチャと関連ログを自動的にリンクするため、ボトルネックを簡単に特定できます。{{< ui >}}Infra{{< /ui >}}、{{< ui >}}Logs{{< /ui >}}、または{{< ui >}}Traces{{< /ui >}}タブをクリックして、パスウェイのレイテンシーやコンシューマーラグが増加した原因をさらにトラブルシューティングします。

### コネクタのスループットとステータスを監視する {#monitor-connector-throughput-and-status}
{{< img src="data_streams/connectors_topology.png" alt="「analytics-sink」というコネクタを示すDSMトポロジーマップ。この可視化は、コネクタのステータスがFAILEDであることを示しています。" style="width:100%;" >}}

Datadogは、管理対象の[Confluent Cloud][8]コネクタを自動的に検出し、Data Streams Monitoringのトポロジーマップで可視化できます。[Confluent Cloudインテグレーション][9]をインストールおよび設定して、Confluent Cloudコネクタからスループット、ステータス、トピックの依存関係などの情報を収集します。

## トラブルシューティング {#troubleshooting}

### エンドツーエンドのレイテンシーメトリクスが正確に表示されていないようです {#end-to-end-latency-metric-doesnt-look-accurate}

パスウェイのレイテンシー計算には、シングルスレッドのメッセージ処理が必要です。パイプライン内のメッセージで複数のスレッドを使用している場合は、手動インスツルメンテーションを追加してください。手動インスツルメンテーションは、[Go][12]および[Java][13]アプリケーションで利用可能です。その他の言語については、[手動インスツルメンテーションガイド][14]を参照してください。.NETの手動インスツルメンテーションについては、[サポート][15]にお問い合わせください。

Pathwaysタブでは、正確なレイテンシー値を得るために手動インスツルメンテーションが必要なパスに対して、「**レイテンシー値が概算である可能性があります**」というメッセージが表示されます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/data_streams/go#manual-instrumentation
[2]: /ja/internal_developer_portal/catalog/
[3]: /ja/getting_started/tagging/unified_service_tagging
[4]: /ja/integrations/kafka/
[5]: /ja/integrations/amazon_sqs/
[6]: /ja/tracing/trace_collection/runtime_config/
[7]: https://app.datadoghq.com/data-streams/measure
[8]: https://www.confluent.io/confluent-cloud/
[9]: /ja/integrations/confluent_cloud/
[10]: https://app.datadoghq.com/data-streams/map
[11]: /ja/opentelemetry/compatibility
[12]: /ja/data_streams/go#manual-instrumentation
[13]: /ja/data_streams/java#manual-instrumentation
[14]: /ja/data_streams/manual_instrumentation/
[15]: /ja/help/