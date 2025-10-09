---
title: Enabling the Full-Host Profiler
private: true
further_reading:
    - link: 'getting_started/profiler'
      tag: 'Documentation'
      text: 'Getting Started with Profiler'
---

{{< callout url="https://www.datadoghq.com/product-preview/full-host-profiler/" btn_hidden="false" header="Join the Preview!" >}}
Full-Host is in Preview.
{{< /callout >}}

The Full-Host Profiler is an eBPF-based profiling solution built on OpenTelemetry that sends profiling data to Datadog using the Datadog Agent. It supports symbolication for compiled languages and is optimized for containerized environments such as Docker and Kubernetes.

### Use cases

The Full-Host Profiler is particularly valuable for:

- Profiling open source software components that aren't instrumented with Datadog's tracing libraries.
- Analyzing performance across multi-language processes and runtimes.

## Requirements

Supported operating systems
: Linux (5.4+ for amd64, 5.5+ for arm64)

Supported architecture
: `amd64` or `arm64` processors

Serverless
: `full-host` is not supported on serverless platforms, such as AWS Lambda.

Debugging information
: Symbols should be available locally or can be uploaded in CI with `datadog-ci`

## Installation

<div class="alert alert-info">Always set <b>DD_SERVICE</b> for each service you want to profile and identify separately. This ensures accurate attribution and more actionable profiling data. To learn more, see <a href="#service-naming">Service naming</a>.</div>

The Full-Host Profiler is distributed as a standalone executable.

### Container environments
For hosts running containerized workloads, Datadog recommends running the profiler inside a container:

- **Kubernetes**: Follow the [running in Kubernetes][7] instructions.
- **Docker**: Follow the [running in Docker][8] instructions.
- **Container image**: Available from the [container registry][5].


### Non-container environments

For hosts without container runtimes, follow the instructions for [running directly on the host][9].

## Service naming
When using full-host profiling, Datadog profiles all processes on the host. Each process's service name is derived from its `DD_SERVICE` environment variable.

If `DD_SERVICE` is set, the profiler uses the value of `DD_SERVICE` as the service name. This is the recommended and most reliable approach.

If `DD_SERVICE` is not set, Datadog infers a service name from the binary name. For interpreted languages, this is the name of the interpreter. For example, for a service written in Java, the full-host profiler sets the service name to `service:java`.
{{< img src="profiler/inferred_service_example.png" alt="Example of an inferred services within Profiling" style="width:50%;">}}

If multiple services are running under the same interpreter (for example, two separate Java applications on the same host), and neither sets `DD_SERVICE`, Datadog groups them together under the same service name. Datadog cannot distinguish between them unless you provide a unique service name.

## Debug symbols

For compiled languages (such as Rust, C, C++, Go, etc.), the profiler uploads local symbols to Datadog for symbolication, ensuring that function names are available in profiles. For Rust, C, and C++, symbols need to be available locally (unstripped binaries).

For binaries stripped of debug symbols, it's possible to upload symbols manually or in the CI:

1. Install the [datadog-ci][12] command line tool.
2. Provide a [Datadog API key][10] through the `DD_API_KEY` environment variable.
3. Set the `DD_SITE` environment variable to your [Datadog site][11].
4. Install the `binutils` package, which provides the `objcopy` CLI tool.
5. Run:
   ```
   DD_BETA_COMMANDS_ENABLED=1 datadog-ci elf-symbols upload ~/your/build/symbols/
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
[7]: https://github.com/DataDog/dd-otel-host-profiler/blob/main/doc/running-in-kubernetes.md
[8]: https://github.com/DataDog/dd-otel-host-profiler/blob/main/doc/running-in-docker.md
[9]: https://github.com/DataDog/dd-otel-host-profiler/blob/main/doc/running-on-host.md
[10]: https://app.datadoghq.com/organization-settings/api-keys
[11]: /getting_started/site/
[12]: https://github.com/DataDog/datadog-ci?tab=readme-ov-file#how-to-install-the-cli
