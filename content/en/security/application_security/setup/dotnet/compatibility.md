---
title: .NET Compatibility Requirements
aliases:
  - /security/application_security/threats/setup/compatibility/dotnet
---

## App and API Protection capabilities

The following App and API Protection capabilities are supported in the .NET library, for the specified tracer version:

| App and API Protection capability       | Minimum .NET tracer version |
| --------------------------------------- | ----------------------------|
| Threat Detection                        | 2.23.0                      |
| Threat Protection                       | 2.26.0                      |
| Customize response to blocked requests  | 2.27.0                      |
| Automatic user activity event tracking  | 2.32.0                      |
| API Security                            | 2.42.0                      |

The minimum tracer version to get all supported App and API Protection capabilities for .NET is 2.42.0.

**Note**: Threat Protection requires enabling [Remote Configuration][1], which is included in the listed minimum tracer version.

### Supported deployment types

Threat Detection is supported for the following deployment types:

- Docker
- Kubernetes
- Amazon ECS
- AWS Fargate
- AWS Lambda
- Azure App Service

**Note**: Azure App Service is supported for **web applications only**. App and API Protection capabilities are not supported for Azure Functions.

## Language and framework compatibility

### Supported .NET versions

The Datadog .NET Tracing library is open source. View the [GitHub repository][2] for more information.

The .NET Tracer supports instrumentation from 
 - .NET Framework 4.6.1 and newer versions
 - .NET Core 3.1 and newer versions

These are supported on the following architectures:
- Linux (GNU) x86-64, ARM64
- Alpine Linux (musl) x86-64, ARM64
- macOS (Darwin) x86-64, ARM64
- Windows (msvc) x86, x86-64

For a complete list of supported versions abd operating systems, see the [.NET Core tracer documentation][3] and [.NET Framework tracer documentation][4].

You must be running Datadog Agent v7.41.1+ for App and API Protection features.

## Integrations

The .NET tracer includes support for the following frameworks, data stores, and libraries:

### Web framework compatibility
- ASP.NET MVC
- ASP.NET Web API 2

### Data stores
- OracleDB
- ADO.NET
- SQL Server
- MySQL
- SQLite
- PostgreSQL

### Other
- Kafka
- GraphQL

For a complete list of supported integrations and their versions, see the [.NET Core tracer documentation][3] and [.NET Framework tracer documentation][4].

[1]: /agent/remote_config/#enabling-remote-configuration
[2]: https://github.com/DataDog/dd-trace-dotnet
[3]: /tracing/trace_collection/compatibility/dotnet-core
[4]: /tracing/trace_collection/compatibility/dotnet-framework
