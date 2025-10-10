---
title: (Legacy) Automatic Multi-line Detection and Aggregation
description: (Legacy) Use the Datadog Agent to detect and aggregate multi-line logs automatically
further_reading:
- link: "/logs/guide/getting-started-lwl/"
  tag: "Documentation"
  text: "Getting started with Logging without Limits™"
- link: "/logs/guide/how-to-set-up-only-logs/"
  tag: "Documentation"
  text: "Use the Datadog Agent for log collection only"
- link: "/logs/log_configuration/processors"
  tag: "Documentation"
  text: "Discover how to process your logs"
- link: "/logs/log_configuration/parsing"
  tag: "Documentation"
  text: "Learn more about parsing"
- link: "/logs/live_tail/"
  tag: "Documentation"
  text: "Datadog live tail functionality"
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "See how to explore your logs"
- link: "/glossary/#tail"
  tag: Glossary
  text: 'Glossary entry for "tail"'
algolia:
  tags: ['advanced log filter']
---

<div class="alert alert-danger">This document applies to Agent versions earlier than <strong>v7.65.0</strong>, or when the legacy auto multi-line detection is explicitly enabled. For newer Agent versions, please see <a href="/agent/logs/auto_multiline_detection">Auto Multi-line Detection and Aggregation</a>.</div>

## Global automatic multi-line aggregation
With Agent 7.37+, you can enable `auto_multi_line_detection` to automatically detect [common multi-line patterns][1] across **all** configured log integrations.

{{< tabs >}}
{{% tab "Configuration file" %}}
Enable `auto_multi_line_detection` globally in the `datadog.yaml` file:

```yaml
logs_config:
  auto_multi_line_detection: true
```
{{% /tab %}}

{{% tab "Docker" %}}
Use the environment variable `DD_LOGS_CONFIG_AUTO_MULTI_LINE_DETECTION` in the Datadog Agent container to configure a global automatic multi-line aggregation rule. For example:

```shell
DD_LOGS_CONFIG_AUTO_MULTI_LINE_DETECTION=true
```
{{% /tab %}}

{{% tab "Kubernetes" %}}
#### Operator
Use the `spec.override.nodeAgent.env` parameter in your Datadog Operator manifest to set the `DD_LOGS_CONFIG_AUTO_MULTI_LINE_DETECTION` environment variable to configure a global automatic multi-line aggregation rule. For example:

```yaml
spec:
  override:
    nodeAgent:
      env:
        - name: DD_LOGS_CONFIG_AUTO_MULTI_LINE_DETECTION
          value: "true"
```

#### Helm
Use the `datadog.logs.autoMultiLineDetection` option in the Helm chart to configure a global automatic multi-line aggregation rule. For example:

```yaml
datadog:
  logs:
    enabled: true
    autoMultiLineDetection: true
```

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info"> In Agent versions 7.65+, you can opt into the legacy behavior by setting to <strong>true</strong> the following:<br> <strong>- logs_config.force_auto_multi_line_detection_v1</strong> in your datadog.yaml file <br>OR <br> <strong>- LOGS_CONFIG_FORCE_AUTO_MULTI_LINE_DETECTION_V1</strong> in your environment variable.</div>

## Enable multi-line aggregation per integration
Alternatively, you can enable or disable multi-line aggregation for an individual integration's log collection. Changing the multi-line aggregation for an integration overrides the global configuration.

{{< tabs >}}
{{% tab "Configuration file" %}}
In a host environment, enable `auto_multi_line_detection` with the [Custom log collection][2] method. For example:

[2]: https://docs.datadoghq.com/agent/logs/?tab=tailfiles#custom-log-collection

```yaml
logs:
  - type: file
    path: /my/test/file.log
    service: testApp
    source: java
    auto_multi_line_detection: true
```
{{% /tab %}}

{{% tab "Docker" %}}
In a Docker environment, use the label `com.datadoghq.ad.logs` on your container to specify the log configuration. For example:

```yaml
 labels:
    com.datadoghq.ad.logs: >-
      [{
        "source": "java",
        "service": "testApp",
        "auto_multi_line_detection": true
      }]
```
{{% /tab %}}

