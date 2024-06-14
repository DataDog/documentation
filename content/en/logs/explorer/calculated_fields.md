---
title: Calculated Fields
kind: documentation
disable_toc: false
private: true
---

## Overview

Use calculated fields to transform and enrich your log events at query time during search or investigation. Directly within the Log Explorer, you can manipulate text content, perform arithmetic operations, and evaluate conditional logic on log data and store the result as a calculated field.

Like any other log [attribute][2], calculated fields can be used for search, aggregation, visualization, and definition of other calculated fields.

**Notes**:
- You can define up to five calculated fields at a time.
- Calculated fields are temporary and do not persist beyond a given Log Explorer session. If you decide that a calculated field you have created may be useful again in the future for yourself or your team, update your log pipelines to ensure the information is encoded in your logs when they are ingested and processed.

## Adding a calculated field

There are two entry points for creating a calculated field in the Log Explorer: from the **Add** menu and from within a specific log event and attribute.

### From the Add menu

1. Navigate to [Log Explorer][1].
1. Click the **Add** button next to the search bar.
1. Select **Calculated field**.

This is a quick way to create a calculated field when you are already familiar with the structure and content of the logs you are interested in.

## From a specific log event or attribute

1. Navigate to [Log Explorer][1].
1. Click on a log event of interest to open the side panel.
1. Click on a specific JSON attribute to open the context menu.
1. Select **Create calculated from...**.

[IMAGE]

This allows for easy and natural pivots in the midst of an investigation or when exploring unfamiliar logs. For example, you may want to multiply or concatenate two values and store the result in a single field to simplify a graph or answer a specific question.

Both entry points open up a modal to define your calculated field.

### Defining a calculated field

[IMAGE]

#### Name

Set a descriptive name that clearly indicates the purpose or intent of the calculated field. For example, if the goal is to capitalize users' irst and last names and then concatenate them into one field, you might use the name`formatted_name`. To subsequently, filter logs from a user named `Bob Smith`, update your query to include `#formatted_name:"Bob Smith"`.

**Note:** The `#` prefix must be used to refer to calculated fields in searches, aggregation, or other calculated field definitions.

#### Formula

The formula (or expression) determines the result to be computed and stored for each log event as the value of the calculated field. Valid constructs include log attributes, other calculated fields, and a set of supported functions and operators. Relevant fields, functions, and operators are automatically suggested as you being to write or edit the formula, to help accelerate the process.

#### Using calculated fields

After successful creation of a new calculated field, the Log Explorer updates the following:
- Active calculated fields are displayed in a new row directly under the search bar.
    - Hover over a field to view its definition, and use quick actions to edit, filter by, or group by the field.
- The field is automatically added as a column in the **List** visualization (the title includes the `#` prefix).
- Calculated fields are displayed in a separate section inside the log side panel.

Calculated fields can be used for search, aggregation, visualization, and definition of other calculated fields and works in the same way as log attributes. Make sure to use th `#` prefix to reference calculated field names.

[Image]

#### When to use calculated fields

Calculated fields are not a replacement for log pipelines and processors for ingest-time parsing, normalization, and enrichment of logs. Think of calculated fields as a complementary tool that is useful for certain scenarios, such as when you:

- Perform a unique one-off investigation or ad-hoc analysis, and certain information is only relevant in the current context.
- Need to retroactively update the schema of indexed logs to answer a specific question, since pipelines changes only apply to logs ingested after the update.
- Do not have permission (or the knowledge) to modify relevant log pipelines. Calculated fields are available to all users and carry no risk of long-term or organization-wide side effects, providing quick exploration and worry-free experimentation.

If you realize that a calculated field you are using may be valuable in the long-term, update your log pipelines so your team benefits moving forward.

## Calculated fields expression language

### Basic syntax and language constructs

