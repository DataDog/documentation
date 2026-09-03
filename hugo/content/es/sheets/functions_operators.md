---
description: Guía de referencia para funciones y operadores disponibles en columnas
  calculadas y fórmulas de Sheets, incluyendo operaciones de texto, fecha, lógicas,
  matemáticas, de búsqueda, estadísticas y financieras.
title: Funciones y operadores
---
## Descripción general {#overview}

Utilice funciones y operadores en Sheets para analizar y transformar sus datos. Las funciones están disponibles en dos contextos:

- **Columnas calculadas de tabla**: Funciones que transforman o enriquecen valores de filas individuales en una tabla, aplicadas a nivel de columna.
- **Sheets**: Funciones ingresadas directamente en una pestaña de [hoja][1], lo que le permite hacer referencia a otras pestañas de hoja o tabla (cuando corresponda).

## Operadores {#operators}

| Operador | Nombre                  | Ejemplo |
| -------  | --------------------- | ------- |
| `+`      | Suma              | `=A1+B1` |
| `-`      | Resta           | `=A1-B1` |
| `*`      | Multiplicación        | `=A1*B1` |
| `/`      | División              | `=A1/B1` |
| `^`      | Potencia                 | `=2^10` |
| `&`      | Concatenar           | `="Hello "&A1` |
| `=`      | Igual                 | `=A1=B1` |
| `<>`     | No es igual             | `=A1<>0` |
| `>`      | Mayor que          | `=A1>100` |
| `<`      | Menor que             | `=A1<100` |
| `>=`     | Mayor o igual que | `=A1>=100` |
| `<=`     | Menor o igual que    | `=A1<=100` |

## Funciones {#functions}

### Texto {#text}

`REGEXMATCH(text_string, regular_expression)`
: Evalúa si una cadena de texto coincide con una expresión regular. <br>**Ejemplo**: `REGEXMATCH("ABC 123 def", "\\\\d+") => TRUE` <br>**Disponible en**: Tabla, Hoja

`REGEXEXTRACT(text_string, regular_expression)`
: Extrae la primera subcadena que coincide con un patrón de expresión regular especificado. <br>**Ejemplo**: `REGEXEXTRACT("ABC 123 def", "\\\\d+") => "123"` <br>**Disponible en**: Tabla, Hoja

`REGEXCOUNT(text_string, regular_expression)`
: Cuenta el número de veces que un patrón de expresión regular aparece en una cadena de texto. <br>**Ejemplo**: `REGEXCOUNT("abc 123 def", "\\\\d+") => 1` <br>**Disponible en**: Tabla, Hoja

`REGEXREPLACE(text_string, regular_expression, replacement)`
: Reemplaza todas las subcadenas que coinciden con una expresión regular por una cadena de reemplazo. <br>**Ejemplo**: `REGEXREPLACE("abc 123 def", "\\\\d+", "NUM") => "abc NUM def"` <br>**Disponible en**: Tabla

`LEN(string)`
: Devuelve la longitud de una cadena. <br>**Ejemplo**: `LEN("Hello World")` <br>**Disponible en**: Tabla, Hoja

`LOWER(string)`
: Devuelve la cadena en minúsculas. <br>**Ejemplo**: `LOWER("HELLO WORLD")` <br>**Disponible en**: Tabla, Hoja

`UPPER(string)`
: Devuelve la cadena en mayúsculas. <br>**Ejemplo**: `UPPER("hello world")` <br>**Disponible en**: Tabla, Hoja

`LEFT(string, number_of_characters)`
: Devuelve una subcadena desde el principio de una cadena especificada. <br>**Ejemplo**: `LEFT("Datadog", 4)` <br>**Disponible en**: Tabla, Hoja

`RIGHT(string, number_of_characters)`
: Devuelve una subcadena desde el final de una cadena especificada. <br>**Ejemplo**: `RIGHT("DATADOG", 3)` <br>**Disponible en**: Tabla, Hoja

`MID(text, start, length)`
: Devuelve caracteres de la parte central de un texto. <br>**Ejemplo**: `MID("Hello World", 7, 5) => "World"` <br>**Disponible en**: Hoja

`CONCATENATE(string1, string2, ...)`
: Concatena cadenas entre sí. Equivalente al operador `&`. <br>**Ejemplo**: `CONCATENATE("data", "dog")` <br>**Disponible en**: Tabla, Hoja

