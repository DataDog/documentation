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
- The user, user's team, or user's org **must** have been given explicit 'Executor' permission on the AWS Integration in Datadog (more details [below](#configuration)).

<div class="alert alert-info">
Executing actions using the Datadog AWS Integration is only available for users that have set up the Datadog AWS Integration through <a href="/integrations/guide/aws-manual-setup/?tab=roledelegation" target="_blank">role delegation</a>. Additionally, while operations under the <a href="https://docs.aws.amazon.com/aws-managed-policy/latest/reference/ViewOnlyAccess.html" target="_blank">ViewOnlyAccess permissions</a> are allowed, the IAM Role associated with the Datadog AWS Integration may not have the permissions needed. Make sure that the role has the correct permissions if you encounter issues.
</div>


## Configuration
  
<div class="alert alert-info">
Before getting started, make sure these conditions have been met: 
<ul>
  <li>The AWS integration is active for your target AWS Account and no integration issues are detected by Datadog. If you haven't set up the AWS integration yet, you can follow the <a href="https://docs.datadoghq.com/integrations/amazon-web-services/#setup" target="_blank">AWS integration setup guide</a>.</li>
  <li>The IAM Role associated with the integration has the permissions for the correct operations (for example <code>ecs:ListClusters</code>).</li>
  <li>You have access to edit the permissions for the AWS account(s) you want to set up. 
</ul>
</div>

### 1. Configure AWS Integration permissions
  
To configure the **Executor** permission for the Datadog AWS Integration:
1. In Datadog, navigate to [**Integrations**][4].
1. Click the **Amazon Web Services** integration.
1. In the left pane, select the AWS Account you want to run actions with. 
1. Click **Set Permissions**.
    - If you see a **Request Edit Access** button instead of a **Set Permissions** button, ask your Datadog organization's admin to add you as an Editor for the AWS account. 
1. Select a user, term, or organization and click **Add**. 
1. Under **People with access**, select the **Executor** permission.
1. Click **Save**.

### 2. Add the integration to an action

1. In [Workflow Automation][5], click the workflow you want to edit.
1. Add an AWS action, such as **List ECS Clusters**.
1. In the configuration pane, click the **Connection** dropdown and scroll to **Existing AWS Integrations**. 
1. Select the AWS Account you configured in step one.
1. Click **Save**.

[1]: https://docs.aws.amazon.com/aws-managed-policy/latest/reference/ViewOnlyAccess.html 
[2]: /actions/connections/?tab=workflowautomation#work-with-connections
[4]: https://app.datadoghq.com/integrations 
[5]: https://app.datadoghq.com/workflow
