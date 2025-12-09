---
aliases:
- /es/tracing/compatibility_requirements/dotnet-core
- /es/tracing/setup_overview/compatibility_requirements/dotnet-core
code_lang: dotnet-core
code_lang_weight: 70
description: Requisitos de compatibilidad para el rastreador .NET
further_reading:
- link: tracing/trace_collection/dd_libraries/dotnet-core
  tag: Documentación
  text: Instrumentar tu aplicación
- link: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples
  tag: Código fuente
  text: Ejemplos de instrumentación personalizada
- link: https://www.datadoghq.com/blog/asp-dotnet-core-monitoring/
  tag: Blog
  text: Monitoriza aplicaciones contenedorizados de ASP.NET Core
title: Requisitos de compatibilidad de .NET y .NET Core
type: multi-code-lang
---


El rastreador Datadog. NET es compatible con todos los lenguajes basados en .NET (por ejemplo, C#, F#, Visual Basic). Tiene [compatibilidad en fase de vista previa para aplicaciones recortadas][12].

El rastreador .NET es de código abierto. Para más información, consulta el [repositorio del rastreador .NET][1].

## Tiempos de ejecución de .NET y .NET Core compatibles

El rastreador .NET es compatible con la instrumentación automática en las siguientes versiones de .NET y .NET Core. También es compatible con [.NET Framework][2].

| Versión .NET         | Fin de vida de Microsoft | Nivel de compatibilidad        | Versión del paquete      |
| -------------------- | --------------------- | -------------------- | -------------------- |
| .NET 9               |                       | [GA](#support-ga)    | más reciente (>= 3.6.0)   |
| .NET 8               |                       | [GA](#support-ga)    | Más reciente (>= 2.42.0)   |
| .NET 7               | 05/14/2024            | [GA](#support-ga)    | Más reciente (>= 2.20.0)   |
| .NET 6               |                       | [GA](#support-ga)    | Más reciente (>= 2.0.0)    |
| .NET 5               | 05/10/2022            | [GA](#support-ga)    | Más reciente (>= 2.0.0)    |
| .NET Core 3.1        | 12/13/2022            | [GA](#support-ga)    | última               |
| .NET Core 3.0        | 03/03/2020            | [EOL](#support-eol)  | No recomendado       |
| .NET Core 2.2        | 12/23/2019            | [EOL](#support-eol)  | No recomendado       |
| .NET Core 2.1        | 08/21/2021            | [EOL](#support-eol)  | No recomendado       |
| .NET Core 2.0        | 10/01/2018            | [EOL](#support-eol)  | No recomendado       |

Puedes encontrar información adicional en [la política de ciclo de vida de .NET y .NET Core de Microsoft][3], [versiones de tiempo de ejecución del fin de soporte de .NET](#end-of-life-net-runtime-versions) y [política de compatibilidad del tiempo de ejecución de .NET](#net-runtime-support-policy).

## Arquitecturas de procesador compatibles

El rastreador de .NET es compatible con la instrumentación automática en las siguientes arquitecturas:

| Arquitecturas de procesadores                   | Nivel de compatibilidad         | Versión del paquete                        |
| ------------------------------------------|-----------------------|----------------------------------------|
| Windows x64 (`win-x64`)                   | [GA](#support-ga)     | última                                 |
| Windows x86 (`win-x86`)                   | [GA](#support-ga)     | < 3.0.0 (por ejemplo, 2.56.0)                  |
| Linux x64 (`linux-x64`)                   | [GA](#support-ga)     | última                                 |
| Alpine Linux x64 (`linux-musl-x64`)       | [GA](#support-ga)     | última                                 |
| Linux ARM64 (`linux-arm64`)               | [GA](#support-ga)     | .NET 5+ solamente, añadido en la versión 1.27.0  |
| Alpine Linux arm64 (`linux-musl-arm64`)   | [GA](#support-ga)     | .NET 6+ solamente, añadido en la versión 3.2.0   |

Ten en cuenta que es posible ejecutar aplicaciones de 32 bits en Windows x64.

## Sistemas operativos compatibles

El rastreador de .NET es compatible con la instrumentación automática en los sistemas operativos Windows y Linux. Solo es compatible con macOS para la CI Test Optimization.

### Windows

| Sistema operativo             | Versión     | Nivel de compatibilidad         | Versión del paquete                        |
| -----------------------------|-------------|-----------------------|----------------------------------------|
| Windows Server (x64)         | 2012+       | [GA](#support-ga)     | última                                 |
| Windows Client (x64)         | 8.1+        | [GA](#support-ga)     | última                                 |
| Nano Server (x64)            | < 2012      | [EOL](#support-eol)   | < 3.0.0 (por ejemplo, 2.48.0)                  |
| Windows Server (x64)         | < 2012      | [EOL](#support-eol)   | < 3.0.0 (por ejemplo, 2.48.0)                  |
| Windows Server (x86)         | Todas las versiones| [EOL](#support-eol)   | < 3.0.0 (por ejemplo, 2.48.0)                  |

Encontrarás más información sobre los sistemas operativos compatibles con .NET y .NET Core en las [notas de versión de .NET][19].

### Linux

El rastreador de .NET es compatible con las distribuciones de Linux como mejor esfuerzo, basándose en la compatibilidad mínima de la versión libc:

- x64: [glibc][20] 2.17 (from CentOS 7)
- Arm64: [glibc][20] 2.23 (de Debian 10)
- Alpine x64: [musl][21] 1.2.2 (de Alpine 3.14)
- Alpine arm64: [musl][21] 1.2.4 (de Alpine 3.18)

| Sistema operativo         | Versión | Arquitecturas | Nivel de compatibilidad         | Versión del paquete              |
| -------------------------|---------|---------------|-----------------------|------------------------------|
| Alpine Linux (x64)       | 3.14+   |  x64,         | [GA](#support-ga)     | más reciente (sólo .NET 5+, v1.27.0+) |
| Alpine Linux (arm64)     | 3.18+   |  Arm64        | [GA](#support-ga)     | más reciente (sólo .NET 6+, v3.2.0+) |
| CentOS Linux             | 7+      |  x64          | [Mantenimiento](#support-maintenance)   | más reciente (EOL en v4.0.0)  |
| CentOS Stream Linux      | 8       |  x64          | [Mantenimiento](#support-maintenance)   | más reciente (EOL en v4.0.0)  |
| Debian                   | 10+     |  x64, Arm64   | [GA](#support-ga)     | última                       |
| Fedora                   | 29+     |  x64          | [GA](#support-ga)     | última                       |
| openSUSE                 | 15+     |  x64          | [GA](#support-ga)     | última                       |
| Red Hat Enterprise Linux | 7+      |  x64          | [GA](#support-ga)     | última                       |
| Ubuntu                   | 18.04+  |  x64, Arm64   | [GA](#support-ga)     | última                       |

### macOS

El rastreador de .NET sólo es compatible con macOS para CI Test Optimization

| Sistema operativo         | Versión | Arquitecturas | Nivel de compatibilidad         | Versión del paquete              |
| -------------------------|---------|---------------|-----------------------|------------------------------|
| macOS                    | 12.0+   |  x64, Arm64   | [GA](#support-ga)     | última                       |
| macOS                    | 11.0    |  x64          | [EOL](#support-eol)     | < 3.0.0                    |
| macOS                    | 11.0    |  Arm64        | [EOL](#support-eol)     | < 3.0.0 (Añadido en 2.20.0)  |

## Integraciones

La [última versión del rastreador .NET][4] puede instrumentar automáticamente las siguientes bibliotecas:

| Marco o biblioteca            | Paquete NuGet                                                                                        | Nombre de la integración     |
| ------------------------------- | ---------------------------------------------------------------------------------------------------- | -------------------- |
| ADO.NET                         | Todas las integraciones de AdoNet                                                                              | `AdoNet`             |
| Aerospike                       | `Aerospike.Client` 4.0.0+                                                                            | `Aerospike`          |
| ASP.NET Core                    | `Microsoft.AspNetCore`</br>`Microsoft.AspNetCore.App`</br>2.0+ y 3.0+                              | `AspNetCore`         |
| Azure Functions                 | `Microsoft.Azure.Webjobs` 3.0+                                                                       | `AzureFunctions`     |
| Amazon DynamoDB                 | `AWSSDK.DynamoDBv2` 3.0+                                                                            | `AwsDynamoDb`        |
| Amazon Kinesis                     | `AWSSDK.Kinesis` 3.0+                                                                               | `AwsKinesis`         |
| Amazon SNS                         | `AWSSDK.SNS` 3.0+                                                                                   | `AwsSns`             |
| Amazon SQS                         | `AWSSDK.SQS` 3.0+                                                                                   | `AwsSqs`             |
| CosmosDb                        | `Microsoft.Azure.Cosmos` 3.6.0+                                                               | `CosmosDb`           |
| Couchbase                       | `CouchbaseNetClient` 2.2.8+                                                                          | `Couchbase`          |
| Elasticsearch                   | `Elasticsearch.Net` 5.3.0+                                                                           | `ElasticsearchNet`   |
| GraphQL .NET                    | `GraphQL` 2.3.0+                                                                                     | `GraphQL`            |
| gRPC                            | `Grpc.Net.Client`2.30.0+ (solo .NET Core 3.0+)</br>`Grpc.Core` 2.30.0+</br>`Grpc.AspNetCore` 2.30.0+ | `Grpc`               |
| HotChocolate                    | `HotChocolate` 11.0.0+                                                                               | `HotChocolate`       |
| HttpClient/HttpMessageHandler | `System.Net.Http` 4.0+                                                                               | `HttpMessageHandler` |
| Kafka                           | `Confluent.Kafka` 1.4+                                                                               | `Kafka`              |
| IBM MQ                          | `amqmdnetstd` 9.0.0+                                                                      | `IbmMq`              |
| MongoDB                         | `MongoDB.Driver.Core` 2.1.0+                                                                         | `MongoDb`            |
| MySql                           | `MySql.Data` 6.7.0+</br>`MySqlConnector` 0.61.0+                                                     | `MySql`              |
| Oracle                          | `Oracle.ManagedDataAccess` 4.122.0+                                                                  | `Oracle`             |
| PostgreSQL                      | `Npgsql` 4.0+                                                                                        | `Npgsql`             |
| Process                         | `"System.Diagnostics.Process"` 4.0+                                                                  | `Process`            |
| RabbitMQ                        | `RabbitMQ.Client` 3.6.9+ .                                                                           | `RabbitMQ`           |
| Redis (cliente de ServiceStack)     | `ServiceStack.Redis` 4.0.48+                                                                         | `ServiceStackRedis`  |
| Redis (cliente de StackExchange)    | `StackExchange.Redis` 1.0.187+                                                                       | `StackExchangeRedis` |
| Service Fabric Remoting         | `Microsoft.ServiceFabric.Services.Remoting` 4.0.470+                                                 | `ServiceRemoting`    |
| SQLite                          | `System.Data.Sqlite` 2.0.0+ </br>`Microsoft.Data.Sqlite` 1.0.0+                                      | `Sqlite`             |
| SQL Server                      | `System.Data` 4.0.0+</br>`System.Data.SqlClient` 4.0.0+</br>`Microsoft.Data.SqlClient` 1.0.0+        | `SqlClient`          |
| WebClient/WebRequest          | `System.Net.Requests` 4.0+                                                                           | `WebRequest`         |

¿No ves la librería que buscas? En primer lugar, comprueba si la librería produce datos de observabilidad compatibles con OpenTelemetry (consulta [Uso de librerías de instrumentación de OpenTelemetry][13] para obtener más detalles). Si no, Datadog está continuamente sumando compatibilidad. [Contacta con el equipo de Datadog][5] para obtener ayuda.

## Fin de soporte de las versiones de ejecución de .NET

El rastreador .NET funciona en .NET Core 2.0, 2.1, 2.2, 3.0 y 3.1, y en .NET 5 y 7, pero estas versiones llegaron al final de soporte y ya no son compatibles con Microsoft. Para más información, consulta [la política de compatibilidad de Microsoft][3]. Datadog recomienda utilizar la última versión de parches de .NET 6 o .NET 8. Las versiones más antiguas de .NET y .NET Core pueden encontrarse con los siguientes problemas de tiempo de ejecución al activar la instrumentación automática:

| Problema                                         | Versiones .NET afectadas                    | Solución                                                               | Más información                        |
|-----------------------------------------------|-------------------------------------------|------------------------------------------------------------------------|-----------------------------------------|
| Error del compilador JIT en Linux/x64                 | 2.0.x,</br>2.1.0-2.1.11,</br>2.2.0-2.2.5  | Actualiza .NET Core a la última versión del parche, o sigue los pasos indicados en el tema enlazado | [DataDog/dd-trace-dotnet/issues/302][6] |
| Error en la búsqueda de recursos con una configuración regional distinta de `en-US`  | 2.0.0                                     | Actualiza .NET Core a 2.0.3 o posterior                                    | [dotnet/runtime/issues/23938][7]        |
| Error en el compilador JIT que provoca un bloqueo al apagarse    | 2.0.0-2.2.x                               | Actualiza .NET Core a 3.1.0 o posterior | [dotnet/runtime/pull/11885][15]   |
| Error en el compilador JIT                              | 2.x, 3.x, 5.x, 6.x, 7.x, 8.0.0-8.0.5      | Actualiza .NET a 8.0.6 o posterior    | [dotnet/runtime/pull/73760][16]   |
| Error en el compilador JIT                              | Todas las versiones de .NET                      | No hay solución    | [dotnet/runtime/issues/85777][17]   |
| Error de tiempo de ejecución de .NET que causa bloqueos cuando se utiliza con métricas de tiempo de ejecución | 6.0.0-6.0.10            | Actualiza a .NET 6.0.11 o posterior, o desactiva las métricas de tiempo de ejecución    | [dotnet/runtime/pull/76431][18]   |
| Error en el compilador JIT que provoca fallos              | 2.x, 3.x, 5.x, 6.x, 7.x, 8.x              | Actualizar .NET a la v9.0.0 o posterior    | [dotnet/runtime/pull/95653][22]   |

## Versiones compatibles del Datadog Agent

| **Versión del Datadog Agent**   | **Versión del paquete** |
|-----------------------------|---------------------|
| [7.x][8]                    | Último              |
| [6.x][8]                    | Último              |
| [5.x][9]                    | Último              |

## Política de compatibilidad del tiempo de ejecución de .NET

El rastreador .NET depende del sistema operativo del host, del tiempo de ejecución de .NET, de determinadas bibliotecas de .NET, y del Datadog Agent/API. Estos sistemas de software de terceros son compatibles con versiones específicas de .NET y .NET Core. Cuando el software externo deja de ser compatible con una versión de .NET, el rastreador .NET también limita su compatibilidad con esa versión.

### Niveles de soporte técnico

| **Nivel**                                              | **Asistencia prestada**                                                                                                                                                          |
|--------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <span id="support-unsupported">Sin soporte</span>      |  Sin implementación. [Para solicitudes especiales, contacta con el servicio de atención al cliente][10].                                                             |
| <span id="support-beta">Vista previa</span>                 |  Implementación inicial. Puede que aún no contenga todas las funciones. La asistencia para nuevas funciones y la corrección de errores y de seguridad se ofrecen en la medida de lo posible.                                    |
| <span id="support-ga">Disponibilidad general (GA)</span> |  Implementación completa de todas las funciones. Soporte completo para nuevas funciones, correcciones de errores y de seguridad.                                                                                    |
| <span id="support-maintenance">Mantenimiento</span>      |  Implementación completa de las funciones existentes. No recibe nuevas funciones. Compatible solo con las correcciones de errores y seguridad.                                                              |
| <span id="support-eol">Final de servicio (EOL)</span>        |  Sin soporte.                                                                                                                                                                  |

### Versionado del paquete

El rastreador .NET practica el [versionado semántico][11].
Las actualizaciones de versión implican los siguientes cambios en la compatibilidad del tiempo de ejecución:

  - **Las actualizaciones de versiones principales** (por ejemplo, de `1.0.0` a `2.0.0`) pueden cambiar la compatibilidad para cualquier tiempo de ejecución de [Vista previa](#support-beta)/[Disponibilidad general](#support-ga) a [Mantenimiento](#support-maintenance)/[Fin del ciclo de vida (EOL)](#support-eol).
  - **Las actualizaciones de versiones secundarias** (por ejemplo, de `1.0.0` a `1.1.0`) no reducirán el nivel de compatibilidad con un tiempo de ejecución, pero pueden añadir compatibilidad con otros.
  - **Las actualizaciones de la versión del parche** (por ejemplo, de `1.0.0` a `1.0.1`) no modificarán la compatibilidad con ningún tiempo de ejecución.

## Referencias adicionales

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
