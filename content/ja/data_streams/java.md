---
title: Setup Data Streams Monitoring for Java
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

Data Streams Monitoring を開始するには、Datadog Agent と Java ライブラリの最新バージョンが必要です。
* [Datadog Agent v7.34.0 以降][1]
* [Java Agent で APM を有効にする][2]
  * Kafka および RabbitMQ: v1.9.0 以降
  * Amazon SQS: v1.27.0 以降

### インストール

Java uses auto-instrumentation to inject and extract additional metadata required by Data Streams Monitoring for measuring end-to-end latencies and the relationship between queues and services. To enable Data Streams Monitoring, set the `DD_DATA_STREAMS_ENABLED` environment variable to `true` on services sending messages to (or consuming messages from) Kafka, SQS or RabbitMQ.

Also, set the `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED` variable to `true` so that `DD_SERVICE` is used as the service name in traces.

例:
```yaml
environment:
  - DD_DATA_STREAMS_ENABLED: "true"
  - DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED: "true"
```

代わりに、Java アプリケーションの起動時に以下を実行して、`-Ddd.data.streams.enabled=true` システムプロパティを設定することも可能です。

```bash
java -javaagent:/path/to/dd-java-agent.jar -Ddd.data.streams.enabled=true -Ddd.trace.remove.integration.service.names.enabled=true -jar path/to/your/app.jar
```

### ワンクリックインストール
サービスを再起動することなく Datadog UI から Data Streams Monitoring をセットアップするには、[Configuration at Runtime][5] を使用します。APM サービスページに移動して、DSM を有効にします。

{{< img src="data_streams/enable_dsm_service_catalog.png" alt="APM サービスページの Dependencies セクションから Data Streams Monitoring を有効にします" >}}

### サポートされるライブラリ
Data Streams Monitoring は、[confluent-kafka ライブラリ][3]をサポートしています。

### SQS パイプラインの監視
Data Streams Monitoring は、1 つの[メッセージ属性][4]を使用して、SQS キューを通過するメッセージの経路を追跡します。Amazon SQS は、メッセージごとに許可されるメッセージ属性の上限が 10 個であるため、データパイプラインを通じてストリーミングされるすべてのメッセージには、9 個以下のメッセージ属性が設定されている必要があり、残りの属性は Data Streams Monitoring に使用できます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent
[2]: /tracing/trace_collection/dd_libraries/java/
[3]: https://pypi.org/project/confluent-kafka/
[4]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-metadata.html
[5]: /agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
