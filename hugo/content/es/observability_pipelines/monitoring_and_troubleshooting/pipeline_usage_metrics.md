---
aliases:
- /es/observability_pipelines/monitoring/metrics/
description: Encuentre las métricas disponibles en Observability Pipelines para crear
  dashboards, notebooks y seguimientos.
disable_toc: false
further_reading:
- link: /metrics/summary/
  tag: Documentación
  text: Obtenga más información sobre el Metrics Summary
- link: /metrics/explorer/
  tag: Documentación
  text: Uso del Metrics Explorer para explorar y analizar sus métricas
- link: /getting_started/dashboards/
  tag: Documentación
  text: Primeros pasos con dashboards
- link: /getting_started/monitors/
  tag: Documentación
  text: Primeros pasos con seguimientos
- link: https://www.datadoghq.com/blog/otel-ai-observability-pipelines-clickhouse/
  tag: Blog
  text: Envíe datos de OTel desde aplicaciones de IA a ClickHouse y Datadog usando
    Observability Pipelines
title: Métricas de uso de Pipelines
---
## Descripción general {#overview}

Este documento enumera algunas de las métricas disponibles en Observability Pipelines. Usted puede:

- Cree sus propios [dashboards][1], [notebooks][2] y [seguimientos][3] con estas métricas.
- Utilice [Metrics Summary][5] para ver los metadatos y las etiquetas disponibles para las métricas. También puede ver cuáles dashboards, notebooks, seguimientos y SLOs están utilizando esas métricas.

Consulte [Primeros pasos con las etiquetas][4] para obtener más información sobre cómo usar etiquetas para agrupar métricas por Pipelines, Workers y componentes específicos.

Todas las métricas están etiquetadas con lo siguiente:

`pipeline_id`
: El UUID de la canalización.

`worker_uuid`
: El UUID del Worker que emite la métrica.

`op_worker_version`
: La versión del Worker que emite la métrica.

`rc_version`
: El número de versión de la configuración, que se incrementa cada vez que se actualiza la canalización.

`pipeline_name`
: El nombre de la canalización cuando se implementó o actualizó por última vez. Disponible en la versión 2.18 de Worker y posteriores.

**Notas**:
- Cada Worker también ejecuta una canalización interna que recopila la propia telemetría del Worker (métricas y registros) y la envía a Datadog. Los componentes de esta canalización interna tienen una etiqueta `component_id` cuyo valor comienza con un guion bajo (`_`). Para excluir estas métricas de sus consultas, utilice `!component_id:_*`.
- Las métricas que terminan en `_total` informan un recuento para cada intervalo de tiempo, por lo que su valor sin procesar no aumenta de forma monótona.

## Métrica de uso estimado {#estimated-usage-metric}

Bytes ingeridos por Observability Pipelines
: **Métrica**: `datadog.estimated_usage.observability_pipelines.ingested_bytes`
: **Descripción**: El volumen de datos ingeridos por Observability Pipelines. Consulte [Métricas de uso estimado][6] para obtener más información.

## Métricas de servidor {#host-metrics}

Estas métricas proporcionan información sobre el host que ejecuta el Observability Pipelines Worker.

Memoria disponible
: **Métrica**: `pipelines.host.memory_available_bytes`
: **Descripción:** La cantidad de bytes de memoria disponibles para nuevas asignaciones en el servidor.

Bytes de entrada
: **Métrica**: `pipelines.host.network_receive_bytes_total`
: **Descripción:** El número de bytes recibidos por el servidor en todas las interfaces. Utilice la etiqueta `device` para filtrar por interfaz, por ejemplo `device:eth0`.

Bytes de salida
: **Métrica**: `pipelines.host.network_transmit_bytes_total`
: **Descripción:** El número de bytes enviados por el servidor en todas las interfaces. Utilice la etiqueta `device` para filtrar por interfaz.

