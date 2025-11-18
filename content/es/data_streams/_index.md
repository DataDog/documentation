---
aliases:
- /es/data_streams/troubleshooting
- /es/data_streams/data_pipeline_lineage
cascade:
  algolia:
    rank: 70
further_reading:
- link: /integrations/kafka/
  tag: Documentación
  text: Integración de Kafka
- link: /integrations/amazon_sqs/
  tag: Documentación
  text: Integración de Amazon SQS
- link: /tracing/software_catalog/
  tag: Documentación
  text: Catálogo de software
- link: https://www.datadoghq.com/blog/data-streams-monitoring/
  tag: Blog
  text: Controlar y mejorar el rendimiento de los pipelines de datos de transmisión
    con Datadog Data Streams Monitoring
- link: https://www.datadoghq.com/blog/data-streams-monitoring-apm-integration/
  tag: Blog
  text: Solucionar los problemas de los pipelines de datos de transmisión directamente
    desde APM con Datadog Data Streams Monitoring
- link: https://www.datadoghq.com/blog/data-streams-monitoring-sqs/
  tag: Blog
  text: Monitorizar SQS con Data Streams Monitoring
- link: https://www.datadoghq.com/blog/confluent-connector-dsm-autodiscovery/
  tag: Blog
  text: Detectar automáticamente conectores de Confluent Cloud y consultar fácilmente
    el rendimiento de los monitores en Data Streams Monitoring
- link: https://www.datadoghq.com/blog/data-observability/
  tag: Blog
  text: Garantizar la confianza durante todo el ciclo de vida de los datos con Datadog
    Data Observability
title: Data Streams Monitoring
---


