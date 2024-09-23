---
aliases:
- /es/real_user_monitoring/rum_analytics
- /es/real_user_monitoring/analytics
description: ''
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: Documentación
  text: Explorar tus vistas en Datadog
- link: https://www.datadoghq.com/blog/datadog-geomaps/
  tag: Blog
  text: Uso de geomapas para visualizar los datos de tu aplicación por ubicación
- link: https://www.datadoghq.com/blog/reduce-customer-friction-funnel-analysis/
  tag: Blog
  text: Uso del análisis de embudo para comprender y optimizar los flujos (flows)
    de usuarios clave
title: RUM Analytics
---

## Información general

Real User Monitoring (RUM) Analytics amplía la página del explorador RUM con funciones de agregación y división de datos de vistas para la resolución de problemas y la monitorización. Puedes controlar:

* La consulta que filtra el conjunto de vistas que se van a analizar.
* Las dimensiones para la división de los datos.
* El método de visualización de agregados y divisiones.

Con las visualizaciones de RUM Analytics puedes:

* Crear un widget en un dashboard a partir de esa visualización.
* Profundizar en subconjuntos de listas de eventos en función de las interacciones que permite la visualización.

## Creación de una consulta

En [RUM Analytics][1], personaliza tu visualización añadiendo medidas y facetas a tu consulta de búsqueda. 

1. Elige una medida o faceta para el gráfico. Una medida te permite elegir la función de agregación, mientras que una faceta muestra el recuento único.

    {{< img src="real_user_monitoring/explorer/analytics/measure_selection.png" alt="Selección de la medida" style="width:50%;">}}
2. Selecciona la función de agregación para la medida que quieres graficar:

    {{< img src="real_user_monitoring/explorer/analytics/aggregation.png" alt="Función de agregación para RUM Analytics" style="width:50%;">}}

3. Utiliza una faceta para dividir tu gráfico.

    {{< img src="real_user_monitoring/explorer/analytics/break_down.png" alt="División de RUM Analytics por facetas" style="width:50%;">}}

4. Elige el intervalo de tiempo para tu gráfico. Al cambiar el marco temporal global, cambia la lista de los valores de marca de tiempo disponibles.

    {{< img src="real_user_monitoring/explorer/analytics/roll_up.png" alt="Rollup" style="width:50%;">}}

5. Elige entre mostrar los valores **superiores** o **inferiores** según la medida seleccionada.

    {{< img src="real_user_monitoring/explorer/analytics/top_bottom.png" alt="Botón valores superiores-inferiores" style="width:50%;">}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/analytics