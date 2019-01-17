---
title: Log Collection
kind: Documentation
---

Use the [Datadog Agent][1] to collect logs directly from your hosts or your [containerized environments][2] or from [Kubernetes][3]. You can collect AWS service logs with Datadog's [AWS Lambda function](#aws-log-collection).If you are already using a log-shipper daemon, refer to the dedicated documentation for [Rsyslog][4], [Syslog-ng][5], [NXlog][6], [FluentD][7], and [Logstash][8].

### Host Log collection

Follow the [Datadog Agent installation instructions][1] to start forwarding logs alongside your metrics and traces.
The Agent can [tail log files][9] or [listen for logs sent over UDP / TCP][10], and you can configure it to [filter out logs][11], [scrub sensitive data][12], or  aggregate [multi line logs][13].

## Integration Log collection 

Integrations and Log Collection are intimately tied together. By collecting Logs the right way, you enable all the the subsequent components such as [processing][14], [parsing][15], and [facets][16] in the Explorer. **[Discover the log integrations supported by Datadog][17]**.

### Docker Log collection

The Datadog Agent can [collect logs directly from container stdout/stderr][18] without using a logging driver. When the Agent's Docker check is enabled, container and orchestrator metadata are automatically added as tags to your logs.

It is possible to collect logs from all your containers or only a subset filtered by container image, label, or name. Autodiscovery can also be used to configure log collection directly in the container labels.

In Kubernetes environments you can also leverage [the daemonset installation][19].

## AWS Log collection

The Datadog Agent can be used to collect logs directly from ECS or EC2 instances and applications running on them.

However, AWS services logs are collected thanks to Datadog's [Lambda function][20]. Triggers are then defined ([manually or automatically][21]) to forward logs from any S3 bucket, Cloudwatch Log group, or Cloudwatch events.

## Application log collection

After you have [installed the Datadog Agent][22], [enabled Log collection][23], begin sending logs to your Datadog Agent by instrumenting your application:

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

Any custom process or [logging library][24] able to forward logs through **TCP** can be used in conjuntion with Datadog Logs. The secure TCP endpoint is `intake.logs.datadoghq.com:10516` (or port `10514` for insecure connections). 

You must prefix the log entry with your [Datadog API Key][25], e.g.:

```
<DATADOG_API_KEY> this is my log
```

Test it manually with telnet:

```
telnet intake.logs.datadoghq.com 10514 
<DATADOG_API_KEY> Log sent directly via TCP
```

This produces the following result in your [live tail page][26]: 

{{< img src="logs/custom_log_telnet.png" alt="Custom telnet" responsive="true" style="width:70%;">}}

### Datadog Logs Endpoints

Datadog provides logging endpoints for both SSL-encrypted connections and unencrypted connections.
You should use the encrypted endpoint when possible. The Datadog Agent uses the encrypted endpoint to send logs to Datadog (more information available in the [Datadog security documentation][27]).

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
| `source`  | This corresponds to the integration name: the technology from which the log originated. When it matches an integration name, Datadog automatically installs the corresponding parsers and facets. For example: nginx, postgresql, etc. |
| `service` | The name of the application or service generating the log events. It is used to switch from Logs to APM, so make sure you define the same value when you use both products.                                                            |
| `message` | By default, Datadog ingests the value of the `message` attribute as the body of the log entry. That value is then highlighted and displayed in the Logstream, where it is indexed for full text search.                                |

Your logs are collected and centralized into the [Log Explorer][28] view. You can also search, enrich, and alert on your logs.

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

## Send your application logs in JSON

For integration frameworks, Datadog provides guidelines on how to log JSON into a file. JSON-formatted logging helps handle multi-line application logs, and is automatically parsed by Datadog.

##### The Advantage of Collecting JSON-formatted logs

Datadog automatically parses JSON-formatted logs. For this reason, if you have control over the log format you send to Datadog, it is recommended to format these logs as JSON to avoid the need for custom parsing rules.

[1]: /agent/logs
[2]: /agent/docker/logs
[3]: /agent/kubernetes
[4]: /integrations/rsyslog
[5]: /integrations/syslog_ng
[6]: /integrations/nxlog
[7]: /integrations/fluentd/#log-collection
[8]: /integrations/logstash/#log-collection
[9]: /agent/logs/#tail-existing-files
[10]: agent/logs/?tab=streamlogsfromtcpudp#custom-log-collection
[11]: /agent/logs/advanced_log_collection/#filter-logs
[12]: /agent/logs/advanced_log_collection/#scrub-sensitive-data-in-your-logs
[13]: /agent/logs/advanced_log_collection/#multi-line-aggregation
[14]: /logs/processing
[15]: /logs/processing/parsing
[16]: /logs/explorer/?tab=facets#setup
[17]: /integrations/#cat-log-collection
[18]: /agent/docker/logs
[19]: /agent/kubernetes/#log-collection
[20]: /integrations/amazon_web_services/#log-collection
[21]: /integrations/amazon_web_services/#enable-logging-for-your-aws-service
[22]: /agent
[23]: /agent/logs
[24]: /agent/logs/?tab=tailexistingfiles#how-to-get-the-most-of-your-application-logs
[25]: https://app.datadoghq.com/account/settings#api
[26]: https://app.datadoghq.com/logs/livetail
[27]: /security/logs/#information-security
[28]: /logs/explore
