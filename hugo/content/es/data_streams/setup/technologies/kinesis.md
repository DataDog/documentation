---
title: Data Streams Monitoring para Amazon Kinesis
---

### Requisitos previos

* [Datadog Agent v7.34.0 o más reciente][1]

<table>
  <thead>
    <tr>
      <th>Lenguaje</th>
      <th>Biblioteca</th>
      <th>Versión mínima del rastreador</th>
      <th>Versión recomendada del rastreador</th>
      <th>Versión mínima de la biblioteca de Lambda</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2"><a href="/data_streams/java">Java</a></td>
      <td><a href="https://mvnrepository.com/artifact/com.amazonaws/aws-java-sdk-kinesis">Kinesis (v1)</a></td>
      <td>{{< dsm-tracer-version lang="java" lib="kinesis-v1" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="java" lib="kinesis-v1" type="recommended" >}}</td>
      <td>No compatible</td>
    </tr>
    <tr>
      <td><a href="https://mvnrepository.com/artifact/software.amazon.awssdk/kinesis">Kinesis (v2)</a></td>
      <td>{{< dsm-tracer-version lang="java" lib="kinesis-v2" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="java" lib="kinesis-v2" type="recommended" >}}</td>
      <td>No compatible</td>
    </tr>
    <tr>
      <td><a href="/data_streams/nodejs">Node.js</a></td>
      <td><a href="https://www.npmjs.com/package/@aws-sdk/client-kinesis">client-kinesis</a></td>
      <td>{{< dsm-tracer-version lang="nodejs" lib="client-kinesis" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="nodejs" lib="client-kinesis" type="recommended" >}}</td>
      <td>No compatible</td>
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
      <td>No compatible</td>
    </tr>
  </tbody>
</table>

### Configuración de Data Streams Monitoring
Consulta las instrucciones de configuración para [Java][2], [Node.js][3], [Python][4], o [.NET][5].

{{% data_streams/monitoring-kinesis-pipelines %}}


[1]: /es/agent
[2]: /es/data_streams/setup/language/java
[3]: /es/data_streams/setup/language/nodejs
[4]: /es/data_streams/setup/language/python
[5]: /es/data_streams/setup/language/dotnet