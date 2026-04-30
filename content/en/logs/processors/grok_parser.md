---
title: Grok Parser
processor_name: grok-parser
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
- link: "/logs/log_configuration/parsing/?tab=matchers"
  tag: "Documentation"
  text: "Parsing rules: Matchers tab"
- link: "/logs/guide/manage_logs_and_metrics_with_terraform/"
  tag: "Guide"
  text: "Manage Logs and Metrics with Terraform"
- link: "https://learn.datadoghq.com/courses/log-pipelines"
  tag: "Learning Center"
  text: "Try the Log Pipelines course in the Learning Center"
---

## Overview

Create custom grok rules to parse the full message or a specific attribute of your raw event. For more information, see the [parsing section][2]. As a best practice, it is recommended to use at most 10 parsing rules within a grok processor.

Define the Grok processor on the [**Pipelines** page][1]:

{{< img src="logs/log_configuration/processor/grok_parser.png" alt="Grok Parser" style="width:80%;" >}}

Click **Parse my logs** to kickstart a set of three parsing rules for the logs flowing through the underlying pipeline. Refine attribute naming from there, and add new rules for other type of logs if needed. This feature requires that the corresponding logs are being indexed, and actually flowing in—you can temporarily deactivate or sample down exclusion filters to make this work for you.

Select a sample by clicking on it to trigger its evaluation against the parsing rule and display the result at the bottom of the screen.

Up to five samples can be saved with the processor, and each sample can be up to 5000 characters in length. All samples show a status (`match` or `no match`), which highlights if one of the parsing rules of the grok parser matches the sample.

## Use cases

| Use case | Example |
| :--- | :--- |
| Extract structured data from unstructured log messages. | Parse an `nginx` log message to extract attributes such as IP address, user, request timestamp, request method, URL, status code, and bytes written. |

## Before and after

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

{{< log-processor-api >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/pipelines
[2]: /logs/log_configuration/parsing/
[3]: /api/v1/logs-pipelines/
