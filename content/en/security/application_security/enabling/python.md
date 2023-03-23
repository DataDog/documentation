---
title: Enabling ASM for Python
kind: documentation
code_lang: python
type: multi-code-lang
code_lang_weight: 50
aliases:
  - /security_platform/application_security/getting_started/python
  - /security/application_security/getting_started/python
further_reading:
    - link: "/security/application_security/add-user-info/"
      tag: "Documentation"
      text: "Adding user information to traces"
    - link: 'https://github.com/DataDog/dd-trace-py'
      tag: 'GitHub'
      text: 'Python Datadog library source code'
    - link: "/security/default_rules/#cat-application-security"
      tag: "Documentation"
      text: "OOTB Application Security Management Rules"
    - link: "/security/application_security/troubleshooting"
      tag: "Documentation"
      text: "Troubleshooting Application Security Management"
---

You can monitor the security of your Python apps running in Docker, Kubernetes, AWS ECS, and AWS Fargate.

{{% appsec-getstarted %}}

## Get started

1. **Update your Datadog Python library package** to at least version 1.2.2 (at least version 1.5.0 for Risk Management vulnerability detection features). Run the following:
   ```shell
   pip install --upgrade ddtrace
   ```

   For information about which language and framework versions are supported by the library, see the [Compatibility][1] section of the ASM Setup and Configure documentation.

2. **Enable ASM when starting the Python application**.

   ```bash
   DD_APPSEC_ENABLED=true ddtrace-run python app.py
   ```

    You can also use one of the following methods, depending on where your application runs:
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

   Update your configuration YAML file container for APM and add the `DD_APPSEC_ENABLED` environment variable:

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

   Update your ECS task definition JSON file by adding the following in the environment section:

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

   Initialize ASM in your code or set the `DD_APPSEC_ENABLED` environment variable to `true` in your service invocation:
   ```shell
   DD_APPSEC_ENABLED=true ddtrace-run python app.py
   ```

   {{% /tab %}}
   {{< /tabs >}}

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln.mp4" alt="Video showing Signals explorer and details, and Vulnerabilities explorer and details." video="true" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/setup_and_configure/?code-lang=python#compatibility
