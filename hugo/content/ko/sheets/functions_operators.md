---
description: Sheets 계산 열 및 Sheet 수식에서 사용할 수 있는 함수와 연산자에 대한 참조 가이드로, 텍스트, 날짜, 논리, 수학,
  찾기, 통계 및 재무 작업을 포함합니다.
title: 함수 및 연산자
---
## 개요 {#overview}

Sheets의 함수와 연산자를 사용하여 데이터를 분석하고 변환합니다. 함수는 다음 두 가지 컨텍스트에서 사용할 수 있습니다.

- **표 계산 열**: 표의 개별 행 값을 변환하거나 보강하는 함수로, 열 수준에서 적용됩니다.
- **Sheets**: [Sheet][1] 탭에 직접 입력하는 함수로, 다른 Sheet나 표 탭을 참조할 수 있습니다(해당하는 경우).

## 연산자 {#operators}

| 연산자 | 이름                  | 예시 |
| -------  | --------------------- | ------- |
| `+`      | 덧셈              | `=A1+B1` |
| `-`      | 뺄셈           | `=A1-B1` |
| `*`      | 곱셈 | `=A1*B1` |
| `/`      | 나눗셈 | `=A1/B1` |
| `^`      | 거듭제곱 | `=2^10` |
| `&`      | 연결           | `="Hello "&A1` |
| `=`      | 같음 | `=A1=B1` |
| `<>`     | 같지 않음 | `=A1<>0` |
| `>`      | 보다 큼 | `=A1>100` |
| `<`      | 보다 작음 | `=A1<100` |
| `>=`     | 크거나 같음 | `=A1>=100` |
| `<=`     | 작거나 같음 | `=A1<=100` |

## 함수 {#functions}

### 텍스트 {#text}

`REGEXMATCH(text_string, regular_expression)`
: 텍스트 문자열이 정규식과 일치하는지 평가합니다. <br>**예시**: `REGEXMATCH("ABC 123 def", "\\\\d+") => TRUE` <br>**사용 가능**: 표, Sheet

`REGEXEXTRACT(text_string, regular_expression)`
: 지정된 정규식 패턴과 일치하는 첫 번째 하위 문자열을 추출합니다. <br>**예시**: `REGEXEXTRACT("ABC 123 def", "\\\\d+") => "123"` <br>**사용 가능**: 표, Sheet

`REGEXCOUNT(text_string, regular_expression)`
: 텍스트 문자열에서 정규식 패턴이 나타나는 횟수를 계산합니다. <br>**예시**: `REGEXCOUNT("abc 123 def", "\\\\d+") => 1` <br>**사용 가능**: 표, Sheet

`REGEXREPLACE(text_string, regular_expression, replacement)`
: 정규식과 일치하는 모든 하위 문자열을 대체 문자열로 바꿉니다. <br>**예시**: `REGEXREPLACE("abc 123 def", "\\\\d+", "NUM") => "abc NUM def"` <br>**사용 가능**: 표

`LEN(string)`
: 문자열의 길이를 반환합니다. <br>**예시**: `LEN("Hello World")` <br>**사용 가능**: 표, Sheet

`LOWER(string)`
: 문자열을 소문자로 반환합니다. <br>**예시**: `LOWER("HELLO WORLD")` <br>**사용 가능**: 표, Sheet

`UPPER(string)`
: 문자열을 대문자로 반환합니다. <br>**예시**: `UPPER("hello world")` <br>**사용 가능**: 표, Sheet

`LEFT(string, number_of_characters)`
: 지정된 문자열의 시작 부분부터 하위 문자열을 반환합니다. <br>**예시**: `LEFT("Datadog", 4)` <br>**사용 가능**: 표, Sheet

`RIGHT(string, number_of_characters)`
: 지정된 문자열의 끝 부분부터 하위 문자열을 반환합니다. <br>**예시**: `RIGHT("DATADOG", 3)` <br>**사용 가능**: 표, Sheet

`MID(text, start, length)`
: 텍스트 중간에서 문자를 반환합니다. <br>**예시**: `MID("Hello World", 7, 5) => "World"` <br>**사용 가능**: Sheet

`CONCATENATE(string1, string2, ...)`
: 문자열을 서로 연결합니다. 다음의 `&` 연산자와 동일합니다. <br>**예시**: `CONCATENATE("data", "dog")` <br>**사용 가능**: 표, Sheet

