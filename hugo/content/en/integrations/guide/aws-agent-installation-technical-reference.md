---
title: How Agent Installation through the AWS Integration Works
description: "Understand how Datadog installs and maintains the Datadog Agent on Amazon EC2 and Amazon EKS through the AWS integration: the AWS resources created, the installation mechanism, the security model, and the Agent lifecycle."
private: true # TODO(DOCS-14545): remove at v1 rollout to publish, at the same time as the setup guide this page links to
further_reading:
- link: "https://docs.datadoghq.com/integrations/guide/aws-agent-installation/"
  tag: "Documentation"
  text: "Install the Datadog Agent through the AWS Integration"
- link: "https://docs.datadoghq.com/integrations/amazon_web_services/"
  tag: "Documentation"
  text: "AWS Integration"
- link: "https://docs.datadoghq.com/agent/fleet_automation/"
  tag: "Documentation"
  text: "Fleet Automation"
---

This page explains how Datadog installs and maintains the Agent on Amazon EC2 instances and Amazon EKS clusters through the AWS integration. For setup instructions and the permissions Datadog requires, see [Install the Datadog Agent through the AWS Integration][1].

## Resources that Datadog creates

{{< tabs >}}
{{% tab "EC2" %}}

The CloudFormation template you launch creates the following AWS resources one time, in a single stack:

| Resource | Name | Purpose |
|---|---|---|
| EventBridge connection | `datadog-agent-resource-update-intake-connection` | Holds your Datadog API and application keys so events can be sent to Datadog |
| EventBridge API destination | `datadog-agent-resource-update-intake-destination` | Sends events to `https://api.<YOUR_DD_SITE>/api/unstable/instrumenter/events` (capped at 10 events per second) |
| EventBridge rule | `datadog-agent-resource-update-rule-ec2` | Notifies Datadog when a covered instance changes |
| IAM role | auto-named | Lets EventBridge send events to the `datadog-agent-resource-update-intake-destination` API destination |
| IAM role | `datadog-eventbridge-cross-region-role` | Lets other regions forward events to your primary region |

Datadog creates the following AWS resources as needed, at install time:

| Resource | Name | Purpose |
|---|---|---|
| Systems Manager document | `datadog-ec2-instrumenter` | The install and uninstall script. One document per account. |
| Secrets Manager secret | `/datadog/ec2-instrumenter/<ACCOUNT_ID>/<INSTANCE_ID>` | Holds the Datadog API key so the instance can fetch it itself. Encrypted with the default AWS-managed key. |
| IAM role and instance profile | `datadog-ssm-<INSTANCE_ID>` and `datadog-ssm-profile-<INSTANCE_ID>` | Created only when the instance has no instance profile, under the IAM path `/datadog-ec2-instrumenter/` so they are identifiable. Receives the AWS-managed `AmazonSSMManagedInstanceCore` policy so Systems Manager can reach the instance. |
| Inline IAM policy | `datadog-ec2-instrumenter-secrets` | Added to the instance's role. Grants read access only to secrets under `/datadog/ec2-instrumenter/`. |
| EventBridge rules in your other regions | Same names as the primary-region resources | Forward change events to your primary region. |

Datadog does not create S3 buckets, event buses, log groups, or SSM parameters, and does not tag your instances.

{{% /tab %}}
{{% tab "EKS" %}}

The CloudFormation template you launch creates the following AWS resources one time, in a single stack:

| Resource | Name | Purpose |
|---|---|---|
| EventBridge connection | `datadog-agent-resource-update-intake-connection` | Holds your Datadog API and application keys so events can be sent to Datadog |
| EventBridge API destination | `datadog-agent-resource-update-intake-destination` | Sends events to `https://api.<YOUR_DD_SITE>/api/unstable/instrumenter/events` (capped at 10 events per second) |
| EventBridge rule | `datadog-agent-resource-update-rule-eks` | Notifies Datadog when a covered cluster changes |
| IAM role | auto-named | Lets EventBridge send events to the `datadog-agent-resource-update-intake-destination` API destination |
| IAM role | `datadog-eventbridge-cross-region-role` | Lets other regions forward events to your primary region |
| AWS Marketplace subscription function and IAM role | auto-named | Accepts the one-time, account-level agreement for the Datadog Operator EKS add-on |
| IAM permissions boundary | `datadog-instrumenter-eks-ascp-boundary` under `/datadog/instrumenter-boundaries/` | Limits the permissions available to the per-cluster credential synchronization role |

