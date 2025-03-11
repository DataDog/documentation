---
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
- link: /tracing/service_catalog/
  tag: Documentación
  text: Catálogo de servicios
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
title: Data Streams Monitoring
---


{{% site-region region="gov,ap1" %}}
<div class="alert alert-warning">
    Data Streams Monitoring no está disponible para el sitio de {{< region-param key="dd_site_name" >}}.
</div>
{{% /site-region %}}

Data Streams Monitoring proporciona un método estandarizado para que los equipos comprendan y gestionen los pipelines a escala y así facilita:
* Mide el estado de los pipelines con latencias de extremo a extremo para eventos que atraviesan tu sistema.
* Localiza los productores, consumidores o colas defectuosos y, a continuación, dirígete a logs o clústeres para solucionar los problemas con mayor rapidez.
* Evita los retrasos en cascada equipando a los propietarios de servicio para impedir que la acumulación de eventos desborde los servicios de flujo descendente.

## Ajustes

Para empezar, sigue las instrucciones de instalación para configurar servicios con Data Streams Monitoring:

{{< partial name="data_streams/setup-languages.html" >}}

<br/>

| Tiempo de ejecución | Tecnologías compatibles |
|---|----|
| Java/Scala | Kafka (autoalojado, Amazon MSK, Confluent Cloud/Plataform), RabbitMQ, HTTP, gRPC, Amazon SQS |
| Python | Kafka (autoalojado, Amazon MSK, Confluent Cloud/Plataform), RabbitMQ, Amazon SQS |
| .NET | Kafka (autoalojado, Amazon MSK, Confluent Cloud/Plataform), RabbitMQ, Amazon SQS |
| Node.js | Kafka (autoalojado, Amazon MSK, Confluent Cloud/Plataform), RabbitMQ, Amazon SQS |
| Go | Todos (con [Instrumentación manual][1]) |

## Explorar Data Streams Monitoring

### Medir el estado de los pipelines de extremo a extremo con las nuevas métricas

Una vez configurado Data Streams Monitoring, puedes medir el tiempo que suelen tardar los eventos en recorrer el trayecto entre dos puntos cualesquiera de tu sistema asíncrono:

| Nombre de la métrica | Etiquetas notables | Descripción |
|---|---|-----|
| data_streams.latency | `start`, `end`, `env` | Latencia de extremo a extremo de un trayecto desde un origen especificado hasta un servicio de destino. |
| data_streams.kafka.lag_seconds | `consumer_group`, `partition`, `topic`, `env` | Retraso en segundos entre el productor y el consumidor. Requiere Java Agent v1.9.0 o posterior. |
| data_streams.payload_size | `consumer_group`, `topic`, `env` | Rendimiento entrante y saliente en bytes.|


También puedes representar gráficamente y visualizar estas métricas en cualquier dashboard o notebook:

{{< img src="data_streams/data_streams_metric_monitor.png" alt="Monitor de Datadog Data Streams Monitoring" style="width:100%;" >}}

### Monitorizar la latencia de extremo a extremo de cualquier ruta

Según cómo los eventos atraviesen tu sistema, diferentes rutas pueden conducir a un aumento de la latencia. Con la [pestaña **Measure** (Medir)][7], puedes seleccionar un servicio de inicio y un servicio final para obtener información sobre la latencia de extremo a extremo para identificar cuellos de botella y optimizar el rendimiento. Crea fácilmente un monitor para esa ruta o expórtalo a un dashboard.

También puedes hacer clic en un servicio para abrir un panel lateral detallado y ver la pestaña **Pathways** (Rutas) para conocer la latencia entre el servicio y servicios de flujo ascendente.

### Alerta de ralentización en aplicaciones basadas en eventos

Las ralentizaciones causadas por un retraso elevado de los consumidores o por mensajes obsoletos pueden provocar fallos en cascada y aumentar la caída del sistema. Gracias a las alertas predefinidas, puedes determinar con precisión dónde se producen los cuellos de botella en tus pipelines y responder a ellos de inmediato. Para complementar métricas, Datadog proporciona integraciones adicionales para tecnologías de colas de mensajes como [Kafka][4] y [SQS][5].

A través de monitores recomendados predefinidos de Data Streams Monitoring, puedes configurar monitores en métricas como el retraso del consumidor, el rendimiento y la latencia en un solo clic. 

{{< img src="data_streams/add_monitors_and_synthetic_tests.png" alt="Monitores recomendados de Datadog Data Streams Monitoring" style="width:100%;" caption="Click 'Add Monitors and Synthetic Tests' to view Recommended Monitors" >}}

### Atribuye los mensajes entrantes a cualquier cola, servicio o clúster

Un retraso elevado en un servicio consumidor, un mayor uso de recursos en un intermediario de Kafka y un aumento del tamaño de la cola de RabbitMQ o Amazon SQS se explican con frecuencia por cambios en la forma en que los servicios adyacentes están produciendo o consumiendo estas entidades.

Haz clic en la pestaña **Throughput** (Rendimiento) en cualquier servicio o cola en Data Streams Monitoring para detectar rápidamente los cambios en el rendimiento y en qué servicio de flujo ascendente o descendente se originan estos cambios. Una vez configurado el [Catálogo de servicios][2], puedes pasar inmediatamente al canal de Slack del equipo correspondiente o al ingeniero de guardia.

Al filtrar a un único clúster de Kafka, RabbitMQ o Amazon SQS, puedes detectar cambios en el tráfico entrante o saliente para todos los temas o colas detectados que se ejecuten en ese clúster:

### Pasa rápidamente para identificar las causas raíz en infraestructura, logs o trazas

Datadog vincula automáticamente la infraestructura que alimenta tus servicios y los logs relacionados a través del [Etiquetado de servicios unificado][3], para que puedas localizar fácilmente los cuellos de botella. Haz clic en las pestañas **Infra**, **Logs** o **Traces** (Trazas) para solucionar el problema de por qué ha aumentado la latencia de la ruta o el retraso del consumidor.

## Para leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/data_streams/go#manual-instrumentation
[2]: /es/tracing/service_catalog/
[3]: /es/getting_started/tagging/unified_service_tagging
[4]: /es/integrations/kafka/
[5]: /es/integrations/amazon_sqs/
[6]: /es/tracing/trace_collection/runtime_config/
[7]: https://app.datadoghq.com/data-streams/measure