`CONTAINS(string, substring)`
: 문자열에 하위 문자열이 포함되어 있으면 TRUE를, 그렇지 않으면 FALSE를 반환합니다. <br>**예시**: `CONTAINS("is the word string in this sentence?", "string")` <br>**사용 가능**: 표, Sheet

`SUBSTITUTE(text, old_text, new_text, [instance_num])`
: old_text가 나타나는 모든 항목을 new_text로 대체합니다. instance_num이 생략되면 모든 발생 항목이 대체되며, 그렇지 않으면 지정된 항목만 대체됩니다. <br>**예시**: `SUBSTITUTE("hello world", "world", "Datadog") => "hello Datadog"` <br>**사용 가능**: 표, Sheet

`TEXTJOIN(delimiter, ignore_empty, text1, [text2, ...])`
: 지정된 구분 기호를 사용하여 여러 문자열의 텍스트를 결합합니다. <br>**예시**: `TEXTJOIN(" ", TRUE, "hello", "world")` <br>**사용 가능**: 표, Sheet

`FIND(search_for, text_to_search)`
: 텍스트 내에서 텍스트의 위치를 찾습니다(대소문자 구분). 찾을 수 없는 경우 오류를 반환합니다. <br>**예시**: `FIND("World", "Hello World") => 7` <br>**사용 가능**: Sheet

`CHAR(number)`
: 유니코드 문자 집합에 따라 숫자를 문자로 변환합니다. <br>**예시**: `CHAR(65) => "A"` <br>**사용 가능**: Sheet

`CLEAN(text)`
: 텍스트에서 인쇄할 수 없는 문자를 제거합니다. <br>**예시**: `CLEAN(A1)` <br>**사용 가능**: Sheet

`TEXT(number, format)`
: 형식 패턴을 사용하여 숫자를 텍스트로 서식 지정합니다. 숫자, 날짜 및 시간 서식 지정을 지원합니다. <br>**예시**: `TEXT(1234.5, "#,##0.00") => "1,234.50"` <br>**사용 가능**: Sheet

`TRIM(text)`
: 텍스트에서 앞, 뒤 및 추가 공백을 제거합니다. <br>**예시**: `TRIM("  hello  ") => "hello"` <br>**사용 가능**: Sheet

`VALUE(text)`
: 텍스트를 숫자로 변환합니다. <br>**예시**: `VALUE("123") => 123` <br>**사용 가능**: Sheet

### 논리 {#logical}

`IF(logical_expression, value_if_true, value_if_false)`
: 논리식이 TRUE이면 한 값을 반환하고 FALSE이면 다른 값을 반환합니다. <br>**예시**: `IF(42>9, "all good", "something is wrong in the matrix")` <br>**사용 가능**: 표, Sheet

`IFS(logical_test1, value_if_true1, [logical_test2, value_if_true2], …)`
: 하나 이상의 조건/값 쌍을 평가하고 첫 번째 참인 조건에 대한 값을 반환합니다. 기본값을 정의하려면 마지막 조건으로 TRUE를 사용합니다. <br>**예시**: `IFS(A1>90, "A", A1>80, "B", TRUE, "C")` <br>**사용 가능**: 표, Sheet

`AND(logical_expression1, [logical_expression2, …])`
: 제공된 모든 인수가 논리적으로 참이면 참을 반환하고, 제공된 인수 중 하나라도 논리적으로 거짓이면 거짓을 반환합니다. <br>**예시**: `AND(A1=1, A2=2)` <br>**사용 가능**: 표, Sheet

`OR(logical_expression1, [logical_expression2, …])`
: 제공된 인수 중 하나라도 논리적으로 참이면 참을 반환하고, 제공된 모든 인수가 논리적으로 거짓이면 거짓을 반환합니다. <br>**예시**: `OR(A1=1, A2=2)` <br>**사용 가능**: 표, Sheet

`NOT(logical_expression)`
: 논리값의 반대값을 반환합니다. <br>**예시**: `NOT(TRUE)` <br>**사용 가능**: 표, Sheet

`TRUE()`
: 논리값 TRUE를 반환합니다. <br>**예시**: `TRUE()` <br>**사용 가능**: 표, Sheet

`FALSE()`
: 논리값 FALSE를 반환합니다. <br>**예시**: `FALSE()` <br>**사용 가능**: 표, Sheet

