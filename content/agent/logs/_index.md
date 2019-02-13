---
title: Agent Log collection
kind: Documentation
description: "Configure your Datadog Agent to gather logs from your host, containers, and services."
aliases:
  - /logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers
  - /integrations/windows_event_log/
further_reading:
- link: "agent/logs/advanced_log_collection"
  tag: "Documentation"
  text: "Advanced log collection"
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

<div class="alert alert-warning">
Log collection requires an Agent version >= 6.0. If you are not using the Agent already, follow <a href="https://app.datadoghq.com/account/settings#agent">the Agent installation instructions</a>.
</div>

To start collecting logs:

1. **Enable Log collection** for your Datadog Agent in [the main `datadog.yaml` configuration file][1]:

    ```yaml
    logs_enabled: true
    ```

2. **Activate log collection [for your integrations][2]**, or **Configure a [custom log collection configuration file](#custom-log-collection).**
3. [Restart your Datadog Agent][3]

Refer to the dedicated documentation to collect logs from: [Docker][4], [Kubernetes][5], [journald][6], [Windows Event][7].

## Agent configuration

Datadog Agent v6 can collect logs and forward them to Datadog from files, the network (TCP or UDP):

1. Create a new folder in the `conf.d/` directory at the root of your [Agent's configuration directory][8] named after your log source.
2. Create a new `conf.yaml` file in this new folder.
3. Add a custom log collection configuration group with the parameters below.
4. [Restart your Agent][9] to take into account this new configuration.
5. [Run the Agent's status subcommand][10] to check if your custom configuration is correct.

Below are examples of custom log collection setup:

{{< tabs >}}
{{% tab "Tail existing files" %}}

To gather logs from your `<APP_NAME>` application stored in `<PATH_LOG_FILE>/<LOG_FILE_NAME>.log` create a `<APP_NAME>.d/conf.yaml` file at the root of your [Agent's configuration directory][1] with the following content:

```
logs:
  - type: file
    path: <PATH_LOG_FILE>/<LOG_FILE_NAME>.log
    service: <APP_NAME>
    source: <SOURCE>
```

Find the list of supported `<SOURCE>` value, in our [Integration pipeline reference page][2].

**Note**: Make sure that tailed files have UTF8 encoding.

[1]: /agent/faq/agent-configuration-files
[2]: /logs/faq/integration-pipeline-reference
{{% /tab %}}

{{% tab "Stream logs from TCP/UDP" %}}

To gather logs from your `<APP_NAME>` application that forwards its logs via TCP over port `<PORT>`, create a `<APP_NAME>.d/conf.yaml` file at the root of your [Agent's configuration directory][1] with the following content:

```
logs:
  - type: tcp
    port: <PORT>
    service: <APP_NAME>
    source: <SOURCE>
```

Find the list of supported `<SOURCE>` value, in our [Integration pipeline reference page][2].

**Note**: The Agent supports raw string, JSON, and Syslog formatted logs. If you are sending logs in batch, use line break characters to separate your logs.

[1]: /agent/faq/agent-configuration-files
[2]: /logs/faq/integration-pipeline-reference
{{% /tab %}}
{{< /tabs >}}

List of all available parameters for log collection:

| Parameter        | Required | Description                                                                                                                                                                                                                                                                                                                                         |
|------------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`           | Yes      | Type of log input source. Valid values are: **tcp**, **udp**, **file**, **windows_event**, **docker**, or **journald**.                                                                                                                                                                                                                             |
| `port`           | Yes      | If `type` is **tcp** or **udp**, port to listen log from.                                                                                                                                                                                                                                                                                           |
| `path`           | Yes      | If `type` is **file** or **journald**, path of the file to gather logs from.                                                                                                                                                                                                                                                                        |
| `channel_path`   | Yes      | If `type` is **windows_event**, list of windows event channels to collect log from.                                                                                                                                                                                                                                                                 |
| `service`        | Yes      | Name of the service owning the log. If you instrumented your service with [Datadog APM][11], this must be the same service name.                                                                                                                                                                                                                    |
| `source`         | Yes      | Attribute that defines which integration is sending the logs. If the logs do not come from an existing integration, then this field may include a custom source name. However, it is recommended that you match this value to the namespace of any related [custom metrics][12] you are collecting, for example: `myapp` from `myapp.request.count`. |
| `include_units`  | No       | If `type` is **journald**, list of specific journald units to include.                                                                                                                                                                                                                                                                              |
| `exclude_units`  | No       | If `type` is **journald**, list of specific journald units to exclude.                                                                                                                                                                                                                                                                              |
| `sourcecategory` | No       | A multiple value attribute used to refine the source attribute, for example: `source:mongodb, sourcecategory:db_slow_logs`.                                                                                                                                                                                                                         |
| `tags`           | No       | Add tags to each log collected ([learn more about tagging][13]).                                                                                                                                                                                                                                                                                    |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /agent/faq/agent-configuration-files/?tab=agentv6#agent-main-configuration-file
[2]: /integrations/#cat-log-collection
[3]: /agent/guide/agent-commands/?tab=agentv6#restart-the-agent
[4]: /agent/docker/logs
[5]: /agent/kubernetes
[6]: /integrations/journald/#log-collection
[7]: /integrations/win32_event_log/#log-collection
[8]: /agent/faq/agent-configuration-files
[9]: /agent/faq/agent-commands/#start-stop-and-restart-the-agent
[10]: /agent/faq/agent-commands/#agent-status-and-information
[11]: /tracing
[12]: /developers/metrics/custom_metrics
[13]: /tagging