Datadog creates the following AWS resources as needed, at install time:

| Resource | Name | Purpose |
|---|---|---|
| EKS add-on | `datadog_operator` | Runs the Datadog Operator, which creates and maintains the Agent resources inside the cluster |
| EKS add-ons | `aws-secrets-store-csi-driver-provider` and `eks-pod-identity-agent` | Synchronize the Datadog credentials from AWS Secrets Manager into the cluster. Datadog creates these add-ons only when they are absent. |
| Secrets Manager secret | `/datadog/eks-instrumenter/<ACCOUNT_ID>/<CLUSTER_NAME>` | Holds the Datadog API key for the cluster |
| Secrets Manager secret | `/datadog/eks-instrumenter/<ACCOUNT_ID>/<CLUSTER_NAME>/application-key` | Holds the cluster-specific Datadog application key |
| IAM role and inline policy | `dd-eks-ascp-sync-<CLUSTER_NAME>-<HASH>` and `dd-eks-instrumenter-ascp-sync-policy` | Let the credential synchronization service account read only the two cluster-specific secrets |
| EKS Pod Identity association | `datadog-agent/datadog-ascp-sync` | Associates the credential synchronization service account with its scoped IAM role |

Datadog also creates one Datadog application key per cluster with only the **Remote Configuration Read** permission.

The Datadog Operator creates the following Kubernetes resources inside the cluster:

| Resource | Name | Purpose |
|---|---|---|
| Kubernetes Secret | `datadog-agent/datadog-managed-secret` | Makes the API and application keys available to the managed Agent resources |
| `DatadogAgent` custom resource | `datadog-agent/datadog-agent` | Defines the Agent configuration that the Datadog Operator maintains |

Datadog does not call the Kubernetes API during installation; the Datadog Operator creates and removes the managed resources inside the cluster.

{{% /tab %}}
{{< /tabs >}}

## How Agent installation works

{{< tabs >}}
{{% tab "EC2" %}}

After you save an installation rule, Datadog resolves the query you defined into a fixed list of covered instances. Datadog then runs the following sequence against each one. For prerequisites, including supported platforms, see [Prerequisites][2] in the setup guide.

1. Datadog checks that each covered instance is running, on a supported platform, and reachable by AWS Systems Manager.
2. When an instance has no IAM instance profile, Datadog creates one so Systems Manager can reach it. When an instance already has one, Datadog adds the SSM policy and the scoped secret-read policy to the existing role.
3. Datadog checks whether an Agent is already present. When an Agent is present that Datadog did not install, Datadog stops and leaves the instance alone.
4. Datadog calls `ssm:SendCommand`, one instance at a time, running the `datadog-ec2-instrumenter` document.
5. On the instance, the document fetches the API key from Secrets Manager using the instance's own IAM role. It then runs Datadog's standard Agent installer (`install_script_agent7.sh` on Linux, or the standard MSI on Windows) with log collection and APM host instrumentation enabled. The command times out after 6 minutes.

Datadog does not reboot or restart your instances. The only service Datadog touches is the Datadog Agent itself, which is started on install and stopped on uninstall. Your applications and other services are untouched.

### Instances that Datadog excludes

Datadog automatically excludes:

- Instances that are not running
- EKS worker nodes
- ECS container instances
- Instances that already have a non-Datadog-installed Agent

{{% /tab %}}
{{% tab "EKS" %}}

After you save an installation rule, Datadog resolves the query you defined into a fixed list of covered clusters. Datadog then runs the following sequence against each one. For eligibility requirements, see [Prerequisites][2] in the setup guide.

1. Datadog confirms that the cluster is eligible and that the AWS integration role has the required permissions.
2. Datadog installs or reuses the AWS Secrets Store CSI Driver Provider and EKS Pod Identity Agent add-ons, then creates the cluster-specific secrets, IAM role, and Pod Identity association used for credential synchronization.
3. Datadog creates the Datadog Operator EKS add-on in the `datadog-agent` namespace. The add-on synchronizes the API and application keys into the `datadog-managed-secret` Kubernetes Secret.
4. Datadog updates the add-on configuration to request Agent installation. The Operator creates the `DatadogAgent` resource and its dependent resources inside the cluster.
5. The Operator reports the result of the requested lifecycle operation to Datadog. Datadog acknowledges that result in the add-on configuration before marking the installation active.

