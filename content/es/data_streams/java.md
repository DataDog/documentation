---
further_reading:
- link: /integrations/kafka/
  tag: Documentación
  text: Integración de Kafka
- link: /tracing/service_catalog/
  tag: Documentación
  text: Catálogo de servicios
title: Configurar la monitorización de flujos (streams) de datos para Java
---

{{< site-region region="ap1" >}}
<div class="alert alert-info">Monitorización de Secuencias de Datos no es compatible con la región AP1.</a></div>
{{< /site-region >}}

### Requisitos previos

Para empezar con la monitorización de flujos de datos, necesitas las versiones recientes de las bibliotecas del Datadog Agent y Java:
* [Datadog Agent v7.34.0 o más reciente][1]
* [APM habilitado con el Java Agent ][2]
  * Kafka y RabbitMQ: v1.9.0 o posterior
  * Amazon SQS: v1.27.0 o posterior

### Instalación

Java utiliza la instrumentación automática para inyectar y extraer metadatos adicionales requeridos por la monitorización de flujos de datos para medir latencias de extremo a extremo y la relación entre colas y servicios. Para habilitar la monitorización de flujos de datos, configura la variable de entorno `DD_DATA_STREAMS_ENABLED` en `true` en servicios que envían mensajes a (o que consumen mensajes de) Kafka, SQS o RabbitMQ.

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
Para configurar la monitorización de flujos de datos desde la interfaz de usuario Datadog sin necesidad de reiniciar tu servicio, utiliza la [Configuración en el tiempo de ejecución][5]. Ve a la página de servicios de APM y `Enable DSM`.

{{< img src="data_streams/enable_dsm_service_catalog.png" alt="Habilita la monitorización de flujos de datos desde la sección Dependencias de la página de servicios de APM" >}}

### Bibliotecas compatibles
La monitorización de flujos de datos es compatible con la [biblioteca de confluent-kafka][3].

### Monitorización de pipelines de SQS
La monitorización de flujos de datos utiliza un [atributo de mensaje][4] para rastrear la ruta de un mensaje a través de una cola SQS. Como Amazon SQS tiene un límite máximo de 10 atributos de mensaje permitidos por mensaje, todos los mensajes transmitidos a través de los pipelines de datos deben tener 9 o menos atributos de mensaje configurados, lo que permite el atributo restante para la monitorización de flujos de datos.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent
[2]: /es/tracing/trace_collection/dd_libraries/java/
[3]: https://pypi.org/project/confluent-kafka/
[4]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-metadata.html
[5]: /es/agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration