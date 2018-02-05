---
title: APM (Tracing)
kind: Documentation
description: Instrument your code to improve performance
---

## Overview

Datadog's integrated APM tool eliminates the traditional separation between infrastructure and application performance monitoring. This not only provides greater visibility, but also allows you to see the relationship between application code and the underlying infrastructure.

Datadog APM is offered as an upgrade to our Pro and Enterprise plans. A free 14-day trial is available.
Registered users can visit the [APM page of the Datadog application](https://app.datadoghq.com/apm/home).

## Instrument your application

With our infrastructure monitoring, metrics are sent to the Datadog Agent, which then forwards them to Datadog. Similarly, tracing metrics are also sent to the Datadog agent. To start tracing your application:

**1. Install the Datadog Agent**

Install and configure the latest [Datadog Agent](https://app.datadoghq.com/account/settings#agent) (version 5.11.0 or above is required). For additional information, reference the [getting started guide](/tracing/getting_started)

**2. Install the Trace Agent**

If you are running MacOS or Windows, you will need to install and run the [Trace Agent](https://github.com/DataDog/datadog-trace-agent) in addition to the DataDog agent. On Linux, the Trace Agent is packaged with the standard Datadog Agent, so no extra configuration is required.

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

## Additional resources

For additional help from Datadog staff and other Datadog community members, join the [*apm* channel](https://datadoghq.slack.com/messages/apm) in our Datadog Slack. Visit [http://chat.datadoghq.com](http://chat.datadoghq.com) to join the Slack.

You can also reach our APM team via email at [tracehelp@datadoghq.com](mailto:tracehelp@datadoghq.com).
