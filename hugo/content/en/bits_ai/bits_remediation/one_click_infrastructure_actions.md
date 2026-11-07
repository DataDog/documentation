---
title: One-click Infrastructure Actions
description: "Set up and run one-click Kubernetes and AWS actions from Bits Investigation."
site_support_id: bits_remediation
---

When Bits determines that the root cause of an investigation is infrastructure-related, it can recommend a remediation action on your infrastructure. When one-click actions are enabled, you can click {{< ui >}}Approve{{< /ui >}}, either in the investigation context or in a Slack notification, to let Bits execute the suggested remediation action. This allows you to resolve issues with infrastructure-related root causes directly from an investigation.

## Supported infrastructure

One-click actions are available for the following infrastructure:
- **Kubernetes**: Actions on deployments, StatefulSets, DaemonSets, Jobs, CronJobs, pods, ConfigMaps, and PersistentVolumeClaims. Actions run through a [Private Action Runner][1] in your cluster.
- **AWS**: Actions on AWS Lambda functions, Amazon EC2 instances, and Amazon ECS services. Actions run through your [Datadog AWS integration][2].

Complete these steps to enable one-click actions before running an investigation so that Bits can run the remediation actions it proposes.

## Kubernetes actions

For Kubernetes infrastructure, Bits runs actions through an ownerless [Private Action Runner][3] in the Datadog Cluster Agent.

### Requirements

