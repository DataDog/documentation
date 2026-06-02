---
title: Functions and Operators
description: "Reference guide for functions and operators available in Sheets calculated columns and sheet formulas, including text, date, logical, math, lookup, statistical, and financial operations."
---

## Overview

Use functions and operators in Sheets to analyze and transform your data. Functions are available in two contexts:

- **Table calculated columns**: Functions that transform or enrich individual row values in a table, applied at the column level.
- **Sheets**: Functions entered directly in a [sheet][1] tab, allowing you to reference other sheet or table tabs (when applicable).

## Operators

| Operator | Name                  | Example |
| -------  | --------------------- | ------- |
| `+`      | Addition              | `=A1+B1` |
| `-`      | Subtraction           | `=A1-B1` |
| `*`      | Multiplication        | `=A1*B1` |
| `/`      | Division              | `=A1/B1` |
| `^`      | Power                 | `=2^10` |
| `&`      | Concatenate           | `="Hello "&A1` |
| `=`      | Equal                 | `=A1=B1` |
| `<>`     | Not equal             | `=A1<>0` |
| `>`      | Greater than          | `=A1>100` |
| `<`      | Less than             | `=A1<100` |
| `>=`     | Greater than or equal | `=A1>=100` |
| `<=`     | Less than or equal    | `=A1<=100` |

## Functions

### Text

`REGEXMATCH(text_string, regular_expression)`
: Evaluates whether a text string matches a regular expression. <br>**Example**: `REGEXMATCH("ABC 123 def", "\\\\d+") => TRUE` <br>**Available in**: Table, Sheet

`REGEXEXTRACT(text_string, regular_expression)`
: Extracts the first substring that matches a specified regex pattern. <br>**Example**: `REGEXEXTRACT("ABC 123 def", "\\\\d+") => "123"` <br>**Available in**: Table, Sheet

`REGEXCOUNT(text_string, regular_expression)`
: Counts the number of times a regex pattern appears in a text string. <br>**Example**: `REGEXCOUNT("abc 123 def", "\\\\d+") => 1` <br>**Available in**: Table, Sheet

`REGEXREPLACE(text_string, regular_expression, replacement)`
: Replaces all substrings matching a regex with a replacement string. <br>**Example**: `REGEXREPLACE("abc 123 def", "\\\\d+", "NUM") => "abc NUM def"` <br>**Available in**: Table

`LEN(string)`
: Returns the length of a string. <br>**Example**: `LEN("Hello World")` <br>**Available in**: Table, Sheet

`LOWER(string)`
: Returns the string in lowercase. <br>**Example**: `LOWER("HELLO WORLD")` <br>**Available in**: Table, Sheet

`UPPER(string)`
: Returns the string in uppercase. <br>**Example**: `UPPER("hello world")` <br>**Available in**: Table, Sheet

`LEFT(string, number_of_characters)`
: Returns a substring from the beginning of a specified string. <br>**Example**: `LEFT("Datadog", 4)` <br>**Available in**: Table, Sheet

`RIGHT(string, number_of_characters)`
: Returns a substring from the end of a specified string. <br>**Example**: `RIGHT("DATADOG", 3)` <br>**Available in**: Table, Sheet

`MID(text, start, length)`
: Returns characters from the middle of text. <br>**Example**: `MID("Hello World", 7, 5) => "World"` <br>**Available in**: Sheet

`CONCATENATE(string1, string2, ...)`
: Appends strings to one another. Equivalent to the `&` operator. <br>**Example**: `CONCATENATE("data", "dog")` <br>**Available in**: Table, Sheet

`CONTAINS(string, substring)`
: Returns TRUE if the string contains the substring, FALSE otherwise. <br>**Example**: `CONTAINS("is the word string in this sentence?", "string")` <br>**Available in**: Table, Sheet

`SUBSTITUTE(text, old_text, new_text, [instance_num])`
: Replaces occurrences of old_text with new_text. If instance_num is omitted, all occurrences are replaced; otherwise, only the specified instance is replaced. <br>**Example**: `SUBSTITUTE("hello world", "world", "Datadog") => "hello Datadog"` <br>**Available in**: Table, Sheet