`CONTAINS(string, substring)`
: Devuelve VERDADERO si la cadena contiene la subcadena, FALSO en caso contrario. <br>**Ejemplo**: `CONTAINS("is the word string in this sentence?", "string")` <br>**Disponible en**: Tabla, Hoja

`SUBSTITUTE(text, old_text, new_text, [instance_num])`
: Reemplaza las apariciones de old_text con new_text. Si se omite instance_num, se reemplazan todas las apariciones; de lo contrario, solo se reemplaza la instancia especificada. <br>**Ejemplo**: `SUBSTITUTE("hello world", "world", "Datadog") => "hello Datadog"` <br>**Disponible en**: Tabla, Hoja

`TEXTJOIN(delimiter, ignore_empty, text1, [text2, ...])`
: Combina el texto de varias cadenas con el delimitador especificado. <br>**Ejemplo**: `TEXTJOIN(" ", TRUE, "hello", "world")` <br>**Disponible en**: Tabla, Hoja

`FIND(search_for, text_to_search)`
: Busca la posición de un texto dentro de otro (distingue entre mayúsculas y minúsculas). Devuelve un error si no se encuentra. <br>**Ejemplo**: `FIND("World", "Hello World") => 7` <br>**Disponible en**: Hoja

`CHAR(number)`
: Convierte un número en un carácter según el conjunto de caracteres Unicode. <br>**Ejemplo**: `CHAR(65) => "A"` <br>**Disponible en**: Hoja

`CLEAN(text)`
: Elimina los caracteres no imprimibles del texto. <br>**Ejemplo**: `CLEAN(A1)` <br>**Disponible en**: Hoja

`TEXT(number, format)`
: Formatea un número como texto usando un patrón de formato. Admite formato de número, fecha y hora. <br>**Ejemplo**: `TEXT(1234.5, "#,##0.00") => "1,234.50"` <br>**Disponible en**: Hoja

`TRIM(text)`
: Elimina los espacios iniciales, finales y adicionales del texto. <br>**Ejemplo**: `TRIM("  hello  ") => "hello"` <br>**Disponible en**: Hoja

`VALUE(text)`
: Convierte texto en un número. <br>**Ejemplo**: `VALUE("123") => 123` <br>**Disponible en**: Hoja

### Lógico {#logical}

`IF(logical_expression, value_if_true, value_if_false)`
: Devuelve un valor si una expresión lógica es VERDADERA y otro si es FALSA. <br>**Ejemplo**: `IF(42>9, "all good", "something is wrong in the matrix")` <br>**Disponible en**: Tabla, Hoja

`IFS(logical_test1, value_if_true1, [logical_test2, value_if_true2], …)`
: Evalúa uno o más pares de condición/valor y devuelve el valor de la primera condición verdadera. Usa VERDADERO como la condición final para definir un valor predeterminado. <br>**Ejemplo**: `IFS(A1>90, "A", A1>80, "B", TRUE, "C")` <br>**Disponible en**: Tabla, Hoja

`AND(logical_expression1, [logical_expression2, …])`
: Devuelve verdadero si todos los argumentos proporcionados son lógicamente verdaderos, y falso si alguno de los argumentos proporcionados es lógicamente falso. <br>**Ejemplo**: `AND(A1=1, A2=2)` <br>**Disponible en**: Tabla, Hoja

`OR(logical_expression1, [logical_expression2, …])`
: Devuelve verdadero si alguno de los argumentos proporcionados es lógicamente verdadero, y falso si todos los argumentos proporcionados son lógicamente falsos. <br>**Ejemplo**: `OR(A1=1, A2=2)` <br>**Disponible en**: Tabla, Hoja

`NOT(logical_expression)`
: Devuelve lo opuesto a un valor lógico. <br>**Ejemplo**: `NOT(TRUE)` <br>**Disponible en**: Tabla, Hoja

`TRUE()`
: Devuelve el valor lógico VERDADERO. <br>**Ejemplo**: `TRUE()` <br>**Disponible en**: Tabla, Hoja

`FALSE()`
: Devuelve el valor lógico FALSO. <br>**Ejemplo**: `FALSE()` <br>**Disponible en**: Tabla, Hoja

