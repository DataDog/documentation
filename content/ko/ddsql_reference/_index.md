---
aliases:
- /ko/logs/workspaces/sql_reference
- /ko/ddsql_reference/ddsql_default
description: Datadog 데이터를 SQL로 쿼리하기 위한 DDSQL 구문, 데이터 유형, 함수, 연산자 및 문에 대한 완전한 참조 가이드.
further_reading:
- link: bits_ai/mcp_server
  tag: 설명서
  text: Datadog MCP 서버
- link: /ddsql_editor/
  tag: 설명서
  text: DDSQL 에디터
products:
- icon: ddsql
  name: DDSQL 에디터
  url: /ddsql_editor/
- icon: notebook
  name: Notebooks
  url: /notebooks/
title: DDSQL 레퍼런스
---
{{< product-availability >}}

## 개요 {#overview}

DDSQL은 Datadog 데이터를 위한 SQL입니다. DDSQL은 `SELECT`와 같은 여러 표준 SQL 연산을 구현하며, 비정형 데이터에 대한 쿼리도 허용합니다. 직접 `SELECT` 문을 작성하여 원하는 데이터를 정확히 가져오거나 태그를 일반 테이블 열처럼 쿼리하는 등의 작업을 수행할 수 있습니다.

AI 에이전트에서는 [Datadog MCP 서버][10] `ddsql` 도구 세트(미리보기)를 통해 DDSQL 쿼리를 실행할 수 있습니다.

