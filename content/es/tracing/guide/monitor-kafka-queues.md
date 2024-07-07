---
further_reading:
- link: /tracing/trace_collection
  tag: Documentación
  text: Configurar la recopilación de trazas
- link: /integrations/kafka
  tag: Documentación
  text: Integración de Kafka
- link: /data_streams/
  tag: Documentación
  text: Data Streams Monitoring
title: Monitorización de colas de Kafka
---

## Información general

En los pipelines basados en eventos, las tecnologías de colas y flujo como Kafka son esenciales para el buen funcionamiento de tus sistemas. Asegurar que los mensajes se transmiten de forma fiable y rápida entre servicios puede resultar difícil debido a la gran cantidad de tecnologías y equipos que intervienen en un entorno. La integración de Datadog Kafka y APM permiten a tu equipo monitorizar el estado y la eficiencia de tus infraestructura y pipelines.

### La integración de Kafka

Visualiza el rendimiento de tu clúster en tiempo real y correlaciona el rendimiento de Kafka con el resto de tus aplicaciones mediante [la integración de Datadog Kafka][1]. Datadog también proporciona una [integración de MSK][2].

{{< img src="tracing/guide/monitor_kafka_queues/kafka_dashboard.png" alt="Dashboard de Kafka">}}

### Data Stream Monitoring

[Datadog Data Streams Monitoring][3] ofrece un método estandarizado para que tus equipos midan el estado de los pipelines y las latencias de extremo a extremo de eventos que atraviesan tu sistema. La amplia visibilidad que ofrece Data Streams Monitoring te permite localizar productores, consumidores o colas defectuosos que provocan retrasos y demoras en el pipeline. Puedes descubrir problemas de pipeline difíciles de depurar, como mensajes bloqueados, particiones en el almacenamiento activo o consumidores desconectados. Y puedes colaborar sin problemas con los equipos de aplicaciones o infraestructura pertinentes.

{{< img src="tracing/guide/monitor_kafka_queues/dash-2022-data-streams-compressed-blurb2.mp4" alt="Demostración de Data Streams Monitoring" video="true">}}

### Trazas distribuidas

Las trazas (traces) distribuidas de APM te ofrecen una mayor visibilidad del rendimiento de tus servicios, midiendo el volumen de solicitudes y la latencia. Crea gráficos y alertas para monitorizar tus datos de APM, y visualiza la actividad de una sola solicitud en una gráfica de llamas, como la que se muestra a continuación, para comprender mejor las fuentes de latencia y errores.

{{< img src="tracing/guide/monitor_kafka_queues/kafka_trace.png" alt="Un tramo (span) de consumidor de Kafka" >}}

APM puede rastrear automáticamente solicitudes hacia y desde clientes de Kafka. Esto significa que puedes recopilar trazas sin modificar tu código fuente. Datadog inyecta encabezados en los mensajes de Kafka para propagar el contexto de la traza del productor al consumidor.

Comprueba qué bibliotecas de Kafka son compatibles en nuestras [páginas de compatibilidad][4].

#### Configuración

Para rastrear aplicaciones de Kafka, Datadog rastrea las llamadas de producción y consumo dentro del SDK de Kafka. Por lo tanto, para monitorizar a Kafka, solo tienes que configurar APM en tus servicios. Consulta [la documentación de recopilación de trazas de APM][5] para obtener orientación sobre cómo empezar con APM y la traza distribuida.

## Monitoriza tu aplicación en APM

Una configuración clásica de Kafka muestra una traza con un tramo (span) de productor, y como elemento secundario, un tramo de consumidor. Cualquier trabajo que genere una traza en el lado del consumo está representado por los tramos (spans) secundarios del tramo de consumidor. Cada tramo tiene un conjunto de etiquetas con el prefijo `messaging`. La siguiente tabla describe las etiquetas que se pueden encontrar en tramos de Kafka.

<div class="alert alert-info">
  <div class="alert-info">
    <div>Para comprender mejor los metadatos de tramos en Datadog, lee <a href="/tracing/trace_collection/tracing_naming_convention">Semántica de las etiquetas de tramo</a></strong>.</div>
  </div>
</div>

