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


[1]: /agent
[2]: https://mvnrepository.com/artifact/org.apache.kafka/kafka-clients
[3]: https://github.com/confluentinc/confluent-kafka-go
[4]: https://github.com/Shopify/sarama
