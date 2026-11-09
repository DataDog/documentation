---
title: Monitor Inference Workloads on Kubernetes
description: Use Datadog's Kubernetes Explorer page to monitor inference workloads on your Kubernetes resources.
further_reading:
- link: "https://learn.datadoghq.com/courses/getting-started-k8s"
  tag: "Learning Center"
  text: "Getting Started with Kubernetes Observability"
---

Use the Kubernetes Explorer to monitor [AI inference][1] workloads running on Kubernetes. The AI inference view provides insight from endpoint to compute, simplifying troubleshooting, investigation, and debugging. Use it to monitor relevant pods, deployments, and other Kubernetes resources. You can also view resource specifications for failed pods within a deployment and correlate node activity with related metrics, logs, and traces.

AI inference is available for workloads deployed with the Dynamo, KubeRay, or KServe operator and is included with Infrastructure Monitoring.

## Prerequisites

- Datadog Agent v7.84.0 or later with the [`orchestratorExplorer` feature][2] enabled
- Both the Datadog Agent and the Cluster Agent must be running to collect Kubernetes resources

## Usage

In the Kubernetes Explorer, select {{< ui >}}AI{{< /ui >}} > {{< ui >}}Inference Workloads{{< /ui >}}.

The workload list view shows running inference workloads, with the following resource information for each:

- {{< ui >}}Cluster{{< /ui >}}
- {{< ui >}}Namespace{{< /ui >}}
- {{< ui >}}Model{{< /ui >}}
- {{< ui >}}GPU Device Types{{< /ui >}}

Click any item in those columns to access filter options, view related information, or view the resource's detail panel.

The list also shows health and performance metrics for each workload:

- {{< ui >}}Ready{{< /ui >}}: The number of pods ready to serve traffic and the total number of pods
- {{< ui >}}Latency{{< /ui >}}: Average end-to-end latency within vLLM engines, excluding frontend processes
- {{< ui >}}Requests{{< /ui >}}: The number of running requests and the total number of running and waiting requests
- {{< ui >}}Error Rate{{< /ui >}}: Percentage of Dynamo frontend requests with an error status (only available for Dynamo)

Anomalous values in these columns are highlighted to show potential areas for investigation. Detected anomalies include:

- Pods that are not ready to serve traffic
- Requests that are waiting, indicating engine saturation
- Error rates above CONFIRM WITH PM over the selected time frame

Select a workload from the list to view its detail panel. The detail panel shows more information about the workload, including related resources in a list or map view, workload components, and related metrics, logs, and traces. If you have GPU Monitoring enabled, click [{{< ui >}}View in GPU Monitoring{{< /ui >}}][3] to view more performance and health metrics about the workload.

[1]: https://app.datadoghq.com/orchestration/explorer/inferenceWorkload
[2]: /containers/monitoring/kubernetes_explorer_configuration/?tab=datadogoperator
[3]: /gpu_monitoring/inference/?tab=standalonevllm
