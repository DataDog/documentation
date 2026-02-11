---
title: Kubernetes Cluster Autoscaling
description: Automatically scale your clusters with Kubernetes Cluster Autoscaling.
---

{{< callout url=#
 btn_hidden="true" header="Join the Preview!">}}
Datadog Kubernetes Cluster Autoscaling is in Preview. Use this form to submit your request today.
{{< /callout >}}

<div class="alert alert-warning">During the Preview period, Datadog recommends <strong>non-production use only</strong> of Datadog Kubernetes Autoscaling.</div>

### Requirements
- Datadog Agent v7.75+
- Datadog Operator v1.21.0+ **or** Datadog Helm chart v3.155.1+
- [Remote Configuration][1] must be enabled both at the organization level and on the Agents in your target cluster. See [Enabling Remote Configuration][2] for setup instructions.
- Datadog user permissions:
  - Org Management
  - API Keys Write
  - Autoscaling Manage

  By default, all Datadog admin users have Autoscaling Manage, and all Datadog users have read access to view recommendations and reporting.

  To grant Autoscaling Manage to an additional standard or custom role user, add the Autoscaling Manage permission to a custom role. See [Datadog Role Permissions][3] for more information.

## Setup

1. Activate Cluster Autoscaling.

   {{< tabs >}}
{{% tab "Datadog Operator" %}}

Set `features.autoscaling.cluster.enabled` to `true` in your `DatadogAgent` spec.

```yaml
spec:
  features:
    autoscaling:
      cluster:
        enabled: true
```
{{% /tab %}}

{{% tab "Helm" %}}

Set `datadog.autoscaling.cluster.enabled` to `true` in your `datadog-values.yaml` file.

```yaml
datadog:
  autoscaling:
    cluster:
      enabled: true
```

Then run `helm upgrade`.
{{% /tab %}}
{{< /tabs >}}
2. If you do not have a pre-existing installation of Karpenter, install the [Datadog `kubectl` plugin][4]. This plugin assists in installing or connecting to your existing Karpenter configuration.
   ```shell
   kubectl krew install datadog
   ```
3. Run the `kubectl` plugin and pass in AWS credentials for the AWS project that the cluster is running:
   ```shell
   AWS_PROFILE=<foo> AWS_REGION=<bar> kubectl datadog autoscaling cluster install
   ```

   This command creates:
   - Two CloudFormation stacks named `dd-karpenter-$CLUSTER_NAME`
   - A Helm release named `karpenter` in the Kubernetes namespace `dd-karpenter`
   - Karpenter’s `EC2NodeClass` and `NodePool` objects

   For more detailed command options, run [`kubectl datadog autoscaling cluster install --help`](#datadog-kubectl-plugin-cluster-autoscaling-reference).

## Autoscale a cluster

In Datadog, navigate to [Kubernetes Autoscaling][5]. You can review all your clusters that are available for autoscaling on the [Autoscaling Settings][7] page. Toggle the **Enabled** column for your cluster of choice.

{{< img src="containers/autoscaling/settings.png" alt=" The Autoscaling Settings page showing the Enable Clusters for Autoscaling section. Displays afilterable table of Kubernetes clusters with columns for cluster name, nodes, CPU capacity, memory capacity, CPU usage percentage with visual bars, memory usage percentage with visual bars, autoscaled workloads count, cluster scaling availability, workload scaling availability, and an enabled toggle switch. Toggle switches on the right show which clusters have autoscaling enabled." style="width:100%;" >}}

Use the [Cluster Scaling][6] page and select a cluster to review its recommendations. Identify a cluster you want to begin optimizing. During the Preview period, Datadog recommends selecting a **non-production cluster**.

{{< img src="containers/autoscaling/cluster-view.png" alt="The Cluster Scaling detail page for cluster dev-eks-shopist-a-us-east-1. The Cost Summary section displays four metrics: cluster cost of $140.7k with negative $3.1k month-over-month change, idle cost of $93.66k with negative $2.29k change, CPU usage/request efficiency at 27.24%, and memory usage/request efficiency at 35.15%. The Scaling Events section shows two time-series graphs tracking CPU and memory metrics over the past month, with fluctuating usage patterns, alongside a timeline of recent scaling events including pod and DatadogPodAutoscaler activities. The Scaling Recommendations section displays a table of workloads with idle CPU and memory, showing 8.7% autoscaling enabled." style="width:100%;" >}}

Click **Start Autoscaling** to apply recommendations.

## Datadog kubectl plugin: cluster autoscaling reference

```shell
kubectl datadog autoscaling cluster install --help
Install autoscaling on an EKS cluster

Usage:
  datadog autoscaling cluster install [flags]

Examples:

  # install autoscaling
  kubectl datadog autoscaling cluster install

Flags:
      --as string
            Username to impersonate for the operation. User could be a regular user or a service account in a namespace.
      --as-group stringArray
            Group to impersonate for the operation, this flag can be repeated to specify multiple groups.
      --as-uid string
            UID to impersonate for the operation.
      --cache-dir string
            Default cache directory (default "/home/lenaic/.kube/cache")
      --certificate-authority string
            Path to a cert file for the certificate authority
      --client-certificate string
            Path to a client certificate file for TLS
      --client-key string
            Path to a client key file for TLS
      --cluster string
            The name of the kubeconfig cluster to use
      --cluster-name string
            Name of the EKS cluster
      --context string
            The name of the kubeconfig context to use
      --create-karpenter-resources CreateKarpenterResources
            Which Karpenter resources to create: none, ec2nodeclass, all
            (default all)
      --debug
            Enable debug logs
      --disable-compression
            If true, opt-out of response compression for all requests to the server
  -h, --help
            help for install
      --inference-method InferenceMethod
            Method to infer EC2NodeClass and NodePool properties: nodes, nodegroups (default nodegroups)
      --insecure-skip-tls-verify
            If true, the server's certificate will not be checked for validity. This will make your HTTPS connections insecure
      --karpenter-namespace string
            Name of the Kubernetes namespace to deploy Karpenter into (default "dd-karpenter")
      --karpenter-version string
            Version of Karpenter to install (default to latest)
      --kubeconfig string
            Path to the kubeconfig file to use for CLI requests.
  -n, --namespace string
            If present, the namespace scope for this CLI request
      --request-timeout string
            The length of time to wait before giving up on a single server request. Non-zero values should contain a corresponding time unit (e.g. 1s, 2m, 3h). A value of zero means don't timeout requests. (default "0")
  -s, --server string
            The address and port of the Kubernetes API server
      --tls-server-name string
            Server name to use for server certificate validation. If it is not provided, the hostname used to contact the server is used
      --token string
            Bearer token for authentication to the API server
      --user string
            The name of the kubeconfig user to use
```

[1]: /agent/remote_config
[2]: /agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[3]: /account_management/rbac/permissions/#overview
[4]: /containers/kubernetes/kubectl_plugin/
[5]: https://app.datadoghq.com/orchestration/scaling/summary
[6]: https://app.datadoghq.com/orchestration/scaling/cluster
[7]: https://app.datadoghq.com/orchestration/scaling/settings