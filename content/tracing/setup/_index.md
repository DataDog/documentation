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
  text: "Docker setup"
- link: "tracing/setup/go"
  tag: "Documentation"
  text: "Go language instrumentation"
- link: "tracing/setup/java"
  tag: "Documentation"
  text: "Java language instrumentation"
- link: "tracing/setup/python"
  tag: "Documentation"
  text: "Python language instrumentation"
- link: "tracing/setup/ruby"
  tag: "Documentation"
  text: "Ruby language instrumentation"
---

This documentation covers Agent v6 only, to know how to set up APM tracing with Agent v5, [refer to the dedicated APM with Agent v5 doc][1].

## Setup process

With Datadog's infrastructure monitoring, metrics are sent to the Agent, which then forwards them to Datadog. Similarly, tracing metrics are also sent to the Agent: the application code instrumentation flushes to the Agent every second ([see here for the Python client][2] for instance) and the Agent flushes to the [Datadog API every 10 seconds][3].

To start tracing your application:

1. **Install the Datadog Agent**:
  Install and configure the latest [Datadog Agent][4]. (On macOS, install and run the Trace Agent in addition to the Datadog Agent. See the [macOS Trace Agent][5] documentation for more information).

2. **Enable trace collection for the Datadog Agent**. [See below dedicated instructions](#agent-configuration).

2. **Configure your environment**:
  An environment is a mandatory [primary tag](#primary-tags) used to scope a whole Datadog APM application. A common use case is to disaggregate metrics from stage environments such as production, staging, and pre-production. [Learn how to configure primary tags](#primary-tags).

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
      {{< nextlink href="tracing/setup/php" tag="PHP" >}}PHP language instrumentation.{{< /nextlink >}}
  {{< /whatsnext >}}


To instrument an application written in a language that does not yet have official library support, visit the list of [community tracing libraries][6].

Finally, start monitoring your app's performance: within a few minutes of running APM, your services will appear in [the APM home page][7]. See [Using the APM UI][8] to learn more.

## Agent configuration

### Trace collection
To enable trace collection for your Agent, update the `apm_config` key in your [Agent `datadog.yaml` main configuration file][9]:

```
apm_config:
  enabled: true
```

[Reference the dedicated documentation to setup tracing with Docker][10].

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
  
To get a an overview of all the possible settings for APM, take a look at the Agent's [`datadog.example.yaml`][11] configuration file.
For more information about the Datadog Agent, see the [dedicated doc page][12] or refer to the [`datadog.yaml` templates][13].

### Trace search
To enable trace search, [services][14] must be flowing into Datadog. Once services are set up, navigate to the [Trace Search & Analytics docs page][15] to find a list of each of the services running within your infrastructure.

In Datadog, every automatically instrumented service has an operation name, which is used to set the type of request being traced. For example, if you're tracing a Python Flask application, you might have a `flask.request` as your operation name. In a Node application using Express, you would have `express.request` ask your operation name.

Replace both the `<SERVICE_NAME>` and `<OPERATION_NAME>` in your configuration with the service name and operation name of the traces you want to add to Trace Search.

For example, if you have a Python service named `python-api`, and it's running Flask (operation name `flask.request`), your `<SERVICE_NAME>` would be `python-api`, and your `<OPERATION_NAME>` would be `flask.request`.

The [Trace Search & Analytics docs][15] page populates with a list of your services and resource names available for usage in Trace Search:

1. Select the `environment` and `services` to extract [APM events][16] from.
2. Update your Datadog Agent configuration (based on Agent version) with the information below:

{{< tabs >}}
{{% tab "Agent 6.3.0+" %}}
In `datadog.yaml`, add `analyzed_spans` under `apm_config`. For example:

```yaml
apm_config:
  analyzed_spans:
    <SERVICE_NAME_1>|<OPERATION_NAME_1>: 1
    <SERVICE_NAME_2>|<OPERATION_NAME_2>: 1
```

{{% /tab %}}
{{% tab "Agent 5.25.0+" %}}
In `datadog.conf`, add `[trace.analyzed_spans]`. For example:

```
[trace.analyzed_spans]
<SERVICE_NAME_1>|<OPERATION_NAME_1>: 1
<SERVICE_NAME_2>|<OPERATION_NAME_2: 1
```

{{% /tab %}}
{{% tab "Docker" %}}
Add `DD_APM_ANALYZED_SPANS` to the Agent container environment (compatible with version 12.6.5250+). For example:

```
DD_APM_ANALYZED_SPANS="<SERVICE_NAME_1>|<OPERATION_NAME_1>=1,<SERVICE_NAME_2>|<OPERATION_NAME_2>=1"
```

{{% /tab %}}
{{< /tabs >}}

## Primary Tags
### Definition

There are several dimensions available to scope an entire Datadog APM application. These include aggregate statistics (such as requests/second, latency, error rate, Apdex score) and visible traces. These dimensions are set up through primary tags that allow you to get an even finer view of your application's behavior. Use cases for primary tags include environment, availability zone, datacenter, etc.

Primary tags must follow a different set of rules from those of conventional [Datadog tags][17].

### Setup
#### Environment 

The default and mandatory primary tag is the environment your traces are collected from. Its tag key is `env`, and its default value for un-tagged data is `env:none`. 
There are several ways to specify an environment when reporting data:

1. Host tag:  
  Use a host tag with the format `env:<ENVIRONMENT>` to tag all traces from that Agent accordingly.

2. Agent configuration:  
  Override the default tag used by the Agent in [the Agent configuration file][18]. This tags all traces coming through the Agent, overriding the host tag value.

    ```
    apm_config:
      env: <ENVIRONMENT>
    ```

3. Per trace:  
  When submitting a single trace, specify an environment by tagging one of its spans with the metadata key `env`. This overrides the Agent configuration and the host tag's value (if any). Consult the [trace tagging documentation][19] to learn how to assign a tag to your traces.

##### Viewing Data by Environment

Environments appear at the top of APM pages. Use the dropdown to scope the data displayed on the current page.

{{< img src="tracing/setup/envs_tracing_screen.png" alt="Envs tracing" responsive="true" style="width:80%;">}}

### Add a second primary tag in Datadog

If you added a tag other than `env:<ENVIRONMENT>` to your traces, it can be set as a primary tag along with the environment tag. Go to the [APM Settings][20] page to define, change, or remove your primary tags. 

Note:

* Only organization administrators have access to this page. 
* Changes may take up to two hours to be reflected in the UI.

If you change a previously set primary tag, be aware of the following:

* Historical APM data aggregated by the previously set tag is no longer be accessible.
* Any APM monitors scoped to the previous tag display a status of _No Data_.

#### Viewing Data by Primary Tag

Primary tags appear at the top of APM pages. Use these selectors to slice the data displayed on the current page. To view all data independent of a primary tag, choose `<TAG_NAME>:*` from the dropdown (as in the image below).

{{< img src="tracing/setup/primary_tags_ui.png" alt="Primary tags UI" responsive="true" style="width:80%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/faq/agent-5-tracing-setup
[2]: https://github.com/DataDog/dd-trace-py/blob/69693dc7cdaed3a2b6a855325109fa100e42e254/ddtrace/writer.py#L159
[3]: https://github.com/DataDog/datadog-trace-agent/blob/master/config/agent.go#L95
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://github.com/DataDog/datadog-trace-agent#run-on-osx
[6]: /developers/libraries/#community-tracing-apm-libraries
[7]: https://app.datadoghq.com/apm/home?env=
[8]: /tracing/visualization
[9]: /agent/faq/agent-configuration-files/?tab=agentv6#agent-main-configuration-file
[10]: /tracing/setup/docker
[11]: https://github.com/DataDog/datadog-trace-agent/blob/6.4.1/datadog.example.yaml
[12]: /agent
[13]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[14]: https://app.datadoghq.com/apm/services
[15]: https://app.datadoghq.com/apm/docs/trace-search
[16]: /tracing/visualization/search/#apm-events
[17]: /tagging
[18]: /agent/faq/agent-configuration-files/?tab=agentv6
[19]: /tagging/assigning_tags/#traces
[20]: https://app.datadoghq.com/apm/settings
