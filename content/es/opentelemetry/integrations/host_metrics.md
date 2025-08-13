---
aliases:
- /es/opentelemetry/collector_exporter/host_metrics/
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: Documentación
  text: Configuración de OpenTelemetry Collector
title: Métricas de hosts
---

## Información general

{{< img src="/opentelemetry/collector_exporter/host_metrics.png" alt="Dashboard de métricas de host de OpenTelemetry" style="width:100%;" >}}

Para recopilar métricas de sistema como el uso de CPU, disco y memoria, activa el [receptor de métricas de host][1] en tu Collector.

Para obtener más información, incluidos los sistemas operativos compatibles, consulta la documentación del proyecto de OpenTelemetry para el [receptor de métricas de host][1].


## Configuración

{{< tabs >}}
{{% tab "Host" %}}

Añade las siguientes líneas a tu configuración de Collector:

```yaml
receivers:
  hostmetrics:
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

Configura el receptor de métricas de host en cada nodo del que se necesite recopilar métricas. Para recopilar métricas de host de cada nodo en tu clúster, despliega el receptor de métricas de host como un DaemonSet Collector. Añade lo siguiente en la configuración de Collector:

```yaml
receivers:
  hostmetrics:
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

## Datos recopilados

Las métricas de hosts son recopiladas por el [receptor de métricas de host][4]. Para obtener información sobre la configuración del receptor, consulta [Exportador de Datadog recopilador de OpenTelemetry][5].

La métricas, asignadas a métricas de Datadog, se utilizan en las siguientes vistas:
- [Mapa de hosts de infraestructura][6]
- [Lista de infraestructuras][7]
- [Dashboards de hosts por defecto][8]
- [Información de hosts de visualización de trazas de APM][9]

**Nota**: Para correlacionar métricas de trazas y hosts, configura [atributos universales de monitorización de servicios][10] para cada servicio y define el atributo de recurso `host.name` en el host subyacente correspondiente para instancias del servicio y del recopilador.

La siguiente tabla muestra qué nombres de métrica de host de Datadog están asociados a los correspondientes nombres de métrica de host de OpenTelemetry y, si procede, qué matemática se aplica a la métrica de host de OTel para transformarla en unidades de Datadog durante la asignación.

{{< mapping-table resource="host.csv">}}

Para obtener más información, consulta [Asignación de métricas de OpenTelemetry][2].


## Ejemplo completo de configuración

Para ver un ejemplo completo de configuración en funcionamiento con el exportador de Datadog, consulta [`host-metrics.yaml`][3].

## Ejemplo de salida de registro

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
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/host-metrics.yaml
[4]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/hostmetricsreceiver
[5]: /es/opentelemetry/otel_collector_datadog_exporter/
[6]: https://app.datadoghq.com/infrastructure/map?fillby=avg%3Acpuutilization&groupby=availability-zone
[7]: https://app.datadoghq.com/infrastructure
[8]: /es/opentelemetry/collector_exporter/#out-of-the-box-dashboards
[9]: /es/tracing/trace_explorer/trace_view/?tab=hostinfo
[10]: /es/universal_service_monitoring/setup/