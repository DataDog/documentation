---
further_reading:
- link: https://learn.datadoghq.com/courses/monitor-a-kafka-pipeline-with-dsm
  tag: Centro de aprendizaje
  text: Hacer un seguimiento de una canalización de Kafka con Data Streams Monitoring
title: Data Streams Monitoring para Kafka
---
### Requisitos previos {#prerequisites}

-   [Datadog Agent v7.34.0 o superior][1]

<table>
  <thead>
    <tr>
      <th>Idioma</th>
      <th>Biblioteca</th>
      <th>Versión mínima del rastreador</th>
      <th>Versión recomendada del rastreador</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="/data_streams/java">Java</a></td>
      <td><a href="https://mvnrepository.com/artifact/org.apache.kafka/kafka-clients">kafka-clients</a> (La generación de lag no es compatible con v3.7*)</td>
      <td>{{< dsm-tracer-version lang="java" lib="kafka-clients" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="java" lib="kafka-clients" type="recommended" >}}</td>
    </tr>
    <tr>
      <td rowspan="3"><a href="/data_streams/go">Go</a></td>
      <td><a href="https://github.com/confluentinc/confluent-kafka-go">confluent-kafka-go</a></td>
      <td>{{< dsm-tracer-version lang="go" lib="confluent-kafka-go" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="go" lib="confluent-kafka-go" type="recommended" >}}</td>
    </tr>
    <tr>
      <td><a href="https://github.com/IBM/sarama">Sarama</a></td>
      <td>{{< dsm-tracer-version lang="go" lib="sarama" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="go" lib="sarama" type="recommended" >}}</td>
    </tr>
    <tr>
      <td><a href="https://github.com/segmentio/kafka-go">kafka-go</a></td>
      <td>{{< dsm-tracer-version lang="go" lib="kafka-go" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="go" lib="kafka-go" type="recommended" >}}</td>
    </tr>
    <tr>
      <td rowspan="2"><a href="/data_streams/nodejs">Node.js</a></td>
      <td><a href="https://www.npmjs.com/package/kafkajs">kafkajs</a></td>
      <td>{{< dsm-tracer-version lang="nodejs" lib="kafkajs" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="nodejs" lib="kafkajs" type="recommended" >}}</td>
    </tr>
    <tr><td><a href="https://github.com/confluentinc/confluent-kafka-javascript">confluent-kafka-javascript</a></td>
    <td>{{< dsm-tracer-version lang="nodejs" lib="confluent-kafka-javascript" type="minimal" >}}</td>
    <td>{{< dsm-tracer-version lang="nodejs" lib="confluent-kafka-javascript" type="recommended" >}}</td>
    </tr>
    <tr>
      <td rowspan="2"><a href="/python">Python</a></td>
      <td><a href="https://pypi.org/project/confluent-kafka/">confluent-kafka</a></td>
      <td>{{< dsm-tracer-version lang="python" lib="confluent-kafka" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="python" lib="confluent-kafka" type="recommended" >}}</td>
    </tr>
    <tr>
      <td><a href="https://pypi.org/project/aiokafka/">aiokafka</a></td>
      <td>{{< dsm-tracer-version lang="python" lib="aiokafka" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="python" lib="aiokafka" type="recommended" >}}</td>
    </tr>
    <tr>
      <td><a href="/data_streams/dotnet">.NET</a></td>
      <td><a href="https://www.nuget.org/packages/Confluent.Kafka">Confluent.Kafka</a></td>
      <td>{{< dsm-tracer-version lang="dotnet" lib="confluent-kafka" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="dotnet" lib="confluent-kafka" type="recommended" >}}</td>
    </tr>
    <tr>
      <td rowspan="2"><a href="/data_streams/Ruby">Ruby</a></td>
      <td><a href="https://github.com/zendesk/ruby-kafka">Ruby Kafka</a></td>
      <td>{{< dsm-tracer-version lang="ruby" lib="ruby-kafka" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="ruby" lib="ruby-kafka" type="recommended" >}}</td>
    </tr>
        <tr>
      <td><a href="https://karafka.io/docs/">Karafka</a></td>
      <td>{{< dsm-tracer-version lang="ruby" lib="karafka" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="ruby" lib="karafka" type="recommended" >}}</td>
    </tr>
    <tr>
      <td><a href="/data_streams/php">PHP</a></td>
      <td><a href="https://github.com/arnaud-lb/php-rdkafka">php-rdkafka</a></td>
      <td>{{< dsm-tracer-version lang="php" lib="php-rdkafka" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="php" lib="php-rdkafka" type="recommended" >}}</td>
    </tr>
  </tbody>
