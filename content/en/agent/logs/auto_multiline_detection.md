---
title: Auto Multi-line Detection and Aggregation
description: Use the Datadog Agent to detect and aggregate multi-line logs automatically
further_reading:
- link: "/agent/logs/advanced_log_collection"
  tag: "Documentationmultiline"
  text: "Advanced Log Collection"
- link: "/agent/logs/auto_multiline_detection_legacy"
  tag: "Documentation"
  text: "Auto Multi-line Detection and Aggregation V1"
algolia:
  tags: ['advanced log filter']
---

**Note**: This feature is available for Agent version `7.65.0` and above. For older Agent versions or to explicitly enable the V1 implementation, see [Auto Multi-line Detection and Aggregation V1][2].

## Overview

Auto multi-line Detection allows the agent to detect and aggregate common multi-line logs automatically. 

- **Arbitrary datetime detection**: Automatically detects any datetime format in the first 60 bytes of a log line
- **Continuous aggregation**: Logs are constantly tested for multi-line patterns
- **Mixed format support**: Different formats don't influence each other
- **Multiple pattern support**: Multiple patterns can be applied to the same log file
- **JSON rejection**: JSON formatted logs are never aggregated

## Getting Started

Enable the feature in your Agent configuration:

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

- Automatic datetime aggregation
- JSON detection and rejection

You can disable these features with:

```yaml
logs_config:
  auto_multi_line:
    enable_datetime_detection: false
    enable_json_detection: false
```

### Enable multi-line aggregation per integration

You can enable or disable the feature for specific log configurations:

```yaml
logs:
  - type: file
    path: /my/test/file.log
    service: testApp
    source: java
    auto_multi_line_detection: false
```

## Custom Pattern Configuration

If datetime aggregation isn't sufficient, you can customize the feature in two ways:

### Custom Samples

Configure custom samples in your `datadog.yaml`:

```yaml
logs_config:
  auto_multi_line_detection_custom_samples:
    - sample: "SEVERE Main main Exception occurred"
```

This will aggregate logs with similar formats. For example:

```text
SEVERE Main main Exception occurred
java.lang.Exception: Something bad happened!
    at Main.funcd(Main.java:50)
    at Main.funcc(Main.java:49)
    at Main.funcb(Main.java:48)
    at Main.funca(Main.java:47)
    at Main.main(Main.java:29)
```

**Note**: Most logs with datetime prefixes are automatically detected and require no additional configuration.

#### How Custom Samples Work

Custom samples tokenize the first 60 bytes of a log line and compare tokens linearly:
- Tokens include: words, whitespace, numbers, special characters, and datetime components
- 75% token match threshold by default
- Works best with stable log formats
- Use regex for complex matching needs

### Regex Patterns

Configure custom regex patterns:

```yaml
logs_config:
  auto_multi_line_detection_custom_samples:
    - regex: "\\[\\w+\\] Main main Exception occurred"
```

You can mix samples and regex patterns to support multiple log formats.

**Note**: Previously configured `auto_multi_line_extra_patterns` are automatically supported [when migrating from V1][2].

## Advanced Customization

Auto multi-line uses a labeled aggregation system with three label types:

### Label Types

1. **start_group**: Beginning of a multi-line log
   - Flushes existing group if present
   - Starts new group
   - Only one group can exist at a time

2. **aggregate**: Adds to existing group
   - If no group exists, flushes immediately
   - Default label when nothing else matches

3. **no_aggregate**: Never part of aggregation
   - Flushes existing group if present
   - Flushes sample immediately
   - Used for JSON logs

### Label Configuration

```yaml
logs_config:
  auto_multi_line_detection_custom_samples:
    - sample: "some service we should not aggregate"
      label: no_aggregate
    - regex: \w*\s(foo|bar)
      label: no_aggregate
```

## Monitoring and Debugging

Enable additional tagging to monitor multi-line logs:

```yaml
logs_config:
  tag_multi_line_logs: true
  tag_truncated_logs: true
```

This adds:
- `multiline` tag: Shows source (e.g., `auto_multiline`, `multiline_regex`)
- `truncated` tag: Shows truncation source (e.g., `single_line`, `multi_line`)

**Note**: You can create metrics in Datadog using these tags for easier querying.

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
