---
aliases:
- /es/tracing/compatibility_requirements/dotnet-framework
- /es/tracing/setup_overview/compatibility_requirements/dotnet-framework
code_lang: dotnet-framework
code_lang_weight: 80
description: Requisitos de compatibilidad para el .NET Tracer
further_reading:
- link: tracing/trace_collection/dd_libraries/dotnet-framework
  tag: Documentación
  text: Instrumente su aplicación
- link: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples
  tag: Código fuente
  text: Ejemplos de instrumentación personalizada
title: Requisitos de compatibilidad de .NET Framework
type: multi-code-lang
---
El .NET Tracer de Datadog admite todos los lenguajes basados en .NET (por ejemplo, C#, F#, Visual Basic).

El .NET Tracer es de código abierto. Para obtener más información, consulte el [repositorio de .NET Tracer][1].

## Entornos de ejecución de .NET Framework compatibles {#supported-net-framework-runtimes}

El .NET Tracer admite instrumentación automática y personalizada en las siguientes versiones de .NET Framework. También admite [.NET Core y .NET 5+][2]. El .NET Tracer no admite código que se ejecute en entornos de confianza parcial.

| Versión de .NET Framework  | Fin de vida útil de Microsoft | Nivel de soporte       | Versión del paquete            | Fin de vida útil de Datadog |
| ----------------------- | --------------------- | --------------------| -------------------------- | ------------------- |
| 4.8.1                   |                       | [GA](#support-ga)   | más reciente                     |                     |
| 4.8                     |                       | [GA](#support-ga)   | más reciente                     |                     |
| 4.7.2                   |                       | [GA](#support-ga)   | más reciente                     |                     |
| 4.7.1                   |                       | [GA](#support-ga)   | más reciente                     |                     |
| 4.7                     |                       | [GA](#support-ga)   | más reciente                     |                     |
| 4.6.2                   |                       | [GA](#support-ga)   | más reciente                     |                     |
| 4.6.1                   | 2022-04-26        | [GA](#support-ga)   | más reciente                     |                     |
| 4.6                     | 2022-04-26        | [EOL](#support-eol) | < 2.0.0 (p. ej., [1.31.2][3]) | 2022-04-26      |
| 4.5.2                   | 2022-04-26        | [EOL](#support-eol) | < 2.0.0 (p. ej., [1.31.2][3]) | 2022-04-26      |
| 4.5.1                   | 2016-01-12      | [EOL](#support-eol) | < 2.0.0 (p. ej., [1.31.2][3]) | 2022-04-26      |
| 4.5                     | 2016-01-12      | [EOL](#support-eol) | < 2.0.0 (p. ej., [1.31.2][3]) | 2022-04-26      |

Puede encontrar información adicional en la [Política de ciclo de vida de .NET Framework de Microsoft][4] y en la [política de soporte del tiempo de ejecución de .NET](#net-runtime-support-policy).

<div class="alert alert-info">Al decidir qué versión del SDK de Datadog utilizar para la instrumentación automática, utilice la versión de .NET Framework instalada en el servidor de aplicaciones. Por ejemplo, si compila su aplicación para que tenga como destino .NET Framework 4.5.1, pero la aplicación se ejecuta en un servidor que tiene instalado .NET Framework 4.8, utilice la versión más reciente del SDK. Para determinar qué versión de .NET Framework está instalada en una máquina, siga la <a href="https://docs.microsoft.com/en-us/dotnet/framework/migration-guide/how-to-determine-which-versions-are-installed">guía proporcionada por Microsoft</a>.
</div>

## Sistemas operativos compatibles {#supported-operating-systems}

El .NET Tracer admite la instrumentación automática de aplicaciones de .NET Framework en sistemas operativos Windows. Puede encontrar información adicional sobre los sistemas operativos compatibles con .NET Framework en los [requisitos del sistema de .NET Framework][12]

### Windows {#windows}

| Sistema operativo             | Versión      | Nivel de soporte       | Versión del paquete       |
| -----------------------------|--------------|---------------------|-----------------------|
| Windows Server               | 2012+        | [GA](#support-ga)   | más reciente                |
| Windows Client               | 8.1+         | [GA](#support-ga)   | más reciente                |
| Windows Server (x86)         | Todas las versiones | [EOL](#support-eol) | < 3.0.0 (p. ej., 2.48.0) |
| Windows Server               | < 2012       | [EOL](#support-eol) | < 3.0.0 (p. ej., 2.48.0) |

**Nota:** "Windows Server" incluye todas las ediciones y opciones de instalación:
- **Ediciones:** Datacenter, Standard, Essentials, etc.
- **Opciones de instalación:** Server Core, Server with Desktop Experience, Nano Server (solo imagen de contenedor)

La instrumentación de aplicaciones de 32 bits (x86) es compatible con Windows de 64 bits (x64). No se admite Windows en ARM64.

## Integrations {#integrations}

La [versión más reciente del .NET Tracer][5] puede instrumentar automáticamente las siguientes bibliotecas:

| Marco o biblioteca            | Paquete NuGet                                                                             | Nombre de la integración     |
| ------------------------------- | ----------------------------------------------------------------------------------------- | -------------------- |
| .NET Remoting                   | integrado                                                                                  | `Remoting`           |
| ADO.NET                         | Todas las integraciones de AdoNet                                                                   | `AdoNet`             |
| Aerospike                       | `Aerospike.Client` 4.0.0+                                                                 | `Aerospike`          |
| ASP.NET (incluido Web Forms)   | integrado                                                                                  | `AspNet`             |
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
| HttpClient / HttpMessageHandler | integrado                                                                                  | `HttpMessageHandler` |
| IBM MQ                          | `amqmdnetstd` 9.0.0+                                                                      | `IbmMq`              |
| Kafka                           | `Confluent.Kafka` 1.4+                                                                    | `Kafka`              |
| MongoDB                         | `MongoDB.Driver.Core` 2.1.0+                                                              | `MongoDb`            |
| MSMQ                            | integrado                                                                                  | `Msmq`               |
| MySql                           | `MySql.Data` 6.7.0+</br>`MySqlConnector` 0.61.0+                                          | `MySql`              |
| Oracle                          | `Oracle.ManagedDataAccess` 4.122.0+                                                       | `Oracle`             |
| PostgreSQL                      | `Npgsql` 4.0+                                                                             | `Npgsql`             |
| Process                         | integrado                                                                                  | `Process`            |
| RabbitMQ                        | `RabbitMQ.Client` 3.6.9+,                                                                 | `RabbitMQ`           |
| Redis (cliente de ServiceStack)     | `ServiceStack.Redis` 4.0.48+                                                              | `ServiceStackRedis`  |
| Redis (cliente StackExchange)    | `StackExchange.Redis` 1.0.187+                                                            | `StackExchangeRedis` |
| SQLite                          | `System.Data.Sqlite` 2.0.0+ </br>`Microsoft.Data.Sqlite` 1.0.0+                           | `Sqlite`             |
| SQL Server                      | `System.Data` 4.0.0+</br>`System.Data.SqlClient` 4.0.0+</br>`Microsoft.Data.SqlClient` 1.0.0+  | `SqlClient`     |
| WCF (servidor)                    | integrado                                                                                  | `Wcf`                |
| WebClient / WebRequest          | integrado                                                                                  | `WebRequest`         |

**Nota**: Redis 6.0+ admite autenticación en línea en comandos como `HELLO`, `MIGRATE` y `ACL SETUSER`.

  - **Datadog Trace Agent**: La versión mínima requerida y recomendada es `7.76.1` para garantizar que los parámetros de autenticación se ofusquen automáticamente en los metadatos de la traza.
  - **Datadog Lambda Extension** (entornos Serverless): La versión mínima requerida es `v28.0.0`.

¿No encuentra la biblioteca que busca? Primero, verifique si la biblioteca genera datos de observabilidad compatibles con OpenTelemetry (consulte [Uso de bibliotecas de instrumentación de OpenTelemetry][11] para obtener más detalles). Si no, Datadog continúa agregando soporte adicional. [Consulte con el equipo de Datadog][6] para obtener ayuda.

## Versiones de Datadog Agent compatibles {#supported-datadog-agent-versions}

| Versión de Datadog Agent | Versión del paquete |
|-----------------------|-----------------|
| [7.x][7]              | más reciente          |
| [6.x][7]              | más reciente          |
| [5.x][8]              | más reciente          |

## Política de soporte del tiempo de ejecución de .NET {#net-runtime-support-policy}

El .NET Tracer depende del sistema operativo del servidor, el tiempo de ejecución de .NET Framework, ciertas bibliotecas de .NET Framework y el Datadog Agent/API. Estos sistemas de software de terceros admiten versiones específicas de .NET Framework. Cuando el software externo ya no admite una versión de .NET Framework, el .NET Tracer también limita su soporte para esa versión.

### Niveles de soporte {#levels-of-support}

| **Nivel**                                              | **Soporte proporcionado**                                                                                                                                                          |
|--------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <span id="support-unsupported">Sin soporte</span>      |  Sin implementación. [Comuníquese con el soporte al cliente para solicitudes especiales.][9]                                                             |
| <span id="support-beta">Vista previa</span>                 |  Implementación inicial. Es posible que aún no contenga todas las funciones. El soporte para nuevas funciones, correcciones de errores y seguridad se proporciona en la medida de lo posible.                                    |
| <span id="support-ga">Disponibilidad general (GA)</span> |  Implementación completa de todas las funciones. Soporte completo para nuevas funciones, correcciones de errores y seguridad.                                                                                    |
| <span id="support-maintenance">Mantenimiento</span>      |  Implementación completa de las funciones existentes. No recibe nuevas funciones. Soporte solo para correcciones de errores y seguridad.                                                              |
| <span id="support-eol">Fin de vida útil (EOL)</span>        |  Sin soporte.                                                                                                                                                                  |

### Control de versiones de paquetes {#package-versioning}

Datadog APM para .NET Framework utiliza el [control de versiones semántico][10].
Las actualizaciones de versión implican los siguientes cambios en el soporte de tiempo de ejecución:

  - **Las actualizaciones de versión principal** (por ejemplo, de `1.0.0` a `2.0.0`) pueden cambiar el soporte para cualquier tiempo de ejecución de [Preview](#support-beta)/[GA](#support-ga) a [Maintenance](#support-maintenance)/[EOL](#support-eol).
  - **Las actualizaciones de versión menor** (por ejemplo, de `1.0.0` a `1.1.0`) no reducirán el nivel de soporte para un tiempo de ejecución, pero pueden agregar soporte para uno.
  - **Las actualizaciones de versión de parche** (por ejemplo, de `1.0.0` a `1.0.1`) no cambiarán el soporte para ningún tiempo de ejecución.

## Lecturas adicionales {#further-reading}

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
[11]: /es/opentelemetry/instrument/ddot_sdks/instrumentation_libraries/?tab=net
[12]: https://learn.microsoft.com/en-us/dotnet/framework/get-started/system-requirements