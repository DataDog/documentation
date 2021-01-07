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

The .NET Datadog Tracer library is open-source. For more information please view our [Github repository][1].

For both Automatic & Custom Instrumentation, the .NET Datadog Tracer supports .NET Framework 4.5 and above. 

<div class="alert alert-warning" style="font-style: italic;"> 
  <p style="font-weight: bold; margin-bottom: 0px;">Note:<p/> 
    When using both custom and automatic instrumentation, it is important to keep the MSI installer and NuGet package versions in sync.
</div>


## Integrations

<div class="alert alert-info" style="font-style: italic;"> 
  <p style="font-weight: bold; margin-bottom: 0px;">**Update:** Starting with .NET Tracer version `1.12.0`, the ASP.NET integration is enabled automatically. The NuGet packages `Datadog.Trace.AspNet` or `Datadog.Trace.ClrProfiler.Managed` are no longer required. Remove them from your application when you update the .NET Tracer.</p>
</div>

<div class="alert alert-warning" style="font-style: italic;">
<p style="font-weight: bold; margin-bottom: 0px;">Note:<p/> 

The ADO.NET integration instruments calls made through the `DbCommand` abstract class or the `IDbCommand` interface, regardless of the underlying implementation. It also instruments direct calls to `SqlCommand`.
</div>

Don’t see your desired frameworks? Datadog is continually adding additional support. To request a framework, please contact our amazing [support team][2].



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


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-dotnet
[2]: /help/
