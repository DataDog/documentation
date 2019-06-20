---
title: Enable trace collection in Datadog
kind: Documentation
aliases:
  - /tracing/languages/
  - /tracing/environments/
  - /tracing/setup/environment
  - /tracing/setup/first_class_dimensions
  - /tracing/getting_further/first_class_dimensions/
  - /agent/apm/
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

To use APM, start by sending your traces to Datadog, and then [configure your environment](#-configure-your-environment). You can send traces to Datadog in multiple different ways depending on your system setup: including using the [Datadog Agent locally](#datadog-agent), [on containers](#containers), and [several other ways](#-additional-environments). For the full overview of all of the steps to set up APM, see the [APM overivew][1].

## Datadog Agent

APM is enabled by default in Agent 6. Set `apm_non_local_traffic: true` in your main [`datadog.yaml` configuration file][2] if you are sending traces from a nonlocal environment (like a container).
To get an overview of all the possible settings for APM, take a look at the Agent's [`datadog.example.yaml`][3] configuration file. For more information about the Datadog Agent, see the [Agent documentation][4] or refer to the [`datadog.yaml` configuration template][5].

## Containers

See the specific setup instructions to ensure that the Agent is configured to receive traces in a containerized environment:

{{< partial name="apm/apm-containers.html" >}}
</br>
Note: After having instrumented your application, the tracing client sends traces to `localhost:8126` by default.

## Additional environments

There are alternernates to the Agent and containers that you can use to collect traces.

### Lambda - X-Ray

For more information setting up Lambda - X-Ray, see the [Amazon X-Ray integration documentation][6]

### Heroku

Tracing is enabled by default when monitoring with Heroku. For more information about configuring tracing for Heroku, see the [Heroku cloud documentation][7].

### Cloud Foundry

Tracing is enabled by default when monitoring with Cloud Foundry. For more information about configuring tracing for Cloud Foundry, see the [Cloud Foundry documentation][8].

### Other(GAE, AAS, Serverless)

Datadog APM currently requires sending trace data to a running Agent. A workaround for enabling trace collection for a serverless setup is to setup a separate VM that accepts trace traffic externally.

## Configure your environment

There are several ways to specify [an environment][9] when reporting data:

1. **Host tag**: Use a host tag with the format `env:<ENVIRONMENT>` to tag all traces from that Agent accordingly.
2. **Agent configuration**: Override the default tag used by the Agent in the Agent configuration file. This tags all traces coming through the Agent, overriding the host tag value.
  ```
  apm_config:
  env: <ENVIRONMENT>
  ```
3. **Per trace**: When submitting a single trace, specify an environment by tagging one of its spans with the metadata key `env`. This overrides the Agent configuration and the host tag’s value (if any). Consult the [trace tagging documentation][10] to learn how to assign a tag to your traces.

## Next steps

Next, [Instrument your application][11]. For the full overview of all of the steps to set up APM, see the [APM overview][1].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing
[2]: /agent/guide/agent-configuration-files/?tab=agentv6#agent-main-configuration-file
[3]: https://github.com/DataDog/datadog-trace-agent/blob/6.4.1/datadog.example.yaml
[4]: /agent
[5]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[6]: /integrations/amazon_xray/#overview
[7]: /agent/basic_agent_usage/heroku/#installation
[8]: /integrations/cloud_foundry/#trace-collection
[9]: /tracing/advanced/setting_primary_tags_to_scope/#definition
[10]: /tracing/advanced/adding_metadata_to_spans/?tab=java
[11]: /tracing/setup
