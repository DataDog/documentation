---
aliases:
- /es/agent/faq/agent-apm-metrics/
- /es/tracing/send_traces/agent-apm-metrics/
description: Lista de referencia de todas las métricas de APM enviadas por el Datadog
  Agent para monitorizar el procesamiento de trazas (traces) y el rendimiento del
  Agent.
title: Métricas de APM enviadas por el Datadog Agent
---

Encuentra a continuación la lista de métricas de rastreo predefinidas enviadas por el Datadog Agent cuando [APM está habilitado][1]. Importa el [dashboard de monitorización de APM][2] en tu cuenta de Datadog para obtener un dashboard predefinido aprovechando la mayoría de esas métricas.



`datadog.trace_agent.cpu_percent`
: **Tipo**: gauge<br>
Uso de la CPU en términos de porcentaje de un núcleo. Por ejemplo, un valor de `50` es medio núcleo, o `200` son dos núcleos.

`datadog.trace_agent.events.max_eps.current_rate`
: **Tipo**: gauge<br>
Recuento de eventos de APM por segundo recibidos por el Agent

`datadog.trace_agent.events.max_eps.max_rate`
: **Tipo**: gauge<br>
Igual que el parámetro max_events_per_second de la configuración del Agent.

`datadog.trace_agent.events.max_eps.reached_max`
: **Tipo**: gauge<br>
Se establece en `1` cada vez que se alcanza max_events_per_second, de lo contrario es `0`.

`datadog.trace_agent.events.max_eps.sample_rate`
: **Tipo**: gauge<br>
Frecuencia de muestreo aplicada por el Agent a eventos que recibió.

`datadog.trace_agent.heap_alloc`
: **Tipo**: gauge<br>
Asignaciones de heap según el tiempo de ejecución de Go.

`datadog.trace_agent.heartbeat`
: **Tipo: gauge<br>
Incrementa en uno cada 10 segundos.

`datadog.trace_agent.normalizer.spans_malformed`
: **Tipo**: Count<br>
Número de tramos (spans) con campos malformados que han tenido que ser modificados para que el sistema los acepte.

`datadog.trace_agent.obfuscation.sql_cache.hits`
: **Tipo**: Count<br>
Número de llamadas GET en las que se ha encontrado un valor para la clave correspondiente.

`datadog.trace_agent.obfuscation.sql_cache.misses`
: **Tipo**: Count<br>
Número de llamadas GET en las que no se ha encontrado un valor para la clave correspondiente.

`datadog.trace_agent.panic`
: **Tipo**: gauge<br>
Incrementa en uno en cada pánico en el código.

`datadog.trace_agent.profile`
: **Tipo**: Count<br>
Incrementa en uno cada vez que se crea un proxy inverso de endpoints de perfil.

`datadog.trace_agent.receiver.error`
: **Tipo**: Count<br>
Número de veces que la API rechazó una carga útil debido a un error de decodificación, formateo u otro.

`datadog.trace_agent.receiver.events_extracted`
: **Tipo**: Count<br>
Total de eventos de APM muestreados.

`datadog.trace_agent.receiver.events_sampled`
: **Tipo**: Count<br>
Total de eventos de APM muestreados por el muestreador de parámetros `max_events_per_second`.

`datadog.trace_agent.receiver.oom_kill`
: **Tipo**: Count<br>
Número de veces que el Agent se ha terminado a si mismo debido a un uso excesivo de memoria (150% de max_memory).

`datadog.trace_agent.receiver.out_chan_fill`
: **Tipo**: gauge<br>
Métrica interna. Porcentaje de llenado en el canal de salida del receptor.

`datadog.trace_agent.receiver.payload_accepted`
: **Tipo**: Count<br>
Número de cargas útiles aceptadas por el Agent.

`datadog.trace_agent.receiver.payload_refused`
: **Tipo**: Count<br>
Número de cargas útiles rechazadas por el receptor debido al muestreo.

`datadog.trace_agent.receiver.spans_dropped`
: **Tipo**: Count<br>
Número de tramos descartados por el Agent.

`datadog.trace_agent.receiver.spans_filtered`
: **Tipo**: Count<br>
Número de tramos filtrados por el Agent.

`datadog.trace_agent.receiver.spans_received`
: **Tipo**: Count<br>
Número total de tramos recibidos por el Agent.

`datadog.trace_agent.receiver.tcp_connections`
: **Tipo**: Count<br>
Número de conexiones TCP que entran en el Agent.

`datadog.trace_agent.receiver.trace`
: **Tipo**: Count<br>
Número de trazas recibidas y aceptadas.

