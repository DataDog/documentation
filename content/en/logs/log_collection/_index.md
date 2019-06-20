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

Use the [Datadog Agent][1] to collect logs directly from your hosts or your containerized environments. You can collect AWS service logs with Datadog's [AWS Lambda function](#from-aws-services).If you are already using a log-shipper daemon, refer to the dedicated documentation for [Rsyslog][2], [Syslog-ng][3], [NXlog][4], [FluentD][5], and [Logstash][6].

Integrations and Log Collection are tied together. Use an integration default configuration file to enable its dedicated [processing][7], [parsing][8], and [facets][9] in Datadog.

<div class="alert alert-warning">
<a href="/integrations/#cat-log-collection">Consult the current list of available supported integrations</a>.
</div>

Collect logs from these places:

## From your hosts

Follow the [Datadog Agent installation instructions][1] to start forwarding logs alongside your metrics and traces.
The Agent can [tail log files][10] or [listen for logs sent over UDP / TCP][11], and you can configure it to [filter out logs][12], [scrub sensitive data][13], or  aggregate [multi line logs][14].

{{< partial name="logs/logs-languages.html" >}}

## From a Docker environment

The Datadog Agent can [collect logs directly from container stdout/stderr][15] without using a logging driver. When the Agent's Docker check is enabled, container and orchestrator metadata are automatically added as tags to your logs.

It is possible to collect logs from all your containers or only a subset filtered by container image, label, or name. Autodiscovery can also be used to configure log collection directly in the container labels.

In Kubernetes environments you can also leverage [the daemonset installation][16].

{{< partial name="logs/logs-containers.html" >}}

## From Cloud Providers

The Datadog Agent can be used to collect logs directly from ECS or EC2 instances and applications running on them.

However, AWS services logs are collected thanks to Datadog's [Lambda function][17]. Triggers are then defined ([manually or automatically][18]) to forward logs from any S3 bucket, Cloudwatch Log group, or Cloudwatch events.

{{< partial name="logs/logs-cloud.html" >}}

## From a custom forwarder

Any custom process or [logging library][19] able to forward logs through **TCP** can be used in conjuntion with Datadog Logs. The secure TCP endpoint is `intake.logs.datadoghq.com:10516` (or port `10514` for insecure connections).

You must prefix the log entry with your [Datadog API Key][20], e.g.:

```
<DATADOG_API_KEY> this is my log
```

Test it manually with telnet:

```
telnet intake.logs.datadoghq.com 10514
<DATADOG_API_KEY> Log sent directly via TCP
```

This produces the following result in your [live tail page][21]:

{{< img src="logs/custom_log_telnet.png" alt="Custom telnet" responsive="true" style="width:70%;">}}

Datadog automatically parses attributes out of JSON formatted messages.

```
telnet intake.logs.datadoghq.com 10514
<DATADOG_API_KEY> {"message":"json formatted log", "ddtags":"env:my-env,user:my-user", "ddsource":"my-integration", "hostname":"my-hostname", "service":"my-service"}
```

{{< img src="logs/custom_log_telnet_json_.png" alt="Custom telnet" responsive="true" style="width:100%;">}}

## Datadog Logs Endpoints

Datadog provides logging endpoints for both SSL-encrypted connections and unencrypted connections.
You should use the encrypted endpoint when possible. The Datadog Agent uses the encrypted endpoint to send logs to Datadog (more information available in the [Datadog security documentation][22]).

Endpoints that can be used to send logs to Datadog:

{{< tabs >}}
{{% tab "US Site" %}}


| Endpoints for SSL encrypted connections | Port    | Description                                                                                                                                                                 |
|-----------------------------------------|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `agent-intake.logs.datadoghq.com`       | `10516` | Used by the Agent to send logs in protobuf format over an SSL-encrypted TCP connection.                                                                                     |
| `intake.logs.datadoghq.com`             | `10516` | Used by custom forwarders to send logs in raw, Syslog, or JSON format over an SSL-encrypted TCP connection.                                                                 |
| `lambda-intake.logs.datadoghq.com`      | `10516` | Used by Lambda functions to send logs in raw, Syslog, or JSON format over an SSL-encrypted TCP connection.                                                                  |
| `functions-intake.logs.datadoghq.com`   | `10516` | Used by Azure functions to send logs in raw, Syslog, or JSON format over an SSL-encrypted TCP connection. **Note**: This endpoint may be useful with other cloud providers. |


