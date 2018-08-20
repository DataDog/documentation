---
title: APM and Distributed Tracing with Agent v5
kind: faq
private: true
---

## Getting started

APM is available as part of the Datadog Agent with versions 5.11+ as part of the one line install for the Linux and Docker Agents. Currently, [Mac][1] and [Windows][2] users must perform a manual install of the APM Agent (aka Trace Agent) via a separate install process.

The Agent can be enabled by including the following in your [Datadog Agent configuration file][3]:
```
apm_enabled: true
```

<div class="alert alert-info">
APM is enabled by default after Datadog Agent 5.13 (on Linux and Docker), and can be disabled by adding the parameter: <code>apm_enabled: no</code> in your Datadog Agent configuration file.
</div>

### Installing the Agent

With our infrastructure monitoring, metrics are sent to the Datadog Agent, which then forwards them to Datadog. Similarly, tracing metrics are also sent to the Datadog Agent. To enable tracing:

Install the latest [Datadog Agent][4] (version 5.11.0 or above is required).

### Running the Agent in Docker

To trace applications in Docker containers, you can use the [docker-dd-agent][5] image (tagged version 11.0.5110 or higher) and enable tracing by passing `DD_APM_ENABLED=true` as an environment variable.

For additional information, reference [the Docker page][6].

### Instrument your application

To instrument your application, select one of the following supported languages.

- [Go][7]
- [Java][8]
- [Python][9]
- [Ruby][10]

To instrument an application written in a language that does not yet have official library support, reference the [Tracing API][11].

## Configuration

The Datadog Agent uses the configuration file for both infrastructure monitoring and APM configuration options.

Additionally, some configuration options may be set as environment variables. Note that options set as environment variables overrides the settings defined in the configuration file.

{{% table responsive="true" %}}
| File setting | Environment variable | Description |
|---|---|---|
| **main** |
| `apm_enabled` | `DD_APM_ENABLED` | The Datadog Agent accepts trace metrics when the value is set to `true`. The default value is `true`. |
| **trace.sampler** |
| `extra_sample_rate` | - | Use this setting to adjust the trace sample rate. The value should be a float between `0` (no sampling) and `1` (normal sampling rate). The default value is `1` |
| `max_traces_per_second` | - | The maximum number of traces to sample per second. To disable the limit (*not recommended*), set to `0`. The default value is `10`.|
| **trace.receiver** |
| `receiver_port` | `DD_RECEIVER_PORT` | The port that the Datadog Agent's trace receiver should listen on. The default value is `8126`. |
| `connection_limit` | - | The number of unique client connections to allow during one 30 second lease period. The default value is `2000`. |
| **trace.ignore** |
| `resource` | `DD_IGNORE_RESOURCE` | A blacklist of regular expressions to filter out traces by their resource name. |
{{% /table %}}

For more information about the Datadog Agent, see the [dedicated doc page][12] or refer to the [`datadog.conf.example` file][13].

## Additional resources

For additional help from Datadog staff and other Datadog community members, join the [*apm* channel][14] in our Datadog Slack. Visit [http://chat.datadoghq.com][15] to join the Slack. We maintain a list of [community tracing libraries][16].

You can also reach our APM team via email at [tracehelp@datadoghq.com][17].

[1]: https://github.com/DataDog/datadog-trace-agent#run-on-osx
[2]: https://github.com/DataDog/datadog-trace-agent#run-on-windows
[3]: /agent/faq/where-is-the-configuration-file-for-the-agent
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://hub.docker.com/r/datadog/docker-dd-agent/
[6]: /tracing/docker
[7]: /tracing/setup/go
[8]: /tracing/setup/java
[9]: /tracing/setup/python
[10]: /tracing/setup/ruby
[11]: /api/?lang=console#traces
[12]: /agent/
[13]: https://github.com/DataDog/dd-agent/blob/master/datadog.conf.example
[14]: https://datadoghq.slack.com/messages/apm
[15]: http://chat.datadoghq.com
[16]: /developers/libraries/#community-tracing-apm-libraries
[17]: mailto:tracehelp@datadoghq.com
