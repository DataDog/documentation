---
title: Getting Started with Observability Pipelines
kind: Documentation
aliases:
    - /observability_pipelines/quickstart/
further_reading:
  - link: "/observability_pipelines/production_deployment_overview/"
    tag: "Documentation"
    text: "Production deployment overview for the Observability Pipelines Worker"
  - link: "https://dtdg.co/d22op"
    tag: "Learning Center"
    text: "Safe and Secure Local Processing with Observability Pipelines"
---

## Overview

The [Observability Pipelines Worker][1] can collect, process, and route logs and metrics from any source to any destination. Using Datadog, you can build and manage all of your Observability Pipelines Worker deployments at scale. 

This guide walks you through deploying the Worker in your common tools cluster and configuring the Datadog Agent to send logs and metrics to the Worker.

{{< img src="/observability_pipelines/quickstart/dd-pipeline.png" alt="A diagram of a couple of workload clusters sending their data through the Observability Pipelines aggregator." >}}

## Assumptions
* You are already using Datadog and want to use Observability Pipelines.
* Your services are deployed to a Kubernetes cluster in Amazon Elastic Kubernetes Service (EKS), Azure Kubernetes Service (AKS), or Google Kubernetes Engine (GKE).
* You have administrative access to the cluster(s) where the Observability Pipelines Worker is going to be deployed, as well as to the workloads that are going to be aggregated.
* You have a common tools or security cluster for your environment to which all other clusters are connected.

# Prerequisites
Before installing, make sure you have:

* A valid [Datadog API key][2].
* An Observability Pipelines Configuration ID.

You can generate both of these in [Observability Pipelines][3].

To run the Worker on your Kubernetes nodes, you need a minimum of two nodes with one CPU and 512MB RAM available. Datadog recommends creating a separate node pool for the Workers, which is also the recommended configuration for production deployments.

## Provider-specific requirements
{{< tabs >}}
{{% tab "AWS EKS" %}}
* The [AWS Load Balancer controller][1] is required. If you created your Amazon EKS cluster through the UI, then it is probably already installed.
* Datadog recommends using Amazon EKS >= 1.16.

[1]: https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html
{{% /tab %}}
{{% tab "Azure AKS" %}}
There are no specific requirements for Azure AKS.
{{% /tab %}}
{{% tab "Google GKE" %}}
There are no specific requirements for Google GKE.
{{% /tab %}}
{{< /tabs >}}

## Installing the Observability Pipelines Worker
### Download the Helm chart

{{< tabs >}}
{{% tab "AWS EKS" %}}
Download the [Helm chart][1] for AWS EKS. 

In the Helm chart, replace the `datadog.apiKey` and `datadog.configKey` values to match your pipeline. Then, install it in your cluster with the following commands:

```
$ helm repo add datadog https://helm.datadoghq.com
$ helm repo update
$ helm update --install \
    opw datadog/observability-pipelines-worker \
    -f aws_eks.yaml
```

[1]: /resources/yaml/observability_pipelines/quickstart/aws_eks.yaml
{{% /tab %}}
{{% tab "Azure AKS" %}}
Download the [Helm chart][1] for Azure AKS. 

In the Helm chart, replace the `datadog.apiKey` and `datadog.configKey` values to match your pipeline. Then, install it in your cluster with the following commands:

```
$ helm repo add datadog https://helm.datadoghq.com
$ helm repo update
$ helm update --install \
    opw datadog/observability-pipelines-worker \
    -f azure_aks.yaml
```

[1]: /resources/yaml/observability_pipelines/quickstart/azure_aks.yaml
{{% /tab %}}
{{% tab "Google GKE" %}}
Download the [Helm chart][1] for Google GKE. 

In the Helm chart, replace the `datadog.apiKey` and `datadog.configKey` values to match your pipeline. Then, install it in your cluster with the following commands:

```
$ helm repo add datadog https://helm.datadoghq.com
$ helm repo update
$ helm update --install \
    opw datadog/observability-pipelines-worker \
    -f google_gke.yaml
```

[1]: /resources/yaml/observability_pipelines/quickstart/google_gke.yaml
{{% /tab %}}
{{< /tabs >}}

### Load balancing
Use the load balancers provided by your cloud provider.
They adjust based on autoscaling events that the default Helm setup is configured for. The load balancers are internal-facing,
so they are only accessible inside your network.

Use the load balancer URL given to you by Helm when you configure the Datadog Agent.

#### Cross-availability-zone load balancing
The provided Helm configuration tries to simplify load balancing, but you must take into consideration the potential price implications of cross-AZ traffic. Wherever possible, the samples try to avoid creating situations where multiple cross-AZ hops can happen.

