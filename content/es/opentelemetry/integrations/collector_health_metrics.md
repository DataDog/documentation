---
aliases:
- /es/opentelemetry/collector_exporter/collector_health_metrics
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: Documentación
  text: Configuración de OpenTelemetry Collector
title: Métricas de estado
---

## Información general

{{< img src="/opentelemetry/collector_exporter/collector_health_metrics.png" alt="Dashboard de métricas de estado de OpenTelemetry Collector" style="width:100%;" >}}

Para recopilar las métricas de estado desde el propio OpenTelemetry Collector, configura el [receptor de Prometheus][1] en tu exportador de Datadog.

Para más información, consulta la documentación del proyecto de OpenTelemetry para el [receptor de Prometheus][1].

## Configuración

Añade las siguientes líneas a tu configuración de Collector:

```yaml
receivers:
  prometheus:
    config:
      scrape_configs:
      - job_name: 'otelcol'
        scrape_interval: 10s
        static_configs:
        - targets: ['0.0.0.0:8888']
```

<div class="alert alert-warning">
Si tienes un Datadog Agent ejecutándose en el mismo host que un OpenTelemetry Collector o un DDOT Collector que utiliza un receptor de Prometheus para analizar métricas de estado del Collector, asegúrate de que la <a href="/integrations/openmetrics/">integración de OpenMetrics</a> del Agent está desactivada o que analiza un endpoint diferente al de las métricas de estado del Collector. De lo contrario, tanto el Agent como el Collector rastrean el mismo endpoint, lo que da como resultado métricas de salud del Collector duplicadas.
</div>

## Datos recopilados

| Métrica de OpenTelemetry | Descripción |
|---|---|
| `otelcol_process_uptime` | Tiempo de actividad del proceso |
| `otelcol_process_memory_rss` | Memoria física total (tamaño del conjunto residente) |
| `otelcol_exporter_queue_size` | Tamaño actual de la cola de reintentos (en lotes) |
| `otelcol_exporter_sent_spans` | Número de tramos (spans) enviados con éxito al destino |
| `otelcol_exporter_send_failed_metric_points` | Número de puntos de métrica en intentos fallidos de envío a destino |
| `otelcol_exporter_send_failed_spans` | Número de tramos en intentos fallidos de envío a destino |
| `otelcol_process_cpu_seconds` | Tiempo total de CPU de usuario y sistema en segundos |
| `otelcol_receiver_refused_spans` | Número de tramos que no han podido introducirse en el pipeline |
| `otelcol_exporter_queue_capacity` | Capacidad fija de la cola de reintentos (en lotes) |
| `otelcol_receiver_accepted_spans` | Número de tramos introducidos con éxito en el pipeline |
| `otelcol_exporter_sent_metric_points` | Número de puntos de métrica enviados con éxito al destino |
| `otelcol_exporter_enqueue_failed_spans` | Número de tramos que no se han añadido a la cola de envío |
| `otelcol_scraper_errored_metric_points` | Número de puntos de métrica que no se han podido borrar |
| `otelcol_scraper_scraped_metric_points` | Número de puntos de métrica borrados con éxito |
| `otelcol_receiver_refused_metric_points` | Número de puntos de métrica que no han podido introducirse en el pipeline |
| `otelcol_receiver_accepted_metric_points` | Número de puntos de métrica introducidos con éxito en el pipeline |
| `otelcol_process_runtime_heap_alloc_bytes` | Bytes de objetos heap asignados (consulta 'go doc runtime.MemStats.HeapAlloc') |
| `otelcol_process_runtime_total_alloc_bytes` | Bytes acumulados asignados a objetos heap (consulta 'go doc runtime.MemStats.TotalAlloc') |
| `otelcol_exporter_enqueue_failed_log_records` | Número de registros de log que no se han añadido a la cola de envío |
| `otelcol_processor_batch_timeout_trigger_send` | Número de veces que se envió el lote debido a un desencadenante de tiempo de espera |
| `otelcol_exporter_enqueue_failed_metric_points` | Número de puntos de métrica que no se han añadido a la cola de envío |
| `otelcol_process_runtime_total_sys_memory_bytes` | Bytes totales de memoria obtenidos del sistema operativo (consulta [la documentación de Go para `runtime.MemStats.Sys`][3]) |
| `otelcol_processor_batch_batch_size_trigger_send` | Número de veces que se envió el lote debido a un desencadenante de tamaño |
| `otelcol_exporter_sent_log_records` | Número de registros de log enviados correctamente al destino |
| `otelcol_receiver_refused_log_records` | Número de registros de log que no han podido introducirse en el pipeline |
| `otelcol_receiver_accepted_log_records` | Número de registros de log introducidos con éxito en el pipeline |


