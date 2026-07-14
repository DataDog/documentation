---
aliases:
- /es/logs/workspaces/sql_reference
- /es/ddsql_reference/ddsql_default
description: Referencia completa para la sintaxis de DDSQL, tipos de datos, funciones,
  operadores y declaraciones para consultar datos de Datadog con SQL.
further_reading:
- link: bits_ai/mcp_server
  tag: Documentación
  text: Servidor MCP de Datadog
- link: /ddsql_editor/
  tag: Documentación
  text: Editor de DDSQL
products:
- icon: ddsql
  name: Editor de DDSQL
  url: /ddsql_editor/
- icon: notebook
  name: Notebooks
  url: /notebooks/
title: Referencia de DDSQL
---
{{< product-availability >}}

## Descripción general {#overview}

DDSQL es SQL para datos de Datadog. Implementa varias operaciones estándar de SQL, como `SELECT`, y permite consultas sobre datos no estructurados. Puedes realizar acciones como obtener exactamente los datos que deseas escribiendo tu propia sentencia `SELECT`, o consultando etiquetas como si fueran columnas de tabla estándar.

Puedes ejecutar consultas de DDSQL desde agentes de IA utilizando el conjunto de herramientas [Servidor MCP de Datadog][10] `ddsql` (Vista previa).

