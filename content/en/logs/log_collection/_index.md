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

Follow the [Datadog Agent installation instructions][1] to start forwarding logs alongside your metrics and traces. The Agent can [tail log files][2] or [listen for logs sent over UDP / TCP][3], and you can configure it to [filter out logs][4], [scrub sensitive data][5], or  aggregate [multi line logs][6]. Finally choose your application language below in order to get dedicated logging best practices.
If you are already using a log-shipper daemon, refer to the dedicated documentation for [Rsyslog][7], [Syslog-ng][8], [NXlog][9], [FluentD][10], and [Logstash][11].

Datadog Log Management also comes with a set of out of the box solutions to collect your logs and send them to Datadog:

* [**Collect logs from your hosts**][12].
* [**Collect logs from your applications**](?tab=ussite#application-log-collection).
* [**Collect logs from a Docker environment**](?tab=ussite#container-log-collection).
* [**Collect logs from a serverless environment**](?tab=ussite#serverless-log-collection).
* [**Collect logs from your Cloud provider**](?tab=ussite#cloud-providers-log-collection).

Datadog Integrations and Log Collection are tied together. Use an integration default configuration file to enable its dedicated [processing][13], [parsing][14], and [facets][15] in Datadog.

<div class="alert alert-warning">
<a href="/integrations/#cat-log-collection">Consult the current list of available supported integrations</a>.
</div>

Find at the bottom of this page the [list of available Datadog Log collection endpoints](#datadog-logs-endpoints) if you want to send your logs directly to Datadog.

**Note**: When sending logs in a JSON format to Datadog, there is a set of reserved attributes that have a specific within Datadog. See the [Reserved Attributes section](#reserved-attributes) to learn more.

## Application Log collection

After you have [enabled log collection][1], configure your application language to generate logs:

{{< partial name="logs/logs-languages.html" >}}

## Container Log collection

The Datadog Agent can [collect logs directly from container stdout/stderr][16] without using a logging driver. When the Agent's Docker check is enabled, container and orchestrator metadata are automatically added as tags to your logs.
It is possible to collect logs from all your containers or [only a subset filtered by container image, label, or name][17]. Autodiscovery can also be used to [configure log collection directly in the container labels][18]. In Kubernetes environments you can also leverage [the daemonset installation][19].

Choose your environment below to get dedicated log collection instructions:

{{< partial name="logs/logs-containers.html" >}}

## Serverless Log collection

Datadog collects logs from AWS Lambda. To enable this, refer to the [AWS Lambda integration documentation][20].

## Cloud Providers Log collection

Select your Cloud provider below to see how to automatically collect your logs and forward them to Datadog:

{{< partial name="logs/logs-cloud.html" >}}

## Custom Log forwarder

Any custom process or [logging library][21] able to forward logs through **TCP** or **HTTP** can be used in conjunction with Datadog Logs. Choose below which Datadog site you want to forward logs to:

{{< tabs >}}
{{% tab "TCP US Site" %}}

The secure TCP endpoint is `intake.logs.datadoghq.com:10516` (or port `10514` for insecure connections).

You must prefix the log entry with your [Datadog API Key][1], e.g.:

```
<DATADOG_API_KEY> <PAYLOAD>
```

**Note**: `<PAYLOAD>` can be in raw, Syslog, or JSON format.

Test it manually with telnet. Example of `<PAYLOAD>` in raw format:

```
telnet intake.logs.datadoghq.com 10514
<DATADOG_API_KEY> Log sent directly via TCP
```

This produces the following result in your [live tail page][2]:

{{< img src="logs/custom_log_telnet.png" alt="Custom telnet" responsive="true" style="width:70%;">}}

In case of a `<PAYLOAD>` in JSON format, Datadog automatically parses its attributes:

```
telnet intake.logs.datadoghq.com 10514
<DATADOG_API_KEY> {"message":"json formatted log", "ddtags":"env:my-env,user:my-user", "ddsource":"my-integration", "hostname":"my-hostname", "service":"my-service"}
```

{{< img src="logs/custom_log_telnet_json_.png" alt="Custom telnet" responsive="true" style="width:100%;">}}


[1]: https://app.datadoghq.com/account/settings#api
[2]: https://app.datadoghq.com/logs/livetail
{{% /tab %}}
{{% tab "TCP EU Site" %}}

The secure TCP endpoint is `tcp-intake.logs.datadoghq.eu:443` (or port `1883` for insecure connections).

You must prefix the log entry with your [Datadog API Key][1], e.g.:

```
<DATADOG_API_KEY> <PAYLOAD>
```

**Note**: `<PAYLOAD>` can be in raw, Syslog, or JSON format.

Test it manually with telnet. Example of `<PAYLOAD>` in raw format:

```
telnet tcp-intake.logs.datadoghq.eu 1883
<DATADOG_API_KEY> Log sent directly via TCP
```

This produces the following result in your [live tail page][2]:

{{< img src="logs/custom_log_telnet.png" alt="Custom telnet" responsive="true" style="width:70%;">}}

In case of a `<PAYLOAD>` in JSON format, Datadog automatically parses its attributes:

```
telnet tcp-intake.logs.datadoghq.eu 1883
<DATADOG_API_KEY> {"message":"json formatted log", "ddtags":"env:my-env,user:my-user", "ddsource":"my-integration", "hostname":"my-hostname", "service":"my-service"}
```

{{< img src="logs/custom_log_telnet_json_.png" alt="Custom telnet" responsive="true" style="width:100%;">}}


[1]: https://app.datadoghq.com/account/settings#api
[2]: https://app.datadoghq.com/logs/livetail
{{% /tab %}}
{{% tab "HTTP" %}}

To send logs over HTTPs for the **EU** or **US** site, refer to the [Datadog Log HTTP API documentation][1].

[1]: https://docs.datadoghq.com/api/?lang=python#send-logs-over-http
{{% /tab %}}
{{< /tabs >}}

## Datadog Logs Endpoints

Datadog provides logging endpoints for both SSL-encrypted connections and unencrypted connections.
Use the encrypted endpoint when possible. The Datadog Agent uses the encrypted endpoint to send logs to Datadog. More information is available in the [Datadog security documentation][22].

Endpoints that can be used to send logs to Datadog:

{{< tabs >}}
{{% tab "US Site" %}}


| Endpoints for SSL encrypted connections | Port    | Description                                                                                                                                                                 |
|-----------------------------------------|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `agent-intake.logs.datadoghq.com`       | `10516` | Used by the Agent to send logs in protobuf format over an SSL-encrypted TCP connection.                                                                                     |
| `agent-http-intake.logs.datadoghq.com`  | `443`   | Used by the Agent to send logs in protobuf format over HTTPS. See the [How to send logs over HTTP documentation][1].                                                        |
| `intake.logs.datadoghq.com`             | `10516` | Used by custom forwarders to send logs in raw, Syslog, or JSON format over an SSL-encrypted TCP connection.                                                                 |
| `lambda-intake.logs.datadoghq.com`      | `10516` | Used by Lambda functions to send logs in raw, Syslog, or JSON format over an SSL-encrypted TCP connection.                                                                  |
| `lambda-http-intake.logs.datadoghq.com` | `443`   | Used by Lambda functions to send logs in raw, Syslog, or JSON format over HTTPS.                                                                                            |
| `functions-intake.logs.datadoghq.com`   | `10516` | Used by Azure functions to send logs in raw, Syslog, or JSON format over an SSL-encrypted TCP connection. **Note**: This endpoint may be useful with other cloud providers. |


| Endpoint for unencrypted connections | Port    | Description                                                                                              |
|--------------------------------------|---------|----------------------------------------------------------------------------------------------------------|
| `intake.logs.datadoghq.com`          | `10514` | Used by custom forwarders to send logs in raw, Syslog, or JSON format over an unecrypted TCP connection. |

[1]: /agent/logs/?tab=tailexistingfiles#send-logs-over-https
{{% /tab %}}
{{% tab "EU Site" %}}

| Endpoints for SSL encrypted connections | Port  | Description                                                                                                                                                                 |
|-----------------------------------------|-------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `agent-intake.logs.datadoghq.eu`        | `443` | Used by the Agent to send logs in protobuf format over an SSL-encrypted TCP connection.                                                                                     |
| `agent-http-intake.logs.datadoghq.eu`   | `443` | Used by the Agent to send logs in protobuf format over HTTPS. See the [How to send logs over HTTP documentation][1].                                                        |
| `tcp-intake.logs.datadoghq.eu`          | `443` | Used by custom forwarders to send logs in raw, Syslog, or JSON format over an SSL-encrypted TCP connection.                                                                 |
| `lambda-intake.logs.datadoghq.eu`       | `443` | Used by Lambda functions to send logs in raw, Syslog, or JSON format over an SSL-encrypted TCP connection.                                                                  |
| `lambda-http-intake.logs.datadoghq.eu`  | `443` | Used by Lambda functions to send logs in raw, Syslog, or JSON format over HTTPS.                                                                                            |
| `functions-intake.logs.datadoghq.eu`    | `443` | Used by Azure functions to send logs in raw, Syslog, or JSON format over an SSL-encrypted TCP connection. **Note**: This endpoint may be useful with other cloud providers. |


| Endpoint for unencrypted connections | Port   | Description                                                                                                     |
|--------------------------------------|--------|-----------------------------------------------------------------------------------------------------------------|
| `tcp-intake.logs.datadoghq.eu`       | `1883` | Used by custom forwarders to send logs in raw, Syslog, or JSON format format over an unecrypted TCP connection. |


[1]: /agent/logs/?tab=tailexistingfiles#send-logs-over-https
{{% /tab %}}
{{< /tabs >}}

To send logs over HTTPs, refer to the [Datadog Log HTTP API documentation][23].


## Reserved attributes

Here are some key attributes you should pay attention to when setting up your project:

| Attribute | Description                                                                                                                                                                                                                                |
|-----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `host`    | The name of the originating host as defined in metrics. We automatically retrieve corresponding host tags from the matching host in Datadog and apply them to your logs. The Agent sets this value automatically.                          |
| `source`  | This corresponds to the integration name: the technology from which the log originated. When it matches an integration name, Datadog automatically installs the corresponding parsers and facets. For example: `nginx`, `postgresql`, etc. |
| `status` | This corresponds to the level/severity of a log. It is used to define [patterns][24] and has a dedicated layout in the Datadog Log UI.|
| `service` | The name of the application or service generating the log events. It is used to switch from Logs to APM, so make sure you define the same value when you use both products.                                                            |
| `message` | By default, Datadog ingests the value of the `message` attribute as the body of the log entry. That value is then highlighted and displayed in the Logstream, where it is indexed for full text search.                                |


Your logs are collected and centralized into the [Log Explorer][25] view. You can also search, enrich, and alert on your logs.

{{< img src="logs/log_explorer_view.png" alt="Log Explorer view" responsive="true" >}}

### How to get the most of your application logs

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

### Send your application logs in JSON

For integration frameworks, Datadog provides guidelines on how to log JSON into a file. JSON-formatted logging helps handle multi-line application logs, and is automatically parsed by Datadog.

#### The Advantage of Collecting JSON-formatted logs

Datadog automatically parses JSON-formatted logs. For this reason, if you have control over the log format you send to Datadog, it is recommended to format these logs as JSON to avoid the need for custom parsing rules.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/logs
[2]: /agent/logs/#tail-existing-files
[3]: /agent/logs/#stream-logs-through-tcp-udp
[4]: /agent/logs/#filter-logs
[5]: /agent/logs/#scrub-sensitive-data-in-your-logs
[6]: /agent/logs/advanced_log_collection/?tab=exclude_at_match#multi-line-aggregation
[7]: /integrations/rsyslog
[8]: /integrations/syslog_ng
[9]: /integrations/nxlog
[10]: /integrations/fluentd/#log-collection
[11]: /integrations/logstash/#log-collection
[12]: /agent/logs/?tab=tailexistingfiles#custom-log-collection
[13]: /logs/processing
[14]: /logs/processing/parsing
[15]: /logs/explorer/?tab=facets#setup
[16]: /agent/docker/log
[17]: /agent/autodiscovery/management
[18]: /agent/autodiscovery/integrations
[19]: /agent/basic_agent_usage/kubernetes/#log-collection-setup
[20]: /integrations/amazon_lambda/#log-collection
[21]: /logs/log_collection/#how-to-get-the-most-of-your-application-logs
[22]: /security/logs/#information-security
[23]: /api/?lang=bash#send-logs-over-http
[24]: /logs/explorer/patterns
[25]: /logs/explore
