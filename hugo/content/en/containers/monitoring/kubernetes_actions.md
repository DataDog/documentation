---
title: Kubernetes Actions
description: Run actions on your Kubernetes resources, such as deleting a pod or rolling back a Deployment, from Kubernetes Explorer.
further_reading:
- link: "/containers/monitoring/kubernetes_explorer/"
  tag: "Documentation"
  text: "Kubernetes Explorer"
- link: "/account_management/teams/"
  tag: "Documentation"
  text: "Datadog Teams"
---

{{< callout btn_hidden="true" header="Join the Preview!" >}}
Kubernetes Actions is in Preview. To request access, contact your Datadog account team.
{{< /callout >}}

## Overview

Kubernetes Actions lets you run actions on your Kubernetes resources from [Kubernetes Explorer][1]. Use them to fix an issue from the same page where you find it, without switching to `kubectl`.

You can run the following actions:

- Delete a pod
- Restart a Deployment
- Roll back a Deployment
- View a resource (Pods, Deployments, Argo Rollouts, and Namespaces)

The Datadog Cluster Agent in your cluster runs each action. Datadog sends the action to the Cluster Agent's [Private Action Runner][2] as a signed task. [Remote Configuration][3] stays available as a second delivery channel.

## Prerequisites

- Datadog Cluster Agent 7.84.0 or later.
- The Datadog Helm chart (`datadog/datadog`) 3.228.0 or later, or the Datadog Operator 1.29.0 or later. Helm chart 3.265.0 or later and Operator 1.32.0 or later need less configuration. Datadog recommends that you upgrade to these versions.
- [Remote Configuration][3] enabled. Remote Configuration is enabled by default in the Helm chart and the Operator. The Cluster Agent doesn't start when Kubernetes Actions is enabled and Remote Configuration is disabled.
- Cluster Agent leader election enabled. Leader election is enabled by default in the Helm chart and the Operator.
- The Datadog Agent running on your nodes. The Agent reports your pods to Datadog. Without it, actions on pods fail because Datadog can't find the pod.
- [Kubernetes Explorer][4] enabled. Datadog uses it to find each resource and its `team` tag. Kubernetes Explorer is enabled by default in the Helm chart and the Operator.
- A Datadog [API key][5]. Use the API key that your Agent uses. You don't need an application key.
- Kubernetes Actions enabled for your Datadog organization. If the Kubernetes Actions permissions don't appear when you [create a role](#create-a-role-with-the-kubernetes-actions-permissions), contact your Datadog account team.

### Cluster Agent versions

