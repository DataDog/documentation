---
aliases:
- /es/dashboards/ddsql_editor/reference/statements/
title: Sentencias DDSQL
---

{{< callout url="https://datadoghq.com/private-beta/ddsql-editor">}}
DDSQL está en vista previa.
{{< /callout >}}

## SELECT

`SELECT` recupera filas de una tabla o vista.

### Sintaxis

{{< code-block lang="text" >}}
SELECT [ ALL | DISTINCT ] select_expr, ...
[ FROM rel_source
  [ EVENT_SEARCH 'message_pattern' ]
  [ USE EVENT_INDEX 'index_name' ]
  [ [ join_type ] JOIN rel_source ...
    [ ON condition | USING (column, ... ) ] ] ... ]
[ WHERE condition ]
[ GROUP BY [ ALL | DISTINCT ] expression, ... ]
[ HAVING condition, ... ]
[ ORDER BY expression, ... [ ASC | DESC ] [ NULLS FIRST | NULLS LAST ] ]
[ LIMIT [ ALL | expression ]
  [ OFFSET expression ] ]
{{< /code-block >}}

#### Tipos de parámetros

`select_expr`
: cualquier expresión que devuelva un valor. Puede ser una constante, una llamada a función, un agregado, una ventana o la expresión especial `*`. Es la parte de la consulta que especifica la salida de la sentencia SELECT, y en álgebra relacional se conoce como proyección.

`message_pattern`
: un patrón textual para la [búsqueda de texto completo][1], cuando esté disponible.

`index_name`
: un identificador para un [índice de logs][2].

`rel_source`
: una correlación (un nombre de tabla o alias) o una [expresión DQL][3] entre paréntesis.

`join_type`
: el tipo de unión SQL, como `INNER` o `LEFT`. Las uniones `INNER` son totalmente compatibles. Las uniones `OUTER` y `CROSS` pueden requerir una condición `WHERE`. Las uniones `LEFT` y `RIGHT` también son compatibles si la condición es una expresión *equijoin*: una comparación de igualdad como `<EXPRESSION_1> = <EXPRESSION_2>` en la que las expresiones hacen referencia a columnas de tablas diferentes y los tipos de salida de ambas expresiones son los mismos. También funciona una expresión `USING` `JOIN` que se refiera a una sola columna.

`condition`
: una expresión que se evalúa e interpreta implícitamente como si tuviera un resultado booleano.

`expression`
: una expresión de valor. Consulta [Expresiones y operadores][4] para obtener más detalles y ejemplos.

### Evaluación

SELECT recupera filas de cero o más tablas. El procesamiento general de SELECT es el siguiente:

1. Se calculan todos los elementos de `FROM`. Si se especifica más de un elemento, se unen utilizando el tipo de unión especificado.
2. Si se especifica la cláusula `WHERE`, las filas que no cumplan la condición se eliminan de la salida.
3. Si se especifica la cláusula `GROUP BY` o hay llamadas a la función agregada en `selectExpr`, la salida se combina en grupos de filas que coinciden en uno o más valores, y se calculan los agregados. Si `HAVING` está presente, las filas que no satisfacen su condición se eliminan de la salida.
4. Las filas de salida reales se calculan utilizando `selectExpr`.
5. `SELECT DISTINCT` elimina las filas duplicadas del resultado.
6. Si se especifica la cláusula `ORDER BY`, las filas devueltas se ordenan en el orden especificado.
7. Si se especifica la cláusula `LIMIT` o `OFFSET`, se eliminan las filas que no estén en el subconjunto especificado.

El sistema puede ejecutar la consulta de cualquier forma que asegure la obtención de los resultados especificados por este orden.

## Alias

Los alias son nombres sustitutivos de expresiones de salida o elementos `FROM`. Un alias se utiliza por brevedad o para eliminar la ambigüedad de las autouniones (cuando la misma tabla se explora varias veces).

{{< code-block lang="sql" >}}
SELECT * FROM my_long_hosts_table_name as hosts
{{< /code-block >}}

Cuando se proporciona un alias en un elemento `FROM`, éste oculta completamente el nombre real de la tabla o función. En el ejemplo anterior, el resto de la expresión DQL debe referirse a `my_long_hosts_table_name` como `hosts`.

## Ordinales

`GROUP BY` y `ORDER BY` pueden ser nombres de columnas, expresiones arbitrarias formadas a partir de columnas de entrada o el nombre o número ordinal de una expresión de salida (una expresión `SELECT` ). Los ordinales de las expresiones de salida se indexan en 1.

Por ejemplo, la salida de esta consulta se ordena primero por `ex3`, luego `ex2` y después `ex1`:

{{< code-block lang="sql" >}}
SELECT ex1, ex2, ex3 FROM table ORDER BY 3, 2, 1;
{{< /code-block >}}

## UNION

