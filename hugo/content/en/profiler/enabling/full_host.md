---
title: Enabling the Full-Host Profiler
private: true
further_reading:
    - link: 'profiler/enabling/full_host_deployment'
      tag: 'Documentation'
      text: 'Deploying the Full-Host Profiler'
    - link: 'profiler/profiler_troubleshooting/full_host'
      tag: 'Documentation'
      text: 'Full-Host Profiler Troubleshooting'
    - link: 'getting_started/profiler'
      tag: 'Documentation'
      text: 'Getting Started with Profiler'
---

{{< callout url="https://www.datadoghq.com/product-preview/full-host-profiler/" btn_hidden="false" header="Join the Preview!" >}}
Full-Host Profiler is in Preview.
{{< /callout >}}

The Full-Host Profiler collects CPU profiles across all processes on a host, regardless of language or runtime. It runs as a DaemonSet on your Kubernetes nodes and is built on the [OpenTelemetry eBPF Profiler][1].

### Use cases

The Full-Host Profiler is valuable for:

- Profiling open source software components that don't use Datadog SDKs.
- Analyzing performance across multi-language processes and runtimes.

## Supported environments

The Full-Host Profiler is supported in Kubernetes environments that meet these requirements:

| Requirement              | Supported values                          |
|---------------------------|--------------------------------------------|
| Operating system          | Linux                                      |
| Kernel                    | 5.10 or later                              |
| CPU architecture          | `amd64` or `arm64`                         |
| Kubernetes workload type  | Host-level DaemonSet with `hostPID: true`  |

Common supported setups include self-managed Kubernetes clusters, Amazon EKS with EC2 nodes, GKE Standard, and AKS VM node pools.

This preview does not support direct host or VM installation, Docker without Kubernetes, serverless runtimes, or Kubernetes modes that can't run host-level DaemonSets, such as Amazon EKS on Fargate, GKE Autopilot, and AKS virtual nodes.

## Deployment

Choose a deployment path based on how your Kubernetes cluster is managed:

| If your cluster...                                                                    | Deploys the profiler as...                                          |
|-----------------------------------------------------------------------------------------|-----------------------------------------------------------------------|
| Already runs the Datadog Agent with Helm, including Datadog Distribution of OpenTelemetry (DDOT) deployments | A sidecar in the Agent DaemonSet, using the **Datadog Helm chart** tab       |
| Already runs the Datadog Agent with the Datadog Operator, including DDOT deployments    | A sidecar in the Agent DaemonSet, using the **Datadog Operator** tab         |
| Doesn't run the Datadog Agent, and you use Helm                                         | Its own OpenTelemetry Collector DaemonSet, using the **OpenTelemetry Helm chart** tab |
| Doesn't run the Datadog Agent, and you use the OpenTelemetry Operator                    | Its own OpenTelemetry Collector DaemonSet, using the **OpenTelemetry Operator** tab |

If the Datadog Agent is already installed, use one of the Datadog Agent deployment paths so the Agent can enrich profiles with infrastructure metadata. Otherwise, use one of the OpenTelemetry paths.

The OpenTelemetry paths deploy the Full-Host Profiler as its own OpenTelemetry Collector DaemonSet. They don't require a pre-existing Datadog Agent, DDOT Collector, or other Agent-side Datadog component on the host, and you can run the DaemonSet alongside other Collector distributions.

For step-by-step instructions for each path, see [Deploying the Full-Host Profiler][2].

## Service naming

<div class="alert alert-info">Set <b>OTEL_SERVICE_NAME</b> or <b>DD_SERVICE</b> for each service you want to profile and identify separately. This gives you accurate attribution and more actionable profiling data.</div>

The Full-Host Profiler determines each process's service name from the `OTEL_SERVICE_NAME` or `DD_SERVICE` environment variable:

```yaml
env:
  - name: OTEL_SERVICE_NAME
    value: my-service
```

If neither variable is set, the profiler infers the service name from the binary name. For interpreted languages, this is the interpreter name, such as `java` or `python`.
{{< img src="profiler/inferred_service_example.png" alt="Example of an inferred service within Profiling." style="width:50%;">}}

If multiple services share the same interpreter and don't set a service name, their profiles are grouped under the same inferred name. Datadog can't distinguish between them unless you provide a unique service name.

Set `DD_ENV` and `DD_VERSION` on your workloads for richer filtering in the [Datadog Profiler][3] UI. Support for equivalent metadata from `OTEL_RESOURCE_ATTRIBUTES` is in progress.

## Debug symbols

For compiled languages such as C, C++, Rust, and Go, debug symbols are required for function names to appear in profiles.

The Full-Host Profiler uploads debug symbols to Datadog when they are available locally. If your production binaries are stripped, upload symbols from your build artifacts separately:

