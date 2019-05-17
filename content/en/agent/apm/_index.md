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

Datadog Application Performance Monitoring (APM or tracing) provides you with deep insight into your application’s performance - from automatically generated dashboards monitoring key metrics, such as request volume and latency, to detailed traces of individual requests - side by side with your logs and infrastructure monitoring. This documentation covers Agent v6 only, for more information on setting up APM tracing with Agent v5, [see the APM with Agent v5 doc][1].

Tracing allows you to see a single request moving across your system and infrastructure and it gives you systematic data about exactly what is happening to this request. This give you better insight into your systems interdependencies, it allows you to see where requests are taking the longest, and it gives you visual cues for specifically troubleshooting outages and other system issues.

## Setup process

With Datadog's infrastructure monitoring, metrics are sent to the Agent, which then forwards them to Datadog. Similarly, tracing metrics are also sent to the Agent: the application code instrumentation flushes to the Agent every second ([see here for the Python client][2] for instance) and the Agent flushes to the Datadog API every 10 seconds.

To start tracing your application:

1. **Install the Datadog Agent**:
  Install and configure the latest [Datadog Agent][3]. (On macOS, install and run the Trace Agent in addition to the Datadog Agent. See the [macOS Trace Agent][4] documentation for more information).

2. **Enable trace collection for the Datadog Agent**. [See below dedicated instructions](#agent-configuration).

2. **Instrument your Application with the Tracing Client**

3. **Instrument your application with the tracing client**

4. **Enable Trace Search & Analytics**

To instrument an application written in a language that does not yet have official library support, visit the list of [community tracing libraries][5].

Within a few minutes of running APM, your services will appear in [the APM home page][6]. See [Using the APM UI][7] to learn more.

## Agent configuration

### Local setup

APM is enabled by default in Agent 6. Set `apm_non_local_traffic: true` if you are sending traces from a nonlocal environment like containers. To get an overview of all the possible settings for APM, take a look at the Agent’s [datadog.example.yaml][8] configuration file. For more information about the Datadog Agent, see the [Agent documentation page][9] or check out the [datadog.yaml][10] templates.

### Containerized setup

Once your application is instrumented with the tracing client, by default traces will be sent to `localhost:8126`. Use these specific instructions to ensure that the Agent is configured to receive traces in a containerized environment:


### Trace collection
To enable trace collection for your Agent, update the `apm_config` key in your [Agent `datadog.yaml` main configuration file][11]:

```
apm_config:
  enabled: true
```

[Reference the dedicated documentation to setup tracing with Docker][12].

Find below the list of all available parameters for your `datadog.yaml` configuration file:

| File setting              | Type        | Description                                                                                                                                                        |
| ------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `enabled`                 | boolean     | When set to `true`, the Datadog Agent accepts trace metrics. Default value is `true`.                                                                              |
| `apm_dd_url`              | string      | Datadog API endpoint where traces are sent.                                                                                                                        |
| `env`                     | string      | Default environment to which traces should be registered under (e.g. *staging*, *production*, etc..).                                                              |
| `extra_sample_rate`       | float       | Use this setting to adjust the trace sample rate. The value should be a float between `0` (no sampling) and `1` (normal sampling). Default value is `1`.           |
| `max_traces_per_second`   | float       | Maximum number of traces to sample per second. Set to `0` to disable the limit (*not recommended*). The default value is `10`.                                     |
| `ignore_resources`        | list        | A list of resources that the Agent should ignore.                                                                                                                  |
| `log_file`                | string      | Location of the log file.                                                                                                                                          |
| `replace_tags`            | list        | A list of tag replacement rules. Read more about scrubbing sensitive data with [replace rules][13].                                              |
| `receiver_port`           | number      | Port that the Datadog Agent's trace receiver listen on. Default value is `8126`.                                                                                   |
| `apm_non_local_traffic`   | boolean     | Set to `true` to allow the Agent to receive outside connections, and then listen on all interfaces.                                                                                 |
| `max_memory`              | float       | Maximum memory that the Agent is allowed to occupy. When this is exceeded the process is killed.                                                                   |
| `max_cpu_percent`         | float       | Maximum CPU percentage that the Agent should use. The Agent automatically adjusts its pre-sampling rate to stay below this number.                                 |

To get a an overview of all the possible settings for APM, take a look at the Agent's [`datadog.example.yaml`][14] configuration file.
For more information about the Datadog Agent, see the [dedicated doc page][15] or refer to the [`datadog.yaml` templates][16].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/faq/agent-5-tracing-setup
[2]: https://github.com/DataDog/dd-trace-py
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://github.com/DataDog/datadog-agent/tree/master/docs/trace-agent#run-on-macos
[5]: /developers/libraries/#community-tracing-apm-libraries
[6]: https://app.datadoghq.com/apm/home
[7]: /tracing/visualization
[8]: https://github.com/DataDog/datadog-trace-agent/blob/6.4.1/datadog.example.yaml
[9]: https://docs.datadoghq.com/agent
[10]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[11]: /agent/guide/agent-configuration-files/?tab=agentv6#agent-main-configuration-file
[12]: /agent/docker/apm
[13]: /tracing/guide/security
[14]: https://github.com/DataDog/datadog-trace-agent/blob/6.4.1/datadog.example.yaml
[15]: /agent
[16]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
