---
title: Host Agent Log collection
kind: documentation
description: Use the Datadog Agent to collect your logs and send them to Datadog
further_reading:
- link: "agent/logs/advanced_log_collection/#filter-logs"
  tag: "Documentation"
  text: "Filter logs sent to Datadog"
- link: "agent/logs/advanced_log_collection/#scrub-sensitive-data-from-your-logs"
  tag: "Documentation"
  text: "Scrub sensitive data from your logs"
- link: "agent/logs/advanced_log_collection/#multi-line-aggregation"
  tag: "Documentation"
  text: "Multi-line log aggregation"
- link: "agent/logs/advanced_log_collection/#tail-directories-by-using-wildcards"
  tag: "Documentation"
  text: "Tail directories by using wildcards"
- link: "agent/logs/advanced_log_collection/#global-processing-rules"
  tag: "Documentation"
  text: "Global processing rules"
---

Log collection requires the Datadog Agent v6.0+. Older versions of the Agent do not include the `log collection` interface. If you are not using the Agent already, follow the [Agent installation instructions][1].

## Activate log collection

Collecting logs is **disabled** by default in the Datadog Agent. To learn how to enable it with the host Agent, see the instructions below. If you are running the Agent in a Kubernetes or Docker environment, see the dedicated [Kubernetes Log Collection][2] or [Docker Log Collection][3] documentation.

To enable log collection with an Agent running on your host, update the Agent's [main configuration file][4] (`datadog.yaml`) with:

```yaml
logs_enabled: true
```

Starting with Agent v6.19+/v7.19+, HTTPS transport is the default transport used. For more details on how to enforce HTTPS/TCP transport, refer to the [Agent transport documentation][5].

To send logs with environment variables, configure the following:

* `DD_LOGS_ENABLED=true`

After activating log collection, the Agent is ready to forward logs to Datadog. Next, configure the Agent on where to collect logs from.

## Enabling log collection from integrations

To collect logs for a given integration, uncomment the logs section in that integration's `conf.yaml` file and configure it for your environment. If you are running the Agent in a Kubernetes or Docker environment, see the dedicated [Kubernetes Log Collection][6] or [Docker Log Collection][7] documentation.

<div class="alert alert-warning">
Consult the <a href="/integrations/#cat-log-collection">list of supported integrations</a>  that include out of the box log configurations.
</div>

## Custom log collection

Datadog Agent v6 can collect logs and forward them to Datadog from files, the network (TCP or UDP), journald, and Windows channels:

