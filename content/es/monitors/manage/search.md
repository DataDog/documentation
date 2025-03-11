---
description: Filtrar la lista de monitores utilizando la búsqueda por facetas
title: Buscar monitores
---

Para buscar tus monitores, crea una consulta utilizando el panel de facetas de la izquierda o la barra búsqueda en la parte superior. Al seleccionar atributos, la barra de búsqueda se actualiza con la consulta equivalente. Del mismo modo, cuando modificas la consulta de la barra de búsqueda (o escribes una nueva), las casillas de verificación de atributos se actualizan para reflejar el cambio. En cualquier caso, los resultados de la consulta se actualizan en tiempo real, a medida que editas tu consulta. **Nota**: No hay ningún botón de *búsqueda* en el que hacer clic.

## Barra de búsqueda

Utiliza texto simple para buscar en todos los títulos de monitores y mensajes de notificación. Por ejemplo, una búsqueda de `*postgresql*` devuelve todos los monitores que tienen `postgresql` en cualquier parte del título o
del mensaje de notificación.

Para limitar la búsqueda, especifica el nombre del campo:

| Artículo    | Descripción                                            | Ejemplo        |
|---------|--------------------------------------------------------|----------------|
| Título   | Busca el texto en el título del monitor.                | `title:text`   |
| Mensaje | Busca el texto en el mensaje de notificación del monitor. | `message:text` |

Además, puedes buscar un monitor utilizando el ID, por ejemplo: `1234567`. El ID del monitor está disponible en la [página Estado del monitor][1].

<div class="alert alert-info">Para obtener información sobre cómo filtrar grupos de monitores, consulta la <a href="/monitors/manage/status/">página Estado del monitor</a>.</div>

### Consulta

Mejora tu consulta de búsqueda utilizando operadores booleanos (`AND`, `OR`, `NOT`) y paréntesis. La sintaxis de búsqueda es similar a la de [Elasticsearch][2], con las siguientes excepciones:

* No se admiten expresiones regulares.
* Se admiten tanto el comodín de un solo carácter (`?`) como el comodín general (`*`).
* No se admiten las búsquedas por proximidad, pero sí el operador [impreciso][3].
* No se admiten rangos.
* No se admite el boosting.

Los siguientes caracteres están reservados: `-`, `(`, `)`, `"`, `~`, `*`, `:`, `.` 2, y el espacio en blanco. Para buscar un campo de monitor que incluya un carácter reservado, encierra la cadena del campo con comillas. Por ejemplo, `status:Alert Y "chef-client"` es una cadena de consulta válida.

Existen algunas advertencias en relación con los campos entre comillas:

* Puedes utilizar `.` con o sin comillas, ya que suele aparecer en algunos campos. Por ejemplo, `metric:system.cpu.idle` es válido.
* El comodín de búsqueda no se admite en cadenas que están entre comillas. Por ejemplo, `"chef-client*"` no devuelve un monitor llamado `"chef-client failing"` porque el `*` se procesa de forma literal.

## Atributos

La búsqueda avanzada te permite filtrar monitores mediante cualquier combinación de atributos de monitor:

