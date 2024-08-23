---
title: Single Step Instrumentation for Profiling
private: true
---

# Overview

[Continuous Profiler][3] can be enabled as part of the [Single Step APM Instrumentation][1]
(SSI) setup. Since this mode of profiler enablement is in private beta it is not yet integrated in
the UI of the agent installation page. This page thus provides instructions on how to set it up. You
should first familiarize yourself with SSI in general.

After you enable Continuous Profiler as part of the SSI setup of Datadog agent, processes where
the agent is deployed are going to be profiled.

# Supported operating systems and environments

SSI is supported only on Linux, for both `x86_64` and `arm64` (ARM v8) architectures. Beta of
Continuous Profiler with SSI works for host or container deployments. Support for Kubernetes
deployments is forthcoming.

Beta of Continuous Profiler with SSI works with following languages with the indicated minimum
tracer library versions:

| Language | Tracer library version |
|----------|------------------------|
| Java     | 1.37.0+                |
| Node.js  | 4.39.0+, 5.15.0+       |
| Python   | 2.11.1+                |


# How to Enable Continuous Profiler with SSI

Continuous Profiler can be enabled as part of the SSI setup by following these steps:

* Go to the [Agent Installation Page][2] and select one of Linux platforms or Docker.
* Toggle the "Enable APM Instrumentation" switch. (If there is no such switch, the platform is not
  supported by SSI.) Toggling the switch adds the `DD_APM_INSTRUMENTATION_ENABLED=` environment
  variable to the installation command, configuring the installed agent to inject the tracer
  library into processes.
* Copy the installation command into a text editor.
* Add `DD_PROFILING_ENABLED=auto` as an additional environment variable before or after
  `DD_APM_INSTRUMENTATION_ENABLED` in the copied command. This turns on automatic profiler
  enablement for all processes.
* Proceed with rest of the installation instructions, using the modified installation command.

# The automatic profiling enablement mode

After the installation, all processes on the host or in the container are executed with
`DD_PROFILING_ENABLED=auto` environment variable. The `auto` value is recommended with SSI instead
of the `true` value. Using `true` would cause all processes into which Datadog agent can inject
a tracer library to be profiled. Not all processes are good candidates for profiling though. With
`auto` setting the Datadog tracer library decides whether the application is a good candidate for
profiling based on its behavior and turns on the profiler accordingly.

The logic for identifying a process as a good candidate varies by language. For Java,
all processes are profiled as Java applications are usually deployed as a single Java process on a
host. For Node and Python, profiler is only turned on if the application is running for more than 30
seconds and has created at least one tracing span.

# Reverting

The [Single Step APM Instrumentation][1] page contains instructions for removing all
instrumentation. Following them removes profiling as well. Additionally, you can disable profiling
only by either:
* repeating the installation instructions with `DD_PROFILING_ENABLED=false` value, or
* removing the `DD_PROFILING_ENABLED` setting from the `/etc/environment` file on the host.

Finally, you can still disable profiling on a per-process basis by explicitly setting
`DD_PROFILING_ENABLED=false` on its command line.

# Special Consideration for Systemd Services

For host installs, the `DD_PROFILING_ENABLED` environment variable is stored in `/etc/environment`
file where most Linux systems automatically pick it up for all processes. Notable exception to this
are systemd services which ignore the file. For applications deployed as systemd services, you need
to add the
```
EnvironmentFile=/etc/environment
```
line to their `.service` files. We are working on eliminating this extra step. Applications deployed
on host as something other than a systemd service, as well as container-deployed application do not
need this extra step.

[1]: /tracing/trace_collection/automatic_instrumentation/single-step-apm
[2]: /account/settings/agent/latest
[3]: /profiler/
