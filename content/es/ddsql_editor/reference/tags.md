---
aliases:
- /es/dashboards/ddsql_editor/reference/tags/
title: Consulta de etiquetas en DDSQL
---

{{< callout url="https://datadoghq.com/private-beta/ddsql-editor">}}
DDSQL está en vista previa.
{{< /callout >}}

Las etiquetas (tags) son un mecanismo muy conocido para codificar metadatos sobre un registro concreto en varios productos en Datadog. Las etiquetas son pares de clave-valor para los que una clave puede contener varios valores.

Las etiquetas se modelan en DDSQL con la clave como nombre de columna y los valores en un tipo `group`, un conjunto ordenado de cadenas con semántica "= is contains" similar a etiquetas.

## Comparaciones de igualdad

Las comparaciones de igualdad entre etiquetas y cadenas se tratan como una comparación "contains" en lugar de requerir una igualdad estricta. `service='website'` es verdadero si un registro tiene una etiqueta `service` con el valor `website`, aunque también tenga otras etiquetas de servicio.

Como consecuencia de este comportamiento, el operador `IN` con etiquetas funciona como un "solapamiento". Por ejemplo, `service IN ('webstore', 'webstore-analytics')` coincide con registros que contengan `service:webstore`, `service:webstore-analytics`, o ambos, aunque haya otras etiquetas de servicio presentes (por ejemplo, `service:webstore,something-else` coincide).

## Comparaciones de igualdad estricta

Para realizar una comparación estricta, convierte la referencia de etiqueta en una cadena o compárala con un literal de grupo en una consulta externa. Por ejemplo, una consulta del tipo

{{< code-block lang="sql" >}}
SELECT * FROM host WHERE team='logs' GROUP BY team;
{{< /code-block >}}

Puede devolver el siguiente resultado:

| team             |
|------------------|
| logs             |
| logs,team2       |
| logs,team3,team4 |
| logs,team2,team4 |

Para buscar sólo en `logs`, utiliza esta consulta:

{{< code-block lang="sql" >}}
SELECT * FROM host WHERE team={'logs'} GROUP BY team;
{{< /code-block >}}

Esta comparación más estricta sólo devuelve un resultado:

| team             |
|------------------|
| logs             |

## Referencias de etiqueta implícitas

Las referencias de esquema de lectura en tablas que admiten etiquetas se tratan como búsquedas de etiquetas y se denominan referencias de etiqueta implícitas.

Por ejemplo, la columna `az` no existe en la tabla `resources.host`, pero puedes `SELECT az FROM resources.host`. DDSQL reconoce que la tabla `resources.host` admite esquema en lectura, y `az` se convierte en una referencia de etiqueta implícita. Su nombre en la proyección es `az`, que puede utilizarse en toda la consulta.

## Referencias de etiqueta explícitas

Las referencias de etiqueta explícitas permiten al usuario especificar que una referencia de columna debe referirse a una etiqueta incluso si existe una columna con un nombre idéntico en el esquema de la tabla. Las referencias de etiqueta explícitas permiten una defensa básica contra las actualizaciones del esquema que cambian el significado de las consultas basadas en el comportamiento implícito.

Las referencias de etiqueta explícitas son referencias a columnas precedidas por el carácter `#`. Por ejemplo, la tabla `resources.host` contiene una columna `service`, pero la consulta puede hacer referencia explícita a la etiqueta `service`:

{{< code-block lang="sql" >}}
SELECT #service FROM resources.host
{{< /code-block >}}

El nombre de etiqueta en la proyección es `#service`, que debe utilizarse en toda la consulta, ya que `service` hace referencia a la columna del esquema.

Para las referencias de etiqueta que requieren comillas, el `#` debe aparecer fuera de las comillas (por ejemplo, `#"availability-zone"`). Esto es necesario para diferenciar entre referencias de etiqueta explícitas y columnas que comienzan con un carácter `#`.