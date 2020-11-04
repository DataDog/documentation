---
title: Exigences de compatibilité .NET Core
kind: documentation
description: Exigences de compatibilité pour le traceur .NET
further_reading:
  - link: tracing/setup/dotnet-core
    tag: Documentation
    text: Instrumenter votre application
---
La bibliothèque de tracing Datadog .NET est open source. Consultez le [référentiel GitHub][1] pour en savoir plus.

Le traceur .NET prend en charge l'instrumentation automatique sur .NET Core 2.1 et 3.1, ainsi que sur [.NET Framework][2].

Le traceur .NET fonctionne sur .NET Core 2.0, 2.2 et 3.0, mais ces versions ont atteint la fin de leur cycle de vie et ne sont plus prises en charge par Microsoft. Consultez la section [Politique de prise en charge de Microsoft][3] pour en savoir plus. Nous vous conseillons d'utiliser la dernière version patchée de .NET Core 2.1 ou 3.1. Les anciennes versions de .NET Core sous Linux/x64 présentent des bugs au niveau du compilateur JIT qui peuvent entraîner des exceptions dans les applications lors de l'utilisation de l'instrumentation automatique. Si votre application est basée sur .NET Core 2.0, 2.1.0-2.1.11 ou 2.2.0-2.2.5, nous vous conseillons vivement de mettre à jour votre runtime .NET Core. Si vous ne pouvez pas le mettre à jour, vous devrez peut-être définir la variable d'environnement `DD_CLR_DISABLE_OPTIMIZATIONS=true` pour contourner le problème. Consultez [DataDog/dd-trace-dotnet/issues/302][5] pour en savoir plus.

**Remarque :** lorsque vous utilisez à la fois l'instrumentation manuelle et l'instrumentation automatique, il est essentiel de veiller à ce que les versions du package NuGet et du programme d'installation MSI correspondent.

## Intégrations

Le traceur .NET peut instrumenter automatiquement les bibliothèques suivantes :

| Framework ou bibliothèque            | Package NuGet                                                           | Nom de l'intégration     |
|---------------------------------|-------------------------------------------------------------------------|----------------------|
| ASP.NET Core                    | `Microsoft.AspNetCore`</br>`Microsoft.AspNetCore.App`</br>2.0+ et 3.0+ | `AspNetCore`         |
| ADO.NET                         | `System.Data.Common`</br>`System.Data.SqlClient` 4.0+                   | `AdoNet`             |
| HttpClient / HttpMessageHandler | `System.Net.Http` 4.0+                                                  | `HttpMessageHandler` |
| WebClient / WebRequest          | `System.Net.Requests` 4.0+                                              | `WebRequest`         |
| Redis (client StackExchange)    | `StackExchange.Redis` 1.0.187+                                          | `StackExchangeRedis` |
| Redis (client ServiceStack)     | `ServiceStack.Redis` 4.0.48+                                            | `ServiceStackRedis`  |
| Elasticsearch                   | `Elasticsearch.Net` 5.3.0+                                              | `ElasticsearchNet`   |
| MongoDB                         | `MongoDB.Driver.Core` 2.1.0+                                            | `MongoDb`            |
| PostgreSQL                      | `Npgsql` 4.0+                                                           | `AdoNet`             |

**Remarque :** l'intégration ADO.NET instrumente les appels effectués via la classe abstraite `DbCommand` ou l'interface `IDbCommand`, sans tenir compte de l'implémentation sous-jacente. Elle instrumente également les appels directs de `SqlCommand`.

Votre framework préféré n'est pas disponible ? Datadog élargit continuellement la liste des frameworks pris en charge. Contactez l'[équipe Datadog][5] pour obtenir de l'aide.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-dotnet
[2]: /fr/tracing/compatibility_requirements/dotnet-framework/
[3]: https://dotnet.microsoft.com/platform/support/policy/dotnet-core
[4]: https://github.com/DataDog/dd-trace-dotnet/issues/302#issuecomment-603269367
[5]: /fr/help/