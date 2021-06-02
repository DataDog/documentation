---
title: .NET Framework Compatibility Requirements
kind: documentation
description: 'Compatibility Requirements for the .NET tracer'
aliases:
  - /tracing/compatibility_requirements/dotnet-framework
code_lang: dotnet-framework
type: multi-code-lang
code_lang_weight: 80
further_reading:
    - link: 'tracing/setup/dotnet-framework'
      tag: 'Documentation'
      text: 'Instrument Your Application'
    - link: 'https://github.com/DataDog/dd-trace-dotnet/tree/master/samples'
      tag: 'GitHub'
      text: 'Examples of Custom Instrumentation'
---

## Compatibility

- The .NET Tracer supports all .NET-based languages (for example, C#, F#, Visual Basic).

- The .NET Tracer supports instrumentation on .NET Framework 4.5 and above. It also supports [.NET Core][1].

- The .NET Tracer library for Datadog is open-source. For more information see the [tracer Github repository][2].

<div class="alert alert-warning"> 
  <strong>Notes:</strong><br><ul><li>Datadog automatic instrumentation relies on the .NET CLR Profiling API. This API allows only one subscriber (for example, APM). To ensure maximum visibility, run only one APM solution within your application environment.</li><li> If you are using both automatic and custom instrumentation, it is important to keep the package versions (for example, MSI and NuGet) in sync.</li></ul>

</div>


## Integrations

The .NET Tracer can instrument the following libraries automatically:

| Framework or library            | NuGet package                  | Integration Name     |
| ------------------------------- | ------------------------------ | -------------------- |
| ASP.NET (including Web Forms)   | built-in                       | `AspNet`             |
| ASP.NET MVC                     | `Microsoft.AspNet.Mvc` 4.0+    | `AspNetMvc`          |
| ASP.NET Web API 2               | `Microsoft.AspNet.WebApi` 5.1+ | `AspNetWebApi2`      |
| WCF (server)                    | built-in                       | `Wcf`                |
| ADO.NET                         | built-in                       | `AdoNet`             |
| HttpClient / HttpMessageHandler | built-in                       | `HttpMessageHandler` |
| WebClient / WebRequest          | built-in                       | `WebRequest`         |
| Redis (StackExchange client)    | `StackExchange.Redis` 1.0.187+ | `StackExchangeRedis` |
| Redis (ServiceStack client)     | `ServiceStack.Redis` 4.0.48+   | `ServiceStackRedis`  |
| Elasticsearch                   | `Elasticsearch.Net` 5.3.0+     | `ElasticsearchNet`   |
| MongoDB                         | `MongoDB.Driver.Core` 2.1.0+   | `MongoDb`            |
| PostgreSQL                      | `Npgsql` 4.0+                  | `AdoNet`             |
| RabbitMQ                        | `RabbitMQ.Client` 3.6.9+       | `RabbitMQ`           |

<div class="alert alert-info">
<strong>Note:</strong> The ADO.NET integration instruments calls made through the <code>DbCommand</code> abstract class or the <code>IDbCommand</code> interface, regardless of the underlying implementation. It also instruments direct calls to <code>SqlCommand</code> and <code>NpgsqlCommand</code>.
</div>

Don’t see your desired libraries? Datadog is continually adding additional support. [Check with the Datadog team][3] for help.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/compatibility_requirements/dotnet-core/
[2]: https://github.com/DataDog/dd-trace-dotnet
[3]: /help/
