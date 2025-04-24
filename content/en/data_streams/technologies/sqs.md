---
title: Amazon SQS for Data Streams Monitoring
---

### Prerequisites

* [Datadog Agent v7.34.0 or later][1]

### Support for Amazon SQS in Data Streams Monitoring

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
      <td><a href="https://mvnrepository.com/artifact/com.amazonaws/aws-java-sdk-sqs">aws-java-sdk-sqs (v1)</a></td>
      <td>1.27.0</td>
      <td>1.42.2 or later</td>
    </tr>
    <tr>
      <td><a href="https://mvnrepository.com/artifact/software.amazon.awssdk/sqs">sqs (v2)</a></td>
      <td>1.27.0</td>
      <td>1.42.2 or later</td>
    </tr>
    <tr>
      <td><a href="https://docs.datadoghq.com/data_streams/nodejs">Node.js</a></td>
      <td><a href="https://www.npmjs.com/package/@aws-sdk/client-sqs">client-sqs</a></td>
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
      <td><a href="https://www.nuget.org/packages/AWSSDK.SQS">Amazon SQS SDK</a></td>
      <td>2.48.0</td>
      <td>2.48.0 or later</td>
    </tr>
  </tbody>
</table>

### Note
- Data Streams Monitoring uses one [message attribute][2] to track a message's path through an SQS queue. As Amazon SQS has a maximum limit of 10 message attributes allowed per message, all messages streamed through the data pipelines must have 9 or fewer message attributes set, allowing the remaining attribute for Data Streams Monitoring.

[1]: /agent
[2]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-metadata.html