{{% tab "Kubernetes" %}}
In a Kubernetes environment, use the annotation `ad.datadoghq.com/<CONTAINER_NAME>.logs` on your pod to specify the log configuration. For example:

```yaml
apiVersion: apps/v1
metadata:
  name: testApp
spec:
  selector:
    matchLabels:
      app: testApp
  template:
    metadata:
      annotations:
        ad.datadoghq.com/<CONTAINER_NAME>.logs: >-
          [{
            "source": "java",
            "service": "testApp",
            "auto_multi_line_detection": true
          }]
      labels:
        app: testApp
      name: testApp
    spec:
      containers:
        - name: '<CONTAINER_NAME>'
          image: testApp:latest
```
{{% /tab %}}
{{< /tabs >}}

## Customize multi-line aggregation configuration

Automatic multi-line detection uses a list of [common regular expressions][1] to match logs. If the built-in list is not sufficient, you can also add custom patterns and thresholds for detection.

### Custom Patterns
{{< tabs >}}
{{% tab "Configuration file" %}}
In a configuration file, add the `auto_multi_line_extra_patterns` to your `datadog.yaml`:

```yaml
logs_config:
  auto_multi_line_detection: true
  auto_multi_line_extra_patterns:
   - \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
   - '[A-Za-z_]+ \d+, \d+ \d+:\d+:\d+ (AM|PM)'
```

### Custom threshold
The `auto_multi_line_default_match_threshold` parameter determines how closely logs have to match the patterns in order for the auto multi-line aggregation to work.

If your multi-line logs aren't getting aggregated as expected, you can change the sensitivity of the matching by setting the `auto_multi_line_default_match_threshold` parameter. Add the `auto_multi_line_default_match_threshold` parameter to your configuration file with a value lower (to increase matches) or higher (to decrease matches) than the current threshold value. 

Restart the Datadog Agent to apply the new threshold value for newly ingested logs. To find the current threshold value, run the [Agent `status` command][3].

```yaml
logs_config:
  auto_multi_line_detection: true
  auto_multi_line_extra_patterns:
   - \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
   - '[A-Za-z_]+ \d+, \d+ \d+:\d+:\d+ (AM|PM)'
  auto_multi_line_default_match_threshold: 0.1
```
[3]: https://docs.datadoghq.com/agent/configuration/agent-commands/#agent-information

{{% /tab %}}

{{% tab "Docker" %}}
In a containerized Agent, add the environment variable `DD_LOGS_CONFIG_AUTO_MULTI_LINE_EXTRA_PATTERNS`:

```yaml
    environment:
      - DD_LOGS_CONFIG_AUTO_MULTI_LINE_DETECTION=true
      - DD_LOGS_CONFIG_AUTO_MULTI_LINE_EXTRA_PATTERNS=\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01]) [A-Za-z_]+\s\d+,\s\d+\s\d+:\d+:\d+\s(AM|PM)
```
**Note**: The Datadog Agent interprets spaces in the `DD_LOGS_CONFIG_AUTO_MULTI_LINE_EXTRA_PATTERNS` environment variable as separators between multiple patterns. In the following example, the two regex patterns are divided by a space, and `\s` in the second regex pattern matches spaces.

### Custom threshold
The `auto_multi_line_default_match_threshold` parameter determines how closely logs have to match the patterns in order for the auto multi-line aggregation to work.

If your multi-line logs are not getting aggregated as expected, you can change the sensitivity of the matching by setting the `auto_multi_line_default_match_threshold` parameter.

Add the `auto_multi_line_default_match_threshold` parameter to your configuration file with a value lower (to increase matches) or higher (to decrease matches) than the current threshold value.

To find the current threshold value, run the [Agent `status` command][4].

```yaml
    environment:
      - DD_LOGS_CONFIG_AUTO_MULTI_LINE_DETECTION=true
      - DD_LOGS_CONFIG_AUTO_MULTI_LINE_EXTRA_PATTERNS=\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01]) [A-Za-z_]+\s\d+,\s\d+\s\d+:\d+:\d+\s(AM|PM)
      - DD_LOGS_CONFIG_AUTO_MULTI_LINE_DEFAULT_MATCH_THRESHOLD=0.1
```
[4]: https://docs.datadoghq.com/agent/configuration/agent-commands/#agent-information]

