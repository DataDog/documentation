---
title: Agent Configuration
kind: Documentation
aliases:
  - /tracing/setup/
  - /tracing/environments/
  - /tracing/setup/environment
  - /tracing/setup/first_class_dimensions
  - /tracing/getting_further/first_class_dimensions/
  - /agent/apm/
further_reading:
- link: "/tracing/troubleshooting/agent_apm_metrics/"
  tag: "Documentation"
  text: "APM metrics sent by the Datadog Agent"
- link: "/agent/docker/apm/"
  tag: "Documentation"
  text: "Docker APM setup"
- link: "/integrations/amazon_ecs/#trace-collection"
  tag: "Documentation"
  text: "ECS EC2 APM setup"
- link: "/integrations/ecs_fargate/#trace-collection"
  tag: "Documentation"
  text: "ECS Fargate APM setup"
---

To use APM, start by sending your [traces][1] to Datadog, and then [configure your environment](#configure-your-environment). You can send traces to Datadog in multiple different ways depending on your system setup: including using the [Datadog Agent locally](#datadog-agent), [on containers](#containers), and [several other ways](#additional-environments). For the full overview of all of the steps to set up APM, see the [APM overview][2].

## Datadog Agent

APM is enabled by default in Agent 6. If you are sending traces from a nonlocal environment (like a container), set `apm_non_local_traffic: true` in your main [`datadog.yaml` configuration file][3].

To get an overview of all the possible settings for APM, take a look at the Agent's [`datadog.example.yaml` configuration file][4]. For all of the metrics sent to Datadog by the Agent, see [APM metrics sent by the Datadog Agent][5]. For more information about the Datadog Agent, see the [Agent documentation][6] or refer to the [`datadog.yaml` configuration template][4].

## Containers

See the specific setup instructions to ensure that the Agent is configured to receive traces in a containerized environment:

{{< partial name="apm/apm-containers.html" >}}
</br>
Note: After having instrumented your application, the tracing client sends traces to `localhost:8126` by default.

## Serverless

### AWS Lambda

To set up Datadog APM in AWS Lambda, see the [Lambda integration documentation][7]. Alternatively, you can use [AWS X-Ray][8] to trace your Lambda functions.

### Azure App Services

The Datadog extension for Azure App Services provides tracing capabilities for Azure Web Apps. For more information setting up tracing in Azure, see the [Azure App Services Extension documentation][9].

### Google App Engine

Datadog APM requires sending trace data to a running Agent. A workaround for enabling trace collection for a serverless setup is to configure a separate VM that accepts trace traffic externally.

## Additional environments

There are alternatives to the Agent and containers that you can use to collect traces.

### Heroku

Tracing is enabled by default when monitoring with Heroku. For more information about configuring tracing for Heroku, see the [Heroku cloud documentation][10].

### Cloud Foundry

Tracing is enabled by default when monitoring with Cloud Foundry. For more information about configuring tracing for Cloud Foundry, see the [Cloud Foundry documentation][11].

## Configure your environment

See our guide on setting the [`env` tag and an additional primary tag for scoping APM data][12].

## Next steps

Next, [Instrument your application][13]. For the full overview of all of the steps to set up APM, see the [APM overview][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/visualization/#trace
[2]: /tracing/
[3]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[4]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[5]: /tracing/send_traces/agent-apm-metrics/
[6]: /agent/
[7]: /integrations/amazon_lambda/#trace-collection
[8]: /integrations/amazon_xray/#overview
[9]: /infrastructure/serverless/azure_app_services/#overview
[10]: /agent/basic_agent_usage/heroku/#installation
[11]: /integrations/cloud_foundry/#trace-collection
[12]: /tracing/guide/setting_primary_tags_to_scope/#definition
[13]: /tracing/setup/
