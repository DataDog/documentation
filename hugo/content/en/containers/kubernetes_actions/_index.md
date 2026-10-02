---
title: Kubernetes Actions
private: true
description: Run management and remediation actions on your Kubernetes workloads directly from Datadog
further_reading:
- link: "/containers/cluster_agent/"
  tag: "Documentation"
  text: "Datadog Cluster Agent"
- link: "/containers/cluster_agent/admission_controller/"
  tag: "Documentation"
  text: "Admission Controller"
- link: "/agent/remote_config/"
  tag: "Documentation"
  text: "Remote Configuration"
- link: "/account_management/rbac/permissions"
  tag: "Documentation"
  text: "Datadog Role Permissions"
---

{{< callout url="#" btn_hidden="true" header="Kubernetes Actions is in Preview">}}
Kubernetes Actions is in Preview. Contact your Datadog account team to request access.
{{< /callout >}}

## How it works

Kubernetes Actions let you run management and remediation operations (such as restarting, rolling back, or deleting workloads) on your Kubernetes resources directly from the resource views in Datadog. Actions are delivered to the Datadog Cluster Agent through [Remote Configuration][1] and executed in your cluster, so no additional inbound cluster access is required.

The Datadog Cluster Agent acts as the controller that runs the action, using the [Admission Controller][2] to apply changes to your workloads.

### Requirements

Your target cluster must meet the following requirements:

- [Remote Configuration][1] must be enabled both at the organization level and on the Agents in your target cluster. See [Enabling Remote Configuration][3] for setup instructions.
- The [Admission Controller][2] must be enabled. It is enabled by default with the Datadog Operator and the Datadog Helm chart.
- Datadog Cluster Agent v7.82.0 or later.
- Kubernetes Actions must be enabled on the Cluster Agent so that the action controller is running. See [Setup](#setup).
- [Helm][4], for updating your Datadog Agent. Datadog Operator users also need the [`kubectl` CLI][5].

The following user permissions are required:

| Permission | Description |
|------------|-------------|
| Org Management | Required to enable Remote Configuration. |
| API Keys Write | Required to enable Remote Configuration. |
| Kubernetes Actions Admin, or Kubernetes Actions Write on a team that owns the resource | Run actions on all Kubernetes resources with Admin, or on resources owned by your teams with Write. |

## Setup

{{< tabs >}}
{{% tab "Datadog Operator" %}}

1. Add the following to your `datadog-agent.yaml` configuration file to enable Remote Configuration and Kubernetes Actions on the Cluster Agent:

```yaml
spec:
  features:
    remoteConfiguration:
      enabled: true
    kubernetesActions:
      enabled: true
```

2. [Admission Controller][1] is enabled by default with the Datadog Operator. If you disabled it, re-enable it by adding the following highlighted lines to `datadog-agent.yaml`:

{{< highlight yaml "hl_lines=4-5" >}}
...
spec:
  features:
    admissionController:
      enabled: true
...
{{< /highlight >}}

3. Apply the updated `datadog-agent.yaml` configuration:

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

[1]: /containers/cluster_agent/admission_controller/

{{% /tab %}}
{{% tab "Helm" %}}

1. Ensure you are using Cluster Agent v7.82.0 or later. Add the following to your `datadog-values.yaml` configuration file to enable Remote Configuration and Kubernetes Actions on the Cluster Agent:

```yaml
datadog:
  remoteConfiguration:
    enabled: true
  kubernetesActions:
    enabled: true
```

2. [Admission Controller][1] is enabled by default in the Datadog Helm chart. If you disabled it, re-enable it by adding the following highlighted lines to `datadog-values.yaml`:

{{< highlight yaml "hl_lines=3-4" >}}
...
clusterAgent:
  admissionController:
    enabled: true
...
{{< /highlight >}}

3. Update your Helm repository:

```shell
helm repo update
```

4. Redeploy the Datadog Agent with your updated `datadog-values.yaml`:

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```

[1]: /containers/cluster_agent/admission_controller/

{{% /tab %}}
{{< /tabs >}}

## Usage

After Kubernetes Actions is enabled, actions are available from the [Kubernetes Explorer][6]. You can start an action from the resource's side panel, or from the action tray kebab menu in the Explorer table row.

Before an action runs, Datadog checks that both your [permissions](#requirements) and the cluster prerequisites are met. If a requirement is not satisfied, the confirmation modal shows exactly what is missing.

The following actions are available:

| Action | Applies to | Description |
|--------|------------|-------------|
| Restart | Deployment | Triggers a rolling restart of the Deployment's pods. |
| Rollback | Deployment | Rolls the Deployment back to a previous revision. Select the target revision in the confirmation modal. |
| Delete | Pod | Deletes the pod. Pods managed by a controller are recreated automatically. |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/remote_config
[2]: /containers/cluster_agent/admission_controller/
[3]: /agent/remote_config/?tab=configurationyamlfile#enable-remote-configuration
[4]: https://helm.sh/
[5]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[6]: /containers/monitoring/kubernetes_explorer/
