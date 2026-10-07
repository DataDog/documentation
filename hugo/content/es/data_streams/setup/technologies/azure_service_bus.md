---
title: Data Streams Monitoring para Azure Service Bus
---

### Requisitos previos

* [Datadog Agent v7.34.0 o más reciente][1]

| Lenguaje     | Biblioteca                                                                                        | Versión mínima del rastreador                                                            | Versión recomendada del rastreador                                                            |
|--------------|------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| [.NET][2] |[Azure.Messaging.ServiceBus][3] | {{< dsm-tracer-version lang="dotnet" lib="azure-messaging-servicebus" type="minimal" >}} | {{< dsm-tracer-version lang="dotnet" lib="azure-messaging-servicebus" type="recommended" >}} |

### Configuración de Data Streams Monitoring
Consulta las instrucciones de configuración para [.NET][2].

{{% data_streams/monitoring-azure-service-bus %}}

[1]: /es/agent
[2]: /es/data_streams/setup/language/dotnet
[3]: https://www.nuget.org/packages/Azure.Messaging.ServiceBus