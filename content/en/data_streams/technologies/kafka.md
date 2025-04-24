---
title: Kafka for Data Streams Monitoring
---

### Prerequisites

* [Datadog Agent v7.34.0 or later][1]

### Support for Kafka in Data Streams Monitoring

<table>
  <thead>
    <tr>
      <th>Language</th>
      <th>Technology</th>
      <th>Minimal tracer version</th>
      <th>Recommended tracer version</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Java</td>
      <td><a href="[2]">kafka-clients</a> (v3.7 is not fully supported)</td>
      <td>1.9.0</td>
      <td>1.43.0</td>
    </tr>
    <tr>
      <td rowspan="2">Go</td>
      <td><a href="[3]">confluent-kafka-go</a></td>
      <td>1.56.1</td>
      <td>1.66.0 or later</td>
    </tr>
    <tr>
      <td><a href="[3]">Sarama</a></td>
      <td>1.56.1</td>
      <td>1.66.0 or later</td>
    </tr>
    <tr>
      <td>Node.js</td>
      <td><a href="[5]">kafkajs</a></td>
      <td>2.39.0 or 3.26.0 or 4.5.0</td>
      <td>5.25.0 or later</td>
    </tr>
    <tr>
      <td>Python</td>
      <td><a href="[6]">confluent-kafka</a></td>
      <td>1.16.0</td>
      <td>2.11.0 or later</td>
    </tr>
    <tr>
      <td>.NET</td>
      <td><a href="[7]">Confluent.Kafka</a></td>
      <td>2.28.0</td>
      <td>2.41.0 or later</td>
    </tr>
  </tbody>
</table>


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