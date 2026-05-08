---
title: Formulas
disable_toc: false
aliases:
- /logs/explorer/calculated_fields/expression_language
further_reading:
- link: "/logs/explorer/calculated_fields/"
  tag: "Documentation"
  text: "Calculated Fields"
---

## Overview

The formula (or expression) defines the value of the value of the calculated field for each log event. You can reference log attributes, other calculated fields, and supported functions and operators. As you write or edit a formula, the editor automatically suggests relevant fields, functions, and operators.

## Basic syntax and language constructs

| Construct                                                                 | Syntax and Notation                                                                                                                  |
| --------------------------------------------------------------------------| ------------------------------------------------------------------------------------------------------------------------------------ |
| Reserved attribute or tag named `tag`                                     | `tag` (no prefix required)<br>For tags containing dashes, escape them with a backslash.<br>Example: `ci\-job\-id`                    |
| Attribute named `attr`                                                    | `@attr` (use an `@` prefix)                                                                                                          |
| Calculated field named `field`                                            | `#field` (use a `#` prefix)                                                                                                          |
| String literal (quote)<br>For example, `text` or `Quoted "text"`.         | `"text"`<br> `"Quoted \"text\""`<br>(<a href="https://docs.datadoghq.com/logs/explorer/search_syntax/">Log Search Syntax</a> applies)|
| Numeric literal (number)<br>For example, `ten`.                           | `10`                                                                                                                                 |
| Function named `func` with parameters `x` and `y`                         | `func(x, y)`                                                                                                                         |
| Operator<br>For example, a binary operator `*` with operands `x` and `y`. | `x*y`                                                                                                                                |

## Operators

The available operators in order of precedence:

| Operator | Description |
|----------|-------------|
| `()` | A grouping or function call |
| `!`, `NOT`, `-` | A logical or arithmetic negation |
| `^`, `%` | Exponentiation, Modulo|
| `*`, `/` | Multiplication, division|
| `+`, `-` | Addition, subtraction |
| `<`, `<=`, `>`, `>=` | Less than, less than or equal to, greater than, greater than or equal to |
| `==`, `!=` | Match, does not match |
| `&&`, `AND` | Logical AND |
| `\|\|`, `OR` | Logical OR |

## Functions