`TEXTJOIN(delimiter, ignore_empty, text1, [text2, ...])`
: Combines the text from multiple strings with the specified delimiter. <br>**Example**: `TEXTJOIN(" ", TRUE, "hello", "world")` <br>**Available in**: Table, Sheet

`FIND(search_for, text_to_search)`
: Finds the position of text within text (case-sensitive). Returns an error if not found. <br>**Example**: `FIND("World", "Hello World") => 7` <br>**Available in**: Sheet

`CHAR(number)`
: Converts a number into a character according to the Unicode character set. <br>**Example**: `CHAR(65) => "A"` <br>**Available in**: Sheet

`CLEAN(text)`
: Removes non-printable characters from text. <br>**Example**: `CLEAN(A1)` <br>**Available in**: Sheet

`TEXT(number, format)`
: Formats a number as text using a format pattern. Supports number, date, and time formatting. <br>**Example**: `TEXT(1234.5, "#,##0.00") => "1,234.50"` <br>**Available in**: Sheet

`TRIM(text)`
: Removes leading, trailing, and extra spaces from text. <br>**Example**: `TRIM("  hello  ") => "hello"` <br>**Available in**: Sheet

`VALUE(text)`
: Converts text to a number. <br>**Example**: `VALUE("123") => 123` <br>**Available in**: Sheet

### Logical

`IF(logical_expression, value_if_true, value_if_false)`
: Returns one value if a logical expression is TRUE and another if it is FALSE. <br>**Example**: `IF(42>9, "all good", "something is wrong in the matrix")` <br>**Available in**: Table, Sheet

`IFS(logical_test1, value_if_true1, [logical_test2, value_if_true2], …)`
: Evaluates one or more condition/value pairs and returns the value for the first true condition. Use TRUE as the final condition to define a default value. <br>**Example**: `IFS(A1>90, "A", A1>80, "B", TRUE, "C")` <br>**Available in**: Table, Sheet

`AND(logical_expression1, [logical_expression2, …])`
: Returns true if all of the provided arguments are logically true, and false if any of the provided arguments are logically false. <br>**Example**: `AND(A1=1, A2=2)` <br>**Available in**: Table, Sheet

`OR(logical_expression1, [logical_expression2, …])`
: Returns true if any of the provided arguments are logically true, and false if all of the provided arguments are logically false. <br>**Example**: `OR(A1=1, A2=2)` <br>**Available in**: Table, Sheet

`NOT(logical_expression)`
: Returns the opposite of a logical value. <br>**Example**: `NOT(TRUE)` <br>**Available in**: Table, Sheet

`TRUE()`
: Returns the logical value TRUE. <br>**Example**: `TRUE()` <br>**Available in**: Table, Sheet

`FALSE()`
: Returns the logical value FALSE. <br>**Example**: `FALSE()` <br>**Available in**: Table, Sheet

`IFERROR(value, value_if_error)`
: Returns a specified value if a formula evaluates to an error; otherwise returns the result of the formula. <br>**Example**: `IFERROR(1/0, "Division Error")` <br>**Available in**: Sheet

`IFNA(value, value_if_na)`
: Returns a specified value if a formula evaluates to #N/A; otherwise returns the result of the formula. <br>**Example**: `IFNA(VLOOKUP("x", A1:B10, 2, FALSE), "Not found")` <br>**Available in**: Sheet

`SWITCH(expression, case1, value1, ..., [default])`
: Compares expression to cases and returns the corresponding value. <br>**Example**: `SWITCH(A1, 1, "One", 2, "Two", "Other")` <br>**Available in**: Sheet

`XOR(logical_expression1, [logical_expression2, …])`
: Returns TRUE if an odd number of arguments are TRUE. <br>**Example**: `XOR(TRUE, FALSE)` <br>**Available in**: Sheet

### Math

`ABS(number)`
: Returns the absolute value of a number. <br>**Example**: `ABS(26.34)` <br>**Available in**: Table, Sheet

`CEILING(number, factor)`
: Rounds a number up to the nearest integer multiple of the specified factor. <br>**Example**: `CEILING(826.645, 10)` <br>**Available in**: Table, Sheet

`FLOOR(number, factor)`
: Rounds a number down to the nearest integer multiple of the specified factor. <br>**Example**: `FLOOR(826.645, 10)` <br>**Available in**: Table, Sheet

