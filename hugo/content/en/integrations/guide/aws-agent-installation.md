---
title: Install the Datadog Agent through the AWS Integration
description: "Install and manage the Datadog Agent on your Amazon EC2 instances and Amazon EKS clusters directly from the AWS integration."
private: true # TODO(DOCS-14545): remove at v1 rollout to publish
further_reading:
- link: "https://docs.datadoghq.com/integrations/guide/aws-agent-installation-technical-reference/"
  tag: "Documentation"
  text: "How Agent installation through the AWS integration works"
- link: "https://docs.datadoghq.com/containers/guide/operator-eks-addon/"
  tag: "Documentation"
  text: "Install the Datadog Operator as an Amazon EKS add-on"
- link: "https://docs.datadoghq.com/integrations/amazon_web_services/"
  tag: "Documentation"
  text: "AWS Integration"
- link: "https://docs.datadoghq.com/integrations/guide/aws-manual-setup/"
  tag: "Documentation"
  text: "AWS Manual Setup Guide"
- link: "https://docs.datadoghq.com/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/"
  tag: "Documentation"
  text: "Why install the Datadog Agent on your cloud instances?"
- link: "https://docs.datadoghq.com/agent/fleet_automation/"
  tag: "Documentation"
  text: "Fleet Automation"
- link: "https://docs.datadoghq.com/agent/configuration/"
  tag: "Documentation"
  text: "Agent Configuration"
---

## Overview

The [AWS integration][1] collects metrics, events, and logs from Amazon CloudWatch without installing anything in your compute resources. Installing the Datadog Agent adds telemetry from inside your AWS workloads that CloudWatch alone can't provide, including host-level metrics, distributed traces (APM), live processes, and detailed logs.

Deploy the Datadog Agent to Amazon EC2 instances or Amazon EKS clusters directly from Datadog. Enable Agent installation while you set up the AWS integration, or at any time afterward.

## Prerequisites

Before you begin, confirm the following:

{{< tabs >}}
{{% tab "EC2" %}}

- **CloudFormation access**: You can approve a CloudFormation stack in the target AWS account. Installation deploys a stack in your account, so you (or a teammate) need permission to review and create it. For the required permissions and why they're needed, see the [Required AWS permissions](#required-aws-permissions) section.
- **SSM Agent**: The [AWS Systems Manager (SSM) Agent][2] must already be present on the target instances. Datadog installs the Agent through SSM and can't install the SSM Agent for you, so instances built from custom AMIs without the SSM Agent are not eligible. Datadog flags these instances so you can address them.
- **Supported platforms**: Linux (x86_64 and arm64) and Windows (x86_64). macOS and Windows on arm64 are not supported.

{{% /tab %}}
{{% tab "EKS" %}}

