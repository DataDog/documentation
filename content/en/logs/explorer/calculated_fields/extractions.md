---
title: Extractions
further_reading:
- link: "/logs/explorer/calculated_fields/"
  tag: "Documentation"
  text: "Learn more about Calculated Fields"
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLSffBg9ph2zl-jTGzvgBUcXSifOjvPdRh8vJjzTMIclSB2ZLIw/viewform" btn_hidden="false" header="Calculated Fields Extractions is in Preview">}}
Use Calculated Fields Extractions to extract values from your logs in the Log Explorer at query time using Grok patterns.
{{< /callout >}}

## Overview

Calculated Fields Extractions lets you apply Grok parsing rules at query time in the Log Explorer. This makes it possible to extract values from raw log messages or attributes without modifying pipelines or re-ingesting data.

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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
