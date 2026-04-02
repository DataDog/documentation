---
code_lang: aws-fargate
type: multi-code-lang
code_lang_weight: 60
title: Set up App and API Protection for PHP on AWS Fargate
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

{{% app_and_api_protection_php_overview %}}

## Prerequisites

- AWS Fargate environment
- PHP application containerized with Docker
- AWS CLI configured with appropriate permissions
- Your Datadog API key
- Datadog PHP tracing library (see [version requirements][1])

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
        },
        {
          "name": "DD_SITE",
          "value": "{{< region-param key=\"dd_site\" >}}"
        }
      ]
    }
  ]
}
```

## 2. Enabling App and API Protection monitoring

{{% app_and_api_protection_php_navigation_menu %}}
{{% appsec-remote-config-activation %}}

### Manually enabling App and API Protection monitoring

Ensure your Dockerfile includes the Datadog PHP library:

Add the following to your Dockerfile:

```dockerfile
# Install dd-trace-php
RUN curl -LO https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php
RUN php datadog-setup.php --php-bin=all
# Enable appsec
ENV DD_APPSEC_ENABLED=true
# Configure your service
ENV DD_SERVICE=<YOUR_SERVICE_NAME>
ENV DD_ENV=<YOUR_ENVIRONMENT>
```

{{% collapse-content title="APM Tracing Enabled" level="h4" %}}

Update your task definition to include the PHP application container with App and API Protection configuration:

```json
{
  "containerDefinitions": [
    {
      "name": "your-php-app",
      "image": "your-php-app-image",
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
        },
        {
          "name": "DD_SITE",
          "value": "{{< region-param key=\"dd_site\" >}}"
        }
      ]
    }
  ]
}
```

{{% /collapse-content %}}

{{% collapse-content title="APM Tracing Disabled" level="h4" %}}
To disable APM tracing while keeping App and API Protection enabled, you must set the APM tracing variable to false.

Update your task definition to include the PHP application container with App and API Protection configuration:

```json
{
  "containerDefinitions": [
    {
      "name": "your-php-app",
      "image": "your-php-app-image",
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
        },
        {
          "name": "DD_SITE",
          "value": "{{< region-param key=\"dd_site\" >}}"
        }
      ]
    }
  ]
}
```

{{% /collapse-content %}}

## 3. Running your application

Deploy your Fargate task with the updated configuration:

```bash
aws ecs register-task-definition --cli-input-json file://task-definition.json
aws ecs run-task --cluster your-cluster --task-definition your-task-definition
```

{{% aap/aap_and_api_protection_verify_setup %}}

## Troubleshooting

If you encounter issues while setting up App and API Protection for your PHP application, see the [PHP App and API Protection troubleshooting guide][2].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/setup/php/compatibility
[2]: /security/application_security/setup/php/troubleshooting
