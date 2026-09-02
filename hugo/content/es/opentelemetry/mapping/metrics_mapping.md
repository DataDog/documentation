---
aliases:
- /es/opentelemetry/guide/metrics_mapping/
- /es/opentelemetry/schema_semantics/metrics_mapping/
disable_sidebar: true
further_reading:
- link: /metrics/open_telemetry/otlp_metric_types
  tag: Documentación
  text: Tipos de métricas OTLP
- link: /opentelemetry/guide/semantic_mapping
  tag: Documentación
  text: Asignación de atributos de recursos de OpenTelemetry a Datadog
title: Asignación de métricas de OpenTelemetry
---

## Información general

Datadog se basa en métricas y etiquetas que siguen patrones de nomenclatura específicos. Por lo tanto, Datadog asigna las métricas entrantes de OpenTelemetry al formato de métrica apropiado de Datadog. Este proceso de asignación puede crear métricas adicionales, pero éstas no afectan a la facturación de Datadog.

<div class="alert alert-info"><strong>¿Deseas unificar las métricas de OpenTelemetry y Datadog en tus consultas?</strong> Aprende a <a href="/metrics/open_telemetry/query_metrics">consultar las métricas de Datadog y OpenTelemetry</a> desde el editor de consultas de métricas.</div>

## Cómo aparecen las métricas de OpenTelemetry en Datadog

Para diferenciar las métricas del receptor de las [métricas de host][12] del OpenTelemetry Collector y el Datadog Agent, Datadog antepone `otel.` a cualquier métrica recibida que empiece por `system.` o `process.`. Datadog no recomienda supervisar la misma infraestructura tanto con el Datadog Agent como con el OpenTelemetry Collector.

<div class="alert alert-info">Datadog está evaluando formas de mejorar la experiencia de métricas de OpenTelemetry Protocol, incluida la posible eliminación de este prefijo <code>otel</code>.</div>

## Asignación de métricas

La siguiente tabla muestra las asignaciones de métricas para varias integraciones. Utiliza los controles de búsqueda y filtrado para encontrar las correspondencias de una integración específica.

Para más información, consulta [integraciones de OpenTelemetry][11].

{{< multifilter-search resource="_data/semantic-core/unified_semantic_core.json">}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/hostmetricsreceiver
[2]: /es/opentelemetry/otel_collector_datadog_exporter/
[3]: /es/universal_service_monitoring/setup/
[4]: /es/opentelemetry/guide/semantic_mapping/
[5]: https://app.datadoghq.com/infrastructure/map?fillby=avg%3Acpuutilization&groupby=availability-zone
[6]: https://app.datadoghq.com/infrastructure
[7]: /es/opentelemetry/collector_exporter/#out-of-the-box-dashboards
[8]: /es/tracing/trace_explorer/trace_view/?tab=hostinfo
[9]: /es/opentelemetry/otel_collector_datadog_exporter/?tab=onahost#containers-overview-dashboard
[10]: /es/tracing/trace_explorer/trace_view/
[11]: /es/opentelemetry/integrations/
[12]: /es/opentelemetry/integrations/host_metrics/