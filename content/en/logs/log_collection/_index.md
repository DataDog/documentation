---
title: Log Collection and Integrations
kind: Documentation
description: "Configure your environment to gather logs from your host, containers, and services."
aliases:
  - /logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers
  - /logs/languages
  - /integrations/windows_event_log/
further_reading:
- link: "https://www.datadoghq.com/blog/log-file-control-with-logrotate/"
  tag: "Blog"
  text: "How to manage log files using Logrotate"
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

1. Install the [Datadog Agent][1].
2. To enable log collection, change `logs_enabled:false` to `logs_enabled:true` in your Agent’s main configuration file (`datadog.yaml`). See the [Host Agent Log collection documentation][5] for more information and examples.
3. Once enabled, the Datadog Agent can be configured to [tail log files or listen for logs sent over UDP/TCP][2], [filter out logs or scrub sensitive data][3], and [aggregate multi-line logs][4].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: /agent/logs/#custom-log-collection
[3]: /agent/logs/advanced_log_collection/#filter-logs
[4]: /agent/logs/advanced_log_collection/#multi-line-aggregation
[5]: /agent/logs/
{{% /tab %}}

{{% tab "Application" %}}

1. Install the [Datadog Agent][1].
2. To enable log collection, change `logs_enabled:false` to `logs_enabled:true` in your Agent’s main configuration file (`datadog.yaml`). See the [Host Agent Log collection documentation][2] for more information and examples.
3. Follow your application language installation instructions to configure a logger and start generating logs:

