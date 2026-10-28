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
  tags: ['advanced log filter', 'log rotation', 'file fingerprinting', 'duplicate logs', 'unreliable mount', 'azure files']
---

After you set up [log collection][1], you can customize your collection configuration:
- [Filter logs](#filter-logs)
  - [Exclude at match](#exclude-at-match)
  - [Include at match](#include-at-match)
  - [Exclude truncated](#exclude-truncated)
- [Scrub sensitive data from your logs](#scrub-sensitive-data-from-your-logs)
- [Multi-line aggregation](#manually-aggregate-multi-line-logs)
- [Automatically aggregate multi-line logs](#automatically-aggregate-multi-line-logs)
- [Commonly used log processing rules](#commonly-used-log-processing-rules)
- [Tail directories using wildcards](#tail-directories-using-wildcards)
  - [Prioritize tailed files by modification time](#prioritize-tailed-files-by-modification-time)
- [Log file encodings](#log-file-encodings)
- [Detect log rotation with file fingerprinting](#detect-log-rotation-with-file-fingerprinting)
  - [Collect logs from SMB/CIFS and Azure Files mounts](#collect-logs-from-smbcifs-and-azure-files-mounts)
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

**Note**:
- Escape regex characters in your patterns when using labels. For example, `\d` becomes `\\d`, `\w` becomes `\\w`.
- The label value must follow JSON syntax, which means you should not include any trailing commas or comments.

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

**Note**:
- Escape regex characters in your patterns when using pod annotations. For example, `\d` becomes `\\d`, `\w` becomes `\\w`.
- The annotation value must follow JSON syntax, which means you should not include any trailing commas or comments.

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

**Note**:
- Escape regex characters in your patterns when using labels. For example, `\d` becomes `\\d`, `\w` becomes `\\w`.
- The label value must follow JSON syntax, which means you should not include any trailing commas or comments.

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

**Note**:
- Escape regex characters in your patterns when using pod annotations. For example, `\d` becomes `\\d`, `\w` becomes `\\w`.
- The annotation value must follow JSON syntax, which means you should not include any trailing commas or comments.

{{% /tab %}}
{{< /tabs >}}

### Exclude truncated

| Parameter           | Description                                                        |
|---------------------|--------------------------------------------------------------------|
| `exclude_truncated` | When present, it excludes truncated logs and does not send to Datadog. The `exclude_truncated` rule is available starting with Agent v7.69. |

For example, to **filter out** truncated logs:

{{< tabs >}}
{{% tab "Configuration file" %}}

```yaml
logs:
  - type: file
    path: /my/test/file.log
    service: cardpayment
    source: java
    log_processing_rules:
    - type: exclude_truncated
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
          "type": "exclude_truncated"
        }]
      }]
```

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
              "type": "exclude_truncated"
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

**Note**:
- Escape regex characters in your patterns when using labels. For example, `\d` becomes `\\d`, `\w` becomes `\\w`.
- The label value must follow JSON syntax, which means you should not include any trailing commas or comments.

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

**Note**:
- Escape regex characters in your patterns when using pod annotations. For example, `\d` becomes `\\d`, `\w` becomes `\\w`.
- The annotation value must follow JSON syntax, which means you should not include any trailing commas or comments.

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

**Note**:
- Escape regex characters in your patterns when performing multi-line aggregation with pod annotations. For example, `\d` becomes `\\d`, `\w` becomes `\\w`.
- The annotation value must follow JSON syntax, which means you should not include any trailing commas or comments.

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-danger"><strong>Important!</strong> Regex patterns for multi-line logs must start at the <em>beginning</em> of a log. Patterns cannot be matched mid-line. <em>A never matching pattern may cause log line losses.</em> <br><br>Log collection works with precision of up to millisecond. Logs with greater precision are not sent even if they match the pattern.</div>

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
    path: /var/log/myapp/log/*.log
    exclude_paths:
      - /var/log/myapp/log/debug.log
      - /var/log/myapp/log/trace.log
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

**Note**:
- The Agent requires read and execute permissions on a directory to list all the available files in it.
- The path and exclude_paths values are case sensitive.
- Starting in Agent version 7.76.0, recursive globs (`**`) are supported in `path` and `exclude_paths` when you set `logs_config.enable_recursive_glob: true` in `datadog.yaml`. This is disabled by default.

### Prioritize tailed files by modification time

This feature requires Agent version 7.40.0 or above.

The Agent limits how many files it can tail simultaneously with the `logs_config.open_files_limit` parameter. If the number of files matching your configured log sources (such as wildcards) is within the limit, the Agent tails all of them. If more files match than the limit allows, the Agent prioritizes by sorting filenames in reverse lexicographic order, so files with newer timestamps or higher numbers are tailed first.

If filenames don’t follow sequential or timestamped patterns, the default ordering may not be ideal. To prioritize by modification time instead, set `logs_config.file_wildcard_selection_mode` to `by_modification_time`. With this setting, the Agent tails the most recently modified files first.

**Example**:
- `open_files_limit` = 500
- Your wildcard pattern matches 700 files.
- With `by_name`: the Agent tails the 500 files with the highest names in reverse lexicographic order (for example, app.log.700 through app.log.201).
- With `by_modification_time`: the Agent tails the 500 files most recently written to, regardless of their names.

```yaml
logs_enabled: true
logs_config:
 [...]
  open_files_limit: 500

  ## @param file_wildcard_selection_mode - string - optional - default: by_name
  ## The strategy used to prioritize wildcard matches if they exceed open_files_limit.
  ## Choices:
  ##   - by_name: files are sorted in reverse lexicographic order (default).
  ##   - by_modification_time: files are sorted by modification time, with the most recent first.
  ## WARNING: by_modification_time is less performant and increases disk I/O.
  file_wildcard_selection_mode: by_modification_time
```

To restore default behavior, remove the `logs_config.file_wildcard_selection_mode` entry or explicitly set it to `by_name`.

## Log file encodings

By default, the Datadog Agent assumes that logs use UTF-8 encoding. If your application logs use a different encoding, specify the `encoding` parameter in the logs configuration setting.

The list below gives the supported encoding values. If you provide an unsupported value, the Agent ignores the value and reads the file as UTF-8.
 * `utf-16-le` - UTF-16 little-endian (Datadog Agent **v6.23/v7.23**)
 * `utf-16-be` - UTF-16 big-endian (Datadog Agent **v6.23/v7.23**)
 * `shift-jis` - Shift-JIS (Datadog Agent **v6.34/v7.34**)

<div class="alert alert-warning">If you change the <code>encoding</code> of a file the Agent is <em>already tailing</em>, it can produce garbled characters (mojibake). The Agent resumes from the previous byte offset, which may not align with character boundaries after an encoding change. To fix this, rotate the log file, replace it, or restart tailing from the beginning of a file that uses the new encoding. These actions help the Agent start with the correct encoding.</div>

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

## Detect log rotation with file fingerprinting

By default, the Agent detects that a log file was rotated or truncated from file metadata: the file's inode (Linux and macOS) and its size. On Windows and on network filesystems such as NFS, SMB/CIFS, and Azure Files, that metadata can be stale or reused. The Agent can then miss a rotation, detect a rotation that did not happen, or read the same lines twice, so you see **duplicate or missing logs**.

File fingerprinting makes the Agent identify a file by its content instead. The Agent computes a checksum of the first lines or bytes of each tailed file on every file scan. If the checksum changes, the Agent treats the file as rotated: it finishes reading the old file and reads the new file from the beginning.

Fingerprinting is disabled by default. Enable it if you see duplicate or missing logs around rotation, especially on Windows or network filesystems.

**Requirements**:
- File fingerprinting requires Agent version 7.72.0 or later.
- The fingerprint configuration appears in the Agent status output starting with Agent version 7.74.0.
- Agent status messages for files that cannot be fingerprinted require Agent version 7.84.0 or later. Datadog recommends 7.84.0 or later.

### Enable file fingerprinting

Enable fingerprinting for all file log sources in the Agent's [main configuration file][5], or for a single source in its integration configuration. A per-source `fingerprint_config` replaces the global configuration for that source.

{{< tabs >}}
{{% tab "All file sources" %}}

In `datadog.yaml`:

```yaml
logs_config:
  fingerprint_config:
    fingerprint_strategy: line_checksum
    count: 1
```

Or with environment variables:

```shell
DD_LOGS_CONFIG_FINGERPRINT_CONFIG_FINGERPRINT_STRATEGY=line_checksum
DD_LOGS_CONFIG_FINGERPRINT_CONFIG_COUNT=1
```

{{% /tab %}}
{{% tab "One file source" %}}

In the source's `conf.yaml`:

```yaml
logs:
  - type: file
    path: /var/log/myapp/*.log
    service: myapp
    source: myapp
    fingerprint_config:
      fingerprint_strategy: line_checksum
      count: 1
      max_bytes: 100000
```

A per-source `fingerprint_config` does not inherit any values from the global configuration. Set `count` and, for `line_checksum`, `max_bytes`. If a required value is missing, the Agent rejects the source and reports `Invalid logs configuration` in the Agent log and status.

To turn fingerprinting off for one source when it is enabled globally, set `fingerprint_strategy: disabled` in that source.

{{% /tab %}}
{{< /tabs >}}

[Restart the Agent][9] to apply the configuration.

### Choose a strategy

| Strategy | What the Agent hashes | Use it when |
|---|---|---|
| `line_checksum` | `count` complete lines, after skipping `count_to_skip` lines, reading at most `max_bytes` bytes. | Your logs are line-delimited text. This is the recommended strategy. |
| `byte_checksum` | Exactly `count` bytes, after skipping `count_to_skip` bytes. | Line boundaries are unreliable, or the first line can be very large. |
| `disabled` | Nothing. The Agent uses file metadata. | Default. |

The fingerprint must be **the same for the whole life of a file and different between consecutive files**. If every file starts with the same header, such as a CSV header or a banner line, skip it with `count_to_skip`. Otherwise the new file has the same fingerprint as the old one and the Agent does not detect the rotation:

```yaml
fingerprint_config:
  fingerprint_strategy: line_checksum
  count: 1
  count_to_skip: 2   # skip a two-line header
  max_bytes: 100000
```

| Parameter | Default | Description |
|---|---|---|
| `fingerprint_strategy` | `disabled` | `line_checksum`, `byte_checksum`, or `disabled`. |
| `count` | `1` line or `1024` bytes in the global configuration. No default in a per-source configuration. | Number of lines or bytes to hash. Must be greater than 0. |
| `count_to_skip` | `0` | Number of lines or bytes to skip before hashing. |
| `max_bytes` | `100000` | Maximum bytes read for a `line_checksum` fingerprint. Must cover the skipped and hashed lines. Ignored by `byte_checksum`. |

<div class="alert alert-warning">The Agent does not start tailing a file until the file contains at least <code>count_to_skip</code> + <code>count</code> lines or bytes. Empty files and files that stay smaller than that are not collected until they grow. Keep <code>count</code> and <code>count_to_skip</code> small, or disable fingerprinting for sources whose files are often smaller than the fingerprint.</div>

### Verify file fingerprinting

Run the [Agent status command][6]. In the **Logs Agent** section, each file tailer lists a **Fingerprint Config** entry with the active `Strategy`, `Count`, `CountToSkip`, and, for `line_checksum`, `MaxBytes`. `Source: per-source` means the source's own configuration applies.

If a file matches a source but is not tailed because of its fingerprint, the source shows a message next to `N files tailed out of M files matching`:

- `Not tailing <PATH>: too short to fingerprint (needs <N> lines)`: the file is smaller than the fingerprint. It is collected from the beginning once it grows. If this persists, lower `count` or `count_to_skip`.
- `Not tailing <PATH>: its fingerprint could not be computed (<ERROR>)`: the Agent could not read the start of the file, for example because of permissions or a filesystem error.

The Agent log also contains a warning, `Unable to tail <PATH>`, the first time a file is skipped, and `Now tailing <PATH>` when collection starts.

### Collect logs from SMB/CIFS and Azure Files mounts

On Linux, the kernel SMB/CIFS client can serve cached content for a file after it has been rotated on the server. On these mounts, fingerprinting alone can read the old file's first line, miss the rotation, and re-read old lines. For log files on SMB/CIFS mounts, including Azure Files, enable the unreliable mount profile.

This feature requires Agent version 7.84.4 or later.

In `datadog.yaml`:

```yaml
logs_config:
  unreliable_mount:
    enabled: true
```

Or with an environment variable:

```shell
DD_LOGS_CONFIG_UNRELIABLE_MOUNT_ENABLED=true
```

Restart the Agent after changing this setting. The profile applies to all file log sources on the Agent and changes the following:

- **Fingerprint reads bypass the cache (Linux only)**: the Agent reads each fingerprint directly from the server (`O_DIRECT`). Normal log reads still use the cache. On other platforms, fingerprint reads are unchanged.
- **Smaller default fingerprint**: if `logs_config.fingerprint_config.fingerprint_strategy` is not set, the Agent uses `line_checksum` with `count: 1`, and `max_bytes` defaults to `4096`. Settings you configure explicitly, including `disabled`, are kept.
- **One reader per path after a rotation**: after a rotation, the Agent finishes reading the rotated file before it opens the new file at the same path. The rotated file is closed after 30 seconds without new data, or after `rotation_drain_timeout` seconds (default `60`), whichever comes first. Then the new file is read from the beginning.

For best results on SMB/CIFS mounts:

- **Use a wildcard in `path`**, even for a single file. For example, use `/mnt/share/logs/*.log`, or `/mnt/share/logs/[a]pp.log` to match only `app.log`. Avoid patterns such as `app.log*` that also match rotated files.
- **Mount the share with the `cache=none` option**, if your workload allows it. Mount options apply to new mounts only. On Kubernetes, add it to the `mountOptions` of the StorageClass or PersistentVolume, then recreate the pods that use the volume.
- **Make sure the Agent user can read the log files.** The profile's direct fingerprint reads do not use system-probe privileged log access (`privileged_logs.enabled` in `system-probe.yaml`). Files that the Agent can read only through system-probe are not collected.

**Limitations**:
- Each rotation pauses collection of the new file for at least 30 seconds. If a file is rotated again before the Agent finishes reading the previous file, the Agent does not read it.
- Direct fingerprint reads fetch up to the full `max_bytes` window from the server on every file scan. To reduce I/O, increase `logs_config.file_scan_period` (default `1` second).
- If a direct read fails, the Agent does not retry it through the cache. A new file is not tailed until a read succeeds, and the message `its fingerprint could not be computed` appears in the Agent status. A file that is already being tailed keeps being collected.
- If logs written before a rotation are lost, the Agent log contains `bytes remaining unread for file`. If this message names the rotation close timeout, increase `logs_config.unreliable_mount.rotation_drain_timeout`.

## Global processing rules

For Datadog Agent v6.10+, the `exclude_at_match`, `include_at_match`, and `mask_sequences` processing rules can be defined globally in the Agent's [main configuration file][5] or through an environment variable. The `exclude_truncated` rule is available starting with Agent v7.69.

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

## Multi-line log aggregation FAQ

**1. When should I use manual multi-line rules vs. automatic multi-line detection?**

If you know the format of your logs, you should use manual multi-line rules for precise control.
If you are sending lots of multi-line logs, and you are unsure of their format or don't have the means to configure all sources individually, you should use automatic multi-line detection.

**2. What happens when a multi-line pattern doesn't match any logs?**

All non-JSON log lines are processed individually as separate log entries.
All JSON-formatted log lines are treated as a single line of logs, and only the first valid JSON format enters the intake; the rest are dropped.

**3. What happens when there are both global rules and integration-specific rules?**
Integration-specific rules completely override global rules for the particular integration.

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
[9]: /agent/configuration/agent-commands/#start-stop-and-restart-the-agent
