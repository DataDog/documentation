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
  text: Discover how to process your logs
- link: "logs/processing/parsing"
  tag: "Documentation"
  text: Learn more about parsing
- link: "logs/live_tail"
  tag: "Documentation"
  text: Datadog live tail functionality
- link: "logs/explorer"
  tag: "Documentation"
  text: See how to explore your logs
- link: "logs/logging_without_limits"
  tag: "Documentation"
  text: Logging without limit
---

## Getting started with the Agent

Log collection requires an Agent version >= 6.0. Older versions of the Agent do not include the `Log collection` interface that is used for log collection.

If you are not using the Agent already, follow [the Agent installation instructions][1] to install it.

Collecting logs is **disabled** by default in the Datadog Agent, you need to enable it in `datadog.yaml`:

```
logs_enabled: true
```

The Datadog Agent sends its logs to Datadog over TLS-encrypted TCP. This requires outbound communication over port `10516`.

## Enabling log collection from integrations

To start collecting logs for a given integration, uncomment the logs section in that integration's yaml file and configure it for your environment.

<div class="alert alert-warning">
Not all integrations include out of the box log configurations.  <a href="https://docs.datadoghq.com/integrations/#cat-log-collection">Consult the current list of supported integrations available</a>.
</div>

If an integration does not support logs by default, use the custom file configuration below.

## Custom log collection

Datadog Agent v6 can collect logs and forward them to Datadog from files, the network (TCP or UDP), journald, and Windows channels:

