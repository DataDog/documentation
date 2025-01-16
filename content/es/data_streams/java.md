---
further_reading:
- link: /integrations/kafka/
  tag: Documentación
  text: Integración de Kafka
- link: /tracing/service_catalog/
  tag: Documentación
  text: Catálogo de servicios
title: Configurar Data Streams Monitoring para Java
---

### Requisitos previos

* [Datadog Agent v7.34.0 o más reciente][1]

### Bibliotecas compatibles

| Tecnología     | Biblioteca                                                                                         | Versión mínima del rastreador | Versión de rastreador recomendada |
|----------------|-------------------------------------------------------------------------------------------------|------------------------|-----------------------------
| Kafka          | [kafka-clients](https://mvnrepository.com/artifact/org.apache.kafka/kafka-clients)              | 1.9.0                  | 1.43.0 o posterior            |
| RabbitMQ       | [amqp-client](https://mvnrepository.com/artifact/com.rabbitmq/amqp-client)                      | 1.9.0                  | 1.42.2 o posterior            |
| Amazon SQS     | [aws-java-sdk-sqs (v1)](https://mvnrepository.com/artifact/com.amazonaws/aws-java-sdk-sqs)      | 1.27.0                 | 1.42.2 o posterior            |
| Amazon SQS     | [sqs (v2)](https://mvnrepository.com/artifact/software.amazon.awssdk/sqs)                       | 1.27.0                 | 1.42.2 o posterior            |
| Amazon Kinesis | [Kinesis (v1)](https://mvnrepository.com/artifact/com.amazonaws/aws-java-sdk-kinesis)           | 1.22.0                 | 1.42.2 o posterior            |
| Amazon Kinesis | [Kinesis (v2)](https://mvnrepository.com/artifact/software.amazon.awssdk/kinesis)               | 1.22.0                 | 1.42.2 o posterior            |
| Amazon SNS     | [SNS (v1)](https://mvnrepository.com/artifact/com.amazonaws/aws-java-sdk-sns)                   | 1.31.0                 | 1.42.2 o posterior            |
| Amazon SNS     | [SNS (v2)](https://mvnrepository.com/artifact/software.amazon.awssdk/sns)                       | 1.31.0                 | 1.42.2 o posterior            |
| Google PubSub  | [Google Cloud Pub/Sub](https://mvnrepository.com/artifact/com.google.cloud/google-cloud-pubsub) | 1.25.0                 | 1.42.2 or later            |

### Instalación

Java utiliza la instrumentación automática para inyectar y extraer metadatos adicionales requeridos por Data Streams Monitoring para medir latencias de extremo a extremo y la relación entre colas y servicios. Para habilitar Data Streams Monitoring, configura la variable de entorno `DD_DATA_STREAMS_ENABLED` en `true` en servicios que envían mensajes a (o que consumen mensajes de) Kafka, SQS o RabbitMQ.

Además, configura la variable `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED` en `true` de modo que `DD_SERVICE` se utilice como nombre de servicio en trazas (traces).

Por ejemplo:
```yaml
entorno:
  - DD_DATA_STREAMS_ENABLED: "true"
  - DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED: "true"
```

Como alternativa, puedes configurar la propiedad del sistema `-Ddd.data.streams.enabled=true` ejecutando lo siguiente cuando inicies tu aplicación Java:

```bash
java -javaagent:/path/to/dd-java-agent.jar -Ddd.data.streams.enabled=true -Ddd.trace.remove.integration-service-names.enabled=true -jar path/to/your/app.jar
```

### Instalación con un solo clic
Para configurar Data Streams Monitoring desde la interfaz de usuario Datadog sin necesidad de reiniciar tu servicio, utiliza la [configuración en tiempo de ejecución][4]. Ve a la página de servicios APM y `Enable DSM`.

{{< img src="data_streams/enable_dsm_service_catalog.png" alt="Habilita Data Streams Monitoring desde la sección Dependencias de la página de servicios de APM" >}}

### Monitorización de pipelines de SQS
Data Streams Monitoring utiliza un [atributo de mensaje][3] para rastrear la ruta de un mensaje a través de una cola SQS. Como Amazon SQS tiene un límite máximo de 10 atributos de mensaje permitidos por mensaje, todos los mensajes transmitidos a través de los pipelines de datos deben tener 9 o menos atributos de mensaje definidos, lo que permite que el atributo restante sea para Data Streams Monitoring.

### Instrumentación manual
Data Streams Monitoring propaga el contexto a través de las cabeceras de los mensajes. Si utilizas una tecnología de cola de mensajes no compatible con DSM, una tecnología sin cabeceras (como Kinesis) o Lambda, utiliza la [instrumentación manual para configurar DSM][5].

## Para leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent
[2]: /es/tracing/trace_collection/dd_libraries/java/
[3]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-metadata.html
[4]: /es/agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[5]: /es/data_streams/manual_instrumentation/?tab=java