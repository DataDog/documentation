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

To use APM, you need to download the Datadog Agent and then configure your agent to receive traces. For the full overview of all of the steps to set up APM, see the [APM overivew][1].

{{< partial name="apm/apm-steps.2.html" >}}

With Datadog's infrastructure monitoring, metrics are sent to the Agent, which then forwards them to Datadog. Similarly, tracing metrics are also sent to the Agent: the application code instrumentation sends to the Agent every second ([see here for the Python client][2] for instance) and the Agent sends to the Datadog API every 10 seconds.

To start tracing your application, [install the Datadog Agent][3], and then [Configure the Datadog Agent to receive traces](#trace-collection)**

## Setting up trace collection

APM is enabled by default in Agent 6. Set `apm_non_local_traffic: true` if you are sending traces from a nonlocal environment (like a container). To get an overview of all the possible settings for APM, take a look at the Agent’s [Agent `datadog.yaml` main configuration file][4] file. For more information about the Datadog Agent, see the [dedicated doc page] or check out the datadog.yaml templates.

Find below the list of all available parameters for your `datadog.yaml` configuration file:

| File setting              | Type        | Description                                                                                                                                                        |
| ------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `enabled`                 | boolean     | When set to `true`, the Datadog Agent accepts trace metrics. The default value is `true`.                                                                              |
| `apm_dd_url`              | string      | Datadog API endpoint where traces are sent.                                                                                                                        |
| `env`                     | string      | Default environment to which traces should be registered under (e.g., *staging*, *production*, etc..).                                                              |
| `extra_sample_rate`       | float       | Use this setting to adjust the trace sample rate. The value should be a float between `0` (no sampling) and `1` (normal sampling). The default value is `1`.           |
| `max_traces_per_second`   | float       | Maximum number of traces to sample per second. Set to `0` to disable the limit (*not recommended*). The default value is `10`.                                     |
| `ignore_resources`        | list        | A list of resources that the Agent should ignore.                                                                                                                  |
| `log_file`                | string      | Location of the log file.                                                                                                                                          |
| `replace_tags`            | list        | A list of tag replacement rules. Read more about scrubbing sensitive data with [replace rules][5].                                              |
| `receiver_port`           | number      | Port that the Datadog Agent's trace receiver listen on. The default value is `8126`.                                                                                   |
| `apm_non_local_traffic`   | boolean     | Set to `true` to allow the Agent to receive outside connections, and then listen on all interfaces.                                                                                 |
| `max_memory`              | float       | Maximum memory that the Agent is allowed to occupy. Exceeding the max limit kills the process.                                                                   |
| `max_cpu_percent`         | float       | Maximum CPU percentage that the Agent should use. The Agent automatically adjusts its pre-sampling rate to stay below this number.                                 |

To get ta an overview of all the possible settings for APM, take a look at the Agent's [`datadog.example.yaml`][6] configuration file.
For more information about the Datadog Agent, see the [dedicated doc page][7] or refer to the [`datadog.yaml` templates][8].

## Other ways to collect traces

There are alternernates to the Agent that you can use to collect traces.

### Lamda - X-Ray

For more information abut setting up Lamda - X-Ray, see the [Amazon X-Ray integration documentation][9]

### Heroku

Tracing is enabled by default when monitoring with Heroku. For more information abut configuring tracing for Heroku, see the [Heroku cloud documentation][10].

### Cloud Foundry

Tracing is enabled by default when monitoring with Cloud Foundry. For more information abut configuring tracing for Cloud Foundry, see the [Cloud Foundry documentation][11].

### Other(GAE, AAS, Serverless)

Datadog APM currently requires sending trace data to a running Agent. A workaround for enabling trace collection for a serverless setup is to setup a separate VM that accepts trace traffic externally.

## Next steps

For the full overview of all of the steps to set up APM, see the [APM overivew][1].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: 
[2]: https://github.com/DataDog/dd-trace-py
[3]: https://app.datadoghq.com/account/settings#agent
[4]: /agent/guide/agent-configuration-files/?tab=agentv6#agent-main-configuration-file
[5]: /tracing/guide/security
[6]: https://github.com/DataDog/datadog-trace-agent/blob/6.4.1/datadog.example.yaml
[7]: /agent
[8]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[9]: /integrations/amazon_xray/#overview
[10]: /agent/basic_agent_usage/heroku/#installation
[11]: /integrations/cloud_foundry/#trace-collection
