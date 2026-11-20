---
description: Monitoree los umbrales variables utilizando patrones estacionales, métricas
  de referencia y monitores composite para escenarios de alertas dinámicas.
further_reading:
- link: /monitors/types/composite/
  tag: Documentación
  text: Monitor composite
- link: /monitors/types/anomaly/
  tag: Documentación
  text: Monitor de anomalías
title: Cómo monitorear umbrales no estáticos
---
## Descripción general {#overview}

Un monitor de métricas típico activa una alerta si una sola métrica supera un número de umbral específico. Por ejemplo, usted podría configurar una alerta para que se active si el uso de su disco supera el 80%. Este enfoque es eficiente para muchos casos de uso, pero ¿qué sucede cuando el umbral es una variable en lugar de un número absoluto?

Los monitores con tecnología Watchdog (específicamente [anomalía][1] y [valor anómalo][2]) son particularmente útiles cuando no existe una definición explícita de cuándo su métrica se desvía de lo esperado. Sin embargo, cuando sea posible, usted debe usar monitores regulares con condiciones de alerta personalizadas para maximizar la precisión y minimizar el tiempo hasta que se active la alerta para su caso de uso específico.

Esta guía cubre casos de uso comunes para alertas sobre umbrales no estáticos:
  - [Alertar cuando una métrica se desvíe de lo esperado fuera de las **variaciones estacionales**](#seasonal-threshold) 
  - [Alertar según el valor de otra métrica de **referencia**](#reference-threshold)

## Umbral estacional {#seasonal-threshold}

### Contexto {#context}

Usted es el líder del equipo a cargo de un sitio web de comercio electrónico. Usted desea: 
- recibir alertas sobre un tráfico inesperadamente bajo en su página de inicio 
- detectar incidentes más localizados como los que afectan a los proveedores públicos de internet
- cubrir escenarios de fallas desconocidos

El tráfico de su sitio web varía de la noche al día, y de los días de semana a los fines de semana. No existe un número absoluto para cuantificar qué significa "inesperadamente bajo". Sin embargo, el tráfico sigue un patrón predecible donde puede considerar una diferencia del 10% como un indicador confiable de un problema, como un incidente localizado que afecta a los proveedores de internet públicos.

{{< img src="monitors/guide/non_static_thresholds/seasonal_line_graph.png" alt="Gráfico de líneas de una métrica periódica o estacional" style="width:100%;" >}}

### Monitor {#monitor}

Su equipo mide la cantidad de conexiones en su servidor web NGINX utilizando la métrica [`nginx.requests.total_count`][3].

La **solicitud** consta de 3 partes: 
1. Una consulta para obtener la cantidad actual de solicitudes.
2. Una consulta para obtener la cantidad de solicitudes a la misma hora de la semana anterior.
3. Consultas de "Formula" que calculan la proporción entre las dos primeras consultas.

Luego, decida el desglose temporal:
- Usted elige el marco de tiempo. Cuanto mayor sea el marco de tiempo, más datos evaluará para detectar una anomalía. Los marcos de tiempo más grandes también pueden generar más alertas del monitor, así que comience con 1 hora y luego ajuste según sus necesidades. 
- Usted elige la agregación. Dado que se trata de una métrica de conteo que calcula una proporción, `average` (o `sum`) es una opción natural.

El umbral que se muestra en la captura de pantalla a continuación se ha configurado en 0.9 para permitir una diferencia del 10 % entre el valor de la primera consulta (actual) y la segunda consulta (semana anterior).

{{< tabs >}}
{{% tab "Configuración de la interfaz de usuario" %}}

{{< img src="monitors/guide/non_static_thresholds/seasonal_threshold_config.png" alt="Configuración para agregar el desplazamiento temporal week_before a la consulta de métrica y establecer la fórmula a/b" style="width:100%;" >}}

{{% /tab %}}

{{% tab "Ejemplo de JSON" %}}
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

## Reference threshold

### Context
You are the QA team lead, in charge of the checkout process of your e-commerce website. You want to ensure that your customers have a good experience and can purchase your products without any issues. One indicator of that is the error rate.

The traffic is not the same throughout the day, so 50 errors/minute on a Friday evening is less worrying than 50 errors/minute on a Sunday morning. Monitoring an error rate rather than the errors themselves gives you a reliable view of what healthy and unhealthy metrics look like.

Get alerted when the error rate is high, but also when the volume of hits is significant enough.

### Monitor

Create 3 monitors in total:
1. [Metric monitor to alert on total number of hits.](#metric-monitor-to-alert-on-the-total-number-of-hits)
1. [Metric monitor to calculate the error rate.](#metric-monitor-to-calculate-the-error-rate)
1. [Composite monitor that triggers an alert if the first two monitors are in an ALERT state.](#composite-monitor)

#### Metric monitor to alert on the total number of hits

The first monitor tracks the total number of hits, both successes and failures. This monitor determines whether the error rate should trigger an alert.

{{< tabs >}}
{{% tab "UI Configuration" %}}

{{< img src="monitors/guide/non_static_thresholds/reference_total_hits.png" alt="Metric monitor configuration with formula to calculate total hits" style="width:100%;" >}}

{{% /tab %}}

{{% tab "JSON Example" %}}
```
{
	"name": "Número de visitas",
	"type": "query alert",
	"query": "sum(last_5m):sum:shopist.checkouts.failed{env:prod} by {region}.as_count() + sum:shopist.checkouts.success{env:prod} by {region}.as_count() > 4000",
	"message": "¡Ha habido más de 4000 visitas para esta región!",
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

#### Metric monitor to calculate the error rate

The second monitor calculates the error rate. Create a query on the number of errors divided by the total number of hits to get the error rate `a / a+b`:

{{< tabs >}}
{{% tab "UI Configuration" %}}

{{< img src="monitors/guide/non_static_thresholds/reference_error_rate.png" alt="Metric monitor configuration with formula to calculate error rate" style="width:100%;" >}}

{{% /tab %}}

{{% tab "JSON Example" %}}
```
{
	"name": "Tasa de error",
	"type": "query alert",
	"query": "sum(last_5m):sum:shopist.checkouts.failed{env:prod} by {region}.as_count() / (sum:shopist.checkouts.failed{env:prod} by {region}.as_count() + sum:shopist.checkouts.success{env:prod} by {region}.as_count()) > 0.5",
	"message": "La tasa de error actualmente es {{value}} ! ¡Tenga cuidado!",
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


#### Monitor composite {#composite-monitor}

El último monitor es un monitor composite que envía una alerta solo si los dos monitores anteriores también están en estado {{< ui >}}ALERT{{< /ui >}}. 

{{< img src="monitors/guide/non_static_thresholds/reference_composite_monitor_config.png" alt="Ejemplo de configuración de un monitor composite que muestra la lógica booleana para alertar si ambos monitores están en estado ALERT" style="width:100%;" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/types/anomaly/
[2]: /es/monitors/types/outlier/
[3]: /es/integrations/nginx/?tab=host#data-collected
[4]: /es/account_management/billing/usage_metrics/estimated_usage_metrics/#types-of-usage
[5]: /es/logs/log_configuration/logs_to_metrics/#logs-usage-metrics