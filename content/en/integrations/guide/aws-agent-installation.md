---
title: Install the Datadog Agent through the AWS Integration
description: "Install and manage the Datadog Agent on your Amazon EC2 instances directly from the AWS integration, without connecting to each host or running per-host scripts."
private: true # TODO(DOCS-14545): remove at v1 rollout to publish; also add the nextlink entry in integrations/guide/_index.md at that time
further_reading:
- link: "https://docs.datadoghq.com/integrations/guide/aws-agent-installation-technical-reference/"
  tag: "Documentation"
  text: "How Agent installation through the AWS integration works"
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

The [AWS integration][1] collects metrics, events, and logs from Amazon CloudWatch without installing anything on your hosts. Installing the Datadog Agent adds telemetry from inside your AWS workloads that CloudWatch alone can't provide, including host-level metrics, distributed traces (APM), live processes, and detailed logs.

You can deploy the Datadog Agent to your Amazon EC2 instances directly from Datadog, without connecting to each host or running per-host scripts. Enable Agent installation while you set up the AWS integration, or at any time afterward.

Amazon EKS is not supported yet. Support for more AWS resource types is planned, starting with EKS.

## Prerequisites

Before you begin, confirm the following:

- **CloudFormation access**: You can approve a CloudFormation stack in the target AWS account. Installation deploys a stack in your account, so you (or a teammate) need permission to review and create it. For the required permissions and why they're needed, see the [Required AWS permissions](#required-aws-permissions) section.
- **SSM Agent**: The [AWS Systems Manager (SSM) Agent][2] must already be present on the target instances. Datadog installs the Agent through SSM and can't install the SSM Agent for you, so instances built from custom AMIs without the SSM Agent are not eligible. Datadog flags these instances so you can address them.
- **Supported platforms**: Linux (x86_64 and arm64) and Windows (x86_64). macOS and Windows on arm64 are not supported.

## Required AWS permissions

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
| `events:PutRule`, `events:PutTargets`, `events:RemoveTargets`, `events:DeleteRule` | Set up the change notifications that let Datadog react to instance changes |

`iam:CreateRole` and `iam:PassRole` are the most sensitive grants. `iam:CreateRole` is restricted to role names matching `datadog-ec2-instrumenter/datadog-ssm-*` in your account, and `iam:PassRole` is further restricted to the Amazon EC2 service.

## How it works

Agent installation is based on an **installation rule**: an AWS account paired with a query that describes which EC2 instances to cover. Saving a rule resolves the query into a fixed list of instances. Datadog then installs the Agent on each one, inside your own account:

1. You select the EC2 instances to cover, or opt in to all eligible instances.
1. Datadog resolves your selection into a list of covered instances and records it.
1. Datadog installs the Agent on each covered instance through AWS Systems Manager, adding any missing IAM configuration automatically.
1. Datadog keeps the covered instances instrumented. Instances launched later aren't added until you update the rule.

You approve one CloudFormation stack, one time, during initial setup. After that, installations run automatically from Datadog, with no new CloudFormation template to launch for each installation.

For the full technical and security details, including the AWS resources Datadog creates, the installation mechanism, and the reconciliation model, see [How Agent installation through the AWS integration works][6].

{{< img src="integrations/amazon_web_services/aws-agent-installation-how-it-works.png" alt="Flowchart of the AWS Agent installation process, showing which steps happen in Datadog and which run inside your AWS account." style="width:70%;" >}}

## Install the Agent

<!-- TODO(DOCS-14545): at publish, add in-app deep links to both entry points — the AWS setup flow (https://app.datadoghq.com/integrations?category=AWS&integrationId=amazon-web-services) and the Fleet Automation Install Agents page (https://app.datadoghq.com/fleet/install-agent/latest?platform=aws). Confirm stable prod URLs once the rollout completes. -->

You can start Agent installation from two entry points, depending on how much control you want over which instances are instrumented:

- **AWS integration setup (install on all eligible instances)**: When you [set up the AWS integration][5], enable the Agent installation toggle, shown alongside log and resource collection. The Agent installs on all eligible EC2 instances.
- **Fleet Automation (install on specific instances)**: Open the AWS Install Agents page at any time to select the specific EC2 instances you want.

<!-- TODO(DOCS-14545): per AWS team, surfacing the Agent install flow in the main AWS setup flow for non-first-time users is still rolling out; confirm it's live before publish. -->

The Agent installation toggle appears during setup:

{{< img src="integrations/amazon_web_services/aws-agent-installation-setup-toggle.png" alt="The Install the Datadog Agent step in AWS setup, with the install toggle enabled and the Hosts (EC2) workload toggle turned on." style="width:80%;" >}}

To install from the AWS Install Agents page:

1. Opt in to all eligible instances, or select specific EC2 instances from the resource list.
1. Review the generated CloudFormation stack, then continue to AWS and create it. Datadog prompts you for this only once.
1. Return to Datadog. The installation proceeds automatically, and Datadog reports progress as Agents come online.

<!-- TODO(DOCS-14545): add resource-selection / Manage Agents page screenshot (AWS Install Agents page) — setup-toggle screenshot added. -->

## Verify the installation

After the installation completes:

- The newly installed Agents appear in the [Infrastructure List][3] and on the host map.
- Fleet Automation lists the same Agents in the Fleet View.

<!-- TODO(DOCS-14545): add expected time-to-data once confirmed. -->

## Manage installed Agents

Use the AWS Install Agents page in Fleet Automation to manage the Agents you've installed through the AWS integration.

From this page, you can:

- View the installed Agents and their status.
- Install the Agent on new instances in your AWS environment.
- Uninstall Agents from instances you no longer want to monitor.

To stop coverage, update the rule. If you manually remove the Agent from a covered instance, Datadog reinstalls it on the next reconciliation. Manage Agent configuration and version upgrades through [Fleet Automation][4].

## Troubleshooting

### The SSM Agent is not present on an EC2 instance

Agent installation on EC2 relies on the AWS Systems Manager (SSM) Agent, which Datadog can't install for you. Datadog flags any instance that lacks it as ineligible, including those built from custom AMIs. Install the SSM Agent on the instance, then retry. See [Working with SSM Agent][2] in the AWS documentation.

### A permission or IAM error occurs

If installation can't complete because of missing permissions, Datadog shows a notification with a link to the relevant CloudFormation resource so you can resolve it. Confirm that the permissions in the [Required AWS permissions](#required-aws-permissions) section are in place.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://docs.aws.amazon.com/systems-manager/latest/userguide/ssm-agent.html
[3]: https://app.datadoghq.com/infrastructure
[4]: https://docs.datadoghq.com/agent/fleet_automation/
[5]: https://docs.datadoghq.com/getting_started/integrations/aws/
[6]: https://docs.datadoghq.com/integrations/guide/aws-agent-installation-technical-reference/
