---
title: Enabling ASM for Python
code_lang: python
type: multi-code-lang
code_lang_weight: 10
aliases:
  - /security_platform/application_security/getting_started/python
  - /security/application_security/getting_started/python
further_reading:
    - link: "/security/application_security/add-user-info/"
      tag: "Documentation"
      text: "Adding user information to traces"
    - link: 'https://github.com/DataDog/dd-trace-py'
      tag: "Source Code"
      text: 'Python Datadog library source code'
    - link: "/security/default_rules/?category=cat-application-security"
      tag: "Documentation"
      text: "OOTB Application Security Management Rules"
    - link: "/security/application_security/troubleshooting"
      tag: "Documentation"
      text: "Troubleshooting Application Security Management"
---

You can monitor application security for Python apps running in Docker, Kubernetes, Amazon ECS, and AWS Fargate.

{{% appsec-getstarted %}}

## Enabling Code Security

NOTE: Code-Level Vulnerability detection in Python is currently in beta.

If your service runs a [tracing library version that supports Vulnerability Management for code-Level vulnerability detection][3], enable the capability by setting the `DD_IAST_ENABLED=true` environment variable and restarting your service.

To detect code-level vulnerabilities for your service:

1. [Update your Datadog Agent][6] to at least version 7.41.1.
2. Update your tracing library to at least the minimum version needed to turn on code-level vulnerability detection. For details, see [ASM capabilities support][3].
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
5. To see Application Vulnerability Management for code-level vulnerabilities in action, browse your service and the code-level vulnerabilities appear in the [Vulnerability Explorer][4]. The `SOURCE` column shows the Code value.

{{< img src="/security/application_security/Code-Level-Vulnerability-Details.mp4" alt="Video showing Vulnerabilities tab, Code source, and inspecting the code vulnerability" video="true" >}}

If you need additional assistance, contact [Datadog support][5].


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-py/releases
[2]: /security/application_security/enabling/compatibility/python
[3]: /security/application_security/enabling/compatibility/python/#asm-capabilities-support
[4]: https://app.datadoghq.com/security/appsec/vm
[5]: /help
[6]: /agent/versions/upgrade_between_agent_minor_versions/
