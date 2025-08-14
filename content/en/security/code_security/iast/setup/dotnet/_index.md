---
title: Enabling Code Security for .NET
code_lang: dotnet
type: multi-code-lang
code_lang_weight: 10
aliases:
  - /security_platform/application_security/getting_started/dotnet
  - /security/application_security/getting_started/dotnet
further_reading:
  - link: "/security/code_security/iast/#code-level-vulnerabilities-list"
    tag: "Documentation"
    text: "Supported code-level vulnerabilities list"
  - link: "https://www.datadoghq.com/blog/iast-datadog-code-security/"
    tag: "Blog"
    text: "Enhance application security in production with Datadog Code Security"
  - link: "https://www.datadoghq.com/blog/application-code-vulnerability-detection/"
    tag: "Blog"
    text: "Find vulnerabilities in your code with Datadog Code Security"
  - link: "https://www.datadoghq.com/blog/code-security-owasp-benchmark/"
    tag: "Blog"
    text: "Datadog Code Security achieves 100 percent accuracy in OWASP Benchmark by using an IAST approach"
  - link: "/security/application_security/troubleshooting"
    tag: "Documentation"
    text: "Troubleshooting Application Security"
---

You can detect code-level vulnerabilities and monitor application security in .NET applications running in Docker, Kubernetes, Amazon ECS, and AWS Fargate.

## How to Enable Runtime Code Analysis (IAST)

1. **Update your Datadog Agent** to at least version 7.41.1.
2. **Update your Datadog Tracing Library** to at least the minimum version needed to turn on Runtime Code Analysis (IAST). For details, see the [Compatibility Requirements](../compatibility/) below.
3. **Add the `DD_IAST_ENABLED=true` environment variable** to your application configuration.

{{< tabs >}}
{{% tab "Windows Self-Hosted (PowerShell)" %}}
```powershell
$target=[System.EnvironmentVariableTarget]::Process
[System.Environment]::SetEnvironmentVariable("DD_IAST_ENABLED","true",$target)
```
{{% /tab %}}
{{% tab "Windows Console" %}}
```bat
rem Set environment variables
SET DD_IAST_ENABLED=true
rem Start application
dotnet.exe example.dll
```
{{% /tab %}}
{{% tab "IIS (PowerShell as Administrator)" %}}
```powershell
$target=[System.EnvironmentVariableTarget]::Machine
[System.Environment]::SetEnvironmentVariable("DD_IAST_ENABLED","true",$target)
net stop was /y
net start w3svc
```
{{% /tab %}}
{{% tab "Linux" %}}
```sh
DD_IAST_ENABLED=true
```
{{% /tab %}}
{{% tab "Docker CLI" %}}
```sh
docker run -d --name app -e DD_IAST_ENABLED=true company/app:latest
```
{{% /tab %}}
{{% tab "Dockerfile" %}}
```dockerfile
ENV DD_IAST_ENABLED=true
```
{{% /tab %}}
{{% tab "Kubernetes" %}}
```yaml
spec:
  template:
    spec:
      containers:
        - name: <CONTAINER_NAME>
          image: <CONTAINER_IMAGE>/<TAG>
          env:
            - name: DD_IAST_ENABLED
              value: "true"
```
{{% /tab %}}
{{% tab "AWS ECS" %}}
```json
"environment": [
  ...,
  { "name": "DD_IAST_ENABLED", "value": "true" }
]
```
{{% /tab %}}
{{% tab "AWS Fargate" %}}
```dockerfile
ENV DD_IAST_ENABLED=true
```
{{% /tab %}}
{{< /tabs >}}

---

To see Runtime Code Analysis (IAST) in action, browse your service and find code-level vulnerabilities in the [Vulnerability Explorer](https://app.datadoghq.com/security/appsec/vm).

{{< img src="/security/application_security/Code-Level-Vulnerability-Details-New.mp4" alt="Video showing Code Vulnerabilities" video="true" >}}

If you need additional assistance, contact [Datadog support](https://docs.datadoghq.com/help).

---

## Code Security Capabilities Support

| Code Security capability                    | Minimum .NET tracer version |
|---------------------------------------------|----------------------------|
| Runtime Software Composition Analysis (SCA) | 2.16.0                     |
| Runtime Code Analysis (IAST)                | 2.42.0                     |

The minimum tracer version to get all supported code security capabilities for .NET is **2.42.0**.

---

## Supported Deployment Types

| Type               | Runtime IAST |
|--------------------|:------------:|
| Docker             |      ✓       |
| Kubernetes         |      ✓       |
| Amazon ECS         |      ✓       |
| AWS Fargate        |   Preview    |
| AWS Lambda         |              |
| Azure App Service* |      ✓       |

*Azure App Service is supported for web applications only. Code Security capabilities are not supported for Azure Functions.

---

## Language and Framework Compatibility
{{< tabs >}}
{{% tab "Supported .NET Versions" %}}
| .NET Framework Version | Microsoft End of Life | Support level | Package version |
|-----------------------|----------------------|--------------|-----------------|
| 4.8                   |                      | GA           | latest          |
| 4.7.2                 |                      | GA           | latest          |
| 4.7                   |                      | GA           | latest          |
| 4.6.2                 |                      | GA           | latest          |
| 4.6.1                 | 04/26/2022           | GA           | latest          |
Supported architectures:
- Linux (GNU) x86-64, ARM64
- Alpine Linux (musl) x86-64, ARM64
- macOS (Darwin) x86-64, ARM64
- Windows (msvc) x86, x86-64
{{% /tab %}}
{{% tab "Web Framework Compatibility" %}}
- Runtime Software Composition Analysis (SCA) is supported on all frameworks.
- If your framework is not listed below, Runtime Code Analysis (IAST) continues to detect Insecure Cookie vulnerabilities.
| Framework         | Runtime Code Analysis (IAST) |
|-------------------|:---------------------------:|
| ASP.NET MVC       |              ✓              |
| ASP.NET Web API 2 |              ✓              |
If you don't see your framework of choice listed, let us know! Fill out [this short form](https://forms.gle/gHrxGQMEnAobukfn7) to send details.
{{% /tab %}}
{{% tab "Networking Framework Compatibility" %}}
- Runtime Software Composition Analysis (SCA) is supported on all frameworks.
| Framework | Runtime Code Analysis (IAST) |
|-----------|:---------------------------:|
| http      |              ✓              |
| https     |              ✓              |
If you don't see your framework of choice listed, let us know! Fill out [this short form](https://forms.gle/gHrxGQMEnAobukfn7) to send details.
{{% /tab %}}
{{% tab "Data Store Compatibility" %}}
Datastore tracing provides:
- query info (for example, a sanitized query string)
- error and stacktrace capturing
- Runtime Software Composition Analysis (SCA) is supported on all frameworks.
| Framework  | Runtime Code Analysis (IAST) |
|------------|:---------------------------:|
| OracleDB   |              ✓              |
| ADO.NET    |              ✓              |
| SQL Server |              ✓              |
| MySQL      |              ✓              |
| SQLite     |              ✓              |
{{% /tab %}}
{{< /tabs >}}

---

For more details, see [Compatibility Requirements](../compatibility/).
