---
aliases:
- /es/data_streams/live_messages
- /es/data_streams/messages
- /es/data_streams/kafka/messages
description: Haga un seguimiento del estado del clúster de Kafka, conecte servicios
  a temas e inspeccione esquemas y mensajes con la Consola de Kafka.
further_reading:
- link: https://www.datadoghq.com/blog/kafka-console/
  tag: Blog
  text: Solucione problemas de Kafka en cada capa de su stack con la Consola de Kafka.
title: Consola de Kafka
---
Con la Kafka Console de Data Streams Monitoring, una verificación del Datadog Agent se conecta a su clúster de Kafka y comienza a recopilar métricas de salud y rendimiento. La Consola de Kafka le permite:

- **Haga un seguimiento de la salud de Kafka**: Vea el estado del clúster, broker, tema y partición con métricas de rendimiento, retraso y replicación.
- **Identifique la causa raíz**: Correlacione los cambios de configuración y esquema con el retraso, el rendimiento y los errores, y rastree los problemas hasta el tema, la versión del esquema o el cambio de configuración exactos.
- **Conecte servicios a temas**: Vea qué productores y consumidores interactúan con cada tema, con propietarios vinculados, repositorios, rotaciones de guardia, trazas y registros de errores.
- **Inspeccione esquemas y mensajes de temas**: Vea esquemas, compare versiones y acceda a mensajes para depurar cargas útiles dañinas o explorar el tema.
- **Alerte y automatice respuestas**: Utilice [plantillas de monitor recomendadas][4] y active Workflow Automation o webhooks cuando se dispare una condición de Kafka.

Para comenzar, consulte [Configuración de la Consola de Kafka][2].

## Flujos de trabajo {#workflows}

### Haga un seguimiento del estado y el rendimiento del clúster {#monitor-cluster-health-and-performance}

Las pestañas {{< ui >}}Clusters{{< /ui >}}, {{< ui >}}Topics{{< /ui >}} y {{< ui >}}Brokers{{< /ui >}} muestran el estado de salud en toda su infraestructura de Kafka. Para cada tema, puede ver el recuento de particiones, las particiones sub-replicadas y fuera de línea, el rendimiento de mensajes y el retraso del consumidor.

{{< img src="data_streams/kafka_clusters_overview-2.png" alt="La vista de clústeres de la Consola de Kafka que muestra la lista de clústeres con recuentos de brokers, nombres de temas, estado de replicación y tasa de mensajes entrantes." >}}

Haga clic en cualquier tema para ver un resumen detallado, que incluye la tasa de mensajes entrantes, el retraso máximo en todas las particiones y si el retraso actual se acerca al límite de retención.

{{< img src="data_streams/kafka_topic_summary-2.png" alt="Página de resumen de detalles del tema que muestra una tasa de mensajes entrantes de 0.8 msg/seg, un retraso actual de 1.15 segundos y el estado de retraso frente a retención." >}}

Desde cualquier métrica, puede crear Datadog monitors, SLOs y dashboards.

### Correlacione los cambios de configuración y esquema con las métricas de salud {#correlate-configuration-and-schema-changes-with-health-metrics}

Los eventos de cambio se superponen directamente en los gráficos de rendimiento y retraso, para que pueda ver si un cambio de configuración o esquema coincidió con una degradación.

{{< img src="data_streams/kafka_topics_lag_change-2.png" alt="Vista de temas con una anotación de cambio de topic_config a las 17:02:42 superpuesta en el gráfico de retraso por tema, que muestra un pico correlacionado con el evento de cambio." >}}

Para identificar exactamente qué cambió, haga clic en los cambios detectados en la superposición y seleccione {{< ui >}}View config change{{< /ui >}}. 

{{< img src="data_streams/lag-by-topic-overlay.png" alt="Vista de diferencia de configuración de tema que compara las versiones 625 y 626, con max.message.bytes cambiado de 1000012 a 1024 resaltado." >}}

### Conecte los servicios de productor y consumidor a los temas {#connect-producer-and-consumer-services-to-topics}

Las secciones {{< ui >}}Producers{{< /ui >}} y {{< ui >}}Consumers{{< /ui >}} de cada tema muestran qué servicios están leyendo y escribiendo en ese tema. Al pasar el cursor sobre un servicio, se muestra la información de propiedad del Service Catalog: equipo, repositorio de código, ingeniero de guardia y canal de Slack.

{{< img src="data_streams/kafka_topic_service_ownership.png" alt="Vista de productores y consumidores de temas con un panel de servicio abierto que muestra el equipo propietario (Frameworks), el repositorio de código, el ingeniero de guardia, el canal de Slack y el estado de salud." >}}

Utilice esta información para contactar al equipo correcto cuando un consumidor esté retrasado o un productor no funcione correctamente.

### Inspeccione los esquemas y mensajes de los temas {#inspect-topic-schemas-and-messages}

La sección {{< ui >}}Schema{{< /ui >}} muestra el esquema actual para la clave o el valor de un tema, con el historial de versiones. Utilice el selector de versiones para comparar esquemas entre versiones.

La sección {{< ui >}}Messages{{< /ui >}} le permite recuperar mensajes por partición y desplazamiento para inspeccionar las cargas útiles directamente. Esto es útil para depurar cargas útiles dañinas o verificar la estructura de los mensajes después de un cambio de esquema. Consulte [Habilitar inspección de mensajes][3] para conocer los requisitos previos y permisos adicionales necesarios para recuperar mensajes.

{{< img src="data_streams/kafka_schema_messages.png" alt="Vista de esquema y mensajes de tema que muestra una definición de esquema de Protobuf y una tabla de mensajes recientes con fecha, partición, desplazamiento y valor del mensaje." >}}

[2]: /es/data_streams/kafka/setup/
[3]: /es/data_streams/kafka/setup/#enable-message-inspection
[4]: /es/data_streams/kafka/monitors_and_automation/

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}