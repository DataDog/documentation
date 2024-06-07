---
title: Enabling ASM for Software Composition Analysis using Datadog tracing libraries
kind: documentation
disable_toc: false
further_reading:
- link: "/security/default_rules/?category=cat-application-security"
  tag: "Documentation"
  text: "OOTB Application Security Management Rules"
- link: "/security/application_security/troubleshooting"
  tag: "Documentation"
  text: "Troubleshooting Application Security Management"
- link: "/security/application_security/how-appsec-works/"
  tag: "Documentation"
  text: "How Application Security Management Works in Datadog"
- link: "https://www.datadoghq.com/blog/secure-serverless-applications-with-datadog-asm/"
  tag: "Blog"
  text: "Secure serverless applications with Datadog ASM"
---

You can use Datadog Software Composition Analysis (SCA) to monitor the open source libraries in your apps for vulnerabilities.

SCA is configured by setting the `-Ddd.appsec.sca.enabled` flag or the `DD_APPSEC_SCA_ENABLED` environment variable to `true` in supported languages.

This topic explains how to set up SCA using a Java example.

{{% appsec-getstarted %}}

## Example: enabling Software Composition Analysis in Java

1. **Update your [Datadog Java library][1]** to at least version 0.94.0 (at least version 1.1.4 for Software Composition Analysis detection features):

   {{< tabs >}}
   {{% tab "Wget" %}}
   ```shell
   wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```
{{% /tab %}}
{{% tab "cURL" %}}
   ```shell
   curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```
{{% /tab %}}
{{% tab "Dockerfile" %}}
   ```dockerfile
   ADD 'https://dtdg.co/latest-java-tracer' dd-java-agent.jar
   ```
{{% /tab %}}
{{< /tabs >}}
   To check that your service's language and framework versions are supported for ASM capabilities, see [Compatibility][2].

1. **Run your Java application with SCA enabled.** From the command line:
   ```shell
   java -javaagent:/path/to/dd-java-agent.jar -Ddd.appsec.sca.enabled=true -Ddd.service=<MY SERVICE> -Ddd.env=<MY_ENV> -jar path/to/app.jar
   ```

   Or one of the following methods, depending on where your application runs:

   **Note:** Read-only file systems are not supported at this time. The application must have access to a writable `/tmp` directory.

   {{< tabs >}}
{{% tab "Docker CLI" %}}

Update your configuration container for APM by adding the following argument in your `docker run` command:


```shell
docker run [...] -e DD_APPSEC_SCA_ENABLED=true [...]
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

Add the following environment variable value to your container Dockerfile:

```Dockerfile
ENV DD_APPSEC_SCA_ENABLED=true
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
            - name: DD_APPSEC_SCA_ENABLED
              value: "true"
```

{{% /tab %}}
{{% tab "Amazon ECS" %}}

Update your ECS task definition JSON file, by adding this in the environment section:

```json
"environment": [
  ...,
  {
    "name": "DD_APPSEC_SCA_ENABLED",
    "value": "true"
  }
]
```

{{% /tab %}}
{{% tab "AWS Fargate" %}}

Set the `-Ddd.appsec.sca.enabled` flag or the `DD_APPSEC_SCA_ENABLED` environment variable to `true` in your service invocation:

```shell
java -javaagent:dd-java-agent.jar \
     -Ddd.appsec.sca.enabled=true \
     -jar <YOUR_SERVICE>.jar \
     <YOUR_SERVICE_FLAGS>
```

{{% /tab %}}

   {{< /tabs >}}



[1]: https://github.com/DataDog/dd-trace-java/releases
[2]: /security/application_security/enabling/compatibility/java
[3]: /security/application_security/enabling/compatibility/java/#asm-capabilities-support
[4]: https://app.datadoghq.com/security/appsec/vm
[5]: /help
[6]: /agent/versions/upgrade_between_agent_minor_versions/




