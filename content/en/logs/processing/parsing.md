---
title: Parsing
kind: documentation
description: "Parse your logs using the Grok Processor"
aliases:
    - /logs/parsing/
further_reading:
- link: "/logs/processing/processors/"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "/logs/faq/how-to-investigate-a-log-parsing-issue/"
  tag: "FAQ"
  text: "How to investigate a log parsing issue?"
- link: "/logs/guide/log-parsing-best-practice/"
  tag: "FAQ"
  text: "Log Parsing - Best Practices"
- link: "/logs/logging_without_limits/"
  tag: "Documentation"
  text: "Control the volume of logs indexed by Datadog"
---

## Overview

Datadog automatically parses JSON-formatted logs. For other formats, Datadog allows you to enrich your logs with the help of Grok Parser.
The Grok syntax provides an easier way to parse logs than pure regular expressions. The Grok Parser enables you to extract attributes from semi-structured text messages.

Grok comes with reusable patterns to parse integers, IP addresses, hostnames, etc.

You can write parsing rules with the `%{MATCHER:EXTRACT:FILTER}` syntax:

* **Matcher**: rule (possibly a reference to another token rule) that describes what to expect (number, word, notSpace, etc.)

* **Extract** (optional): an identifier representing the capture destination for the piece of text matched by the *Matcher*.

* **Filter** (optional): a post-processor of the match to transform it.

Example for a classic unstructured log:

```text
john connected on 11/08/2017
```

With the following parsing rule:

```text
MyParsingRule %{word:user} connected on %{date("MM/dd/yyyy"):connect_date}
```

After processing, the following structured log is generated:

{{< img src="logs/processing/processors/_parser.png" alt="Parsing example 1"  style="width:80%;">}}

**Note**:

* If you have multiple parsing rules in a single Grok parser:
  * Only one can match any given log. The first one that matches, from top to bottom, is the one that does the parsing.
  * Each rule can reference parsing rules defined above itself in the list.
* You must have unique rule names within the same Grok parser.
* The rule name must contain only: alphanumeric characters, `_`, and `.`. It must start with an alphanumeric character.
* Properties with null or empty values are not displayed.

### Matcher and filter

Here is a list of all the matchers and filters natively implemented by Datadog:

{{< tabs >}}
{{% tab "Matcher" %}}

