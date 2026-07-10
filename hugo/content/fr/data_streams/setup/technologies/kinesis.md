---
title: Data Streams Monitoring pour Amazon Kinesis
---

### Prérequis

* [Agent Datadog v7.34.0 ou version ultérieure][1]

<table>
  <thead>
    <tr>
      <th>Langage</th>
      <th>Bibliothèque</th>
      <th>Version minimale du traceur</th>
      <th>Version recommandée du traceur</th>
      <th>Version minimale de la bibliothèque Lambda</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2"><a href="/data_streams/java">Java</a></td>
      <td><a href="https://mvnrepository.com/artifact/com.amazonaws/aws-java-sdk-kinesis">Kinesis (v1)</a></td>
      <td>{{< dsm-tracer-version lang="java" lib="kinesis-v1" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="java" lib="kinesis-v1" type="recommended" >}}</td>
      <td>Non pris en charge</td>
    </tr>
    <tr>
      <td><a href="https://mvnrepository.com/artifact/software.amazon.awssdk/kinesis">Kinesis (v2)</a></td>
      <td>{{< dsm-tracer-version lang="java" lib="kinesis-v2" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="java" lib="kinesis-v2" type="recommended" >}}</td>
      <td>Non pris en charge</td>
    </tr>
    <tr>
      <td><a href="/data_streams/nodejs">Node.js</a></td>
      <td><a href="https://www.npmjs.com/package/@aws-sdk/client-kinesis">client-kinesis</a></td>
      <td>{{< dsm-tracer-version lang="nodejs" lib="client-kinesis" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="nodejs" lib="client-kinesis" type="recommended" >}}</td>
      <td>Non pris en charge</td>
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
      <td><a href="https://www.nuget.org/packages/AWSSDK.Kinesis">Amazon Kinesis SDK</a></td>
      <td>{{< dsm-tracer-version lang="dotnet" lib="amazon-kinesis-sdk" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="dotnet" lib="amazon-kinesis-sdk" type="recommended" >}}</td>
      <td>Non pris en charge</td>
    </tr>
  </tbody>
</table>

### Configurer Data Streams Monitoring
Consultez les instructions de configuration pour [Java][2], [Node.js][3], [Python][4] ou [.NET][5].

{{% data_streams/monitoring-kinesis-pipelines %}}


[1]: /fr/agent
[2]: /fr/data_streams/setup/language/java
[3]: /fr/data_streams/setup/language/nodejs
[4]: /fr/data_streams/setup/language/python
[5]: /fr/data_streams/setup/language/dotnet