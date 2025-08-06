---
description: Aprende acerca del Explorador de CD Visibility para ejecuciones de despliegues.
further_reading:
- link: /continuous_delivery/deployments/
  tag: Documentación
  text: Más información sobre Deployment Visibility
- link: /continuous_delivery/explorer/saved_views
  tag: Documentación
  text: Información sobre las vistas guardadas
title: Explorador de Continuous Delivery Visibility
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" btn_hidden="false" header="Únete a la vista previa" >}}
CD Visibility está en Vista previa. Si te interesa esta función, rellena el formulario para solicitar acceso.
{{< /callout >}}

## Información general

El [Explorador de CD Visibility][4] te permite [buscar y filtrar](#search-and-filter), [analizar](#analyze), [visualizar](#visualize) y [exportar](#export) ejecuciones de despliegues a diferentes niveles utilizando cualquier etiqueta (tag).

{{< img src="continuous_delivery/explorer/deployment_executions_2.png" alt="Los resultados de las ejecuciones de despliegues aparecen en el Explorador de CD Visibility" width="100%" >}}

## Buscar y filtrar

Puedes limitar, ampliar o cambiar tu enfoque a un subconjunto de ejecuciones de despliegues haciendo clic en las facetas de la izquierda o escribiendo tu propia consulta personalizada en la barra de búsqueda. Cuando seleccionas o anulas la selección de facetas, la barra de búsqueda refleja automáticamente los cambios. Del mismo modo, puedes modificar la consulta en la barra de búsqueda o escribir una consulta desde cero en la barra de búsqueda para seleccionar y deseleccionar las facetas de la izquierda.

- Para saber cómo buscar ejecuciones de despliegues, consulte [Buscar y gestionar][1].
- Para aprender a crear consultas, lee [Sintaxis de búsqueda][2].

## Analizar

Para derivar o consolidar información, agrupa tus ejecuciones de despliegues consultadas en entidades de nivel superior como campos, patrones y transacciones. Las [facetas][3] no son necesarias para la búsqueda de atributos, pero puedes utilizar las facetas para realizar las siguientes acciones:

- Buscar y realizar un seguimiento del progreso de los despliegues en tus entornos.
- Investigar todos los resultados de los despliegues para identificar y solucionar despliegues fallidos.

## Visualizar

Selecciona un tipo de visualización para mostrar los resultados de tus filtros y agregaciones, y entender mejor tus ejecuciones de despliegues. Por ejemplo, puedes ver los resultados de tus despliegues en una lista para organizar los datos de tu despliegue en columnas. O bien, puedes ver los resultados de tu despliegue en un gráfico de series temporales para medir los datos del despliegue a lo largo del tiempo.

## Exportar

Exporta tu [vista][5] en el [Explorador de CD Visibility][4] para reutilizarla más adelante o en contextos diferentes.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/continuous_delivery/search
[2]: /es/continuous_delivery/explorer/search_syntax
[3]: /es/continuous_delivery/explorer/facets
[4]: https://app.datadoghq.com/ci/deployments/executions
[5]: /es/continuous_delivery/explorer/saved_views