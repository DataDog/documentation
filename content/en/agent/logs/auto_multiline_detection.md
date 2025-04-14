---
title: Automatic Multi-line Detection and Aggregation
description: Use the Datadog Agent to detect and aggregate multi-line logs automatically
further_reading:
- link: "/agent/logs/advanced_log_collection"
  tag: "Documentation"
  text: "Advanced Log Collection"
- link: "/agent/logs/auto_multiline_detection_legacy"
  tag: "Documentation"
  text: "Auto Multi-line Detection and Aggregation V1"
algolia:
  tags: ['advanced log filter']
---

<div class="alert alert-warning">This feature is available for Agent version `7.65.0` and above. For older Agent versions or to explicitly enable the V1 implementation, see <a href="/agent/logs/auto_multiline_detection_legacy">Auto Multi-line Detection and Aggregation V1</a> </div>

## Overview

Automatic multi-line detection allows the Agent to detect and aggregate common multi-line logs automatically. 

## Getting Started

To enable the Auto multi-line feature in your Agent configuration, set `auto_multi_line_detection`  to `true` in your configuration file, or set the `DD_LOGS_CONFIG_AUTO_MULTI_LINE_DETECTION=true` environment variable: 

{{< tabs >}}
{{% tab "Configuration file" %}}

```yaml
logs_config:
  auto_multi_line_detection: true
```

{{% /tab %}}
{{% tab "Environment Variable" %}}

```shell
DD_LOGS_CONFIG_AUTO_MULTI_LINE_DETECTION=true
```

{{% /tab %}}
{{< /tabs >}}

### Default Settings

By default, the following features are enabled:

- `enable_datetime_detection`: This configures automatic datetime aggregation. Logs beginning with a datetime format will be used to aggregate logs. 
- `enable_json_detection`: This configures JSON detection and rejection. JSON-structured logs will never be aggregated. 

You can disable these features by setting the following to `false` in your configuration file or in you environment variable:

{{< tabs >}}
{{% tab "Configuration file" %}}

```yaml
logs_config:
  auto_multi_line:
    enable_datetime_detection: false
    enable_json_detection: false
```

{{% /tab %}}
{{% tab "Environment Variables" %}}

```shell
DD_LOGS_CONFIG_AUTO_MULTI_LINE_ENABLE_DATETIME_DETECTION=false
DD_LOGS_CONFIG_AUTO_MULTI_LINE_ENABLE_JSON_DETECTION=false
```

{{% /tab %}}
{{< /tabs >}}

### Enable multi-line aggregation per integration

You can enable or disable multi-line aggregation for a specific integration's log collection:

```yaml
logs:
  - type: file
    path: /my/test/file.log
    service: testApp
    source: java
    auto_multi_line_detection: false
```

### Supported datetime formats

Auto multi-line detection uses a fuzzy algorithm to detect *any* datetime format that occurs in the first 60 bytes of a log line. In order to prevent false positives, the algorithm requires enough context to consider a datetime format a match. 

Your datetime format should include both a date and time component to be detected. 

Examples of formats that are long enough to be detected:
 - `2021-03-28 13:45:30`
 - `2023-03-28T14:33:53.743350Z`
 - `Jun 14 15:16:01`
 - `2024/05/16 19:46:15`

Examples of formats that do not have enough context to be detected: 
- `12:30:2017`
- `12:30:20`
- `2024/05/16`


## Custom Pattern Configuration