`IFERROR(value, value_if_error)`
: 수식이 오류로 평가되는 경우 지정된 값을 반환하고, 그렇지 않으면 수식의 결과를 반환합니다. <br>**예시**: `IFERROR(1/0, "Division Error")` <br>**사용 가능**: Sheet

`IFNA(value, value_if_na)`
: 수식이 #N/A로 평가되는 경우 지정된 값을 반환하고, 그렇지 않으면 수식의 결과를 반환합니다. <br>**예시**: `IFNA(VLOOKUP("x", A1:B10, 2, FALSE), "Not found")` <br>**사용 가능**: Sheet

`SWITCH(expression, case1, value1, ..., [default])`
: 표현식을 케이스와 비교하여 해당하는 값을 반환합니다. <br>**예시**: `SWITCH(A1, 1, "One", 2, "Two", "Other")` <br>**사용 가능**: Sheet

`XOR(logical_expression1, [logical_expression2, …])`
: 홀수 개의 인수가 TRUE이면 TRUE를 반환합니다. <br>**예시**: `XOR(TRUE, FALSE)` <br>**사용 가능**: Sheet

### 수학 {#math}

`ABS(number)`
: 숫자의 절댓값을 반환합니다. <br>**예시**: `ABS(26.34)` <br>**사용 가능**: 표, Sheet

`CEILING(number, factor)`
: 숫자를 지정된 인수의 가장 가까운 정수로 반올림합니다. <br>**예시**: `CEILING(826.645, 10)` <br>**사용 가능**: 표, Sheet

`FLOOR(number, factor)`
: 숫자를 지정된 인수의 가장 가까운 정수로 반내림합니다. <br>**예시**: `FLOOR(826.645, 10)` <br>**사용 가능**: 표, Sheet

`MOD(number1, number2)`
: 나눗셈 연산 후의 나머지인 모듈로 연산자의 결과를 반환합니다. <br>**예시**: `MOD(5, 2)` <br>**사용 가능**: 표, Sheet

`POWER(number, power)`
: 거듭제곱한 숫자를 반환합니다. <br>**예시**: `POWER(2, 3)` <br>**사용 가능**: 표, Sheet

`ROUND(number, places)`
: 숫자를 특정 소수점 자릿수로 반올림합니다. <br>**예시**: `ROUND(826.645, 1)` <br>**사용 가능**: 표, Sheet

`COUNT(value1, [value2, ...])`
: 범위 내에서 숫자 값의 개수를 셉니다. <br>**예시**: `COUNT(A1:A10)` <br>**사용 가능**: Sheet

`COUNTA(value1, [value2, ...])`
: 범위 내에서 비어 있지 않은 값의 개수를 셉니다. <br>**예시**: `COUNTA('Logs'#"service")` <br>**사용 가능**: Sheet

`COUNTBLANK(range)`
: 범위 내에서 빈 셀의 개수를 셉니다. <br>**예시**: `COUNTBLANK(A1:A10)` <br>**사용 가능**: Sheet

`COUNTIF(range, criteria)`
: 범위 내에서 지정된 조건을 충족하는 셀의 개수를 셉니다. <br>**예시**: `COUNTIF('Logs'#"status", "error")` <br>**사용 가능**: Sheet

`COUNTIFS(range1, criteria1, [range2, criteria2, ...])`
: 범위 내에서 여러 조건을 충족하는 셀의 개수를 셉니다. <br>**예시**: `COUNTIFS('Logs'#"status", "error", 'Logs'#"env", "prod")` <br>**사용 가능**: Sheet

`COUNTUNIQUE(value1, [value2, ...])`
: 범위 내에서 고유한 값의 개수를 셉니다. <br>**예시**: `COUNTUNIQUE('Logs'#"service")` <br>**사용 가능**: Sheet

`MAX(value1, [value2, ...])`
: 값 집합에서 가장 큰 수를 반환합니다. <br>**예시**: `MAX('APM'#"duration")` <br>**사용 가능**: Sheet

`MAXIFS(max_range, range1, criteria1, ...)`
: 범위 내에서 여러 조건을 충족하는 최댓값을 반환합니다. <br>**예시**: `MAXIFS('APM'#"duration", 'APM'#"env", "prod")` <br>**사용 가능**: Sheet

