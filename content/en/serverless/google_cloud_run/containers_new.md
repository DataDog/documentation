---
title: Choosing an Instrumentation Method
further_reading:
  - link: "/integrations/google-cloud-run/"
    tag: "Documentation"
    text: "Google Cloud Run Integration"
  - link: 'https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/'
    tag: 'Blog'
    text: 'Collect traces, logs, and custom metrics from Cloud Run services'
  - link: "/serverless/google_cloud_run/containers_in_process/"
    tag: 'Documentation'
    text: 'Instrument your container with the in-process approach'
  - link: "/serverless/google_cloud_run/containers_sidecar/"
    tag: 'Documentation'
    text: 'Instrument your container with the sidecar approach'
---

You have two options for instrumenting your Cloud Run containers with Datadog:
- **In-Process**: wrap your application container with the Agent via Dockerfile
- **Sidecar**: deploy a separate container alongside your app container

## Comparison at a Glance

| **Aspect**          | **In-Process**                                                  | **Sidecar**                                                                                                                                                  |
|---------------------|-----------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Deployment          | Single container (Agent wraps your app)                         | Two containers (app + Agent)                                                                                                                                 |
| Image changes       | Update Dockerfile to ENTRYPOINT via Agent; increases image size | No change to app image; deploy agent separately                                                                                                              |
| Cost Overhead       | Cheaper than sidecar (no extra container)                       | Extra vCPU/memory. Overallocating the sidecar wastes cost; underallocating leads to premature scaling.                                                       |
| Logging             | Direct stdout/stderr access                                     | Shared volume + log library routing to a log file. Uncaught errors require extra handling, since they are not automatically handled by your logging library. |
| Failure isolation   | Agent bugs can affect your app (rare)                           | Agent faults isolated; app stays healthy                                                                                                                     |
| Multiple Containers | Does not support observing multiple containers                  | Supports observing multiple containers                                                                                                                       |

## Choosing the Right Model
- Use the **In-Process** approach if you want the simplest setup, lower cost overhead, and direct log piping.
- Use the **Sidecar approach** if you have multiple containers in a single service, if you prefer strict isolation of the Agent, or if you have performance-sensitive workloads.

{{< partial name="serverless/google-cloud-run-container-options.html" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
