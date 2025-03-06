---
title: Data Streams Monitoring for .NET のセットアップ
---

### 前提条件

* [Datadog Agent v7.34.0 以降][1]

### サポートされるライブラリ

| IT業界        | ライブラリ                         | Minimal tracer version | Recommended tracer version |
|-------------------|---------------------------------|------------------------|----------------------------|
| Kafka             | [Confluent.Kafka][3]            | 2.28.0                 | 2.41.0 以降            |
| RabbitMQ          | [RabbitMQ.Client][4]            | 2.28.0                 | 2.37.0 以降            |
| Amazon SQS        | [Amazon SQS SDK][5]             | 2.48.0                 | 2.48.0 以降            |
| Amazon SNS        | [Amazon SNS SDK][6]             | 3.6.0                  | 3.6.0 以降             |
| IBM MQ            | [IBMMQDotnetClient][7]          | 2.49.0                 | 2.49.0 以降            |
| Azure service bus | [Azure.Messaging.ServiceBus][8] | 2.38.0                 | 2.38.0 以降            |

### インストール

.NET は自動インスツルメンテーションを使用して、Data Streams Monitoring がエンドツーエンドのレイテンシーやキューとサービス間の関係を測定するために必要な追加のメタデータを挿入し抽出します。Data Streams Monitoring を有効にするには、Kafka または RabbitMQ にメッセージを送信する (またはメッセージを消費する) サービス上で `DD_DATA_STREAMS_ENABLED` 環境変数を `true` に設定します。

例:
```yaml
environment:
  - DD_DATA_STREAMS_ENABLED: "true"
```

### SQS パイプラインの監視
Data Streams Monitoring は[メッセージ属性][2]を 1 つ使用して、SQSキューを通るメッセージ経路を追跡します。Amazon SQS では 1 メッセージあたり最大 10 個のメッセージ属性が許可されているため、データパイプライン経由でストリーミングされるすべてのメッセージは、Data Streams Monitoring 用に 1 つ分を確保できるよう、9 個以下のメッセージ属性に制限する必要があります。

### SNS-to-SQSパイプラインの監視
Amazon SNS が Amazon SQS と直接やり取りするデータパイプラインを監視するには、[Amazon SNS の生メッセージ配信 (raw message delivery)][9] を有効にする必要があります。


[1]: /ja/agent
[2]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-metadata.html
[3]: https://www.nuget.org/packages/Confluent.Kafka
[4]: https://www.nuget.org/packages/RabbitMQ.Client
[5]: https://www.nuget.org/packages/AWSSDK.SQS
[6]: https://www.nuget.org/packages/AWSSDK.SimpleNotificationService
[7]: https://www.nuget.org/packages/IBMMQDotnetClient
[8]: https://www.nuget.org/packages/Azure.Messaging.ServiceBus
[9]: https://docs.aws.amazon.com/sns/latest/dg/sns-large-payload-raw-message-delivery.html