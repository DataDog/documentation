---
description: Conoce las facetas para filtrar y agrupar tus ejecuciones de despliegue.
further_reading:
- link: continuous_delivery/explorer/
  tag: Documentación
  text: Aprende a consultar y visualizar los despliegues
title: Facetas de ejecución del despliegue
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" btn_hidden="false" header="Únete a la vista previa" >}}
CD Visibility está en Vista previa. Si te interesa esta función, rellena el formulario para solicitar acceso.
{{< /callout >}}

## Información general

Las facetas son etiquetas y atributos definidos por el usuario a partir de tus pipelines. Son útiles para el análisis de datos tanto [cualitativo](#qualitative-facets) como [cuantitativo](#quantitative-measures). Las facetas te permiten manipular tus despliegues en las consultas de búsqueda que aparecen en [dashboards][2] y en [notebools][3].

[Crear facetas](#creating-facets) no es **necesario** para [buscar ejecuciones de despliegue][5]. Las capacidades de autocompletar utilizan las facetas existentes, pero también se aplica cualquier entrada que coincida con las ejecuciones de despliegue entrantes.

La [página de Ejecuciones de despliegue][4] incluye facetas predefinidas como `Environment`, `Deployment Status` y `Deployment Provider`. Puedes utilizar facetas en el CD Visibility Explorer para:

- [Buscar y filtrar ejecuciones de despliegue][5].
- Realizar análisis de despliegue o de entorno.
- Comienza a solucionar los problemas una vez finalizado el despliegue.

Navega a [**Software Delivery** > **CD Visibility** > **Executions**][4] (Entrega de software > CD Visibility > Ejecuciones) para acceder a la lista de facetas a la izquierda de la lista de ejecuciones de despliegue.

{{< img src="/continuous_delivery/explorer/facets.png" text="Lista de facetas en la página de Ejecuciones de despliegue en el CD Visibility Explorer" style="width:100%" >}}

### Facetas cualitativas

Utiliza facetas cualitativas cuando tengas que hacer lo siguiente:

- **Obtener información relativa** de los valores.
- **Contar valores únicos**.
- Con frecuencia **filtra** tus ejecuciones de despliegue en función de determinados valores. Por ejemplo, utiliza la faceta de la etiqueta de entorno para limitar la solución de problemas a los entornos de desarrollo, preparación o producción.<br>

**Nota:** Aunque las facetas no son necesarias para filtrar las etiquetas, la definición de facetas para las etiquetas que se utilizan durante las investigaciones puede reducir el tiempo de resolución.

### Medidas cuantitativas

Utiliza medidas cuantitativas cuando necesites:

- **Agrega** valores de múltiples ejecuciones de despliegue.
- **Filtra por rangos** tus ejecuciones de despliegue.
- **Ordena** tus ejecuciones de despliegue en función de ese valor.

#### Tipos

Las medidas tienen un valor entero largo o doble para capacidades equivalentes.

#### Unidades

Las medidas admiten unidades (**tiempo** en segundos o **tamaño** en bytes) para manejar órdenes de magnitud en tiempo de consulta y tiempo de visualización. La unidad es una propiedad de la propia medida, no del campo.

Por ejemplo, considera una medida `duration` en nanosegundos. Supongamos que los despliegues de `env:staging` tienen `duration:10000000`, lo que significa `10 milliseconds`. Supongamos que los despliegues de `env:qa` tienen `duration:5000000`, que significa `5 milliseconds`. Utiliza `duration:>2ms` para consultar de forma coherente las etiquetas de ejecución de despliegue de ambos entornos a la vez. Para obtener más información sobre las consultas de búsqueda, consulta [Sintaxis de búsqueda][6].

## Panel de facetas

La barra de búsqueda ofrece el conjunto más completo de interacciones para filtrar y agrupar los datos. Sin embargo, en muchos casos, el panel de facetas es una forma más sencilla de navegar por tus datos. Abre una faceta para ver un resumen de su contenido en el contexto de la consulta actual.

La barra de búsqueda y la URL reflejan automáticamente las opciones seleccionadas del panel de facetas.

- Las **Facetas (cualitativas)** vienen con una lista principal de valores únicos y un recuento de ejecuciones de despliegue que coinciden con cada uno de ellos.
- Las **medidas (cuantitativas)** incluyen un regulador que indica los valores mínimo y máximo. Utiliza este regulador o indica valores numéricos para seleccionar diferentes límites del contexto de la consulta de búsqueda.

### Agrupar facetas

Las facetas se agrupan en temas significativos en la lista de facetas. Asignar o reasignar un grupo a una faceta solo afecta a la lista de facetas, y no tiene ningún impacto en la búsqueda o los análisis.

### Filtrar facetas

Utiliza el cuadro de facetas de búsqueda del panel de facetas para examinar toda la lista de facetas y navegar hasta la faceta con la que deseas interactuar. *Buscar facetas* utiliza el nombre de la faceta y el nombre del campo para delimitar los resultados.

## Crear facetas

No es necesario crear una faceta en un atributo o etiqueta de ejecución de despliegue para buscar ejecuciones de despliegue. Las facetas son útiles si deseas añadir una descripción significativa a un atributo de ejecución de despliegue específico, o si deseas que los valores del atributo aparezcan en la lista de facetas.

### Creación de facetas desde el panel lateral de Detalles de despliegue

Crea una faceta desde el panel lateral de Detalles de despliegue para que la mayoría de los detalles de la faceta estén rellenados previamente.

{{< img src="continuous_delivery/explorer/create_facet.png" alt="Crea una faceta desde el panel lateral de Detalles de despliegue" style="width:100%;">}}

1. Navega hasta una ejecución de despliegue de interés en la [página de Ejecuciones de despliegue][4] que contenga el campo sobre el que crear una faceta.
2. Abre el panel lateral de Detalles de despliegue seleccionando la ejecución del despliegue de la lista.
3. Haz clic en el campo deseado y crea una faceta a partir de ahí:

   - Si el campo contiene un valor numérico, puedes crear una faceta o una medida.
   - Si el campo contiene un valor de cadena, solo está disponible la creación de facetas.

### Crear facetas a partir de la lista de facetas

Si no es posible encontrar una ejecución de despliegue que contenga el campo deseado, crea una faceta directamente desde el panel de facetas haciendo clic en **+ Add** (+ Añadir).

{{< img src="continuous_delivery/explorer/add_facet.png" alt="Añade una faceta desde el panel lateral de facetas" style="width:30%;">}}

Define el nombre del campo subyacente (clave) de esta faceta:

- Utiliza el nombre de la clave de etiqueta para las etiquetas de entorno.
- Utiliza la ruta de atributos para los atributos de ejecución de despliegue, con el prefijo `@`.

La función de autocompletar basada en el contenido de las ejecuciones de despliegue de las vistas actuales te ayuda a definir el nombre de campo adecuado. Pero puedes utilizar prácticamente cualquier valor aquí, específicamente en caso que aún no tienes ejecuciones de despliegue coincidentes recibidas por Datadog.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/types/ci
[2]: /es/dashboards/
[3]: /es/notebooks/
[4]: https://app.datadoghq.com/ci/deployments/executions
[5]: /es/continuous_delivery/explorer#deployment-executions
[6]: /es/continuous_delivery/explorer/search_syntax