---
title: Advanced Log Collection Configurations
description: Use the Datadog Agent to collect your logs and send them to Datadog
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

After you set up [log collection][1], you can customize your collection configuration:
- [Filter logs](#filter-logs)
  - [Exclude at match](#exclude-at-match)
  - [Include at match](#include-at-match)
- [Scrub sensitive data from your logs](#scrub-sensitive-data-from-your-logs)
- [Multi-line aggregation](#multi-line-aggregation)
- [Automatically aggregate multi-line logs](#automatically-aggregate-multi-line-logs)
- [Commonly used log processing rules](#commonly-used-log-processing-rules)
- [Tail directories using wildcards](#tail-directories-using-wildcards)
  - [Tail most recently modified files first](#tail-most-recently-modified-files-first)
- [Log file encodings](#log-file-encodings)
- [Global processing rules](#global-processing-rules)
- [Further Reading](#further-reading)

To apply a processing rule to all logs collected by a Datadog Agent, see the [Global processing rules](#global-processing-rules) section.

**Notes**:
- If you set up multiple processing rules, they are applied sequentially and each rule is applied on the result of the previous one.
- Processing rule patterns must conform to [Golang regexp syntax][2].
- The `log_processing_rules` parameter is used in integration configurations to customize your log collection configuration. While in the Agent's [main configuration][5], the `processing_rules` parameter is used to define global processing rules.

## Filter logs

To send only a specific subset of logs to Datadog, use the `log_processing_rules` parameter in your configuration file with the `exclude_at_match` or `include_at_match` type.

### Exclude at match

| Parameter          | Description                                                                                        |
|--------------------|----------------------------------------------------------------------------------------------------|
| `exclude_at_match` | If the specified pattern is contained in the message, the log is excluded and not sent to Datadog. |

For example, to **filter out** logs that contain a Datadog email address, use the following `log_processing_rules`:

{{< tabs >}}
{{% tab "Configuration file" %}}

```yaml
logs:
  - type: file
    path: /my/test/file.log
    service: cardpayment
    source: java
    log_processing_rules:
    - type: exclude_at_match
      name: exclude_datadoghq_users
      ## Regexp can be anything
      pattern: \w+@datadoghq.com
```

{{% /tab %}}
{{% tab "Docker" %}}

<div class="alert alert-info">
For more information on Agent Configuration, see <a href="/containers/guide/container-discovery-management/?tab=datadogoperator#agent-configuration">Container Discovery Management</a>.
</div>

In a Docker environment, use the label `com.datadoghq.ad.logs` on the **container sending the logs you want to filter** in order to specify the `log_processing_rules`, for example:

```yaml
 labels:
    com.datadoghq.ad.logs: >-
      [{
        "source": "java",
        "service": "cardpayment",
        "log_processing_rules": [{
          "type": "exclude_at_match",
          "name": "exclude_datadoghq_users",
          "pattern" : "\\w+@datadoghq.com"
        }]
      }]
```

**Note**: Escape regex characters in your patterns when using labels. For example, `\d` becomes `\\d`, `\w` becomes `\\w`.

**Note**: The label value must follow JSON syntax, which means you should not include any trailing commas or comments.

{{% /tab %}}
{{% tab "Kubernetes" %}}

<div class="alert alert-info">
For more information on Agent Configuration, see <a href="/containers/guide/container-discovery-management/?tab=datadogoperator#agent-configuration">Container Discovery Management</a>.
</div>

To configure using Autodiscovery to collect container logs on a given container (with the name `CONTAINER_NAME`) within your pod, add the following annotations to your pod's `log_processing_rules`:

```yaml
apiVersion: apps/v1
metadata:
  name: cardpayment
spec:
  selector:
    matchLabels:
      app: cardpayment
  template:
    metadata:
      annotations:
        ad.datadoghq.com/<CONTAINER_NAME>.logs: >-
          [{
            "source": "java",
            "service": "cardpayment",
            "log_processing_rules": [{
              "type": "exclude_at_match",
              "name": "exclude_datadoghq_users",
              "pattern" : "\\w+@datadoghq.com"
            }]
          }]
      labels:
        app: cardpayment
      name: cardpayment
    spec:
      containers:
        - name: '<CONTAINER_NAME>'
          image: cardpayment:latest
```

**Note**: Escape regex characters in your patterns when using pod annotations. For example, `\d` becomes `\\d`, `\w` becomes `\\w`.

**Note**: The annotation value must follow JSON syntax, which means you should not include any trailing commas or comments.

{{% /tab %}}
{{< /tabs >}}

### Include at match

| Parameter          | Description                                                                       |
|--------------------|-----------------------------------------------------------------------------------|
| `include_at_match` | Only logs with a message that includes the specified pattern are sent to Datadog. If multiple `include_at_match` rules are defined, all rules patterns must match in order for the log to be included. |


For example, use the following `log_processing_rules` configuration to **filter in** logs that contain a Datadog email address:

{{< tabs >}}
{{% tab "Configuration file" %}}

```yaml
logs:
  - type: file
    path: /my/test/file.log
    service: cardpayment
    source: java
    log_processing_rules:
    - type: include_at_match
      name: include_datadoghq_users
      ## Regexp can be anything
      pattern: \w+@datadoghq.com
```

If you want to match one or more patterns, you must define them in a single expression:

```yaml
logs:
  - type: file
    path: /my/test/file.log
    service: cardpayment
    source: java
    log_processing_rules:
    - type: include_at_match
      name: include_datadoghq_users
      pattern: abc|123
```

If the patterns are too long to fit legibly on a single line, you can break them into multiple lines:

```yaml
logs:
  - type: file
    path: /my/test/file.log
    service: cardpayment
    source: java
    log_processing_rules:
    - type: include_at_match
      name: include_datadoghq_users
      pattern: "abc\
|123\
|\\w+@datadoghq.com"
```

{{% /tab %}}
{{% tab "Docker" %}}

In a Docker environment, use the label `com.datadoghq.ad.logs` on the container that is sending the logs you want to filter, to specify the `log_processing_rules`. For example:

```yaml
 labels:
    com.datadoghq.ad.logs: >-
      [{
        "source": "java",
        "service": "cardpayment",
        "log_processing_rules": [{
          "type": "include_at_match",
          "name": "include_datadoghq_users",
          "pattern" : "\\w+@datadoghq.com"
        }]
      }]
```

**Note**: Escape regex characters in your patterns when using labels. For example, `\d` becomes `\\d`, `\w` becomes `\\w`.

**Note**: The label value must follow JSON syntax, which means you should not include any trailing commas or comments.

{{% /tab %}}
{{% tab "Kubernetes" %}}

In a Kubernetes environment, use the pod annotation `ad.datadoghq.com` on your pod to specify the `log_processing_rules`. For example:

```yaml
apiVersion: apps/v1
metadata:
  name: cardpayment
spec:
  selector:
    matchLabels:
      app: cardpayment
  template:
    metadata:
      annotations:
        ad.datadoghq.com/<CONTAINER_NAME>.logs: >-
          [{
            "source": "java",
            "service": "cardpayment",
            "log_processing_rules": [{
              "type": "include_at_match",
              "name": "include_datadoghq_users",
              "pattern" : "\\w+@datadoghq.com"
            }]
          }]
      labels:
        app: cardpayment
      name: cardpayment
    spec:
      containers:
        - name: '<CONTAINER_NAME>'
          image: cardpayment:latest
```

**Note**: Escape regex characters in your patterns when using pod annotations. For example, `\d` becomes `\\d`, `\w` becomes `\\w`.

**Note**: The annotation value must follow JSON syntax, which means you should not include any trailing commas or comments.

{{% /tab %}}
{{< /tabs >}}

## Scrub sensitive data from your logs

If your logs contain sensitive information that need redacting, configure the Datadog Agent to scrub sensitive sequences by using the `log_processing_rules` parameter in your configuration file with the `mask_sequences` type.

This replaces all matched groups with the value of the `replace_placeholder` parameter.

For example, to redact credit card numbers:

{{< tabs >}}
{{% tab "Configuration file" %}}

```yaml
logs:
 - type: file
   path: /my/test/file.log
   service: cardpayment
   source: java
   log_processing_rules:
      - type: mask_sequences
        name: mask_credit_cards
        replace_placeholder: "[masked_credit_card]"
        ##One pattern that contains capture groups
        pattern: (?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})
```

{{% /tab %}}
{{% tab "Docker" %}}

In a Docker environment, use the label `com.datadoghq.ad.logs` on your container to specify the `log_processing_rules`. For example:

```yaml
 labels:
    com.datadoghq.ad.logs: >-
      [{
        "source": "java",
        "service": "cardpayment",
        "log_processing_rules": [{
          "type": "mask_sequences",
          "name": "mask_credit_cards",
          "replace_placeholder": "[masked_credit_card]",
          "pattern" : "(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\\d{3})\\d{11})"
        }]
      }]
```

**Note**: Escape regex characters in your patterns when using labels. For example, `\d` becomes `\\d`, `\w` becomes `\\w`.

**Note**: The label value must follow JSON syntax, which means you should not include any trailing commas or comments.

{{% /tab %}}
{{% tab "Kubernetes" %}}

In a Kubernetes environment, use the pod annotation `ad.datadoghq.com` on your pod to specify the `log_processing_rules`. For example:

```yaml
apiVersion: apps/v1
metadata:
  name: cardpayment
spec:
  selector:
    matchLabels:
      app: cardpayment
  template:
    metadata:
      annotations:
        ad.datadoghq.com/<CONTAINER_NAME>.logs: >-
          [{
            "source": "java",
            "service": "cardpayment",
            "log_processing_rules": [{
              "type": "mask_sequences",
              "name": "mask_credit_cards",
              "replace_placeholder": "[masked_credit_card]",
              "pattern" : "(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\\d{3})\\d{11})"
            }]
          }]
      labels:
        app: cardpayment
      name: cardpayment
    spec:
      containers:
        - name: '<CONTAINER_NAME>'
          image: cardpayment:latest
```

**Note**: Escape regex characters in your patterns when using pod annotations. For example, `\d` becomes `\\d`, `\w` becomes `\\w`.

**Note**: The annotation value must follow JSON syntax, which means you should not include any trailing commas or comments.

{{% /tab %}}
{{< /tabs >}}

With Agent version 7.17+, the `replace_placeholder` string can expand references to capture groups such as `$1`, `$2` and so forth. If you want a string to follow the capture group with no space in between, use the format `${<GROUP_NUMBER>}`.

For instance, to scrub user information from the log `User email: foo.bar@example.com`, use:

* `pattern: "(User email: )[^@]*@(.*)"`
* `replace_placeholder: "$1 masked_user@${2}"`

This sends the following log to Datadog: `User email: masked_user@example.com`

## Automatically aggregate multi-line logs

Automatic multi-line detection is helpful when you have many log sources with complex formats or when you don't have time to configure each source individually. This feature automatically detects and aggregates multi-line logs without requiring you to write custom regex patterns.

See the [Auto Multi-line Detection and Aggregation][7] documentation.

For legacy support of the feature, see the [Automatic Multi-line Detection and Aggregation (Legacy)][8] documentation.

## Manually aggregate multi-line logs

Manual multi-line rules give you precise control over log aggregation when you know your log formats. This approach is ideal for ensuring consistent log processing with custom regex patterns tailored to your specific log structure.

If your logs are not sent in JSON and you want to aggregate several lines into a single entry, configure the Datadog Agent to detect a new log using a specific regex pattern instead of having one log per line. Use the `multi_line` type in the `log_processing_rules` parameter to aggregates all lines into a single entry until the given pattern is detected again.

For example, every Java log line starts with a timestamp in `yyyy-dd-mm` format. These lines include a stack trace that can be sent as two logs:

```text
2018-01-03T09:24:24.983Z UTC Exception in thread "main" java.lang.NullPointerException
        at com.example.myproject.Book.getTitle(Book.java:16)
        at com.example.myproject.Author.getBookTitles(Author.java:25)
        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
2018-01-03T09:26:24.365Z UTC starting upload of /my/file.gz
```

{{< tabs >}}
{{% tab "Configuration file" %}}

To send the example logs above with a configuration file, use the following `log_processing_rules`:

```yaml
logs:
 - type: file
   path: /var/log/pg_log.log
   service: database
   source: postgresql
   log_processing_rules:
      - type: multi_line
        name: new_log_start_with_date
        pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
```

{{% /tab %}}
{{% tab "Docker" %}}

In a Docker environment, use the label `com.datadoghq.ad.logs` on your container to specify the `log_processing_rules`. For example:

```yaml
 labels:
    com.datadoghq.ad.logs: >-
      [{
        "source": "postgresql",
        "service": "database",
        "log_processing_rules": [{
          "type": "multi_line",
          "name": "log_start_with_date",
          "pattern" : "\\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])"
        }]
      }]
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

In a Kubernetes environment, use the pod annotation `ad.datadoghq.com` on your pod to specify the `log_processing_rules`. For example:

```yaml
apiVersion: apps/v1
metadata:
  name: postgres
spec:
  selector:
    matchLabels:
      app: database
  template:
    metadata:
      annotations:
        ad.datadoghq.com/<CONTAINER_NAME>.logs: >-
          [{
            "source": "postgresql",
            "service": "database",
            "log_processing_rules": [{
              "type": "multi_line",
              "name": "log_start_with_date",
              "pattern" : "\\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])"
            }]
          }]
      labels:
        app: database
      name: postgres
    spec:
      containers:
        - name: '<CONTAINER_NAME>'
          image: postgres:latest
```

**Note**: Escape regex characters in your patterns when performing multi-line aggregation with pod annotations. For example, `\d` becomes `\\d`, `\w` becomes `\\w`.

**Note**: The annotation value must follow JSON syntax, which means you should not include any trailing commas or comments.

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-warning"><strong>Important!</strong> Regex patterns for multi-line logs must start at the <em>beginning</em> of a log. Patterns cannot be matched mid-line. <em>A never matching pattern may cause log line losses.</em> <br><br>Log collection works with precision of up to millisecond. Logs with greater precision are not sent even if they match the pattern.</div>

More examples:

| **Raw string**           | **Pattern**                                       |
|--------------------------|---------------------------------------------------|
| 14:20:15                 | `\d{2}:\d{2}:\d{2}`                               |
| 11/10/2014               | `\d{2}\/\d{2}\/\d{4}`                             |
| Thu Jun 16 08:29:03 2016 | `\w{3}\s+\w{3}\s+\d{2}\s\d{2}:\d{2}:\d{2}\s\d{4}` |
| 20180228                 | `\d{8}`                                           |
| 2020-10-27 05:10:49.657  | `\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}\.\d{3}`     |
| {"date": "2018-01-02"    | `\{"date": "\d{4}-\d{2}-\d{2}`                    |


## Commonly used log processing rules

See the dedicated [Commonly Used Log Processing Rules FAQ][4] to see a list of examples.

## Tail directories using wildcards

If your log files are labeled by date or all stored in the same directory, configure your Datadog Agent to monitor them all and automatically detect new ones using wildcards in the `path` attribute. If you want to exclude some files matching the chosen `path`, list them in the `exclude_paths` attribute.

* Using `path: /var/log/myapp/*.log`:
  * Matches all `.log` file contained in the `/var/log/myapp/` directory.
  * Doesn't match `/var/log/myapp/myapp.conf`.

* Using `path: /var/log/myapp/*/*.log`:
  * Matches `/var/log/myapp/log/myfile.log`.
  * Matches `/var/log/myapp/errorLog/myerrorfile.log`
  * Doesn't match `/var/log/myapp/mylogfile.log`.

Configuration example for Linux:

```yaml
logs:
  - type: file
    path: /var/log/myapp/*.log
    exclude_paths:
      - /var/log/myapp/debug.log
      - /var/log/myapp/trace.log
    service: mywebapp
    source: go
```

The example above matches `/var/log/myapp/log/myfile.log` and excludes `/var/log/myapp/log/debug.log` and `/var/log/myapp/log/trace.log`.

Configuration example for Windows:

```yaml
logs:
  - type: file
    path: C:\\MyApp\\*.log
    exclude_paths:
      - C:\\MyApp\\MyLog.*.log
    service: mywebapp
    source: csharp
```

The example above matches `C:\\MyApp\\MyLog.log` and excludes `C:\\MyApp\\MyLog.20230101.log` and `C:\\MyApp\\MyLog.20230102.log`.

**Note**: The Agent requires read and execute permissions on a directory to list all the available files in it.

**Note**: The path and exclude_paths values are case sensitive.

### Tail most recently modified files first

The Agent limits the number of files it can tail simultaneously, as defined by the `logs_config.open_files_limit` parameter.
By default, when more files match the wildcard pattern than this limit, the Agent prioritizes them by sorting filenames in reverse lexicographic order. This works well for log files named with timestamps or sequential numbering, ensuring that the most recent logs are tailed first.

However, if log filenames do not follow such patterns, the default behavior may not be ideal. To prioritize files by modification time, set logs_config.file_wildcard_selection_mode to by_modification_time. With this setting, the Agent continuously sorts files by their modification time. It always tails the most recently modified files first and stops tailing the least recently modified ones.

To restore default behavior, remove the `logs_config.file_wildcard_selection_mode` entry or explicitly set it to `by_name`.

This feature requires Agent version 7.40.0 or above.

## Log file encodings

By default, the Datadog Agent assumes that logs use UTF-8 encoding. If your application logs use a different encoding, specify the `encoding` parameter in the logs configuration setting.

The list below gives the supported encoding values. If you provide an unsupported value, the Agent ignores the value and reads the file as UTF-8.
 * `utf-16-le` - UTF-16 little-endian (Datadog Agent **v6.23/v7.23**)
 * `utf-16-be` - UTF-16 big-endian (Datadog Agent **v6.23/v7.23**)
 * `shift-jis` - Shift-JIS (Datadog Agent **v6.34/v7.34**)

Configuration example:

```yaml
logs:
  - type: file
    path: /test/log/hello-world.log
    tags: key:value
    service: utf-16-logs
    source: mysql
    encoding: utf-16-be
```

**Note**: The `encoding` parameter is only applicable when the `type` parameter is set to `file`.

## Global processing rules

For Datadog Agent v6.10+, the `exclude_at_match`, `include_at_match`, and `mask_sequences` processing rules can be defined globally in the Agent's [main configuration file][5] or through an environment variable:

{{< tabs >}}
{{% tab "Configuration files" %}}

In the `datadog.yaml` file:

```yaml
logs_config:
  processing_rules:
    - type: exclude_at_match
      name: exclude_healthcheck
      pattern: healthcheck
    - type: mask_sequences
      name: mask_user_email
      pattern: \w+@datadoghq.com
      replace_placeholder: "MASKED_EMAIL"
```

{{% /tab %}}
{{% tab "Environment Variable" %}}

Use the environment variable `DD_LOGS_CONFIG_PROCESSING_RULES` to configure global processing rules, for example:

```shell
DD_LOGS_CONFIG_PROCESSING_RULES='[{"type": "mask_sequences", "name": "mask_user_email", "replace_placeholder": "MASKED_EMAIL", "pattern" : "\\w+@datadoghq.com"}]'
```

{{% /tab %}}
{{% tab "Datadog Operator" %}}

Use the `spec.override.[key].env` parameter in your Datadog Operator manifest to set the `DD_LOGS_CONFIG_PROCESSING_RULES` environment variable to configure global processing rules, where `[key]` is `nodeAgent`, `clusterAgent`, or `clusterChecksRunner`. For example:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      env:
        - name: DD_LOGS_CONFIG_PROCESSING_RULES
          value: '[{"type": "mask_sequences", "name": "mask_user_email", "replace_placeholder": "MASKED_EMAIL", "pattern" : "\\w+@datadoghq.com"}]'
```

{{% /tab %}}
{{% tab "Helm" %}}

Use the `datadog.env` parameter in the Helm chart to set the `DD_LOGS_CONFIG_PROCESSING_RULES` environment variable to configure global processing rules. For example:

```yaml
datadog:
  env:
    - name: DD_LOGS_CONFIG_PROCESSING_RULES
      value: '[{"type": "mask_sequences", "name": "mask_user_email", "replace_placeholder": "MASKED_EMAIL", "pattern" : "\\w+@datadoghq.com"}]'
```

{{% /tab %}}
{{< /tabs >}}
All the logs collected by the Datadog Agent are impacted by the global processing rules.

**Note**: The Datadog Agent does not start the log collector if there is a format issue in the global processing rules. Run the Agent's [status subcommand][6] to troubleshoot any issues.

## Agent-Added Tags

The Datadog Agent automatically adds certain tags to all logs it collects before sending them to Datadog. These tags are added **pre-ingestion**, and are included in the payload that gets delivered to Datadog.

### Automatically Added Tags

The following tags are automatically added to logs by the Datadog Agent:

| Tag | Description | Conditions |
|-----|-------------|-------------|
| `source` | The source of the log (file path, integration name, etc.) | Always when available |
| `service` | The service name if configured in the log collection | Always when available |
| `env` | The environment tag if configured globally | Always when available |
| `version` | The Agent version | Always when available |
| `filename` | Base name of the tailed file | File-based sources only |
| `dirname` | Directory containing the tailed file | File-based sources only |
| `source_host` | IP address of the socket source host | Socket sources (TCP/UDP) only |
| `event_type` | Type of the Windows event | Windows events only |
| `event_source` | Source of the Windows event | Windows events only |
| `event_id` | Windows Event ID | Windows events only, if `tag_event_id: true` |
| `sid` | Windows Security identifier | Windows events only, if `tag_sid: true` |
| `truncated` | Source of truncation | If `logs_config.tag_truncated_logs: true` |
| `multiline` | Source of multiline aggregation | If `logs_config.tag_multi_line_logs: true` |
| `aggregated_json` | Indicates that the log was aggregated from multiple JSON log entries | If `logs_config.auto_multi_line.tag_aggregated_json: true` |

### Pre-ingestion Processing

Since these tags are added pre-ingestion, they:

* Are included in all log data delivered to Datadog
* Increase the overall size of your log data
* Are available for filtering, searching, and aggregation in the Log Explorer
* Can be used in log-based metrics and queries

### Further Configuration

For more advanced tag management, see:
- [Tagging Best Practices][9]
- [Agent Configuration Files][5]
- [Container Tagging][10]

[9]: /getting_started/tagging/
[10]: /agent/docker/tag/

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits is a trademark of Datadog, Inc.

[1]: /agent/logs/
[2]: https://golang.org/pkg/regexp/syntax/
[3]: https://github.com/DataDog/datadog-agent/blob/a27c16c05da0cf7b09d5a5075ca568fdae1b4ee0/pkg/logs/internal/decoder/auto_multiline_handler.go#L187
[4]: /agent/faq/commonly-used-log-processing-rules
[5]: /agent/configuration/agent-configuration-files/#agent-main-configuration-file
[6]: /agent/configuration/agent-commands/#agent-information
[7]: /agent/logs/auto_multiline_detection
[8]: /agent/logs/auto_multiline_detection_legacy
