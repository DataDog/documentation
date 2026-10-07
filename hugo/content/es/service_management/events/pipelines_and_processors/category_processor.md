---
title: Procesador de categorías
---

Utiliza el procesador de categorías para añadir un atributo nuevo (sin espacios ni caracteres especiales en el nombre del atributo nuevo) a un evento que coincida con una consulta de búsqueda proporcionada. A continuación, utiliza las categorías a fin de crear grupos para una vista analítica (por ejemplo, grupos de URL, grupos de máquinas, entornos y ciclos de respuesta).

**Notas**:

* La sintaxis de la consulta es la que aparece en la barra de búsqueda del Event Explorer. Esta consulta se puede realizar sobre cualquier atributo de evento o etiqueta, sea o no una faceta. También se pueden utilizar comodines en la consulta.
* Una vez que el evento coincide con una de las consultas del procesador, se detiene. Asegúrate de que se encuentren bien ordenadas en caso de que un evento coincida con varias consultas.
* Los nombres de las categorías deben ser únicos.
* Una vez definidas en el procesador de categorías, puedes asignar categorías a estados mediante el reasignador de estados.

Procesador de categorías de ejemplo. Para categorizar tus eventos de acceso web en función del valor de rango del código de estado (`"OK" para un código de respuesta entre 200 y 299, "Notice" para un código de respuesta entre 300 y 399, ...`) añade este procesador:

{{< img src="logs/log_configuration/processor/category_processor.png" alt="Procesador de categorías" style="width:80%;" >}}

Este procesador genera el siguiente resultado:

{{< img src="logs/log_configuration/processor/category_processor_result.png" alt="Resultado del procesador de categorías" style="width:80%;" >}}