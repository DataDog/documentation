---
aliases:
- /es/logs/workspaces/sql_reference
code_lang: ddsql_default
code_lang_weight: 1
further_reading:
- link: /logs/workspaces/
  tag: Documentación
  text: Más información sobre Log Workspaces
- link: /ddsql_editor/
  tag: Documentación
  text: Más información sobre DDSQL Editor
products:
- icon: logs
  name: Log Workspaces
  url: /logs/workspaces/
- icon: ddsql
  name: Editor DDSQL
  url: /ddsql_editor/
title: DDSQL
type: lenguaje de código múltiple
---

{{< product-availability >}}

## Información general

SQL en [Celdas de análisis][1] permite analizar y manipular datos. Esta documentación aborda la compatibilidad de SQL disponible e incluye:
- [Sintaxis compatible con PostgreSQL](#syntax)
- [Funciones de SQL](#functions)
- [Funciones de ventana](#window-functions)

{{< img src="/logs/workspace/sql_reference/sql_syntax_analysis_cell.png" alt="Celda de Workspace de ejemplo con sintaxis de SQL" style="width:100%;" >}}

## Sintaxis

Se admite la siguiente sintaxis de SQL:

| Sintaxis        | Descripción                                                                                  | Ejemplo                                                                                                  |
|---------------|----------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|
| `SELECT (DISTINCT)`<br>DISTINCT: opcional | Recupera filas de una base de datos, con `DISTINCT` filtrando los registros duplicados.       | {{< code-block lang="sql" >}}SELECT DISTINCT customer_id
FROM orders {{< /code-block >}} |
| `JOIN`        | Combines rows from two or more tables based on a related column between them. Supports FULL JOIN, INNER JOIN, LEFT JOIN, RIGHT JOIN.  | {{< code-block lang="sql" >}}SELECT orders.order_id, customers.customer_name
FROM orders
JOIN customers
ON orders.customer_id = customers.customer_id {{< /code-block >}} |
| `GROUP BY`    | Groups rows that have the same values in specified columns into summary rows.                | {{< code-block lang="sql" >}}SELECT product_id, SUM(quantity)
FROM sales
GROUP BY product_id {{< /code-block >}} |
| `\|\|` (concat)          | Concatenates two or more strings together.                                                  | {{< code-block lang="sql" >}}SELECT first_name || ' ' || last_name AS full_name
FROM employees {{< /code-block >}} |
| `WHERE`<br>Includes support for `LIKE`, `IN`, `ON`, `OR` filters.  | Filters records that meet a specified condition.                                             | {{< code-block lang="sql" >}}SELECT *
FROM employees
WHERE department = 'Sales' AND name LIKE 'J%' {{< /code-block >}} |
| `CASE`        | Provides conditional logic to return different values based on specified conditions.         | {{< code-block lang="sql" >}}SELECT order_id,
  CASE
    WHEN quantity > 10 THEN 'Bulk Order'
    ELSE 'Standard Order'
  END AS order_type
FROM orders {{< /code-block >}} |
| `WINDOW` | Performs a calculation across a set of table rows that are related to the current row.                 | {{< code-block lang="sql" >}}SELECT
  timestamp,
  service_name,
  cpu_usage_percent,
  AVG(cpu_usage_percent) OVER (PARTITION BY service_name ORDER BY timestamp ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS moving_avg_cpu
FROM
  cpu_usage_data {{< /code-block >}} |
| `IS NULL` / `IS NOT NULL`   | Checks if a value is null or not null.                                         | {{< code-block lang="sql" >}}SELECT *
FROM orders
WHERE delivery_date IS NULL {{< /code-block >}}        |
| `LIMIT`    | Specifies the maximum number of records to return.                                               | {{< code-block lang="sql" >}}SELECT *
FROM customers
LIMIT 10 {{< /code-block >}}                         |
| `ORDER BY`  | Sorts the result set of a query by one or more columns. Includes ASC, DESC for sorting order.  | {{< code-block lang="sql" >}}SELECT *
FROM sales
ORDER BY sale_date DESC {{< /code-block >}}              |
| `HAVING`    | Filters records that meet a specified condition after grouping.                               | {{< code-block lang="sql" >}}SELECT product_id, SUM(quantity)
FROM sales
GROUP BY product_id
HAVING SUM(quantity) > 10 {{< /code-block >}} |
| `IN`, `ON`, `OR`  | Used for specified conditions in queries. Available in `WHERE`, `JOIN` clauses.       | {{< code-block lang="sql" >}}SELECT *
FROM orders
WHERE order_status IN ('Shipped', 'Pending') {{< /code-block >}} |
| `AS`        | Renames a column or table with an alias.                                                        | {{< code-block lang="sql" >}}SELECT first_name AS name
FROM employees {{< /code-block >}}                |
| Arithmetic Operations | Performs basic calculations using operators like `+`, `-`, `*`, `/`.                 | {{< code-block lang="sql" >}}SELECT price, tax, (price * tax) AS total_cost
FROM products {{< /code-block >}} |
| `INTERVAL value unit`  | interval                      | Represents a time duration specified in a given unit. Supported units:<br>- `milliseconds` / `millisecond`<br>- `seconds` / `second`<br>- `minutes` / `minute`<br>- `hours` / `hour`<br>- `days` / `day` |


## Funciones

Se admiten las siguientes funciones de SQL. Para la función de ventana, consulta la sección [función de ventana](#window-functions) de esta documentación.

| Función                                         | Tipo de retorno                           | Descripción                                                                 |
|--------------------------------------------------|---------------------------------------|-----------------------------------------------------------------------------|
| `MIN(variable v)`                                | Variable typeof                              | Devuelve el valor más pequeño de un conjunto de datos.                                |
| `MAX(variable v)`                                | Variable typeof                              | Devuelve el valor máximo de todos los valores de entrada.                          |
| `COUNT(any a)`                                   | numérico                               | Devuelve el número de valores de entrada que no son nulos.                       |
| `SUM(numeric n)`                                 | numérico                               | Devuelve la suma de todos los valores de entrada.                              |
| `AVG(numeric n)`                                 | numérico                               | Devuelve el valor medio (media aritmética) de todos los valores de entrada.        |
| `CEIL(numeric n)`                                | numérico                               | Devuelve el valor redondeado al entero más próximo.                        |
| `FLOOR(numeric n)`                               | numérico                               | Devuelve el valor redondeado al entero más próximo.                      |
| `ROUND(numeric n)`                               | numérico                               | Devuelve el valor redondeado al entero más próximo.                           |
| `LOWER(string s)`                                | cadena                                | Devuelve la cadena en minúsculas.                                            |
| `UPPER(string s)`                                | cadena                                | Devuelve la cadena en mayúsculas.                                            |
| `ABS(numeric n)`                                 | numérico                               | Devuelve el valor absoluto.                                                 |
| `COALESCE(args a)`                               | typeof first non-null a OR null       | Devuelve el primer valor no nulo o nulo si todos son nulos.                   |
| `CAST(value AS type)`                            | tipo                                  | Convierte el valor dado al tipo de datos especificado.                        |
| `LENGTH(string s)`                               | entero                               | Devuelve el número de caracteres de la cadena.                             |
| `TRIM(string s)`                                 | cadena                                | Elimina los espacios en blanco iniciales y finales de la cadena.                    |
| `REPLACE(string s, string from, string to)`      | cadena                                | Sustituye las apariciones de una subcadena dentro de una cadena por otra subcadena. |
| `SUBSTRING(string s, int start, int length)`     | cadena                                | Extrae una subcadena de una cadena, comenzando en una posición dada y para una longitud especificada. |
| `STRPOS(string s, string substring)`             | entero                               | Devuelve la primera posición del índice de la subcadena en una cadena dada, o 0 si no hay coincidencia. |
| `SPLIT_PART(string s, string delimiter, integer index)` | cadena                         | Divide la cadena en el delimitador dado y devuelve la cadena en la posición dada contando desde uno. |
| `EXTRACT(unit from timestamp/interval)`          | numérico                               | Extrae una parte de un campo de fecha u hora (como el año o el mes) de una marca temporal o intervalo. |
| `TO_TIMESTAMP(string timestamp, string format)`  | marca de tiempo                             | Convierte una cadena en una marca de tiempo según el formato dado.             |
| `TO_CHAR(timestamp t, string format)`            | cadena                                | Convierte una marca de tiempo en una cadena según el formato dado.             |
| `DATE_TRUNC(string unit, timestamp t)`           | marca de tiempo                             | Trunca una marca de tiempo a una precisión especificada basada en la unidad proporcionada.  |
| `REGEXP_LIKE(string s, pattern p)`               | booleano                               | Evalúa si una cadena coincide con un patrón de expresión regular.                 |
| `CARDINALITY(array a)`                           | entero                               | Devuelve el número de elementos de la matriz.                                |
| `ARRAY_POSITION(array a, typeof_array value)`    | entero                               | Devuelve el índice de la primera aparición del valor encontrado en la matriz, o null (nulo) si no se encuentra el valor. |
| `STRING_TO_ARRAY(string s, string delimiter)`    | matriz de cadenas                      | Divide la cadena dada en una matriz de cadenas utilizando el delimitador dado. |
| `ARRAY_AGG(expression e)`                        | matriz de tipo de entrada                   | Crea una matriz al recopilar todos los valores de entrada.                        |
| `UNNEST(array a [, array b...])`                 | filas de a [, b...]                    | Expande matrices en un conjunto de filas. Esta forma sólo se permite en una cláusula FROM. |

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

### `REGEXP_LIKE`
{{< code-block lang="sql" >}}
SELECT
  *
FROM
  emails
WHERE
  REGEXP_LIKE(email_address, '@example\.com$')
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

## Funciones de ventana

Esta tabla proporciona información general de las funciones de ventana compatibles. Para más detalles y ejemplos, consulta la [Documentación de PostgreSQL][2].

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


## Etiquetas

DDSQL expone las etiquetas como un tipo `hstore`, que puedes consultar utilizando el operador de flecha de PostgreSQL. Por ejemplo:

```sql
SELECT instance_type, count(instance_type)
FROM aws.ec2_instance
WHERE tags->'region' = 'us-east-1' -- region is a tag, not a column
GROUP BY instance_type
```

Las etiquetas son pares clave-valor en los que cada clave puede tener cero, uno o varios valores. Cuando se accede a la etiqueta, el valor devuelve una cadena que contiene todos los valores correspondientes.

También puedes comparar valores de etiquetas como cadenas o conjuntos completos de etiquetas:

```sql
SELECT *
FROM k8s.daemonsets da INNER JOIN k8s.deployments de
ON da.tags = de.tags -- for a specific tag: da.tags->'app' = de.tags->'app'
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/workspaces/#analysis-cell
[2]: https://www.postgresql.org/docs/current/functions-window.html