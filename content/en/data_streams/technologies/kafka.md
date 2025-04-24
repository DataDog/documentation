---
title: Kafka for Data Streams Monitoring
---

### Prerequisites

* [Datadog Agent v7.34.0 or later][1]

### Supported Languages for Kafka Technologies

| Technology | Language(s) | Minimal tracer version | Recommended tracer version |
|---|---|---|--|
|[kafka-clients][2] (v3.7 is not fully supported) | Java | 1.9.0 | 1.43.0 |
|[confluent-kafka-go][3] | Go | 1.56.1                | 1.66.0 or later            |
|[Sarama][3] | Go | 1.56.1                 | 1.66.0 or later            |
|[kafkajs][5] | Node.js | 2.39.0 or 3.26.0 or 4.5.0 | 5.25.0 or later            |
|[confluent-kafka][6] |Python | 1.16.0                 | 2.11.0 or later|
|[Confluent.Kafka][7] | .NET           | 2.28.0                 | 2.41.0 or later            |


{{< callout url="#" btn_hidden="true" header="Disclaimer">}}
[Kafka Streams][8] is partially supported for Java, and can lead to latency measurements being missed in many cases
{{< /callout >}}


[1]: /agent
[2]: https://mvnrepository.com/artifact/org.apache.kafka/kafka-clients
[3]: https://github.com/confluentinc/confluent-kafka-go
[4]: https://github.com/Shopify/sarama
[5]: https://www.npmjs.com/package/kafkajs
[6]: https://pypi.org/project/confluent-kafka/
[7]: https://www.nuget.org/packages/Confluent.Kafka
[8]: https://kafka.apache.org/documentation/streams/