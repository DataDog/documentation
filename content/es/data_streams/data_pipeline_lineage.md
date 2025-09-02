---
further_reading:
- link: /data_jobs
  tag: Documentación
  text: Data Jobs Monitoring
- link: https://www.datadoghq.com/blog/data-observability-monitoring/
  tag: Blog
  text: Observar el ciclo de vida de los datos con Datadog
title: Data Pipeline Lineage
---

{{< callout url="https://www.datadoghq.com/product-preview/monitoring-for-data-and-data-pipelines/" >}}
  Data Pipeline Lineage está en Vista previa. Si te interesa esta característica, completa el formulario para solicitar acceso.
{{< /callout >}} 

Data Pipeline Lineage de Datadog te ayuda a monitorizar el flujo de datos de tus pipelines de extremo a extremo, incluida la ingesta, el procesamiento y el almacenamiento. Gracias a la visibilidad ampliada de tus pipelines, trabajos y almacenes de datos en una vista unificada, puedes detectar problemas con tus datos, identificar errores de flujo ascendente relacionados y solucionar los problemas más rápidamente.

Puedes visualizar el linaje de datos entre componentes (datos en streaming, trabajos de procesamiento de datos, almacenes de datos) con dependencias ascendentes y descendentes, monitorizar el rendimiento y detectar problemas como la demora del consumidor, cambios de esquema, junto con los datos descendentes afectados.

Para esta característica, se requiere la configuración tanto Data Streams Monitoring **como** [Data Jobs Monitoring][1].

## Tecnologías compatibles

| Tipo | Tecnología |
| - | ---------- |
| Streaming | <ul><li/>Servicios para productores y consumidores de Java <li/>Kafka <li/>RabbitMQ <li/>SQS <li/>SNS <li/>Kinesis</ul>|
| Procesamiento | <ul><li/>Trabajos de Apache Spark en ejecución en Kubernetes<li/> Trabajos de Apache Spark en ejecución en EMR en EKS</ul>|
| Almacenamiento | <ul><li/>S3 <li/>Snowflake</ul>|

¿No encuentras tu stack tecnológico aquí? [Envía una solicitud][2].

## Configuración

1. **Configura Data Streams Monitoring en tus servicios de productor y consumidor**. Sigue las instrucciones de la [documentación de configuración de Data Streams Monitoring][3]. Si utilizas Java, asegúrate de tener el [cliente de Datadog APM para Java v1.34.0+][4].

1. **Configura Data Jobs Monitoring en tus cargas de trabajo de Spark**. Consulta las instrucciones para [Spark en Kubernetes][5] o [Spark en EMR][6].

1. **Activa Data Streams Monitoring para tus trabajos de Spark**. Añade `-Ddd.data.streams.enabled=true` a la línea de comandos `spark-submit`.

   Por ejemplo:
   ```bash
   spark-submit \
   --conf spark.driver.extraJavaOptions="-Ddd.data.jobs.enabled=true -Ddd.data.streams.enabled=true" \
   --conf spark.executor.extraJavaOptions="-Ddd.data.jobs.enabled=true -Ddd.data.streams.enabled=true" \
   application.jar
   ```

1. **Para los servicios de Snowflake, instala los clientes de APM**. Instala el cliente de APM de [Java][7] o [Python][8] de Datadog para cualquier servicio que interactúe con Snowflake. Establece la variable de entorno `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED` en `true`.

## Ver los pipelines en Datadog
{{< img src="data_streams/data_pipeline_lineage.png" alt="La vista Map (Mapa) en Data Streams Monitoring. Se muestra el flujo de datos de izquierda a derecha en una visualización de pipeline." style="width:100%;" >}}

Después de configurar Data Pipeline Lineage, ve a la página [Data Streams Monitoring][9] en Datadog y selecciona **Map** (Mapa) para ver los pipelines visualizados.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/data_jobs
[2]: https://www.datadoghq.com/product-preview/monitoring-for-data-and-data-pipelines/
[3]: /es/data_streams
[4]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.34.0
[5]: /es/data_jobs/kubernetes/
[6]: /es/data_jobs/emr/
[7]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
[8]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/python/
[9]: https://app.datadoghq.com/data-streams/map