`MOD(number1, number2)`
: Returns the result of the modulo operator, the remainder after a division operation. <br>**Example**: `MOD(5, 2)` <br>**Available in**: Table, Sheet

`POWER(number, power)`
: Returns a number raised to a power. <br>**Example**: `POWER(2, 3)` <br>**Available in**: Table, Sheet

`ROUND(number, places)`
: Rounds a number to a certain number of decimal places. <br>**Example**: `ROUND(826.645, 1)` <br>**Available in**: Table, Sheet

`COUNT(value1, [value2, ...])`
: Counts the number of numeric values in a range. <br>**Example**: `COUNT(A1:A10)` <br>**Available in**: Sheet

`COUNTA(value1, [value2, ...])`
: Counts the number of non-empty values in a range. <br>**Example**: `COUNTA('Logs'#"service")` <br>**Available in**: Sheet

`COUNTBLANK(range)`
: Counts the number of empty cells in a range. <br>**Example**: `COUNTBLANK(A1:A10)` <br>**Available in**: Sheet

`COUNTIF(range, criteria)`
: Counts the number of cells in a range that meet a specified criteria. <br>**Example**: `COUNTIF('Logs'#"status", "error")` <br>**Available in**: Sheet

`COUNTIFS(range1, criteria1, [range2, criteria2, ...])`
: Counts the number of cells in a range that meet multiple criteria. <br>**Example**: `COUNTIFS('Logs'#"status", "error", 'Logs'#"env", "prod")` <br>**Available in**: Sheet

`COUNTUNIQUE(value1, [value2, ...])`
: Counts the number of unique values in a range. <br>**Example**: `COUNTUNIQUE('Logs'#"service")` <br>**Available in**: Sheet

`MAX(value1, [value2, ...])`
: Returns the largest number from a set of values. <br>**Example**: `MAX('APM'#"duration")` <br>**Available in**: Sheet

`MAXIFS(max_range, range1, criteria1, ...)`
: Returns the maximum value in a range that meets multiple criteria. <br>**Example**: `MAXIFS('APM'#"duration", 'APM'#"env", "prod")` <br>**Available in**: Sheet

`MIN(value1, [value2, ...])`
: Returns the smallest number from a set of values. <br>**Example**: `MIN('APM'#"duration")` <br>**Available in**: Sheet

`MINIFS(min_range, range1, criteria1, ...)`
: Returns the minimum value in a range that meets multiple criteria. <br>**Example**: `MINIFS('APM'#"duration", 'APM'#"env", "prod")` <br>**Available in**: Sheet

`PI()`
: Returns the value of π to 15 digits of precision. <br>**Example**: `PI()` <br>**Available in**: Sheet

`RAND()`
: Returns a random number between 0 and 1. <br>**Example**: `RAND()` <br>**Available in**: Sheet

`SQRT(number)`
: Returns the positive square root of a number. <br>**Example**: `SQRT(16) => 4` <br>**Available in**: Sheet

`SUM(value1, [value2, ...])`
: Returns the sum of a series of numbers and/or cells. <br>**Example**: `SUM('Cloud Cost'#"cost")` <br>**Available in**: Sheet

`SUMIF(range, criteria, sum_range)`
: Adds the values in a range that meet criteria you specify. <br>**Example**: `SUMIF('Cloud Cost'#"service", "ec2", 'Cloud Cost'#"cost")` <br>**Available in**: Sheet

`SUMIFS(sum_range, range1, criteria1, ...)`
: Adds the values in a range that meet multiple criteria. <br>**Example**: `SUMIFS('Cloud Cost'#"cost", 'Cloud Cost'#"service", "ec2", 'Cloud Cost'#"env", "prod")` <br>**Available in**: Sheet

### Date and time

`DATE(year, month, day)`
: Converts a provided year, month, and day into a date. <br>**Example**: `DATE(2021, 10, 31)` <br>**Available in**: Table, Sheet

`DATEDIF(start_date, end_date, unit)`
: Calculates the number of days, months, or years between two dates. <br>**Example**: `DATEDIF("10/17/1979", "8/22/2019", "Y") => 39` <br>**Available in**: Table, Sheet

