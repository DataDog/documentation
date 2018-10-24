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
- link: "tracing/setup/docker"
  tag: "Documentation"
  text: Docker setup
- link: "tracing/setup/go"
  tag: "Documentation"
  text: Go language instrumentation
- link: "tracing/setup/java"
  tag: "Documentation"
  text: Java language instrumentation
- link: "tracing/setup/python"
  tag: "Documentation"
  text: Python language instrumentation
- link: "tracing/setup/ruby"
  tag: "Documentation"
  text: Ruby language instrumentation
---

This documentation covers Agent v6 only, to know how to set up APM tracing with Agent v5, [refer to the dedicated APM with Agent v5 doc][1].

## Setup process

With Datadog's infrastructure monitoring, metrics are sent to the Agent, which then forwards them to Datadog. Similarly, tracing metrics are also sent to the Agent: the application code instrumentation flushes to the Agent every second ([see here for the Python client](https://github.com/DataDog/dd-trace-py/blob/69693dc7cdaed3a2b6a855325109fa100e42e254/ddtrace/writer.py#L159) for instance) and the Agent flushes to the [Datadog API every 10 seconds][2].

To start tracing your application:

1. **Install the Datadog Agent**:
  Install and configure the latest [Datadog Agent][3]. (On macOS, install and run the Trace Agent in addition to the Datadog Agent. See the [macOS Trace Agent][7] documentation for more information).

