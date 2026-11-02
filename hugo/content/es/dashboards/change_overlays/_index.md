---
description: Superponga sus eventos de cambio en los gráficos para correlacionar las
  anomalías de rendimiento con los cambios en su aplicación.
further_reading:
- link: /tracing/services/deployment_tracking/
  tag: Documentación
  text: Introducción al seguimiento de implementaciones de APM
- link: https://www.datadoghq.com/blog/datadog-deployment-tracking/
  tag: Blog
  text: Haga un seguimiento de las implementaciones de código con el seguimiento de
    implementaciones en Datadog APM.
- link: https://www.datadoghq.com/blog/faulty-deployment-detection/
  tag: Blog
  text: Publique código con confianza con la detección automática de implementaciones
    defectuosas
- link: /real_user_monitoring/guide/setup-rum-deployment-tracking/?tab=npm
  tag: Documentación
  text: Introducción al seguimiento de implementaciones de RUM
- link: https://www.datadoghq.com/blog/datadog-rum-deployment-tracking/
  tag: Blog
  text: Solucione problemas de implementaciones de frontend defectuosas con el seguimiento
    de implementaciones en RUM
- link: https://www.datadoghq.com/blog/change-overlays/
  tag: Blog
  text: Detecte y revierta rápidamente las implementaciones defectuosas con superposiciones
    de cambios
title: Superposiciones de cambios
---
## Descripción general {#overview}

A medida que los equipos iteran, implementan código y realizan cambios en sus aplicaciones y servicios, identificar el cambio exacto que causó un aumento en los errores, una mayor latencia o tiempos de carga de página más lentos puede ser un desafío. Utilice las superposiciones de cambios para visualizar cambios en su tablero, como implementaciones o indicadores de funciones, y correlacione rápidamente los problemas de rendimiento con ellos.

## Superponer cambios en gráficos {#overlay-changes-on-graphs}

Para comenzar, haga clic en {{< ui >}}Show Overlays{{< /ui >}} en la esquina superior derecha de su tablero. Ahora puede habilitar la línea de tiempo de [Seguimiento de cambios][16] y las superposiciones de cambios en los widgets de series temporales.

{{< img src="dashboards/change_overlays/show_overlays_button.png" alt="Botón de superposiciones en el encabezado del tablero" style="width:100%;">}}

Cuando se activa, la barra de búsqueda {{< ui >}}Service{{< /ui >}} muestra el servicio {{< ui >}}Most Relevant{{< /ui >}} de forma predeterminada. Datadog selecciona automáticamente el servicio al que se hace referencia con mayor frecuencia en las consultas que admiten los widgets del tablero.

Anule la detección automática de servicios utilizando la barra de búsqueda para encontrar el servicio de interés. 

Todos los cambios mostrados en la línea de tiempo de cambios y como superposiciones se vinculan al servicio seleccionado. 
Utilice el menú desplegable {{< ui >}}Show On{{< /ui >}} para limitar las superposiciones de cambios a los widgets relevantes o mostrarlas en todos los widgets de su tablero.

Para ver detalles adicionales o realizar acciones adicionales, haga clic en una superposición de cambios o en un cambio dentro de la línea de tiempo de cambios.

### Cambios de implementación en el contexto {#scope-deployment-changes}

Para implementaciones de APM, se debe especificar un `env`. Si tiene una variable de plantilla `env` o `datacenter` configurada en su tablero, las implementaciones se filtran para coincidir con la selección. De lo contrario, el `env` tiene como valor predeterminado `prod`. 

## Lecturas adicionales {#further-reading}

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