`TODAY()`
: Returns the current date. <br>**Example**: `TODAY()` <br>**Available in**: Sheet

`NOW()`
: Returns the current date and time. <br>**Example**: `NOW()` <br>**Available in**: Sheet

`TIME(hour, minute, second)`
: Converts a provided hour, minute, and second into a time. <br>**Example**: `TIME(11, 40, 59)` <br>**Available in**: Sheet

`YEAR(date)`
: Extracts the year component from a date value. <br>**Example**: `YEAR(DATE(2025, 12, 31))` <br>**Available in**: Sheet

`MONTH(date)`
: Extracts the month component from a date value. <br>**Example**: `MONTH("2023-07-15")` <br>**Available in**: Sheet

`DAY(date)`
: Extracts the day component from a date value. <br>**Example**: `DAY(DATE(2023, 12, 25))` <br>**Available in**: Sheet

`HOUR(time)`
: Extracts the hour component from a time value. <br>**Example**: `HOUR("14:30:45")` <br>**Available in**: Sheet

`MINUTE(time)`
: Extracts the minute component from a time value. <br>**Example**: `MINUTE("14:30:45")` <br>**Available in**: Sheet

`SECOND(time)`
: Extracts the second component from a time value. <br>**Example**: `SECOND("14:30:45")` <br>**Available in**: Sheet

`EDATE(start_date, months)`
: Returns the date that is the indicated number of months before or after a start date. <br>**Example**: `EDATE("2023-01-15", 6)` <br>**Available in**: Sheet

`EOMONTH(start_date, months)`
: Returns the last day of a month that is a specified number of months before or after a given date. <br>**Example**: `EOMONTH(DATE(2023, 12, 12), 0)` <br>**Available in**: Sheet

`WEEKDAY(date, [type])`
: Returns the day of the week as a number. Type 1 (default) = Sun–Sat (1–7), type 2 = Mon–Sun (1–7), type 3 = Mon–Sun (0–6). <br>**Example**: `WEEKDAY(DATE(2023, 12, 12))` <br>**Available in**: Sheet

`WEEKNUM(date, [type])`
: Returns the week number of a specific date within the year. <br>**Example**: `WEEKNUM("2023-01-15")` <br>**Available in**: Sheet

### Lookup and reference

`VLOOKUP(search_key, range, index, [is_sorted])`
: Searches for a value in the first column of a range and returns a value in the same row from a specified column. <br>**Example**: `VLOOKUP("Apple", A1:C10, 2, FALSE)` <br>**Available in**: Sheet

`HLOOKUP(search_key, range, index, [is_sorted])`
: Searches for a value in the first row of a range and returns a value in the same column from a specified row. <br>**Example**: `HLOOKUP("Apple", A1:D3, 2, FALSE)` <br>**Available in**: Sheet

`INDEX(reference, row, [column])`
: Returns the value of an element in a table based on row and column numbers. <br>**Example**: `INDEX(A1:D3, 2, 3)` <br>**Available in**: Sheet

`MATCH(search_key, range, [search_type])`
: Returns the relative position of an item in an array that matches a specified value. <br>**Example**: `MATCH("Apple", A1:A4, 0)` <br>**Available in**: Sheet

`CHOOSE(index, value1, value2, ...)`
: Returns a value from a list based on an index. <br>**Example**: `CHOOSE(2, "A", "B", "C")` <br>**Available in**: Sheet

`ROW([reference])`
: Returns the row number of a reference. <br>**Example**: `ROW(A5) => 5` <br>**Available in**: Sheet

`COLUMN([reference])`
: Returns the column number of a reference. <br>**Example**: `COLUMN(C1) => 3` <br>**Available in**: Sheet

### Statistical

`AVERAGE(value1, [value2, ...])`
: Returns the numerical average value in a dataset, ignoring text. <br>**Example**: `AVERAGE('APM'#"duration")` <br>**Available in**: Sheet

`AVERAGEIF(range, criteria, [average_range])`
: Returns the average of cells that meet a specified criteria. <br>**Example**: `AVERAGEIF('APM'#"env", "prod", 'APM'#"duration")` <br>**Available in**: Sheet

