---
title: Enabling the eBPF Profiler
code_lang: ebpf
type: multi-code-lang
code_lang_weight: 90
aliases:
  - /tracing/profiler/enabling/ebpf/
further_reading:
    - link: 'getting_started/profiler'
      tag: 'Documentation'
      text: 'Getting Started with Profiler'
    - link: 'profiler/profiler_troubleshooting/ebpf'
      tag: 'Documentation'
      text: 'Fix problems you encounter while using the profiler'
---

<div class="alert alert-warning">
<code>ebpf</code> is in beta. Datadog recommends evaluating the profiler in a non-sensitive environment before deploying in production.
</div>

The eBPF profiler is our eBPF-based host profiler built on OpenTelemetry and designed to send profiling data to the Datadog backend via the Datadog Agent. It supports symbolication for compiled languages and is optimized for containerized environments like Docker and Kubernetes.

## Requirements

For a summary of the minimum and recommended runtime and tracer versions across all languages, read [Supported Language and Tracer Versions][7].

Supported operating systems
: Linux

Supported architecture
: `amd64` or `arm64` processors

Serverless
: `ebpf` is not supported on serverless platforms, such as AWS Lambda.

OS Settings
: `perf_event_paranoid` kernel setting is 2 or less (see [Troubleshooting][1])

Debugging information
: Symbols should be available. The profiler cannot provide human-readable function names if the symbol table is stripped.

## Installation

The profiler can be used as a standalone executable.

### Running the Profiler
If the host is running workloads inside containers, it is recommended to run the profiler inside a container as well. A container image is [available][5].

If you're using Kubernetes, follow the instruction for [running in Kubernetes][8].

If you're directly using Docker, follow the instrcutins for [running in Docker][9].

If you're not using a container runtime, follow the instructions for running [directly on the host][10]

### Configuring the Profiler
#### Local symbol upload (Experimental)
For compiled languages (C/C++/Rust/Go/...), the profiler can upload local symbols (when available) to Datadog for symbolication. Symbols need to be available locally (unstripped binaries).

To enable local symbol upload:

1. Set the `DD_HOST_PROFILING_EXPERIMENTAL_UPLOAD_SYMBOLS` environment variable to true.
2. Provide a Datadog API key through the `DD_API_KEY` environment variable.
3. Provide a Datadog APP key through the `DD_APP_KEY` environment variable.
4. Set the `DD_SITE environment` variable to your Datadog site (e.g. datadoghq.com, datadoghq.eu, us5.datadoghq.com, ...).

### Build
You must first ensure you have the correct version of go installed. In order to build the profiler directly on your machine, you can simply run:

   ```shell
   make
   ```

### Library
TBD

### Deploying the shared library

TBD

#### Installing the library

TBD
#### Appending a search directory

TBD

## Configuration

The `environment`, `service`, and `service_version` settings are recommended, as they are used by the Profiling UI.

See the [full list of parameters][5] or use the command line.

```bash
ebpf --help
```

### Logging

You can configure logging to one of several endpoints:
- `stdout` prints the logs to standard output stream (the default).
- `stderr` prints the logs to the standard error stream.
- `syslog` publishes the logs to syslog, attempting to adhere to the specification in RFC 3164.
- `disable` disables the logs entirely.
- Any other value is treated as a file path, with a leading `/` designating an absolute path.

### Global

If you want to instrument all running process, you can try out the `--global` option.
Global mode is intended for debug purposes. This requires elevated permissions. Depending on your setup, this can mean running as root, granting `CAP_PERFMON`, `CAP_SYSADMIN`, or setting `perf_event_paranoid` to `-1`.

```bash
./ebpf --environment staging --global --service_version full-host-profile
```

For most configurations, this consists of all processes visible within the profiler's PID namespace.

## Not sure what to do next?

The [Getting Started with Profiler][6] guide takes a sample service with a performance problem and shows you how to use Continuous Profiler to understand and fix the problem.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /profiler/profiler_troubleshooting
[2]: shttps://github.com/DataDog/dd-otel-host-profiler/releases/
[3]: https://app.datadoghq.com/profiling
[4]: /getting_started/tagging/unified_service_tagging
[5]: https://github.com/DataDog/dd-otel-host-profiler/pkgs/container/dd-otel-host-profiler/.
[6]: /getting_started/profiler/
[7]: /profiler/enabling/supported_versions/
[8]: https://github.com/DataDog/dd-otel-host-profiler/blob/main/doc/running-in-kubernetes.md
[9]: https://github.com/DataDog/dd-otel-host-profiler/blob/main/doc/running-in-docker.md
[10]: https://github.com/DataDog/dd-otel-host-profiler/blob/main/doc/running-on-host.md