1. Create a new `<CUSTOM_LOG_SOURCE>.d/` folder in the `conf.d/` directory at the root of your [Agent's configuration directory][4].
2. Create a new `conf.yaml` file in this new folder.
3. Add a custom log collection configuration group with the parameters below.
4. [Restart your Agent][8] to take into account this new configuration.
5. Run the [Agent's status subcommand][9] and look for `<CUSTOM_LOG_SOURCE>` under the Checks section.

Below are examples of custom log collection setup:

{{< tabs >}}
{{% tab "Tail files" %}}

To gather logs from your `<APP_NAME>` application stored in `<PATH_LOG_FILE>/<LOG_FILE_NAME>.log` create a `<APP_NAME>.d/conf.yaml` file at the root of your [Agent's configuration directory][1] with the following content:

```yaml
logs:
  - type: file
    path: "<PATH_LOG_FILE>/<LOG_FILE_NAME>.log"
    service: "<APP_NAME>"
    source: "<SOURCE>"
```

[1]: /agent/guide/agent-configuration-files/
{{% /tab %}}

{{% tab "TCP/UDP" %}}

To gather logs from your `<APP_NAME>` application that forwards its logs with TCP over port **10518**, create a `<APP_NAME>.d/conf.yaml` file at the root of your [Agent's configuration directory][1] with the following content:

```yaml
logs:
  - type: tcp
    port: 10518
    service: "<APP_NAME>"
    source: "<CUSTOM_SOURCE>"
```

If you are using Serilog, `Serilog.Sinks.Network` is an option for connecting with UDP.

**Note**: The Agent supports raw string, JSON, and Syslog formatted logs. If you are sending logs in batch, use line break characters to separate your logs.

[1]: /agent/guide/agent-configuration-files/
{{% /tab %}}
{{% tab "journald" %}}

To gather logs from journald, create a `journald.d/conf.yaml` file at the root of your [Agent's configuration directory][1] with the following content:

```yaml
logs:
  - type: journald
    path: /var/log/journal/
```

Refer to the [journald integration][2] documentation for more details regarding the setup for containerized environments and units filtering.

[1]: /agent/guide/agent-configuration-files/
[2]: /integrations/journald/
{{% /tab %}}
{{% tab "Windows Events" %}}

To send Windows events as logs to Datadog, add the channels to `conf.d/win32_event_log.d/conf.yaml` manually or use the Datadog Agent Manager.

To see your channel list, run the following command in a PowerShell:

```text
Get-WinEvent -ListLog *
```

To see the most active channels, run the following command in a PowerShell:

```text
Get-WinEvent -ListLog * | sort RecordCount -Descending
```

Then add the channels to your `win32_event_log.d/conf.yaml` configuration file:

```yaml
logs:
  - type: windows_event
    channel_path: "<CHANNEL_1>"
    source: "<CHANNEL_1>"
    service: "<SERVICE>"
    sourcecategory: windowsevent

  - type: windows_event
    channel_path: "<CHANNEL_2>"
    source: "<CHANNEL_2>"
    service: "<SERVICE>"
    sourcecategory: windowsevent
```

Edit the `<CHANNEL_X>` parameters with the Windows channel name you want to collect events from.
Set the corresponding `source` parameter to the same channel name to benefit from the [integration automatic processing pipeline setup][1].

Finally, [restart the Agent][2].

[1]: /logs/processing/pipelines/#integration-pipelines
[2]: /agent/basic_agent_usage/windows/
{{% /tab %}}
{{< /tabs >}}

List of all available parameters for log collection:

| Parameter        | Required | Description                                                                                                                                                                                                                                                                                                                                              |
|------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`           | Yes      | The type of log input source. Valid values are: `tcp`, `udp`, `file`, `windows_event`, `docker`, or `journald`.                                                                                                                                                                                                                                          |
| `port`           | Yes      | If `type` is **tcp** or **udp**, set the port for listening to logs.                                                                                                                                                                                                                                                                                     |
| `path`           | Yes      | If `type` is **file** or **journald**, set the file path for gathering logs.                                                                                                                                                                                                                                                                             |
| `channel_path`   | Yes      | If `type` is **windows_event**, list the Windows event channels for collecting logs.                                                                                                                                                                                                                                                                     |
| `service`        | Yes      | The name of the service owning the log. If you instrumented your service with [Datadog APM][9], this must be the same service name. Check the [unified service tagging][10] instructions when configuring `service` across multiple data types.                                                                                                          |
| `source`         | Yes      | The attribute that defines which integration is sending the logs. If the logs do not come from an existing integration, then this field may include a custom source name. However, it is recommended that you match this value to the namespace of any related [custom metrics][11] you are collecting, for example: `myapp` from `myapp.request.count`. |
| `include_units`  | No       | If `type` is **journald**, list of the specific journald units to include.                                                                                                                                                                                                                                                                               |
| `exclude_paths`  | No       | If `type` is **file**, and `path` contains a wildcard character, list the matching file or files to exclude from log collection. This is available for Agent version >= 6.18.                                                                                                                                                                            |
| `exclude_units`  | No       | If `type` is **journald**, list of the specific journald units to exclude.                                                                                                                                                                                                                                                                               |
| `sourcecategory` | No       | The attribute used to define the category a source attribute belongs to, for example: `source:postgres, sourcecategory:database` or `source: apache, sourcecategory: http_web_access`.                                                                                                                                                                                                                              |
| `start_position` | No       | If `type` is **file**, set the position for the Agent to start reading the file. Valid values are `beginning` and `end` (default: `end`). If `path` contains a wildcard character, `beginning` is not supported. _Added in Agent v6.19/v7.19_                                                                                                            |
| `encoding`       | No       | If `type` is **file**, set the encoding for the Agent to read the file. Set it to `utf-16-le` for UTF16 little-endian and `utf-16-be` for UTF16 big-endian. Any other value will be ignored and the Agent will read the file as UTF8.  _Added in Agent v6.23/v7.23_                                                                                      |
| `tags`           | No       | A list of tags added to each log collected ([learn more about tagging][11]).                                                                                                                                                                                                                                                                             |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: /agent/kubernetes/log/
[3]: /agent/docker/log/
[4]: /agent/guide/agent-configuration-files/
[5]: /agent/logs/log_transport/
[6]: /agent/kubernetes/log/#autodiscovery
[7]: /agent/docker/log/#log-integrations
[8]: /agent/guide/agent-commands/#agent-status-and-information
[9]: /tracing/
[10]: /getting_started/tagging/unified_service_tagging
[11]: /getting_started/tagging/
