---
title: Log Collection & Integrations
kind: Documentation
description: "Configure your Datadog Agent to gather logs from your host, containers, and services."
aliases:
  - /logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers
  - /logs/languages
  - /integrations/windows_event_log/
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
  text: "Logging Without Limits*"
---

## Overview

Choose a configuration option below to begin ingesting your logs. If you are already using a log-shipper daemon, refer to the dedicated documentation for [Rsyslog][1], [Syslog-ng][2], [NXlog][3], [FluentD][4], or [Logstash][5].

Consult the [list of available Datadog log collection endpoints](#logging-endpoints) if you want to send your logs directly to Datadog.

**Note**: When sending logs in a JSON format to Datadog, there is a set of reserved attributes that have a specific meaning within Datadog. See the [Reserved Attributes section](#attributes-and-tags) to learn more.

## Setup

{{< tabs >}}
{{% tab "Host" %}}

Follow the [Datadog Agent installation instructions][1] to start forwarding logs alongside your metrics and traces. The Agent can [tail log files][2] or [listen for logs sent over UDP/TCP][2], and you can configure it to [filter out logs][3], [scrub sensitive data][3], or aggregate [multi line logs][4].


[1]: /agent/logs/
[2]: /agent/logs/#custom-log-collection
[3]: /agent/logs/advanced_log_collection/#filter-logs
[4]: /agent/logs/advanced_log_collection/#multi-line-aggregation
{{% /tab %}}

{{% tab "Application" %}}

After you have [enabled log collection][1], configure your application language to generate logs:

{{< partial name="logs/logs-languages.html" >}}

**Note**: JSON-formatted logging helps handle multi-line application logs. JSON-formatted logs are automatically parsed by Datadog. If you have control over the log format you send to Datadog, it is recommended that you format logs as JSON to avoid the need for custom parsing rules.


[1]: /agent/logs/
{{% /tab %}}

{{% tab "Container" %}}

The Datadog Agent can [collect logs directly from container stdout/stderr][1] without using a logging driver. When the Agent's Docker check is enabled, container and orchestrator metadata are automatically added as tags to your logs.
It is possible to collect logs from all your containers or [only a subset filtered by container image, label, or name][2]. Autodiscovery can also be used to [configure log collection directly in the container labels][3]. In Kubernetes environments you can also leverage [the daemonset installation][4].

Choose your environment below to get dedicated log collection instructions:

{{< partial name="logs/logs-containers.html" >}}


[1]: /agent/docker/log/
[2]: /agent/guide/autodiscovery-management/
[3]: /agent/kubernetes/integrations/
[4]: /agent/basic_agent_usage/kubernetes/#log-collection-setup
{{% /tab %}}

{{% tab "Serverless" %}}

Datadog collects logs from AWS Lambda. To enable this, refer to the [serverless monitoring documentation][1].


[1]: /serverless/forwarder
{{% /tab %}}

{{% tab "Cloud/Integration" %}}

Select your Cloud provider below to see how to automatically collect your logs and forward them to Datadog:

{{< partial name="logs/logs-cloud.html" >}}

Datadog integrations and log collection are tied together. Use an integration default configuration file to enable dedicated [processing][1], [parsing][2], and [facets][3] in Datadog.

Consult the [list of available supported integrations][4].


[1]: /logs/processing/
[2]: /logs/processing/parsing/
[3]: /logs/explorer/facets/
[4]: /integrations/#cat-log-collection
{{% /tab %}}
{{< /tabs >}}

## Additional configuration options

### Logging endpoints

Datadog provides logging endpoints for both SSL-encrypted connections and unencrypted connections. Use the encrypted endpoint when possible. The Datadog Agent uses the encrypted endpoint to send logs to Datadog. More information is available in the [Datadog security documentation][6].

Endpoints that can be used to send logs to Datadog:

| Endpoints for SSL encrypted connections | Port    | Description                                                                                                                                                                 |
|-----------------------------------------|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `{{< region-param key="tcp_endpoint" code="true" >}}`       | `{{< region-param key="tcp_endpoint_port" code="true" >}}` | Used by the Agent to send logs in protobuf format over an SSL-encrypted TCP connection.                                                                                     |
| `{{< region-param key="agent_http_endpoint" code="true" >}}`  | `{{< region-param key="agent_http_port" code="true" >}}`   | Used by the Agent to send logs in JSON format over HTTPS. See the [How to send logs over HTTP documentation][7].                                                        |
| `{{< region-param key="http_endpoint" code="true" >}}`  | `{{< region-param key="http_port" code="true" >}}`   | Used by custom forwarder to send logs in JSON or plain text format over HTTPS. See the [How to send logs over HTTP documentation][7].                                       |
| `{{< region-param key="web_integrations_endpoint" code="true" >}}`  | `{{< region-param key="web_integrations_port" code="true" >}}`   | Used by custom forwarders to send logs in raw, Syslog, or JSON format over an SSL-encrypted TCP connection.                                                                 |
| `{{< region-param key="lambda_endpoint" code="true" >}}`  | `{{< region-param key="lambda_port" code="true" >}}`   | Used by Lambda functions to send logs in raw, Syslog, or JSON format over an SSL-encrypted TCP connection.                                                                  |
| `{{< region-param key="lambda_http_endpoint" code="true" >}}`  | `{{< region-param key="lambda_http_port" code="true" >}}`   | Used by Lambda functions to send logs in raw, Syslog, or JSON format over HTTPS.                                                                                            |
| `{{< region-param key="functions_endpoint" code="true" >}}`  | `{{< region-param key="functions_port" code="true" >}}`   | Used by Azure functions to send logs in raw, Syslog, or JSON format over an SSL-encrypted TCP connection. **Note**: This endpoint may be useful with other cloud providers. |

| Endpoint for unencrypted connections | Port    | Description                                                                                              |
|--------------------------------------|---------|----------------------------------------------------------------------------------------------------------|
| `{{< region-param key="web_integrations_endpoint" code="true" >}}`          | `{{< region-param key="web_integrations_unencrypted_port" code="true" >}}` | Used by custom forwarders to send logs in raw, Syslog, or JSON format over an unencrypted TCP connection. |

### Custom log forwarding

Any custom process or logging library able to forward logs through **TCP** or **HTTP** can be used in conjunction with Datadog Logs.

{{< tabs >}}
{{% tab "HTTP" %}}

You can send logs to Datadog platform over HTTP. Refer to the [Datadog Log HTTP API documentation][1] to get started.


[1]: /api/v1/logs/#send-logs
{{% /tab %}}
{{% tab "TCP" %}}

{{< site-region region="us" >}}

The secure TCP endpoint is `intake.logs.datadoghq.com 10516` (or port `10514` for insecure connections).

You must prefix the log entry with your [Datadog API Key][1], for example:

```text
<DATADOG_API_KEY> <PAYLOAD>
```

**Note**: `<PAYLOAD>` can be in raw, Syslog, or JSON format.

Test it manually with telnet. Example of `<PAYLOAD>` in raw format:

```text
telnet intake.logs.datadoghq.com 10514
<DATADOG_API_KEY> Log sent directly via TCP
```

This produces the following result in your [live tail page][2]:

{{< img src="logs/custom_log_telnet.png" alt="Custom telnet"  style="width:70%;">}}

In case of a `<PAYLOAD>` in JSON format, Datadog automatically parses its attributes:

```text
telnet intake.logs.datadoghq.com 10514
<DATADOG_API_KEY> {"message":"json formatted log", "ddtags":"env:my-env,user:my-user", "ddsource":"my-integration", "hostname":"my-hostname", "service":"my-service"}
```

{{< img src="logs/custom_log_telnet_json_.png" alt="Custom telnet"  style="width:100%;">}}


{{< /site-region >}}

{{< site-region region="eu" >}}

The secure TCP endpoint is `tcp-intake.logs.datadoghq.eu 443` (or port `1883` for insecure connections).

You must prefix the log entry with your [Datadog API Key][1], e.g.:

```text
<DATADOG_API_KEY> <PAYLOAD>
```

**Note**: `<PAYLOAD>` can be in raw, Syslog, or JSON format.

Test it manually with telnet. Example of `<PAYLOAD>` in raw format:

```text
telnet tcp-intake.logs.datadoghq.eu 443
<DATADOG_API_KEY> Log sent directly via TCP
```

This produces the following result in your [live tail page][2]:

{{< img src="logs/custom_log_telnet.png" alt="Custom telnet"  style="width:70%;">}}

In case of a `<PAYLOAD>` in JSON format, Datadog automatically parses its attributes:

```text
telnet tcp-intake.logs.datadoghq.eu 1883
<DATADOG_API_KEY> {"message":"json formatted log", "ddtags":"env:my-env,user:my-user", "ddsource":"my-integration", "hostname":"my-hostname", "service":"my-service"}
```

{{< img src="logs/custom_log_telnet_json_.png" alt="Custom telnet"  style="width:100%;">}}

{{< /site-region >}}

{{< site-region region="us3,gov" >}}
A TCP endpoint is not supported for this region.
{{< /site-region >}}


[1]: https://app.datadoghq.com/account/settings#api
[2]: https://app.datadoghq.com/logs/livetail
{{% /tab %}}
{{< /tabs >}}

**Notes**:

* For optimal use, Datadog recommends a log event should not exceed 25K bytes in size. When using the Datadog Agent, log events greater than 256KB are split into several entries. When using the Datadog TCP or HTTP API directly, log events up to 1MB are accepted.
* A log event should not have more than 100 tags, and each tag should not exceed 256 characters for a maximum of 10 million unique tags per day.
* A log event converted to JSON format should contain less than 256 attributes. Each of those attribute's keys should be less than 50 characters, nested in less than 10 successive levels, and their respective value should be less than 1024 characters if promoted as a facet.
* Log events can be submitted up to 18h in the past and 2h in the future.

Log events that do not comply with these limits might be transformed or truncated by the system or not indexed if outside the provided time range. However, Datadog tries to preserve as much user data as possible.

### Attributes and tags

Attributes prescribe [logs facets][8], which are used for filtering and searching in Log Explorer. See the dedicated [attributes and aliasing][9] documentation for a list of reserved and standard attributes and to learn how to support a naming convention with logs attributes and aliasing.

#### Attributes for stack traces

When logging stack traces, there are specific attributes that have a dedicated UI display within your Datadog application such as the logger name, the current thread, the error type, and the stack trace itself.

{{< img src="logs/log_collection/stack_trace.png" style="width:80%;" alt="Stack trace"  >}}

To enable these functionalities use the following attribute names:

| Attribute            | Description                                                      |
|----------------------|------------------------------------------------------------------|
| `logger.name`        | Name of the logger                                               |
| `logger.thread_name` | Name of the current thread                                       |
| `error.stack`        | Actual stack trace                                               |
| `error.message`      | Error message contained in the stack trace                       |
| `error.kind`         | The type or "kind" of an error (i.e "Exception", "OSError", ...) |

**Note**: By default, integration Pipelines attempt to remap default logging library parameters to those specific attributes and parse stack traces or traceback to automatically extract the `error.message` and `error.kind`.

For more information, see the complete [source code attributes documentation][10].

## Next steps

Once logs are collected and ingested, they are available in **Log Explorer**. Log Explorer is where you can search, enrich, and view alerts on your logs. See the [Log Explorer][11] documentation to begin analyzing your log data, or see the additional log management documentation below.

{{< img src="logs/log_explorer_view.png" alt="Log Explorer view"  >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
<br>
\*Logging without Limits is a trademark of Datadog, Inc.

[1]: /integrations/rsyslog/
[2]: /integrations/syslog_ng/
[3]: /integrations/nxlog/
[4]: /integrations/fluentd/#log-collection
[5]: /integrations/logstash/#log-collection
[6]: /security/logs/#information-security
[7]: /agent/logs/#send-logs-over-https
[8]: /logs/explorer/facets/
[9]: /logs/processing/attributes_naming_convention
[10]: /logs/processing/attributes_naming_convention/#source-code
[11]: /logs/explore/
