---
title: Live Messages
---

{{< callout url="#" btn_hidden="true" header="Join the Preview!">}}
Live Messages is in Preview for Java-Kafka services using Protobuf and Avro. If you're interested in other languages and technologies, reach out to support@datadoghq.com. 
{{< /callout >}}

Live Messages enables you to view a live tail of messages that a specific service consumes or produces. Accessing the live messages and inspecting the contents can help uncover issues when troubleshooting on a specific service.

{{< img src="data_streams/live-messages.png" alt="Data Streams Monitoring with an open side panel, showing a live tail of Live Messages." style="width:100%;" >}}

### Setup

1. Enable [Dynamic Instrumentation][1] on the services you want to use this feature on. 

   <div class="alert alert-info">
   Dynamic Instrumentation requires <a href="/remote_configuration">Remote Configuration</a>.
   </div>
1. In [Datadog Settings][2], ensure that you have the following roles:
   - `Dynamic Instrumentation Read`
   - `Dynamic Instrumentation Write`

### Usage

1. Navigate to the Data Streams Monitoring map and click on a Java service that has dynamic instrumentation enabled. Select the **Messages** tab.
   {{< img src="data_streams/dsm-messages-tab.png" alt="Data Streams Monitoring with a service's side panel open. A play button is displayed." style="width:80%;" >}}
1. To turn on the Live Messages live tail, click on the play button. Then, specify the approximate number of messages to capture, and click on **Start Capturing**. Messages are generated in the form of logs and sampled at a rate of one message per second per host.
   {{< img src="data_streams/dsm-start-capturing.png" alt="Start Capturing Messages modal, with a field to configure how many messages are captured (at a rate of one message per second per host)." style="width:80%;" >}}
1. Clicking into each message shows the fields and values.
   {{< img src="data_streams/dsm-details.png" alt="Live Messages with one message selected." style="width:80%;" >}}

#### Turn off Live Messages live tail
{{< img src="data_streams/dsm-stop-capturing.png" alt="Stop Capturing Messages modal." style="width:100%;" >}}

The live tail automatically turns off after the approximate number of messages specified is captured. You can also manually turn it off by selecting the **Stop Capturing** button.

### Additional details

#### Message storage and access
Messages are accessed by Datadog in the message consumers and producers. They are then stored in Datadog as logs, after going through the [Sensitive Data Scanner][3].

Users must have the `Dynamic Instrumentation Capture Variables` and the `Dynamic Instrumentation Read` roles to use the Live Messages feature. All users in your organization are able to view the logs. For more information on Role Based Access Controls, see [Dynamic Instrumentation][4].

#### Sensitive information redaction

Dynamic Instrumentation automatically redacts values linked to specific identifiers deemed sensitive, such as password and accessToken. See the [full list of redacted identifiers][5]. 

You can further tailor redaction by specifying additional identifiers. In your application's environment (not on `datadog-agent`), set the `DD_DYNAMIC_INSTRUMENTATION_REDACTED_IDENTIFIERS` environment variable to a comma-separated list of identifiers such as `firstName,lastName,phoneNumber`.

For additional information on sensitive data scrubbing, view the [Dynamic Instrumentation documentation][6]. If you have additional requirements or requests on handling sensitive data, [contact Datadog support][7]. 

#### SSL encryption on Kafka
Datadog captures messages in the clients (consumer, producer) before they are encrypted. Thus, Datadog can capture messages regardless of whether encryption is turned on at the Kafka layer.

[1]: /dynamic_instrumentation/
[2]: https://app.datadoghq.com/personal-settings/profile
[3]: https://www.datadoghq.com/product/sensitive-data-scanner/
[4]: /dynamic_instrumentation/#prerequisites
[5]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/agent-debugger/debugger-bootstrap/src/main/java/datadog/trace/bootstrap/debugger/util/Redaction.java
[6]: /dynamic_instrumentation/sensitive-data-scrubbing/
[7]: /help
