---
description: Aprende a consultar y visualizar los despliegues de CD Visibility.
further_reading:
- link: /continuous_delivery/features
  tag: Documentación
  text: Más información sobre las funciones de CD Visibility
- link: /continuous_delivery/deployments/
  tag: Documentación
  text: Más información sobre Deployment Visibility
- link: /continuous_delivery/explorer/saved_views
  tag: Documentación
  text: Más información sobre las vistas guardadas
title: Explorar los despliegues de CD Visibility
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" btn_hidden="false" header="Únete a la vista previa" >}}
CD Visibility está en Vista previa. Si te interesa esta función, rellena el formulario para solicitar acceso.
{{< /callout >}}

## Despliegues

Para ver un resumen de tus despliegues, ve a [**Software Delivery** > **CD Visibility** > **Deployments**][6] (Entrega de software > CD Visibility > Despliegues).

La página [**Despliegues**][6] muestra estadísticas agregadas por servicios y entornos durante el periodo seleccionado, así como el estado de la última ejecución del despliegue. Utiliza esta página para ver todos los despliegues de tus servicios y obtener una visión de tu estado.
Las métricas que se muestran incluyen el número de ejecuciones y fallos, la tasa de fallos, la duración media y la duración del percentil 95. Esta información revela qué despliegues tienen una mayor probabilidad de fallo y qué despliegues están tardando más en ejecutarse. El efecto de los últimos cambios puede verse comprobando el estado, la revisión y la hora del resultado del último despliegue.

<div class="alert alert-info">Los despliegues sin servicios configurados y las ejecuciones de despliegue parciales se excluyen de la agregación de estadísticas de la página de Despliegues. Puedes buscar estos despliegues en la página Ejecuciones de despliegue: <code>@deployment.partial_deployment:* O -@deployment.service:*</code>.</div>

{{< img src="/continuous_delivery/search/deployments_2.png" text="La página Deployments en Datadog" style="width:100%" >}}

Si tienes diferentes formas de desplegar un servicio en un entorno, puedes expandir las filas del despliegue para ver las estadísticas filtradas aún más por nombre de despliegue.

La página **Deployment** te proporciona información de alto nivel, que incluye:

- Información general del estado de los diferentes servicios y entornos, con estadísticas agregadas.
- Una ventana para detectar y solucionar problemas inmediatos y urgentes, como despliegues defectuosos en producción.
- Cómo se ejecutó cada despliegue de servicio, a lo largo del tiempo, y los resultados y las tendencias.

### Detalles del despliegue

Haz clic en un despliegue de servicio específico para ver la página **Deployment Details**, que proporciona vistas de los datos del despliegue del servicio que seleccionaste durante un período de tiempo específico.

{{< img src="continuous_delivery/search/deployments_page_2.png" alt="Página Deployment para un único despliegue" style="width:100%;">}}

Obtén información sobre el despliegue del servicio seleccionado, como la cantidad de despliegues exitosos y fallidos a lo largo del tiempo, la duración promedio del despliegue, la cantidad de reversiones y la tasa de fallas. La parte inferior de la página muestra una tabla con las ejecuciones de despliegue del servicio, según el filtro de entorno seleccionado.

## Ejecuciones de despliegue

La [página **Ejecuciones de despliegue**][4] muestra todas las veces que se ejecutó un despliegue durante el periodo seleccionado. Utiliza las facetas del lado izquierdo para filtrar la lista de ejecuciones de despliegue y haz clic en una ejecución para ver detalles adicionales en el panel lateral Deployment Execution Details (Detalles de ejecución del despliegue).

{{< img src="continuous_delivery/Buscar/details_side_panel.png" alt="Panel lateral de Deployment Details en la página Deployments" style="width:100%;">}}

Cuando un despliegue se asocia correctamente a un pipeline en CI Visibility, el panel de ejecuciones de despliegues contiene una nueva pestaña **Pipeline** desde la que se puede ver la traza (trace) del pipeline. Desde esta pestaña, puedes navegar a CI Visibility haciendo clic en el enlace **View Full Pipeline** en la parte superior:

{{< img src="ci/cd-ci-correlation-pipeline-tab.png" alt="Panel de ejecuciones de despliegues con la pestaña Pipeline" style="width:100%;">}}

Es posible que se requiera una configuración adicional para asociar un despliegue a un pipeline de CI. Para más información, consulta la página de configuración de tu proveedor de CD.

La [página Ejecuciones de despliegue][4] te permite [buscar y filtrar](#search-and-filter), [analizar](#analyze), [visualizar](#visualize) y [exportar](#export) ejecuciones de despliegues a diferentes niveles utilizando cualquier etiqueta.

{{< img src="continuous_delivery/explorer/deployment_executions_2.png" alt="Los resultados de las ejecuciones de despliegues aparecen en el Explorador de CD Visibility" width="100%" >}}

### Buscar y filtrar

Puedes limitar, ampliar o cambiar tu enfoque a un subconjunto de ejecuciones de despliegues haciendo clic en las facetas de la izquierda o escribiendo tu propia consulta personalizada en la barra de búsqueda. Cuando seleccionas o anulas la selección de facetas, la barra de búsqueda refleja automáticamente los cambios. Del mismo modo, puedes modificar la consulta en la barra de búsqueda o escribir una consulta desde cero en la barra de búsqueda para seleccionar y deseleccionar las facetas de la izquierda. Para obtener más información sobre cómo crear consultas, ve [Sintaxis de búsqueda][2].

### Analizar

Para derivar o consolidar información, agrupa tus ejecuciones de despliegues consultadas en entidades de nivel superior como campos, patrones y transacciones. Las [facetas][3] no son necesarias para la búsqueda de atributos, pero puedes utilizar las facetas para realizar las siguientes acciones:

- Buscar y realizar un seguimiento del progreso de los despliegues en tus entornos.
- Investigar todos los resultados de los despliegues para identificar y solucionar despliegues fallidos.

### Visualizar

Selecciona un tipo de visualización para mostrar los resultados de tus filtros y agregaciones, y entender mejor tus ejecuciones de despliegues. Por ejemplo, puedes ver los resultados de tus despliegues en una lista para organizar los datos de tu despliegue en columnas. O bien, puedes ver los resultados de tu despliegue en un gráfico de series temporales para medir los datos del despliegue a lo largo del tiempo.

### Exportar

Exporta tu [vista][5] en la [página Ejecuciones de despliegue][4] para reutilizarla más adelante o en contextos diferentes.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/continuous_delivery/search
[2]: /es/continuous_delivery/explorer/search_syntax
[3]: /es/continuous_delivery/explorer/facets
[4]: https://app.datadoghq.com/ci/deployments/executions
[5]: /es/continuous_delivery/explorer/saved_views
[6]: https://app.datadoghq.com/ci/deployments