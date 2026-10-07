---
aliases:
- /es/data_streams/troubleshooting
- /es/data_streams/data_pipeline_lineage
- /es/data_streams/business_transaction_tracking
cascade:
  algolia:
    rank: 70
further_reading:
- link: /integrations/kafka/
  tag: Documentación
  text: Integración con Kafka
- link: /integrations/amazon_sqs/
  tag: Documentación
  text: Integración con Amazon SQS
- link: /internal_developer_portal/catalog/
  tag: Documentación
  text: Catalog
- link: https://learn.datadoghq.com/courses/monitor-a-kafka-pipeline-with-dsm
  tag: Centro de aprendizaje
  text: Hacer un seguimiento de una canalización de Kafka con Data Streams Monitoring
- link: https://www.datadoghq.com/blog/data-streams-monitoring/
  tag: Blog
  text: Rastree y mejore el rendimiento de las canalizaciones de datos en streaming
    con Datadog Data Streams Monitoring
- link: https://www.datadoghq.com/blog/data-streams-monitoring-apm-integration/
  tag: Blog
  text: Solucione problemas de canalizaciones de datos en streaming directamente desde
    APM con Datadog Data Streams Monitoring
- link: https://www.datadoghq.com/blog/data-streams-monitoring-sqs/
  tag: Blog
  text: Hacer un seguimiento de SQS con Data Streams Monitoring
- link: https://www.datadoghq.com/blog/confluent-connector-dsm-autodiscovery/
  tag: Blog
  text: Descubra automáticamente los conectores de Confluent Cloud y haga un seguimiento
    fácilmente del rendimiento en Data Streams Monitoring
- link: https://www.datadoghq.com/blog/data-observability/
  tag: Blog
  text: Garantice la confianza en todo el ciclo de vida de los datos con Datadog Data
    Observability
- link: https://www.datadoghq.com/blog/data-pipeline-monitoring/
  tag: Blog
  text: 'Seguimiento de canalización de datos 101: seguimiento del estado y el rendimiento
    en toda la pila de datos'
- link: https://www.datadoghq.com/blog/kafka-console/
  tag: Blog
  text: Solucione problemas de Kafka en cada capa de su stack con la Consola de Kafka.
- link: https://www.datadoghq.com/architecture/monitoring-financial-data-mesh-on-aws-using-datadog/
  tag: Centro de arquitectura
  text: Hacer un seguimiento de Data Mesh financiero en AWS usando Datadog
- link: https://www.datadoghq.com/architecture/observability-in-event-driven-architecture/
  tag: Centro de arquitectura
  text: Observabilidad en arquitecturas basadas en eventos
title: Data Streams Monitoring
---
{{< img src="data_streams/map_view2.png" alt="Página de Data Streams Monitoring en Datadog, que muestra el Map view. Resalta un servicio llamado 'authenticator'. Una visualización de mapa de topología del flujo de datos de izquierda a derecha, donde el servicio authenticator se muestra en el centro con sus servicios y colas ascendentes y descendentes." style="width:100%;" >}}

Data Streams Monitoring proporciona un método estandarizado para que los equipos comprendan y gestionen canalizaciones a escala al facilitar:
* Medir el estado de la canalización con latencias de extremo a extremo para los eventos que atraviesan su sistema.
* Identificar productores, consumidores o colas defectuosos, y luego cambiar a registros o clústeres relacionados para solucionar problemas más rápido.
* Prevenir retrasos en cascada al equipar a los propietarios de servicios para evitar que los eventos acumulados saturen los servicios descendentes.

### Lenguajes y tecnologías compatibles {#supported-languages-and-technologies}

Data Streams Monitoring instrumenta _clientes_ de Kafka (consumidores/productores). Si puede instrumentar su infraestructura de cliente, puede usar Data Streams Monitoring.

|   | Java | Python | .NET | Node.js | Go | Ruby |
| - | ---- | ------ | ---- | ------- | -- | ---- |
| Apache Kafka <br/>(autoalojado, Amazon MSK, Confluent Cloud o cualquier otra plataforma de alojamiento) | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| Amazon Kinesis | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | | |
| Amazon SNS | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | | |
| Amazon SQS | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | | |
| Azure Service Bus | | | {{< X >}} | | | |
| Google Pub/Sub | {{< X >}} | {{< X >}} | | {{< X >}} | | |
| IBM MQ | {{< X >}} | | {{< X >}} | | | |
| RabbitMQ | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | | |

Data Streams Monitoring requiere versiones mínimas del SDK de Datadog. Consulte cada página de configuración para obtener más detalles.

#### Compatibilidad con OpenTelemetry {#support-for-opentelemetry}
Data Streams Monitoring es compatible con OpenTelemetry. Si ha configurado Datadog APM para que funcione con OpenTelemetry, no se requiere ninguna configuración adicional para utilizar Data Streams Monitoring. Consulte [Compatibilidad con OpenTelemetry][11].

