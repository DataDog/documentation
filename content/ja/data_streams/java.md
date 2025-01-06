---
further_reading:
- link: /integrations/kafka/
  tag: ドキュメント
  text: Kafka インテグレーション
- link: /tracing/service_catalog/
  tag: ドキュメント
  text: サービスカタログ
title: Data Streams Monitoring for Java のセットアップ
---

### 前提条件

* [Datadog Agent v7.34.0 以降][1]

### サポートされるライブラリ

| IT業界     | ライブラリ                                                                                         | 最小対応トレーサーバージョン | 推奨トレーサーバージョン |
|----------------|-------------------------------------------------------------------------------------------------|------------------------|-----------------------------
| Kafka          | [kafka-clients](https://mvnrepository.com/artifact/org.apache.kafka/kafka-clients)              | 1.9.0                  | 1.43.0 以降            |
| RabbitMQ       | [amqp-client](https://mvnrepository.com/artifact/com.rabbitmq/amqp-client)                      | 1.9.0                  | 1.42.2 以降            |
| Amazon SQS     | [aws-java-sdk-sqs (v1)](https://mvnrepository.com/artifact/com.amazonaws/aws-java-sdk-sqs)      | 1.27.0                 | 1.42.2 以降            |
| Amazon SQS     | [sqs (v2)](https://mvnrepository.com/artifact/software.amazon.awssdk/sqs)                       | 1.27.0                 | 1.42.2 以降            |
| Amazon Kinesis | [Kinesis (v1)](https://mvnrepository.com/artifact/com.amazonaws/aws-java-sdk-kinesis)           | 1.22.0                 | 1.42.2 以降            |
| Amazon Kinesis | [Kinesis (v2)](https://mvnrepository.com/artifact/software.amazon.awssdk/kinesis)               | 1.22.0                 | 1.42.2 以降            |
| Amazon SNS     | [SNS (v1)](https://mvnrepository.com/artifact/com.amazonaws/aws-java-sdk-sns)                   | 1.31.0                 | 1.42.2 以降            |
| Amazon SNS     | [SNS (v2)](https://mvnrepository.com/artifact/software.amazon.awssdk/sns)                       | 1.31.0                 | 1.42.2 以降            |
| Google PubSub  | [Google Cloud Pub/Sub](https://mvnrepository.com/artifact/com.google.cloud/google-cloud-pubsub) | 1.25.0                 | 1.42.2 以降            |

### インストール

Java は自動インスツルメンテーションを使用して、Data Streams Monitoring がエンドツーエンドのレイテンシーやキューとサービス間の関係を測定するために必要な追加のメタデータを挿入し抽出します。Data Streams Monitoring を有効にするには、Kafka、SQS、または RabbitMQ にメッセージを送信する (またはメッセージを消費する) サービス上で `DD_DATA_STREAMS_ENABLED` 環境変数を `true` に設定します。

また、トレースで `DD_SERVICE` がサービス名として使用されるように、変数 `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED` を `true` に設定します。

例:
```yaml
environment:
  - DD_DATA_STREAMS_ENABLED: "true"
  - DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED: "true"
```

代わりに、Java アプリケーションの起動時に以下を実行して、`-Ddd.data.streams.enabled=true` システムプロパティを設定することも可能です。

```bash
java -javaagent:/path/to/dd-java-agent.jar -Ddd.data.streams.enabled=true -Ddd.trace.remove.integration-service-names.enabled=true -jar path/to/your/app.jar
```

### ワンクリックインストール
Datadog UI から Data Streams Monitoring を設定し、サービスを再起動する必要がないようにするには、[実行時の構成][4]を使用してください。その後、APM サービスページへ移動して `Enable DSM` を有効化してください。

{{< img src="data_streams/enable_dsm_service_catalog.png" alt="APM サービスページの Dependencies セクションから Data Streams Monitoring を有効にします" >}}

### SQS パイプラインの監視
Data Streams Monitoring は[メッセージ属性][3]を 1 つ使用して、SQSキューを通るメッセージ経路を追跡します。Amazon SQS では 1 メッセージあたり最大 10 個のメッセージ属性が許可されているため、データパイプライン経由でストリーミングされるすべてのメッセージは、Data Streams Monitoring 用に 1 つ分を確保できるよう、9 個以下のメッセージ属性に制限する必要があります。

### 手動インスツルメンテーション
Data Streams Monitoring はメッセージヘッダーを介してコンテキストを伝播します。DSM でサポートされていないメッセージキュー技術や、ヘッダーを持たない技術 (例: Kinesis)、または Lambda を利用している場合は、[手動インスツルメンテーションを使用して DSM を設定][5]してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent
[2]: /ja/tracing/trace_collection/dd_libraries/java/
[3]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-metadata.html
[4]: /ja/agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[5]: /ja/data_streams/manual_instrumentation/?tab=java