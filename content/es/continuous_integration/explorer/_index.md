---
description: Aprende a buscar y filtrar tus ejecuciones de pipelines en el Explorador
  de CI Visibility.
further_reading:
- link: /continuous_integration/pipelines/
  tag: Documentación
  text: Explorar datos de pipelines para solucionar problemas de compilación
- link: https://www.datadoghq.com/blog/configure-pipeline-alerts-with-ci-monitors/
  tag: Blog
  text: Configurar alertas de pipelines con monitores de Datadog CI
title: Explorador de Continuous Integration Visibility
---

## Información general

El Explorador de CI Visibility te permite [buscar y filtrar](#search-and-filter), [visualizar](#visualize) y [exportar](#export) ejecuciones de pipelines en varios niveles utilizando cualquier etiqueta (tag).

Ve a [**Entrega de software** > **CI Visibility** > **Ejecuciones**][5] para ver los resultados de la ejecución de tu pipeline CI en los siguientes niveles: **Pipeline**, **Etapa**, **Trabajo*, **Paso** y **Comando**.

{{< img src="/continuous_integration/pipeline_executions.png" text="Página de ejecuciones de CI Pipeline" style="width:100%" >}}

## Facetas CI predeterminadas

El panel **CI** de la izquierda muestra las facetas predeterminadas que puedes utilizar para buscar para tus ejecuciones de pipelines.

| Faceta | Descripción |
|---|---|
| Estado de CI | Estado de ejecución de la CI: `Success` , `Failure` o `Canceled`. |
| Instancia de CI | Nombre de instancia del proveedor de CI. |
| Duración | Duración de la ejecución del pipeline. |
| ID de pipeline | El ID del pipeline. |
| Proveedor de CI | El nombre del proveedor de CI. |
| Etiquetas (labels) de nodo | Las etiquetas (labels) del nodo. |
| Nombre de nodo | El nombre del nodo. |
| Pipeline parcial | Se refiere a las ejecuciones de pipelines CI que incluyen reintentos, aprobaciones manuales u otras secuencias incompletas. |
| Reintento parcial | Indica si la ejecución de la CI es un reintento de una ejecución anterior. |
| Activación manual | Indica si la ejecución de la CI se activó manualmente. |
| Parámetros | Los parámetros definidos por el usuario cuando se activa un pipeline o un trabajo. |
| Número de pipeline | El número del pipeline. |
| URL de pipeline | La URL del pipeline. |
| Tiempo de espera en cola | Duración total de la espera de un trabajo o tarea en la cola de CI antes de su ejecución. |
| Despliegue | El entorno GitLab desplegado con un pipeline CI. |
| Acción de despliegue | La acción realizada en el entorno GitLab desplegado. |
| Nombre de comando | El identificador definido por el usuario para un comando específico en el pipeline CI. |
| Comando | La línea de comandos que se ejecutó para generar el tramo (span) de pipeline personalizado. |
| Pipeline aguas abajo | Indica si este pipeline está aguas abajo de otro pipeline. |
| ID de pipeline | Identificador de la ejecución del pipeline que precede y activa el pipeline actual. |
| Nombre de paso | El nombre asignado a un paso específico en un pipeline CI. |
| Dominio de error | El tipo de error de una ejecución de CI, como proveedor, usuario o desconocido. |
| Duración de ejecución | La duración total de la ejecución del pipeline CI. |
| Tiempo de espera | El tiempo total de espera para la aprobación manual en una ejecución de CI. |
| En despliegue | Indica si un trabajo dentro del pipeline inició un despliegue. |
| Contiene despliegue | Indica si el pipeline incluye trabajos que activan un despliegue. |
| En ruta crítica | Indica si el trabajo está en la ruta crítica de la ejecución del pipeline CI. |

Para obtener más información sobre las facetas comunes que puedes utilizar como parte de tu consulta de búsqueda en el Explorador de CI Visibility, consulta [Facetas de ejecución de pipelines][3]. 

## Detalles y trazas (traces) de las ejecuciones de pipelines

Puedes ver datos agregados sobre ejecuciones de pipelines en el periodo de tiempo seleccionado. Utiliza el campo de búsqueda y las facetas para acotar la lista hasta a las ejecuciones que quieres investigar. Cambia la lista para mostrar pipelines, etapas o trabajos utilizando los botones de la parte superior.

A continuación se muestran tres gráficos que presentan las duraciones de tus pipelines más activos, tus pipelines fallidos a lo largo del tiempo y las ejecuciones de tus pipelines con una opción para cambiar a duración acumulada, respectivamente. Estos gráficos se limitan al nivel elegido en la parte superior izquierda (`Pipeline`, `Stage`, `Job` y más.)

{{< img src="ci/pipeline_explorer_trends.png" alt="Gráfico de tendencias de vistas del Explorador por Duración, Errores y Ejecuciones" style="width:100%;">}}

Cada ejecución de pipeline se presenta como una traza, que incluye información sobre la etapa y el trabajo. Accede a las trazas de la ejecución individual del pipeline, de la etapa y del trabajo haciendo clic en una ejecución de la lista (similar a hacer clic en una ejecución de pipeline desde la vista Detalles del pipeline).

Los datos del pipeline CI están disponibles en [dashboards][6] y [notebooks][7], para permitir a los equipos de ingeniería de compilaciones personalizar su comunicación sobre el trabajo de alta prioridad y las tendencias de CI a lo largo del tiempo.

## Buscar y filtrar

Puedes limitar, ampliar o cambiar tu enfoque en un subconjunto de ejecuciones de pipelines haciendo clic en las facetas de la izquierda o escribiendo tu propia consulta personalizada en la barra de búsqueda. Cuando seleccionas o anulas la selección de facetas, la barra de búsqueda refleja automáticamente tus cambios. Del mismo modo, puedes modificar la consulta de la barra de búsqueda o escribir una consulta desde cero en la barra de búsqueda para seleccionar y deseleccionar las facetas de la izquierda.

- Para saber cómo buscar pipelines, consulta [Buscar y gestionar][1].
- Para aprender a crear consultas, lee [Sintaxis de búsqueda][2].

## Analizar

Para derivar o consolidar la información, agrupa tus ejecuciones de pipelines consultadas en entidades más claras como campos, patrones y transacciones. Mediante el uso de [facetas][3], que no necesitas crear para buscar atributos, puedes realizar las siguientes acciones:

- Buscar y realizar un seguimiento del progreso de los tests que se ejecutan en un pipeline de CI/CD.
- Investigar cada ejecución de trabajo de CI/CD para identificar y solucionar los errores en los tests.

## Visualizar

Selecciona un tipo de vista para visualizar los resultados de tus filtros y agregaciones y comprender mejor las ejecuciones de tus pipelines. Por ejemplo, puedes ver las ejecuciones de tus pipelines en una lista para organizar los datos en columnas o en un [gráfico de series temporales][8] para medir los datos de tus pipelines a lo largo del tiempo.

## Exportar

[Exporta tu vista][4] en el Explorador de CI Visibility para volver a utilizarla más adelante o en contextos diferentes.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/continuous_integration/search
[2]: /es/continuous_integration/explorer/search_syntax
[3]: /es/continuous_integration/explorer/facets
[4]: /es/continuous_integration/explorer/saved_views
[5]: https://app.datadoghq.com/ci/pipeline-executions
[6]: https://app.datadoghq.com/dashboard/lists
[7]: https://app.datadoghq.com/notebook/list
[8]: https://app.datadoghq.com/ci/pipeline-executions?viz=timeseries