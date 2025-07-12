---
title: Data Streams Monitoring for IBM MQ
---

### Prerequisites

* [Datadog Agent v7.34.0 or later][1]

| Language     | Library                                                                                        | Minimal tracer version                                                            | Recommended tracer version                                                            |
|--------------|------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| [.NET][2] | [IBMMQDotnetClient][3]           | {{< dsm-tracer-version lang="dotnet" lib="ibmmqdotnetclient" type="minimal" >}}          | {{< dsm-tracer-version lang="dotnet" lib="ibmmqdotnetclient" type="recommended" >}}          |

### Setting up Data Streams Monitoring
See setup instructions for [.NET][2].

[1]: /agent
[2]: /data_streams/setup/language/dotnet
[3]: https://www.nuget.org/packages/IBMMQDotnetClient