`IFERROR(value, value_if_error)`
: Devuelve un valor especificado si una fórmula se evalúa como un error; de lo contrario, devuelve el resultado de la fórmula. <br>**Ejemplo**: `IFERROR(1/0, "Division Error")` <br>**Disponible en**: Hoja

`IFNA(value, value_if_na)`
: Devuelve un valor especificado si una fórmula se evalúa como #N/A; de lo contrario, devuelve el resultado de la fórmula. <br>**Ejemplo**: `IFNA(VLOOKUP("x", A1:B10, 2, FALSE), "Not found")` <br>**Disponible en**: Hoja

`SWITCH(expression, case1, value1, ..., [default])`
: Compara una expresión con incidencias y devuelve el valor correspondiente. <br>**Ejemplo**: `SWITCH(A1, 1, "One", 2, "Two", "Other")` <br>**Disponible en**: Hoja

`XOR(logical_expression1, [logical_expression2, …])`
: Devuelve VERDADERO si un número impar de argumentos son VERDADERO. <br>**Ejemplo**: `XOR(TRUE, FALSE)` <br>**Disponible en**: Hoja

### Matemáticas {#math}

`ABS(number)`
: Devuelve el valor absoluto de un número. <br>**Ejemplo**: `ABS(26.34)` <br>**Disponible en**: Tabla, Hoja

`CEILING(number, factor)`
: Redondea un número hacia arriba hasta el múltiplo entero más cercano del factor especificado. <br>**Ejemplo**: `CEILING(826.645, 10)` <br>**Disponible en**: Tabla, Hoja

`FLOOR(number, factor)`
: Redondea un número hacia abajo hasta el múltiplo entero más cercano del factor especificado. <br>**Ejemplo**: `FLOOR(826.645, 10)` <br>**Disponible en**: Tabla, Hoja

`MOD(number1, number2)`
: Devuelve el resultado del operador módulo, el resto después de una operación de división. <br>**Ejemplo**: `MOD(5, 2)` <br>**Disponible en**: Tabla, Hoja

`POWER(number, power)`
: Devuelve un número elevado a una potencia. <br>**Ejemplo**: `POWER(2, 3)` <br>**Disponible en**: Tabla, Hoja

`ROUND(number, places)`
: Redondea un número a una cantidad determinada de decimales. <br>**Ejemplo**: `ROUND(826.645, 1)` <br>**Disponible en**: Tabla, Hoja

`COUNT(value1, [value2, ...])`
: Cuenta la cantidad de valores numéricos en un rango. <br>**Ejemplo**: `COUNT(A1:A10)` <br>**Disponible en**: Hoja

`COUNTA(value1, [value2, ...])`
: Cuenta la cantidad de valores que no están vacíos en un rango. <br>**Ejemplo**: `COUNTA('Logs'#"service")` <br>**Disponible en**: Hoja

`COUNTBLANK(range)`
: Cuenta la cantidad de celdas vacías en un rango. <br>**Ejemplo**: `COUNTBLANK(A1:A10)` <br>**Disponible en**: Hoja

`COUNTIF(range, criteria)`
: Cuenta la cantidad de celdas en un rango que cumplen con un criterio especificado. <br>**Ejemplo**: `COUNTIF('Logs'#"status", "error")` <br>**Disponible en**: Hoja

`COUNTIFS(range1, criteria1, [range2, criteria2, ...])`
: Cuenta la cantidad de celdas en un rango que cumplen con múltiples criterios. <br>**Ejemplo**: `COUNTIFS('Logs'#"status", "error", 'Logs'#"env", "prod")` <br>**Disponible en**: Hoja

`COUNTUNIQUE(value1, [value2, ...])`
: Cuenta la cantidad de valores únicos en un rango. <br>**Ejemplo**: `COUNTUNIQUE('Logs'#"service")` <br>**Disponible en**: Hoja

`MAX(value1, [value2, ...])`
: Devuelve el número más grande de un conjunto de valores. <br>**Ejemplo**: `MAX('APM'#"duration")` <br>**Disponible en**: Hoja

`MAXIFS(max_range, range1, criteria1, ...)`
: Devuelve el valor máximo en un rango que cumple con varios criterios. <br>**Ejemplo**: `MAXIFS('APM'#"duration", 'APM'#"env", "prod")` <br>**Disponible en**: Hoja

`MIN(value1, [value2, ...])`
: Devuelve el número más pequeño de un conjunto de valores. <br>**Ejemplo**: `MIN('APM'#"duration")` <br>**Disponible en**: Hoja