- The Datadog Agent and Cluster Agent are installed on your cluster with the Datadog Operator 1.29.0 or later, or the Datadog Helm chart 3.265.0 or later. The Cluster Agent must be version 7.84.0 or later.
- Remote Configuration must be enabled for your organization in {{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}Remote Configuration{{< /ui >}}.
- The API key that the Agent uses has the {{< ui >}}Remote Configuration{{< /ui >}} and {{< ui >}}Private Action Runner{{< /ui >}} capabilities enabled. Enable them in [{{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}API Keys{{< /ui >}}][4].
- To set up a Private Action Runner, you need the Datadog Admin role.

### Enable one-click Kubernetes actions

To set up one-click actions for Kubernetes:

1. Update the settings in your Datadog Cluster Agent configuration to enable both a [Private Action Runner][3] and Kubernetes actions:

   - Enroll the runner as ownerless (`api_key_only_enrollment`). The Private Action Runner must be ownerless because guardrails authorize actions through [Execution Policies][5], which apply only to ownerless runners.
   - Enable Kubernetes Actions (`kubernetesActions`), which grants the Cluster Agent permission to delete pods and to scale, restart, patch, and roll back deployments.
   - Add the actions you want Bits to run to the `actions_allowlist`. The allowlist controls which actions the runner can run. Bits can recommend any of the [supported Kubernetes actions](#supported-kubernetes-actions), but can run only the ones in this allowlist.

   {{< tabs >}}
   {{% tab "Datadog Operator" %}}

   1. Add the following to your `DatadogAgent` manifest (for example, `datadog-agent.yaml`):

      ```yaml
      apiVersion: datadoghq.com/v2alpha1
      kind: DatadogAgent
      metadata:
        name: datadog
        annotations:
          cluster-agent.datadoghq.com/private-action-runner-enabled: "true"
          cluster-agent.datadoghq.com/private-action-runner-configdata: |
            private_action_runner:
              enabled: true
              api_key_only_enrollment: true
              actions_allowlist:
                # Deployments
                - "com.datadoghq.kubernetes.apps.scaleDeployment"
                - "com.datadoghq.kubernetes.apps.scaleDeploymentVertically"
                - "com.datadoghq.kubernetes.apps.rollbackDeployment"
                - "com.datadoghq.kubernetes.apps.restartDeployment"
                - "com.datadoghq.kubernetes.apps.patchDeployment"
                # StatefulSets and DaemonSets
                - "com.datadoghq.kubernetes.apps.patchStatefulSet"
                - "com.datadoghq.kubernetes.apps.patchDaemonSet"
                # Jobs and CronJobs
                - "com.datadoghq.kubernetes.batch.patchCronJob"
                - "com.datadoghq.kubernetes.batch.deleteJob"
                # Pods, ConfigMaps, and PersistentVolumeClaims
                - "com.datadoghq.kubernetes.core.deletePod"
                - "com.datadoghq.kubernetes.core.patchConfigMap"
                - "com.datadoghq.kubernetes.core.patchPersistentVolumeClaim"
      spec:
        features:
          remoteConfiguration:
            enabled: true
          kubernetesActions:
            enabled: true
      ```

   1. Apply the manifest:

      ```bash
      kubectl apply -f datadog-agent.yaml
      ```

   {{% /tab %}}
   {{% tab "Helm" %}}

   1. Add the following to your `values.yaml`:

      ```yaml
      remoteConfiguration:
        enabled: true
      datadog:
        kubernetesActions:
          enabled: true
      clusterAgent:
        enabled: true
        privateActionRunner:
          enabled: true
          apiKeyOnlyEnrollment: true
          actionsAllowlist:
            # Deployments
            - "com.datadoghq.kubernetes.apps.scaleDeployment"
            - "com.datadoghq.kubernetes.apps.scaleDeploymentVertically"
            - "com.datadoghq.kubernetes.apps.rollbackDeployment"
            - "com.datadoghq.kubernetes.apps.restartDeployment"
            - "com.datadoghq.kubernetes.apps.patchDeployment"
            # StatefulSets and DaemonSets
            - "com.datadoghq.kubernetes.apps.patchStatefulSet"
            - "com.datadoghq.kubernetes.apps.patchDaemonSet"
            # Jobs and CronJobs
            - "com.datadoghq.kubernetes.batch.patchCronJob"
            - "com.datadoghq.kubernetes.batch.deleteJob"
            # Pods, ConfigMaps, and PersistentVolumeClaims
            - "com.datadoghq.kubernetes.core.deletePod"
            - "com.datadoghq.kubernetes.core.patchConfigMap"
            - "com.datadoghq.kubernetes.core.patchPersistentVolumeClaim"
      ```

   1. Upgrade the release:

      ```bash
      helm upgrade <RELEASE_NAME> datadog/datadog -f values.yaml
      ```

   {{% /tab %}}
   {{< /tabs >}}

1. Go to [{{< ui >}}Actions{{< /ui >}} > {{< ui >}}Action Catalog{{< /ui >}} > {{< ui >}}Private Action Runners{{< /ui >}}][6] and confirm that the runner shows as **Active**. Its creator should be an API key, not a user.

1. Kubernetes Actions doesn't grant the permissions needed for StatefulSet, DaemonSet, CronJob, Job, ConfigMap, and PersistentVolumeClaim actions. To let Bits run those actions, grant the Cluster Agent's service account additional permissions. First, find the service account in the namespace where you installed the Agent:

   ```bash
   kubectl get serviceaccounts -n <DATADOG_NAMESPACE> | grep cluster-agent
   ```

   By default, it's named `<DATADOGAGENT_NAME>-cluster-agent` for the Datadog Operator (for example, `datadog-cluster-agent`), or `<RELEASE_NAME>-cluster-agent` for Helm.

1. Create a file named `bits-remediation-rbac.yaml` with the following content. Replace `<CLUSTER_AGENT_SERVICE_ACCOUNT>` and `<DATADOG_NAMESPACE>` with your values.

   ```yaml
   apiVersion: rbac.authorization.k8s.io/v1
   kind: ClusterRole
   metadata:
     name: datadog-bits-remediation-actions
   rules:
     # Roll back deployments
     - apiGroups: ["apps"]
       resources: ["replicasets"]
       verbs: ["get", "list"]
     # Patch StatefulSets and DaemonSets
     - apiGroups: ["apps"]
       resources: ["statefulsets", "daemonsets"]
       verbs: ["get", "patch"]
     # Patch CronJobs
     - apiGroups: ["batch"]
       resources: ["cronjobs"]
       verbs: ["get", "patch"]
     # Delete Jobs
     - apiGroups: ["batch"]
       resources: ["jobs"]
       verbs: ["get", "delete"]
     # Patch ConfigMaps and PersistentVolumeClaims
     - apiGroups: [""]
       resources: ["configmaps", "persistentvolumeclaims"]
       verbs: ["get", "patch"]
   ---
   apiVersion: rbac.authorization.k8s.io/v1
   kind: ClusterRoleBinding
   metadata:
     name: datadog-bits-remediation-actions
   roleRef:
     apiGroup: rbac.authorization.k8s.io
     kind: ClusterRole
     name: datadog-bits-remediation-actions
   subjects:
     - kind: ServiceAccount
       name: <CLUSTER_AGENT_SERVICE_ACCOUNT>
       namespace: <DATADOG_NAMESPACE>
   ```

1. Apply the file:

   ```bash
   kubectl apply -f bits-remediation-rbac.yaml
   ```

1. [Create a guardrail](#guardrails) for the actions you want Bits to run, scoped to the resources you want Bits to run them on.

### Supported Kubernetes actions

The following table lists the supported actions for Private Action Runners in Kubernetes clusters. You allow actions by adding them to the allowlist in the Datadog Agent configuration. For information about adding actions to the allowlist, see the [Enable one-click Kubernetes actions](#enable-one-click-kubernetes-actions) section.

| Action ID                                                  | Description                                                  |
| ---------------------------------------------------------- | ------------------------------------------------------------ |
| `com.datadoghq.kubernetes.apps.scaleDeployment`            | Change the replica count of a deployment                     |
| `com.datadoghq.kubernetes.apps.scaleDeploymentVertically`  | Change the CPU and memory requests or limits of a deployment |
| `com.datadoghq.kubernetes.apps.rollbackDeployment`         | Roll back a deployment to a previous revision                |
| `com.datadoghq.kubernetes.apps.restartDeployment`          | Restart the pods in a deployment                             |
| `com.datadoghq.kubernetes.apps.patchDeployment`            | Patch a deployment                                           |
| `com.datadoghq.kubernetes.apps.patchStatefulSet`           | Patch a StatefulSet                                          |
| `com.datadoghq.kubernetes.apps.patchDaemonSet`             | Patch a DaemonSet                                            |
| `com.datadoghq.kubernetes.batch.patchCronJob`              | Patch a CronJob                                              |
| `com.datadoghq.kubernetes.batch.deleteJob`                 | Delete a Job                                                 |
| `com.datadoghq.kubernetes.core.deletePod`                  | Delete a pod                                                 |
| `com.datadoghq.kubernetes.core.patchConfigMap`             | Patch a ConfigMap                                            |
| `com.datadoghq.kubernetes.core.patchPersistentVolumeClaim` | Patch a PersistentVolumeClaim                                |

## AWS actions

{{< callout >}} AWS actions are in Preview. {{< /callout >}}

Bits runs AWS actions through your Datadog AWS integration. This means you don't need a Private Action Runner or a separate connection for them.

### Enable AWS actions

To set up one-click actions for AWS:

1. Set up the [Datadog AWS integration][2] for each account where Bits can take action. In Datadog, go to {{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Amazon Web Services{{< /ui >}} and confirm that the account shows as connected.

1. To let Bits run an action, add that action's IAM permission to the role.

   Datadog runs AWS actions by assuming the IAM role that you created in your AWS account when you set up the AWS integration. By default, this role can only read data.

   The following table lists the IAM permission that each action requires:

   | Resource   | Action                        | Required IAM permission              |
   | ---------- | ----------------------------- | ------------------------------------ |
   | AWS Lambda | Invoke Lambda function        | `lambda:InvokeFunction`              |
   | AWS Lambda | Put function concurrency      | `lambda:PutFunctionConcurrency`      |
   | AWS Lambda | Update function configuration | `lambda:UpdateFunctionConfiguration` |
   | Amazon EC2 | Reboot EC2 instance           | `ec2:RebootInstances`                |
   | Amazon EC2 | Start EC2 instance            | `ec2:StartInstances`                 |
   | Amazon EC2 | Stop EC2 instance             | `ec2:StopInstances`                  |
   | Amazon ECS | Update ECS service            | `ecs:UpdateService`                  |

1. Add an inline policy to the Datadog integration role that allows the actions you want Bits to run. If you set up the integration with CloudFormation, the role is named `DatadogIntegrationRole` by default. For instructions, see [Adding and removing IAM identity permissions][7] in the AWS documentation.

1. [Create a guardrail](#guardrails) for the actions you want Bits to run, scoped to the resources you want Bits to run them on.

## Guardrails

{{< callout >}} Bits Guardrails are in Preview.{{< /callout >}}

[Bits Guardrails][8] let admins define which remediation actions Bits can take, where those actions apply, and who needs to approve them. For example, an {{< ui >}}Ask{{< /ui >}} guardrail for `rollbackDeployment` scoped to `service:checkout` notifies predefined approvers before Bits rolls back a deployment for the checkout service. Bits performs the action only after approval is granted.

Guardrails are required to enable one-click infrastructure actions. An action shows {{< ui >}}Approve{{< /ui >}} only when a guardrail covers it.

Guardrails authorize actions through [Execution Policies][5]. When you create a guardrail, Datadog automatically creates a matching `[Bits Guardrail]` execution policy.

### Requirements

- Creating guardrails requires the `Guardrails Read`, `Guardrails Write`, `Execution Policy Read`, and `Execution Policy Write` permissions. Enable them in [{{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}Roles{{< /ui >}}][9].
- To approve actions covered by guardrails, approvers need the `bits_investigations_write` and `guardrails_read` permissions in their role.

### Create a guardrail

To create a guardrail:

1. Go to {{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Guardrails{{< /ui >}} and click {{< ui >}}Create Guardrail{{< /ui >}}.
1. Select the type of infrastructure to target.
1. Select one or more available actions for the guardrail to target. For example, for a Kubernetes integration, you can select actions such as rolling back deployments and patching or deleting Kubernetes objects.
1. Add tags that identify the resources the guardrail applies to, such as `service:checkout` or `kube_deployment:checkout`. The tags must match the target resource's tags in Datadog.
1. For the selected actions and scope, decide when Bits can take action:
   - {{< ui >}}Ask{{< /ui >}}: Requires user approval before Bits executes actions. Choose which teams, roles, or individuals can approve.
   - {{< ui >}}Deny{{< /ui >}}: Bits can recommend an action but cannot take it.
1. (Optional) For an {{< ui >}}Ask{{< /ui >}} guardrail, turn on {{< ui >}}Notify when approval is needed{{< /ui >}}, and select the Slack workspace and channel where Bits posts approval requests. This requires the [Slack integration][10].

[1]: /actions/private_actions/
[2]: /integrations/amazon_web_services/
[3]: /actions/private_actions/set_up_agent_based/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: /actions/private_actions/execution_policies/
[6]: https://app.datadoghq.com/actions/private-action-runners
[7]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_manage-attach-detach.html
[8]: https://app.datadoghq.com/bits-ai/guardrails
[9]: https://app.datadoghq.com/organization-settings/roles
[10]: /integrations/slack/
