---
description: Conoce las facetas predeterminadas que puedes utilizar para buscar ejecuciones
  de tus pipelines en el Explorador de CI Visibility.
further_reading:
- link: continuous_integration/search/
  tag: Documentación
  text: Más información sobre cómo buscar tus pipelines
- link: continuous_integration/explorer/
  tag: Documentación
  text: Más información sobre el Explorador de CI Visibility
title: Facetas de ejecución de pipelines
---

## Información general

Las facetas son atributos y etiquetas (tags) definidos por el usuario a partir de tus pipelines. Son útiles para el análisis de datos [cualitativos](#qualitative-facets) y también [cuantitativos](#quantitative-measures). Las facetas te permiten manipular tus pipelines en tus [monitores de pipelines CI][1] y en las consultas de búsqueda que aparecen en [dashboards][2] y en [notebooks][3].

No es **necesario** [crear facetas](#creating-facets) para [buscar ejecuciones de pipelines][5]. Las funciones de autocompletar utilizan facetas existentes, pero también se utiliza cualquier entrada que coincida con las ejecuciones de pipelines entrantes.

## Facetas frecuentes

Ve a [**Software Delivery** > **CI Visibility** > **Executions** (Entrega de software > CI Visibility > Ejecuciones)][7] para acceder a la lista de facetas a la izquierda de la lista de ejecuciones de pipelines.

{{< img src="/continuous_integration/facets-pipelines.png" text="Lista de facetas en la página Ejecuciones de pipelines del Explorador de CI Visibility" style="width:100%" >}}

El [Explorador de CI Visibility][4] incluye las siguientes facetas predefinidas:

| Faceta | Descripción |
|---|---|
| Proveedor de CI | Nombre del proveedor de CI (GitHub, GitLab, etc.). |
| Nombre del pipeline | Nombre del pipeline CI. |
| Nombre del nodo | Nombre del nodo CI que ejecutó el pipeline, la etapa o el trabajo. |
| Etiquetas (labels) del nodo | Etiquetas (labels) asociadas con el nodo CI que ejecutó el pipeline, la etapa o el trabajo. |
| URL del pipeline | URL del proveedor para la ejecución de un pipeline. |
| ID del pipeline | ID del pipeline. |
| Número del pipeline | Número de ejecución de un pipeline CI, proporcionado por el proveedor de CI. Aumenta cuando se reintenta parcialmente un pipeline. |
| URL del trabajo | URL del proveedor para la ejecución de un trabajo. |
| Nombre de la etapa | Nombre de la etapa CI. |
| Nombre del trabajo | Nombre del trabajo CI. |
| Espacio de nombres Kubernetes | Espacio de nombres Kubernetes en que se ejecuta el pod Kubernetes. |
| Nombre del pod Kubernetes | Nombre del pod Kubernetes. |
| Etiqueta (tag) de imagen | Etiqueta (tag) de la imagen del contenedor Kubernetes. |
| Nombre del contenedor | Etiqueta (tag) del nombre del contenedor Kubernetes. |
| Nombre de la imagen | Etiqueta (tag) del nombre de la imagen del contenedor Kubernetes. |
| ID del contenedor | ID del contenedor Kubernetes. |
| Nombre del contenedor Kubernetes | Nombre del contenedor Kubernetes. |
| Despliegue de Kubernetes | Despliegue de Kubernetes al que pertenece un pod. |
| StatefulSet Kubernetes | StatefulSet Kubernetes al que pertenece un pod. |
| URL del repositorio | URL del repositorio Git. |
| ID del repositorio | ID que identifica de forma única un repositorio Git. |
| SHA de confirmación | SHA de confirmación Git. |
| Rama | Rama Git. |
| Etiqueta (Tag) | Etiqueta (tag) Git. |
| Correo electrónico del autor | Correo electrónico del autor de Git. |
| Correo electrónico de quien confirma | Correo electrónico de quien confirma Git. |
| Fecha de quien confirma | Fecha de quien confirma Git. |
| Fecha del autor | Fecha del autor Git. |
| Entorno | Entorno en el que se está ejecutando el pipeline CI. |
| Recurso | Recurso utilizado por el pipeline CI.. |
| Nombre de la operación | Operación realizada en el pipeline CI. |
| Tipo de error | Tipo de error encontrado durante la ejecución de CI. |
| Tipo | Tipo de ejecución o entidad CI. |
| Traza (trace) completa | Traza completa de la ejecución del pipeline CI. |
| Duración | Duración de la ejecución en segundos. |
| Versión | Versión del pipeline o la herramienta CI utilizados. |
| Es la rama por defecto | Indica si la ejecución se realizó en la rama por defecto del repositorio Git. |

En el Explorador de CI Visibility, puedes utilizar facetas para:

- [Buscar y filtrar ejecuciones de pipelines][5].
- Realizar análisis de pipelines.
- Empezar a solucionar problemas una vez completados tus pipelines.


### Facetas cualitativas

Utiliza facetas cualitativas cuando necesites:

- **Obtener información relativa** de los valores.
- **Contar valores únicos**.
- **Filtrar** con frecuencia las ejecuciones de tus pipelines según determinados valores. Por ejemplo, crea una faceta en una etiqueta (tag) de entorno para delimitar la resolución de problemas a entornos de desarrollo, staging o producción.<br>

**Nota:** Aunque las facetas no son necesarias para filtrar las etiquetas (tags), definir facetas para las etiquetas (tags) que utilizas a menudo durante las investigaciones te ayudará a reducir el tiempo de resolución.

### Medidas cuantitativas

Utiliza medidas cuantitativas cuando necesites:

- **Agregar** valores de varias ejecuciones de pipelines.
- **Filtrar por rangos** tus ejecuciones de pipelines.
- **Ordenar** tus ejecuciones de pipelines según ese valor.

#### Tipos

Las medidas tienen un valor entero largo o doble para capacidades equivalentes.

#### Unidades

Las medidas admiten unidades (**tiempo** en segundos o **tamaño** en bytes) para controlar órdenes de magnitud en tiempo de consulta y visualización. La unidad es una propiedad de la propia medida, no del campo.

Por ejemplo, considera una medida de `duration` en nanosegundos. Supongamos que las ejecuciones de pipelines de `service:A` tienen `duration:10000000`, es decir `10 milliseconds`. Supongamos que las ejecuciones de pipelines de `service:B` tienen `duration:5000000`, es decir `5 milliseconds`. Utiliza `duration:>2ms` para consultar de forma consistente etiquetas (tags) de ejecución de pipelines de ambos servicios a la vez. Para obtener más información sobre las consultas de búsqueda, consulta la [sintaxis de búsqueda][6].

## Panel de facetas

El buscador ofrece el conjunto más completo de interacciones para filtrar y agrupar tus datos. Sin embargo, en muchos casos, el panel de facetas es una forma sencilla de navegar por tus datos. Abre una faceta para ver un resumen de su contenido en el contexto de la consulta actual.

El buscador y la URL reflejan automáticamente las opciones seleccionadas del panel de facetas.

- Las **facetas (cualitativas)** vienen con una lista de los principales valores únicos y un recuento de ejecuciones de pipelines que coinciden con cada uno de ellos.
- Las **medidas (cuantitativas)** incluyen un regulador que indica los valores mínimo y máximo. Utiliza este regulador o indica valores numéricos para ampliar el contexto de la consulta a diferentes límites.


### Agrupar facetas

Las facetas se agrupan por temas significativos en la lista de facetas. Asignar o reasignar un grupo a una faceta solo afecta a la lista de facetas y no repercute en la búsqueda ni en los análisis.

### Filtrar facetas

Utiliza el cuadro de facetas de búsqueda del panel de facetas para ver toda la lista de facetas e ir a la faceta con la que necesitas interactuar. Para delimitar los resultados, las facetas de búsqueda utilizan el nombre de visualización de la faceta y el nombre del campo.

## Crear facetas

La creación de una faceta en un atributo o una etiqueta (tag) de ejecución de pipeline no es un paso obligatorio para buscar ejecuciones de pipelines. Las facetas son útiles si quieres añadir una descripción significativa a un atributo de ejecución de pipeline específico o si quieres que los valores del atributo aparezcan en la lista de facetas.

### Creación de facetas desde el panel lateral de ejecuciones de pipelines

La forma más sencilla de crear una faceta es añadirla desde el panel lateral de ejecuciones de pipelines, de modo que la mayoría de los detalles de la faceta ya estén rellenados.

{{< img src="continuous_integration/create_facet.png" alt="Crear una faceta desde el panel lateral de ejecuciones de pipelines CI" style="width:100%;">}}

1. Ve a una ejecución de pipeline de interés en el [Explorador de CI Visibility][4], que contenga el campo sobre el cual crear una faceta.
2. Abre el panel lateral de ejecuciones de pipelines seleccionando la ejecución de pipeline en la lista.
3. Haz clic en el campo deseado (en la pestaña **Información** de un tramo (span) de una ejecución de pipeline) y crea una faceta a partir de allí:

   - Si el campo contiene un valor numérico, puedes crear una faceta o una medida.
   - Si el campo contiene un valor de cadena, solo está disponible la creación de facetas.

### Crear facetas a partir de la lista de facetas

Si no encuentras una ejecución de pipeline que contenga el campo deseado, crea una faceta directamente desde el panel de facetas haciendo clic en **+ Add** (+ Añadir).

{{< img src="continuous_integration/add_facet.png" alt="Añadir una faceta desde el panel lateral de facetas" style="width:30%;">}}

Define el nombre del campo subyacente (clave) de esta faceta:

- Utiliza el nombre de la clave de etiqueta (tag) para las etiquetas (tags) de infraestructura.
- Utiliza la ruta de atributos para atributos de ejecución de pipelines con el prefijo `@`.

La opción autocompletar basada en el contenido de las ejecuciones de pipelines de las vistas actuales te ayuda a definir el nombre de campo adecuado. Sin embargo, puedes utilizar prácticamente cualquier valor, específicamente en el caso de que Datadog aún no haya recibido ejecuciones de pipelines coincidentes.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/types/ci
[2]: /es/dashboards/
[3]: /es/notebooks/
[4]: /es/continuous_integration/explorer
[5]: /es/continuous_integration/search
[6]: /es/continuous_integration/explorer/search_syntax/
[7]: https://app.datadoghq.com/ci/pipeline-executions