1. Install the [datadog-ci][4] CLI.
2. Set your API key and site:

   ```shell
   export DD_API_KEY=<DATADOG_API_KEY>
   export DD_SITE=<DATADOG_SITE>
   ```

3. Upload symbols:

   ```shell
   DD_BETA_COMMANDS_ENABLED=1 datadog-ci elf-symbols upload /path/to/build/symbols/
   ```

## Security privileges

The Full-Host Profiler doesn't run as a privileged container. In Kubernetes, it runs as a host-level DaemonSet with `hostPID: true` so it can observe processes on the node. The deployment manifests add only the Linux capabilities required for eBPF-based host profiling.

- **SELinux** is configured with the `spc_t` super-privileged container type so that SELinux doesn't block the host and process access the Full-Host Profiler requires. This type doesn't provide additional SELinux confinement. If `spc_t` isn't available, replace it with an equivalent type supported by your distribution and security policy.
- **seccomp** restricts the syscalls the container can make beyond what those capabilities allow. The seccomp profile ships at `/etc/dd-host-profiler/seccomp.json` inside the image and is applied automatically in the Helm-based paths and the OpenTelemetry Operator path. In the Datadog Operator preview path, seccomp is optional and must be provisioned manually.
- **AppArmor** is optional where available. The provided profile restricts which binaries the profiler can run: only `objcopy`, used for symbol extraction, is permitted.

See [Deploying the Full-Host Profiler][2] for the settings that apply to each deployment path.

## Relationship to OpenTelemetry

The Full-Host Profiler is built as an OpenTelemetry Collector distribution for host-wide eBPF profiling. It uses the [OpenTelemetry eBPF Profiler][1] and exports profile telemetry to Datadog through OTLP HTTP.

### Deployment with DDOT or as a standalone Collector

The Full-Host Profiler is supported in two ways:

- **With the Datadog Agent, including DDOT deployments**: The Full-Host Profiler runs as a sidecar in the Datadog Agent DaemonSet, deployed with the Datadog Helm chart or the Datadog Operator. It infers its configuration from the Agent, and the Agent enriches profiles with Datadog infrastructure metadata.
- **Standalone**: The Full-Host Profiler runs as its own OpenTelemetry Collector DaemonSet, deployed with the OpenTelemetry Helm chart or the OpenTelemetry Operator, and sends profiles directly to Datadog. No Datadog Agent or DDOT Collector is required.

In both cases, the Full-Host Profiler runs in its own profiling-focused container rather than inside the DDOT Collector. Host-wide eBPF profiling requires elevated host access, such as `hostPID: true`, host kernel mounts, and eBPF-related Linux capabilities. Keeping the profiler separate avoids granting that access to a larger general-purpose Collector distribution, and reduces the amount of code running with host-level privileges.

This follows the upstream OpenTelemetry approach: the eBPF profiler is packaged as a dedicated distribution rather than being included directly in `otelcol-contrib`.

For instructions for each option, see [Deploying the Full-Host Profiler][2].

### Datadog contributions to OpenTelemetry profiling

Datadog is a major contributor to the OpenTelemetry profiling ecosystem, including:

- the OTLP Profiles signal, which reached alpha in April 2026 (see the [OpenTelemetry profiles alpha announcement][5] and [KubeCon talk][6])
- the [OpenTelemetry eBPF Profiler][1]
- OpenTelemetry specification work for [process][7] and [thread][8] context sharing, which supports trace-to-profile correlation

### Datadog distribution features

The Datadog Full-Host Profiler distribution packages upstream OpenTelemetry profiling components with Datadog integration and tested defaults, including:

- native debug symbol upload to Datadog when symbols are available locally, so native frames for languages such as C, C++, and Rust can be symbolized without a separate CI symbol-upload setup
- curated defaults and components for Datadog export and container tagging
- a version tested at scale on thousands of hosts for overhead and stability

The long-term goal is to make these benefits available with upstream OpenTelemetry distributions directly. The preview distribution provides them out of the box today.

## What's next?

After deploying the Full-Host Profiler, see [Getting Started with Profiler][9] to learn how to use Continuous Profiler to identify and fix performance problems.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-ebpf-profiler
[2]: /profiler/enabling/full_host_deployment/
[3]: https://app.datadoghq.com/profiling
[4]: https://github.com/DataDog/datadog-ci?tab=readme-ov-file#how-to-install-the-cli
[5]: https://opentelemetry.io/blog/2026/profiles-alpha/
[6]: https://youtu.be/TKp2snmgvtQ?si=lhQ-n7lREvPCqF6Y
[7]: https://github.com/open-telemetry/opentelemetry-specification/pull/4719
[8]: https://github.com/open-telemetry/opentelemetry-specification/pull/4947
[9]: /getting_started/profiler/
