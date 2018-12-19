---
title: Log Collection & Integrations
kind: Documentation
description: "Configure your Datadog Agent to gather logs from your host, containers, and services."
aliases:
  - /logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers
  - /logs/languages
  - /integrations/windows_event_log/
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

## Getting started with the Agent

Log collection requires an Agent version >= 6.0. Older versions of the Agent do not include the `Log collection` interface.

If you are not using the Agent already, follow [the Agent installation instructions][1].

Collecting logs is **disabled** by default in the Datadog Agent, you need to enable it in `datadog.yaml`:

```
logs_enabled: true
```

The Datadog Agent sends its logs to Datadog over TLS-encrypted TCP. This requires outbound communication over port `10516`.

## Enabling log collection from integrations

To start collecting logs for a given integration, uncomment the logs section in that integration's yaml file and configure it for your environment.

<div class="alert alert-warning">
Not all integrations include out of the box log configurations.  <a href="/integrations/#cat-log-collection">Consult the current list of supported integrations available</a>.
</div>

If an integration does not support logs by default, use the custom file configuration below.

## Custom log collection

Datadog Agent v6 can collect logs and forward them to Datadog from files, the network (TCP or UDP), journald, and Windows channels:

1. Create a new folder in the `conf.d/` directory at the root of your [Agent's configuration directory][2] named after your log source.
2. Create a new `conf.yaml` file in this new folder.
3. Add a custom log collection configuration group with the parameters below.
4. [Restart your Agent][3] to take into account this new configuration.
5. [Run the Agent's status subcommand][4] to check if your custom configuration is correct.

Below are examples of custom log collection setup:

{{< tabs >}}
{{% tab "Tail existing files" %}}

To gather logs from your `<APP_NAME>` application stored in `<PATH_LOG_FILE>/<LOG_FILE_NAME>.log` create a `<APP_NAME>.d/conf.yaml` file at the root of your [Agent's configuration directory][1] with the following content:

```
logs:
  - type: file
    path: <PATH_LOG_FILE>/<LOG_FILE_NAME>.log
    service: <APP_NAME>
    source: custom
```

**Note**: If you are using Windows with Agent v6 and trailing files for logs, make sure that those files have UTF8 encoding.


[1]: /agent/faq/agent-configuration-files
{{% /tab %}}

{{% tab "Stream logs from TCP/UDP" %}}

To gather logs from your `<APP_NAME>` application that forwards its logs via TCP over port **10518**, create a `<APP_NAME>.d/conf.yaml` file at the root of your [Agent's configuration directory][1] with the following content:

```
logs:
  - type: tcp
    port: 10518
    service: <APP_NAME>
    source: custom
```

If you are using Serilog, `Serilog.Sinks.Network` is an option for connecting via UDP.

**Note**: The Agent supports raw string, JSON, and Syslog formatted logs. If you are sending logs in batch, use line break characters to separate your logs.


[1]: /agent/faq/agent-configuration-files
{{% /tab %}}
{{% tab "Stream logs from journald" %}}

To gather logs from journald, create a `journald.d/conf.yaml` file at the root of your [Agent's configuration directory][1] with the following content:

```yaml
logs:
  - type: journald
    path: /var/log/journal/
```


[1]: /agent/faq/agent-configuration-files
{{% /tab %}}
{{% tab "Windows Events" %}}

Add the channels (from which you want to send Windows Events as log to Datadog) to the `conf.d/win32_event_log.d/conf.yaml` file manually, or via the Datadog Agent Manager.

To see the channel list run the following command in a PowerShell:

```
Get-WinEvent -ListLog *
```

To see the most active channels, run the following command in a PowerShell:

```
Get-WinEvent -ListLog * | sort RecordCount -Descending
```

Then add the channels in your `win32_event_log.d/conf.yaml` configuration file:

```
logs:
  - type: windows_event
    channel_path: <CHANNEL_1>
    source: <CHANNEL_1>
    service: myservice
    sourcecategory: windowsevent

  - type: windows_event
    channel_path: <CHANNEL_2>
    source: <CHANNEL_2>
    service: myservice
    sourcecategory: windowsevent
```

Edit the `<CHANNEL_X>` parameters with the Windows channel name you want to collect events from.
Set the corresponding `source` parameter to the same channel name to benefit from the [integration automatic processing pipeline setup][1].

Finally, [restart the Agent][2].


[1]: /logs/processing/pipelines/#integration-pipelines
[2]: /agent/basic_agent_usage/windows
{{% /tab %}}
{{< /tabs >}}

List of all available parameters for log collection:

| Parameter        | Required | Description                                                                                                                                                                                                                                                                                                                                         |
|------------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`           | Yes      | Type of log input source. Valid values are: **tcp**, **udp**, **file**, **windows_event**, **docker**, or **journald**.                                                                                                                                                                                                                             |
| `port`           | Yes      | If `type` is **tcp** or **udp**, port to listen log from.                                                                                                                                                                                                                                                                                           |
| `path`           | Yes      | If `type` is **file** or **journald**, path of the file to gather logs from.                                                                                                                                                                                                                                                                        |
| `channel_path`   | Yes      | If `type` is **windows_event**, list of windows event channels to collect log from.                                                                                                                                                                                                                                                                 |
| `service`        | Yes      | Name of the service owning the log. If you instrumented your service with [Datadog APM][5], this must be the same service name.                                                                                                                                                                                                                    |
| `source`         | Yes      | Attribute that defines which integration is sending the logs. If the logs do not come from an existing integration, then this field may include a custom source name. However, it is recommended that you match this value to the namespace of any related [custom metrics][6] you are collecting, for example: `myapp` from `myapp.request.count`. |
| `include_units`  | No       | If `type` is **journald**, list of specific journald units to include.                                                                                                                                                                                                                                                                              |
| `exclude_units`  | No       | If `type` is **journald**, list of specific journald units to exclude.                                                                                                                                                                                                                                                                              |
| `sourcecategory` | No       | A multiple value attribute used to refine the source attribute, for example: `source:mongodb, sourcecategory:db_slow_logs`.                                                                                                                                                                                                                         |
| `tags`           | No       | Add tags to each log collected ([learn more about tagging][7]).                                                                                                                                                                                                                                                                                    |

## Advanced log collection functions
### Filter logs

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

**Note**: If you set up multiple processing rules, they are applied sequentially. Each rule is applied on the result of the previous one.

### Scrub sensitive data in your logs

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

### Multi-line aggregation

If your logs are not sent in JSON and you want to aggregate several lines into one single entry, configure the Datadog Agent to detect a new log using a specific regex pattern instead of having one log per line. This is accomplished by using the `log_processing_rules` parameter in your configuration file with the **multi_line** `type` which aggregates all lines into one single entry until the given pattern is detected again.

For example, every Java log line starts with a timestamp in `yyyy-dd-mm` format. These lines include a stack trace that can be sent as two logs:

```
2018-01-03T09:24:24.983Z UTC Exception in thread "main" java.lang.NullPointerException
        at com.example.myproject.Book.getTitle(Book.java:16)
        at com.example.myproject.Author.getBookTitles(Author.java:25)
        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
2018-01-03T09:26:24.365Z UTC starting upload of /my/file.gz
```

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

More examples:

| **Raw string**           | **Pattern**                                |
|--------------------------|--------------------------------------------|
| 14:20:15                 | `\d{2}:\d{2}:\d{2}`                        |
| 11/10/2014               | `\d{2}\/\d{2}\/\d{4}`                      |
| Thu Jun 16 08:29:03 2016 | `\w{3}\s+\w{3}\s+\d{2}\s\d{2}:\d{2}:\d{2}` |
| 20180228                 | `\d{8}`                                    |

**Note**: Regex patterns for multi-line logs must start at the **beginning** of a log. Patterns cannot be matched mid-line.

### Tail multiple directories or whole directories by using wildcards

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

### Using a Proxy for Logs

[Refer to the Agent proxy documentation][8] to learn how to forward your Logs with a proxy.

## How to get the most of your application logs

When logging stack traces, there are specific attributes that have a dedicated UI display within your Datadog application such as the logger name, the current thread, the error type, and the stack trace itself.

{{< img src="logs/log_collection/stack_trace.png" style="width:80%;" alt="Stack trace" responsive="true" >}}

To enable these functionalities use the following attribute names:

| Attribute            | Description                                                      |
|----------------------|------------------------------------------------------------------|
| `logger.name`        | Name of the logger                                               |
| `logger.thread_name` | Name of the current thread                                       |
| `error.stack`        | Actual stack trace                                               |
| `error.message`      | Error message contained in the stack trace                       |
| `error.kind`         | The type or "kind" of an error (i.e "Exception", "OSError", ...) |

**Note**: By default, integration Pipelines attempt to remap default logging library parameters to those specific attributes and parse stack traces or traceback to automatically extract the `error.message` and `error.kind`.

## Send your application logs in JSON

For integration frameworks, Datadog provides guidelines on how to log JSON into a file. JSON-formatted logging helps handle multi-line application logs, and is automatically parsed by Datadog.

##### The Advantage of Collecting JSON-formatted logs

Datadog automatically parses JSON-formatted logs. For this reason, if you have control over the log format you send to Datadog, it is recommended to format these logs as JSON to avoid the need for custom parsing rules.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /agent
[2]: /agent/faq/agent-configuration-files
[3]: /agent/faq/agent-commands/#start-stop-and-restart-the-agent
[4]: /agent/faq/agent-commands/#agent-status-and-information
[5]: /tracing
[6]: /developers/metrics/custom_metrics
[7]: /tagging
[8]: /agent/proxy/#proxy-for-logs
