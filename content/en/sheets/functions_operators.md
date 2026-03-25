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

<table>
  <thead>
    <tr>
      <th style="white-space: nowrap; min-width: 250px;">Function</th>
      <th>Description</th>
      <th style="white-space: nowrap; min-width: 220px;">Example</th>
      <th>Available in</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="white-space: nowrap;"><code>REGEXMATCH(text_string, regular_expression)</code></td>
      <td>Evaluates whether a text string matches a regular expression.</td>
      <td style="white-space: nowrap;"><code>REGEXMATCH("ABC 123 def", "\\\\d+") => TRUE</code></td>
      <td>Table, Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>REGEXEXTRACT(text_string, regular_expression)</code></td>
      <td>Extracts the first substring that matches a specified regex pattern.</td>
      <td style="white-space: nowrap;"><code>REGEXEXTRACT("ABC 123 def", "\\\\d+") => "123"</code></td>
      <td>Table, Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>REGEXCOUNT(text_string, regular_expression)</code></td>
      <td>Counts the number of times a regex pattern appears in a text string.</td>
      <td style="white-space: nowrap;"><code>REGEXCOUNT("abc 123 def", "\\\\d+") => 1</code></td>
      <td>Table, Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>REGEXREPLACE(text_string, regular_expression, replacement)</code></td>
      <td>Replaces all substrings matching a regex with a replacement string.</td>
      <td style="white-space: nowrap;"><code>REGEXREPLACE("abc 123 def", "\\\\d+", "NUM") => "abc NUM def"</code></td>
      <td>Table</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>LEN(string)</code></td>
      <td>Returns the length of a string.</td>
      <td style="white-space: nowrap;"><code>LEN("Hello World")</code></td>
      <td>Table, Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>LOWER(string)</code></td>
      <td>Returns the string in lowercase.</td>
      <td style="white-space: nowrap;"><code>LOWER("HELLO WORLD")</code></td>
      <td>Table, Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>UPPER(string)</code></td>
      <td>Returns the string in uppercase.</td>
      <td style="white-space: nowrap;"><code>UPPER("hello world")</code></td>
      <td>Table, Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>LEFT(string, number_of_characters)</code></td>
      <td>Returns a substring from the beginning of a specified string.</td>
      <td style="white-space: nowrap;"><code>LEFT("Datadog", 4)</code></td>
      <td>Table, Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>RIGHT(string, number_of_characters)</code></td>
      <td>Returns a substring from the end of a specified string.</td>
      <td style="white-space: nowrap;"><code>RIGHT("DATADOG", 3)</code></td>
      <td>Table, Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>MID(text, start, length)</code></td>
      <td>Returns characters from the middle of text.</td>
      <td style="white-space: nowrap;"><code>MID("Hello World", 7, 5) => "World"</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>CONCATENATE(string1, string2, ...)</code></td>
      <td>Appends strings to one another. Equivalent to the <code>&</code> operator.</td>
      <td style="white-space: nowrap;"><code>CONCATENATE("data", "dog")</code></td>
      <td>Table, Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>CONTAINS(string, substring)</code></td>
      <td>Returns TRUE if the string contains the substring, FALSE otherwise.</td>
      <td style="white-space: nowrap;"><code>CONTAINS("is the word string in this sentence?", "string")</code></td>
      <td>Table, Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>SUBSTITUTE(text, old_text, new_text, [instance_num])</code></td>
      <td>Replaces occurrences of old_text with new_text. If instance_num is omitted, all occurrences are replaced; otherwise, only the specified instance is replaced.</td>
      <td style="white-space: nowrap;"><code>SUBSTITUTE("hello world", "world", "Datadog") => "hello Datadog"</code></td>
      <td>Table, Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>TEXTJOIN(delimiter, ignore_empty, text1, [text2, ...])</code></td>
      <td>Combines the text from multiple strings with the specified delimiter.</td>
      <td style="white-space: nowrap;"><code>TEXTJOIN(" ", TRUE, "hello", "world")</code></td>
      <td>Table, Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>FIND(search_for, text_to_search)</code></td>
      <td>Finds the position of text within text (case-sensitive). Returns an error if not found.</td>
      <td style="white-space: nowrap;"><code>FIND("World", "Hello World") => 7</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>CHAR(number)</code></td>
      <td>Converts a number into a character according to the Unicode character set.</td>
      <td style="white-space: nowrap;"><code>CHAR(65) => "A"</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>CLEAN(text)</code></td>
      <td>Removes non-printable characters from text.</td>
      <td style="white-space: nowrap;"><code>CLEAN(A1)</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>TEXT(number, format)</code></td>
      <td>Formats a number as text using a format pattern. Supports number, date, and time formatting.</td>
      <td style="white-space: nowrap;"><code>TEXT(1234.5, "#,##0.00") => "1,234.50"</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>TRIM(text)</code></td>
      <td>Removes leading, trailing, and extra spaces from text.</td>
      <td style="white-space: nowrap;"><code>TRIM("  hello  ") => "hello"</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>VALUE(text)</code></td>
      <td>Converts text to a number.</td>
      <td style="white-space: nowrap;"><code>VALUE("123") => 123</code></td>
      <td>Sheet</td>
    </tr>
  </tbody>
