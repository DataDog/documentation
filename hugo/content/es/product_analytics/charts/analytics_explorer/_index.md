---
aliases:
- /es/product_analytics/analytics_explorer/
- /es/product_analytics/journeys
description: ''
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: Documentación
  text: Explorar tus vistas en Datadog
- link: /dashboards/functions/
  tag: Documentación
  text: Añadir una función a tu consulta
- link: https://www.datadoghq.com/blog/datadog-geomaps/
  tag: Blog
  text: Utiliza geomapas para ver los datos de tu aplicación por ubicación
- link: https://www.datadoghq.com/blog/reduce-customer-friction-funnel-analysis/
  tag: Blog
  text: Utilizar el análisis del embudo para comprender y optimizar los flujos de
    usuarios clave
title: Analytics Explorer
---

## Información general

La page (página) [Analytics Explorer][1] contiene vistas de agregación de datos para comprender cómo se está utilizando tu producto. Puedes controlar:

* El tipo de evento (Sesiones, Vistas o Acciones) por el cual ver las vistas.
* La consulta que filtra el conjunto de vistas que se van a analizar.
* Las dimensiones sobre las que dividir los datos.
* El método de visualización de agregados y divisiones.

Con las visualizaciones de Analytics, puedes:

* Crear un widget en un dashboard a partir de esa visualización.
* Profundizar en subconjuntos de la lista de eventos en función de las interacciones que permite la visualización.

## Utilizar el gráfico de análisis
{{< whatsnext desc="Follow these links here to learn how to use the analytics search syntax, view events, and vizualise, group, and export views. " >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/search_syntax" >}}Sintaxis de búsqueda{{< /nextlink >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/events" >}} Eventos {{< /nextlink >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/visualize" >}}Visualizar{{< /nextlink >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/group" >}}Grupos{{< /nextlink >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/export" >}}Exportar{{< /nextlink >}}
{{< /whatsnext >}}

## Crear una consulta

En [Analytics][1], personaliza tu visualización añadiendo facetas y medidas a tu consulta de búsqueda. 

1. Selecciona un [tipo de evento de vista][2].

   {{< img src="product_analytics/analytics/view_type_selection.png" alt="Selección del tipo de vista." style="width:50%;">}}

2. Elige una medida para representar gráficamente el recuento único.

   {{< img src="product_analytics/analytics/measure_selection.png" alt="Elige una medida para representar gráficamente el recuento único." style="width:50%;">}}

3. Elige un campo por el que [agrupar][3] la medida.

   {{< img src="product_analytics/analytics/pana_analytics_group_by.png" alt="Agrupar la medida por campos específicos." style="width:50%;">}}

4. Elige el intervalo de tiempo para tu gráfico. Al cambiar el marco temporal global, cambia la lista de los valores de marca de tiempo disponibles.

   {{< img src="product_analytics/analytics/pana_analytics_time_imterval.png" alt="Selecciona un intervalo de tiempo para tu gráfico." style="width:50%;">}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/explorer
[2]: /es/real_user_monitoring/guide/understanding-the-rum-event-hierarchy/
[3]: /es/product_analytics/charts/analytics_explorer/group