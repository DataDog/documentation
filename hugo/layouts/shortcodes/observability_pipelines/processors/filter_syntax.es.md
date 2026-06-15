#### Sintaxis de las consultas de filtro

Cada procesador tiene una consulta de filtro correspondiente en sus campos. Los procesadores solo procesan los logs que coinciden con su consulta de filtro. Y en todos los procesadores, excepto el procesador de filtro, los logs que no coinciden con la consulta se envían al siguiente paso del pipeline. Para el procesador de filtro, los logs que no coinciden con la consulta se descartan.

A continuación se muestran ejemplos de consultas de filtro de logs:

- `NOT (status:debug)`: Filtra los logs que no tienen el estado `DEBUG`.
- `status:ok service:flask-web-app`: esto filtra todos los logs con el estado `OK` de tu servicio`flask-web-app`.
    - Esta consulta también se puede escribir como: `status:ok AND service:flask-web-app`.
- `host:COMP-A9JNGYK OR host:COMP-J58KAS`: esta consulta de filtro solo coincide con los logs de hosts etiquetados.
- `user.status:inactive`: Filtra los logs con el estado `inactive` anidado bajo el atributo `user`.
- `http.status:[200 TO 299]` o `http.status:{300 TO 399}`: Estos dos filtros representan la sintaxis para consultar un rango para `http.status`. Los rangos se pueden utilizar en cualquier atributo.

Obtén más información sobre la escritura de consultas de filtros en [Sintaxis de búsqueda de Observability Pipelines][4001].

[4001]: /es/observability_pipelines/search_syntax/logs/
