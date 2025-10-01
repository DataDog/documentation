---
title: Extraction Grok Parsing
further_reading:
- link: "/logs/explorer/calculated_fields/"
  tag: "Documentation"
  text: "Learn more about Calculated Fields"
---

## Overview

Calculated Fields Extraction lets you apply Grok parsing rules at query time in the Log Explorer. This makes it possible to extract values from raw log messages or attributes without modifying pipelines or re-ingesting data.

## Syntax

Extraction fields use Grok patterns to identify and capture values from a log attribute. A Grok pattern is composed of one or more tokens in the form:
```
%{PATTERN_NAME:field_name}
```
- `PATTERN_NAME`: A Grok matcher.
- `field_name`: The name of the extracted calculated field.

You can chain multiple patterns together to parse complex log messages.

## Supported matchers and filters at query time

<div class="alert alert-warning">Grok parsing features available at <em>query-time</em> (in the <a href="/logs/explorer/calculated_fields/">Log Explorer</a>) support a limited subset of matchers (<strong>data</strong>, <strong>integer</strong>, <strong>notSpace</strong>, <strong>number</strong>, and <strong>word</strong>) and filters (<strong>number</strong> and <strong>integer</strong>) For long-term parsing needs, define a log pipeline..</div>

Query-time Grok parsing in the Log Explorer supports a limited subset of matchers and filters. Each matcher or filter is used in a Grok pattern with the format:

```
%{MATCHER:field_name}
```

### Matchers

<table>
  <thead>
    <tr>
      <th style="width: 150px;">Matcher</th>
      <th style="width: 40%;">Example Grok Pattern</th>
      <th style="width: 35%;">Example Result</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="width: 150px;">
        <code>DATA</code><br>
        <em>Any sequence of characters (non-greedy)</em>
      </td>
      <td><code>status=%{DATA:status}</code></td>
      <td><code>#status = 200 OK</code></td>
    </tr>
    <tr>
      <td style="width: 150px;">
        <code>WORD</code><br>
        <em>Alphanumeric characters</em>
      </td>
      <td><code>country=%{WORD:country}</code></td>
      <td><code>#country = Brazil</code></td>
    </tr>
    <tr>
      <td style="width: 150px;">
        <code>NUMBER</code><br>
        <em>Floating-point numbers</em>
      </td>
      <td><code>value=%{NUMBER:float_val}</code></td>
      <td><code>#float_val = 3.14</code></td>
    </tr>
    <tr>
      <td style="width: 150px;">
        <code>INTEGER</code><br>
        <em>Integer values</em>
      </td>
      <td><code>count=%{INTEGER:count}</code></td>
      <td><code>#count = 42</code></td>
    </tr>
    <tr>
      <td style="width: 150px;">
        <code>NOTSPACE</code><br>
        <em>Non-whitespace characters</em>
      </td>
      <td><code>path=%{NOTSPACE:request_path}</code></td>
      <td><code>#request_path = /index.html</code></td>
    </tr>
  </tbody>
</table>

### Filters
Filters can be applied in combination with matchers to cast values into numeric types.

<table>
  <thead>
    <tr>
      <th style="width: 150px;">Filter</th>
      <th style="width: 40%;">Example Grok Pattern</th>
      <th style="width: 35%;">Example Result</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="width: 150px;">
        <code>NUMBER</code><br>
        <em>Parses numeric strings as numbers</em>
      </td>
      <td><code>latency=%{NUMBER:lat}</code></td>
      <td><code>#lat = 1.23</code> (number)</td>
    </tr>
    <tr>
      <td style="width: 150px;">
        <code>INTEGER</code><br>
        <em>Parses numeric strings as integers</em>
      </td>
      <td><code>users=%{INTEGER:user_count}</code></td>
      <td><code>#user_count = 100</code> (integer)</td>
    </tr>
  </tbody>
</table>

### Example

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
