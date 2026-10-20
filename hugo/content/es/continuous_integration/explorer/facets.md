---
description: Obtenga información sobre las facetas predeterminadas que puede usar
  para buscar las ejecuciones de su pipeline en el CI Visibility Explorer.
further_reading:
- link: continuous_integration/search/
  tag: Documentación
  text: Aprenda a buscar sus pipelines
- link: continuous_integration/explorer/
  tag: Documentación
  text: Obtenga información sobre el CI Visibility Explorer
title: Facetas de ejecución de pipeline
---
## Descripción general {#overview}

Las facetas son etiquetas y atributos definidos por el usuario de sus pipelines. Son útiles tanto para el análisis de datos [cualitativos](#qualitative-facets) como [cuantitativos](#quantitative-measures). Las facetas le permiten manipular sus pipelines en sus [monitores de pipeline de CI][1], y en consultas de búsqueda que aparecen en [paneles][2] y en [cuadernos][3].

[Crear facetas](#creating-facets) **no es necesario** para [buscar ejecuciones de pipeline][5]. Las capacidades de autocompletado usan facetas existentes, pero también se aplica cualquier entrada que coincida con las ejecuciones de pipeline entrantes.

## Facetas comunes {#common-facets}

Navegue a [**Software Delivery** > **CI Visibility** > **Ejecuciones**][7] para acceder a la lista de facetas a la izquierda de la lista de ejecuciones de pipeline.

{{< img src="/continuous_integration/facets-pipelines.png" text="Facets list on the Pipeline Executions page of the CI Visibility Explorer" style="width:100%" >}}

El [Explorador CI Visibility][4] incluye las siguientes facetas listas para usar:

| Faceta | Descripción |
|---|---|
| Proveedor de CI | Nombre del proveedor de CI (GitHub, GitLab y más). |
| Nombre del pipeline | Nombre del pipeline de CI. |
| Nombre del nodo | Nombre del nodo de CI que ejecutó el pipeline, la etapa o el trabajo. |
| Etiquetas del nodo | Etiquetas asociadas con el nodo de CI que ejecutó el pipeline, la etapa o el trabajo. |
| URL del pipeline | URL del proveedor para una ejecución de pipeline. |
| ID del pipeline | ID del pipeline. |
| Número de pipeline | Número de ejecución de un pipeline de CI, proporcionado por el proveedor de CI. Esto aumenta al reintentar parcialmente un pipeline. |
| URL del trabajo | URL del proveedor para una ejecución de trabajo. |
| Nombre de la etapa | Nombre de la etapa de CI. |
| Nombre del trabajo | Nombre del trabajo de CI. |
| Espacio de nombres de Kubernetes | El espacio de nombres en el que se está ejecutando el Pod de Kubernetes. |
| Nombre del Pod de Kubernetes | Nombre del Pod de Kubernetes. |
| Etiqueta de imagen | Etiqueta de imagen de contenedor de Kubernetes. |
| Nombre del contenedor | Etiqueta de nombre de contenedor de Kubernetes. |
| Nombre de la imagen | Etiqueta de nombre de imagen de contenedor de Kubernetes. |
| ID de contenedor | ID de contenedor de Kubernetes. |
| Nombre del contenedor de Kubernetes | Nombre del contenedor de Kubernetes. |
| Despliegue de Kubernetes | El despliegue de Kubernetes al que pertenece un pod. |
| StatefulSet de Kubernetes | El StatefulSet de Kubernetes al que pertenece un pod. |
| URL del repositorio | URL del repositorio Git. |
| ID del repositorio | ID que identifica de forma única un repositorio Git. |
| SHA de confirmación | SHA de confirmación de Git. |
| Rama | Rama de Git. |
| Etiqueta | Etiqueta de Git. |
| Correo electrónico del autor | Correo electrónico del autor de Git. |
| Committer Email | Correo electrónico del Committer de Git. |
| Fecha del Committer | Fecha del Committer de Git. |
| Fecha de autor | Fecha de autor de Git. |
| Entorno | El entorno en el que se ejecuta el pipeline de CI. |
| Recurso | El recurso utilizado por el pipeline de CI. |
| Nombre de la operación | La operación realizada dentro del pipeline de CI. |
| Tipo de error | Tipo de error encontrado durante la ejecución de CI. |
| Tipo | Tipo de la ejecución o entidad de CI. |
| Traza completa | Traza completa de la ejecución del pipeline de CI. |
| Duración | La duración de la ejecución en segundos. |
| Versión | Versión del pipeline de CI o herramienta utilizada. |
| Es rama predeterminada | Indica si la ejecución se realizó en la rama predeterminada del repositorio de Git. |

Puede usar facetas en el Explorador de CI Visibility para:

- [Buscar y filtrar ejecuciones de pipeline][5]
- Realice análisis de pipeline
- Comience la resolución de problemas una vez que sus pipelines se completen


### Facetas cualitativas {#qualitative-facets}

Utilice facetas cualitativas cuando necesite:

- **Obtenga información relativa** para los valores.
- **Cuente valores únicos**.
- Filtre**frecuentemente** sus ejecuciones de pipeline según valores particulares. Por ejemplo, cree una faceta en una etiqueta de entorno para contextualizar la resolución de problemas a entornos de desarrollo, staging o producción.<br>

**Nota:** Aunque las facetas no son necesarias para filtrar por etiquetas, definir facetas para las etiquetas que usa a menudo durante las investigaciones puede ayudar a reducir su tiempo de resolución.

### Medidas cuantitativas {#quantitative-measures}

Utilice medidas cuantitativas cuando necesite:

- **Agregue** valores de múltiples ejecuciones de pipeline.
- **Filtre por rango** sus ejecuciones de pipeline.
- **Ordene** sus ejecuciones de pipeline según ese valor.

#### Tipos {#types}

Las medidas tienen un valor de entero largo o doble para capacidades equivalentes.

#### Unidades {#units}

Las medidas admiten unidades (**tiempo** en segundos o **tamaño** en bytes) para el manejo de órdenes de magnitud al momento de la consulta y de la visualización. La unidad es una propiedad de la medida en sí, no del campo.

Por ejemplo, considere una `duration` medida en nanosegundos. Suponga que las ejecuciones de pipeline de `service:A` tienen `duration:10000000`, lo que significa `10 milliseconds`. Suponga que las ejecuciones de pipeline de `service:B` tienen `duration:5000000`, lo que significa `5 milliseconds`. Utilice `duration:>2ms` para consultar de manera consistente las etiquetas de ejecución de pipeline de ambos servicios a la vez. Para obtener más información sobre las consultas de búsqueda, consulte [Sintaxis de búsqueda][6].

## Panel de facetas {#facet-panel}

La barra de búsqueda proporciona el conjunto de interacciones más completo para filtrar y agrupar sus datos. Sin embargo, para muchos casos, el panel de facetas es una forma sencilla de navegar por sus datos. Abra una faceta para ver un resumen de su contenido para el contexto de la consulta actual.

La barra de búsqueda y la URL reflejan automáticamente sus selecciones del panel de facetas.

- **Las facetas (cualitativas)** vienen con una lista principal de valores únicos y un conteo de ejecuciones de pipeline que coinciden con cada uno de ellos.
- **Las medidas (cuantitativas)** vienen con un control deslizante que indica los valores mínimos y máximos. Utilice el control deslizante, o ingrese valores numéricos, para definir el contexto de la consulta de búsqueda en diferentes rangos.


### Agrupación de facetas{#grouping-facets}

Las facetas se agrupan en temas significativos en la lista de facetas. Asignar o reasignar un grupo para una faceta afecta solo a la lista de facetas y no tiene impacto en la búsqueda o el análisis.

### Filtrado de facetas{#filtering-facets}

Utilice el cuadro de búsqueda de facetas en el panel de facetas para definir el contexto de toda la lista de facetas y navegar hasta la faceta con la que necesita interactuar. La búsqueda de facetas utiliza el nombre de visualización de la faceta y el nombre del campo para definir el contexto de los resultados.

## Creación de facetas{#creating-facets}

Crear una faceta en un atributo o etiqueta de ejecución de pipeline no es un paso obligatorio para buscar ejecuciones de pipeline. Las facetas son útiles si desea agregar una descripción significativa a un atributo de ejecución de pipeline específico, o si desea que los valores de los atributos aparezcan en la lista de Facetas.

### Creación de facetas desde los paneles laterales de Ejecuciones de Pipeline{#creating-facets-from-the-pipeline-executions-side-panels}

La forma más sencilla de crear una faceta es agregarla desde el panel lateral de Ejecuciones de Pipeline para que la mayoría de los detalles de la faceta estén prellenados.

{{< img src="continuous_integration/create_facet.png" alt="Cree una faceta desde el panel lateral de ejecución de pipeline de CI" style="width:100%;">}}

1. Navegue a una ejecución de pipeline de interés en el [CI Visibility Explorer][4] que contenga el campo sobre el cual crear una faceta.
2. Abra el panel lateral de Ejecuciones de Pipeline seleccionando la ejecución de pipeline de la lista.
3. Haga clic en el campo deseado (en la pestaña **Info** para el tramo de una ejecución de pipeline) y cree una faceta desde allí:

   - Si el campo tiene un valor numérico, puede crear una faceta o una medida.
   - Si el campo tiene un valor de cadena, solo está disponible la creación de facetas.

### Creación de facetas desde la lista de facetas {#creating-facets-from-the-facet-list}

Si no es una opción encontrar una ejecución de pipeline que tenga el campo deseado, cree una faceta directamente desde el panel de facetas haciendo clic en {{< ui >}}\+ Add{{< /ui >}}.

{{< img src="continuous_integration/add_facet.png" alt="Agregue una faceta desde el panel lateral de facetas" style="width:30%;">}}

Defina el nombre del campo subyacente (clave) para esta faceta:

- Use el nombre de la clave de etiqueta para las etiquetas de infraestructura.
- Use la ruta del atributo para los atributos de ejecución de pipeline, con el prefijo `@`.

El autocompletado basado en el contenido de las ejecuciones de pipeline de las vistas actuales le ayuda a definir el nombre de campo adecuado. Pero puede usar prácticamente cualquier valor aquí, específicamente en el caso de que aún no tenga ejecuciones de pipeline coincidentes recibidas por Datadog.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/types/ci
[2]: /es/dashboards/
[3]: /es/notebooks/
[4]: /es/continuous_integration/explorer
[5]: /es/continuous_integration/search
[6]: /es/continuous_integration/explorer/search_syntax/
[7]: https://app.datadoghq.com/ci/pipeline-executions