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

You can detect code-level vulnerabilities and monitor application security in Python applicationss running in Docker, Kubernetes, Amazon ECS, and AWS Fargate.

NOTE: Code-Level Vulnerability detection in Python is in Preview.

Follow these steps to enable Code Security in your service:

1. [Update your Datadog Agent][6] to at least version 7.41.1.
2. Update your Datadog Tracing Library to at least the minimum version needed to turn on Code Security. For details, see [Library Compatibility][3] page.
3. Add the `DD_IAST_ENABLED=true` environment variable to your application configuration.

   From the command line:

   ```shell
   DD_IAST_ENABLED=true ddtrace-run python app.py
   ```

   Or one of the following methods, depending on where your application runs:


{{< tabs >}}
{{% tab "Docker CLI" %}}

Update your configuration container for APM by adding the following argument in your `docker run` command:


```shell
docker run [...] -e DD_IAST_ENABLED=true [...]
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

Add the following environment variable value to your container Dockerfile:

```Dockerfile
DD_IAST_ENABLED=true
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Update your deployment configuration file for APM and add the IAST environment variable:

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

Update your ECS task definition JSON file, by adding this in the environment section:

```json
"environment": [
  ...,
  {
    "name": "DD_IAST_ENABLED",
    "value": "true"
  }
]
```

{{% /tab %}}

{{< /tabs >}}

4. Restart your service.
5. To see Code Security in action, browse your service and find code-level vulnerabilities in the [Vulnerability Explorer][4].

{{< img src="/security/application_security/Code-Level-Vulnerability-Details-New.mp4" alt="Video showing Code Vulnerabilities" video="true" >}}

If you need additional assistance, contact [Datadog support][5].


### Third-Party Library Compatibility Note

Code Security modifies Python code at runtime. This could cause conflicts with other third-party Python libraries that perform similar code transformations, particularly with the following, though not limited to them:

- Numba
- JAX
- TorchScript
- TensorFlow
- Bytecode
- Codetransformer
- PyPy

Additionally, Code Security does not correctly propagate taint ranges over native (compiled) code. Therefore, if your codebase heavily relies on modules written in C or C++,
using the CPython API, or on intermediate language systems like Cython, the results might be less accurate than expected.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-py/releases
[2]: /security/code_security/iast/setup/python
[3]: /security/code_security/iast/setup/
[4]: https://app.datadoghq.com/security/appsec/vm/code
[5]: /help
[6]: /agent/versions/upgrade_between_agent_minor_versions/
