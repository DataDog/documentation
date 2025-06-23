 ---
title: Setup App and API Protection for Python on AWS Fargate
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

This guide explains how to set up App and API Protection (AAP) for Python applications running on Kubernetes. The setup involves:
1. Installing the Datadog Agent
2. Installing the Datadog Python library
3. Configuring your Python application
4. Enabling AAP monitoring

{{% appsec-getstarted %}}

## AWS Prerequisites

- AWS Fargate environment
- AWS CLI configured with appropriate permissions

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

## Library setup

To enable AAP capabilities, you need the Datadog Python tracing library (version 0.94.0 or higher) installed in your application environment.

### Download the library

Add the following to your application's Dockerfile:

```dockerfile
ADD 'https://dtdg.co/latest-python-tracer' /dd-python-agent.jar
```

### Verify compatibility

To check that your service's language and framework versions are supported for AAP capabilities, see [Single Step Instrumentation Compatibility][2].

## Service configuration

### Standalone billing alternative

If you want to use Application Security Management without APM tracing functionality, you can deploy with [Standalone App and API Protection][4]. This configuration reduces the amount of APM data sent to Datadog to the minimum required by App and API Protection products.

To enable standalone mode:
1. Set `DD_APM_TRACING_ENABLED=false` environment variable
2. Keep `DD_APPSEC_ENABLED=true` environment variable
3. This configuration will minimize APM data while maintaining full security monitoring capabilities

### Enabling AAP

#### Run your application with AAP enabled

Update your task definition to include the Python agent and AAP configuration:

```json
{
  "containerDefinitions": [
    {
      "name": "your-python-app",
      "image": "your-python-app-image",
      "environment": [
        {
          "name": "DD_APPSEC_ENABLED",
          "value": "true"
        },
        {
          "name": "DD_SERVICE",
          "value": "<YOUR_SERVICE_NAME>"
        },
        {
          "name": "DD_ENV",
          "value": "<YOUR_ENVIRONMENT>"
        }
      ],
      "command": [
        "python",
        "-pythonagent:/dd-python-agent.jar",
        "-jar",
        "/app.jar"
      ]
    }
  ]
}
```

**Important considerations:**
- **File system requirements**: Read-only file systems are not currently supported. The application must have access to a writable `/tmp` directory.
- **Service identification**: Always specify `DD_SERVICE` (or `-Ddd.service`) and `DD_ENV` (or `-Ddd.env`) for proper service identification in Datadog.

## Verify setup

To verify that AAP is working correctly:

1. Send some traffic to your application
2. Check the [Application Signals Explorer][5] in Datadog
3. Look for security signals and vulnerabilities

## Troubleshooting

If you encounter issues while setting up App and API Protection for your Python application, see the [Python App and API Protection troubleshooting guide][3].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/single-step-apm/?tab=awsfargate
[2]: https://app.datadoghq.com/security/appsec
[3]: /security/application_security/setup/environments/python/troubleshooting
[4]: /security/application_security/setup/python/standalone
[5]: https://app.datadoghq.com/security/appsec
