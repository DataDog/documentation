---
title: .NET Core Compatibility Requirements
kind: documentation
description: 'Compatibility Requirements for the .NET tracer'
further_reading:
    - link: 'tracing/setup/dotnet-core'
      tag: 'Documentation'
      text: 'Instrument Your Application'
---

## Integrations

   The .NET Tracer can instrument the following libraries automatically:

   | Framework or library            | NuGet package                                                           | Integration Name     |
   |---------------------------------|-------------------------------------------------------------------------|----------------------|
   | ASP.NET Core                    | `Microsoft.AspNetCore`</br>`Microsoft.AspNetCore.App`</br>2.0+ and 3.0+ | `AspNetCore`         |
   | ADO.NET                         | `System.Data.Common`</br>`System.Data.SqlClient` 4.0+                   | `AdoNet`             |
   | HttpClient / HttpMessageHandler | `System.Net.Http` 4.0+                                                  | `HttpMessageHandler` |
   | WebClient / WebRequest          | `System.Net.Requests` 4.0+                                              | `WebRequest`         |
   | Redis (StackExchange client)    | `StackExchange.Redis` 1.0.187+                                          | `StackExchangeRedis` |
   | Redis (ServiceStack client)     | `ServiceStack.Redis` 4.0.48+                                            | `ServiceStackRedis`  |
   | Elasticsearch                   | `Elasticsearch.Net` 5.3.0+                                              | `ElasticsearchNet`   |
   | MongoDB                         | `MongoDB.Driver.Core` 2.1.0+                                            | `MongoDb`            |
   | PostgreSQL                      | `Npgsql` 4.0+                                                           | `AdoNet`             |

   **Note:** The ADO.NET integration instruments calls made through the `DbCommand` abstract class or the `IDbCommand` interface, regardless of the underlying implementation. It also instruments direct calls to `SqlCommand`.

   Don’t see your desired frameworks? Datadog is continually adding additional support. [Check with the Datadog team][1] for help.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
