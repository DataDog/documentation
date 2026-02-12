---
title: Data Streams Monitoring for RabbitMQ
---

### Prerequisites

-   [Datadog Agent v7.34.0 or later][1]

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
      <td>{{< dsm-tracer-version lang="java" lib="amqp-client" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="java" lib="amqp-client" type="recommended" >}}</td>
    </tr>
    <tr>
      <td><a href="/data_streams/nodejs">Node.js</a></td>
      <td><a href="https://www.npmjs.com/package/amqplib">amqplib</a></td>
      <td>{{< dsm-tracer-version lang="nodejs" lib="amqplib" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="nodejs" lib="amqplib" type="recommended" >}}</td>
    </tr>
    <tr>
      <td><a href="/data_streams/nodejs">Node.js</a></td>
      <td><a href="https://www.npmjs.com/package/rhea">rhea</a></td>
      <td>{{< dsm-tracer-version lang="nodejs" lib="rhea" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="nodejs" lib="rhea" type="recommended" >}}</td>
    </tr>
    <tr>
      <td><a href="/data_streams/python">Python</a></td>
      <td><a href="https://pypi.org/project/kombu/">Kombu</a></td>
      <td>{{< dsm-tracer-version lang="python" lib="kombu" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="python" lib="kombu" type="recommended" >}}</td>
    </tr>
    <tr>
      <td><a href="/data_streams/dotnet">.NET</a></td>
      <td><a href="https://www.nuget.org/packages/RabbitMQ.Client">RabbitMQ.Client</a></td>
      <td>{{< dsm-tracer-version lang="dotnet" lib="rabbitmq-client" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="dotnet" lib="rabbitmq-client" type="recommended" >}}</td>
    </tr>
  </tbody>
</table>

### Setting up Data Streams Monitoring

See setup instructions for [Java][2], [Node.js][3], [Python][4], or [.NET][5].

{{% data_streams/monitoring-rabbitmq-pipelines %}}

[1]: /agent
[2]: /data_streams/setup/language/java
[3]: /data_streams/setup/language/nodejs
[4]: /data_streams/setup/language/python
[5]: /data_streams/setup/language/dotnet
