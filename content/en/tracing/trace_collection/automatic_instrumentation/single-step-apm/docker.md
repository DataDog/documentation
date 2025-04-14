---
title: Single Step APM Instrumentation on Docker
code_lang: docker
type: multi-code-lang
code_lang_weight: 10
further_reading:
  - link: /tracing/metrics/runtime_metrics/
    tag: Documentation
    text: Enable Runtime Metrics
---

## Overview

## Requirements

TODO: Determine if we want to remove platform-specific requirements from Compatibility page and instead include them here 

## Enable APM on your applications

For a Docker Linux container:

1. Run the one-line installation command:
   ```shell
   DD_APM_INSTRUMENTATION_ENABLED=docker DD_APM_INSTRUMENTATION_LIBRARIES="java:1,python:2,js:5,dotnet:3,php:1" DD_NO_AGENT_INSTALL=true bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
   ```
2. Configure the Agent in Docker:
   ```shell
   docker run -d --name dd-agent \
     -e DD_API_KEY=<YOUR_DD_API_KEY> \
     -e DD_APM_ENABLED=true \
     -e DD_ENV=<AGENT_ENV> \
     -e DD_APM_NON_LOCAL_TRAFFIC=true \
     -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true \
     -e DD_APM_RECEIVER_SOCKET=/var/run/datadog/apm.socket \
     -e DD_DOGSTATSD_SOCKET=/var/run/datadog/dsd.socket \
     -v /var/run/datadog:/var/run/datadog \
     -v /var/run/docker.sock:/var/run/docker.sock:ro \
     gcr.io/datadoghq/agent:7
   ```
   Replace `<YOUR_DD_API_KEY>` with your [Datadog API key][1] and `<AGENT_ENV>` with the environment your Agent is installed on (for example, `staging`).
   <div class="alert alert-info">See <a href=#advanced-options>Advanced options</a> for more options.</div>
3. Restart the Docker containers.
4. [Explore the performance observability of your services in Datadog][2].

After you complete these steps, you may want to enable [runtime metrics][3] or view observability data from your application in the [Software Catalog][4].

## Advanced Options

When you run the one-line installation command, there are a few options to customize your experience:

### `DD_APM_INSTRUMENTATION_LIBRARIES` - customizing APM libraries

By default, Java, Python, Ruby, Node.js and .NET Core Datadog APM libraries are installed when `DD_APM_INSTRUMENTATION_ENABLED` is set. `DD_APM_INSTRUMENTATION_LIBRARIES` is used to override which libraries are installed. The value is a comma-separated string of colon-separated library name and version pairs.

Example values for `DD_APM_INSTRUMENTATION_LIBRARIES`:

- `DD_APM_INSTRUMENTATION_LIBRARIES="java:1"` - install only the Java Datadog APM library pinned to the major version 1 release line.
- `DD_APM_INSTRUMENTATION_LIBRARIES="java:1,python:2"` - install only the Java and Python Datadog APM libraries pinned to the major versions 1 and 2 respectively.
- `DD_APM_INSTRUMENTATION_LIBRARIES="java:1.38.0,python:2.10.5"` - install only the Java and Python Datadog APM libraries pinned to the specific versions 1.38.0 and 2.10.5 respectively.


Available versions are listed in source repositories for each language:

- [Java][8] (`java`)
- [Node.js][9] (`js`)
- [Python][10] (`python`)
- [.NET][11] (`dotnet`)
- [Ruby][12] (`ruby`)
- [PHP][13] (`php`)


## Removing Single Step APM instrumentation from your Agent

If you don't want to collect trace data for a particular service, host, VM, or container, complete the following steps:

### Removing instrumentation for specific services

To remove APM instrumentation and stop sending traces from a specific service, follow these steps:

1. Add the `DD_INSTRUMENT_SERVICE_WITH_APM` environment variable to the service startup command:
   ```shell
   docker run -e DD_INSTRUMENT_SERVICE_WITH_APM=false <service_start_command>
   ```
2. Restart the service.

### Removing APM for all services on the infrastructure

To stop producing traces, uninstall APM and restart the infrastructure:

1. Run:
   ```shell
   dd-container-install --uninstall
   ```
2. Restart Docker:
   ```shell
   systemctl restart docker
   ```
   Or use the equivalent for your environment.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /tracing/software_catalog/
[3]: /tracing/metrics/runtime_metrics/
[4]: /tracing/software_catalog/
[8]: https://github.com/DataDog/dd-trace-java/releases
[9]: https://github.com/DataDog/dd-trace-js/releases
[10]: https://github.com/DataDog/dd-trace-py/releases
[11]: https://github.com/DataDog/dd-trace-dotnet/releases
[12]: https://github.com/DataDog/dd-trace-rb/releases
[13]: https://github.com/DataDog/dd-trace-php/releases


