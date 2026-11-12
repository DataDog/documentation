---
aliases:
- /es/tracing/compatibility_requirements/dotnet-core
- /es/tracing/setup_overview/compatibility_requirements/dotnet-core
code_lang: dotnet-core
code_lang_weight: 70
description: Requisitos de compatibilidad de .NET Tracer
further_reading:
- link: tracing/trace_collection/dd_libraries/dotnet-core
  tag: Documentación
  text: Instrumente su aplicación
- link: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples
  tag: Código fuente
  text: Ejemplos de instrumentación personalizada
- link: https://www.datadoghq.com/blog/asp-dotnet-core-monitoring/
  tag: Blog
  text: Monitoree aplicaciones de ASP.NET Core en contenedores
title: Requisitos de compatibilidad de .NET y .NET Core
type: multi-code-lang
---
El .NET Tracer de Datadog admite todos los lenguajes basados en .NET (por ejemplo, C#, F#, Visual Basic). Tiene [compatibilidad preliminar con aplicaciones con código no utilizado eliminado][12].

El .NET Tracer es de código abierto. Para obtener más información, consulte el [repositorio de .NET Tracer][1].

## Runtimes de .NET y .NET Core compatibles {#supported-net-and-net-core-runtimes}

El .NET Tracer admite la instrumentación automática en las siguientes versiones de .NET y .NET Core. También admite [.NET Framework][2].

| Versión de .NET         | Fin de vida útil de Microsoft | Nivel de soporte        | Versión del paquete      |
| -------------------- | --------------------- | -------------------- | -------------------- |
| .NET 10              | _2028-11-14_   | [GA](#support-ga)    | más reciente (>= 3.31.0)   |
| .NET 9               | _2026-11-10_   | [GA](#support-ga)    | más reciente (>= 3.6.0)    |
| .NET 8               | _2026-11-10_   | [GA](#support-ga)    | más reciente (>= 2.42.0)   |
| .NET 7               | 2024-05-14          | [GA](#support-ga)    | más reciente (>= 2.20.0)   |
| .NET 6               | 2024-11-12     | [GA](#support-ga)    | más reciente (>= 2.0.0)    |
| .NET 5               | 2022-05-10          | [GA](#support-ga)    | más reciente (>= 2.0.0)    |
| .NET Core 3.1        | 2022-12-13     | [GA](#support-ga)    | más reciente               |
| .NET Core 3.0        | 2020-03-03         | [EOL](#support-eol)  | No recomendado      |
| .NET Core 2.2        | 2019-12-23     | [EOL](#support-eol)  | No recomendado      |
| .NET Core 2.1        | 2021-08-21       | [EOL](#support-eol)  | No recomendado      |
| .NET Core 2.0        | 2018-10-01       | [EOL](#support-eol)  | No recomendado      |

Puede encontrar información adicional en la [Política de ciclo de vida de .NET y .NET Core de Microsoft][3], [Versiones de tiempo de ejecución de .NET al final de su vida útil](#end-of-life-net-runtime-versions) y [política de soporte de tiempo de ejecución de .NET](#net-runtime-support-policy).

## Sistemas operativos compatibles {#supported-operating-systems}

El .NET Tracer admite la instrumentación automática de aplicaciones de .NET y .NET Core en sistemas operativos Windows y Linux. Es compatible con macOS solo para CI Test Optimization. Puede encontrar información adicional sobre los sistemas operativos compatibles con .NET y .NET Core en las [notas de la versión de .NET][19]

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

La instrumentación de aplicaciones de 32 bits (x86) es compatible con Windows de 64 bits (x64). Windows en ARM64 no es compatible.

### Linux {#linux}

El .NET Tracer admite distribuciones de Linux en la medida de lo posible, según la compatibilidad con la versión mínima de libc:

- x64: [glibc][20] 2.17 (de CentOS 7)
- arm64: [glibc][20] 2.23 (de Debian 10)
- Alpine x64: [musl][21] 1.2.2 (de Alpine 3.14)
- Alpine arm64: [musl][21] 1.2.4 (de Alpine 3.18)

| Sistema operativo         | Versión | Arquitecturas | Nivel de soporte                         | Versión del paquete                 |
| -------------------------|---------|---------------|---------------------------------------|---------------------------------|
| Alpine Linux (x64)       | 3.14+   |  x64          | [GA](#support-ga)                     | más reciente (solo .NET 5+, v1.27.0+) |
| Alpine Linux (arm64)     | 3.18+   |  arm64        | [GA](#support-ga)                     | más reciente (solo .NET 6+, v3.2.0+)  |
| CentOS Linux             | 7+      |  x64          | [Mantenimiento](#support-maintenance)   | más reciente (fin de vida útil en v4.0.0)          |
| CentOS Stream Linux      | 8       |  x64          | [Mantenimiento](#support-maintenance)   | más reciente (fin de vida útil en v4.0.0)          |
| Debian                   | 10+     |  x64, arm64   | [GA](#support-ga)                     | más reciente                          |
| Fedora                   | 29+     |  x64          | [GA](#support-ga)                     | más reciente                          |
| openSUSE                 | 15+     |  x64          | [GA](#support-ga)                     | más reciente                          |
| Red Hat Enterprise Linux | 7+      |  x64          | [GA](#support-ga)                     | más reciente                          |
| Ubuntu                   | 18.04+  |  x64, arm64   | [GA](#support-ga)                     | más reciente                          |

### macOS {#macos}

El .NET Tracer admite macOS solo para CI Test Optimization.

| Sistema operativo         | Versión | Arquitecturas | Nivel de soporte           | Versión del paquete            |
| -------------------------|---------|---------------|-------------------------|----------------------------|
| macOS                    | 14.0+   |  x64, arm64   | [GA](#support-ga)       | más reciente                     |
| macOS                    | 11.0    |  x64          | [EOL](#support-eol)     | < 3.0.0                    |
| macOS                    | 11.0    |  arm64        | [EOL](#support-eol)     | < 3.0.0 (Agregado en 2.20.0)  |

## Integrations {#integrations}

La [versión más reciente del .NET Tracer][4] puede instrumentar automáticamente las siguientes bibliotecas:

| Marco de trabajo o biblioteca            | Paquete NuGet                                                                                        | Nombre de la integración     |
| ------------------------------- | ---------------------------------------------------------------------------------------------------- | -------------------- |
| ADO.NET                         | Todas las integraciones de AdoNet                                                                              | `AdoNet`             |
| Aerospike                       | `Aerospike.Client` 4.0.0+                                                                            | `Aerospike`          |
| ASP.NET Core                    | `Microsoft.AspNetCore`</br>`Microsoft.AspNetCore.App`</br>2.0+ y 3.0+                              | `AspNetCore`         |
| Azure Functions                 | `Microsoft.Azure.Webjobs` 3.0+                                                                       | `AzureFunctions`     |
| Amazon DynamoDB                 | `AWSSDK.DynamoDBv2`  3.0+                                                                            | `AwsDynamoDb`        |
| Amazon Kinesis                  | `AWSSDK.Kinesis`  3.0+                                                                               | `AwsKinesis`         |
| Amazon SNS                      | `AWSSDK.SNS`  3.0+                                                                                   | `AwsSns`             |
| Amazon SQS                      | `AWSSDK.SQS`  3.0+                                                                                   | `AwsSqs`             |
| Azure Cosmos DB                 | `Microsoft.Azure.Cosmos` 3.6.0+                                                                      | `CosmosDb`           |
| Azure Event Hubs                | `Azure.Messaging.EventHubs` 5.9.2+                                                                   | `AzureEventHubs`     |
| Azure Service Bus               | `Azure.Messaging.ServiceBus` 7.14+                                                                   | `AzureServiceBus`    |
| Couchbase                       | `CouchbaseNetClient` 2.2.8+                                                                          | `Couchbase`          |
| Elasticsearch                   | `Elasticsearch.Net` 5.3.0+                                                                           | `ElasticsearchNet`   |
| GraphQL .NET                    | `GraphQL` 2.3.0+                                                                                     | `GraphQL`            |
| gRPC                            | `Grpc.Net.Client`2.30.0+ (solo .NET Core 3.0+)</br>`Grpc.Core` 2.30.0+</br>`Grpc.AspNetCore` 2.30.0+ | `Grpc`               |
| HotChocolate                    | `HotChocolate` 11.0.0+                                                                               | `HotChocolate`       |
| HttpClient / HttpMessageHandler | `System.Net.Http` 4.0+                                                                               | `HttpMessageHandler` |
| Kafka                           | `Confluent.Kafka` 1.4+                                                                               | `Kafka`              |
| IBM MQ                          | `amqmdnetstd` 9.0.0+                                                                                 | `IbmMq`              |
| MongoDB                         | `MongoDB.Driver.Core` 2.1.0+                                                                         | `MongoDb`            |
| MySql                           | `MySql.Data` 6.7.0+</br>`MySqlConnector` 0.61.0+                                                     | `MySql`              |
| Oracle                          | `Oracle.ManagedDataAccess` 4.122.0+                                                                  | `Oracle`             |
| PostgreSQL                      | `Npgsql` 4.0+                                                                                        | `Npgsql`             |
| Process                         | `System.Diagnostics.Process` 4.0+                                                                    | `Process`            |
| RabbitMQ                        | `RabbitMQ.Client` 3.6.9+ .                                                                           | `RabbitMQ`           |
| Redis (cliente de ServiceStack)     | `ServiceStack.Redis` 4.0.48+                                                                         | `ServiceStackRedis`  |
| Redis (cliente StackExchange)    | `StackExchange.Redis` 1.0.187+                                                                       | `StackExchangeRedis` |
| Service Fabric Remoting         | `Microsoft.ServiceFabric.Services.Remoting` 4.0.470+                                                 | `ServiceRemoting`    |
| SQLite                          | `System.Data.Sqlite` 2.0.0+ </br>`Microsoft.Data.Sqlite` 1.0.0+                                      | `Sqlite`             |
| SQL Server                      | `System.Data` 4.0.0+</br>`System.Data.SqlClient` 4.0.0+</br>`Microsoft.Data.SqlClient` 1.0.0+        | `SqlClient`          |
| WebClient / WebRequest          | `System.Net.Requests` 4.0+                                                                           | `WebRequest`         |

**Nota**: Redis 6.0+ admite autenticación en línea en comandos como `HELLO`, `MIGRATE` y `ACL SETUSER`.

  - **Datadog Trace Agent**: La versión mínima requerida y recomendada es `7.76.1` para garantizar que los parámetros de autenticación se ofusquen automáticamente en los metadatos de la traza.
  - **Datadog Lambda Extension** (entornos Serverless): La versión mínima requerida es `v28.0.0`.

¿No encuentra la biblioteca que busca? Primero, verifique si la biblioteca genera datos de observabilidad compatibles con OpenTelemetry (consulte [Uso de bibliotecas de instrumentación de OpenTelemetry][13] para obtener más detalles). Si no es así, Datadog continúa agregando soporte adicional. [Consulte al equipo de Datadog][5] para obtener ayuda.

## Versiones de tiempo de ejecución de .NET al final de su vida útil {#end-of-life-net-runtime-versions}

El .NET Tracer funciona en .NET Core 2.0, 2.1, 2.2, 3.0 y 3.1, y en .NET 5 y 7, pero estas versiones llegaron al final de su vida útil y ya no cuentan con soporte de Microsoft. Consulte la [política de soporte de Microsoft][3] para obtener más detalles. Datadog recomienda usar la versión de parche más reciente de .NET 6 o .NET 8. Las versiones anteriores de .NET y .NET Core pueden presentar los siguientes problemas de tiempo de ejecución al habilitar la instrumentación automática:

| Problema                                                                          | Versiones de .NET afectadas                                   | Solución                                                                           | Más información                        |
|--------------------------------------------------------------------------------|----------------------------------------------------------|------------------------------------------------------------------------------------|-----------------------------------------|
| Error del compilador JIT en Linux/x64                                                  | 2.0.x,</br>2.1.0-2.1.11,</br>2.2.0-2.2.5                 | Actualice .NET Core a la versión de parche más reciente o siga los pasos indicados en el informe de error enlazado | [DataDog/dd-trace-dotnet/issues/302][6] |
| Error de búsqueda de recursos con una configuración regional distinta de `en-US` locale                                  | 2.0.0                                                    | Actualice .NET Core a la versión 2.0.3 o posterior                                                | [dotnet/runtime/issues/23938][7]        |
| Error del compilador JIT que provoca un bloqueo al finalizar                                     | 2.0.0-2.2.x                                              | Actualice .NET Core a la versión 3.1.0 o posterior                                                | [dotnet/runtime/pull/11885][15]         |
| Error del compilador JIT                                                               | 2.x, 3.x, 5.x, 6.x, 7.x, 8.0.0-8.0.5                     | Actualice .NET a 8.0.6 o superior                                                     | [dotnet/runtime/pull/73760][16]         |
| Error del compilador JIT                                                               | Todas las versiones de .NET                                     | Actualmente no hay ninguna solución alternativa                                                              | [dotnet/runtime/issues/85777][17]       |
| Error del tiempo de ejecución de .NET que provoca bloqueos cuando se usa con métricas de tiempo de ejecución | 6.0.0-6.0.10 | Actualice .NET a la versión 6.0.11 o superior, o deshabilite las métricas de tiempo de ejecución | [dotnet/runtime/pull/76431][18]                                                    |                                         |
| Error del compilador JIT que provoca bloqueos                                               | 2.x, 3.x, 5.x, 6.x, 7.x, 8.x                             | Actualice .NET a 9.0.0 o superior                                                     | [dotnet/runtime/pull/95653][22]         |
| Error del compilador JIT que provoca bloqueos                                               | 2.x, 3.x, 5.x, 6.x, 7.x, 8.x, 9.x, 10.x                  | Actualice .NET a 10.0.10 o superior                                                   | [dotnet/runtime/issues/127957][23]      |
| Error del tiempo de ejecución de .NET que provoca bloqueos en filtros de excepciones (`catch ... when`)       | 9.x, 10.x                                                | Establezca `DD_PROFILING_EXCEPTION_ENABLED=0` o actualice a .NET 11 o superior             | [dotnet/runtime/issues/132462][24]      |

## Versiones de Datadog Agent compatibles {#supported-datadog-agent-versions}

| Versión de Datadog Agent | Versión del paquete |
|-----------------------|-----------------|
| [7.x][8]              | Más reciente          |
| [6.x][8]              | Más reciente          |
| [5.x][9]              | Más reciente          |

## Política de soporte de tiempo de ejecución de .NET {#net-runtime-support-policy}

El .NET Tracer depende del sistema operativo del servidor, el tiempo de ejecución de .NET, ciertas bibliotecas de .NET y el Datadog Agent/API. Estos sistemas de software de terceros admiten versiones específicas de .NET y .NET Core. Cuando el software externo ya no admite una versión de .NET, el .NET Tracer también limita su soporte para esa versión.

### Niveles de soporte {#levels-of-support}

| **Nivel**                                              | **Soporte proporcionado**                                                                                                                       |
|--------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| <span id="support-unsupported">Sin soporte</span>      |  Sin implementación. [Comuníquese con el soporte al cliente para solicitudes especiales.][10]                                                                   |
| <span id="support-beta">Vista previa</span>                 |  Implementación inicial. Es posible que aún no contenga todas las funciones. Soporte para nuevas funciones y correcciones de errores y de seguridad, proporcionado en la medida de lo posible. |
| <span id="support-ga">Disponibilidad general (GA)</span> |  Implementación completa de todas las funciones. Soporte completo para nuevas funciones y correcciones de errores y de seguridad.                                                 |
| <span id="support-maintenance">Mantenimiento</span>      |  Implementación completa de las funciones existentes. No recibe nuevas funciones. Soporte solo para correcciones de errores y de seguridad.                           |
| <span id="support-eol">Fin de vida útil (EOL)</span>        |  Sin soporte.                                                                                                                               |

### Control de versiones de paquetes {#package-versioning}

El .NET Tracer utiliza [control de versiones semántico][11].
Las actualizaciones de versión implican los siguientes cambios en el soporte de tiempo de ejecución:

  - **Las actualizaciones de versión principal** (por ejemplo, de `1.0.0` a `2.0.0`) pueden cambiar el soporte de cualquier tiempo de ejecución de [Preview](#support-beta)/[GA](#support-ga) a [Maintenance](#support-maintenance)/[EOL](#support-eol).
  - **Las actualizaciones de versión menor** (por ejemplo, de `1.0.0` a `1.1.0`) no reducirán el nivel de soporte para un tiempo de ejecución, pero pueden añadir soporte para uno.
  - **Las actualizaciones de versión de parche** (por ejemplo, de `1.0.0` a `1.0.1`) no cambiarán el soporte para ningún tiempo de ejecución.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-dotnet
[2]: /es/tracing/compatibility_requirements/dotnet-framework/
[3]: https://dotnet.microsoft.com/platform/support/policy/dotnet-core
[4]: https://github.com/DataDog/dd-trace-dotnet/releases/latest
[5]: /es/help/
[6]: https://github.com/DataDog/dd-trace-dotnet/issues/302#issuecomment-603269367
[7]: https://github.com/dotnet/runtime/issues/23938
[8]: /es/agent/basic_agent_usage/?tab=agentv6v7
[9]: /es/agent/basic_agent_usage/?tab=agentv5
[10]: https://www.datadoghq.com/support/
[11]: https://semver.org/
[12]: https://www.nuget.org/packages/Datadog.Trace.Trimming/
[13]: /es/opentelemetry/interoperability/instrumentation_libraries/?tab=dotnet
[15]: https://github.com/dotnet/runtime/pull/73760
[16]: https://github.com/dotnet/runtime/issues/11885
[17]: https://github.com/dotnet/runtime/issues/85777
[18]: https://github.com/dotnet/runtime/pull/76431
[19]: https://github.com/dotnet/core/tree/main/release-notes
[20]: https://www.gnu.org/software/libc/
[21]: https://musl.libc.org/
[22]: https://github.com/dotnet/runtime/issues/95653
[23]: https://github.com/dotnet/runtime/issues/127957
[24]: https://github.com/dotnet/runtime/issues/132462