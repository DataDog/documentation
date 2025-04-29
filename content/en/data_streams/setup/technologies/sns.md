---
title: Data Streams Monitoring for Amazon SNS
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
      <td rowspan="2"><a href="/data_streams/java">Java</a></td>
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
      <td><a href="/data_streams/nodejs">Node.js</a></td>
      <td><a href="https://www.npmjs.com/package/@aws-sdk/client-sns">client-sns</a></td>
      <td>3.47.0 or 4.26.0 or 5.2.0</td>
      <td>5.18.0 or later</td>
    </tr>
    <tr>
      <td><a href="data_streams/python">Python</a></td>
      <td><a href="https://pypi.org/project/botocore/">Botocore</a></td>
      <td>1.20.0</td>
      <td>2.8.0 or later</td>
    </tr>
    <tr>
      <td><a href="/data_streams/dotnet">.NET</a></td>
      <td><a href="https://www.nuget.org/packages/AWSSDK.SimpleNotificationService">Amazon SNS SDK</a></td>
      <td>3.6.0</td>
      <td>3.6.0 or later</td>
    </tr>
  </tbody>
</table>

### Setting up Data Streams Monitoring
See setup instructions for [Java][2], [Node.js][3], [Python][4],  or [.NET][5].

For Java, perform the following additional configuration steps:

{{< tabs >}}
{{% tab "SQS v1" %}}
- Set the environment variable `DD_TRACE_SQS_BODY_PROPAGATION_ENABLED` to `true`.

   For example:
   ```yaml
   environment:
     - DD_DATA_STREAMS_ENABLED: "true"
     - DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED: "true"
     - DD_TRACE_SQS_BODY_PROPAGATION_ENABLED: "true"
   ```
- Ensure that you are using [Java tracer v1.44.0+][1].

[1]: https://github.com/DataDog/dd-trace-java/releases
{{% /tab %}}
{{% tab "SQS v2" %}}
Enable [Amazon SNS raw message delivery][1].

[1]: https://docs.aws.amazon.com/sns/latest/dg/sns-large-payload-raw-message-delivery.html
{{% /tab %}}
{{< /tabs >}}

{{% data_streams/monitoring-sns-to-sqs-pipelines %}}

[1]: /agent
[2]: /data_streams/setup/language/java
[3]: /data_streams/setup/language/nodejs
[4]: /data_streams/setup/language/python
[5]: /data_streams/setup/language/dotnet