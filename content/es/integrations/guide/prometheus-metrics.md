---
aliases:
- /es/integrations/faq/how-to-collect-metrics-with-sql-stored-procedure/
further_reading:
- link: /integrations/openmetrics/
  tag: Documentación
  text: Más información sobre la integración de OpenMetrics
- link: /agent/kubernetes/prometheus/
  tag: Documentación
  text: Recopilación de métricas Kubernetes Prometheus y OpenMetrics
title: Asignación de métricas de Prometheus a métricas de Datadog
---

## Información general

En esta página se muestra cómo las métricas de checks de Prometheus u OpenMetrics apuntan a los tipos de métricas de Datadog existentes.

## Tipos de métricas de Prometheus y OpenMetrics

* `counter`: Métrica acumulativa que representa un único contador monotónicamente creciente, cuyo valor sólo puede aumentar o volver a cero.
* `gauge`: Métrica que representa un único valor numérico, que puede aumentar y disminuir arbitrariamente.
* `histogram`: Muestrea las observaciones y los recuentos en buckets configurables. También proporciona una suma de todos los valores observados.
* `summary`: Similar a `histogram`. Muestrea observaciones, proporciona una suma de todos los valores observados y calcula cuantiles configurables de un periodo temporal deslizante.

## Cómo se apuntan métricas de Prometheus/OpenMetrics a métricas de Datadog

Para obtener más información, consulta los [tipos de métricas de OpenMetrics][2] y los  [tipos de métricas de Datadog][3].

{{< tabs >}}
{{% tab "Versión más reciente" %}}


| Tipo de métrica | OpenMetrics | Datadog | 
| --- | --- | --- |
| [counter][110] | `counter` | `count` |
| [gauge][111] | `gauge` | `gauge` |
| [histogram][112] | `_count`, `_sum`, `_bucket` | Los valores `_count`, `_sum` y `_bucket` del histograma se asignan cada uno al tipo `count` de Datadog e incluyen un sufijo `.count`, `.sum` y `.bucket`, respectivamente. |
| [summary][113] | `_count`, `_sum`, `_created` | Los valores `_count` y `_sum` se asignan al tipo `count` de Datadog e incluyen un sufijo `.count` y `.sum` en sus nombres, respectivamente. Las muestras de cuantiles se asignan a una métrica de tipo `gauge` con el sufijo `.quantile`. | 

### Histograma

Para [`histogram` de Prometheus/OpenMetrics][104], los valores `_count`, `_sum` y `_bucket` del histograma se asignan al tipo `count` de Datadog e incluyen un sufijo `.count`, `.sum` y `.bucket` en sus nombres, respectivamente.

Si el parámetro `histogram_buckets_as_distributions` es `true`, las muestras de `_bucket` se agregan en una `distribution` de Datadog. Las [métricas de distribución de Datadog][108] se basan en el [algoritmo DDSketch][109] y permiten agregaciones estadísticas más avanzadas, como los cuantiles. Para obtener más información, consulta la [publicación sobre OpenMetrics y las métricas de distribución][105] del blog de ingeniería de Datadog.

`collect_counters_with_distributions` puede utilizarse para enviar los valores `_count` y `_sum` como `count` junto con la distribución.


### Resumen

Para [`summary` de Prometheus/OpenMetrics][107], los valores `_count` y `_sum` se asignan al tipo `count` de Datadog e incluyen un sufijo `.count` y `.sum` en sus nombres, respectivamente. Las muestras de cuantiles se asignan a un tipo de métrica `gauge` con el sufijo `.quantile`.

