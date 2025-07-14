---
code_lang: aws-fargate
type: multi-code-lang
code_lang_weight: 60
title: Setup App and API Protection for Ruby on AWS Fargate
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

{{% app-and-api-protection-ruby-overview %}}

## Prerequisites

- AWS Fargate environment
- Ruby application containerized with Docker
- AWS CLI configured with appropriate permissions
- Your Datadog API key
- Datadog Ruby tracing library (see version requirements [here][1])

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

Add the `datadog` gem to your Gemfile:

```ruby
gem 'datadog', '~> 2.0'
```

{{% collapse-content title="APM Tracing Enabled" level="h4" %}}
{{< tabs >}}
{{% tab "Configuration file" %}}

Configure Datadog library in `config/initializers/datadog.rb`:

```ruby
Datadog.configure do |c|
  c.service = 'your_service_name'
  c.agent.host = 'your_agent_host'

  c.tracing.enabled = true
  c.appsec.enabled = true
end
```

{{% /tab %}}
{{% tab "Environment Variables" %}}

Update your task definition to include App and API Protection configuration:

```json
{
  "containerDefinitions": [
    {
      "name": "your-app",
      "image": "your-app-image",
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
        "bin/rails",
        "server"
      ]
    }
  ]
}
```

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="APM Tracing Disabled" level="h4" %}}
To disable APM tracing while keeping App and API Protection enabled, you must set the APM tracing configuration to false.
{{< tabs >}}
{{% tab "Configuration file" %}}

Configure Datadog library in `config/initializers/datadog.rb`:

```ruby
Datadog.configure do |c|
  c.service = 'your_service_name'
  c.agent.host = 'your_agent_host'

  c.tracing.enabled = false
  c.appsec.enabled = true
end
```

{{% /tab %}}
{{% tab "Environment variables" %}}

Update your task definition to include App and API Protection configuration with APM tracing disabled:

```json
{
  "containerDefinitions": [
    {
      "name": "your-app",
      "image": "your-app-image",
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
        "bin/rails",
        "server"
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

## 4. Verify setup

To verify that App and API Protection is working correctly:

1. Send some traffic to your application
2. Check the [Application Signals Explorer](https://app.datadoghq.com/security/appsec) in Datadog
3. Look for security signals and vulnerabilities

## Troubleshooting

If you encounter issues while setting up App and API Protection for your Ruby application, see the [Ruby App and API Protection troubleshooting guide][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/setup/ruby/compatibility
[2]: /security/application_security/setup/ruby/troubleshooting
