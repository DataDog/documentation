---
title: Amazon Kinesis for Data Streams Monitoring
---

### Prerequisites

* [Datadog Agent v7.34.0 or later][1]

### Support for Amazon Kinesis in Data Streams Monitoring

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
      <td rowspan="2"><a href="../java.md">Java</a></td>
      <td><a href="https://mvnrepository.com/artifact/com.amazonaws/aws-java-sdk-kinesis">Kinesis (v1)</a></td>
      <td>1.22.0</td>
      <td>1.42.2 or later</td>
    </tr>
    <tr>
      <td><a href="https://mvnrepository.com/artifact/software.amazon.awssdk/kinesis">Kinesis (v2)</a></td>
      <td>1.22.0</td>
      <td>1.42.2 or later</td>
    </tr>
    <tr>
      <td><a href="../nodejs.md">Node.js</a></td>
      <td><a href="https://www.npmjs.com/package/@aws-sdk/client-kinesis">client-kinesis</a></td>
      <td>3.47.0 or 4.26.0 or 5.2.0</td>
      <td>5.18.0 or later</td>
    </tr>
    <tr>
      <td><a href="../python.md">Python</a></td>
      <td><a href="https://pypi.org/project/botocore/">Botocore</a></td>
      <td>1.20.0</td>
      <td>2.8.0 or later</td>
    </tr>
    <tr>
      <td><a href="../dotnet.md">.NET</a></td>
      <td><a href="https://www.nuget.org/packages/AWSSDK.Kinesis">Amazon Kinesis SDK</a></td>
      <td>3.7.0</td>
      <td>3.7.0 or later</td>
    </tr>
  </tbody>
</table>

### Note
- There are no message attributes in Kinesis to propagate context and track a message's full path through a Kinesis stream. As a result, Data Streams Monitoring's end-to-end latency metrics are approximated based on summing latency on segments of a message's path, from the producing service through a Kinesis Stream, to a consumer service. Throughput metrics are based on segments from the producing service through a Kinesis Stream, to the consumer service. The full topology of data streams can still be visualized through instrumenting services.

[1]: /agent