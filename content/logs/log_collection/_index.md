---
title: Log Collection
kind: Documentation
---

## Overview

Use the [Datadog Agent][1] to collect logs directly from your hosts or your [containerized environments][2] or from [Kubernetes][3]. 

You can collect Logs from your Cloud providers with Datadog's [AWS Lambda function][4] or [Azure Function][5], 

If you are already using a log-shipper daemon, refer to the dedicated documentation for [Rsyslog][6], [Syslog-ng][7], [NXlog][8], [FluentD][9], and [Logstash][10].

## Host Log collection

Follow the [Datadog Agent installation instructions][1] to start forwarding logs alongside your metrics and traces. The Agent can [tail log files][11] or [listen for logs sent over UDP / TCP][12], and you can configure it to [filter out logs][13], [scrub sensitive data][14], or  aggregate [multi line logs][15].

Integrations and Log Collection are intimately tied together. By collecting Logs the right way, you enable all the the subsequent components such as [processing][16], [parsing][17], and [facets][18] in the Explorer. 

**[Discover the log integrations supported by Datadog][19]**.

## Docker Log collection

The Datadog Agent can [collect logs directly from container stdout/stderr][20] without using a logging driver. When the Agent's Docker check is enabled, container and orchestrator metadata are automatically added as tags to your logs.

It is possible to collect logs from all your containers or only a subset filtered by container image, label, or name. Autodiscovery can also be used to configure log collection directly in the container labels.

In Kubernetes environments you can also leverage [the daemonset installation][21].

## Cloud provider Log collection

### AWS

The Datadog Agent can be used to collect logs directly from ECS or EC2 instances and applications running on them.

However, AWS services logs are collected thanks to Datadog's [Lambda function][4]. Triggers are then defined ([manually or automatically][22]) to forward logs from any S3 bucket, Cloudwatch Log group, or Cloudwatch events.

### Azure

The Datadog Agent can be used to collect logs directly from your Azure VM instances and applications running on them. 

However, Azure service logs are collected thanks to Datadog's [Azure function][23]. 

## Application log collection

After you have [installed the Datadog Agent][5], [enabled Log collection][24], begin sending logs to your Datadog Agent by instrumenting your application:

{{< whatsnext desc="Select one of the following supported languages to start collecting logs:">}}
  {{< nextlink href="logs/log_collection/csharp" tag="C++" >}}C# log collection.{{< /nextlink >}}
  {{< nextlink href="logs/log_collection/go" tag="Go" >}}Go log collection.{{< /nextlink >}}
  {{< nextlink href="logs/log_collection/java" tag="Java" >}}Java log collection.{{< /nextlink >}}
  {{< nextlink href="logs/log_collection/nodejs" tag="NodeJS" >}}NodeJS log collection.{{< /nextlink >}}
  {{< nextlink href="logs/log_collection/php" tag="PHP" >}}PHP log collection.{{< /nextlink >}}
  {{< nextlink href="logs/log_collection/python" tag="NodeJS" >}}Python log collection.{{< /nextlink >}}
  {{< nextlink href="logs/log_collection/ruby" tag="Ruby" >}}Ruby log collection.{{< /nextlink >}}
{{< /whatsnext >}}

## Custom forwarder Log collection

Any custom process or [logging library][25] able to forward logs through **TCP** can be used in conjuntion with Datadog Logs. The secure TCP endpoint is `intake.logs.datadoghq.com:10516` (or port `10514` for insecure connections). 

You must prefix the log entry with your [Datadog API Key][26], e.g.:

```
<DATADOG_API_KEY> this is my log
```

Test it manually with telnet:

```
telnet intake.logs.datadoghq.com 10514 
<DATADOG_API_KEY> Log sent directly via TCP
```

This produces the following result in your [live tail page][27]: 

{{< img src="logs/custom_log_telnet.png" alt="Custom telnet" responsive="true" style="width:70%;">}}

Datadog can automatically parse attributes out of JSON formatted messages.

