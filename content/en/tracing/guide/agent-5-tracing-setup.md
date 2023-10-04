---
title: APM & Continuous Profiler with Agent v5
kind: guide
private: true
aliases:
  - /tracing/faq/agent-5-tracing-setup
---

## Getting started

APM is available with Datadog Agent versions 5.11+ as part of the one-line installation command for the Linux and Docker Agents. [Mac][1] and [Windows][2] users must perform a manual installation of the APM Agent (also known as Trace Agent) through a separate installation process.

The Agent can be enabled by including the following in your [Datadog Agent configuration file][3]:

```conf
apm_enabled: true
```

<div class="alert alert-info">
APM is enabled by default after Datadog Agent 5.13 (on Linux and Docker), but can be disabled by adding the parameter: <code>apm_enabled: no</code> in your Datadog Agent configuration file.
</div>

### Installing the Agent

[Tracing metrics][4] are sent to the Datadog through the Datadog Agent. To enable tracing:

Install the latest [Datadog Agent][5] (version 5.11.0+ is required).

### Running the Agent in Docker

To trace applications in Docker containers, use the [docker-dd-agent][6] image (tagged version 11.0.5110+) and enable tracing by passing `DD_APM_ENABLED=true` as an environment variable.

For additional information, reference [the Docker page][7].

### Instrument your application

{{< whatsnext desc="Select one of the following supported languages:">}}
    {{< nextlink href="tracing/setup/java" tag="Java" >}}Java language instrumentation.{{< /nextlink >}}
    {{< nextlink href="tracing/setup/cpp" tag="C++" >}}C++ language instrumentation.{{< /nextlink >}}
    {{< nextlink href="tracing/setup/python" tag="Python" >}}Python language instrumentation.{{< /nextlink >}}
    {{< nextlink href="tracing/setup/ruby" tag="Ruby" >}}Ruby language instrumentation{{< /nextlink >}}
    {{< nextlink href="tracing/setup/go" tag="Go" >}}Go language instrumentation.{{< /nextlink >}}
    {{< nextlink href="tracing/setup/nodejs" tag="Nodejs" >}}Node.js language instrumentation.{{< /nextlink >}}
    {{< nextlink href="tracing/setup/dotnet" tag=".NET" >}}.NET language instrumentation.{{< /nextlink >}}
    {{< nextlink href="tracing/setup/php" tag="PHP" >}}PHP language instrumentation.{{< /nextlink >}}
{{< /whatsnext >}}

To instrument an application written in a language that does not yet have official library support, reference the [Tracing API][8].

## Configuration

The Datadog Agent uses the configuration file for both infrastructure monitoring and APM configuration options.

Additionally, some configuration options may be set as environment variables. Note that options set as environment variables overrides the settings defined in the configuration file.

| File setting            | Environment variable       | Description                                                                                                                                                      |
|-------------------------|----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `apm_enabled`           | `DD_APM_ENABLED`           | The Datadog Agent accepts trace metrics when the value is set to `true`. The default value is `true`.                                                            |
| `receiver_port`         | `DD_RECEIVER_PORT`         | The port that the Datadog Agent's trace receiver should listen on. The default value is `8126`.                                                                  |
| `connection_limit`      | `DD_CONNECTION_LIMIT`      | The number of unique client connections to allow during one 30 second lease period. The default value is `2000`.                                                 |
| `resource`              | `DD_IGNORE_RESOURCE`       | An exclude list of regular expressions to filter out traces by their resource name.                                                                                  |

For more information about the Datadog Agent, see the [dedicated doc page][9] or refer to the [`datadog.conf.example` file][10].

### Trace search

Trace search is available for Agent 5.25.0+. For more information, see the set up instructions in the main [APM documentation][11].

## Troubleshooting

Need help? Contact [Datadog support][12].

[1]: https://github.com/DataDog/datadog-agent/tree/main/docs/trace-agent#run-on-macos
[2]: https://github.com/DataDog/datadog-agent/tree/main/docs/trace-agent#run-on-windows
[3]: /agent/faq/where-is-the-configuration-file-for-the-agent/
[4]: /tracing/glossary/#trace-metrics
[5]: https://app.datadoghq.com/account/settings/agent/latest
[6]: https://gcr.io/datadoghq/docker-dd-agent
[7]: /tracing/docker/
[8]: /tracing/guide/send_traces_to_agent_by_api/
[9]: /agent/
[10]: https://github.com/DataDog/dd-agent/blob/master/datadog.conf.example
[11]: /tracing/setup/?tab=agent5250#trace-search
[12]: /help/
