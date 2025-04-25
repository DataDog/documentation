---
title: Amazon SNS for Data Streams Monitoring
---

### Prerequisites

* [Datadog Agent v7.34.0 or later][1]

{{% data_streams/monitoring-sns-to-sqs-pipelines %}}
**Note:** Java requires additional setup: [read more](/data_streams/java/?tab=environmentvariables#monitoring-sns-to-sqs-pipelines)

### Support for Amazon SNS in Data Streams Monitoring

To setup DSM, please select the language of your producers and consumers

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

[1]: /agent