Tiempo de CPU
: **Métrica**: `pipelines.host.cpu_seconds_total`
: **Descripción:** El tiempo total de CPU consumido por el servidor, desglosado por modo (usuario, sistema, inactivo, etcétera) y núcleo de CPU.

Bytes de lectura/escritura en disco
: **Métrica**: `pipelines.host.disk_read_bytes_total`, `pipelines.host.disk_written_bytes_total`
: **Descripción:** El número de bytes leídos y escritos en todos los discos del servidor.

Tiempo de actividad del servidor
: **Métrica**: `pipelines.host.uptime`
: **Descripción:** La cantidad de tiempo transcurrido desde que se inició el servidor, en segundos.

Promedio de carga
: **Métrica**: `pipelines.host.load1`, `pipelines.host.load5`, `pipelines.host.load15`
: **Descripción:** El promedio de carga del sistema del servidor durante los últimos 1, 5 y 15 minutos. El promedio de carga es el número de procesos que se están ejecutando o esperando para ejecutarse, y en Linux también incluye procesos bloqueados en E/S ininterrumpible. Compare el valor del promedio de carga con el valor `pipelines.host.logical_cpus`: ; un valor de promedio de carga cercano al número de CPU indica una utilización completa, y un valor superior indica que el servidor está sobresuscrito. No se emite en Workers que se ejecutan en Windows.

CPUs lógicas
: **Métrica**: `pipelines.host.logical_cpus`
: **Descripción:** El número de hilos de CPU lógicos (hilos de hardware) disponibles en el servidor.

Memoria total
: **Métrica**: `pipelines.host.memory_total_bytes`
: **Descripción:** La memoria física total (RAM) instalada en el servidor.

## Métricas de proceso {#process-metrics}

Estas métricas proporcionan información sobre el proceso del Observability Pipelines Worker.

Núcleos de CPU asignados
: **Métrica**: `pipelines.cpu_max_cores`
: **Descripción:** El número de núcleos de CPU asignados al Worker, según lo informado por los límites del contenedor o cgroup.

Uso de CPU
: **Métrica**: `pipelines.cpu_usage_seconds_total`
: **Descripción:** La cantidad de tiempo de CPU consumida por el proceso del Worker en segundos (en el espacio de usuario y de sistema). La tasa por segundo de esa métrica muestra la proporción de la CPU utilizada por el Worker.

Bytes disponibles en el directorio de datos
: **métrica**: `pipelines.data_dir_available_bytes`
: **Descripción:** El espacio de almacenamiento libre restante en el sistema de archivos donde el Worker almacena sus datos de búfer y estado. Útil para monitorear los búferes de disco.

Capacidad del directorio de datos en bytes
: **métrica**: `pipelines.data_dir_capacity_bytes`
: **Descripción:** La capacidad de almacenamiento total del sistema de archivos donde el Worker almacena sus datos de búfer y estado.

Límite de memoria
: **métrica**: `pipelines.memory_max_bytes`
: **Descripción:** La memoria máxima que el Worker tiene permitido usar, según lo establecido por los límites del contenedor o cgroup.

Uso de memoria
: **métrica**: `pipelines.resident_memory_used_bytes`
: **Descripción:** La cantidad de memoria RSS utilizada por el proceso del Worker en bytes.

Tiempo de actividad del Worker
: **métrica**: `pipelines.uptime_seconds`
: **Descripción:** La cantidad de tiempo transcurrido desde que se inició el proceso del Worker, en segundos.

## Métricas del ciclo de vida del Worker {#worker-lifecycle-metrics}

Estas métricas rastrean los eventos del ciclo de vida de Observability Pipelines Worker.

Recargas del Worker
: **métrica**: `pipelines.reloaded_total`
: **Descripción:** La cantidad de veces que se ha recargado la instancia del Worker, por ejemplo, después de un cambio de configuración.

## Métricas de componentes {#component-metrics}

Estas métricas están disponibles para fuentes, procesadores y destinos.

