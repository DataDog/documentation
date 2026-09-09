---
aliases:
- /es/product_analytics/analytics_explorer/
- /es/product_analytics/journeys
description: ''
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: Documentación
  text: Explore sus visualizaciones dentro de Datadog
- link: /dashboards/functions/
  tag: Documentación
  text: Agregue una función a su consulta
- link: https://www.datadoghq.com/blog/product-analytics-faster-decisions
  tag: Blog
  text: Tome decisiones de producto más rápidas y mejores con Datadog Product Analytics
- link: https://www.datadoghq.com/blog/datadog-geomaps/
  tag: Blog
  text: Utilice mapas geográficos para visualizar los datos de su aplicación por ubicación
- link: https://www.datadoghq.com/blog/reduce-customer-friction-funnel-analysis/
  tag: Blog
  text: Utilice el análisis de embudo para entender y optimizar los flujos clave de
    usuario
title: Analytics
---
## Descripción general {#overview}

La página [Analytics Explorer][1] contiene la agregación de datos de visualizaciones para entender cómo se está utilizando su producto Puede controlar:

* Seleccione un tipo de evento (Sessions, Visualizar o Acciones) para visualizar
* La consulta que filtra el conjunto de visualizaciones a analizar.
* Las dimensiones sobre las cuales dividir los datos.
* El método de visualización para agregados y divisiones.

Con las visualizaciones de Analytics, puede:

* Cree un widget en un dashboard a partir de esa visualización
* Profundice en subconjuntos de la lista de eventos dependiendo de las interacciones que la visualización permita

## Utilice el gráfico de analytics {#using-the-analytics-chart}
{{< whatsnext desc="Siga estos enlaces aquí para aprender cómo usar la sintaxis de búsqueda de analytics, ver eventos y visualizar, agrupar y exportar visualizaciones " >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/search_syntax" >}}Sintaxis de búsqueda{{< /nextlink >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/events" >}} Eventos {{< /nextlink >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/visualize" >}}Visualizar{{< /nextlink >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/group" >}}Grupos{{< /nextlink >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/export" >}}Exportar{{< /nextlink >}}
{{< /whatsnext >}}

## Cree una consulta {#build-a-query}

En [Analytics][1], personalice su visualización agregando facetas y medidas a su consulta de búsqueda 

1. Seleccione un [tipo de evento de Visualizar][2].

   {{< img src="product_analytics/analytics/view_type_selection1.png" alt="Menú desplegable en Product Analytics limitado a la selección del tipo de Visualizar" style="width:70%;">}}

1. Elija una medida para graficar el conteo único.

   {{< img src="product_analytics/analytics/measure_selection1.png" alt="Menú desplegable en Product Analytics para elegir una medida para graficar el conteo único." style="width:70%;">}}

1. Filtre por atributos de evento o atributos de [integraciones de terceros][6].

   {{< img src="product_analytics/analytics/pana_analytics_filter_by.png" alt="Menú desplegable en Product Analytics para filtrar eventos por sus propios atributos o por atributos obtenidos de integraciones de terceros." style="width:70%;">}}

1. Elija un atributo de evento para desglosar aún más los resultados.

   {{< img src="product_analytics/analytics/pana_analytics_breakdown_by1.png" alt="Menú desplegable en Product Analytics para desglosar aún más los eventos por sus propios atributos o por atributos obtenidos de integraciones de terceros." style="width:70%;">}}

1. Aplique una [función][4] para modificar cómo se devuelven los resultados de la consulta para las visualizaciones.

   {{< img src="product_analytics/analytics/pana_analytics_functions.png" alt="Botón en Product Analytics para agregar una función que modifique cómo se devuelven los resultados de una consulta de métricas para las visualizaciones." style="width:70%;">}}

1. Elija el [tipo de gráfico][5] y el intervalo de tiempo para su gráfico. Cambiar el marco de tiempo global cambia la lista de valores de intervalo de tiempo disponibles.

   {{< img src="product_analytics/analytics/pana_analytics_time_interval2.png" alt="Elija un tipo de gráfico y un intervalo de tiempo para su gráfico." style="width:50%;">}}



## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/explorer
[2]: /es/real_user_monitoring/guide/understanding-the-rum-event-hierarchy/
[3]: /es/product_analytics/charts/analytics_explorer/group
[4]: /es/dashboards/functions/#overview
[5]: /es/product_analytics/charts/analytics_explorer/visualize/
[6]: https://app.datadoghq.com/product-analytics/integrations/custom-attributes