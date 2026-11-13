---
aliases:
- /es/opentelemetry/collector_exporter/host_metrics/
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: Documentación
  text: Configuración del OpenTelemetry Collector
title: Métricas de servidor
---
## Descripción general {#overview}

{{< img src="/opentelemetry/collector_exporter/host_metrics.png" alt="Panel de métricas de servidores de OpenTelemetry" style="width:100%;" >}}

<div class="alert alert-danger">Si ejecuta el <a href="/opentelemetry/setup/ddot_collector/">DDOT Collector</a> con el Datadog Agent, no necesita el receptor de métricas de servidores. El Agent ya recopila métricas de servidores.</div>

Para recopilar métricas del sistema como el uso de CPU, disco y memoria, habilite el [receptor de métricas de servidores][1] en su Collector. 

Para obtener más información, incluidos los sistemas operativos compatibles, consulte la documentación del proyecto OpenTelemetry para el [receptor de métricas de servidores][1].


## Configuración {#setup}

Estos ejemplos utilizan identificadores de componentes de OpenTelemetry Collector Contrib v0.154.0. Para otras versiones o distribuciones, utilice los identificadores que admita esa distribución.

{{< tabs >}}
{{% tab "Servidor" %}}

Agregue las siguientes líneas a su configuración de Collector:

```yaml
receivers:
  host_metrics:
    collection_interval: 10s
    scrapers:
      paging:
        metrics:
          system.paging.utilization:
            enabled: true
      cpu:
        metrics:
          system.cpu.utilization:
            enabled: true
      disk:
      filesystem:
        metrics:
          system.filesystem.utilization:
            enabled: true
      load:
      memory:
      network:
      processes:

```

{{% /tab %}}

{{% tab "Kubernetes" %}}

Configure el receptor de métricas de servidores en cada nodo del cual se deban recopilar métricas. Para recopilar métricas de servidores de cada nodo en su clúster, implemente el receptor de métricas de servidores como un Collector de tipo DaemonSet. Agregue lo siguiente en la configuración del Collector:

```yaml
receivers:
  host_metrics:
    collection_interval: 10s
    scrapers:
      paging:
        metrics:
          system.paging.utilization:
            enabled: true
      cpu:
        metrics:
          system.cpu.utilization:
            enabled: true
          system.cpu.physical.count:
            enabled: true
          system.cpu.logical.count:
            enabled: true
          system.cpu.frequency:
            enabled: true
      disk:
      filesystem:
        metrics:
          system.filesystem.utilization:
            enabled: true
      load:
      memory:
      network:
      processes:

```

{{% /tab %}}

{{< /tabs >}}

Agregue `host_metrics` a la lista `receivers` de la canalización de métricas en su configuración. Mantenga los procesadores que ya están en esa canalización: la ingesta de métricas OTLP de Datadog solo acepta métricas delta, y el receptor de métricas de servidores produce sumas acumulativas, por lo que la canalización necesita `cumulativetodelta`. La [configuración de Collector recomendada][5] lo incluye.


## Datos recopilados {#data-collected}

Las métricas de servidores son recopiladas por el [receptor de métricas de servidores][4]. Para obtener información sobre cómo configurar el receptor, consulte [Configurar el OpenTelemetry Collector][5].

Las métricas, mapeadas a métricas de Datadog, se utilizan en las siguientes vistas:
- [Mapa de servidores de infraestructura][6]
- [Lista de infraestructura][7]
- [Paneles predeterminados de servidores][8]
- [Información del servidor en la vista de trazas de APM][9]

**Nota**: Para correlacionar las métricas de trazas y de servidores, configure los [atributos de unified service tagging][10] para cada servicio y establezca el atributo de recurso `host.name` en el servidor subyacente correspondiente tanto para las instancias del servicio como para las del Collector. 

La siguiente tabla enumera las métricas de servidores de OpenTelemetry recopiladas para las experiencias integradas de Datadog.

{{< mapping-table resource="host.csv">}}

Para ver la asignación completa entre los nombres de métricas de OpenTelemetry y Datadog, consulte [Asignación de métricas de OpenTelemetry][2].


## Ejemplo de salida de registro {#example-logging-output}

```
ResourceMetrics #1
Resource SchemaURL: https://opentelemetry.io/schemas/1.9.0
Resource attributes:
     -> k8s.pod.ip: Str(192.168.63.232)
     -> cloud.provider: Str(aws)
     -> cloud.platform: Str(aws_ec2)
     -> cloud.region: Str(us-east-1)
     -> cloud.account.id: Str(XXXXXXXXX)
     -> cloud.availability_zone: Str(us-east-1c)
     -> host.id: Str(i-07e7d48cedbec9e86)
     -> host.image.id: Str(ami-0cbbb5a8c6f670bb6)
     -> host.type: Str(m5.large)
     -> host.name: Str(ip-192-168-49-157.ec2.internal)
     -> os.type: Str(linux)
     -> kube_app_instance: Str(opentelemetry-collector-gateway)
     -> k8s.pod.name: Str(opentelemetry-collector-gateway-688585b95-l2lds)
     -> k8s.pod.uid: Str(d8063a97-f48f-4e9e-b180-8c78a56d0a37)
     -> k8s.replicaset.uid: Str(9e2d5331-f763-43a3-b0be-9d89c0eaf0cd)
     -> k8s.replicaset.name: Str(opentelemetry-collector-gateway-688585b95)
     -> k8s.deployment.name: Str(opentelemetry-collector-gateway)
     -> kube_app_name: Str(opentelemetry-collector)
     -> k8s.namespace.name: Str(otel-ds-gateway)
     -> k8s.pod.start_time: Str(2023-11-20T12:53:08Z)
     -> k8s.node.name: Str(ip-192-168-49-157.ec2.internal)
ScopeMetrics #0
ScopeMetrics SchemaURL: 
InstrumentationScope otelcol/hostmetricsreceiver/memory 0.88.0-dev
Metric #0
Descriptor:
     -> Name: system.memory.usage
     -> Description: Bytes of memory in use.
     -> Unit: By
     -> DataType: Sum
     -> IsMonotonic: false
     -> AggregationTemporality: Cumulative
NumberDataPoints #0
Data point attributes:
     -> state: Str(used)
StartTimestamp: 2023-08-21 13:45:37 +0000 UTC
Timestamp: 2023-11-20 13:04:19.489045896 +0000 UTC
Value: 1153183744
```


[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/hostmetricsreceiver/README.md
[2]: /es/opentelemetry/guide/metrics_mapping/#host-metrics
[4]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/hostmetricsreceiver
[5]: /es/opentelemetry/setup/collector_exporter/
[6]: https://app.datadoghq.com/infrastructure/map?fillby=avg%3Acpuutilization&groupby=availability-zone
[7]: https://app.datadoghq.com/infrastructure
[8]: /es/opentelemetry/reference/otel_metrics/#out-of-the-box-dashboards
[9]: /es/tracing/trace_explorer/trace_view/?tab=hostinfo
[10]: /es/opentelemetry/correlate/#prerequisite-unified-service-tagging