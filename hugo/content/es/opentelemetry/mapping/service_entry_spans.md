---
aliases:
- /es/opentelemetry/guide/service_entry_spans_mapping/
- /es/opentelemetry/schema_semantics/service_entry_spans/
further_reading:
- link: /opentelemetry/integrations/trace_metrics
  tag: Documentación
  text: Métricas de traza de OpenTelemetry
title: Mapeo de convenciones semánticas de OpenTelemetry a tramos de entrada de servicio
---
## Descripción general {#overview}
Datadog utiliza [tramos de entrada de servicio][1] en toda la plataforma para funciones como [métricas de traza][2] y el [APM Trace Explorer][3]. Esta convención es exclusiva de Datadog, pero se puede mapear desde el atributo [`SpanKind`][4] en OpenTelemetry siguiendo la guía opt-in a continuación.

## Requisitos {#requirements}

- OTel Collector Contrib v0.100.0 o superior
- Datadog Agent v7.53.0 o superior

## Configuración {#setup}

Habilite la opción de configuración según su ruta de ingesta:

{{< tabs >}}
{{% tab "OTel Collector y Datadog Exporter" %}}

La nueva lógica de identificación de tramos de entrada de servicio se puede habilitar configurando la opción `traces::compute_top_level_by_span_kind` en true en el [Datadog exporter][2] y el [Datadog connector][1]. Esta opción de configuración debe habilitarse tanto en el Datadog exporter como en el Datadog connector si se están utilizando ambos componentes.

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/v0.100.0/connector/datadogconnector/examples/config.yaml#L48-L53
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/v0.100.0/exporter/datadogexporter/examples/collector.yaml#L365-L370
{{% /tab %}}
{{% tab "Canalización de ingesta OTLP en el Datadog Agent" %}}

La nueva lógica de identificación de tramos de entrada de servicio se puede habilitar agregando `"enable_otlp_compute_top_level_by_span_kind"` a [apm_config.features][1] en la configuración del Datadog Agent.

[1]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_linux.yaml.example
{{% /tab %}}
{{< /tabs >}}

## Convenciones admitidas {#supported-conventions}

Las [Métricas de traza][2] se generan para tramos de entrada de servicio y tramos medidos. Estas convenciones de tramo son exclusivas de Datadog, por lo que los tramos de OpenTelemetry se identifican con el siguiente mapeo:
| Convención de OpenTelemetry | Convención de Datadog |
| --- | --- |
| Tramo raíz | Tramo de entrada de servicio |
| Tramo de servidor (`span.kind: server`) | Tramo de entrada de servicio |
| Tramo de consumidor (`span.kind: consumer`) | Tramo de entrada de servicio |
| Tramo de cliente (`span.kind: client`) | Tramo medido |
| Tramo de productor (`span.kind: producer`) | Tramo medido |
| Tramo interno (`span.kind: internal`) | No se generaron métricas de traza |

## Migración {#migration}

Esta nueva lógica de identificación de tramos de entrada de servicio puede aumentar la cantidad de tramos que generan métricas de traza, lo cual puede afectar a los monitores existentes que se basan en métricas de traza. Los usuarios que solo tengan tramos internos verán una disminución en las métricas de traza.

Si tiene monitores existentes basados en métricas de traza, puede actualizarlos después de la actualización, ya que este cambio introduce una mayor consistencia en las métricas de traza. Si solo tiene tramos internos, actualice su instrumentación de acuerdo con la tabla anterior para recibir métricas de traza y tramos de entrada de servicio.

[`SpanKind`][4] generalmente se establece cuando se crea un tramo, pero también se puede actualizar mediante el uso del [transform processor][5] en el OpenTelemetry Collector para controlar la asignación anterior. Por ejemplo, si se desean métricas de traza para un tramo interno, la siguiente configuración transforma un tramo interno con `http.path: "/health"` en un tramo de cliente:

```yaml
  transform:
    trace_statements:
      - context: span
        statements:
          - set(kind.string, "Client") where kind.string == "Internal" and attributes["http.path"] == "/health"
```

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/glossary/#service-entry-span
[2]: https://docs.datadoghq.com/es/opentelemetry/integrations/trace_metrics/
[3]: https://docs.datadoghq.com/es/tracing/trace_explorer
[4]: https://opentelemetry.io/docs/specs/otel/trace/api/#spankind
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/transformprocessor/README.md