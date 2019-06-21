---
title: Agent Advanced log collection
kind: documentation
description: Use the Datadog Agent to collect your logs and send them to Datadog
further_reading:
- link: "logs/processing"
  tag: "Documentation"
  text: "Discover how to process your logs"
- link: "logs/processing/parsing"
  tag: "Documentation"
  text: "Learn more about parsing"
- link: "logs/live_tail"
  tag: "Documentation"
  text: "Datadog live tail functionality"
- link: "logs/explorer"
  tag: "Documentation"
  text: "See how to explore your logs"
- link: "logs/logging_without_limits"
  tag: "Documentation"
  text: "Logging without limit"
---

Apply a Log processing rule to a specific Log collection configuration block in order to:

* [Filter logs](#filter-logs)
* [Scrub sensitive data in your logs](#scrub-sensitive-data-in-your-logs)
* [Proceed to multi-line aggregation](#multi-line-aggregation)
* [Tail multiple directories or whole directories by using wildcards](#tail-multiple-directories-or-whole-directories-by-using-wildcards)

**Note**: If you set up multiple processing rules, they are applied sequentially and each rule is applied on the result of the previous one.

To apply a processing rule to all logs collected by a Datadog Agent, see the [Global processing rules](#global-processing-rules) section.

## Filter logs

To send only a specific subset of logs to Datadog use the `log_processing_rules` parameter in your configuration file with the **exclude_at_match** or **include_at_match** `type`.

{{< tabs >}}
{{% tab "exclude_at_match" %}}

| Parameter          | Description                                                                                        |
|--------------------|----------------------------------------------------------------------------------------------------|
| `exclude_at_match` | If the specified pattern is contained in the message, the log is excluded and not sent to Datadog. |

For example, filtering out logs that contain a Datadog email address:

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
{{% tab "include_at_match" %}}

| Parameter          | Description                                                                       |
|--------------------|-----------------------------------------------------------------------------------|
| `include_at_match` | Only logs with a message that includes the specified pattern are sent to Datadog. |

For example, sending only logs that contain a Datadog email address:

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

{{% /tab %}}
{{< /tabs >}}

## Scrub sensitive data in your logs

If your logs contain sensitive information that you want to redact, configure the Datadog Agent to scrub sensitive sequences by using the `log_processing_rules` parameter in your configuration file with the **mask_sequences** `type`.

This replaces all matched groups with `replace_placeholder` parameter value.

For example, redact credit card numbers:

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

## Multi-line aggregation

If your logs are not sent in JSON and you want to aggregate several lines into one single entry, configure the Datadog Agent to detect a new log using a specific regex pattern instead of having one log per line. This is accomplished by using the `log_processing_rules` parameter in your configuration file with the **multi_line** `type` which aggregates all lines into one single entry until the given pattern is detected again.

For example, every Java log line starts with a timestamp in `yyyy-dd-mm` format. These lines include a stack trace that can be sent as two logs:

```
2018-01-03T09:24:24.983Z UTC Exception in thread "main" java.lang.NullPointerException
        at com.example.myproject.Book.getTitle(Book.java:16)
        at com.example.myproject.Author.getBookTitles(Author.java:25)
        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
2018-01-03T09:26:24.365Z UTC starting upload of /my/file.gz
```


{{< tabs >}}
{{% tab "Configuration file" %}}

To achieve this, you need to use the following `log_processing_rules`:

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

In a docker environment use the `com.datadoghq.ad.logs` labels on your container to make sure that the log is properly collected, for example:

```
 labels:
    com.datadoghq.ad.logs: '[{"source": "postgresql", "service": "database", "log_processing_rules": [{"type": "multi_line", "name": "log_start_with_date", "pattern" : "\\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])"}]}]'
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

In a Kubernetes environment use the `ad.datadoghq.com` pod annotations on your pods to make sure that the log is properly collected, for example:

```
apiVersion: extensions/v1beta1
kind: ReplicaSet
metadata:
  name: postgres
spec:
  template:
    metadata:
      annotations:
        ad.datadoghq.com/postgres.logs: '[{"source": "postgresql", "service": "database", "log_processing_rules": [{"type": "multi_line", "name": "log_start_with_date", "pattern" : "\\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])"}]}]'
      labels:
        app: database
      name: postgres
    spec:
      containers:
        - name: postgres
          image: postgres:latest
```

{{% /tab %}}
{{< /tabs >}}

More examples:

| **Raw string**           | **Pattern**                                |
|--------------------------|--------------------------------------------|
| 14:20:15                 | `\d{2}:\d{2}:\d{2}`                        |
| 11/10/2014               | `\d{2}\/\d{2}\/\d{4}`                      |
| Thu Jun 16 08:29:03 2016 | `\w{3}\s+\w{3}\s+\d{2}\s\d{2}:\d{2}:\d{2}` |
| 20180228                 | `\d{8}`                                    |

**Note**: Regex patterns for multi-line logs must start at the **beginning** of a log. Patterns cannot be matched mid-line.

## Tail multiple directories or whole directories by using wildcards

If your log files are labeled by date or all stored in the same directory, configure your Datadog Agent to monitor them all and automatically detect new ones by using wildcards in the `path` attribute.

* Using `path: /var/log/myapp/*.log`:
  * Matches all `.log` file contained in the `/var/log/myapp/` directory.
  * Doesn't match `/var/log/myapp/myapp.conf`.

* Using `path: /var/log/myapp/*/*.log`:
  * Matches `/var/log/myapp/log/myfile.log`.
  * Matches `/var/log/myapp/errorLog/myerrorfile.log`
  * Doesn't match `/var/log/myapp/mylogfile.log`.

Configuration example:

```yaml
logs:
 - type: file
   path: /var/log/myapp/*.log
   service: mywebapp
   source: go
```

**Note**: The Agent requires read and execute permissions on a directory to list all the available files in it.

## Global processing rules

Since Datadog Agent v6.10, the `exclude_at_match`, `include_at_match`, and `mask_sequences` processing rules can be defined globally in the `datadog.yaml` main configuration file or through an environment variable:

{{< tabs >}}
{{% tab "Configuration files" %}}

In the `datadog.yaml` file:

```
logs_config:
  processing_rules:
     - type: exclude_at_match
       name: exclude_healthcheck
       pattern: healtcheck
     - type: mask_sequences
       name: mask_user_email
       pattern: \w+@datadoghq.com
       replace_placeholder: "MASKED_EMAIL"
```
{{% /tab %}}
{{% tab "Environment Variable" %}}

The `DD_LOGS_CONFIG_PROCESSING_RULES` can be used to configure global processing rules:

```
DD_LOGS_CONFIG_PROCESSING_RULES='[{"type": "mask_sequences", "name": "mask_user_email", "replace_placeholder": "MASKED_EMAIL", "pattern" : "\\w+@datadoghq.com"}]'
```

{{% /tab %}}
{{< /tabs >}}
All the logs collected by the Datadog Agent are impacted by those processing rules.

**Note**: The Datadog Agent does not start the log collector if there is a format issue in the global processing rules. Run the [Status Command][1] to troubleshoot any issues.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.datadoghq.com/agent/guide/agent-commands/?tab=agentv6#agent-information
