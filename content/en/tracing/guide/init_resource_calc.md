---
title: Init Container Resource Usage
description: Learn how Datadog Agent v7.60+ automatically manages resource allocation for init containers that set up tracing, ensuring reliable tracer startup without impacting pod scheduling.
disable_toc: false
---

### Overview

Starting in Agent [v7.60+][1], Datadog uses dynamic resource calculation for init containers that inject tracing libraries. Instead of using fixed values, the init containers temporarily request all available CPU and memory for the pod, without affecting how the pod is scheduled. (Prior to v7.60, init containers used conservative defaults: `50m` for CPU and `20Mi` for memory.)

This behavior improves tracer startup reliability while respecting Kubernetes scheduling rules. Since init containers run sequentially and exit before application containers start, they don't compete for runtime resources.

### Pod scheduling

Kubernetes schedules pods using a formula that accounts for init containers:

<div style="text-align:center">
<pre><code>
Effective CPU/Memory request =
  max(sum of requests from all regular containers,
      max request of any single init container)
</code></pre>
</div>

Since init containers run before application containers (and don't overlap with them), they can temporarily use more resources without increasing the pod's effective request. This works as long as no single init container requests more resources than the pod can tolerate.

### Override default behavior

If needed, you can override the default init container resource usage by setting the following environment variables in the Cluster Agent configuration:
  - `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_INIT_RESOURCES_CPU`
  - `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_INIT_RESOURCES_MEMORY`

[1]: https://github.com/DataDog/datadog-agent/blob/40f0be0645ae309a07031bd7954fd58a8eb79853/pkg/clusteragent/admission/mutate/autoinstrumentation/auto_instrumentation.go#L611-L626