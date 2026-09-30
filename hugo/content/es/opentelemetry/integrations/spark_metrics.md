---
further_reading:
- link: /opentelemetry/setup/collector_exporter/
  tag: Documentación
  text: Configuración de OpenTelemetry Collector
title: Métricas de Apache Spark
---

## Información general

{{< img src="/opentelemetry/collector_exporter/spark_metrics.png" alt="Métricas de OpenTelemetry Apache Spark en un dashboard de Spark" style="width:100%;" >}}

El [receptor de Apache Spark][1] permite recopilar métricas de Apache Spark y acceder al dashboard de [Información general de Spark][4]. Configura el receptor según las especificaciones de la última versión del `apachesparkreceiver`.

Para más información, consulta la documentación del proyecto de OpenTelemetry para el [receptor de Apache Spark][1].

## Configuración

Para recopilar métricas de Apache Spark con OpenTelemetry para su uso con Datadog:

1. Configura el [receptor de Apache Spark][1] en tu configuración de OpenTelemetry Collector.
2. Asegúrate de que el OpenTelemetry Collector está [configurado para exportar a Datadog][3].

Consulta la [documentación del receptor de Apache Spark][1] para obtener información detallada sobre las opciones y requisitos de configuración.

## Datos recopilados

{{< mapping-table resource="apachespark.csv">}}

Consulta [Asignación de métricas de OpenTelemetry][2] para obtener más información.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/apachesparkreceiver
[2]: /es/opentelemetry/guide/metrics_mapping/
[3]: /es/opentelemetry/setup/collector_exporter/
[4]: https://app.datadoghq.com/screen/integration/95/spark---overview