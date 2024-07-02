---
title: .NET Compatibility Requirements
kind: documentation
code_lang: dotnet
type: multi-code-lang
code_lang_weight: 10
---

## Application Security capabilities support

The following application security capabilities are supported in the .NET library, for the specified tracer version:

| Application Security capability  | Minimum .NET tracer version |
| -------------------------------- | ----------------------------|
| Threat Detection | 2.23.0|
| Threat Protection  | 2.26.0|
| Customize response to blocked requests | 2.27.0 |
| Software Composition Analysis (SCA) |  2.16.0  |
| コードセキュリティ  | 2.42.0  |
| Automatic user activity event tracking | 2.32.0 |
| API Security | 2.42.0 |

The minimum tracer version to get all supported application security capabilities for .NET is 2.42.0.

**Note**: Threat Protection requires enabling [Remote Configuration][3], which is included in the listed minimum tracer version.

### Supported deployment types
| Type              | Threat Detection support | Software Composition Analysis            |
|-------------------|--------------------------|------------------------------------------|
| Docker            | {{< X >}}                | {{< X >}}                                |
| Kubernetes        | {{< X >}}                | {{< X >}}                                |
| Amazon ECS        | {{< X >}}                | {{< X >}}                                |
| AWS Fargate       | {{< X >}}                | {{< X >}}                                |
| AWS Lambda        | {{< X >}}                |                                          |
| Azure App Service | {{< X >}}                | {{< X >}}                                |

**Note**: Azure App Service is supported for **web applications only**. Application Security capabilities are not supported for Azure Functions.

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

##### Application Security Capability Notes
- **Software Composition Analysis** is supported on all frameworks.
- If your framework is not listed below, **Code Security** will still detect Insecure Cookie vulnerabilities.


| Framework                  | Threat Detection supported? | Threat Protection supported? | Code Security? |
| ----------------------- | --------------- | ---------------------------------------------- | ---------------------------------------------- |
| ASP.NET MVC | {{< X >}}  |{{< X >}}  | {{< X >}} |
| ASP.NET Web API 2 | {{< X >}} | {{< X >}} | {{< X >}}  |

<div class="alert alert-info">If you don't see your framework of choice listed, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>

### Data store compatibility

**Datastore tracing provides:**

- SQL attack detection
- query info (for example, a sanitized query string)
- error and stacktrace capturing

##### Application Security Capability Notes
- **Threat Protection** also works at the HTTP request (input) layer, and so works for all databases by default, even those not listed in the table below.

| Framework         | Threat Detection supported?    | Threat Protection supported? | Code Security? |
|-------------------|-----------------|---------------------|---|
| OracleDB         | {{< X >}} |   {{< X >}}    |{{< X >}}    |
| ADO.NET         | {{< X >}} |   {{< X >}}    |{{< X >}}    |
| SQL Server         | {{< X >}} |   {{< X >}}    |{{< X >}}    |
| MySQL       | {{< X >}} |   {{< X >}}    |{{< X >}}    |
| SQLite         | {{< X >}} |   {{< X >}}    |{{< X >}}    |

### User Authentication Frameworks compatibility

Integrations to **User Authentication Frameworks provides:**

- User login events including the user IDs
- User signup events (apps using built-in SignInManager)
- Account Takeover detection monitoring for user login events

| Framework         |
|-------------------|
| > .Net Core 2.1   |

[1]: /tracing/trace_collection/compatibility/dotnet-core/
[2]: /tracing/trace_collection/compatibility/dotnet-framework/
[3]: /agent/remote_config/#enabling-remote-configuration