`MINIFS(min_range, range1, criteria1, ...)`
: Devuelve el valor mínimo en un rango que cumple con varios criterios. <br>**Ejemplo**: `MINIFS('APM'#"duration", 'APM'#"env", "prod")` <br>**Disponible en**: Hoja

`PI()`
: Devuelve el valor de π con 15 dígitos de precisión. <br>**Ejemplo**: `PI()` <br>**Disponible en**: Hoja

`RAND()`
: Devuelve un número aleatorio entre 0 y 1. <br>**Ejemplo**: `RAND()` <br>**Disponible en**: Hoja

`SQRT(number)`
: Devuelve la raíz cuadrada positiva de un número. <br>**Ejemplo**: `SQRT(16) => 4` <br>**Disponible en**: Hoja

`SUM(value1, [value2, ...])`
: Devuelve la suma de una serie de números y/o celdas. <br>**Ejemplo**: `SUM('Cloud Cost'#"cost")` <br>**Disponible en**: Hoja

`SUMIF(range, criteria, sum_range)`
: Suma los valores de un rango que cumplen los criterios que especifiques. <br>**Ejemplo**: `SUMIF('Cloud Cost'#"service", "ec2", 'Cloud Cost'#"cost")` <br>**Disponible en**: Hoja

`SUMIFS(sum_range, range1, criteria1, ...)`
: Suma los valores de un rango que cumplen múltiples criterios. <br>**Ejemplo**: `SUMIFS('Cloud Cost'#"cost", 'Cloud Cost'#"service", "ec2", 'Cloud Cost'#"env", "prod")` <br>**Disponible en**: Hoja

### Fecha y hora {#date-and-time}

`DATE(year, month, day)`
: Convierte un año, mes y día proporcionados en una fecha. <br>**Ejemplo**: `DATE(2021, 10, 31)` <br>**Disponible en**: Tabla, Hoja

`DATEDIF(start_date, end_date, unit)`
: Calcula el número de días, meses o años entre dos fechas. <br>**Ejemplo**: `DATEDIF("10/17/1979", "8/22/2019", "Y") => 39` <br>**Disponible en**: Tabla, Hoja

`TODAY()`
: Devuelve la fecha actual. <br>**Ejemplo**: `TODAY()` <br>**Disponible en**: Tabla

`NOW()`
: Devuelve la fecha y hora actuales. <br>**Ejemplo**: `NOW()` <br>**Disponible en**: Tabla, Hoja

`TIME(hour, minute, second)`
: Convierte una hora, minuto y segundo proporcionados en una hora. <br>**Ejemplo**: `TIME(11, 40, 59)` <br>**Disponible en**: Tabla

`YEAR(date)`
: Extrae el componente del año de un valor de fecha. <br>**Ejemplo**: `YEAR(DATE(2025, 12, 31))` <br>**Disponible en**: Tabla, Hoja

`MONTH(date)`
: Extrae el componente del mes de un valor de fecha. <br>**Ejemplo**: `MONTH("2023-07-15")` <br>**Disponible en**: Tabla, Hoja

`DAY(date)`
: Extrae el componente del día de un valor de fecha. <br>**Ejemplo**: `DAY(DATE(2023, 12, 25))` <br>**Disponible en**: Tabla, Hoja

`HOUR(datetime)`
: Extrae el componente de la hora (0–23) de un valor de fecha y hora. <br>**Ejemplo**: `HOUR("14:30:45")` <br>**Disponible en**: Tabla, Hoja

`MINUTE(datetime)`
: Extrae el componente de los minutos (0–59) de un valor de fecha y hora. <br>**Ejemplo**: `MINUTE("14:30:45")` <br>**Disponible en**: Tabla, Hoja

`SECOND(datetime)`
: Extrae el segundo componente (0–59) de un valor de fecha y hora. <br>**Ejemplo**: `SECOND("14:30:45")` <br>**Disponible en**: Tabla, Hoja

`DATEVALUE(date_string)`
: Convierte una cadena de fecha en un valor de fecha. <br>**Ejemplo**: `DATEVALUE("07/23/2024")` <br>**Disponible en**: Tabla, Hoja

