---
description: Aprenda a consultar y visualizar los despliegues de CD Visibility.
further_reading:
- link: /continuous_delivery/features
  tag: Documentación
  text: Aprenda sobre las características de CD Visibility
- link: /continuous_delivery/deployments/
  tag: Documentación
  text: Aprenda sobre Deployment Visibility
- link: /continuous_delivery/explorer/saved_views
  tag: Documentación
  text: Obtenga información sobre Saved Views
title: Explore los despliegues de CD Visibility
---
{{< callout btn_hidden="true" header="false" >}}
CD Visibility está en visión preliminar. El acceso está limitado a las organizaciones ya inscritas.
{{< /callout >}}

## Deployments {#deployments}

Para ver una visión general de sus despliegues, navegue a [**Software Delivery** > **CD Visibility** > **Deployments**][6].

La [página **Deployments**][6] muestra estadísticas agregadas por servicios y entornos durante el periodo de tiempo seleccionado, así como el estado de la última ejecución de despliegue. Utilice esta página para ver todos sus despliegues de servicios y obtener una vista de su estado.
Las métricas mostradas incluyen el número de ejecuciones y fallos, la tasa de fallos, la duración mediana y la duración del percentil 95. Esta información revela qué despliegues tienen una mayor probabilidad de fallo y qué despliegues están tomando más tiempo en ejecutarse. El efecto de los cambios más recientes puede verse al comprobar el estado, la revisión y la hora del último resultado de despliegue.

<div class="alert alert-info">Los despliegues sin servicios configurados y las ejecuciones de despliegue parciales se excluyen de la agregación de estadísticas de la página Deployments. Puede buscar estos despliegues en la página Deployment Executions: <code>@deployment.partial_deployment:* OR -@deployment.service:*</code>.</div>

{{< img src="/continuous_delivery/search/deployments_2.png" text="The Deployments page in Datadog" style="width:100%" >}}

Si tiene diferentes formas de desplegar un servicio en un entorno, puede expandir las filas de despliegue para ver estadísticas filtradas adicionalmente por nombre de despliegue.

La página {{< ui >}}Deployment{{< /ui >}} le proporciona información de alto nivel, que incluye:

- Una visión general del estado de los diferentes servicios y entornos, con estadísticas agregadas.
- Una oportunidad para detectar y solucionar problemas inmediatos y urgentes, como despliegues fallidos en producción.
- Cómo se ejecutó cada despliegue de servicio, a lo largo del tiempo, y los resultados y tendencias.

### Detalles del despliegue {#deployment-details}

Haga clic en un despliegue de servicio específico para ver la página {{< ui >}}Deployment Details{{< /ui >}}, que proporciona vistas de los datos para el despliegue de servicio que seleccionó durante un marco de tiempo especificado.

{{< img src="continuous_delivery/search/deployments_page_2.png" alt="Página de despliegue para un solo despliegue" style="width:100%;">}}

Obtenga información sobre el despliegue de servicio seleccionado, como la cantidad de despliegues exitosos y fallidos a lo largo del tiempo, la duración promedio del despliegue, la cantidad de reversiones y la tasa de fallas. La parte inferior de la página muestra una tabla con las ejecuciones de despliegue para el servicio, según el filtro de entorno seleccionado.

## Ejecuciones de despliegue {#deployment-executions}

La [página **Deployment Executions**][4] muestra todas las veces que se ejecutó un despliegue durante el periodo de tiempo seleccionado. Utilice las facetas del lado izquierdo para filtrar la lista de ejecuciones de despliegue y haga clic en una ejecución para ver detalles adicionales en el panel lateral Deployment Execution Details.

{{< img src="continuous_delivery/search/details_side_panel.png" alt="Panel lateral Deployment Details en la página Deployments" style="width:100%;">}}

Cuando un despliegue está correctamente asociado a un pipeline en CI Visibility, el panel de ejecuciones de despliegue contiene una nueva pestaña {{< ui >}}Pipeline{{< /ui >}} desde la cual es visible la traza del pipeline. Desde esta pestaña, puede navegar a CI Visibility haciendo clic en el enlace {{< ui >}}View Full Pipeline{{< /ui >}} en la parte superior:

{{< img src="ci/cd-ci-correlation-pipeline-tab.png" alt="Panel de ejecuciones de despliegue con la pestaña Pipeline" style="width:100%;">}}

Es posible que se requiera una configuración adicional para asociar un despliegue a un pipeline de CI. Para obtener más información, consulte la página de configuración de su proveedor de CD.

La [página Deployment Executions][4] le permite [buscar y filtrar](#search-and-filter), [analizar](#analyze), [visualizar](#visualize) y [exportar](#export) ejecuciones de despliegue en múltiples niveles usando cualquier etiqueta.

{{< img src="continuous_delivery/explorer/deployment_executions_2.png" alt="Resultados de ejecución de despliegue que aparecen en el Explorador de CD Visibility" width="100%" >}}

### Buscar y filtrar {#search-and-filter}

Puede restringir, ampliar o cambiar su enfoque en un subconjunto de ejecuciones de despliegue haciendo clic en las facetas a la izquierda o escribiendo su propia consulta personalizada en la barra de búsqueda. Cuando selecciona y deselecciona facetas, la barra de búsqueda refleja automáticamente sus cambios. De manera similar, puede modificar la consulta de la barra de búsqueda o escribir una consulta desde cero en la barra de búsqueda para seleccionar y deseleccionar las facetas a la izquierda. Para aprender a crear consultas, consulte [Sintaxis de búsqueda][2].

### Analizar {#analyze}

Para derivar o consolidar información, agrupe sus ejecuciones de despliegue consultadas en entidades de nivel superior como campos, patrones y transacciones. Las [facetas][3] no son necesarias para buscar atributos, pero puede usarlas para realizar las siguientes acciones:

- Busque y realice un seguimiento del progreso de los despliegues en sus entornos.
- Investigue cada resultado de despliegue para identificar y solucionar problemas de despliegues fallidos.

### Visualizar {#visualize}

Seleccione un tipo de visualización para mostrar los resultados de sus filtros y agregaciones, y comprender mejor sus ejecuciones de despliegue. Por ejemplo, puede visualizar los resultados de sus despliegues en una lista para organizar los datos de despliegue en columnas. O bien, visualice los resultados de los despliegues en un gráfico de series temporales para medir los datos de despliegue a lo largo del tiempo.

### Exportar {#export}

Exporte su [visualización][5] en la [página Deployment Executions][4] para reutilizarla más adelante o en diferentes contextos.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/continuous_delivery/search
[2]: /es/continuous_delivery/explorer/search_syntax
[3]: /es/continuous_delivery/explorer/facets
[4]: https://app.datadoghq.com/ci/deployments/executions
[5]: /es/continuous_delivery/explorer/saved_views
[6]: https://app.datadoghq.com/ci/deployments