---
title: Enabling AAP for Python
code_lang: python
type: multi-code-lang
code_lang_weight: 50
aliases:
  - /security_platform/application_security/getting_started/python
  - /security/application_security/getting_started/python
  - /security/application_security/enabling/tracing_libraries/threat_detection/python
  - /security/application_security/threats/setup/threat_detection/python
  - /security/application_security/threats_detection/python
  - /security/application_security/setup/aws/fargate/python
further_reading:
    - link: "/security/application_security/add-user-info/"
      tag: "Documentation"
      text: "Adding user information to traces"
    - link: 'https://github.com/DataDog/dd-trace-py'
      tag: "Source Code"
      text: 'Python Datadog library source code'
    - link: "/security/default_rules/?category=cat-application-security"
      tag: "Documentation"
      text: "OOTB App and API Protection Rules"
    - link: "/security/application_security/troubleshooting"
      tag: "Documentation"
      text: "Troubleshooting App and API Protection"
---

You can monitor the security of your Python apps running in Docker, Kubernetes, Amazon ECS, and AWS Fargate.

{{% appsec-getstarted %}}

## Enabling threat detection

### Get started

1. **Update your Datadog Python library package** to at least version 1.2.2. Run the following:
   ```shell
   pip install --upgrade ddtrace
   ```

   To check that your service's language and framework versions are supported for AAP capabilities, see [Compatibility][1].

2. **Enable AAP when starting the Python application**.

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
   {{% tab "Amazon ECS" %}}

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

   Initialize AAP in your code or set the `DD_APPSEC_ENABLED` environment variable to `true` in your service invocation:
   ```shell
   DD_APPSEC_ENABLED=true ddtrace-run python app.py
   ```

   {{% /tab %}}
   {{< /tabs >}}

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Video showing Signals explorer and details, and Vulnerabilities explorer and details." video="true" >}}

## Using AAP without APM tracing

If you want to use Application & API Protection without APM tracing functionality, you can deploy with tracing disabled:

1. Configure your tracing library with the `DD_APM_TRACING_ENABLED=false` environment variable in addition to the `DD_APPSEC_ENABLED=true` environment variable.
2. This configuration will reduce the amount of APM data sent to Datadog to the minimum required by App and API Protection products.

For more details, see [Standalone App and API Protection][standalone_billing_guide].
[standalone_billing_guide]: /security/application_security/guide/standalone_application_security/

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/setup/compatibility/php/
