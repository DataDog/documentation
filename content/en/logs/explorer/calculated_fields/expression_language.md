---
title: Calculated Fields Expression Language
kind: documentation
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

#### abs(num value)

Returns the absolute value of a number.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attributes:
<br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@client_latency</code> = 2
<br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@server_latency</code> = 3<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formula: abs(<code>@client_latency</code>-<code>@server_latency</code>)
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: 1
</details>

#### ceil(num value)

Rounds number up to the nearest integer.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attribute: <code>@value</code>=2.2<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formula: ceil(<code>@value</code>)
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: 3
</details>

#### floor(num value)

Rounds number down to the nearest integer.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attribute: <code>@value</code>=9.99<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formula: floor(<code>@value</code>)
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: 9
</details>

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

#### round(num value, int precision)

Rounds a number. Optionally, define how many decimal places to maintain.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attribute: <code>@randInt</code> = -1234.01<br>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formula: round(<code>@randInt</code>, -1)
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: -1230
</details>

### String

#### concat(str value [, expr value, …])

Combines multiple values into a single string.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attributes:
<br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@first_name</code> = "Bob"
<br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@last_name</code> = "Smith"<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formula: concat(<code>@first_name</code>, <code>@last_name</code>)
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: "Bob Smith"
</details>

#### lower(str string)

Converts string to lowercase.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attribute: <code>@first_name</code> = "Bob"<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formula: lower(<code>@first_name</code>)
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: "bob"
</details>

#### prefix(str string, int num_chars)

Extracts a portion of text from the beginning of a string.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attribute: <code>@country</code>="Canada"<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formula: upper(prefix(<code>@country</code>, 3))
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: "CAN"
</details>

#### proper(str string)

Converts string to proper case.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attribute: <code>@name</code> = "bob SMITH"<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formula: proper(<code>@name</code>)
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: "Bob Smith"
</details>

#### split_before(str string, str separator, int occurrence)

Extracts the portion of text preceding a certain pattern in a string.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attribute: <code>@row_value</code> = "1,Bob,Smith"<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formula: split_before(<code>@row_value</code>, ",")
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: "1"
</details>

#### split_after(str string, str separator, int occurrence)

Extracts the portion of text following a certain pattern in a string.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attributes: <code>@row_value</code> = "1,Bob,Smith"<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formula: split_after(<code>@row_value</code>, ",", 2)
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: "Smith"
</details>

#### substring(str string, int start, int end)

Extracts a portion of text from the middle of a string.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attributes: <code>@row_value</code> = "1,Bob,Smith"<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formula: substring(<code>@row_value</code>, 3, 3)
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: "Bob"
</details>

#### suffix(str string, int num_chars)

Extracts a portion of text from the end of a string.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attributes: <code>@url</code> = "www.datadoghq.com"<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formula: suffix(<code>@url</code>, 4)
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: ".com"
</details>

#### textjoin(str delimiter, expr value [, expr value, …])

Combines multiple values into a single string with a delimiter in between.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attributes:
<br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@first_name</code> = "Bob"
<br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@last_name</code> = "Smith"<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formula: textjoin(", ", <code>@last_name</code>, <code>@first_name</code>)
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: "Smith, Bob"
</details>

#### upper(str string)

Converts string to uppercase.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attributes: <code>@first_name</code> = "Bob"<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formula: upper(<code>@first_name</code>)
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: "BOB"
</details>

### Logical

#### case(expr condition, expr value_if_true [, expr condition, expr value_if_true …], expr value_else)

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