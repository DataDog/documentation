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

Calculated Fields Extractions lets you apply Grok parsing rules at query time in the Log Explorer, making it possible to extract values from raw log messages or attributes without modifying pipelines or re-ingesting data. You can generate extraction rules automatically with AI-powered parsing, or manually define your own Grok patterns to match your specific needs.

To create an extraction calculated field, see [Create a calculated field][1] in the Calculated Fields documentation.

## Automatic parsing

Use AI-powered automatic parsing to generate Grok rules from your log data. Datadog analyzes the content of your log message and automatically generates an extraction rule, eliminating the need to manually write Grok patterns.

{{< img src="/logs/explorer/calculated_fields/extractions/calculated_fields_parse_with_ai.png" alt="Example of AI-powered Grok parsing in Datadog Calculated Fields" style="width:100%;" >}}

There are two ways to access automatic parsing from the log side panel:

1. Click the **AI** button <i class="icon-bits-ai"></i> next to the copy button.
2. Highlight a specific portion of the log message and click the **AI** button <i class="icon-bits-ai"></i> in the popup menu.

When you click the **AI** button, Datadog automatically populates the Calculated Field form:

1. **Extract from**: Defaults to the full log message, but you can change the dropdown to parse individual attributes instead.
2. **Log sample**: Automatically populated from your selected log.
3. **Parsing rule**: Datadog analyzes the log sample and generates a Grok rule.

You can review and modify the generated rule to match your needs. Edit it manually or click **Generate a new rule** for Datadog to try again. You can also modify, insert, or replace the log sample to test your rule against different log formats.

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

<div class="alert alert-warning">Grok parsing features available at <em>query-time</em> (in the <a href="/logs/explorer/calculated_fields/">Log Explorer</a>) support a limited subset of matchers (<strong>data</strong>, <strong>integer</strong>, <strong>notSpace</strong>, <strong>number</strong>, and <strong>word</strong>) and filters (<strong>number</strong> and <strong>integer</strong>) For long-term parsing needs, define a log pipeline.</div>

Query-time Grok parsing in the Log Explorer supports a limited subset of matchers and filters. Each matcher or filter is used in a Grok pattern with the format:

```
%{MATCHER:field_name}
```

### Matchers

| Matcher | Example Grok Pattern |
| ------- | -------------------- |
| `DATA`<br>_Any sequence of characters (non-greedy)_ | `status=%{DATA:status}` |
| `WORD`<br>_Alphanumeric characters_ | `country=%{WORD:country}` |
| `NUMBER`<br>_Floating-point numbers_ | `value=%{NUMBER:float_val}` |
| `INTEGER`<br>_Integer values_ | `count=%{INTEGER:count}` |
| `NOTSPACE`<br>_Non-whitespace characters_ | `path=%{NOTSPACE:request_path}` |

### Filters
Apply filters to cast extracted values into numeric types. Filters use the same pattern syntax as matches.

| Filter | Example Grok Pattern |
| ------ | -------------------- |
| `NUMBER`<br>_Parses numeric strings as numbers_ | `latency=%{NUMBER:lat}` |
| `INTEGER`<br>_Parses numeric strings as integers_ | `users=%{INTEGER:user_count}` |

### Example
Use this feature to analyze log fields on-demand without modifying your ingestion pipeline.
**Log line**:

```
country=Brazil duration=123ms path=/index.html status=200 OK
```

**Extraction grok rule**:
```
country=%{WORD:country} duration=%{INTEGER:duration} path=%{NOTSPACE:request_path} status=%{DATA:status}
```
**Resulting calculated fields**:
- `#country = Brazil`
- `#duration = 123`
- `#request_path = /index.html`
- `#status = 200 OK`

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/calculated_fields/#create-a-calculated-field