{{% /tab %}}

{{% tab "Kubernetes" %}}
In Kubernetes, add the environment variable `DD_LOGS_CONFIG_AUTO_MULTI_LINE_EXTRA_PATTERNS`:

#### Operator
```yaml
spec:
  override:
    nodeAgent:
      env:
        - name: DD_LOGS_CONFIG_AUTO_MULTI_LINE_EXTRA_PATTERNS
          value: \d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01]) [A-Za-z_]+\s\d+,\s\d+\s\d+:\d+:\d+\s(AM|PM)
```

#### Helm
```yaml
datadog:
  env:
    - name: DD_LOGS_CONFIG_AUTO_MULTI_LINE_EXTRA_PATTERNS
      value: \d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01]) [A-Za-z_]+\s\d+,\s\d+\s\d+:\d+:\d+\s(AM|PM)
```
**Note**: The Datadog Agent interprets spaces in the `DD_LOGS_CONFIG_AUTO_MULTI_LINE_EXTRA_PATTERNS` environment variable as separators between multiple patterns. In the following example, the two regex patterns are divided by a space, and `\s` in the second regex pattern matches spaces.

### Custom threshold
The `auto_multi_line_default_match_threshold` parameter determines how closely logs have to match the patterns in order for the auto multi-line aggregation to work.

If your multi-line logs aren't getting aggregated as expected, you can change the sensitivity of the matching by setting the `auto_multi_line_default_match_threshold` parameter. Add the `auto_multi_line_default_match_threshold` parameter to your configuration file with a value lower (to increase matches) or higher (to decrease matches) than the current threshold value. To find the current threshold value, run the [Agent `status` command][1].

[1]: https://docs.datadoghq.com/agent/configuration/agent-commands/#agent-information

#### Operator
```yaml
spec:
  override:
    nodeAgent:
      env:
        - name: DD_LOGS_CONFIG_AUTO_MULTI_LINE_EXTRA_PATTERNS
          value: \d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01]) [A-Za-z_]+\s\d+,\s\d+\s\d+:\d+:\d+\s(AM|PM)
        - name: DD_LOGS_CONFIG_AUTO_MULTI_LINE_DEFAULT_MATCH_THRESHOLD
          value: "0.1"
```
#### Helm
```yaml
datadog:
  env:
    - name: DD_LOGS_CONFIG_AUTO_MULTI_LINE_EXTRA_PATTERNS
      value: \d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01]) [A-Za-z_]+\s\d+,\s\d+\s\d+:\d+:\d+\s(AM|PM)
    - name: DD_LOGS_CONFIG_AUTO_MULTI_LINE_DEFAULT_MATCH_THRESHOLD
      value: "0.1"
```

{{% /tab %}}
{{< /tabs >}}

## Detection process
Automatic multi-line detection detects logs that begin and comply with the following date/time formats:
- ANSIC
- RFC822
- RFC822Z
- RFC850
- RFC1123
- RFC1123Z
- RFC3339
- RFC3339Nano
- Ruby Date Format
- Unix Date Format
- Default Java logging SimpleFormatter date format

With multi-line aggregation enabled, the Agent first tries to detect a pattern in each new log file. This detection process takes at most 30 seconds or the first 500 logs, whichever comes first. During the initial detection process, the logs are sent as single lines.

After the detection threshold is met, all future logs for that source are aggregated with the best matching pattern, or as single lines if no pattern is found.

**Note**: If you can control the naming pattern of the rotated log, ensure that the rotated file replaces the previously active file with the same name. The Agent reuses a previously detected pattern on the newly rotated file to avoid re-running detection.



## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://github.com/DataDog/datadog-agent/blob/a27c16c05da0cf7b09d5a5075ca568fdae1b4ee0/pkg/logs/internal/decoder/auto_multiline_handler.go#L187
