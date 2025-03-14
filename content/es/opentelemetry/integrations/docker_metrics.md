---
aliases:
- /es/opentelemetry/collector_exporter/docker_metrics/
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: Documentación
  text: Configuración de OpenTelemetry Collector
title: Métricas de Docker
---

## Información general

{{< img src="/opentelemetry/collector_exporter/docker_metrics.png" alt="Métricas de OpenTelemetry Docker en un dashboard de contenedores" style="width:100%;" >}}

Para recopilar métricas de contenedor, configura el [receptor de Docker Stats][1] en tu Exportador de Datadog.

Para más información, consulta la documentación del proyecto de OpenTelemetry para [el receptor de Docker Stats][1].


## Configuración

{{< tabs >}}
{{% tab "Host" %}}

El receptor de Docker Stats necesita acceder al socket de Docker. Por defecto, el receptor busca el socket de Docker en `unix:///var/run/docker.sock`. Si esta no es la ruta del socket de Docker, especifica la ruta en la línea de configuración `endpoint`.

Añade las siguientes líneas a tu configuración de Collector:

```yaml
receivers:
  docker_stats:
    endpoint: unix:///var/run/docker.sock # (default)
    metrics:
      container.network.io.usage.rx_packets:
        enabled: true
      container.network.io.usage.tx_packets:
        enabled: true
      container.cpu.usage.system:
        enabled: true
      container.memory.rss:
        enabled: true
      container.blockio.io_serviced_recursive:
        enabled: true
      container.uptime:
        enabled: true
      container.memory.hierarchical_memory_limit:
        enabled: true
```
**Nota**: Si estás utilizando la imagen de Collector, puede que debas [configurar permisos adicionales para que Collector tenga acceso al socket de Docker][1]. 

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/issues/11791

{{% /tab %}}

{{% tab "Kubernetes" %}}

El receptor de Docker Stats necesita acceder al socket de Docker. En Kubernetes, si estás ejecutando Docker como tiempo de ejecución, monta el socket de Docker:

Añade las siguientes líneas a `values.yaml`:
```yaml
extraVolumes:
 - name: docker-sock
   hostPath:
     path: /var/run/docker.sock
extraVolumeMounts:
 - name: docker-sock
   mountPath: /var/run/docker.sock
```

Añade lo siguiente en la configuración de Collector:

```yaml
receivers:
  docker_stats:
    endpoint: unix:///var/run/docker.sock # default
    metrics:
      container.network.io.usage.rx_packets:
        enabled: true
      container.network.io.usage.tx_packets:
        enabled: true
      container.cpu.usage.system:
        enabled: true
      container.memory.rss:
        enabled: true
      container.blockio.io_serviced_recursive:
        enabled: true
      container.uptime:
        enabled: true
      container.memory.hierarchical_memory_limit:
        enabled: true
```

{{% /tab %}}

{{< /tabs >}}

## Datos recopilados

Consulta [asignación de métricas de OpenTelemetry][2] para obtener información sobre la recopilación de métricas de contenedor.


## Ejemplo completo de configuración

Para ver un ejemplo completo de configuración en funcionamiento con el exportador de Datadog, consulta [`docker-stats.yaml`][3].

## Ejemplo de salida de registro

```
Resource SchemaURL: https://opentelemetry.io/schemas/1.6.1
Resource attributes:
     -> container.runtime: Str(docker)
     -> container.hostname: Str(be51776e036e)
     -> container.id: Str(be51776e036e04461169fce2847d4e77be3d83856b474ad544143afc3d48e9e5)
     -> container.image.name: Str(sha256:9bdff337981de15f8cdf9e73b24af64a03e2e6dd1f156a274a15c1d8db98ab79)
     -> container.name: Str(redis-otel)
ScopeMetrics #0
ScopeMetrics SchemaURL: 
InstrumentationScope otelcol/dockerstatsreceiver 0.89.0-dev
Metric #6
Descriptor:
     -> Name: container.cpu.utilization
     -> Description: Percent of CPU used by the container.
     -> Unit: 1
     -> DataType: Gauge
NumberDataPoints #0
StartTimestamp: 2023-11-20 14:58:17.522765 +0000 UTC
Timestamp: 2023-11-20 14:58:19.550208 +0000 UTC
Value: 0.170933
```


[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/dockerstatsreceiver
[2]: /es/opentelemetry/guide/metrics_mapping/#container-metrics
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/docker-stats.yaml