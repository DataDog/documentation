---
description: Filtre la lista de seguimientos mediante la búsqueda facetada
further_reading:
- link: /getting_started/search/
  tag: Documentación
  text: Introducción a la búsqueda en Datadog
- link: https://www.datadoghq.com/blog/how-to-audit-and-clean-up-monitors/
  tag: Blog
  text: Cómo auditar y limpiar monitores de manera eficaz
title: Buscar seguimientos
---
Para buscar sus seguimientos, construya una consulta utilizando el panel de facetas a la izquierda y/o la barra de búsqueda en la parte superior. Cuando selecciona atributos, la barra de búsqueda se actualiza con la consulta equivalente. Del mismo modo, cuando modifica la consulta de la barra de búsqueda (o escribe una nueva), las casillas de verificación de atributos se actualizan para reflejar el cambio. En cualquier caso, los resultados de la consulta se actualizan en tiempo real a medida que edita la consulta. **Nota**: No hay ningún botón de *búsqueda* en el que hacer clic.

## Barra de búsqueda {#search-bar}

Utilice texto simple para buscar en todos los títulos de los seguimientos y mensajes de notificación. Por ejemplo, una búsqueda de `*postgresql*` devuelve todos los seguimientos con `postgresql` en cualquier parte del título o
mensaje de notificación.

Para limitar la búsqueda, especifique el nombre del campo:

| Elemento    | Descripción                                            | Ejemplo        |
|---------|--------------------------------------------------------|----------------|
| Title   | Busque el texto en el título del seguimiento.                | `title:text`   |
| Message | Busque el texto en el mensaje de notificación del seguimiento. | `message:text` |

Además, puede buscar un seguimiento mediante el ID, por ejemplo: `1234567`. El ID del seguimiento está disponible en la [página de estado del seguimiento][1].

<div class="alert alert-info">Para obtener información sobre cómo filtrar grupos de seguimientos, consulte la <a href="/monitors/manage/status/">página Monitor Status</a>.</div>

### Consulta {#query}

Mejore su consulta de búsqueda con operadores booleanos (`AND`, `OR`, `NOT`) y paréntesis. La sintaxis de búsqueda es similar a [Elasticsearch][2] con las siguientes excepciones:

* Las expresiones regulares no son compatibles.
* Tanto el Wildcard de un solo carácter (`?`) como el Wildcard general (`*`) son compatibles.
* Las búsquedas de proximidad no son compatibles, pero el operador [fuzzy][3] sí lo es.
* Los rangos no son compatibles.
* El aumento (boosting) no es compatible.

Los siguientes caracteres están reservados: `-`, `(`, `)`, `"`, `~`, `*`, `:`, `.` y espacios en blanco. Para buscar un campo de seguimiento que incluya un carácter reservado, encierre la cadena del campo entre comillas. Por ejemplo, `status:Alert AND "chef-client"` es una cadena de consulta válida.

Existen algunas advertencias con respecto a los campos entre comillas:

