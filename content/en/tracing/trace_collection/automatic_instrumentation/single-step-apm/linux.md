---
title: Single Step APM Instrumentation on Linux
code_lang: linux
type: multi-code-lang
code_lang_weight: 0
further_reading:
  - link: /tracing/metrics/runtime_metrics/
    tag: Documentation
    text: Enable Runtime Metrics
---

## Overview

On a Linux host or VM, use Single Step Instrumentation (SSI) for APM to install the Datadog Agent and [instrument][14] your applications in one step, with no additional configuration required. 

## Enable APM on your applications

To enable APM on a Ubuntu host:

1. In the Datadog app, navigate to the [Install the Datadog Agent on Linux][15] page.
1. Turn on **APM Instrumentation**.
1. Copy and run the Agent installation command on your Linux host or VM.
1. Restart your applications.

## Advanced Options

When you run the one-line installation command, there are options to customize your experience:

### Customize APM libraries 

By default, Java, Python, Ruby, Node.js, PHP and .NET Core Datadog APM libraries are installed when `DD_APM_INSTRUMENTATION_ENABLED` is set. `DD_APM_INSTRUMENTATION_LIBRARIES` is used to override which libraries are installed. The value is a comma-separated string of colon-separated library name and version pairs.

Example values for `DD_APM_INSTRUMENTATION_LIBRARIES`:

- `DD_APM_INSTRUMENTATION_LIBRARIES="java:1"` - install only the Java Datadog APM library pinned to the major version 1 release line.
- `DD_APM_INSTRUMENTATION_LIBRARIES="java:1,python:3"` - install only the Java and Python Datadog APM libraries pinned to the major versions 1 and 3 respectively.
- `DD_APM_INSTRUMENTATION_LIBRARIES="java:1.38.0,python:2.10.5"` - install only the Java and Python Datadog APM libraries pinned to the specific versions 1.38.0 and 2.10.5 respectively.

Available versions are listed in source repositories for each language:

- [Java][8] (`java`)
- [Node.js][9] (`js`)
- [Python][10] (`python`)
- [.NET][11] (`dotnet`)
- [Ruby][12] (`ruby`)
- [PHP][13] (`php`)

## Remove Single Step APM instrumentation from your Agent

If you don't want to collect trace data for a particular service, host, VM, or container, complete the following steps:

### Remove instrumentation for specific services

To remove APM instrumentation and stop sending traces from a specific service:

1. Add the `DD_INSTRUMENT_SERVICE_WITH_APM` environment variable to the service startup command:

   ```shell
   DD_INSTRUMENT_SERVICE_WITH_APM=false <service_start_command>
   ```
2. Restart the service.

### Remove APM for all services on the infrastructure

To stop producing traces, uninstall APM and restart the infrastructure:

1. Run:
   ```shell
   dd-host-install --uninstall
   ```
2. Restart the services on the host or VM.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/site/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[8]: https://github.com/DataDog/dd-trace-java/releases
[9]: https://github.com/DataDog/dd-trace-js/releases
[10]: https://github.com/DataDog/dd-trace-py/releases
[11]: https://github.com/DataDog/dd-trace-dotnet/releases
[12]: https://github.com/DataDog/dd-trace-rb/releases
[13]: https://github.com/DataDog/dd-trace-php/releases
[14]: /tracing/glossary/#instrumentation
[15]: https://app.datadoghq.com/fleet/install-agent/latest?platform=linux