[101]: https://prometheus.io/docs/concepts/metric_types/#gauge
[102]: https://prometheus.io/docs/concepts/metric_types/#counter
[103]: /es/metrics/custom_metrics/agent_metrics_submission/?tab=count#monotonic_count
[104]: https://prometheus.io/docs/concepts/metric_types/#histogram
[105]: https://www.datadoghq.com/blog/whats-next-monitoring-kubernetes/#distribution-metrics
[107]: https://prometheus.io/docs/concepts/metric_types/#counter
[108]: /es/metrics/distributions/
[109]: https://www.datadoghq.com/blog/engineering/computing-accurate-percentiles-with-ddsketch/
[110]: https://prometheus.io/docs/concepts/metric_types/#gauge
[111]: https://prometheus.io/docs/concepts/metric_types/#counter
[112]: /es/integrations/guide/prometheus-metrics/?tab=latestversion#histogram
[113]: /es/integrations/guide/prometheus-metrics/?tab=latestversion#summary

{{% /tab %}}
{{% tab "Versión heredada" %}}
### Contador

Por defecto, [`counter` de Prometheus/OpenMetrics ][101] corresponde a `count` de Datadog.

Sin embargo, si el parámetro `send_monotonic_counter` es `false`, entonces esta métrica se envía como `gauge`.

### Indicador

[`gauge` de Prometheus/OpenMetrics ][103] corresponde a `gauge` de Datadog.

### Histograma

Para [`histogram` de Prometheus/OpenMetrics][104], los valores `_count` y `_sum` del histograma se asignan al tipo `gauge` de Datadog e incluyen un sufijo `.count` y `.sum`  en sus nombres, respectivamente.

Si el parámetro `send_histograms_buckets` es `true`, las muestras de `_bucket` se envían a Datadog con un sufijo `.bucket` y también se asignan a  `gauge` de Datadog, por defecto.

Si el parámetro `send_distribution_counts_as_monotonic` se configura como `true`, las métricas `_count` y `_bucket` se envíen como tipo `count`. Configurar `send_distribution_sums_as_monotonic` provoca el mismo resultado en las métricas `_sum`.

Si el parámetro `send_distribution_buckets` es `true`, las muestras de `_bucket` se agregan en una `distribution` de Datadog. Las [métricas de distribución de Datadog][108] se basan en el [algoritmo DDSketch][107] y permiten agregaciones estadísticas más avanzadas, como los cuantiles. Para obtener más información, consulta la [publicación sobre OpenMetrics y las métricas de distribución][106] del blog de ingeniería de Datadog.


### Resumen

Para [`summary` de Prometheus/OpenMetrics][105], los valores `_count` y `_sum` se asignan al tipo `gauge` de Datadog e incluyen un sufijo `.count` y `.sum` en sus nombres, respectivamente. Las muestras de cuantiles se asignan a un tipo de métrica `gauge` con el sufijo `.quantile`.

Si el parámetro `send_distribution_counts_as_monotonic` se configura como `true`, las métricas `_count` y `_bucket` se envíen como tipo `count`. Configurar `send_distribution_sums_as_monotonic` provoca el mismo resultado en las métricas `_sum`.

[101]: https://prometheus.io/docs/concepts/metric_types/#counter
[102]: /es/metrics/custom_metrics/agent_metrics_submission/?tab=count#monotonic_count
[103]: https://prometheus.io/docs/concepts/metric_types/#gauge
[104]: https://prometheus.io/docs/concepts/metric_types/#histogram
[105]: https://prometheus.io/docs/concepts/metric_types/#summary
[106]: https://www.datadoghq.com/blog/whats-next-monitoring-kubernetes/#distribution-metrics
[107]: https://www.datadoghq.com/blog/engineering/computing-accurate-percentiles-with-ddsketch/
[108]: /es/metrics/distributions/

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">Todas las métricas de <code>recuentos</code> son procesadas por el Agent como <em>recuentos monotónicos</em>, lo que significa que el Agent envía efectivamente la diferencia entre valores sin procesar consecutivos. Para obtener más información, consulta <a href="/metrics/custom_metrics/agent_metrics_submission/?tab=count#monotonic_count">Envío de métricas: Check personalizado del Agent</a>.</div>

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/kubernetes/prometheus/
[2]: https://github.com/OpenObservability/OpenMetrics/blob/main/specification/OpenMetrics.md#metric-types
[3]: /es/metrics/types/