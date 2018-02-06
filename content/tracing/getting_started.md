---
title: Getting started
kind: Documentation
description: Instrument your code to improve performance
further_reading:
- link: "/tracing/languages"
  tag: "Documentation"
  text: Instrument your code
- link: "/tracing/services"
  tag: "Documentation"
  text: Analyse your services
---

## Overview

APM is available as part of the Datadog Agent with versions 5.11+ as part of the one line install for the Linux and Docker Agents. Currently, [Mac](https://github.com/DataDog/datadog-trace-agent#run-on-osx) and [Windows](https://github.com/DataDog/datadog-trace-agent#run-on-windows) users must perform a manual install of the APM Agent (aka Trace Agent) via a separate install process.

<div class="alert alert-info">
APM is enabled by default after Datadog agent 5.13 (on Linux and Docker), and can be disabled by adding the parameter: <code>apm_enabled: no</code> in your Datadog agent configuration file.
</div>

Trace Agent packages are available for:

* Linux — packaged with the Datadog Agent
* Mac OS — packaged separately, see the [Trace Agent releases](https://github.com/DataDog/datadog-trace-agent/releases/)
* Docker — included in the [docker-dd-agent](https://github.com/DataDog/docker-dd-agent) container
* Heroku - deploy it to Heroku via the [Datadog Heroku Buildpack](https://github.com/DataDog/heroku-buildpack-datadog).

Install from source for other platforms.

## Instrument your application

With our infrastructure monitoring, metrics are sent to the Datadog Agent, which then forwards them to Datadog. Similarly, tracing metrics are also sent to the Datadog agent. To start tracing your application:

**1. Install the Datadog Agent**

Install and configure the latest [Datadog Agent](https://app.datadoghq.com/account/settings#agent) (version 5.11.0 or above is required). For additional information, reference the [getting started guide](/tracing/getting_started).

**2. Install the Trace Agent**

If you are running MacOS or Windows, you will need to install and run the [Trace Agent](https://github.com/DataDog/datadog-trace-agent) in addition to the DataDog agent. On Linux, the Trace Agent is packaged with the standard Datadog Agent, so no extra configuration is needed.

- [MacOS Trace Agent Configuration](https://github.com/DataDog/datadog-trace-agent#run-on-osx)
- [Windows Trace Agent Configuration](https://github.com/DataDog/datadog-trace-agent#run-on-windows)

**3. Instrument your application**

Instrument your application, select one of the following supported languages:

- [Go](/tracing/languages/go)
- [Java](/tracing/languages/java)
- [Python](/tracing/languages/python)
- [Ruby](/tracing/languages/ruby)

To instrument an application written in a language that does not yet have official library support, reference the [Tracing API](/api/?lang=console#traces), or visit our list of [community tracing libraries](/developers/libraries/#community-tracing-apm-libraries).

### Running the agent in Docker

To trace applications in Docker containers, you can use the [docker-dd-agent](https://hub.docker.com/r/datadog/docker-dd-agent/) image (tagged version 11.0.5110 or higher) and enable tracing by passing `DD_APM_ENABLED=true` as an environment variable.

For additional information, reference [the Docker page](/tracing/docker)

### Agent configuration

The Datadog Agent uses the [configuration file](/agent/faq/where-is-the-configuration-file-for-the-agent) for both infrastructure monitoring and APM configuration options.

Additionally, some configuration options may be set as environment variables. Note that options set as environment variables overrides the settings defined in the configuration file.

{{% table responsive="true" %}}
| File setting            | Environment variable | Description                                                                                                                                                      |
|-------------------------|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **main**                |                      |                                                                                                                                                                  |
| `apm_enabled`           | `DD_APM_ENABLED`     | The Datadog Agent accepts trace metrics when the value is set to `true`. The default value is `true`.                                                            |
| **trace.sampler**       |                      |                                                                                                                                                                  |
| `extra_sample_rate`     | -                    | Use this setting to adjust the trace sample rate. The value should be a float between `0` (no sampling) and `1` (normal sampling rate). The default value is `1` |
| `max_traces_per_second` | -                    | The maximum number of traces to sample per second. To disable the limit (*not recommended*), set to `0`. The default value is `10`.                              |
| **trace.receiver**      |                      |                                                                                                                                                                  |
| `receiver_port`         | `DD_RECEIVER_PORT`   | The port that the Datadog Agent's trace receiver should listen on. The default value is `8126`.                                                                  |
| `connection_limit`      | -                    | The number of unique client connections to allow during one 30 second lease period. The default value is `2000`.                                                 |
| **trace.ignore**        |                      |                                                                                                                                                                  |
| `resource`              | `DD_IGNORE_RESOURCE` | A blacklist of regular expressions to filter out Traces by their Resource name.                                                                                  |
{{% /table %}}

For more information about the Datadog Agent, see the [dedicated doc page](/agent/) or refer to the [`datadog.conf.example` file](https://github.com/DataDog/dd-agent/blob/master/datadog.conf.example).

## How it works?
### How often does the trace agent send stats?

The application code instrumentation flushes to the Agent every 1 s ([see here for the Python client](https://github.com/DataDog/dd-trace-py/blob/69693dc7cdaed3a2b6a855325109fa100e42e254/ddtrace/writer.py#L159) for instance) and the Agent flushes to the [Datadog API every 10s](https://github.com/DataDog/datadog-trace-agent/blob/master/config/agent.go#L170).
