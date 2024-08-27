---
title: Single Step Instrumentation for Profiling
private: true
---

<div class="alert alert-info">Enabling Profiling using Single Step Instrumentation is in private beta.</div>

## Overview

Make sure you are familiar with [Single Step APM Instrumentation][1] (SSI) before proceeding.

[Continuous Profiler][3] can be enabled as part of the SSI setup. This page provides instructions on
how to set it up.

## Supported operating systems and environments

SSI is supported only on Linux, for both `x86_64` and `arm64` (ARM v8) architectures. The beta
version of Continuous Profiler with SSI works for host and container deployments. Kubernetes
deployments are not yet supported.

Continuous Profiler with SSI can be enabled for the following languages:

| Language | Tracer library version |
|----------|------------------------|
| Java     | 1.37.0+                |
| Node.js  | 4.39.0+, 5.15.0+       |
| Python   | 2.11.1+                |


## Enable Continuous Profiler with SSI

Continuous Profiler can be enabled as part of the SSI setup by following these steps:

1. Go to the [Agent Installation Page][2] and select one of Linux platforms or Docker.
1. Toggle the "Enable APM Instrumentation" switch. (If there is no switch, the platform is not supported by SSI.) Toggling the switch adds the `DD_APM_INSTRUMENTATION_ENABLED=` environment variable to the installation command, configuring the installed agent to inject the tracer library into processes.
1. Copy the installation command into a text editor.
1. Add `DD_PROFILING_ENABLED=auto` as an additional environment variable after `DD_APM_INSTRUMENTATION_ENABLED` in the copied command. This turns on automatic profiler enablement for any new process worth profiling.
1. Proceed with the rest of the installation instructions, using the modified installation command.

## How does profiling work with SSI

After the installation, all new processes on the host or in the container are executed with the
`DD_PROFILING_ENABLED=auto` environment variable. Running processes will not be affected.
The Datadog library dynamically turns on the profiler for the processes that are good profiling candidates.

The logic for identifying a process as a good candidate varies by language. For Java,
all processes that are profiled as Java applications are usually deployed as a single Java process on a
host. For Node and Python, profiler is only turned on if the application is running for more than 30
seconds and has created at least one tracing span.
SSI can also be configured to inject profiling on each and every process by using
`DD_PROFILING_ENABLED=true`.

**Note**: Datadog recommends using`DD_PROFILING_ENABLED=auto` to avoid profiling low value processes.

# Reverting

The [Single Step APM Instrumentation][1] page contains instructions for removing all
instrumentation. Removing instrumentation also removes profiling.

Additionally, you can disable profiling by:
* repeating the installation instructions with `DD_PROFILING_ENABLED=false` value, or
* removing the `DD_PROFILING_ENABLED` setting from the `/etc/environment` file on the host.

Finally, you can disable profiling on a per-process basis by explicitly setting
`DD_PROFILING_ENABLED=false` on its command line.

## Special considerations for Systemd services

For host installs, the `DD_PROFILING_ENABLED` environment variable is stored in the `/etc/environment`
file, where most Linux systems automatically pick it up for all processes. Exceptions to this
are systemd services which ignore the file. For applications deployed as systemd services, you need
the following line to the application `.service` files:
```
EnvironmentFile=/etc/environment
```
Applications deployed
on a host as something other than a systemd service, or container-deployed applications do not
need this extra step.

[1]: /tracing/trace_collection/automatic_instrumentation/single-step-apm
[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[3]: /profiler/