`MIN(value1, [value2, ...])`
: 값 집합에서 가장 작은 수를 반환합니다. <br>**예시**: `MIN('APM'#"duration")` <br>**사용 가능**: Sheet

`MINIFS(min_range, range1, criteria1, ...)`
: 범위 내에서 여러 조건을 충족하는 최솟값을 반환합니다. <br>**예시**: `MINIFS('APM'#"duration", 'APM'#"env", "prod")` <br>**사용 가능**: Sheet

`PI()`
: π 값을 소수점 이하 15자리까지 반환합니다. <br>**예시**: `PI()` <br>**사용 가능**: Sheet

`RAND()`
: 0과 1 사이의 난수를 반환합니다. <br>**예시**: `RAND()` <br>**사용 가능**: Sheet

`SQRT(number)`
: 숫자의 양의 제곱근을 반환합니다. <br>**예시**: `SQRT(16) => 4` <br>**사용 가능**: Sheet

`SUM(value1, [value2, ...])`
: 일련의 숫자 및/또는 셀의 합계를 반환합니다. <br>**예시**: `SUM('Cloud Cost'#"cost")` <br>**사용 가능**: Sheet

`SUMIF(range, criteria, sum_range)`
: 지정한 조건을 충족하는 범위 내의 값을 더합니다. <br>**예시**: `SUMIF('Cloud Cost'#"service", "ec2", 'Cloud Cost'#"cost")` <br>**사용 가능**: Sheet

`SUMIFS(sum_range, range1, criteria1, ...)`
: 지정한 여러 조건을 충족하는 범위 내의 값을 더합니다. <br>**예시**: `SUMIFS('Cloud Cost'#"cost", 'Cloud Cost'#"service", "ec2", 'Cloud Cost'#"env", "prod")` <br>**사용 가능**: Sheet

### 날짜 및 시간 {#date-and-time}

`DATE(year, month, day)`
: 제공된 연, 월, 일을 날짜로 변환합니다. <br>**예시**: `DATE(2021, 10, 31)` <br>**사용 가능**: 표, Sheet

`DATEDIF(start_date, end_date, unit)`
: 두 날짜 사이의 일수, 월수 또는 연수를 계산합니다. <br>**예시**: `DATEDIF("10/17/1979", "8/22/2019", "Y") => 39` <br>**사용 가능**: 표, Sheet

`TODAY()`
: 현재 날짜를 반환합니다. <br>**예시**: `TODAY()` <br>**사용 가능**: Sheet

`NOW()`
: 현재 날짜와 시간을 반환합니다. <br>**예시**: `NOW()` <br>**사용 가능**: 표, Sheet

`TIME(hour, minute, second)`
: 제공된 시, 분, 초를 시간으로 변환합니다. <br>**예시**: `TIME(11, 40, 59)` <br>**사용 가능**: Sheet

`YEAR(date)`
: 날짜 값에서 연도 구성 요소를 추출합니다. <br>**예시**: `YEAR(DATE(2025, 12, 31))` <br>**사용 가능**: 표, Sheet

`MONTH(date)`
: 날짜 값에서 월 구성 요소를 추출합니다. <br>**예시**: `MONTH("2023-07-15")` <br>**사용 가능**: 표, Sheet

`DAY(date)`
: 날짜 값에서 일 구성 요소를 추출합니다. <br>**예시**: `DAY(DATE(2023, 12, 25))` <br>**사용 가능**: 표, Sheet

`HOUR(datetime)`
: 날짜/시간 값에서 시간 구성 요소(0~23)를 추출합니다. <br>**예시**: `HOUR("14:30:45")` <br>**사용 가능**: 표, Sheet

`MINUTE(datetime)`
: 날짜/시간 값에서 분 구성 요소(0~59)를 추출합니다. <br>**예시**: `MINUTE("14:30:45")` <br>**사용 가능**: 표, Sheet

`SECOND(datetime)`
: 날짜/시간 값에서 초 구성 요소(0~59)를 추출합니다. <br>**예시**: `SECOND("14:30:45")` <br>**사용 가능**: 표, Sheet

`DATEVALUE(date_string)`
: 날짜 문자열을 날짜 값으로 변환합니다. <br>**예시**: `DATEVALUE("07/23/2024")` <br>**사용 가능**: 표, Sheet

