---
title: .NET Compatibility Requirements
code_lang: dotnet
type: multi-code-lang
code_lang_weight: 10
aliases:
  - /security/application_security/threats/setup/compatibility/dotnet
  - /security/application_security/enabling/compatibility/dotnet
---

## App and API Protection capabilities support

The following App and API Protection capabilities are supported in the .NET library, for the specified tracer version:

| App and API Protection capability  | Minimum .NET tracer version |
| -------------------------------- | ----------------------------|
| Threat Detection | 2.23.0|
| Threat Protection  | 2.26.0|
| Customize response to blocked requests | 2.27.0 |
| Automatic user activity event tracking | 2.32.0 |
| API Security | 2.42.0 |

The minimum tracer version to get all supported App and API Protection capabilities for .NET is 2.42.0.

**Note**: AAP requires enabling [Remote Configuration][3], which is included in the listed minimum tracer version.

### Supported deployment types
| Type              | Threat Detection support |
|-------------------|--------------------------|
| Docker            | {{< X >}}                |
| Kubernetes        | {{< X >}}                |
| Amazon ECS        | {{< X >}}                |
| AWS Fargate       | {{< X >}}                |
| AWS Lambda        | {{< X >}}                |
| Azure App Service | {{< X >}}                |

**Note**: Azure App Service is supported for **web applications only**. App and API Protection capabilities are not supported for Azure Functions.

## Language and framework compatibility

### Supported .NET versions

| .NET Framework Version  | Microsoft End of Life | Support level                       | Package version             |
| ----------------------- | --------------------- | ----------------------------------- | --------------------------- |
| 4.8                     |                       | GA   | latest                      |
| 4.7.2                   |                       | GA | latest                      |
| 4.7                     |                       | GA | latest                      |
| 4.6.2                   |                       | GA | latest                      |
| 4.6.1                   | 04/26/2022            | GA   | latest |


These are supported on the following architectures:
- Linux (GNU) x86-64, ARM64
- Alpine Linux (musl) x86-64, ARM64
- macOS (Darwin) x86-64, ARM64
- Windows (msvc) x86, x86-64



### Web framework compatibility

- Attacker source HTTP request details
- Tags for the HTTP request (status code, method, etc)
- Distributed Tracing to see attack flows through your applications

##### App and API Protection capability notes


| Framework                  | Threat Detection supported? | Threat Protection supported? |
| ----------------------- | --------------- | ---------------------------------------------- |
| ASP.NET MVC | {{< X >}}  |{{< X >}}  |
| ASP.NET Web API 2 | {{< X >}} | {{< X >}} |

<div class="alert alert-info">If you don't see your framework of choice listed, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>

### Data store compatibility

**Datastore tracing provides:**

- SQL attack detection
- query info (for example, a sanitized query string)
- error and stacktrace capturing

##### App and API Protection capability notes
- **Threat Protection** also works at the HTTP request (input) layer, and so works for all databases by default, even those not listed in the table below.

| Framework         | Threat Detection supported?    | Threat Protection supported? |
|-------------------|-----------------|---------------------|
| OracleDB         | {{< X >}} |   {{< X >}}    |
| ADO.NET         | {{< X >}} |   {{< X >}}    |
| SQL Server         | {{< X >}} |   {{< X >}}    |
| MySQL       | {{< X >}} |   {{< X >}}    |
| SQLite         | {{< X >}} |   {{< X >}}    |

### User authentication frameworks compatibility

Integrations to **User Authentication Frameworks provides:**

- User login events including the user IDs
- User signup events (apps using built-in SignInManager)
- Account Takeover detection monitoring for user login events

| Framework         |
|-------------------|
| > .Net Core 2.1   |

[1]: /tracing/trace_collection/compatibility/dotnet-core/
[2]: /tracing/trace_collection/compatibility/dotnet-framework/
[3]: /tracing/guide/remote_config
