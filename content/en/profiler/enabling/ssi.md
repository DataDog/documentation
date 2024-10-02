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
version of Continuous Profiler with SSI works for host, container, and Kubernetes deployments.

Continuous Profiler with SSI can be enabled for the following languages:

| Language | Tracer library version |
|----------|------------------------|
| Java     | 1.37.0+                |
| Node.js  | 4.39.0+, 5.15.0+       |
| Python   | 2.11.1+                |

Kubernetes deployments require at least Datadog Agent 7.57.0. Host and container deployments can
use 7.56.x versions of the Datadog Agent.

## Enable Continuous Profiler with SSI

Continuous Profiler can be enabled as part of the SSI setup by following these steps:

{{< tabs >}}
{{% tab "Host and container" %}}

1. Go to the [Agent Installation Page][2] and select one of Linux platforms or Docker.
1. Toggle the "Enable APM Instrumentation" switch. (If there is no switch, the platform is not supported by SSI.) Toggling the switch adds the `DD_APM_INSTRUMENTATION_ENABLED=` environment variable to the installation command, configuring the installed agent to inject the tracer library into processes.
1. Copy the installation command into a text editor.
1. Add `DD_PROFILING_ENABLED=auto` as an additional environment variable after `DD_APM_INSTRUMENTATION_ENABLED` in the copied command. This turns on automatic profiler enablement for any new process worth profiling.
1. Proceed with the rest of the installation instructions, using the modified installation command.

[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
{{% /tab %}}
{{% tab "Kubernetes with Helm Chart" %}}

1. Go to the [Agent Installation Page][2] and select Kubernetes, then select Helm Chart.
1. Open the APM dropdown and toggle the Enable APM Instrumentation switch.
1. Add the values below to `datadog-values.yaml` in addition to those indicated by the installation page. The `datadog.profiling.enabled: auto` setting turns on automatic profiler enablement for any new
process worth profiling.
1. Proceed with rest of the installation instructions.

```
agents:
  image:
    tag: latest
clusterAgent:
  image:
    tag: latest
datadog:
  profiling:
    enabled: auto
```

If you already have the Datadog Helm chart, ensure it is updated to at least version 3.71.0.
Use the "latest" image tag to install a recent Agent version with support for profiling, as 
the Datadog Helm chart defaults to an older Agent version.

[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
{{% /tab %}}
{{% tab "Kubernetes with Datadog Operator" %}}

1. Go to the [Agent Installation Page][2] and select Kubernetes, then select Operator.
1. Open the APM dropdown and toggle the Enable APM Instrumentation switch.
1. Add the values below to `datadog-values.yaml` in addition to those indicated by the installation page. The `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_PROFILING_ENABLED=auto` environment variable on
the Cluster Agent turns on automatic profiler enablement for any new process worth profiling.
1. Proceed with rest of the installation instructions.

```
spec:
  override:
    nodeAgent:
      image:
        tag: latest
    clusterAgent:
      image:
        tag: latest
      env:
        - name: DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_PROFILING_ENABLED
          value: "auto"
```

Use the "latest" image tag to install a recent Agent version with support for profiling, as 
the Datadog Operator defaults to an older Agent version.

[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
{{% /tab %}}
{{< /tabs >}}

## How does profiling work with SSI

After the installation, all new processes are executed with the `DD_PROFILING_ENABLED=auto`
environment variable. Running processes are not affected. The Datadog library dynamically turns
on the profiler for the processes that are good profiling candidates.

The logic for identifying a process as a good candidate varies by language. For Java, all processes
are profiled, as Java applications are usually deployed as a single Java process on a host. For Node
and Python, profiler is only turned on if the application is running for more than 30 seconds and
has created at least one tracing span.

SSI can also be configured to inject profiling on each and every process by using the value `true`
instead of `auto`.

**Note**: Datadog recommends using the `auto` setting to avoid profiling low value processes.

# Reverting

The [Single Step APM Instrumentation][1] page contains instructions for removing all
instrumentation. Removing instrumentation also removes profiling.

Additionally, you can disable profiling by taking one of the following steps:
* Repeat the installation instructions using a `false` value in place of `auto`.
* Remove the `DD_PROFILING_ENABLED` setting from the `/etc/environment` file on the host, for host and container deployments.

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
[3]: /profiler/
