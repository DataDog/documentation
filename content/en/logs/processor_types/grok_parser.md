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
---

## Overview

Create custom grok rules to parse the full message or a specific attribute of your raw event. As a best practice, limit your grok parser to 10 parsing rules. For more information on Grok syntax and parsing rules, see [Parsing][1].

{{< img src="/logs/processing/processors/define_parsing_rules_syntax_suggestions.png" alt="Grok parser syntax suggestions in the UI" style="width:90%;" >}}

## Use cases

The grok parser is mainly used to parse attributes from the message of your log. For example, NGINX logs have a message containing multiple pieces of information you might want to extract.

After creating a grok rule, we would be able to have the IP address, user, request timestamp, request method, url, version, status code and bytes written.


## Setup

Define the Grok processor on the [**Pipelines** page][2]. To configure Grok parsing rules:

1. Click **Parse my logs** to automatically generate a set of three parsing rules based on the logs flowing through the pipeline.
   **Note**: This feature requires that the corresponding logs are indexed and actively flowing in. You can temporarily deactivate or sample down exclusion filters to allow the feature to detect logs.
1. **Log Samples**: Add up to five sample logs (up to 5000 characters each) to test your parsing rules.
1. **Define parsing rules**: Write your parsing rules in the rule editor. As you define rules, the Grok parser provides syntax assistance:
   - **Matcher suggestions**: Type a rule name followed by `%{`. A dropdown appears with available matchers (such as `word`, `integer`, `ip`, `date`). Select a matcher from the list to insert it into your rule.<br>
     ```
     MyParsingRule %{
     ```
   - **Filter suggestions**: When adding a filter with `:`, a dropdown shows compatible filters for the selected matcher.
1. **Test your rules**: Select a sample by clicking on it to trigger its evaluation against the parsing rule and display the result at the bottom of the screen. All samples show a status (`match` or `no match`), which highlights if one of the parsing rules of the grok parser matches the sample.


## Before and after state of logs

{{% collapse-content title="Example: Parsing nginx access logs" level="h4" %}}

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