</table>

### Logical

<table>
  <thead>
    <tr>
      <th style="white-space: nowrap; min-width: 250px;">Function</th>
      <th>Description</th>
      <th style="white-space: nowrap; min-width: 220px;">Example</th>
      <th>Available in</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="white-space: nowrap;"><code>IF(logical_expression, value_if_true, value_if_false)</code></td>
      <td>Returns one value if a logical expression is TRUE and another if it is FALSE.</td>
      <td style="white-space: nowrap;"><code>IF(42>9, "all good", "something is wrong in the matrix")</code></td>
      <td>Table, Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>IFS(logical_test1, value_if_true1, [logical_test2, value_if_true2], …)</code></td>
      <td>Evaluates one or more condition/value pairs and returns the value for the first true condition. Use TRUE as the final condition to define a default value.</td>
      <td style="white-space: nowrap;"><code>IFS(A1>90, "A", A1>80, "B", TRUE, "C")</code></td>
      <td>Table, Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>AND(logical_expression1, [logical_expression2, …])</code></td>
      <td>Returns true if all of the provided arguments are logically true, and false if any of the provided arguments are logically false.</td>
      <td style="white-space: nowrap;"><code>AND(A1=1, A2=2)</code></td>
      <td>Table, Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>OR(logical_expression1, [logical_expression2, …])</code></td>
      <td>Returns true if any of the provided arguments are logically true, and false if all of the provided arguments are logically false.</td>
      <td style="white-space: nowrap;"><code>OR(A1=1, A2=2)</code></td>
      <td>Table, Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>NOT(logical_expression)</code></td>
      <td>Returns the opposite of a logical value.</td>
      <td style="white-space: nowrap;"><code>NOT(TRUE)</code></td>
      <td>Table, Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>TRUE()</code></td>
      <td>Returns the logical value TRUE.</td>
      <td style="white-space: nowrap;"><code>TRUE()</code></td>
      <td>Table, Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>FALSE()</code></td>
      <td>Returns the logical value FALSE.</td>
      <td style="white-space: nowrap;"><code>FALSE()</code></td>
      <td>Table, Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>IFERROR(value, value_if_error)</code></td>
      <td>Returns a specified value if a formula evaluates to an error; otherwise returns the result of the formula.</td>
      <td style="white-space: nowrap;"><code>IFERROR(1/0, "Division Error")</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>IFNA(value, value_if_na)</code></td>
      <td>Returns a specified value if a formula evaluates to #N/A; otherwise returns the result of the formula.</td>
      <td style="white-space: nowrap;"><code>IFNA(VLOOKUP("x", A1:B10, 2, FALSE), "Not found")</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>SWITCH(expression, case1, value1, ..., [default])</code></td>
      <td>Compares expression to cases and returns the corresponding value.</td>
      <td style="white-space: nowrap;"><code>SWITCH(A1, 1, "One", 2, "Two", "Other")</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>XOR(logical_expression1, [logical_expression2, …])</code></td>
      <td>Returns TRUE if an odd number of arguments are TRUE.</td>
      <td style="white-space: nowrap;"><code>XOR(TRUE, FALSE)</code></td>
      <td>Sheet</td>
    </tr>
  </tbody>