`EPOCHTODATE(timestamp, [unit])`
: Convierte una marca de tiempo de época Unix en una fecha. `unit` usa `1` (segundos) de forma predeterminada; use `2` para milisegundos o `3` para microsegundos. <br>**Ejemplo**: `EPOCHTODATE(#"Timestamp", 2)` <br>**Disponible en**: Tabla, Hoja

`EDATE(start_date, months)`
: Devuelve la fecha que corresponde al número indicado de meses antes o después de una fecha de inicio. <br>**Ejemplo**: `EDATE("2023-01-15", 6)` <br>**Disponible en**: Tabla

`EOMONTH(start_date, months)`
: Devuelve el último día de un mes que es un número especificado de meses antes o después de una fecha determinada. <br>**Ejemplo**: `EOMONTH(DATE(2023, 12, 12), 0)` <br>**Disponible en**: Hoja

`WEEKDAY(date, [type])`
: Devuelve el día de la semana como un número. Tipo 1 (predeterminado) = dom–sáb (1–7), tipo 2 = lun–dom (1–7), tipo 3 = lun–dom (0–6). <br>**Ejemplo**: `WEEKDAY(DATE(2023, 12, 12))` <br>**Disponible en**: Tabla, Hoja

`WEEKNUM(date, [type])`
: Devuelve el número de semana de una fecha específica dentro del año. <br>**Ejemplo**: `WEEKNUM("2023-01-15")` <br>**Disponible en**: Tabla, Hoja

### Búsqueda y referencia {#lookup-and-reference}

`VLOOKUP(search_key, range, index, [is_sorted])`
: Busca un valor en la primera columna de un rango y devuelve un valor en la misma fila de una columna especificada. <br>**Ejemplo**: `VLOOKUP("Apple", A1:C10, 2, FALSE)` <br>**Disponible en**: Hoja

`HLOOKUP(search_key, range, index, [is_sorted])`
: Busca un valor en la primera fila de un rango y devuelve un valor en la misma columna de una fila especificada. <br>**Ejemplo**: `HLOOKUP("Apple", A1:D3, 2, FALSE)` <br>**Disponible en**: Hoja

`INDEX(reference, row, [column])`
: Devuelve el valor de un elemento en una tabla según los números de fila y columna. <br>**Ejemplo**: `INDEX(A1:D3, 2, 3)` <br>**Disponible en**: Hoja

`MATCH(search_key, range, [search_type])`
: Devuelve la posición relativa de un elemento en una matriz que coincide con un valor especificado. <br>**Ejemplo**: `MATCH("Apple", A1:A4, 0)` <br>**Disponible en**: Hoja

`CHOOSE(index, value1, value2, ...)`
: Devuelve un valor de una lista según un índice. <br>**Ejemplo**: `CHOOSE(2, "A", "B", "C")` <br>**Disponible en**: Hoja

`ROW([reference])`
: Devuelve el número de fila de una referencia. <br>**Ejemplo**: `ROW(A5) => 5` <br>**Disponible en**: Hoja

`COLUMN([reference])`
: Devuelve el número de columna de una referencia. <br>**Ejemplo**: `COLUMN(C1) => 3` <br>**Disponible en**: Hoja

### Estadística {#statistical}

`AVERAGE(value1, [value2, ...])`
: Devuelve el valor promedio numérico en un conjunto de datos, ignorando el texto. <br>**Ejemplo**: `AVERAGE('APM'#"duration")` <br>**Disponible en**: Hoja

`AVERAGEIF(range, criteria, [average_range])`
: Devuelve el promedio de las celdas que cumplen con un criterio especificado. <br>**Ejemplo**: `AVERAGEIF('APM'#"env", "prod", 'APM'#"duration")` <br>**Disponible en**: Hoja

`AVERAGEIFS(average_range, range1, criteria1, ...)`
: Devuelve el promedio de las celdas que cumplen con múltiples criterios. <br>**Ejemplo**: `AVERAGEIFS('APM'#"duration", 'APM'#"env", "prod", 'APM'#"service", "web")` <br>**Disponible en**: Hoja

`MEDIAN(value1, [value2, ...])`
: Devuelve la mediana (valor central) de un conjunto de datos. Si el conjunto de datos tiene un número par de valores, devuelve el promedio de los dos valores centrales. <br>**Ejemplo**: `MEDIAN('APM'#"duration")` <br>**Disponible en**: Hoja

