---
title: Kafka for Data Streams Monitoring
---

### Prerequisites

* [Datadog Agent v7.34.0 or later][1]

{{% data_streams/monitoring-kafka-pipelines %}}

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
      <td><a href="/data_streams/java">Java</a></td>
      <td><a href="https://mvnrepository.com/artifact/org.apache.kafka/kafka-clients">kafka-clients</a> (v3.7 is not fully supported)</td>
      <td>1.9.0</td>
      <td>1.43.0</td>
    </tr>
    <tr>
      <td rowspan="2"><a href="/data_streams/go">Go</a></td>
      <td><a href="https://github.com/confluentinc/confluent-kafka-go">confluent-kafka-go</a></td>
      <td>1.56.1</td>
      <td>1.66.0 or later</td>
    </tr>
    <tr>
      <td><a href="https://github.com/Shopify/sarama">Sarama</a></td>
      <td>1.56.1</td>
      <td>1.66.0 or later</td>
    </tr>
    <tr>
      <td><a href="/data_streams/nodejs">Node.js</a></td>
      <td><a href="https://www.npmjs.com/package/kafkajs">kafkajs</a></td>
      <td>2.39.0 or 3.26.0 or 4.5.0</td>
      <td>5.25.0 or later</td>
    </tr>
    <tr>
      <td><a href="/python">Python</a></td>
      <td><a href="https://pypi.org/project/confluent-kafka/">confluent-kafka</a></td>
      <td>1.16.0</td>
      <td>2.11.0 or later</td>
    </tr>
    <tr>
      <td><a href="/data_streams/dotnet">.NET</a></td>
      <td><a href="https://www.nuget.org/packages/Confluent.Kafka">Confluent.Kafka</a></td>
      <td>2.28.0</td>
      <td>2.41.0 or later</td>
    </tr>
  </tbody>
</table>


### Note
- [Kafka Streams][2] is partially supported for Java, and can lead to latency measurements being missed in many cases


[1]: /agent
[2]: https://kafka.apache.org/documentation/streams/