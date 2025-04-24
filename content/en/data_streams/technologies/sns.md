---
title: Amazon SNS for Data Streams Monitoring
---

### Prerequisites

* [Datadog Agent v7.34.0 or later][1]

### Support for Amazon SNS in Data Streams Monitoring

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
      <td rowspan="2"><a href="https://docs.datadoghq.com/data_streams/java">Java</a></td>
      <td><a href="https://mvnrepository.com/artifact/com.amazonaws/aws-java-sdk-sns">SNS (v1)</a></td>
      <td>1.31.0</td>
      <td>1.42.2 or later</td>
    </tr>
    <tr>
      <td><a href="https://mvnrepository.com/artifact/software.amazon.awssdk/sns">SNS (v2)</a></td>
      <td>1.31.0</td>
      <td>1.42.2 or later</td>
    </tr>
    <tr>
      <td><a href="https://docs.datadoghq.com/data_streams/nodejs">Node.js</a></td>
      <td><a href="https://www.npmjs.com/package/@aws-sdk/client-sns">client-sns</a></td>
      <td>3.47.0 or 4.26.0 or 5.2.0</td>
      <td>5.18.0 or later</td>
    </tr>
    <tr>
      <td><a href="https://docs.datadoghq.com/data_streams/python">Python</a></td>
      <td><a href="https://pypi.org/project/botocore/">Botocore</a></td>
      <td>1.20.0</td>
      <td>2.8.0 or later</td>
    </tr>
    <tr>
      <td><a href="https://docs.datadoghq.com/data_streams/dotnet">.NET</a></td>
      <td><a href="https://www.nuget.org/packages/AWSSDK.SimpleNotificationService">Amazon SNS SDK</a></td>
      <td>3.6.0</td>
      <td>3.6.0 or later</td>
    </tr>
  </tbody>
</table>

### Note
- To monitor a data pipeline where Amazon SNS talks directly to Amazon SQS, you must enable [Amazon SNS raw message delivery][2].

[1]: /agent
[2]: https://docs.aws.amazon.com/sns/latest/dg/sns-large-payload-raw-message-delivery.html
