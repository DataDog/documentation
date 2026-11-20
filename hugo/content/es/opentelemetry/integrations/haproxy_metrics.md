---
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: Documentación
  text: Configuración del OpenTelemetry Collector
title: Métricas de HAProxy
---
## Descripción general {#overview}

{{< img src="/opentelemetry/collector_exporter/haproxy_metrics.png" alt="Métricas de HAProxy de OpenTelemetry en un dashboard de HAProxy" style="width:100%;" >}}

El [receptor de HAProxy][1] recopila métricas de HAProxy que alimentan el dashboard [HAProxy Overview][4].

Para obtener más información, consulte la documentación del proyecto OpenTelemetry para el [receptor de HAProxy][1].

## Configuración {#setup}

Este ejemplo utiliza identificadores de componentes de OpenTelemetry Collector Contrib v0.154.0. Para otras versiones o distribuciones, utilice los identificadores que admita su distribución.

Agregue las siguientes líneas a su configuración de Collector. El receptor no tiene un punto de conexión predeterminado, así que establezca `endpoint` en la URL de su página de estadísticas de HAProxy o en la ruta a su socket de estadísticas, como `/var/run/haproxy.sock`. Limite el acceso a la página o al socket de estadísticas, por ejemplo a localhost, porque muestra detalles sobre sus servidores.

La sección `metrics` activa métricas que el receptor no recopila de forma predeterminada. El dashboard de HAProxy las utiliza.

```yaml
receivers:
  haproxy:
    endpoint: http://127.0.0.1:8080/stats
    metrics:
      haproxy.connections.total:
        enabled: true
      haproxy.sessions.total:
        enabled: true
      haproxy.failed_checks:
        enabled: true
      haproxy.clients.canceled:
        enabled: true
      haproxy.compression.bypass:
        enabled: true
      haproxy.compression.count:
        enabled: true
      haproxy.compression.input:
        enabled: true
      haproxy.compression.output:
        enabled: true
```

Agregue `haproxy` a la lista `receivers` del pipeline de métricas en su configuración. Mantenga los procesadores que ya están en ese pipeline. La ingesta de métricas OTLP de Datadog solo acepta métricas delta, y este receptor produce sumas acumulativas, por lo que el pipeline necesita `cumulativetodelta`. La [configuración de Collector recomendada][5] lo incluye.

Para ver todas las opciones de configuración, consulte la [documentación del receptor de HAProxy][1].

## Datos recopilados {#data-collected}

{{< mapping-table resource="haproxy.csv">}}

Para ver la asignación completa entre los nombres de métricas de OpenTelemetry y Datadog, consulte [Asignación de métricas de OpenTelemetry][2].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/haproxyreceiver
[2]: /es/opentelemetry/guide/metrics_mapping/
[4]: https://app.datadoghq.com/dash/integration/28/haproxy---overview
[5]: /es/opentelemetry/setup/collector_exporter/