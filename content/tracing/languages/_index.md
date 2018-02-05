---
title: Tracing Languages
kind: Documentation
---

The Datadog Agent uses the [configuration file](/agent/faq/where-is-the-configuration-file-for-the-agent) for both infrastructure monitoring and APM configuration options.

{{< whatsnext desc="Easily integrate Datadog APM with the following languages:">}}
    {{< nextlink href="/tracing/languages/go" tag="Documentation" >}}Tracing Go Applications{{< /nextlink >}}
    {{< nextlink href="/tracing/languages/java" tag="Documentation" >}}Tracing Java Applications{{< /nextlink >}}
    {{< nextlink href="/tracing/languages/python" tag="Documentation" >}}Tracing Python Applications{{< /nextlink >}}
    {{< nextlink href="/tracing/languages/ruby" tag="Documentation" >}}Tracing Ruby Applications{{< /nextlink >}}
{{< /whatsnext >}}


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
| `resource` | `DD_IGNORE_RESOURCE` | A blacklist of regular expressions to filter out Traces by their Resource name. |
{{% /table %}}

For more information about the Datadog Agent, see the [dedicated doc page](/agent/) or refer to the [`datadog.conf.example` file](https://github.com/DataDog/dd-agent/blob/master/datadog.conf.example).
