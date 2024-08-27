---
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: Documentación
  text: Configuración de OpenTelemetry Collector
title: Configuración de lotes y memoria
---

## Información general

Para editar la configuración de lotes y memoria de OpenTelemetry Collector, configura el [procesador de lotes][1] en tu Exportador de Datadog.

Para más información, consulta la documentación del proyecto de OpenTelemetry para el [procesador de lotes][1].

## Configuración

{{< tabs >}}
{{% tab "Host" %}}
Añade las siguientes líneas a tu configuración de Collector:

```yaml
processors:
  batch:
    # El límite de ingesta de Datadog APM es 3,2MB.    
    send_batch_max_size: 1000
    send_batch_size: 100
    timeout: 10s
  memory_limiter:
    check_interval: 1s
    limit_mib: 1000
```

{{% /tab %}}

{{% tab "Kubernetes" %}}

Añade las siguientes líneas a `values.yaml`:

```yaml
resources:
  limits:
    cpu: 512m
    memory: 1Gi
```

Añade lo siguiente en la configuración de Collector:

```yaml
processors:
  batch:
    # El límite de ingesta de Datadog APM es 3,2MB.    
    send_batch_max_size: 1000
    send_batch_size: 100
    timeout: 10s
```

{{% /tab %}}
{{< /tabs >}}


## Datos recopilados

Ninguno.

## Ejemplo completo de configuración

Para ver un ejemplo completo de configuración en funcionamiento con el exportador de Datadog, consulta [`batch-memory.yaml`][2].

## Ejemplo de salida de registro

```
2023-12-05T09:52:58.568Z    warn    memorylimiterprocessor@v0.90.1/memorylimiter.go:276 
Memory usage is above hard limit. Forcing a GC. 
{"kind": "processor", "name": "memory_limiter", "pipeline": "traces", "cur_mem_mib": 44}
2023-12-05T09:52:58.590Z    info    memorylimiterprocessor@v0.90.1/memorylimiter.go:266 
Memory usage after GC.  
{"kind": "processor", "name": "memory_limiter", "pipeline": "traces", "cur_mem_mib": 34}
```


[1]: https://github.com/open-telemetry/opentelemetry-collector/tree/main/processor/batchprocessor
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/batch-memory.yaml