</table>

*Spring Boot 3.3.x y spring-kafka 3.2.x utilizan kafka-clients 3.7.x, el cual no admite la generación de lag. Para resolver esto, <a href="https://docs.spring.io/spring-kafka/reference/appendix/override-boot-dependencies.html">actualice su versión de kafka-clients</a> a 3.8.0 o una más reciente.</span>

<div class="alert alert-info"><a href="https://kafka.apache.org/documentation/streams/">Kafka Streams</a> cuenta con soporte parcial para Java y puede provocar que se pierdan mediciones de latencia.</div>

### Implementaciones de Kafka compatibles {#supported-kafka-deployments}

Instrumentar sus consumidores y productores con Data Streams Monitoring le permite visualizar su topología y realizar un seguimiento de sus Pipelines con [métricas listas para usar][7] independientemente de cómo esté implementado Kafka. Además, las siguientes implementaciones de Kafka cuentan con soporte de integración adicional, lo que proporciona más información sobre el estado de su clúster de Kafka:

| Modelo              | Integración                                 |
| ------------------ | ------------------------------------------- |
| Autohospedado        | [Kafka Broker][8] y [Kafka Consumer][13]    |
| Confluent Platform | [Confluent Platform][11]                    |
| Confluent Cloud    | [Confluent Cloud][12]                       |
| Amazon MSK         | [Amazon MSK][10] o [Amazon MSK (Agent)][9] |
| Red Panda          | Aún no integrado                          |

### Configuración de Data Streams Monitoring {#setting-up-data-streams-monitoring}

Consulte las instrucciones de configuración para [Java][2], [Go][3], [Node.js][4], [Python][5], [.NET][6], [Ruby][14] o [PHP][17].

{{% data_streams/monitoring-kafka-pipelines %}}

### Monitoreo de conectores {#monitoring-connectors}

#### Conectores de Confluent Cloud {#confluent-cloud-connectors}
{{% data_streams/dsm-confluent-connectors %}}

#### Conectores de Kafka autohospedados {#self-hosted-kafka-connectors}

_Requisitos_: [`dd-trace-java` v1.44.0+][15]

<div class="alert alert-info">Esta función está en Preview.</div>

Data Streams Monitoring puede recopilar información de sus conectores de Kafka autohospedados. En Datadog, estos conectores se muestran como servicios conectados a topics de Kafka. Datadog recopila datos de throughput hacia y desde todos los topics de Kafka. Datadog no recopila el estado de los conectores ni los sinks y sources de los conectores de Kafka autohospedados.

##### Configuración {#setup}

1. Asegúrese de que el Datadog Agent se esté ejecutando en sus workers de Kafka Connect.
2. Asegúrese de que [`dd-trace-java`][16] esté instalado en sus workers de Kafka Connect.
3. Modifique sus opciones de Java para incluir `dd-trace-java` en sus nodos worker de Kafka Connect. Por ejemplo, en Strimzi, modifique `STRIMZI_JAVA_OPTS` para agregar `-javaagent:/path/to/dd-java-agent.jar`.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent
[2]: /es/data_streams/setup/language/java
[3]: /es/data_streams/setup/language/go
[4]: /es/data_streams/setup/language/nodejs
[5]: /es/data_streams/setup/language/python
[6]: /es/data_streams/setup/language/dotnet
[7]: /es/data_streams/#measure-end-to-end-pipeline-health-with-new-metrics
[8]: /es/integrations/kafka/?tab=host
[9]: /es/integrations/amazon_msk/
[10]: /es/integrations/amazon_msk_cloud/
[11]: /es/integrations/confluent_platform/
[12]: /es/integrations/confluent_cloud/
[13]: /es/integrations/kafka/?tab=host#kafka-consumer-integration
[14]: /es/data_streams/setup/language/ruby
[15]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.44.0
[16]: https://github.com/DataDog/dd-trace-java
[17]: /es/data_streams/setup/language/php