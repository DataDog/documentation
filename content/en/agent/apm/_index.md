---
title: APM Setup
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

## What is APM?

 Datadog Application Performance Monitoring (APM or tracing) provides you with deep insight into your application's performance - from automatically generated dashboards for monitoring key metrics, like request volume and latency, to detailed traces of individual requests - side by side with your logs and infrastructure monitoring. This documentation covers Agent v6 only, for more information on setting up APM tracing with Agent v5, [see the APM with Agent v5 doc][1].

 Tracing allows you to see a single request moving across your system and infrastructure, and it gives you systematic data about precisely what is happening to this request. This gives you better insight into your systems interdependencies, it allows you to see where requests are taking the longest, and it gives you visual cues for accurately troubleshooting outages and other system issues.

## Setup

With Datadog's infrastructure monitoring, metrics are sent to the Agent, which then forwards them to Datadog. Similarly, tracing metrics are also sent to the Agent: the application code instrumentation sends to the Agent every second ([see here for the Python client][2] for instance) and the Agent sends to the Datadog API every 10 seconds.

To start tracing your application:

1. **Install the Datadog Agent**:
  Install and configure the latest [Datadog Agent][3]. (On macOS, install and run the Trace Agent in addition to the Datadog Agent. See the [macOS Trace Agent][4] documentation for more information).

2. **[Configure the Datadog Agent to receive traces](#trace-collection)**

3. **[Instrument your application with the tracing client](#agent-configuration)**

4. **[Enable Trace Search & Analytics](#enable-trace-search-and-analytics)**

Within a few minutes of running APM, your services will appear in [the APM home page][5]. See [Using the APM UI][6] to learn more.

## Trace collection

To enable trace collection for your Agent, update the `apm_config` key in your [Agent `datadog.yaml` main configuration file][7]:

```
apm_config:
  enabled: true
```

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
| `replace_tags`            | list        | A list of tag replacement rules. Read more about scrubbing sensitive data with [replace rules][8].                                              |
| `receiver_port`           | number      | Port that the Datadog Agent's trace receiver listen on. The default value is `8126`.                                                                                   |
| `apm_non_local_traffic`   | boolean     | Set to `true` to allow the Agent to receive outside connections, and then listen on all interfaces.                                                                                 |
| `max_memory`              | float       | Maximum memory that the Agent is allowed to occupy. Exceeding the max limit kills the process.                                                                   |
| `max_cpu_percent`         | float       | Maximum CPU percentage that the Agent should use. The Agent automatically adjusts its pre-sampling rate to stay below this number.                                 |

To get ta an overview of all the possible settings for APM, take a look at the Agent's [`datadog.example.yaml`][9] configuration file.
For more information about the Datadog Agent, see the [dedicated doc page][10] or refer to the [`datadog.yaml` templates][11].

## Agent configuration

### Configure your environment

There are several ways to specify an environment when reporting data:
1. Host tag: Use a host tag with the format env:<ENVIRONMENT> to tag all traces from that Agent accordingly.
2. Agent configuration: Override the default tag used by the Agent in the Agent configuration file. This tags all traces coming through the Agent, overriding the host tag value.
apm_config:
  env: <ENVIRONMENT>
3. Per trace: When submitting a single trace, specify an environment by tagging one of its spans with the metadata key env. This overrides the Agent configuration and the host tag's value (if any). Consult the trace tagging documentation to learn how to assign a tag to your traces.
Viewing Data by Environment

### Language setup

{{< partial name="apm/apm-languages.html" >}}

To instrument an application written in a language that does not yet have official library support, visit the list of [community tracing libraries][12].

### Local setup

APM is enabled by default in Agent 6. Set `apm_non_local_traffic: true` if you are sending traces from a nonlocal env(containers). To get an overview of all the possible settings for APM, take a look at the Agent's [datadog.example.yaml][9] configuration file. For more information about the Datadog Agent, see the [dedicated doc page][10] or refer to the [datadog.yaml templates][11].

### Containerized setup

Once your application is instrumented with the tracing client, by default traces will be sent to `localhost:8126`. Please see the below setup instructions to ensure that the Agent is configured to receive traces in a containerized environment:

{{< partial name="apm/apm-containers.html" >}}

### Lamda - X-Ray

For more information abut setting up Lamda - X-Ray, see the [Amazon X-Ray integration documentation][13]

### Heroku

Tracing is enabled by default when monitoring with Heroku. For more information abut configuring tracing for Heroku, see the [Heroku cloud documentation][14].

### Cloud Foundry

Tracing is enabled by default when monitoring with Cloud Foundry. For more information abut configuring tracing for Cloud Foundry, see the [Cloud Foundry documentation][15].

### Other(GAE, AAS, Serverless)

Datadog APM currently requires sending trace data to a running Agent. A workaround for enabling trace collection for a serverless setup is to setup a separate VM that accepts trace traffic externally.

## Enable Trace Search and Analytics

[Trace Search & Analytics][16] is used to filter APM Data by user-defined tags such as customer_id, error_type, or app_name to help troubleshoot and filter your requests. Apply the following configuration to your application to enable this feature.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/faq/agent-5-tracing-setup
[2]: https://github.com/DataDog/dd-trace-py
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://github.com/DataDog/datadog-agent/tree/master/docs/trace-agent#run-on-macos
[5]: https://app.datadoghq.com/apm/home
[6]: /tracing/visualization
[7]: /agent/guide/agent-configuration-files/?tab=agentv6#agent-main-configuration-file
[8]: /tracing/guide/security
[9]: https://github.com/DataDog/datadog-trace-agent/blob/6.4.1/datadog.example.yaml
[10]: /agent
[11]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[12]: /tracing/advanced/setting_primary_tags_to_scope
[13]: /integrations/amazon_xray/#overview
[14]: /agent/basic_agent_usage/heroku/#installation
[15]: /integrations/cloud_foundry/#trace-collection
[16]: /java-docs/tracing/visualization/search
