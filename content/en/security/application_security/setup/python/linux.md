---
title: Setup App and API Protection for Python on Linux
code_lang: linux
type: multi-code-lang
code_lang_weight: 30
further_reading:
  - link: "/security/application_security/how-it-works/"
    tag: "Documentation"
    text: "How App and API Protection Works"
  - link: "/security/default_rules/?category=cat-application-security"
    tag: "Documentation"
    text: "OOTB App and API Protection Rules"
  - link: "/security/application_security/troubleshooting"
    tag: "Documentation"
    text: "Troubleshooting App and API Protection"
---

{{< partial name="app_and_api_protection/callout.html" >}}

{{< partial name="app_and_api_protection/python/overview.html" >}}

This guide explains how to set up App and API Protection (AAP) for Python applications running on Linux systems. The setup involves:
1. Installing the Datadog Python library
2. Configuring your Python application
3. Enabling AAP monitoring

{{% appsec-getstarted %}}

## Operating System Prerequisites

- Linux system (Ubuntu, CentOS, RHEL, etc.)
- Python 3.6 or higher

## Setup


### 1. Install the Datadog Agent

Install the Datadog Agent in your Fargate task definition:

```json
{
  "containerDefinitions": [
    {
      "name": "datadog-agent",
      "image": "public.ecr.aws/datadog/agent:latest",
      "environment": [
        {
          "name": "DD_API_KEY",
          "value": "<YOUR_API_KEY>"
        },
        {
          "name": "DD_APM_ENABLED",
          "value": "true"
        },
        {
          "name": "DD_APM_NON_LOCAL_TRAFFIC",
          "value": "true"
        }
      ]
    }
  ]
}
```

### 2. Update your Datadog Python library package

**Update your Datadog Python library package** to at least version 1.2.2. Run the following:

```shell
pip install --upgrade ddtrace
```

To check that your service's language and framework versions are supported for AAP capabilities, see [Compatibility][1].

### 3. Enable AAP when starting your application

Set the environment variable and use `ddtrace-run`:

```bash
export DD_APPSEC_ENABLED=true
ddtrace-run python app.py
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
{{< /tabs >}}

{{% appsec-verify-setup %}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/setup/compatibility/python/
