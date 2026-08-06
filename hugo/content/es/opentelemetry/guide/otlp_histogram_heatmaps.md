---
further_reading:
- link: /metrics/open_telemetry/otlp_metric_types
  tag: Documentación
  text: Tipos de métricas OTLP
- link: /opentelemetry/
  tag: Documentación
  text: Soporte de OpenTelemetry en Datadog
title: Visualización de histogramas OTLP como mapas de calor
---

## Información general

El Protocolo de OpenTelemetry (OTLP) admite el envío de histogramas OTLP, un tipo de métrica que comprime la información de un conjunto de mediciones, al proporcionar estadísticas agregadas, como suma, recuento, mínimo y máximo. Los histogramas OTLP también cuentan cuántas de estas mediciones se ubican en buckets configurables por el usuario.

Puedes visualizar este tipo de datos como un [mapa de calor][5] en Datadog siguiendo los pasos de esta página.

**Nota**: El tipo relacionado Histograma exponencial OTLP también se puede mostrar como un mapa de calor, ya que se convierte en una distribución. Más información sobre distribuciones en la [página dedicada a Distribuciones][4].

## Configuración

Esta guía asume que ya tienes una [configuración en funcionamiento para el envío de métricas de OpenTelemetry a Datadog][1].

### Configuración del SDK de OpenTelemetry

Si estás generando métricas desde un SDK de OpenTelemetry, realiza los siguientes pasos para la configuración:

1. [Configura el SDK al que estás enviando Histogramas OTLP con temporalidad delta][2]. Esto hace que el mínimo y el máximo estén disponibles para widget de mapa de calor.
2. Conprueba si deseas anular los [límites de bucket por defecto][3] de tu agregación. **Nota**: Cada bucket adicional se considera una métrica personalizada separada.

Para métricas procedentes de otras fuentes, asegúrate, si es posible, de que lleguen como Histogramas OTLP delta con los campos mínimo y máximo establecidos.

### Configuración del Exportador de Datadog o del Datadog Agent

Configura el modo de histograma y activa las métricas de agregación en tu Exportador de Datadog o Datadog Agent.

{{< tabs >}}
{{% tab "Exportador de Datadog (OpenTelemetry Collector)" %}}

En el archivo `collector.yaml` para el exportador de Datadog, configura el modo de histograma en `counters` y activa las métricas de agregación con el indicador `send_aggregation_metrics`.

```yaml
exporters:
  datadog:
    metrics:
      histograms:
        mode: counters
        send_aggregation_metrics: true
```

**Nota**: `send_aggregation_metrics` está disponible a partir del Exportador de Datadog v0.75.0. Si tienes una versión anterior, utiliza el indicador `send_count_sum_metrics`. El mínimo y el máximo no aparecen en versiones anteriores.

{{% /tab %}}
{{% tab "Datadog Agent" %}}

En la sección `otlp_config`, configura el modo de histograma en `counters` y habilita las métricas de agregación con el indicador `send_aggregation_metrics`.

```yaml
otlp_config:
  metrics:
    histograms:
      mode: counters
      send_aggregation_metrics: true
```

**Nota**: `send_aggregation_metrics` está disponible a partir del Datadog Agent v6.45.0/v7.45.0. Si tienes una versión anterior, utiliza el indicador `send_count_sum_metrics` en su lugar. El mínimo y el máximo no aparecen en versiones anteriores.

{{% /tab %}}
{{< /tabs >}}


### Configuración del widget de mapa de calor

El [widget de mapa de calor][5] utiliza el conjunto de métricas `<YOUR METRIC NAME>.bucket` generado por el exportador de Datadog o Datadog Agent, cada una correspondiente a un bucket de histograma diferente. Para visualizar tu histograma como un mapa de calor:

1. Selecciona `<YOUR METRIC NAME>.bucket` como métrica a visualizar.
2. Elige la opción `pre-binned data` en el menú `distributions of`.

Ahora puedes ver tu histograma OTLP como un widget de mapa de calor.

## Compatibilidad con OpenMetrics

El [check OpenMetrics del Datadog Agent][6] también es compatible con la opción del widget de mapa de calor de datos preagrupados. Si deseas enviar métricas al check OpenMetrics directamente sin convertir a OpenTelemetry, activa los indicadores `collect_histogram_buckets` y `non_cumulative_histogram_buckets` en tu instancia para asegurarte de que los datos se envían de forma compatible a Datadog.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/opentelemetry/otel_metrics
[2]: /es/opentelemetry/guide/otlp_delta_temporality
[3]: https://opentelemetry.io/docs/reference/specification/metrics/sdk/#explicit-bucket-histogram-aggregation
[4]: /es/metrics/distributions
[5]: /es/dashboards/widgets/heatmap
[6]: /es/integrations/openmetrics