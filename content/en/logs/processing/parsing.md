---
title: Parsing
kind: documentation
description: "Parse your logs using the Grok Processor"
aliases:
    - /logs/parsing/
further_reading:
- link: "logs/processing/processors"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "logs/faq/how-to-investigate-a-log-parsing-issue"
  tag: "FAQ"
  text: "How to investigate a log parsing issue?"
- link: "/logs/guide/log-parsing-best-practice/"
  tag: "FAQ"
  text: "Log Parsing - Best Practice"
- link: "logs/logging_without_limits"
  tag: "Documentation"
  text: "Control the volume of logs indexed by Datadog"
---

## Overview

If your logs are JSON-formatted, Datadog automatically parses them, but for other formats, Datadog allows you to enrich your logs with the help of Grok Parser.
The Grok syntax provides an easier way to parse logs than pure regular expressions.
The main usage of the Grok Parser is to extract attributes from semi-structured text messages.

Grok comes with a lot of reusable patterns to parse integers, ip addresses, hostnames, etc...

Parsing rules can be written with the `%{MATCHER:EXTRACT:FILTER}` syntax:

* **Matcher**: rule (possibly a reference to another token rule) that describes what to expect (number, word, notSpace,...)

* **Extract** (optional): an identifier representing the capture destination for the piece of text matched by the *Matcher*.

* **Filter** (optional): a post-processor of the match to transform it

Example for this classic unstructured log:
```
john connected on 11/08/2017
```

With the following parsing rule:
```
MyParsingRule %{word:user} connected on %{date("MM/dd/yyyy"):connect_date}
```

You would have at the end this structured log:

{{< img src="logs/processing/parsing/parsing_example_1.png" alt="Parsing example 1" responsive="true" style="width:80%;">}}

**Note**:

* If you have multiple parsing rules in a single Grok parser:
  * only one can match any given log. The first one that matches from top to bottom is the one that does the parsing.
  * you can reference parsing rules defined above in the list.
* You must have unique rules names within the same Grok parser.
* The rule name must contain only: alphanumeric characters and `_`, `.`. It must start by alphanumeric.

### Matcher and Filter

Here is the list of all the matchers and filters natively implemented by Datadog:

{{< tabs >}}
{{% tab "Matcher" %}}

