---
title: Quickstart
kind: Documentation
aliases:
    - /observability_pipelines/quickstart/
further_reading:
  - link: /observability_pipelines/production_deployment_overview/
    tag: Documentation
    text: Production deployment docs
  - link: https://dtdg.co/d22op
    tag: Practical
    text: Take a workshop on Building Observability Pipelines
---

**Welcome!**

This guide will run you through a simple deployment of Observability Pipelines, with the aim of getting you running as quickly as possible, with
our default recommended settings.

## Assumptions
* You are a current Datadog customer who wishes to utilize Observability Pipelines for cost control, compliance, or data insights.
* Your services (or at the least, OP) are deployed to a Kubernetes cluster in EKS, AKS, or GKE.
* You have administrative access to the cluster(s) to which you will deploy OP, as well as the workloads that will be aggregated.

# Prerequisites
Before installing, make sure you have:

* A valid [Datadog API key](/account_management/api-app-keys/#api-keys).
* An Observability Pipelines Configuration ID.

You can generate both of these through [the OP UI in your Datadog Account](https://app.datadoghq.com/observability-pipelines/create).

You will also need capacity on your Kubernetes nodes to run the Worker, **which at minimum will require 2 nodes with 1 CPU and 512MB RAM available.** A recommended way to do this is to create a separate node pool for the workers, which is also the recommended configuration for production deployments.

## Provider-Specific Requirements
{{< tabs >}}
{{% tab "AWS EKS" %}}
* **You will need the [AWS Load Balancer controller](https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html).** If you have made your EKS cluster through the UI, then you likely already have this installed.
* **We recommend an EKS >= 1.16.**
{{% /tab %}}
{{% tab "Azure AKS" %}}
*No special notes are needed for Azure.*
{{% /tab %}}
{{% tab "Google GKE" %}}
*No special notes are needed for GKE.*
{{% /tab %}}
{{< /tabs >}}

## Preparing your Environment
**Our eventual goal for this quickstart guide looks like the following:**
{{< img src="/observability_pipelines/quickstart/dd-pipeline.png" alt="A diagram of a couple of workload clusters pointing their data through OP." >}}

Most customers have a common tools/security cluster for their environments, which all other clusters are connected to.
This is a natural spot to deploy OP, as connectivity issues have already been worked out. **Other, more complex setups will be covered in other guides.**

## Installing OP
### Starting Configuration
The following Helm configurations are pre-assembled for the major cloud providers that we support.
{{< tabs >}}
{{% tab "AWS EKS" %}}
[Helm Chart](/resources/yaml/observability_pipelines/quickstart/aws_eks.yaml)
{{% /tab %}}
{{% tab "Azure AKS" %}}
[Helm Chart](/resources/yaml/observability_pipelines/quickstart/azure_aks.yaml)
{{% /tab %}}
{{% tab "Google GKE" %}}
[Helm Chart](/resources/yaml/observability_pipelines/quickstart/google_gke.yaml)
{{% /tab %}}
{{< /tabs >}}

After downloading the correct Helm chart for your provider, you should replace the `datadog.apiKey` and `datadog.configKey` values to match your pipeline. Then you can install it into your cluster with the following commands:

```
$ helm repo add datadog https://helm.datadoghq.com
$ helm repo update
$ helm update --install \
    opw datadog/observability-pipelines-worker \
    -f <HELM CHART YOU DOWNLOADED>
```

### Load Balancing
Our preference is to defer to the load balancers provided by your cloud- they will be higher-performance than anything we could offer ourselves,
and they will properly react to autoscaling events that the default Helm setup is configured for. All these load balancers are Internal-facing,
so they will only be accessible inside of your network.

You will enter the load balancer URL given to you by Helm when it comes time to configure the Datadog Agent.

#### Cross-AZ Load Balancing
The provided Helm configurations do their best to simplify load balancing, but you must take into consideration the potential price implications of cross-AZ traffic. **Wherever possible, the samples try to avoid creating situations where multiple cross-AZ hops can happen, preferring performance, simplicity, and cost optimizations at the potential expense of fault tolerance.** Links will be provided to the cloud provider info pages for more information on settings you can use to change that tradeoff however you would like for your own deployments.

{{< tabs >}}
{{% tab "AWS EKS" %}}
On AWS, we use NLBs provisioned by the [AWS Load Balancer Controller](https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.4/). It allows
much more flexibility and correctness than the in-tree controller that AWS provides.

The sample configurations do not enable the "cross-zone load balancing" feature available in this controller; to change this, adding the following annotation to the `service` block should suffice:

```
  service.beta.kubernetes.io/aws-load-balancer-attributes: load_balancing.cross_zone.enabled=true
```

[See the AWS LB Controller page for more details.](https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.4/guide/service/annotations/#load-balancer-attributes)
{{% /tab %}}
{{% tab "Azure AKS" %}}
*No special notes are needed for Azure.*
{{% /tab %}}
{{% tab "Google GKE" %}}
On GKE, we will enable Global Access by default since that is likely required for use in a shared tools cluster like we recommend in this guide.
{{% /tab %}}
{{< /tabs >}}

### Buffering
OP includes multiple buffering strategies that allow you to easily increase the resilence of your cluster to downstream faults. The sample configurations provided use disk buffers, the capacities of which are rated for about 10 minutes of data at 10Mbps/core for OP deployments we've seen out in the wild. That is often enough time for transient issues to resolve themselves, or for incident responders to decide what needs to be done with observability data.

{{< tabs >}}
{{% tab "AWS EKS" %}}
On AWS, we prefer to use the `io2` EBS drive family, as they have an excellent price/performance ratio for our needs. However, if that ends up being too expensive for you, the `gp3` drives have served customers well.
{{% /tab %}}
{{% tab "Azure AKS" %}}
On Azure, we prefer to use `default` (which really just means `managed-csi`) disks as their performance is satisfactory for our needs.
{{% /tab %}}
{{% tab "Google GKE" %}}
On GKE, we recommend using the `premium-rwo` drive class, as that is backed by SSDs. **Using the HDD-backed class, `standard-rwo`, will likely not give you enough write performance for the buffers to be useful, in our estimation.**
{{% /tab %}}
{{< /tabs >}}

## Linking the Agent and the Worker
To send logs and metrics to the Observability Pipelines Worker, update your agent configuration with the following:

```yaml
vector:
  logs.enabled: true
  # Adjust protocol to https if TLS/SSL is enabled on the Observability Pipelines Worker
  logs.url: "http://<OPW_HOST>:8282"
  metrics.enabled: true
  # Adjust protocol to https if TLS/SSL is enabled on the Observability Pipelines Worker
  metrics.url: "http://<OPW_HOST>:8282"

```

`OPW_HOST` will be the `EXTERNAL-IP` of the load balancer you set up earlier, which you can retrieve by running the following command:

```
$ kubectl get svc opw-observability-pipelines-worker
```

At this point, your observability data should be flowing through the OP Worker, and is now available for whatever processing you wish to do to it. In the next section, we'll cover both what processing we include by default, as well as additional options that are available to you.

## Working with Data
The Helm charts provided above give some example processing steps both to demonstrate the power of OP's tools, and to ensure that data sent to Datadog is in a correct format. We'll go over these inclusions below.

### Processing Logs
The provided logs pipeline has a couple of distinct purposes:

- **Tag logs coming through the OP Worker.** This will help with determining what traffic still needs to be shifted over to the Worker, as you update your clusters. These tags will also let you see how logs are being routed through the load balancer, in case of imbalances.
- **Correct the status of logs coming through the Worker.** Due to a quirk in how the Datadog Agent collects logs from containers, the provided `.status` attribute does not properly reflect the true level of the message. We remove this in order to prevent some issues with parsing rules in the backend that receives logs from the Worker.

In particular, the following steps in the pipeline are worth calling out:
- `logs_parse_ddtags`
- `logs_finish_ddtags`

Internally, the Datadog Agent represents log tags as a CSV in a single string. In order to effectively manipulate these tags, we must parse them, perform our modifications, and then re-encode them before they are sent off to the ingest endpoint. These steps are written to automatically perform those actions for you. **Any modifications you make to the pipeline, especially for manipulating tags, should be sandwiched between these two steps.**

### Processing Metrics
The provided metrics pipeline is thankfully much simpler, as it does not require additional parsing/re-encoding steps. Similar to the logs pipeline, it will tag incoming metrics for traffic accounting purposes. **Due to the additional cardinality, this may have cost implications for custom metrics. Integration metrics will behave, and be charged, as normal.**

## Further Reading
At this point, your environment is configured for Observability Pipelines, and data should be flowing through it. Further configuration is likely required for your specific use case(s), but the tools provided here should help you build whatever you need.

{{< partial name="whats-next/whats-next.html" >}}