{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Data Streams Monitoring no está disponible para el sitio {{< region-param key="dd_site_name" >}}.
</div>
{{% /site-region %}}

{{< img src="data_streams/map_view2.png" alt="Página de Data Streams Monitoring en Datadog, que muestra la vista Mapas. Se resalta un servicio llamado 'autenticador'. Visualización de un mapa de topología de flujos de datos de izquierda a derecha, donde el servicio autenticador se muestra en el centro con sus servicios y colas ascendentes y descendentes." style="width:100%;" >}}

Data Streams Monitoring proporciona un método estandarizado para que los equipos comprendan y gestionen los pipelines a escala y así facilita:
* Mide el estado de los pipelines con latencias de extremo a extremo para eventos que atraviesan tu sistema.
* Localiza los productores, consumidores o colas defectuosos y, a continuación, dirígete a logs o clústeres para solucionar los problemas con mayor rapidez.
* Evita los retrasos en cascada equipando a los propietarios de servicio para impedir que la acumulación de eventos desborde los servicios de flujo descendente.

### Lenguajes y tecnologías compatibles

Data Streams Monitoring instrumenta los _clientes_ de Kafka (consumidores/productores). Si puedes instrumentar tu infraestructura de clientes, puedes utilizar Data Streams Monitoring.

|   | Java | Python | .NET | Node.js | Go |
| - | ---- | ------ | ---- | ------- | -- |
| Apache Kafka <br/>(autoalojado, Amazon MSK, Confluent Cloud o cualquier otra plataforma de alojamiento) | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| Amazon Kinesis | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |
| Amazon SNS | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |
| Amazon SQS | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |
| Azure Service Bus | | | {{< X >}} | | |
| Google Pub/Sub | {{< X >}} | | | {{< X >}} | |
| IBM MQ | | | {{< X >}} | | |
| RabbitMQ | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |

Data Streams Monitoring requiere versiones mínimas del rastreador Datadog. Para obtener más detalles, consulta cada página de configuración.

#### Compatibilidad con OpenTelemetry
Data Streams Monitoring es compatible con OpenTelemetry. Si has configurado Datadog APM para que funcione con OpenTelemetry, no es necesaria ninguna configuración adicional para utilizar Data Streams Monitoring. Consulta [Compatibilidad de OpenTelemetry][11].

## Instalación

### Por lenguaje

{{< partial name="data_streams/setup-languages.html" >}}


### Por tecnología

{{< partial name="data_streams/setup-technologies.html" >}}

<br/>

## Explorar Data Streams Monitoring

### Visualizar la arquitectura de tus pipelines de transmisión de datos

{{< img src="data_streams/topology_map.png" alt="Visualización de un mapa de topología de DSM. " style="width:100%;" >}}

Data Streams Monitoring proporciona un [mapa de topología[10] predefinido para que puedas visualizar el flujo de datos a través de tus pipelines e identificar los servicios productores/consumidores, las dependencias de las colas, la propiedad del servicio y las métricas de salud claves.

### Medir el estado de los pipelines de extremo a extremo con las nuevas métricas

Con Data Streams Monitoring, puedes medir el tiempo que suelen tardar los eventos en recorrer el trayecto entre dos puntos cualesquiera de tu sistema asíncrono:

| Nombre de la métrica | Etiquetas (tags) notables | Descripción |
|---|---|-----|
| data_streams.latency | `start`, `end`, `env` | Latencia de extremo a extremo de un trayecto desde un origen especificado hasta un servicio de destino. |
| data_streams.kafka.lag_seconds | `consumer_group`, `partition`, `topic`, `env` | Retraso en segundos entre el productor y el consumidor. Requiere Java Agent v1.9.0 o posterior. |
| data_streams.payload_size | `consumer_group`, `topic`, `env` | Rendimiento entrante y saliente en bytes.|


También puedes representar gráficamente y visualizar estas métricas en cualquier dashboard o notebook:

{{< img src="data_streams/data_streams_metric_monitor.png" alt="Monitor de Datadog Data Streams Monitoring" style="width:100%;" >}}

### Monitorizar la latencia de extremo a extremo de cualquier ruta

Según cómo los eventos atraviesen tu sistema, diferentes rutas pueden conducir a un aumento de la latencia. Con la [pestaña **Medida**][7], puedes seleccionar un servicio de inicio y un servicio final para obtener información sobre la latencia de extremo a extremo para identificar cuellos de botella y optimizar el rendimiento. Crea fácilmente un monitor para esa ruta o expórtalo a un dashboard.

También puedes hacer clic en un servicio para abrir un panel lateral detallado y ver la pestaña **Pathways** (Rutas) para conocer la latencia entre el servicio y servicios de flujo ascendente.

### Alerta de ralentización en aplicaciones basadas en eventos

Las ralentizaciones causadas por un retraso elevado de los consumidores o por mensajes obsoletos pueden provocar fallos en cascada y aumentar la caída del sistema. Gracias a las alertas predefinidas, puedes determinar con precisión dónde se producen los cuellos de botella en tus pipelines y responder a ellos de inmediato. Para complementar métricas, Datadog proporciona integraciones adicionales para tecnologías de colas de mensajes como [Kafka][4] y [SQS][5].

A través de las plantillas de monitor predefinidas de Data Stream Monitoring puedes configurar monitores de métricas como el retraso del consumidor, el rendimiento y la latencia en un solo clic.

{{< img src="data_streams/add_monitors_and_synthetic_tests.png" alt="Plantillas de monitor de Datadog Data Streams Monitoring" style="width:100%;" caption="Haz clic en 'Add Monitors and Synthetic Tests' (Añadir monitores y tests Synthetic para ver los monitores recomendados" >}}

### Atribuye los mensajes entrantes a cualquier cola, servicio o clúster

Un retraso elevado en un servicio consumidor, un mayor uso de recursos en un intermediario de Kafka y un aumento del tamaño de la cola de RabbitMQ o Amazon SQS se explican con frecuencia por cambios en la forma en que los servicios adyacentes están produciendo o consumiendo estas entidades.

Haz clic en la pestaña **Rendimiento** de cualquier servicio o cola en Data Streams Monitoring para detectar rápidamente cambios en el rendimiento y ver de qué servicio ascendente o descendente proceden los cambios. Una vez configurado el [Catálogo de software][2], puedes cambiar inmediatamente al canal Slack del equipo correspondiente o al ingeniero de turno.

Al filtrar a un único clúster de Kafka, RabbitMQ o Amazon SQS, puedes detectar cambios en el tráfico entrante o saliente para todos los temas o colas detectados que se ejecuten en ese clúster:

### Cambiar rápidamente para identificar las causas raíz en la infraestructura, los logs o las trazas (traces)

Datadog vincula automáticamente la infraestructura que alimenta tus servicios y los logs relacionados a través del [Etiquetado de servicios unificado][3], para que puedas localizar fácilmente los cuellos de botella. Haz clic en las pestañas **Infra**, **Logs** o **Trazas** para solucionar el problema de por qué ha aumentado la latencia de la ruta o el retraso del consumidor.

### Monitorizar el rendimiento y el estado del conector
{{< img src="data_streams/connectors_topology.png" alt="A DSM topology (topología) map, showing a connector called 'analytics-sink'. The visualization indicates that the connector has a status of FAILED." style="width:100%;" >}}

Datadog puede detectar automáticamente tus conectores gestionados de [Confluent Cloud][8] y visualizarlos en el mapa de Data Streams Monitoring topology (topología) . Instala y configura la [integración de Confluent Cloud][9] para recopilar información de tus conectores de Confluent Cloud, incluido el rendimiento, el estado y las dependencias de temas.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/data_streams/go#manual-instrumentation
[2]: /es/tracing/software_catalog/
[3]: /es/getting_started/tagging/unified_service_tagging
[4]: /es/integrations/kafka/
[5]: /es/integrations/amazon_sqs/
[6]: /es/tracing/trace_collection/runtime_config/
[7]: https://app.datadoghq.com/data-streams/measure
[8]: https://www.confluent.io/confluent-cloud/
[9]: /es/integrations/confluent_cloud/
[10]: https://app.datadoghq.com/data-streams/map
[11]: /es/opentelemetry/compatibility