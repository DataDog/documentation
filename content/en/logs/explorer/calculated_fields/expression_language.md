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
| A log event has the following attributes: <br> - `@client_latency` = 2 <br> - `@server_latency` = 3 | abs(`@client_latency` - `@server_latency`) | 1 |

</details>


<h4>ceil(<i>num</i> value)</h4>

Rounds number up to the nearest integer.

<details>
<summary>Example</summary>

| Example  | Formula | Result |
|----------|-------------|---------|
| A log event has the following attribute:<br>`@value` = 2.2 | ceil(`@value`) | 3 |

</details>


<h4>floor(<i>num</i> value)</h4>

Rounds number down to the nearest integer.

<details>
<summary>Example</summary>

| Example  | Formula | Result |
|----------|-------------|---------|
| A log event has the following attribute:<br>`@value` = 9.99 | floor(`@value`) | 9 |

</details>


<h4>max(<i>num</i> value [, <i>num</i> value, …])</h4>

Finds maximum value amongst a set of numbers.

<details>
<summary>Example</summary>

| Example  | Formula | Result |
|----------|-------------|---------|
| A log event has the following attribute:<br>`@CPU_temperatures` = [-1, 1, 5, 5] | max(`@CPU_temperatures`) | 5 |

</details>


<h4>min(<i>num</i> value [, <i>num</i> value, …])</h4>

Finds the minimum value amongst a set of numbers.

<details>
<summary>Example</summary>

| Example  | Formula | Result |
|----------|-------------|---------|
| A log event has the following attribute:<br>`@CPU_temperatures` = [-1, 1, 5, 5] | min(`@CPU_temperatures`) | -1 |

</details>


<h4>round(<i>num</i> value, <i>int</i> precision)</h4>

Rounds a number. Optionally, define how many decimal places to maintain.

<details>
<summary>Example</summary>

| Example  | Formula | Result |
|----------|-------------|---------|
| A log event has the following attribute:<br>`@value` = -1234.01 | round(`@value`, -1) | -1230 |

</details>

---

### String

<h4>concat(<i>str</i> value [, <i>expr</i> value, …])</h4>

Combines multiple values into a single string.

<details>
<summary>Example</summary>

| Example  | Formula | Result |
|----------|-------------|---------|
| A log event has the following attributes: <br> - `@first_name` = "Bob" <br> - `@last_name` = "Smith" | concat(`@first_name`, `@last_name`) | "Bob Smith" |

</details>


<h4>lower(<i>str</i> string)</h4>

Converts string to lowercase.

<details>
<summary>Example</summary>

| Example  | Formula | Result |
|----------|-------------|---------|
| A log event has the following attribute:<br>`@first_name` = "Bob" | lower(`@first_name`) | "bob" |

</details>


<h4>left(<i>str</i> string, <i>int</i> num_chars)</h4>

Extracts a portion of text from the beginning of a string.

<details>
<summary>Example</summary>

| Example  | Formula | Result |
|----------|-------------|---------|
| A log event has the following attribute:<br>`@country` = "Canada" | upper(left(`@country`, 3)) | "CAN" |

</details>


<h4>proper(<i>str</i> string)</h4>

Converts string to proper case.

<details>
<summary>Example</summary>

| Example  | Formula | Result |
|----------|-------------|---------|
| A log event has the following attribute:<br>`@name` = "bob SMITH 123abc" | proper(`@name`) | "Bob Smith 123Abc" |

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
    <td rowspan ="2">A log event has the following attribute:<br><code>@url</code> = "www.example.com/path/to"</td>
    <td>split_before(<code>@url</code>, "/", 1)</td>
    <td>"www.example.com"</td>
  </tr>
  <tr>
    <td>split_before(<code>@url</code>, "/", 2)</td>
    <td>"www.example.com/path"</td>
  </tr>
</table>

</details>


<h4>split_after(<i>str</i> string, <i>str</i> separator, <i>int</i> occurrence)</h4>

Extracts the portion of text following a certain pattern in a string.

<details>
<summary>Example</summary>

| Example  | Formula | Result |
|----------|-------------|---------|
| A log event has the following attribute:<br>`@url` = "www.example.com/path/to/split" | split_after(`@url`, "/", 1) | "to/split" |

</details>


<h4>substring(<i>str</i> string, <i>int</i> start, <i>int</i> length)</h4>

Extracts a portion of text from the middle of a string.

<details>
<summary>Example</summary>

| Example  | Formula | Result |
|----------|-------------|---------|
| A log event has the following attribute:<br>`@country` = "Canada" | substring(`@country`, 1, 4) | "anad" |

</details>


<h4>right(<i>str</i> string, <i>int</i> num_chars)</h4>

Extracts a portion of text from the end of a string.

<details>
<summary>Example</summary>

| Example  | Formula | Result |
|----------|-------------|---------|
| A log event has the following attribute:<br>`@country` = "Canada" | upper(right(`@country`, 3)) | "ADA" |

</details>


<h4>textjoin(<i>str</i> delimiter, <i>expr</i> value [, <i>expr</i> value, …])</h4>

Combines multiple values into a single string with a delimiter in between.

<details>
<summary>Example</summary>

| Example  | Formula | Result |
|----------|-------------|---------|
| A log event has the following attributes: <br> - `@city` = "Paris" <br> - `@country` = "France" | textjoin(", ", `@city`, `@country`) | "Paris, France" |

</details>


<h4>upper(<i>str</i> string)</h4>

Converts string to uppercase.

<details>
<summary>Example</summary>

| Example  | Formula | Result |
|----------|-------------|---------|
| A log event has the following attribute: `@first_name` = "Bob" | upper(`@first_name`) | "BOB" |

</details>

---

### Logical

<h4>if(<i>expr</i> condition, <i>expr</i> if_true, <i>expr</i> if_false)</h4>

Evaluates a condition and returns a value accordingly.

<details>
<summary>Example</summary>

| Example  | Formula | Result |
|----------|-------------|---------|
| A log event has the following attributes: <br> - `@origin_country` = "USA" <br> - `@destination_country` = "Canada" <br> - `@origin_continent` = "NA" <br> - `@destination_continent` = "NA" | if(`@origin_country` == `@destination_country`, "national", if(`@origin_continent` == `@destination_continent`, "continental", "intercontinental")) | "continental" |

</details>


<h4>is_null(<i>expr</i> value)</h4>

Checks if an attribute or expression is null.

<details>
<summary>Example</summary>

| Example  | Formula | Result |
|----------|-------------|---------|
| A log event has the following attributes: <br> - `@users_online` = 5 <br> - `@max_capacity` = 0 | is_null(`@users_online` / `@max_capacity`) | TRUE |

</details>


## Further reading

{{< partial name="whats-next/whats-next.html" >}}