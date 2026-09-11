---
title: Data Streams Monitoring para Kafka
---

### Requisitos previos

-   [Datadog Agent v7.34.0 o más reciente][1]

<table>
  <thead>
    <tr>
      <th>Lenguaje</th>
      <th>Biblioteca</th>
      <th>Versión de rastreador mínima</th>
      <th>Versión de rastreador recomendada</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="/data_streams/java">Java</a></td>
      <td><a href="https://mvnrepository.com/artifact/org.apache.kafka/kafka-clients">kafka-clients</a> (Lag generation is not supported for v3.7*)</td>
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
  </tbody>
</table>

*Spring Boot v3.3.x y Spring Kafka v3.2.x utilizan Kafka Clients v3.7.x, que no admite la generación de retrasos. Para solucionarlo, <a href="https://docs.spring.io/spring-kafka/reference/appendix/override-boot-dependencies.html">actualiza la versión de Kafka Clients</a> a v3.8.0 o posterior.</span>

<div class="alert alert-info"><a href="https://kafka.apache.org/documentation/streams/">Kafka Streams</a> es parcialmente compatible con Java y esto puede llevar a que se omitan mediciones de latencia.</div>

### Despliegues de Kafka compatibles

Instrumentar tus consumidores y productores con Data Streams Monitoring te permite ver tu topología y realizar un seguimiento de tus pipelines con [métricas listas para usar][7], independientemente de cómo se despliega Kafka. Además, los siguientes despliegues de Kafka tienen más compatibilidad de integración, proporcionando más información sobre la salud de tu clúster de Kafka:

| Modelo              | Integración                                 |
| ------------------ | ------------------------------------------- |
| Autoalojado        | [Intermediario Kafka][8] y [Consumidor Kafka][13]    |
| Confluent Platform | [Confluent Platform][11]                    |
| Nube Confluent    | [Confluent Cloud][12]                       |
| Amazon MSK         | [Amazon MSK][10] o [Amazon MSK (Agent)][9] |
| Red Panda          | Aún no integrado                          |

### Configuración de Data Streams Monitoring

Consulta las instrucciones de configuración para [Java][2], [Go][3], [Node.js][4], [Python][5], [.NET][6] o [Ruby][14].

{{% data_streams/monitoring-kafka-pipelines %}}

### Conectores de monitorización

#### Conectores de Confluent Cloud
{{% data_streams/dsm-confluent-connectors %}}

#### Conectores de Kafka autoalojados

Requisitos: [`dd-trace (traza)-java` v1.44.0 o posterior][15]

<div class="alert alert-info">Esta función está en vista previa.</div>

Data Streams Monitoring puede recopilar información de tus conectores de Kafka autoalojados. En Datadog, estos conectores se muestran como servicios conectados a temas de Kafka. Datadog recopila el rendimiento hacia y desde todos los temas de Kafka. Datadog no recopila estados de conectores o sumideros y fuentes de conectores de Kafka autoalojados.

##### Instalación

1. Asegúrate de que el Datadog Agent se está ejecutando en tus workers de Kafka Connect.
2. Asegúrate de que [`dd-trace (traza)-java`][16] está instalado en tus workers de Kafka Connect.
3. Modifica tus opciones de Java para incluir `dd-trace-java` en los nodos de tus workers de Kafka Connect. Por ejemplo, en Strimzi, modifica `STRIMZI_JAVA_OPTS` para añadir `-javaagent:/path/to/dd-java-agent.jar`.

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