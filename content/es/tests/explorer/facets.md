---
description: Descubre las facetas predeterminadas que puedes utilizar para buscar
  ejecuciones de tests en el Explorador de visibilidad de tests.
further_reading:
- link: tests/search/
  tag: Documentación
  text: Aprende a buscar tests
- link: tests/explorer/
  tag: Documentación
  text: Más información sobre el Explorador de visibilidad de tests
kind: documentación
title: Facetas de ejecuciones de tests
---

## Información general

Las facetas son atributos y etiquetas (tags) que el usuario define a partir de sus tests. Son útiles para el análisis de datos tanto [cualitativos](#qualitative-facets) como [cuantitativos](#quantitative-measures). Las facetas permiten manipular los tests en los [monitores de tests de CI][1] y en las consultas de búsqueda que aparecen en [dashboards][2] y en [notebooks][3].

[Crear facetas](#creating-facets) no es **obligatorio** para [buscar ejecuciones de tests][5]. Las capacidades de autocompletar utilizan facetas existentes, pero también se aplica cualquier entrada que coincida con las ejecuciones de tests entrantes.

## Facetas comunes

Ve a [**Software Delivery** (Entrega de software) > **Test Visibility** (Visibilidad de tests) > **Test Runs** (Ejecuciones de tests)][7] para acceder a la lista de facetas a la izquierda de la lista de ejecuciones de tests.

{{< img src="/continuous_integration/facets-tests.png" text="Lista de facetas en la página Ejecuciones de tests del Explorador de visibilidad de tests" style="width:100%" >}}

Puedes utilizar facetas en el Explorador de visibilidad de tests para hacer lo siguiente:

- [Buscar y filtrar ejecuciones de tests][5]
- Ejecutar análisis de tests
- Solucionar problemas una vez finalizados los tests

El [Explorador de visibilidad de tests][4] incluye las siguientes facetas:

| Faceta | Descripción |
|---|---|
| Proveedor de CI | El nombre del proveedor de CI (GitHub, GitLab, etc.). |
| Nombre del pipeline | El nombre del pipeline de CI. |
| Nombre del nodo | El nombre del nodo de CI que ejecutó el pipeline, la etapa o el trabajo. |
| Etiquetas del nodo | Las etiquetas (labels) asociadas con el nodo de CI que ejecutó el pipeline, la etapa o el trabajo. |
| URL del pipeline | La URL del proveedor para la ejecución de un pipeline. |
| ID de pipeline | El ID del pipeline. |
| Número de pipeline | El número de ejecución de un pipeline de CI, que proporciona el proveedor de CI. Aumenta cuando se reintenta parcialmente un pipeline. |
| URL del trabajo | La URL del proveedor para la ejecución de un trabajo. |
| Nombre de la etapa | El nombre de la etapa de CI. |
| Nombre del trabajo | El nombre del trabajo de CI. |
| Espacio de nombres de Kubernetes | El espacio de nombres en el que se ejecuta el pod de Kubernetes. |
| Nombre del pod de Kubernetes | El nombre del pod de Kubernetes. |
| Etiqueta de la imagen | La etiqueta (tag) de la imagen de contenedor de Kubernetes. |
| Nombre del contenedor | La etiqueta del nombre del contenedor de Kubernetes. |
| Nombre de la imagen | La etiqueta del nombre de la imagen de contenedor de Kubernetes. |
| ID del contenedor | El ID del contenedor de Kubernetes. |
| Nombre del contenedor de Kubernetes | El nombre del contenedor de Kubernetes. |
| Despliegue de Kubernetes | El despliegue de Kubernetes al que pertenece un pod. |
| Conjunto de estados de Kubernetes | El conjunto de estados de Kubernetes al que pertenece un pod. |
| URL del repositorio | La URL del repositorio de Git. |
| ID del repositorio | El ID que identifica de forma exclusiva un repositorio de Git. |
| SHA del commit | El SHA del commit de Git. |
| Rama | La rama de Git. |
| Etiqueta | La etiqueta de Git. |
| Correo electrónico del autor | El correo electrónico del autor de Git. |
| Correo electrónico del committer | El correo electrónico del committer de Git. |
| Fecha del committer | La fecha del committer de Git. |
| Fecha del autor | La fecha del autor de Git. |
| Variable de entorno | El entorno en el que se ejecuta el pipeline de CI. |
| Recurso | El recurso utilizado en el pipeline de CI. |
| Nombre de la operación | La operación realizada dentro del pipeline de CI. |
| Tipo de error | El tipo de error encontrado durante la ejecución de CI. |
| Tipo | El tipo de ejecución o entidad de CI. |
| Traza completa | La traza (trace) completa de la ejecución del pipeline de CI. |
| Duración | La duración de la ejecución en segundos. |
| Versión | La versión del pipeline de CI o la herramienta utilizada. |
| Rama predeterminada | Indica si la ejecución se ha realizado en la rama predeterminada del repositorio de Git. |

### Facetas cualitativas

Utiliza facetas cualitativas cuando tengas que hacer lo siguiente:

- **Obtener una visión relativa** de los valores.
- **Contar valores únicos**.
- **Filtrar** con frecuencia las ejecuciones de tests en función de valores particulares. Por ejemplo, crea una faceta sobre una etiqueta de entorno para seleccionar el contexto de solución de problemas como entornos de desarrollo, ensayo o producción.<br>

**Nota:** Aunque las facetas no son obligatorias para filtrar las etiquetas, definir facetas para las etiquetas que utilizas con frecuencia durante las investigaciones te ayudará a agilizar de resolución.

### Medidas cuantitativas

Utiliza medidas cuantitativas cuando tengas que hacer lo siguiente:

- **Agregar** los valores de varios tests.
- **Filtrar el alcance** de tus tests.
- **Clasificar** tus ejecuciones de tests en función de ese valor.

#### Tipos

Las medidas tienen un valor entero largo o doble para capacidades equivalentes.

#### Unidades

Las medidas admiten unidades (**tiempo** en segundos o **tamaño** en bytes) para controlar órdenes de magnitud en tiempo de consulta y visualización. La unidad es una propiedad de la propia medida, no del campo.

Por ejemplo, considera una medida de `duration` en nanosegundos. Supongamos que las ejecuciones de tests de `service:A` tienen `duration:10000000`, lo que significa `10 milliseconds`. Supongamos que las ejecuciones de tests de `service:B` tienen `duration:5000000`, lo que significa `5 milliseconds`. Utiliza `duration:>2ms` para consultar de forma coherente las etiquetas de ejecución de tests desde ambos servicios a la vez. Para obtener más información sobre las consultas de búsqueda, consulta [Sintaxis de búsqueda][6].

## Panel de facetas

La barra de búsqueda ofrece el conjunto más completo de interacciones para filtrar y agrupar los datos. Sin embargo, en muchos casos, el panel de facetas es una forma más sencilla de navegar por tus datos. Abre una faceta para ver un resumen de su contenido en el contexto de la consulta actual.

La barra de búsqueda y la URL reflejan automáticamente las opciones seleccionadas del panel de facetas.

- Las **facetas (cualitativas)** incluyen un lista superior de valores únicos y un recuento de tests que coinciden con cada uno de ellos.
- Las **medidas (cuantitativas)** incluyen un regulador que indica los valores mínimo y máximo. Utiliza este regulador o indica valores numéricos para seleccionar diferentes límites del contexto de la consulta de búsqueda.

### Agrupar facetas

Las facetas se agrupan por temas significativos en la lista de facetas. Asignar o reasignar un grupo a una faceta solo afecta a la lista de facetas y no repercute en la búsqueda ni en los análisis.

### Filtrar facetas

Utiliza el cuadro de búsqueda de facetas del panel de facetas para seleccionar el contexto de toda la lista de facetas y navegar hasta la faceta con la que necesitas interactuar. La búsqueda de facetas utiliza el nombre de visualización de las facetas y el nombre de los campos para seleccionar el contexto de los resultados.

## Crear facetas

La creación de una faceta en un atributo o etiqueta de ejecución de tests no es un paso obligatorio para buscar ejecuciones de tests. Las facetas son útiles si desea añadir una descripción significativa a un atributo de ejecución de tests específico, o si desea que los valores del atributo aparezcan en la lista de facetas.

### Crear facetas desde el panel lateral de Ejecuciones de tests

La forma más sencilla de crear una faceta es añadirla desde el panel lateral de Ejecuciones de tests, ya que la mayoría de los detalles de la faceta ya están rellenados.

{{< img src="tests/explorer/create_facet.png" alt="Crear una faceta a partir de una ejecución de test fallida en el panel lateral de Ejecuciones de tests" style="width:100%;">}}

1. Navega hasta una ejecución de tests que te interese en el [Explorador de visibilidad de tests][4] que contenga el campo a partir del cual desees crear una faceta.
2. Selecciona la ejecución de tests de la lista para abrir el panel lateral de Ejecuciones de tests.
3. Haz clic en el campo deseado (en la sección **Other tags** [Otras etiquetas] de una ejecución de tests) y crea una faceta a partir de allí:

   - Si el campo contiene un valor numérico, puedes crear una faceta o una medida.
   - Si el campo contiene un valor de cadena, solo está disponible la creación de facetas.

### Crear facetas a partir de la lista de facetas

Si no es posible encontrar una ejecución de tests que contenga el campo deseado, crea una faceta directamente desde el panel de facetas haciendo clic en **+ Add** (+ Añadir).

{{< img src="continuous_integration/add_facet.png" alt="Añadir una faceta desde el panel lateral de facetas" style="width:30%;">}}

Define el nombre del campo subyacente (clave) de esta faceta:

- Utiliza el nombre de la clave de etiqueta para las etiquetas de infraestructura.
- Utiliza la ruta de los atributos para los atributos de ejecución de tests, con el prefijo `@`.

La función de autocompletar basada en el contenido de las ejecuciones de tests de las vistas actuales te ayuda a definir un nombre de campo adecuado. Sin embargo, puedes utilizar prácticamente cualquier valor aquí, específicamente en el caso de que aún no tengas ejecuciones de tests coincidentes recibidas por Datadog.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/types/ci
[2]: /es/dashboards/
[3]: /es/notebooks/
[4]: /es/tests/explorer
[5]: /es/tests/search
[6]: /es/tests/explorer/search_syntax/
[7]: https://app.datadoghq.com/ci/test-runs