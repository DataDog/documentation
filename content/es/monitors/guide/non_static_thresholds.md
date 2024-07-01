---
further_reading:
- link: /monitors/types/composite/
  tag: Documentación
  text: Monitor compuesto
- link: /monitors/types/anomaly/
  tag: Documentación
  text: Monitor de anomalías
kind: Guía
title: Cómo monitorizar umbrales no estáticos
---

## Información general

Un monitor de métricas típico activa una alerta si una única métrica supera un umbral específico. Por ejemplo, puedes configurar una alerta para que se active si el uso del disco supera el 80%. Este enfoque es eficiente para muchos casos de uso, pero ¿qué ocurre cuando el umbral es una variable en lugar de un número absoluto?

Los monitores con la tecnología Watchdog (a saber, de [anomalías][1] y [outliers][2]) son particularmente útiles cuando no hay una definición explícita de que tu métrica está desviada. Sin embargo, cuando sea posible, deberías utilizar monitores normales con condiciones de alerta adaptadas para maximizar la precisión y minimizar el tiempo de alerta para tu caso de uso específico.

Esta guía cubre casos de uso comunes de alertas sobre umbrales no estáticos:
  - [Alerta sobre una métrica que se desvía, fuera de las **variaciones temporarias**](#seasonal-threshold) 
  - [Alerta basada en el valor de otra métrica de **referencia**](#reference-threshold)

## Umbral temporario

### Contexto

Eres responsable de un equipo encargado de un sitio web de comercio electrónico y quieres:
- recibir alertas de tráfico inesperadamente bajo en tu página de inicio
- captar incidentes más localizados como los que afectan a los proveedores públicos de Internet
- anticipar situaciones de fallo desconocidas

El tráfico de tu sitio web varía de la noche al día y de los días laborables a los fines de semana. No existe un número absoluto para cuantificar lo que significa "inesperadamente bajo". Sin embargo, el tráfico sigue un patrón predecible en el que puedes considerar una diferencia del 10% como un indicador fiable de un problema, como por ejemplo un incidente localizado que afecta a los proveedores de Internet pública.

{{< img src="monitors/guide/non_static_thresholds/seasonal_line_graph.png" alt="Line graph of a periodic or seasonal metric" (Gráfico de líneas de una métrica periódica o temporaria) style="width:100%;" >}}

### Monitor

Tu equipo mide el número de conexiones en su servidor web NGINX utilizando la métrica [`nginx.requests.total_count`][3].

La **solicitud** consta de 3 partes: 
1. Una consulta para obtener el número actual de solicitudes.
2. Una consulta para obtener el número de solicitudes a la misma hora una semana antes.
3. Consultas "fórmula" que calculan la relación entre las dos primeras consultas.

A continuación, define la agregación temporal:
- Eliges el marco temporal. Cuanto mayor sea el marco temporal, más datos se evaluarán para detectar una anomalía. Los marcos temporales más amplios también pueden dar lugar a más alertas de monitores, así que empieza con 1 hora y luego ajusta el marco temporal a tus necesidades. 
- Eliges la agregación. Dado que se trata de una métrica de recuento que realiza un cociente, `average` (o `sum`) es una elección natural.

El umbral que aparece en la siguiente captura de pantalla se ha configurado en 0,9 para permitir una diferencia del 10% entre el valor de la primera consulta (actual) y el de la segunda (semana anterior).

{{< tabs >}}
{{% tab "UI Configuration" %}}
{{< img src="monitors/guide/non_static_thresholds/seasonal_threshold_config.png" alt="Configuration to add week_before timeshift to metric query and set formula a/b" Configuración para añadir la serie temporal _semana_anterior_ a la consulta de la métrica y establecer la fórmula a/b) style="width:100%;" >}}
{{% /tab %}}

{{% tab "JSON Example" (Ejemplo de JSON) %}}
``` json
{
    "name": "[Seasonal threshold] Amount of connection",
    "type": "query alert",
    "query": "sum(last_10m):sum:nginx.requests.total_count{env:prod} by {datacenter} / week_before(sum:nginx.requests.total_count{env:prod} by {datacenter}) <= 0.9",
    "message": "The amount of connection is lower than yesterday by {{value}} !",
    "tags": [],
    "options": {
        "thresholds": {
            "critical": 0.9
        },
        "notify_audit": false,
        "require_full_window": false,
        "notify_no_data": false,
        "renotify_interval": 0,
        "include_tags": true,
        "new_group_delay": 60,
        "silenced": {}
    },
    "priority": null,
    "restricted_roles": null
}
```
{{% /tab %}}
{{< /tabs >}}

## Umbral de referencia

### Contexto
Eres responsable del equipo de control de calidad encargado de los procesos de compra en tu sitio web de comercio electrónico. Quieres asegurarte de que tus clientes tendrán una buena experiencia y podrán comprar tus productos sin problemas. Un indicador de ello es la tasa de errores.

El tráfico no es el mismo a lo largo del día, por lo que obtener 50 errores/minuto un viernes por la tarde es menos preocupante que obtener 50 errores/minuto un domingo por la mañana. Monitorizar la tasa de errores, más que los errores en sí, ofrece una visión fiable de la apariencia de las métricas saludables y las no saludables.

Recibe alertas cuando la tasa de errores es alta, pero también cuando el volumen de ocurrencias es lo suficientemente significativo.

### Monitor

Crea 3 monitores en total:
1. Un [monitor de métricas para alertar sobre el número total de ocurrencias.](#metric-monitor-to-alert-on-the-total-number-of-hits)
1. Un [monitor de métricas para calcular el porcentaje de error.](#metric-monitor-to-calculate-the-error-rate)
1. Un [monitor compuesto que activa una alerta si los dos primeros monitores están en estado de ALERTA.](#composite-monitor)

#### Monitor de métricas para alertar sobre el número total de ocurrencias

El primer monitor registra el número total de ocurrencias, tanto de aciertos como de fallos. Este monitor determina si la tasa de errores debe activar una alerta.

{{< tabs >}}
{{% tab "UI Configuration" %}}
  {{< img src="monitors/guide/non_static_thresholds/reference_total_hits.png" alt="Metric monitor configuration with formula to calculate total hits" (Configuración de un monitor de métricas que muestra la fórmula para calcular el total de ocurrencias) style="width:100%;" >}}

{{% /tab %}}

{{% tab "JSON Example" (Ejemplo de JSON) %}}
```
{
    "name": "Number of hits",
    "type": "query alert",
    "query": "sum(last_5m):sum:shopist.checkouts.failed{env:prod} by {region}.as_count() + sum:shopist.checkouts.success{env:prod} by {region}.as_count() > 4000",
    "message": "There has been more than 4000 hits for this region !",
    "tags": [],
    "options": {
        "thresholds": {
            "critical": 1000
        },
        "notify_audit": false,
        "require_full_window": false,
        "notify_no_data": false,
        "renotify_interval": 0,
        "include_tags": true,
        "new_group_delay": 60
    }
}

```
{{% /tab %}}
{{< /tabs >}}

#### Monitor de métricas para calcular el porcentaje de error

El segundo monitor calcula la tasa de error. Crea una consulta sobre el número de errores dividido por el número total de ocurrencias para obtener la tasa de error `a / a+b`:

{{< tabs >}}
{{% tab "UI Configuration" %}}
  {{< img src="monitors/guide/non_static_thresholds/reference_error_rate.png" alt="Metric monitor configuration with formula to calculate error rate" (Configuración de un monitor de métricas que muestra la fórmula para calcular la tasa de error) style="width:100%;" >}}
{{% /tab %}}

{{% tab "JSON Example" (Ejemplo de JSON) %}}
```
{
    "name": "Error Rate",
    "type": "query alert",
    "query": "sum(last_5m):sum:shopist.checkouts.failed{env:prod} by {region}.as_count() / (sum:shopist.checkouts.failed{env:prod} by {region}.as_count() + sum:shopist.checkouts.success{env:prod} by {region}.as_count()) > 0.5",
    "message": "The error rate is currently {{value}} ! Be careful !",
    "tags": [],
    "options": {
        "thresholds": {
            "critical": 0.5
        },
        "notify_audit": false,
        "require_full_window": false,
        "notify_no_data": false,
        "renotify_interval": 0,
        "include_tags": true,
        "new_group_delay": 60
    }
}

```

{{% /tab %}}
{{< /tabs >}}


#### Monitor compuesto

El último monitor es un monitor compuesto que envía una alerta sólo si los dos monitores anteriores también están en estado de **ALERTA**. 

{{< img src="monitors/guide/non_static_thresholds/reference_composite_monitor_config.png" alt="Example composite monitor configuration showing boolean logic to alert if both monitors are in ALERT state" (Ejemplo de configuración de un monitor compuesto que muestra una lógica booleana para alertar si los dos monitores están en estado de ALERTA) style="width:100%;" >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/types/anomaly/
[2]: /es/monitors/types/outlier/
[3]: /es/integrations/nginx/?tab=host#data-collected
[4]: /es/account_management/billing/usage_metrics/#types-of-usage
[5]: /es/logs/log_configuration/logs_to_metrics/#logs-usage-metrics