Datadog does not call the Kubernetes API or require Kubernetes credentials. All control-plane operations from Datadog use AWS APIs; the Operator handles the in-cluster resources.

### Supported clusters

This installation method supports `ACTIVE` clusters where all workloads run on EC2-backed nodes and at least one node runs Linux. EKS Fargate workloads are not covered.

Datadog does not replace or adopt an existing `datadog_operator` add-on.

{{% /tab %}}
{{< /tabs >}}

## Security, auditing, and change control

{{< tabs >}}
{{% tab "EC2" %}}

### How Datadog gets access

Datadog uses the same cross-account IAM role as the AWS integration, authenticated with an external ID. Datadog receives short-lived, temporary credentials, and each type of work (reading EC2, managing IAM, sending commands) uses a separately scoped credential session rather than one broad session. Datadog does not store any long-lived AWS keys.

### Auditing Datadog's actions

Every action Datadog takes is a standard AWS API call, so all actions appear in AWS CloudTrail. Everything Datadog creates is identifiable by name: resources are prefixed with `datadog-`, secrets are stored under `/datadog/ec2-instrumenter/`, and IAM roles use the immutable path `/datadog-ec2-instrumenter/`. Because an IAM path cannot be edited after creation, the path cannot be silently changed. On-instance command results appear in the Systems Manager Run Command history.

### How the API key is handled

The API key is stored in your own Secrets Manager, encrypted at rest. Only the secret's Amazon Resource Name (ARN) is passed in the SSM command; the key itself never appears in command parameters or in CloudTrail. The instance reads the secret with its own IAM role, restricted to a single path. Datadog stores only a reference to the key internally, not the key itself.

### Who can change installations

- **In AWS**: Access is governed by your own IAM policies. Removing the cross-account permissions stops Datadog immediately.
- **In Datadog**: Viewing installation rules requires the **Hosts Read** permission. Creating, editing, or deleting rules requires the **Agent Install** permission. Rule changes are rate-limited.

### Guardrails

- Datadog never removes an Agent it did not install.
- Datadog tracks which instances it installed an Agent on, so it cleans up only its own work.
- When some regions cannot be listed, Datadog skips cleanup for that pass rather than risk uninstalling in bulk.

{{% /tab %}}
{{% tab "EKS" %}}

### How Datadog gets access

Datadog uses the same cross-account IAM role as the AWS integration and receives short-lived, temporary credentials. The additional permissions for this installation method let Datadog inspect clusters and manage the EKS add-ons, secrets, IAM role, and Pod Identity association used by the installation. Datadog does not store long-lived AWS credentials or Kubernetes credentials.

### Auditing Datadog's actions

Every AWS action Datadog takes appears in AWS CloudTrail. AWS resources created for an installation are identifiable by their names and tags: secrets use the `/datadog/eks-instrumenter/` prefix, the credential synchronization role uses the `dd-eks-ascp-sync-` prefix, and the Datadog Operator add-on includes tags that identify the installation and cluster.

### How the API and application keys are handled

The API key and cluster-specific application key are stored in separate AWS Secrets Manager secrets encrypted at rest. The application key has only the **Remote Configuration Read** permission. Only the secret identifiers—not the key values—appear in the EKS add-on configuration.

The credential synchronization service account assumes a dedicated IAM role through EKS Pod Identity. Its inline policy can read only the two secrets for that cluster. The AWS Secrets Store CSI Driver Provider synchronizes their values into `datadog-agent/datadog-managed-secret` for the Operator-managed Agent resources.

### Who can change installations

- **In AWS**: Access is governed by your own IAM policies. Removing the cross-account permissions stops Datadog immediately.
- **In Datadog**: Viewing installation rules requires the **Hosts Read** permission. Creating, editing, or deleting rules requires the **Agent Install** permission. Rule changes are rate-limited.

### Guardrails

- Datadog does not replace or adopt an existing Datadog Operator add-on.
- Datadog reuses compatible AWS Secrets Store CSI Driver Provider and EKS Pod Identity Agent add-ons without modifying them, and leaves them installed during uninstall.
- Datadog does not replace an existing Pod Identity association for the `datadog-ascp-sync` service account. It reuses one only when it matches the association Datadog previously created.
- Datadog removes only the Datadog Operator add-on, IAM role, and Pod Identity association that match the recorded installation.

