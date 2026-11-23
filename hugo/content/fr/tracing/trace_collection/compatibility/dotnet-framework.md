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
  tag: Code source
  text: Exemples d'instrumentation personnalisée
title: Exigences de compatibilité pour .NET Framework
type: multi-code-lang
---
Le traceur .NET de Datadog prend en charge tous les langages basés sur .NET (par exemple, C#, F#, Visual Basic).

Le traceur .NET est open source. Pour plus d'informations, consultez le [référentiel du traceur .NET][1].

## Runtimes .NET Framework pris en charge {#supported-net-framework-runtimes}

Le traceur .NET prend en charge l'instrumentation automatique et personnalisée sur les versions suivantes de .NET Framework. Il prend également en charge [.NET Core et .NET 5+][2]. Le traceur .NET ne prend pas en charge le code s'exécutant dans des environnements de confiance partielle.

| Version .NET Framework  | Fin de vie Microsoft | Niveau de support       | Version du package            | Fin de vie Datadog |
| ----------------------- | --------------------- | --------------------| -------------------------- | ------------------- |
| 4.8.1                   |                       | [GA](#support-ga)   | dernière version                     |                     |
| 4.8                     |                       | [GA](#support-ga)   | dernière version                     |                     |
| 4.7.2                   |                       | [GA](#support-ga)   | dernière version                     |                     |
| 4.7.1                   |                       | [GA](#support-ga)   | dernière version                     |                     |
| 4.7                     |                       | [GA](#support-ga)   | dernière version                     |                     |
| 4.6.2                   |                       | [GA](#support-ga)   | dernière version                     |                     |
| 4.6.1                   | 2022-04-26        | [GA](#support-ga)   | dernière version                     |                     |
| 4.6                     | 2022-04-26        | [EOL](#support-eol) | < 2.0.0 (par ex. [1.31.2][3]) | 2022-04-26      |
| 4.5.2                   | 2022-04-26        | [EOL](#support-eol) | < 2.0.0 (par ex. [1.31.2][3]) | 2022-04-26      |
| 4.5.1                   | 2016-01-12      | [EOL](#support-eol) | < 2.0.0 (par ex. [1.31.2][3]) | 2022-04-26      |
| 4.5                     | 2016-01-12      | [EOL](#support-eol) | < 2.0.0 (par ex. [1.31.2][3]) | 2022-04-26      |

Des informations supplémentaires sont disponibles dans la [politique de cycle de vie de .NET Framework de Microsoft][4] et dans la [politique de support du runtime .NET](#net-runtime-support-policy).

<div class="alert alert-info">Lorsque vous décidez quelle version du SDK Datadog utiliser pour l'instrumentation automatique, utilisez la version de .NET Framework installée sur le serveur d'application. Par exemple, si vous compilez votre application pour cibler .NET Framework 4.5.1, mais que l'application s'exécute sur un serveur sur lequel .NET Framework 4.8 est installé, utilisez la dernière version du SDK. Pour déterminer quelle version de .NET Framework est installée sur une machine, suivez les <a href="https://docs.microsoft.com/en-us/dotnet/framework/migration-guide/how-to-determine-which-versions-are-installed">conseils fournis par Microsoft</a>.
</div>

## Systèmes d'exploitation pris en charge {#supported-operating-systems}

Le traceur .NET prend en charge l'instrumentation automatique des applications .NET Framework sur les systèmes d'exploitation Windows. Des informations supplémentaires sur les systèmes d'exploitation pris en charge par .NET Framework sont disponibles dans les [exigences système de .NET Framework][12]

### Windows {#windows}

| Système d'exploitation             | Version      | Niveau de support       | Version du package       |
| -----------------------------|--------------|---------------------|-----------------------|
| Windows Server               | 2012+        | [GA](#support-ga)   | dernière version                |
| Windows Client               | 8.1+         | [GA](#support-ga)   | dernière version                |
| Windows Server (x86)         | Toutes les versions | [EOL](#support-eol) | < 3.0.0 (par ex. 2.48.0) |
| Windows Server               | < 2012       | [EOL](#support-eol) | < 3.0.0 (par ex. 2.48.0) |

**Remarque :** « Windows Server » inclut toutes les éditions et options d'installation :
- **Éditions :** Datacenter, Standard, Essentials, etc.
- **Options d'installation :** Server Core, Server with Desktop Experience, Nano Server (image de conteneur uniquement)

L'instrumentation d'applications 32 bits (x86) est prise en charge sur Windows 64 bits (x64). Windows sur ARM64 n'est pas pris en charge.

## Intégrations {#integrations}

La [dernière version du traceur .NET][5] peut instrumenter automatiquement les bibliothèques suivantes :

| Framework ou bibliothèque            | Package NuGet                                                                             | Nom de l'intégration     |
| ------------------------------- | ----------------------------------------------------------------------------------------- | -------------------- |
| .NET Remoting                   | intégré                                                                                  | `Remoting`           |
| ADO.NET                         | Toutes les intégrations AdoNet                                                                   | `AdoNet`             |
| Aerospike                       | `Aerospike.Client` 4.0.0+                                                                 | `Aerospike`          |
| ASP.NET (y compris Web Forms)   | intégré                                                                                  | `AspNet`             |
| ASP.NET MVC                     | `Microsoft.AspNet.Mvc` 4.0+                                                               | `AspNetMvc`          |
| ASP.NET Web API 2               | `Microsoft.AspNet.WebApi` 5.1+                                                            | `AspNetWebApi2`      |
| Amazon DynamoDB                 | `AWSSDK.DynamoDBv2`  3.0+                                                                 | `AwsDynamoDb`        |
| Amazon Kinesis                  | `AWSSDK.Kinesis`  3.0+                                                                    | `AwsKinesis`         |
| Amazon SNS                      | `AWSSDK.SNS`  3.0+                                                                        | `AwsSns`             |
| Amazon SQS                      | `AWSSDK.SQS`  3.0+                                                                        | `AwsSqs`             |
| Azure Cosmos DB                 | `Microsoft.Azure.Cosmos` 3.6.0+                                                           | `CosmosDb`           |
| Couchbase                       | `CouchbaseNetClient` 2.2.8+                                                               | `Couchbase`          |
| Elasticsearch                   | `Elasticsearch.Net` 5.3.0+                                                                | `ElasticsearchNet`   |
| GraphQL .NET                    | `GraphQL` 2.3.0+                                                                          | `GraphQL`            |
| gRPC                            | `Grpc.Core` 2.3.0+                                                                        | `Grpc`               |
| HotChocolate                    | `HotChocolate` 11.0.0+                                                                    | `HotChocolate`       |
| HttpClient / HttpMessageHandler | intégré                                                                                  | `HttpMessageHandler` |
| IBM MQ                          | `amqmdnetstd` 9.0.0+                                                                      | `IbmMq`              |
| Kafka                           | `Confluent.Kafka` 1.4+                                                                    | `Kafka`              |
| MongoDB                         | `MongoDB.Driver.Core` 2.1.0+                                                              | `MongoDb`            |
| MSMQ                            | intégré                                                                                  | `Msmq`               |
| MySql                           | `MySql.Data` 6.7.0+</br>`MySqlConnector` 0.61.0+                                          | `MySql`              |
| Oracle                          | `Oracle.ManagedDataAccess` 4.122.0+                                                       | `Oracle`             |
| PostgreSQL                      | `Npgsql` 4.0+                                                                             | `Npgsql`             |
| Process                         | intégré                                                                                  | `Process`            |
| RabbitMQ                        | `RabbitMQ.Client` 3.6.9+,                                                                 | `RabbitMQ`           |
| Redis (client ServiceStack)     | `ServiceStack.Redis` 4.0.48+                                                              | `ServiceStackRedis`  |
| Redis (client StackExchange)    | `StackExchange.Redis` 1.0.187+                                                            | `StackExchangeRedis` |
| SQLite                          | `System.Data.Sqlite` 2.0.0+ </br>`Microsoft.Data.Sqlite` 1.0.0+                           | `Sqlite`             |
| SQL Server                      | `System.Data` 4.0.0+</br>`System.Data.SqlClient` 4.0.0+</br>`Microsoft.Data.SqlClient` 1.0.0+  | `SqlClient`     |
| WCF (serveur)                    | intégré                                                                                  | `Wcf`                |
| WebClient / WebRequest          | intégré                                                                                  | `WebRequest`         |

**Remarque** : Redis 6.0+ prend en charge l'authentification intégrée aux commandes telles que `HELLO`, `MIGRATE` et `ACL SETUSER`.

  - **Datadog Trace Agent** : La version minimale requise et recommandée est `7.76.1` pour garantir que les paramètres d'authentification sont automatiquement masqués dans les métadonnées de trace.
  - **Datadog Lambda Extension** (environnements Serverless) : La version minimale requise est `v28.0.0`.

Vous ne voyez pas la bibliothèque que vous cherchez ? Tout d'abord, vérifiez si la bibliothèque produit des données d'observabilité compatibles avec OpenTelemetry (voir [Utilisation des bibliothèques d'instrumentation OpenTelemetry][11] pour plus de détails). Si ce n'est pas le cas, Datadog étend constamment sa prise en charge. [Consultez l'équipe Datadog][6] pour obtenir de l'aide.

## Versions de Datadog Agent prises en charge {#supported-datadog-agent-versions}

| Version de Datadog Agent | Version du package |
|-----------------------|-----------------|
| [7.x][7]              | la plus récente          |
| [6.x][7]              | la plus récente          |
| [5.x][8]              | la plus récente          |

## Politique de prise en charge du runtime .NET {#net-runtime-support-policy}

Le traceur .NET dépend du système d'exploitation du host, du runtime .NET Framework, de certaines bibliothèques .NET Framework et de Datadog Agent/API. Ces systèmes logiciels tiers prennent en charge des versions spécifiques de .NET Framework. Lorsque le logiciel externe ne prend plus en charge une version de .NET Framework, le traceur .NET limite également sa prise en charge pour cette version.

### Niveaux de prise en charge {#levels-of-support}

| **Niveau**                                              | **Prise en charge fournie**                                                                                                                                                          |
|--------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <span id="support-unsupported">Non pris en charge</span>      |  Aucune implémentation. [Contactez le support client pour les demandes spéciales.][9]                                                             |
| <span id="support-beta">Preview</span>                 |  Implémentation initiale. Peut ne pas encore contenir toutes les fonctionnalités. La prise en charge des nouvelles fonctionnalités ainsi que des correctifs de bugs et de sécurité est assurée dans la mesure du possible.                                    |
| <span id="support-ga">Disponibilité générale (GA)</span> |  Implémentation complète de toutes les fonctionnalités. Prise en charge complète des nouvelles fonctionnalités ainsi que des correctifs de bugs et de sécurité.                                                                                    |
| <span id="support-maintenance">Maintenance</span>      |  Implémentation complète des fonctionnalités existantes. Ne reçoit pas de nouvelles fonctionnalités. Prise en charge des correctifs de bugs et de sécurité uniquement.                                                              |
| <span id="support-eol">Fin de vie (EOL)</span>        |  Aucune prise en charge.                                                                                                                                                                  |

### Gestion des versions des packages {#package-versioning}

Datadog APM pour .NET Framework pratique la [gestion sémantique des versions][10].
Les mises à jour de version impliquent les changements suivants concernant la prise en charge du runtime :

  - **Les mises à jour de version majeure** (par exemple de `1.0.0` à `2.0.0`) peuvent modifier la prise en charge de tout runtime, passant de [Preview](#support-beta)/[GA](#support-ga) à [Maintenance](#support-maintenance)/[EOL](#support-eol).
  - **Les mises à jour de version mineure** (par exemple de `1.0.0` à `1.1.0`) ne réduiront pas le niveau de prise en charge d'un runtime, mais pourront ajouter la prise en charge d'un runtime.
  - **Les mises à jour de version de correctif** (par exemple de `1.0.0` à `1.0.1`) ne modifieront pas la prise en charge d'un runtime.

## Pour aller plus loin {#further-reading}

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
[11]: /fr/opentelemetry/instrument/ddot_sdks/instrumentation_libraries/?tab=net
[12]: https://learn.microsoft.com/en-us/dotnet/framework/get-started/system-requirements