`EPOCHTODATE(timestamp, [unit])`
: Unix epoch 타임스탬프를 날짜로 변환합니다. `unit`은 기본적으로 `1`(초)입니다. 밀리초의 경우 `2`를 사용하고, 마이크로초의 경우 `3`을 사용하세요. <br>**예시**: `EPOCHTODATE(#"Timestamp", 2)` <br>**사용 가능**: 표, Sheet

`EDATE(start_date, months)`
: 시작 날짜 전후의 지정된 개월 수만큼 차이가 나는 날짜를 반환합니다. <br>**예시**: `EDATE("2023-01-15", 6)` <br>**사용 가능**: Sheet

`EOMONTH(start_date, months)`
: 주어진 날짜 전후의 지정된 개월 수만큼 차이가 나는 달의 마지막 날짜를 반환합니다. <br>**예시**: `EOMONTH(DATE(2023, 12, 12), 0)` <br>**사용 가능**: Sheet

`WEEKDAY(date, [type])`
: 요일을 숫자로 반환합니다. 유형 1(기본값) = 일~토(1~7), 유형 2 = 월~일(1~7), 유형 3 = 월~일(0~6). <br>**예시**: `WEEKDAY(DATE(2023, 12, 12))` <br>**사용 가능**: 표, Sheet

`WEEKNUM(date, [type])`
: 연도 내 특정 날짜의 주간 번호를 반환합니다. <br>**예시**: `WEEKNUM("2023-01-15")` <br>**사용 가능**: 표, Sheet

### 찾기 및 참조 {#lookup-and-reference}

`VLOOKUP(search_key, range, index, [is_sorted])`
: 범위의 첫 번째 열에서 값을 검색하여 지정된 열의 같은 행에 있는 값을 반환합니다. <br>**예시**: `VLOOKUP("Apple", A1:C10, 2, FALSE)` <br>**사용 가능**: Sheet

`HLOOKUP(search_key, range, index, [is_sorted])`
: 범위의 첫 번째 행에서 값을 검색하여 지정된 행의 같은 열에 있는 값을 반환합니다. <br>**예시**: `HLOOKUP("Apple", A1:D3, 2, FALSE)` <br>**사용 가능**: Sheet

`INDEX(reference, row, [column])`
: 행 및 열 번호를 기준으로 표의 요소 값을 반환합니다. <br>**예시**: `INDEX(A1:D3, 2, 3)` <br>**사용 가능**: Sheet

`MATCH(search_key, range, [search_type])`
: 배열에서 지정된 값과 일치하는 항목의 상대적 위치를 반환합니다. <br>**예시**: `MATCH("Apple", A1:A4, 0)` <br>**사용 가능**: Sheet

`CHOOSE(index, value1, value2, ...)`
: 인덱스를 기준으로 나열된 목록에서 값을 반환합니다. <br>**예시**: `CHOOSE(2, "A", "B", "C")` <br>**사용 가능**: Sheet

`ROW([reference])`
: 참조의 행 번호를 반환합니다. <br>**예시**: `ROW(A5) => 5` <br>**사용 가능**: Sheet

`COLUMN([reference])`
: 참조의 열 번호를 반환합니다. <br>**예시**: `COLUMN(C1) => 3` <br>**사용 가능**: Sheet

### 통계 {#statistical}

`AVERAGE(value1, [value2, ...])`
: 텍스트를 무시하고 데이터 집합의 수치 평균값을 반환합니다. <br>**예시**: `AVERAGE('APM'#"duration")` <br>**사용 가능**: Sheet

`AVERAGEIF(range, criteria, [average_range])`
: 지정된 조건을 충족하는 셀의 평균을 반환합니다. <br>**예시**: `AVERAGEIF('APM'#"env", "prod", 'APM'#"duration")` <br>**사용 가능**: Sheet

`AVERAGEIFS(average_range, range1, criteria1, ...)`
: 여러 조건을 충족하는 셀의 평균을 반환합니다. <br>**예시**: `AVERAGEIFS('APM'#"duration", 'APM'#"env", "prod", 'APM'#"service", "web")` <br>**사용 가능**: Sheet

`MEDIAN(value1, [value2, ...])`
: 데이터 집합의 중앙값(중간 값)을 반환합니다. 데이터 집합의 값 개수가 짝수이면, 중간에 있는 두 값의 평균을 반환합니다. <br>**예시**: `MEDIAN('APM'#"duration")` <br>**사용 가능**: Sheet

