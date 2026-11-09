---
title: Agent Data Plane
description: "Enable the Agent Data Plane, a high-performance pipeline that processes DogStatsD traffic in the Datadog Agent with lower CPU and memory usage."
further_reading:
- link: "/extend/dogstatsd/"
  tag: "Documentation"
  text: "Introduction to DogStatsD"
- link: "/extend/dogstatsd/high_throughput/"
  tag: "Documentation"
  text: "Sending large volumes of metrics"
- link: "/metrics/guide/agent-side-tag-aggregation/"
  tag: "Documentation"
  text: "Agent-Side Tag Aggregation"
- link: "/agent/architecture/"
  tag: "Documentation"
  text: "Agent architecture"
---
{{< callout url="#" header="false" btn_hidden="true" >}}
Agent Data Plane is in Preview. It is disabled by default except for the deployments listed in <a href="#default-enablement">Default enablement</a>. You can enable it using the instructions on this page.
{{< /callout >}}

## Overview

The Agent Data Plane (ADP) is a high-performance data pipeline that runs alongside the main Datadog Agent. It is designed to process high-volume telemetry with lower and more predictable CPU and memory usage.

ADP implements the DogStatsD pipeline only. When ADP is enabled, it receives, aggregates, and forwards all DogStatsD metrics, events, and service checks in place of the main Agent. Metrics from integrations and checks continue to be processed by the main Agent.

ADP ships with the Datadog Agent and requires no separate installation. Your DogStatsD clients, ports, and sockets do not change, and the metrics sent to Datadog are the same with or without ADP.

## Prerequisites

ADP requires Agent version 7.84.2 or later.

## Default enablement

Datadog is enabling ADP by default in stages. ADP is enabled by default for Linux Agents deployed by the Datadog Operator when the Operator is installed with the [`datadog-operator` Helm chart][6] and the chart's `site` value is set to one of the following sites:

- `ap1.datadoghq.com`
- `ap2.datadoghq.com`

The default applies only when `spec.features.dataPlane.enabled` is not set in your `DatadogAgent` resource and the Agent is version 7.84 or later. An explicit `spec.features.dataPlane.enabled` setting always takes precedence.

To control the default for all `DatadogAgent` resources managed by the Operator, set `defaultDataPlaneEnabled.linux` in the `datadog-operator` chart's `values.yaml`:

{{< code-block lang="yaml" >}}
defaultDataPlaneEnabled:
  linux: "false" # "auto" (default), "true", or "false"
{{< /code-block >}}

- `"auto"`: Enables ADP only for the sites listed above.
- `"true"`: Enables ADP for all sites.
- `"false"`: Disables ADP for all sites.

### Changelog

| Date       | Change | Version |
|------------|--------|---------|
| 2026-11-09 | ADP enabled by default for Linux Agents managed by the Datadog Operator on the AP1 and AP2 sites. | `datadog-operator` Helm chart [2.32.0][7] |

## Enable the Agent Data Plane

{{< tabs >}}
{{% tab "Datadog Operator" %}}

With Operator version 1.27.0 or later, add the following to your `DatadogAgent` resource:

