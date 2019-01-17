---
title: Log Collection
kind: Documentation
---

Log collection is the beginning of your journey in the wonderful world of log management. Use the [Datadog Agent][1] to collect logs directly from your hosts or your containerized environments. You can collect AWS service logs with Datadog's [AWS Lambda function](#from-aws-services).If you are already using a log-shipper daemon, refer to the dedicated documentation for [Rsyslog][2], [Syslog-ng][3], [NXlog][4], [FluentD][5], and [Logstash][6].

Integrations and Log Collection are intimately tied together. By collecting Logs the right way, you enable all the the subsequent components such as [processing][7], [parsing][8], and [facets][9] in the Explorer. **[Discover the log integrations supported by Datadog][10]**. You can also define custom log sources if there isn't an integration for your source yet.

<div class="alert alert-warning">
<a href="/integrations/#cat-log-collection">Consult the current list of available supported integrations</a>.
</div>

The different ways and places from which to collect logs.

### From your hosts

Follow the [Datadog Agent installation instructions][1] to start forwarding logs alongside your metrics and traces.
The Agent can [tail log files][11] or [listen for logs sent over UDP / TCP][12], and you can configure it to [filter out logs][13], [scrub sensitive data][14], or  aggregate [multi line logs][15].

### From a Docker environment

The Datadog Agent can [collect logs directly from container stdout/stderr][16] without using a logging driver. When the Agent's Docker check is enabled, container and orchestrator metadata are automatically added as tags to your logs.

It is possible to collect logs from all your containers or only a subset filtered by container image, label, or name. Autodiscovery can also be used to configure log collection directly in the container labels.

In Kubernetes environments you can also leverage [the daemonset installation][17].

### From AWS services

The Datadog Agent can be used to collect logs directly from ECS or EC2 instances and applications running on them.

However, AWS services logs are collected thanks to Datadog's [Lambda function][18]. Triggers are then defined ([manually or automatically][19]) to forward logs from any S3 bucket, Cloudwatch Log group, or Cloudwatch events.

### From your application

After you have [installed the Datadog Agent][20], [enabled Log collection][21], begin sending logs to your Datadog Agent by instrumenting your application:

{{< whatsnext desc="Select one of the following supported languages to start collecting logs:">}}
  {{< nextlink href="logs/log_collection/csharp" tag="C++" >}}C# log collection.{{< /nextlink >}}
  {{< nextlink href="logs/log_collection/go" tag="Go" >}}Go log collection.{{< /nextlink >}}
  {{< nextlink href="logs/log_collection/java" tag="Java" >}}Java log collection.{{< /nextlink >}}
  {{< nextlink href="logs/log_collection/nodejs" tag="NodeJS" >}}NodeJS log collection.{{< /nextlink >}}
  {{< nextlink href="logs/log_collection/php" tag="PHP" >}}PHP log collection.{{< /nextlink >}}
  {{< nextlink href="logs/log_collection/python" tag="NodeJS" >}}Python log collection.{{< /nextlink >}}
  {{< nextlink href="logs/log_collection/ruby" tag="Ruby" >}}Ruby log collection.{{< /nextlink >}}
{{< /whatsnext >}}

### From a custom forwarder

Any custom process or [logging library][22] able to forward logs through **TCP** can be used in conjuntion with Datadog Logs. The secure TCP endpoint is `intake.logs.datadoghq.com:10516` (or port `10514` for insecure connections). 

You must prefix the log entry with your [Datadog API Key][23], e.g.:

```
<DATADOG_API_KEY> this is my log
```

Test it manually with telnet:

```
telnet intake.logs.datadoghq.com 10514 
<DATADOG_API_KEY> Log sent directly via TCP
```

This produces the following result in your [live tail page][24]: 

{{< img src="logs/custom_log_telnet.png" alt="Custom telnet" responsive="true" style="width:70%;">}}

### Datadog Logs Endpoints

Datadog provides logging endpoints for both SSL-encrypted connections and unencrypted connections.
You should use the encrypted endpoint when possible. The Datadog Agent uses the encrypted endpoint to send logs to Datadog (more information available in the [Datadog security documentation][25]).

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


### Reserved attributes

Here are some key attributes you should pay attention to when setting up your project:

| Attribute | Description                                                                                                                                                                                                                            |
|-----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `host`    | The name of the originating host as defined in metrics. We automatically retrieve corresponding host tags from the matching host in Datadog and apply them to your logs. The Agent sets this value automatically.                      |
| `source`  | This corresponds to the integration name: the technology from which the log originated. When it matches an integration name, Datadog automatically installs the corresponding parsers and facets. For example: nginx, postgresql, etc. |
| `service` | The name of the application or service generating the log events. It is used to switch from Logs to APM, so make sure you define the same value when you use both products.                                                            |
| `message` | By default, Datadog ingests the value of the `message` attribute as the body of the log entry. That value is then highlighted and displayed in the Logstream, where it is indexed for full text search.                                |

Your logs are collected and centralized into the [Log Explorer][26] view. You can also search, enrich, and alert on your logs.

{{< img src="logs/log_explorer_view.png" alt="Log Explorer view" responsive="true" >}}


[1]: /agent/logs/#getting-started-with-the-agent
[2]: /integrations/rsyslog
[3]: /integrations/syslog_ng
[4]: /integrations/nxlog
[5]: /integrations/fluentd/#log-collection
[6]: /integrations/logstash/#log-collection
[7]: /logs/processing
[8]: /logs/processing/parsing
[9]: /logs/explorer/?tab=facets#setup
[10]: /integrations/#cat-log-collection
[11]: /agent/logs/#tail-existing-files
[12]: /agent/logs/#stream-logs-through-tcp-udp
[13]: /agent/logs/#filter-logs
[14]: /agent/logs/#scrub-sensitive-data-in-your-logs
[15]: /agent/logs/#multi-line-aggregation
[16]: /agent/docker/logs
[17]: /agent/basic_agent_usage/kubernetes/#log-collection-setup
[18]: /integrations/amazon_web_services/#log-collection
[19]: /integrations/amazon_web_services/#enable-logging-for-your-aws-service
[20]: /agent
[21]: /agent/logs
[22]: /agent/logs/?tab=tailexistingfiles#how-to-get-the-most-of-your-application-logs
[23]: https://app.datadoghq.com/account/settings#api
[24]: https://app.datadoghq.com/logs/livetail
[25]: /security/logs/#information-security
[26]: /logs/explore
