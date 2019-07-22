---
title: APM & Distributed Tracing with Agent v5
kind: guide
private: true
disable_toc: true
aliases:
  - /tracing/faq/agent-5-tracing-setup
---

## Getting started

APM is available with Datadog Agent versions 5.11+ as part of the one line install for the Linux and Docker Agents. [Mac][1] and [Windows][2] users must perform a manual install of the APM Agent (aka Trace Agent) via a separate install process.

The Agent can be enabled by including the following in your [Datadog Agent configuration file][3]:
```
apm_enabled: true
```

<div class="alert alert-info">
APM is enabled by default after Datadog Agent 5.13 (on Linux and Docker), but can be disabled by adding the parameter: <code>apm_enabled: no</code> in your Datadog Agent configuration file.
</div>

### Installing the Agent

Tracing metrics are sent to the Datadog through the Datadog Agent. To enable tracing:

Install the latest [Datadog Agent][4] (version 5.11.0+ is required).

### Running the Agent in Docker

To trace applications in Docker containers, use the [docker-dd-agent][5] image (tagged version 11.0.5110+) and enable tracing by passing `DD_APM_ENABLED=true` as an environment variable.

For additional information, reference [the Docker page][6].

### Instrument your application

{{< whatsnext desc="Select one of the following supported languages:">}}
    {{< nextlink href="tracing/languages/java" tag="Java" >}}Java language instrumentation.{{< /nextlink >}}
    {{< nextlink href="tracing/languages/cpp" tag="C++" >}}C++ language instrumentation.{{< /nextlink >}}
    {{< nextlink href="tracing/languages/python" tag="Python" >}}Python language instrumentation.{{< /nextlink >}}
    {{< nextlink href="tracing/languages/ruby" tag="Ruby" >}}Ruby language instrumentation{{< /nextlink >}}
    {{< nextlink href="tracing/languages/go" tag="Go" >}}Go language instrumentation.{{< /nextlink >}}
    {{< nextlink href="tracing/languages/nodejs" tag="Nodejs" >}}Node.js language instrumentation.{{< /nextlink >}}
    {{< nextlink href="tracing/languages/dotnet" tag=".NET" >}}.NET language instrumentation.{{< /nextlink >}}
    {{< nextlink href="tracing/languages/php" tag="PHP" >}}PHP language instrumentation.{{< /nextlink >}}
{{< /whatsnext >}}

To instrument an application written in a language that does not yet have official library support, reference the [Tracing API][7].

## Configuration

The Datadog Agent uses the configuration file for both infrastructure monitoring and APM configuration options.

Additionally, some configuration options may be set as environment variables. Note that options set as environment variables overrides the settings defined in the configuration file.

{{% table responsive="true" %}}

| File setting            | Environment variable       | Description                                                                                                                                                      |
| ---                     | ---                        | ---                                                                                                                                                              |
| `apm_enabled`           | `DD_APM_ENABLED`           | The Datadog Agent accepts trace metrics when the value is set to `true`. The default value is `true`.                                                            |
| `extra_sample_rate`     | `DD_EXTRA_SAMPLE_RATE`     | Use this setting to adjust the trace sample rate. The value should be a float between `0` (no sampling) and `1` (normal sampling rate). The default value is `1` |
| `max_traces_per_second` | `DD_MAX_TRACES_PER_SECOND` | The maximum number of traces to sample per second. To disable the limit (*not recommended*), set to `0`. The default value is `10`.                              |
| `receiver_port`         | `DD_RECEIVER_PORT`         | The port that the Datadog Agent's trace receiver should listen on. The default value is `8126`.                                                                  |
| `connection_limit`      | `DD_CONNECTION_LIMIT`      | The number of unique client connections to allow during one 30 second lease period. The default value is `2000`.                                                 |
| `resource`              | `DD_IGNORE_RESOURCE`       | A blacklist of regular expressions to filter out traces by their resource name.                                                                                  |

{{% /table %}}

For more information about the Datadog Agent, see the [dedicated doc page][8] or refer to the [`datadog.conf.example` file][9].

### Trace search
Trace search is available for Agent 5.25.0+. For more information, see the set up instructions in the main [APM documentation][10].

## Troubleshooting
Need help? Contact [Datadog support][11].


[1]: https://github.com/DataDog/datadog-agent/tree/master/docs/trace-agent#run-on-macos
[2]: https://github.com/DataDog/datadog-agent/tree/master/docs/trace-agent#run-on-windows
[3]: /agent/faq/where-is-the-configuration-file-for-the-agent
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://hub.docker.com/r/datadog/docker-dd-agent
[6]: /tracing/docker
[7]: /api/?lang=console#traces
[8]: /agent
[9]: https://github.com/DataDog/dd-agent/blob/master/datadog.conf.example
[10]: /tracing/setup/?tab=agent5250#trace-search
[11]: /help