`MODE(value1, [value2, ...])`
: 데이터 집합에서 가장 자주 발생하는 값을 반환합니다. <br>**예시**: `MODE('Logs'#"status_code")` <br>**사용 가능**: Sheet

`PERCENTILE(data, percentile)`
: 선형 보간법을 사용하여 데이터 집합의 지정된 백분위수 값을 반환합니다. <br>**예시**: `PERCENTILE('APM'#"duration", 0.95)` <br>**사용 가능**: Sheet

`STDEV(value1, [value2, ...])`
: 표본 데이터 집합의 표준 편차를 계산합니다. <br>**예시**: `STDEV('APM'#"duration")` <br>**사용 가능**: Sheet

`VAR(value1, [value2, ...])`
: 데이터 집합의 표본 분산을 계산합니다. <br>**예시**: `VAR('APM'#"duration")` <br>**사용 가능**: Sheet

`FORECAST(x, data_y, data_x)`
: 기존 값과 선형 회귀를 사용하여 미래 값을 예측합니다. <br>**예시**: `FORECAST(5, {1,2,3,4}, {10,20,30,40})` <br>**사용 가능**: Sheet

`SUMPRODUCT(array1, [array2, ...])`
: 배열의 해당 요소를 곱하고 그 곱의 합계를 반환합니다. <br>**예시**: `SUMPRODUCT({1,2,3}, {4,5,6}) => 32` <br>**사용 가능**: Sheet

### 재무 {#financial}

`PMT(rate, number_of_periods, present_value, [future_value], [end_or_beginning])`
: 일정한 지급액과 일정한 이자율을 기준으로 대출 상환금을 계산합니다. <br>**예시**: `PMT(0.05/12, 60, 20000)` <br>**사용 가능**: Sheet

`PV(rate, number_of_periods, payment_amount, [future_value], [end_or_beginning])`
: 투자의 현재 가치를 계산합니다. <br>**예시**: `PV(0.05/12, 60, -377.42)` <br>**사용 가능**: 시트

`FV(rate, number_of_periods, payment_amount, [present_value], [end_or_beginning])`
: 정기적이고 일정한 지급액과 일정한 이자율을 기준으로 투자의 미래 가치를 계산합니다. <br>**예시**: `FV(0.06/12, 240, -500)` <br>**사용 가능**: Sheet

`NPV(discount, cashflow1, [cashflow2, ...])`
: 할인율과 일련의 미래 현금 흐름을 기준으로 투자의 순현재가치를 계산합니다. <br>**예시**: `NPV(0.10, -50000, 8000, 9200, 10400)` <br>**사용 가능 위치**: Sheet

`IRR(cashflow_amounts, [rate_guess])`
: 일련의 현금 흐름에 대한 내부 수익률을 계산합니다. <br>**예시**: `IRR({-50000, 8000, 9200, 10400, 11600, 12800})` <br>**사용 가능 위치**: Sheet

`NPER(rate, payment_amount, present_value, [future_value], [end_or_beginning])`
: 투자 또는 대출의 기간 수를 계산합니다. <br>**예시**: `NPER(0.05/12, -377.42, 20000)` <br>**사용 가능 위치**: Sheet

`RATE(number_of_periods, payment_amount, present_value, [future_value], [end_or_beginning], [guess])`
: 연금의 기간별 이자율을 계산합니다. <br>**예시**: `RATE(48, -200, 8000)` <br>**사용 가능**: Sheet

`RRI(number_of_periods, present_value, future_value)`
: 투자의 성장에 대한 등가 이자율을 계산합니다. <br>**예시**: `RRI(10, 100, 200)` <br>**사용 가능**: Sheet

### Info {#info}

`ISBLANK(value)`
: 셀이 비어 있는지 테스트합니다. <br>**예시**: `ISBLANK(A1)` <br>**사용 가능**: Sheet

`ISNUMBER(value)`
: 값이 숫자인지 테스트합니다. <br>**예시**: `ISNUMBER(123)` <br>**사용 가능**: Sheet

`TYPE(value)`
: 값의 데이터 유형을 숫자로 반환합니다(1 = 숫자, 2 = 텍스트, 4 = 논리값, 16 = 오류). <br>**예시**: `TYPE(123) => 1` <br>**사용 가능**: Sheet

[1]: /ko/sheets/#sheet-preview