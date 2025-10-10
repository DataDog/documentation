---
title: Kubernetes Cluster Name Automatic Detection
description: Automatic cluster name detection for Kubernetes clusters on GKE, AKS, and EKS to improve node identification
aliases:
  - /agent/faq/kubernetes-cluster-name-detection
  - /agent/guide/kubernetes-cluster-name-detection
further_reading:
- link: "/agent/autodiscovery/"
  tag: "documentation"
  text: Docker Agent Autodiscovery
- link: "/agent/kubernetes/host_setup/"
  tag: "documentation"
  text: "Kubernetes Host Setup"
- link: "/agent/kubernetes/integrations/"
  tag: "documentation"
  text: "Custom Integrations"
---

For Agent v6.11+, the Datadog Agent can automatically detect the Kubernetes cluster name on Google Kubernetes Engine (GKE), Azure Kubernetes Service (AKS), and Amazon Elastic Kubernetes Service (EKS). The cluster name can also be provided directly or discovered from Kubernetes node labels. If detected, the cluster name is added as a suffix to the node name to all data collected. This facilitates the identification of nodes across Kubernetes clusters.

<div class="alert alert-info">
This cluster name should be a unique name and abide by the following restrictions:
<ul>
  <li/>Must only contain lowercase letters, numbers, and hyphens
  <li/>Must start with a letter
  <li/>Must end with a number or a letter
  <li/>Must be less than or equal to 80 characters
</ul>
</div>

## Configuration

You can provide a cluster name in your Datadog configuration directly. When provided, this takes precedence over all other options.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

In Datadog Operator, set the value under `global.clusterName`.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
```
{{% /tab %}}
{{% tab "Helm" %}}

In your Helm chart, set the value under `datadog.clusterName`.

```yaml
datadog:
  clusterName: <CLUSTER_NAME>
```

{{% /tab %}}
{{< /tabs >}}


## Cloud providers
If a cluster name is not provided in the configuration, the Agent and Cluster Agent reach out to the cloud provider metadata services to retrieve it.

### GKE
On GKE, the cluster name is retrieved from the [VM metadata server][1]. The Agent makes a request to fetch the instance attributes and use the returned value if successful.

You can test this request by using `kubectl exec` into the Agent pod and running a `curl` request like.

```shell
curl -v "http://169.254.169.254/computeMetadata/v1/instance/attributes/cluster-name" -H "Metadata-Flavor: Google"
```

A successful request returns a 200 response and the Kubernetes cluster name as seen in the GKE Console. Enabling certain GKE features such as Workload Identity can restrict this access.

### AKS
On AKS, the cluster name is retrieved from the [Azure Instance Metadata Service][2]. The Agent requests the VM's resource group name and then parses this value to determine the Kubernetes cluster name.

You can test this request by using `kubectl exec` into the Agent pod and running a `curl` request like.

```shell
curl -v "http://169.254.169.254/metadata/instance/compute/resourceGroupName?api-version=2017-08-01&format=text" -H "Metadata: true"
```
A successful request returns a 200 response and the AKS Resource Group Name that needs to be parsed. For example, the Agent parses `example-cluster-name` out of the returned `MC_MyResourceGroup_example-cluster-name_eastus`.

### EKS
On EKS, the Agent retrieves the cluster name by fetching the EC2 instance's tags and identifying the prepopulated `kubernetes.io/cluster/<CLUSTER_NAME>: owned` tag to determine the cluster name.

By default, the Agent uses the [Instance Metadata Service (IMDS)][3] to get the instance identity, which is used by the Agent and AWS SDK to describe the tags on the instance. On Agent `7.64.0` and above, it uses IMDSv2 by default to fetch this identity. This does require that the EC2 instance and its IAM role have the `ec2:DescribeTags` permission. The Agent does not support [EKS Pod Identity][4] for the IAM permissions.

The Agent can alternatively fetch the EC2 tags from IMDS directly when provided the following environment variable.
```yaml
- name: DD_COLLECT_EC2_TAGS_USE_IMDS
  value: "true"
```
*However*, IMDS does not grant access to EC2 tags by default. You must [enable access to tags][5] and set your hop limit to 2 (or greater).

## Node Labels

The final detection method uses Kubernetes node labels. The Agent inspects its current Kubernetes node and looks for the following labels:

- `alpha.eksctl.io/cluster-name`
- `kubernetes.azure.com/cluster`
- `ad.datadoghq.com/cluster-name`

Additional labels can be added with the environment variable:

```yaml
- name: DD_KUBERNETES_NODE_LABEL_AS_CLUSTER_NAME
  value: "<NODE_LABEL_KEY>"
```

If the node label is found, the value is used as the cluster name.

[1]: https://cloud.google.com/compute/docs/metadata/querying-metadata
[2]: https://learn.microsoft.com/en-us/azure/virtual-machines/instance-metadata-service?tabs=linux
[3]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instancedata-data-retrieval.html
[4]: https://docs.aws.amazon.com/eks/latest/userguide/pod-id-how-it-works.html
[5]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/work-with-tags-in-IMDS.html#allow-access-to-tags-in-IMDS