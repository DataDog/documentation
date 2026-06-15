---
title: Install the Datadog Agent through the AWS Integration
description: "Deploy the Datadog Agent to your EC2 and EKS resources directly from the AWS integration"
private: true # TODO(DOCS-14545): remove at v1 rollout to publish; also add the nextlink entry in integrations/guide/_index.md at that time
further_reading:
- link: "https://docs.datadoghq.com/integrations/amazon_web_services/"
  tag: "Documentation"
  text: "AWS Integration"
- link: "https://docs.datadoghq.com/integrations/guide/aws-manual-setup/"
  tag: "Documentation"
  text: "AWS Manual Setup Guide"
- link: "https://docs.datadoghq.com/agent/fleet_automation/"
  tag: "Documentation"
  text: "Fleet Automation"
- link: "https://docs.datadoghq.com/agent/configuration/"
  tag: "Documentation"
  text: "Basic Agent Usage"
---

## Overview

The [AWS integration][1] collects metrics, events, and logs from Amazon CloudWatch without installing anything on your hosts. Installing the Datadog Agent adds telemetry from inside your AWS workloads that CloudWatch alone can't provide, including host-level metrics, distributed traces (APM), live processes, and detailed logs.

You can deploy the Datadog Agent to your Amazon EC2 and Amazon EKS resources directly from Datadog, without connecting to each host or running per-host scripts. Enable Agent installation while you set up the AWS integration, or at any time afterward.

## Prerequisites

Before you begin, make sure of the following:

- You can approve a CloudFormation stack in the target AWS account. Installation deploys a CloudFormation stack in your account, so you (or a teammate) need permission to review and create it.
- Your Datadog IAM role has the permissions described in the following section.

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

{{< img src="integrations/amazon_web_services/aws-agent-installation-how-it-works.png" alt="Flow of installing the Datadog Agent through the AWS integration. In Datadog: connect your AWS account, Datadog discovers eligible EC2 and EKS resources, select resources or opt in to all eligible, and approve the CloudFormation stack once. In your AWS account: the CloudFormation stack creates an install role, the Agent is installed through SSM with IAM remediated if needed, and Agents come online and report to Datadog. Back in Datadog, view the installed Agents." style="width:70%;" >}}

## Install the Agent

Start Agent installation as part of AWS integration setup, or from the AWS integration page at any time.

<!-- TODO(DOCS-14545): confirm exact entry point and UI labels at launch. -->

1. In Datadog, open the [AWS integration page][4].
1. Enable Agent installation. During initial CloudFormation setup, this appears as a toggle alongside log and resource collection.
1. Opt in to all eligible resources, or select specific EC2 instances and EKS clusters from the resource list.
1. Review the generated CloudFormation stack, then continue to AWS and create it. Datadog prompts you for this only once.
1. Return to Datadog. The installation proceeds automatically, and Datadog reports progress as Agents come online.

<!-- TODO(DOCS-14545): add install-flow screenshots (setup toggle, resource-selection/Manage Agents page) once the UI is final. -->

## Verify the installation

After the installation completes:

- The newly installed Agents appear in the [Infrastructure List][5] and on the host map.
- Fleet Automation lists the same Agents in the Fleet View.

<!-- TODO(DOCS-14545): add expected time-to-data once confirmed. -->

## Manage installed Agents

Use the AWS Install Agents page in Fleet Automation to manage the Agents you've installed through the AWS integration.

From this page, you can:

- View the installed Agents and their status.
- Install the Agent on new resources in your AWS environment.
- Uninstall Agents from resources you no longer want to monitor.

Manage Agent configuration and version upgrades through [Fleet Automation][6].

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
[4]: https://app.datadoghq.com/integrations/amazon-web-services
[5]: https://app.datadoghq.com/infrastructure
[6]: https://docs.datadoghq.com/agent/fleet_automation/
