---
code_lang: aws-fargate
type: multi-code-lang
code_lang_weight: 60
title: Set up App and API Protection for Java on AWS Fargate
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

{{% app_and_api_protection_java_overview %}}

## Prerequisites

- AWS Fargate environment
- Java application containerized with Docker
- AWS CLI configured with appropriate permissions
- Your Datadog API key
- Datadog Java tracing library (see [version requirements][1])

## 1. Installing the Datadog Agent

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

## 2. Enabling App and API Protection monitoring

{{% app_and_api_protection_navigation_menu %}}

{{% appsec-remote-config-activation %}}

### Manually enabling App and API Protection monitoring
Download the latest version of the Datadog Java library:

```dockerfile
ADD 'https://dtdg.co/latest-java-tracer' /dd-java-agent.jar
```

{{% collapse-content title="APM Tracing Enabled" level="h4" %}}
{{< tabs >}}
{{% tab "Using system properties" %}}

Update your task definition to include the Java agent and App and API Protection configuration:

```json
{
  "containerDefinitions": [
    {
      "name": "your-java-app",
      "image": "your-java-app-image",
      "command": [
        "java",
        "-javaagent:/dd-java-agent.jar",
        "-Ddd.appsec.enabled=true",
        "-Ddd.service=<MY_SERVICE>",
        "-Ddd.env=<MY_ENV>",
        "-jar",
        "/app.jar"
      ]
    }
  ]
}
```

{{% /tab %}}
{{% tab "Using environment variables" %}}

Update your task definition to include the Java agent and App and API Protection configuration:

```json
{
  "containerDefinitions": [
    {
      "name": "your-java-app",
      "image": "your-java-app-image",
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
        "java",
        "-javaagent:/dd-java-agent.jar",
        "-jar",
        "/app.jar"
      ]
    }
  ]
}
```

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="APM Tracing Disabled" level="h4" %}}
To disable APM tracing while keeping App and API Protection enabled, you must set the APM tracing variable to false.
{{< tabs >}}
{{% tab "Using system properties" %}}

Update your task definition to include the Java agent and App and API Protection configuration with APM tracing disabled:

```json
{
  "containerDefinitions": [
    {
      "name": "your-java-app",
      "image": "your-java-app-image",
      "command": [
        "java",
        "-javaagent:/dd-java-agent.jar",
        "-Ddd.appsec.enabled=true",
        "-Ddd.apm.tracing.enabled=false",
        "-Ddd.service=<MY_SERVICE>",
        "-Ddd.env=<MY_ENV>",
        "-jar",
        "/app.jar"
      ]
    }
  ]
}
```

{{% /tab %}}
{{% tab "Using environment variables" %}}

Update your task definition to include the Java agent and App and API Protection configuration with APM tracing disabled:

```json
{
  "containerDefinitions": [
    {
      "name": "your-java-app",
      "image": "your-java-app-image",
      "environment": [
        {
          "name": "DD_APPSEC_ENABLED",
          "value": "true"
        },
        {
          "name": "DD_APM_TRACING_ENABLED",
          "value": "false"
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
        "java",
        "-javaagent:/dd-java-agent.jar",
        "-jar",
        "/app.jar"
      ]
    }
  ]
}
```

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

## 3. Run your application

Deploy your Fargate task with the updated configuration:

```bash
aws ecs register-task-definition --cli-input-json file://task-definition.json
aws ecs run-task --cluster your-cluster --task-definition your-task-definition
```

{{% app_and_api_protection_verify_setup %}}

## Troubleshooting

If you encounter issues while setting up App and API Protection for your Java application, see the [Java App and API Protection troubleshooting guide][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/setup/java/compatibility
[2]: /security/application_security/setup/java/troubleshooting


