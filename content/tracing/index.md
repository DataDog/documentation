---
title: Tracing (APM)
kind: Documentation
autotocdepth: 2
hideguides: true
customnav: tracingnav
---

### Overview

Datadog's integrated APM tool eliminates the traditional separation between infrastructure and application performance monitoring. This not only provides greater visibility, but allows you to see the relationship between application code and the underlying infrastructure.

### Getting started

The Datadog APM is included in our Enterprise plan or as an upgrade to our Pro plan. Pro plan members can visit the [APM page of the Datadog app](https://app.datadoghq.com/trace/home) to begin a free 14-day trial.

Currently, tracing is only supported by version 5.11.0 (or above) of the Datadog Agent running on Linux and Docker.

#### Installing the agent

With our infrastructure monitoring, metrics are sent to the Datadog Agent, which then forwards them to Datadog. Similarly, tracing metrics are also sent to the Datadog agent. To enable tracing:

1.  Install the latest [Datadog Agent](https://app.datadoghq.com/account/settings#agent) (version 5.11.0 or above is required).
1.  Enable the APM in the Datadog Agent configuration file

    ~~~
    [Main]
    # Enable the trace agent.
    apm_enabled: true
    ~~~

1.  [Restart the Agent](/guides/basic_agent_usage/)

#### Running the agent in Docker

To trace applications in Docker containers, you can use the [docker-dd-agent](https://hub.docker.com/r/datadog/docker-dd-agent/) image (tagged version 11.0.5110 or higher)and enable tracing by passing `DD_APM_ENABLED=true` as an environment variable.

For additional information, please reference [the project README on Github](https://github.com/DataDog/docker-dd-agent/blob/master/README.md#tracing--apm)

#### Instrument your application

To instrument your application, please select one of the following supported languages.

- [Go](/tracing/go)
- [Python](/tracing/python)
- [Ruby](/tracing/ruby)

To instrument an application written in a language that does not yet have official library support, please reference the [Tracing API](/tracing/api).

### Configuration

The Datadog Agent uses the `/etc/dd-agent/datadog.conf` file for both infrastructure monitoring and APM configuration options. Additionally, some configuration options may be set as environment variables. Note that options set as environment variables will override the settings defined in the configuration file.

| File setting | Env variable | Description |
|---|---|---|
| **main** |
| `apm_enabled` | `DD_APM_ENABLED` | The Datadog Agent will accept trace metrics when the value is set to `true`. The default value is `false`. |
| **trace.sampler** |
| `extra_sample_rate` | - | Use this setting to adjust the trace sample rate. The value should be a float between `0` (no sampling) and `1` (normal sampling rate). The default value is `1` |
| `max_traces_per_second` | - | The maximum number of traces to sample per second. To disable the limit (*not recommended*), set to `0`. The default value is `10`.|
| **trace.receiver** |
| `receiver_port` | `DD_RECEIVER_PORT` | The port that the Datadog Agent's trace receiver should listen on. The default value is `8126`. |
| `connection_limit` | - | The number of unique client connections to allow during one 30 second lease period. The default value is `2000`. |
{:.table}

For more information about the Datadog Agent, see the [Getting Started guide](/guides/basic_agent_usage/) or refer to the [`datadog.conf.example` file](https://github.com/DataDog/dd-agent/blob/master/datadog.conf.example).

### Additional resources

For additional help from Datadog staff and other Datadog community members, join the [*apm* channel](https://datadoghq.slack.com/messages/apm) in our Datadog Slack. Visit [http://chat.datadoghq.com](http://chat.datadoghq.com) to join the Slack. We maintain a list of [community tracing libraries](http://docs.datadoghq.com/libraries/#community-tracing-apm-libraries).

You can also reach our APM team via email at [tracehelp@datadoghq.com](mailto:tracehelp@datadoghq.com).
