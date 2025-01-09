---
aliases:
- /opentelemetry/guide/service_entry_spans_mapping/
further_reading:
- link: /opentelemetry/integrations/trace_metrics
  tag: Documentación
  text: Métricas de traza de OpenTelemetry
title: Asignación de las convenciones semánticas de OpenTelemetry a tramos de entrada
  de servicio
---

<div class="alert alert-info">
Esta función está en fase beta. Si tienes algún comentario, ponte en contacto con <a href="/help/">el servicio de soporte de Datadog</a>.
</div>

## Información general
Datadog utiliza [tramos (spans) de entrada de servicio][1] en toda la plataforma para funciones como [métricas de traza][2] y el [Trace Explorer de APM][3]. Esta convención es exclusiva de Datadog, pero se puede asignar desde el atributo [`SpanKind`][4] en OpenTelemetry siguiendo la guía de elección que aparece a continuación.

## Elección de la función
Esta función requiere OTel Collector Contrib v0.100.0 o posterior y Datadog Agent v7.53.0 o posterior. Para elegir la **función beta pública**, activa la opción de configuración según la ruta de ingesta.

{{< tabs >}}
{{% tab "OTel Collector y Exportador de Datadog" %}}

La nueva lógica de identificación del tramo de entrada de servicio puede activarse estableciendo la opción de configuración `traces::compute_top_level_by_span_kind` en true en el [Exportador de Datadog][2] y [el conector de Datadog][1]. Esta opción de configuración debe activarse tanto en el exportador como en el conector si se utilizan ambos componentes.

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/v0.100.0/connector/datadogconnector/examples/config.yaml#L48-L53
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/v0.100.0/exporter/datadogexporter/examples/collector.yaml#L365-L370
{{% /tab %}}
{{% tab "Pipeline de ingesta de OTLP en el Datadog Agent" %}}

La lógica de identificación del nuevo tramo de entrada de servicio puede activarse añadiendo `"enable_otlp_compute_top_level_by_span_kind"` a [apm_config.features][1] en la configuración del Datadog Agent.

[1]: https://github.com/DataDog/datadog-agent/blob/7.53.0/pkg/config/config_template.yaml#L1585-L1591
{{% /tab %}}
{{< /tabs >}}

## Convenciones admitidas

[Las métricas][2] se generan para los tramos de entrada de servicio y los tramos medidos. Estas convenciones de tramo son únicas para Datadog, por lo que los tramos de OpenTelemetry se identifican con la siguiente asignación:
| Convención de OpenTelemetry | Convención de Datadog |
| --- | --- |
| Tramo raíz | Tramo de entrado de servicio |
| Tramo de servidor (`span.kind: server`) | Tramo de entrada de servicio |
| Tramo de consumidor (`span.kind: consumer`) | Tramo de entrada de servicio |
| Tramo de cliente (`span.kind: client`) | Tramo medido |
| Tramo de productor (`span.kind: producer`) | Tramo medido |
| Tramo interno (`span.kind: internal`) | No se generaron métricas de traza |

## Migración

Esta nueva lógica de identificación de tramo de entrada de servicio puede aumentar el número de tramos que generan métricas de traza, lo que puede afectar a los monitores existentes que se basan en métricas de traza. Los usuarios que solo tengan tramos internos verán una disminución en las métricas de traza.

Si dispones de monitores basados en métricas de traza, puedes cambiarlos tras la actualización, ya que este cambio introduce más coherencia en las métricas de traza. Si solo dispones de tramos internos, actualiza tu instrumentación de acuerdo con la tabla anterior para recibir métricas de traza y tramos de entrada de servicio.

[`SpanKind`][4] se establece normalmente cuando se crea un tramo, pero también puede actualizarse utilizando el [procesador de transformación][5] en el OpenTelemetry Collector para controlar la asignación anterior. Por ejemplo, si deseas métricas de traza para un tramo interno, la siguiente configuración transforma un tramo interno con `http.path: "/health"` en un tramo de cliente:
```yaml
  transform:
    trace_statements:
      - context: span
        statements:
          - set(kind.string, "Client") where kind.string == "Internal" and attributes["http.path"] == "/health"
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/glossary/#service-entry-span
[2]: https://docs.datadoghq.com/es/opentelemetry/integrations/trace_metrics/
[3]: https://docs.datadoghq.com/es/tracing/trace_explorer
[4]: https://opentelemetry.io/docs/specs/otel/trace/api/#spankind
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/transformprocessor/README.md