Esta documentación cubre el soporte de SQL disponible e incluye:
- [Sintaxis compatible con PostgreSQL](#syntax)
- [Tipos de datos](#data-types)
- [Literales de tipo](#type-literals)
- [Arreglos](#arrays)
- [Funciones SQL](#functions)
- [Expresiones regulares](#regular-expressions)
- [Funciones de ventana](#window-functions)
- [Funciones JSON](#json-functions-and-operators)
- [Funciones de dirección de red](#network-address-functions-and-operators)
- [Funciones de tabla](#table-functions)
- [Etiquetas](#tags)


{{< img src="/logs/workspace/sql_reference/sql_syntax_analysis_cell.png" alt="Ejemplo de celda de espacio de trabajo con sintaxis SQL" style="width:100%;" >}}

## Sintaxis {#syntax}

La siguiente sintaxis SQL es compatible:

`SELECT (DISTINCT)` (DISTINCT: Opcional)
: Recupera filas de una base de datos, con `DISTINCT` filtrando registros duplicados.

    {{< code-block lang="sql" >}}SELECT DISTINCT customer_id
FROM orders {{< /code-block >}}

`JOIN`
: Combina filas de dos o más tablas basadas en una columna relacionada entre ellas. Soporta FULL JOIN, INNER JOIN, LEFT JOIN, RIGHT JOIN.

    {{< code-block lang="sql" >}}SELECT orders.order_id, customers.customer_name
FROM orders
JOIN customers
ON orders.customer_id = customers.customer_id {{< /code-block >}}

`GROUP BY`
: Agrupa filas que tienen los mismos valores en columnas especificadas en filas de resumen.

    {{< code-block lang="sql" >}}SELECT product_id, SUM(quantity)
FROM sales
GROUP BY product_id {{< /code-block >}}

`||` (concat)
: Concatena dos o más cadenas juntas.

    {{< code-block lang="sql" >}}SELECT first_name || ' ' || last_name AS full_name
FROM employees {{< /code-block >}}

`WHERE` (Incluye soporte para `LIKE`, `IN`, `ON`, `OR` filtros)
: Filtra registros que cumplen una condición especificada.

    {{< code-block lang="sql" >}}SELECT *
FROM employees
WHERE department = 'Sales' AND name LIKE 'J%' {{< /code-block >}}

`CASE`
: Proporciona lógica condicional para devolver diferentes valores según condiciones especificadas.

    {{< code-block lang="sql" >}}SELECT order_id,
  CASE
    WHEN quantity > 10 THEN 'Bulk Order'
    ELSE 'Standard Order'
  END AS order_type
FROM orders {{< /code-block >}}

`WINDOW`
: Realiza un cálculo a través de un conjunto de filas de tabla que están relacionadas con la fila actual.

    {{< code-block lang="sql" >}}SELECT
  timestamp,
  service_name,
  cpu_usage_percent,
  AVG(cpu_usage_percent) OVER (PARTITION BY service_name ORDER BY timestamp ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS moving_avg_cpu
FROM
  cpu_usage_data {{< /code-block >}}

`IS NULL` / `IS NOT NULL`
: Verifica si un valor es nulo o no nulo.

    {{< code-block lang="sql" >}}SELECT *
FROM orders
WHERE delivery_date IS NULL {{< /code-block >}}

`LIMIT`
: Especifica el número máximo de registros a devolver.

    {{< code-block lang="sql" >}}SELECT *
FROM customers
LIMIT 10 {{< /code-block >}}

`OFFSET`
: Salta un número especificado de registros antes de comenzar a devolver registros de la consulta.

    {{< code-block lang="sql" >}}SELECT *
FROM employees
OFFSET 20 {{< /code-block >}}

`ORDER BY`
: Ordena el conjunto de resultados de una consulta por una o más columnas. Incluye ASC, DESC para el orden de clasificación.

    {{< code-block lang="sql" >}}SELECT *
FROM sales
ORDER BY sale_date DESC {{< /code-block >}}

`HAVING`
: Filtra registros que cumplen una condición especificada después de agrupar.

    {{< code-block lang="sql" >}}SELECT product_id, SUM(quantity)
FROM sales
GROUP BY product_id
HAVING SUM(quantity) > 10 {{< /code-block >}}

`IN`, `ON`, `OR`
: Utilizado para condiciones especificadas en consultas. Disponible en las cláusulas `WHERE`, `JOIN`.

    {{< code-block lang="sql" >}}SELECT *
FROM orders
WHERE order_status IN ('Shipped', 'Pending') {{< /code-block >}}

`USING`
: Esta cláusula es una abreviatura para uniones donde las columnas de unión tienen el mismo nombre en ambas tablas. Toma una lista separada por comas de esas columnas y crea una condición de igualdad separada para cada par coincidente. Por ejemplo, unir `T1` y `T2` con `USING (a, b)` es equivalente a `ON T1.a = T2.a AND T1.b = T2.b`.

    {{< code-block lang="sql" >}}SELECT orders.order_id, customers.customer_name
FROM orders
JOIN customers
USING (customer_id) {{< /code-block >}}

`AS`
: Renombra una columna o tabla con un alias.

    {{< code-block lang="sql" >}}SELECT first_name AS name
FROM employees {{< /code-block >}}

Operaciones Aritméticas
: Realiza cálculos básicos utilizando operadores como `+`, `-`, `*`, `/`.

    {{< code-block lang="sql" >}}SELECT price, tax, (price * tax) AS total_cost
FROM products {{< /code-block >}}

`INTERVAL value unit`
: Intervalo que representa una duración de tiempo especificada en una unidad dada.
Unidades soportadas:<br>- `milliseconds` / `millisecond`<br>- `seconds` / `second`<br>- `minutes` / `minute`<br>- `hours` / `hour`<br>- `days` / `day`

## Tipos de datos {#data-types}

DDSQL soporta los siguientes tipos de datos:

| Tipo de Dato | Descripción |
|-----------|-------------|
| `BIGINT` | Enteros con signo de 64 bits. |
| `BOOLEAN` | `true` o `false` valores. |
| `DECIMAL` | Números de punto flotante. |
| `INET` | Valores de dirección de red (IPv4 e IPv6, con longitud de prefijo CIDR opcional). |
| `INTERVAL` | Valores de duración de tiempo. |
| `JSON` | Datos JSON. |
| `TIMESTAMP` | Valores de fecha y hora. |
| `VARCHAR` | Cadenas de caracteres de longitud variable. |

### Tipos de arreglo {#array-types}

Todos los tipos de datos soportan tipos de arreglo. Vea [Arreglos](#arrays) para literales de arreglo, acceso a elementos y funciones de arreglo.

## Literales de tipo {#type-literals}

DDSQL admite literales de tipo explícitos utilizando la sintaxis `[TYPE] [value]`.

| Tipo | Sintaxis | Ejemplo |
|------|--------|---------|
| `BIGINT` | `BIGINT 'value'` | `BIGINT '1234567'` |
| `BOOLEAN` | `BOOLEAN 'value'` | `BOOLEAN 'true'` |
| `DECIMAL` | `DECIMAL 'value'` | `DECIMAL '3.14159'` |
| `INET` | `INET 'value'` | `INET '192.168.1.5/24'` |
| `INTERVAL` | `INTERVAL 'value unit'` | `INTERVAL '30 minutes'` |
| `JSON` | `JSON 'value'` | `JSON '{"key": "value", "count": 42}'` |
| `TIMESTAMP` | `TIMESTAMP 'value'` | `TIMESTAMP '2023-12-25 10:30:00'` |
| `VARCHAR` | `VARCHAR 'value'` | `VARCHAR 'hello world'` |

El prefijo de tipo se puede omitir y el tipo se infiere automáticamente del valor. Por ejemplo, `'hello world'` se infiere como `VARCHAR`, `123` como `BIGINT`, y `true` como `BOOLEAN`. Utilice prefijos de tipo explícitos cuando los valores puedan ser ambiguos; por ejemplo, `TIMESTAMP '2025-01-01'` se inferiría como `VARCHAR` sin el prefijo.

### Ejemplo {#example}

{{< code-block lang="sql" >}}
-- Using type literals in queries
SELECT
    VARCHAR 'Product Name: ' || name AS labeled_name,
    price * DECIMAL '1.08' AS price_with_tax,
    created_at + INTERVAL '7 days' AS expiry_date
FROM products
WHERE created_at > TIMESTAMP '2025-01-01';
{{< /code-block >}}

## Arreglos {#arrays}

Los arreglos son colecciones ordenadas de valores que comparten el mismo tipo de dato. Cada tipo base de DDSQL tiene un tipo de arreglo correspondiente.

### Literales de arreglo {#array-literals}

Utilice la sintaxis `ARRAY[value1, value2, ...]` para construir un literal de arreglo. El tipo de arreglo se infiere automáticamente de los valores.

{{< code-block lang="sql" >}}
SELECT ARRAY['apple', 'banana', 'cherry'] AS fruits;  -- VARCHAR array
SELECT ARRAY[1, 2, 3] AS numbers;                     -- BIGINT array
SELECT ARRAY[true, false, true] AS flags;             -- BOOLEAN array
SELECT ARRAY[1.1, 2.2, 3.3] AS decimals;              -- DECIMAL array
{{< /code-block >}}

### Acceso a elementos {#element-access}

Accede a elementos individuales de un arreglo con un subíndice basado en 1. Acceder a un índice que está fuera de límites devuelve `NULL`.

{{< code-block lang="sql" >}}
SELECT ARRAY['a', 'b', 'c'][1];   -- Returns 'a'
SELECT ARRAY['a', 'b', 'c'][2];   -- Returns 'b'
SELECT ARRAY['a', 'b', 'c'][10];  -- Returns NULL (out of bounds)
{{< /code-block >}}

Para acceder a los elementos de una columna de arreglo, utiliza la misma sintaxis de subíndice:

{{< code-block lang="sql" >}}
SELECT recipients[1] AS first_recipient
FROM emails
{{< /code-block >}}

### Funciones de arreglo {#array-functions}

Las siguientes funciones operan sobre arreglos:

| Función | Tipo de retorno | Descripción |
|----------|-------------|-------------|
| `CARDINALITY(array a)` | `BIGINT` | Devuelve el número de elementos en el arreglo. |
| `ARRAY_POSITION(array a, typeof_array value)` | `BIGINT` | Devuelve el índice basado en 1 de la primera ocurrencia de `value` en el arreglo, o `NULL` si no se encuentra. |
| `STRING_TO_ARRAY(string s, string delimiter)` | `VARCHAR[]` | Divide una cadena en un arreglo de cadenas usando el delimitador dado. |
| `ARRAY_TO_STRING(array a, string delimiter)` | `VARCHAR` | Une los elementos del arreglo en una cadena con el delimitador dado. |
| `ARRAY_AGG(expression e)` | arreglo de tipo de entrada | Agrupa valores de múltiples filas en un arreglo. |
| `UNNEST(array a [, array b...])` | filas de un [, b...] | Expande uno o más arreglos en un conjunto de filas. Solo válido en una cláusula `FROM`. |

{{% collapse-content title="Ejemplos" level="h3" %}}

### `CARDINALITY` {#cardinality}
{{< code-block lang="sql" >}}
SELECT
  CARDINALITY(recipients) AS recipient_count
FROM
  emails
{{< /code-block >}}

### `ARRAY_POSITION` {#array-position}
{{< code-block lang="sql" >}}
SELECT
  ARRAY_POSITION(recipients, 'hello@example.com') AS position
FROM
  emails
{{< /code-block >}}

### `STRING_TO_ARRAY` {#string-to-array}
{{< code-block lang="sql" >}}
SELECT
  STRING_TO_ARRAY('a,b,c,d,e,f', ',') AS parts
{{< /code-block >}}

### `ARRAY_TO_STRING` {#array-to-string}
{{< code-block lang="sql" >}}
SELECT
  ARRAY_TO_STRING(ARRAY['a', 'b', 'c'], ',') AS joined_string
{{< /code-block >}}

### `ARRAY_AGG` {#array-agg}
{{< code-block lang="sql" >}}
SELECT
  sender,
  ARRAY_AGG(subject) AS subjects,
  ARRAY_AGG(DISTINCT subject) AS distinct_subjects
FROM
  emails
GROUP BY
  sender
{{< /code-block >}}

### `UNNEST` {#unnest}
{{< code-block lang="sql" >}}
SELECT
  sender,
  recipient
FROM
  emails,
  UNNEST(recipients) AS recipient
{{< /code-block >}}

{{% /collapse-content %}}

## Funciones {#functions}

Las siguientes funciones SQL son compatibles. Para la función de ventana, consulte la sección separada [Función de ventana](#window-functions) en esta documentación.

| Función                                         | Tipo de retorno                           | Descripción                                                                                                                                                                                       |
|--------------------------------------------------|---------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `MIN(variable v)`                                | typeof v                              | Devuelve el valor más pequeño en un conjunto de datos.                                                                                                                                                      |
| `MAX(variable v)`                                | typeof v                              | Devuelve el valor máximo entre todos los valores de entrada.                                                                                                                                                |
| `COUNT(any a)`                                   | numérico                               | Devuelve el número de valores de entrada que no son nulos.                                                                                                                                             |
| `SUM(numeric n)`                                 | numérico                               | Devuelve la suma de todos los valores de entrada.                                                                                                                                                    |
| `AVG(numeric n)`                                 | numérico                               | Devuelve el valor promedio (media aritmética) de todos los valores de entrada.                                                                                                                              |
| `BOOL_AND(boolean b)`                            | booleano                               | Devuelve si todos los valores de entrada no nulos son verdaderos.                                                                                                                                               |
| `BOOL_OR(boolean b)`                             | booleano                               | Devuelve si algún valor de entrada no nulo es verdadero.                                                                                                                                                 |
| `CEIL(numeric n)` / `CEILING(numeric n)`         | numérico                               | Devuelve el valor redondeado hacia arriba al entero más cercano. Tanto `CEIL` como `CEILING` son compatibles como alias.                                                                                         |
| `FLOOR(numeric n)`                               | numérico                               | Devuelve el valor redondeado hacia abajo al entero más cercano.                                                                                                                                            |
| `ROUND(numeric n)`                               | numérico                               | Devuelve el valor redondeado al entero más cercano.                                                                                                                                                 |
| `POWER(numeric base, numeric exponent)`          | numérico                               | Devuelve el valor de la base elevado a la potencia del exponente.                                                                                                                                        |
| `LOWER(string s)`                                | cadena                                | Devuelve la cadena en minúsculas.                                                                                                                                                                  |
| `UPPER(string s)`                                | cadena                                | Devuelve la cadena en mayúsculas.                                                                                                                                                                  |
| `ABS(numeric n)`                                 | numérico                               | Devuelve el valor absoluto.                                                                                                                                                                       |
| `COALESCE(args a)`                               | typeof primer a no nulo O nulo       | Devuelve el primer valor no nulo o nulo si todos son nulos.                                                                                                                                         |
| `CAST(value AS type)`                            | tipo                                  | Convierte el valor dado al tipo de dato especificado.                                                                                                                                              |
| `LENGTH(string s)`                               | entero                               | Devuelve el número de caracteres en la cadena.                                                                                                                                                   |
| `TRIM(string s)`                                 | cadena                                | Elimina los espacios en blanco al inicio y al final de la cadena.                                                                                                                                          |
| `REPLACE(string s, string from, string to)`      | cadena                                | Reemplaza las ocurrencias de una subcadena dentro de una cadena con otra subcadena.                                                                                                                       |
| `SUBSTRING(string s, int start, int length)`     | cadena                                | Extrae una subcadena de una cadena, comenzando en una posición dada y por una longitud especificada.                                                                                                      |
| `REVERSE(string s)`                              | cadena                                | Devuelve la cadena con los caracteres en orden inverso.                                                                                                                                               |
| `STRPOS(string s, string substring)`             | entero                               | Devuelve la primera posición en la que se encuentra la subcadena en una cadena dada, o 0 si no hay coincidencia.                                                                                                   |
| `SPLIT_PART(string s, string delimiter, integer index)` | cadena                         | Divide la cadena en el delimitador dado y devuelve la cadena en la posición dada contando desde uno.                                                                                          |
| `EXTRACT(unit from timestamp/interval)`          | numérico                               | Extrae una parte de un campo de fecha u hora (como el año o el mes) de un timestamp o intervalo.                                                                                                     |
| `TO_TIMESTAMP(string timestamp, string format)`  | timestamp                             | Convierte una cadena a un timestamp de acuerdo con el formato dado.                                                                                                                                   |
| `TO_TIMESTAMP(numeric epoch)`                    | timestamp                             | Convierte un timestamp de época UNIX (en segundos) a un timestamp.                                                                                                                                      |
| `TO_CHAR(timestamp t, string format)`            | cadena                                | Convierte un timestamp a una cadena de acuerdo con el formato dado.                                                                                                                                   |
| `DATE_BIN(interval stride, timestamp source, timestamp origin)` | timestamp                             | Alinea un timestamp (fuente) a intervalos de longitud uniforme. Devuelve el inicio del bucket que contiene la fuente, calculado como el mayor timestamp que es menor o igual a la fuente y que es un múltiplo de la longitud del stride a partir del origen. |
| `DATE_TRUNC(string unit, timestamp t)`           | timestamp                             | Trunca un timestamp a una precisión especificada basada en la unidad proporcionada.                                                                                                                        |
| `CURRENT_SETTING(string setting_name)`           | cadena                                | Devuelve el valor actual de la configuración especificada. Soporta los parámetros `dd.time_frame_start` y `dd.time_frame_end`, que devuelven el inicio y el final del marco temporal global, respectivamente. |
| `NOW()`                                          | timestamp                             | Devuelve el timestamp UTC actual al inicio de la consulta actual.                                                                                                                              |
| `CARDINALITY(array a)`                           | entero                               | Devuelve el número de elementos en el arreglo.                                                                                                                                                      |
| `ARRAY_POSITION(array a, typeof_array value)`    | entero                               | Devuelve el índice de la primera ocurrencia del valor encontrado en el arreglo, o nulo si el valor no se encuentra.                                                                                         |
| `STRING_TO_ARRAY(string s, string delimiter)`    | arreglo de cadenas                      | Divide la cadena dada en un arreglo de cadenas utilizando el delimitador proporcionado.                                                                                                                       |
| `ARRAY_TO_STRING(array a, string delimiter)`     | cadena                                | Convierte un arreglo en una cadena concatenando los elementos con el delimitador dado.                                                                                                                 |
| `ARRAY_AGG(expression e)`                        | arreglo de tipo de entrada                   | Crea un arreglo recolectando todos los valores de entrada.                                                                                                                                              |
| `APPROX_PERCENTILE(double percentile) WITHIN GROUP (ORDER BY expression e)` | expresión typeof        | Calcula un valor percentil aproximado. El percentil debe estar entre 0.0 y 1.0 (inclusive). Requiere la sintaxis `WITHIN GROUP (ORDER BY ...)`.                                              |
| `UNNEST(array a [, array b...])`                 | filas de a [, b...]                    | Expande arreglos en un conjunto de filas. Esta forma solo se permite en una cláusula FROM.                                                                                                                    |

{{% collapse-content title="Ejemplos" level="h3" %}}

### `MIN` {#min}
{{< code-block lang="sql" >}}
SELECT MIN(response_time) AS min_response_time
FROM logs
WHERE status_code = 200
{{< /code-block >}}

### `MAX` {#max}
{{< code-block lang="sql" >}}
SELECT MAX(response_time) AS max_response_time
FROM logs
WHERE status_code = 200
{{< /code-block >}}

### `COUNT` {#count}
{{< code-block lang="sql" >}}SELECT COUNT(request_id) AS total_requests
FROM logs
WHERE status_code = 200 {{< /code-block >}}

### `SUM` {#sum}
{{< code-block lang="sql" >}}SELECT SUM(bytes_transferred) AS total_bytes
FROM logs
GROUP BY service_name
{{< /code-block >}}

### `AVG` {#avg}
{{< code-block lang="sql" >}}SELECT AVG(response_time)
AS avg_response_time
FROM logs
WHERE status_code = 200
GROUP BY service_name
{{< /code-block >}}

### `BOOL_AND` {#bool-and}
{{< code-block lang="sql" >}}SELECT BOOL_AND(status_code = 200) AS all_success
FROM logs
{{< /code-block >}}

### `BOOL_OR` {#bool-or}
{{< code-block lang="sql" >}}SELECT BOOL_OR(status_code = 200) AS some_success
FROM logs
{{< /code-block >}}

### `CEIL` {#ceil}
{{< code-block lang="sql" >}}
SELECT CEIL(price) AS rounded_price
FROM products
{{< /code-block >}}

### `FLOOR` {#floor}
{{< code-block lang="sql" >}}
SELECT FLOOR(price) AS floored_price
FROM products
{{< /code-block >}}

### `ROUND` {#round}
{{< code-block lang="sql" >}}
SELECT ROUND(price) AS rounded_price
FROM products
{{< /code-block >}}

### `POWER` {#power}
{{< code-block lang="sql" >}}
SELECT POWER(response_time, 2) AS squared_response_time
FROM logs
{{< /code-block >}}

### `LOWER` {#lower}
{{< code-block lang="sql" >}}
SELECT LOWER(customer_name) AS lowercase_name
FROM customers
{{< /code-block >}}

### `UPPER` {#upper}
{{< code-block lang="sql" >}}
SELECT UPPER(customer_name) AS uppercase_name
FROM customers
{{< /code-block >}}

### `ABS` {#abs}
{{< code-block lang="sql" >}}
SELECT ABS(balance) AS absolute_balance
FROM accounts
{{< /code-block >}}

### `COALESCE` {#coalesce}
{{< code-block lang="sql" >}}
SELECT COALESCE(phone_number, email) AS contact_info
FROM users
{{< /code-block >}}

### `CAST` {#cast}

Supported cast target types:

Traducción corregida: "Tipos de destino de cast soportados:"
- `BIGINT`
- `DECIMAL`
- `INET`
- `TIMESTAMP`
- `VARCHAR`

{{< code-block lang="sql" >}}
SELECT
  CAST(order_id AS VARCHAR) AS order_id_string,
  'Order-' || CAST(order_id AS VARCHAR) AS order_label
FROM
  orders
{{< /code-block >}}

### `LENGTH` {#length}
{{< code-block lang="sql" >}}
SELECT
  customer_name,
  LENGTH(customer_name) AS name_length
FROM
  customers
{{< /code-block >}}

### `INTERVAL` {#interval}
{{< code-block lang="sql" >}}
SELECT
  TIMESTAMP '2023-10-01 10:00:00' + INTERVAL '30 days' AS future_date,
  INTERVAL '1 MILLISECOND 2 SECONDS 3 MINUTES 4 HOURS 5 DAYS'
{{< /code-block >}}

### `TRIM` {#trim}
{{< code-block lang="sql" >}}
SELECT
  TRIM(name) AS trimmed_name
FROM
  users
{{< /code-block >}}

###  `REPLACE` {#replace}
{{< code-block lang="sql" >}}
SELECT
  REPLACE(description, 'old', 'new') AS updated_description
FROM
  products
{{< /code-block >}}

### `SUBSTRING` {#substring}
{{< code-block lang="sql" >}}
SELECT
  SUBSTRING(title, 1, 10) AS short_title
FROM
  books
{{< /code-block >}}

### `REVERSE` {#reverse}
{{< code-block lang="sql" >}}
SELECT
  REVERSE(username) AS reversed_username
FROM
  users
LIMIT 5
{{< /code-block >}}

### `STRPOS` {#strpos}
{{< code-block lang="sql" >}}
SELECT
  STRPOS('foobar', 'bar')
{{< /code-block >}}

### `SPLIT_PART` {#split-part}
{{< code-block lang="sql" >}}
SELECT
  SPLIT_PART('aaa-bbb-ccc', '-', 2)
{{< /code-block >}}

### `EXTRACT` {#extract}

Unidades de extracción soportadas:
| Literal           | Tipo de entrada               | Descripción                                  |
| ------------------| ------------------------ | -------------------------------------------- |
| `day`             | `timestamp` / `interval` | día del mes                             |
| `dow`             | `timestamp`              | día de la semana `1` (lunes) a `7` (domingo) |
| `doy`             | `timestamp`              | día del año (`1` - `366`)                |
| `epoch`           | `timestamp` / `interval` | segundos desde 1970-01-01 00:00:00 UTC (para marcas de tiempo), o número total de segundos (para intervalos) |
| `hour`            | `timestamp` / `interval` | hora del día (`0` - `23`)                 |
| `minute`          | `timestamp` / `interval` | minuto de la hora (`0` - `59`)              |
| `second`          | `timestamp` / `interval` | segundo del minuto (`0` - `59`)            |
| `week`            | `timestamp`              | semana del año (`1` - `53`)                |
| `month`           | `timestamp`              | mes del año (`1` - `12`)               |
| `quarter`         | `timestamp`              | trimestre del año (`1` - `4`)              |
| `year`            | `timestamp`              | año                                         |
| `timezone_hour`   | `timestamp`              | hora del desfase horario                 |
| `timezone_minute` | `timestamp`              | minuto del desfase horario               |

{{< code-block lang="sql" >}}
SELECT
  EXTRACT(year FROM purchase_date) AS purchase_year
FROM
  sales
{{< /code-block >}}

{{< code-block lang="sql" >}}
-- Get the Unix epoch of a timestamp
SELECT EXTRACT(epoch FROM TIMESTAMP '2021-01-01 00:00:00+00')
-- Returns: 1609459200
{{< /code-block >}}

{{< code-block lang="sql" >}}
-- Get the total seconds in an interval
SELECT EXTRACT(epoch FROM INTERVAL '1 day 2 hours')
-- Returns: 93600
{{< /code-block >}}

{{< code-block lang="sql" >}}
-- Calculate how many seconds ago each event occurred
SELECT
  event_time,
  EXTRACT(epoch FROM now()) - EXTRACT(epoch FROM event_time) AS seconds_ago
FROM
  events
{{< /code-block >}}

### `TO_TIMESTAMP` {#to-timestamp}

`TO_TIMESTAMP` tiene dos formas:

**Forma 1: Convertir cadena a marca de tiempo con formato**

Patrones soportados para el formato de fecha/hora:
| Patrón     | Descripción                          |
| ----------- | ------------------------------------ |
| `YYYY`      | año (4 dígitos)                      |
| `YY`        | año (2 dígitos)                      |
| `MM`        | número de mes (01 - 12)               |
| `DD`        | día del mes (01 - 31)                 |
| `HH24`      | hora del día (00 - 23)                |
| `HH12`      | hora del día (01 - 12)                |
| `HH`        | hora del día (01 - 12)                |
| `MI`        | minuto (00 - 59)                     |
| `SS`        | segundo (00 - 59)                     |
| `MS`        | milisegundo (000 - 999)              |
| `TZ`        | abreviatura de zona horaria           |
| `OF`        | desplazamiento de zona horaria desde UTC|
| `AM` / `am` | indicador de meridiano (sin puntos) |
| `PM` / `pm` | indicador de meridiano (sin puntos) |

{{< code-block lang="sql" >}}
SELECT
  TO_TIMESTAMP('25/12/2025 04:23 pm', 'DD/MM/YYYY HH:MI am') AS ts
{{< /code-block >}}

**Forma 2: Convertir marca de tiempo de época UNIX a marca de tiempo**

{{< code-block lang="sql" >}}
SELECT
  TO_TIMESTAMP(1735142580) AS ts_from_epoch
{{< /code-block >}}

### `TO_CHAR` {#to-char}

Patrones soportados para el formato de fecha/hora:
| Patrón     | Descripción                          |
| ----------- | ------------------------------------ |
| `YYYY`      | año (4 dígitos)                      |
| `YY`        | año (2 dígitos)                      |
| `MM`        | número de mes (01 - 12)               |
| `DD`        | día del mes (01 - 31)                |
| `HH24`      | hora del día (00 - 23)                |
| `HH12`      | hora del día (01 - 12)                |
| `HH`        | hora del día (01 - 12)                |
| `MI`        | minuto (00 - 59)                     |
| `SS`        | segundo (00 - 59)                     |
| `MS`        | milisegundo (000 - 999)              |
| `TZ`        | abreviatura de zona horaria           |
| `OF`        | desplazamiento de zona horaria desde UTC            |
| `AM` / `am` | indicador de meridiano (sin puntos) |
| `PM` / `pm` | indicador de meridiano (sin puntos) |

{{< code-block lang="sql" >}}
SELECT
  TO_CHAR(order_date, 'MM-DD-YYYY') AS formatted_date
FROM
  orders
{{< /code-block >}}

### `DATE_BIN` {#date-bin}
{{< code-block lang="sql" >}}
SELECT DATE_BIN('15 minutes', TIMESTAMP '2025-09-15 12:34:56', TIMESTAMP '2025-01-01')
-- Returns 2025-09-15 12:30:00

SELECT DATE_BIN('1 day', TIMESTAMP '2025-09-15 12:34:56', TIMESTAMP '2025-01-01')
-- Returns 2025-09-15 00:00:00
{{< /code-block >}}

### `DATE_TRUNC` {#date-trunc}

Truncamientos soportados:
- `milliseconds`
- `seconds` / `second`
- `minutes` / `minute`
- `hours` / `hour`
- `days` / `day`
- `weeks` / `week `
- `months` / `month`
- `quarters` / `quarter`
- `years` / `year`

{{< code-block lang="sql" >}}
SELECT
  DATE_TRUNC('month', event_time) AS month_start
FROM
  events
{{< /code-block >}}

### `CURRENT_SETTING` {#current-setting}

Parámetros de configuración soportados:
- `dd.time_frame_start`: Devuelve el inicio del marco de tiempo seleccionado en formato RFC 3339 (`YYYY-MM-DD HH:mm:ss.sss±HH:mm`).
- `dd.time_frame_end`: Devuelve el final del marco de tiempo seleccionado en formato RFC 3339 (`YYYY-MM-DD HH:mm:ss.sss±HH:mm`).

{{< code-block lang="sql" >}}
-- Define the current analysis window
WITH bounds AS (
  SELECT CAST(CURRENT_SETTING('dd.time_frame_start') AS TIMESTAMP) AS time_frame_start,
         CAST(CURRENT_SETTING('dd.time_frame_end')   AS TIMESTAMP) AS time_frame_end
),
-- Define the immediately preceding window of equal length
     previous_bounds AS (
  SELECT time_frame_start - (time_frame_end - time_frame_start) AS prev_time_frame_start,
         time_frame_start                                       AS prev_time_frame_end
  FROM bounds
)
SELECT * FROM bounds, previous_bounds
{{< /code-block >}}

### `NOW` {#now}
{{< code-block lang="sql" >}}
SELECT
  *
FROM
  sales
WHERE
  purchase_date > NOW() - INTERVAL '1 hour'
{{< /code-block >}}

### `APPROX_PERCENTILE` {#approx-percentile}
{{< code-block lang="sql" >}}
-- Calculate the median (50th percentile) response time
SELECT
  APPROX_PERCENTILE(0.5) WITHIN GROUP (ORDER BY response_time) AS median_response_time
FROM
  logs

-- Calculate 95th and 99th response time percentiles by service
SELECT
  service_name,
  APPROX_PERCENTILE(0.95) WITHIN GROUP (ORDER BY response_time) AS p95_response_time,
  APPROX_PERCENTILE(0.99) WITHIN GROUP (ORDER BY response_time) AS p99_response_time
FROM
  logs
GROUP BY
  service_name
{{< /code-block >}}

{{% /collapse-content %}}

## Expresiones regulares {#regular-expressions}

### Sabor {#flavor}

Todas las funciones de expresiones regulares (regex) utilizan el sabor de Componentes Internacionales para Unicode (ICU):

- [Metacaracteres][5]
- [Operadores][6]
- [Expresiones de Conjunto (Clases de Caracteres)][7]
- [Opciones de Bandera para banderas en patrón][8]. Consulte la sección de [banderas a continuación](#function-level-flags) para banderas a nivel de función.
- [Buscar y Reemplazar (usando grupos de captura)][9]

### Funciones {#functions-1}

| Función                                                                                                         | Tipo de Retorno      | Descripción                                                                                                                                                                                                                                                                |
|------------------------------------------------------------------------------------------------------------------|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `REGEXP_LIKE(string input, string pattern)`                                                                      | Booleano          | Evalúa si una cadena coincide con un patrón de expresión regular.                                                                                                                                                                                                           |
| `REGEXP_MATCH(string input, string pattern [, string flags ])`                                                   | arreglo de cadenas | Devuelve las subcadenas de la primera coincidencia del patrón en la cadena. <br><br> Esta función busca en la cadena de entrada utilizando el patrón dado y devuelve las subcadenas capturadas (grupos de captura) de la primera coincidencia. Si no hay grupos de captura presentes, devuelve la coincidencia completa. |
| `REGEXP_REPLACE(string input, string pattern, string replacement [, string flags ])`                             | cadena           | Reemplaza la subcadena que es la primera coincidencia con el patrón, o todas las coincidencias si usas la [opcional `g` bandera](#function-level-flags).                                                                                                                              |
| `REGEXP_REPLACE (string input, string pattern, string replacement, integer start, integer N [, string flags ] )` | cadena           | Reemplaza la subcadena que es la N-ésima coincidencia con el patrón, o todas las coincidencias si `N` es cero, comenzando desde `start`.                                                                                                                                                    |

{{% collapse-content title="Ejemplos" level="h3" %}}

### `REGEXP_LIKE` {#regexp-like}
{{< code-block lang="sql" >}}
SELECT
  *
FROM
  emails
WHERE
  REGEXP_LIKE(email_address, '@example\.com$')
{{< /code-block >}}

### `REGEXP_MATCH` {#regexp-match}
{{< code-block lang="sql" >}}
SELECT regexp_match('foobarbequebaz', '(bar)(beque)');
-- {bar,beque}

SELECT regexp_match('foobarbequebaz', 'barbeque');
-- {barbeque}

SELECT regexp_match('abc123xyz', '([a-z]+)(\d+)(x(.)z)');
-- {abc,123,xyz,y}
{{< /code-block >}}

### `REGEXP_REPLACE` {#regexp-replace}
{{< code-block lang="sql" >}}
SELECT regexp_replace('Auth success token=abc123XYZ789', 'token=\w+', 'token=***');
-- Auth success token=***

SELECT regexp_replace('status=200 method=GET', 'status=(\d+) method=(\w+)', '$2: $1');
-- GET: 200

SELECT regexp_replace('INFO INFO INFO', 'INFO', 'DEBUG', 1, 2);
-- INFO DEBUG INFO
{{< /code-block >}}

{{% /collapse-content %}}

### Banderas a nivel de función {#function-level-flags}

Puedes usar las siguientes banderas con [funciones de expresiones regulares](#regular-expressions):

`i`
: Coincidencia sin distinción de mayúsculas y minúsculas

`n` o `m`
: Coincidencia sensible a saltos de línea

`g`
: Global; reemplaza _todas_ las subcadenas coincidentes en lugar de solo la primera

{{% collapse-content title="Ejemplos" level="h3" %}}

### `i` bandera {#i-flag}

{{< code-block lang="sql" >}}
SELECT regexp_match('INFO', 'info')
-- NULL

SELECT regexp_match('INFO', 'info', 'i')
-- ['INFO']
{{< /code-block >}}

### `n` bandera {#n-flag}

{{< code-block lang="sql" >}}
SELECT regexp_match('a
b', '^b');
-- NULL

SELECT regexp_match('a
b', '^b', 'n');
-- ['b']
{{< /code-block >}}

### `g` bandera {#g-flag}

{{< code-block lang="sql" >}}
SELECT icu_regexp_replace('Request id=12345 completed, id=67890 pending', 'id=\d+', 'id=XXX');
-- Request id=XXX completed, id=67890 pending

SELECT regexp_replace('Request id=12345 completed, id=67890 pending', 'id=\d+', 'id=XXX', 'g');
-- Request id=XXX completed, id=XXX pending
{{< /code-block >}}

{{% /collapse-content %}}

## Funciones de ventana {#window-functions}

Esta tabla proporciona una visión general de las funciones de ventana soportadas. Para detalles y ejemplos completos, consulta la [documentación de PostgreSQL][2].

| Función                | Tipo de retorno       | Descripción                                                            |
|-------------------------|-------------------|------------------------------------------------------------------------|
| `OVER`                  | N/A               | Define una ventana para un conjunto de filas sobre las que operar otras funciones de ventana. |
| `PARTITION BY`          | N/A               | Divide el conjunto de resultados en particiones, específicamente para aplicar funciones de ventana. |
| `RANK()`                | entero           | Asigna un rango a cada fila dentro de una partición, con huecos para empates.     |
| `ROW_NUMBER()`          | entero           | Asigna un número secuencial único a cada fila dentro de una partición.     |
| `LEAD(column n)`        | tipo de dato de la columna     | Devuelve el valor de la siguiente fila en la partición.                  |
| `LAG(column n)`         | tipo de dato de la columna     | Devuelve el valor de la fila anterior en la partición.              |
| `FIRST_VALUE(column n)` | tipo de dato de la columna     | Devuelve el primer valor en un conjunto ordenado de valores.                   |
| `LAST_VALUE(column n)`  | tipo de dato de la columna     | Devuelve el último valor en un conjunto ordenado de valores.                    |
| `NTH_VALUE(column n, offset)`| tipo de dato de la columna | Devuelve el valor en el desplazamiento especificado en un conjunto ordenado de valores. |


## Funciones y operadores JSON {#json-functions-and-operators}

| Nombre                                          | Tipo de retorno  | Descripción                                                                                                                                                                                                                                                                                                    |
|-----------------------------------------------|--------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| json_extract_path_text(text json, text path…) | text         | Extrae un subobjeto JSON como texto, definido por la ruta. Su comportamiento es equivalente a la [función de Postgres con el mismo nombre][3]. Por ejemplo, `json_extract_path_text(col, ‘forest')` devuelve el valor de la clave `forest` para cada objeto JSON en `col`. Vea el ejemplo a continuación para la sintaxis de un arreglo JSON. |
| json_extract_path(text json, text path…)      | JSON         | Misma funcionalidad que `json_extract_path_text`, pero devuelve una columna de tipo JSON en lugar de tipo texto.                                                                                                                                                                                                        |
| json_array_elements(text json)                | filas de JSON | Expande un arreglo JSON en un conjunto de filas. Esta forma solo se permite en una cláusula FROM.                                                                                                                                                                                                                           |
| json_array_elements_text(text json)           | filas de texto | Expande un arreglo JSON en un conjunto de filas. Esta forma solo se permite en una cláusula FROM.                                                                                                                                                                                                                           |

## Funciones y operadores de dirección de red {#network-address-functions-and-operators}

El tipo `inet` representa direcciones de red IPv4 e IPv6 con una longitud de prefijo CIDR opcional (por ejemplo, `192.168.1.5/24` o `::1`). Crea valores `inet` con la sintaxis literal de tipo `INET 'value'` o convirtiendo una cadena con `CAST(column AS inet)`.

### Funciones {#functions-2}

| Función | Tipo de retorno | Descripción |
|----------|-------------|-------------|
| `host(inet addr)` | `VARCHAR` | Devuelve la dirección IP como texto, sin la longitud del prefijo. |
| `network(inet addr)` | `INET` | Devuelve la parte de red de la dirección, con los bits de host en cero. |
| `netmask(inet addr)` | `INET` | Devuelve la máscara de red para la dirección. |
| `masklen(inet addr)` | `BIGINT` | Devuelve la longitud del prefijo de la máscara de red. |
| `broadcast(inet addr)` | `INET` | Devuelve la dirección de difusión de la red. |
| `family(inet addr)` | `BIGINT` | Devuelve la familia de direcciones: `4` para IPv4, `6` para IPv6. |

### Operadores {#operators}

| Operador | Tipo de retorno | Descripción |
|----------|-------------|-------------|
| `inet a << inet b` | `BOOLEAN` | Devuelve `true` si `a` está estrictamente contenido dentro de `b`. |
| `inet a <<= inet b` | `BOOLEAN` | Devuelve `true` si `a` está contenido dentro de o es igual a `b`. |
| `inet a >> inet b` | `BOOLEAN` | Devuelve `true` si `a` contiene estrictamente `b`. |
| `inet a >>= inet b` | `BOOLEAN` | Devuelve `true` si `a` contiene o es igual a `b`. |
| `inet a && inet b` | `BOOLEAN` | Devuelve `true` si las subredes de `a` y `b` se superponen. |

{{% collapse-content title="Ejemplos" level="h3" %}}

### `host` {#host}
{{< code-block lang="sql" >}}
SELECT host(INET '192.168.1.5/24')
-- Returns: 192.168.1.5
{{< /code-block >}}

### `network` {#network}
{{< code-block lang="sql" >}}
SELECT network(INET '192.168.1.5/24')
-- Returns: 192.168.1.0/24
{{< /code-block >}}

### `netmask` {#netmask}
{{< code-block lang="sql" >}}
SELECT netmask(INET '192.168.1.5/24')
-- Returns: 255.255.255.0
{{< /code-block >}}

### `masklen` {#masklen}
{{< code-block lang="sql" >}}
SELECT masklen(INET '192.168.1.5/24')
-- Returns: 24
{{< /code-block >}}

### `broadcast` {#broadcast}
{{< code-block lang="sql" >}}
SELECT broadcast(INET '192.168.1.5/24')
-- Returns: 192.168.1.255/24
{{< /code-block >}}

### `family` {#family}
{{< code-block lang="sql" >}}
SELECT family(INET '::1')
-- Returns: 6

SELECT family(INET '192.168.1.5')
-- Returns: 4
{{< /code-block >}}

### Operadores de contención {#containment-operators}
{{< code-block lang="sql" >}}
-- Check if an IP is within a subnet
SELECT INET '192.168.1.5' << INET '192.168.1.0/24'
-- Returns: true

-- Check containment or equality
SELECT INET '192.168.1.0/24' <<= INET '192.168.1.0/24'
-- Returns: true

-- Check if a subnet contains an IP
SELECT INET '10.0.0.0/8' >> INET '10.1.2.3'
-- Returns: true

-- Check if two subnets overlap
SELECT INET '192.168.1.0/24' && INET '192.168.1.128/25'
-- Returns: true
{{< /code-block >}}

### Uso combinado {#combined-usage}
{{< code-block lang="sql" >}}
-- Find all IPs in a private subnet and extract network info
SELECT
  host(CAST(src_ip AS inet)) AS ip,
  masklen(CAST(src_ip AS inet)) AS prefix_len,
  network(CAST(src_ip AS inet)) AS network
FROM connections
WHERE CAST(src_ip AS inet) << INET '10.0.0.0/8'
  AND family(CAST(src_ip AS inet)) = 4
{{< /code-block >}}

{{% /collapse-content %}}

## Funciones de tabla {#table-functions}
Las funciones de tabla se utilizan para consultar registros, métricas, costos en la nube y otras fuentes de datos.

<table style="width: 100%; table-layout: fixed;">
  <thead>
    <tr>
      <th style="width: 33%;">Función</th>
      <th style="width: 33%;">Descripción</th>
      <th style="width: 33%;">Ejemplo</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <pre>
dd.logs(
    columnas => array < varchar >,
    filtro ? => varchar,
    índices ? => array < varchar >,
    storage ? => varchar,
    from_timestamp ? => timestamp,
    to_timestamp ? => timestamp
) AS (column_name type [, ...])</pre>
      </td>
      <td>Devuelve datos de registro como una tabla. El parámetro de columnas especifica qué campos de registro extraer. Los campos anidados se acceden utilizando notación de punto, y los campos no centrales deben ser precedidos por <code>@</code>. La cláusula AS define el esquema de la tabla devuelta. Opcional: filtrado por índice o rango de tiempo. Cuando no se especifica el tiempo, DDSQL utiliza la configuración de tiempo global, que en DDSQL Editor está configurada para la última hora. Opcional: especificar el almacenamiento a utilizar (por ejemplo, <code>hot</code>, <code>flex_tier</code>). Cuando no se especifica, el valor predeterminado es almacenamiento caliente.</td>
      <td>
        {{< code-block lang="sql" >}}
SELECT timestamp, host, service, message, asset_id
FROM dd.logs(
    filter  => 'source:java',
    columns => ARRAY['timestamp','host','service','message','@asset.id']
) AS (
    timestamp TIMESTAMP,
    host      VARCHAR,
    service   VARCHAR,
    message   VARCHAR,
    asset_id  VARCHAR
){{< /code-block >}}
      </td>
    </tr>
    <tr>
      <td>
        <pre>
dd.metrics_scalar(
    consulta varchar,
    reducer varchar [, from_timestamp timestamp, to_timestamp timestamp]
)</pre>
      </td>
      <td>Devuelve datos métricos como un valor escalar. La función acepta una consulta de métricas (con agrupamiento opcional), un reducer para determinar cómo se agregan los valores (avg, max, etc.), y parámetros de marca de tiempo opcionales (por defecto 1 hora) para definir el rango de tiempo.</td>
      <td>
        {{< code-block lang="sql" >}}
SELECT *
FROM dd.metrics_scalar(
    'avg:system.cpu.user{*} by {service}',
    'avg',
    TIMESTAMP '2025-07-10 00:00:00.000-04:00',
    TIMESTAMP '2025-07-17 00:00:00.000-04:00'
)
ORDER BY value DESC;{{< /code-block >}}
      </td>
    </tr>
    <tr>
      <td>
        <pre>
dd.metrics_timeseries(
    query varchar [, from_timestamp timestamp, to_timestamp timestamp]
)</pre>
      </td>
      <td>Devuelve los datos de métricas como series temporales. La función acepta una consulta de métricas (con agrupamiento opcional) y parámetros de marca de tiempo opcionales (por defecto 1 hora) para definir el rango de tiempo. Devuelve puntos de datos a lo largo del tiempo en lugar de un solo valor agregado.</td>
      <td>
        {{< code-block lang="sql" >}}
SELECT *
FROM dd.metrics_timeseries(
    'avg:system.cpu.user{*} by {service}',
    TIMESTAMP '2025-07-10 00:00:00.000-04:00',
    TIMESTAMP '2025-07-17 00:00:00.000-04:00'
)
ORDER BY timestamp, service;{{< /code-block >}}
      </td>
    </tr>
    <tr>
      <td>
        <pre>
dd.cloud_cost_scalar(
    query varchar,
    reducer varchar
    [, from_timestamp timestamp,
    to_timestamp timestamp]
)</pre>
      </td>
      <td>Devuelve <a href="/cloud_cost_management/">datos de Cloud Cost Management</a> como un valor escalar. La función acepta una consulta de Cloud Cost (con agrupamiento opcional), un reductor de agregación (usa <code>sum</code> para datos de costos; otros reductores como <code>avg</code>, <code>min</code>, y <code>max</code> son aceptados pero rara vez aplicables a consultas de costos), y parámetros de marca de tiempo opcionales (por defecto 1 hora) para definir el rango de tiempo. <strong>Nota</strong>: Los datos de Cloud Cost suelen tener un retraso de 24 a 48 horas, por lo que las marcas de tiempo recientes pueden no devolver resultados.</td>
      <td>
        {{< code-block lang="sql" >}}
SELECT *
FROM dd.cloud_cost_scalar(
    'sum:all.cost{*} by {service}',
    'sum',
    TIMESTAMP '2025-07-10 00:00:00.000-04:00',
    TIMESTAMP '2025-07-17 00:00:00.000-04:00'
)
ORDER BY value DESC;{{< /code-block >}}
      </td>
    </tr>
    <tr>
      <td>
        <pre>
dd.cloud_cost_timeseries(
    query varchar
    [, from_timestamp timestamp,
    to_timestamp timestamp]
)</pre>
      </td>
      <td>Devuelve <a href="/cloud_cost_management/">datos de Cloud Cost Management</a> como series temporales. La función acepta una consulta de Cloud Cost (con agrupamiento opcional) y parámetros de marca de tiempo opcionales (por defecto 1 hora) para definir el rango de tiempo. Devuelve puntos de datos de costos a lo largo del tiempo en lugar de un solo valor agregado. <strong>Nota</strong>: Los datos de costos en la nube suelen tener un retraso de 24 a 48 horas, por lo que las marcas de tiempo recientes pueden no devolver resultados.</td>
      <td>
        {{< code-block lang="sql" >}}
SELECT *
FROM dd.cloud_cost_timeseries(
    'sum:all.cost{*} by {service}',
    TIMESTAMP '2025-07-10 00:00:00.000-04:00',
    TIMESTAMP '2025-07-17 00:00:00.000-04:00'
)
ORDER BY timestamp, service;{{< /code-block >}}
      </td>
    </tr>
  </tbody>
</table>

{{% collapse-content title="Ejemplos" level="h3" %}}

### Marcas de tiempo absolutas {#absolute-timestamps}

{{< code-block lang="sql" >}}
SELECT *
FROM dd.logs(
    columns => ARRAY['timestamp','host','service','message'],
    from_timestamp => TIMESTAMP '2025-07-10 00:00:00.000-04:00',
    to_timestamp => TIMESTAMP '2025-07-17 00:00:00.000-04:00'
) AS (
    timestamp TIMESTAMP,
    host      VARCHAR,
    service   VARCHAR,
    message   VARCHAR
)
{{< /code-block >}}

### Marcas de tiempo relativas {#relative-timestamps}

{{< code-block lang="sql" >}}
SELECT *
FROM dd.logs(
    columns => ARRAY['timestamp','host','service','message'],
    from_timestamp => now() - INTERVAL '7 days',
    to_timestamp => now()
) AS (
    timestamp TIMESTAMP,
    host      VARCHAR,
    service   VARCHAR,
    message   VARCHAR
)
{{< /code-block >}}

### Parámetros opcionales {#optional-parameters}

{{< code-block lang="sql" >}}
SELECT *
FROM dd.logs(
    columns => ARRAY['timestamp','host','service','message'],
    filter  => 'source:java',
    indexes => ARRAY['trino'],
    storage => 'hot'
) AS (
    timestamp TIMESTAMP,
    host      VARCHAR,
    service   VARCHAR,
    message   VARCHAR
)
{{< /code-block >}}

### Acceso a campos anidados {#nested-field-access}

Los alias de columna no pueden contener puntos; reemplázalos con guiones bajos o cualquier otro carácter válido al definir el alias.

{{< code-block lang="sql" >}}
SELECT timestamp, host, asset_id, view_url, data_resource_type
FROM dd.logs(
    filter  => 'service:mcp',
    columns => ARRAY['timestamp','host','@asset.id','@view.url','@data.resource.type']
) AS (
    timestamp TIMESTAMP,
    host      VARCHAR,
    asset_id  VARCHAR,
    view_url  VARCHAR,
    data_resource_type VARCHAR
)
{{< /code-block >}}

{{% /collapse-content %}}

## Etiquetas {#tags}

DDSQL expone etiquetas como un `hstore` tipo, que está inspirado en PostgreSQL. Puede acceder a los valores de claves de etiquetas específicas utilizando el operador de flecha de PostgreSQL. Por ejemplo:

```sql
SELECT instance_type, count(instance_type)
FROM aws.ec2_instance
WHERE tags->'region' = 'us-east-1' -- region is a tag, not a column
GROUP BY instance_type
```

Las etiquetas son pares clave-valor donde cada clave puede tener cero, uno o múltiples valores de etiqueta correspondientes a ella. Cuando se accede, el valor de la etiqueta devuelve una única cadena, que contiene _todos_ los valores correspondientes. Cuando los datos tienen múltiples valores de etiqueta para la misma clave de etiqueta, se representan como una cadena ordenada y separada por comas. Por ejemplo:

```sql
SELECT tags->'team', instance_type, architecture, COUNT(*) as instance_count
FROM aws.ec2_instance
WHERE tags->'team' = 'compute_provisioning,database_ops'
GROUP BY tags->'team', instance_type, architecture
ORDER BY instance_count DESC
```

También puede comparar los valores de las etiquetas como cadenas o conjuntos de etiquetas completos:

```sql
SELECT *
FROM k8s.daemonsets da INNER JOIN k8s.deployments de
ON da.tags = de.tags -- for a specific tag: da.tags->'app' = de.tags->'app'
```

Además, puede extraer las claves y valores de las etiquetas en arreglos individuales de texto:

```sql
SELECT akeys(tags), avals(tags)
FROM aws.ec2_instance
```

### Funciones y operadores de HSTORE {#hstore-functions-and-operators}

| Nombre                                          | Tipo de retorno   | Descripción                                                                                      |
|-----------------------------------------------|---------------|---------------------------------------------------------------------------------------------------
| tags -> 'text'                                  | Texto          | Obtiene el valor para una clave dada. Devuelve `null` si la clave de etiqueta no está presente.                             |
| akeys(hstore tags)                            | Arreglo de texto | Obtiene las claves de un HSTORE como un arreglo                                                            |
| avals(hstore tags)                            | Arreglo de texto | Obtiene los valores de un HSTORE como un arreglo                                                          |

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/notebooks/advanced_analysis
[2]: https://www.postgresql.org/docs/current/functions-window.html
[3]: https://www.postgresql.org/docs/current/functions-json.html
[4]: /es/ddsql_editor/
[5]: https://unicode-org.github.io/icu/userguide/strings/regexp.html#regular-expression-metacharacters
[6]: https://unicode-org.github.io/icu/userguide/strings/regexp.html#regular-expression-operators
[7]: https://unicode-org.github.io/icu/userguide/strings/regexp.html#set-expressions-character-classes
[8]: https://unicode-org.github.io/icu/userguide/strings/regexp.html#flag-options
[9]: https://unicode-org.github.io/icu/userguide/strings/regexp.html#find-and-replace
[10]: /es/bits_ai/mcp_server/