|                                                 |                                                                                                                                    |
|:------------------------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------|
| **Pattern**                                     | **Usage**                                                                                                                          |
| `date("pattern"[, "timezoneId"[, "localeId"]])` | Matches a date with the specified pattern and parses to produce a Unix timestamp. [See the date Matcher examples](#parsing-dates). |
| `regex("pattern")`                              | Matches a regex. [Check the regex Matcher examples](#regex).                                                                       |
| `notSpace`                                      | Matches any string until the next space.                                                                                           |
| `boolean("truePattern", "falsePattern")`        | Matches and parses a Boolean, optionally defining the true and false patterns (defaults to `true` and `false`, ignoring case).     |
| `numberStr`                                     | Matches a decimal floating point number and parses it as a string.                                                                 |
| `number`                                        | Matches a decimal floating point number and parses it as a double precision number.                                                |
| `numberExtStr`                                  | Matches a floating point number (with scientific notation support) and parses it as a string.                                      |
| `numberExt`                                     | Matches a floating point number (with scientific notation support) and parses it as a double precision number.                     |
| `integerStr`                                    | Matches an integer number and parses it as a string.                                                                               |
| `integer`                                       | Matches an integer number and parses it as an integer number.                                                                      |
| `integerExtStr`                                 | Matches an integer number (with scientific notation support) and parses it as a string.                                            |
| `integerExt`                                    | Matches an integer number (with scientific notation support) and parses it as an integer number.                                   |
| `word`                                          | Matches characters from a-z, A-Z, 0-9, including the _ (underscore) character.                                                     |
| `doubleQuotedString`                            | Matches a double-quoted string.                                                                                                    |
| `singleQuotedString`                            | Matches a single-quoted string.                                                                                                    |
| `quotedString`                                  | Matches a double-quoted or single-quoted string.                                                                                   |
| `uuid`                                          | Matches a UUID.                                                                                                                    |
| `mac`                                           | Matches a MAC address.                                                                                                             |
| `ipv4`                                          | Matches an IPV4.                                                                                                                   |
| `ipv6`                                          | Matches an IPV6.                                                                                                                   |
| `ip`                                            | Matches an IP (v4 or v6).                                                                                                          |
| `hostname`                                      | Matches a hostname.                                                                                                                |
| `ipOrHost`                                      | Matches a hostname or IP.                                                                                                          |
| `port`                                          | Matches a port number.                                                                                                             |
| `data`                                          | Matches any string including spaces and newlines. Equivalent to `.*` in regex. Use when none of above patterns is appropriate.                                                              |

{{% /tab %}}
{{% tab "Filter" %}}

|                                                                |                                                                                                                                                            |
|:---------------------------------------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Pattern**                                                    | **Usage**                                                                                                                                                  |
| `number`                                                       | Parses a match as double precision number.                                                                                                                 |
| `integer`                                                      | Parses a match as an integer number.                                                                                                                       |
| `boolean`                                                      | Parses 'true' and 'false' strings as booleans ignoring case.                                                                                               |
| `nullIf("value")`                                              | Returns null if the match is equal to the provided value.                                                                                                  |
| `json`                                                         | Parses properly formatted JSON.                                                                                                                            |
| `rubyhash`                                                     | Parses properly formatted Ruby hash (e.g. `{name => "John", "job" => {"company" => "Big Company", "title" => "CTO"}}`).                                    |
| `useragent([decodeuricomponent:true/false])`                   | Parses a user-agent and returns a JSON object that contains the device, OS, and the browser represented by the Agent. [Check the User Agent processor][1]. |
| `querystring`                                                  | Extracts all the key-value pairs in a matching URL query string (e.g. `?productId=superproduct&promotionCode=superpromo`).                                 |
| `decodeuricomponent`                                           | Decodes URI components. For instance, it transforms `%2Fservice%2Ftest` into `/service/test`.                                                              |
| `lowercase`                                                    | Returns the lower-cased string.                                                                                                                            |
| `uppercase`                                                    | Returns the upper-cased string.                                                                                                                            |
| `keyvalue([separatorStr[, characterWhiteList[, quotingStr[, delimiter]]]])` | Extracts the key value pattern and returns a JSON object. See the [key-value filter examples](#key-value-or-logfmt).                                                         |
| `xml`                                                          |  Parses properly formatted XML. See the [XML filter examples](#parsing-xml).                                                                                |
| `csv(headers[, separator[, quotingcharacter]])`                | Parses properly formatted CSV or TSV lines. See the [CSV filter examples](#parsing-csv).                                                                    |
| `scale(factor)`                                                | Multiplies the expected numerical value by the provided factor.                                                                                            |
| `array([[openCloseStr, ] separator][, subRuleOrFilter)`        | Parses a string sequence of tokens and returns it as an array.                                                                                             |
| `url`                                                          | Parses a URL and returns all the tokenized members (domain, query params, port, etc.) in a JSON object. [More info on how to parse URLs][2].               |

[1]: /logs/processing/processors/#user-agent-parser
[2]: /logs/processing/processors/#url-parser
{{% /tab %}}
{{< /tabs >}}

## Advanced settings

At the bottom of your Grok processor tiles, there is an **Advanced Settings** section:

{{< img src="logs/processing/parsing/advanced_settings.png" alt="Advanced Settings"  style="width:80%;">}}

### Parsing a specific text attribute

Use the **Extract from** field to apply your Grok processor on a given text attribute instead of the default `message` attribute.

For example, consider a log containing a `command.line` attribute that should be parsed as a key-value. You could parse this log as follows:

{{< img src="logs/processing/parsing/parsing_attribute.png" alt="Parsing Command Line"  style="width:80%;">}}

### Using helper rules to factorize multiple parsing rules

Use the **Helper Rules** field to define tokens for your parsing rules. Helper rules help you to factorize Grok patterns across your parsing rules. This is useful when you have several rules in the same Grok parser that use the same tokens.

Example for a classic unstructured log:

```text
john id:12345 connected on 11/08/2017 on server XYZ in production
```

Use the following parsing rule:

```text
MyParsingRule %{user} %{connection} %{server}
```

With the following helpers:

```text
user %{word:user.name} id:%{integer:user.id}
connection connected on %{date("MM/dd/yyyy"):connect_date}
server on server %{notSpace:server.name} in %{notSpace:server.env}
```

{{< img src="logs/processing/parsing/helper_rules.png" alt="helper rules"  style="width:80%;">}}

## Examples

Some examples demonstrating how to use parsers:

* [Key value or logfmt](#key-value-or-logfmt)
* [Parsing dates](#parsing-dates)
* [Alternating patterns](#alternating-pattern)
* [Optional attribute](#optional-attribute)
* [Nested JSON](#nested-json)
* [Regex](#regex)
* [List and Arrays](#list-to-array)
* [Glog format](#glog-format)
* [XML](#parsing-xml)
* [CSV](#parsing-csv)

### Key value or logfmt

This is the key-value core filter: `keyvalue([separatorStr[, characterWhiteList[, quotingStr[, delimiter]]]])` where:

* `separatorStr`: defines the separator between key and values. Defaults to `=`.
* `characterWhiteList`: defines extra non-escaped value chars in addition to the default `\\w.\\-_@`. Used only for non-quoted values (e.g. `key=@valueStr`).
* `quotingStr`: defines quotes, replacing the default quotes detection: `<>`, `""`, `''`.
* `delimiter`: defines the separator between the different key values pairs (e.g.`|`is the delimiter in `key1=value1|key2=value2`). Default to ` ` (normal space), `,` and `;`.

Use filters such as **keyvalue** to more-easily map strings to attributes for keyvalue or logfmt formats:

**Log:**

```text
user=john connect_date=11/08/2017 id=123 action=click
```

**Rule:**

```text
rule %{data::keyvalue}
```

{{< img src="logs/processing/parsing/parsing_example_2.png" alt="Parsing example 2"  style="width:80%;">}}

You don't need to specify the name of your parameters as they are already contained in the log.
If you add an **extract** attribute `my_attribute` in your rule pattern you will see:

{{< img src="logs/processing/parsing/parsing_example_2_bis.png" alt="Parsing example 2 bis"  style="width:80%;">}}

If `=` is not the default separator between your key and values, add a parameter in your parsing rule with a separator.

**Log:**

```text
user: john connect_date: 11/08/2017 id: 123 action: click
```

**Rule:**

```text
rule %{data::keyvalue(": ")}
```

{{< img src="logs/processing/parsing/key_value_parser.png" alt="Key value parser"  style="width:80%;" >}}

If logs contain special characters in an attribute value, such as `/` in a url for instance, add it to the whitelist in the parsing rule:

**Log:**

```text
url=https://app.datadoghq.com/event/stream user=john
```

**Rule:**

```text
rule %{data::keyvalue("=","/:")}
```

{{< img src="logs/processing/parsing/key_value_whitelist.png" alt="Key value whitelist"  style="width:80%;" >}}

Other examples:

| **Raw string**               | **Parsing rule**                                      | **Result**                            |
|:-----------------------------|:------------------------------------------------------|:--------------------------------------|
| key=valueStr                 | `%{data::keyvalue}`                                   | {"key": "valueStr"}                   |
| key=\<valueStr>              | `%{data::keyvalue}`                                   | {"key": "valueStr"}                   |
| "key"="valueStr"             | `%{data::keyvalue}`                                   | {"key": "valueStr"}                   |
| key:valueStr                 | `%{data::keyvalue(":")}`                              | {"key": "valueStr"}                   |
| key:"/valueStr"              | `%{data::keyvalue(":", "/")}`                         | {"key": "/valueStr"}                  |
| /key:/valueStr               | `%{data::keyvalue(":", "/")}`                         | {"/key": "/valueStr"}                 |
| key:={valueStr}              | `%{data::keyvalue(":=", "", "{}")}`                   | {"key": "valueStr"}                   |
| key1=value1\|key2=value2     | <code>%{data::keyvalue(&quot;=&quot;, &quot;&quot;, &quot;&quot;, &quot;&#124;&quot;)}</code> | {"key1": "value1", "key2": "value2"}  |
| key1="value1"\|key2="value2" | <code>%{data::keyvalue(&quot;=&quot;, &quot;&quot;, &quot;&quot;, &quot;&#124;&quot;)}</code> | {"key1": "value1", "key2": "value2"}  |

**Multiple QuotingString example**: When multiple quotingstring are defined, the default behavior is replaced with a defined quoting character.
The key-value always matches inputs without any quoting characters, regardless of what is specified in `quotingStr`. When quoting characters are used, the `characterWhiteList` is ignored as everything between the quoting characters is extracted.

**Log:**

  ```text
  key1:=valueStr key2:=</valueStr2> key3:="valueStr3"
  ```

**Rule:**

  ```text
  rule %{data::keyvalue(":=","","<>")}
  ```

**Result:**

  ```json
  {"key1": "valueStr", "key2": "/valueStr2"}
  ```

**Note**:

* Empty values (`key=`) or `null` values (`key=null`) are not displayed in the output JSON.
* If you define a *keyvalue* filter on a `data` object, and this filter is not matched, then an empty JSON `{}` is returned (e.g. input: `key:=valueStr`, parsing rule: `rule_test %{data::keyvalue("=")}`, output: `{}`).
* Defining `""` as `quotingStr` keeps the default configuration for quoting.

### Parsing dates

The date matcher transforms your timestamp in the EPOCH format (unit of measure **millisecond**).

| **Raw string**                       | **Parsing rule**                                          | **Result**              |
|:-------------------------------------|:----------------------------------------------------------|:------------------------|
| 14:20:15                             | `%{date("HH:mm:ss"):date}`                                | {"date": 51615000}      |
| 02:20:15 PM                          | `%{date("hh:mm:ss a"):date}`                              | {"date": 51615000}      |
| 11/10/2014                           | `%{date("dd/MM/yyyy"):date}`                              | {"date": 1412978400000} |
| Thu Jun 16 08:29:03 2016             | `%{date("EEE MMM dd HH:mm:ss yyyy"):date}`                | {"date": 1466065743000} |
| Tue Nov 1 08:29:03 2016              | `%{date("EEE MMM d HH:mm:ss yyyy"):date}`                 | {"date": 1466065743000} |
| 06/Mar/2013:01:36:30 +0900           | `%{date("dd/MMM/yyyy:HH:mm:ss Z"):date}`                  | {"date": 1362501390000} |
| 2016-11-29T16:21:36.431+0000         | `%{date("yyyy-MM-dd'T'HH:mm:ss.SSSZ"):date}`              | {"date": 1480436496431} |
| 2016-11-29T16:21:36.431+00:00        | `%{date("yyyy-MM-dd'T'HH:mm:ss.SSSZZ"):date}`             | {"date": 1480436496431} |
| 06/Feb/2009:12:14:14.655             | `%{date("dd/MMM/yyyy:HH:mm:ss.SSS"):date}`                | {"date": 1233922454655} |
| 2007-08-31 19:22:22.427 ADT          | `%{date("yyyy-MM-dd HH:mm:ss.SSS z"):date}`               | {"date": 1188598942427} |
| Thu Jun 16 08:29:03 2016<sup>1</sup> | `%{date("EEE MMM dd HH:mm:ss yyyy","Europe/Paris"):date}` | {"date": 1466058543000} |
| Thu Jun 16 08:29:03 2016<sup>1</sup> | `%{date("EEE MMM dd HH:mm:ss yyyy","UTC+5"):date}`        | {"date": 1466047743000} |
| Thu Jun 16 08:29:03 2016<sup>1</sup> | `%{date("EEE MMM dd HH:mm:ss yyyy","+3"):date}`           | {"date": 1466054943000} |

<sup>1</sup> Use the `timezone` parameter if you perform your own localizations and your timestamps are _not_ in UTC.
The supported format for timezones are:

* `GMT`, `UTC`, `UT` or `Z`
* `+h`, `+hh`, `+hh:mm`, `-hh:mm`, `+hhmm`, `-hhmm`, `+hh:mm:ss`, `-hh:mm:ss`, `+hhmmss` or `-hhmmss` . The maximum supported range is from +18:00 to -18:00 inclusive.
* Timezones starting with `UTC+`, `UTC-`, `GMT+`, `GMT-`, `UT+` or `UT-`. The maximum supported range is from +18:00 to -18:00 inclusive.
* Timezone IDs pulled from the TZ database. For more information, see [TZ database names][1].

**Note**: Parsing a date **doesn't** set its value as the log official date. For this use the [Log Date Remapper][2] in a subsequent Processor.

### Alternating pattern

If you have logs with two possible formats which differ in only one attribute, set a single rule using alternating with `(<REGEX_1>|<REGEX_2>)`. This rule is equivalent to a Boolean OR.

**Log**:

```text
john connected on 11/08/2017
12345 connected on 11/08/2017
```

**Rule**:
Note that "id" is an integer and not a string.

```text
MyParsingRule (%{integer:user.id}|%{word:user.firstname}) connected on %{date("MM/dd/yyyy"):connect_date}
```

**Results**:

{{< img src="logs/processing/parsing/parsing_example_4.png" alt="Parsing example 4"  style="width:80%;" >}}

{{< img src="logs/processing/parsing/parsing_example_4_bis.png" alt="Parsing example 4 bis"  style="width:80%;" >}}

### Optional attribute

Some logs contain values that only appear part of the time. In this case, make attribute extraction optional with `()?`.

**Log**:

```text
john 1234 connected on 11/08/2017
```

**Rule**:

```text
MyParsingRule %{word:user.firstname} (%{integer:user.id} )?connected on %{date("MM/dd/yyyy"):connect_date}
```

**Note**: A rule will not match if you include a space after the first word in the optional section.

{{< img src="logs/processing/parsing/parsing_example_5.png" alt="Parsing example 5"  style="width:80%;" >}}

{{< img src="logs/processing/parsing/parsing_example_5_bis.png" alt="Parsing example 5 bis"  style="width:80%;" >}}

### Nested JSON

Use the `json` filter to parse a JSON object nested after a raw text prefix:

**Log**:

```text
Sep 06 09:13:38 vagrant program[123]: server.1 {"method":"GET", "status_code":200, "url":"https://app.datadoghq.com/logs/pipelines", "duration":123456}
```

**Rule**:

```text
parsing_rule %{date("MMM dd HH:mm:ss"):timestamp} %{word:vm} %{word:app}\[%{number:logger.thread_id}\]: %{notSpace:server} %{data::json}
```

{{< img src="logs/processing/parsing/nested_json.png" alt="Nested JSON Parsing example"  style="width:80%;" >}}

### Regex

**Log**:

```text
john_1a2b3c4 connected on 11/08/2017
```

**Rule**:

```text
MyParsingRule %{regex("[a-z]*"):user.firstname}_%{regex("[a-zA-Z0-9]*"):user.id} .*
```

{{< img src="logs/processing/parsing/regex_parsing.png" alt="Parsing example 6"  style="width:80%;" >}}

**Notes**:

- A full list of regular expression syntax accepted by the Agent is available in the [RE2 repo][3].
- The regex matcher applies an implicit `^`, to match the start of a string, and `$`, to match the end of a string.

### List to array

Use the `array` matcher to extract a list into an array in a single attribute.

**Log**:

```text
Users [John, Oliver, Marc, Tom] have been added to the database
```

**Rule**:

```text
myParsingRule Users %{data:users:array(“[]“,”,“)} have been added to the database
```

{{< img src="logs/processing/parsing/array_parsing.png" alt="Parsing example 6"  style="width:80%;" >}}


**Log**:

```text
Users {John-Oliver-Marc-Tom} have been added to the database
```

**Rule**:

```text
myParsingRule Users %{data:users:array("{}","-")} have been added to the database
```

### Glog format

Kubernetes components sometimes log in the `glog` format; this example is from the Kube Scheduler item in the Pipeline Library.

Example log line:

```text
W0424 11:47:41.605188       1 authorization.go:47] Authorization is disabled
```

Parsing rule:

```text
kube_scheduler %{regex("\\w"):level}%{date("MMdd HH:mm:ss.SSSSSS"):timestamp}\s+%{number:logger.thread_id} %{notSpace:logger.name}:%{number:logger.lineno}\] %{data:msg}
```

And extracted JSON:

```json
{
  "level": "W",
  "timestamp": 1587728861605,
  "logger": {
    "thread_id": 1,
    "name": "authorization.go"
  },
  "lineno": 47,
  "msg": "Authorization is disabled"
}
```

### Parsing XML

The XML parser transforms XML formatted messages into JSON.

**Log:**

```text
<book category="CHILDREN">
  <title lang="en">Harry Potter</title>
  <author>J K. Rowling</author>
  <year>2005</year>
</book>
```

**Rule:**

```text
rule %{data::xml}
```

**Result:**

  ```json
{
  "book": {
    "year": "2005",
    "author": "J K. Rowling",
    "category": "CHILDREN",
    "title": {
      "lang": "en",
      "value": "Harry Potter"
    }
  }
}
  ```

**Notes**:

* If the XML contains tags that have both an attribute and a sting value between the two tags, a `value` attribute is generated. For example: `<title lang="en">Harry Potter</title>` is converted to `{"title": {"lang": "en", "value": "Harry Potter" } }`
* Repeated tags are automatically converted to arrays. For example: `<bookstore><book>Harry Potter</book><book>Everyday Italian</book></bookstore>` is converted to `{ "bookstore": { "book": [ "Harry Potter", "Everyday Italian" ] } }`

### Parsing CSV

Use the **CSV** filter to more-easily map strings to attributes when separated by a given character (`,` by default).

The CSV filter is defined as `csv(headers[, separator[, quotingcharacter]])` where:

* `headers`: Defines the keys name separated by `,`. Keys names must start with alphabetical character and can contain any alphanumerical character in addition to `_`.
* `separator`: Defines separators used to separate the different values. Only one character is accepted. Default: `,` . **Note**: Use `tab` to represent the tabulation character.
* `quotingcharacter`: Defines the quoting character. Only one character is accepted. Default: `"`

**Note**:

* Values containing a separator character must be quoted.
* Quoted Values containing a quoting character must be escaped with a quoting characters. For example, `""` within a quoted value represents `"`.
* If the log doesn't contain the same number of value as the number of keys in the header, the CSV parser will match the first ones.
* Intergers and Double are automatically casted if possible.

**Log**:

{{< code-block lang="text" >}}
John,Doe,120,Jefferson St.,Riverside
{{< /code-block >}}

**Rule**:

{{< code-block lang="text" >}}
myParsingRule %{data:user:csv("first_name,name,st_nb,st_name,city")}
{{< /code-block >}}

**Result:**

{{< code-block lang="json" >}}
{
  "user": {
    "first_name": "John",
    "name": "Doe",
    "st_nb": 120,
    "st_name": "Jefferson St.",
    "city": "Riverside"
  }
}
{{< /code-block >}}

Other examples:

| **Raw string**               | **Parsing rule**                                                         | **Result**                                      |
|:-----------------------------|:-------------------------------------------------------------------------|:------------------------------------------------|
| `John,Doe`                   | `%{data::csv("firstname,name")}`                                         | {"firstname": "John", "name":"Doe"}             |
| `"John ""Da Man""",Doe`      | `%{data::csv("firstname,name")}`                                         | {"firstname": "John \"Da Man\"", "name":"Doe"}  |
| `'John ''Da Man''',Doe`      | `%{data::csv("firstname,name",",","'")}`                                 | {"firstname": "John 'Da Man'", "name":"Doe"}    |
| <code>John&#124;Doe</code>   | <code>%{data::csv(&quot;firstname,name&quot;,&quot;&#124;&quot;)}</code> | {"firstname": "John", "name":"Doe"}             |
| `value1,value2,value3`       | `%{data::csv("key1,key2")}`                                              | {"key1": "value1", "key2":"value2"}             |
| `value1,value2`              | `%{data::csv("key1,key2,key3")}`                                         | {"key1": "value1", "key2":"value2"}             |
| `value1,,value3`             | `%{data::csv("key1,key2,key3")}`                                         | {"key1": "value1", "key3":"value3"}             |


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[2]: /logs/processing/processors/#log-date-remapper
[3]: https://github.com/google/re2/wiki/Syntax
