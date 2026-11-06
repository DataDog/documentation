---
title: Bits Remediation
description: "Learn how Bits provides actionable remediation next steps for root cause investigations."
aliases:
- /bits_ai/bits_ai_sre/remediate_issues/
- /bits_ai/bits_investigation/remediate_issues/
- /bits_ai/bits_ai_sre/take_action/
- /bits_ai/bits_investigation/take_action/
site_support_id: bits_remediation
---

{{< callout url="https://www.datadoghq.com/product-preview/bits-remediation/" >}}
  Bits Remediation includes capabilities in Preview. Click <strong>Request Access</strong> to join the Preview program.
{{< /callout >}}

## Overview of Bits Remediation

Bits Remediation helps on-call engineers, SREs, and platform teams act on the root cause that [Bits Investigation][1] finds. From an investigation, you can generate code fixes, run triage and infrastructure actions, and verify that the issue is resolved. Admins use [Bits Guardrails](#govern-how-bits-takes-remediation-action) to control which actions Bits can take and who must approve them.

For example, Bits might trace rising error rates to a faulty Kubernetes deployment. From the investigation, you can open an incident, roll back the deployment, and generate a pull request that fixes the underlying error. Afterward, Bits can verify that error rates returned to normal.

{{< img src="bits_ai/bits_remediation/remediation_plan.png" alt="A Bits Investigation remediation plan with five suggested next steps: declare an incident, update a Kubernetes deployment, create a Jira issue, fix the code, and verify resolution, which is marked complete. Below it, the issue status shows Resolved after the monitor returned to OK." style="width:100%;" >}}

## Automate code fixes

Bits integrates with [Bits Code][2] to generate code fixes. Bits connects to your source code provider to create, update, and iterate on production-ready pull requests, based on existing issues detected by Datadog.

By default, Bits automatically generates code fixes for investigations with code-related root causes. To manually generate code fixes instead, disable automatic code fix generation in [Settings][3].

To start using code fixes:

1. [Set up Bits Code][4]. After Bits determines a code-related root cause, Bits generates a suggested code fix in Next Steps by default.
1. If automatic code fixes are disabled, manually generate a code fix from Next Steps.
1. Chat with Bits within the code session to update the suggested code fix.
1. Create a pull request for review and merge when ready.

Bits can prepare a code fix for you to open a pull request from, or open the pull request for you with [auto-push][5].

With code fixes enabled, you can close the loop and resolve issues directly from an investigation.

{{< img src="bits_ai/bits_remediation/code_fix.png" alt="A suggested code fix in Next Steps with a summary of the changes, a diff of login_controller.rb, and buttons to create a pull request or view the session in Bits Code" style="width:100%;" >}}

## Run triage actions

You can also trigger triage actions without leaving the investigation workflow.

Supported actions include:

- Sending Slack messages
- Creating incidents in Datadog and PagerDuty
- Paging engineers using Datadog On-Call
- Creating work items in Datadog Work Management
- Opening Jira tickets

Bits can pull relevant context from the investigation and your connected integrations to prefill messages, incident descriptions, and ticket metadata. This reduces manual effort, helps ensure consistency, and accelerates response time.

## Take action on your infrastructure

{{< callout >}} One-click actions are in Preview. {{< /callout >}}

For infrastructure-related issues, Bits can recommend a remediation action, such as rolling back a deployment, restarting a pod, or invoking an AWS Lambda function.

- **Manual recommendations**: Copy the suggested command (for example, a `kubectl patch` command) and run it in your own CLI.
- **One-click actions (Preview)**: Click **Approve** to let Bits execute the suggested remediation action directly from the investigation context.

{{< img src="bits_ai/bits_remediation/kubernetes_action_approve.png" alt="A suggested Kubernetes remediation step that patches the same deployment across four production clusters, with an Approve button for each patch" style="width:100%;" >}}

One-click actions are available for:

- **Kubernetes** (Preview): Actions on deployments, StatefulSets, DaemonSets, Jobs, CronJobs, pods, ConfigMaps, and PersistentVolumeClaims. Actions run through a [Private Action Runner][6] in your cluster.
- **AWS** (Preview): Actions on AWS Lambda functions, Amazon EC2 instances, and Amazon ECS services. Actions run through your [Datadog AWS integration][7].

See the [Action Catalog][8] for details on each action.

To set up one-click actions for Kubernetes and AWS, see [Set up one-click infrastructure actions](#set-up-one-click-infrastructure-actions).

## Govern how Bits takes remediation action

{{< callout >}} Bits Guardrails are in Preview.{{< /callout >}}

[Bits Guardrails][9] let admins define which remediation actions Bits can take, where those actions apply, and who needs to approve them.

Creating guardrails requires the `Guardrails Read`, `Guardrails Write`, `Execution Policy Read`, and `Execution Policy Write` permissions. Enable them in [Organization Settings > Roles][10]. When you create a guardrail, Datadog also creates a matching `[Bits Guardrail]` execution policy.

To create a guardrail:

1. **Choose the actions to target**: Select one or more available actions for an integration (for example, Kubernetes or AWS) for the guardrail to target.
1. **Define guardrail scope**: Specify the environment, service, and resource tags the guardrail applies to.
1. **Set the enforcement level**: For the selected actions and scope, decide when Bits can take action.
   - **Ask**: Requires user approval before Bits executes actions. Choose which teams, roles, or individuals can approve.
   - **Deny**: Bits can recommend an action but cannot take it.
1. **Send approval requests to Slack (optional)**: For an **Ask** guardrail, turn on **Notify when approval is needed**, and select the Slack workspace and channel where Bits posts approval requests. This requires the [Slack integration][11].

When Bits proposes an action that an **Ask** guardrail covers, it posts an approval request to the selected Slack channel. Approvers can click **Approve** in Slack or on the investigation page. In Slack, the message updates in place with who approved the action and the run status.

## Validate that issues are resolved

Bits can verify whether a remediation action was applied successfully, and whether the original issue was resolved. Click **Verify Resolution** to check the status of the remediation action and the issue.

{{< img src="bits_ai/bits_remediation/verify_resolution.png" alt="A completed Verify resolution step with an issue status of Resolved, explaining that the monitor returned to OK and showing a graph of the error rate back at baseline levels" style="width:100%;" >}}

## Review action history

[Action History][12] in Bits Settings is an auditable record of every action Bits has taken, including triage actions and infrastructure actions. Filter the list by action, integration, or investigation, and click an action to see:

- **Execution details**: The status, start and end time, duration, and connection used.
- **Scope and policy**: The guardrail that covered the action and who initiated it.
- **Original investigation**: The root cause and impact that led to the action, with a link to the investigation.

## Set up one-click infrastructure actions

Complete these steps before running an investigation, so that Bits can run actions from the remediation next steps it proposes.

### Prerequisites

- To set up a Private Action Runner (required for Kubernetes actions), you need the Datadog Admin role.
- To create guardrails, you need the `Guardrails Read`, `Guardrails Write`, `Execution Policy Read`, and `Execution Policy Write` permissions. Enable them in [Organization Settings > Roles][10].
- To approve actions, approvers need the `bits_investigations_write` and `guardrails_read` permissions in their role.

### Set up Kubernetes actions

#### Enable a Private Action Runner on the Cluster Agent

Bits runs Kubernetes actions through an ownerless [Private Action Runner][13] in the Datadog Cluster Agent. Guardrails authorize actions through [Execution Policies][14], which apply only to ownerless runners.

Before you start, make sure that:

- The Datadog Agent and Cluster Agent are installed on your cluster with the Datadog Operator 1.29.0 or later, or the Datadog Helm chart 3.265.0 or later. The Cluster Agent must be version 7.84.0 or later.
- The API key that the Agent uses has the **Remote Configuration** and **Private Action Runner** capabilities enabled. Enable them in [Organization Settings > API Keys][15].

Add the following settings to your Agent configuration:

- Enroll the runner as ownerless (`api_key_only_enrollment`).
- Allow the runner to run the [Kubernetes actions that Bits supports](#supported-kubernetes-actions).
- Enable Kubernetes Actions (`kubernetesActions`), which grants the Cluster Agent permission to delete pods and to scale, restart, patch, and roll back deployments.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

In your `DatadogAgent` manifest (for example, `datadog-agent.yaml`):

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

Apply the manifest:

```bash
kubectl apply -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}

In your `values.yaml`:

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

Upgrade the release:

```bash
helm upgrade <RELEASE_NAME> datadog/datadog -f values.yaml
```

{{% /tab %}}
{{< /tabs >}}

Go to [Actions > Private Action Runners][16] and confirm that the runner shows as **Active**.

#### Grant the Cluster Agent permissions for the remaining actions

Kubernetes Actions doesn't grant the permissions needed for StatefulSet, DaemonSet, CronJob, Job, ConfigMap, and PersistentVolumeClaim actions. To let Bits run those actions, grant the Cluster Agent's service account the following additional permissions.

1. Find the Cluster Agent's service account in the namespace where you installed the Agent:

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

#### Supported Kubernetes actions

The allowlist controls which actions the runner can run. Bits can recommend any of the following Kubernetes actions, but can run only the ones in the allowlist. To limit what Bits can do, remove actions from the allowlist, or use [guardrails](#govern-how-bits-takes-remediation-action) to require approval or deny actions for specific scopes.

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

#### Create a guardrail for Kubernetes actions

[Create a guardrail](#govern-how-bits-takes-remediation-action) that covers the Kubernetes actions you want Bits to run. For example, an **Ask** guardrail for `rollbackDeployment` scoped to `service:checkout`. A one-click action shows **Approve** only when a guardrail covers it.

### Set up AWS actions

{{< callout >}} AWS actions are in Preview. {{< /callout >}}

Bits runs AWS actions through your Datadog AWS integration, so you don't need a Private Action Runner or a separate connection for them.

1. **Connect your AWS account**: Set up the [Datadog AWS integration][7] for each account where Bits can take action. In Datadog, go to **Integrations > Amazon Web Services** and confirm that the account shows as connected.
1. **Grant the Datadog integration role permission to take action**: Datadog runs AWS actions by assuming the IAM role that you created in your AWS account when you set up the AWS integration. By default, this role can only read data. To let Bits run an action, add that action's IAM permission to the role.

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

   Add an inline policy to the Datadog integration role that allows the actions you want Bits to run. If you set up the integration with CloudFormation, the role is named `DatadogIntegrationRole` by default. For instructions, see [Adding and removing IAM identity permissions][17] in the AWS documentation.
1. **Create a guardrail**: [Create a guardrail](#govern-how-bits-takes-remediation-action) for the AWS actions you want Bits to run, scoped to the resources you want Bits to run them on.

### Get approval requests in Slack

Set up the [Slack integration][11], then turn on approval notifications on your **Ask** guardrails. See [Govern how Bits takes remediation action](#govern-how-bits-takes-remediation-action).

### Run an action

When an investigation finds a root cause, review the remediation step, including the proposed action, its target, and its parameter values. If a guardrail covers the action, click **Approve** on the investigation page or in Slack. Only the approvers named on the guardrail can approve.

After the action runs, click **Verify Resolution** to [confirm that the issue is resolved](#validate-that-issues-are-resolved).

[1]: /bits_ai/bits_investigation/
[2]: /bits_ai/bits_code/
[3]: https://app.datadoghq.com/bits-ai/settings/source-code-integration
[4]: /bits_ai/bits_code/setup/
[5]: /bits_ai/bits_code/setup/#enable-auto-push
[6]: /actions/private_actions/
[7]: /integrations/amazon_web_services/
[8]: /actions/actions_catalog/
[9]: https://app.datadoghq.com/bits-ai/guardrails
[10]: https://app.datadoghq.com/organization-settings/roles
[11]: /integrations/slack/
[12]: https://app.datadoghq.com/bits-ai/settings/action-history
[13]: /actions/private_actions/set_up_agent_based/
[14]: /actions/private_actions/execution_policies/
[15]: https://app.datadoghq.com/organization-settings/api-keys
[16]: https://app.datadoghq.com/actions/private-action-runners
[17]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_manage-attach-detach.html
