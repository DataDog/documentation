---
further_reading:
- link: /logs/workspaces/
  tag: Documentación
  text: Más información sobre Log Workspaces
title: Referencia de SQL
---

## Información general

SQL en [Celdas de análisis][1] te permite analizar y manipular datos dentro de Log Workspaces. Esta documentación aborda el soporte de SQL disponible en Log Workspaces e incluye:
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
| `INTERVAL value unit`  | interval                      | Represents a time duration specified in a given unit.                     |


## Funciones

Se admiten las siguientes funciones de SQL. Para la función de ventana, consulta la sección [función de ventana](#window-functions) de esta documentación.

| Función                                         | Tipo de retorno                           | Descripción                                                                 |
|--------------------------------------------------|---------------------------------------|-----------------------------------------------------------------------------|
| `min(variable v)`                                | Variable typeof                              | Devuelve el valor más pequeño de un conjunto de datos.                                |
| `max(variable v)`                                | Variable typeof                              | Devuelve el valor máximo de todos los valores de entrada.                          |
| `count(any a)`                                   | numérico                               | Devuelve el número de valores de entrada que no son nulos.                       |
| `sum(numeric n)`                                 | numérico                               | Devuelve la suma de todos los valores de entrada.                              |
| `avg(numeric n)`                                 | numérico                               | Devuelve el valor medio (media aritmética) de todos los valores de entrada.        |
| `ceil(numeric n)`                                | numérico                               | Devuelve el valor redondeado al entero más próximo.                        |
| `floor(numeric n)`                               | numérico                               | Devuelve el valor redondeado al entero más próximo.                      |
| `round(numeric n)`                               | numérico                               | Devuelve el valor redondeado al entero más próximo.                           |
| `lower(string s)`                                | cadena                                | Devuelve la cadena en minúsculas.                                            |
| `upper(string s)`                                | cadena                                | Devuelve la cadena en mayúsculas.                                            |
| `abs(numeric n)`                                 | numérico                               | Devuelve el valor absoluto.                                                 |
| `coalesce(args a)`                               | typeof first non-null a OR null       | Devuelve el primer valor no nulo o nulo si todos son nulos.                   |
| `cast(value AS type)`                            | tipo                                  | Convierte el valor dado al tipo de datos especificado.                        |
| `length(string s)`                               | entero                               | Devuelve el número de caracteres de la cadena.                             |
| `trim(string s)`                                 | cadena                                | Elimina los espacios en blanco iniciales y finales de la cadena.                    |
| `replace(string s, from_string s1, to_string s2)`| cadena                                | Sustituye las apariciones de una subcadena dentro de una cadena por otra subcadena. |
| `substring(string s, start_position_int i, length_int l)` | cadena                        | Extrae una subcadena de una cadena, comenzando en una posición dada y para una longitud especificada. |
| `extract(field from timestamp/interval)`         | numérico                               | Extrae una parte de un campo de fecha u hora (como el año o el mes) de una marca temporal o intervalo. |
| `to_timestamp(numeric n)`                        | marca temporal con huso horario              | Convierte un valor numérico en una marca temporal con huso horario.                     |
| `to_char(timestamp t / interval i / numeric n, format f)` | cadena                      | Convierte una marca temporal, un intervalo o un valor numérico en una cadena utilizando un formato.|
| `date_trunc(field f, source [, time_zone])`     | marca temporal [con huso] / intervalo | Trunca una marca temporal o un intervalo con una precisión especificada.                 |
| `regexp_like(string s, pattern p [flags])`       | booleano                               | Evalúa si una cadena coincide con un patrón de expresión regular.                 |


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
  TIMESTAMP '2023-10-01 10:00:00' + INTERVAL '30 days' AS future_date
{{< /code-block >}} 

### `TRIM`
{{< code-block lang="sql" >}}
SELECT
  trim(name) AS trimmed_name
FROM
  users
{{< /code-block >}}

###  `REPLACE`
{{< code-block lang="sql" >}}
SELECT
  replace(description, 'old', 'new') AS updated_description
FROM
  products
{{< /code-block >}}

### `SUBSTRING`
{{< code-block lang="sql" >}}
SELECT
  substring(title, 1, 10) AS short_title
FROM
  books
{{< /code-block >}}

### `EXTRACT`
{{< code-block lang="sql" >}}
SELECT
  extract(year FROM purchase_date) AS purchase_year
FROM
  sales
{{< /code-block >}}

### `TO_TIMESTAMP`
{{< code-block lang="sql" >}}
SELECT
  to_timestamp(epoch_time) AS formatted_time
FROM
  event_logs
{{< /code-block >}}

### `TO_CHAR`
{{< code-block lang="sql" >}}
SELECT
  to_char(order_date, 'MM-DD-YYYY') AS formatted_date
FROM
  orders
{{< /code-block >}}

### `DATE_TRUNC`
{{< code-block lang="sql" >}}
SELECT
  date_trunc('month', event_time) AS month_start
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
  regexp_like(email_address, '@example\.com$')
{{< /code-block >}}

{{% /collapse-content %}} 

## Funciones de ventana

Esta tabla brinda una visión general de las funciones de ventana compatibles. Para más detalles y ejemplos, consulta la [Documentación de PostgreSQL][2].

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


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/workspaces/#analysis-cell
[2]: https://www.postgresql.org/docs/current/functions-window.html