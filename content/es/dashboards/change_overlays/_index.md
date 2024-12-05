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
  text: Solución de problemas en implantaciones frontend fallidas con el seguimiento
    de implementaciones en RUM
- link: https://www.datadoghq.com/blog/change-overlays/
  tag: Blog
  text: Detectar y corregir rápidamente las implementaciones fallidas con las superposiciones
    de cambios
title: Cambiar superposiciones
---
<div class="alert alert-warning">
    La función de superposición de cambios está en fase beta.
</div>


## Información general

A medida que los equipos iteran, implementan código y realizan cambios continuamente en sus aplicaciones y servicios, puede resultar difícil encontrar el cambio exacto que ha provocado un pico de errores, un aumento de la latencia o una ralentización de los tiempos de carga de las páginas. Utiliza las superposiciones de cambios para identificar cuándo un cambio reciente está causando problemas de rendimiento en tu aplicación o tus servicios y encontrar el origen del problema.

Visualiza el momento en que se produce un cambio en el contexto de tus datos de observabilidad de Datadog para localizar problemas en versiones específicas, correlacionar cambios con métricas y solucionar problemas con mayor rapidez. Las superposiciones de cambios admiten [implementaciones de servicios APM][1].

## Superponer cambios en gráficos

Para empezar, haz clic en **Show Overlays** (Mostrar superposiciones), en la esquina superior derecha de tu dashboard. 

{{< img src="dashboards/change_overlays/show_overlays_button.png" alt="Botón Overlays (Superposiciones) en el encabezado del dashboard" style="width:100%;">}}

Las superposiciones aparecen automáticamente en los gráficos de series temporales, filtradas con la etiqueta (tag) `service`, para servicios configurados con etiquetas `version`. Para habilitar las implementaciones en tus servicios APM, [añade etiquetas de versión a tu configuración][1]. 

Haz clic en cualquier superposición de evento para abrir un panel lateral con más información y [analizar el impacto de tu cambio](#analyze-the-impact-of-your-change).

### Mostrar implementaciones fallidas
Utiliza el conmutador del panel de superposiciones para mostrar únicamente las [implementaciones fallidas][2] que podrían estar afectando a tus métricas.

### Anular la detección automática
Anula la detección automática de servicios, utilizando la barra de búsqueda para encontrar el servicio que te interese. 

## Analizar el impacto de tu cambio
Haz clic en cualquier superposición de tu gráfico para abrir una página de análisis de cambios, lo que te permitirá comprender el estado y el impacto de tu cambio.

{{< img src="dashboards/change_overlays/change_overlays_side_panel.png" alt="Panel lateral de superposiciones de cambios" style="width:75%;">}}

### Implementaciones de APM
Para las implementaciones de APM, puedes:
- Comparar la versión seleccionada con el rendimiento general del servicio, en cuanto a solicitudes, errores o latencia
- Ver el despliegue de tu versión en `region`, `env` o `datacenter`
- Ver los nuevos problemas de seguimiento de errores que se han introducido con la nueva implementación
- Verificar la infraestructura relacionada en la que se está ejecutando tu servicio

{{< img src="dashboards/change_overlays/apm_overlays_side_panel.png" alt="Panel lateral de superposiciones de APM" style="width:75%;">}}

## FAQ
### ¿Cuándo aparecen las superposiciones?
En las implementaciones de APM, las superposiciones aparecen en gráficos de series temporales que:
1. Se filtran por etiquetas de `service` en la consulta
2. Configuran el `service` con la etiqueta de `version`

### ¿Cuál es el alcance de las implementaciones?
En las implementaciones de APM debe especificarse `env`. Si tienes una variable de plantilla `env` o `datacenter` establecida en tu dashboard, las implementaciones se filtran para que coincidan con la selección. De lo contrario, `env` cambia por defecto a `prod`. 

## Leer más

{{< nombre parcial="whats-next/whats-next.html" >}}

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