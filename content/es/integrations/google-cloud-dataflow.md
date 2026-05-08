---
aliases:
- /es/integrations/google_cloud_dataflow
app_id: google-cloud-dataflow
categories:
- nube
- google cloud
- recopilación de logs
custom_kind: integración
description: Un servicio gestionado para transformar y enriquecer datos tanto en tiempo
  real como históricos.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/
  tag: blog
  text: Monitorización de tus pipelines de Dataflow con Datadog
media: []
title: Google Cloud Dataflow
---
## Información general

Google Cloud Dataflow es un servicio totalmente gestionado para transformar y enriquecer datos en los modos flujo (stream) (en tiempo real) y batch (histórico) con la misma fiabilidad y expresividad.

Utiliza la integración de Google Cloud con Datadog para recopilar métricas de Google Cloud Dataflow.

## Configuración

### Recopilación de métricas

#### Instalación

Si aún no lo has hecho, configura primero la [integración de Google Cloud Platform](https://docs.datadoghq.com/integrations/google-cloud-platform/). No hay más pasos de instalación.

### Recopilación de logs

Los logs de Google Cloud Dataflow se recopilan con Google Cloud Logging y se envían a un trabajo de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla de Datadog Dataflow](https://docs.datadoghq.com/integrations/google-cloud-platform/?tab=datadogussite#log-collection).

Una vez hecho esto, exporta tus logs de Google Cloud Dataflow desde Google Cloud Logging a Pub/Sub:

1. Ve a la [página de Google Cloud Logging](https://console.cloud.google.com/logs/viewer) y filtra logs de Google Cloud Dataflow.
1. Haz clic en **Create sink** (Crear sumidero) y asigna al sumidero el nombre correspondiente.
1. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
1. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **gcp.dataflow.job.active_worker_instances** <br>(gauge) | El número activo de instancias del worker.|
| **gcp.dataflow.job.aggregated_worker_utilization** <br>(gauge) | Utilización agregada de los workers (por ejemplo, utilización de la CPU de los workers) en todo el conjunto de workers.<br>_Se muestra como porcentaje_ |
| **gcp.dataflow.job.backlog_bytes** <br>(gauge) | Cantidad de entrada conocida y sin procesar para una fase, en bytes.<br>_Se muestra como byte_ |
| **gcp.dataflow.job.backlog_elements** <br>(gauge) | Cantidad de entrada conocida y no procesada para una fase, en elementos.|
| **gcp.dataflow.job.bigquery.write_count** <br>(count) | Solicitudes de escritura de BigQuery desde BigQueryIO.Write en trabajos de Dataflow.|
| **gcp.dataflow.job.billable_shuffle_data_processed** <br>(gauge) | Los bytes facturables de datos aleatorios procesados por este trabajo de Dataflow.<br>_Se muestra como byte_ |
| **gcp.dataflow.job.bundle_user_processing_latencies.avg** <br>(gauge) | Las latencias medias de procesamiento del usuario del paquete de una determinada fase. Disponible para trabajos que se ejecutan en Streaming Engine.<br>_Se muestra en milisegundos_ |
| **gcp.dataflow.job.bundle_user_processing_latencies.samplecount** <br>(gauge) | El recuento de muestras para las latencias de procesamiento de usuarios de paquetes de una determinada fase. Disponible para trabajos ejecutados en Streaming Engine.<br>_Se muestra en milisegundos_ |
| **gcp.dataflow.job.bundle_user_processing_latencies.sumsqdev** <br>(gauge) | La suma de la desviación al cuadrado de las latencias de procesamiento del usuario del paquete de una fase particular. Disponible para trabajos ejecutados en Streaming Engine.<br>_Se muestra en milisegundos_ |
| **gcp.dataflow.job.current_num_vcpus** <br>(gauge) | El número de vCPUs utilizadas actualmente por este trabajo de Dataflow.<br>_Se muestra como cpu_ |
| **gcp.dataflow.job.current_shuffle_slots** <br>(gauge) | Las ranuras aleatorias actuales utilizadas por este trabajo de Dataflow.|
| **gcp.dataflow.job.data_watermark_age** <br>(gauge) | La edad (tiempo transcurrido desde la marca de tiempo del evento) del elemento de datos más reciente que ha sido procesado completamente por el pipeline.<br>_Se muestra como segundo_ |
| **gcp.dataflow.job.disk_space_capacity** <br>(gauge) | La cantidad de disco persistente que se está asignando actualmente a todos los workers asociados con este trabajo de Dataflow.<br>_Se muestra como byte_ |
| **gcp.dataflow.job.dofn_latency_average** <br>(gauge) | El tiempo medio de procesamiento de un único mensaje en un DoFn dado (en la ventana de los últimos 3 minutos). Ten en cuenta que esto incluye el tiempo empleado en las llamadas a GetData.<br>_Se muestra como milisegundo_ |
| **gcp.dataflow.job.dofn_latency_max** <br>(gauge) | El tiempo máximo de procesamiento de un solo mensaje en un DoFn dado (en la ventana de los últimos 3 min). Ten en cuenta que esto incluye el tiempo empleado en llamadas a GetData.<br>_Se muestra como milisegundo_ |
| **gcp.dataflow.job.dofn_latency_min** <br>(gauge) | El tiempo mínimo de procesamiento de un único mensaje en una DoFn determinada (en la ventana de los últimos 3 min).<br>_Se muestra en milisegundos_ |
| **gcp.dataflow.job.dofn_latency_num_messages** <br>(gauge) | Número de mensajes procesados por una DoFn determinada (en los últimos 3 minutos).|
| **gcp.dataflow.job.dofn_latency_total** <br>(gauge) | El tiempo total de procesamiento de todos los mensajes en una DoFn dada (en los últimos 3 minutos). Ten en cuenta que esto incluye el tiempo empleado en las llamadas GetData.<br>_Se muestra como milisegundo_ |
| **gcp.dataflow.job.duplicates_filtered_out_count** <br>(count) | Número de mensajes procesados por una determinada fase que se han filtrado como duplicados. Disponible para trabajos que se ejecutan en Streaming Engine.|
| **gcp.dataflow.job.elapsed_time** <br>(gauge) | Duración de la ejecución actual de este pipeline en el estado Running hasta el momento, en segundos. Cuando finaliza una ejecución, se mantiene en la duración de esa ejecución hasta que comienza la siguiente.<br>_Se muestra como segundo_ |
| **gcp.dataflow.job.element_count** <br>(count) | Número de elementos añadidos a la PCollection hasta el momento.<br>_Se muestra como elemento_ |
| **gcp.dataflow.job.elements_produced_count** <br>(count) | El número de elementos producidos por cada PTransform.|
| **gcp.dataflow.job.estimated_backlog_processing_time** <br>(gauge) | Tiempo estimado (en segundos) para consumir el backlog actual si no entran nuevos datos y el rendimiento sigue siendo el mismo. Solo disponible para trabajos de Streaming Engine.<br>_Se muestra en segundos_ |
| **gcp.dataflow.job.estimated_byte_count** <br>(count) | Número estimado de bytes añadidos a la PColección hasta el momento.<br>_Se muestra como byte_ |
| **gcp.dataflow.job.estimated_bytes_active** <br>(gauge) | Número estimado de bytes activos en esta fase del trabajo.<br>_Se muestra como byte_ |
| **gcp.dataflow.job.estimated_bytes_consumed_count** <br>(count) | Número estimado de bytes consumidos por la fase de este trabajo.<br>_Se muestra como byte_ |
| **gcp.dataflow.job.estimated_bytes_produced_count** <br>(count) | El tamaño total estimado en bytes de los elementos producidos por cada PTransform.|
| **gcp.dataflow.job.estimated_timer_backlog_processing_time** <br>(gauge) | Tiempo estimado (en segundos) para que se completen los temporizadores. Solo disponible para trabajos de Streaming Engine.<br>_Se muestra en segundos_ |
| **gcp.dataflow.job.gpu_memory_utilization** <br>(gauge) | Porcentaje de tiempo durante el último periodo de muestreo en el que la memoria global (dispositivo) se estaba leyendo o escribiendo.<br>_Se muestra como porcentaje_ |
| **gcp.dataflow.job.gpu_utilization** <br>(gauge) | Porcentaje de tiempo durante el último periodo de muestreo en el que uno o más kernels se ejecutaron en la GPU.<br>_Se muestra como porcentaje_ |
| **gcp.dataflow.job.horizontal_worker_scaling** <br>(gauge) | Un valor booleano que indica qué tipo de dirección de escalado horizontal recomendó el autoescalador y la lógica que lo sustenta. Una salida de métrica true (verdaderao) significa que se ha tomado una decisión de escalado y una salida de métrica false (falso) significa que el escalado correspondiente no está surtiendo efecto.|
| **gcp.dataflow.job.is_failed** <br>(gauge) | Ha fallado este trabajo.|
| **gcp.dataflow.job.max_worker_instances_limit** <br>(gauge) | El número máximo de workers que el autoescalado puede solicitar.|
| **gcp.dataflow.job.memory_capacity** <br>(gauge) | La cantidad de memoria que se está asignando actualmente a todos los workers asociados con este trabajo de Dataflow.<br>_Se muestra como byte_ |
| **gcp.dataflow.job.min_worker_instances_limit** <br>(gauge) | El número mínimo de workers que el autoescalado puede solicitar.|
| **gcp.dataflow.job.oldest_active_message_age** <br>(gauge) | Cuánto tiempo lleva procesándose el mensaje activo más antiguo de una DoFn.<br>_Se muestra en milisegundos_ |
| **gcp.dataflow.job.per_stage_data_watermark_age** <br>(gauge) | La edad (tiempo transcurrido desde la marca de hora del evento) hasta la que todos los datos han sido procesados por esta fase del pipeline.<br>_Se muestra como segundo_ |
| **gcp.dataflow.job.per_stage_system_lag** <br>(gauge) | La duración máxima actual que un elemento de datos ha estado procesando o en espera de procesamiento en segundos, por fase de pipeline.<br>_Se muestra como segundo_ |
| **gcp.dataflow.job.processing_parallelism_keys** <br>(gauge) | Número aproximado de claves en uso para el procesamiento de datos para cada fase. El procesamiento para cualquier clave dada se serializa, por lo que el número total de claves para una fase representa el paralelismo máximo disponible en esa fase. Disponible para trabajos ejecutados en Streaming Engine.|
| **gcp.dataflow.job.pubsub.late_messages_count** <br>(count) | El número de mensajes Pub/Sub con marca de tiempo más antigua que la marca de agua estimada.|
| **gcp.dataflow.job.pubsub.published_messages_count** <br>(count) | El número de mensajes Pub/Sub publicados desglosados por tema y estado.|
| **gcp.dataflow.job.pubsub.pulled_message_ages.avg** <br>(gauge) | La media de la distribución de las edades de los mensajes Pub/Sub extraídos pero no empaquetados.<br>_Se muestra como milisegundo_ |
| **gcp.dataflow.job.pubsub.pulled_message_ages.samplecount** <br>(gauge) | El recuento de muestras para la distribución de las edades de los mensajes Pub/Sub extraídos pero no empaquetados.<br>_Se muestra en milisegundos_ |
| **gcp.dataflow.job.pubsub.pulled_message_ages.sumsqdev** <br>(gauge) | La suma de la desviación al cuadrado de la distribución de las edades de los mensajes Pub/Sub extraídos pero no empaquetados.<br>_Se muestra en milisegundos_ |
| **gcp.dataflow.job.pubsub.read_count** <br>(count) | Solicitudes pull de Pub/Sub. Para Streaming Engine, esta métrica está obsoleta. Consulta la página <a href=https://cloud.google.com/dataflow/docs/guides/monitoring-overview>Uso de la interfaz de monitorización de Dataflow</a> para conocer los próximos cambios.|
| **gcp.dataflow.job.pubsub.read_latencies.avg** <br>(count) | Las latencias medias de las solicitudes pull de Pub/Sub de PubsubIO.Read en trabajos de Dataflow. Para Streaming Engine, esta métrica está obsoleta. Consulta la página <a href=https://cloud.google.com/dataflow/docs/guides/monitoring-overview>Uso de la interfaz de monitorización de Dataflow</a> para conocer los próximos cambios.<br>_Se muestra como milisegundo_ |
| **gcp.dataflow.job.pubsub.read_latencies.samplecount** <br>(count) | El recuento de muestras de latencias de solicitudes pull de Pub/Sub de PubsubIO.Read en trabajos de Dataflow. Para Streaming Engine, esta métrica está obsoleta. Consulta la página <a href=https://cloud.google.com/dataflow/docs/guides/monitoring-overview>Uso de la interfaz de monitorización de Dataflow</a> para conocer los próximos cambios.<br>_Se muestra como milisegundo_ |
| **gcp.dataflow.job.pubsub.read_latencies.sumsqdev** <br>(count) | La suma de la desviación al cuadrado de las latencias de las solicitudes pull de Pub/Sub de PubsubIO.Read en trabajos de Dataflow. Para Streaming Engine, esta métrica está obsoleta. Consulta la página <a href=https://cloud.google.com/dataflow/docs/guides/monitoring-overview>Uso de la interfaz de monitorización de Dataflow</a> para conocer los próximos cambios.<br>_Se muestra como milisegundo_ |
| **gcp.dataflow.job.pubsub.streaming_pull_connection_status** <br>(gauge) | Porcentaje de todas las conexiones Streaming Pull que están activas (estado OK) o terminadas debido a un error (estado distinto a OK).  Cuando se termina una conexión, Dataflow esperará algún tiempo antes de intentar volver a conectarse.  Solo para Streaming Engine.<br>_Se muestra como porcentaje_ |
| **gcp.dataflow.job.pubsub.write_count** <br>(count) | Solicitudes de publicación Pub/Sub de PubsubIO.Write en trabajos de Dataflow.|
| **gcp.dataflow.job.pubsub.write_latencies.avg** <br>(count) | Las latencias medias de las solicitudes de publicación Pub/Sub de PubsubIO.Write en trabajos de Dataflow.<br>_Se muestra como milisegundo_ |
| **gcp.dataflow.job.pubsub.write_latencies.samplecount** <br>(count) | El recuento de muestras para latencias de solicitud de publicación Pub/Sub de PubsubIO.Write en trabajos de Dataflow.<br>_Se muestra como milisegundo_ |
| **gcp.dataflow.job.pubsub.write_latencies.sumsqdev** <br>(count) | La suma de la desviación al cuadrado para latencias de solicitud de publicación Pub/Sub de PubsubIO.Write en trabajos de Dataflow.<br>_Se muestra como milisegundo_ |
| **gcp.dataflow.job.status** <br>(gauge) | Estado actual de este pipeline (por ejemplo, RUNNING, DONE, CANCELLED o FAILED). No se informa mientras pipeline no está en ejecución.|
| **gcp.dataflow.job.streaming_engine.key_processing_availability** <br>(gauge) | Porcentaje de claves de procesamiento de flujo que están asignadas a workers y disponibles para realizar trabajo. El trabajo para las claves no disponibles se aplazará hasta que las claves estén disponibles.|
| **gcp.dataflow.job.streaming_engine.persistent_state.read_bytes_count** <br>(count) | Bytes de almacenamiento leídos por una determinada fase. Disponible para trabajos que se ejecutan en Streaming Engine.|
| **gcp.dataflow.job.streaming_engine.persistent_state.stored_bytes** <br>(gauge) | Bytes actuales almacenados en estado persistente para el trabajo.<br>_Se muestra como byte_ |
| **gcp.dataflow.job.streaming_engine.persistent_state.write_bytes_count** <br>(count) | Bytes de almacenamiento escritos por una determinada fase. Disponible para trabajos ejecutados en Streaming Engine.|
| **gcp.dataflow.job.streaming_engine.persistent_state.write_latencies.avg** <br>(count) | Las latencias medias de escritura de almacenamiento de una determinada fase. Disponible para trabajos ejecutados en Streaming Engine.<br>_Se muestra en milisegundos_ |
| **gcp.dataflow.job.streaming_engine.persistent_state.write_latencies.samplecount** <br>(count) | El recuento de muestras de las latencias de escritura de almacenamiento de una determinada fase. Disponible para trabajos ejecutados en Streaming Engine.<br>_Se muestra en milisegundos_ |
| **gcp.dataflow.job.streaming_engine.persistent_state.write_latencies.sumsqdev** <br>(count) | La suma de la desviación al cuadrado de las latencias de escritura de almacenamiento de una determinada fase. Disponible para trabajos ejecutados en Streaming Engine.<br>_Se muestra en milisegundos_ |
| **gcp.dataflow.job.streaming_engine.stage_end_to_end_latencies.avg** <br>(gauge) | La distribución media del tiempo empleado por el motor de flujo en cada fase del pipeline. Este tiempo incluye aleatorizar los mensajes, ponerlos en cola para su procesamiento, procesarlos, ponerlos en cola para la escritura del estado persistente y la escritura propiamente dicha.<br>_Se muestra en milisegundos_ |
| **gcp.dataflow.job.streaming_engine.stage_end_to_end_latencies.samplecount** <br>(gauge) | El recuento de muestras para la distribución del tiempo empleado por el motor de flujo en cada fase del pipeline. Este tiempo incluye aleatorizar mensajes, ponerlos en cola para su procesamiento, procesarlos, ponerlos en cola para la escritura de estado persistente y la escritura en sí.<br>_Se muestra como milisegundo_ |
| **gcp.dataflow.job.streaming_engine.stage_end_to_end_latencies.sumsqdev** <br>(gauge) | La suma de la desviación al cuadrado para la distribución del tiempo empleado por el motor de flujo en cada fase del pipeline. Este tiempo incluye aleatorizar mensajes, ponerlos en cola para procesarlos, procesarlos, ponerlos en cola para la escritura de estado persistente y la escritura en sí.<br>_Se muestra como milisegundo_ |
| **gcp.dataflow.job.system_lag** <br>(gauge) | La duración máxima actual que un elemento de datos ha estado a la espera de ser procesado, en segundos.<br>_Se muestra como segundo_ |
| **gcp.dataflow.job.target_worker_instances** <br>(gauge) | El número deseado de instancias del worker.|
| **gcp.dataflow.job.thread_time** <br>(count) | Tiempo estimado en milisegundos de ejecución en la función de la ptransform total a través de subprocesos en todos los workers del trabajo.<br>_Se muestra como milisegundo_ |
| **gcp.dataflow.job.timers_pending_count** <br>(count) | El número de temporizadores pendientes en una determinada fase. Disponible para trabajos que se ejecutan en Streaming Engine.|
| **gcp.dataflow.job.timers_processed_count** <br>(count) | El número de temporizadores completados por una determinada fase. Disponible para trabajos que se ejecutan en Streaming Engine.|
| **gcp.dataflow.job.total_dcu_usage** <br>(count) | Cantidad acumulada de DCUs (Data Compute Unit) utilizadas por el trabajo de Dataflow desde su lanzamiento.|
| **gcp.dataflow.job.total_memory_usage_time** <br>(gauge) | El total de segundos de memoria en GB asignados a este trabajo de Dataflow.<br>_Se muestra como gibibyte_ |
| **gcp.dataflow.job.total_pd_usage_time** <br>(gauge) | El total de segundos en GB para todo el disco persistente utilizado por todos los workers asociados con este trabajo de Dataflow.<br>_Se muestra como gibibyte_ |
| **gcp.dataflow.job.total_secu_usage** <br>(gauge) | La cantidad total de SECUs (Streaming Engine Compute Unit) utilizadas por el trabajo de Dataflow desde su lanzamiento.|
| **gcp.dataflow.job.total_shuffle_data_processed** <br>(gauge) | El total de bytes de datos aleatorios procesados por este trabajo de Dataflow.<br>_Se muestra como byte_ |
| **gcp.dataflow.job.total_streaming_data_processed** <br>(gauge) | El total de bytes de datos de flujo procesados por este trabajo de Dataflow.<br>_Se muestra como byte_ |
| **gcp.dataflow.job.total_vcpu_time** <br>(gauge) | El total de segundos vCPU utilizados por este trabajo de Dataflow.|
| **gcp.dataflow.job.user_counter** <br>(gauge) | Una métrica de contador definida por el usuario.|
| **gcp.dataflow.job.worker_utilization_hint** <br>(gauge) | Sugerencia de utilización del worker para el autoescalado. Este valor de sugerencia lo configuran los clientes y define un rango objetivo de utilización de la CPU del worker, influyendo así en la agresividad del escalado.<br>_Se muestra como porcentaje_ |
| **gcp.dataflow.job.worker_utilization_hint_is_actively_used** <br>(gauge) | Indica si la política de autoescalado horizontal utiliza activamente la sugerencia de utilización de workers.|
| **gcp.dataflow.quota.region_endpoint_shuffle_slot.exceeded** <br>(count) | Número de intentos de superar el límite de la métrica de cuota `dataflow.googleapis.com/region_endpoint_shuffle_slot`.|
| **gcp.dataflow.quota.region_endpoint_shuffle_slot.limit** <br>(gauge) | Límite actual de la métrica de cuota `dataflow.googleapis.com/region_endpoint_shuffle_slot`.|
| **gcp.dataflow.quota.region_endpoint_shuffle_slot.usage** <br>(gauge) | Uso actual de la métrica de cuota `dataflow.googleapis.com/region_endpoint_shuffle_slot`.|
| **gcp.dataflow.worker.memory.bytes_used** <br>(gauge) | El uso de memoria en bytes por una instancia de contenedor particular en un worker de Dataflow.<br>_Se muestra como byte_ |
| **gcp.dataflow.worker.memory.container_limit** <br>(gauge) | Tamaño máximo de RAM en bytes disponible para una instancia de contenedor concreta en un worker de Dataflow.<br>_Se muestra como byte_ |
| **gcp.dataflow.worker.memory.total_limit** <br>(gauge) | Tamaño de RAM en bytes disponible para un worker de Dataflow.<br>_Se muestra como byte_ |

<div class="alert alert-warning">
Al utilizar Google Cloud Dataflow para monitorizar métricas de pipelines Apache Beam, ten en cuenta que las métricas generadas a partir de <a href="https://beam.apache.org/releases/javadoc/current/org/apache/beam/sdk/metrics/Metrics.html">métodos Gauge estáticos</a> no se recopilan. Si necesitas monitorizar estas métricas, puedes utilizar <a href="https://micrometer.io/docs">Micrometer</a>.
</div>

### Eventos

La integración Google Cloud Dataflow no incluye eventos.

### Checks de servicio

La integración Google Cloud Dataflow no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}