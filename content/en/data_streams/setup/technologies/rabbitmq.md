---
title: Data Streams Monitoring for RabbitMQ
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
      <td><a href="https://mvnrepository.com/artifact/com.rabbitmq/amqp-client">amqp-client</a></td>
      <td>1.9.0</td>
      <td>1.42.2 or later</td>
    </tr>
    <tr>
      <td><a href="/data_streams/nodejs">Node.js</a></td>
      <td><a href="https://www.npmjs.com/package/amqplib">amqplib</a></td>
      <td>3.48.0 or 4.27.0 or 5.3.0</td>
      <td>5.3.0 or later</td>
    </tr>
    <tr>
      <td><a href="/data_streams/python">Python</a></td>
      <td><a href="https://pypi.org/project/kombu/">Kombu</a></td>
      <td>2.6.0</td>
      <td>2.6.0 or later</td>
    </tr>
    <tr>
      <td><a href="/data_streams/dotnet">.NET</a></td>
      <td><a href="https://www.nuget.org/packages/RabbitMQ.Client">RabbitMQ.Client</a></td>
      <td>2.28.0</td>
      <td>2.37.0 or later</td>
    </tr>
  </tbody>
</table>

### Setting up Data Streams Monitoring
See setup instructions for [Java][2], [Node.js][3], [Python][4],  or [.NET][5].

{{% data_streams/monitoring-rabbitmq-pipelines %}}


[1]: /agent
[2]: /data_streams/setup/language/java
[3]: /data_streams/setup/language/nodejs
[4]: /data_streams/setup/language/python
[5]: /data_streams/setup/language/dotnet