`AVERAGEIFS(average_range, range1, criteria1, ...)`
: Returns the average of cells that meet multiple criteria. <br>**Example**: `AVERAGEIFS('APM'#"duration", 'APM'#"env", "prod", 'APM'#"service", "web")` <br>**Available in**: Sheet

`MEDIAN(value1, [value2, ...])`
: Returns the median (middle value) of a dataset. If the dataset has an even number of values, returns the average of the two middle values. <br>**Example**: `MEDIAN('APM'#"duration")` <br>**Available in**: Sheet

`MODE(value1, [value2, ...])`
: Returns the most frequently occurring value in a dataset. <br>**Example**: `MODE('Logs'#"status_code")` <br>**Available in**: Sheet

`PERCENTILE(data, percentile)`
: Returns the value at a given percentile of a dataset using linear interpolation. <br>**Example**: `PERCENTILE('APM'#"duration", 0.95)` <br>**Available in**: Sheet

`STDEV(value1, [value2, ...])`
: Calculates the standard deviation of a sample dataset. <br>**Example**: `STDEV('APM'#"duration")` <br>**Available in**: Sheet

`VAR(value1, [value2, ...])`
: Calculates the sample variance of a dataset. <br>**Example**: `VAR('APM'#"duration")` <br>**Available in**: Sheet

`FORECAST(x, data_y, data_x)`
: Predicts a future value using existing values and linear regression. <br>**Example**: `FORECAST(5, {1,2,3,4}, {10,20,30,40})` <br>**Available in**: Sheet

`SUMPRODUCT(array1, [array2, ...])`
: Multiplies corresponding elements in arrays and returns the sum of those products. <br>**Example**: `SUMPRODUCT({1,2,3}, {4,5,6}) => 32` <br>**Available in**: Sheet

### Financial

`PMT(rate, number_of_periods, present_value, [future_value], [end_or_beginning])`
: Calculates the payment for a loan based on constant payments and a constant interest rate. <br>**Example**: `PMT(0.05/12, 60, 20000)` <br>**Available in**: Sheet

`PV(rate, number_of_periods, payment_amount, [future_value], [end_or_beginning])`
: Calculates the present value of an investment. <br>**Example**: `PV(0.05/12, 60, -377.42)` <br>**Available in**: Sheet

`FV(rate, number_of_periods, payment_amount, [present_value], [end_or_beginning])`
: Calculates the future value of an investment based on periodic, constant payments and a constant interest rate. <br>**Example**: `FV(0.06/12, 240, -500)` <br>**Available in**: Sheet

`NPV(discount, cashflow1, [cashflow2, ...])`
: Calculates the net present value of an investment based on a discount rate and a series of future cash flows. <br>**Example**: `NPV(0.10, -50000, 8000, 9200, 10400)` <br>**Available in**: Sheet

`IRR(cashflow_amounts, [rate_guess])`
: Calculates the internal rate of return for a series of cash flows. <br>**Example**: `IRR({-50000, 8000, 9200, 10400, 11600, 12800})` <br>**Available in**: Sheet

`NPER(rate, payment_amount, present_value, [future_value], [end_or_beginning])`
: Calculates the number of periods for an investment or loan. <br>**Example**: `NPER(0.05/12, -377.42, 20000)` <br>**Available in**: Sheet

`RATE(number_of_periods, payment_amount, present_value, [future_value], [end_or_beginning], [guess])`
: Calculates the interest rate per period of an annuity. <br>**Example**: `RATE(48, -200, 8000)` <br>**Available in**: Sheet

`RRI(number_of_periods, present_value, future_value)`
: Calculates the equivalent interest rate for the growth of an investment. <br>**Example**: `RRI(10, 100, 200)` <br>**Available in**: Sheet

### Info

`ISBLANK(value)`
: Tests whether a cell is blank. <br>**Example**: `ISBLANK(A1)` <br>**Available in**: Sheet

`ISNUMBER(value)`
: Tests whether a value is a number. <br>**Example**: `ISNUMBER(123)` <br>**Available in**: Sheet

`TYPE(value)`
: Returns the data type of a value as a number (1 = number, 2 = text, 4 = logical, 16 = error). <br>**Example**: `TYPE(123) => 1` <br>**Available in**: Sheet

[1]: /sheets/#sheet-preview
