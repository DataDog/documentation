---
title: APM Agent Configuration
kind: Documentation
aliases:
  - /tracing/languages/
  - /tracing/environments/
  - /tracing/setup/environment
  - /tracing/setup/first_class_dimensions
  - /tracing/getting_further/first_class_dimensions/
further_reading:
- link: "/agent/docker/apm"
  tag: "Documentation"
  text: "Docker APM setup"
- link: "/integrations/amazon_ecs/#trace-collection"
  tag: "Documentation"
  text: "ECS EC2 APM setup"
- link: "/integrations/ecs_fargate/#trace-collection"
  tag: "Documentation"
  text: "ECS Fargate APM setup"
---

To use APM, start by downloading the Datadog Agent and then configure your agent to receive traces. For the full overview of all of the steps to set up APM, see the [APM overivew][1].

Tracing metrics are sent to the Agent from your application: the application code instrumentation sends to the Agent every second (for example, see [the Python client][2]) and the Agent sends to the Datadog API every 10 seconds.

To start tracing your application, [install the Datadog Agent][3], and then [Configure the Datadog Agent to receive traces](#setting-up-trace-collection).

## Setting up trace collection

APM is enabled by default in Agent 6. Set `apm_non_local_traffic: true` if you are sending traces from a nonlocal environment (like a container). To get an overview of all the possible settings for APM, take a look at the Agent's [`datadog.example.yaml`][4] configuration file.
For more information about the Datadog Agent, see the [dedicated doc page][5] or refer to the [`datadog.yaml` templates][6].

## Configure your environment

There are several ways to specify an environment when reporting data:

1. Host tag: Use a host tag with the format env:<ENVIRONMENT> to tag all traces from that Agent accordingly.
2. Agent configuration: Override the default tag used by the Agent in the Agent configuration file. This tags all traces coming through the Agent, overriding the host tag value.
  apm_config:
  env: <ENVIRONMENT>
4. Per trace: When submitting a single trace, specify an environment by tagging one of its spans with the metadata key env. This overrides the Agent configuration and the host tag’s value (if any). Consult the trace tagging documentationto learn how to assign a tag to your traces.

## Other ways to collect traces

There are alternernates to the Agent that you can use to collect traces.

### Containers

Once your application is instrumented with the tracing client, by default traces will be sent to `localhost:8126`. See the specific setup instructions to ensure that the Agent is configured to receive traces in a containerized environment:

{{< partial name="apm/apm-containers.html" >}}

### Lamda - X-Ray

For more information abut setting up Lamda - X-Ray, see the [Amazon X-Ray integration documentation][7]

### Heroku

Tracing is enabled by default when monitoring with Heroku. For more information abut configuring tracing for Heroku, see the [Heroku cloud documentation][8].

### Cloud Foundry

Tracing is enabled by default when monitoring with Cloud Foundry. For more information abut configuring tracing for Cloud Foundry, see the [Cloud Foundry documentation][9].

### Other(GAE, AAS, Serverless)

Datadog APM currently requires sending trace data to a running Agent. A workaround for enabling trace collection for a serverless setup is to setup a separate VM that accepts trace traffic externally.

## Next steps

For the full overview of all of the steps to set up APM, see the [APM overivew][1].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing
[2]: https://github.com/DataDog/dd-trace-py
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://github.com/DataDog/datadog-trace-agent/blob/6.4.1/datadog.example.yaml
[5]: /agent
[6]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[7]: /integrations/amazon_xray/#overview
[8]: /agent/basic_agent_usage/heroku/#installation
[9]: /integrations/cloud_foundry/#trace-collection
