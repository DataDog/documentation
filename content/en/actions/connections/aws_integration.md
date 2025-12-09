---
title: Use the AWS Integration in Actions
description: Use Datadog's built-in AWS Integration to run Workflows read Actions without additional configuration in AWS.
disable_toc: false
further_reading:
- link: "/actions/connections/"
  tag: "Documentation"
  text: "Find out more about connection credentials"
---

## Overview

Datadog Workflows and Actions can use your existing Datadog AWS integration credentials to perform read-only operations in your AWS environment.
This eliminates the need to manually configure a separate AWS Connection, simplifying onboarding and allowing immediate access to your AWS data.

When configured, Datadog uses the same AWS credentials that power integrations such as Amazon EC2, RDS, and S3 monitoring to securely execute supported read-only actions.

There are two ways to execute AWS actions in your environment:

- Use the Datadog AWS Integration to execute **Read-only** actions allowed under the [`ViewOnlyAccess` permissions][1] policy.
- Or, use a custom AWS Connection linked to a **dedicated AWS IAM Role** with specific permissions, for operations not included in the [`ViewOnlyAccess` permissions][1].

This guide walks through how to use the Datadog AWS Integration to execute **Read-only** actions allowed under the [ViewOnlyAccess permissions policy][1]. To execute other AWS actions, you need to [create a custom Connection][2] instead.

## Supported use cases

Examples include:

- Listing or describing AWS resources (such as `ListECSClusters`, `DescribeInstances`, and `GetBucketPolicy`)
- Reading configurations or metadata from AWS services (such as `GetFunctionConfiguration`, and `ListSecrets`)
- Inspecting resource tags, metrics, or logs

For other actions, use a [dedicated Connection][2] instead.

### Requirements

To successfully execute actions with this integration:

- The **AWS Integration IAM Role** configured for Role Delegation must have the permissions required for the operations desired (such as  `ecs:ListClusters`).
- The selected action must be read-only. Write or mutating actions (such as `Put*`, `Delete*`, and `Update*`) are not supported and fail when running.
- The user, user's team, or user's org **must** have been given explicit 'Executor' permission on the AWS Integration in Datadog (more details [below][3]).

<div class="alert alert-info">
Executing actions using the Datadog AWS Integration is only available for users that have set up the Datadog AWS Integration through <a href="/integrations/guide/aws-manual-setup/?tab=roledelegation" target="_blank">role delegation</a>. Additionally, while operations under the <a href="https://docs.aws.amazon.com/aws-managed-policy/latest/reference/ViewOnlyAccess.html" target="_blank">ViewOnlyAccess permissions</a> are allowed, the IAM Role associated with the Datadog AWS Integration may not have the permissions needed. Make sure that the role has the correct permissions if you encounter issues.
</div>


## Configuration

### 1. Configure AWS Integration permissions

Make sure that:
- The AWS integration is **active** for your target **AWS Account** and no integration issues are detected by Datadog.
- The **IAM Role** associated with the integration has the permissions for the operations (for example `ecs:ListClusters`).
- The integration is configured with the **Executor** permission in the Datadog AWS Integration configuration page (see below).

To configure the **Executor** permission in Datadog AWS Integration: 
- In Datadog, navigate to **Integration** then open the **Amazon Web Services** configuration page.
- Select the AWS Account connected to Datadog that you want to run actions with. If you haven't already configured the AWS Integration, follow the [AWS Integration setup guide](https://docs.datadoghq.com/integrations/amazon_web_services/#setup).
- Click on **Set Permissions**:

{{< img src="service_management/aws_integration_tile_set_permission.png" alt="An integration on the AWS Integration configuration where the Set permission button is usable" style="width:100%;" >}}

In the Permissions modal, select a user, team, or organization to be granted **Executor** permissions:

{{< img src="service_management/aws_integration_tile_permission_modal.png" alt="A permission modal with Executor permission highlighted" style="width:100%;" >}}

<div class="alert alert-info">
If instead of a <b>Set Permissions</b> button, you have a <b>Request Edit Access</b> button, you need to request the AWS Configuration Edit permission from an Admin in your organization.
</div>

### 2. Add the integration to an action

When creating or editing an Action within **Workflows**, you can choose your existing AWS integration in the Connections field.

1. Open your Workflow in the Datadog UI.
2. Add an AWS Action (for example, **List ECS Clusters**).
3. In the **Connection** dropdown, select **Existing AWS Integration**.
4. Choose the AWS Account configured in your Datadog integration.

{{< img src="service_management/aws_integration_connection_dropdown.png" alt="A Workflow Step configuration with a AWS Account: 0123456789101 Connection option" style="width:100%;" >}}

