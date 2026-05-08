---
aliases:
- /es/logs/workspaces/sql_reference
- /es/ddsql_reference/ddsql_default
description: Referencia completa de sintaxis, tipos de datos, funciones, operadores
  y sentencias DDSQL para consultar datos de Datadog con SQL.
further_reading:
- link: /ddsql_editor/
  tag: Documentación
  text: Más información sobre DDSQL Editor
products:
- icon: ddsql
  name: Editor DDSQL
  url: /ddsql_editor/
- icon: notebook
  name: Notebooks
  url: /notebooks/
title: Referencia DDSQL
---

{{< product-availability >}}

## Información general

DDSQL es SQL para datos de Datadog. Implementa varias operaciones SQL estándar, como `SELECT`, y permite realizar consultas de datos no estructurados. Puedes realizar acciones, como obtener exactamente los datos que buscas, escribiendo tu propia sentencia `SELECT`, o consultar etiquetas (tags) como si fueran columnas de tablas estándar.

Esta documentación cubre el soporte SQL disponible e incluye:
- [Sintaxis compatible con PostgreSQL](#syntax)
- [Tipos de datos](#data-types)
- [Tipos literales](#type-literals)
- [Funciones de SQL](#functions)
- [Expresiones regulares](#regular-expressions)
- [Funciones de ventana](#window-functions)
- [Funciones JSON](#json-functions-and-operators)
- [Funciones de tabla](#table-functions)
- [Etiquetas](#tags)


{{< img src="/logs/workspace/sql_reference/sql_syntax_analysis_cell.png" alt="Celda de Workspace de ejemplo con sintaxis de SQL" style="width:100%;" >}}

## Sintaxis

Se admite la siguiente sintaxis de SQL:

`SELECT (DISTINCT)` (DISTINCT: Opcional)
: Recupera filas de una base de datos, con `DISTINCT` filtrando los registros duplicados.

    {{< code-block lang="sql" >}}SELECT DISTINCT customer_id
FROM orders {{< /code-block >}}

`JOIN`
: Combina filas de dos o más tablas basándose en una columna relacionada entre ellas. Admite FULL JOIN, INNER JOIN, LEFT JOIN, RIGHT JOIN.

    {{< code-block lang="sql" >}}SELECT orders.order_id, customers.customer_name
FROM orders
JOIN customers
ON orders.customer_id = customers.customer_id {{< /code-block >}}

`GROUP BY`
: Agrupa las filas que tienen los mismos valores en las columnas especificadas en filas de resumen.

    {{< code-block lang="sql" >}}SELECT product_id, SUM(quantity)
FROM sales
GROUP BY product_id {{< /code-block >}}

`||` (concat)
: Concatena dos o más cadenas.

    {{< code-block lang="sql" >}}SELECT first_name || ' ' || last_name AS full_name
FROM employees {{< /code-block >}}

`WHERE` (Incluye compatibilidad con los filtros `LIKE`, `IN`, `ON`, `OR`)
: Filtra los registros que cumplen una condición especificada.

    {{< code-block lang="sql" >}}SELECT *
FROM employees
WHERE department = 'Sales' AND name LIKE 'J%' {{< /code-block >}}

`CASE`
: Proporciona una lógica condicional para devolver diferentes valores basados en condiciones especificadas.

    {{< code-block lang="sql" >}}SELECT order_id,
  CASE
    WHEN quantity > 10 THEN 'Bulk Order'
    ELSE 'Standard Order'
  END AS order_type
FROM orders {{< /code-block >}}

`WINDOW`
: Realiza un cálculo a través de un conjunto de filas de tabla relacionadas con la fila actual.

    {{< code-block lang="sql" >}}SELECT
  timestamp,
  service_name,
  cpu_usage_percent,
  AVG(cpu_usage_percent) OVER (PARTITION BY service_name ORDER BY timestamp ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS moving_avg_cpu
FROM
  cpu_usage_data {{< /code-block >}}

`IS NULL`/`IS NOT NULL`
: Comprueba si un valor es nulo o no.

    {{< code-block lang="sql" >}}SELECT *
FROM orders
WHERE delivery_date IS NULL {{< /code-block >}}

`LIMIT`
: Especifica el número máximo de registros a devolver.

    {{< code-block lang="sql" >}}SELECT *
FROM customers
LIMIT 10 {{< /code-block >}}

`OFFSET`
: Omite un número especificado de registros antes de empezar a devolver registros de la consulta.

    {{< code-block lang="sql" >}}SELECT *
FROM employees
OFFSET 20 {{< /code-block >}}

`ORDER BY`
: Ordena el conjunto de resultados de una consulta por una o varias columnas. Incluye ASC, DESC para el orden de clasificación.

    {{< code-block lang="sql" >}}SELECT *
FROM sales
ORDER BY sale_date DESC {{< /code-block >}}

`HAVING`
: Filtra los registros que cumplen una condición especificada después de la agrupación.

    {{< code-block lang="sql" >}}SELECT product_id, SUM(quantity)
FROM sales
GROUP BY product_id
HAVING SUM(quantity) > 10 {{< /code-block >}}

`IN`, `ON`, `OR`
: Se utilizan para especificar condiciones en las consultas. Disponible en las cláusulas `WHERE`, `JOIN`.

    {{< code-block lang="sql" >}}SELECT *
FROM orders
WHERE order_status IN ('Shipped', 'Pending') {{< /code-block >}}

`USING`
: Esta cláusula es una abreviatura para uniones en las que las columnas unidas tienen el mismo nombre en ambas tablas. Toma una lista separada por comas de esas columnas y crea una condición de igualdad independiente para cada par coincidente. Por ejemplo, unir `T1` y `T2` con `USING (a, b)` equivale a `ON T1.a = T2.a AND T1.b = T2.b`.

    {{< code-block lang="sql" >}}SELECT orders.order_id, customers.customer_name
FROM orders
JOIN customers
USING (customer_id) {{< /code-block >}}

`AS`
: Renombra una columna o tabla con un alias.

    {{< code-block lang="sql" >}}SELECT first_name AS name
FROM employees {{< /code-block >}}

Operaciones aritméticas
: Realiza cálculos básicos utilizando operadores como `+`, `-`, `*`, `/`.

    {{< code-block lang="sql" >}}SELECT price, tax, (price * tax) AS total_cost
FROM products {{< /code-block >}}

`INTERVAL value unit`
: Intervalo que representa una duración de tiempo especificada en una unidad determinada.
Unidades admitidas:<br>- `milliseconds`/`millisecond`<br> - `seconds`/`second`<br> - `minutes`/`minute`<br> - `hours`/`hour`<br> - `days`/`day`

## Tipos de datos

DDSQL admite los siguientes tipos de datos:

| Tipo de datos | Descripción |
|-----------|-------------|
| `BIGINT` | Enteros con signo de 64 bits. |
| `BOOLEAN` | Valores `true` o `false`. |
| `DOUBLE` | Números de coma flotante de doble precisión. |
| `INTERVAL` | Valores de duración. |
| `JSON` | Datos JSON. |
| `TIMESTAMP` | Valores de fecha y hora. |
| `VARCHAR` | Cadenas de caracteres de longitud variable. |

### Tipos de matrices

Todos los tipos de datos admiten tipos de matrices. Las matrices pueden contener varios valores del mismo tipo de datos.

## Tipos literales

DDSQL admite tipos literales explícitos utilizando la sintaxis `[TYPE] [value]`.

| Tipo | Sintaxis | Ejemplo |
|------|--------|---------|
| `BIGINT` | `BIGINT value` | `BIGINT 1234567` |
| `BOOLEAN` | `BOOLEAN value` | `BOOLEAN true` |
| `DOUBLE` | `DOUBLE value` | `DOUBLE 3.14159` |
| `INTERVAL` | `INTERVAL 'value unit'` | `INTERVAL '30 minutes'` |
| `JSON` | `JSON 'value'` | `JSON '{"key": "value", "count": 42}'` |
| `TIMESTAMP` | `TIMESTAMP 'value'` | `TIMESTAMP '2023-12-25 10:30:00'` |
| `VARCHAR` | `VARCHAR 'value'` | `VARCHAR 'hello world'` |

El prefijo del tipo puede omitirse y el tipo se deduce automáticamente del valor. Por ejemplo, `'hello world'` se deduce como `VARCHAR`, `123` como `BIGINT` y `true` como `BOOLEAN`. Utiliza prefijos de tipo explícitos cuando los valores puedan ser ambiguos. Por ejemplo,`TIMESTAMP '2025-01-01'` se deduciría como `VARCHAR` sin el prefijo.

### Matrices literales

Las matrices literales utilizan la sintaxis `ARRAY[value1, value2, ...]`. El tipo de matriz se deduce automáticamente de los valores.

{{< code-block lang="sql" >}}
SELECT ARRAY['apple', 'banana', 'cherry'] AS fruits; -- Inferred as VARCHAR array
SELECT ARRAY[1, 2, 3] AS numbers;                    -- Inferred as BIGINT array
SELECT ARRAY[true, false, true] AS flags;            -- Inferred as BOOLEAN array
SELECT ARRAY[1.1, 2.2, 3.3] AS decimals;             -- Inferred as DOUBLE array
{{< /code-block >}}

### Ejemplo

{{< code-block lang="sql" >}}
-- Using type literals in queries
SELECT
    VARCHAR 'Product Name: ' || name AS labeled_name,
    price * DOUBLE 1.08 AS price_with_tax,
    created_at + INTERVAL '7 days' AS expiry_date
FROM products
WHERE created_at > TIMESTAMP '2025-01-01';
{{< /code-block >}}

## Funciones

Se admiten las siguientes funciones de SQL. Para la función de ventana, consulta la sección [función de ventana](#window-functions) de esta documentación.

| Función                                         | Tipo de retorno                           | Descripción                                                                                                                                                                                       |
|--------------------------------------------------|---------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `MIN(variable v)`                                | Variable typeof                              | Devuelve el valor más pequeño de un conjunto de datos.                                                                                                                                                      |
| `MAX(variable v)`                                | Variable typeof                              | Devuelve el valor máximo de todos los valores de entrada.                                                                                                                                                |
| `COUNT(any a)`                                   | numérico                               | Devuelve el número de valores de entrada que no son nulos.                                                                                                                                             |
| `SUM(numeric n)`                                 | numérico                               | Devuelve la suma de todos los valores de entrada.                                                                                                                                                    |
| `AVG(numeric n)`                                 | numérico                               | Devuelve el valor medio (media aritmética) de todos los valores de entrada.                                                                                                                              |
| `BOOL_AND(boolean b)`                            | booleano                               | Devuelve si todos los valores de entrada no nulos son verdaderos.                                                                                                                                               |
| `BOOL_OR(boolean b)`                             | booleano                               | Devuelve si cualquier valor de entrada no nulo es verdadero.                                                                                                                                                 |
| `CEIL(numeric n)`                                | numérico                               | Devuelve el valor redondeado al entero más próximo.                                                                                                                                              |
| `FLOOR(numeric n)`                               | numérico                               | Devuelve el valor redondeado al entero más próximo.                                                                                                                                            |
| `ROUND(numeric n)`                               | numérico                               | Devuelve el valor redondeado al entero más próximo.                                                                                                                                                 |
| `POWER(numeric base, numeric exponent)`          | numérico                               | Devuelve el valor de la base elevado a la potencia del exponente.                                                                                                                                        |
| `LOWER(string s)`                                | cadena                                | Devuelve la cadena en minúsculas.                                                                                                                                                                  |
| `UPPER(string s)`                                | cadena                                | Devuelve la cadena en mayúsculas.                                                                                                                                                                  |
| `ABS(numeric n)`                                 | numérico                               | Devuelve el valor absoluto.                                                                                                                                                                       |
| `COALESCE(args a)`                               | typeof first non-null a OR null       | Devuelve el primer valor no nulo o nulo si todos son nulos.                                                                                                                                         |
| `CAST(value AS type)`                            | tipo                                  | Convierte el valor dado al tipo de datos especificado.                                                                                                                                              |
| `LENGTH(string s)`                               | entero                               | Devuelve el número de caracteres de la cadena.                                                                                                                                                   |
| `TRIM(string s)`                                 | cadena                                | Elimina los espacios en blanco iniciales y finales de la cadena.                                                                                                                                          |
| `REPLACE(string s, string from, string to)`      | cadena                                | Sustituye las apariciones de una subcadena dentro de una cadena por otra subcadena.                                                                                                                       |
| `SUBSTRING(string s, int start, int length)`     | cadena                                | Extrae una subcadena de una cadena, comenzando en una posición dada y para una longitud especificada.                                                                                                      |
| `STRPOS(string s, string substring)`             | entero                               | Devuelve la primera posición del índice de la subcadena en una cadena dada, o 0 si no hay coincidencia.                                                                                                   |
| `SPLIT_PART(string s, string delimiter, integer index)` | cadena                         | Divide la cadena en el delimitador dado y devuelve la cadena en la posición dada contando desde uno.                                                                                          |
| `EXTRACT(unit from timestamp/interval)`          | numérico                               | Extrae una parte de un campo de fecha u hora (como el año o el mes) de una marca temporal o intervalo.                                                                                                     |
| `TO_TIMESTAMP(string timestamp, string format)`  | marca de tiempo                             | Convierte una cadena en una marca de tiempo según el formato dado.                                                                                                                                   |
| `TO_CHAR(timestamp t, string format)`            | cadena                                | Convierte una marca de tiempo en una cadena según el formato dado.                                                                                                                                   |
| `DATE_BIN(interval stride, timestamp source, timestamp origin)` | marca de tiempo                             | Alinea una marca de tiempo (fuente) en buckets de longitud par (stride). Devuelve el inicio del bucket que contiene la fuente, calculado como la mayor marca de tiempo que es menor o igual que la fuente y es un múltiplo de longitudes de stride desde el origen. |
| `DATE_TRUNC(string unit, timestamp t)`           | marca de tiempo                             | Trunca una marca de tiempo a una precisión especificada basada en la unidad proporcionada.                                                                                                                        |
| `CURRENT_SETTING(string setting_name)`           | cadena                                | Devuelve el valor actual del parámetro especificado. Admite los parámetros `dd.time_frame_start` y `dd.time_frame_end`, que devuelven el inicio y el final del marco temporal global, respectivamente. |
| `NOW()`                                          | marca de tiempo                             | Devuelve la marca de tiempo actual al inicio de la consulta actual.                                                                                                                                  |
| `CARDINALITY(array a)`                           | entero                               | Devuelve el número de elementos de la matriz.                                                                                                                                                      |
| `ARRAY_POSITION(array a, typeof_array value)`    | entero                               | Devuelve el índice de la primera aparición del valor encontrado en la matriz, o null (nulo) si no se encuentra el valor.                                                                                         |
| `STRING_TO_ARRAY(string s, string delimiter)`    | matriz de cadenas                      | Divide la cadena dada en una matriz de cadenas utilizando el delimitador dado.                                                                                                                       |
| `ARRAY_AGG(expression e)`                        | matriz de tipo de entrada                   | Crea una matriz al recopilar todos los valores de entrada.                                                                                                                                              |
| `UNNEST(array a [, array b...])`                 | filas de a [, b...]                    | Expande matrices en un conjunto de filas. Esta forma sólo se permite en una cláusula FROM.                                                                                                                    |

{{% collapse-content title="Ejemplos" level="h3" %}}

### `MIN`
{{< code-block lang="sql" >}}
SELECT MIN(response_time) AS min_response_time
FROM logs
WHERE status_code = 200
{{< /code-block >}}

### `MAX`
{{< code-block lang="sql" >}}
SELECT MAX(response_time) AS max_response_time
FROM logs
WHERE status_code = 200
{{< /code-block >}}

### `COUNT`
{{< code-block lang="sql" >}}SELECT COUNT(request_id) AS total_requests
FROM logs
WHERE status_code = 200 {{< /code-block >}}

### `SUM`
{{< code-block lang="sql" >}}SELECT SUM(bytes_transferred) AS total_bytes
FROM logs
GROUP BY service_name
{{< /code-block >}}

### `AVG`
{{< code-block lang="sql" >}}SELECT AVG(response_time)
AS avg_response_time
FROM logs
WHERE status_code = 200
GROUP BY service_name
{{< /code-block >}}

### `BOOL_AND`
{{< code-block lang="sql" >}}SELECT BOOL_AND(status_code = 200) AS all_success
FROM logs
{{< /code-block >}}

### `BOOL_OR`
{{< code-block lang="sql" >}}SELECT BOOL_OR(status_code = 200) AS some_success
FROM logs
{{< /code-block >}}

### `CEIL`
{{< code-block lang="sql" >}}
SELECT CEIL(price) AS rounded_price
FROM products
{{< /code-block >}}

### `FLOOR`
{{< code-block lang="sql" >}}
SELECT FLOOR(price) AS floored_price
FROM products
{{< /code-block >}}

### `ROUND`
{{< code-block lang="sql" >}}
SELECT ROUND(price) AS rounded_price
FROM products
{{< /code-block >}}

### `POWER`
{{< code-block lang="sql" >}}
SELECT POWER(response_time, 2) AS squared_response_time
FROM logs
{{< /code-block >}}

### `LOWER`
{{< code-block lang="sql" >}}
SELECT LOWER(customer_name) AS lowercase_name
FROM customers
{{< /code-block >}}

### `UPPER`
{{< code-block lang="sql" >}}
SELECT UPPER(customer_name) AS uppercase_name
FROM customers
{{< /code-block >}}

### `ABS`
{{< code-block lang="sql" >}}
SELECT ABS(balance) AS absolute_balance
FROM accounts
{{< /code-block >}}

### `COALESCE`
{{< code-block lang="sql" >}}
SELECT COALESCE(phone_number, email) AS contact_info
FROM users
{{< /code-block >}}

### `CAST`

Tipos de objetivos de cast admitidos:
- `BIGINT`
- `DECIMAL`
- `TIMESTAMP`
- `VARCHAR`

{{< code-block lang="sql" >}}
SELECT
  CAST(order_id AS VARCHAR) AS order_id_string,
  'Order-' || CAST(order_id AS VARCHAR) AS order_label
FROM
  orders
{{< /code-block >}}

### `LENGTH`
{{< code-block lang="sql" >}}
SELECT
  customer_name,
  LENGTH(customer_name) AS name_length
FROM
  customers
{{< /code-block >}}

### `INTERVAL`
{{< code-block lang="sql" >}}
SELECT
  TIMESTAMP '2023-10-01 10:00:00' + INTERVAL '30 days' AS future_date,
  INTERVAL '1 MILLISECOND 2 SECONDS 3 MINUTES 4 HOURS 5 DAYS'
{{< /code-block >}}

### `TRIM`
{{< code-block lang="sql" >}}
SELECT
  TRIM(name) AS trimmed_name
FROM
  users
{{< /code-block >}}

###  `REPLACE`
{{< code-block lang="sql" >}}
SELECT
  REPLACE(description, 'old', 'new') AS updated_description
FROM
  products
{{< /code-block >}}

### `SUBSTRING`
{{< code-block lang="sql" >}}
SELECT
  SUBSTRING(title, 1, 10) AS short_title
FROM
  books
{{< /code-block >}}

### `STRPOS`
{{< code-block lang="sql" >}}
SELECT
  STRPOS('foobar', 'bar')
{{< /code-block >}}

### `SPLIT_PART`
{{< code-block lang="sql" >}}
SELECT
  SPLIT_PART('aaa-bbb-ccc', '-', 2)
{{< /code-block >}}

### `EXTRACT`

Unidades de extracción compatibles:
| Literal           | Tipo de entrada               | Descripción                                  |
| ------------------| ------------------------ | -------------------------------------------- |
| `day`             | `timestamp` / `interval` | día del mes                             |
| `dow`             | `timestamp`              | día de la semana `1` (lunes) a `7` (domingo) |
| `doy`             | `timestamp`              | día del año (`1` - `366`)                |
| `hour`            | `timestamp` / `interval` | hora del día (`0` - `23`)                 |
| `minute`          | `timestamp` / `interval` | minuto de la hora (`0` - `59`)              |
| `second`          | `timestamp` / `interval` | segundo del minuto (`0` - `59`)            |
| `week`            | `timestamp`              | semana del año (`1` - `53`)                |
| `month`           | `timestamp`              | mes del año (`1` - `12`)               |
| `quarter`         | `timestamp`              | trimestre del año (`1` - `4`)              |
| `year`            | `timestamp`              | año                                         |
| `timezone_hour`   | `timestamp`              | hora del inicio del huso horario                 |
| `timezone_minute` | `timestamp`              | minuto del inicio del huso horario               |

{{< code-block lang="sql" >}}
SELECT
  EXTRACT(year FROM purchase_date) AS purchase_year
FROM
  sales
{{< /code-block >}}

### `TO_TIMESTAMP`

Patrones compatibles para el formato fecha/hora:
| Patrón     | Descripción                          |
| ----------- | ------------------------------------ |
| `YYYY`      | año (4 dígitos)                      |
| `YY`        | año (2 dígitos)                      |
| `MM`        | número de mes (01 - 12)               |
| `DD`        | día del mes (01 - 31)               |
| `HH24`      | hora del día (00 - 23)                |
| `HH12`      | hora del día (01 - 12)                |
| `HH`        | hora del día (01 - 12)                |
| `MI`        | minuto (00 - 59)                     |
| `SS`        | segundo (00 - 59)                     |
| `MS`        | milisegundo (000 - 999)              |
| `TZ`        | abreviatura del huso horario               |
| `OF`        | inicio del huso horario desde UTC            |
| `AM` / `am` | indicador del meridiano (sin puntos) |
| `PM` / `pm` | indicador del meridiano (sin puntos) |

{{< code-block lang="sql" >}}
SELECT
  TO_TIMESTAMP('25/12/2025 04:23 pm', 'DD/MM/YYYY HH:MI am') AS ts
{{< /code-block >}}

### `TO_CHAR`

Patrones compatibles para el formato fecha/hora:
| Patrón     | Descripción                          |
| ----------- | ------------------------------------ |
| `YYYY`      | año (4 dígitos)                      |
| `YY`        | año (2 dígitos)                      |
| `MM`        | número de mes (01 - 12)               |
| `DD`        | día del mes (01 - 31)               |
| `HH24`      | hora del día (00 - 23)                |
| `HH12`      | hora del día (01 - 12)                |
| `HH`        | hora del día (01 - 12)                |
| `MI`        | minuto (00 - 59)                     |
| `SS`        | segundo (00 - 59)                     |
| `MS`        | milisegundo (000 - 999)              |
| `TZ`        | abreviatura del huso horario               |
| `OF`        | inicio del huso horario desde UTC            |
| `AM` / `am` | indicador del meridiano (sin puntos) |
| `PM` / `pm` | indicador del meridiano (sin puntos) |

{{< code-block lang="sql" >}}
SELECT
  TO_CHAR(order_date, 'MM-DD-YYYY') AS formatted_date
FROM
  orders
{{< /code-block >}}

### `DATE_BIN`
{{< code-block lang="sql" >}}
SELECT DATE_BIN('15 minutes', TIMESTAMP '2025-09-15 12:34:56', TIMESTAMP '2025-01-01')
-- Returns 2025-09-15 12:30:00

SELECT DATE_BIN('1 day', TIMESTAMP '2025-09-15 12:34:56', TIMESTAMP '2025-01-01')
-- Returns 2025-09-15 00:00:00
{{< /code-block >}}

### `DATE_TRUNC`

Truncamientos admitidos:
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

### `CURRENT_SETTING`

Parámetros de configuración admitidos:
- `dd.time_frame_start`: Devuelve el inicio de la marca de tiempo seleccionada en formato RFC 3339 (`YYYY-MM-DD HH:mm:ss.sss±HH:mm`).
- `dd.time_frame_end`: Devuelve el final de la marca de tiempo seleccionada en formato RFC 3339 (`YYYY-MM-DD HH:mm:ss.sss±HH:mm`).

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

### `NOW`
{{< code-block lang="sql" >}}
SELECT
  *
FROM
  sales
WHERE
  purchase_date > NOW() - INTERVAL '1 hour'
{{< /code-block >}}

### `CARDINALITY`
{{< code-block lang="sql" >}}
SELECT
  CARDINALITY(recipients)
FROM
  emails
{{< /code-block >}}

### `ARRAY_POSITION`
{{< code-block lang="sql" >}}
SELECT
  ARRAY_POSITION(recipients, 'hello@example.com')
FROM
  emails
{{< /code-block >}}

### `STRING_TO_ARRAY`
{{< code-block lang="sql" >}}
SELECT
  STRING_TO_ARRAY('a,b,c,d,e,f', ',')
{{< /code-block >}}

### `ARRAY_AGG`
{{< code-block lang="sql" >}}
SELECT
  sender,
  ARRAY_AGG(subject) subjects,
  ARRAY_AGG(ALL subject) all_subjects,
  ARRAY_AGG(DISTINCT subject) distinct_subjects
FROM
  emails
GROUP BY
  sender
{{< /code-block >}}

### `UNNEST`
{{< code-block lang="sql" >}}
SELECT
  sender,
  recipient
FROM
  emails,
  UNNEST(recipients) AS recipient
{{< /code-block >}}

{{% /collapse-content %}}

## Expresiones regulares

### Sabor

Todas las funciones de expresión regular (regex) utilizan el formato ICU (International Components for Unicode):

- [Metacaracteres][5]
- [Operadores][6]
- [Expresiones de conjuntos (clases de caracteres)][7]
- [Opciones de marcadores para marcadores en patrones][8]. Consulta la [sección sobre marcadores a continuación](#function-level-flags) para conocer los marcadores a nivel de función.
- [Buscar y reemplazar (utilizando grupos de captura)][9]

### Funciones

| Función                                                                                                         | Tipo de retorno      | Descripción                                                                                                                                                                                                                                                                |
|------------------------------------------------------------------------------------------------------------------|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `REGEXP_LIKE(string input, string pattern)`                                                                      | Booleano          | Evalúa si una cadena coincide con un patrón de expresión regular.                                                                                                                                                                                                           |
| `REGEXP_MATCH(string input, string pattern [, string flags ])`                                                   | matriz de cadenas | Devuelve las subcadenas de la primera coincidencia de patrón en la cadena. <br><br> Esta función busca en la cadena de entrada utilizando el patrón dado y devuelve las subcadenas capturadas (grupos de captura) de la primera coincidencia. Si no hay grupos de captura, devuelve la coincidencia completa. |
| `REGEXP_REPLACE(string input, string pattern, string replacement [, string flags ])`                             | cadena           | Sustituye la subcadena que es la primera coincidencia con el patrón, o todas las coincidencias si utilizas el [marcador opcional `g` ](#function-level-flags).                                                                                                                              |
| `REGEXP_REPLACE (string input, string pattern, string replacement, integer start, integer N [, string flags ] )` | cadena           | Sustituye la subcadena que es la enésima coincidencia con el patrón, o todas las coincidencias si `N` es cero, empezando por `start`.                                                                                                                                                    |

{{% collapse-content title="Ejemplos" level="h3" %}}

### `REGEXP_LIKE`
{{< code-block lang="sql" >}}
SELECT
  *
FROM
  emails
WHERE
  REGEXP_LIKE(email_address, '@example\.com$')
{{< /code-block >}}

### `REGEXP_MATCH`
{{< code-block lang="sql" >}}
SELECT regexp_match('foobarbequebaz', '(bar)(beque)');
-- {bar,beque}

SELECT regexp_match('foobarbequebaz', 'barbeque');
-- {barbeque}

SELECT regexp_match('abc123xyz', '([a-z]+)(\d+)(x(.)z)');
-- {abc,123,xyz,y}
{{< /code-block >}}

### `REGEXP_REPLACE`
{{< code-block lang="sql" >}}
SELECT regexp_replace('Auth success token=abc123XYZ789', 'token=\w+', 'token=***');
-- Auth success token=***

SELECT regexp_replace('status=200 method=GET', 'status=(\d+) method=(\w+)', '$2: $1');
-- GET: 200

SELECT regexp_replace('INFO INFO INFO', 'INFO', 'DEBUG', 1, 2);
-- INFO DEBUG INFO
{{< /code-block >}}

{{% /collapse-content %}}

### Marcadores de función

Puedes utilizar los siguientes marcadores con [funciones de expresión regular](#regular-expressions):

`i`
: Coincidencia que no distingue mayúsculas y minúsculas

`n` o `m`
: Coincidencia que reconoce nuevas líneas

`g`
: Global; sustiyuye _todas_ las subcadenas coincidentes en lugar de solo la primera

{{% collapse-content title="Ejemplos" level="h3" %}}

### Marcador `i`

{{< code-block lang="sql" >}}
SELECT regexp_match('INFO', 'info')
-- NULL

SELECT regexp_match('INFO', 'info', 'i')
-- ['INFO']
{{< /code-block >}}

### Marcador `n`

{{< code-block lang="sql" >}}
SELECT regexp_match('a
b', '^b');
-- NULL

SELECT regexp_match('a
b', '^b', 'n');
-- ['b']
{{< /code-block >}}

### Marcador `g`

{{< code-block lang="sql" >}}
SELECT icu_regexp_replace('Request id=12345 completed, id=67890 pending', 'id=\d+', 'id=XXX');
-- Request id=XXX completed, id=67890 pending

SELECT regexp_replace('Request id=12345 completed, id=67890 pending', 'id=\d+', 'id=XXX', 'g');
-- Request id=XXX completed, id=XXX pending
{{< /code-block >}}

{{% /collapse-content %}}

## Funciones de ventana

Esta tabla proporciona información general de las funciones de ventana admitidas. Para ver más detalles y ejemplos, consulte la [documentación de PostgreSQL][2].

| Función                | Tipo de retorno       | Descripción                                                            |
|-------------------------|-------------------|------------------------------------------------------------------------|
| `OVER`                  | N/A               | Define una ventana para un conjunto de filas sobre las que pueden operar otras funciones de ventana. |
| `PARTITION BY`          | N/A               | Divide el conjunto de resultados en particiones, específicamente para aplicar funciones de ventana. |
| `RANK()`                | entero           | Asigna un rango a cada fila dentro de una partición, con espacios para los empates.     |
| `ROW_NUMBER()`          | entero           | Asigna un número secuencial único a cada fila dentro de una partición.     |
| `LEAD(column n)`        | columna typeof     | Devuelve el valor de la siguiente fila de la partición.                  |
| `LAG(column n)`         | columna typeof     | Devuelve el valor de la fila anterior de la partición.              |
| `FIRST_VALUE(column n)` | columna typeof     | Devuelve el primer valor de un conjunto ordenado de valores.                   |
| `LAST_VALUE(column n)`  | columna typeof     | Devuelve el último valor de un conjunto ordenado de valores.                    |
| `NTH_VALUE(column n, offset)`| columna typeof | Devuelve el valor en el desplazamiento especificado en un conjunto ordenado de valores. |


## Funciones y operadores JSON

| Nombre                                          | Tipo de devolución  | Descripción                                                                                                                                                                                                                                                                                                    |
|-----------------------------------------------|--------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| json_extract_path_text(text json, text path...) | texto         | Extrae un subobjeto JSON como texto, definido por la ruta. Su comportamiento es equivalente a la [función Postgres del mismo nombre][3]. Por ejemplo, `json_extract_path_text(col, ‘forest')` devuelve el valor de la clave `forest` para cada objeto JSON en `col`. Consulta el ejemplo siguiente para ver la sintaxis de una matriz JSON. |
| json_extract_path(text json, text path...)      | JSON         | Misma funcionalidad que `json_extract_path_text`, pero devuelve una columna de tipo JSON en lugar de tipo texto.                                                                                                                                                                                                        |
| json_array_elements(text json)                | filas de JSON | Expande una matriz JSON en un conjunto de filas. Esta forma solo se permite en una cláusula FROM.                                                                                                                                                                                                                           |
| json_array_elements_text(text json)           | filas de texto | Expande una matriz JSON en un conjunto de filas. Esta forma solo se permite en una cláusula FROM.                                                                                                                                                                                                                           |

## Funciones de tabla

{{< callout url="https://www.datadoghq.com/product-preview/logs-metrics-support-in-ddsql-editor/" >}}
La consulta de logs y métricas mediante DDSQL está en vista previa. Utiliza este formulario para solicitar accesso.
{{< /callout >}}

Las funciones de tabla se utilizan para consultar logs y métricas.

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
    filter => varchar,
    columns => array < varchar >,
    indexes => array < varchar >,
    from_timestamp => timestamp,
    to_timestamp => timestamp
) AS (column_name type [, ...])</pre>
      </td>
      <td>Devuelve los datos de logs en forma de tabla. El parámetro de columna especifica qué campos de log extraer, y la cláusula AS define el esquema de la tabla devuelta. Opcional: Filtrado por índice o rango temporal. Si no se especifica la hora, se utilizará por defecto la última hora de los datos.</td>
      <td>
        {{< code-block lang="sql" >}}
SELECT timestamp, host, service, message
FROM dd.logs(
    filter => 'source (fuente):java',
    columns => ARRAY['timestamp','host', 'service','message']
) AS (
    timestamp TIMESTAMP,
    host VARCHAR,
    service VARCHAR,
    message VARCHAR
){{< /code-block >}}
      </td>
    </tr>
    <tr>
      <td>
        <pre>
dd.metric_scalar(
    query varchar
    reducer varchar [, from_timestamp timestamp, to_timestamp timestamp]
)</pre>
      </td>
      <td>Devuelve datos de métricas como un valor escalar. La función acepta una consulta de métricas (con agrupación opcional), un reductor para determinar cómo se agregan los valores (medio, máx, etc.) y parámetros opcionales de fecha y hora (por defecto 1 hora) para definir el intervalo de tiempo.</td>
      <td>
        {{< code-block lang="sql" >}}
SELECT *
FROM dd.metric_scalar(
    'avg:system.cpu.user{*} by {service}',
    'avg',
    TIMESTAMP '2025-07-10 00:00:00.000-04:00',
    TIMESTAMP '2025-07-17 00:00:00.000-04:00'
)
ORDER BY value DESC;{{< /code-block >}}
      </td>
    </tr>
  </tbody>
</table>





## Etiquetas

DDSQL expone etiquetas como un tipo `hstore`, inspirado en PostgreSQL. Puedes acceder a los valores de determinadas claves de etiqueta utilizando el operador de flecha de PostgreSQL. Por ejemplo:

```sql
SELECT instance_type, count(instance_type)
FROM aws.ec2_instance
WHERE tags->'region' = 'us-east-1' -- region is a tag, not a column
GROUP BY instance_type
```

Las etiquetas son pares clave-valor en los que cada clave puede tener cero, uno o varios valores de etiqueta correspondientes. Cuando se accede al valor de la etiqueta, se devuelve una única cadena que contiene _todos_ los valores correspondientes. Cuando los datos tienen varios valores de etiqueta para la misma clave de etiqueta, se representan como una cadena ordenada y separada por comas. Por ejemplo:

```sql
SELECT tags->'team', instance_type, architecture, COUNT(*) as instance_count
FROM aws.ec2_instance
WHERE tags->'team' = 'compute_provisioning,database_ops'
GROUP BY tags->'team', instance_type, architecture
ORDER BY instance_count DESC
```

También puedes comparar valores de etiquetas como cadenas o conjuntos completos de etiquetas:

```sql
SELECT *
FROM k8s.daemonsets da INNER JOIN k8s.deployments de
ON da.tags = de.tags -- for a specific tag: da.tags->'app' = de.tags->'app'
```

## Referencias adicionales

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