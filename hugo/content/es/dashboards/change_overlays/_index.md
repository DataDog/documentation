---
description: Superpón tus eventos de cambios en gráficos para correlacionar anomalías
  en el rendimiento con los cambios en tu aplicación.
further_reading:
- link: /tracing/services/deployment_tracking/
  tag: Documentación
  text: Empezando con el seguimiento de implementaciones APM
- link: https://www.datadoghq.com/blog/datadog-deployment-tracking/
  tag: Blog
  text: Implementaciones de código en monitores con el seguimiento de implementaciones
    APM de Datadog
- link: https://www.datadoghq.com/blog/faulty-deployment-detection/
  tag: Blog
  text: Liberar código con confianza gracias a la detección automática de errores
    de implementación
- link: /real_user_monitoring/guide/setup-rum-deployment-tracking/?tab=npm
  tag: Documentación
  text: Empezando con el seguimiento de implementaciones RUM
- link: https://www.datadoghq.com/blog/datadog-rum-deployment-tracking/
  tag: Blog
  text: Solución de problemas en implementaciones frontend fallidas con el seguimiento
    de implementaciones en RUM
- link: https://www.datadoghq.com/blog/change-overlays/
  tag: Blog
  text: Detectar y corregir rápidamente las implementaciones fallidas con las superposiciones
    de cambios
title: Cambiar superposiciones
---

## Información general

A medida que los equipos iteran, despliegan código y realizan cambios en sus aplicaciones y servicios, identificar el cambio exacto que provocó un pico de errores, un aumento de la latencia o una ralentización de los tiempos de carga de las páginas puede resultar complicado. Utiliza las superposiciones de cambios para visualizar cambios en tu dashboard, como despliegues o marcadores de funciones, y correlacionar rápidamente los problemas de rendimiento con ellos.

## Superponer cambios en gráficos

Para empezar, haz clic en **Show Overlays** (Mostrar superposiciones) en la esquina superior derecha de tu dashboard. Ahora puedes activar la línea de tiempo [Change Tracking][16] y cambiar las superposiciones en los widgets de series de tiempo.

{{< img src="dashboards/change_overlays/show_overlays_button.png" alt="Botón Overlays (Superposiciones) en el encabezado del dashboard" style="width:100%;">}}

Cuando se activa, la barra de búsqueda **Servicio** muestra el servicio **más relevante** por defecto. Datadog selecciona automáticamente el servicio más frecuentemente mencionado en las consultas, que apoyan los widgets del dashboard.

Anula la detección automática de servicios, utilizando la barra de búsqueda para encontrar el servicio que te interese. 

Todos los cambios mostrados en la línea de tiempo de los cambios y como superposiciones están vinculados al servicio seleccionado. 
Utiliza el menú desplegable **Mostrar en** para limitar las superposiciones de cambios a los widgets pertinentes o mostrarlas en todos los widgets de tu dashboard.

Para ver más detalles o realizar acciones adicionales, haz clic en una superposición de cambios o en un cambio dentro de la línea de tiempo de los cambios.

## FAQ

### ¿A qué se delimitan los cambios de despliegues?
En las implementaciones de APM debe especificarse `env`. Si tienes una variable de plantilla `env` o `datacenter` establecida en tu dashboard, las implementaciones se filtran para que coincidan con la selección. De lo contrario, `env` cambia por defecto a `prod`. 


## Para leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/services/deployment_tracking/
[2]: /es/watchdog/faulty_deployment_detection/
[3]: /es/dashboards/widgets/
[4]: https://app.datadoghq.com/metric/explorer
[5]: https://app.datadoghq.com/notebook/list
[6]: https://app.datadoghq.com/metric/summary
[7]: /es/metrics/advanced-filtering/
[8]: /es/getting_started/tagging/
[9]: /es/metrics/#time-aggregation
[10]: /es/dashboards/functions/rollup/#rollup-interval-enforced-vs-custom
[11]: /es/dashboards/functions/rollup/
[12]: /es/dashboards/functions/#apply-functions-optional
[13]: /es/metrics/advanced-filtering/#boolean-filtered-queries
[14]: /es/logs/explorer/search_syntax/
[15]: /es/dashboards/widgets/timeseries/#event-overlay
[16]: /es/change_tracking/