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
  text: Docker setup
- link: "tracing/languages/go"
  tag: "Documentation"
  text: Go language instrumentation
- link: "tracing/languages/java"
  tag: "Documentation"
  text: Java language instrumentation
- link: "tracing/languages/python"
  tag: "Documentation"
  text: Python language instrumentation
- link: "tracing/languages/ruby"
  tag: "Documentation"
  text: Ruby language instrumentation
---

This documentation covers Agent v6 only, to know how to set up APM tracing with Agent v5, [refer to the dedicated APM with Agent v5 doc][1].

## Setup process

With Datadog's infrastructure monitoring, metrics are sent to the Agent, which then forwards them to Datadog. Similarly, tracing metrics are also sent to the Agent: the application code instrumentation flushes to the Agent every second ([see here for the Python client][2] for instance) and the Agent flushes to the Datadog API every 10 seconds.

To start tracing your application:

1. **Install the Datadog Agent**:
  Install and configure the latest [Datadog Agent][3]. (On macOS, install and run the Trace Agent in addition to the Datadog Agent. See the [macOS Trace Agent][4] documentation for more information).

2. **Enable trace collection for the Datadog Agent**. [See below dedicated instructions](#agent-configuration).

2. **Configure your environment**:
  An environment is a mandatory [primary tag](#primary-tags) used to scope a whole Datadog APM application. A common use case is to disaggregate metrics from stage environments such as production, staging, and pre-production. [Learn how to configure primary tags](#primary-tags).

3. **Instrument your application**:

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


To instrument an application written in a language that does not yet have official library support, visit the list of [community tracing libraries][5].

Finally, start monitoring your app's performance: within a few minutes of running APM, your services will appear in [the APM home page][6]. See [Using the APM UI][7] to learn more.

## Agent configuration

### Trace collection
To enable trace collection for your Agent, update the `apm_config` key in your [Agent `datadog.yaml` main configuration file][8]:

```
apm_config:
  enabled: true
```

[Reference the dedicated documentation to setup tracing with Docker][9].

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
| `replace_tags`            | list        | A list of tag replacement rules. Read more about scrubbing sensitive data with [replace rules][10].                                              |
| `receiver_port`           | number      | Port that the Datadog Agent's trace receiver listen on. Default value is `8126`.                                                                                   |
| `apm_non_local_traffic`   | boolean     | Set to `true` to allow the Agent to receive outside connections, and then listen on all interfaces.                                                                                 |
| `max_memory`              | float       | Maximum memory that the Agent is allowed to occupy. When this is exceeded the process is killed.                                                                   |
| `max_cpu_percent`         | float       | Maximum CPU percentage that the Agent should use. The Agent automatically adjusts its pre-sampling rate to stay below this number.                                 |

To get a an overview of all the possible settings for APM, take a look at the Agent's [`datadog.example.yaml`][11] configuration file.
For more information about the Datadog Agent, see the [dedicated doc page][12] or refer to the [`datadog.yaml` templates][13].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/faq/agent-5-tracing-setup
[2]: https://github.com/DataDog/dd-trace-py
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://github.com/DataDog/datadog-agent/tree/master/docs/trace-agent#run-on-macos
[5]: /developers/libraries/#community-tracing-apm-libraries
[6]: https://app.datadoghq.com/apm/home?env=
[7]: /tracing/visualization
[8]: /agent/faq/agent-configuration-files/?tab=agentv6#agent-main-configuration-file
[9]: /agent/docker/apm
[10]: /tracing/advanced_usage/#replace-rules
[11]: https://github.com/DataDog/datadog-trace-agent/blob/6.4.1/datadog.example.yaml
[12]: /agent
[13]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
