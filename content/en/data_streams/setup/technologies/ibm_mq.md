---
title: Data Streams Monitoring for IBM MQ
---

### Prerequisites

* [Datadog Agent v7.34.0 or later][1]

| Language     | Library                                                                                        | Minimal tracer version                                                            | Recommended tracer version                                                            |
|--------------|------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| [.NET][2] | [IBMMQDotnetClient][3]           | {{< dsm-tracer-version lang="dotnet" lib="ibmmqdotnetclient" type="minimal" >}}          | {{< dsm-tracer-version lang="dotnet" lib="ibmmqdotnetclient" type="recommended" >}}          |
| [Java][4]  | [IBM MQ classes for Java and JMS][5  | {{< dsm-tracer-version lang="java" lib="ibmmqjmsclient" type="minimal" >}}          | {{< dsm-tracer-version lang="java" lib="ibmmqjmsclient" type="recommended" >}}       |

### Limitations
None of the IBM MQ tracers modify messages to add Data Streams Monitoring context information the way that tracers do for most other queue technologies. This is to avoid risk to customer services if unexpected additional fields appear in messages.

Due to this limitation, the Data Streams Monitoring pathways view will not be able to filter IBM MQ messages based on upstream pathway, and latency for pathways that entirely flow through IBM MQ will be approximated.

Message throughput and full presence on the Data Streams Topology map is fully supported in these tracers.

### Setting up Data Streams Monitoring
See setup instructions for [.NET][2] or [Java][4].

[1]: /agent
[2]: /data_streams/setup/language/dotnet
[3]: https://www.nuget.org/packages/IBMMQDotnetClient
[4]: /data_streams/setup/language/java
[5]: https://mvnrepository.com/artifact/com.ibm.mq/com.ibm.mq.jakarta.client
