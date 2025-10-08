#### Sintaxis de las consultas de filtro

Cada procesador tiene una consulta de filtro correspondiente en sus campos. Los procesadores sólo procesan los logs que coinciden con su consulta de filtro. Y en todos los procesadores, excepto el procesador de filtro, los logs que no coinciden con la consulta se envían al siguiente paso de la cadena. Para el procesador de filtro, los logs que no coinciden con la consulta se descartan.

Para cualquier atributo, etiqueta (tag) o par `key:value` que no sea un [atributo reservado][4001], la consulta debe empezar por `@`. Por el contrario, para filtrar atributos reservados, no es necesario añadir `@` delante de la consulta de filtro.

Por ejemplo, para filtrar y descartar logs `status:info`, tu filtro puede definirse como `NOT (status:info)`. Para filtrar y descartar `system-status:info`, el filtro debe ser `NOT (@system-status:info)`.

Ejemplos de consulta de filtro:
- `NOT (status:debug)`: Esto filtra sólo los logs que no tienen el estado `DEBUG`.
- `status:ok service:flask-web-app`: Esto filtra todos los logs con el estado `OK` de tu servicio`flask-web-app`.
    - Esta consulta también se puede escribir como: `status:ok AND service:flask-web-app`.
- `host:COMP-A9JNGYK OR host:COMP-J58KAS`: Esta consulta de filtro sólo coincide con los logs de hosts etiquetados.
- `@user.status:inactive`: Esto filtra los logs con el estado `inactive` anidado bajo el atributo `user`.

Las consultas ejecutadas en el worker de Observability Pipelines distinguen entre mayúsculas y minúsculas. Obtén más información sobre cómo escribir consultas de filtro con la [sintaxis de búsqueda de logs de Datadog][4002].

[4001]: /es/logs/log_configuration/attributes_naming_convention/#reserved-attributes
[4002]: /es/logs/explorer/search_syntax/
