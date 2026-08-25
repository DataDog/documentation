---
aliases:
- /es/opentelemetry/guide/migrate/collector_0_120_0
further_reading:
- link: /opentelemetry/guide/switch_from_processor_to_connector
  tag: Documentación
  text: Migrar a OpenTelemetry Collector versión 0.95.0 y posteriores
- link: /opentelemetry/integrations/collector_health_metrics
  tag: Documentación
  text: Dashboard de estado de OpenTelemetry Collector
- link: /tracing/troubleshooting/agent_apm_metrics
  tag: Documentación
  text: Dashboard de APM del Datadog Trace Agent
- link: https://prometheus.io/docs/prometheus/latest/migration/
  tag: Sitio externo
  text: Guía de migración de Prometheus 3.0
title: Migración a OpenTelemetry Collector versión 0.120.0+
---

[OTel Collector Contrib versión 0.120.0][1] introdujo cambios radicales en los nombres de métrica como parte de la actualización a Prometheus 3.0. Tras actualizar a esta versión de OpenTelemetry Collector, es posible que observes diferencias en los valores de métrica que se muestran en Datadog.

<div class="alert alert-info">Estos cambios radicales no han sido introducidos por Datadog ni están directamente relacionados con él. Afectan a todos los usuarios de OpenTelemetry que utilizan Prometheus. Para obtener una lista completa de los cambios, consulta la <a href="https://github.com/open-telemetry/opentelemetry-collector-contrib/pull/36873">actualización</a> del receptor de Prometheus en el Collector o la <a href="https://prometheus.io/docs/prometheus/latest/migration/">guía de migración</a> de Prometheus 3.0.</div>

## Cambios en los nombres de métricas internas del Collector

[Las métricas internas del Collector][2] enviadas utilizando la última versión del Collector tienen los siguientes cambios:

- Los puntos (`.`) en las métricas internas del Collector y los atributos de recursos extraídos por Prometheus ya no se sustituyen por guiones bajos (`_`) de forma predeterminada.
- El prefijo `otelcol_` ya no se añade a los nombres de métrica.

Por ejemplo:

| Antes de 0.120.0                                    | Después de 0.120.0                             |
|---------------------------------------------------|-------------------------------------------|
| `otelcol_datadog_trace_agent_otlp_traces`         | `datadog.trace_agent.otlp.traces`         |
| `otelcol_datadog_trace_agent_otlp_spans`          | `datadog.trace_agent.otlp.spans`          |
| `otelcol_datadog_trace_agent_otlp_payload`        | `datadog.trace_agent.otlp.payload`        |
| `otelcol_datadog_trace_agent_trace_writer_events` | `datadog.trace_agent.trace_writer.events` |

Como resultado, Datadog ha actualizado dos dashboards predefinidos afectados por esta actualización:

- [Dashboard de estado del OpenTelemetry Collector](#opentelemetry-collector-health-dashboard)
- [Dashboard de APM del Datadog Trace Agent](#apm-datadog-trace-agent-dashboard)

### Dashboard de estado de OpenTelemetry Collector

Las consultas sobre el [dashboard de estado de OpenTelemetry Collector][3] se modificaron para que fueran compatibles con nombres de métrica enviados desde versiones más antiguas (< 0.120.0) y más recientes (0.120.0+) del Collector.

Si estás utilizando una versión clonada de este dashboard o tienes monitores que consultan nombres de métrica de versiones anteriores del Collector, puede que necesites actualizarlos manualmente utilizando la [función equiv_otel()][6].

{{< img src="/opentelemetry/guide/migration/collector_health.png" alt="Dashboard de estado del OpenTelemetry Collector que muestra consultas compatibles" style="width:100%;" >}}

### Dashboard de APM del Datadog Trace Agent

Las consultas en el [dashboard de APM del Datadog Trace Agent][4] se actualizaron con filtros para excluir las fuentes `datadogexporter` y `datadogconnector` para evitar colisiones de métricas con fuentes de OpenTelemetry que emiten los mismos nombres de métrica. Este dashboard está diseñado para mostrar solo datos del Trace Agent y la actualización garantiza que los datos de estas fuentes no se mezclen con los de OpenTelemetry.

Solo se ha actualizado la plantilla del dashboard predefinido. Si estás utilizando una versión clonada de este dashboard, puede que tengas que actualizar manualmente las consultas en dashboards personalizados para excluir las fuentes `datadogexporter` y `datadogconnector` utilizando:

```text
source NOT IN (datadogexporter, datadogconnector)
```

## Cambios en los valores predeterminados del lector de Prometheus Server

<div class="alert alert-info">Si utilizas las configuraciones por defecto para los parámetros de telemetría del OpenTelemetry Collector, no te verás afectado por estos cambios.</div>

Solo te verás afectado si has configurado explícitamente el lector de Prometheus con ajustes personalizados, por ejemplo:

```yaml
service:
  telemetry:
    metrics:
      level: detailed
      readers:
        - pull:
            exporter:
              prometheus:
                host: localhost
                port: 8888
```

Si te ves afectado por estos cambios, es posible que observes diferencias en los nombres de métrica, como cambios de sufijo y adiciones de unidades.

Para volver al comportamiento anterior, añade estos tres parámetros a tu configuración actual del lector de Prometheus:

```yaml
without_scope_info: true
without_type_suffix: true
without_units: true
```

Si tienes preguntas o necesitas ayuda, ponte en contacto con el [soporte de Datadog][5].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.120.0
[2]: https://opentelemetry.io/docs/collector/internal-telemetry/
[3]: /es/opentelemetry/integrations/collector_health_metrics/
[4]: /es/tracing/troubleshooting/agent_apm_metrics/
[5]: /es/help/
[6]: /es/opentelemetry/guide/combining_otel_and_datadog_metrics/