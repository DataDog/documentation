---
title: Using AWS Integration in Workflows
description: Use Datadog's built-in AWS Integration to run Workflows Read actions without additional configuration in AWS.
disable_toc: false
further_reading:
- link: "/actions/connections/"
  tag: "Documentation"
  text: "Find out more about connection credentials"
aliases:
---

## Overview

Datadog Workflows and Actions can now use your existing **Datadog AWS integration credentials** to perform read-only operations in your AWS environment.
This eliminates the need to manually configure a separate AWS Connection, simplifying onboarding and allowing immediate access to your AWS data.

When configured, Datadog uses the same AWS credentials that power integrations such as **AWS EC2**, **RDS**, and **S3 monitoring**, to securely execute supported read-only actions.

<div class="alert alert-info">
This feature is limited to <strong>read-only AWS actions</strong> and integrations configured with "Role Delegation" access type. It also requires that your Datadog AWS integration role has the appropriate permissions defined in AWS. All actions under the <a href="https://docs.aws.amazon.com/aws-managed-policy/latest/reference/ReadOnlyAccess.html" target="_blank">ReadOnlyAccess permissions</a> should work, as long as the IAM role used by the AWS Integration has been granted the permissions needed and that an Action exists.
</div>

---

## Supported Use Cases

Examples include:

- Listing or describing AWS resources (for example, `ListECSClusters`, `DescribeInstances`, `GetBucketPolicy`)
- Reading configurations or metadata from AWS services (for example, `GetFunctionConfiguration`, `ListSecrets`)
- Inspecting resource tags, metrics, or logs

### Requirements

To successfully execute actions with this integration:

- The **AWS Integration Role** configured in Datadog must have permissions in AWS needed for the operations desired.
- The selected action must be read-only — write or mutating actions (such as `Put*`, `Delete*`, `Update*`) are not supported and will fail when running.
- The user, user's team, or user's org **must** have been given explicit 'Executor' permission on the AWS Integration in Datadog (see next section for details).

---

## Configuration

### 1. Enable the AWS Integration

If you haven’t already configured the AWS Integration, follow the [AWS Integration setup guide](https://docs.datadoghq.com/integrations/amazon_web_services/#setup).

Make sure that:
- The AWS integration is active for your target AWS Account.
- The IAM Role associated with the integration includes the permissions for the operations.
- The integration is configured with the **Executor** permission in the AWS integration tile in Datadog for fine-grained control.

<image of integration to click on "Set permissions">
<image of Grace modal with configured user acces>

### 2. Select the Integration in Your Action

When creating or editing an Action within **Workflows**, you can now choose your existing AWS integration as the credential source.

1. Open your Workflow in the Datadog UI.
2. Add an AWS Action (for example, **List ECS Clusters**).
3. In the **Connection** dropdown, select **Existing AWS Integration**.
4. Choose the AWS Account configured in your Datadog integration.
5. Save your Workflow.
