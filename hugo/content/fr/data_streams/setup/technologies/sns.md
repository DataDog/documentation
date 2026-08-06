---
title: Data Streams Monitoring pour Amazon SNS
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
      <td><a href="https://mvnrepository.com/artifact/com.amazonaws/aws-java-sdk-sns">SNS (v1)</a></td>
      <td>{{< dsm-tracer-version lang="java" lib="sns-v1" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="java" lib="sns-v1" type="recommended" >}}</td>
      <td>Non pris en charge</td>
    </tr>
    <tr>
      <td><a href="https://mvnrepository.com/artifact/software.amazon.awssdk/sns">SNS (v2)</a></td>
      <td>{{< dsm-tracer-version lang="java" lib="sns-v2" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="java" lib="sns-v2" type="recommended" >}}</td>
      <td>Non pris en charge</td>
    </tr>
    <tr>
      <td><a href="/data_streams/nodejs">Node.js</a></td>
      <td><a href="https://www.npmjs.com/package/@aws-sdk/client-sns">client-sns</a></td>
      <td>{{< dsm-tracer-version lang="nodejs" lib="client-sns" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="nodejs" lib="client-sns" type="recommended" >}}</td>
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
      <td><a href="https://www.nuget.org/packages/AWSSDK.SimpleNotificationService">Amazon SNS SDK</a></td>
      <td>{{< dsm-tracer-version lang="dotnet" lib="amazon-sns-sdk" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="dotnet" lib="amazon-sns-sdk" type="recommended" >}}</td>
      <td>Non pris en charge</td>
    </tr>
  </tbody>
</table>

### Configurer Data Streams Monitoring
Consultez les instructions de configuration pour [Java][2], [Node.js][3], [Python][4] ou [.NET][5].

Pour Java, effectuez les étapes de configuration supplémentaires suivantes :

{{< tabs >}}
{{% tab "SQS v1" %}}
- Définissez la variable d'environnement `DD_TRACE_SQS_BODY_PROPAGATION_ENABLED` sur `true`.

  Par exemple :
   ```yaml
   environment:
     - DD_DATA_STREAMS_ENABLED: "true"
     - DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED: "true"
     - DD_TRACE_SQS_BODY_PROPAGATION_ENABLED: "true"
   ```
- Assurez-vous d'utiliser le [traceur Java v1.44.0+][1].

[1]: https://github.com/DataDog/dd-trace-java/releases
{{% /tab %}}
{{% tab "SQS v2" %}}
Activez la [diffusion de messages bruts Amazon SNS][1].

[1]: https://docs.aws.amazon.com/sns/latest/dg/sns-large-payload-raw-message-delivery.html
{{% /tab %}}
{{< /tabs >}}

{{% data_streams/monitoring-sns-to-sqs-pipelines %}}

[1]: /fr/agent
[2]: /fr/data_streams/setup/language/java
[3]: /fr/data_streams/setup/language/nodejs
[4]: /fr/data_streams/setup/language/python
[5]: /fr/data_streams/setup/language/dotnet