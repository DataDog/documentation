---
title: GPU Monitoring
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-gpu-monitoring/"
  tag: "Blog"
---

## Overview
Datadog’s GPU Monitoring provides a centralized view into GPU fleet health, cost and performance, enabling users to: 

1. Make better provisioning decisions:
With visibility into GPU utilization by host, node or even pod, users can identify hotspots or underutilization of expensive GPU infrastructure.

2. Quickly troubleshoot failed workloads due to resource contention 
Users can understand their current device availability and forecast how many devices are needed for certain teams or workloads to avoid failed workloads from resource contention.

3. Maximize model/application performance: 
With GPUM’s Resource Telemetry, users can analyze trends in GPU resources and metrics over time like GPU Utilization, Power, and Memory data throughput to understand their effects on your model/application performance.

4. Identify & eliminate wasted, idle GPU costs: 
Users can identify total, idle and inefficient spend on GPU infrastructure and attribute those costs to specific workloads and instances.

5. Avoid cumbersome manual setup of vendor tools: 
GPU Monitoring has a streamlined onboarding experience where users don’t need to set up each vendor tool manually (like the NVIDIA DCGM Exporter) and they can automatically get GPU metrics OOTB directly from the DD Agent. 

## Ready to start?

See the [Setup documentation][1] for instructions on how to set up Datadog's GPU Monitoring product. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /gpu_monitoring/quickstart
