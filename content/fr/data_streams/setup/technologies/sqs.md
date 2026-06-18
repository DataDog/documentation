---
title: Data Streams Monitoring pour Amazon SQS
---

### Prérequis

* [Agent Datadog v7.34.0 ou version ultérieure][1]

<table>
  <thead>
    <tr>
      <th>Langue</th>
      <th>Bibliothèque</th>
      <th>Version minimale du traceur</th>
      <th>Version recommandée du traceur</th>
      <th>Version minimale de la bibliothèque Lambda</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2"><a href="/data_streams/java">Java</a></td>
      <td><a href="https://mvnrepository.com/artifact/com.amazonaws/aws-java-sdk-sqs">aws-java-sdk-sqs (v1)</a></td>
      <td>{{< dsm-tracer-version lang="java" lib="aws-java-sdk-sqs-v1" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="java" lib="aws-java-sdk-sqs-v1" type="recommended" >}}</td>
      <td>Non pris en charge</td>
    </tr>
    <tr>
      <td><a href="https://mvnrepository.com/artifact/software.amazon.awssdk/sqs">sqs (v2)</a></td>
      <td>{{< dsm-tracer-version lang="java" lib="sqs-v2" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="java" lib="sqs-v2" type="recommended" >}}</td>
      <td>Non pris en charge</td>
    </tr>
    <tr>
      <td><a href="/data_streams/nodejs">Node.js</a></td>
      <td><a href="https://www.npmjs.com/package/@aws-sdk/client-sqs">client-sqs</a></td>
      <td>{{< dsm-tracer-version lang="nodejs" lib="client-sqs" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="nodejs" lib="client-sqs" type="recommended" >}}</td>
      <td>Non pris en charge</td>
    </tr>
    <tr>
      <td><a href="/data_streams/python">Python</a></td>
      <td><a href="https://pypi.org/project (projet)/botocore/">Botocore</a></td>
      <td>{{< dsm-tracer-version lang="python" lib="botocore" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="python" lib="botocore" type="recommended" >}}</td>
      <td><a href="https://github.com/DataDog/datadog-lambda-python/releases/tag/v7.112.0">112</a></td>
    </tr>
    <tr>
      <td><a href="/data_streams/dotnet">.NET</a></td>
      <td><a href="https://www.nuget.org/packages/AWSSDK.SQS">Amazon SQS SDK (kit de développement logiciel)</a></td>
      <td>{{< dsm-tracer-version lang="dotnet" lib="amazon-sqs-sdk" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="dotnet" lib="amazon-sqs-sdk" type="recommended" >}}</td>
      <td>Non pris en charge</td>
    </tr>
  </tbody>
</table>

### Configurer Data Streams Monitoring
Consultez les instructions de configuration pour [Java][2], [Node.js][3], [Python][4] ou [.NET][5].

{{% data_streams/monitoring-sqs-pipelines %}}

### Mesurer les files d'attente de lettres mortes SQS
Data Streams Monitoring vous permet de suivre les messages à mesure qu'ils arrivent dans une file d'attente de lettres mortes (DLQ). Lorsqu'un message est placé en file d'attente de lettres mortes, vous pouvez utiliser Datadog pour examiner et résoudre le problème sous-jacent.

Pour mesurer le nombre de messages dans une DLQ, vérifiez que votre intégration AWS dispose des autorisations suivantes :
- `sqs:ListQueues`
- `sqs:GetQueueAttributes`
- `tag:GetResources`

[1]: /fr/agent
[2]: /fr/data_streams/setup/language/java
[3]: /fr/data_streams/setup/language/nodejs
[4]: /fr/data_streams/setup/language/python
[5]: /fr/data_streams/setup/language/dotnet