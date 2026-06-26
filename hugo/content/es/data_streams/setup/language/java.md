---
aliases:
- /es/data_streams/java
further_reading:
- link: /integrations/kafka/
  tag: Documentación
  text: Integración de Kafka
- link: /tracing/software_catalog/
  tag: Documentación
  text: Catálogo de software
- link: https://www.datadoghq.com/blog/confluent-connector-dsm-autodiscovery/
  tag: Blog
  text: Descubre automáticamente los conectores de Confluent Cloud y monitoriza fácilmente
    el rendimiento en Data Streams Monitoring
title: Configurar Data Streams Monitoring para Java
---

### Requisitos previos

* [Datadog Agent v7.34.0 o posterior][10]

### Bibliotecas compatibles

| Tecnología     | Biblioteca                                                                                                                       | Versión mínima del rastreador                                                          | Versión recomendada del rastreador                                                          |
|----------------|-------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|-------------------------------------------------------------------------------------|
| Kafka          | [kafka-clients](https://mvnrepository.com/artifact/org.apache.kafka/kafka-clients) (La generación de retardos no se admite para la v3.7*) | {{< dsm-tracer-version lang="java" lib="kafka-clients" type="minimal" >}}       | {{< dsm-tracer-version lang="java" lib="kafka-clients" type="recommended" >}}       |
| RabbitMQ       | [amqp-client](https://mvnrepository.com/artifact/com.rabbitmq/amqp-client)                                                    | {{< dsm-tracer-version lang="java" lib="amqp-client" type="minimal" >}}         | {{< dsm-tracer-version lang="java" lib="amqp-client" type="recommended" >}}         |
| Amazon SQS     | [aws-java-sdk-sqs (v1)](https://mvnrepository.com/artifact/com.amazonaws/aws-java-sdk-sqs)                                    | {{< dsm-tracer-version lang="java" lib="aws-java-sdk-sqs-v1" type="minimal" >}} | {{< dsm-tracer-version lang="java" lib="aws-java-sdk-sqs-v1" type="recommended" >}} |
| Amazon SQS     | [sqs (v2)](https://mvnrepository.com/artifact/software.amazon.awssdk/sqs)                                                     | {{< dsm-tracer-version lang="java" lib="sqs-v2" type="minimal" >}}              | {{< dsm-tracer-version lang="java" lib="sqs-v2" type="recommended" >}}              |
| Amazon Kinesis | [Kinesis (v1)](https://mvnrepository.com/artifact/com.amazonaws/aws-java-sdk-kinesis)                                         | {{< dsm-tracer-version lang="java" lib="kinesis-v1" type="minimal" >}}          | {{< dsm-tracer-version lang="java" lib="kinesis-v1" type="recommended" >}}          |
| Amazon Kinesis | [Kinesis (v2)](https://mvnrepository.com/artifact/software.amazon.awssdk/kinesis)                                             | {{< dsm-tracer-version lang="java" lib="kinesis-v2" type="minimal" >}}          | {{< dsm-tracer-version lang="java" lib="kinesis-v2" type="recommended" >}}          |
| Amazon SNS     | [SNS (v1)](https://mvnrepository.com/artifact/com.amazonaws/aws-java-sdk-sns)                                                 | {{< dsm-tracer-version lang="java" lib="sns-v1" type="minimal" >}}              | {{< dsm-tracer-version lang="java" lib="sns-v1" type="recommended" >}}              |
| Amazon SNS     | [SNS (v2)](https://mvnrepository.com/artifact/software.amazon.awssdk/sns)                                                     | {{< dsm-tracer-version lang="java" lib="sns-v2" type="minimal" >}}              | {{< dsm-tracer-version lang="java" lib="sns-v2" type="recommended" >}}              |
| Google PubSub  | [Google Cloud Pub/Sub](https://mvnrepository.com/artifact/com.google.cloud/google-cloud-pubsub)                               | {{< dsm-tracer-version lang="java" lib="google-pubsub" type="minimal" >}}       | {{< dsm-tracer-version lang="java" lib="google-pubsub" type="recommended" >}}       |
| IBM MQ         | [Clases de IBM MQ para Java y JMS](https://mvnrepository.com/artifact/com.ibm.mq/com.ibm.mq.jakarta.client)                    | {{< dsm-tracer-version lang="java" lib="ibmmqjmsclient" type="minimal" >}}      | {{< dsm-tracer-version lang="java" lib="ibmmqjmsclient" type="recommended" >}}      |

*Spring Boot 3.3.x y spring-kafka 3.2.x utilizan kafka-clients 3.7.x, que no admite la generación de retardos. Para solucionarlo, <a href="https://docs.spring.io/spring-kafka/reference/appendix/override-boot-dependencies.html">actualiza la versión de kafka-clients</a> a 3.8.0 o posterior.</span (tramo)>

### Instalación

Para activar Data Streams Monitoring, configura las siguientes variables de entorno en `true` en los servicios que envían o consumen mensajes:

- `DD_DATA_STREAMS_ENABLED`
- `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED`

{{< tabs >}}
{{% tab "Variables de entorno" %}}

```yaml
environment:
  - DD_DATA_STREAMS_ENABLED: "true"
  - DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED: "true"
```

{{% /tab %}}
{{% tab "Línea de comandos" %}}

Ejecuta lo siguiente cuando inicies tu aplicación Java:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.data.streams.enabled=true -Ddd.trace.remove.integration-service-names.enabled=true -jar path/to/your/app.jar
```

{{% /tab %}}
{{< /tabs >}}

### Instalación con un solo clic
Para configurar Data Streams Monitoring desde la interfaz de usuario Datadog sin necesidad de reiniciar tu servicio, utiliza la [configuración en tiempo de ejecución][4]. Ve a la página de servicios APM y `Enable DSM`.

{{< img src="data_streams/enable_dsm_service_catalog.png" alt="Activa Data Streams Monitoring desde la sección Dependencias de la page (página) de servicios de APM" >}}

##### Instalación

Utiliza el rastreador de Java de Datadog, [`dd-trace-java`][6], para recopilar información de tus trabajadores de Kafka Connect.

1. [Añade el archivo `dd-java-agent.jar`][7] a tus trabajadores de Kafka. Asegúrate de estar utilizando `dd-trace-java` [v1.44+][8].
1. Modifica tus opciones de Java para incluir el rastreador de Java de Datadog en tus nodos de trabajadores. Por ejemplo, en Strimzi, modifica `STRIMZI_JAVA_OPTS` para añadir `-javaagent:/path/to/dd-java-agent.jar`.

{{% data_streams/monitoring-sqs-pipelines %}}

{{% data_streams/monitoring-rabbitmq-pipelines %}}

### Monitorización de pipelines SNS a SQS
Para monitorizar un pipeline de datos en el que Amazon SNS habla directamente con Amazon SQS, debes realizar los siguientes pasos adicionales de configuración:

{{< tabs >}}
{{% tab "SQS v1" %}}
- Configura la variable de entorno `DD_TRACE_SQS_BODY_PROPAGATION_ENABLED` en `true`.

   Por ejemplo:
   ```yaml
   environment:
     - DD_DATA_STREAMS_ENABLED: "true"
     - DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED: "true"
     - DD_TRACE_SQS_BODY_PROPAGATION_ENABLED: "true"
   ```
- Asegúrate de estar utilizando el [rastreador de Java v1.44.0+][11].

[11]: https://github.com/DataDog/dd-trace-java/releases
{{% /tab %}}
{{% tab "SQS v2" %}}
Activa la [entrega de mensajes sin formato de Amazon SNS][1].

[1]: https://docs.aws.amazon.com/sns/latest/dg/sns-large-payload-raw-message-delivery.html
{{% /tab %}}
{{< /tabs >}}

{{% data_streams/monitoring-kinesis-pipelines %}}

### Instrumentación manual
Data Streams Monitoring propaga el contexto a través de las cabeceras de los mensajes. Si utilizas una tecnología de cola de mensajes no compatible con DSM, una tecnología sin cabeceras (como Kinesis) o Lambda, utiliza la [instrumentación manual para configurar DSM][5].

### Conectores de monitorización

#### Conectores de Confluent Cloud
{{% data_streams/dsm-confluent-connectors %}}

#### Conectores de Kafka autoalojados

_Requisitos_: [`dd-trace-java` v1.44.0+][8]

<div class="alert alert-info">Esta función está en vista previa.</div>

Data Streams Monitoring puede recopilar información de tus conectores de Kafka autoalojados. En Datadog, estos conectores se muestran como servicios conectados a temas de Kafka. Datadog recopila el rendimiento hacia y desde todos los temas de Kafka. Datadog no recopila el estado del conector ni los receptores y sources (fuentes) de los conectores de Kafka autoalojados.

##### Instalación

1. Asegúrate de que el Datadog Agent se esté ejecutando en tus trabajadores de Kafka Connect.
2. Asegúrate de que [`dd-trace-java`][6] esté instalado en tus trabajadores de Kafka Connect.
3. Modifica tus opciones de Java para incluir `dd-trace-java` en tus nodos de trabajadores de Kafka Connect. Por ejemplo, en Strimzi, modifica `STRIMZI_JAVA_OPTS` para añadir `-javaagent:/path/to/dd-java-agent.jar`.


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[10]: /es/agent
[2]: /es/tracing/trace_collection/dd_libraries/java/
[4]: /es/remote_configuration
[5]: /es/data_streams/manual_instrumentation/?tab=java
[6]: https://github.com/DataDog/dd-trace-java
[7]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/?tab=wget
[8]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.44.0