{{< partial name="logs/logs-languages.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: /agent/logs/
{{% /tab %}}

{{% tab "Container" %}}

Choose a container or orchestrator provider and follow their dedicated log collection instructions:

{{< partial name="logs/logs-containers.html" >}}

**Notes**:

- The Datadog Agent can [collect logs directly from container stdout/stderr][1] without using a logging driver. When the Agent's Docker check is enabled, container and orchestrator metadata are automatically added as tags to your logs.

- It is possible to collect logs from all your containers or [only a subset filtered by container image, label, or name][2].

- Autodiscovery can also be used to [configure log collection directly in the container labels][3].

- In Kubernetes environments, you can also leverage [the daemonset installation][4].

[1]: /agent/docker/log/
[2]: /agent/guide/autodiscovery-management/
[3]: /agent/kubernetes/integrations/
[4]: /agent/basic_agent_usage/kubernetes/#log-collection-setup
{{% /tab %}}

{{% tab "Serverless" %}}

Use the Datadog Forwarder, an AWS Lambda function that ships logs from your environment to Datadog. To enable log collection in your AWS serverless environment, refer to the [Datadog Forwarder documentation][1].

[1]: /serverless/forwarder
{{% /tab %}}

{{% tab "Cloud/Integration" %}}

Select your Cloud provider below to see how to automatically collect your logs and forward them to Datadog:

{{< partial name="logs/logs-cloud.html" >}}

Datadog integrations and log collection are tied together. You can use an integration's default configuration file to enable dedicated [processors][1], [parsing][2], and [facets][3] in Datadog. To begin log collection with an integration:

1. Select an integration from the [Integrations page][6] and follow the setup instructions.
2. Follow the integration's log collection instructions. This section covers how to uncomment the logs section in that integration's `conf.yaml` file and configure it for your environment.

[1]: /logs/log_configuration/processors
[2]: /logs/log_configuration/parsing
[3]: /logs/explorer/facets/
[4]: /agent/kubernetes/log/#autodiscovery
[5]: /agent/docker/log/#log-integrations
[6]: /integrations/#cat-log-collection
{{% /tab %}}
{{< /tabs >}}

## Additional configuration options

### Logging endpoints

Datadog provides logging endpoints for both SSL-encrypted connections and unencrypted connections. Use the encrypted endpoint when possible. The Datadog Agent uses the encrypted endpoint to send logs to Datadog. More information is available in the [Datadog security documentation][6].

#### Supported endpoints

Use the [site][13] selector dropdown on the right side of the page to see supported endpoints by Datadog site.

{{< site-region region="us" >}}

| Site | Type        | Endpoint                                                                  | Port         | Description                                                                                                                                                                 |
|------|-------------|---------------------------------------------------------------------------|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| US   | HTTPS       | `http-intake.logs.datadoghq.com`                                          | 443          | Used by custom forwarder to send logs in JSON or plain text format over HTTPS. See the [Logs HTTP API documentation][1].                                                    |
| US   | HTTPS       | `agent-http-intake.logs.datadoghq.com`                                    | 443          | Used by the Agent to send logs in JSON format over HTTPS. See the [Host Agent Log collection documentation][2].                                                             |
| US   | HTTPS       | `lambda-http-intake.logs.datadoghq.com`                                   | 443          | Used by Lambda functions to send logs in raw, Syslog, or JSON format over HTTPS.                                                                                            |
| US   | HTTPS       | `logs.`{{< region-param key="browser_sdk_endpoint_domain" code="true" >}} | 443          | Used by the Browser SDK to send logs in JSON format over HTTPS.                                                                                                             |
| US   | TCP         | `agent-intake.logs.datadoghq.com`                                         | 10514        | Used by the Agent to send logs in JSON format over HTTPS. See the [Host Agent Log collection documentation][2].                                                             |
| US   | TCP and TLS | `agent-intake.logs.datadoghq.com`                                         | 10516 or 443 | Used by the Agent to send logs in JSON format over HTTPS. See the [Host Agent Log collection documentation][2].                                                             |
| US   | TCP and TLS | `intake.logs.datadoghq.com`                                               | 443          | Used by custom forwarders to send logs in raw, Syslog, or JSON format over an SSL-encrypted TCP connection.                                                                 |
| US   | TCP and TLS | `functions-intake.logs.datadoghq.com`                                     | 443          | Used by Azure functions to send logs in raw, Syslog, or JSON format over an SSL-encrypted TCP connection. **Note**: This endpoint may be useful with other cloud providers. |
| US   | TCP and TLS | `lambda-intake.logs.datadoghq.com`                                        | 443          | Used by Lambda functions to send logs in raw, Syslog, or JSON format over an SSL-encrypted TCP connection.                                                                  |

[1]: /api/latest/logs/#send-logs
[2]: /agent/logs/#send-logs-over-https
{{< /site-region >}}

{{< site-region region="eu" >}}

| Site | Type        | Endpoint                                                                  | Port | Description                                                                                                                                                                 |
|------|-------------|---------------------------------------------------------------------------|------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| EU   | HTTPS       | `http-intake.logs.datadoghq.eu`                                           | 443  | Used by custom forwarder to send logs in JSON or plain text format over HTTPS. See the [Logs HTTP API documentation.][1]                                                    |
| EU   | HTTPS       | `agent-http-intake.logs.datadoghq.eu`                                     | 443  | Used by the Agent to send logs in JSON format over HTTPS. See the [Host Agent Log collection documentation][2].                                                             |
| EU   | HTTPS       | `lambda-http-intake.logs.datadoghq.eu`                                    | 443  | Used by Lambda functions to send logs in raw, Syslog, or JSON format over HTTPS.                                                                                            |
| EU   | HTTPS       | `logs.`{{< region-param key="browser_sdk_endpoint_domain" code="true" >}} | 443  | Used by the Browser SDK to send logs in JSON format over HTTPS.                                                                                                             |
| EU   | TCP and TLS | `agent-intake.logs.datadoghq.eu`                                          | 443  | Used by the Agent to send logs in protobuf format over an SSL-encrypted TCP connection.                                                                                     |
| EU   | TCP and TLS | `functions-intake.logs.datadoghq.eu`                                      | 443  | Used by Azure functions to send logs in raw, Syslog, or JSON format over an SSL-encrypted TCP connection. **Note**: This endpoint may be useful with other cloud providers. |
| EU   | TCP and TLS | `lambda-intake.logs.datadoghq.eu`                                         | 443  | Used by Lambda functions to send logs in raw, Syslog, or JSON format over an SSL-encrypted TCP connection.                                                                  |

[1]: /api/latest/logs/#send-logs
[2]: /agent/logs/#send-logs-over-https
{{< /site-region >}}

{{< site-region region="us3" >}}

| Site | Type  | Endpoint                                                                  | Port | Description                                                                                                              |
|------|-------|---------------------------------------------                              |------|--------------------------------------------------------------------------------------------------------------------------|
| US3  | HTTPS | `http-intake.logs.us3.datadoghq.com`                                      | 443  | Used by custom forwarder to send logs in JSON or plain text format over HTTPS. See the [Logs HTTP API documentation][1]. |
| US3  | HTTPS | `lambda-http-intake.logs.us3.datadoghq.com`                               | 443  | Used by Lambda functions to send logs in raw, Syslog, or JSON format over HTTPS.                                         |
| US3  | HTTPS | `agent-http-intake.logs.us3.datadoghq.com`                                | 443  | Used by the Agent to send logs in JSON format over HTTPS. See the [Host Agent Log collection documentation][2].          |
| US3  | HTTPS | `logs.`{{< region-param key="browser_sdk_endpoint_domain" code="true" >}} | 443  | Used by the Browser SDK to send logs in JSON format over HTTPS.                                                          |

[1]: /api/latest/logs/#send-logs
[2]: /agent/logs/#send-logs-over-https

{{< /site-region >}}

{{< site-region region="us5" >}}

| Site | Type  | Endpoint                                                                  | Port | Description                                                                                                              |
|------|-------|---------------------------------------------------------------------------|------|--------------------------------------------------------------------------------------------------------------------------|
| US5  | HTTPS | `http-intake.logs.us5.datadoghq.com`                                      | 443  | Used by custom forwarder to send logs in JSON or plain text format over HTTPS. See the [Logs HTTP API documentation][1]. |
| US5  | HTTPS | `lambda-http-intake.logs.us5.datadoghq.com`                               | 443  | Used by Lambda functions to send logs in raw, Syslog, or JSON format over HTTPS.                                         |
| US5  | HTTPS | `agent-http-intake.logs.us5.datadoghq.com`                                | 443  | Used by the Agent to send logs in JSON format over HTTPS. See the [Host Agent Log collection documentation][2].          |
| US5  | HTTPS | `logs.`{{< region-param key="browser_sdk_endpoint_domain" code="true" >}} | 443  | Used by the Browser SDK to send logs in JSON format over HTTPS.                                                          |

[1]: /api/latest/logs/#send-logs
[2]: /agent/logs/#send-logs-over-https

{{< /site-region >}}

{{< site-region region="gov" >}}

| Site    | Type  | Endpoint                                                                  | Port | Description                                                                                                              |
|---------|-------|---------------------------------------------------------------------------|------|--------------------------------------------------------------------------------------------------------------------------|
| US1-FED | HTTPS | `http-intake.logs.ddog-gov.datadoghq.com`                                 | 443  | Used by custom forwarder to send logs in JSON or plain text format over HTTPS. See the [Logs HTTP API documentation][1]. |
| US1-FED | HTTPS | `lambda-http-intake.logs.ddog-gov.datadoghq.com`                          | 443  | Used by Lambda functions to send logs in raw, Syslog, or JSON format over HTTPS.                                         |
| US1-FED | HTTPS | `agent-http-intake.logs.ddog-gov.datadoghq.com`                           | 443  | Used by the Agent to send logs in JSON format over HTTPS. See the [Host Agent Log collection documentation][2].          |
| US1-FED | HTTPS | `logs.`{{< region-param key="browser_sdk_endpoint_domain" code="true" >}} | 443  | Used by the Browser SDK to send logs in JSON format over HTTPS.                                                          |

[1]: /api/latest/logs/#send-logs
[2]: /agent/logs/#send-logs-over-https

{{< /site-region >}}

### Custom log forwarding

Any custom process or logging library able to forward logs through **TCP** or **HTTP** can be used in conjunction with Datadog Logs.

{{< tabs >}}
{{% tab "HTTP" %}}

You can send logs to Datadog platform over HTTP. Refer to the [Datadog Log HTTP API documentation][1] to get started.

[1]: /api/latest/logs/#send-logs
{{% /tab %}}
{{% tab "TCP" %}}

{{< site-region region="us" >}}

Test it manually with telnet. You must prefix the log entry with your [Datadog API Key][1] and add a payload.

```text
telnet intake.logs.datadoghq.com 10514
<DATADOG_API_KEY> Log sent directly via TCP
```

Your payload, or `Log sent directly via TCP` as written in the example, can be in raw, Syslog, or JSON format. If your payload is in JSON format, Datadog automatically parses its attributes.

```text
telnet intake.logs.datadoghq.com 10514
<DATADOG_API_KEY> {"message":"json formatted log", "ddtags":"env:my-env,user:my-user", "ddsource":"my-integration", "hostname":"my-hostname", "service":"my-service"}
```

[1]: /account_management/api-app-keys/#api-keys

{{< /site-region >}}

{{< site-region region="eu" >}}

Test it manually with telnet. You must prefix the log entry with your [Datadog API Key][1] and add a payload.

```text
telnet agent-intake.logs.datadoghq.eu 443
<DATADOG_API_KEY> Log sent directly via TCP
```

Your payload, or `Log sent directly via TCP` as written in the example, can be in raw, Syslog, or JSON format. If your payload is in JSON format, Datadog automatically parses its attributes.

```text
telnet intake.logs.datadoghq.com 10514
<DATADOG_API_KEY> {"message":"json formatted log", "ddtags":"env:my-env,user:my-user", "ddsource":"my-integration", "hostname":"my-hostname", "service":"my-service"}
```

[1]: /account_management/api-app-keys/#api-keys

{{< /site-region >}}

{{< site-region region="us3" >}}
The TCP endpoint is not recommended for this site. Contact [support][1] for more information.

[1]: /help
{{< /site-region >}}

{{< site-region region="gov,us5" >}}

The TCP endpoint is not supported for this site.

[1]: /help
{{< /site-region >}}


[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/logs/livetail
{{% /tab %}}
{{< /tabs >}}

**Notes**:

* The HTTPS API supports logs of sizes up to 1MB. However, for optimal performance, it is recommended that an individual log be no greater than 25K bytes. If you use the Datadog Agent for logging, it is configured to split a log at 256kB (256000 bytes).
* A log event should not have more than 100 tags, and each tag should not exceed 256 characters for a maximum of 10 million unique tags per day.
* A log event converted to JSON format should contain less than 256 attributes. Each of those attribute's keys should be less than 50 characters, nested in less than 10 successive levels, and their respective value should be less than 1024 characters if promoted as a facet.
* Log events can be submitted up to 18h in the past and 2h in the future.

Log events that do not comply with these limits might be transformed or truncated by the system or not indexed if outside the provided time range. However, Datadog tries to preserve as much user data as possible.

### Attributes and tags

Attributes prescribe [logs facets][9], which are used for filtering and searching in Log Explorer. See the dedicated [attributes and aliasing][10] documentation for a list of reserved and standard attributes and to learn how to support a naming convention with logs attributes and aliasing.

#### Attributes for stack traces

When logging stack traces, there are specific attributes that have a dedicated UI display within your Datadog application such as the logger name, the current thread, the error type, and the stack trace itself.

{{< img src="logs/log_collection/stack_trace.png" style="width:80%;" alt="Stack trace"  >}}

To enable these functionalities use the following attribute names:

| Attribute            | Description                                                             |
|----------------------|-------------------------------------------------------------------------|
| `logger.name`        | Name of the logger                                                      |
| `logger.thread_name` | Name of the current thread                                              |
| `error.stack`        | Actual stack trace                                                      |
| `error.message`      | Error message contained in the stack trace                              |
| `error.kind`         | The type or "kind" of an error (for example, "Exception", or "OSError") |

**Note**: By default, integration Pipelines attempt to remap default logging library parameters to those specific attributes and parse stack traces or traceback to automatically extract the `error.message` and `error.kind`.

For more information, see the complete [source code attributes documentation][11].

## Next steps

Once logs are collected and ingested, they are available in **Log Explorer**. Log Explorer is where you can search, enrich, and view alerts on your logs. See the [Log Explorer][12] documentation to begin analyzing your log data, or see the additional log management documentation below.

{{< img src="logs/explore.jpg" alt="Log Explorer view"  >}}

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
[8]: /api/v1/logs/#send-logs
[9]: /logs/explorer/facets/
[10]: /logs/log_configuration/attributes_naming_convention
[11]: /logs/log_configuration/attributes_naming_convention/#source-code
[12]: /logs/explore/
[13]: /getting_started/site/
