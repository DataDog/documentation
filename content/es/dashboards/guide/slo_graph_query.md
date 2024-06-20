---
disable_toc: false
further_reading:
- link: /dashboards/widgets/slo/
  tag: Documentación
  text: Widget de SLO
title: Acotar consultas de SLO basadas en métricas
---

<div class="alert alert-info">Esta función sólo está disponible para consultas de SLO <strong>basadas en métricas</strong>.</div>

## Información general

El [widget de SLO][1] admite el filtrado avanzado de consultas de métricas, incluido el uso de variables de plantilla para acotar dinámicamente los resultados mostrados. 

## Recorrido por una consulta de SLO

### Consulta de SLO basada en métricas
En primer lugar, crea un [SLO basado en métricas][2]. Este ejemplo utiliza métricas de rastreo de APM para medir la disponibilidad de un ejemplo de servicio llamado `web-store`.

##### Eventos buenos (numerador)
`sum:trace.rack.request.hits{service:web-store} by {resource_name}.as_count()` <br>
`sum:trace.rack.request.errors{service:web-store} by {resource_name}.as_count()`

##### Total de eventos (denominador)
`sum:trace.rack.request.hits{service:web-store} by {resource_name}.as_count()`

{{< img src="service_management/service_level_objectives/slo_graph_query/trace_metrics_slo.png" alt="Configuración de SLO que muestra un ejemplo de métricas de rastreo" style="width:100%;" >}}

### Widget de SLO

Selecciona el SLO en el [editor de widgets de SLO][1]. Puedes aplicar filtros adicionales en la configuración del widget para acotar aún más los resultados mostrados. Esto no modifica la definición original del SLO. En el ejemplo, añadimos las etiquetas (tags) `$env` y `$availability-zone` al campo **filter by** (filtrar por) del widget. 

{{< img src="service_management/service_level_objectives/slo_graph_query/slo_filter_by.png" alt="Editor del resumen de SLOs con etiquetas dinámicas para $env y $availability-zone" style="width:100%;" >}}

Con esta configuración, ¿qué sucede cuando la [variable de plantilla del dashboard][3] se cambia a `env:prod` y `availability-zone:northcentralus`?

El widget del SLO filtra las consultas de métricas del SLO con esas etiquetas adicionales para su visualización:

##### Eventos buenos (numerador)
`sum:trace.rack.request.hits{service:web-store, env:prod, availability-zone:northcentralus} by {resource_name}.as_count()` <br>
`sum:trace.rack.request.errors{service:web-store, env:prod, availability-zone:northcentralus} by {resource_name}.as_count()`

##### Total de eventos (denominador)
`sum:trace.rack.request.hits{service:web-store, env:prod, availability-zone:northcentralus} by {resource_name}.as_count()`

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/dashboards/widgets/slo/
[2]: /es/service_management/service_level_objectives/metric/
[3]: /es/dashboards/template_variables/