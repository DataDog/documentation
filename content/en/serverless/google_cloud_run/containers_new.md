---
title: Choosing an Instrumentation Method
---

## Sidecar vs. In-Process Instrumentation

You have two options for instrumenting your Cloud Run containers with Datadog:
- In-Process: wrap your application container with the Agent via Dockerfile
- Sidecar: deploy a separate container alongside your app container

## Comparison at a Glance

| **Aspect**          | **In-Process**                                                  | **Sidecar**                                                                                                                                                  |
|---------------------|-----------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Deployment          | Single container (Agent wraps your app)                         | Two containers (app + Agent)                                                                                                                                 |
| Image changes       | Update Dockerfile to ENTRYPOINT via Agent; increases image size | No change to app image; deploy agent separately                                                                                                              |
| Cost Overhead       | Cheaper than sidecar (no extra container)                       | Extra vCPU/memory. Overallocating the sidecar wastes cost; underallocating leads to premature scaling.                                                       |
| Performance Impact  | Minimal request latency overhead                                | Zero impact on request latency                                                                                                                               |
| Logging             | Direct stdout/stderr access                                     | Shared volume + log library routing to a log file. Uncaught errors require extra handling, since they are not automatically handled by your logging library. |
| Failure isolation   | Agent bugs can affect your app (rare)                           | Agent faults isolated; app stays healthy                                                                                                                     |
| Multiple Containers | Does not support observing multiple containers                  | Supports observing multiple containers                                                                                                                       |

## Choosing the Right Model
- Use the **In-Process** approach if you want the simplest setup, lower cost overhead, and direct log piping.
- Use the **Sidecar approach** if you have multiple containers in a single service, if you prefer strict isolation of the Agent, or if you have performance-sensitive workloads.

{{< partial name="serverless/google-cloud-run-container-options.html" >}}
