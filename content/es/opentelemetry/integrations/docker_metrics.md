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

Para recopilar métricas de contenedores, configura el [receptor de estadísticas de Docker][1] en tu OpenTelemetry Collector y envía los datos utilizando el Datadog Exporter.

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

## Correlacionar trazas con las métricas de contenedor 

Para correlacionar trazas con las métricas de contenedor, ambos tipos de telemetría deben compartir atributos de recursos comunes. Estos atributos proporcionan el contexto necesario para la correlación.

1. Configura atributos del [etiquetado de servicios unificado][9].
2. Configura los siguientes atributos tanto en tus trazas como en las métricas:

| Atributo                                | Valor                                                          | Descripción                                                                                                                                                               |
|------------------------------------------|----------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `container.id` (**Obligatorio**)            | El ID de contenedor de Docker.                                       | Identifica unívocamente el contenedor. Es esencial para correlacionar tramos con las métricas de contenedor. Sin este atributo en las trazas, las vistas de métricas de contenedor no se muestran en APM. |
| `container.name` o `k8s.container.name` | El nombre de contenedor legible por humanos (por ejemplo, `redis-otel`). | Se utiliza como nombre visible en Datadog.                                                                                                                                      |
| `k8s.pod.name`                           | El nombre del pod (por ejemplo, `redis-otel-59c9b5c9d5-s9t2r`).     | Permite la navegación entre las vistas de contexto de pod y contenedores en entornos de Kubernetes.

### Trazas

Para rellenar estos atributos de recursos en **trazas**:

- Puedes utilizar `resourcedetectionprocessor` en la configuración del Collector:
   ```yaml
   processors:
      resourcedetection:
         detectors: ["env", "container", "k8s"]
   service:
      pipelines:
         traces:
            processors: [resourcedetection]

   ```

- Puedes añadir un detector de recursos de contenedor en el código de tu aplicación.  
   Por ejemplo, con Go:
   ```go
   // resource.WithContainer() adds container.id attribute to the trace's resource
   res, err := resource.New(
       ctx,
       resource.WithContainer(),                    
       resource.WithFromEnv(),
       semconv.ServiceNameKey.String("calendar"),   
   )
   ```

   Consulta el ejemplo completo en [opentelemetry-examples][8].

### Métricas  

Para rellenar estos atributos de recursos en **métricas**, el receptor `docker_stats` detecta y añade automáticamente estos atributos en las métricas de contenedores que emite.

## Datos recopilados

El receptor de Docker Stats genera métricas de contenedor para OpenTelemetry Collector. El exportador de Datadog traduce las métricas de contenedor a sus homólogos de Datadog para usarlas en las siguientes vistas:

- [Dashboard predeterminado de información general de contenedores][6]
- [Vista de traza de APM][10] con métricas de contenedor

Más información sobre [la asignación entre las convenciones semánticas de OpenTelemetry y Datadog para los atributos de recursos][5].

La siguiente tabla muestra los nombres de métrica de contenedores de Datadog que corresponden a los nombres de métrica de contenedores de OpenTelemetry:

{{< mapping-table resource="dockerstats.csv">}}

Consulta [Asignación de métricas de OpenTelemetry][2] para obtener más información.

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
[2]: /es/opentelemetry/guide/metrics_mapping/
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/docker-stats.yaml
[4]: /es/universal_service_monitoring/setup/
[5]: /es/opentelemetry/guide/semantic_mapping/
[6]: /es/opentelemetry/otel_collector_datadog_exporter/?tab=onahost#containers-overview-dashboard
[7]: /es/tracing/trace_explorer/trace_view/
[8]: https://github.com/DataDog/opentelemetry-examples/blob/main/apps/rest-services/golang/calendar/main.go
[9]: /es/opentelemetry/mapping/semantic_mapping#unified-service-tagging