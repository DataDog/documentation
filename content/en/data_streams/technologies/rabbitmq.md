---
title: RabbitMQ for Data Streams Monitoring
---

### Prerequisites

* [Datadog Agent v7.34.0 or later][1]

### Support for RabbitMQ in Data Streams Monitoring

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
      <td><a href="../java.md">Java</a></td>
      <td><a href="https://mvnrepository.com/artifact/com.rabbitmq/amqp-client">amqp-client</a></td>
      <td>1.9.0</td>
      <td>1.42.2 or later</td>
    </tr>
    <tr>
      <td><a href="../nodejs.md">Node.js</a></td>
      <td><a href="https://www.npmjs.com/package/amqplib">amqplib</a></td>
      <td>3.48.0 or 4.27.0 or 5.3.0</td>
      <td>5.3.0 or later</td>
    </tr>
    <tr>
      <td><a href="../python.md">Python</a></td>
      <td><a href="https://pypi.org/project/kombu/">Kombu</a></td>
      <td>2.6.0</td>
      <td>2.6.0 or later</td>
    </tr>
    <tr>
      <td><a href="../dotnet.md">.NET</a></td>
      <td><a href="https://www.nuget.org/packages/RabbitMQ.Client">RabbitMQ.Client</a></td>
      <td>2.28.0</td>
      <td>2.37.0 or later</td>
    </tr>
  </tbody>
</table>

### Note
- Data Streams Monitoring uses message headers to propagate context through RabbitMQ streams. The exchange name is tracked as part of the message metadata.

[1]: /agent