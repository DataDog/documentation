---
title: .NET Compatibility Requirements 
kind: documentation
code_lang: dotnet
type: multi-code-lang
code_lang_weight: 10
---

## ASM capabilities support

The following ASM capabilities are supported in the .NET library, for the specified tracer version:

| ASM capability                   | Minimum .NET tracer version |
| -------------------------------- | ----------------------------|
| Threat Detection | 2.23.0|
| Threat Protection  | 2.26.0|
| Open Source Vulnerability detection |  2.16.0  |
| Custom code vulnerability detection | private beta  |

The minimum tracer version to get all supported ASM capabilities for .NET is 2.26.0.

**Note**: Threat Protection requires enabling [Remote Configuration][3], which is included in the listed minimum tracer version.  

### Supported deployment types
|Type   | Threats support |  Vulnerabilities support |
| ---   |   ---             |           ----        |
| Docker | {{< X >}}  | {{< X >}} |
| Kubernetes | {{< X >}}  | {{< X >}} | 
| AWS ECS | {{< X >}}  | {{< X >}} |
| AWS Fargate | {{< X >}}  | {{< X >}} |
| AWS Lambda | {{< X >}} | | 

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

##### ASM Capability Notes
- Open Source Vulnerability Detections is supported on all frameworks


| Framework                  | Threat Detection supported? | Threat Protection supported? | Custom Code Vulnerability Detection supported? |
| ----------------------- | --------------- | ---------------------------------------------- | ---------------------------------------------- |
| ASP.NET MVC | {{< X >}}  |{{< X >}}  | {{< X >}} |
| ASP.NET Web API 2 | {{< X >}} | {{< X >}} | {{< X >}}  |

<div class="alert alert-info">If you don't see your framework of choice listed, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>

### Data store compatibility

**Datastore tracing provides:**

- SQL attack detection
- query info (for example, a sanitized query string)
- error and stacktrace capturing

##### ASM Capability Notes
- Threat Protection works at the HTTP request (input) layer, and so works for all databases by default

| Framework         | Threat Detection supported?    | Threat Protection supported? | Custom Code Vulnerability Detection supported? |
|-------------------|-----------------|---------------------|---|
| OracleDB         | {{< X >}} |   {{< X >}}    |{{< X >}}    |
| ADO.NET         | {{< X >}} |   {{< X >}}    |{{< X >}}    |
| SQL Server         | {{< X >}} |   {{< X >}}    |{{< X >}}    |
| MySQL       | {{< X >}} |   {{< X >}}    |{{< X >}}    |
| SQLite         | {{< X >}} |   {{< X >}}    |{{< X >}}    |

[1]: /tracing/trace_collection/compatibility/dotnet-core/
[2]: /tracing/trace_collection/compatibility/dotnet-framework/
[3]: /agent/remote_config/#enabling-remote-configuration
