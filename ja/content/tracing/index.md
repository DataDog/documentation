---
autotocdepth: 2
customnav: tracingnav
hideguides: true
kind: Documentation
placeholder: true
title: APM (Tracing)
---

<div class='alert alert-info'><strong>NOTICE:</strong>アクセスいただきありがとうございます。こちらのページは現在英語のみのご用意となっております。引き続き日本語化の範囲を広げてまいりますので、皆様のご理解のほどよろしくお願いいたします。</div>

### Overview

Datadog's integrated APM tool eliminates the traditional separation between infrastructure and application performance monitoring. This not only provides greater visibility, but also allows you to see the relationship between application code and the underlying infrastructure.

### Getting started

The Datadog APM is included in our Enterprise plan or as an upgrade to our Pro plan. A free 14-day trial is available.  Registered users can visit the [APM page of the Datadog app](https://app.datadoghq.com/trace/home) to get started.

APM is available as part of the Datadog Agent with versions 5.11+ as part of the one line install for the Linux and Docker Agents. Currently, [Mac](https://github.com/DataDog/datadog-trace-agent#run-on-osx) and [Windows](https://github.com/DataDog/datadog-trace-agent#run-on-windows) users must perform a manual install of the APM Agent (aka Trace Agent) via a separate install process. The Agent can be enabled by including the following in your Datadog agent configuration file: `apm_enabled: true`

<div class="alert alert-info">
APM is enabled by default after Datadog agent 5.13 (on Linux and Docker), and can be disabled by adding the parameter: <code>apm_enabled: no</code> in your Datadog agent configuration file.
</div>

#### Installing the agent

With our infrastructure monitoring, metrics are sent to the Datadog Agent, which then forwards them to Datadog. Similarly, tracing metrics are also sent to the Datadog agent. To enable tracing:

Install the latest [Datadog Agent](https://app.datadoghq.com/account/settings#agent) (version 5.11.0 or above is required).

#### Running the agent in Docker

To trace applications in Docker containers, you can use the [docker-dd-agent](https://hub.docker.com/r/datadog/docker-dd-agent/) image (tagged version 11.0.5110 or higher) and enable tracing by passing `DD_APM_ENABLED=true` as an environment variable.

For additional information, please reference [the Docker page](/tracing/docker)

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
| **trace.ignore** |
| `resource` | `DD_IGNORE_RESOURCE` | A blacklist of regular expressions to filter out Traces by their resource name. |

For more information about the Datadog Agent, see the [Getting Started guide](/guides/basic_agent_usage/) or refer to the [`datadog.conf.example` file](https://github.com/DataDog/dd-agent/blob/master/datadog.conf.example).

### Additional resources

For additional help from Datadog staff and other Datadog community members, join the [*apm* channel](https://datadoghq.slack.com/messages/apm) in our Datadog Slack. Visit [http://chat.datadoghq.com](http://chat.datadoghq.com) to join the Slack. We maintain a list of [community tracing libraries](http://docs.datadoghq.com/libraries/#community-tracing-apm-libraries).

You can also reach our APM team via email at [support@datadohq.com](mailto:support@datadohq.com).