{{< tabs >}}
{{% tab "AWS EKS" %}}
NLBs provisioned by the [AWS Load Balancer Controller][1] are used.

The sample configurations do not enable the "cross-zone load balancing" feature available in this controller. To enable it, add the following annotation to the `service` block:

```
service.beta.kubernetes.io/aws-load-balancer-attributes: load_balancing.cross_zone.enabled=true
```

See [AWS Load Balancer Controller][2] for more details.

[1]: https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.4/
[2]: https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.4/guide/service/annotations/#load-balancer-attributes
{{% /tab %}}
{{% tab "Azure AKS" %}}
No specific requirements are needed for Azure AKS.
{{% /tab %}}
{{% tab "Google GKE" %}}
Global Access is enabled by default since that is likely required for use in a shared tools cluster.
{{% /tab %}}
{{< /tabs >}}

### Buffering
Observability Pipelines includes multiple buffering strategies that allow you to increase the resilience of your cluster to downstream faults. The provided sample configurations use disk buffers, the capacities of which are rated for approximately 10 minutes of data at 10Mbps/core for Observability Pipelines deployments. That is often enough time for transient issues to resolve themselves, or for incident responders to decide what needs to be done with the observability data.

{{< tabs >}}
{{% tab "AWS EKS" %}}
For AWS, Datadog recommends using the `io2` EBS drive family. Alternatively, the `gp3` drives could also be used.
{{% /tab %}}
{{% tab "Azure AKS" %}}
For Azure AKS, Datadog recommends using the `default` (also known as `managed-csi`) disks.
{{% /tab %}}
{{% tab "Google GKE" %}}
For Google GKE, Datadog recommends using the `premium-rwo` drive class because it is backed by SSDs. The HDD-backed class, `standard-rwo`, might not provide enough write performance for the buffers to be useful.
{{% /tab %}}
{{< /tabs >}}

## Connect the Agent and the Worker
To send Datadog Agent logs and metrics to the Observability Pipelines Worker, update your agent configuration with the following:

```yaml
vector:
  logs.enabled: true
  # Adjust protocol to https if TLS/SSL is enabled on the Observability Pipelines Worker
  logs.url: "http://<OPW_HOST>:8282"
  metrics.enabled: true
  # Adjust protocol to https if TLS/SSL is enabled on the Observability Pipelines Worker
  metrics.url: "http://<OPW_HOST>:8282"

```

`OPW_HOST` is the `EXTERNAL-IP` of the load balancer you set up earlier. You can retrieve it by running the following command:

```
$ kubectl get svc opw-observability-pipelines-worker
```

At this point, your observability data should be going to the Worker and is available for data processing. The next section goes through what processing is included by default and the additional options that are available.

## Working with data
The [Helm chart](#download-the-helm-chart) provided has example processing steps that demonstrate Observability Pipelines tools and ensures that data sent to Datadog is in the correct format. 

### Processing logs
The provided logs pipeline does the following:

- **Tag logs coming through the Observability Pipelines Worker.** This helps determine what traffic still needs to be shifted over to the Worker as you update your clusters. These tags also show you how logs are being routed through the load balancer, in case there are imbalances.
- **Correct the status of logs coming through the Worker.** Due to how the Datadog Agent collects logs from containers, the provided `.status` attribute does not properly reflect the actual level of the message. It is removed to prevent issues with parsing rules in the backend, where logs are received from the Worker.

The following are two important components in the example configuration:
- `logs_parse_ddtags`: Parses the tags that are stored in a string into structured data. 
- `logs_finish_ddtags`: Re-encodes the tags so that it is in the format as how the Datadog Agent would send it.

Internally, the Datadog Agent represents log tags as a CSV in a single string. To effectively manipulate these tags, they must be parsed, modified, and then re-encoded before they are sent to the ingest endpoint. These steps are written to automatically perform those actions for you. Any modifications you make to the pipeline, especially for manipulating tags, should be in between these two steps.

### Processing metrics
The provided metrics pipeline does not require additional parsing and re-encoding steps. Similar to the logs pipeline, it tags incoming metrics for traffic accounting purposes. Due to the additional cardinality, this may have cost implications for custom metrics.

At this point, your environment is configured for Observability Pipelines with data flowing through it. Further configuration is likely required for your specific use case(s), but the tools provided gives you a starting point.

## Further reading
{{< partial name="whats-next/whats-next.html" >}}


[1]: /observability_pipelines/#what-is-observability-pipelines-and-the-observability-pipelines-worker
[2]: /account_management/api-app-keys/#api-keys
[3]: https://app.datadoghq.com/observability-pipelines/create
