---
title: Log Collection
kind: Documentation
---

Use the [Datadog Agent][1] to collect logs directly from:

* [Hosts][2] ([log files][3] or [log stream UDP / TCP][4])
* [Containerized environments][5] 
* [Kubernetes][6]. 

You can also collect Logs from your Cloud providers services with Datadog's:

* [AWS Lambda function][7]
* [Azure Function][8]

If you are already using a log-shipper daemon, refer to the dedicated documentation for [Rsyslog][9], [Syslog-ng][10], [NXlog][11], [FluentD][12], and [Logstash][13].

## Application log collection

After you have installed the Datadog Agent and enabled Log collection, enhance your application logging with the following frameworks in order to benefit from dedicated UI display within your Datadog application such as the logger name, the current thread, the error type, and the stack trace itself.

{{< img src="agent/logs/stack_trace.png" style="width:80%;" alt="Stack trace" responsive="true" >}}

{{< whatsnext desc="Select one of the following supported languages to configure your logging frameworks:">}}
  {{< nextlink href="logs/log_collection/csharp" tag="C++" >}}C# log collection{{< /nextlink >}}
  {{< nextlink href="logs/log_collection/go" tag="Go" >}}Go log collection{{< /nextlink >}}
  {{< nextlink href="logs/log_collection/java" tag="Java" >}}Java log collection{{< /nextlink >}}
  {{< nextlink href="logs/log_collection/nodejs" tag="NodeJS" >}}NodeJS log collection{{< /nextlink >}}
  {{< nextlink href="logs/log_collection/php" tag="PHP" >}}PHP log collection{{< /nextlink >}}
  {{< nextlink href="logs/log_collection/python" tag="NodeJS" >}}Python log collection{{< /nextlink >}}
  {{< nextlink href="logs/log_collection/ruby" tag="Ruby" >}}Ruby log collection{{< /nextlink >}}
{{< /whatsnext >}}
<p></p>

Datadog UI enhancement are applied on logs that follow the [attribute naming convention][14] which is automatically implemented by the above framework integrations. 

## Custom Log collection

Any custom process or logging library able to forward logs through **TCP** can be used in conjuntion with Datadog Logs. The secure TCP endpoint is `intake.logs.datadoghq.com:10516` (or port `10514` for insecure connections). 

You must prefix the log entry with your [Datadog API Key][15], e.g.:

```
<DATADOG_API_KEY> this is my log
```

Test it manually with telnet:

```
telnet intake.logs.datadoghq.com 10514 
<DATADOG_API_KEY> Log sent directly via TCP
```

Datadog can automatically parse attributes out of JSON formatted messages.

```
telnet intake.logs.datadoghq.com 10514 
<DATADOG_API_KEY> {"message":"json formatted log", "ddtags":"env:my-env,user:my-user", "ddsource":"my-integration", "hostname":"my-hostname", "service":"my-service"}
```

This produces the following result in your [live tail page][16]: 

{{< img src="logs/custom_log_telnet_json_.png" alt="Custom telnet" responsive="true" style="width:80%;">}}

### Datadog Logs Endpoints

Datadog provides logging endpoints for both SSL-encrypted connections and unencrypted connections.
You should use the encrypted endpoint when possible. The Datadog Agent uses the encrypted endpoint to send logs to Datadog (more information available in the [Datadog security documentation][17]).

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

[1]: /agent/logs
[2]: /agent/logs
[3]: /agent/logs/#tail-existing-files
[4]: /agent/logs/?tab=streamlogsfromtcpudp#custom-log-collection
[5]: /agent/docker/logs
[6]: /agent/kubernetes
[7]: /integrations/amazon_web_services/#log-collection
[8]: /integrations/azure/?tab=azurecliv20#log-collection
[9]: /integrations/rsyslog
[10]: /integrations/syslog_ng
[11]: /integrations/nxlog
[12]: /integrations/fluentd/#log-collection
[13]: /integrations/logstash/#log-collection
[14]: /logs/processing/attributes_naming_convention
[15]: https://app.datadoghq.com/account/settings#api
[16]: https://app.datadoghq.com/logs/livetail
[17]: /security/logs/#information-security