## Configuración {#setup}

### Por lenguaje {#by-language}

{{< card-grid card_width="200px" >}}
  {{< image-card href="/data_streams/java/" src="integrations_logos/java.png" alt="java" >}}
  {{< image-card href="/data_streams/python" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="/data_streams/dotnet/" src="integrations_logos/dotnet_text.png" alt=".NET" >}}
  {{< image-card href="/data_streams/nodejs/" src="integrations_logos/node.png" alt="Node" >}}
  {{< image-card href="/data_streams/go" src="integrations_logos/go-metro.png" alt="Go" >}}
  {{< image-card href="/data_streams/ruby" src="integrations_logos/ruby.png" alt="Ruby" >}}
{{< /card-grid >}}


### Por tecnología {#by-technology}

{{< card-grid card_width="200px" >}}
  {{< image-card href="/data_streams/setup/technologies/kafka/" src="integrations_logos/kafka.png" alt="Kafka" >}}
  {{< image-card href="/data_streams/setup/technologies/sqs/" src="integrations_logos/sqs.png" alt="Amazon SQS" >}}
  {{< image-card href="/data_streams/setup/technologies/rabbitmq/" src="integrations_logos/rabbitmq.png" alt="RabbitMQ" >}}
  {{< image-card href="/data_streams/setup/technologies/sns/" src="integrations_logos/amazon_sns.png" alt="Amazon SNS" >}}
  {{< image-card href="/data_streams/setup/technologies/kinesis/" src="integrations_logos/amazon_kinesis.png" alt="Kinesis" >}}
  {{< image-card href="/data_streams/setup/technologies/google_pubsub/" src="integrations_logos/google_cloud_pubsub.png" alt="Google Cloud Pub/Sub" >}}
  {{< image-card href="/data_streams/setup/technologies/ibm_mq/" src="integrations_logos/ibm_mq.png" alt="IBM MQ" >}}
  {{< image-card href="/data_streams/setup/technologies/azure_service_bus/" src="integrations_logos/azure_service_bus.png" alt="Azure Service Bus" >}}
  {{< image-card href="/data_streams/setup/technologies/bullmq/" src="integrations_logos/bullmq2.png" alt="BullMQ" >}}
{{< /card-grid >}}

## Explore Data Streams Monitoring {#explore-data-streams-monitoring}

### Visualice la arquitectura de sus canalizaciones de datos en streaming {#visualize-the-architecture-of-your-streaming-data-pipelines}

{{< img src="data_streams/topology_map.png" alt="Una visualización de mapa de topología de DSM. " style="width:100%;" >}}

Data Streams Monitoring proporciona un [mapa de topología][10] listo para usar, de modo que pueda visualizar el flujo de datos a través de sus canalizaciones e identificar servicios productores/consumidores, dependencias de colas, propiedad de servicios y métricas de salud clave.

### Mida la salud de la canalización de extremo a extremo con nuevas métricas {#measure-end-to-end-pipeline-health-with-new-metrics}

Con Data Streams Monitoring, puede medir el tiempo que normalmente tardan los eventos en atravesar dos puntos cualesquiera en su sistema asíncrono:

| Nombre de la métrica | Etiquetas notables | Descripción |
|---|---|-----|
| data_streams.latency | `start`, `end`, `env` | Latencia de extremo a extremo de una ruta desde un servicio de fuente especificado hasta el de destino. |
| data_streams.kafka.lag_seconds | `consumer_group`, `partition`, `topic`, `env` | Retraso en segundos entre el productor y el consumidor. Requiere Java Agent v1.9.0 o posterior. |
| data_streams.payload_size | `consumer_group`, `topic`, `env` | Rendimiento entrante y saliente en bytes.|


También puede graficar y visualizar estas métricas en cualquier dashboard o notebook:

{{< img src="data_streams/data_streams_metric_monitor.png" alt="Seguimiento de Datadog Data Streams Monitoring" style="width:100%;" >}}

### Haga un seguimiento de la latencia de extremo a extremo de cualquier ruta {#monitor-end-to-end-latency-of-any-pathway}

Dependiendo de cómo los eventos atraviesen su sistema, diferentes rutas pueden conducir a una mayor latencia. Con la pestaña [{{< ui >}}Measure{{< /ui >}}][7], puede seleccionar un servicio de inicio y un servicio de finalización para obtener información de latencia de extremo a extremo para identificar cuellos de botella y optimizar el rendimiento. Cree fácilmente un monitor para esa ruta o expórtelo a un dashboard.

Alternativamente, haga clic en un servicio para abrir un panel lateral detallado y ver la pestaña {{< ui >}}Pathways{{< /ui >}} para la latencia entre el servicio y los servicios ascendentes.

