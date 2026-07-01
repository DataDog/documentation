---
title: Install the Datadog Agent through the AWS Integration
description: "Deploy the Datadog Agent to your EC2 and EKS resources directly from the AWS integration."
private: true # TODO(DOCS-14545): remove at v1 rollout to publish; also add the nextlink entry in integrations/guide/_index.md at that time
further_reading:
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

You can deploy the Datadog Agent to your Amazon EC2 and Amazon EKS resources directly from Datadog, without connecting to each host or running per-host scripts. Enable Agent installation while you set up the AWS integration, or at any time afterward.

## Prerequisites

Before you begin, make sure of the following:

- You can approve a CloudFormation stack in the target AWS account. Installation deploys a CloudFormation stack in your account, so you (or a teammate) need permission to review and create it. For the required permissions and why they're needed, see the [Required AWS permissions](#required-aws-permissions) section.

The following resource-specific requirements also apply:

- **Amazon EC2**: The [AWS Systems Manager (SSM) Agent][2] must already be present on the target instances. Datadog installs the Agent through SSM and can't install the SSM Agent for you, so instances built from custom AMIs without the SSM Agent are not eligible. Datadog flags these instances so you can address them.
- **Amazon EKS**: <!-- TODO(DOCS-14545): eng to confirm exact networking prerequisite; private clusters may require additional access and can introduce a delay. -->

## Required AWS permissions

{{% aws-agent-installation %}}

## How it works

When you install the Agent through the AWS integration, you choose the resources, and Datadog handles the deployment inside your own account:

1. Select the EC2 instances and EKS clusters where you want the Agent installed, or opt in to all eligible resources.
1. Datadog deploys the Agent to those resources. On EC2, Datadog installs the Agent through AWS Systems Manager. If an instance is missing the IAM configuration required to install the Agent, Datadog sets it up automatically.
1. Datadog maintains the installation on the resources you selected.

You approve one CloudFormation stack, one time, during initial setup. After that, installations run automatically from Datadog, with no new CloudFormation template to launch for each installation.

{{< img src="integrations/amazon_web_services/aws-agent-installation-how-it-works.png" alt="Flowchart of the AWS Agent installation process, showing which steps happen in Datadog and which run inside your AWS account." style="width:70%;" >}}

## Install the Agent

<!-- TODO(DOCS-14545): at publish, add in-app deep links to both entry points — the AWS setup flow (https://app.datadoghq.com/integrations?category=AWS&integrationId=amazon-web-services) and the Fleet Automation Install Agents page (https://app.datadoghq.com/fleet/install-agent/latest?platform=aws). Confirm stable prod URLs once the rollout completes. -->

You can start Agent installation from two entry points, depending on how much control you want over which resources are instrumented:

- **AWS integration setup (install on all eligible resources)**: When you [set up the AWS integration][5], enable the Agent installation toggle, shown alongside log and resource collection. Choose to install on EC2 instances, EKS clusters, or both. The Agent installs on all eligible resources of the types you select.
- **Fleet Automation (install on specific resources)**: Open the AWS Install Agents page at any time to select the specific EC2 instances and EKS clusters you want.

<!-- TODO(DOCS-14545): per AWS team, surfacing the Agent install flow in the main AWS setup flow for non-first-time users is still rolling out; confirm it's live before publish. -->

The Agent installation toggle appears during setup:

{{< img src="integrations/amazon_web_services/aws-agent-installation-setup-toggle.png" alt="The Install the Datadog Agent step in AWS setup, with the install toggle enabled and the Hosts (EC2) and Kubernetes (EKS) workload toggles turned on." style="width:80%;" >}}

To install from the AWS Install Agents page:

1. Opt in to all eligible resources, or select specific EC2 instances and EKS clusters from the resource list.
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
- Install the Agent on new resources in your AWS environment.
- Uninstall Agents from resources you no longer want to monitor.

Manage Agent configuration and version upgrades through [Fleet Automation][4].

## Troubleshooting

### The SSM Agent is not present on an EC2 instance

Agent installation on EC2 relies on the AWS Systems Manager (SSM) Agent, which Datadog can't install for you. Datadog flags any instance that lacks it as ineligible, including those built from custom AMIs. Install the SSM Agent on the instance, then retry. See [Working with SSM Agent][2] in the AWS documentation.

### A permission or IAM error occurs

If installation can't complete because of missing permissions, Datadog shows a notification with a link to the relevant CloudFormation resource so you can resolve it. Confirm that the permissions in the [Required AWS permissions](#required-aws-permissions) section are in place.

### EKS installation is delayed or fails on a private cluster

<!-- TODO(DOCS-14545): eng to confirm networking requirements and the recommended resolution for private clusters. -->

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://docs.aws.amazon.com/systems-manager/latest/userguide/ssm-agent.html
[3]: https://app.datadoghq.com/infrastructure
[4]: https://docs.datadoghq.com/agent/fleet_automation/
[5]: https://docs.datadoghq.com/getting_started/integrations/aws/
