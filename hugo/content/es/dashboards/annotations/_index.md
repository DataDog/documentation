---
description: Aprende a añadir, personalizar y gestionar anotaciones en widgets de
  series temporales en dashboards y notebooks para resaltar eventos importantes.
disable_toc: false
title: Anotaciones
---

## Información general

Las anotaciones permiten colocar manualmente marcadores verticales con descripciones en los widgets de series temporales. Añadir anotaciones puede ser útil para señalar visualmente eventos clave como despliegues, incidentes o picos. Haz clic en cualquier punto del tiempo y añade una nota.

{{< img src="dashboards/annotations.png" alt="Series temporales que muestran una caída en la disponibilidad con una línea de anotación vertical al final de la caída y un comentario que dice 'Rollback completed — service availability restored.'" style="width:100%;" >}}

Las anotaciones están disponibles tanto en los dashboards como en notebooks. Si exportas un widget de un dashboard a un notebook, las anotaciones que hayas añadido al widget persisten.

## Añadir una anotación

1. Crea una anotación al:
    - Hacer clic con el botón izquierdo del ratón en cualquier lugar de un widget de series temporales y seleccionar **Add annotation** (Añadir anotación) en el menú contextual que aparece, o bien
    - Hacer clic en el eje x de un gráfico de series temporales
3. Escribir tu comentario y, opcionalmente, hacer clic en el campo de la marca temporal para ajustarlo manualmente a la hora exacta que desees anotar.
4. (Opcional) Cambiar el color de la anotación desde el desplegable de la parte inferior izquierda.
5. Haz clic en **Save** (Guardar).

## Añadir varias anotaciones

Para aplicar una anotación a varias series temporales a la vez:

1. Sigue los pasos 1-4 de [Añadir una anotación](#adding-an-annotation) para crear una anotación.
2. En el menú desplegable **Aplicar a**, elija **Todos los widgets** o **Los widgets seleccionados**.
    <br>
    Si eliges **Selected widgets** (Widgets seleccionados), verás una lista de todos los widgets del dashboard o notebook y podrás marcar o desmarcar los widgets a los que quieras aplicar la anotación.
3. Haz clic en **Save** (Guardar).

## Editar una anotación

Para editar una anotación, pasa el ratón por encima de la línea de anotación, haz clic en el menú de tres puntos y selecciona **Edit** (Editar) o **Edit for all widgets** (Editar para todos los widgets).

## Eliminar una anotación

Para eliminar una anotación que hayas creado, pasa el ratón por encima de la línea de anotación, haz clic en el menú de tres puntos y elige **Delete** (Eliminar) o **Delete from all widgets** (Eliminar de todos los widgets).