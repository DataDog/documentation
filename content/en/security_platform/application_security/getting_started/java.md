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
---

{{% appsec-getstarted %}}

## Get started

1. **Install or update the Datadog Agent** to at least version 7.31.0: 

   ```
   wget -O dd-java-agent.jar 'https://github.com/DataDog/dd-trace-java/releases/latest/download/dd-java-agent.jar'
   ```

   For other ways of installing the Agent, for example in container environments, see the [Agent in-app documentation][1].

2. **Install the [Datadog tracing library][2]**, at least version 0.92.0.

   For information about which language and framework versions are supported by the library, see [Compatibility][3].

3. **Run your Java application with Application Security enabled.** From the command line:
   ```
   java -javaagent:/path/to/dd-java-agent.jar -Ddd.appsec.enabled=true -Ddd.service=<MY SERVICE> -Ddd.env=<MY_ENV> -jar path/to/app.jar
   ```

   or one of the following methods, depending on where your application runs.

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

Update your configuration yaml file container for APM and add the AppSec env variable:

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

Update your ECS task definition JSON file, by adding this in the  environment section:

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

Set the `-Ddd.appsec.enabled` flag or the `DD_APPSEC_ENABLED` environment variable to true in your service invocation:

```
java -javaagent:dd-java-agent.jar \
     -Ddd.appsec.enabled=true \
     -jar <YOUR_SERVICE>.jar \
     <YOUR_SERVICE_FLAGS>
```

{{% /tab %}}

{{< /tabs >}}


{{% appsec-getstarted-2 %}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://github.com/DataDog/dd-trace-java/releases
[3]: /security_platform/application_security/setup_and_configure/#compatibility