* Puede usar `.` con o sin comillas, ya que aparece comúnmente en algunos campos. Por ejemplo, `metric:system.cpu.idle` es válido.
* La búsqueda con Wildcard no es compatible dentro de cadenas entre comillas. Por ejemplo, `"chef-client*"` no devuelve un seguimiento titulado `"chef-client failing"` porque el `*` se trata literalmente.
* Para usar un Wildcard en un valor que contiene dos puntos, escape los dos puntos con una barra invertida (`\`) en lugar de usar comillas. Por ejemplo, `tag:service\:*` devuelve todos los seguimientos que tienen una etiqueta `service`, independientemente de su valor.

## Atributos {#attributes}

La búsqueda avanzada le permite filtrar seguimientos por cualquier combinación de atributos de seguimiento:

| Atributo    | Descripción                                                                                     |
|--------------|-------------------------------------------------------------------------------------------------|
| Status       | El estado del seguimiento: `Triggered` (`Alert`, `Warn`, `No Data`) o `OK`                            |
| Muted        | El estado de silencio del seguimiento: `true` o `false`                                               |
| Type         | El [tipo de seguimiento][4] de Datadog                                                                   |
| Creator      | El creador del seguimiento                                                                      |
| Service      | Etiquetas de servicio que usted usa con el formato `service:<VALUE>`.                                         |
| Tag          | Las [etiquetas][5] asignadas al seguimiento                                               |
| Env          | Etiquetas de entorno que usted usa con el formato `env:<VALUE>`.                                         |
| Scope        | Busque las etiquetas listadas en el campo `from` de la consulta de su seguimiento.                                   |
| Metric/Check | La métrica o verificación de servicio de la que se hace un seguimiento                                                     |
| Notification | La persona o el servicio que recibe una notificación                                                  |
| Muted left   | El tiempo restante antes de que el tiempo de inactividad deje de silenciar la notificación de este seguimiento. Buscar `muted_left:30m` devuelve todos los seguimientos que siguen silenciados y a los que les quedan como máximo 30 minutos de silencio. Las unidades admitidas son segundos (`s`), minutos (`m`), horas (`h`) y semanas (`w`).    |
| Muted elapsed | El tiempo transcurrido desde que un tiempo de inactividad comenzó a silenciar la notificación de este seguimiento. Buscar `muted_elapsed:30d` devuelve todos los seguimientos que han estado silenciados durante al menos 30 días. Las unidades admitidas son segundos (`s`), minutos (`m`), horas (`h`) y semanas (`w`). |

Marque cualquier cantidad de casillas para encontrar sus seguimientos. Se aplican las siguientes reglas:

* El operador `AND` se aplica al verificar atributos de diferentes campos, por ejemplo: `status:Alert type:Metric` (la falta de un operador entre los dos términos de búsqueda implica `AND`).
* La mayor parte del tiempo, el operador `OR` se aplica al verificar atributos dentro del mismo campo, por ejemplo: `status:(Alert OR Warn)`. Se aplican algunas excepciones; por ejemplo, al verificar varios contextos o etiquetas de servicio, se utiliza el operador `AND`.
* Algunos atributos no permiten seleccionar múltiples valores. Por ejemplo, cuando selecciona una métrica o una verificación de servicio, las otras opciones desaparecen de la lista hasta que elimina la selección.
* La casilla de verificación `Triggered` bajo el atributo {{< ui >}}Status{{< /ui >}} se resuelve en `status:(Alert OR Warn OR "No Data")`. Triggered no es un estado de seguimiento válido.
* El nombre para el atributo {{< ui >}}Metric/Check{{< /ui >}} es siempre `metric` en la consulta. Por ejemplo, seleccionar la verificación `http.can_connect` se resuelve en `metric:http.can_connect`.

**Nota**: Para atributos con una gran cantidad de valores entre sus seguimientos, utilice la barra de búsqueda de atributos para encontrar el valor correcto.

## Vista guardada {#saved-view}

Aproveche las Saved Views para navegar rápidamente a vistas preestablecidas con el fin de encontrar seguimientos relevantes para un contexto determinado, como los seguimientos de su equipo o los silenciados durante más de 60 días:

{{< img src="monitors/manage_monitor/overview.jpg" alt="Selección de Saved Views" style="width:90%;" >}}

Las Saved Views son visibles para todos en su organización.
Técnicamente, una vista guardada realiza un seguimiento de:

- La consulta de búsqueda

### Vista predeterminada {#default-view}

{{< img src="monitors/manage_monitor/default.jpg" alt="Vista predeterminada" style="width:50%;" >}}

Su vista existente de Manage Monitor es su vista guardada predeterminada. Esta configuración solo es accesible y visible para usted, y actualizar esta configuración no tiene ningún impacto en su organización.

Puede anular **temporalmente** su vista guardada predeterminada al realizar cualquier acción en la interfaz de usuario o al abrir enlaces a la página Manage Monitor que incorporen una configuración diferente.

Desde la entrada de la vista predeterminada en el panel Views:

* {{< ui >}}Reload{{< /ui >}} su vista predeterminada haciendo clic en la entrada.
* {{< ui >}}Update{{< /ui >}} su vista predeterminada con los parámetros actuales.
* {{< ui >}}Reset{{< /ui >}} su vista predeterminada a los valores predeterminados de Datadog para un reinicio desde cero.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/status/#properties
[2]: https://www.elastic.co/guide/en/elasticsearch/reference/2.4/query-dsl-query-string-query.html#query-string-syntax
[3]: https://www.elastic.co/guide/en/elasticsearch/reference/2.4/query-dsl-query-string-query.html#_fuzziness
[4]: /es/monitors/
[5]: /es/monitors/manage/#monitor-tags