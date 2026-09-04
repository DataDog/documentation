---
title: Install Datadog Instrumentation through the AWS Integration
description: "Instrument your Amazon EC2 instances and AWS Lambda functions directly from the AWS integration, without connecting to each host or redeploying each function."
private: true # TODO(DOCS-14545): remove at v1 rollout to publish; also add the nextlink entry under "AWS guides" in hugo/content/en/integrations/guide/_index.md at that time
further_reading:
- link: "https://docs.datadoghq.com/integrations/guide/aws-agent-installation-technical-reference/"
  tag: "Documentation"
  text: "How Datadog instrumentation through the AWS integration works"
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
- link: "https://docs.datadoghq.com/serverless/aws_lambda/"
  tag: "Documentation"
  text: "Serverless Monitoring for AWS Lambda"
- link: "https://docs.datadoghq.com/serverless/aws_lambda/configuration/"
  tag: "Documentation"
  text: "Configure Serverless Monitoring for AWS Lambda"
- link: "https://docs.datadoghq.com/serverless/aws_lambda/instrumentation/"
  tag: "Documentation"
  text: "Instrumenting AWS Lambda"
- link: "https://docs.datadoghq.com/serverless/aws_lambda/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshoot AWS Lambda Monitoring"
- link: "https://docs.datadoghq.com/account_management/workload_identity_federation/"
  tag: "Documentation"
  text: "Workload Identity Federation"
---

## Overview

The [AWS integration][1] collects metrics, events, and logs from Amazon CloudWatch without installing anything on your resources. Adding Datadog instrumentation collects telemetry from inside your AWS workloads that CloudWatch alone can't provide, including host-level metrics, distributed traces (APM), live processes, and detailed logs.

You can instrument your AWS workloads directly from Datadog, without connecting to each host or redeploying each function. Enable instrumentation while you set up the AWS integration, or at any time afterward.

## Supported workloads

| Workload | What Datadog installs |
|---|---|
| Amazon EC2 instances | The Datadog Agent |
| AWS Lambda functions | The Datadog Lambda extension, and the Datadog tracing layer matching the function's runtime |