If datetime aggregation is not sufficient, or if your format is too short to be detected automatically, you can customize the feature in two ways:
- [Custom Samples](#custom-samples)
- [Regex Patterns](#regex-patterns) 

### Custom Samples

A custom sample is a sample of a log on which you want to aggregate. For example, if you want to aggregate a stack trace, the first line of the stack trace would be good sample to provide. Custom samples are an easier way to aggregate logs than regex patterns. 

To configure custom samples, you can use the `logs_config` in your `datadog.yaml` file or set an environment variable. In the following example, the multi-line detection is looking for the sample `"SEVERE Main main Exception occurred"`:

{{< tabs >}}
{{% tab "Configuration file" %}}

```yaml
logs_config:
  auto_multi_line_detection_custom_samples:
    - sample: "SEVERE Main main Exception occurred"
```

{{% /tab %}}
{{% tab "Environment Variables" %}}

```shell
DD_LOGS_CONFIG_AUTO_MULTI_LINE_DETECTION_CUSTOM_SAMPLES='[{"sample": "SEVERE Main main Exception occurred"}]'
```

{{% /tab %}}
{{< /tabs >}}

This will aggregate logs where `"SEVERE Main main Exception occurred"` matches the first line. For example:

```text
SEVERE Main main Exception occurred
java.lang.Exception: Something bad happened!
    at Main.funcd(Main.java:50)
    at Main.funcc(Main.java:49)
    at Main.funcb(Main.java:48)
    at Main.funca(Main.java:47)
    at Main.main(Main.java:29)
```

#### How Custom Samples Work

Custom samples tokenize the first 60 bytes of a log line and the provided sample. In order to determine if sample matching is right for you, it's helpful to know how logs are tokenized. 

Tokens include words and their length, whitespace, numbers and their length, special characters, and datetime components. Each token in the log is compared with each token in the sample (from left to right). If 75% of the log's tokens match the sample's tokens, the log is marked for aggregation. 
	
Datadog recommends using sample based matching if your logs have a stable format. If you need more flexible matching you can use a regex. 

### Regex Patterns

Regex patterns work similarly to a `multi_line` rule. If the regex pattern matches the log, it is used for aggregation. 

To configure custom regex patterns, you can use the `logs_config` in your `datadog.yaml`  file or set an environment variable. 

{{< tabs >}}
{{% tab "Configuration file" %}}

```yaml
logs_config:
  auto_multi_line_detection_custom_samples:
    - regex: "\\[\\w+\\] Main main Exception occurred"
```

{{% /tab %}}
{{% tab "Environment Variables" %}}

```shell
DD_LOGS_CONFIG_AUTO_MULTI_LINE_DETECTION_CUSTOM_SAMPLES='[{"regex": "\\[\\w+\\] Main main Exception occurred"}]'
```

{{% /tab %}}
{{< /tabs >}}

You can mix samples and regex patterns to support multiple log formats:

{{< tabs >}}
{{% tab "Configuration file" %}}

```yaml
logs_config:
  auto_multi_line_detection_custom_samples:
    - sample: "CORE | INFO | (pkg/logs/"
    - regex: "\\d{4}dog.\\s\\w+"
    - sample: "[ERR] Exception"
      label: no_aggregate
```

{{% /tab %}}
{{% tab "Environment Variables" %}}

```shell
DD_LOGS_CONFIG_AUTO_MULTI_LINE_DETECTION_CUSTOM_SAMPLES='[
  {"sample": "CORE | INFO | (pkg/logs/"},
  {"regex": "\\d{4}dog.\\s\\w+"},
  {"sample": "[ERR] Exception", "label": "no_aggregate"}
]'
```

{{% /tab %}}
{{< /tabs >}}

**Note**: Previously configured `auto_multi_line_extra_patterns` are automatically supported [when migrating from V1][2].

## Advanced Customization

Auto multi-line detection uses a labeled aggregation system to aggregate logs. The detection step will assign a label to logs, and the aggregation step will aggregate the logs based on the labels that were assigned. 

### Label Types

1. **start_group**: Beginning of a multi-line log
   - Flushes any buffered multi-line log if present
   - Starts new multi-line log
   - Only one multi-line log can be buffered at a time

2. **aggregate**: Adds to existing multi-line log
   - If no multi-line log exists, flushes immediately
   - Default label when nothing else matches

3. **no_aggregate**: Never part of aggregation
   - Flushes buffered multi-line log if present
   - Flushes sample immediately
   - Used for JSON logs

### Label Configuration

You can provide custom labels to each regex or sample to change the aggregation behavior based on the label rules. This is useful if you want to explicitly include or exclude certain log formats in multi-line aggregation. 

{{< tabs >}}
{{% tab "Configuration file" %}}

```yaml
logs_config:
  auto_multi_line_detection_custom_samples:
    # Never aggregate these formats
    - sample: "some service we should not aggregate"
      label: no_aggregate
    - regex: \w*\s(data|dog)
      label: no_aggregate
```

{{% /tab %}}
{{% tab "Environment Variables" %}}

```shell
DD_LOGS_CONFIG_AUTO_MULTI_LINE_DETECTION_CUSTOM_SAMPLES='[
  {"sample": "some service we should not aggregate", "label": "no_aggregate"},
  {"regex": "\\w*\\s(data|dog)", "label": "no_aggregate"}
]'
```

{{% /tab %}}
{{< /tabs >}}

## Monitoring and Debugging

You can search for multiline logs or truncated logs by enabling the following settings:

```yaml
logs_config:
  tag_multi_line_logs: true
  tag_truncated_logs: true
```

These settings add the following tags to your logs so you can search for them in the logs explorer:

- `multiline`: Shows the aggregation source (e.g., `auto_multiline`, `multiline_regex`)
- `truncated`: Shows truncation source (e.g., `single_line`, `multi_line`)
**Note:** Truncation can occur if the log is too long for the agent to process. If a line is too long before multiline aggregation, it will get the `single_line` tag. If an incorrect pattern caused a log to aggregate and overflow the aggregation buffer, the `multi_line` tag will be used. 


## Configuration Reference

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `logs_config.auto_multi_line_detection_custom_samples` | Object | Empty | Custom samples/regex patterns |
| `logs_config.auto_multi_line.enable_json_detection` | Bool | True | Enable JSON detection & rejection |
| `logs_config.auto_multi_line.enable_datetime_detection` | Bool | True | Enable datetime detection |
| `logs_config.auto_multi_line.timestamp_detector_match_threshold` | Float | 0.5 | Timestamp matching threshold |
| `logs_config.auto_multi_line.tokenizer_max_input_bytes` | Int | 60 | Bytes to tokenize |

[1]: /agent/logs/auto_multiline_detection
[2]: /agent/logs/auto_multiline_detection_legacy
