---
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: Documentación
  text: Configuración de OpenTelemetry Collector
title: Métricas de Apache Web Server
---

## Información general

{{< img src="/opentelemetry/collector_exporter/apache_metrics.png" alt="Métricas de OpenTelemetry Apache en un dashboard de Apache" style="width:100%;" >}}

El [receptor de Apache][1] permite recopilar métricas de Apache Web Server. Configura el receptor de acuerdo con las especificaciones de la última versión de `apachereceiver`.

Para más información, consulta la documentación del proyecto de OpenTelemetry para el [receptor de Apache][1].

## Configuración

Para recopilar métricas de Apache Web Server con OpenTelemetry para su uso con Datadog:

1. Configura el [receptor de Apache][1] en tu configuración de OpenTelemetry Collector.
2. Asegúrate de que OpenTelemetry Collector está [configurado para exportar a Datadog][4].

Consulta la [documentación del receptor de Apache][1] para obtener información detallada sobre las opciones y requisitos de configuración.

## Datos recopilados

{{< mapping-table resource="apache.csv">}}

Consulta [Asignación de métricas de OpenTelemetry][2] para obtener más información.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/apachereceiver
[2]: /es/opentelemetry/guide/metrics_mapping/
[4]: /es/opentelemetry/setup/collector_exporter/