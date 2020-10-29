---
title: Set up Datadog APM
kind: documentation
description: "Get Started with Datadog APM"
aliases:
    - /tracing/setup
    - /tracing/send_traces/
    - /tracing/setup/
    - /tracing/environments/
    - /tracing/setup/environment
    - /tracing/setup/first_class_dimensions
    - /tracing/getting_further/first_class_dimensions/
    - /agent/apm/
---

Configuring your application to send [traces][1] to Datadog involves two main steps: Configuring the Datadog Agent and [Instrumenting your application][2].

Depending on your environment, there are different ways to configure the Datadog Agent.

{{< partial name="apm/apm-compatibility.html" >}}

### Follow the in-app documentation (Recommended)

For step-by-step instructions scoped to your deployment configuration (hosts, Docker, Kubernetes, or Amazon ECS), follow the [Quickstart instructions][3] within the Datadog app.

{{< tabs >}}
{{% tab "Locally" %}}
APM is enabled by default in Agent 6. If you are sending traces from a nonlocal environment (like a container), set `apm_non_local_traffic: true` in your main [`datadog.yaml` configuration file][1].

To get an overview of all the possible settings for APM, take a look at the Agent's [`datadog.example.yaml` configuration file][2].

[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
{{% /tab %}}
{{% tab "Containers" %}}

See the specific setup instructions to ensure that the Agent is configured to receive traces in a containerized environment:

{{< partial name="apm/apm-containers.html" >}}
</br>
Note: After having instrumented your application, the tracing client sends traces to `localhost:8126` by default.

{{% /tab %}}
{{% tab "Serverless" %}}

### AWS Lambda

To set up Datadog APM in AWS Lambda, see the [Tracing Serverless Functions][1] documentation.

### Azure App Services

The Datadog extension for Azure App Services provides tracing capabilities for Azure Web Apps. For more information setting up tracing in Azure, see the [Azure App Services Extension documentation][2].

### Google App Engine

Datadog APM requires sending trace data to a running Agent. A workaround for enabling trace collection for a serverless setup is to configure a separate VM that accepts trace traffic externally.

[1]: /tracing/serverless_functions/
[2]: /infrastructure/serverless/azure_app_services/#overview
{{% /tab %}}
{{% tab "Other Environments" %}}

### Heroku

Tracing is enabled by default when monitoring with Heroku. For more information about configuring tracing for Heroku, see the [Heroku cloud documentation][1].

### Cloud Foundry

Tracing is enabled by default when monitoring with Cloud Foundry. For more information about configuring tracing for Cloud Foundry, see the [Cloud Foundry documentation][2].

### AWS Elastic Beanstalk

Tracing is enabled by default when monitoring with AWS Elastic Beanstalk. For more information about configuring tracing for AWS Elastic Beanstalk, see the [AWS Elastic Beanstalk documentation][3].

[1]: /agent/basic_agent_usage/heroku/#installation
[2]: /integrations/cloud_foundry/#trace-collection
[3]: /integrations/amazon_elasticbeanstalk/
{{% /tab %}}
{{< /tabs >}}


[1]: /tracing/visualization/#trace
[2]: /tracing/setup/
[3]: https://app.datadoghq.com/apm/docs
