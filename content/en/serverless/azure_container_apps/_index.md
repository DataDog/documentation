---
title: Azure Container Apps
further_reading:
  - link: "/serverless/guide/disable_serverless"
    tag: "Documentation"
    text: "Disable Serverless Monitoring"
  - link: 'https://www.datadoghq.com/blog/azure-container-apps/'
    tag: 'Blog'
    text: 'Collect traces, logs, and custom metrics from Container Apps services'
  - link: 'http://datadoghq.com/blog/azure-well-architected-serverless-applications-best-practices/'
    tag: 'Blog'
    text: 'Build secure and scalable Azure serverless applications with the Well-Architected Framework'
  - link: "/integrations/azure/"
    tag: "Documentation"
    text: "Azure Integration"
  - link: "/serverless/azure_container_apps/in_container/"
    tag: 'Documentation'
    text: 'Instrument your container with the in-container approach'
  - link: "/serverless/azure_container_apps/sidecar/"
    tag: 'Documentation'
    text: 'Instrument your container with the sidecar approach'
---

## Overview
Azure Container Apps is a fully managed serverless platform for deploying and scaling container-based applications. Datadog provides standard metrics and log collection for Container Apps through the [Azure integration][1]. Datadog also provides a solution for instrumenting your Container Apps applications with a purpose-built Agent to enable tracing, custom metrics, and direct log collection.

{{< img src="serverless/azure_container_apps/aca_top_2.png" alt="Datadog UI, Serverless Monitoring page with Azure Container Apps selected." style="width:100%;" >}}

## Choosing an Instrumentation Method

To instrument your Azure Container App with Datadog, choose one of two options:

{{% aca-container-options %}}

- [**In-Container**][2]: Wraps your application container with the Datadog Agent. Choose this option for a simpler setup, lower cost overhead, and direct log piping.
- [**Sidecar**][3]: Deploys the Datadog Agent in a separate container alongside your app container. Choose this option if you have multiple containers in a single service, if you prefer strict isolation of the Datadog Agent, or if you have performance-sensitive workloads.

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


[1]: /integrations/azure/#log-collection
[2]: /serverless/azure_container_apps/in_container
[3]: /serverless/azure_container_apps/sidecar