- Utilice la etiqueta `component_id` para filtrar o agrupar por componentes individuales.
- Utilice la etiqueta `component_type` para filtrar o agrupar por el tipo de fuente, procesador o destino, como `quota` para el procesador Quota.
- Utilice la etiqueta `component_kind` para filtrar o agrupar por `source`, `transform` (procesador) o `sink` (destino).

{{< tabs >}}
{{% tab "Fuentes" %}}

### Rendimiento {#throughput}

Bytes de entrada
: **Métrica**: `pipelines.component_received_bytes_total`
: **Descripción**: La cantidad de bytes sin procesar leídos de la entrada de la fuente, antes de cualquier decodificación o transformación.

Eventos de entrada
: **Métrica**: `pipelines.component_received_events_total`
: **Descripción**: La cantidad de eventos recibidos por el componente.

Eventos de salida
: **Métrica**: `pipelines.component_sent_events_total`
: **Descripción**: La cantidad de eventos que el componente envía hacia adelante.

Bytes de eventos de entrada
: **Métrica**: `pipelines.component_received_event_bytes_total`
: **Descripción**: El tamaño en bytes de los eventos recibidos por el componente.

Bytes de eventos de salida
: **Métrica**: `pipelines.component_sent_event_bytes_total`
: **Descripción**: El tamaño en bytes de los eventos que el componente envía hacia adelante.

### Errores, datos descartados y tiempos de espera agotados {#errors-data-dropped-and-timed-outs}

Errores
: **Métrica**: `pipelines.component_errors_total`
: **Descripción**: El número de errores encontrados por el componente. Dependiendo del componente, esta métrica puede incluir una etiqueta `error_code`, `error_type` o `reason` que describe el error.

Datos descartados intencionalmente o involuntariamente
: **Métrica**: `pipelines.component_discarded_events_total`
: **Descripción**: El número de eventos descartados. **Nota**: Para desglosar esta métrica, use la etiqueta `intentional:true` para filtrar los eventos que se descartan intencionalmente o la etiqueta `intentional:false` para los eventos que no se descartan intencionalmente.

Eventos con tiempo de espera agotado
: **Métrica**: `pipelines.component_timed_out_events_total`
: **Descripción**: El número de eventos que esperaron más de 5 segundos para ser enviados al primer procesador y resultaron en un error HTTP 503. Esto podría ocurrir cuando la entrega de eventos está bloqueada.
: **Disponible para**: Fuentes basadas en HTTP que tienen un tiempo de espera configurado, como el Datadog Agent.

Solicitudes con tiempo de espera agotado
: **Métrica**: `pipelines.component_timed_out_requests_total`
: **Descripción**: El número de solicitudes que agotaron el tiempo de espera para fuentes que envían eventos al Worker en lotes usando solicitudes HTTP.
: **Disponible para**: Fuentes basadas en HTTP que tienen un tiempo de espera configurado, como el Datadog Agent.

### Rendimiento {#performance}

Latencia de envío
: **Métrica**: `pipelines.source_send_latency_seconds`
: **Description**: El tiempo que le toma a la fuente enviar un fragmento de eventos al siguiente componente. Disponible en la versión 2.16 del Worker y posteriores.

Latencia de envío de lote
: **Métrica**: `pipelines.source_send_batch_latency_seconds`
: **Description**: El tiempo que le toma a la fuente enviar un lote, el cual puede contener múltiples fragmentos de eventos, al siguiente componente. Disponible en la versión 2.16 del Worker y posteriores.

Tiempo de retraso de la fuente
: **Métrica**: `pipelines.source_lag_time_seconds`
: **Descripción**: La diferencia, en segundos, entre la propia marca de tiempo de un evento y el momento en que el Worker lo recibió. Los valores altos indican que llegan datos obsoletos o retrasados a la canalización.

### Búfer {#buffer}

Utilice estas métricas para analizar el rendimiento del búfer. Todas las métricas se emiten en un intervalo de un segundo, a menos que se indique lo contrario.

{{% observability_pipelines/metrics/buffer/sources %}}

