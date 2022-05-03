---
title: PHP Applications
kind: documentation
code_lang: php
type: multi-code-lang
code_lang_weight: 40
further_reading:
    - link: 'https://github.com/DataDog/dd-appsec-php'
      tag: 'GitHub' 
      text: 'PHP Datadog AppSec Library source code'
    - link: 'https://github.com/DataDog/dd-trace-php'
      tag: 'GitHub'
      text: 'PHP Datadog Tracer Library source code'
    - link: "/security_platform/default_rules/#cat-application-security"
      tag: "Documentation"
      text: "OOTB Application Security Monitoring Rules"
    - link: "/security_platform/application_security/troubleshooting"
      tag: "Documentation"
      text: "Troubleshooting Application Security Monitoring"
---

You can monitor application security for PHP apps running in Docker, Kubernetes, and AWS ECS. 

{{% appsec-getstarted %}}

## Get started

1. **Install the latest Datadog PHP library** by downloading and running the installer:
   ```shell
   wget https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php -O datadog-setup.php
   php datadog-setup.php --php-bin all --enable-appsec
   ```
   For information about which language and framework versions are supported by the library, see [Compatibility][1].

2. **Enable the library in your code** by restarting PHP-FPM or Apache. In a containerized environment, if you previously installed the library without enabling ASM, you can optionally enable it after by setting the following environment variable:
   {{< tabs >}}
{{% tab "Docker CLI" %}}

Update your configuration container for APM by adding the following argument in your `docker run` command: 

```shell
docker run [...] -e DD_APPSEC_ENABLED=true [...] 
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

Add the following environment variable value to your container Dockerfile:

```shell
ENV DD_APPSEC_ENABLED=true
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Update your configuration yaml file container for APM and add the AppSec env variable:

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

{{< /tabs >}}

{{% appsec-getstarted-2-canary %}}

{{< img src="/security_platform/application_security/application-security-signal.png" alt="Security Signal details page showing tags, metrics, suggested next steps, and attacker IP addresses associated with a threat." style="width:100%;" >}}

## Further Reading 

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security_platform/application_security/setup_and_configure/?code-lang=php#compatibility
