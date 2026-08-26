---
title: Extractions
description: "Extract values from your logs at query time using Grok patterns in the Log Explorer."
further_reading:
- link: "/logs/explorer/calculated_fields/"
  tag: "Documentation"
  text: "Learn more about Calculated Fields"
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLSffBg9ph2zl-jTGzvgBUcXSifOjvPdRh8vJjzTMIclSB2ZLIw/viewform" btn_hidden="false" header="Calculated Fields Extractions is in Preview">}}
Use Calculated Fields Extractions to extract values from your logs in the Log Explorer at query time using Grok patterns.
{{< /callout >}}

## Overview

Calculated Fields Extractions lets you apply Grok parsing rules at query time in the Log Explorer. This lets you extract values from raw log messages or attributes without modifying pipelines or re-ingesting data. You can generate extraction rules automatically with AI-powered parsing, or manually define your own Grok patterns to match your specific needs. You can also write an extraction pattern as a [regular expression (regex)](#regex) with named capture groups.

To create an extraction calculated field, see [Create a calculated field][1].

## Automatic parsing

Use AI-powered automatic parsing to generate Grok rules from your log data. Datadog analyzes the content of your log message and automatically generates an extraction rule, eliminating the need to manually write Grok patterns.

{{< img src="/logs/explorer/calculated_fields/extractions/calculated_fields_parse_ai.png" alt="Example of AI-powered Grok parsing in Datadog Calculated Fields" style="width:100%;" >}}

There are two ways to access automatic parsing from the log side panel:

1. Click the {{< ui >}}AI{{< /ui >}} button <i class="icon-bits-ai"></i> next to the copy button.
2. Highlight a specific portion of the log message and click the {{< ui >}}AI{{< /ui >}} button <i class="icon-bits-ai"></i> in the popup menu.

When you click the {{< ui >}}AI{{< /ui >}} button, Datadog automatically populates the Calculated Field form:

1. {{< ui >}}Extract from{{< /ui >}}: Defaults to the full log message. You can change the dropdown to parse individual attributes instead.
2. {{< ui >}}Log sample{{< /ui >}}: Automatically populated with your selected log.
3. {{< ui >}}Parsing rule{{< /ui >}}: Automatically generated from the log sample.

Review and modify the generated rule as needed. You can edit it manually or click {{< ui >}}Generate a new rule{{< /ui >}} for Datadog to try again. You can also modify, insert, or replace the log sample to test your rule against different log formats.

<div class="alert alert-tip">Use the thumbs up or thumbs down buttons to provide inline feedback and help improve the feature.</div>

## Syntax

Extraction fields use Grok patterns to identify and capture values from a log attribute. A Grok pattern is composed of one or more tokens in the form:
```
%{PATTERN_NAME:field_name}
```
- `PATTERN_NAME`: A Grok matcher.
- `field_name`: The name of the extracted calculated field.

You can chain multiple patterns together to parse complex log messages.

## Supported matchers and filters at query time

<div class="alert alert-warning">Grok parsing features available at <em>query-time</em> (in the <a href="/logs/explorer/calculated_fields/">Log Explorer</a>) support a limited subset of matchers (<strong>data</strong>, <strong>integer</strong>, <strong>notSpace</strong>, <strong>number</strong>, and <strong>word</strong>) and filters (<strong>number</strong> and <strong>integer</strong>). For long-term parsing needs, define a log pipeline.</div>

Query-time Grok parsing in the Log Explorer supports a limited subset of matchers and filters. Each matcher or filter is used in a Grok pattern with the format:

```
%{MATCHER:field_name}
```

### Matchers

| Matcher | Example Grok Pattern |
| ------- | -------------------- |
| `data`<br>_Any sequence of characters (non-greedy)_ | `status=%{data:status}` |
| `word`<br>_Alphanumeric characters_ | `country=%{word:country}` |
| `number`<br>_Floating-point numbers_ | `value=%{number:float_val}` |
| `integer`<br>_Integer values_ | `count=%{integer:count}` |
| `notSpace`<br>_Non-whitespace characters_ | `path=%{notSpace:request_path}` |

### Filters
Apply filters to cast extracted values into numeric types. Filters use the same pattern syntax as matches.

| Filter | Example Grok Pattern |
| ------ | -------------------- |
| `number`<br>_Parses numeric strings as numbers_ | `latency=%{number:lat}` |
| `integer`<br>_Parses numeric strings as integers_ | `users=%{integer:user_count}` |

### Example
Use this feature to analyze log fields on-demand without modifying your ingestion pipeline.
**Log line**:

```
country=Brazil duration=123ms path=/index.html status=200 OK
```

**Extraction grok rule**:
```
country=%{word:country} duration=%{integer:duration} path=%{notSpace:request_path} status=%{data:status}
```
**Resulting calculated fields**:
- `#country = Brazil`
- `#duration = 123`
- `#request_path = /index.html`
- `#status = 200 OK`

## Regex

Datadog evaluates the regex pattern when you run a query. This means no data is reindexed, and you can add, edit, or remove a pattern at any time.

Extractions run before formulas, so a calculated field formula can reference a field that an extraction produces. The reverse is not possible: you cannot extract from a calculated field.

Extracted values are always strings. Unlike a Grok rule such as `%{integer:status}`, regex extraction does not convert types. To use an extracted value as a number, reference it in an arithmetic formula.

### Supported syntax

| Feature | Example | Description |
|---|---|---|
| Literal text | `error` | The literal characters |
| Any character | `.` | Any single character |
| Character classes | `[a-z0-9]`, `[^abc]` | Any one character in the set, or any one character not in the set |
| Shorthand classes | `\d`, `\w`, `\s`, `\D`, `\W`, `\S` | A digit, word character, or whitespace character, and their negations |
| Unicode property classes | `\p{L}+` | Characters by Unicode property, such as any letter |
| Alternation | `error\|timeout` | Either alternative |
| Groups | `(error\|timeout)`, `(?:error\|timeout)` | Groups part of a pattern. `(?:…)` groups without capturing |
| Named capture groups | `(?<status>\d+)` | Captures the match under a name. Required for extraction |
| Quantifiers | `a*`, `a+`, `a?`, `a{2,4}` | Repetition: zero or more, one or more, optional, or a bounded range. Matches as much as possible |
| Lazy quantifiers | `.*?end` | The same repetition, but matching as little as possible |
| Anchors | `^ERROR`, `timeout$` | The start or the end of the value |
| Word boundaries | `\berror\b` | A position between a word and a non-word character, so `error` matches but `errors` does not |
| Character escapes | `\n`, `\r`, `\t` | Newline, carriage return, tab |
| Metacharacter escapes | `\.`, `\*`, `\(` | The character itself, rather than its special meaning |

Constructs that are not listed, such as lookahead (`(?=…)`), lookbehind (`(?<=…)`), and backreferences (`\1`), are not supported.

Write patterns with a single backslash, as shown. In [formula regex functions][2], a pattern is a quoted string argument and each backslash must be doubled.

### Capture group rules

A pattern must follow these rules:

- It must contain at least one capture group.
- Every capture group must be named.
  - Use `(?<name>…)`, not `(…)`.
  - Use `(?:…)` to group without creating a field.
- Each name must be unique. The name becomes the name of the extracted field.
- Each name must start with a letter, and contain only letters and digits (`[A-Za-z][A-Za-z0-9]*`). Names like `client_ip`, `http.status`, or `client-ip` are not valid capture group names.

### Example

**Log line**:

```plaintext
10.0.0.14 GET /api/v1/orders 503
```

**Regex pattern**:

```plaintext
(?<ip>\S+) (?<method>\S+) /api/(?:v\d+)/(?<resource>\S+) (?<status>\d+)
```

This pattern follows the capture group rules:

- Four groups have a name: `ip`, `method`, `resource`, and `status`.
- Each name is unique.
- Each name uses only letters and digits.
- The group `(?:v\d+)` has no name. It groups the version segment, but does not create a field.

**Resulting calculated fields**:

- `#ip = 10.0.0.14`
- `#method = GET`
- `#resource = orders`
- `#status = 503`

You can filter, group, and sort by the extracted fields. Logs where the pattern does not match have no value for them.

### Invalid patterns

Each pattern below breaks one capture group rule.

| Pattern | Problem |
|---|---|
| `(?:\S+) (?:\S+) (?:\S+) (?:\S+)` | No named group. A pattern needs at least one. |
| `(?<ip>\S+) (?<ip>\S+)` | The name `ip` is used twice. Each name must be unique. |
| `(?<client-ip>\S+)` | The name has a hyphen. A name can have only letters and digits. |
| `(?<1status>\d+)` | The name starts with a digit. A name must start with a letter. |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/calculated_fields/#create-a-calculated-field
[2]: /logs/explorer/calculated_fields/formulas/#regex
