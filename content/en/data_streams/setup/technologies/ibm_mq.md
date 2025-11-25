---
title: Data Streams Monitoring for IBM MQ
---

### Prerequisites

* [Datadog Agent v7.34.0 or later][1]

| Language     | Library                                                                                        | Minimal tracer version                                                            | Recommended tracer version                                                            |
|--------------|------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| [.NET][2] | [IBMMQDotnetClient][3]           | {{< dsm-tracer-version lang="dotnet" lib="ibmmqdotnetclient" type="minimal" >}}          | {{< dsm-tracer-version lang="dotnet" lib="ibmmqdotnetclient" type="recommended" >}}          |
| [Java][4]  | [IBM MQ classes for Java and JMS][5]  | {{< dsm-tracer-version lang="java" lib="ibmmqjmsclient" type="minimal" >}}          | {{< dsm-tracer-version lang="java" lib="ibmmqjmsclient" type="recommended" >}}       |

### Limitations
For other queue technologies, Datadog's tracers modify messages to add Data Streams Monitoring context information. However, context propagation for IBM MQ is error-prone, as unexpected additional fields can appear in messages. To avoid risk to customer services, Datadog does not propagate context for IBM MQ traces.

Because of this limitation, the Data Streams Monitoring pathways view cannot filter IBM MQ messages based on upstream pathway.

Latency metrics for pathways that entirely flow through IBM MQ are available, though they are approximated. Message throughput and full presence on the Data Streams Topology map are fully supported.

### Setting up Data Streams Monitoring
See setup instructions for [.NET][2] or [Java][4].

[1]: /agent
[2]: /data_streams/setup/language/dotnet
[3]: https://www.nuget.org/packages/IBMMQDotnetClient
[4]: /data_streams/setup/language/java
[5]: https://mvnrepository.com/artifact/com.ibm.mq/com.ibm.mq.jakarta.client
