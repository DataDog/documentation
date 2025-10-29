---
aliases:
- /es/dashboards/ddsql_editor/reference/expressions_and_operators/
- /es/ddsql_editor/reference/expressions_and_operators/
private: true
title: Expresiones y operadores de DDSQL (vista previa)
---

*Las expresiones de valor* son el lenguaje general de las expresiones utilizado para producir valores para condiciones, `SELECT` expresiones, filtros y cláusulas como `WHERE`, `ORDER BY` y `GROUP BY`. La sintaxis de las expresiones de DDSQL es un superconjunto de la sintaxis de las expresiones de SQL.

## Operadores aritméticos

DDSQL admite la notación aritmética infija binaria y unaria estándar de SQL y muchos otros lenguajes:

| Operación | Descripción              | Ejemplo | Resultado |
|----------|--------------------------|---------|--------|
| +        | suma                 | 2 + 3   | 5      |
| -        | resta              | 2 - 3   | -1     |
| *        | multiplicación           | 2 * 3   | 6      |
| /        | división (sin truncar) | 5 / 2   | 2.5    |


Se aplica el orden estándar de las operaciones. Para controlar el orden de las operaciones, añade paréntesis: `(5 - 2) * 3`.

## Operaciones de comparación

DDSQL implementa las siguientes operaciones de comparación:

| Operación | Descripción            | Ejemplo | Resultado |
|----------|------------------------|---------|--------|
| >        | mayor que           | 2 > 3   | falso  |
| <        | menor que              | 2 < 3   | verdadero   |
| >=       | mayor o igual que | 3 >= 2  | verdadero   |
| <=       | menor o igual que    | 3 <= 2  | falso  |
| =        | igual*                | 3 = 3   | verdadero   |
| !=, <>   | no es igual a             | 3 != 3  | falso  |

Para las referencias de etiquetas (tags) y los grupos de etiquetas, la operación de igualdad (`=`) se trata como una comparación "contiene". Para más detalles, consulta la [Consulta de etiquetas (tags) en DDSQL][1].

## Palabras clave de comparación de SQL

DDSQL admite las siguientes palabras clave de SQL, que funcionan como operaciones booleanas estándar:

| Operación | Descripción            | Ejemplo | Resultado |
|----------|------------------------|---------|--------|
| `NOT`    | Filtra registros basándote en más de una condición. | `SELECT * FROM host WHERE NOT env = 'prod';`   | Devuelve todos los hosts que no estén en el entorno de producción.  |
| `AND`    | Filtra registros basándote en más de una condición. | `SELECT * FROM host WHERE env = 'prod' AND cloud_provider = 'aws';`   | Devuelve todos los hosts que estén en el entorno de producción y el proveedor de la nube de AWS.  |
| `OR`     | Filtra registros basándote en más de una condición. | `SELECT * FROM host WHERE env = 'prod' AND cloud_provider = 'aws';`   | Devuelve todos los hosts que estén en el entorno de producción o en el proveedor de la nube de AWS.  |

DDSQL también admite las siguientes palabras clave de comparación, tal y como se definen en el estándar de SQL:

