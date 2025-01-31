---
description: Aprende a buscar y gestionar tus despliegues.
further_reading:
- link: /continuous_delivery/explorer
  tag: Documentación
  text: Buscar y filtrar las ejecuciones de pipelines
title: Buscar y gestionar despliegues
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CD Visibility no está disponible en el sitio seleccionado ({{< region-param key="dd_site_name" >}}) en este momento.</div>
{{< /site-region >}}

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" btn_hidden="false" header="¡Obtén la versión preliminar!" >}}
CD Visibility está en versión preliminar. Si te interesa esta función, rellena el formulario para solicitar acceso.
{{< /callout >}}

## Despliegues

Para ver información general sobre tus despligues, navega a [**Software Delivery** > **CD Visibility** > **Deployments**][1].

La [página **Deployments**][1] muestra estadísticas agregadas por servicios y entornos durante el período de tiempo seleccionado, así como el estado de la última ejecución de despliegue. Utiliza esta página para ver todos los despliegues de tus servicios y obtener una vista de su estado.
Las métricas que se muestran incluyen la cantidad de ejecuciones y fallas, la tasa de fallas, la duración media y la duración del percentil 95. Esta información revela qué despliegues tienen una mayor probabilidad de fallar y qué despliegues tardan más tiempo en ejecutarse. El efecto de los últimos cambios se puede ver al verificar el estado, la revisión y la hora del último resultado del despliegue.

<div class="alert alert-info">Los despliegues sin servicios configurados y las ejecuciones de despliegues parciales se excluyen del agregado de estadísticas de la página Deployments. Puedes buscar estos despliegues en la página Deployment Executions: <code>@deployment.partial_deployment:* O -@deployment.service:*</code>.</div>

{{< img src="/continuous_delivery/search/deployments_2.png" text="La página Deployments en Datadog" style="width:100%" >}}

Si tienes diferentes formas de desplegar un servicio en un entorno, puedes expandir las filas del despliegue para ver las estadísticas filtradas aún más por nombre de despliegue.

La página **Deployment** te proporciona información de alto nivel, que incluye:

- Información general del estado de los diferentes servicios y entornos, con estadísticas agregadas.
- Una ventana para detectar y solucionar problemas inmediatos y urgentes, como despliegues defectuosos en producción.
- Cómo se ejecutó cada despliegue de servicio, a lo largo del tiempo, y los resultados y las tendencias.

## Detalles del despliegue

Haz clic en un despliegue de servicio específico para ver la página **Deployment Details**, que proporciona vistas de los datos del despliegue del servicio que seleccionaste durante un período de tiempo específico.

{{< img src="continuous_delivery/search/deployments_page_2.png" alt="Página Deployment para un único despliegue" style="width:100%;">}}

Obtén información sobre el despliegue del servicio seleccionado, como la cantidad de despliegues exitosos y fallidos a lo largo del tiempo, la duración promedio del despliegue, la cantidad de reversiones y la tasa de fallas. La parte inferior de la página muestra una tabla con las ejecuciones de despliegue del servicio, según el filtro de entorno seleccionado.

## Ejecuciones de despliegue

La [página **Deployment Executions**][2] muestra todas las veces que se ejecutó un despliegue durante el período de tiempo seleccionado. Utiliza las facetas del lado izquierdo para filtrar la lista de ejecuciones de despliegue y haz clic en una ejecución para ver detalles adicionales en el panel lateral Deployment Execution Details.

{{< img src="continuous_delivery/Buscar/details_side_panel.png" alt="Panel lateral de Deployment Details en la página Deployments" style="width:100%;">}}

Cuando un despliegue se asocia correctamente a un pipeline en CI Visibility, el panel de ejecuciones de despliegues contiene una nueva pestaña **Pipeline** desde la que se puede ver la traza (trace) del pipeline. Desde esta pestaña, puedes navegar a CI Visibility haciendo clic en el enlace **View Full Pipeline** en la parte superior:

{{< img src="ci/cd-ci-correlation-pipeline-tab.png" alt="Panel de ejecuciones de despliegues con la pestaña Pipeline" style="width:100%;">}}

Es posible que se requiera una configuración adicional para asociar un despliegue a un pipeline de CI. Para más información, consulta la página de configuración de tu proveedor de CD.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/deployments
[2]: https://app.datadoghq.com/ci/deployments/executions