The available functions are categorized as follows:
- [Arithmetic](#arithmetic)
- [String](#string)
- [Logical](#logical)


### Arithmetic

<h4>abs(<i>num</i> value)</h4>

Returns the absolute value of a number.

<details>
<summary>Example</summary>

| Example  | Formula | Result |
|----------|-------------|---------|
| A log event has the following attributes: <br> - `@client_latency` = 2 <br> - `@server_latency` = 3 | `#discrepancy = abs(@client_latency - @server_latency)` | `#discrepancy` = 1 |

</details>


<h4>ceil(<i>num</i> value)</h4>

Rounds number up to the nearest integer.

<details>
<summary>Example</summary>

| Example  | Formula | Result |
|----------|-------------|---------|
| A log event has the following attribute:<br>`@value` = 2.2 | `#rounded_up = ceil(@value)` | `#rounded_up` = 3 |

</details>


<h4>floor(<i>num</i> value)</h4>

Rounds number down to the nearest integer.

<details>
<summary>Example</summary>

| Example  | Formula | Result |
|----------|-------------|---------|
| A log event has the following attribute:<br>`@value` = 9.99 | `#rounded_down = floor(@value)` | `#rounded_down` = 9 |

</details>


<h4>max(<i>num</i> value, [ <i>num</i> value, …])</h4>

Finds maximum value amongst a set of numbers.

<details>
<summary>Example</summary>

| Example  | Formula | Result |
|----------|-------------|---------|
| A log event has the following attribute:<br>`@CPU_temperatures` = [-1, 1, 5, 5] | `#highest_temp = max(@CPU_temperatures)` | `#highest_temp` = 5 |

</details>


<h4>min(<i>num</i> value, [<i>num</i> value, …])</h4>

Finds the minimum value amongst a set of numbers.

<details>
<summary>Example</summary>

| Example  | Formula | Result |
|----------|-------------|---------|
| A log event has the following attribute:<br>`@CPU_temperatures` = [-1, 1, 5, 5] | `#lowest_temp = min(@CPU_temperatures)` | `#lowest_temp` = -1 |

</details>


<h4>round(<i>num</i> value, <i>int</i> precision)</h4>

Rounds a number. Optionally, define how many decimal places to maintain.

<details>
<summary>Example</summary>

| Example  | Formula | Result |
|----------|-------------|---------|
| A log event has the following attribute:<br>`@value` = -1234.01 | `#rounded_to_tens = round(@value, -1)` | `#rounded_to_tens` = -1230 |

</details>

---

### String

<h4>concat(<i>str</i> string [<i>str</i> string, <i>expr</i> value, …])</h4>

Combines multiple values into a single string.

<details>
<summary>Example</summary>

| Example  | Formula | Result |
|----------|-------------|---------|
| A log event has the following attributes: <br> - `@city` = "Paris" <br> - `@country` = "France" | `#region = concat(@city, ", ", @country)` | `#region` = "Paris, France" |

</details>


<h4>lower(<i>str</i> string)</h4>

Converts string to lowercase.

<details>
<summary>Example</summary>

| Example  | Formula | Result |
|----------|-------------|---------|
| A log event has the following attribute:<br>`@first_name` = "Bob" | `#lower_name = lower(@first_name)` | `#lower_name` = "bob" |

</details>


<h4>left(<i>str</i> string, <i>int</i> num_chars)</h4>

Extracts a portion of text from the beginning of a string.

<details>
<summary>Example</summary>

| Example  | Formula | Result |
|----------|-------------|---------|
| A log event has the following attribute:<br>`@price` = "USD10.50" | `#currency = left(@price, 3)` | `#currency` = "USD" |

</details>


<h4>proper(<i>str</i> string)</h4>

Converts string to proper case.

<details>
<summary>Example</summary>

| Example  | Formula | Result |
|----------|-------------|---------|
| A log event has the following attribute:<br>`@address` = "123 main st" | `#formatted_address = proper(@address)` | `#formatted_address` = "123 Main St" |

</details>


<h4>split_before(<i>str</i> string, <i>str</i> separator, <i>int</i> occurrence)</h4>

Extracts the portion of text preceding a certain pattern in a string.

<details>
<summary>Example</summary>

<table>
  <tr>
    <th>Example</th>
    <th>Formula</th>
    <th>Result</th>
  </tr>
  <tr>
    <td rowspan ="2">A log event has the following attribute:<br><code>@url</code> = "www.example.com/path/to/split"</td>
    <td><code>#url_extraction = split_before(@url, "/", 1)</code></td>
    <td><code>#url_extraction</code> = "www.example.com/path"</td>
  </tr>
  <tr>
    <td><code>#url_extraction = split_before(@url, "/", 2)</code></td>
    <td><code>#url_extraction</code> = "www.example.com/path/to"</td>
  </tr>
</table>

</details>


<h4>split_after(<i>str</i> string, <i>str</i> separator, <i>int</i> occurrence)</h4>

Extracts the portion of text following a certain pattern in a string.

<details>
<summary>Example</summary>

<table>
  <tr>
    <th>Example</th>
    <th>Formula</th>
    <th>Result</th>
  </tr>
  <tr>
    <td rowspan ="2">A log event has the following attribute:<br><code>@url</code> = "www.example.com/path/to/split"</td>
    <td><code>#url_extraction = split_after(@url, "/", 0)</code></td>
    <td><code>#url_extraction</code> = "path/to/split"</td>
  </tr>
  <tr>
    <td><code>#url_extraction = split_after(@url, "/", 1)</code></td>
    <td><code>#url_extraction</code> = "to/split"
</table>

</details>


<h4>substring(<i>str</i> string, <i>int</i> start, <i>int</i> length)</h4>

Extracts a portion of text from the middle of a string.

<details>
<summary>Example</summary>

| Example  | Formula | Result |
|----------|-------------|---------|
| A log event has the following attribute:<br>`@price` = "USD10.50" | `#dollar_value = substring(@price, 2, 2)` | `#dollar_value` = "10" |


</details>


<h4>right(<i>str</i> string, <i>int</i> num_chars)</h4>

Extracts a portion of text from the end of a string.

<details>
<summary>Example</summary>

| Example  | Formula | Result |
|----------|-------------|---------|
| A log event has the following attribute:<br>`@price` = "USD10.50" | `#cent_value = right(@price, 2)` | `#cent_value` = "50" |

</details>


<h4>textjoin(<i>str</i> delimiter, <i>bool</i> ignore_empty, <i>str</i> string [<i>str</i> string, <i>expr</i> value, …])</h4>

Combines multiple values into a single string with a delimiter in between.

<details>
<summary>Example</summary>

| Example  | Formula | Result |
|----------|-------------|---------|
| A log event has the following attributes: <br> - `@city` = "Paris" <br> - `@country` = "France" | `#region = textjoin(", ", "false", @city, @country)` | `#region` = "Paris, France" |

</details>


<h4>upper(<i>str</i> string)</h4>

Converts string to uppercase.

<details>
<summary>Example</summary>

| Example  | Formula | Result |
|----------|-------------|---------|
| A log event has the following attribute: `@first_name` = "Bob" | `#upper_name = upper(@first_name)` | `#upper_name` = "BOB" |

</details>

---

### Logical

<h4>if(<i>expr</i> condition, <i>expr</i> if_true, <i>expr</i> if_false)</h4>

Evaluates a condition and returns a value accordingly.

<details>
<summary>Example</summary>

| Example  | Formula | Result |
|----------|-------------|---------|
| A log event has the following attributes: <br> - `@location` = "Paris, France" <br> - `@home` = "New York, USA" | `#abroad = if(@location == @home, "false", "true")` | `#abroad` = "true" |

</details>


<h4>is_null(<i>expr</i> value)</h4>

Checks if an attribute or expression is null.

<details>
<summary>Example</summary>

| Example  | Formula | Result |
|----------|-------------|---------|
| A log event has the following attributes: <br> - `@users_online` = 5 <br> - `@max_capacity` = 0 | `is_null(@users_online / @max_capacity)` | "true" |

</details>


## Further reading

{{< partial name="whats-next/whats-next.html" >}}
