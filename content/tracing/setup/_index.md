---
title: Set up APM
kind: Documentation
aliases:
  - /tracing/languages/
further_reading:
- link: "tracing/setup/environment"
  tag: "Documentation"
  text: "Learn more about environment configuration"
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

This documentation covers Agent v6 only, to know how to set up APM tracing with Agent v5, [refer to the dedicated APM with agent v5 doc](/tracing/faq/agent-5-tracing-setup).  

## Setup process

With our infrastructure monitoring, metrics are sent to the Agent, which then forwards them to Datadog. Similarly, tracing metrics are also sent to the Agent: the application code instrumentation flushes to the Agent every 1 s ([see here for the Python client](https://github.com/DataDog/dd-trace-py/blob/69693dc7cdaed3a2b6a855325109fa100e42e254/ddtrace/writer.py#L159) for instance) and the Agent flushes to the [Datadog API every 10s](https://github.com/DataDog/datadog-trace-agent/blob/master/config/agent.go#L170).  

To start tracing your application:

1. **Install the Datadog Agent**:    
  Install and configure the latest [Datadog Agent](https://app.datadoghq.com/account/settings#agent). For additional information, reference the [getting started guide](https://github.com/DataDog/datadog-trace-agent/tree/master/config#agent-configuration).

2. **Install the Trace Agent**:  

  * On **Linux**,**Windows**, and **[Docker](/tracing/setup/docker)** the Trace Agent is pre-packaged with the standard Datadog Agent and no extra configuration is needed.

  * On **macOS** , install and run the [Trace Agent](https://github.com/DataDog/datadog-trace-agent) in addition to the Datadog Agent.  
  See the [macOS Trace Agent](https://github.com/DataDog/datadog-trace-agent#run-on-osx) and [Windows Trace Agent](https://github.com/DataDog/datadog-trace-agent/#run-on-windows) dedicated documentation.  

  * On Heroku, Deploy the Datadog Trace Agent via the [Datadog Heroku Buildpack](https://github.com/DataDog/heroku-buildpack-datadog).  

3. **Configure your environment**:  
  An environment is a first class dimension used to scope a whole Datadog APM application. A common use case is to disaggregate metrics from stage environments such as production, staging, and pre-production. [Learn how to configure environments](/tracing/setup/environment).  
  **Note**: if you do not configure your own environments, all data will default to `env:none`.

4. **Instrument your application**:   
  Select one of the following supported languages:

  - [Go](/tracing/setup/go)
  - [Java](/tracing/setup/java)
  - [Python](/tracing/setup/python)
  - [Ruby](/tracing/setup/ruby)

    To instrument an application written in a language that does not yet have official library support, visit our list of [community tracing libraries](/developers/libraries/#community-tracing-apm-libraries).

5. Start monitoring your app's performance: Within a few minutes of running APM, you will start to see your services appear in [the APM home page](https://app.datadoghq.com/apm/home?env=). See [Using the APM UI](/tracing/visualization) to learn more.

## Agent configuration

The APM agent (also known as _trace agent_) is shipped by default with the
Agent 6 in the Linux, MacOS, and Windows packages. The APM agent is enabled by default on Linux. To enable the check on other platforms or disable it on Linux, update the `apm_config` key in your `datadog.yaml`:

```
apm_config:
  enabled: true
```

{{% table responsive="true" %}}
| File setting            | Environment variable | Description                                                                                                                                                      |
|------------------------------|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **main**                |                      |                                                                                                                                                                  |
| `apm_enabled`           | `DD_APM_ENABLED`     | The Datadog Agent accepts trace metrics when the value is set to `true`. The default value is `true`.                                                            |
| **trace.sampler**       |                      |                                                                                                                                                                  |
| `extra_sample_rate`     | -                    | Use this setting to adjust the trace sample rate. The value should be a float between `0` (no sampling) and `1` (normal sampling). The default value is `1`. |
| `max_traces_per_second` | -                    | The maximum number of traces to sample per second. To disable the limit (*not recommended*), set to `0`. The default value is `10`.                              |
| **trace.receiver**      |                      |                                                                                                                                                                  |
| `receiver_port`         | `DD_RECEIVER_PORT`   | The port that the Datadog Agent's trace receiver should listen on. The default value is `8126`.                                                                  |
| `connection_limit`      | -                    | The number of unique client connections to allow during one 30 second lease period. The default value is `2000`.                                                 |
| **trace.ignore**        |                      |                                                                                                                                                                  |
| `resource`              | `DD_IGNORE_RESOURCE` | A blacklist of regular expressions to filter out Traces by their resource name.                                                                                  |
{{% /table %}}

For more information about the Datadog Agent, see the [dedicated doc page](/agent/) or refer to the [`datadog.conf.example` file](https://github.com/DataDog/dd-agent/blob/master/datadog.conf.example).

[Reference the dedicated documentation to setup tracing with Docker](/tracing/setup/docker).

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}