## Ejemplo completo de configuración

Para ver un ejemplo completo de configuración en funcionamiento con el exportador de Datadog, consulta [`collector-metrics.yaml`][2].

## Ejemplo de salida de registro

```
ResourceMetrics #0
Resource SchemaURL: https://opentelemetry.io/schemas/1.6.1
Resource attributes:
     -> service.name: Str(opentelemetry-collector)
     -> net.host.name: Str(192.168.55.78)
     -> service.instance.id: Str(192.168.55.78:8888)
     -> net.host.port: Str(8888)
     -> http.scheme: Str(http)
     -> k8s.pod.ip: Str(192.168.55.78)
     -> cloud.provider: Str(aws)
     -> cloud.platform: Str(aws_ec2)
     -> cloud.region: Str(us-east-1)
     -> cloud.account.id: Str(XXXXXXXXX)
     -> cloud.availability_zone: Str(us-east-1c)
     -> host.id: Str(i-0368add8e328c28f7)
     -> host.image.id: Str(ami-08a2e6a8e82737230)
     -> host.type: Str(m5.large)
     -> host.name: Str(ip-192-168-53-115.ec2.internal)
     -> os.type: Str(linux)
     -> k8s.pod.name: Str(opentelemetry-collector-agent-gqwm8)
     -> k8s.daemonset.name: Str(opentelemetry-collector-agent)
     -> k8s.daemonset.uid: Str(6d6fef61-d4c7-4226-9b7b-7d6b893cb31d)
     -> k8s.node.name: Str(ip-192-168-53-115.ec2.internal)
     -> kube_app_name: Str(opentelemetry-collector)
     -> kube_app_instance: Str(opentelemetry-collector)
     -> k8s.namespace.name: Str(otel-staging)
     -> k8s.pod.start_time: Str(2023-11-20T12:53:23Z)
     -> k8s.pod.uid: Str(988d1bdc-5baf-4e98-942f-ab026a371daf)
ScopeMetrics #0
ScopeMetrics SchemaURL: 
InstrumentationScope otelcol/prometheusreceiver 0.88.0-dev
Metric #0
Descriptor:
     -> Name: otelcol_otelsvc_k8s_namespace_added
     -> Description: Number of namespace add events received
     -> Unit: 
     -> DataType: Sum
     -> IsMonotonic: true
     -> AggregationTemporality: Cumulative
NumberDataPoints #0
Data point attributes:
     -> service_instance_id: Str(d80d11f9-aa84-4e16-818d-3e7d868c0cfe)
     -> service_name: Str(otelcontribcol)
     -> service_version: Str(0.88.0-dev)
StartTimestamp: 1970-01-01 00:00:00 +0000 UTC
Timestamp: 2023-11-20 13:17:36.881 +0000 UTC
Value: 194151496.000000
Metric #9
Descriptor:
     -> Name: otelcol_receiver_accepted_spans
     -> Description: Number of spans successfully pushed into the pipeline.
     -> Unit: 
     -> DataType: Sum
     -> IsMonotonic: true
     -> AggregationTemporality: Cumulative
```


[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/prometheusreceiver
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/collector-metrics.yaml
[3]: https://pkg.go.dev/runtime#MemStats.Sys