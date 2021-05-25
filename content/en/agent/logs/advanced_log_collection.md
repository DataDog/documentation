---
title: Advanced Log Collection
kind: documentation
description: Use the Datadog Agent to collect your logs and send them to Datadog
further_reading:
- link: "/logs/processing/"
  tag: "Documentation"
  text: "Discover how to process your logs"
- link: "/logs/processing/parsing/"
  tag: "Documentation"
  text: "Learn more about parsing"
- link: "/logs/live_tail/"
  tag: "Documentation"
  text: "Datadog live tail functionality"
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "See how to explore your logs"
- link: "/logs/logging_without_limits/"
  tag: "Documentation"
  text: "Logging without Limits*"
---

Apply log processing rules to a specific log collection configurations to:

* [Filter logs](#filter-logs)
* [Scrub sensitive data from your logs](#scrub-sensitive-data-from-your-logs)
* [Proceed to multi-line aggregation](#multi-line-aggregation)
* [Tail directories by using wildcards](#tail-directories-by-using-wildcards)
* [Encode UTF-16 format logs](#encode-utf-16-format-logs)

**Note**: If you set up multiple processing rules, they are applied sequentially and each rule is applied on the result of the previous one.

**Note**: Processing rule patterns must conform to [Golang regexp syntax][1].

To apply a processing rule to all logs collected by a Datadog Agent, see the [Global processing rules](#global-processing-rules) section.

## Filter logs

To send only a specific subset of logs to Datadog use the `log_processing_rules` parameter in your configuration file with the **exclude_at_match** or **include_at_match** `type`.

### Exclude at match

| Parameter          | Description                                                                                        |
|--------------------|----------------------------------------------------------------------------------------------------|
| `exclude_at_match` | If the specified pattern is contained in the message, the log is excluded and not sent to Datadog. |

For example, to **filter OUT** logs that contain a Datadog email address, use the following `log_processing_rules`:

{{< tabs >}}
{{% tab "Configuration file" %}}

```yaml
logs_config:
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

In a Docker environment, use the label `com.datadoghq.ad.logs` on your container to specify the `log_processing_rules`, for example:

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

**Note**: Escape regex characters in your patterns when using labels. For example, `\d` becomes `\\d`, `\w` becomes `\\w`, etc.

{{% /tab %}}
{{% tab "Kubernetes" %}}

In a Kubernetes environment, use the pod annotation `ad.datadoghq.com` on your pod to specify the `log_processing_rules`, for example:

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: cardpayment
spec:
  selector:
    matchLabels:
      app: cardpayment
  template:
    metadata:
      annotations:
        ad.datadoghq.com/cardpayment.logs: >-
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
        - name: cardpayment
          image: cardpayment:latest
```

**Note**: Escape regex characters in your patterns when using pod annotations. For example, `\d` becomes `\\d`, `\w` becomes `\\w`, etc.

{{% /tab %}}
{{< /tabs >}}

### Include at match

| Parameter          | Description                                                                       |
|--------------------|-----------------------------------------------------------------------------------|
| `include_at_match` | Only logs with a message that includes the specified pattern are sent to Datadog. If multiple `include_at_match` rules are defined, all rules patterns must match in order for the log to be included. |


For example, to **filter IN** logs that contain a Datadog email address, use the following `log_processing_rules`:

{{< tabs >}}
{{% tab "Configuration file" %}}

```yaml
logs_config:
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

If you want to match one or more patterns you must define them in a single expression:

```yaml
logs_config:
  - type: file
    path: /my/test/file.log
    service: cardpayment
    source: java
    log_processing_rules:
    - type: include_at_match
      name: include_datadoghq_users
      pattern: abc|123
```

If the patterns are too long to fit legibly on a single line you can break them into multiple lines:

```yaml
logs_config:
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

In a Docker environment, use the label `com.datadoghq.ad.logs` on your container to specify the `log_processing_rules`, for example:

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

**Note**: Escape regex characters in your patterns when using labels. For example, `\d` becomes `\\d`, `\w` becomes `\\w`, etc.

{{% /tab %}}
{{% tab "Kubernetes" %}}

In a Kubernetes environment, use the pod annotation `ad.datadoghq.com` on your pod to specify the `log_processing_rules`, for example:

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: cardpayment
spec:
  selector:
    matchLabels:
      app: cardpayment
  template:
    metadata:
      annotations:
        ad.datadoghq.com/cardpayment.logs: >-
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
        - name: cardpayment
          image: cardpayment:latest
```

**Note**: Escape regex characters in your patterns when using pod annotations. For example, `\d` becomes `\\d`, `\w` becomes `\\w`, etc.

{{% /tab %}}
{{< /tabs >}}

## Scrub sensitive data from your logs

If your logs contain sensitive information that need redacting, configure the Datadog Agent to scrub sensitive sequences by using the `log_processing_rules` parameter in your configuration file with the **mask_sequences** `type`.

This replaces all matched groups with the value of the `replace_placeholder` parameter.

For example, redact credit card numbers:

{{< tabs >}}
{{% tab "Configuration file" %}}

```yaml
logs_config:
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

In a Docker environment, use the label `com.datadoghq.ad.logs` on your container to specify the `log_processing_rules`, for example:

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

**Note**: Escape regex characters in your patterns when using labels. For example, `\d` becomes `\\d`, `\w` becomes `\\w`, etc.

{{% /tab %}}
{{% tab "Kubernetes" %}}

In a Kubernetes environment, use the pod annotation `ad.datadoghq.com` on your pod to specify the `log_processing_rules`, for example:

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: cardpayment
spec:
  selector:
    matchLabels:
      app: cardpayment
  template:
    metadata:
      annotations:
        ad.datadoghq.com/cardpayment.logs: >-
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
        - name: cardpayment
          image: cardpayment:latest
```

**Note**: Escape regex characters in your patterns when using pod annotations. For example, `\d` becomes `\\d`, `\w` becomes `\\w`, etc.

{{% /tab %}}
{{< /tabs >}}

With Agent version 7.17+, the `replace_placeholder` string can expand references to capture groups such as `$1`, `$2` and so forth. If you want a string to follow the capture group with no space in between, use the format `${<GROUP_NUMBER>}`.

For instance, to scrub user information from the log `User email: foo.bar@example.com`, use:

* `pattern: "(User email: )[^@]*@(.*)"`
* `replace_placeholder: "$1 masked_user@${2}"`

This sends the following log to Datadog: `User email: masked_user@example.com`

## Multi-line aggregation

If your logs are not sent in JSON and you want to aggregate several lines into a single entry, configure the Datadog Agent to detect a new log using a specific regex pattern instead of having one log per line. This is accomplished by using the `log_processing_rules` parameter in your configuration file with the **multi_line** `type` which aggregates all lines into a single entry until the given pattern is detected again.

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
logs_config:
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

In a Docker environment, use the label `com.datadoghq.ad.logs` on your container to specify the `log_processing_rules`, for example:

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

In a Kubernetes environment, use the pod annotation `ad.datadoghq.com` on your pod to specify the `log_processing_rules`, for example:

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: postgres
spec:
  selector:
    matchLabels:
      app: database
  template:
    metadata:
      annotations:
        ad.datadoghq.com/postgres.logs: >-
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
        - name: postgres
          image: postgres:latest
```

**Note**: Escape regex characters in your patterns when performing multi-line aggregation with pod annotations. For example, `\d` becomes `\\d`, `\w` becomes `\\w`, etc.

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-warning"><strong>Important!</strong> Regex patterns for multi-line logs must start at the <em>beginning</em> of a log. Patterns cannot be matched mid-line. <em>A never matching pattern may cause log line losses.</em></div>

More examples:

| **Raw string**           | **Pattern**                                   |
|--------------------------|-----------------------------------------------|
| 14:20:15                 | `\d{2}:\d{2}:\d{2}`                           |
| 11/10/2014               | `\d{2}\/\d{2}\/\d{4}`                         |
| Thu Jun 16 08:29:03 2016 | `\w{3}\s+\w{3}\s+\d{2}\s\d{2}:\d{2}:\d{2}`    |
| 20180228                 | `\d{8}`                                       |
| 2020-10-27 05:10:49.657  | `\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}\.\d{3}` |
| {"date": "2018-01-02"    | `\{"date": "\d{4}-\d{2}-\d{2}`                |

## Commonly used log processing rules

See the dedicated [Commonly Used Log Processing Rules FAQ][2] to see a list of examples.

## Tail directories by using wildcards

If your log files are labeled by date or all stored in the same directory, configure your Datadog Agent to monitor them all and automatically detect new ones by using wildcards in the `path` attribute. If you want to exclude some files matching the chosen `path`, list them in the `exclude_paths` attribute.

* Using `path: /var/log/myapp/*.log`:
  * Matches all `.log` file contained in the `/var/log/myapp/` directory.
  * Doesn't match `/var/log/myapp/myapp.conf`.

* Using `path: /var/log/myapp/*/*.log`:
  * Matches `/var/log/myapp/log/myfile.log`.
  * Matches `/var/log/myapp/errorLog/myerrorfile.log`
  * Doesn't match `/var/log/myapp/mylogfile.log`.

Configuration example:

```yaml
logs_config:
  - type: file
    path: /var/log/myapp/*.log
    exclude_paths:
      - /var/log/myapp/debug.log
      - /var/log/myapp/trace.log
    service: mywebapp
    source: go
```

The example above will match `/var/log/myapp/log/myfile.log` but `/var/log/myapp/log/debug.log` and `/var/log/myapp/log/trace.log` will never be tailed.

**Note**: The Agent requires read and execute permissions on a directory to list all the available files in it.

## Encode UTF-16 format logs

If applications logs are written in UTF-16 format, starting with Datadog Agent **v6.23/v7.23**, users can encode these logs so that they are parsed as expected in the [Logs Explorer][3]. Use the `encoding` parameter in the logs configuration section. Set it to `utf-16-le` for UTF16 little-endian and `utf-16-be` for UTF16 big-endian. Any other value will be ignored and the Agent will read the file as UTF8.

Configuration example:

```yaml
logs_config:
  - type: file
    path: /test/log/hello-world.log
    tags: key:value
    service: utf-16-logs
    source: mysql
    encoding: utf-16-be
```

**Note**: The `encoding` parameter is only applicable when the `type` parameter is set to `file`.

## Global processing rules

For Datadog Agent v6.10+, the `exclude_at_match`, `include_at_match`, and `mask_sequences` processing rules can be defined globally in the Agent's [main configuration file][4] or through an environment variable:

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
{{% tab "Helm" %}}

Use the `env` parameter in the helm chart to set the `DD_LOGS_CONFIG_PROCESSING_RULES` environment variable to configure global processing rules, for example:

```yaml
env:
  - name: DD_LOGS_CONFIG_PROCESSING_RULES
    value: '[{"type": "mask_sequences", "name": "mask_user_email", "replace_placeholder": "MASKED_EMAIL", "pattern" : "\\w+@datadoghq.com"}]'
```

{{% /tab %}}
{{< /tabs >}}
All the logs collected by the Datadog Agent are impacted by the global processing rules.

**Note**: The Datadog Agent does not start the log collector if there is a format issue in the global processing rules. Run the Agent's [status subcommand][5] to troubleshoot any issues.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits is a trademark of Datadog, Inc.

[1]: https://golang.org/pkg/regexp/syntax/
[2]: /agent/faq/commonly-used-log-processing-rules
[3]: https://docs.datadoghq.com/logs/explorer/#overview
[4]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[5]: /agent/guide/agent-commands/#agent-information
