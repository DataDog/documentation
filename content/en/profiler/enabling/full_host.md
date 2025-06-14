---
title: Enabling the Full-Host Profiler
private: true
further_reading:
    - link: 'getting_started/profiler'
      tag: 'Documentation'
      text: 'Getting Started with Profiler'
---

{{< callout url="https://www.datadoghq.com/product-preview/full-host-profiler/" btn_hidden="false" header="Join the Preview!" >}}
Full Host is in Preview.
{{< /callout >}}

The Full-Host Profiler is an eBPF-based profiling solution built on OpenTelemetry that sends profiling data to Datadog using the Datadog Agent. It supports symbolication for compiled languages and is optimized for containerized environments such as Docker and Kubernetes.

### Use cases

The Full-Host Profiler is particularly valuable for:

- Profiling open source software components that aren't instrumented with Datadog's tracing libraries.
- Analyzing performance across multi-language processes and runtimes.
- Identifying resource bottlenecks at the host level, including detection of noisy neighbor processes.


## Requirements

For a summary of the minimum and recommended runtime and tracer versions across all languages, read [Supported Language and Tracer Versions][7].

Supported operating systems
: Linux

Supported architecture
: `amd64` or `arm64` processors

Serverless
: `full host` is not supported on serverless platforms, such as AWS Lambda.

Debugging information
: Symbols should be available locally or can be uploaded in CI with `datadog-ci` 

## Installation

The Full-Host Profiler is distributed as a standalone executable.

### Container environments
For hosts running containerized workloads, Datadog recommends running the profiler inside a container:

- **Kubernetes**: Follow the [running in Kubernetes][8] instructions.
- **Docker**: Follow the [running in Docker][9] instructions.
- **Container image**: Available from the [container registry][5].


### Non-container environments

For hosts without container runtimes, follow the instructions for [running directly on the host][10].

### Configuration
#### Local symbol upload (Experimental)
For compiled languages (C/C++/Rust/Go), the profiler can upload local symbols to Datadog for symbolication when unstripped binaries are available.

To enable local symbol upload:

1. Set the `DD_HOST_PROFILING_EXPERIMENTAL_UPLOAD_SYMBOLS=true`.
2. Provide a [Datadog API key][11] through the `DD_API_KEY` environment variable.
3. Provide a [Datadog application key][13] through the `DD_APP_KEY` environment variable.
4. Set the `DD_SITE` environment variable to your [Datadog site][12]. Your site is: {{< region-param key="dd_site" code="true" >}}

### Build
To build the Full-Host Profiler directly on your machine, run:

   ```shell
   make
   ```


## What's next?

After installing the Full-Host Profiler, see the [Getting Started with Profiler][6] to learn how to use Continuous Profiler to identify and fix performance problems.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://github.com/DataDog/dd-otel-host-profiler/releases/
[3]: https://app.datadoghq.com/profiling
[4]: /getting_started/tagging/unified_service_tagging
[5]: https://github.com/DataDog/dd-otel-host-profiler/pkgs/container/dd-otel-host-profiler/.
[6]: /getting_started/profiler/
[7]: /profiler/enabling/supported_versions/
[8]: https://github.com/DataDog/dd-otel-host-profiler/blob/main/doc/running-in-kubernetes.md
[9]: https://github.com/DataDog/dd-otel-host-profiler/blob/main/doc/running-in-docker.md
[10]: https://github.com/DataDog/dd-otel-host-profiler/blob/main/doc/running-on-host.md
[11]: https://app.datadoghq.com/organization-settings/api-keys
[12]: /getting_started/site/
[13]: https://app.datadoghq.com/access/application-keys
