---
aliases:
- /fr/tracing/compatibility_requirements/dotnet-framework
- /fr/tracing/setup_overview/compatibility_requirements/dotnet-framework
code_lang: dotnet-framework
code_lang_weight: 80
description: Exigences de compatibilité pour le traceur .NET
further_reading:
- link: tracing/trace_collection/dd_libraries/dotnet-framework
  tag: Documentation
  text: Instrumenter votre application
- link: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples
  tag: GitHub
  text: Exemples d'instrumentation personnalisée
title: Exigences de compatibilité .NET Framework
type: multi-code-lang
---


Le traceur .NET prend en charge tous les langages basés sur .NET (C#, F#, Visual Basic, etc.). Il est open source. Pour en savoir plus, consultez le [référentiel du traceur .NET][1].

## Runtimes .NET Framework pris en charge

Le traceur .NET prend en charge l'instrumentation automatique et personnalisée sur les versions suivantes de .NET Framework. Il prend également en charge [.NET Core][2]. Le traceur .NET ne prend pas en charge l'exécution de code dans les environnements de confiance partielle.

| Version de .NET Framework  | Fin de cycle de vie par Microsoft   | Niveau de prise en charge                       | Version du package             | Fin de cycle de vie par Datadog |
| ----------------------- | --------------------- | ----------------------------------- | --------------------------- | ------------------- |
| 4.8                     |                       | [Disponibilité générale](#support-ga)                   | dernière                      |                     |
| 4.7.2                   |                       | [Disponibilité générale](#support-ga)                   | dernière                      |                     |
| 4.7                     |                       | [Disponibilité générale](#support-ga)                   | dernière                      |                     |
| 4.6.2                   |                       | [Disponibilité générale](#support-ga)                   | dernière                      |                     |
| 4.6.1                   | 26/04/2022            | [Disponibilité générale](#support-ga)                   | dernière                      |                     |
| 4.6                     | 26/04/2022            | [Fin de cycle de vie](#support-eol)                 | < 2.0.0 (p. ex. [1.31.2][3]) | 26/04/2022          |
| 4.5.2                   | 26/04/2022            | [Fin de cycle de vie](#support-eol)                 | < 2.0.0 (p. ex. [1.31.2][3]) | 26/04/2022          |
| 4.5.1                   | 12/01/2016            | [Fin de cycle de vie](#support-eol)                 | < 2.0.0 (p. ex. [1.31.2][3]) | 26/04/2022          |
| 4.5                     | 12/01/2016            | [Fin de cycle de vie](#support-eol)                 | < 2.0.0 (p. ex. [1.31.2][3]) | 26/04/2022          |

Pour en savoir plus, consultez la [politique de Microsoft relative au cycle de vie de .NET Core][4] et la [politique de prise en charge du runtime par APM pour .NET Framework](#politique-de-prise-en-charge-du-runtime-par-apm-pour-net-framework).

<div class="alert alert-info">
  <div class="alert-info"><b>Remarque</b> : pour choisir la version du traceur à utiliser pour une instrumentation automatique, utilisez la version de .NET Framework installée sur le serveur de l'application. Par exemple, si vous compilez votre application en ciblant la version 4.5.1 de .NET Framework, mais que l'application s'exécute sur un serveur qui utilise la version 4.8, utilisez la dernière version du traceur. Pour connaître la version de .NET Framework installée sur une machine, suivez les <a href="https://learn.microsoft.com/fr-fr/dotnet/framework/migration-guide/how-to-determine-which-versions-are-installed">instructions fournies par Microsoft</a>.
  </div>
</div>

## Architectures de processeur prises en charge

Le traceur .NET prend en charge l'instrumentation automatique sur les architectures suivantes :

| Architectures de processeur                                                 | Niveau de prise en charge         | Version du package                        |
| ------------------------------------------------------------------------|-----------------------|----------------------------------------|
| Windows x86 (`win-x86`)                                                 | [Disponibilité générale](#support-ga)     | dernière                                 |
| Windows x64 (`win-x64`)                                                 | [Disponibilité générale](#support-ga)     | dernière                                 |

## Intégrations

La [dernière version du traceur .NET][5] peut instrumenter automatiquement les bibliothèques suivantes :

| Framework ou bibliothèque            | Package NuGet                                                                             | Nom de l'intégration     |
| ------------------------------- | ----------------------------------------------------------------------------------------- | -------------------- |
| .NET Remoting                   | Intégré                                                                                  | `Remoting`           |
| ADO.NET                         | Toutes les intégrations AdoNet                                                                   | `AdoNet`             |
| Aerospike                       | `Aerospike.Client` 4.0.0+                                                                 | `Aerospike`          |
| ASP.NET (y compris Web Forms)   | Intégré                                                                                  | `AspNet`             |
| ASP.NET MVC                     | `Microsoft.AspNet.Mvc` 4.0+                                                               | `AspNetMvc`          |
| ASP.NET Web API 2               | `Microsoft.AspNet.WebApi` 5.1+                                                            | `AspNetWebApi2`      |
| Amazon DynamoDB                 | `AWSSDK.DynamoDBv2`  3.0+                                                                 | `AwsDynamoDb`        |
| Amazon Kinesis                  | `AWSSDK.Kinesis`  3.0+                                                                    | `AwsKinesis`         |
| Amazon SNS                      | `AWSSDK.SNS`  3.0+                                                                        | `AwsSns`             |
| Amazon SQS                      | `AWSSDK.SQS`  3.0+                                                                        | `AwsSqs`             |
| CosmosDb                        | `Microsoft.Azure.Cosmos.Client` 3.6.0+                                                    | `CosmosDb`           |
| Couchbase                       | `CouchbaseNetClient` 2.2.8+                                                               | `Couchbase`          |
| Elasticsearch                   | `Elasticsearch.Net` 5.3.0+                                                                | `ElasticsearchNet`   |
| GraphQL .NET                    | `GraphQL` 2.3.0+                                                                          | `GraphQL`            |
| gRPC                            | `Grpc.Core` 2.3.0+                                                                        | `Grpc`               |
| HotChocolate                    | `HotChocolate` 11.0.0+                                                                    | `HotChocolate`       |
| HttpClient / HttpMessageHandler | Intégré                                                                                  | `HttpMessageHandler` |
| IBM MQ                          | `amqmdnetstd` 9.0.0+                                                                      | `IbmMq`              |
| Kafka                           | `Confluent.Kafka` 1.4+                                                                    | `Kafka`              |
| MongoDB                         | `MongoDB.Driver.Core` 2.1.0+                                                              | `MongoDb`            |
| MSMQ                            | Intégré                                                                                  | `Msmq`               |
| MySql                           | `MySql.Data` 6.7.0+</br>`MySqlConnector` 0.61.0+                                          | `MySql`              |
| Oracle                          | `Oracle.ManagedDataAccess` 4.122.0+                                                       | `Oracle`             |
| PostgreSQL                      | `Npgsql` 4.0+                                                                             | `Npgsql`             |
| Processus                         | `"System.Diagnostics.Process"` 4.0+                                                       | `Process`            |
| RabbitMQ                        | `RabbitMQ.Client` 3.6.9+,                                                                 | `RabbitMQ`           |
| Redis (client ServiceStack)     | `ServiceStack.Redis` 4.0.48+                                                              | `ServiceStackRedis`  |
| Redis (client StackExchange)    | `StackExchange.Redis` 1.0.187+                                                            | `StackExchangeRedis` |
| SQLite                          | `System.Data.Sqlite` 2.0.0+ </br>`Microsoft.Data.Sqlite` 1.0.0+                           | `Sqlite`             |
| SQL Server                      | `System.Data` 4.0.0+</br>`System.Data.SqlClient` 4.0.0+</br>`Microsoft.Data.SqlClient` 1.0.0+  | `SqlClient`     |
| WCF (serveur)                    | Intégré                                                                                  | `Wcf`                |
| WebClient / WebRequest          | Intégré                                                                                  | `WebRequest`         |

Vos bibliothèques préférées ne sont pas disponibles ? Datadog élargit continuellement la liste des bibliothèques prises en charge. [Contactez l'équipe Datadog][6] pour obtenir de l'aide.

## Versions de l'Agent Datadog prises en charge

| **Version de l'Agent Datadog**   | **Version du package** |
|-----------------------------|---------------------|
| [7.x][7]                   | dernière              |
| [6.x][7]                   | dernière              |
| [5.x][8]                   | dernière              |

## Politique de prise en charge du runtime par APM pour .NET Framework

La solution APM Datadog pour .NET Framework dépend du système d'exploitation du host, du runtime .NET Framework, de certaines bibliothèques .NET Framework ainsi que de l'Agent et l'API Datadog. Ces systèmes logiciels tiers prennent en charge des versions spécifiques de .NET Framework. Lorsque le logiciel externe cesse de prendre en charge une version de .NET Framework, la prise en charge de cette version par APM pour .NET Framework s'arrête également.

### Niveaux de prise en charge

| **Niveau**                                              | **Prise en charge fournie**                                                                                                                                                          |
|--------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <span id="support-unsupported">Aucune prise en charge</span>      |  Aucune implémentation. [Contactez l'assistance clientèle pour toute demande spéciale.][9]                                                             |
| <span id="support-beta">Bêta</span>                    |  Implémentation initiale. Peut ne pas encore contenir toutes les fonctionnalités. La prise en charge des nouvelles fonctionnalités, les corrections de bugs et le déploiement de patchs de sécurité sont assurés dans la mesure du possible uniquement.                                    |
| <span id="support-ga">Disponibilité générale</span> |  Implémentation complète de toutes les fonctionnalités. Prise en charge totale des nouvelles fonctionnalités, des corrections de bugs et des patchs de sécurité.                                                                                    |
| <span id="support-maintenance">Maintenance</span>      |  Implémentation complète des fonctionnalités existantes. Aucune nouvelle fonctionnalité n'est ajoutée. Prise en charge des corrections de bugs et des patchs de sécurité uniquement.                                                              |
| <span id="support-eol">Fin de cycle de vie</span>        |  Aucune prise en charge.                                                                                                                                                                  |

### Gestion des versions du package

La solution APM pour .NET Framework de Datadog applique la [gestion sémantique des versions][10]. En cas de mise à jour, la prise en charge du runtime subit les modifications suivantes :

  - **Les mises à jour majeures** (par exemple, de `1.0.0` à `2.0.0`) peuvent modifier la prise en charge d'un runtime et la faire passer de [Bêta](#support-beta)/[Disponibilité générale](#support-ga) à [Maintenance](#support-maintenance)/[Fin de cycle de vie](#support-eol).
  - **Les mises à jour mineures** (par exemple, de `1.0.0` à `1.1.0`) ne réduisent pas le niveau de prise en charge d'un runtime, mais des runtimes supplémentaires peuvent être pris en charge.
  - **Les patchs** (par exemple, de `1.0.0` à `1.0.1`) n'affectent pas la prise en charge d'un runtime.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-dotnet
[2]: /fr/tracing/compatibility_requirements/dotnet-core/
[3]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v1.31.2
[4]: https://docs.microsoft.com/en-us/lifecycle/products/microsoft-net-framework
[5]: https://github.com/DataDog/dd-trace-dotnet/releases/latest
[6]: /fr/help/
[7]: /fr/agent/basic_agent_usage/?tab=agentv6v7
[8]: /fr/agent/basic_agent_usage/?tab=agentv5
[9]: https://www.datadoghq.com/support/
[10]: https://semver.org/