```
telnet intake.logs.datadoghq.com 10514 
<DATADOG_API_KEY> {"message":"json formatted log", "ddtags":"env:my-env,user:my-user", "ddsource":"my-integration", "hostname":"my-hostname", "service":"my-service"}
```

{{< img src="logs/custom_log_telnet_json_.png" alt="Custom telnet" responsive="true" style="width:100%;">}}

### Datadog Logs Endpoints

Datadog provides logging endpoints for both SSL-encrypted connections and unencrypted connections.
You should use the encrypted endpoint when possible. The Datadog Agent uses the encrypted endpoint to send logs to Datadog (more information available in the [Datadog security documentation][28]).

Endpoints that can be used to send logs to Datadog:

{{< tabs >}}
{{% tab "US Region" %}}


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
{{% tab "EU Region" %}}

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

## Reserved attributes

Here are some key attributes you should pay attention to when setting up your project:

| Attribute | Description                                                                                                                                                                                                                            |
|-----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `host`    | The name of the originating host as defined in metrics. We automatically retrieve corresponding host tags from the matching host in Datadog and apply them to your logs. The Agent sets this value automatically.                      |
| `source`  | This corresponds to the integration name: the technology from which the log originated. When it matches an integration name, Datadog automatically installs the corresponding parsers and facets. For example: `nginx`, `postgresql`, etc. |
| `status` | This corresponds to the level/severity of a log. It is used to define [patterns][29] and has a dedicated layout in the Datadog Log UI.|
| `service` | The name of the application or service generating the log events. It is used to switch from Logs to APM, so make sure you define the same value when you use both products.                                                            |
| `message` | By default, Datadog ingests the value of the `message` attribute as the body of the log entry. That value is then highlighted and displayed in the Logstream, where it is indexed for full text search.                                |

Your logs are collected and centralized into the [Log Explorer][30] view. You can also search, enrich, and alert on your logs.

{{< img src="logs/log_explorer_view.png" alt="Log Explorer view" responsive="true" >}}

## How to get the most of your application logs

When logging stack traces, there are specific attributes that have a dedicated UI display within your Datadog application such as the logger name, the current thread, the error type, and the stack trace itself.

{{< img src="agent/logs/stack_trace.png" style="width:80%;" alt="Stack trace" responsive="true" >}}

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

Datadog automatically parses JSON-formatted logs. For this reason, if you have control over the log format you send to Datadog, it is recommended to format these logs as JSON to avoid the need for custom parsing rules.

[1]: /agent/logs
[2]: /agent/docker/logs
[3]: /agent/kubernetes
[4]: /integrations/amazon_web_services/#log-collection
[5]: /agent
[6]: /integrations/rsyslog
[7]: /integrations/syslog_ng
[8]: /integrations/nxlog
[9]: /integrations/fluentd/#log-collection
[10]: /integrations/logstash/#log-collection
[11]: /agent/logs/#tail-existing-files
[12]: /agent/logs/?tab=streamlogsfromtcpudp#custom-log-collection
[13]: /agent/logs/advanced_log_collection/#filter-logs
[14]: /agent/logs/advanced_log_collection/#scrub-sensitive-data-in-your-logs
[15]: /agent/logs/advanced_log_collection/#multi-line-aggregation
[16]: /logs/processing
[17]: /logs/processing/parsing
[18]: /logs/explorer/?tab=facets#setup
[19]: /integrations/#cat-log-collection
[20]: /agent/docker/logs
[21]: /agent/kubernetes/#log-collection
[22]: /integrations/amazon_web_services/#enable-logging-for-your-aws-service
[23]: /integrations/azure/?tab=azurecliv20#log-collection
[24]: /agent/logs
[25]: /agent/logs/?tab=tailexistingfiles#how-to-get-the-most-of-your-application-logs
[26]: https://app.datadoghq.com/account/settings#api
[27]: https://app.datadoghq.com/logs/livetail
[28]: /security/logs/#information-security
[29]: /logs/explorer/patterns
[30]: /logs/explorer