| Atributo    | Descripción                                                                                     |
|--------------|-------------------------------------------------------------------------------------------------|
| Estado       | Estado de monitor: `Triggered` (`Alert`, `Warn`, `No Data`) o `OK`                            |
| Silenciado        | Estado silenciado del monitor: `true` o `false`                                               |
| Tipo         | [Tipo de monitor][4] del Datadog                                                                   |
| Creador      | Creador del monitor                                                                      |
| Servicio      | Etiquetas (tags) de servicio que utilizas en el formulario `service:<VALUE>`.                                         |
| Etiqueta          | [Etiquetas](#monitor-tags) asignadas al monitor                                               |
| Entorno          | Etiquetas de entorno que utilizas en el formulario `env:<VALUE>`.                                         |
| Contexto        | Busca las etiquetas enumeradas en el campo `from` de tu consulta de monitor.                                   |
| Métrica/Check | Check de métrica o servicio que se está monitorizando                                                     |
| Notificación | Persona o servicio que recibe una notificación                                                  |
| Tiempo de silenciado restante   | El tiempo restante antes de que el tiempo de inactividad deje de silenciar las notificaciones de este monitor. La búsqueda de `muted_left:30m` devuelve todos los monitores que siguen silenciados durante un máximo de 30 minutos. Las unidades admitidas son los segundos (`s`), los minutos (`m`), las horas (`h`) y las semanas (`w`).    |
| Tiempo silenciado transcurrido | El tiempo transcurrido desde que un tiempo de inactividad del sistema comenzó a silenciar las notificaciones de este monitor. La búsqueda de `muted_elapsed:30d` devuelve todos los monitores que han estado silenciados durante al menos 30 días. Las unidades admitidas son los segundos (`s`), los minutos (`m`), las horas (`h`) y las semanas (`w`). |

Comprueba cualquier número de casillas para encontrar tus monitores. Se aplican las siguientes reglas:

* El operador `AND` se aplica cuando se comprueban atributos de diferentes campos, por ejemplo: `status:Alert type:Metric` (la falta de un operador entre los dos términos de búsqueda implica `AND`).
* La mayoría de las veces, el operador `OR` se aplica cuando se comprueban atributos dentro del mismo campo, por ejemplo: `status:(Alert OR Warn)`. Se aplican algunas excepciones, por ejemplo al comprobar varios contextos o etiquetas (tags) de servicios se utiliza el operador `AND`.
* Algunos atributos no permiten seleccionar varios valores. Por ejemplo, cuando se selecciona un check  de métrica o servicio, las otras opciones desaparecen de la lista hasta que se borre la selección.
* La casilla de verificación `Triggered` bajo el atributo *Status* (Estado) se resuelve en `status:(Alert OR Warn OR "No Data")`. El estado de monitor activado no es un estado válido.
* El nombre del atributo *Métrica/Check* es siempre `metric` en la consulta. Por ejemplo, la selección del check `http.can_connect` se resuelve en `metric:http.can_connect`.

**Nota**: Para atributos con un amplio número de valores en tus monitores utiliza la barra de búsqueda de atributos para encontrar el valor correcto.

## Vista guardada

Aprovecha las vistas guardadas para navegar rápidamente a las vistas preestablecidas y encontrar monitores relevantes para un contexto determinado, como los monitores para tu equipo o aquellos silenciados durante más de 60 días:

{{< img src="monitors/manage_monitor/overview.jpg" alt="Selección de las vistas guardadas" style="width:90%;" >}}

Las vistas guardadas son visibles para todos los miembros de tu organización.
Técnicamente, una vista guardada realiza un seguimiento de:

- Consulta de búsqueda

### Vista predeterminada

{{< img src="monitors/manage_monitor/default.jpg" alt="Vista predeterminada" style="width:50%;" >}}

La vista existente de Gestionar monitores es la vista guardada por defecto. Esta configuración sólo es accesible y visible para ti y la actualización de esta configuración no tiene ningún impacto en tu organización.

Puedes anular **temporalmente** la vista guardada por defecto realizando cualquier acción en la interfaz de usuario o al abrir enlaces a la página Gestionar monitores que integra una diferente configuración.

Desde la entrada de la vista predeterminada en el panel Vistas:

* **Vuelve a cargar** la vista predeterminada haciendo clic en la entrada.
* **Actualiza** tu vista predeterminada con los parámetros actuales.
* **Restablece** tu vista predeterminada a los valores por defecto de Datadog para empezar de nuevo.

[1]: /es/monitors/manage/status/#properties
[2]: https://www.elastic.co/guide/en/elasticsearch/reference/2.4/query-dsl-query-string-query.html#query-string-syntax
[3]: https://www.elastic.co/guide/en/elasticsearch/reference/2.4/query-dsl-query-string-query.html#_fuzziness
[4]: /es/monitors/