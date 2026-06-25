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

This guide shows you how to instrument your [Azure Container Apps](https://learn.microsoft.com/en-us/azure/container-apps/overview) workloads to send traces, metrics, and logs to Datadog. Choose an instrumentation method and your application language to get setup instructions for your environment.

{{< img src="serverless/azure_container_apps/aca_top_2.png" alt="Datadog UI, Serverless Monitoring page with Azure Container Apps selected." style="width:100%;" >}}

## Instrument your application

{{< aca-instrumentation-picker >}}

## Comparison: In-Container versus sidecar instrumentation

| Aspect                        | In-Container                                               | Sidecar                                                                                                                                                      |
|-------------------------------|----------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Deployment                    | One container (your app, wrapped with the Datadog Agent) | Two containers (your app, Datadog Agent)                                                                                                                    |
| Image changes                 | Increases app image size.                                | No change to app image.                                                                                                                                      |
| Cost overhead                 | Less than sidecar (no extra container).                  | Extra vCPU/memory. Overallocating the sidecar wastes cost; underallocating leads to premature scaling.                                                       |
| Logging                       | Direct stdout/stderr access.                             | Shared volume + log library routing to a log file. Uncaught errors require extra handling, since they are not automatically handled by your logging library. |
| Failure isolation             | In rare cases, Datadog Agent bugs can affect your app.   | Datadog Agent faults are isolated.                                                                                                                           |
| Best for                      | Simpler setup, lower cost, and direct log piping.        | Multiple containers per service, Agent isolation, and performance-sensitive workloads.                                                                       |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
