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

<h4>abs(<i>num</i> value)</h4>

Returns the absolute value of a number.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attributes:
<br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@client_latency</code> = 2
<br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@server_latency</code> = 3<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formula: abs(<code>@client_latency</code>-<code>@server_latency</code>)
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: 1
</details>

<h4>ceil(<i>num</i> value)</h4>

Rounds number up to the nearest integer.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attribute: <code>@value</code>=2.2<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formula: ceil(<code>@value</code>)
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: 3
</details>

<h4>floor(<i>num</i> value)</h4>

Rounds number down to the nearest integer.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attribute: <code>@value</code>=9.99<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formula: floor(<code>@value</code>)
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: 9
</details>

<h4>max(<i>num</i> value [, <i>num</i> value, …])</h4>

Finds maximum value amongst a set of numbers.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attribute: <code>@list_of_values</code>=[-1, 1, 5, 5]<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formula: max(<code>@list_of_values</code>)
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: 5
</details>

<h4>min(<i>num</i> value [, <i>num</i> value, …])</h4>

Finds the minimum value amongst a set of numbers.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attribute: <code>@list_of_values</code> = [-1, 1, 5, 5]<br>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formula: min(<code>@list_of_values</code>)
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: -1
</details>

<h4>round(<i>num</i> value, <i>int</i> precision)</h4>

Rounds a number. Optionally, define how many decimal places to maintain.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attribute: <code>@randInt</code> = -1234.01<br>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formula: round(<code>@randInt</code>, -1)
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: -1230
</details>

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


<h4>concat(<i>str</i> value [, <i>expr</i> value, …])</h4>

Combines multiple values into a single string.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attributes:
<br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@first_name</code> = "Bob"
<br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@last_name</code> = "Smith"<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formula: concat(<code>@first_name</code>, <code>@last_name</code>)
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: "Bob Smith"
</details>

<h4>lower(<i>str</i> string)</h4>

Converts string to lowercase.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attribute: <code>@first_name</code> = "Bob"<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formula: lower(<code>@first_name</code>)
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: "bob"
</details>

<h4>prefix(<i>str</i> string, <i>int</i> num_chars)</h4>

Extracts a portion of text from the beginning of a string.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attribute: <code>@country</code>="Canada"<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formula: upper(prefix(<code>@country</code>, 3))
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: "CAN"
</details>

<h4>proper(<i>str</i> string)</h4>

Converts string to proper case.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attribute: <code>@name</code> = "bob SMITH"<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formula: proper(<code>@name</code>)
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: "Bob Smith"
</details>

<h4>split_before(<i>str</i> string, <i>str</i> separator, <i>int</i> occurrence)</h4>

Extracts the portion of text preceding a certain pattern in a string.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attribute: <code>@row_value</code> = "1,Bob,Smith"<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formula: split_before(<code>@row_value</code>, ",")
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: "1"
</details>

<h4>split_after(<i>str</i> string, <i>str</i> separator, <i>int</i> occurrence)</h4>

Extracts the portion of text following a certain pattern in a string.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attributes: <code>@row_value</code> = "1,Bob,Smith"<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formula: split_after(<code>@row_value</code>, ",", 2)
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: "Smith"
</details>

<h4>substring(<i>str</i> string, <i>int</i> start, <i>int</i> end)</h4>

Extracts a portion of text from the middle of a string.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attributes: <code>@row_value</code> = "1,Bob,Smith"<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formula: substring(<code>@row_value</code>, 3, 3)
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: "Bob"
</details>

<h4>suffix(<i>str</i> string, <i>int</i> num_chars)</h4>

Extracts a portion of text from the end of a string.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attributes: <code>@url</code> = "www.datadoghq.com"<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formula: suffix(<code>@url</code>, 4)
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: ".com"
</details>

<h4>textjoin(<i>str</i> delimiter, <i>expr</i> value [, <i>expr</i> value, …])</h4>

Combines multiple values into a single string with a delimiter in between.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attributes:
<br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@first_name</code> = "Bob"
<br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@last_name</code> = "Smith"<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formula: textjoin(", ", <code>@last_name</code>, <code>@first_name</code>)
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: "Smith, Bob"
</details>

<h4>upper(<i>str</i> string)</h4>

Converts string to uppercase.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attributes: <code>@first_name</code> = "Bob"<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formula: upper(<code>@first_name</code>)
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: "BOB"
</details>

### Logical

| Function | Description | Example |
|----------|-------------|---------|
| `if(expr condition, expr if_true, expr if_false)` | Evaluates a condition and returns a value accordingly. | A log event has the following attributes: <br> - `@origin_country` = "USA" <br> - `@destination_country` = "Canada" <br> - `@origin_continent` = "NA" <br> - `@destination_continent` = "NA" <br> **Formula:** if(`@origin_country` == `@destination_country`, "national", if(`@origin_continent` == `@destination_continent`, "continental", "intercontinental")) <br> **Result:** "continental" |
| `is_null(expr value)` | Checks if an attribute or expression is null. | A log event has the following attributes: <br> - `@users_online` = 5 <br> - `@max_capacity` = 0 <br> **Formula:** is_null(`@users_online` / `@max_capacity`) <br> **Result:** TRUE |


<h4>case(<i>expr</i> condition, <i>expr</i> value_if_true [, <i>expr</i> condition, <i>expr</i> value_if_true …], <i>expr</i> value_else)</h4>

Evaluates a series of conditions and returns a value accordingly.

<h4>if(<i>expr</i> condition, <i>expr</i> if_true, <i>expr</i> if_false)</h4>

Evaluates a condition and returns a value accordingly.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attributes:
<br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@origin_country</code> = "USA"
<br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@destination_country</code> = "Canada"<br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@origin_continent</code> = "NA"<br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@destination_continent</code> = "NA"<br>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formula: if(<code>@origin_country</code> == <code>@destination_country</code>, "national", if(<code>@origin_continent</code> == <code>@destination_continent</code>, "continental", "intercontinental"))
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: "continental"
</details>

<h4>is_null(<i>expr</i> value)</h4>

Checks if an attribute or expression is null.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attributes:
<br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@users_online</code> = 5
<br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@max_capacity</code> = 0<br>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formula: is_null(<code>@users_online</code> / <code>@max_capacity</code>)
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: TRUE
</details>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}