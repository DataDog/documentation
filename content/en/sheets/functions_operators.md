---
title: Functions and Operators
description: "Reference guide for functions and operators available in Sheets calculated columns including text, date, logical, mathematical, and regex operations."
---

## Overview

Use functions and operators in your Sheets calculated columns to add additional analysis and context to your data.

## Operators

| Operator | Name                  | 
| -------  | --------------------- | 
| `+`      | Addition              |
| `-`      | Subtraction           |
| `*`      | Multiplication        |
| `/`      | Division              |
| `%`      | Modulo                |
| `^`      | Power                 |
| `&`      | Concatenate           |
| `=`      | Equal                 |
| `<>`     | Not equal             |
| `>`      | Greater than          |
| `<`      | Less than             |
| `>=`     | Greater than or equal |
| `<=`     | Less than or equal    |

## Functions

| Label                                                                  | Description                                                                                                                       | Example                                                   |
| ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| REGEXMATCH(text_string, regular_expression)                            | Evaluates whether a text string matches a regular expression.                                                                     | REGEXMATCH("ABC 123 def", "\\\\d+") => TRUE               |
| REGEXEXTRACT(text_string, regular_expression)                          | Extracts the first substring that matches a specified regex pattern.                                                              | REGEXEXTRACT("ABC 123 def", "\\\\d+") => "123"            |
| REGEXCOUNT(text_string, regular_expression)                             | Counts the number of times a regex pattern appears in a text string.                                                              | REGEXCOUNT("abc 123 def", "\\\\d+") => 2                  |
| LEN(string)                                                            | Returns the length of a string.                                                                                                   | LEN("Hello World")                                        |
| LOWER(string)                                                          | Returns the string in lowercase.                                                                                                   | LOWER("HELLO WORLD")                                      |
| UPPER(string)                                                          | Returns the string in uppercase.                                                                                                   | UPPER("hello world")                                      |
| LEFT(string, number_of_characters)                                     | Returns a substring from the beginning of a specified string.                                                                     | LEFT("Datadog", 4)                                        |
| RIGHT(string, number_of_characters)                                    | Returns a substring from the end of a specified string.                                                                           | RIGHT("DATADOG", 3)                                       |
| CONCATENATE(string1, string2, ...)                                     | Appends strings to one another. Equivalent to the \`&\` operator.                                                                 | CONCATENATE("data", "dog")                                |
| CONTAINS(string, substring)                                             | Returns TRUE if the string contains the substring, FALSE otherwise.                                                               | CONTAINS("is the word string in this sentence?", "string") |
| TEXTJOIN(delimiter, ignore_empty, text1, [text2, ...])                  | Combines the text from multiple strings with the specified delimiter.                                                             | TEXTJOIN(" ", TRUE, "hello", "world")                     |
| DATE(year, month, day)                                                 | Converts a provided year, month, and day into a date.                                                                             | DATE(2021, 10, 31)                                        |
| DATEDIF(start_date, end_date, unit)                                    | Calculates the number of days, months, or years between two dates.                                                                | DATEDIF("10/17/1979", "8/22/2019", "Y") will return 39    |
| TRUE()                                                                 | Returns the logical value TRUE.                                                                                                   | TRUE()                                                    |
| FALSE()                                                                | Returns the logical value FALSE.                                                                                                  | FALSE()                                                   |
| IF(logical_expression, value_if_true, value_if_false)                  | Returns one value if a logical expression is TRUE and another if it is FALSE.                                                     | IF(42>9, "all good", "something is wrong in the matrix")  |
| IFS(logical_test1, value_if_true1, [logical_test2, value_if_true2], …) | Evaluates multiple conditions and returns a value that corresponds to the first true condition.                                   | IFS(A1>90, "A", A1>80, "B")                               |
| AND(logical_expression1, [logical_expression2, …])                     | Returns true if all of the provided arguments are logically true, and false if any of the provided arguments are logically false. | AND(A1=1, A2=2)                                           |
| OR(logical_expression1, [logical_expression2, …])                      | Returns true if any of the provided arguments are logically true, and false if all of the provided arguments are logically false. | OR(A1=1, A2=2)                                            |
| NOT(logical_expression)                                                 | Returns the opposite of a logical value.                                                                                          | NOT(TRUE)                                                 |
| ADD(number1, number2)                                                  | Returns the sum of two numbers. Equivalent to the \`+\` operator.                                                                 | ADD(1, 2)                                                 |
| MINUS(number1, number2)                                                | Returns the difference of two numbers. Equivalent to the \`-\` operator.'                                                         | MINUS(1, 2)                                               |
| MULTIPLY(number1, number2)                                             | Returns the product of two numbers. Equivalent to the \`\*\` operator.                                                            | MULTIPLY(1, 2)                                            |
| DIVIDE(number1, number2)                                               | Returns one number divided by another. Equivalent to the \`/\` operator.                                                          | DIVIDE(4, 2)                                              |
| MOD(number1, number2)                                                  | Returns the result of the modulo operator, the remainder after a division operation.                                              | MOD(5, 2)                                                 |
| POWER(number, power)                                                   | Returns a number raised to a power.                                                                                               | POWER(2, 3)                                               |
| ROUND(number, places)                                                   | Rounds a number to a certain number of decimal places.                                                                            | ROUND(826.645, 1)                                         |
| FLOOR(number, factor)                                                   | Rounds a number down to the nearest integer multiple of the specified factor.                                                     | FLOOR(826.645, 10)                                        |
| CEILING(number, factor)                                                 | Rounds a number up to the nearest integer multiple of the specified factor.                                                       | CEILING(826.645, 10)                                      |
| ABS(number)                                                             | Returns the absolute value of a number.                                                                                           | ABS(26.34)                                                |