</table>

### Math

<table>
  <thead>
    <tr>
      <th style="white-space: nowrap; min-width: 250px;">Function</th>
      <th>Description</th>
      <th style="white-space: nowrap; min-width: 220px;">Example</th>
      <th>Available in</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="white-space: nowrap;"><code>ABS(number)</code></td>
      <td>Returns the absolute value of a number.</td>
      <td style="white-space: nowrap;"><code>ABS(26.34)</code></td>
      <td>Table, Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>CEILING(number, factor)</code></td>
      <td>Rounds a number up to the nearest integer multiple of the specified factor.</td>
      <td style="white-space: nowrap;"><code>CEILING(826.645, 10)</code></td>
      <td>Table, Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>FLOOR(number, factor)</code></td>
      <td>Rounds a number down to the nearest integer multiple of the specified factor.</td>
      <td style="white-space: nowrap;"><code>FLOOR(826.645, 10)</code></td>
      <td>Table, Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>MOD(number1, number2)</code></td>
      <td>Returns the result of the modulo operator, the remainder after a division operation.</td>
      <td style="white-space: nowrap;"><code>MOD(5, 2)</code></td>
      <td>Table, Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>POWER(number, power)</code></td>
      <td>Returns a number raised to a power.</td>
      <td style="white-space: nowrap;"><code>POWER(2, 3)</code></td>
      <td>Table, Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>ROUND(number, places)</code></td>
      <td>Rounds a number to a certain number of decimal places.</td>
      <td style="white-space: nowrap;"><code>ROUND(826.645, 1)</code></td>
      <td>Table, Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>COUNT(value1, [value2, ...])</code></td>
      <td>Counts the number of numeric values in a range.</td>
      <td style="white-space: nowrap;"><code>COUNT(A1:A10)</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>COUNTA(value1, [value2, ...])</code></td>
      <td>Counts the number of non-empty values in a range.</td>
      <td style="white-space: nowrap;"><code>COUNTA('Logs'#"service")</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>COUNTBLANK(range)</code></td>
      <td>Counts the number of empty cells in a range.</td>
      <td style="white-space: nowrap;"><code>COUNTBLANK(A1:A10)</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>COUNTIF(range, criteria)</code></td>
      <td>Counts the number of cells in a range that meet a specified criteria.</td>
      <td style="white-space: nowrap;"><code>COUNTIF('Logs'#"status", "error")</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>COUNTIFS(range1, criteria1, [range2, criteria2, ...])</code></td>
      <td>Counts the number of cells in a range that meet multiple criteria.</td>
      <td style="white-space: nowrap;"><code>COUNTIFS('Logs'#"status", "error", 'Logs'#"env", "prod")</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>COUNTUNIQUE(value1, [value2, ...])</code></td>
      <td>Counts the number of unique values in a range.</td>
      <td style="white-space: nowrap;"><code>COUNTUNIQUE('Logs'#"service")</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>MAX(value1, [value2, ...])</code></td>
      <td>Returns the largest number from a set of values.</td>
      <td style="white-space: nowrap;"><code>MAX('APM'#"duration")</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>MAXIFS(max_range, range1, criteria1, ...)</code></td>
      <td>Returns the maximum value in a range that meets multiple criteria.</td>
      <td style="white-space: nowrap;"><code>MAXIFS('APM'#"duration", 'APM'#"env", "prod")</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>MIN(value1, [value2, ...])</code></td>
      <td>Returns the smallest number from a set of values.</td>
      <td style="white-space: nowrap;"><code>MIN('APM'#"duration")</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>MINIFS(min_range, range1, criteria1, ...)</code></td>
      <td>Returns the minimum value in a range that meets multiple criteria.</td>
      <td style="white-space: nowrap;"><code>MINIFS('APM'#"duration", 'APM'#"env", "prod")</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>PI()</code></td>
      <td>Returns the value of π to 15 digits of precision.</td>
      <td style="white-space: nowrap;"><code>PI()</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>RAND()</code></td>
      <td>Returns a random number between 0 and 1.</td>
      <td style="white-space: nowrap;"><code>RAND()</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>SQRT(number)</code></td>
      <td>Returns the positive square root of a number.</td>
      <td style="white-space: nowrap;"><code>SQRT(16) => 4</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>SUM(value1, [value2, ...])</code></td>
      <td>Returns the sum of a series of numbers and/or cells.</td>
      <td style="white-space: nowrap;"><code>SUM('Cloud Cost'#"cost")</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>SUMIF(range, criteria, sum_range)</code></td>
      <td>Adds the values in a range that meet criteria you specify.</td>
      <td style="white-space: nowrap;"><code>SUMIF('Cloud Cost'#"service", "ec2", 'Cloud Cost'#"cost")</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>SUMIFS(sum_range, range1, criteria1, ...)</code></td>
      <td>Adds the values in a range that meet multiple criteria.</td>
      <td style="white-space: nowrap;"><code>SUMIFS('Cloud Cost'#"cost", 'Cloud Cost'#"service", "ec2", 'Cloud Cost'#"env", "prod")</code></td>
      <td>Sheet</td>
    </tr>
  </tbody>
</table>

### Date and time

<table>
  <thead>
    <tr>
      <th style="white-space: nowrap; min-width: 250px;">Function</th>
      <th>Description</th>
      <th style="white-space: nowrap; min-width: 220px;">Example</th>
      <th>Available in</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="white-space: nowrap;"><code>DATE(year, month, day)</code></td>
      <td>Converts a provided year, month, and day into a date.</td>
      <td style="white-space: nowrap;"><code>DATE(2021, 10, 31)</code></td>
      <td>Table, Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>DATEDIF(start_date, end_date, unit)</code></td>
      <td>Calculates the number of days, months, or years between two dates.</td>
      <td style="white-space: nowrap;"><code>DATEDIF("10/17/1979", "8/22/2019", "Y") => 39</code></td>
      <td>Table, Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>TODAY()</code></td>
      <td>Returns the current date.</td>
      <td style="white-space: nowrap;"><code>TODAY()</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>NOW()</code></td>
      <td>Returns the current date and time.</td>
      <td style="white-space: nowrap;"><code>NOW()</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>TIME(hour, minute, second)</code></td>
      <td>Converts a provided hour, minute, and second into a time.</td>
      <td style="white-space: nowrap;"><code>TIME(11, 40, 59)</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>YEAR(date)</code></td>
      <td>Extracts the year component from a date value.</td>
      <td style="white-space: nowrap;"><code>YEAR(DATE(2025, 12, 31))</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>MONTH(date)</code></td>
      <td>Extracts the month component from a date value.</td>
      <td style="white-space: nowrap;"><code>MONTH("2023-07-15")</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>DAY(date)</code></td>
      <td>Extracts the day component from a date value.</td>
      <td style="white-space: nowrap;"><code>DAY(DATE(2023, 12, 25))</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>HOUR(time)</code></td>
      <td>Extracts the hour component from a time value.</td>
      <td style="white-space: nowrap;"><code>HOUR("14:30:45")</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>MINUTE(time)</code></td>
      <td>Extracts the minute component from a time value.</td>
      <td style="white-space: nowrap;"><code>MINUTE("14:30:45")</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>SECOND(time)</code></td>
      <td>Extracts the second component from a time value.</td>
      <td style="white-space: nowrap;"><code>SECOND("14:30:45")</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>EDATE(start_date, months)</code></td>
      <td>Returns the date that is the indicated number of months before or after a start date.</td>
      <td style="white-space: nowrap;"><code>EDATE("2023-01-15", 6)</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>EOMONTH(start_date, months)</code></td>
      <td>Returns the last day of a month that is a specified number of months before or after a given date.</td>
      <td style="white-space: nowrap;"><code>EOMONTH(DATE(2023, 12, 12), 0)</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>WEEKDAY(date, [type])</code></td>
      <td>Returns the day of the week as a number. Type 1 (default) = Sun–Sat (1–7), type 2 = Mon–Sun (1–7), type 3 = Mon–Sun (0–6).</td>
      <td style="white-space: nowrap;"><code>WEEKDAY(DATE(2023, 12, 12))</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>WEEKNUM(date, [type])</code></td>
      <td>Returns the week number of a specific date within the year.</td>
      <td style="white-space: nowrap;"><code>WEEKNUM("2023-01-15")</code></td>
      <td>Sheet</td>
    </tr>
  </tbody>
</table>

### Lookup and reference

<table>
  <thead>
    <tr>
      <th style="white-space: nowrap; min-width: 250px;">Function</th>
      <th>Description</th>
      <th style="white-space: nowrap; min-width: 220px;">Example</th>
      <th>Available in</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="white-space: nowrap;"><code>VLOOKUP(search_key, range, index, [is_sorted])</code></td>
      <td>Searches for a value in the first column of a range and returns a value in the same row from a specified column.</td>
      <td style="white-space: nowrap;"><code>VLOOKUP("Apple", A1:C10, 2, FALSE)</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>HLOOKUP(search_key, range, index, [is_sorted])</code></td>
      <td>Searches for a value in the first row of a range and returns a value in the same column from a specified row.</td>
      <td style="white-space: nowrap;"><code>HLOOKUP("Apple", A1:D3, 2, FALSE)</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>INDEX(reference, row, [column])</code></td>
      <td>Returns the value of an element in a table based on row and column numbers.</td>
      <td style="white-space: nowrap;"><code>INDEX(A1:D3, 2, 3)</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>MATCH(search_key, range, [search_type])</code></td>
      <td>Returns the relative position of an item in an array that matches a specified value.</td>
      <td style="white-space: nowrap;"><code>MATCH("Apple", A1:A4, 0)</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>CHOOSE(index, value1, value2, ...)</code></td>
      <td>Returns a value from a list based on an index.</td>
      <td style="white-space: nowrap;"><code>CHOOSE(2, "A", "B", "C")</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>ROW([reference])</code></td>
      <td>Returns the row number of a reference.</td>
      <td style="white-space: nowrap;"><code>ROW(A5) => 5</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>COLUMN([reference])</code></td>
      <td>Returns the column number of a reference.</td>
      <td style="white-space: nowrap;"><code>COLUMN(C1) => 3</code></td>
      <td>Sheet</td>
    </tr>
  </tbody>
</table>

### Statistical

<table>
  <thead>
    <tr>
      <th style="white-space: nowrap; min-width: 250px;">Function</th>
      <th>Description</th>
      <th style="white-space: nowrap; min-width: 220px;">Example</th>
      <th>Available in</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="white-space: nowrap;"><code>AVERAGE(value1, [value2, ...])</code></td>
      <td>Returns the numerical average value in a dataset, ignoring text.</td>
      <td style="white-space: nowrap;"><code>AVERAGE('APM'#"duration")</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>AVERAGEIF(range, criteria, [average_range])</code></td>
      <td>Returns the average of cells that meet a specified criteria.</td>
      <td style="white-space: nowrap;"><code>AVERAGEIF('APM'#"env", "prod", 'APM'#"duration")</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>AVERAGEIFS(average_range, range1, criteria1, ...)</code></td>
      <td>Returns the average of cells that meet multiple criteria.</td>
      <td style="white-space: nowrap;"><code>AVERAGEIFS('APM'#"duration", 'APM'#"env", "prod", 'APM'#"service", "web")</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>MEDIAN(value1, [value2, ...])</code></td>
      <td>Returns the median (middle value) of a dataset. If the dataset has an even number of values, returns the average of the two middle values.</td>
      <td style="white-space: nowrap;"><code>MEDIAN('APM'#"duration")</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>MODE(value1, [value2, ...])</code></td>
      <td>Returns the most frequently occurring value in a dataset.</td>
      <td style="white-space: nowrap;"><code>MODE('Logs'#"status_code")</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>PERCENTILE(data, percentile)</code></td>
      <td>Returns the value at a given percentile of a dataset using linear interpolation.</td>
      <td style="white-space: nowrap;"><code>PERCENTILE('APM'#"duration", 0.95)</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>STDEV(value1, [value2, ...])</code></td>
      <td>Calculates the standard deviation of a sample dataset.</td>
      <td style="white-space: nowrap;"><code>STDEV('APM'#"duration")</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>VAR(value1, [value2, ...])</code></td>
      <td>Calculates the sample variance of a dataset.</td>
      <td style="white-space: nowrap;"><code>VAR('APM'#"duration")</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>FORECAST(x, data_y, data_x)</code></td>
      <td>Predicts a future value using existing values and linear regression.</td>
      <td style="white-space: nowrap;"><code>FORECAST(5, {1,2,3,4}, {10,20,30,40})</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>SUMPRODUCT(array1, [array2, ...])</code></td>
      <td>Multiplies corresponding elements in arrays and returns the sum of those products.</td>
      <td style="white-space: nowrap;"><code>SUMPRODUCT({1,2,3}, {4,5,6}) => 32</code></td>
      <td>Sheet</td>
    </tr>
  </tbody>
</table>

### Financial

<table>
  <thead>
    <tr>
      <th style="white-space: nowrap; min-width: 250px;">Function</th>
      <th>Description</th>
      <th style="white-space: nowrap; min-width: 220px;">Example</th>
      <th>Available in</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="white-space: nowrap;"><code>PMT(rate, number_of_periods, present_value, [future_value], [end_or_beginning])</code></td>
      <td>Calculates the payment for a loan based on constant payments and a constant interest rate.</td>
      <td style="white-space: nowrap;"><code>PMT(0.05/12, 60, 20000)</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>PV(rate, number_of_periods, payment_amount, [future_value], [end_or_beginning])</code></td>
      <td>Calculates the present value of an investment.</td>
      <td style="white-space: nowrap;"><code>PV(0.05/12, 60, -377.42)</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>FV(rate, number_of_periods, payment_amount, [present_value], [end_or_beginning])</code></td>
      <td>Calculates the future value of an investment based on periodic, constant payments and a constant interest rate.</td>
      <td style="white-space: nowrap;"><code>FV(0.06/12, 240, -500)</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>NPV(discount, cashflow1, [cashflow2, ...])</code></td>
      <td>Calculates the net present value of an investment based on a discount rate and a series of future cash flows.</td>
      <td style="white-space: nowrap;"><code>NPV(0.10, -50000, 8000, 9200, 10400)</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>IRR(cashflow_amounts, [rate_guess])</code></td>
      <td>Calculates the internal rate of return for a series of cash flows.</td>
      <td style="white-space: nowrap;"><code>IRR({-50000, 8000, 9200, 10400, 11600, 12800})</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>NPER(rate, payment_amount, present_value, [future_value], [end_or_beginning])</code></td>
      <td>Calculates the number of periods for an investment or loan.</td>
      <td style="white-space: nowrap;"><code>NPER(0.05/12, -377.42, 20000)</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>RATE(number_of_periods, payment_amount, present_value, [future_value], [end_or_beginning], [guess])</code></td>
      <td>Calculates the interest rate per period of an annuity.</td>
      <td style="white-space: nowrap;"><code>RATE(48, -200, 8000)</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>RRI(number_of_periods, present_value, future_value)</code></td>
      <td>Calculates the equivalent interest rate for the growth of an investment.</td>
      <td style="white-space: nowrap;"><code>RRI(10, 100, 200)</code></td>
      <td>Sheet</td>
    </tr>
  </tbody>
</table>

### Info

<table>
  <thead>
    <tr>
      <th style="white-space: nowrap; min-width: 250px;">Function</th>
      <th>Description</th>
      <th style="white-space: nowrap; min-width: 220px;">Example</th>
      <th>Available in</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="white-space: nowrap;"><code>ISBLANK(value)</code></td>
      <td>Tests whether a cell is blank.</td>
      <td style="white-space: nowrap;"><code>ISBLANK(A1)</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>ISNUMBER(value)</code></td>
      <td>Tests whether a value is a number.</td>
      <td style="white-space: nowrap;"><code>ISNUMBER(123)</code></td>
      <td>Sheet</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>TYPE(value)</code></td>
      <td>Returns the data type of a value as a number (1 = number, 2 = text, 4 = logical, 16 = error).</td>
      <td style="white-space: nowrap;"><code>TYPE(123) => 1</code></td>
      <td>Sheet</td>
    </tr>
  </tbody>
</table>

[1]: /sheets/#sheet-preview