1. Create a new folder in the `conf.d/` directory at the root of your [Agent's configuration directory][9] named after your log source.
2. Create a new `conf.yaml` file in this new folder.
3. Add a custom log collection configuration group with the parameters below.
4. [Restart your Agent][10] to take into account this new configuration. 
5. [Run the Agent's `status` subcommand][11] to check if your custom configuration is correct.

Below are some example of custom log collection setup:

{{< tabs >}}
{{% tab "Tail existing files" %}}

To gather logs from your `<APP_NAME>` application stored in `<PATH_LOG_FILE>/<LOG_FILE_NAME>.log` create a `<APP_NAME>.d/conf.yaml` file at the root of your [Agent's configuration directory][9] with the following content:

```
logs:
  - type: file
    path: <PATH_LOG_FILE>/<LOG_FILE_NAME>.log
    service: <APP_NAME>
    source: custom
```

**Note**: If you are using the Windows 6 Agent and trailing files for logs, make sure that those files have UTF8 encoding.

[9]: /agent/faq/agent-configuration-files/

{{% /tab %}}

{{% tab "Stream logs from TCP/UDP" %}}

To gather logs from your `<APP_NAME>` application that does not log to a file, but instead forwards its logs via TCP over port **10518**, create a ``<APP_NAME>.d/conf.yaml` file at the root of your [Agent's configuration directory][9] with the following content:

```
logs:
  - type: tcp
    port: 10518
    service: <APP_NAME>
    source: custom
```

**Note**: The Agent supports raw string, JSON, and Syslog formatted logs. If you are sending logs in batch, use linebreak characters to separate your logs.

[9]: /agent/faq/agent-configuration-files/

{{% /tab %}}
{{% tab "Stream logs from journald" %}}

To gather logs from journald, create a `journald.d/conf.yaml` file at the root of your [Agent's configuration directory][9] with the following content:

```yaml
logs:
  - type: journald
    path: /var/log/journal/
```

[9]: /agent/faq/agent-configuration-files/

{{% /tab %}}
{{% tab "Windows Events" %}}

Add the channels (from which you want to send Windows Events as log to Datadog) to the `conf.d/win32_event_log.d/conf.yaml` file manually, or via the Datadog Agent Manager. 

To see the channel list run the following command in a PowerShell:

```
Get-WinEvent -ListLog *
```

To see the most active channels run the following command in a PowerShell:

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

Edit the `<CHANNEL_X>` parameters with the Windows Channel name you want to collect events from. 
Set the corresponding `source` parameter to the same channel name to benefit from the [integration automatic processing Pipeline setup][2].

Finally, [Restart the agent][1]

[1]: /agent/basic_agent_usage/windows/
[2]: /logs/processing/pipelines/#integration-pipelines

{{% /tab %}}
{{< /tabs >}}

List of all available parameters for log collection: 

| Parameter        | Presence  | Description                                                                                                                                                                                                                                                                                                                   |
| ------           | -------   | ------                                                                                                                                                                                                                                                                                                                        |
| `type`           | mandatory | Type of log input source. Valid values are: **tcp**, **udp**, **file**, **windows_event**, **docker**, or **journald**                                                                                                                                                                                                        |
| `port`           | mandatory | If `type` is **tcp** or **udp**, port to listen log from.                                                                                                                                                                                                                                                                     |
| `path`           | mandatory | If `type` is **file** or **journald**, path of the file to gather log from.                                                                                                                                                                                                                                                   |
| `channel_path`   | mandatory | If `type` is **windows_event**, list of windows event channels to collect log from.                                                                                                                                                                                                                                           |
| `service`        | mandatory | Name of the service owning the log. If you instrumented your service with [Datadog APM][12], this must be the same service name.                                                                                                                                                                                              |
| `source`         | mandatory | Attribute that defines which integration is sending the logs. If the logs do not come from an existing integration, then this field may include a custom source name. However, it is recommend that you match this value to the namespace of any related [custom metrics][2] you are collecting, e.g, `myapp` from `myapp.request.count`) |
| `include_units`  | optional  | If `type` is **journald**, list of specific journald units to include.                                                                                                                                                                                                                                                        |
| `exclude_units`  | optional  | If `type` is **journald**, list of specific journald units to exclude.                                                                                                                                                                                                                                                        |
| `sourcecategory` | optional  | Multiple value attribute. Can be used to refine the source attribute. Example: `source:mongodb, sourcecategory:db_slow_logs`                                                                                                                                                                                                  |
| `tags`           | optional  | Add tags to each log collected. [learn more about tagging][13].                                                                                                                                                                                                                                                               |

## Advanced log collection functions
### Filter logs

All logs are not equal and you may want to send only a specific subset of logs to Datadog.
To achieve this use the `log_processing_rules` parameter in your configuration file with the **exclude_at_match** or **include_at_match** `type`.

{{< tabs >}}
{{% tab "exclude_at_match" %}}

| Parameter          | Description                                                                             |
| --------           | ---------                                                                               |
| `exclude_at_match` | If the specified pattern is contained in the message the log is excluded and not sent to Datadog |

Example: Filtering out logs that contain a Datadog email

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

| Parameter          | Description                                                            |
| --------           | ---------                                                              |
| `include_at_match` | Only logs with a message that includes the specified pattern are sent to Datadog. |

Example: Sending only logs that contain a Datadog email

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

**Note**: If you set up multiple processing rules, they will be applied sequentially. Each rule will be applied on the result of the previous one.

### Scrub sensitive data in your logs

If your logs contain sensitive information that you wish to redact, configure the Datadog Agent to scrub sensitive sequences by using the `log_processing_rules` parameter in your configuration file with the **mask_sequences** `type`.

This replaces all matched groups with `replace_placeholder` parameter value.
Example: Redact credit card numbers

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

If your logs are not sent in JSON and you want to aggregate several lines into one single entry, configure the Datadog Agent to detect a new log using a specific regex pattern instead of having one log per line.

This is accomplished by using the `log_processing_rules` parameter in your configuration file with the **multi_line** `type`.

This aggregates all lines into one single entry until the given pattern is detected again. This is especially useful for database logs and stack traces.
Example: Every java log line starts with a timestamp with `yyyy-dd-mm` format. The below lines including a stack trace would be sent as two logs.

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
| :---                     | :----                                      |
| 14:20:15                 | `\d{2}:\d{2}:\d{2}`                        |
| 11/10/2014               | `\d{2}\/\d{2}\/\d{4}`                      |
| Thu Jun 16 08:29:03 2016 | `\w{3}\s+\w{3}\s+\d{2}\s\d{2}:\d{2}:\d{2}` |
| 20180228                 | `\d{8}`                                    |

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

**Note**: The Agent requires read and execute permissions (5) on the directory to be able to list all the available files in it.

### Using a Proxy for Logs

Logs make use of a different set of proxy settings than other data types forwarded by the Datadog Agent. This is due to the fact that logs are transported over TCP/SSL, while other features submit data via HTTPS.

{{< tabs >}}
{{% tab "TCP Proxy" %}}

If you use a proxy for TCP transmission, configure the Datadog Agent to send logs to your proxy through TCP thanks to the following parameters in `datadog.yaml`:

```
logs_config:
  logs_dd_url: <PROXY_ENDPOINT>:<PROXY_PORT>
  logs_no_ssl: true
```

Those are also available as environment variables:

* `DD_LOGS_CONFIG_LOGS_DD_URL`
* `DD_LOGS_CONFIG_LOGS_NO_SSL`

**Important Note**: The parameter `logs_no_ssl` is needed to make the Agent ignore the discrepancy between the hostname on the SSL certificate (`agent-intake.logs.datadoghq.com`) and your proxy hostname. We however strongly advise to use a SSL encrypted connection between your proxy and our intake.

* Then configure your proxy to listen on `<PROXY_PORT>` and forward the received logs to `agent-intake.logs.datadoghq.com` on port 10516 and activate SSL encryption.

* Use the [public key for TLS encryption][14] for the SSL encryption. On some systems, the full certificate chain may be required. If so, use [this public key][15] instead.

{{% /tab %}}
{{% tab "SOCK5 Proxy" %}}

With Datadog Agent >= 6.4.1, send your logs to your Datadog account via a SOCKS5 proxy server. To do so, use the following settings in your `datadog.yaml` configuration file:

```
logs_config:
  socks5_proxy_address: <MY_SOCKS5_PROXY_URL>:<MY_SOCKS5_PROXY_PORT>
```

{{% /tab %}}
{{< /tabs >}}


[Refer to the Agent proxy documentation page to learn how to forward your metrics with a proxy][8].

## How to get the most of your application logs

When logging stack traces, there are specific attributes that have a dedicated UI display within your Datadog application such as the logger name, the current thread, the error type, and of course the stack trace itself.

{{< img src="logs/log_collection/stack_trace.png" style="width:80%;" alt="Stack trace" responsive="true" >}}

To enable those functionalities use the following attribute names:

* `logger.name`: Name of the logger
* `logger.thread_name`: Name of the current thread
* `error.stack`: Actual stack trace
* `error.message`: Error message contained in the stack trace
* `error.kind`: The type or "kind" of an error (i.e "Exception", "OSError", ...)

**Note**: By default, integration Pipelines attempt to remap default logging library parameters to those specific attributes and parse stack traces or traceback to automatically extract the `error.message` and `error.kind`.

## Send your application logs in JSON

For integration frameworks, we provide guidelines on how to log in JSON into a file. JSON-formatted logging helps handle multiline application logs, and is automatically parsed by Datadog.

##### The Advantage of Collecting JSON-formatted logs

Datadog automatically parses JSON-formatted logs. For this reason, if you have control over the log format you send to Datadog, we encourage you to format these logs as JSON to avoid the need for custom parsing rules.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent
[2]: /developers/metrics/custom_metrics/
[3]: /agent/faq/agent-commands/#start-stop-restart-the-agent
[4]: /logs/processing/#log-date-remapper
[5]: /logs/explorer/search/#logstream
[6]: /logs/explorer/search/
[7]: /logs/processing/#log-status-remapper
[8]: /agent/proxy
[9]: /agent/faq/agent-configuration-files/
[10]: /agent/faq/agent-commands/#start-stop-and-restart-the-agent
[11]: /agent/faq/agent-commands/#agent-status-and-information
[12]: /tracing
[13]: /tagging
[14]: /crt/intake.logs.datadoghq.com.crt
[25]: /crt/FULL_intake.logs.datadoghq.com.crt
