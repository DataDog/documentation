---
title: Single Step Instrumentation for Profiling
private: true
---

## Overview

Make sure you are familiar with [Single Step APM Instrumentation][1] (SSI) before proceeding.

[Continuous Profiler][3] can be enabled as part of the SSI setup. Since this mode of profiler
enablement is in private beta it is not yet integrated in the UI of the agent installation page.
This page provides instructions on how to set it up.

## Supported operating systems and environments

SSI is supported only on Linux, for both `x86_64` and `arm64` (ARM v8) architectures. The beta
version of Continuous Profiler with SSI works for host and container deployments. Kubernetes
deployments are not supported.

Beta of Continuous Profiler with SSI works with following languages on following minimum
tracer library versions:

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
1. Add `DD_PROFILING_ENABLED=auto` as an additional environment variable before or after `DD_APM_INSTRUMENTATION_ENABLED` in the copied command. This turns on automatic profiler enablement for all processes.
1. Proceed with rest of the installation instructions, using the modified installation command.

## Enable automatic profiling

After the installation, all processes on the host or in the container are executed with the
`DD_PROFILING_ENABLED=auto` environment variable. Datadog recommends using the `auto` value with SSI
instead of the `true` value. Using `true` profiles all processes that a Datadog agent can inject a
tracer library into. Not all processes are good candidates for profiling though. With the `auto`
setting, the Datadog tracer library decides whether the application is a good candidate for
profiling based on its behavior and turns on the profiler accordingly.

The logic for identifying a process as a good candidate varies by language. For Java,
all processes that are profiled as Java applications are usually deployed as a single Java process on a
host. For Node and Python, profiler is only turned on if the application is running for more than 30
seconds and has created at least one tracing span.

# Reverting

The [Single Step APM Instrumentation][1] page contains instructions for removing all
instrumentation. Removing instrumentation also removes profiling. Additionally, you can disable
profiling by:
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
on host as something other than a systemd service, and container-deployed applications do not
need this extra step.

[1]: /tracing/trace_collection/automatic_instrumentation/single-step-apm
[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[3]: /profiler/
