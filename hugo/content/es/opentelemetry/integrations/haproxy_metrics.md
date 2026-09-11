---
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: Documentación
  text: Configuración de OpenTelemetry Collector
title: Métricas de HAProxy
---

## Información general

{{< img src="/opentelemetry/collector_exporter/haproxy_metrics.png" alt="Métricas de OpenTelemetry HAProxy en un dashboard de HAProxy" style="width:100%;" >}}

El [receptor de HAProxy][1] permite recopilar métricas de HAProxy y acceder al dashboard de [Información general de HAProxy][4]. Configura el receptor de acuerdo con las especificaciones de la última versión del `haproxyreceiver`.

Para más información, consulta la documentación del proyecto de OpenTelemetry para el [receptor de HAProxy][1].

## Configuración

Para recopilar métricas de HAProxy con OpenTelemetry para su uso con Datadog:

1. Configura el [receptor de HAProxy][1] en tu configuración de OpenTelemetry Collector.
2. Asegúrate de que OpenTelemetry Collector está [configurado para exportar a Datadog][5].

Consulta la [documentación del receptor de HAProxy][1] para conocer las opciones y requisitos detallados de configuración.

## Datos recopilados

{{< mapping-table resource="haproxy.csv">}}

Consulta [Asignación de métricas de OpenTelemetry][2] para obtener más información.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/haproxyreceiver
[2]: /es/opentelemetry/guide/metrics_mapping/
[4]: https://app.datadoghq.com/dash/integration/28/haproxy---overview
[5]: /es/opentelemetry/setup/collector_exporter/