### Alerta sobre ralentizaciones en aplicaciones basadas en eventos {#alert-on-slowdowns-in-event-driven-applications}

Las ralentizaciones causadas por un alto retraso del consumidor o mensajes obsoletos pueden provocar fallas en cascada y aumentar el tiempo de inactividad. Con alertas listas para usar, puede identificar dónde ocurren los cuellos de botella en sus canalizaciones y responder a ellos de inmediato. Para obtener métricas complementarias, Datadog proporciona integraciones adicionales para tecnologías de colas de mensajes como [Kafka][4] y [SQS][5].

A través de las plantillas de monitor listas para usar de Data Stream Monitoring, puede configurar monitores en métricas como el retraso del consumidor, el rendimiento y la latencia con un solo clic.

{{< img src="data_streams/add_monitors_and_synthetic_tests.png" alt="Plantillas de monitores de Datadog Data Streams Monitoring" style="width:100%;" caption="Haga clic en 'Add Monitors and Synthetic Tests' para ver las plantillas de monitores" >}}

### Atribuya los mensajes entrantes a cualquier cola, servicio o clúster {#attribute-incoming-messages-to-any-queue-service-or-cluster}

El alto retraso en un servicio de consumo, el mayor uso de recursos en un Kafka broker y el mayor tamaño de la cola de RabbitMQ o Amazon SQS se explican frecuentemente por cambios en la forma en que los servicios adyacentes producen o consumen de estas entidades.

Haga clic en la pestaña {{< ui >}}Throughput{{< /ui >}} en cualquier servicio o cola en Data Streams Monitoring para detectar rápidamente cambios en el rendimiento y de qué servicio ascendente o descendente se originan estos cambios. Una vez que se configura el [Catalog][2], puede cambiar inmediatamente al canal de Slack o al ingeniero de guardia del equipo correspondiente.

Al filtrar a un solo clúster de Kafka, RabbitMQ o Amazon SQS, puede detectar cambios en el tráfico entrante o saliente para todos los temas o colas detectados que se ejecutan en ese clúster:

### Gire rápidamente para identificar las causas raíz en la infraestructura, los registros o las trazas {#quickly-pivot-to-identify-root-causes-in-infrastructure-logs-or-traces}

Datadog vincula automáticamente la infraestructura que impulsa sus servicios y los registros relacionados a través de [Unified Service Tagging][3], para que pueda localizar fácilmente los cuellos de botella. Haga clic en las pestañas {{< ui >}}Infra{{< /ui >}}, {{< ui >}}Logs{{< /ui >}} o {{< ui >}}Traces{{< /ui >}} para solucionar más a fondo por qué ha aumentado la latencia de la ruta o el retraso del consumidor.

### Haga un seguimiento del rendimiento y el estado del conector {#monitor-connector-throughput-and-status}
{{< img src="data_streams/connectors_topology.png" alt="Un mapa de topología de DSM, que muestra un conector llamado 'analytics-sink'. La visualización indica que el conector tiene un estado de FAILED." style="width:100%;" >}}

Datadog puede detectar automáticamente sus conectores de [Confluent Cloud][8] administrados y visualizarlos en el mapa de topología de Data Streams Monitoring. Instale y configure la [integración de Confluent Cloud][9] para recopilar información de sus conectores de Confluent Cloud, incluido el rendimiento, el estado y las dependencias de los temas.

## Solución de problemas {#troubleshooting}

### La métrica de latencia de extremo a extremo no parece precisa {#end-to-end-latency-metric-doesnt-look-accurate}

Los cálculos de latencia para una trayectoria requieren procesamiento monohilo de mensajes. Si los mensajes en su pipeline utilizan múltiples hilos, agregue instrumentación manual. La instrumentación manual está disponible para aplicaciones en [Go][12] y [Java][13]. Para otros lenguajes, consulte la [guía de instrumentación manual][14]. Para la instrumentación manual de .NET, comuníquese con [Support][15].

En la pestaña Pathways, el mensaje **los valores de latencia pueden ser aproximados para estas trayectorias** aparece para las trayectorias que necesitan instrumentación manual para obtener valores de latencia precisos.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/data_streams/go#manual-instrumentation
[2]: /es/internal_developer_portal/catalog/
[3]: /es/getting_started/tagging/unified_service_tagging
[4]: /es/integrations/kafka/
[5]: /es/integrations/amazon_sqs/
[6]: /es/tracing/trace_collection/runtime_config/
[7]: https://app.datadoghq.com/data-streams/measure
[8]: https://www.confluent.io/confluent-cloud/
[9]: /es/integrations/confluent_cloud/
[10]: https://app.datadoghq.com/data-streams/map
[11]: /es/opentelemetry/compatibility
[12]: /es/data_streams/go#manual-instrumentation
[13]: /es/data_streams/java#manual-instrumentation
[14]: /es/data_streams/manual_instrumentation/
[15]: /es/help/