{{% /tab %}}
{{% tab "Procesadores" %}}

### Rendimiento {#throughput-1}

Eventos de entrada
: **Métrica**: `pipelines.component_received_events_total`
: **Descripción**: La cantidad de eventos recibidos por el componente.

Eventos de salida
: **Métrica**: `pipelines.component_sent_events_total`
: **Descripción**: La cantidad de eventos que el componente envía hacia adelante.

Bytes de eventos de entrada
: **Métrica**: `pipelines.component_received_event_bytes_total`
: **Descripción**: El tamaño en bytes de los eventos recibidos por el componente.

Bytes de eventos de salida
: **Métrica**: `pipelines.component_sent_event_bytes_total`
: **Descripción**: El tamaño en bytes de los eventos que el componente envía hacia adelante.

Eventos incluidos
: **Métrica**: `pipelines.included_events_total`
: **Descripción**: El número de eventos que coincidieron con la consulta de filtro del procesador y fueron procesados. Los eventos que no coinciden con la consulta de filtro omiten el procesador y continúan hacia el siguiente componente.

Bytes de eventos incluidos
: **Métrica**: `pipelines.included_event_bytes_total`
: **Descripción**: El tamaño en bytes de los eventos que coincidieron con la consulta de filtro del procesador y fueron procesados.

### Errores y datos descartados {#errors-and-data-dropped}

Errores
: **Métrica**: `pipelines.component_errors_total`
: **Descripción**: El número de errores encontrados por el componente. Dependiendo del componente, esta métrica puede incluir una etiqueta `error_code`, `error_type` o `reason` que describe el error.

Datos descartados intencionalmente o involuntariamente
: **Métrica**: `pipelines.component_discarded_events_total`
: **Descripción**: El número de eventos descartados. **Nota**: Para desglosar esta métrica, use la etiqueta `intentional:true` para filtrar los eventos que se descartan intencionalmente o la etiqueta `intentional:false` para los eventos que no se descartan intencionalmente.

### Rendimiento {#performance-1}

Uso de CPU
: **Métrica**: `pipelines.component_cpu_usage_ns_total`
: **Descripción**: El tiempo de CPU consumido por un componente, en nanosegundos. Utilice esta métrica para atribuir el costo de CPU a procesadores individuales. Disponible en la versión 2.18 de Worker y posteriores para Linux y MacOS.
: **Disponible para estos procesadores de registro**:<br>- Procesador personalizado<br>- Deduplicador<br>- Tabla de enriquecimiento<br>- Analizador Grok<br>- Analizar JSON<br>- Analizar XML<br>- Reducir<br>- Remapear a OCSF<br>- Sensitive Data Scanner<br>- Dividir matriz<br>- Procesadores de registro de limitación de velocidad
: **Disponible para estos procesadores de métricas**:<br>- Agregador <br>- Métricas de límite de cardinalidad de etiquetas

Utilización
: **Métrica**: `pipelines.utilization`
: **Descripción**: La actividad del componente. Un valor de `0` indica un componente inactivo que está esperando datos de entrada. Un valor cercano a `1` indica un componente que nunca está inactivo, lo que significa que el componente probablemente sea un cuello de botella en la topología de procesamiento que está creando contrapresión. Esto podría causar que se descarten eventos.

### Búfer {#buffer-1}

Utilice estas métricas para analizar el rendimiento del búfer. Todas las métricas se emiten en un intervalo de un segundo, a menos que se indique lo contrario.

{{% observability_pipelines/metrics/buffer/processors %}}

{{% /tab %}}
{{% tab "Destinos" %}}

### Rendimiento {#throughput-2}

Bytes de salida
: **Métrica**: `pipelines.component_sent_bytes_total`
: **Descripción**: La cantidad de bytes sin procesar escritos en la salida del destino, después de la codificación y las transformaciones.

Eventos de entrada
: **Métrica**: `pipelines.component_received_events_total`
: **Descripción**: La cantidad de eventos recibidos por el componente.