`datadog.trace_agent.receiver.traces_bytes`
: **Tipo**: Count<br>
Total de bytes de cargas útiles aceptadas por el Agent.

`datadog.trace_agent.receiver.traces_filtered`
: **Tipo**: Count<br>
Trazas filtradas por recursos ignorados (según se define en el archivo `datadog.yaml`).

`datadog.trace_agent.receiver.traces_priority`
: **Tipo**: Count<br>
Trazas procesadas por el muestreador de prioridad que tienen la etiqueta de prioridad.

`datadog.trace_agent.receiver.traces_received`
: **Tipo**: Count<br>
Número de trazas recibidas y aceptadas.

`datadog.trace_agent.started`
: **Tipo**: Count<br>
Incrementa en uno cada vez que se inicia el Agent.

`datadog.trace_agent.stats_writer.bytes`
: **Tipo**: Count<br>
Número de bytes enviados (calculado después de Gzip).

`datadog.trace_agent.stats_writer.connection_fill`
: **Tipo**: histograma <br>
Porcentaje de conexiones salientes utilizadas.

`datadog.trace_agent.stats_writer.dropped`
: **Tipo**: Count<br>
Número de cargas perdidas debido a errores HTTP no recuperables.

`datadog.trace_agent.stats_writer.dropped_bytes`
: **Tipo**: Count<br>
Número de bytes perdidos debido a errores HTTP no recuperables.

`datadog.trace_agent.stats_writer.encode_ms`
: **Tipo**: histograma <br>
Tiempo que tardó en codificarse una carga útil de estadísticas.

`datadog.trace_agent.stats_writer.errors`
: **Tipo**: Count<br>
Errores que no se han podido reintentar.

`datadog.trace_agent.stats_writer.queue_fill`
: **Tipo**: histograma <br>
Porcentaje de la cola ocupado.

`datadog.trace_agent.stats_writer.retries`
: **Tipo**: Count<br>
Número de reintentos en caso de fallo en la API de Datadog 

`datadog.trace_agent.stats_writer.splits`
: **Tipo**: Count<br>
Número de veces que una carga útil se dividió en varias.

`datadog.trace_agent.stats_writer.stats_buckets`
: **Tipo**: Count<br>
Número de buckets de estadísticas vaciados.

`datadog.trace_agent.trace_writer.bytes`
: **Tipo**: Count<br>
Número de bytes enviados (calculado después de Gzip).

`datadog.trace_agent.trace_writer.bytes_uncompressed `
: **Tipo**: Count<br>
Número de bytes enviados (calculado antes de Gzip).

`datadog.trace_agent.trace_writer.compress_ms`
: **Tipo**: gauge<br>
Número de milisegundos que tardó en comprimirse una carga útil de traza codificada.

`datadog.trace_agent.trace_writer.connection_fill`
: **Tipo**: histograma <br>
Porcentaje de conexiones salientes utilizadas por el escritor de traza.

`datadog.trace_agent.trace_writer.dropped`
: **Tipo**: Count<br>
Número de cargas perdidas debido a errores HTTP no recuperables.

`datadog.trace_agent.trace_writer.dropped_bytes`
: **Tipo**: Count<br>
Número de bytes perdidos debido a errores HTTP no recuperables.

`datadog.trace_agent.trace_writer.encode_ms`
: **Tipo**: gauge<br>
Número de milisegundos que tardó en codificarse una carga útil de traza.

`datadog.trace_agent.trace_writer.errors`
: **Tipo**: Count<br>
Errores que no se han podido reintentar.

`datadog.trace_agent.trace_writer.events`
: **Tipo**: Count<br>
Número de eventos procesados.

`datadog.trace_agent.trace_writer.flush_duration`
: **Tipo**: gauge<br>
Tiempo que tardó en enviarse una carga útil a la API de Datadog.

`datadog.trace_agent.trace_writer.payloads`
: **Tipo**: Count<br>
Número de cargas útiles enviadas.

`datadog.trace_agent.trace_writer.queue_fill`
: **Tipo**: histograma <br>
Porcentaje de llenado de la cola de carga útil saliente.

`datadog.trace_agent.trace_writer.retries`
: **Tipo**: Count<br>
Número de reintentos en caso de fallo de la API de Datadog.

`datadog.trace_agent.trace_writer.spans`
: **Tipo**: Count<br>
Número de tramos procesados.

`datadog.trace_agent.trace_writer.traces`
: **Tipo**: Count<br>
Número de trazas procesadas.

[1]: /es/tracing/setup/
[2]: /resources/json/APM_monitoring_dashboard.json