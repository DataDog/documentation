---
title: Calculated Fields Expression Language
disable_toc: false
further_reading:
- link: "/logs/explorer/calculated_fields/"
  tag: "Documentation"
  text: "Calculated Fields"
---

## Basic syntax and language constructs

| Construct                                                                                          | Syntax and Notation                                                    |
| -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Reserved attribute or tag named `tag`                                                             | `tag` (no prefix required)                                             |
| Attribute named `attr`                                                                             | `@attr` (use an `@` prefix)                                            |
| Calculated field named `field`                                                                     | `#field` (use a `#` prefix)                                            |
| String literal (quote)<br>For example, `text` or `Quoted "text"`.                                   | `"text"`<br> `"Quoted \"text\""`<br>(<a href="https://docs.datadoghq.com/logs/explorer/search_syntax/">Log Search Syntax</a> applies)|
| Numeric literal (number)<br>For example, `ten`.                                                     | `10`                                                                   |
| Function named `func` with parameters `x` and `y`                                                  | `func(x, y)`                                                           |
| Operator<br>For example, a binary operator `*` with operands `x` and `y`.                          | `x*y`                                                                  |

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
{{< /whatsnext >}}


### Arithmetic

| Function | Description | Example |
|----------|-------------|---------|
| `abs(num value)` | Returns the absolute value of a number. | A log event has the following attributes: <br> - `@client_latency` = 2 <br> - `@server_latency` = 3 <br> **Formula:** abs(`@client_latency` - `@server_latency`) <br> **Result:** 1 |
| `ceil(num value)` | Rounds number up to the nearest integer. | A log event has the following attribute: `@value` = 2.2 <br> **Formula:** ceil(`@value`) <br> **Result:** 3 |
| `floor(num value)` | Rounds number down to the nearest integer. | A log event has the following attribute: `@value` = 9.99 <br> **Formula:** floor(`@value`) <br> **Result:** 9 |
| `max(num value [, num value, …])` | Finds maximum value amongst a set of numbers. | A log event has the following attribute: `@list_of_values` = [-1, 1, 5, 5] <br> **Formula:** max(`@list_of_values`) <br> **Result:** 5 |
| `min(num value [, num value, …])` | Finds the minimum value amongst a set of numbers. | A log event has the following attribute: `@list_of_values` = [-1, 1, 5, 5] <br> **Formula:** min(`@list_of_values`) <br> **Result:** -1 |
| `round(num value, int precision)` | Rounds a number. Optionally, define how many decimal places to maintain. | A log event has the following attribute: `@value` = -1234.01 <br> **Formula:** round(`@value`, -1) <br> **Result:** -1230 |

### String

| Function | Description | Example |
|----------|-------------|---------|
| `concat(str value [, expr value, …])` | Combines multiple values into a single string. | A log event has the following attributes: <br> - `@first_name` = "Bob" <br> - `@last_name` = "Smith" <br> **Formula:** concat(`@first_name`, `@last_name`) <br> **Result:** "Bob Smith" |
| `lower(str string)` | Converts string to lowercase. | A log event has the following attribute: `@first_name` = "Bob" <br> **Formula:** lower(`@first_name`) <br> **Result:** "bob" |
| `left(str string, int num_chars)` | Extracts a portion of text from the beginning of a string. | A log event has the following attribute: `@country` = "Canada" <br> **Formula:** upper(left(`@country`, 3)) <br> **Result:** "CAN" |
| `proper(str string)` | Converts string to proper case. | A log event has the following attribute: `@name` = "bob SMITH 123abc" <br> **Formula:** proper(`@name`) <br> **Result:** "Bob Smith 123Abc" |
| `split_before(str string, str separator, int occurrence)` | Extracts the portion of text preceding a certain pattern in a string. | A log event has the following attribute: `@example_url` = "www.example.com/extract/path" <br> **Formula:** split_before(`@example_url`, "/", 1) <br> **Result:** "www.example.com" <br> **Formula:** split_before(`@example_url`, "/", 2) <br> **Result:** "www.example.com/extract" <br>  |
| `split_after(str string, str separator, int occurrence)` | Extracts the portion of text following a certain pattern in a string. | A log event has the following attribute: `@example_url` = "www.example.com/extract/path" <br> **Formula:** split_after(`@example_url`, "/", 1) <br> **Result:** "extract/path" |
| `substring(str string, int start, int length)` | Extracts a portion of text from the middle of a string. | A log event has the following attribute: `@example_url` = "www.example.com/extract/path" <br> **Formula:** substring(`@example_url`, 4, 5) <br> **Result:** "examp" |
| `right(str string, int num_chars)` | Extracts a portion of text from the end of a string. | A log event has the following attribute:  `@country` = "Canada" <br> **Formula:** upper(right(`@country`, 3)) <br> **Result:** "ADA" |
| `textjoin(str delimiter, expr value [, expr value, …])` | Combines multiple values into a single string with a delimiter in between. | A log event has the following attributes: <br> - `@city` = "Paris" <br> - `@country` = "France" <br> **Formula:** textjoin(", ", `@city`, `@country`) <br> **Result:** "Paris, France" |
| `upper(str string)` | Converts string to uppercase. | A log event has the following attribute: `@first_name` = "Bob" <br> **Formula:** upper(`@first_name`) <br> **Result:** "BOB" |

### Logical

| Function | Description | Example |
|----------|-------------|---------|
| `if(expr condition, expr if_true, expr if_false)` | Evaluates a condition and returns a value accordingly. | A log event has the following attributes: <br> - `@origin_country` = "USA" <br> - `@destination_country` = "Canada" <br> - `@origin_continent` = "NA" <br> - `@destination_continent` = "NA" <br> **Formula:** if(`@origin_country` == `@destination_country`, "national", if(`@origin_continent` == `@destination_continent`, "continental", "intercontinental")) <br> **Result:** "continental" |
| `is_null(expr value)` | Checks if an attribute or expression is null. | A log event has the following attributes: <br> - `@users_online` = 5 <br> - `@max_capacity` = 0 <br> **Formula:** is_null(`@users_online` / `@max_capacity`) <br> **Result:** TRUE |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}