Eventos de salida
: **Métrica**: `pipelines.component_sent_events_total`
: **Descripción**: La cantidad de eventos que el componente envía hacia adelante.

Bytes de eventos de entrada
: **Métrica**: `pipelines.component_received_event_bytes_total`
: **Descripción**: El tamaño en bytes de los eventos recibidos por el componente.

Bytes de eventos de salida
: **Métrica**: `pipelines.component_sent_event_bytes_total`
: **Descripción**: El tamaño en bytes de los eventos que el componente envía hacia adelante.

### Errores y datos descartados {#errors-and-data-dropped-1}

Errores
: **Métrica**: `pipelines.component_errors_total`
: **Descripción**: El número de errores encontrados por el componente. Dependiendo del componente, esta métrica puede incluir una etiqueta `error_code`, `error_type` o `reason` que describe el error.

Datos descartados intencionalmente o involuntariamente
: **Métrica**: `pipelines.component_discarded_events_total`
: **Descripción**: El número de eventos descartados. **Nota**: Para desglosar esta métrica, use la etiqueta `intentional:true` para filtrar los eventos que se descartan intencionalmente o la etiqueta `intentional:false` para los eventos que no se descartan intencionalmente.

### Rendimiento {#performance-2}

Utilización
: **Métrica**: `pipelines.utilization`
: **Descripción**: La actividad del componente. Un valor de `0` indica un componente inactivo que está esperando datos de entrada. Un valor cercano a `1` indica un componente que nunca está inactivo, lo que significa que el componente probablemente sea un cuello de botella en la topología de procesamiento que está creando contrapresión. Esto podría causar que se descarten eventos.

### Búfer {#buffer-2}

Utilice estas métricas para analizar el rendimiento del búfer. Todas las métricas se emiten en un intervalo de un segundo, a menos que se indique lo contrario.

{{% observability_pipelines/metrics/buffer/destinations %}}

#### Métricas de búfer obsoletas {#deprecated-buffer-metrics}

{{% observability_pipelines/metrics/buffer/deprecated_destination_metrics %}}

{{% /tab %}}
{{< /tabs >}}

## Métricas del servidor HTTP {#http-server-metrics}

Estas métricas son emitidas por fuentes que reciben datos a través de HTTP, como Datadog Agent, el servidor HTTP/S, OpenTelemetry y las fuentes de Splunk HEC.

- Utilice la etiqueta `component_id` para filtrar o agrupar por componentes individuales.
- Use la etiqueta `component_type` para filtrar o agrupar por el tipo de fuente.

`pipelines.http_server_requests_received_total`
: **Descripción**: El número de solicitudes HTTP recibidas.
: **Tipo de métrica**: conteo

`pipelines.http_server_responses_sent_total`
: **Descripción**: El número de respuestas HTTP enviadas.
: **Tipo de métrica**: conteo

`pipelines.http_server_handler_duration_seconds`
: **Descripción**: El tiempo dedicado a gestionar una solicitud HTTP.
: **Tipo de métrica**: distribución

## Métricas del cliente HTTP {#http-client-metrics}

Estas métricas son emitidas por destinos que envían datos a través de HTTP, incluyendo:

- CrowdStrike NG-SIEM
- Datadog Logs
- Datadog Metrics
- Elasticsearch
- Google SecOps
- Destino del cliente HTTP
- Microsoft Sentinel
- New Relic
- OpenSearch
- SentinelOne
- Splunk HEC

**Nota**: Los destinos basados en AWS (como Amazon S3, Amazon OpenSearch y Amazon Security Lake) no emiten estas métricas.

- Utilice la etiqueta `component_id` para filtrar o agrupar por componentes individuales.
- Utilice la etiqueta `component_type` para filtrar o agrupar por el tipo de destino.

`pipelines.http_client_requests_sent_total`
: **Descripción**: El número de solicitudes HTTP enviadas, etiquetadas por método de solicitud.
: **Tipo de métrica**: conteo

