---
title: Agent Log collection
kind: Documentation
description: "Configure your Datadog Agent to gather logs from your host, containers, and services."
aliases:
  - /logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers
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

Log collection requires an Agent version >= 6.0. Older versions of the Agent do not include the `Log collection` interface.

If you are not using the Agent already, follow [the Agent installation instructions][1].

Collecting logs is **disabled** by default in the Datadog Agent, you need to enable it in `datadog.yaml`:

```
logs_enabled: true
```

The Datadog Agent sends its logs to Datadog over TLS-encrypted TCP. This requires outbound communication over port `10516`.

## Enabling log collection from integrations

To start collecting logs for a given integration, uncomment the logs section in that integration's yaml file and configure it for your environment.

<div class="alert alert-info">
<a href="/integrations/#cat-log-collection">Consult the list of integrations that support log collection.</a>.
</div>

If an integration does not support log collection by default, use the custom file configuration below.

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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /agent
[2]: /agent/faq/agent-configuration-files
[3]: /agent/faq/agent-commands/#start-stop-and-restart-the-agent
[4]: /agent/faq/agent-commands/#agent-status-and-information
[5]: /tracing
[6]: /developers/metrics/custom_metrics
[7]: /tagging
