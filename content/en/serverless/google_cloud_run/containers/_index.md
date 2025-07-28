---
title: Choosing an Instrumentation Method for Google Cloud Run Containers
further_reading:
  - link: "/integrations/google-cloud-run/"
    tag: "Documentation"
    text: "Google Cloud Run Integration"
  - link: 'https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/'
    tag: 'Blog'
    text: 'Collect traces, logs, and custom metrics from Cloud Run services'
  - link: "/serverless/google_cloud_run/containers/in_process/"
    tag: 'Documentation'
    text: 'Instrument your container with the in-process approach'
  - link: "/serverless/google_cloud_run/containers/sidecar/"
    tag: 'Documentation'
    text: 'Instrument your container with the sidecar approach'
---

You have two options for instrumenting your Cloud Run containers with Datadog:
- [**In-process**][1]: Wraps your application container with the Datadog Agent. Choose this option for a simpler setup, lower cost overhead, and direct log piping.
- [**Sidecar**][2]: Deploys the Datadog Agent in a separate container alongside your app container. Choose this option if you have multiple containers in a single service, if you prefer strict isolation of the Datadog Agent, or if you have performance-sensitive workloads.

## Comparison: in-process versus sidecar instrumentation

| Aspect                        | In-process                                               | Sidecar                                                                                                                                                      |
|-------------------------------|----------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Deployment                    | One container (your app, wrapped with the Datadog Agent) | Two containers ( your app, Datadog Agent)                                                                                                                    |
| Image changes                 | Increases app image size.                                | No change to app image.                                                                                                                                      |
| Cost overhead                 | Less than sidecar (no extra container).                  | Extra vCPU/memory. Overallocating the sidecar wastes cost; underallocating leads to premature scaling.                                                       |
| Logging                       | Direct stdout/stderr access.                             | Shared volume + log library routing to a log file. Uncaught errors require extra handling, since they are not automatically handled by your logging library. |
| Failure isolation             | In rare cases, Datadog Agent bugs can affect your app.   | Datadog Agent faults are isolated.                                                                                                                           |
| Observing multiple containers | Not supported                                            | Supported                                                                                                                                                    |
## Installation

{{< programming-lang-wrapper langs="In-Process,Sidecar" >}}

{{< programming-lang lang="In-Process" >}}
Choose a language to instrument in-process.
{{< partial name="serverless/in-process-languages.html" >}}
{{< /programming-lang >}}

{{< programming-lang lang="Sidecar" >}}
Choose a language to instrument via sidecar.
{{< partial name="serverless/sidecar-languages.html" >}}
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /serverless/google_cloud_run/containers/in_process
[2]: /serverless/google_cloud_run/containers/sidecar
