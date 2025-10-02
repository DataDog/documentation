---
description: Obtén más información sobre facetas en el Explorador de puertas de calidad.
further_reading:
- link: quality_gates/explorer/
  tag: Documentación
  text: Más información sobre el Explorador de puertas de calidad
- link: quality_gates/search/
  tag: Documentación
  text: Más información sobre cómo buscar tus reglas y ejecuciones
title: Puertas de calidad o facetas de ejecución de reglas
---

{{< callout url="#" btn_hidden="true" header="¡Únete a la vista previa!" >}}
Puertas de calidad está en vista previa.
{{< /callout >}}

## Información general

Las facetas son atributos y etiquetas (tags) definidos por el usuario a partir de tus reglas o ejecuciones. Son útiles para el análisis de datos tanto [cualitativos](#qualitative-facets) como [cuantitativos](#quantitative-measures). Las facetas te permiten manipular tus reglas o ejecuciones en las consultas de búsqueda que aparecen en [dashboards][2] y en [notebooks][3].

[Crear facetas](#creating-facets) no es **necesario** para [buscar puertas de calidad][5]. Las funciones de autocompletar utilizan facetas existentes, pero también se aplica cualquier entrada que coincida con las puertas de calidad entrantes.

El [Explorador de puertas de calidad][4] incluye facetas predefinidas como `Status` y `Gate ID`. Puedes utilizar facetas en el Explorador de puertas de calidad para [buscar y filtrar tus puertas de calidad][5].

### Facetas cualitativas

Utiliza facetas cualitativas para:

- **Obtener información relativa** de los valores.
- **Contar valores únicos**.
- **Filtra** con frecuencia tus puertas de calidad en función de determinados valores. Por ejemplo, crea una faceta en una etiqueta (tag) de entorno para delimitar la resolución de problemas al desarrollo, el staging o los entornos de producción.<br>

**Nota:** Aunque las facetas no son necesarias para filtrar las etiquetas (tags), definir facetas para las etiquetas (tags) que utilizas a menudo durante las investigaciones te ayudará a reducir el tiempo de resolución.

### Medidas cuantitativas

Utiliza medidas cuantitativas para:

- **Agregar** valores de varias puertas de calidad.
- **Filtrar por rango** tus puertas de calidad.
- **Clasificar** tus puertas de calidad en función de un valor.

#### Tipos

Las medidas admiten enteros largos y valores dobles.


## Panel de facetas

La barra de búsqueda proporciona un amplio conjunto de interacciones para filtrar y agrupar tus datos. Sin embargo, en muchos casos, el panel de facetas es una forma sencilla de navegar por los datos. Abre una faceta para ver un resumen de su contenido según el contexto de la consulta actual.

La barra de búsqueda y la URL reflejan automáticamente las opciones seleccionadas del panel de facetas.

- Las **facetas (cualitativas)** muestran una lista de valores únicos y un recuento de las puertas de calidad que coinciden con cada faceta.
- Las **medidas (cuantitativas)** tienen un control deslizante que oscila entre los valores mínimo y máximo. Utiliza el control deslizante o introduce valores numéricos para delimitar la consulta de búsqueda a diferentes límites.

### Agrupar facetas

Las facetas se agrupan por temas significativos en la lista de facetas. Asignar o reasignar un grupo a una faceta solo afecta a la lista de facetas y no repercute en la búsqueda ni en los análisis.

### Filtrar facetas

Utiliza el campo de facetas de búsqueda del panel de facetas para filtrar la lista de facetas e ir a una faceta concreta. Para delimitar los resultados, la búsqueda utiliza el nombre de visualización de la faceta y el nombre del campo.

## Crear facetas

Crear una faceta en un atributo de ejecución de regla no es un paso obligatorio para buscar puertas de calidad. Las facetas son útiles si quieres añadir una descripción significativa a un atributo de ejecución de regla específico o si quieres que los valores del atributo aparezcan en la lista de facetas.

### Crear facetas a partir de la lista de facetas

Puedes crear una faceta directamente desde el panel de facetas haciendo clic en **+ Add** (+ Añadir).

{{< img src="quality_gates/explorer/facets.png" alt="Añadir una faceta desde el panel lateral de facetas" style="width:30%;">}}

Define el nombre del campo subyacente (clave) de esta faceta:

- Utilice la ruta del atributo para los atributos de la puerta de calidad, con el prefijo `@`.

El autocompletado basado en el contenido en puertas de calidad de las vistas actuales le ayuda a definir el nombre de campo adecuado, pero aquí puede utilizar prácticamente cualquier valor.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/types/ci
[2]: /es/dashboards/
[3]: /es/notebooks/
[4]: /es/quality_gates/explorer
[5]: /es/quality_gates/search
[6]: /es/quality_gates/explorer/search_syntax/