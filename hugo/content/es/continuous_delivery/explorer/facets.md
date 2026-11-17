---
description: Aprenda sobre las facetas para filtrar y agrupar sus ejecuciones de implementación.
further_reading:
- link: continuous_delivery/explorer/
  tag: Documentación
  text: Aprenda a consultar y visualizar implementaciones
title: Facetas de ejecución de implementación
---
{{< callout btn_hidden="true" header="false" >}}
CD Visibility está en visión preliminar. El acceso está limitado a las organizaciones ya inscritas.
{{< /callout >}}

## Descripción general {#overview}

Las facetas son etiquetas y atributos definidos por el usuario de sus pipelines. Son útiles tanto para el análisis de datos [cualitativos](#qualitative-facets) como [cuantitativos](#quantitative-measures). Las facetas le permiten manipular sus implementaciones en las consultas de búsqueda que aparecen en [dashboards][2] y en [notebooks][3].

[Crear facetas](#creating-facets) **no es necesario** para [buscar ejecuciones de implementación][5]. Las capacidades de autocompletado usan facetas existentes, pero también se aplica cualquier entrada que coincida con las ejecuciones de implementación entrantes.

La [página Deployment Executions][4] incluye facetas predeterminadas como `Environment`, `Deployment Status` y `Deployment Provider`. Puede usar facetas en el Explorador de CD Visibility para:

- [Buscar y filtrar ejecuciones de implementación][5].
- Realice análisis de implementación o de entorno.
- Comience la resolución de problemas después de que sus implementaciones se completen.

Navegue a [**Software Delivery** > **CD Visibility** > **Executions**][4] para acceder a la lista de facetas a la izquierda de la lista de ejecuciones de implementación.

{{< img src="/continuous_delivery/explorer/facets.png" text="Facets list on the Deployment Executions page of the CD Visibility Explorer" style="width:100%" >}}

### Facetas cualitativas {#qualitative-facets}

Utilice facetas cualitativas cuando necesite:

- **Obtenga información relativa** para los valores.
- **Cuente valores únicos**.
- Frecuentemente **filtre** sus ejecuciones de implementación según valores particulares. Por ejemplo, use la faceta de la etiqueta de entorno para limitar la resolución de problemas al contexto de los entornos de desarrollo, preproducción o producción.<br>

**Nota:** Aunque las facetas no son necesarias para filtrar por etiquetas, definir facetas para las etiquetas que usa durante las investigaciones puede reducir su tiempo de resolución.

### Medidas cuantitativas {#quantitative-measures}

Utilice medidas cuantitativas cuando necesite:

- **Agregue** valores de múltiples ejecuciones de implementación.
- **Filtre por rango** sus ejecuciones de implementación.
- **Ordene** sus ejecuciones de implementación según ese valor.

#### Tipos {#types}

Las medidas tienen un valor de entero largo o doble para capacidades equivalentes.

#### Unidades {#units}

Las medidas admiten unidades (**tiempo** en segundos o **tamaño** en bytes) para el manejo de órdenes de magnitud al momento de la consulta y de la visualización. La unidad es una propiedad de la medida en sí, no del campo.

Por ejemplo, considere una `duration` medida en nanosegundos. Suponga que las implementaciones de `env:staging` tienen `duration:10000000`, lo que significa `10 milliseconds`. Suponga que las implementaciones de `env:qa` tienen `duration:5000000`, lo que significa `5 milliseconds`. Use `duration:>2ms` para consultar de manera consistente las etiquetas de ejecución de implementación de ambos entornos a la vez. Para obtener más información sobre las consultas de búsqueda, consulte [Sintaxis de búsqueda][6].

## Panel de facetas {#facet-panel}

La barra de búsqueda proporciona el conjunto de interacciones más completo para filtrar y agrupar sus datos. Sin embargo, para muchos casos, el panel de facetas es una forma sencilla de navegar por sus datos. Abra una faceta para ver un resumen de su contenido para el contexto de la consulta actual.

La barra de búsqueda y la URL reflejan automáticamente sus selecciones del panel de facetas.

- **Las facetas (cualitativas)** vienen con una lista principal de valores únicos y un conteo de ejecuciones de implementación que coinciden con cada uno de ellos.
- **Las medidas (cuantitativas)** vienen con un control deslizante que indica los valores mínimos y máximos. Utilice el control deslizante, o ingrese valores numéricos, para definir el contexto de la consulta de búsqueda en diferentes rangos.

### Agrupación de facetas{#grouping-facets}

Las facetas se agrupan en temas significativos en la lista de facetas. Asignar o reasignar un grupo para una faceta afecta solo a la lista de facetas y no tiene impacto en la búsqueda o el análisis.

### Filtrado de facetas{#filtering-facets}

Utilice el cuadro de búsqueda de facetas en el panel de facetas para definir el contexto de toda la lista de facetas y navegar hasta la faceta con la que necesita interactuar. *Search facets* utiliza el nombre de visualización de la faceta y el nombre del campo para definir el contexto de los resultados.

## Creación de facetas{#creating-facets}

No es necesario crear una faceta para un atributo o una etiqueta de ejecución de implementación a fin de buscar ejecuciones de implementación. Las facetas son útiles si desea agregar una descripción significativa a un atributo específico de ejecución de implementación, o si desea que los valores del atributo aparezcan en la lista de Facets.

### Creación de facetas desde el panel lateral Deployment Details {#creating-facets-from-the-deployment-details-side-panel}

Cree una faceta desde el panel lateral Deployment Details para que la mayoría de los detalles de la faceta se completen automáticamente.

{{< img src="continuous_delivery/explorer/create_facet.png" alt="Cree una faceta desde el panel lateral Deployment Details" style="width:100%;">}}

1. Navegue hasta una ejecución de implementación de interés en la [página Deployment Executions][4] que contenga el campo para el que desea crear una faceta.
2. Abra el panel lateral Deployment Details seleccionando la ejecución de implementación de la lista.
3. Haga clic en el campo deseado y cree una faceta desde allí:

   - Si el campo tiene un valor numérico, puede crear una faceta o una medida.
   - Si el campo tiene un valor de cadena, solo está disponible la creación de facetas.

### Creación de facetas desde la lista de facetas {#creating-facets-from-the-facet-list}

Si no es posible encontrar una ejecución de implementación que tenga el campo deseado, cree una faceta directamente desde el panel de facetas haciendo clic en **+ Add**.

{{< img src="continuous_delivery/explorer/add_facet.png" alt="Agregue una faceta desde el panel lateral de facetas" style="width:30%;">}}

Defina el nombre del campo subyacente (clave) para esta faceta:

- Use el nombre de la clave de etiqueta para las etiquetas de entorno.
- Use la ruta del atributo para los atributos de ejecución de implementación, con el prefijo `@`.

El autocompletado basado en el contenido de las ejecuciones de implementación de las vistas actuales le ayuda a definir el nombre de campo adecuado. Pero puede usar prácticamente cualquier valor aquí, incluso si Datadog aún no ha recibido ejecuciones de implementación que coincidan.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/types/ci
[2]: /es/dashboards/
[3]: /es/notebooks/
[4]: https://app.datadoghq.com/ci/deployments/executions
[5]: /es/continuous_delivery/explorer#deployment-executions
[6]: /es/continuous_delivery/explorer/search_syntax