2. **Enable trace collection for the Datadog Agent**. [See below dedicated instructions](#agent-configuration).

2. **Configure your environment**:
  An environment is a first class dimension used to scope a whole Datadog APM application. A common use case is to disaggregate metrics from stage environments such as production, staging, and pre-production. [Learn how to configure environments](#primary-tags).
  **Note**: if you do not configure your own environments, all data will default to `env:none`.

3. **Instrument your application**:

  {{< whatsnext desc="Select one of the following supported languages:">}}
      {{< nextlink href="tracing/setup/docker" tag="Docker" >}}Docker setup.{{< /nextlink >}}
      {{< nextlink href="tracing/setup/kubernetes" tag="Kubernetes" >}}Kubernetes setup.{{< /nextlink >}}
      {{< nextlink href="tracing/setup/java" tag="Java" >}}Java language instrumentation.{{< /nextlink >}}
      {{< nextlink href="tracing/setup/python" tag="Python" >}}Python language instrumentation.{{< /nextlink >}}
      {{< nextlink href="tracing/setup/ruby" tag="Ruby" >}}Ruby language instrumentation{{< /nextlink >}}
      {{< nextlink href="tracing/setup/go" tag="Go" >}}Go language instrumentation.{{< /nextlink >}}
      {{< nextlink href="tracing/setup/nodejs" tag="Nodejs" >}}Node.js language instrumentation.{{< /nextlink >}}
      {{< nextlink href="tracing/setup/dotnet" tag=".NET" >}}.NET language instrumentation.{{< /nextlink >}}
      {{< nextlink href="tracing/setup/php" tag="PHP" >}}PHP language instrumentation. (Coming Soon){{< /nextlink >}}
  {{< /whatsnext >}}


To instrument an application written in a language that does not yet have official library support, visit the list of [community tracing libraries][15].

Finally, start monitoring your app's performance: Within a few minutes of running APM, you will start to see your services appear in [the APM home page][16]. See [Using the APM UI][17] to learn more.

## Agent configuration

To enable trace collection for your Agent, update the `apm_config` key in your [Agent `datadog.yaml` main configuration file][25]:

```
apm_config:
  enabled: true
```

[Reference the dedicated documentation to setup tracing with Docker][5].

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
| `replace_tags`            | list        | A list of tag replacement rules. See the [Scrubbing sensitive information](#scrubbing-sensitive-information) section.                                              |
| `receiver_port`           | number      | Port that the Datadog Agent's trace receiver listen on. Default value is `8126`.                                                                                   |
| `apm_non_local_traffic`   | boolean     | Allows the Agent to receive outside connections. It then listen on all interfaces.                                                                                 |
| `max_memory`              | float       | Maximum memory that the Agent is allowed to occupy. When this is exceeded the process is killed.                                                                   |
| `max_cpu_percent`         | float       | Maximum CPU percentage that the Agent should use. The Agent automatically adjusts its pre-sampling rate to stay below this number.                                 |
  
To get a an overview of all the possible settings for APM, take a look at the Agent's [`datadog.example.yaml`][21] configuration file.
For more information about the Datadog Agent, see the [dedicated doc page][18] or refer to the [`datadog.yaml` templates][19].

## Primary Tags
### Definition

There are several dimensions that you can configure to scope an entire Datadog APM application. This includes aggregate statistics (such as requests/second, latency, error rate, Apdex score) and visible traces. Those dimensions are setup through Primary tags allows you to get an even finer view of your application's behavior. Use cases for primary tags include for instance the  the environment, the Availability zone, or the Datacenter...

Primary tags must follow a different set of rules from those of conventional [Datadog tags][26].

### Setup
#### Environment 

The default and mandatory primary tag is the environment your traces are collected from. Its tag key is `env`, and its default value for un-tagged data is `env:none`. 
There are several ways to specify an environment when reporting data:

1. Host tag:  
  Use a host tag with the format `env:<ENVIRONMENT>` to tag all traces from that Agent accordingly.

2. Agent configuration:  
  Override the default tag used by the Agent in [the Agent configuration file][27]. This tags all traces coming through the Agent, overriding the host tag value.

    ```
    apm_config:
      env: <ENVIRONMENT>
    ```

3. Per trace:  
  When submitting a single trace, specify an environment by tagging one of its spans with the metadata key `env`. This overrides the Agent configuration and the host tags value (if any).  

{{< tabs >}}
{{% tab "Go" %}}

```go
tracer.SetTag("env", "<ENVIRONMENT>")
```

For OpenTracing use the `tracer.WithGlobalTag` start option to set the environment globally.

{{% /tab %}}
{{% tab "Java" %}}
Via sysprop:

```
-Ddd.trace.span.tags=env:<ENVIRONMENT>
```

Via environment variables:

```
DD_TRACE_SPAN_TAGS="env:<ENVIRONMENT>"
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
Datadog.tracer.set_tags('env' => '<ENVIRONMENT>')
```

{{% /tab %}}
{{% tab "Python" %}}

```python
from ddtrace import tracer
tracer.set_tags({'env': '<ENVIRONMENT>'})
```
{{% /tab %}}
{{% tab ".NET" %}}

```csharp
using Datadog.Tracing;
Tracer.Instance.ActiveScope.Span.SetTag("env", "<ENVIRONMENT>");
```

{{% /tab %}}
{{< /tabs >}}

##### Viewing Data by Environment

Environments appear at the top of APM pages. Use the dropdown to scope the data displayed on the current page.

{{< img src="tracing/setup/envs_tracing_screen.png" alt="Envs tracing" responsive="true" style="width:80%;">}}


#### Add a second primary tag

If you added another tag than `env:<ENVIRONMENT>` to your traces, it can be set as a primary tag along the environment tag. Go to the [APM Settings][28] page to define, change, or remove your primary tags. 

Note:

* Only organization Administrators have access to this page. 
* Changes may take up to two hours to be reflected in the UI.

If you change a previously set primary tag, be aware of the following:

* Historical APM data aggregated by the previously set tag will no longer be accessible.
* Any APM monitors scoped to the previous tag will display a status of _No Data_.

#### Viewing Data by Primary Tag

Primary tags appear at the top of APM pages. Use these selectors to slice the data displayed on the current page. To view all data independent of a primary tag, choose `<TAG_NAME>:*` from the dropdown (as in the image below).

{{< img src="tracing/setup/primary_tags_ui.png" alt="Primary tags UI" responsive="true" style="width:80%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/faq/agent-5-tracing-setup
[2]: https://github.com/DataDog/datadog-trace-agent/blob/master/config/agent.go#L95
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://github.com/DataDog/datadog-trace-agent/tree/master/config#agent-configuration
[5]: /tracing/setup/docker
[6]: https://github.com/DataDog/datadog-trace-agent
[7]: https://github.com/DataDog/datadog-trace-agent#run-on-osx
[8]: https://github.com/DataDog/datadog-trace-agent/#run-on-windows
[9]: https://github.com/DataDog/heroku-buildpack-datadog
[11]: /tracing/setup/go
[12]: /tracing/setup/java
[13]: /tracing/setup/python
[14]: /tracing/setup/ruby
[15]: /developers/libraries/#community-tracing-apm-libraries
[16]: https://app.datadoghq.com/apm/home?env=
[17]: /tracing/visualization
[18]: /agent/
[19]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[20]: https://github.com/DataDog/datadog-trace-agent/#run-on-linux
[21]: https://github.com/DataDog/datadog-trace-agent/blob/6.4.1/datadog.example.yaml
[22]: /tracing/setup/dotnet
[23]: /tracing/setup/php
[24]: /tracing/setup/nodejs
[25]: /agent/faq/agent-configuration-files/?tab=agentv6#agent-main-configuration-file
[26]: /tagging/
[27]: /agent/faq/agent-configuration-files/?tab=agentv6
[28]: https://app.datadoghq.com/apm/settings