{{% /tab %}}
{{< /tabs >}}

## Agent lifecycle and reconciliation

{{< tabs >}}
{{% tab "EC2" %}}

### Rule coverage is fixed at save time

A rule covers the list of instances it resolved to when you saved it, and Datadog does not instrument anything outside that list. Instances launched later are not picked up automatically. To cover them, update the rule, which re-resolves your query against your current fleet.

### How Datadog keeps covered instances in sync

Datadog continuously maintains the state you define on the covered instances:

- A full reconciliation runs hourly per AWS account. Reconciliation reinstalls the Agent if it goes missing, retries anything that failed, and cleans up instances that no longer exist.
- Already-installed instances are re-verified about once per day rather than every hour, to avoid unnecessary activity.
- Change events from the CloudFormation stack let Datadog react to covered instances within minutes, instead of waiting for the hourly pass.

### What happens when you edit a rule

Datadog re-resolves your query and compares it against the previous list. Instances no longer covered have the Agent uninstalled. Newly covered instances have the Agent installed. Deleting a rule uninstalls the Agent from everything the rule covered.

### Terminated or stopped instances

Datadog detects terminated instances on the next hourly pass and cleans up the IAM resources it created for them. Datadog leaves stopped instances alone until they return.

### When an install fails

Datadog retries with an increasing delay (1 hour, then 2 hours, up to once per day) and continues retrying. Missing-permission problems appear as an issue on the **AWS integration tile** and on the Fleet install page.

<div class="alert alert-warning">
When someone manually removes the Agent from a covered instance, the next reconciliation reinstalls it. The rule is the source of truth. To stop coverage, change the rule.
</div>

{{% /tab %}}
{{% tab "EKS" %}}

### Rule coverage is fixed at save time

A rule covers the list of clusters it resolved to when you saved it, and Datadog does not instrument anything outside that list. Clusters created later are not picked up automatically. To cover them, update the rule, which re-resolves your query against your current clusters.

### How Datadog keeps covered clusters in sync

Datadog continuously maintains the state you define for the covered clusters:

- A full reconciliation runs hourly per AWS account. Reconciliation retries incomplete installations and uninstalls clusters that are no longer covered.
- Change events from the CloudFormation stack let Datadog react to cluster creation, configuration, version, and tag changes within minutes instead of waiting for the hourly pass.
- The Datadog Operator continuously reconciles the Agent resources inside each covered cluster.

### What happens when you edit a rule

Datadog re-resolves your query and compares it against the previous list. Clusters no longer covered have the Agent uninstalled. Newly covered clusters have the Agent installed. Deleting a rule uninstalls the Agent from every cluster the rule covered.

### When an install fails

Datadog retries the installation during later reconciliations. Missing-permission problems appear as an issue on the **AWS integration tile** and on the Fleet install page.

<div class="alert alert-warning">
When someone manually removes the Agent from a covered cluster, the next reconciliation reinstalls it. The rule is the source of truth. To stop coverage, change or delete the rule.
</div>

{{% /tab %}}
{{< /tabs >}}

## Uninstall the Agent

{{< tabs >}}
{{% tab "EC2" %}}

Uninstalling removes the Datadog Agent, the `/etc/datadog-agent` and `/opt/datadog-agent` directories on Linux (or performs an MSI uninstall on Windows), and any IAM role or instance profile Datadog created for that instance. To uninstall, remove instances from a rule, edit the rule's query, or delete the rule.

{{% /tab %}}
{{% tab "EKS" %}}

To uninstall, remove clusters from a rule, edit the rule's query, or delete the rule. Datadog performs cleanup in this order:

1. The Datadog Operator deletes the `DatadogAgent` custom resource it created and its dependent Kubernetes resources.
1. After the Operator reports that cleanup is complete, Datadog deletes the `datadog_operator` EKS add-on that it installed.
1. Datadog removes the Pod Identity association and scoped IAM role that it created.
1. The AWS Secrets Store CSI Driver Provider and EKS Pod Identity Agent add-ons remain installed so you can use them with other workloads.
1. Datadog preserves the Datadog API and application keys and their cluster-specific secrets in AWS Secrets Manager for safe reuse if the cluster is added to a rule again.

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/integrations/guide/aws-agent-installation/
[2]: https://docs.datadoghq.com/integrations/guide/aws-agent-installation/#prerequisites
