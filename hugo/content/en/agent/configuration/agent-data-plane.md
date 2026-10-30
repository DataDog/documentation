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

## Overview

The Agent Data Plane (ADP) is a high-performance data pipeline that runs alongside the core Datadog Agent. It is designed to process high-volume telemetry with lower and more predictable CPU and memory usage.

ADP implements the DogStatsD pipeline only. When ADP is enabled, it receives, aggregates, and forwards all DogStatsD metrics, events, and service checks in place of the core Agent. Metrics from integrations and checks continue to be processed by the core Agent.

ADP ships with the Datadog Agent and requires no separate installation. Your DogStatsD clients, ports, and sockets do not change, and the metrics sent to Datadog are the same with or without ADP.

Datadog plans to make ADP the default DogStatsD implementation in upcoming Agent releases.

## Prerequisites

ADP is supported on Agent version 7.82.0 and later on Kubernetes, Docker, ECS, Linux, macOS, and Windows. Datadog recommends Agent version 7.84.2 or later.

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

## Disable the Agent Data Plane

To return DogStatsD processing to the core Agent, set the same option to `false` and restart the Agent:

| Configuration method   | Setting                                    |
|------------------------|--------------------------------------------|
| Datadog Operator       | `spec.features.dataPlane.enabled: false`   |
| Helm                   | `datadog.dataPlane.enabled: false`         |
| `datadog.yaml`         | `data_plane.enabled: false`                |
| Environment variable   | `DD_DATA_PLANE_ENABLED=false`              |

If you disable ADP because of an issue, [send a flare][1] to Datadog Support before disabling it. The flare includes ADP diagnostic data only while ADP is running.

## What to expect

When ADP is enabled:

- **A new container or process runs**:
  - In Kubernetes, the Agent pod includes an `agent-data-plane` container.
  - In Docker and ECS, an `agent-data-plane` process runs inside the existing Agent container.
  - On Linux hosts, a `datadog-agent-data-plane` systemd service runs.
  - On macOS hosts, an `agent-data-plane` launchd service runs.
  - On Windows hosts, an `agent-data-plane` process runs, managed by the Agent.
- **Resource usage shifts to ADP**: The `agent-data-plane` container or process uses CPU and memory for DogStatsD that the core Agent used before. Compare resource usage across the whole Agent, not a single container or process. High-volume DogStatsD workloads typically see a net decrease.
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

The following table maps core Agent commands to their ADP equivalents:

| Core Agent command                | ADP command                                  |
|-----------------------------------|----------------------------------------------|
| `agent dogstatsd-stats`           | `agent-data-plane dogstatsd stats`           |
| `agent dogstatsd top`             | `agent-data-plane dogstatsd top`             |
| `agent dogstatsd-capture`         | `agent-data-plane dogstatsd capture`         |
| `agent dogstatsd-replay`          | `agent-data-plane dogstatsd replay`          |
| `agent dogstatsd dump-contexts`   | `agent-data-plane dogstatsd dump-contexts`   |

The `agent-data-plane dogstatsd stats` command is always available. You do not need to enable `dogstatsd_stats_enable` or restart the Agent.

### Agent telemetry

If you monitor the Agent's DogStatsD internals with the [Go-Expvar integration][5], the core Agent's DogStatsD counters report `0` when ADP is enabled. This is expected, because ADP handles that traffic instead. ADP's internal metrics are exposed through the Agent telemetry endpoint (`localhost:5000/telemetry`) and are tagged with `emitter:agent-data-plane`. Some metric names and tags differ from those emitted by the core Agent.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/troubleshooting/send_a_flare/
[2]: /agent/configuration/agent-status-page/
[3]: /agent/configuration/agent-log-files/
[4]: https://github.com/DataDog/saluki/blob/main/docs/agent-data-plane/configuration/configuration.md
[5]: /integrations/go_expvar/
