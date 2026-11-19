---
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: Documentación
  text: Configuración del OpenTelemetry Collector
title: Métricas de IIS
---
## Descripción general {#overview}

{{< img src="/opentelemetry/collector_exporter/iis_metrics.png" alt="Métricas de IIS de OpenTelemetry en un dashboard de IIS" style="width:100%;" >}}

El [receptor de IIS][1] recopila métricas de IIS (Internet Information Services) que alimentan el dashboard [IIS Overview][4].

Para obtener más información, consulte la documentación del proyecto OpenTelemetry para el [receptor de IIS][1].

## Configuración {#setup}

Este ejemplo utiliza identificadores de componentes de OpenTelemetry Collector Contrib v0.154.0. Para otras versiones o distribuciones, utilice los identificadores que admita su distribución.

El receptor de IIS lee contadores de rendimiento de Windows, por lo que solo se ejecuta en Windows. Ejecute el Collector en el servidor de IIS.

El receptor no tiene configuraciones obligatorias. Agregue las siguientes líneas a su configuración de Collector:

```yaml
receivers:
  iis:
```

Agregue `iis` a la lista `receivers` del pipeline de métricas en su configuración. Mantenga los procesadores que ya se encuentran en ese pipeline. La ingesta de métricas OTLP de Datadog solo acepta métricas delta, y este receptor genera sumas acumulativas, por lo que el pipeline necesita `cumulativetodelta`. La [configuración recomendada del Collector][5] lo incluye.

Para ver todas las opciones de configuración, consulte la [documentación del receptor de IIS][1].

## Datos recopilados {#data-collected}

{{< mapping-table resource="iis.csv">}}

Para ver la asignación completa entre los nombres de métricas de OpenTelemetry y Datadog, consulte [Asignación de métricas de OpenTelemetry][2].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/iisreceiver
[2]: /es/opentelemetry/guide/metrics_mapping/
[4]: https://app.datadoghq.com/dash/integration/243/iis---overview
[5]: /es/opentelemetry/setup/collector_exporter/