| Endpoint for unencrypted connections | Port    | Description                                                                                              |
|--------------------------------------|---------|----------------------------------------------------------------------------------------------------------|
| `intake.logs.datadoghq.com`          | `10514` | Used by custom forwarders to send logs in raw, Syslog, or JSON format over an unecrypted TCP connection. |

{{% /tab %}}
{{% tab "EU Site" %}}

| Endpoints for SSL encrypted connections | Port  | Description                                                                                                                                                                 |
|-----------------------------------------|-------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `agent-intake.logs.datadoghq.eu`        | `443` | Used by the Agent to send logs in protobuf format over an SSL-encrypted TCP connection.                                                                                     |
| `tcp-intake.logs.datadoghq.eu`          | `443` | Used by custom forwarders to send logs in raw, Syslog, or JSON format over an SSL-encrypted TCP connection.                                                                 |
| `lambda-intake.logs.datadoghq.eu`       | `443` | Used by Lambda functions to send logs in raw, Syslog, or JSON format over an SSL-encrypted TCP connection.                                                                  |
| `functions-intake.logs.datadoghq.eu`    | `443` | Used by Azure functions to send logs in raw, Syslog, or JSON format over an SSL-encrypted TCP connection. **Note**: This endpoint may be useful with other cloud providers. |


| Endpoint for unencrypted connections | Port   | Description                                                                                                     |
|--------------------------------------|--------|-----------------------------------------------------------------------------------------------------------------|
| `tcp-intake.logs.datadoghq.eu`       | `1883` | Used by custom forwarders to send logs in raw, Syslog, or JSON format format over an unecrypted TCP connection. |


{{% /tab %}}
{{< /tabs >}}

To send logs over HTTPs, refer to the [Datadog Log HTTP API documentation][23].

## Reserved attributes

Here are some key attributes you should pay attention to when setting up your project:

| Attribute | Description                                                                                                                                                                                                                            |
|-----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `host`    | The name of the originating host as defined in metrics. We automatically retrieve corresponding host tags from the matching host in Datadog and apply them to your logs. The Agent sets this value automatically.                      |
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

## Send your application logs in JSON

For integration frameworks, Datadog provides guidelines on how to log JSON into a file. JSON-formatted logging helps handle multi-line application logs, and is automatically parsed by Datadog.

##### The Advantage of Collecting JSON-formatted logs

Datadog automatically parses JSON-formatted logs. For this reason, if you have control over the log format you send to Datadog, it is recommended to format these logs as JSON to avoid the need for custom parsing rules.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/logs
[2]: /integrations/rsyslog
[3]: /integrations/syslog_ng
[4]: /integrations/nxlog
[5]: /integrations/fluentd/#log-collection
[6]: /integrations/logstash/#log-collection
[7]: /logs/processing
[8]: /logs/processing/parsing
[9]: /logs/explorer/?tab=facets#setup
[10]: /agent/logs/#tail-existing-files
[11]: /agent/logs/#stream-logs-through-tcp-udp
[12]: /agent/logs/#filter-logs
[13]: /agent/logs/#scrub-sensitive-data-in-your-logs
[14]: /agent/logs/#multi-line-aggregation
[15]: /agent/docker/log
[16]: /agent/basic_agent_usage/kubernetes/#log-collection-setup
[17]: /integrations/amazon_web_services/#log-collection
[18]: /integrations/amazon_web_services/#enable-logging-for-your-aws-service
[19]: /logs/log_collection/#how-to-get-the-most-of-your-application-logs
[20]: https://app.datadoghq.com/account/settings#api
[21]: https://app.datadoghq.com/logs/livetail
[22]: /security/logs/#information-security
[23]: /api/?lang=bash#send-logs-over-http
[24]: /logs/explorer/patterns
[25]: /logs/explore
