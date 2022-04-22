---
title: Java Applications
kind: documentation
code_lang: java
type: multi-code-lang
code_lang_weight: 0
further_reading:
- link: 'https://github.com/DataDog/dd-trace-java'
  tag: 'GitHub'
  text: 'Java Datadog Library source code'
- link: "/security_platform/default_rules/#cat-application-security"
  tag: "Documentation"
  text: "OOTB Application Security Monitoring Rules"
- link: "/security_platform/application_security/troubleshooting"
  tag: "Documentation"
  text: "Troubleshooting Application Security Monitoring"

---

You can monitor application security for Java apps running in Docker, Kubernetes, AWS ECS, and AWS Fargate. 

{{% appsec-getstarted %}}

## Get started

1. **Update your [Datadog Java library][1]** to at least version 0.94.0:
   ```
   wget -O dd-java-agent.jar 'https://github.com/DataDog/dd-trace-java/releases/latest/download/dd-java-agent.jar'
   ```

   For information about which language and framework versions are supported by the library, see [Compatibility][2].

2. **Run your Java application with ASM enabled.** From the command line:
   ```
   java -javaagent:/path/to/dd-java-agent.jar -Ddd.appsec.enabled=true -Ddd.service=<MY SERVICE> -Ddd.env=<MY_ENV> -jar path/to/app.jar
   ```

   Or one of the following methods, depending on where your application runs:

   {{< tabs >}}
{{% tab "Docker CLI" %}}

Update your configuration container for APM by adding the following argument in your `docker run` command: 

```
docker run [...] -e DD_APPSEC_ENABLED=true [...] 
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

Add the following environment variable value to your container Dockerfile:

```
ENV DD_APPSEC_ENABLED=true
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Update your deployment configuration file for APM and add the ASM environment variable:

```
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

```
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

```
java -javaagent:dd-java-agent.jar \
     -Ddd.appsec.enabled=true \
     -jar <YOUR_SERVICE>.jar \
     <YOUR_SERVICE_FLAGS>
```

{{% /tab %}}

{{< /tabs >}}

{{% appsec-getstarted-2-canary %}}

{{< img src="/security_platform/application_security/application-security-signal.png" alt="Security Signal details page showing tags, metrics, suggested next steps, and attacker IP addresses associated with a threat." style="width:100%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-java/releases
[2]: /security_platform/application_security/setup_and_configure/?code-lang=java#compatibility
