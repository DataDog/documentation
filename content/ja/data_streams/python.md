---
title: Setup Data Streams Monitoring for Python
further_reading:
    - link: /integrations/kafka/
      tag: Documentation
      text: Kafka Integration
    - link: /tracing/service_catalog/
      tag: Documentation
      text: Service Catalog
---

{{< site-region region="ap1" >}}
<div class="alert alert-info">Data Streams Monitoring は、AP1 リージョンではサポートされていません。</a></div>
{{< /site-region >}}

### 前提条件

Data Streams Monitoring を開始するには、Datadog Agent と Python ライブラリの最新バージョンが必要です。
* [Datadog Agent v7.34.0 以降][1]
* [Python Tracer][2]
  * Kafka: v1.16.0 or later
  * Amazon SQS and Amazon Kinesis: v1.20.0
  * RabbitMQ: v2.6.0 or later

### インストール

Python は自動インスツルメンテーションを使用して、Data Streams Monitoring がエンドツーエンドのレイテンシーやキューとサービス間の関係を測定するために必要な追加のメタデータを挿入し抽出します。Data Streams Monitoring を有効にするには、Kafka にメッセージを送信する (またはメッセージを消費する) サービス上で `DD_DATA_STREAMS_ENABLED` 環境変数を `true` に設定します。

例:
```yaml
environment:
  - DD_DATA_STREAMS_ENABLED: "true"
```

### サポートされるライブラリ
Data Streams Monitoring supports the [confluent-kafka library][3] and [kombu package][5].

### SQS パイプラインの監視
Data Streams Monitoring uses one [message attribute][4] to track a message's path through an SQS queue. As Amazon SQS has a maximum limit of 10 message attributes allowed per message, all messages streamed through the data pipelines must have 9 or less message attributes set, allowing the remaining attribute for Data Streams Monitoring.

### Monitoring Kinesis Pipelines
There are no message attributes in Kinesis to propagate context and track a message's full path through a Kinesis stream. As a result, Data Streams Monitoring's end-to-end latency metrics are approximated based on summing latency on segments of a message's path, from the producing service through a Kinesis Stream, to a consumer service. Throughput metrics are based on segments from the producing service through a Kinesis Stream, to the consumer service. The full topology of data streams can still be visualized through instrumenting services.

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent
[2]: /tracing/trace_collection/dd_libraries/python
[3]: https://pypi.org/project/confluent-kafka/
[4]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-metadata.html
[5]: https://pypi.org/project/kombu/
