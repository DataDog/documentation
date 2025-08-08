---
title: Enabling Application & API Protection for PHP
code_lang: php
type: multi-code-lang
code_lang_weight: 40
aliases:
  - /security_platform/application_security/getting_started/php
  - /security/application_security/getting_started/php
  - /security/application_security/enabling/tracing_libraries/threat_detection/php/
  - /security/application_security/threats/setup/standalone/php
further_reading:
    - link: "/security/application_security/add-user-info/"
      tag: "Documentation"
      text: "Adding user information to traces"
    - link: 'https://github.com/DataDog/dd-trace-php'
      tag: "Source Code"
      text: 'PHP Datadog Tracer Library source code'
    - link: "/security/default_rules/?category=cat-application-security"
      tag: "Documentation"
      text: "OOTB App & API Protection Rules"
    - link: "/security/application_security/troubleshooting"
      tag: "Documentation"
      text: "Troubleshooting App & API Protection"
---

You can monitor App and API Protection for PHP apps running in host-based or container-based environments such as Docker, Kubernetes, AWS ECS, and AWS EKS.

{{% appsec-getstarted-standalone %}}

## Enabling Application & API Protection
### Get started

1. **Install the latest Datadog PHP library** by downloading and running the installer:
   ```shell
   wget https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php -O datadog-setup.php
   php datadog-setup.php --php-bin all --enable-appsec
   ```
   To check that your service's language and framework versions are supported for Application & API Protection capabilities, see [Compatibility][1].

2. **Enable the library in your code** by restarting PHP-FPM or Apache. In a containerized environment, if you previously installed the library without enabling Application & API Protection, you can optionally enable it after by setting the following environment variables:
   {{< tabs >}}
{{% tab "Docker CLI" %}}

Update your configuration container for APM by adding the following arguments in your `docker run` command:

```shell
docker run [...] -e DD_APPSEC_ENABLED=true -e DD_APM_TRACING_ENABLED=false [...]
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

Add the following environment variable values to your container Dockerfile:

```Dockerfile
ENV DD_APPSEC_ENABLED=true
ENV DD_APM_TRACING_ENABLED=false
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Update your configuration yaml file container for APM and add the environment variables:

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
            - name: DD_APM_TRACING_ENABLED
              value: "false"
```

{{% /tab %}}
{{% tab "AWS ECS" %}}

Update your ECS task definition JSON file, by adding these in the environment section:

```json
"environment": [
  ...,
  {
    "name": "DD_APPSEC_ENABLED",
    "value": "true"
  },
  {
    "name": "DD_APM_TRACING_ENABLED",
    "value": "false"
  }
]
```

{{% /tab %}}

{{< /tabs >}}

{{% appsec-getstarted-2-canary %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Video showing Signals explorer and details, and Vulnerabilities explorer and details." video="true" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/setup/compatibility/php/
