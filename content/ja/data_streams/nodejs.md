---
further_reading:
- link: /integrations/kafka/
  tag: Documentation
  text: Kafka Integration
- link: /tracing/service_catalog/
  tag: Documentation
  text: Service Catalog
title: Setup Data Streams Monitoring for Node.js
---

{{< site-region region="ap1" >}}
<div class="alert alert-info">Data Streams Monitoring は、AP1 リージョンではサポートされていません。</a></div>
{{< /site-region >}}

### 前提条件

Data Streams Monitoring を開始するには、Datadog Agent と Node.js ライブラリの最新バージョンが必要です。
* [Datadog Agent v7.34.0 以降][1]
* [Node.js Tracer][2]
  * Kafka: v2.39.0, v3.26.0, v4.5.0, or later
  * Amazon SQS: v4.21.0
  * RabbitMQ: v3.48.0, v4.27.0, v5.3.0 or later

### インストール

Node.js uses auto-instrumentation to inject and extract additional metadata required by Data Streams Monitoring for measuring end-to-end latencies and the relationship between queues and services. To enable Data Streams Monitoring, set the `DD_DATA_STREAMS_ENABLED` environment variable to `true` on services sending messages to (or consuming messages from) Kafka.

例:
```yaml
environment:
  - DD_DATA_STREAMS_ENABLED: "true"
```

### サポートされるライブラリ
Data Streams Monitoring supports the [confluent-kafka library][3], [amqplib package][5], and [rhea package][6].

### SQS パイプラインの監視
Data Streams Monitoring は、1 つの[メッセージ属性][4]を使用して、SQS キューを通過するメッセージの経路を追跡します。Amazon SQS は、メッセージごとに許可されるメッセージ属性の上限が 10 個であるため、データパイプラインを通じてストリーミングされるすべてのメッセージには、9 個以下のメッセージ属性が設定されている必要があり、残りの属性は Data Streams Monitoring に使用できます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent
[2]: /ja/tracing/trace_collection/dd_libraries/nodejs
[3]: https://pypi.org/project/confluent-kafka/
[4]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-metadata.html
[5]: https://www.npmjs.com/package/amqplib
[6]: https://www.npmjs.com/package/rhea