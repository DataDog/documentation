---
title: Enabling ASM for Java
kind: documentation
code_lang: java
type: multi-code-lang
code_lang_weight: 0
aliases:
  - /security_platform/application_security/getting_started/java
  - /security/application_security/getting_started/java
further_reading:
- link: "/security/application_security/add-user-info/"
  tag: "Documentation"
  text: "Adding user information to traces"
- link: 'https://github.com/DataDog/dd-trace-java'
  tag: 'GitHub'
  text: 'Java Datadog library source code'
- link: "/security/default_rules/#cat-application-security"
  tag: "Documentation"
  text: "OOTB Application Security Management Rules"
- link: "/security/application_security/troubleshooting"
  tag: "Documentation"
  text: "Troubleshooting Application Security Management"

---

You can monitor application security for Java apps running in Docker, Kubernetes, AWS ECS, and AWS Fargate.

{{% appsec-getstarted %}}

{{% appsec-getstarted-with-rc %}}

## Get started

1. **Update your [Datadog Java library][1]** to at least version 0.94.0 (at least version 1.1.4 for Risk Management vulnerability detection features):
   ```shell
   wget -O dd-java-agent.jar 'https://github.com/DataDog/dd-trace-java/releases/latest/download/dd-java-agent.jar'
   ```

   To check that your service's language and framework versions are supported for ASM capabilities, see [Compatibility][2].

2. **Run your Java application with ASM enabled.** From the command line:
   ```shell
   java -javaagent:/path/to/dd-java-agent.jar -Ddd.appsec.enabled=true -Ddd.service=<MY SERVICE> -Ddd.env=<MY_ENV> -jar path/to/app.jar
   ```

   Or one of the following methods, depending on where your application runs:

   **Note:** Read-only file systems are not currently supported. The application must have access to a writable `/tmp` directory.

   {{< tabs >}}
{{% tab "Docker CLI" %}}

Update your configuration container for APM by adding the following argument in your `docker run` command:


```shell
docker run [...] -e DD_APPSEC_ENABLED=true [...]
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

Add the following environment variable value to your container Dockerfile:

```Dockerfile
ENV DD_APPSEC_ENABLED=true
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Update your deployment configuration file for APM and add the ASM environment variable:

```yaml
spec:
  template:
    spec:
      containers:
        - name: <CONTAINER_NAME>
          image: <CONTAINER_IMAGE>/<TAG>
          env:
            - name: DD_APPSEC_ENABLED
              value: "true"
```

{{% /tab %}}
{{% tab "AWS ECS" %}}

Update your ECS task definition JSON file, by adding this in the environment section:

```json
"environment": [
  ...,
  {
    "name": "DD_APPSEC_ENABLED",
    "value": "true"
  }
]
```

{{% /tab %}}
{{% tab "AWS Fargate" %}}

Set the `-Ddd.appsec.enabled` flag or the `DD_APPSEC_ENABLED` environment variable to `true` in your service invocation:

```shell
java -javaagent:dd-java-agent.jar \
     -Ddd.appsec.enabled=true \
     -jar <YOUR_SERVICE>.jar \
     <YOUR_SERVICE_FLAGS>
```

{{% /tab %}}

   {{< /tabs >}}

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln.mp4" alt="Video showing Signals explorer and details, and Vulnerabilities explorer and details." video="true" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-java/releases
[2]: /security/application_security/enabling/compatibility/java
