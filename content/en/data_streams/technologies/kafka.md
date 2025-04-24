---
title: Kafka for Data Streams Monitoring
---

### Prerequisites

* [Datadog Agent v7.34.0 or later][1]

### Support for Kafka in Data Streams Monitoring

| Language | Technology                                      | Minimal tracer version     | Recommended tracer version |
|----------|--------------------------------------------------|-----------------------------|-----------------------------|
| Java     | [kafka-clients][2] (v3.7 is not fully supported) | 1.9.0                       | 1.43.0                      |
<tr>
  <td rowspan="2">Go</td>
  <td>[confluent-kafka-go][3]</td>
  <td>1.56.1</td>
  <td>1.66.0 or later</td>
</tr>
<tr>
  <td>[Sarama][3]</td>
  <td>1.56.1</td>
  <td>1.66.0 or later</td>
</tr>
| Node.js  | [kafkajs][5]                                    | 2.39.0 or 3.26.0 or 4.5.0   | 5.25.0 or later             |
| Python   | [confluent-kafka][6]                            | 1.16.0                      | 2.11.0 or later             |
| .NET     | [Confluent.Kafka][7]                            | 2.28.0          |


### Note
- [Kafka Streams][8] is partially supported for Java, and can lead to latency measurements being missed in many cases


[1]: /agent
[2]: https://mvnrepository.com/artifact/org.apache.kafka/kafka-clients
[3]: https://github.com/confluentinc/confluent-kafka-go
[4]: https://github.com/Shopify/sarama
[5]: https://www.npmjs.com/package/kafkajs
[6]: https://pypi.org/project/confluent-kafka/
[7]: https://www.nuget.org/packages/Confluent.Kafka
[8]: https://kafka.apache.org/documentation/streams/