|                                                 |                                                                                                                                    |
| :---                                            | :---                                                                                                                               |
| **Pattern**                                     | **Usage**                                                                                                                          |
| `date("pattern"[, "timezoneId"[, "localeId"]])` | Matches a date with the specified pattern and parses to produce a Unix timestamp. [See the date Matcher examples](#parsing-dates). |
| `regex("pattern")`                              | Matches a regex. [Check the regex Matcher examples](#regex).                                                                       |
| `data`                                          | Matches any string including spaces and newlines. Equivalent to `.*`.                                                              |
| `notSpace`                                      | Matches any string until the next space.                                                                                           |
| `boolean("truePattern", "falsePattern")`        | Matches and parses a boolean optionally defining the true and false patterns (defaults to 'true' and 'false' ignoring case).       |
| `numberStr`                                     | Matches a decimal floating point number and parses it as a string.                                                                 |
| `number`                                        | Matches a decimal floating point number and parses it as a double precision number.                                                |
| `numberExtStr`                                  | Matches a floating point number (with scientific notation support) and parses it as a string.                                                                |
| `numberExt`                                     | Matches a floating point number (with scientific notation support) and parses it as a double precision number.                     |
| `integerStr`                                    | Matches an integer number and parses it as a string.                                                                        |
| `integer`                                       | Matches an integer number and parses it as an integer number.                                                               |
| `integerExtStr`                                 | Matches an integer number (with scientific notation support) and parses it as a string.                                                                      |
| `integerExt`                                    | Matches an integer number (with scientific notation support) and parses it as an integer number.                                   |
| `word`                                          | Matches characters from a-z, A-Z, 0-9, including the _ (underscore) character.                                                                                                      |
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


{{% /tab %}}
{{% tab "Filter" %}}

|                                                                |                                                                                                                                                           |
| :---                                                           | :---                                                                                                                                                      |
| **Pattern**                                                    | **Usage**                                                                                                                                                 |
| `number`                                                       | Parses a match as double precision number.                                                                                                                |
| `integer`                                                      | Parses a match as an integer number.                                                                                                                      |
| `boolean`                                                      | Parses 'true' and 'false' strings as booleans ignoring case.                                                                                              |
| `date("pattern"[, "timezoneId"[, "localeId"]])`                | Parses a date with the specified pattern to produce a Unix timestamp. [See date Filter examples](#parsing-dates).                                         |
| `nullIf("value")`                                              | Returns null if the match is equal to the provided value.                                                                                                 |
| `json`                                                         | Parses properly formatted JSON.                                                                                                                           |
| `rubyhash`                                                     | Parses properly formatted Ruby hash (e.g. `{name => "John", "job" => {"company" => "Big Company", "title" => "CTO"}}`).                                    |
| `useragent([decodeuricomponent:true/false])`                   | Parses a user-agent and returns a JSON object that contains the device, OS, and the browser represented by the Agent. [Check the User Agent processor][1]. |
| `querystring`                                                  | Extracts all the key-value pairs in a matching URL query string (e.g. `?productId=superproduct&promotionCode=superpromo`).                                |
| `decodeuricomponent`                                           | This core filter decodes URI components. For instance, it transforms `%2Fservice%2Ftest` into `/service/test`.                                                                                                                  |
| `lowercase`                                                    | Returns the lower-cased string.                                                                                                                           |
| `uppercase`                                                    | Returns the upper-cased string.                                                                                                                           |
| `keyvalue([separatorStr[, characterWhiteList [, quotingStr]])` | Extracts key value pattern and returns a JSON object. [See key-value Filter examples](#key-value).                                                        |
| `scale(factor)`                                                | Multiplies the expected numerical value by the provided factor.                                                                                           |
| `array([[openCloseStr, ] separator][, subRuleOrFilter)`        | Parses a string sequence of tokens and returns it as an array.                                                                                            |
| `url`                                                          | Parses a URL and returns all the tokenized members (domain, query params, port, etc.) in a JSON object. [More info on how to parse URLs][2].                |




[1]: /logs/processing/processors/#user-agent-parser
[2]: /logs/processing/processors/#url-parser
{{% /tab %}}
{{< /tabs >}}

## Advanced Settings

At the bottom of your grok processor tiles there is an Advanced Settings section:

{{< img src="logs/processing/parsing/advanced_settings.png" alt="Advanced Settings" responsive="true" style="width:80%;">}}

* Use the **Extract from** field to apply your grok processor on a given attribute instead of the default `message` attribute.

* Use the **Helper Rules** field to define tokens for your parsing rules. Helper rules helps you factorize grok patterns across your parsing rules which is useful when you have several rules in the same grok parser that uses the same tokens.

Example for this classic unstructured log:

```
john id:12345 connected on 11/08/2017 on server XYZ in production
```

You could use the following parsing rule:

```
MyParsingRule %{user} %{connection} %{server}
```

with the following helpers:

```
user %{word:user.name} id:%{integer:user.id}
connection connected on %{date("MM/dd/yyyy"):connect_date}
server on server %{notSpace:server.name} in %{notSpace:server.env}
```


{{< img src="logs/processing/parsing/helper_rules.png" alt="helper rules" responsive="true" style="width:80%;">}}

## Examples
Find below some examples demonstrating how to use parsers:

* [Key value](#key-value)
* [Parsing dates](#parsing-dates)
* [Conditional patterns](#conditional-pattern)
* [Optional attribute](#optional-attribute)
* [Nested JSON](#nested-json)
* [Regex](#regex)

### Key value

This is the key value core filter : `keyvalue([separatorStr[, characterWhiteList [, quotingStr]]])` where:

* `separatorStr` : defines the separator. Default `=`
* `characterWhiteList`: defines additional non escaped value chars. Default `\\w.\\-_@`. Used only for non quoted values (e.g. `key=@valueStr`).
* `quotingStr` : defines quotes. Default behavior detects quotes (`<>`, `"\"\""`, ...). 
  * When defined, the default behavior is replaced by allowing only defined quoting char.
  * We always match inputs without any quoting chars, regardless to what is specified in `quotingStr`. 
  * Any string defined within the quoting chars is extracted as a value.
    
    For example, input: `key:=valueStr key:=</$%@valueStr2> key:="valueStr3"`, with parsing rule: `parsing_rule  {data::keyvalue(":=","","<>")}`, produces as output: `{
    "key": [
      "valueStr",
      "/$%@valueStr2"
    ]
  }`

**Note**: If you define a *keyvalue* filter on `data` object, and this filter is not matched, then an empty JSON `{}` is returned (e.g. input: `key:=valueStr`, parsing rule: `rule_test %{data::keyvalue("=")}`, output: `{}`).

Use filters such as **keyvalue()** to more-easily map strings to attributes:

log:

```
user=john connect_date=11/08/2017 id=123 action=click
```

Rule

```
rule %{data::keyvalue}
```

{{< img src="logs/processing/parsing/parsing_example_2.png" alt="Parsing example 2" responsive="true" style="width:80%;">}}

You don't need to specify the name of your parameters as they were already contained in the log.
If you add an **extract** attribute `my_attribute` in your rule pattern you would have:

{{< img src="logs/processing/parsing/parsing_example_2_bis.png" alt="Parsing example 2 bis" responsive="true" style="width:80%;">}}

If `=` is not the default separator between your key and values, add a parameter in your parsing rule with the wanted splitter.

log:

```
user: john connect_date: 11/08/2017 id: 123 action: click
```

Rule

```
rule %{data::keyvalue(": ")}
```

{{< img src="logs/processing/parsing/key_value_parser.png" alt="Key value parser" responsive="true" style="width:80%;" >}}

If logs contain specials characters in an attribute value such as `/` in a url for instance, add it to the white-list in the parsing rule:

log:

```
url=https://app.datadoghq.com/event/stream user=john
```

Rule:

```
rule %{data::keyvalue("=","/:")}
```

{{< img src="logs/processing/parsing/key_value_whitelist.png" alt="Key value whitelist" responsive="true" style="width:80%;" >}}

Other examples:

| **Raw string**          | **Parsing rule**                    | **Result**                     |
| :---                    | :----                               | :----                          |
| key=valueStr            | `%{data::keyvalue}`                 | {"key": "valueStr}             |
| key=\<valueStr>         | `%{data::keyvalue}`                 | {"key": "valueStr"}            |
| key:valueStr            | `%{data::keyvalue(":")}`            | {"key": "valueStr"}            |
| key:"/valueStr"         | `%{data::keyvalue(":", "/")}`       | {"key": "/valueStr"}           |
| key:={valueStr}         | `%{data::keyvalue(":=", "", "{}")}` | {"key": "valueStr"}            |

### Parsing dates

The date matcher transforms your timestamp in the EPOCH format (unit of measure **millisecond**).

| **Raw string**                           | **Parsing rule**                                          | **Result**              |
| :---                                     | :----                                                     | :----                   |
| 14:20:15                                 | `%{date("HH:mm:ss"):date}`                                | {"date": 51615000}      |
| 02:20:15 PM                              | `%{date("hh:mm:ss a"):date}`                              | {"date": 51615000}      |
| 11/10/2014                               | `%{date("dd/MM/yyyy"):date}`                              | {"date": 1412978400000} |
| Thu Jun 16 08:29:03 2016                 | `%{date("EEE MMM dd HH:mm:ss yyyy"):date}`                | {"date": 1466065743000} |
| Tue Nov 1 08:29:03 2016                  | `%{date("EEE MMM d HH:mm:ss yyyy"):date}`                 | {"date": 1466065743000} |
| 06/Mar/2013:01:36:30 +0900               | `%{date("dd/MMM/yyyy:HH:mm:ss Z"):date}`                  | {"date": 1362501390000} |
| 2016-11-29T16:21:36.431+0000             | `%{date("yyyy-MM-dd'T'HH:mm:ss.SSSZ"):date}`              | {"date": 1480436496431} |
| 2016-11-29T16:21:36.431+00:00            | `%{date("yyyy-MM-dd'T'HH:mm:ss.SSSZZ"):date}`             | {"date": 1480436496431} |
| 06/Feb/2009:12:14:14.655                 | `%{date("dd/MMM/yyyy:HH:mm:ss.SSS"):date}`                | {"date": 1233922454655} |
| Thu Jun 16 08:29:03 2016<sup>1</sup> | `%{date("EEE MMM dd HH:mm:ss yyyy","Europe/Paris"):date}` | {"date": 1466058543000} |
| 2007-08-31 19:22:22.427 ADT              | `%{date("yyyy-MM-dd HH:mm:ss.SSS z"):date}`               | {"date": 1188598942427} |

<sup>1</sup> Use this format if you perform your own localizations and your timestamps are _not_ in UTC. Timezone IDs are pulled from the TZ Database. For more information, see the [TZ database names][1].

**Note**: Parsing a date **doesn't** set its value as the log official date, for this use the Log Date Remapper [Log Date Remapper][2] in a subsequent Processor.

### Conditional pattern

You might have logs with two possible formats which differ in only one attribute. These cases can be handled with a single rule, using conditionals with `(<REGEX_1>|<REGEX_2>)`.

**Log**:
```
john connected on 11/08/2017
12345 connected on 11/08/2017
```

**Rule**:
Note that "id" is an integer and not a string thanks to the "integer" matcher in the rule.

```
MyParsingRule (%{integer:user.id}|%{word:user.firstname}) connected on %{date("MM/dd/yyyy"):connect_date}
```

**Results**:

{{< img src="logs/processing/parsing/parsing_example_4.png" alt="Parsing example 4" responsive="true" style="width:80%;" >}}

{{< img src="logs/processing/parsing/parsing_example_4_bis.png" alt="Parsing example 4 bis" responsive="true" style="width:80%;" >}}

### Optional attribute

Some logs contain values that only appear part of the time. In those cases, you can make attribute extraction optional with `()?` extracting it only when the attribute is contained in your log.

**Log**:
```
john 1234 connected on 11/08/2017
```

**Rule**:
```
MyParsingRule %{word:user.firstname} (%{integer:user.id} )?connected on %{date("MM/dd/yyyy"):connect_date}
```

**Note**: you may usually need to include the space in the optional part otherwise you would end up with two spaces and the rule would not match anymore.

{{< img src="logs/processing/parsing/parsing_example_5.png" alt="Parsing example 5" responsive="true" style="width:80%;" >}}

{{< img src="logs/processing/parsing/parsing_example_5_bis.png" alt="Parsing example 5 bis" responsive="true" style="width:80%;" >}}

### Nested JSON

Use the `json` *filter* to parse a JSON object nested after a raw text prefix:

**Log**: 

```
Sep 06 09:13:38 vagrant program[123]: server.1 {"method":"GET", "status_code":200, "url":"https://app.datadoghq.com/logs/pipelines", "duration":123456}
```

**Rule**:

```
parsing_rule %{date("MMM dd HH:mm:ss"):timestamp} %{word:vm} %{word:app}\[%{number:logger.thread_id}\]: %{notSpace:server} %{data::json}
```

{{< img src="logs/processing/parsing/nested_json.png" alt="Nested JSON Parsing example" responsive="true" style="width:80%;" >}}


### Regex
Use the regex matcher to match any substring of your log message based on literal regex rules.

**Log**:

```
john_1a2b3c4 connected on 11/08/2017
```

**Rule**:
Here we just look for the id to extract
```
MyParsingRule %{regex("[a-z]*"):user.firstname}_%{regex("[a-zA-Z0-9]*"):user.id} .*
```

{{< img src="logs/processing/parsing/regex_parsing.png" alt="Parsing example 6" responsive="true" style="width:80%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[2]: /logs/processing/processors/#log-date-remapper
