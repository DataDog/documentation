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

## Enable APM in the Datadog Agent

With Datadog's infrastructure monitoring, metrics are sent to the Agent, which then forwards them to Datadog. Similarly, tracing metrics are also sent to the Agent: the application code instrumentation flushes to the Agent every second ([see here for the Python client][2] for instance) and the Agent flushes to the Datadog API every 10 seconds.

To start tracing your application:

1. **Install the Datadog Agent**:
  Install and configure the latest [Datadog Agent][3]. (On macOS, install and run the Trace Agent in addition to the Datadog Agent. See the [macOS Trace Agent][4] documentation for more information).

2. **Configure the Datadog Agent to receive traces**. [See below dedicated instructions](#agent-configuration)

3. **Instrument your Application**

4. **Enable Trace Search & Analytics**

To instrument an application written in a language that does not yet have official library support, visit the list of [community tracing libraries][5].

Finally, start monitoring your app's performance: within a few minutes of running APM, your services will appear in [the APM home page][6]. See [Using the APM UI][7] to learn more.

## Agent configuration

### Local Setup
To enable trace collection for your Agent, update the `apm_config` key in your [Agent `datadog.yaml` main configuration file][8]:

```
apm_config:
  enabled: true
```

To get a an overview of all the possible settings for APM, take a look at the Agent's [`datadog.example.yaml`][11] configuration file. For more information about the Datadog Agent, see the [dedicated doc page][12] or refer to the [`datadog.yaml` templates][13].

### Containerized Setup

Once your application is instrumented with the tracing client, by default traces will be sent to `localhost:8126`. Please see the below setup instructions to ensure that the Agent is configured to receive traces in a containerized environment:

{{< partial name="platforms_apm_containers/platforms.html" >}}

### Configure your Environment

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

{{< img src="agent/apm/envs_tracing_screen.png" alt="Envs tracing" responsive="true" style="width:80%;">}}

## Instrument Your Application

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

### Trace Search & Analytics

[WIP Content here](https://docs-staging.datadoghq.com/tyler/java-docs/tracing/advanced_usage/?tab=java#trace-search-analytics)

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
[14]: https://app.datadoghq.com/apm/services
[15]: https://app.datadoghq.com/apm/docs/trace-search
[16]: /tracing/visualization/search/#apm-events
[17]: /tagging
[18]: /agent/faq/agent-configuration-files/?tab=agentv6
[19]: /tagging/assigning_tags/#traces
[20]: https://app.datadoghq.com/apm/settings
