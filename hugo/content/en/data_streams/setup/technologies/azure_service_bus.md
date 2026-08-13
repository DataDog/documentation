---
title: Data Streams Monitoring for Azure Service Bus 
---

### Prerequisites

* [Datadog Agent v7.34.0 or later][1]

| Language     | Library                                                                                        | Minimal tracer version                                                            | Recommended tracer version                                                            |
|--------------|------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| [.NET][2] |[Azure.Messaging.ServiceBus][3] | {{< dsm-tracer-version lang="dotnet" lib="azure-messaging-servicebus" type="minimal" >}} | {{< dsm-tracer-version lang="dotnet" lib="azure-messaging-servicebus" type="recommended" >}} |

### Setting up Data Streams Monitoring
See setup instructions for [.NET][2].

{{% data_streams/monitoring-azure-service-bus %}}

[1]: /agent
[2]: /data_streams/setup/language/dotnet
[3]: https://www.nuget.org/packages/Azure.Messaging.ServiceBus