`MODE(value1, [value2, ...])`
: Devuelve el valor que ocurre con mayor frecuencia en un conjunto de datos. <br>**Ejemplo**: `MODE('Logs'#"status_code")` <br>**Disponible en**: Hoja

`PERCENTILE(data, percentile)`
: Devuelve el valor en un percentil dado de un conjunto de datos utilizando interpolación lineal. <br>**Ejemplo**: `PERCENTILE('APM'#"duration", 0.95)` <br>**Disponible en**: Hoja

`STDEV(value1, [value2, ...])`
: Calcula la desviación estándar de un conjunto de datos de muestra. <br>**Ejemplo**: `STDEV('APM'#"duration")` <br>**Disponible en**: Hoja

`VAR(value1, [value2, ...])`
: Calcula la varianza muestral de un conjunto de datos. <br>**Ejemplo**: `VAR('APM'#"duration")` <br>**Disponible en**: Hoja de cálculo

`FORECAST(x, data_y, data_x)`
: Predice un valor futuro utilizando valores existentes y regresión lineal. <br>**Ejemplo**: `FORECAST(5, {1,2,3,4}, {10,20,30,40})` <br>**Disponible en**: Hoja

`SUMPRODUCT(array1, [array2, ...])`
: Multiplica los elementos correspondientes en matrices y devuelve la suma de esos productos. <br>**Ejemplo**: `SUMPRODUCT({1,2,3}, {4,5,6}) => 32` <br>**Disponible en**: Hoja de cálculo

### Financiero {#financial}

`PMT(rate, number_of_periods, present_value, [future_value], [end_or_beginning])`
: Calcula el pago de un préstamo basado en pagos constantes y una tasa de interés constante. <br>**Ejemplo**: `PMT(0.05/12, 60, 20000)` <br>**Disponible en**: Hoja

`PV(rate, number_of_periods, payment_amount, [future_value], [end_or_beginning])`
: Calcula el valor presente de una inversión. <br>**Ejemplo**: `PV(0.05/12, 60, -377.42)` <br>**Disponible en**: Hoja

`FV(rate, number_of_periods, payment_amount, [present_value], [end_or_beginning])`
: Calcula el valor futuro de una inversión basado en pagos periódicos constantes y una tasa de interés constante. <br>**Ejemplo**: `FV(0.06/12, 240, -500)` <br>**Disponible en**: Hoja

`NPV(discount, cashflow1, [cashflow2, ...])`
: Calcula el valor presente neto de una inversión basado en una tasa de descuento y una serie de flujos de efectivo futuros. <br>**Ejemplo**: `NPV(0.10, -50000, 8000, 9200, 10400)` <br>**Disponible en**: Hoja

`IRR(cashflow_amounts, [rate_guess])`
: Calcula la tasa interna de retorno para una serie de flujos de efectivo. <br>**Ejemplo**: `IRR({-50000, 8000, 9200, 10400, 11600, 12800})` <br>**Disponible en**: Hoja

`NPER(rate, payment_amount, present_value, [future_value], [end_or_beginning])`
: Calcula el número de periodos para una inversión o préstamo. <br>**Ejemplo**: `NPER(0.05/12, -377.42, 20000)` <br>**Disponible en**: Hoja

`RATE(number_of_periods, payment_amount, present_value, [future_value], [end_or_beginning], [guess])`
: Calcula la tasa de interés por periodo de una anualidad. <br>**Ejemplo**: `RATE(48, -200, 8000)` <br>**Disponible en**: Hoja

`RRI(number_of_periods, present_value, future_value)`
: Calcula la tasa de interés equivalente para el crecimiento de una inversión. <br>**Ejemplo**: `RRI(10, 100, 200)` <br>**Disponible en**: Hoja

### Información {#info}

`ISBLANK(value)`
: Prueba si una celda está en blanco. <br>**Ejemplo**: `ISBLANK(A1)` <br>**Disponible en**: Hoja

`ISNUMBER(value)`
: Prueba si un valor es un número. <br>**Ejemplo**: `ISNUMBER(123)` <br>**Disponible en**: Hoja

`TYPE(value)`
: Devuelve el tipo de datos de un valor como un número (1 = número, 2 = texto, 4 = lógico, 16 = error). <br>**Ejemplo**: `TYPE(123) => 1` <br>**Disponible en** : Hoja

[1]: /es/sheets/#sheet-preview