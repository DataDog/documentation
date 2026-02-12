---
title: Enabling Code Security for Java
code_lang: java
type: multi-code-lang
code_lang_weight: 0
aliases:
  - /security_platform/application_security/getting_started/java
  - /security/application_security/getting_started/java
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

You can detect code-level vulnerabilities and monitor application security in Java applications running in Docker, Kubernetes, Amazon ECS, and AWS Fargate.

Follow these steps to enable Code Security in your service:

1. [Update your Datadog Agent][6] to at least version 7.41.1.
2. Update your Datadog Tracing Library to at least the minimum version needed to turn on Code Security. For details, see [Library Compatibility][3] page.
3. Add the `DD_IAST_ENABLED=true` environment variable to your application configuration.

   From the command line:

   ```shell
   java -javaagent:/path/to/dd-java-agent.jar -Ddd.iast.enabled=true -Ddd.service=<MY SERVICE> -Ddd.env=<MY_ENV> -jar path/to/app.jar
   ```

   Or one of the following methods, depending on where your application runs:

   **Note**: Read-only file systems are not supported. The application must have access to a writable `/tmp` directory.


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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-java/releases
[2]: /security/code_security/iast/setup/
[3]: /security/code_security/iast/setup/
[4]: https://app.datadoghq.com/security/appsec/vm
[5]: /help
[6]: /agent/versions/upgrade_between_agent_minor_versions/
