---
title: Choosing an Instrumentation Method for Containers
further_reading:
  - link: "/integrations/google-cloud-run/"
    tag: "Documentation"
    text: "Google Cloud Run Integration"
  - link: 'https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/'
    tag: 'Blog'
    text: 'Collect traces, logs, and custom metrics from Cloud Run services'
  - link: "/serverless/google_cloud_run/containers/in_container/"
    tag: 'Documentation'
    text: 'Instrument your container with the in-container approach'
  - link: "/serverless/google_cloud_run/containers/sidecar/"
    tag: 'Documentation'
    text: 'Instrument your container with the sidecar approach'
  - link: 'https://www.datadoghq.com/blog/instrument-cloud-run-with-datadog-sidecar/'
    tag: 'Blog'
    text: 'Instrument Google Cloud Run applications with the new Datadog Agent sidecar'
---

To instrument your Google Cloud Run containers with Datadog, choose one of two options:

{{% gcr-container-options %}}

- [**In-Container**][1]: Wraps your application container with the Datadog Agent. Choose this option for a simpler setup, lower cost overhead, and direct log piping.
- [**Sidecar**][2]: Deploys the Datadog Agent in a separate container alongside your app container. Choose this option if you have multiple containers in a single service, if you prefer strict isolation of the Datadog Agent, or if you have performance-sensitive workloads.

## Comparison: In-Container versus sidecar instrumentation

| Aspect                        | In-Container                                               | Sidecar                                                                                                                                                      |
|-------------------------------|----------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Deployment                    | One container (your app, wrapped with the Datadog Agent) | Two containers (your app, Datadog Agent)                                                                                                                    |
| Image changes                 | Increases app image size.                                | No change to app image.                                                                                                                                      |
| Cost overhead                 | Less than sidecar (no extra container).                  | Extra vCPU/memory. Overallocating the sidecar wastes cost; underallocating leads to premature scaling.                                                       |
| Logging                       | Direct stdout/stderr access.                             | Shared volume + log library routing to a log file. Uncaught errors require extra handling, since they are not automatically handled by your logging library. |
| Failure isolation             | In rare cases, Datadog Agent bugs can affect your app.   | Datadog Agent faults are isolated.                                                                                                                           |
| Observing multiple containers | Not supported                                            | Supported                                                                                                                                                    |


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /serverless/google_cloud_run/containers/in_container
[2]: /serverless/google_cloud_run/containers/sidecar