Amazon EKS is not supported. For Lambda functions, Datadog offers a second product, remote instrumentation, which runs an instrumenter function in your own account. See [Choose between this guide and remote instrumentation](#choose-between-this-guide-and-remote-instrumentation).

<div class="alert alert-warning">A Lambda function can be managed by only one Datadog instrumentation product. Datadog skips any function that remote instrumentation already manages, and skips any function you instrumented yourself.</div>

## Choose between this guide and remote instrumentation

Datadog offers two ways to add instrumentation to Lambda functions without redeploying them yourself:

- **Instrumentation through the AWS integration**, covered by this guide, is managed entirely from Datadog. Datadog updates your functions with the IAM role created by the CloudFormation stack, and deploys no compute into your account.
- **[Remote instrumentation][9]** deploys a Datadog instrumenter function, `datadog-remote-instrumenter`, into your own account. That function applies the instrumentation and keeps it in place.

Both add the same Datadog Lambda extension and tracing layers, and both restore instrumentation that is changed outside of Datadog. They differ in where the work runs, how functions are selected, and what you install.

| Aspect | Instrumentation through the AWS integration | Remote instrumentation |
|---|---|---|
| Workloads | Amazon EC2 instances and AWS Lambda functions | AWS Lambda functions |
| What runs in your account | No Datadog compute. Datadog calls the AWS APIs with the IAM role created by the CloudFormation stack | The instrumenter Lambda function |
| Scope of setup | One CloudFormation stack per AWS account | One CloudFormation stack per account and region |
| Selecting functions | You choose the functions a rule covers, and review the matched set before saving | You write targeting rules on function names and tags, with logical operators |
| Functions created later | Not instrumented. The covered set is fixed when you save the rule | Instrumented automatically when they match your targeting rules |
| Layer versions | Datadog selects and updates them | You set them, and they stay fixed until you change them |
| How instrumented functions authenticate | [Workload Identity Federation][16], with no Datadog API key on the function | A Datadog API key with Remote Configuration enabled |
| Datadog permissions | Hosts Read and Agent Install | Serverless AWS Instrumentation Read and Write |
| Removing instrumentation | Uninstall from Datadog | Delete the CloudFormation stack in that region |

Both products deploy a CloudFormation stack in your account. The stack for remote instrumentation also creates a CloudTrail and supporting resources. For what the stack in this guide creates, including the EventBridge resources that send change events to Datadog, see [How Datadog instrumentation through the AWS integration works][6].

Use instrumentation through the AWS integration to instrument both EC2 instances and Lambda functions from one place. It also suits you if you want no additional compute running in your account.

Use remote instrumentation when functions created later must be instrumented as they appear. It also suits you if you want to control the layer versions applied to your functions.

## Prerequisites

For all workloads, confirm the following:

- **CloudFormation access**: You can approve a CloudFormation stack in the target AWS account. Instrumentation deploys a stack in your account, so you (or a teammate) need permission to review and create it. For the required permissions and why they're needed, see the [Required AWS permissions](#required-aws-permissions) section.
- **Datadog permissions**: Viewing instrumentation rules requires the **Hosts Read** permission. Creating, editing, or deleting rules requires the **Agent Install** permission.

### Amazon EC2 instances

- **SSM Agent**: The [AWS Systems Manager (SSM) Agent][2] must already be present on the target instances. Datadog installs the Agent through SSM and can't install the SSM Agent for you, so instances built from custom AMIs without the SSM Agent are not eligible. Datadog flags these instances so you can address them.
- **Supported platforms**: Linux (x86_64 and arm64) and Windows (x86_64). macOS and Windows on arm64 are not supported.

### AWS Lambda functions

- **Resource collection**: [Resource collection][10] must be enabled on the AWS integration. Datadog uses it to list your functions and preview which ones a rule matches.
- **AWS partition**: The commercial `aws` partition only. Functions in AWS GovCloud or the AWS China partitions are not supported, because Lambda instrumentation authenticates through [Workload Identity Federation][16], which those partitions don't support.
- **Package type**: Zip functions only. Container image functions are not supported, because Datadog instrumentation is distributed as Lambda layers, which container image functions can't use.
- **Architecture**: `x86_64` or `arm64`. A function must report a single architecture.
- **Layer count**: AWS limits a function to five layers. Datadog adds up to two, so a function that already carries four or more layers is not eligible.
- **Supported runtimes**:

  | Runtime | Versions |
  |---|---|
  | Node.js | 16.x, 18.x, 20.x, 22.x, 24.x |
  | Python | 3.8, 3.9, 3.10, 3.11, 3.12, 3.13, 3.14 |
  | Ruby | 3.2, 3.3, 3.4, 4.0 |
  | Java | 8, 8 (Amazon Linux 2), 11, 17, 21, 25 |
  | .NET | 6, 8, 10 |
  | OS-only (`provided.al2`, `provided.al2023`) | Datadog adds the extension layer only, with no tracing layer |

Datadog marks any function that doesn't meet these conditions as ineligible in the rule preview, so you can see what is excluded before you apply a rule.

## Required AWS permissions

{{% aws-agent-installation %}}

The following sections list the permissions for each workload. The CloudFormation stack grants only the permissions for the workloads you selected.

### Change notification permissions

These permissions apply to any workload that reacts to AWS resource changes:

| Permission | Why Datadog needs it |
|---|---|
| `events:PutRule`, `events:PutTargets`, `events:DescribeRule`, `events:ListTargetsByRule`, `events:RemoveTargets`, `events:DeleteRule` | Set up the change notifications that let Datadog react to resource changes |
| `iam:GetRole`, `iam:PassRole` | Read and pass the EventBridge cross-region role. Both are restricted to the `datadog-eventbridge-cross-region-role` role, and `iam:PassRole` is further restricted to the EventBridge service |

### Amazon EC2 permissions

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

`iam:CreateRole` and `iam:PassRole` are the most sensitive grants. `iam:CreateRole` is restricted to role names matching `datadog-ec2-instrumenter/datadog-ssm-*` in your account, and `iam:PassRole` is further restricted to the Amazon EC2 service.

### AWS Lambda permissions

| Permission | Why Datadog needs it |
|---|---|
| `lambda:ListFunctions` | Find the functions in your account and region |
| `cloudfront:ListDistributions` | Identify Lambda@Edge functions so Datadog skips them |
| `lambda:GetFunctionConfiguration`, `lambda:ListTags` | Read a function's configuration and tags to check which functions match your rule |
| `lambda:UpdateFunctionConfiguration` | Add the Datadog layers and environment variables, and remove them on uninstall |
| `lambda:GetLayerVersion` | AWS reauthorizes every layer submitted during a function update, including your own unchanged layers |

Lambda instrumentation needs no Secrets Manager, Systems Manager, or IAM write permissions. Function reads and updates are restricted to Lambda functions in your own account.

## How it works

Instrumentation is based on an **instrumentation rule**: an AWS account paired with a query that describes which resources to cover. Datadog resolves the query into the set of covered resources, instruments each one inside your own account, and keeps them instrumented:

1. You select the resources to cover, or opt in to all eligible resources.
1. Datadog resolves your selection into a set of covered resources and records it.
1. Datadog instruments each covered resource: on EC2, by installing the Agent through AWS Systems Manager; on Lambda, by adding the Datadog layers and environment variables to the function.
1. Datadog keeps the covered resources instrumented, reinstalling instrumentation that goes missing and retrying anything that failed. Resources created later aren't added until you update the rule.

You approve one CloudFormation stack, one time, during initial setup. After that, instrumentation runs automatically from Datadog, with no new CloudFormation template to launch each time.

For the full technical and security details, including the AWS resources Datadog creates, the instrumentation mechanism, and the reconciliation model, see [How Datadog instrumentation through the AWS integration works][6].

{{< img src="integrations/amazon_web_services/aws-agent-installation-how-it-works.png" alt="Flowchart of the AWS Agent installation process, showing which steps happen in Datadog and which run inside your AWS account." style="width:70%;" >}}

<!-- TODO(DOCS-14545): the "How it works" diagram shows the EC2 flow only. Add a Lambda equivalent (or a workload-agnostic version) before publish. -->

## Install

You can start instrumentation from two entry points, depending on how much control you want over which resources are instrumented:

- **AWS integration setup (instrument all eligible resources)**: When you [set up the AWS integration][5], enable the instrumentation toggle on the [AWS integration page][7], shown alongside log and resource collection, then select the workloads you want. Datadog instruments all eligible resources for those workloads.
- **Fleet Automation (instrument specific resources)**: Open the [AWS Install Agents page][8] at any time to select the specific resources you want.

<!-- TODO(DOCS-14545): per AWS team, surfacing the install flow in the main AWS setup flow for non-first-time users is still rolling out; confirm it's live before publish. -->

The instrumentation toggle appears during setup, with a workload selector listing EC2 Instances, Lambda Functions, and EKS Clusters:

{{< img src="integrations/amazon_web_services/aws-agent-installation-setup-toggle.png" alt="The Install the Datadog Agent step in AWS setup, with the install toggle enabled and the Hosts (EC2) workload toggle turned on." style="width:80%;" >}}

<!-- TODO(DOCS-14545): the setup-toggle screenshot predates the Lambda workload. Recapture it showing EC2 Instances, Lambda Functions, and EKS Clusters (Coming Soon) before publish. -->

To install from the AWS Install Agents page:

1. Select the workload you want to instrument: **EC2 Instances** or **Lambda Functions**.
1. Opt in to all eligible resources, or select specific resources from the resource list. For Lambda, you can narrow the list by region, runtime, and memory size.
1. Review the preview of matching resources. Resources Datadog can't instrument appear as ineligible, with the reason.
1. Review the generated CloudFormation stack, then continue to AWS and create it. Datadog prompts you for this only once.
1. Return to Datadog. Instrumentation proceeds automatically, and Datadog reports progress as resources are instrumented.

<!-- TODO(DOCS-14545): add resource-selection / Manage Agents page screenshot (AWS Install Agents page) — setup-toggle screenshot added. -->

## What Datadog changes on a Lambda function

Datadog applies one `UpdateFunctionConfiguration` call per function. That call:

- Adds the Datadog extension layer, and the Datadog tracing layer matching the function's runtime and architecture. OS-only runtimes receive the extension layer alone.
- Sets `DD_SITE` and `DD_ORG_UUID`, which the extension uses to send telemetry to your Datadog organization.
- For Node.js and Python, redirects the function handler to the Datadog handler and moves your original handler into `DD_LAMBDA_HANDLER`.
- For Java and .NET, sets `AWS_LAMBDA_EXEC_WRAPPER` to `/opt/datadog_wrapper`.

Your existing layers, environment variables, and handler are preserved. Datadog records exactly what it changed, so uninstalling restores your original configuration.

**No Datadog API key is written into your function.** The extension authenticates with the function's own execution role through [Workload Identity Federation][16], so there is no Datadog credential stored in your account for Lambda instrumentation. Datadog sets up that authorization for you; there is nothing to configure.

Datadog does not change your function code, memory size, timeout, VPC configuration, or any other setting.

Datadog preserves environment variables you set yourself, so you can tune what the extension collects with the standard Datadog environment variables. For the full list, see [Configure Serverless Monitoring for AWS Lambda][14]. For what instrumentation collects and the Lambda monitoring features it enables, see [Serverless Monitoring for AWS Lambda][13].

## Verify the installation

After instrumentation completes:

- **EC2**: The newly installed Agents appear in the [Infrastructure List][3] and on the host map. Fleet Automation lists the same Agents in the Fleet View.
- **Lambda**: The instrumented functions appear on the [Serverless][11] page, and their traces appear in [APM][12]. If a function is instrumented but its telemetry doesn't arrive, see [Troubleshoot AWS Lambda Monitoring][15].

<!-- TODO(DOCS-14545): add expected time-to-data once confirmed. -->

## Manage instrumented resources

Use the [AWS Install Agents page][8] in Fleet Automation to manage the resources you've instrumented through the AWS integration.

From this page, you can:

- View the instrumented resources and their status.
- Instrument new resources in your AWS environment.
- Remove instrumentation from resources you no longer want to monitor.

The rule is the source of truth. To stop coverage, update the rule. If you remove instrumentation from a covered resource yourself, Datadog restores it on the next reconciliation. Manage Agent configuration and version upgrades through [Fleet Automation][4].

## Uninstall

To remove instrumentation, remove resources from a rule, edit the rule's query, or delete the rule. Deleting a rule removes instrumentation from everything the rule covered.

- **EC2**: Datadog removes the Datadog Agent and any IAM role or instance profile it created for that instance.
- **Lambda**: Datadog removes the layers it added and restores the environment variables and handler the function had beforehand. Layers and environment variables you added yourself are left in place.

## Troubleshooting

### The SSM Agent is not present on an EC2 instance

Agent installation on EC2 relies on the AWS Systems Manager (SSM) Agent, which Datadog can't install for you. Datadog flags any instance that lacks it as ineligible, including those built from custom AMIs. Install the SSM Agent on the instance, then retry. See [Working with SSM Agent][2] in the AWS documentation.

### A permission or IAM error occurs

If instrumentation can't complete because of missing permissions, Datadog shows a notification linking to the CloudFormation resource that needs the new permission. Update your existing stack to grant the [required permissions](#required-aws-permissions). You don't need to create a new stack.

### A Lambda function is skipped as already instrumented

Datadog skips any function that carries Datadog layers, a Datadog handler, or Datadog environment variables that Datadog did not apply. This prevents layer and configuration conflicts. To manage the function from the AWS integration instead, remove your existing Datadog instrumentation from it, then wait for the next reconciliation.

Functions managed by [remote instrumentation][9] are also skipped, and Datadog tells you which of the two applies. A function can be managed by only one Datadog instrumentation product.

### A Lambda function exceeds the layer limit

AWS limits a function to five layers, and Datadog adds up to two. When a function already carries enough layers that instrumentation would exceed the limit, Datadog reports it and stops rather than retrying. Remove a layer from the function to make room, then wait for the next reconciliation.

### A Lambda function uses a non-Datadog execution wrapper

Java and .NET instrumentation sets `AWS_LAMBDA_EXEC_WRAPPER`. When a function already sets that variable to something other than the Datadog wrapper, Datadog skips the function rather than overwrite your wrapper.

### A Lambda function appears as ineligible

Datadog marks a function ineligible when it doesn't meet the [Lambda prerequisites](#aws-lambda-functions). The most common reasons are a container image package type, an unsupported runtime or architecture, a function outside the commercial `aws` partition, and Lambda@Edge functions. Lambda@Edge replicas and the functions they replicate are both excluded.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://docs.aws.amazon.com/systems-manager/latest/userguide/ssm-agent.html
[3]: https://app.datadoghq.com/infrastructure
[4]: https://docs.datadoghq.com/agent/fleet_automation/
[5]: https://docs.datadoghq.com/getting_started/integrations/aws/
[6]: https://docs.datadoghq.com/integrations/guide/aws-agent-installation-technical-reference/
[7]: https://app.datadoghq.com/integrations/amazon-web-services
[8]: https://app.datadoghq.com/fleet/install-agent/latest?platform=aws
[9]: https://docs.datadoghq.com/serverless/aws_lambda/remote_instrumentation/
[10]: https://docs.datadoghq.com/integrations/amazon_web_services/#resource-collection
[11]: https://app.datadoghq.com/functions
[12]: https://app.datadoghq.com/apm/traces
[13]: https://docs.datadoghq.com/serverless/aws_lambda/
[14]: https://docs.datadoghq.com/serverless/aws_lambda/configuration/
[15]: https://docs.datadoghq.com/serverless/aws_lambda/troubleshooting/
[16]: https://docs.datadoghq.com/account_management/workload_identity_federation/
