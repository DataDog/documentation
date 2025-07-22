---
title: Data Streams Monitoring for Amazon SQS
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
      <th>Minimal Lambda Library version</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2"><a href="/data_streams/java">Java</a></td>
      <td><a href="https://mvnrepository.com/artifact/com.amazonaws/aws-java-sdk-sqs">aws-java-sdk-sqs (v1)</a></td>
      <td>{{< dsm-tracer-version lang="java" lib="aws-java-sdk-sqs-v1" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="java" lib="aws-java-sdk-sqs-v1" type="recommended" >}}</td>
      <td>Not supported</td>
    </tr>
    <tr>
      <td><a href="https://mvnrepository.com/artifact/software.amazon.awssdk/sqs">sqs (v2)</a></td>
      <td>{{< dsm-tracer-version lang="java" lib="sqs-v2" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="java" lib="sqs-v2" type="recommended" >}}</td>
      <td>Not supported</td>
    </tr>
    <tr>
      <td><a href="/data_streams/nodejs">Node.js</a></td>
      <td><a href="https://www.npmjs.com/package/@aws-sdk/client-sqs">client-sqs</a></td>
      <td>{{< dsm-tracer-version lang="nodejs" lib="client-sqs" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="nodejs" lib="client-sqs" type="recommended" >}}</td>
      <td>Not supported</td>
    </tr>
    <tr>
      <td><a href="/data_streams/python">Python</a></td>
      <td><a href="https://pypi.org/project/botocore/">Botocore</a></td>
      <td>{{< dsm-tracer-version lang="python" lib="botocore" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="python" lib="botocore" type="recommended" >}}</td>
      <td><a href="https://github.com/DataDog/datadog-lambda-python/releases/tag/v7.112.0">112</a></td>
    </tr>
    <tr>
      <td><a href="/data_streams/dotnet">.NET</a></td>
      <td><a href="https://www.nuget.org/packages/AWSSDK.SQS">Amazon SQS SDK</a></td>
      <td>{{< dsm-tracer-version lang="dotnet" lib="amazon-sqs-sdk" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="dotnet" lib="amazon-sqs-sdk" type="recommended" >}}</td>
      <td>Not supported</td>
    </tr>
  </tbody>
</table>

### Setting up Data Streams Monitoring
See setup instructions for [Java][2], [Node.js][3], [Python][4],  or [.NET][5].

{{% data_streams/monitoring-sqs-pipelines %}}

### Measuring SQS Dead Letter Queues
Data Streams Monitoring allows you to track messages as they arrive in a dead-letter queue (DLQ). When a message is dead-lettered, you can use Datadog to investigate and resolve the underlying issue.

To measure the number of messages in a DLQ, ensure your AWS integration has the following permissions:
- `sqs:ListQueues`
- `sqs:GetQueueAttributes`
- `tag:GetResources`

[1]: /agent
[2]: /data_streams/setup/language/java
[3]: /data_streams/setup/language/nodejs
[4]: /data_streams/setup/language/python
[5]: /data_streams/setup/language/dotnet