`pipelines.http_client_responses_total`
: **Descripción**: El número de respuestas HTTP recibidas, etiquetadas por estado de respuesta.
: **Tipo de métrica**: conteo

`pipelines.http_client_errors_total`
: **Descripción**: El número de errores de cliente HTTP, etiquetados por tipo de error.
: **Tipo de métrica**: conteo

`pipelines.http_client_rtt_seconds`
: **Descripción**: El tiempo de ida y vuelta, en segundos, para las solicitudes HTTP, desde que se envía la solicitud hasta que se recibe la respuesta final o el error.
: **Tipo de métrica**: distribución

`pipelines.http_client_response_rtt_seconds`
: **Descripción**: El tiempo de ida y vuelta, en segundos, de las solicitudes HTTP, etiquetadas por estado de respuesta.
: **Tipo de métrica**: distribución

`pipelines.http_client_error_rtt_seconds`
: **Descripción**: El tiempo de ida y vuelta, en segundos, de las solicitudes HTTP que resultaron en un error, etiquetadas por tipo de error.
: **Tipo de métrica**: distribución

## Métricas de concurrencia adaptativa {#adaptive-concurrency-metrics}

Estas métricas proporcionan información sobre el controlador de concurrencia adaptativa, el cual ajusta automáticamente cuántas solicitudes HTTP en curso permite un destino según los tiempos de respuesta observados. Son emitidas por destinos que envían datos a través de HTTP, incluidos los destinos basados en AWS.

- Utilice la etiqueta `component_id` para filtrar o agrupar por componentes individuales.
- Utilice la etiqueta `component_type` para filtrar o agrupar por el tipo de destino.

`pipelines.active_endpoints`
: **Descripción**: El número de puntos finales de destino que están marcados como saludables.
: **Tipo de métrica**: gauge

`pipelines.adaptive_concurrency_limit`
: **Descripción**: El límite de concurrencia para solicitudes HTTP a este destino, ajustado automáticamente por el controlador de concurrencia adaptativa según los tiempos de respuesta.
: **Tipo de métrica**: distribución

`pipelines.adaptive_concurrency_in_flight`
: **Descripción**: El número de solicitudes HTTP en curso hacia un destino, comparado con el límite de concurrencia adaptativa para determinar cuándo limitar.
: **Tipo de métrica**: distribución

`pipelines.adaptive_concurrency_reached_limit`
: **Descripción**: Si el controlador de concurrencia adaptativa alcanzó su límite calculado (`1`) o no (`0`) durante el último intervalo de medición.
: **Tipo de métrica**: distribución

`pipelines.adaptive_concurrency_back_pressure`
: **Descripción**: Si el controlador de concurrencia adaptativa detectó contrapresión (`1`) o no (`0`) durante el último intervalo de medición.
: **Tipo de métrica**: distribución

`pipelines.adaptive_concurrency_averaged_rtt`
: **Descripción**: El tiempo de ida y vuelta (RTT) promedio suavizado, en segundos, para las solicitudes HTTP a este destino, utilizado como línea base para los cálculos de concurrencia adaptativa.
: **Tipo de métrica**: distribución

`pipelines.adaptive_concurrency_observed_rtt`
: **Descripción**: El tiempo de ida y vuelta (RTT), en segundos, observado para la solicitud HTTP más reciente a este destino.
: **Tipo de métrica**: distribución

`pipelines.adaptive_concurrency_past_rtt_mean`
: **Descripción**: El RTT medio histórico, en segundos, para las solicitudes HTTP a este destino, utilizado como línea base a largo plazo para los ajustes de concurrencia adaptativa.
: **Tipo de métrica**: distribución

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/dashboards/
[2]: /es/notebooks/
[3]: /es/getting_started/monitors/
[4]: /es/getting_started/tagging/
[5]: https://app.datadoghq.com/metric/summary
[6]: https://docs.datadoghq.com/es/account_management/billing/usage_metrics/