| **Nombre**                         | **Tipo** | **Descripción**                                                                                                     |
|----------------------------------|----------|---------------------------------------------------------------------------------------------------------------------|
| `messaging.system`               | `string` | `Kafka`                                                                                                             |
| `messaging.destination`          | `string` | El tema al que se envía el mensaje.                                                                                   |
| `messaging.destination_kind`     | `string` | `Queue`                                                                                                             |
| `messaging.protocol`             | `string` | El nombre del protocolo de transporte.                                                                                 |
| `messaging.protocol_version`     | `string` | La versión del protocolo de transporte.                                                                              |
| `messaging.url`                  | `string` | La cadena de conexión al sistema de mensajería.                                                                      |
| `messaging.message_id`           | `string` | Valor utilizado por el sistema de mensajería como identificador del mensaje, representado como una cadena.                     |
| `messaging.conversation_id`      | `string` | El ID de la conversación a la que pertenece el mensaje, representado como una cadena.             |
| `messaging.message_payload_size` | `number` | El tamaño de la carga útil del mensaje sin comprimir en bytes.                                                              |
| `messaging.operation`            | `string` | Cadena que identifica el tipo de consumo del mensaje. <br>Ejemplos: `send` (un mensaje enviado a un productor), `receive` (un mensaje recibido por un consumidor), o `process` (un mensaje previamente recibido procesado por un consumidor).                                                                |
| `messaging.consumer_id`          | `string` | `{messaging.kafka.consumer_group} - {messaging.kafka.client_id}` si ambos están presentes.<br>`messaging.kafka.consumer_group` en caso contrario.                                                                                                                                                                |
| `messaging.kafka.message_key`    | `string` |  Las claves de mensaje en Kafka se utilizan para agrupar mensajes similares y asegurar que se procesan en la misma partición.<br> Se diferencian de `messaging.message_id` en que no son únicas.                                                                                                             |
| `messaging.kafka.consumer_group` | `string` |  Nombre del grupo de consumidores de Kafka que está gestionando el mensaje. Solo se aplica a los consumidores, no a los productores.
| `messaging.kafka.client_id`      | `string` |  ID de cliente del consumidor o productor que gestiona el mensaje.                                               |
| `messaging.kafka.partition`      | `string` |  Partición a la que se envía el mensaje.                                                                                  |
| `messaging.kafka.tombstone`      | `string` |  Un booleano que es true si el mensaje es un tombstone.                                                              |
| `messaging.kafka.client_id`      | `string` |  ID de cliente del consumidor o productor que gestiona el mensaje.                                               |

## Casos especiales

{{< tabs >}}

{{% tab "Java" %}}

Consulta [la documentación del rastreador de Java][7] para la configuración de Kafka.

[7]: /es/tracing/trace_collection/compatibility/java/#networking-framework-compatibility

{{% /tab %}}

{{% tab ".NET" %}}

La [documentación de Kafka .NET Client][9] afirma que una aplicación típica de consumidor de Kafka se centra en un bucle de consumo, que llama repetidamente al método Consume para recuperar registros uno a uno. El método `Consume` sondea el sistema en busca de mensajes. Así, por defecto, el tramo del consumidor tramo se crea cuando se devuelve un mensaje y se cierra antes de consumir el siguiente mensaje. La duración del tramo es entonces representativa del cómputo entre el consumo de un mensaje y el siguiente.

Cuando un mensaje no se procesa completamente antes de consumir el siguiente, o cuando se consumen varios mensajes a la vez, puedes configurar `DD_TRACE_KAFKA_CREATE_CONSUMER_SCOPE_ENABLED` en `false` en tu aplicación de consumo. Cuando esta configuración es `false`, el tramo del consumidor se crea e inmediatamente se cierra. Si tienes tramos secundarios que rastrear, sigue [la documentación de extracción e inyección de encabezados para la instrumentación personalizada de .NET][10] para extraer el contexto de la traza.

El rastreador de .NET permite rastrear Confluent.Kafka desde la [v1.27.0][11]. La API de propagación de contexto de la traza está disponible desde la [v2.7.0][12].

[9]: https://docs.confluent.io/kafka-clients/dotnet/current/overview.html#the-consume-loop
[10]: /es/tracing/trace_collection/custom_instrumentation/dotnet/#headers-extraction-and-injection
[11]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v1.27.0
[12]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.7.0

{{% /tab %}}

{{% tab "Ruby" %}}

La integración de Kafka proporciona el rastreo del gem `ruby-kafka`. Sigue [la documentación del rastreador de Ruby][8] para habilitarlo.

[8]: /es/tracing/trace_collection/dd_libraries/ruby/#kafka

{{% /tab %}}

{{< /tabs >}}

### Desactivar el rastreo para Kafka

Si deseas desactivar el rastreo de Kafka en una aplicación, establece [la configuración específica del lenguaje][6] apropiada.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/kafka
[2]: /es/integrations/amazon_msk/
[3]: https://app.datadoghq.com/data-streams/onboarding
[4]: /es/tracing/trace_collection/compatibility/
[5]: /es/tracing/trace_collection/
[6]: /es/tracing/trace_collection/library_config/