| Operación     | Descripción            | Ejemplo | Resultado |
|--------------|------------------------|---------|--------|
| `IS NULL`    | Selecciona filas si el campo especificado es nulo. | `SELECT * FROM host WHERE cloud_provider IS NULL;`   | Devuelve todas las filas que no contengan datos en la columna `cloud_provider`.  |
| `IS NOT NULL`| Selecciona filas si el campo especificado no es nulo. Excluye las filas con datos faltantes. | `SELECT * FROM host WHERE cloud_provider IS NOT NULL;` | Devuelve todas las filas que contengan datos en la columna `cloud_provider`.   |
| `LIKE`       | Busca un patrón específico en un valor de cadena. Puedes utilizar los siguientes caracteres comodín para definir los patrones: <br>**Signo de porcentaje (%)**: Representa cero, uno o varios caracteres. <br>**Subrayado (_)**: Representa un solo carácter. | `SELECT * FROM aws_eks_cluster WHERE LOWER(logging) LIKE '%"enabled":true%';` | Devuelve todas las filas de la tabla `aws_eks_cluster` en las que la columna `logging` sea `"enabled":true`.  |
| `NOT LIKE`   | Excluye filas de una búsqueda, donde la fila tenga un patrón específico en un valor de cadena. Puedes utilizar los comodines `%` y `_` para la coincidencia de patrones. | `SELECT * FROM aws_eks_cluster WHERE LOWER(logging) NOT LIKE '%"enabled":true%';` | Devuelve todas las filas de la tabla `aws_eks_cluster` en las que el `logging` **no** tenga `"enabled":true%'`. |
| `IN`         | Busca varios valores en una cláusula `WHERE`. La operación `IN` es una abreviatura para múltiples condiciones `OR`. | `SELECT * FROM host WHERE cloud_provider IN ('aws', 'gcp');`  | Devuelve todas las filas de la tabla `host` en las que el valor de `cloud_provider` sea 'AWS' o 'GCP'.|
| `NOT IN`     | Sustituye un conjunto de argumentos con la operación `<>` o `!=` que se combina con la operación `AND` | `SELECT * FROM host WHERE cloud_provider NOT IN ('aws', 'gcp');`  | Devuelve todas las filas en las que `cloud_provider` no sea `aws` o `gcp`. |


DDSQL admite la palabra clave `BETWEEN` de forma que `a BETWEEN x AND y` sea equivalente a `a >= x AND a <= y`. Consulta [la documentación de Postgres para `BETWEEN`][2] para obtener más detalles.

## Operaciones lógicas

| Nombre    | Descripción             |
|---------|-------------------------|
| Y     | Lógica booleana, a & b    |
| O      | Lógica booleana, a &vert;&vert; b |
| XOR     | Lógica booleana, a ^ b    |
| NO     | Lógica booleana, !a       |
| ES NULA | Devuelve true para cada fila que sea nula |


## CASE

La expresión `CASE` es una expresión condicional genérica, similar a las sentencias si/o de otros lenguajes de programación. `CASE` tiene dos formas, simple y buscada.

### Sentencias CASE simples

Las sentencias CASE simples utilizan la siguiente sintaxis:

{{< code-block lang="sql" >}}
Expresión CASE
  CUANDO valor ENTONCES resultado
  [ WHEN ... ]
  [ ELSE resultado ]
FIN
{{< /code-block >}}

La expresión se calcula y luego se compara con cada una de las expresiones de valor de las cláusulas `WHEN` hasta que se encuentre una que sea igual a ella. Si no se encuentra ninguna coincidencia, se devuelve el resultado de la cláusula `ELSE` o `NULL` si se omite `ELSE`.

### Sentencias CASE buscadas

Las sentencias CASE buscadas utilizan la siguiente sintaxis:

{{< code-block lang="sql" >}}
CASE
  CUANDO condición ENTONCES resultado
  [ WHEN ... ]
  [ ELSE resultado ]
FIN
{{< /code-block >}}

Si el resultado de una condición es true, el valor de la expresión `CASE` es el resultado que sigue a la condición y el resto de la expresión `CASE` no se procesa. Si el resultado de la condición no es true, cualquier cláusula `WHEN` subsiguiente se examina de la misma manera. Si la condición `WHEN` no es true, el valor de la expresión `CASE` es el resultado de la cláusula `ELSE`. Si se omite la cláusula `ELSE` y no se cumple ninguna condición, el resultado es `NULL`.

## CAST

`CAST` especifica una conversión de un tipo de datos a otro.

### Sintaxis

{{< code-block lang="sql" >}}
CAST(expresión COMO tipo)
{{< /code-block >}}

No todos los tipos son convertibles de esta forma.

DDSQL también admite la sintaxis de transmisión de Postgres:

{{< code-block lang="sql" >}}
expression::type
{{< /code-block >}}

Por ejemplo, `SELECT 1::text;`.


[1]: /es/ddsql_reference/ddsql_preview/tags/
[2]: https://www.postgresql.org/docs/current/functions-comparison.html