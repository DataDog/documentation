---
title: Configure disk buffers for durable BYOC Logs ingestion
description: Configure persistent disk buffers to retain logs when the BYOC Logs engine is unavailable or cannot accept logs fast enough.
aliases:
- /cloudprem/operate/durable_autoscaling/
- /byoc-logs/operate/durable_autoscaling/
further_reading:
- link: "/byoc-logs/operate/sizing/"
  tag: "Documentation"
  text: "Cluster Sizing"
- link: "/observability_pipelines/scaling_and_performance/buffering_and_backpressure/"
  tag: "Documentation"
  text: "Observability Pipelines Buffering and Backpressure"
- link: "/byoc-logs/operate/monitoring/"
  tag: "Documentation"
  text: "Monitor BYOC Logs"
---

{{< jqmath-vanilla >}}

{{< img src="cloudprem/operate/disk-buffer-durability.svg" alt="Diagram of durable BYOC Logs ingestion using Observability Pipelines disk buffers and the BYOC Logs engine." style="width:100%;" >}}

## Overview

BYOC Logs combines Observability Pipelines with the BYOC Logs engine. Observability Pipelines Workers can store logs in persistent disk buffers when the BYOC Logs engine is unavailable or cannot keep up with the incoming rate. This gives the ingestion path time to recover without immediately dropping logs.

A durable setup has four parts:

- Enough buffer capacity for the backlog you want to retain
- Disk buffering on the BYOC Logs destination
- A persistent volume for each Worker's buffer
- Enough time for a terminating Worker to drain its buffer

## Before you begin

This guide assumes that you have a BYOC Logs deployment with:

- Observability Pipelines configured with a [BYOC Logs destination][1]
- A [BYOC Logs engine deployment][2]

## Size the disk buffer

A useful starting point is to decide how long Workers need to retain logs if the BYOC Logs engine is unavailable. The expected backlog can then be divided across the minimum number of Workers that remain active.

For example, consider a total ingress of 50 TB/day, 25 Workers, and a one-hour BYOC Logs engine outage:

1. **Total backlog:** `50 TB × 1 hour ÷ 24 hours = 2.08 TB`
2. **Buffer per Worker:** `2.08 TB ÷ 25 Workers ≈ 83 GB`

Rounding up the result leaves capacity for a longer incident or a higher ingress rate. With a 100 GB buffer on each Worker, the 25 Workers provide 2.5 TB of total buffer capacity. This retains approximately 1.2 hours of logs at 50 TB/day.

## Disk buffer configuration

The following buffering options are available when editing the BYOC Logs destination in the Observability Pipelines UI or through the API:

- **Buffer type**: Disk
- **Buffer size**: The per-Worker capacity from your calculation
- **Behavior on full buffer**: Block

For the 25-Worker example, the destination configuration looks like this:

```json
"buffer": {
  "type": "disk",
  "max_size": 100000000000,
  "when_full": "block"
}
```

The `max_size` value is expressed in bytes (100 GB = 100,000,000,000 bytes). When the buffer is full, `block` keeps the Worker from discarding logs and allows backpressure to propagate to upstream applications.

## Persistent storage for the buffer

Disk buffering is durable only when the storage outlives the Worker pod. In the 100 GB buffer example, the following Helm values assign a 120 GiB (about 129 GB) persistent volume to each Worker. The extra capacity leaves headroom above the buffer size:

```yaml
persistence:
  enabled: true
  storageClassName: "<STORAGE_CLASS>"
  accessModes:
    - ReadWriteOnce
  size: 120Gi
  retentionPolicy:
    whenScaled: Retain
    whenDeleted: Retain
```

The persistent volume keeps buffered logs if a Worker pod restarts. The `Retain` policies also keep the volume when its Worker is scaled down or the StatefulSet is deleted.

## Draining Workers before shutdown

During a scale-down or rollout, a Worker stops accepting new logs and sends its buffered logs to the BYOC Logs engine. If the Worker exits before the buffer is empty, the logs remain on its persistent volume until a replacement Worker reattaches that volume.

Two settings give the Worker time to empty its buffer before exiting:

- `terminationGracePeriodSeconds` controls how long Kubernetes waits before terminating the pod.
- `DD_OP_GRACEFUL_SHUTDOWN_LIMIT_SECS` controls how long the Worker waits before forcing its own shutdown.

The shorter of these two limits determines how long the buffer has to drain. You can estimate the required time from the drain throughput measured in your environment:

$$\text"drain time" = {\text"buffer size (MB)"} / {\text"drain throughput (MB/s)"}$$

$$\text"termination grace period" = \text"drain time" × \text"safety factor"$$

For a Worker draining a 100 GB buffer at 120 MB/s, a safety factor of `1.2` gives:

1. **Drain time:** `100,000 MB ÷ 120 MB/s ≈ 833 seconds`
2. **Termination grace period:** `833 seconds × 1.2 ≈ 1000 seconds`

Although the estimate is approximately 1000 seconds, this example sets both shutdown limits to 3600 seconds to provide additional margin:

```yaml
env:
  - name: DD_OP_GRACEFUL_SHUTDOWN_LIMIT_SECS
    value: "3600"

terminationGracePeriodSeconds: 3600
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /observability_pipelines/destinations/datadog_byoc_logs/
[2]: /byoc-logs/install/
