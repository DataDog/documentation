---
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: Documentación
  text: Configuración de OpenTelemetry Collector
title: Métricas de NGINX
---

## Información general

{{< img src="/opentelemetry/collector_exporter/nginx_metrics.png" alt="Métricas de OpenTelemetry NGINX en un dashboard de NGINX" style="width:100%;" >}}

El [receptor de NGINX][1] permite recopilar métricas de NGINX y acceder al dashboard de [información general de NGINX][4]. Configura el receptor de acuerdo con las especificaciones de la última versión de `nginxreceiver`.

Para más información, consulta la documentación del proyecto de OpenTelemetry para el [receptor de NGINX][1].

## Configuración

Para recopilar métricas de NGINX con OpenTelemetry para su uso con Datadog:

1. Configura el [receptor de NGINX][1] en tu configuración de OpenTelemetry Collector.
2. Asegúrate de que OpenTelemetry Collector está [configurado para exportar a Datadog][5].

Consulta la [documentación del receptor de NGINX][1] para obtener información detallada sobre las opciones y requisitos de configuración.

## Datos recopilados

{{< mapping-table resource="nginx.csv">}}

Consulta [Asignación de métricas de OpenTelemetry][2] para obtener más información.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/nginxreceiver
[2]: /es/opentelemetry/guide/metrics_mapping/
[4]: https://app.datadoghq.com/dash/integration/21/nginx---overview
[5]: /es/opentelemetry/setup/collector_exporter/