이 설명서에서는 지원되는 SQL 기능을 다루며 다음 내용을 포함합니다.
- [PostgreSQL과 호환되는 구문](#syntax)
- [데이터 유형](#data-types)
- [형식 리터럴](#type-literals)
- [배열](#arrays)
- [SQL 함수](#functions)
- [정규 표현식](#regular-expressions)
- [윈도우 함수](#window-functions)
- [JSON 함수](#json-functions-and-operators)
- [네트워크 주소 함수](#network-address-functions-and-operators)
- [테이블 함수](#table-functions)
- [태그](#tags)


{{< img src="/logs/workspace/sql_reference/sql_syntax_analysis_cell.png" alt="SQL 구문이 포함된 워크스페이스 셀 예시" style="width:100%;" >}}

## 구문 {#syntax}

다음 SQL 구문이 지원됩니다.

`SELECT (DISTINCT)` (DISTINCT: 선택 사항)
: 데이터베이스에서 행을 검색하며, `DISTINCT`로 중복 레코드를 필터링해 제외합니다.

    {{< code-block lang="sql" >}}SELECT DISTINCT customer_id
FROM orders {{< /code-block >}}

`JOIN`
: 관련 열을 기준으로 둘 이상의 테이블 행을 결합합니다. FULL JOIN, INNER JOIN, LEFT JOIN, RIGHT JOIN을 지원합니다.

    {{< code-block lang="sql" >}}SELECT orders.order_id, customers.customer_name
FROM orders
JOIN customers
ON orders.customer_id = customers.customer_id {{< /code-block >}}

`GROUP BY`
: 지정된 열에서 동일한 값을 가진 행을 요약 행으로 그룹화합니다.

    {{< code-block lang="sql" >}}SELECT product_id, SUM(quantity)
FROM sales
GROUP BY product_id {{< /code-block >}}

`||` (concat)
: 두 개 이상의 문자열을 함께 연결합니다.

    {{< code-block lang="sql" >}}SELECT first_name || ' ' || last_name AS full_name
FROM employees {{< /code-block >}}

`WHERE` (`LIKE`, `IN`, `ON`, `OR` 필터에 대한 지원 포함)
: 지정된 조건을 충족하는 레코드를 필터링합니다.

    {{< code-block lang="sql" >}}SELECT *
FROM employees
WHERE department = 'Sales' AND name LIKE 'J%' {{< /code-block >}}

`CASE`
: 지정된 조건에 따라 다른 값을 반환하는 조건부 로직을 제공합니다.

    {{< code-block lang="sql" >}}SELECT order_id,
  CASE
    WHEN quantity > 10 THEN 'Bulk Order'
    ELSE 'Standard Order'
  END AS order_type
FROM orders {{< /code-block >}}

`WINDOW`
: 현재 행과 관련된 표 행 집합에 대해 계산을 수행합니다.

    {{< code-block lang="sql" >}}SELECT
  timestamp,
  service_name,
  cpu_usage_percent,
  AVG(cpu_usage_percent) OVER (PARTITION BY service_name ORDER BY timestamp ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS moving_avg_cpu
FROM
  cpu_usage_data {{< /code-block >}}

`IS NULL` / `IS NOT NULL`
: 값이 null인지 여부를 확인합니다.

    {{< code-block lang="sql" >}}SELECT *
FROM orders
WHERE delivery_date IS NULL {{< /code-block >}}

`LIMIT`
: 반환할 최대 레코드 수를 지정합니다.

    {{< code-block lang="sql" >}}SELECT *
FROM customers
LIMIT 10 {{< /code-block >}}

`OFFSET`
: 쿼리에서 레코드를 반환하기 시작하기 전에 지정된 수의 레코드를 건너뜁니다.

    {{< code-block lang="sql" >}}SELECT *
FROM employees
OFFSET 20 {{< /code-block >}}

`ORDER BY`
: 하나 이상의 열을 기준으로 쿼리의 결과 집합을 정렬합니다. 정렬 순서로 ASC, DESC를 포함합니다.

    {{< code-block lang="sql" >}}SELECT *
FROM sales
ORDER BY sale_date DESC {{< /code-block >}}

`HAVING`
: 그룹화 후 지정된 조건을 충족하는 레코드를 필터링합니다.

    {{< code-block lang="sql" >}}SELECT product_id, SUM(quantity)
FROM sales
GROUP BY product_id
HAVING SUM(quantity) > 10 {{< /code-block >}}

`IN`, `ON`, `OR`
: 쿼리에서 조건을 지정하는 데 사용됩니다. `WHERE`, `JOIN` 절에서 사용 가능합니다.

    {{< code-block lang="sql" >}}SELECT *
FROM orders
WHERE order_status IN ('Shipped', 'Pending') {{< /code-block >}}

`USING`
: 이 절은 양쪽 표에 동일한 이름의 조인 열이 있을 때 사용하는 JOIN의 축약 구문입니다. 쉼표로 구분된 해당 열의 목록을 입력하면, 각 일치하는 쌍마다 별도의 동등 조건이 생성됩니다. 예를 들어, `T1`과 `T2`를 `USING (a, b)`로 조인하는 것은 `ON T1.a = T2.a AND T1.b = T2.b`와 동일합니다.

    {{< code-block lang="sql" >}}SELECT orders.order_id, customers.customer_name
FROM orders
JOIN customers
USING (customer_id) {{< /code-block >}}

`AS`
: 열 또는 표의 이름을 별칭으로 바꿉니다.

    {{< code-block lang="sql" >}}SELECT first_name AS name
FROM employees {{< /code-block >}}

산술 연산
:  `+`, `-`, `*`, `/`와 같은 연산자를 사용하여 기본 계산을 수행합니다.

    {{< code-block lang="sql" >}}SELECT price, tax, (price * tax) AS total_cost
FROM products {{< /code-block >}}

`INTERVAL value unit`
: 주어진 단위로 지정된 지속 시간을 나타내는 간격입니다.
지원되는 단위: <br>- `milliseconds` / `millisecond`<br>- `seconds` / `second`<br>- `minutes` / `minute`<br>- `hours` / `hour`<br>- `days` / `day`

## 데이터 유형 {#data-types}

DDSQL은 다음 데이터 유형을 지원합니다.

| 데이터 유형 | 설명 |
|-----------|-------------|
| `BIGINT` | 64비트 부호 있는 정수. |
| `BOOLEAN` | `true` 또는 `false` 값. |
| `DECIMAL` | 부동 소수점 숫자. |
| `INET` | 네트워크 주소 값(IPv4 및 IPv6, 필요 시 CIDR 접두사 길이 포함). |
| `INTERVAL` | 지속 시간 값. |
| `JSON` | JSON 데이터. |
| `TIMESTAMP` | 날짜 및 시간 값. |
| `VARCHAR` | 가변 길이 문자 문자열. |

### 배열 유형 {#array-types}

모든 데이터 유형은 배열 유형을 지원합니다. 배열 리터럴, 요소 접근 및 배열 함수에 대해서는 [배열](#arrays)을 참조하세요.

## 형식 리터럴 {#type-literals}

DDSQL은 `[TYPE] [value]` 구문을 사용하여 명시적 형식 리터럴을 지원합니다.

| 유형 | 구문 | 예시 |
|------|--------|---------|
| `BIGINT` | `BIGINT 'value'` | `BIGINT '1234567'` |
| `BOOLEAN` | `BOOLEAN 'value'` | `BOOLEAN 'true'` |
| `DECIMAL` | `DECIMAL 'value'` | `DECIMAL '3.14159'` |
| `INET` | `INET 'value'` | `INET '192.168.1.5/24'` |
| `INTERVAL` | `INTERVAL 'value unit'` | `INTERVAL '30 minutes'` |
| `JSON` | `JSON 'value'` | `JSON '{"key": "value", "count": 42}'` |
| `TIMESTAMP` | `TIMESTAMP 'value'` | `TIMESTAMP '2023-12-25 10:30:00'` |
| `VARCHAR` | `VARCHAR 'value'` | `VARCHAR 'hello world'` |

유형 접두사는 생략할 수 있으며, 값에서 자동으로 유형이 유추됩니다. 예를 들어, `'hello world'`는 `VARCHAR`로, `123`은 `BIGINT`로, `true`는 `BOOLEAN`으로 유추됩니다. 값이 모호할 수 있는 경우 명시적인 유형 접두사를 사용하세요. 예를 들어, `TIMESTAMP '2025-01-01'`은 접두사가 없으면 `VARCHAR`로 유추됩니다.

### 예시 {#example}

{{< code-block lang="sql" >}}
-- Using type literals in queries
SELECT
    VARCHAR 'Product Name: ' || name AS labeled_name,
    price * DECIMAL '1.08' AS price_with_tax,
    created_at + INTERVAL '7 days' AS expiry_date
FROM products
WHERE created_at > TIMESTAMP '2025-01-01';
{{< /code-block >}}

## 배열 {#arrays}

배열은 모두 동일한 데이터 유형을 공유하는 값의 정렬된 모음입니다. 모든 DDSQL 기본 유형에는 해당하는 배열 유형이 있습니다.

### 배열 리터럴 {#array-literals}

배열 리터럴을 구성하려면 `ARRAY[value1, value2, ...]` 구문을 사용합니다. 배열의 유형은 값에서 자동으로 유추됩니다.

{{< code-block lang="sql" >}}
SELECT ARRAY['apple', 'banana', 'cherry'] AS fruits;  -- VARCHAR array
SELECT ARRAY[1, 2, 3] AS numbers;                     -- BIGINT array
SELECT ARRAY[true, false, true] AS flags;             -- BOOLEAN array
SELECT ARRAY[1.1, 2.2, 3.3] AS decimals;              -- DECIMAL array
{{< /code-block >}}

### 요소 접근 {#element-access}

1부터 시작하는 첨자를 사용하여 개별 배열 요소에 접근합니다. 범위를 벗어난 인덱스에 접근하면 `NULL`이 반환됩니다.

{{< code-block lang="sql" >}}
SELECT ARRAY['a', 'b', 'c'][1];   -- Returns 'a'
SELECT ARRAY['a', 'b', 'c'][2];   -- Returns 'b'
SELECT ARRAY['a', 'b', 'c'][10];  -- Returns NULL (out of bounds)
{{< /code-block >}}

배열 열의 요소에 접근하려면 동일한 첨자 구문을 사용하세요.

{{< code-block lang="sql" >}}
SELECT recipients[1] AS first_recipient
FROM emails
{{< /code-block >}}

### 배열 함수 {#array-functions}

다음 함수는 배열에 대해 동작합니다.

| 함수 | 반환 유형 | 설명 |
|----------|-------------|-------------|
| `CARDINALITY(array a)` | `BIGINT` | 배열의 요소 수를 반환합니다. |
| `ARRAY_POSITION(array a, typeof_array value)` | `BIGINT` | 배열에서 `value`가 처음 나타나는 1부터 시작하는 위치를 반환하며, 찾지 못하면 `NULL`을 반환합니다. |
| `STRING_TO_ARRAY(string s, string delimiter)` | `VARCHAR[]` | 주어진 구분 기호를 기준으로 문자열을 문자열 배열로 분할합니다. |
| `ARRAY_TO_STRING(array a, string delimiter)` | `VARCHAR` | 주어진 구분 기호로 배열 요소를 문자열로 결합합니다. |
| `ARRAY_AGG(expression e)` | 입력 유형의 배열 | 여러 행의 값을 배열로 집계합니다. |
| `UNNEST(array a [, array b...])` | [, b...]의 행 | 하나 이상의 배열을 행 집합으로 확장합니다. `FROM`절에서만 유효합니다. |

{{% collapse-content title="예시" level="h3" %}}

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

## 함수 {#functions}

다음 SQL 함수를 지원합니다. 윈도우 함수에 대한 내용은 이 문서의 별도 [윈도우 함수](#window-functions) 섹션을 참조하세요.

| 함수                                         | 반환 유형                           | 설명                                                                                                                                                                                       |
|--------------------------------------------------|---------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `MIN(variable v)`                                | typeof v                              | 데이터 집합에서 가장 작은 값을 반환합니다.                                                                                                                                                      |
| `MAX(variable v)`                                | typeof v                              | 모든 입력 값 중 최대 값을 반환합니다.                                                                                                                                                |
| `COUNT(any a)`                                   | numeric                               | null이 아닌 입력 값의 개수를 반환합니다.                                                                                                                                             |
| `SUM(numeric n)`                                 | numeric                               | 모든 입력 값의 합계를 반환합니다.                                                                                                                                                    |
| `AVG(numeric n)`                                 | numeric                               | 모든 입력 값의 평균 값(산술 평균)을 반환합니다.                                                                                                                              |
| `BOOL_AND(boolean b)`                            | boolean                               | null이 아닌 모든 입력 값이 true인지 여부를 반환합니다.                                                                                                                                               |
| `BOOL_OR(boolean b)`                             | 불리언                               | null이 아닌 입력 값 중 하나라도 true인지 여부를 반환합니다.                                                                                                                                                 |
| `CEIL(numeric n)` / `CEILING(numeric n)`         | 숫자                               | 값을 가장 가까운 정수로 올림하여 반환합니다. `CEIL`과 `CEILING`은 별칭으로 지원됩니다.                                                                                         |
| `FLOOR(numeric n)`                               | 숫자                               | 값을 가장 가까운 정수로 내림하여 반환합니다.                                                                                                                                            |
| `ROUND(numeric n)`                               | 숫자                               | 값을 가장 가까운 정수로 반올림하여 반환합니다.                                                                                                                                                 |
| `POWER(numeric base, numeric exponent)`          | 숫자                               | 밑을 지수만큼 거듭제곱한 값을 반환합니다.                                                                                                                                        |
| `LOWER(string s)`                                | 문자열                                | 문자열을 소문자로 반환합니다.                                                                                                                                                                  |
| `UPPER(string s)`                                | 문자열                                | 문자열을 대문자로 반환합니다.                                                                                                                                                                  |
| `ABS(numeric n)`                                 | 숫자                               | 절대값을 반환합니다.                                                                                                                                                                       |
| `COALESCE(args a)`                               | null이 아닌 첫 번째 값의 유형 또는 null       | null이 아닌 첫 번째 값을 반환하며, 모두 null이면 null을 반환합니다.                                                                                                                                         |
| `CAST(value AS type)`                            | 유형                                  | 주어진 값을 지정된 데이터 유형으로 변환합니다.                                                                                                                                              |
| `LENGTH(string s)`                               | 정수                               | 문자열의 문자 수를 반환합니다.                                                                                                                                                   |
| `TRIM(string s)`                                 | 문자열                                | 문자열의 앞뒤 공백을 제거합니다.                                                                                                                                          |
| `REPLACE(string s, string from, string to)`      | 문자열                                | 문자열 내의 특정 부분 문자열을 다른 하위 문자열로 치환합니다.                                                                                                                       |
| `SUBSTRING(string s, int start, int length)`     | 문자열                                | 지정된 위치부터 지정된 길이만큼 하위 문자열을 추출합니다.                                                                                                      |
| `REVERSE(string s)`                              | 문자열                                | 문자열의 문자를 역순으로 반환합니다.                                                                                                                                               |
| `STRPOS(string s, string substring)`             | 정수                               | 주어진 문자열에서 하위 문자열이 처음 나타나는 위치를 반환하며, 일치하는 값이 없으면 0을 반환합니다.                                                                                                   |
| `SPLIT_PART(string s, string delimiter, integer index)` | 문자열                         | 주어진 구분 기호로 문자열을 분할하고, 1부터 시작하여 주어진 위치의 문자열을 반환합니다.                                                                                          |
| `EXTRACT(unit from timestamp/interval)`          | 숫자                               | 타임스탬프 또는 간격에서 날짜 또는 시간 필드의 일부(예: 연도 또는 월)를 추출합니다.                                                                                                     |
| `TO_TIMESTAMP(string timestamp, string format)`  | 타임스탬프                             | 주어진 형식에 따라 문자열을 타임스탬프로 변환합니다.                                                                                                                                   |
| `TO_TIMESTAMP(numeric epoch)`                    | 타임스탬프                             | UNIX epoch 타임스탬프(초 단위)를 타임스탬프로 변환합니다.                                                                                                                                      |
| `TO_CHAR(timestamp t, string format)`            | 문자열                                | 주어진 형식에 따라 타임스탬프를 문자열로 변환합니다.                                                                                                                                   |
| `DATE_BIN(interval stride, timestamp source, timestamp origin)` | 타임스탬프                             | 타임스탬프(소스)를 동일한 길이의 버킷(스트라이드)의 버킷에 정렬합니다. 소스를 포함하는 버킷의 시작점을 반환합니다. 이 값은 소스보다 작거나 같으면서 원점으로부터 스트라이드 길이의 배수만큼 떨어진 가장 큰 타임스탬프로 계산됩니다. |
| `DATE_TRUNC(string unit, timestamp t)`           | 타임스탬프                             | 제공된 단위에 따라 타임스탬프를 지정된 정밀도로 잘라냅니다.                                                                                                                        |
| `CURRENT_SETTING(string setting_name)`           | 문자열                                | 지정된 설정의 현재 값을 반환합니다. `dd.time_frame_start` 및 `dd.time_frame_end` 파라미터를 지원하며, 각각 전역 시간 범위의 시작과 종료 시점을 반환합니다. |
| `NOW()`                                          | 타임스탬프                             | 현재 쿼리의 시작 시점에서 현재 UTC 타임스탬프를 반환합니다.                                                                                                                              |
| `CARDINALITY(array a)`                           | 정수                                 | 배열의 요소 수를 반환합니다.                                                                                                                                                      |
| `ARRAY_POSITION(array a, typeof_array value)`    | 정수                                 | 배열에서 발견된 값이 처음 나타나는 위치를 반환하며, 값이 발견되지 않으면 null을 반환합니다.                                                                                         |
| `STRING_TO_ARRAY(string s, string delimiter)`    | 문자열 배열                      | 주어진 구분자를 사용하여 주어진 문자열을 문자열 배열로 분할합니다.                                                                                                                       |
| `ARRAY_TO_STRING(array a, string delimiter)`     | 문자열                                | 주어진 구분자로 요소를 연결하여 배열을 문자열로 변환합니다.                                                                                                                 |
| `ARRAY_AGG(expression e)`                        | 입력 유형의 배열                   | 모든 입력 값을 수집하여 배열을 생성합니다.                                                                                                                                              |
| `APPROX_PERCENTILE(double percentile) WITHIN GROUP (ORDER BY expression e)` | 표현식과 동일한 형식        | 근사 백분위수 값을 계산합니다. 백분위는 0.0과 1.0(포함) 사이여야 합니다. `WITHIN GROUP (ORDER BY ...)` 구문이 필요합니다.                                              |
| `UNNEST(array a [, array b...])`                 | [, b...]의 행                    | 배열을 행 집합으로 확장합니다. 이 형식은 FROM 절에서만 허용됩니다.                                                                                                                    |

{{% collapse-content title="예시" level="h3" %}}

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

지원되는 캐스트 대상 유형:
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

지원되는 추출 단위:
| 리터럴           | 입력 유형               | 설명                                  |
| ------------------| ------------------------ | -------------------------------------------- |
| `day`             | `timestamp` / `interval` | 월의 일                             |
| `dow`             | `timestamp`              | 요일 `1` (월요일)부터 `7` (일요일)까지 |
| `doy`             | `timestamp`              | 연중 일수(`1` - `366`)                |
| `epoch`           | `timestamp` / `interval` | 1970-01-01 00:00:00 UTC 이후의 초 수(타임스탬프용), 또는 총 초 수(간격용) |
| `hour`            | `timestamp` / `interval` | 시(`0` - `23`)                 |
| `minute`          | `timestamp` / `interval` | 분(`0` - `59`)              |
| `second`          | `timestamp` / `interval` | 초(`0` - `59`)            |
| `week`            | `timestamp`              | 연중 주(`1` - `53`)                |
| `month`           | `timestamp`              | 연중 월(`1` - `12`)               |
| `quarter`         | `timestamp`              | 연중 분기(`1` - `4`)              |
| `year`            | `timestamp`              | 연도                                         |
| `timezone_hour`   | `timestamp`              | 시간대 오프셋의 시                 |
| `timezone_minute` | `timestamp`              | 시간대 오프셋의 분               |

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

`TO_TIMESTAMP` 함수는 두 가지 형식을 지원합니다.

**형태 1: 지정된 형식으로 문자열을 타임스탬프로 변환**

지원되는 날짜/시간 서식 패턴:
| 패턴     | 설명                          |
| ----------- | ------------------------------------ |
| `YYYY`      | 연도(4자리)                      |
| `YY`        | 연도(2자리)                      |
| `MM`        | 월(01~12)               |
| `DD`        | 일(01~31)               |
| `HH24`      | 시(00~23)                |
| `HH12`      | 시(01~12)                |
| `HH`        | 시(01~12)                |
| `MI`        | 분(00~59)                     |
| `SS`        | 초(00~59)                     |
| `MS`        | 밀리초(000~999)              |
| `TZ`        | 시간대 약어               |
| `OF`        | UTC 기준 시간대 오프셋            |
| `AM` / `am` | 오전/오후 표시(마침표 없음) |
| `PM` / `pm` | 오전/오후 표시(마침표 없음) |

{{< code-block lang="sql" >}}
SELECT
  TO_TIMESTAMP('25/12/2025 04:23 pm', 'DD/MM/YYYY HH:MI am') AS ts
{{< /code-block >}}

**형식 2: UNIX epoch 타임스탬프를 타임스탬프로 변환**

{{< code-block lang="sql" >}}
SELECT
  TO_TIMESTAMP(1735142580) AS ts_from_epoch
{{< /code-block >}}

### `TO_CHAR` {#to-char}

지원되는 날짜/시간 서식 패턴:
| 패턴     | 설명                          |
| ----------- | ------------------------------------ |
| `YYYY`      | 연도(4자리)                      |
| `YY`        | 연도(2자리)                      |
| `MM`        | 월(01~12)               |
| `DD`        | 일(01~31)               |
| `HH24`      | 시(00~23)                |
| `HH12`      | 시(01~12)                |
| `HH`        | 시(01~12)                |
| `MI`        | 분(00~59)                     |
| `SS`        | 초(00~59)                     |
| `MS`        | 밀리초(000~999)              |
| `TZ`        | 시간대 약어               |
| `OF`        | UTC 기준 시간대 오프셋            |
| `AM` / `am` | 오전/오후 표시(마침표 없음) |
| `PM` / `pm` | 오전/오후 표시(마침표 없음) |

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

지원되는 잘림:
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

지원되는 설정 파라미터:
- `dd.time_frame_start`: 선택한 시간 범위의 시작을 RFC 3339 형식(`YYYY-MM-DD HH:mm:ss.sss±HH:mm`)으로 반환합니다.
- `dd.time_frame_end`: 선택한 시간 범위의 끝을 RFC 3339 형식(`YYYY-MM-DD HH:mm:ss.sss±HH:mm`)으로 반환합니다.

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

## 정규 표현식 {#regular-expressions}

### flavor {#flavor}

모든 정규 표현식 함수는 ICU(유니코드 국제화 구성 요소) flavor를 사용합니다.

- [메타문자][5]
- [연산자][6]
- [문자 집합 표현식][7]
- [패턴 내 플래그의 플래그 옵션][8]. 함수 수준 플래그에 대해서는 [아래 플래그 섹션](#function-level-flags)을 참조하세요.
- [찾기 및 치환(캡처 그룹 사용)][9]

### 함수 {#functions-1}

| 함수                                                                                                         | 반환 유형      | 설명                                                                                                                                                                                                                                                                |
|------------------------------------------------------------------------------------------------------------------|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `REGEXP_LIKE(string input, string pattern)`                                                                      | 부울          | 문자열이 정규 표현식 패턴과 일치하는지 평가합니다.                                                                                                                                                                                                           |
| `REGEXP_MATCH(string input, string pattern [, string flags ])`                                                   | 문자열 배열 | 문자열에서 첫 번째 패턴 일치의 하위 문자열을 반환합니다. <br><br> 이 함수는 주어진 패턴을 사용하여 입력 문자열을 검색하고 첫 번째 일치에서 캡처된 하위 문자열(캡처 그룹)을 반환합니다. 캡처 그룹이 없으면 전체 일치를 반환합니다. |
| `REGEXP_REPLACE(string input, string pattern, string replacement [, string flags ])`                             | 문자열           | 패턴에 대한 첫 번째 일치하는 하위 문자열을 대체하거나 [선택적 `g` 플래그](#function-level-flags)를 사용하면 모든 일치를 대체합니다.                                                                                                                              |
| `REGEXP_REPLACE (string input, string pattern, string replacement, integer start, integer N [, string flags ] )` | 문자열           | 패턴에 대한 N번째 일치하는 하위 문자열을 대체하거나 `N`이 0이면 `start`부터 시작하여 모든 일치를 대체합니다.                                                                                                                                                    |

{{% collapse-content title="예시" level="h3" %}}

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

### 함수 수준 플래그 {#function-level-flags}

다음 플래그를 [정규 표현식 함수](#regular-expressions)와 함께 사용할 수 있습니다.

`i`
: 대소문자 구분 없는 일치

`n` 또는 `m`
: 줄바꿈 민감한 일치

`g`
: 전역; 첫 번째 일치만이 아니라 _모든_ 일치하는 하위 문자열을 치환합니다.

{{% collapse-content title="예시" level="h3" %}}

### `i` 플래그 {#i-flag}

{{< code-block lang="sql" >}}
SELECT regexp_match('INFO', 'info')
-- NULL

SELECT regexp_match('INFO', 'info', 'i')
-- ['INFO']
{{< /code-block >}}

### `n` 플래그 {#n-flag}

{{< code-block lang="sql" >}}
SELECT regexp_match('a
b', '^b');
-- NULL

SELECT regexp_match('a
b', '^b', 'n');
-- ['b']
{{< /code-block >}}

### `g` 플래그 {#g-flag}

{{< code-block lang="sql" >}}
SELECT icu_regexp_replace('Request id=12345 completed, id=67890 pending', 'id=\d+', 'id=XXX');
-- Request id=XXX completed, id=67890 pending

SELECT regexp_replace('Request id=12345 completed, id=67890 pending', 'id=\d+', 'id=XXX', 'g');
-- Request id=XXX completed, id=XXX pending
{{< /code-block >}}

{{% /collapse-content %}}

## 윈도우 함수 {#window-functions}

다음 표는 지원되는 윈도우 함수에 대한 개요를 제공합니다. 자세한 내용과 예시는 [PostgreSQL 설명서][2]를 참조하세요.

| 함수                | 반환 유형       | 설명                                                            |
|-------------------------|-------------------|------------------------------------------------------------------------|
| `OVER`                  | 해당 없음               | 다른 윈도우 함수가 연산을 수행할, 행 집합에 대한 윈도우를 정의합니다. |
| `PARTITION BY`          | 해당 없음               | 결과 집합을 여러 파티션으로 나누며, 이는 특히 윈도우 함수를 적용하기 위한 것입니다. |
| `RANK()`                | 정수           | 파티션 내의 각 행에 순위를 부여하며, 동률이 있으면 순위 번호를 건너뜁니다.     |
| `ROW_NUMBER()`          | 정수           | 파티션 내의 각 행에 고유한 순차 번호를 부여합니다.     |
| `LEAD(column n)`        | 열의 유형     | 파티션 내 다음 행의 값을 반환합니다.                  |
| `LAG(column n)`         | 열의 유형     | 파티션 내 이전 행의 값을 반환합니다.              |
| `FIRST_VALUE(column n)` | 열의 유형     | 정렬된 값 집합에서 첫 번째 값을 반환합니다.                   |
| `LAST_VALUE(column n)`  | 열의 유형     | 정렬된 값 집합에서 마지막 값을 반환합니다.                    |
| `NTH_VALUE(column n, offset)`| 열의 유형 | 정렬된 값 집합에서 지정된 오프셋 위치의 값을 반환합니다. |


## JSON 함수 및 연산자 {#json-functions-and-operators}

| 이름                                          | 반환 유형  | 설명                                                                                                                                                                                                                                                                                                    |
|-----------------------------------------------|--------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| json_extract_path_text(text json, text path…) | text         | 경로에 의해 정의된 JSON 하위 객체를 텍스트로 추출합니다. 그 동작은 [동일한 이름의 Postgres 함수][3]와 동일합니다. 예를 들어, `json_extract_path_text(col, ‘forest')`는 `col`의 각 JSON 객체에서 `forest` 키의 값을 반환합니다. JSON 배열 구문에 대한 예시는 아래를 참조하세요. |
| json_extract_path(text json, text path…)      | JSON         | 와 동일한 기능을 가지지만, `json_extract_path_text`텍스트 유형 대신 JSON 유형의 열을 반환합니다.                                                                                                                                                                                                        |
| json_array_elements(text json)                | JSON 행 | JSON 배열을 행 집합으로 확장합니다. 이 형식은 FROM 절에서만 허용됩니다.                                                                                                                                                                                                                           |
| json_array_elements_text(text json)           | 텍스트 행 | JSON 배열을 행 집합으로 확장합니다. 이 형식은 FROM 절에서만 허용됩니다.                                                                                                                                                                                                                           |

## 네트워크 주소 함수 및 연산자 {#network-address-functions-and-operators}

`inet` 유형은 선택적 CIDR 접두사 길이(예: `192.168.1.5/24` 또는 `::1`)가 포함된 IPv4 및 IPv6 네트워크 주소를 나타냅니다. `inet` 값은 리터럴 구문 `INET 'value'`을 사용하거나 문자열을 `CAST(column AS inet)`로 캐스팅하여 생성합니다.

### 함수 {#functions-2}

| 함수 | 반환 유형 | 설명 |
|----------|-------------|-------------|
| `host(inet addr)` | `VARCHAR` | IP 주소를 접두사 길이 없이 텍스트로 반환합니다. |
| `network(inet addr)` | `INET` | 주소의 네트워크 부분을 호스트 비트를 0으로 설정하여 반환합니다. |
| `netmask(inet addr)` | `INET` | 주소의 네트워크 마스크를 반환합니다. |
| `masklen(inet addr)` | `BIGINT` | 네트워크 마스크의 접두사 길이를 반환합니다. |
| `broadcast(inet addr)` | `INET` | 네트워크의 브로드캐스트 주소를 반환합니다. |
| `family(inet addr)` | `BIGINT` | 주소 계열을 반환합니다. `4`는 IPv4, `6`는 IPv6입니다. |

### 연산자 {#operators}

| 연산자 | 반환 유형 | 설명 |
|----------|-------------|-------------|
| `inet a << inet b` | `BOOLEAN` | `a`가 `b`에 엄격하게 포함되어 있으면 `true`를 반환합니다. |
| `inet a <<= inet b` | `BOOLEAN` | `a`가 `b`에 포함되거나 동일하면 `true`를 반환합니다. |
| `inet a >> inet b` | `BOOLEAN` | `a`가 `b`를 엄격하게 포함하면 `true`를 반환합니다. |
| `inet a >>= inet b` | `BOOLEAN` | `a`가 `b`를 포함하거나 동일하면 `true`를 반환합니다. |
| `inet a && inet b` | `BOOLEAN` | `a`와 `b`의 서브넷이 겹치면 `true`를 반환합니다. |

{{% collapse-content title="예시" level="h3" %}}

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

### 포함 연산자 {#containment-operators}
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

### 결합 사용 {#combined-usage}
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

## 테이블 함수 {#table-functions}
테이블 함수는 로그, 메트릭, 클라우드 비용 및 기타 데이터 소스를 쿼리하는 데 사용됩니다.

<table style="width: 100%; table-layout: fixed;">
  <thead>
    <tr>
      <th style="width: 33%;">함수</th>
      <th style="width: 33%;">설명</th>
      <th style="width: 33%;">예시</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <pre>
dd.logs(
    columns => array < varchar >,
    filter ? => varchar,
    indexes ? => array < varchar >,
    storage ? => varchar,
    from_timestamp ? => timestamp,
    to_timestamp ? => timestamp
) AS (column_name type [, ...])</pre>
      </td>
      <td>로그 데이터를 테이블로 반환합니다. columns 파라미터는 추출할 로그 필드를 지정합니다. 중첩 필드는 점 표기법을 사용하여 접근하며, 핵심 필드가 아닌 경우 앞에 <code>@</code>를 붙여야 합니다. AS 절은 반환된 테이블의 스키마를 정의합니다. 선택 사항: 인덱스 또는 시간 범위로 필터링. 시간이 지정되지 않으면 DDSQL은 전역 시간 설정을 기본값으로 사용하며, DDSQL 편집기에서는 지난 1시간으로 설정됩니다. 선택 사항: 사용할 저장소 지정(예: <code>hot</code>, <code>flex_tier</code>). 지정하지 않으면 기본값은 핫 저장소입니다.</td>
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
    query varchar,
    reducer varchar [, from_timestamp timestamp, to_timestamp timestamp]
)</pre>
      </td>
      <td>메트릭 데이터를 스칼라 값으로 반환합니다. 이 함수는 메트릭 쿼리(선택적 그룹화 포함), 값 집계를 결정하는 리듀서(평균, 최대 등), 그리고 시간 범위를 정의하는 선택적 타임스탬프 파라미터(기본값은 1시간)를 인수로 받습니다.</td>
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
      <td>메트릭 데이터를 시계열로 반환합니다. 이 함수는 메트릭 쿼리(선택적 그룹화 포함)와 선택적 타임스탬프 파라미터(기본값 1시간)를 받아 시간 범위를 정의합니다. 단일 집계 값이 아닌 시간에 따른 데이터 포인트를 반환합니다.</td>
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
      <td>Cloud Cost Management<a href="/cloud_cost_management/"> 데이터를 스칼라 값으로 반환합니다.</a> 이 함수는 클라우드 비용 쿼리(선택적 그룹화 포함), 집계 리듀서(비용 데이터에는 <code>sum</code> 사용 권장, <code>avg</code>, <code>min</code>및 <code>max</code> 등의 다른 리듀서도 사용할 수 있으나 비용 쿼리에는 거의 적용되지 않음), 그리고 시간 범위를 정의하기 위한 선택적 타임스탬프 파라미터(기본값: 1시간)를 인수로 받습니다. <strong>참고</strong>: 클라우드 비용 데이터는 일반적으로 24~48시간 지연되므로 최근 타임스탬프는 결과를 반환하지 않을 수 있습니다.</td>
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
      <td>Cloud Cost Management<a href="/cloud_cost_management/"> 데이터를 시계열로 반환합니다.</a> 이 함수는 클라우드 비용 쿼리(선택적 그룹화 포함)와 선택적 타임스탬프 파라미터(기본값 1시간)를 받아 시간 범위를 정의합니다. 단일 집계 값이 아닌 시간에 따른 비용 데이터 포인트를 반환합니다. <strong>참고</strong>: 클라우드 비용 데이터는 일반적으로 24~48시간 지연되므로 최근 타임스탬프는 결과를 반환하지 않을 수 있습니다.</td>
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

{{% collapse-content title="예시" level="h3" %}}

### 절대 타임스탬프 {#absolute-timestamps}

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

### 상대 타임스탬프 {#relative-timestamps}

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

### 선택적 파라미터 {#optional-parameters}

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

### 중첩 필드 접근 {#nested-field-access}

열 별칭에는 점을 포함할 수 없으며, 별칭을 정의할 때는 점을 밑줄이나 다른 유효한 문자로 교체해야 합니다.

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

## 태그 {#tags}

DDSQL은 PostgreSQL에서 영감을 받은 `hstore` 유형으로 태그를 노출합니다. 특정 태그 키의 값은 PostgreSQL 화살표 연산자를 사용하여 접근할 수 있습니다. 예를 들면 다음과 같습니다.

```sql
SELECT instance_type, count(instance_type)
FROM aws.ec2_instance
WHERE tags->'region' = 'us-east-1' -- region is a tag, not a column
GROUP BY instance_type
```

태그는 각 키가 0개, 1개 또는 여러 개의 태그 값을 가질 수 있는 키-값 쌍입니다. 태그 값을 조회하면 해당 키에 연결된 _모든_ 값이 하나의 문자열로 반환됩니다. 데이터에 동일한 태그 키에 대해 여러 개의 태그 값이 있는 경우, 이 값은 정렬된 쉼표로 구분된 문자열로 표현됩니다. 예를 들면 다음과 같습니다.

```sql
SELECT tags->'team', instance_type, architecture, COUNT(*) as instance_count
FROM aws.ec2_instance
WHERE tags->'team' = 'compute_provisioning,database_ops'
GROUP BY tags->'team', instance_type, architecture
ORDER BY instance_count DESC
```

태그 값을 문자열 또는 전체 태그 집합으로 비교할 수도 있습니다.

```sql
SELECT *
FROM k8s.daemonsets da INNER JOIN k8s.deployments de
ON da.tags = de.tags -- for a specific tag: da.tags->'app' = de.tags->'app'
```

또한 태그 키와 값을 개별 텍스트 배열로 추출할 수 있습니다.

```sql
SELECT akeys(tags), avals(tags)
FROM aws.ec2_instance
```

### HSTORE 함수 및 연산자 {#hstore-functions-and-operators}

| 이름                                          | 반환 유형   | 설명                                                                                      |
|-----------------------------------------------|---------------|---------------------------------------------------------------------------------------------------
| tags -> 'text'                                  | 텍스트          | 주어진 키의 값을 가져옵니다. 키가 존재하지 않으면 `null`을 반환합니다.                             |
| akeys(hstore tags)                            | 텍스트 배열 | HSTORE의 키를 배열로 가져옵니다.                                                            |
| avals(hstore tags)                            | 텍스트 배열 | HSTORE의 값을 배열로 가져옵니다.                                                          |

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/notebooks/advanced_analysis
[2]: https://www.postgresql.org/docs/current/functions-window.html
[3]: https://www.postgresql.org/docs/current/functions-json.html
[4]: /ko/ddsql_editor/
[5]: https://unicode-org.github.io/icu/userguide/strings/regexp.html#regular-expression-metacharacters
[6]: https://unicode-org.github.io/icu/userguide/strings/regexp.html#regular-expression-operators
[7]: https://unicode-org.github.io/icu/userguide/strings/regexp.html#set-expressions-character-classes
[8]: https://unicode-org.github.io/icu/userguide/strings/regexp.html#flag-options
[9]: https://unicode-org.github.io/icu/userguide/strings/regexp.html#find-and-replace
[10]: /ko/bits_ai/mcp_server/