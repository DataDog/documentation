---
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: Documentación
  text: Configuración de OpenTelemetry Collector
title: Métricas de IIS
---

## Información general

{{< img src="/opentelemetry/collector_exporter/iis_metrics.png" alt="Métricas de OpenTelemetry IIS en un dashboard de IIS" style="width:100%;" >}}

El [Receptor IIS][1] permite recopilar métricas de IIS (Internet Information Services) y acceder al dashboard de [Información general de IIS][4]. Configura el receptor de acuerdo con las especificaciones de la última versión del `iisreceiver`.

Para más información, consulta la documentación del proyecto de OpenTelemetry para el [receptor de IIS][1].

## Configuración

Para recopilar métricas de IIS con OpenTelemetry para su uso con Datadog:

1. Configura el [receptor de IIS][1] en tu configuración de OpenTelemetry Collector.
2. Asegúrate de que OpenTelemetry Collector está [configurado para exportar a Datadog][5].

Consulta la [documentación del receptor de IIS][1] para obtener información detallada sobre las opciones y requisitos de configuración.

## Datos recopilados

{{< mapping-table resource="iis.csv">}}

Consulta [Asignación de métricas de OpenTelemetry][2] para obtener más información.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/iisreceiver
[2]: /es/opentelemetry/guide/metrics_mapping/
[4]: https://app.datadoghq.com/screen/integration/243/iis---overview
[5]: /es/opentelemetry/setup/collector_exporter/