{{< code-block lang="yaml" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    dataPlane:
      enabled: true
  override:
    nodeAgent:
      image:
        tag: "7.84.2" # use 7.84.2 or later
{{< /code-block >}}

{{% /tab %}}
{{% tab "Helm" %}}

With Helm chart version 3.202.5 or later, add the following to your `values.yaml`:

{{< code-block lang="yaml" >}}
datadog:
  dataPlane:
    enabled: true
agents:
  image:
    tag: "7.84.2" # use 7.84.2 or later
{{< /code-block >}}

{{% /tab %}}
{{% tab "Host" %}}

Add the following to your [`datadog.yaml`][1] file, then [restart the Agent][2]:

{{< code-block lang="yaml" filename="datadog.yaml" >}}
data_plane:
  enabled: true
{{< /code-block >}}

[1]: /agent/configuration/agent-configuration-files/#main-configuration-file
[2]: /agent/configuration/agent-commands/#restart-the-agent

{{% /tab %}}
{{% tab "Docker and ECS" %}}

Set the following environment variable on the Agent container:

{{< code-block lang="shell" >}}
DD_DATA_PLANE_ENABLED=true
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## What to expect

When ADP is enabled:

- **A new container or process runs**:
  - In Kubernetes, the Agent pod includes an `agent-data-plane` container.
  - In Docker and ECS, an `agent-data-plane` process runs inside the existing Agent container.
  - On Linux hosts, a `datadog-agent-data-plane` systemd service runs.
  - On macOS hosts, an `agent-data-plane` launchd service runs.
  - On Windows hosts, an `agent-data-plane` process runs, managed by the Agent.
- **Resource usage shifts to ADP**: The `agent-data-plane` container or process uses CPU and memory for DogStatsD that the main Agent used before. Compare resource usage across the whole Agent, not a single container or process. High-volume DogStatsD workloads typically see a net decrease.
- **ADP has its own status and logs**: The [Agent status][2] output includes an **Agent Data Plane** section. ADP writes logs to `agent-data-plane.log` in the [Agent log directory][3].
- **Some DogStatsD tuning options have no effect**: Options such as `dogstatsd_pipeline_count`, `dogstatsd_queue_size`, `dogstatsd_mem_based_rate_limiter`, and `dogstatsd_stats_enable` are ignored. For the full list of supported options, see the [ADP configuration reference][4].

### Run DogStatsD debug commands

When ADP is enabled, run DogStatsD debug commands with the `agent-data-plane` binary instead of the `agent` binary. For example, to view the most processed metrics:

{{< tabs >}}
{{% tab "Kubernetes" %}}

{{< code-block lang="shell" >}}
kubectl exec -it <AGENT_POD_NAME> -c agent-data-plane -- agent-data-plane dogstatsd stats
{{< /code-block >}}

{{% /tab %}}
{{% tab "Docker" %}}

{{< code-block lang="shell" >}}
docker exec -it <AGENT_CONTAINER_NAME> agent-data-plane dogstatsd stats
{{< /code-block >}}

{{% /tab %}}
{{% tab "Linux and macOS" %}}

{{< code-block lang="shell" >}}
sudo -u dd-agent /opt/datadog-agent/embedded/bin/agent-data-plane dogstatsd stats
{{< /code-block >}}

{{% /tab %}}
{{% tab "Windows" %}}

Run the following in PowerShell as an administrator:

{{< code-block lang="powershell" >}}
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent\agent-data-plane.exe" dogstatsd stats
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

The following table maps main Agent commands to their ADP equivalents:

| Main Agent command                | ADP command                                  |
|-----------------------------------|----------------------------------------------|
| `agent dogstatsd-stats`           | `agent-data-plane dogstatsd stats`           |
| `agent dogstatsd top`             | `agent-data-plane dogstatsd top`             |
| `agent dogstatsd-capture`         | `agent-data-plane dogstatsd capture`         |
| `agent dogstatsd-replay`          | `agent-data-plane dogstatsd replay`          |
| `agent dogstatsd dump-contexts`   | `agent-data-plane dogstatsd dump-contexts`   |

The `agent-data-plane dogstatsd stats` command is always available. You do not need to enable `dogstatsd_stats_enable` or restart the Agent.

### Agent telemetry

If you monitor the Agent's DogStatsD internals with the [Go-Expvar integration][5], the main Agent's DogStatsD counters report `0` when ADP is enabled. This is expected, because ADP handles that traffic instead. ADP's internal metrics are exposed through the Agent's OpenMetrics telemetry endpoint (`localhost:5000/telemetry`) and are tagged with `emitter:agent-data-plane`. Some metric names and tags differ from those emitted by the main Agent.

## Resource requirements

ADP's CPU usage scales with the number of DogStatsD packets received per second. Its memory usage scales with the number of active contexts. A context is a unique combination of a metric name and its tag set. In Kubernetes, the `agent-data-plane` container has no resource requests or limits by default.

Based on your DogStatsD packets per second, use the following table to set resources for the `agent-data-plane` container:

| Packets per second | CPU request | Memory request and limit |
|--------------------|-------------|--------------------------|
| Fewer than 1,000   | 150m        | 256Mi                    |
| 1,000 to 10,000    | 500m        | 2Gi                      |
| 10,000 to 50,000   | 2           | 2.5Gi                    |
| More than 50,000   | 2 or more   | 2.5Gi or more            |

If you know your peak number of active contexts, size memory from contexts instead. Set the memory request and limit to at least 128 MiB plus 2.5 KiB per context. For example, 1,000,000 contexts requires about 2.5Gi.

Datadog recommends not setting a CPU limit on the `agent-data-plane` container. DogStatsD traffic volume can fluctuate, and CPU throttling can cause dropped packets. If your cluster requires a CPU limit, set it well above observed peaks.

To measure your DogStatsD volume, use the following metrics from the Agent's [OpenMetrics telemetry endpoint](#agent-telemetry) (`localhost:5000/telemetry`):

| Measurement        | Metric                                             |
|--------------------|----------------------------------------------------|
| Packets per second | `dogstatsd__udp_packets`, `dogstatsd__uds_packets` |
| Active contexts    | `aggregator__dogstatsd_contexts`                   |

The packet metrics are counters, so graph them as a rate to get packets per second. You can also view packet counts in the [Agent status][2] output. They appear in the **DogStatsD** section, or in the **Agent Data Plane** section when ADP is enabled.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

{{< code-block lang="yaml" >}}
spec:
  override:
    nodeAgent:
      containers:
        agent-data-plane:
          resources:
            requests:
              cpu: 500m
              memory: 2Gi
            limits:
              memory: 2Gi
{{< /code-block >}}

{{% /tab %}}
{{% tab "Helm" %}}

{{< code-block lang="yaml" >}}
agents:
  containers:
    agentDataPlane:
      resources:
        requests:
          cpu: 500m
          memory: 2Gi
        limits:
          memory: 2Gi
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

**Notes**:
- These values are based on observed usage across Datadog's own infrastructure. Workloads with many distribution metrics, high tag cardinality, or unbuffered DogStatsD clients may need more resources.
- These values apply to the `agent-data-plane` container only. Size the main `agent` container separately.

## Disable the Agent Data Plane

Disabling ADP returns DogStatsD processing to the main Agent. If ADP is [enabled by default](#default-enablement) for your deployment, use these settings to opt out.

If you are disabling ADP because of an issue, [send a flare][1] to Datadog Support first. The flare includes ADP diagnostic data only while ADP is running.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Set the following in your `DatadogAgent` resource:

{{< code-block lang="yaml" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    dataPlane:
      enabled: false
{{< /code-block >}}

{{% /tab %}}
{{% tab "Helm" %}}

Set the following in your `values.yaml`:

{{< code-block lang="yaml" >}}
datadog:
  dataPlane:
    enabled: false
{{< /code-block >}}

{{% /tab %}}
{{% tab "Host" %}}

Set the following in your [`datadog.yaml`][1] file, then [restart the Agent][2]:

{{< code-block lang="yaml" filename="datadog.yaml" >}}
data_plane:
  enabled: false
{{< /code-block >}}

[1]: /agent/configuration/agent-configuration-files/#main-configuration-file
[2]: /agent/configuration/agent-commands/#restart-the-agent

{{% /tab %}}
{{% tab "Docker and ECS" %}}

Set the following environment variable on the Agent container:

{{< code-block lang="shell" >}}
DD_DATA_PLANE_ENABLED=false
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/troubleshooting/send_a_flare/
[2]: /agent/configuration/agent-status-page/
[3]: /agent/configuration/agent-log-files/
[4]: https://github.com/DataDog/saluki/blob/main/docs/agent-data-plane/configuration/configuration.md
[5]: /integrations/go_expvar/
[6]: https://github.com/DataDog/helm-charts/tree/main/charts/datadog-operator
[7]: https://github.com/DataDog/helm-charts/releases/tag/datadog-operator-2.32.0