- **7.84.x and 7.85.x**: Remote Configuration is always enabled as a second delivery channel, and you can't disable it.
- **7.86.0 or later**: You can disable the Remote Configuration delivery channel (optional). This option requires Helm chart 3.265.0 or later, or Operator 1.32.0 or later. See [Disable the Remote Configuration delivery channel](#disable-the-remote-configuration-delivery-channel).
- **Earlier than 7.84.0**: Not supported. The Cluster Agent ignores the Kubernetes Actions configuration.

## Give users access

### Create a role with the Kubernetes Actions permissions

Kubernetes Actions uses the following permissions:

- **Kubernetes Actions Read**: View actions and their history.
- **Kubernetes Actions Write**: Run actions.
- **Kubernetes Actions Admin**: Run actions on any resource, whatever its team. Grant this permission only to users who need it.

The Datadog managed roles don't include Kubernetes Actions Write. To give users this permission, create a [custom role][6]:

1. In Datadog, go to [{{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}Roles{{< /ui >}}][7] and click {{< ui >}}New Role{{< /ui >}}.
1. Enter a name for the role, for example `Kubernetes Actions Operator`.
1. In the permissions list, search for `Kubernetes Actions` and enable {{< ui >}}Kubernetes Actions Write{{< /ui >}} and {{< ui >}}Kubernetes Actions Read{{< /ui >}}.
1. Click {{< ui >}}Save{{< /ui >}}.
1. Assign the role to each user who runs actions. Users keep their existing roles; the new role adds permissions. For instructions, see [Manage users][8].

### Tag your resources with a team

Users can run actions only on resources that belong to one of their [Datadog teams][9]. Before an action runs, Datadog reads the `team` tag of the target resource and checks that the user is a member of that team. If the resource has no `team` tag, or if the user isn't a member of the team, Datadog rejects the action.

To assign a resource to a team, add a `team` label set to the team **handle** (for example, `my-team`), not the team's display name. The Cluster Agent adds the `team` tag from the label.

| Action | Resource that needs the `team` label |
| --- | --- |
| Delete a pod | The pod. Add the label to the pod template of the Deployment so that every pod gets it. |
| Restart or roll back a Deployment | The Deployment. |
| View a resource | The resource. |

For example, the following manifest lets members of the `my-team` team restart and roll back the `my-app` Deployment and delete its pods:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  labels:
    team: my-team          # Restart and roll back the Deployment
spec:
  template:
    metadata:
      labels:
        app: my-app
        team: my-team      # Delete pods
```

- **More than one team**: Label values can't contain commas. To assign a resource to more than one team, use a `team` annotation with a comma-separated list of handles instead of the label, for example `team: "my-team,other-team"`.
- **Delay**: Datadog uses the resource data that it received in the last 15 minutes. A new label can take a few minutes to take effect.
- **Organizations**: Team membership applies to one Datadog organization. Users must be members of the team in the organization where they run the action.

## Enable Kubernetes Actions on the Cluster Agent

Follow the instructions for your deployment method and version. In each example, replace `7.84.6` with the Cluster Agent version that you run (7.84.0 or later).

{{< tabs >}}
{{% tab "Helm" %}}

#### Helm chart 3.265.0 or later

1. Add the following to your `values.yaml` file:

   ```yaml
   datadog:
     kubernetesActions:
       enabled: true

   clusterAgent:
     enabled: true
     image:
       tag: 7.84.6
   ```

   Keep the rest of your `values.yaml` file. Don't set `datadog.leaderElection: false` or `remoteConfiguration.enabled: false`.

1. Upgrade the release:

   ```bash
   helm repo update
   helm upgrade --install <RELEASE_NAME> datadog/datadog \
     --version 3.265.0 \
     --namespace <NAMESPACE> \
     -f values.yaml
   ```

This chart version grants the Cluster Agent all the Kubernetes permissions that the actions need.

#### Helm chart 3.228.0 to 3.264.x

1. Add the following to your `values.yaml` file. The `clusterAgent.privateActionRunner.enabled` setting enables the Private Action Runner delivery channel.

   ```yaml
   datadog:
     kubernetesActions:
       enabled: true

   clusterAgent:
     enabled: true
     image:
       tag: 7.84.6
     privateActionRunner:
       enabled: true
   ```

   Keep the rest of your `values.yaml` file. Don't set `datadog.leaderElection: false` or `remoteConfiguration.enabled: false`.

1. Upgrade the release with your current chart version:

   ```bash
   helm repo update
   helm upgrade --install <RELEASE_NAME> datadog/datadog \
     --version <CHART_VERSION> \
     --namespace <NAMESPACE> \
     -f values.yaml
   ```

1. To let users roll back Deployments, [grant the rollback permission](#grant-the-rollback-permission-earlier-versions-only).

{{% /tab %}}
{{% tab "Datadog Operator" %}}

#### Datadog Operator 1.32.0 or later

1. Upgrade the Datadog Operator:

   ```bash
   helm repo update
   helm upgrade --install datadog-operator datadog/datadog-operator \
     --namespace <NAMESPACE>
   ```

1. In your `DatadogAgent` manifest (for example, `datadog-agent.yaml`), enable `features.kubernetesActions` and set the Cluster Agent image tag:

   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
     namespace: <NAMESPACE>
   spec:
     features:
       kubernetesActions:
         enabled: true
     override:
       clusterAgent:
         image:
           tag: 7.84.6
   ```

   Don't set `spec.features.remoteConfiguration.enabled: false`.

1. Apply the manifest:

   ```bash
   kubectl apply -f datadog-agent.yaml
   ```

This Operator version grants the Cluster Agent all the Kubernetes permissions that the actions need.

#### Datadog Operator 1.29.0 to 1.31.x

These Operator versions enable the Private Action Runner delivery channel only through annotations on the `DatadogAgent` resource.

1. In your `DatadogAgent` manifest, add the annotations, enable `features.kubernetesActions`, and set the Cluster Agent image tag:

   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
     namespace: <NAMESPACE>
     annotations:
       cluster-agent.datadoghq.com/private-action-runner-enabled: "true"
       cluster-agent.datadoghq.com/private-action-runner-configdata: |
         private_action_runner:
           enabled: true
           self_enroll: true
           identity_secret_name: datadog-private-action-runner-identity
   spec:
     features:
       kubernetesActions:
         enabled: true
     override:
       clusterAgent:
         image:
           tag: 7.84.6
   ```

   Copy the `private-action-runner-configdata` annotation exactly, including `self_enroll` and `identity_secret_name`. If either line is missing, the Cluster Agent can't store its credentials and actions don't run. You don't need to add Kubernetes Actions to an `actions_allowlist`, because `features.kubernetesActions.enabled: true` allows them.

   Don't set `spec.features.remoteConfiguration.enabled: false`.

1. Apply the manifest:

   ```bash
   kubectl apply -f datadog-agent.yaml
   ```

1. To let users roll back Deployments, [grant the rollback permission](#grant-the-rollback-permission-earlier-versions-only).

{{% /tab %}}
{{< /tabs >}}

### Grant the rollback permission (earlier versions only)

Do this step only if you use Helm chart 3.228.0 to 3.264.x, or Operator 1.29.0 to 1.31.x. These versions let the Cluster Agent delete pods and restart Deployments. To roll back Deployments, the Cluster Agent also needs to read ReplicaSets.

1. Find the name of the Cluster Agent service account:

   ```bash
   kubectl -n <NAMESPACE> get deploy -l app.kubernetes.io/component=cluster-agent \
     -o jsonpath='{.items[0].spec.template.spec.serviceAccountName}'
   ```

   With Helm, the name is usually `datadog-cluster-agent`, or `<RELEASE_NAME>-datadog-cluster-agent` if your release name doesn't contain `datadog`. With the Operator, the name is `<DATADOGAGENT_NAME>-cluster-agent`, for example `datadog-cluster-agent`.

1. Create a file named `datadog-kubernetes-actions-extra.yaml` with the following content. Replace `<SERVICE_ACCOUNT>` and `<NAMESPACE>` with your values.

   ```yaml
   apiVersion: rbac.authorization.k8s.io/v1
   kind: ClusterRole
   metadata:
     name: datadog-kubernetes-actions-extra
   rules:
     - apiGroups: ["apps"]
       resources: ["replicasets"]
       verbs: ["get", "list"]
   ---
   apiVersion: rbac.authorization.k8s.io/v1
   kind: ClusterRoleBinding
   metadata:
     name: datadog-kubernetes-actions-extra
   roleRef:
     apiGroup: rbac.authorization.k8s.io
     kind: ClusterRole
     name: datadog-kubernetes-actions-extra
   subjects:
     - kind: ServiceAccount
       name: <SERVICE_ACCOUNT>
       namespace: <NAMESPACE>
   ```

1. Apply the file:

   ```bash
   kubectl apply -f datadog-kubernetes-actions-extra.yaml
   ```

### Upgrade from an earlier version

Do these steps after you upgrade to Helm chart 3.265.0 or later, or to Operator 1.32.0 or later:

1. Change your configuration to match the instructions for your new version.
1. Remove the configuration that the new version doesn't need:
   - **Helm**: If you added `clusterAgent.privateActionRunner.enabled: true` only for Kubernetes Actions, remove it. `datadog.kubernetesActions.enabled: true` enables the Private Action Runner.
   - **Operator**: Remove the `cluster-agent.datadoghq.com/private-action-runner-enabled` and `cluster-agent.datadoghq.com/private-action-runner-configdata` annotations.
1. Delete the rollback ClusterRole and ClusterRoleBinding. The new version grants that permission.

   ```bash
   kubectl delete clusterrolebinding datadog-kubernetes-actions-extra
   kubectl delete clusterrole datadog-kubernetes-actions-extra
   ```

The Cluster Agent keeps its credentials secret, so it doesn't need to enroll again.

### Disable the Remote Configuration delivery channel

You can stop sending actions through Remote Configuration. This option requires Cluster Agent 7.86.0 or later, and Helm chart 3.265.0 or later or Operator 1.32.0 or later. Actions then use only the Private Action Runner. Remote Configuration stays enabled for the Cluster Agent.

- **Helm**: Set `datadog.kubernetesActions.communication.remoteConfiguration.enabled: false`.
- **Operator**: Set `spec.features.kubernetesActions.communication.remoteConfiguration.enabled: false`.

## Verify the setup

1. Check that the Cluster Agent restarted with version 7.84.0 or later and is running:

   ```bash
   kubectl -n <NAMESPACE> get pods -l app.kubernetes.io/component=cluster-agent \
     -o jsonpath='{range .items[*]}{.metadata.name}{"  "}{.spec.containers[0].image}{"  "}{.status.phase}{"\n"}{end}'
   ```

1. Check that the Cluster Agent enrolled with Datadog. The credentials secret appears one to two minutes after the Cluster Agent starts:

   ```bash
   kubectl -n <NAMESPACE> get secret datadog-private-action-runner-identity
   ```

1. Check that Kubernetes Actions is enabled:

   ```bash
   kubectl -n <NAMESPACE> logs -l app.kubernetes.io/component=cluster-agent --tail=-1 | grep -i kubeactions
   ```

   The output includes `Starting kubeactions component`.

1. (Optional) In Datadog, go to [{{< ui >}}Private Action Runners{{< /ui >}}][10] and find your cluster. Its runner name has the format `<CLUSTER_NAME>-<DATE><TIME>`, for example `prod-us1-20261026132607`.

1. Run a test action. In [Kubernetes Explorer][1], delete a disposable pod that has a `team` label for one of your teams.

   The action status changes from **Pending** to **Received** to **Completed**, usually within a few seconds. Kubernetes then creates a replacement pod.

## Run an action

1. In [Kubernetes Explorer][1], click a resource to open its side panel.
1. Click the action that you want to run.
1. Review the action status. It changes from **Pending** to **Received** to **Completed**.

Kubernetes Actions doesn't run actions on protected system namespaces, such as `kube-system`.

## Troubleshooting

| Issue | Cause | Solution |
| --- | --- | --- |
| Users can't run actions, or don't see the actions. | The user doesn't have the required permission. | Assign the role from [Create a role with the Kubernetes Actions permissions](#create-a-role-with-the-kubernetes-actions-permissions). |
| The Kubernetes Actions permissions don't appear in the role editor. | Kubernetes Actions isn't enabled for your organization. | Contact your Datadog account team. |
| An action fails with `permission denied: failed to retrieve resource team tag: no pod found matching query` or `no deployment found`. | Datadog hasn't received the resource. The Datadog Agent isn't running on that node, or the resource is new. | Check that the Datadog Agent runs on each node. Wait a few minutes, and run the action again. |
| An action fails with `permission denied: resource has no team tags`. | The resource has no `team` label. | [Add a `team` label](#tag-your-resources-with-a-team), and wait a few minutes. |
| An action fails with `permission denied: user is not a member of team(s)`. | The user isn't a member of the team on the resource. | Add the user to the team in the organization where they run the action, or correct the `team` label on the resource. |
| The Cluster Agent restarts with `remote config is a required dependency for kubeactions`. | Remote Configuration is disabled. | Enable Remote Configuration. |
| The `datadog-private-action-runner-identity` secret doesn't appear. | Leader election is disabled, the Cluster Agent is earlier than 7.84.0, or the Operator `private-action-runner-configdata` annotation is incomplete. | Check the [prerequisites](#prerequisites). For Operator 1.29.0 to 1.31.x, copy the annotation exactly. |
| The Cluster Agent logs don't mention Kubernetes Actions. | The Cluster Agent is earlier than 7.84.0. | Upgrade the Cluster Agent. |
| Actions stay in the **Pending** status. | The Cluster Agent isn't enrolled. | Do steps 1 and 2 in [Verify the setup](#verify-the-setup). |
| A rollback fails with `forbidden`. | The Cluster Agent can't read ReplicaSets. | [Grant the rollback permission](#grant-the-rollback-permission-earlier-versions-only), or upgrade the Helm chart or the Operator. |
| Viewing a resource fails with `forbidden` from Kubernetes. | The Cluster Agent can't read that resource type. | Bind a ClusterRole with the `get` verb on that resource type to the Cluster Agent service account. |
| Datadog rejects an action in a namespace such as `kube-system`. | Kubernetes Actions doesn't run actions on protected system namespaces. | No action is necessary. |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/orchestration/overview
[2]: /actions/private_actions/
[3]: /remote_configuration/
[4]: /containers/monitoring/kubernetes_explorer/
[5]: /account_management/api-app-keys/#api-keys
[6]: /account_management/rbac/?tab=datadogapplication#custom-roles
[7]: https://app.datadoghq.com/organization-settings/roles
[8]: /account_management/users/
[9]: /account_management/teams/
[10]: https://app.datadoghq.com/actions/private-action-runners
