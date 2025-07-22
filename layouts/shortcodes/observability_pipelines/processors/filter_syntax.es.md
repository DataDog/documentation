#### Sintaxis de las consultas de filtro

Cada procesador tiene una consulta de filtro correspondiente en sus campos. Los procesadores procesan únicamente los logs que coinciden con su consulta de filtro. Además, para todos los procesadores, excepto el procesador de filtrado, los logs que no coinciden con la consulta se envían al siguiente paso de la canalización. Para el procesador de filtros, los logs que no coinciden con la consulta se descartan.

Para cualquier atributo, etiqueta o par `key:value` que no sea un [atributo reservado][4001], tu consulta debe comenzar con `@`. Por el contrario, para filtrar atributos reservados, no necesitas añadir `@` delante de tu consulta de filtrado.

Por ejemplo, para filtrar y descartar los logs `status:info`, puedes configurar tu filtro como `NOT (status:info)`. Para filtrar y descartar `system-status:info`, el filtro debe estar configurado como `NOT (@system-status:info)`.

Ejemplos de consulta de filtro:
- `NOT (status:debug)`: Esto filtra solo los logs que no tienen el estado `DEBUG`.
- `status:ok service:flask-web-app`: Esto filtra todos los logs con el estado `OK` de tu `flask-web-app` servicio.
    - Esta consulta también puede escribirse como: `status:ok AND service:flask-web-app`.
- `host:COMP-A9JNGYK OR host:COMP-J58KAS`: Esta consulta de filtro solo coincide con los logs de los hosts etiquetados.
- `@user.status:inactive`: Esto filtra los logs con el estado `inactive` anidado en el atributo `user`.

Las consultas ejecutadas en el Observability Pipelines Worker son sensibles a mayúsculas y minúsculas. Obtén más información sobre cómo escribir consultas de filtro con la [sintaxis de búsqueda de logs de Datadog][4002].

[4001]: /logs/log_configuration/attributes_naming_convention/#reserved-attributes
[4002]: /logs/explorer/search_syntax/
