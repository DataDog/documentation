---
title: Functions and Operators
description: "Reference guide for functions and operators available in Sheets calculated columns and sheet formulas, including text, date, logical, math, lookup, statistical, and financial operations."
---

## Overview

Use functions and operators in Sheets to analyze and transform your data. Functions are available in two contexts:

- **Table calculated columns** — Functions that transform or enrich individual row values in a table.
- **Sheet formulas** — Functions entered directly in a [sheet][1] tab. Sheets support all table functions plus additional lookup, statistical, financial, and other functions listed in the [Sheet functions](#sheet-functions) section below.

## Operators

| Operator | Name                  | Example |
| -------  | --------------------- | ------- |
| `+`      | Addition              | `=A1+B1` |
| `-`      | Subtraction           | `=A1-B1` |
| `*`      | Multiplication        | `=A1*B1` |
| `/`      | Division              | `=A1/B1` |
| `%`      | Modulo                | `=A1%B1` |
| `^`      | Power                 | `=2^10` |
| `&`      | Concatenate           | `="Hello "&A1` |
| `=`      | Equal                 | `=A1=B1` |
| `<>`     | Not equal             | `=A1<>0` |
| `>`      | Greater than          | `=A1>100` |
| `<`      | Less than             | `=A1<100` |
| `>=`     | Greater than or equal | `=A1>=100` |
| `<=`     | Less than or equal    | `=A1<=100` |

## Table functions

These functions are available in table calculated columns. Unless noted, they are also available in sheet formulas.

| Label                                                                                        | Description                                                                                                                       | Example                                                                  |
| -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| REGEXMATCH(text_string, regular_expression)                                                  | Evaluates whether a text string matches a regular expression.                                                                     | REGEXMATCH("ABC 123 def", "\\\\d+") => TRUE                              |
| REGEXEXTRACT(text_string, regular_expression)                                                | Extracts the first substring that matches a specified regex pattern.                                                              | REGEXEXTRACT("ABC 123 def", "\\\\d+") => "123"                           |
| REGEXCOUNT(text_string, regular_expression)                                                  | Counts the number of times a regex pattern appears in a text string.                                                              | REGEXCOUNT("abc 123 def", "\\\\d+") => 2                                 |
| REGEXREPLACE(text_string, regular_expression, replacement) **Table calculated columns only** | Replaces all occurrences of a regex pattern with a specified replacement text.                                                    | REGEXREPLACE("ABC 123 hello", "\\\\d+", "XXX") => "ABC XXX hello"        |
| LEN(string)                                                                                  | Returns the length of a string.                                                                                                   | LEN("Hello World")                                                       |
| LOWER(string)                                                                                | Returns the string in lowercase.                                                                                                  | LOWER("HELLO WORLD")                                                     |
| UPPER(string)                                                                                | Returns the string in uppercase.                                                                                                  | UPPER("hello world")                                                     |
| LEFT(string, number_of_characters)                                                           | Returns a substring from the beginning of a specified string.                                                                     | LEFT("Datadog", 4)                                                       |
| RIGHT(string, number_of_characters)                                                          | Returns a substring from the end of a specified string.                                                                           | RIGHT("DATADOG", 3)                                                      |
| CONCATENATE(string1, string2, ...)                                                           | Appends strings to one another. Equivalent to the `&` operator.                                                                  | CONCATENATE("data", "dog")                                               |
| CONTAINS(string, substring)                                                                  | Returns TRUE if the string contains the substring, FALSE otherwise.                                                               | CONTAINS("is the word string in this sentence?", "string")               |
| SUBSTITUTE(text, old_text, new_text, [instance_num])                                         | Replaces occurrences of a substring with new text. If instance_num is omitted, all occurrences are replaced.                     | SUBSTITUTE("Hello world! Hello!", "Hello", "Hi")                         |
| TEXTJOIN(delimiter, ignore_empty, text1, [text2, ...])                                       | Combines the text from multiple strings with the specified delimiter.                                                             | TEXTJOIN(" ", TRUE, "hello", "world")                                    |
| DATE(year, month, day)                                                                       | Converts a provided year, month, and day into a date.                                                                             | DATE(2021, 10, 31)                                                       |
| DATEDIF(start_date, end_date, unit)                                                          | Calculates the number of days, months, or years between two dates.                                                                | DATEDIF("10/17/1979", "8/22/2019", "Y") will return 39                   |
| TRUE()                                                                                       | Returns the logical value TRUE.                                                                                                   | TRUE()                                                                   |
| FALSE()                                                                                      | Returns the logical value FALSE.                                                                                                  | FALSE()                                                                  |
| IF(logical_expression, value_if_true, value_if_false)                                        | Returns one value if a logical expression is TRUE and another if it is FALSE.                                                     | IF(42>9, "all good", "something is wrong in the matrix")                 |
| IFS(logical_test1, value_if_true1, [logical_test2, value_if_true2], …)                       | Evaluates multiple conditions and returns a value that corresponds to the first true condition.                                   | IFS(A1>90, "A", A1>80, "B")                                              |
| AND(logical_expression1, [logical_expression2, …])                                           | Returns true if all of the provided arguments are logically true, and false if any of the provided arguments are logically false. | AND(A1=1, A2=2)                                                          |
| OR(logical_expression1, [logical_expression2, …])                                            | Returns true if any of the provided arguments are logically true, and false if all of the provided arguments are logically false. | OR(A1=1, A2=2)                                                           |
| NOT(logical_expression)                                                                      | Returns the opposite of a logical value.                                                                                          | NOT(TRUE)                                                                |
| MOD(number1, number2)                                                                        | Returns the result of the modulo operator, the remainder after a division operation.                                              | MOD(5, 2)                                                                |
| POWER(number, power)                                                                         | Returns a number raised to a power.                                                                                               | POWER(2, 3)                                                              |
| ROUND(number, places)                                                                        | Rounds a number to a certain number of decimal places.                                                                            | ROUND(826.645, 1)                                                        |
| FLOOR(number, factor)                                                                        | Rounds a number down to the nearest integer multiple of the specified factor.                                                     | FLOOR(826.645, 10)                                                       |
| CEILING(number, factor)                                                                      | Rounds a number up to the nearest integer multiple of the specified factor.                                                       | CEILING(826.645, 10)                                                     |
| ABS(number)                                                                                  | Returns the absolute value of a number.                                                                                           | ABS(26.34)                                                               |

## Sheet functions

These functions are available in [sheet][1] formulas only.

### Text

| Function | Description | Example |
| -------- | ----------- | ------- |
| CHAR(number) | Converts a number into a character according to the Unicode character set. | CHAR(65) => "A" |
| CLEAN(text) | Removes non-printable characters from text. | CLEAN(A1) |
| FIND(search_for, text_to_search) | Finds the position of text within text (case-sensitive). Returns an error if not found. | FIND("World", "Hello World") => 7 |
| MID(text, start, length) | Returns characters from the middle of text. | MID("Hello World", 7, 5) => "World" |
| TEXT(number, format) | Formats a number as text using a format pattern. Supports number, date, and time formatting. | TEXT(1234.5, "#,##0.00") => "1,234.50" |
| TRIM(text) | Removes leading, trailing, and extra spaces from text. | TRIM("  hello  ") => "hello" |
| VALUE(text) | Converts text to a number. | VALUE("123") => 123 |

### Logical

| Function | Description | Example |
| -------- | ----------- | ------- |
| IFERROR(value, value_if_error) | Returns a specified value if a formula evaluates to an error; otherwise returns the result of the formula. | IFERROR(1/0, "Division Error") |
| IFNA(value, value_if_na) | Returns a specified value if a formula evaluates to #N/A; otherwise returns the result of the formula. | IFNA(VLOOKUP("x", A1:B10, 2, FALSE), "Not found") |
| SWITCH(expression, case1, value1, ..., [default]) | Compares expression to cases and returns the corresponding value. | SWITCH(A1, 1, "One", 2, "Two", "Other") |
| XOR(logical_expression1, [logical_expression2, …]) | Returns TRUE if an odd number of arguments are TRUE. | XOR(TRUE, FALSE) |

### Math

| Function | Description | Example |
| -------- | ----------- | ------- |
| COUNT(value1, [value2, ...]) | Counts the number of numeric values in a range. | COUNT(A1:A10) |
| COUNTA(value1, [value2, ...]) | Counts the number of non-empty values in a range. | COUNTA(A1:A10) |
| COUNTBLANK(range) | Counts the number of empty cells in a range. | COUNTBLANK(A1:A10) |
| COUNTIF(range, criteria) | Counts the number of cells in a range that meet a specified criteria. | COUNTIF(A1:A10, ">10") |
| COUNTIFS(range1, criteria1, [range2, criteria2, ...]) | Counts the number of cells in a range that meet multiple criteria. | COUNTIFS(A1:A10, ">10", B1:B10, "=Yes") |
| COUNTUNIQUE(value1, [value2, ...]) | Counts the number of unique values in a range. | COUNTUNIQUE(A1:A10) |
| MAX(value1, [value2, ...]) | Returns the largest number from a set of values. | MAX(1, 2, 3, 4, 5) |
| MAXIFS(max_range, range1, criteria1, ...) | Returns the maximum value in a range that meets multiple criteria. | MAXIFS(A1:A10, B1:B10, ">10") |
| MIN(value1, [value2, ...]) | Returns the smallest number from a set of values. | MIN(1, 2, 3, 4, 5) |
| MINIFS(min_range, range1, criteria1, ...) | Returns the minimum value in a range that meets multiple criteria. | MINIFS(A1:A10, B1:B10, ">10") |
| PI() | Returns the value of π to 15 digits of precision. | PI() |
| RAND() | Returns a random number between 0 and 1. | RAND() |
| SQRT(number) | Returns the positive square root of a number. | SQRT(16) => 4 |
| SUM(value1, [value2, ...]) | Returns the sum of a series of numbers and/or cells. | SUM(1, 2, 3) |
| SUMIF(range, criteria, sum_range) | Adds the values in a range that meet criteria you specify. | SUMIF(A1:A10, ">10", B1:B10) |
| SUMIFS(sum_range, range1, criteria1, ...) | Adds the values in a range that meet multiple criteria. | SUMIFS(A1:A10, B1:B10, ">10", C1:C10, "=Yes") |

### Date and time

| Function | Description | Example |
| -------- | ----------- | ------- |
| TODAY() | Returns the current date. | TODAY() |
| NOW() | Returns the current date and time. | NOW() |
| TIME(hour, minute, second) | Converts a provided hour, minute, and second into a time. | TIME(11, 40, 59) |
| YEAR(date) | Extracts the year component from a date value. | YEAR(DATE(2025, 12, 31)) |
| MONTH(date) | Extracts the month component from a date value. | MONTH("2023-07-15") |
| DAY(date) | Extracts the day component from a date value. | DAY(DATE(2023, 12, 25)) |
| HOUR(time) | Extracts the hour component from a time value. | HOUR("14:30:45") |
| MINUTE(time) | Extracts the minute component from a time value. | MINUTE("14:30:45") |
| SECOND(time) | Extracts the second component from a time value. | SECOND("14:30:45") |
| EDATE(start_date, months) | Returns the date that is the indicated number of months before or after a start date. | EDATE("2023-01-15", 6) |
| EOMONTH(start_date, months) | Returns the last day of a month that is a specified number of months before or after a given date. | EOMONTH(DATE(2023, 12, 12), 0) |
| WEEKDAY(date, [type]) | Returns the day of the week as a number. Type 1 (default) = Sun–Sat (1–7), type 2 = Mon–Sun (1–7), type 3 = Mon–Sun (0–6). | WEEKDAY(DATE(2023, 12, 12)) |
| WEEKNUM(date, [type]) | Returns the week number of a specific date within the year. | WEEKNUM("2023-01-15") |

### Lookup and reference

| Function | Description | Example |
| -------- | ----------- | ------- |
| VLOOKUP(search_key, range, index, [is_sorted]) | Searches for a value in the first column of a range and returns a value in the same row from a specified column. | VLOOKUP("Apple", A1:C10, 2, FALSE) |
| HLOOKUP(search_key, range, index, [is_sorted]) | Searches for a value in the first row of a range and returns a value in the same column from a specified row. | HLOOKUP("Apple", A1:D3, 2, FALSE) |
| INDEX(reference, row, [column]) | Returns the value of an element in a table based on row and column numbers. | INDEX(A1:D3, 2, 3) |
| MATCH(search_key, range, [search_type]) | Returns the relative position of an item in an array that matches a specified value. | MATCH("Apple", A1:A4, 0) |
| CHOOSE(index, value1, value2, ...) | Returns a value from a list based on an index. | CHOOSE(2, "A", "B", "C") |
| ROW([reference]) | Returns the row number of a reference. | ROW(A5) => 5 |
| COLUMN([reference]) | Returns the column number of a reference. | COLUMN(C1) => 3 |

### Statistical

| Function | Description | Example |
| -------- | ----------- | ------- |
| AVERAGE(value1, [value2, ...]) | Returns the numerical average value in a dataset, ignoring text. | AVERAGE(1, 2, 3) |
| AVERAGEIF(range, criteria, [average_range]) | Returns the average of cells that meet a specified criteria. | AVERAGEIF(A1:A10, ">10", B1:B10) |
| AVERAGEIFS(average_range, range1, criteria1, ...) | Returns the average of cells that meet multiple criteria. | AVERAGEIFS(A1:A10, B1:B10, ">5", C1:C10, "Product A") |
| MEDIAN(value1, [value2, ...]) | Returns the median (middle value) of a dataset. If the dataset has an even number of values, returns the average of the two middle values. | MEDIAN(1, 2, 3, 4, 5) |
| MODE(value1, [value2, ...]) | Returns the most frequently occurring value in a dataset. | MODE(1, 2, 2, 3, 4, 2, 5) |
| PERCENTILE(data, percentile) | Returns the value at a given percentile of a dataset using linear interpolation. | PERCENTILE(A1:C10, 0.5) |
| STDEV(value1, [value2, ...]) | Calculates the standard deviation of a sample dataset. | STDEV(1, 2, 3, 4, 5) |
| VAR(value1, [value2, ...]) | Calculates the sample variance of a dataset. | VAR(1, 2, 3, 4, 5) |
| FORECAST(x, data_y, data_x) | Predicts a future value using existing values and linear regression. | FORECAST(5, {1,2,3,4}, {10,20,30,40}) |
| SUMPRODUCT(array1, [array2, ...]) | Multiplies corresponding elements in arrays and returns the sum of those products. | SUMPRODUCT({1,2,3}, {4,5,6}) => 32 |

### Financial

| Function | Description | Example |
| -------- | ----------- | ------- |
| PMT(rate, number_of_periods, present_value, [future_value], [end_or_beginning]) | Calculates the payment for a loan based on constant payments and a constant interest rate. | PMT(0.05/12, 60, 20000) |
| PV(rate, number_of_periods, payment_amount, [future_value], [end_or_beginning]) | Calculates the present value of an investment. | PV(0.05/12, 60, -377.42) |
| FV(rate, number_of_periods, payment_amount, [present_value], [end_or_beginning]) | Calculates the future value of an investment based on periodic, constant payments and a constant interest rate. | FV(0.06/12, 240, -500) |
| NPV(discount, cashflow1, [cashflow2, ...]) | Calculates the net present value of an investment based on a discount rate and a series of future cash flows. | NPV(0.10, -50000, 8000, 9200, 10400) |
| IRR(cashflow_amounts, [rate_guess]) | Calculates the internal rate of return for a series of cash flows. | IRR({-50000, 8000, 9200, 10400, 11600, 12800}) |
| NPER(rate, payment_amount, present_value, [future_value], [end_or_beginning]) | Calculates the number of periods for an investment or loan. | NPER(0.05/12, -377.42, 20000) |
| RATE(number_of_periods, payment_amount, present_value, [future_value], [end_or_beginning], [guess]) | Calculates the interest rate per period of an annuity. | RATE(48, -200, 8000) |
| RRI(number_of_periods, present_value, future_value) | Calculates the equivalent interest rate for the growth of an investment. | RRI(10, 100, 200) |

### Info

| Function | Description | Example |
| -------- | ----------- | ------- |
| ISBLANK(value) | Tests whether a cell is blank. | ISBLANK(A1) |
| ISNUMBER(value) | Tests whether a value is a number. | ISNUMBER(123) |
| TYPE(value) | Returns the data type of a value as a number (1 = number, 2 = text, 4 = logical, 16 = error). | TYPE(123) => 1 |

[1]: /sheets/#sheet-preview