| Construct                                                                                          | Syntax and Notation                                                    |
| -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Core and faceted attribute or tag named `attr`                                                     | `attr` (no prefix required)                                            |
| Custom, unfaceted attribute named `attr`                                                           | `@attr` (use an `@` prefix)                                            |
| Calculated field named `attr`                                                                      | `#attr` (use a # prefix)                                               |
| String literal (quote)<br>For example, `text` or `Some quoted "text"`.                             | `"text"`<br> `"Some quoted \"text\""<br>([Log Search Syntax][3] applies)|
| Numeric literal (number)<br>For example, `ten` or `two to the power of five`.                      | `10`<br>`2e5`                                                          |
| Function named `func` with parameters `one` and `two`                                              | `func(one, two)`                                                       |
| Operator represented by a symbol or character `x`<br>For example, multiplying operands `y` and `z`.| `x`                                                                    |
| Order and grouping of operations                                                                   | `second_operation x (first_operation)`<br>(uses parentheses notation)  |

### Operators

In order of precedence:

| Operator | Description |
|----------|-------------|
| `()` | A grouping or function call |
| `!`, `NOT`, `-` | A logical or arithmetic negation |
| `*`, `/` | Multiplication, division|
| `+`, `-` | Addition, subtraction |
| `<`, `<=`, `>`, `>=` | less than, less than or equal to, greater than, and greater than or equal to |
| `==`, `!=` | Match, does not match |
| `&&`, `AND` | Logical AND |
| `\|\|`, `OR` | Logical OR |


### Functions


{{< whatsnext desc="The available functions are categorized as follows:" >}}
    {{< nextlink href="/logs/explorer/calculated_fields#arithmetic-functions" >}}Arithmetic{{< /nextlink >}}
    {{< nextlink href="/logs/explorer/calculated_fields#string-functions" >}}String{{< /nextlink >}}
    {{< nextlink href="/logs/explorer/calculated_fields#logical-functions" >}}Logical{{< /nextlink >}}
    {{< nextlink href="/logs/explorer/calculated_fields#list-functions" >}}List{{< /nextlink >}}
    {{< nextlink href="/logs/explorer/calculated_fields#datetime-functions" >}}Datetime{{< /nextlink >}}
{{< /whatsnext >}}

#### Arithmetic functions

##### `abs(num number)`

Returns the absolute value of a number.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attributes: <br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@client_latency</code>=2<br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@server_latency</code> = 3<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;abs(<code>@client_latency</code>-<code>@server_latency</code>) = 1
</details>

##### ceil(num number)

Rounds number up to nearest integer.

##### floor(num number)

Rounds number down to nearest integer.

##### max(num value [, num value, …])

Finds the maximum value amongst a set of numbers.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attribute: <br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@list_of_values</code>=[-1, 1, 5, 5]<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;max(<code>@list_of_values</code>) = 5
</details>

##### min(num value [, num value, …])

Finds the minimum value amongst a set of numbers.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attribute:
<br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@list_of_values</code> = [-1, 1, 5, 5]<br>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;min(<code>@list_of_values</code>) = -1
</details>

##### round(num number, int precision)

Rounds a number. Optionally define how many digits to maintain after (or round before, if negative) the decimal.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attribute:
<br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@randInt</code> = -1234.01<br>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;round(<code>@randInt</code>, -1) = -1230
</details>

#### String functions

##### concat(expr value [, expr value, …])

Combine multiple values into a single string.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attributes: <br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@first_name</code> = "Bob"<br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@last_name</code> = "Smith"<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;concat(<code>@first_name</code>, <code>@last_name</code>) = "Bob Smith"
</details>

##### lower(str text)

Convert string to lowercase.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attributes: <br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@first_name</code> = "Bob"<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lower(<code>@first_name</code>) = "bob"
</details>

##### proper(str text)

Convert string to proper-case.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attributes: <br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@name</code> = "bob SMITH"<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;proper(<code>@name</code>) = "Bob Smith"
</details>

##### split_before(str text, str separator, int occurrence)

Extract the portion of text preceding a certain pattern in a string.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attributes: <br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@row_value</code> = "1,Bob,Smith"<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;split_before(<code>@row_value</code>, ",", 1) = "1"
</details>

##### split_after(str text, str separator, int occurrence)

Extract the portion of text following a certain pattern in a string.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attributes: <br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@row_value</code> = "1,Bob,Smith"<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;split_after(<code>@row_value</code>, ",", 2) = "Smith"
</details>

##### substring(str text, int start, int length)

Extract a portion of text from the middle of a string.

##### suffix(str text, int num_chars)

Extract a portion of text from the end of a string.

##### textjoin(str delimiter, expr value [, expr value, …])

Combine multiple values into a single string with a delimiter in between.

##### upper(str text)

Convert string to upper-case.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attributes: <br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@first_name</code> = "Bob"<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;upper(<code>@first_name</code>) = "BOB"
</details>

#### Logical functions

##### case(expr condition, expr if_true [, expr condition, expr if_true …], expr else)

Evaluate a series of conditions and accordingly return a value.

##### if(expr condition, expr if_true, expr if_false)

Evaluate a condition and accordingly return a value.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attributes:
<br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@origin_country</code> = "USA"
<br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@destination_country</code> = "Canada"<br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@origin_continent</code> = "NA"<br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@destination_continent</code> = "NA"<br>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if(<code>@origin_country</code> == <code>@destination_country</code>, "national", if(<code>@origin_continent</code> == <code>@destination_continent</code>, "continental", "intercontinental")) = "continental"
</details>

##### is_null(expr value)

Check for nullity of an attribute or expression.

<details>
<summary>Example</summary>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A log event has the following attributes:
<br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@users_online</code> = 5
<br>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;<code>@max_capacity</code> = 0<br>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is_null(<code>@users_online</code> / <code>@max_capacity</code>) = TRUE
</details>

#### List functions

##### len(expr list)

Return the number of values in a given list.

#### Datetime functions

##### now_ms()

Return the current timestamp in Unix epoch format (ms).

[1]: https://app.datadoghq.com/logs
[2]: /logs/log_configuration/attributes_naming_convention/
[3]: /logs/explorer/search_syntax/