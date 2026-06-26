---
title: .NET Compatibility Requirements
code_lang: dotnet
type: multi-code-lang
code_lang_weight: 10
---

## Code Security capabilities support

The following code security capabilities are supported in the .NET library, for the specified tracer version:

| Code Security capability                      | Minimum .NET tracer version |
| --------------------------------------------- | ----------------------------|
| Runtime Software Composition Analysis (SCA)   | 2.16.0                      |
| Runtime Code Analysis (IAST)                  | 2.42.0                      |

The minimum tracer version to get all supported application security capabilities for .NET is 2.42.0.

### Supported deployment types
| Type              | Runtime Software Composition Analysis (SCA) | Runtime Code Analysis (IAST)        |
|------------------ | ------------------------------------------- | ----------------------------------- |
| Docker            | {{< X >}}                                   | {{< X >}}                           |
| Kubernetes        | {{< X >}}                                   | {{< X >}}                           |
| Amazon ECS        | {{< X >}}                                   | {{< X >}}                           |
| AWS Fargate       | {{< X >}}                                   | Preview (1.15.0)                    |
| AWS Lambda        |                                             |                                     |
| Azure App Service | {{< X >}}                                   | {{< X >}}                           |

**Note**: Azure App Service is supported for **web applications only**. Code Security capabilities are not supported for Azure Functions.

## Language and framework compatibility

### Supported .NET versions

For a list of supported platforms and operating systems, see [.NET Framework Compatibility][2] and [.NET/.NET Core Compatiblity][1].

### Web framework compatibility

- Tags for the HTTP request (status code, method, etc)
- Distributed Tracing to see attack flows through your applications

##### Code Security Capability Notes
- **Runtime Software Composition Analysis (SCA)** is supported on all frameworks.
- If your framework is not listed below, **Runtime Code Analysis (IAST)** will still detect Insecure Cookie vulnerabilities.

| Framework                  | Runtime Code Analysis (IAST) |
| -------------------------- | ---------------------------- |
| ASP.NET MVC                | {{< X >}}                    |
| ASP.NET Web API 2          | {{< X >}}                    |

<div class="alert alert-info">If you don't see your framework of choice listed, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>

### Data store compatibility

**Datastore tracing provides:**

- query info (for example, a sanitized query string)
- error and stacktrace capturing

##### Code Security Capability Notes
- **Runtime Software Composition Analysis (SCA)** is supported on all frameworks.

| Framework         | Runtime Code Analysis (IAST) |
|-------------------|------------------------------|
| OracleDB          | {{< X >}}                    |
| ADO.NET           | {{< X >}}                    |
| SQL Server        | {{< X >}}                    |
| MySQL             | {{< X >}}                    |
| SQLite            | {{< X >}}                    |

[1]: /tracing/trace_collection/compatibility/dotnet-core/
[2]: /tracing/trace_collection/compatibility/dotnet-framework/
[3]: /remote_configuration#enabling-remote-configuration
