---
title: Expressions Language
kind: documentation
disable_toc: false
further_reading:
- link: "/logs/explorer/calculated_fields/"
  tag: "Documentation"
  text: "Using Calculate Fields"
---

## Overview

Use calculated fields to manipulate text, perform arithmetic operations, and evaluate conditional logic on log data in the Log Explorer. A calculated field's formula (or expression) can include log attributes, other calculated fields, and a set of functions and operators.

## Basic syntax and language constructs

| Construct                                                                                          | Syntax and Notation                                                    |
| -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Core or faceted attribute, or tag named `attr`                                                     | `attr` (no prefix required)                                            |
| Custom, unfaceted attribute named `attr`                                                           | `@attr` (use an `@` prefix)                                            |
| Calculated field named `attr`                                                                      | `#attr` (use a `#` prefix)                                               |
| String literal (quote)<br>For example, `text` or `Some quoted "text"`.                             | `"text"`<br> `"Some quoted \"text\""<br>(<a href="https://docs.datadoghq.com/logs/explorer/search_syntax/">Log Search Syntax</a> applies)|
| Numeric literal (number)<br>For example, `ten` or `two to the power of five`.                      | `10`<br>`2e5`                                                          |
| Function named `func` with parameters `one` and `two`                                              | `func(one, two)`                                                       |
| Operator represented by a symbol or character `x`<br>For example, multiplying operands `y` and `z`.| `y*z`                                                                    |
| Order and grouping of operations                                                                   | `second_operation x (first_operation)`<br>(uses parentheses notation)  |

## Operators

The available operators in order of precedence:

| Operator | Description |
|----------|-------------|
| `()` | A grouping or function call |
| `!`, `NOT`, `-` | A logical or arithmetic negation |
| `*`, `/` | Multiplication, division|
| `+`, `-` | Addition, subtraction |
| `<`, `<=`, `>`, `>=` | Less than, less than or equal to, greater than, greater than or equal to |
| `==`, `!=` | Match, does not match |
| `&&`, `AND` | Logical AND |
| `\|\|`, `OR` | Logical OR |

## Functions

{{< whatsnext desc="The available functions are categorized as follows:" >}}
    {{< nextlink href="/logs/explorer/calculated_fields/expression_language#arithmetic" >}}Arithmetic{{< /nextlink >}}
    {{< nextlink href="/logs/explorer/calculated_fields/expression_language#string" >}}String{{< /nextlink >}}
    {{< nextlink href="/logs/explorer/calculated_fields/expression_language#logical" >}}Logical{{< /nextlink >}}
    {{< nextlink href="/logs/explorer/calculated_fields/expression_language#list" >}}List{{< /nextlink >}}
    {{< nextlink href="/logs/explorer/calculated_fields/expression_language#datetime" >}}Datetime{{< /nextlink >}}
{{< /whatsnext >}}

### Arithmetic

#### abs(num number)

Returns the absolute value of a number.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attributes:
<br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@client_latency</code> = 2
<br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@server_latency</code> = 3<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formula: abs(<code>@client_latency</code>-<code>@server_latency</code>)
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: 1
</details>

#### ceil(num number)

Rounds number up to nearest integer.

#### floor(num number)

Rounds number down to nearest integer.

#### max(num value [, num value, …])

Finds maximum value amongst a set of numbers.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attribute: <code>@list_of_values</code>=[-1, 1, 5, 5]<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formula: max(<code>@list_of_values</code>)
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: 5
</details>

#### min(num value [, num value, …])

Finds the minimum value amongst a set of numbers.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attribute: <code>@list_of_values</code> = [-1, 1, 5, 5]<br>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formula: min(<code>@list_of_values</code>)
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: -1
</details>

#### round(num number, int precision)

Rounds number. Optionally, define how many digits to maintain after (or before, if the number is negative) the decimal.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attribute: <code>@randInt</code> = -1234.01<br>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formula: round(<code>@randInt</code>, -1)
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: -1230
</details>

### String

#### concat(expr value [, expr value, …])

Combines multiple values into a single string.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attributes:
<br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@first_name</code> = "Bob"
<br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@last_name</code> = "Smith"<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formula: concat(<code>@first_name</code>, <code>@last_name</code>)
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: "Bob Smith"
</details>

#### lower(str text)

Converts string to lowercase.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attribute: <code>@first_name</code> = "Bob"<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formula: lower(<code>@first_name</code>)
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: "bob"
</details>

#### proper(str text)

Converts string to proper case.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attribute: <code>@name</code> = "bob SMITH"<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formula: proper(<code>@name</code>)
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: "Bob Smith"
</details>

#### split_before(str text, str separator, int occurrence)

Extracts the portion of text preceding a certain pattern in a string.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attribute: <code>@row_value</code> = "1,Bob,Smith"<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formula: split_before(<code>@row_value</code>, ",", 1)
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: "1"
</details>

#### split_after(str text, str separator, int occurrence)

Extracts the portion of text following a certain pattern in a string.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attributes: <code>@row_value</code> = "1,Bob,Smith"<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formula: split_after(<code>@row_value</code>, ",", 2)
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: "Smith"
</details>

#### substring(str text, int start, int length)

Extracts a portion of text from the middle of a string.

#### suffix(str text, int num_chars)

Extracts a portion of text from the end of a string.

#### textjoin(str delimiter, expr value [, expr value, …])

Combines multiple values into a single string with a delimiter in between.

#### upper(str text)

Converts string to uppercase.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attributes: <code>@first_name</code> = "Bob"<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formula: upper(<code>@first_name</code>)
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: "BOB"
</details>

### Logical

#### case(expr condition, expr if_true [, expr condition, expr if_true …], expr else)

Evaluates a series of conditions and returns a value accordingly.

#### if(expr condition, expr if_true, expr if_false)

Evaluates a condition and returns a value accordingly.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attributes:
<br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@origin_country</code> = "USA"
<br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@destination_country</code> = "Canada"<br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@origin_continent</code> = "NA"<br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@destination_continent</code> = "NA"<br>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formula: if(<code>@origin_country</code> == <code>@destination_country</code>, "national", if(<code>@origin_continent</code> == <code>@destination_continent</code>, "continental", "intercontinental"))
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: "continental"
</details>

#### is_null(expr value)

Checks for nullity of an attribute or expression.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attributes:
<br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@users_online</code> = 5
<br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@max_capacity</code> = 0<br>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formula: is_null(<code>@users_online</code> / <code>@max_capacity</code>)
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: TRUE
</details>

### List

#### len(expr list)

Returns the number of values in a given list.

### Datetime

#### now_ms()

Returns the current timestamp in Unix epoch format (ms).

## Further reading

{{< partial name="whats-next/whats-next.html" >}}