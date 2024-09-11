---
title: (LEGACY) Optimizing the Instance
aliases:
  - /observability_pipelines/architecture/optimize/
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Observability Pipelines is not available on the US1-FED Datadog site.</div>
{{< /site-region >}}

<div class="alert alert-info">
This guide is for large-scale production-level deployments.
</div>

## Instance sizing

Compute optimized instances with at least 8 vCPUs and 16 GiB of memory. These are ideal units for horizontally scaling the Observability Pipelines Worker aggregator. Observability Pipelines Worker can vertically scale and automatically take advantage of additional resources if you choose larger instances. Choose a size that allows for at least two Observability Pipelines Worker instances for your data volume to improve availability.

| Cloud Provider| Recommendation                                    	|
| ------------- | ----------------------------------------------------- |
| AWS           | c6i.2xlarge (recommended) or c6g.2xlarge          	|
| Azure         | f8                                                	|
| Google Cloud  | c2 (8 vCPUs, 16 GiB memory)                       	|
| Private       | 8 vCPUs, 16 GiB of memory, local disk is not required	|

## CPU sizing

Most Observability Pipelines Worker workloads are CPU constrained and benefit from modern CPUs.

| Cloud Provider| Recommendation                                                        |
| ------------- | --------------------------------------------------------------------- |
| AWS           | Latest generation Intel Xeon, 8 vCPUs (recommended), at least 4 vCPUs |
| Azure         | Latest generation Intel Xeon, 8 vCPUs (recommended), at least 4 vCPUs |
| Google Cloud  | Latest generation Intel Xeon, 8 vCPUs (recommended), at least 4 vCPUs |
| Private       | Latest generation Intel Xeon, 8 vCPUs (recommended), at least 4 vCPUs |

## CPU architectures

Observability Pipelines Worker runs on modern CPU architectures. X86_64 architectures offer the best return on performance for Observability Pipelines Worker.

## Memory sizing

Due to Observability Pipelines Worker's affine type system, memory is rarely constrained for Observability Pipelines Worker workloads. Therefore, Datadog recommends ≥2 GiB of memory per vCPU minimum. Memory usage increases with the number of sinks due to the in-memory buffering and batching. If you have a lot of sinks, consider increasing the memory or switching to disk buffers.

## Disk sizing

If you're using Observability Pipelines Worker's disk buffers for high durability (recommended), provision at least 36 GiB per vCPU of disk space. Following the recommendation of 8 vCPUs, provision 288 GiB of disk space (10 MiB * 60 seconds * 60 minutes * 8 vCPUs).

| Cloud Provider| Recommendation*                                               |
| ------------- | --------------------------------------------------------------|
| AWS           | EBS gp3, 36 GiB per vCPU, no additional IOPS or throughput    |
| Azure         | Ultra-disk or standard SSD, 36 GiB per vCPU                   |
| Google Cloud  | Balanced or SSD persistent disks, 36 GiB per vCPU             |
| Private       | Network-based block storage equivalent, 36 GiB per vCPU       |

*The recommended sizes are calculated at Observability Pipelines Worker's 10 MiB/s/vCPU throughput for one hour. For example, an 8 vCPU machine would require 288 GiB of disk space (10 MiB * 60 seconds * 60 minutes * 8 vCPUs).

### Disk types

Choose a disk type that optimizes for durability and recovery. For example, standard block storage is ideal because it is decoupled from the instance and replicates data across multiple disks for high durability. High-performance local drives are not recommended because their throughput exceeds Observability Pipelines Worker's needs, and their durability is reduced relative to block storage.

In addition, network file systems like Amazon's EFS are usable, but only if sufficient throughput is provisioned; burst throughput modes do not suffice. Datadog recommends configuring at least twice the maximum expected throughput to give headroom for spikes in demand. The recommended disks above all have sufficient throughput that this is not a concern.

See [Preventing Data Loss][1] for more information on why disks are used in this architecture.

### Operating systems and GCC

Choose a Linux-based operating system with glibc (GNU) ≥ 2.14 (released in 2011) if possible. Observability Pipelines Worker runs on other platforms, but this combination produces the best performance in Datadog's benchmarks.

[1]: /observability_pipelines/legacy/architecture/preventing_data_loss