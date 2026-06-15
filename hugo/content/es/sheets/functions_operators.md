---
title: Funciones y Operadores
---

## Información general

Utiliza funciones y operadores en tus columnas calculadas de Sheets para añadir análisis y contexto adicionales a tus datos.

## Operadores

| Operador | Nombre                  | 
| -------  | --------------------- | 
| `+`      | Suma              |
| `-`      | Resta           |
| `*`      | Multiplicación        |
| `/`      | División              |
| `%`      | Módulo                |
| `^`      | Potencia                 |
| `&`      | Concatenar           |
| `=`      | Igual                 |
| `<>`     | No es igual             |
| `>`      | Mayor que          |
| `<`      | Menor que             |
| `>=`     | Mayor o igual que |
| `<=`     | Menor o igual que    |

## Funciones

| Etiqueta                                                                  | Descripción                                                                                                                       | Ejemplo                                                   |
| ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| REGEXMATCH(text_string, regular_expression)                            | Evalúa si una cadena de texto coincide con una expresión regular.                                                                     | REGEXMATCH("ABC 123 def", "\\\\d+") => TRUE               |
| REGEXEXTRACT(text_string, regular_expression)                          | Extrae la primera subcadena que coincide con un patrón de expresión regular especificado.                                                              | REGEXEXTRACT("ABC 123 def", "\\\\d+") => "123"            |
| REGEXCOUNT(cadena_texto, expresión_regular)                             | Cuenta el número de veces que aparece un patrón regex en una cadena de texto.                                                              | REGEXCOUNT("abc 123 def", "\\\\d+") => 2                  |
| LEN(string)                                                            | Devuelve la longitud de una cadena.                                                                                                   | LEN("Hello World")                                        |
| LOWER(string)                                                          | Devuelve la cadena en minúsculas.                                                                                                   | LOWER("HELLO WORLD")                                      |
| UPPER(cadena)                                                          | Devuelve la cadena en mayúsculas.                                                                                                   | UPPER("hello world")                                      |
| LEFT(string, number_of_characters)                                     | Devuelve una subcadena desde el principio de una cadena especificada.                                                                     | LEFT("Datadog", 4)                                        |
| RIGHT(string, number_of_characters)                                    | Devuelve una subcadena a partir del final de una cadena especificada.                                                                           | RIGHT("DATADOG", 3)                                       |
| CONCATENATE(string1, string2, ...)                                     | Añade cadenas entre sí. Equivale al operador`&\`.                                                                 | CONCATENATE("data", "dog")                                |
| CONTIENE(cadena, subcadena)                                             | Devuelve TRUE si la cadena contiene la subcadena, FALSE en caso contrario.                                                               | CONTAINS("¿está la cadena de palabras en esta frase?", "cadena") |
| TEXTJOIN(delimitador, ignorar_vacío, texto1, [texto2, ...])                  | Combina el texto de varias cadenas con el delimitador especificado.                                                             | TEXTJOIN(" ", TRUE, "hola", "mundo")                     |
| DATE(year, month, day)                                                 | Convierte un año, un mes y un día en una fecha.                                                                             | DATE(2021, 10, 31)                                        |
| DATEDIF(start_date, end_date, unit)                                    | Calcula el número de días, meses o años entre dos fechas.                                                                | DATEDIF("10/17/1979", "8/22/2019", "Y") devolverá 39    |
| TRUE()                                                                 | Devuelve el valor lógico TRUE.                                                                                                   | TRUE()                                                    |
| FALSE()                                                                | Devuelve el valor lógico FALSE.                                                                                                  | FALSE()                                                   |
| IF(logical_expression, value_if_true, value_if_false)                  | Devuelve un valor si una expresión lógica es TRUE y otro si es FALSE.                                                     | IF(42>9, "todo bien", "algo va mal en la matriz")  |
| IFS(logical_test1, value_if_true1, [logical_test2, value_if_true2], ...) | Evalúa varias condiciones y devuelve un valor que corresponde a la primera condición verdadera.                                   | IFS(A1>90, "A", A1>80, "B")                               |
| AND(logical_expression1, [logical_expression2, ...])                     | Devuelve true si todos los argumentos proporcionados son lógicamente verdaderos y false si alguno de los argumentos proporcionados es lógicamente falso. | AND(A1=1, A2=2)                                           |
| OR(logical_expression1, [logical_expression2, ...])                      | Devuelve true si alguno de los argumentos proporcionados es lógicamente verdadero y false si todos los argumentos proporcionados son lógicamente falsos. | OR(A1=1, A2=2)                                            |
| NOT(expresión_lógica)                                                 | Devuelve el opuesto de un valor lógico.                                                                                          | NOT(TRUE)                                                 |
| ADD(number1, number2)                                                  | Devuelve la suma de dos números. Equivale al operador \`+\`.                                                                 | ADD(1, 2)                                                 |
| MINUS(number1, number2)                                                | Devuelve la diferencia de dos números. Equivale al operador \`-\`.'                                                         | MINUS(1, 2)                                               |
| MULTIPLY(number1, number2)                                             | Devuelve el producto de dos números. Equivale al operador`\*\`.                                                            | MULTIPLY(1, 2)                                            |
| DIVIDE(number1, number2)                                               | Devuelve un número dividido por otro. Equivale al operador \`/\`.                                                          | DIVIDE(4, 2)                                              |
| MOD(number1, number2)                                                  | Devuelve el resultado del operador módulo, el resto después de una operación de división.                                              | MOD(5, 2)                                                 |
| POWER(number, power)                                                   | Devuelve un número elevado a una potencia.                                                                                               | POWER(2, 3)                                               |
| ROUND(número, lugares)                                                   | Redondea un número a un determinado número de decimales.                                                                            | ROUND(826.645, 1)                                         |
| FLOOR(número, factor)                                                   | Redondea un número al múltiplo entero más próximo del factor especificado.                                                     | SUELO(826.645, 10)                                        |
| TECHO(número, factor)                                                 | Redondea un número al múltiplo entero más próximo del factor especificado.                                                       | TECHO(826.645, 10)                                      |
| ABS(número)                                                             | Devuelve el valor absoluto de un número.                                                                                           | ABS(26,34)                                                |