- **CloudFormation access**: You can approve the Agent installation CloudFormation stack in the target AWS account. The stack adds the [required permissions](#required-aws-permissions) to the AWS integration role and configures resource-change notifications.
- **AWS Marketplace access**: The AWS account can accept the agreement for the Datadog Operator EKS add-on. The CloudFormation setup handles this one-time, account-level agreement.
- **Supported add-on version**: Datadog Operator EKS add-on version 0.1.31 or later is available for the cluster's AWS region and Kubernetes version.
- **Supported clusters**: The cluster status is `ACTIVE`, all workloads run on Amazon EC2-backed nodes, and at least one node runs Linux. Additional EC2 nodes can run Linux or Windows. Clusters with EKS Fargate workloads are not supported because this installation method does not provide Agent coverage for Fargate workloads.

{{% /tab %}}
{{< /tabs >}}

## Required AWS permissions

{{< tabs >}}
{{% tab "EC2" %}}

{{% aws-agent-installation %}}

Datadog uses each of these permissions for a specific task:

| Permission | Why Datadog needs it |
|---|---|
| `ec2:DescribeInstances` | Find your instances and check which ones match your rule (state, tags, OS, architecture) |
| `ssm:DescribeInstanceInformation` | Confirm the SSM Agent is running before Datadog attempts anything |
| `ssm:GetDocument`, `ssm:CreateDocument`, `ssm:UpdateDocument`, `ssm:UpdateDocumentDefaultVersion` | Publish the install script in your account and keep it up to date |
| `ssm:SendCommand`, `ssm:ListCommandInvocations` | Run the install and confirm when it finishes |
| `secretsmanager:DescribeSecret`, `secretsmanager:CreateSecret` | Store the API key so it is never passed in a command |
| `iam:CreateRole`, `iam:CreateInstanceProfile`, `iam:AddRoleToInstanceProfile`, `iam:AttachRolePolicy`, `iam:PutRolePolicy`, `iam:PassRole`, `ec2:AssociateIamInstanceProfile`, and the matching `Get` and `List` reads | Give an instance the minimum access it needs in case it does not have an IAM role: reachable by Systems Manager, and able to read its own API key secret |
| `iam:Detach*`, `iam:Delete*`, `iam:RemoveRoleFromInstanceProfile`, `ec2:Disassociate*`, `ec2:DescribeIamInstanceProfileAssociations` | Cleanly undo the resources above when you uninstall |
| `ecs:ListClusters`, `ecs:ListContainerInstances` | Recognize Amazon Elastic Container Service (ECS) container instances so Datadog skips them (they are handled at the cluster level) |
| `events:DescribeRule`, `events:ListTargetsByRule`, `events:PutRule`, `events:PutTargets`, `events:RemoveTargets`, `events:DeleteRule` | Set up and inspect the change notifications that let Datadog react to instance changes |

`iam:CreateRole` and `iam:PassRole` are the most sensitive grants. `iam:CreateRole` is restricted to role names matching `datadog-ec2-instrumenter/datadog-ssm-*` in your account, and `iam:PassRole` is further restricted to the Amazon EC2 service.

{{% /tab %}}
{{% tab "EKS" %}}

Agent installation requires permissions beyond the base [AWS integration IAM policy][9]. All write actions use temporary credentials for the AWS integration role. The CloudFormation stack adds the permissions; you don't need to apply a policy manually.

Datadog uses the following permissions for the managed EKS installation path:

| Permission | Why Datadog needs it |
|---|---|
| `eks:DescribeCluster` | Find the selected cluster and confirm that its status is `ACTIVE` |
| `eks:CreateAddon`, `eks:DescribeAddon`, `eks:UpdateAddon`, `eks:DescribeUpdate`, `eks:DeleteAddon`, `eks:TagResource` | Install and manage the Datadog Operator, AWS Secrets Store CSI Driver Provider, and EKS Pod Identity Agent add-ons |
| `eks:CreatePodIdentityAssociation`, `eks:DescribePodIdentityAssociation`, `eks:ListPodIdentityAssociations`, `eks:DeletePodIdentityAssociation` | Give the credential synchronization service account access to its scoped IAM role |
| `secretsmanager:DescribeSecret`, `secretsmanager:CreateSecret`, `secretsmanager:TagResource` | Create or safely reuse the cluster-specific Datadog API and application key secrets |
| `iam:GetRole`, `iam:CreateRole`, `iam:PutRolePolicy`, `iam:PassRole`, `iam:TagRole`, `iam:DeleteRolePolicy`, `iam:DeleteRole` | Create the credential synchronization role, scope it to the cluster's API and application key secrets, pass it to EKS Pod Identity, and remove the role during uninstall |
| `events:DescribeRule`, `events:ListTargetsByRule`, `events:PutRule`, `events:PutTargets`, `events:RemoveTargets`, `events:DeleteRule` | Set up and inspect notifications that let Datadog react to EKS cluster changes |

Datadog creates the credential synchronization role with a permissions boundary. Its inline policy can read only the API and application key secrets for the selected cluster.

{{% /tab %}}
{{< /tabs >}}

## How it works

{{< tabs >}}
{{% tab "EC2" %}}

Agent installation is based on an **installation rule**: an AWS account paired with a query that describes which EC2 instances to cover. Saving a rule resolves the query into a fixed list of instances. Datadog then installs the Agent on each one, inside your own account:

1. You select the EC2 instances to cover, or opt in to all eligible instances.
1. Datadog resolves your selection into a list of covered instances and records it.
1. Datadog installs the Agent on each covered instance through AWS Systems Manager, adding any missing IAM configuration automatically.
1. Datadog keeps the covered instances instrumented. Instances launched later aren't added until you update the rule.

You approve one CloudFormation stack, one time, during initial setup. After that, installations run automatically from Datadog, with no new CloudFormation template to launch for each installation.

For the full technical and security details, including the AWS resources Datadog creates, the installation mechanism, and the reconciliation model, see [How Agent installation through the AWS integration works][6].

{{< img src="integrations/amazon_web_services/aws-agent-installation-how-it-works.png" alt="Flowchart of the AWS Agent installation process, showing which steps happen in Datadog and which run inside your AWS account." style="width:70%;" >}}

{{% /tab %}}
{{% tab "EKS" %}}

Agent installation is based on an **installation rule**: an AWS account paired with a query that describes which EKS clusters to cover. Saving a rule resolves the query into a fixed list of clusters. Datadog then installs the Agent on each one, inside your own account:

1. You select the EKS clusters to cover, or opt in to all eligible clusters.
1. Datadog resolves your selection into a list of covered clusters and records it.
1. Datadog installs the Datadog Operator and Agent on each covered cluster, adding any missing EKS add-ons and IAM configuration automatically. It also creates or reuses cluster-specific Datadog API and application key secrets.
1. Datadog keeps the covered clusters instrumented. Clusters created later aren't added until you update the rule.

You approve one CloudFormation stack, one time, during initial setup. The stack configures the required AWS permissions and change notifications, and handles the one-time Datadog Operator AWS Marketplace agreement. After that, installations run automatically from Datadog, with no new CloudFormation template to launch for each installation.

For the full technical and security details, including the resources Datadog creates, the installation mechanism, and the reconciliation model, see [How Agent installation through the AWS integration works][6].

{{% /tab %}}
{{< /tabs >}}

## Install the Agent

Start Agent installation from either of the following entry points, depending on how much control you want over which resources are instrumented:

{{< tabs >}}
{{% tab "EC2" %}}

- **AWS integration setup (install on all eligible instances)**: When you [set up the AWS integration][5], enable the Agent installation toggle on the [AWS integration page][7], shown alongside log and resource collection. The Agent installs on all eligible EC2 instances.
- **Fleet Automation (install on specific instances)**: Open the [AWS Install Agents page][8] at any time to select the specific EC2 instances you want.

<!-- TODO(DOCS-14545): per AWS team, surfacing the Agent install flow in the main AWS setup flow for non-first-time users is still rolling out; confirm it's live before publish. -->

The Agent installation toggle appears during setup:

{{< img src="integrations/amazon_web_services/aws-agent-installation-setup-toggle.png" alt="The Install the Datadog Agent step in AWS setup, with the install toggle enabled and the Hosts (EC2) workload toggle turned on." style="width:80%;" >}}

To install from the AWS Install Agents page:

1. Opt in to all eligible instances, or select specific EC2 instances from the resource list.
1. Review the generated CloudFormation stack, then continue to AWS and create it. Datadog prompts you for this only once.
1. Return to Datadog. The installation proceeds automatically, and Datadog reports progress as Agents come online.

<!-- TODO(DOCS-14545): add resource-selection / Manage Agents page screenshot (AWS Install Agents page) — setup-toggle screenshot added. -->

{{% /tab %}}
{{% tab "EKS" %}}

- **AWS integration setup (install on all eligible clusters)**: When you [set up the AWS integration][5], enable Agent installation on the [AWS integration page][7], then enable the **Kubernetes** workload. Datadog installs the Datadog Operator add-on and Agent on eligible EKS clusters.
- **Fleet Automation (install on specific clusters)**: Open the [AWS Install Agents page][8] to select specific EKS clusters.

To install from the AWS Install Agents page:

1. Opt in to all eligible clusters, or select specific EKS clusters from the resource list.
1. Review the generated CloudFormation stack, then continue to AWS and create it. The setup configures the required permissions, change notifications, and AWS Marketplace agreement.
1. Return to Datadog. The installation proceeds automatically, and Datadog reports progress for each selected cluster.

You don't need to apply Kubernetes manifests or run Helm commands for this workflow.

<!-- TODO(TON-852): Add screenshots of the Kubernetes workload toggle and EKS resource selection after the launch UI is finalized. -->

{{% /tab %}}
{{< /tabs >}}

## Verify the installation

{{< tabs >}}
{{% tab "EC2" %}}

After the installation completes:

- The newly installed Agents appear in the [Infrastructure List][3] and on the host map.
- Fleet Automation lists the same Agents in the Fleet View.

<!-- TODO(DOCS-14545): add expected time-to-data once confirmed. -->

{{% /tab %}}
{{% tab "EKS" %}}

After Datadog reports that the installation is active:

- Confirm that the `datadog_operator`, `aws-secrets-store-csi-driver-provider`, and `eks-pod-identity-agent` add-ons are active in Amazon EKS.
- Open [Fleet View][10], switch to the Kubernetes view, and find the cluster.
- Open [Kubernetes Explorer][11] and confirm that the expected cluster, nodes, and workloads appear.

If you have Kubernetes API access, confirm that the managed resource and Agent workloads exist:

```shell
kubectl get datadogagent datadog-agent -n datadog-agent
kubectl get pods -n datadog-agent
```

{{% /tab %}}
{{< /tabs >}}

## Manage installed Agents

{{< tabs >}}
{{% tab "EC2" %}}

Use the [AWS Install Agents page][8] in Fleet Automation to manage the Agents you've installed through the AWS integration.

From this page, you can:

- View the installed Agents and their status.
- Install the Agent on new instances in your AWS environment.
- Uninstall Agents from instances you no longer want to monitor.

To stop coverage, update the rule. If you manually remove the Agent from a covered instance, Datadog reinstalls it on the next reconciliation. Manage Agent configuration and version upgrades through [Fleet Automation][4].

{{% /tab %}}
{{% tab "EKS" %}}

Use the [AWS Install Agents page][8] to view installation status, add clusters to an installation rule, or remove clusters from coverage.

To stop coverage, update or delete the installation rule. If you manually remove the Agent from a covered cluster, Datadog reinstalls it on the next reconciliation. Datadog performs the following ordered cleanup for an EKS installation:

1. The Datadog Operator deletes the `DatadogAgent` resource it created and its dependent resources.
1. After the Operator reports that cleanup is complete, Datadog deletes the `datadog_operator` EKS add-on that it installed.
1. Datadog removes the Pod Identity association and scoped IAM role that it created.
1. The AWS Secrets Store CSI Driver Provider and EKS Pod Identity Agent add-ons remain installed so you can use them with other workloads.
1. Datadog preserves the Datadog API and application keys and their cluster-specific secrets in AWS Secrets Manager for safe reuse if the cluster is added to a rule again.

{{% /tab %}}
{{< /tabs >}}

## Troubleshooting

{{< tabs >}}
{{% tab "EC2" %}}

### The SSM Agent is not present on an EC2 instance

Agent installation on EC2 relies on the AWS Systems Manager (SSM) Agent, which Datadog can't install for you. Datadog flags any instance that lacks it as ineligible, including those built from custom AMIs. Install the SSM Agent on the instance, then retry. See [Working with SSM Agent][2] in the AWS documentation.

### A permission or IAM error occurs

If installation can't complete because of missing permissions, Datadog shows a notification linking to the CloudFormation resource that needs the new permission. Update your existing stack to grant the [required permissions](#required-aws-permissions). You don't need to create a new stack.

{{% /tab %}}
{{% tab "EKS" %}}

### A required EKS add-on is incompatible or unhealthy

Datadog installs the `datadog_operator` add-on and installs or reuses the `aws-secrets-store-csi-driver-provider` and `eks-pod-identity-agent` prerequisite add-ons. Each add-on must reach the `ACTIVE` state before Agent installation can complete.

If the `aws-secrets-store-csi-driver-provider` add-on is already installed, its configuration must set `secrets-store-csi-driver.syncSecret.enabled` to `true`. Datadog doesn't modify the configuration of an existing add-on.

If installation reports an add-on error, open the cluster's **Add-ons** tab in the Amazon EKS console, select the affected add-on, and review its **Health issues**. Resolve the reported issue or enable secret synchronization. Datadog retries the installation during the next reconciliation. For more information, see [FAQs: Amazon EKS add-ons][12] in the AWS documentation.

### A permission or IAM error occurs

If installation can't complete because of missing permissions, Datadog shows a notification linking to the CloudFormation resource that needs the new permission. Update your existing stack to grant the [required permissions](#required-aws-permissions). You don't need to create a new stack.

{{% /tab %}}
{{< /tabs >}}

[1]: /integrations/amazon_web_services/
[2]: https://docs.aws.amazon.com/systems-manager/latest/userguide/ssm-agent.html
[3]: https://app.datadoghq.com/infrastructure
[4]: /agent/fleet_automation/
[5]: /getting_started/integrations/aws/
[6]: /integrations/guide/aws-agent-installation-technical-reference/
[7]: https://app.datadoghq.com/integrations/amazon-web-services
[8]: https://app.datadoghq.com/fleet/install-agent/latest?platform=aws
[9]: /integrations/amazon_web_services/#aws-iam-permissions
[10]: /agent/fleet_automation/fleet_view/
[11]: https://app.datadoghq.com/orchestration/overview/pod
[12]: https://repost.aws/knowledge-center/eks-managed-add-on

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
