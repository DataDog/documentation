---
title: Enabling Code Security for Python
code_lang: python
type: multi-code-lang
code_lang_weight: 10
aliases:
  - /security_platform/application_security/getting_started/python
  - /security/application_security/getting_started/python
further_reading:
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

You can detect code-level vulnerabilities and monitor application security in Python applications running in Docker, Kubernetes, Amazon ECS, and AWS Fargate.

> **Note:** Runtime Code Analysis (IAST) in Python is in Preview.

## How to Enable Runtime Code Analysis (IAST)

1. **Update your Datadog Agent** to at least version 7.41.1.
2. **Update your Datadog Tracing Library** to at least the minimum version needed to turn on Runtime Code Analysis (IAST). For details, see [Compatibility Requirements](../compatibility/).
3. **Add the `DD_IAST_ENABLED=true` environment variable** to your application configuration.

{{< tabs >}}
{{% tab "From the command line" %}}
```sh
DD_IAST_ENABLED=true ddtrace-run python app.py
```
{{% /tab %}}
{{% tab "Docker CLI" %}}
```sh
docker run [...] -e DD_IAST_ENABLED=true [...]
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
{{% tab "Amazon ECS" %}}
```json
"environment": [
  ...,
  { "name": "DD_IAST_ENABLED", "value": "true" }
]
```
{{% /tab %}}
{{< /tabs >}}

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

*Azure App Service is supported for web applications only. Code Security doesn’t support Azure Functions.

---

To see Runtime Code Analysis (IAST) in action, browse your service and find code-level vulnerabilities in the [Vulnerability Explorer](https://app.datadoghq.com/security/appsec/vm).

{{< img src="/security/application_security/Code-Level-Vulnerability-Details-New.mp4" alt="Video showing Code Vulnerabilities" video="true" >}}

If you need additional assistance, contact [Datadog support](https://docs.datadoghq.com/help).

---

## Language and Framework Compatibility
{{< tabs >}}
{{% tab "Third-Party Library Compatibility" %}}
Runtime Code Analysis (IAST) modifies Python code at runtime. This could cause conflicts with other third-party Python libraries that perform similar code transformations, particularly with the following, though not limited to them:
- Numba
- JAX
- TorchScript
- TensorFlow
- Bytecode
- Codetransformer
- PyPy

Additionally, Runtime Code Analysis (IAST) does not correctly propagate taint ranges over native (compiled) code. Therefore, if your codebase heavily relies on modules written in C or C++, using the CPython API, or on intermediate language systems like Cython, the results might be less accurate than expected.
{{% /tab %}}
{{< /tabs >}}
For more details, see [Compatibility Requirements](../compatibility/).