`UNION` combina los resultados de dos o más [expresiones DQL][3] en una única tabla de salida.

### Sintaxis

{{< code-block lang="text" >}}
DQL_expression UNION [ ALL ] DQL_expression ...
[ ORDER BY expressions [ ASC | DESC ] ]
[ LIMIT [ ALL | expression ]
  [ OFFSET expression] ]
{{< /code-block >}}

#### Tipos de parámetros

`DQL_expression`
: una sentencia de consulta, por ejemplo, `SELECT`.

El operador `UNION` elimina las filas duplicadas del resultado. Para conservar las filas duplicadas, utiliza `UNION ALL`:

{{< code-block lang="sql" >}}
SELECT host_key, CAST(service AS text) AS service, 'from resources' FROM host
UNION ALL
SELECT message, service AS text, 'from logs' FROM logs WHERE env='prod'
ORDER BY service LIMIT 200 OFFSET 10;
{{< /code-block >}}

Todas las subconsultas de una `UNION` deben tener el mismo esquema de salida. Una consulta que contenga una consulta `UNION` sólo puede tener una expresión `ORDER BY` y `LIMIT`, y ambas deben aparecer al final. Las `UNION`encadenadas sólo pueden tener una expresión `ORDER BY` y `LIMIT` al final.

## WITH

`WITH` permite escribir sentencias auxiliares para utilizarlas en una consulta más amplia.

Las sentencias`WITH`, que también suelen denominarse expresiones de tabla comunes o CTE, pueden considerarse como la definición de tablas temporales que existen para una consulta. Cada sentencia auxiliar de una cláusula `WITH` puede ser cualquier [expresión DQL][3], y la propia cláusula `WITH` se adjunta a una sentencia primaria que también puede ser cualquier expresión DQL que no sea`WITH`. Las sentencias auxiliares posteriores pueden hacer referencia a correlaciones con alias en sentencias auxiliares anteriores.

### Sintaxis

{{< code-block lang="sql" >}}
WITH alias [ ( output, schema, column, names, ... ) ] AS ( DQL_expression ) [, ...] DQL_expression
{{< /code-block >}}

#### Tipos de parámetros

`DQL_expression`
: una sentencia de consulta, por ejemplo, `SELECT`.

Las sentencias de modificación de datos como `INSERT`, `UPDATE` y `DELETE` no son compatibles con `WITH`.

Cada consulta de alias también puede especificar su esquema de salida y los nombres de las columnas.

## CREATE

DDSQL permite a los usuarios crear tablas temporales, insertar en ellas, consultarlas y hacer referencia a ellas. Estas tablas no se conservan entre sesiones.

### Sintaxis

{{< code-block lang="sql" >}}
CREATE TABLE name (
  column_name column_type
  [ PRIMARY KEY [ AUTOINCREMENT ] | NOT NULL | UNIQUE | DEFAULT expression ] ...
)
{{< /code-block >}}

## INSERT

La sentencia `INSERT` de DDSQL sigue el estándar SQL. DDSQL sólo permite a los usuarios insertar en tablas temporales que se crean con la sentencia `CREATE`, no en orígenes de datos descendentes.

### Sintaxis

{{< code-block lang="sql" >}}
INSERT INTO table_name [ (specific, columns, ...) ] VALUES
  ( value1, value2, ... ),
  ( value1, value2, ... ),
  ...
{{< /code-block >}}

## SHOW

<div class="alert alert-warning">Mientras que la sentencia <code>SHOW</code> forma parte del estándar SQL, los nombres de los parámetros en tiempo de ejecución son experimentales. Los parámetros pueden cambiar de nombre, reescribirse o quedar obsoletos en el futuro.</div>

Al ejecutar consultas, DDSQL hace referencia a parámetros de tiempo de ejecución (variables de entorno) que no se especifican en la propia sentencia de consulta, como el intervalo predeterminado que se utilizará para las consultas de métricas si no se especifica `BUCKET BY`, o la marca de hora de inicio y fin de una consulta.

La sentencia `SHOW` muestra los valores de estas variables.

### Sintaxis

{{< code-block lang="sql" >}}
SHOW (ALL | parameter)
{{< /code-block >}}

`SHOW ALL` muestra todos los parámetros de ejecución disponibles en el sistema DDSQL, y `SHOW <PARAMETER>` muestra sólo el parámetro especificado.

## SET

Para modificar un parámetro en tiempo de ejecución, utiliza la sentencia `SET`.

### Sintaxis

{{< code-block lang="sql" >}}
SET variableName = expression
{{< /code-block >}}

[1]: /es/logs/explorer/search_syntax/#full-text-search
[2]: /es/logs/log_configuration/indexes/
[3]: /es/ddsql_editor/#use-sql-syntax-ddsql
[4]: /es/ddsql_editor/reference/expressions_and_operators