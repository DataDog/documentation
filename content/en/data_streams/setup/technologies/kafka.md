---
title: Data Streams Monitoring for Kafka
---

### Prerequisites

* [Datadog Agent v7.34.0 or later][1]

<table>
  <thead>
    <tr>
      <th>Language</th>
      <th>Library</th>
      <th>Minimal tracer version</th>
      <th>Recommended tracer version</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="/data_streams/java">Java</a></td>
      <td><a href="https://mvnrepository.com/artifact/org.apache.kafka/kafka-clients">kafka-clients</a> (Lag generation is not supported for v3.7)</td>
      <td>{{< dsm-tracer-version lang="java" lib="kafka-clients" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="java" lib="kafka-clients" type="recommended" >}}</td>
    </tr>
    <tr>
      <td rowspan="2"><a href="/data_streams/go">Go</a></td>
      <td><a href="https://github.com/confluentinc/confluent-kafka-go">confluent-kafka-go</a></td>
      <td>{{< dsm-tracer-version lang="go" lib="confluent-kafka-go" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="go" lib="confluent-kafka-go" type="recommended" >}}</td>
    </tr>
    <tr>
      <td><a href="https://github.com/Shopify/sarama">Sarama</a></td>
      <td>{{< dsm-tracer-version lang="go" lib="sarama" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="go" lib="sarama" type="recommended" >}}</td>
    </tr>
    <tr>
      <td rowspan="2"><a href="/data_streams/nodejs">Node.js</a></td>
      <td><a href="https://www.npmjs.com/package/kafkajs">kafkajs</a></td>
      <td>{{< dsm-tracer-version lang="nodejs" lib="kafkajs" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="nodejs" lib="kafkajs" type="recommended" >}}</td>
    </tr>
    <tr><td><a href="https://github.com/confluentinc/confluent-kafka-javascript">confluent-kafka-javascript</a></td>
    <td>{{< dsm-tracer-version lang="nodejs" lib="confluent-kafka-javascript" type="minimal" >}}</td>
    <td>{{< dsm-tracer-version lang="nodejs" lib="confluent-kafka-javascript" type="recommended" >}}</td>
    </tr>
    <tr>
      <td><a href="/python">Python</a></td>
      <td><a href="https://pypi.org/project/confluent-kafka/">confluent-kafka</a></td>
      <td>{{< dsm-tracer-version lang="python" lib="confluent-kafka" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="python" lib="confluent-kafka" type="recommended" >}}</td>
    </tr>
    <tr>
      <td><a href="/data_streams/dotnet">.NET</a></td>
      <td><a href="https://www.nuget.org/packages/Confluent.Kafka">Confluent.Kafka</a></td>
      <td>{{< dsm-tracer-version lang="dotnet" lib="confluent-kafka" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="dotnet" lib="confluent-kafka" type="recommended" >}}</td>
    </tr>
  </tbody>
</table>

<div class="alert alert-info"><a href="https://kafka.apache.org/documentation/streams/">Kafka Streams</a> is partially supported for Java, and can lead to latency measurements being missed.</div>


### Supported Kafka deployments

Instrumenting your consumers and producers with Data Streams Monitoring allows you to view your topology and track your pipelines with [ready-to-go metrics][7] independently of how Kafka is deployed. Additionally, the following Kafka deployments have further integration support, providing more insights into the health of your Kafka cluster:

|Model             |Integration                                 |
|------------------|--------------------------------------------|
|Self Hosted       |[Kafka Broker][8] & [Kafka Consumer][13]                           |
|Confluent Platform|[Confluent Platform][11]                    |
|Confluent Cloud   |[Confluent Cloud][12]                       |
|Amazon MSK        |[Amazon MSK][10] or [Amazon MSK (Agent)][9] |
|Red Panda         |Not yet integrated

### Setting up Data Streams Monitoring
See setup instructions for [Java][2], [Go][3], [Node.js][4], [Python][5],  or [.NET][6].

{{% data_streams/monitoring-kafka-pipelines %}}

[1]: /agent
[2]: /data_streams/setup/language/java
[3]: /data_streams/setup/language/go
[4]: /data_streams/setup/language/nodejs
[5]: /data_streams/setup/language/python
[6]: /data_streams/setup/language/dotnet
[7]: /data_streams/#measure-end-to-end-pipeline-health-with-new-metrics
[8]: /integrations/kafka/?tab=host
[9]: /integrations/amazon_msk/
[10]: /integrations/amazon_msk_cloud/
[11]: /integrations/confluent_platform/
[12]: /integrations/confluent_cloud/
[13]: /integrations/kafka/?tab=host#kafka-consumer-integration