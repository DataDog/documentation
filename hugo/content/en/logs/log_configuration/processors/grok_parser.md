---
title: Grok Parser
description: "Parse your logs using the Grok Processor"
processor_type: grok-parser
further_reading:
- link: "/logs/log_configuration/pipelines"
  tag: "Documentation"
  text: "Discover Datadog Pipelines"
- link: "/logs/log_configuration/parsing"
  tag: "Documentation"
  text: "Learn more about parsing"
- link: "https://www.datadoghq.com/blog/detect-http2-abuse-apache-web-server-logs/"
  tag: "Blog"
  text: "How to detect HTTP/2 abuse in Apache web server logs"
---

## Overview

Create custom grok rules to parse the full message or a specific attribute of your raw event. As a best practice, limit your grok parser to 10 parsing rules. For more information on Grok syntax and parsing rules, see [Parsing][1].

{{< img src="/logs/processing/processors/ai-grok-rules.png" alt="Grok parser configuration" style="width:90%;" >}}

## Use cases

The grok parser is mainly used to parse attributes from the message of your log. For example, NGINX logs have a message containing multiple pieces of information you might want to extract.

After creating a grok rule, the parser can write the IP address, user, request timestamp, request method, URL, version, status code, and bytes.


## Setup

Define the Grok processor on the [{{< ui >}}Pipelines{{< /ui >}} page][2]. To configure Grok parsing rules:

1. Expand a pipeline and click {{< ui >}}Add...{{< /ui >}} > {{< ui >}}Grok Parser{{< /ui >}}.
1. Enter a name in {{< ui >}}Name the processor{{< /ui >}}.
1. Under {{< ui >}}Define parsing rules{{< /ui >}} > {{< ui >}}Log samples{{< /ui >}}, review the log samples, or click {{< ui >}}Add a new sample{{< /ui >}} to add your own (up to 10 total, 5000 characters each).

    **Note**: Datadog pulls the sample logs from the five highest-volume log patterns matching your pipeline filter.
1. Under {{< ui >}}Define parsing rules{{< /ui >}} > {{< ui >}}Parsing rules{{< /ui >}}, click {{< ui >}}Tap to Parse{{< /ui >}} to generate rules that match your samples. You can also write your own rules. For Grok syntax, see [Parsing][1].
   <div class="alert alert-info">Tap to Parse does not consume <a href="/account_management/billing/ai_credits/">AI Credits</a>.</div>
   {{< site-region region="gov,gov2" >}}
   <div class="alert alert-info">Tap to Parse is not available for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
   {{< /site-region >}}
1. (Optional) Expand {{< ui >}}Advanced Settings{{< /ui >}} to parse a specific attribute instead of the default `message` attribute, or define helper rules. See [Advanced settings][4].
1. Select a sample to evaluate it against your parsing rules and display the result in the {{< ui >}}Preview parsing{{< /ui >}} panel. 

   Each sample displays one of the following results:

   - {{< ui >}}Match{{< /ui >}}: A rule matches the sample and extracts fields.
   - {{< ui >}}Match{{< /ui >}} with a warning: A rule matches the sample but extracts no fields.
   - {{< ui >}}No Match{{< /ui >}}: No rule matches the sample. 
   
1. Click {{< ui >}}Create{{< /ui >}}.


## Before and after state of logs

{{% collapse-content title="Example: Parsing nginx access logs" level="h3" %}}

**Before (raw log):**

```text
192.168.1.1 - john [10/Oct/2023:13:55:36 +0000] "GET /api/users HTTP/1.1" 200 1234
```

**Grok parsing rule:**

```text
access.common %{ipOrHost:network.client.ip} %{notSpace:http.ident} %{notSpace:http.auth} \[%{httpdate:date}\] "(?>%{word:http.method} |)%{notSpace:http.url}(?: HTTP/%{number:http.version}|)" %{number:http.status_code} (?>%{number:network.bytes_written}|-)
```

**After processing:**

```json
{
 "network": {
   "client": {
     "ip": "192.168.1.1"
   },
   "bytes_written": 1234
 },
 "http": {
   "ident": "-",
   "auth": "john",
   "method": "GET",
   "url": "/api/users",
   "version": "1.1",
   "status_code": 200
 },
 "date": 1696945536000
}
```

The Grok Parser transforms unstructured log messages into structured JSON attributes that can be queried, filtered, and analyzed in the Log Explorer.

{{% /collapse-content %}}

## API

Use the [Datadog Log Pipeline API endpoint][3] with the following Grok parser JSON payload:

```json
{
  "type": "grok-parser",
  "name": "Parsing Log message",
  "is_enabled": true,
  "source": "message",
  "samples": ["sample log 1", "sample log 2"],
  "grok": {"support_rules": "<SUPPORT_RULES>", "match_rules": "<MATCH_RULES>"}
}
```

| Parameter            | Type             | Required | Description                                             |
|----------------------|------------------|----------|---------------------------------------------------------|
| `type`               | String           | Yes      | Type of the processor.                                  |
| `name`               | String           | No       | Name of the processor.                                  |
| `is_enabled`         | Boolean          | No       | If the processor is enabled or not. Default: `false`.  |
| `source`             | String           | Yes      | Name of the log attribute to parse. Default: `message`. |
| `samples`            | Array of strings | No       | List of (up to 5) sample logs for this grok parser.     |
| `grok.support_rules` | String           | Yes      | List of Support rules for your grok parser.             |
| `grok.match_rules`   | String           | Yes      | List of Match rules for your grok parser.               |



## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_configuration/parsing/?tab=matchers
[2]: https://app.datadoghq.com/logs/pipelines
[3]: /api/v1/logs-pipelines/
[4]: /logs/log_configuration/parsing/#advanced-settings
