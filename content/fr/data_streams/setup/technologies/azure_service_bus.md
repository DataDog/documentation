---
title: Data Streams Monitoring pour Azure Service Bus
---

### Prérequis

* [Agent Datadog v7.34.0 ou version ultérieure][1]

| Langage     | Bibliothèque                                                                                        | Version minimale du traceur                                                            | Version recommandée du traceur                                                            |
|--------------|------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| [.NET][2] |[Azure.Messaging.ServiceBus][3] | {{< dsm-tracer-version lang="dotnet" lib="azure-messaging-servicebus" type="minimal" >}} | {{< dsm-tracer-version lang="dotnet" lib="azure-messaging-servicebus" type="recommended" >}} |

### Configurer Data Streams Monitoring
Consultez les instructions de configuration pour [.NET][2].

{{% data_streams/monitoring-azure-service-bus %}}

[1]: /fr/agent
[2]: /fr/data_streams/setup/language/dotnet
[3]: https://www.nuget.org/packages/Azure.Messaging.ServiceBus