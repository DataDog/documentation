---
aliases:
- /es/tracing/compatibility_requirements/dotnet-framework
- /es/tracing/setup_overview/compatibility_requirements/dotnet-framework
code_lang: dotnet-framework
code_lang_weight: 80
description: Requisitos de compatibilidad para el rastreador .NET
further_reading:
- link: tracing/trace_collection/dd_libraries/dotnet-framework
  tag: Documentación
  text: Instrumentar tu aplicación
- link: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples
  tag: Código fuente
  text: Ejemplos de instrumentación personalizada
title: Requisitos de compatibilidad con .NET Framework
type: multi-code-lang
---


El rastreador Datadog .NET es compatible con todos los lenguajes basados en .NET (por ejemplo, C#, F#, Visual Basic).

El rastreador .NET es de código abierto. Para más información, consulta el [repositorio del rastreador .NET][1].

## Tiempos de ejecución de .NET Framework compatibles

El rastreador .NET es compatible con la instrumentación automática y personalizada en las siguientes versiones de .NET Framework. También admite [.NET Core y .NET 5+][2]. El rastreador .NET no admite código que se ejecute en entornos de confianza parcial.

| Versión de .NET Framework  | Fin del soporte de Microsoft | Nivel de compatibilidad                       | Versión del paquete            | Fin del soporte de Datadog |
| ----------------------- | --------------------- | ----------------------------------- | -------------------------- | ------------------- |
| 4.8.1                   |                       | [Disponible para el público en general](#support-ga)                   | Última versión                     |                     |
| 4.8                     |                       | [Disponible para el público en general](#support-ga)                   | Última versión                     |                     |
| 4.7.2                   |                       | [Disponible para el público en general](#support-ga)                   | Última versión                     |                     |
| 4.7                     |                       | [Disponible para el público en general](#support-ga)                   | Última versión                     |                     |
| 4.6.2                   |                       | [Disponible para el público en general](#support-ga)                   | Última versión                     |                     |
| 4.6.1                   | 04/26/2022            | [Disponible para el público en general](#support-ga)                   | Última versión                     |                     |
| 4.6                     | 04/26/2022            | [Fin del soporte (EOL)](#support-eol)                 | < 2.0.0 (por ejemplo, [1.31.2][3]) | 04/26/2022          |
| 4.5.2                   | 04/26/2022            | [Fin del soporte (EOL)](#support-eol)                 | < 2.0.0 (por ejemplo, [1.31.2][3]) | 04/26/2022          |
| 4.5.1                   | 01/12/2016            | [Fin del soporte (EOL)](#support-eol)                 | < 2.0.0 (por ejemplo, [1.31.2][3]) | 04/26/2022          |
| 4.5                     | 01/12/2016            | [Fin del soporte (EOL)](#support-eol)                 | < 2.0.0 (por ejemplo, [1.31.2][3]) | 04/26/2022          |

Puedes encontrar información adicional en [la política de ciclo de vida de .NET Framework de Microsoft][4] y en [la política de compatibilidad del tiempo de ejecución de .NET](#net-runtime-support-policy).

<div class="alert alert-info">
  <div class="alert-info"><b>Nota:</b> A la hora de decidir qué versión del rastreador utilizar para una instrumentación automática, utiliza la versión de .NET Framework instalada en el servidor de aplicaciones. Por ejemplo, si compilas tu aplicación para que apunte a .NET Framework 4.5.1, pero la aplicación se ejecuta en un servidor que tiene instalado .NET Framework 4.8, utiliza la última versión del rastreador. Para determinar qué versión de .NET Framework está instalada en un equipo, sigue las <a href="https://docs.microsoft.com/en-us/dotnet/framework/migration-guide/how-to-determine-which-versions-are-installed">directrices proporcionadas por Microsoft</a>.
  </div>
</div>

## Arquitecturas de procesador compatibles

El rastreador de .NET es compatible con la instrumentación automática en las siguientes arquitecturas:

| Arquitecturas de procesadores                                                 | Nivel de compatibilidad         | Versión del paquete                        |
| ------------------------------------------------------------------------|-----------------------|----------------------------------------|
| Windows x86 (`win-x86`)                                                 | [Disponible para el público en general](#support-ga)     | Última versión                                 |
| Windows x64 (`win-x64`)                                                 | [Disponible para el público en general](#support-ga)     | Última versión                                 |

## Integraciones

La [última versión del rastreador .NET][5] puede instrumentar automáticamente las siguientes bibliotecas:

| Marco o biblioteca            | Paquete NuGet                                                                             | Nombre de la integración     |
| ------------------------------- | ----------------------------------------------------------------------------------------- | -------------------- |
| .NET Remoting                   | Integrado                                                                                  | `Remoting`           |
| ADO.NET                         | Todas las integraciones de AdoNet                                                                   | `AdoNet`             |
| Aerospike                       | `Aerospike.Client` 4.0.0+                                                                 | `Aerospike`          |
| ASP.NET (incluidos los formularios web)   | Integrado                                                                                  | `AspNet`             |
| ASP.NET MVC                     | `Microsoft.AspNet.Mvc` 4.0+                                                               | `AspNetMvc`          |
| API Web ASP.NET 2               | `Microsoft.AspNet.WebApi` 5.1+                                                            | `AspNetWebApi2`      |
| Amazon DynamoDB                 | `AWSSDK.DynamoDBv2` 3.0+                                                                 | `AwsDynamoDb`        |
| Amazon Kinesis                  | `AWSSDK.Kinesis` 3.0+                                                                    | `AwsKinesis`         |
| Amazon SNS                      | `AWSSDK.SNS` 3.0+                                                                        | `AwsSns`             |
| Amazon SQS                      | `AWSSDK.SQS` 3.0+                                                                        | `AwsSqs`             |
| CosmosDb                        | `Microsoft.Azure.Cosmos` 3.6.0+                                                    | `CosmosDb`           |
| Couchbase                       | `CouchbaseNetClient` 2.2.8+                                                               | `Couchbase`          |
| Elasticsearch                   | `Elasticsearch.Net` 5.3.0+                                                                | `ElasticsearchNet`   |
| GraphQL .NET                    | `GraphQL` 2.3.0+                                                                          | `GraphQL`            |
| gRPC                            | `Grpc.Core` 2.3.0+                                                                        | `Grpc`               |
| HotChocolate                    | `HotChocolate` 11.0.0+                                                                    | `HotChocolate`       |
| HttpClient/HttpMessageHandler | Integrado                                                                                  | `HttpMessageHandler` |
| IBM MQ                          | `amqmdnetstd` 9.0.0+                                                                      | `IbmMq`              |
| Kafka                           | `Confluent.Kafka` 1.4+                                                                    | `Kafka`              |
| MongoDB                         | `MongoDB.Driver.Core` 2.1.0+                                                              | `MongoDb`            |
| MSMQ                            | Integrado                                                                                  | `Msmq`               |
| MySql                           | `MySql.Data` 6.7.0+</br>`MySqlConnector` 0.61.0+                                          | `MySql`              |
| Oracle                          | `Oracle.ManagedDataAccess` 4.122.0+                                                       | `Oracle`             |
| PostgreSQL                      | `Npgsql` 4.0+                                                                             | `Npgsql`             |
| Process                         | `"System.Diagnostics.Process"` 4.0+                                                       | `Process`            |
| RabbitMQ                        | `RabbitMQ.Client` 3.6.9+,                                                                 | `RabbitMQ`           |
| Redis (cliente de ServiceStack)     | `ServiceStack.Redis` 4.0.48+                                                              | `ServiceStackRedis`  |
| Redis (cliente de StackExchange)    | `StackExchange.Redis` 1.0.187+                                                            | `StackExchangeRedis` |
| SQLite                          | `System.Data.Sqlite` 2.0.0+ </br>`Microsoft.Data.Sqlite` 1.0.0+                           | `Sqlite`             |
| SQL Server                      | `System.Data` 4.0.0+</br>`System.Data.SqlClient` 4.0.0+</br>`Microsoft.Data.SqlClient` 1.0.0+  | `SqlClient`     |
| WCF (servidor)                    | Integrado                                                                                  | `Wcf`                |
| WebClient/WebRequest          | Integrado                                                                                  | `WebRequest`         |

¿No ves la biblioteca que buscas? En primer lugar, comprueba si la biblioteca produce datos de observabilidad compatibles con OpenTelemetry (por ejemplo, [rastreo basado en actividad][11]). Si no es así, Datadog añade continuamente compatibilidad adicional. [Consulta al equipo de Datadog ][6] para obtener ayuda.

## Integraciones basadas en OpenTelemetry

Algunas bibliotecas proporcionan [Rastreo basado en actividad][11] integrado. Este es el mismo mecanismo en el que se basa OpenTelemetry.

Para estas bibliotecas, establece `DD_TRACE_OTEL_ENABLED` en `true`, y el rastreador .NET capturará automáticamente sus trazas. Esto es compatible desde la [versión 2.21.0][4].

La siguiente lista de bibliotecas se han probado con esta configuración:

| Marco o biblioteca            | Paquete NuGet                                                                 | Nombre de la integración     | Instrucciones específicas         |
| ------------------------------- | ----------------------------------------------------------------------------- | -------------------- | ----------------------------- |
| Azure Service Bus               | `Azure.Messaging.ServiceBus` 7.14.0+                                          | `AzureServiceBus`    | Consulta la sección `Azure SDK`  |

### SDK de Azure

El SDK de Azure proporciona soporte integrado para OpenTelemetry. Actívalo al establecer la variable de entorno `AZURE_EXPERIMENTAL_ENABLE_ACTIVITY_SOURCE` en `true` o al establecer el conmutador de contexto `Azure.Experimental.EnableActivitySource` en `true` en el código de tu aplicación. Consulta la [documentación del SDK de Azure][12] para obtener más detalles.

## Versiones compatibles del Datadog Agent 

| **Versión del Datadog Agent**   | **Versión del paquete** |
|-----------------------------|---------------------|
| [7.x][7]                    | Última versión              |
| [6.x][7]                    | Última versión              |
| [5.x][8]                    | Última versión              |

## Política de compatibilidad del tiempo de ejecución de .NET

El rastreador .NET depende del sistema operativo del host, del tiempo de ejecución de .NET Framework, de determinadas bibliotecas de .NET Framework, y del Datadog Agent/API. Estos sistemas de software de terceros son compatibles con versiones específicas de .NET Framework. Cuando el software externo deja de ser compatible con una versión de .NET Framework, el rastreador .NET también limita su compatibilidad con esa versión.

### Niveles de compatibilidad

| **Nivel**                                              | **Compatibilidad dada**                                                                                                                                                          |
|--------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <span id="support-unsupported">No compatible</span>      |  Sin implementación. [Para solicitudes especiales, contacta con el servicio de atención al cliente][9].                                                             |
| <span id="support-beta">Fase beta</span>                    |  Implementación inicial. Puede que aún no contenga todas las funciones. La compatibilidad de nuevas funciones y correcciones de errores y de seguridad se proporciona en la medida de lo posible.                                    |
| <span id="support-ga">Disponible para el público en general (GA)</span> |  Implementación completa de todas las funciones. Compatibilidad completa para nuevas funciones, correcciones de errores y seguridad.                                                                                    |
| <span id="support-maintenance">Mantenimiento</span>      |  Implementación completa de las funciones existentes. No recibe nuevas funciones. Compatible solo con las correcciones de errores y seguridad.                                                              |
| <span id="support-eol">Fin del soporte (EOL)</span>        |  Sin compatibilidad.                                                                                                                                                                  |

### Versionado del paquete

Datadog APM para .NET Framework practica el [versionado semántico][10].
Las actualizaciones de versión implican los siguientes cambios en la compatibilidad del tiempo de ejecución:

  - **Las actualizaciones de versiones principales** (por ejemplo, de `1.0.0` a `2.0.0`) pueden cambiar la compatibilidad para cualquier tiempo de ejecución de [Fase beta](#support-beta)/[Disponible para el público en general](#support-ga) a [Mantenimiento](#support-maintenance)/[Fin del soporte](#support-eol).
  - **Las actualizaciones de versiones secundarias** (por ejemplo, de `1.0.0` a `1.1.0`) no reducirán el nivel de compatibilidad con un tiempo de ejecución, pero pueden añadir compatibilidad con otros.
  - **Las actualizaciones de la versión del parche** (por ejemplo, de `1.0.0` a `1.0.1`) no modificarán la compatibilidad con ningún tiempo de ejecución.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-dotnet
[2]: /es/tracing/compatibility_requirements/dotnet-core/
[3]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v1.31.2
[4]: https://docs.microsoft.com/en-us/lifecycle/products/microsoft-net-framework
[5]: https://github.com/DataDog/dd-trace-dotnet/releases/latest
[6]: /es/help/
[7]: /es/agent/basic_agent_usage/?tab=agentv6v7
[8]: /es/agent/basic_agent_usage/?tab=agentv5
[9]: https://www.datadoghq.com/support/
[10]: https://semver.org/
[11]: https://learn.microsoft.com/en-us/dotnet/core/diagnostics/distributed-tracing
[12]: https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/core/Azure.Core/samples/Diagnostics.md#enabling-experimental-tracing-features