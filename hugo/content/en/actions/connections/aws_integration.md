---
title: Integration Connections
description: Use credentials from existing Datadog integrations to authenticate actions in workflows and apps.
disable_toc: false
further_reading:
- link: "/actions/connections/"
  tag: "Documentation"
  text: "Find out more about connection credentials"
---

## Overview

Integration connections allow Datadog Workflows and Actions to use credentials that are already configured in a Datadog integration. This eliminates the need to configure a separate connection for an action and simplifies access to the external service.

## Supported use cases

Integration connections are supported for:

- **ServiceNow**: Use the credentials from an existing ServiceNow integration instance to run ServiceNow actions.
- **AWS**: Use the credentials from an existing AWS integration account to run supported read-only AWS actions. For more information about supported AWS actions and permissions, see [AWS integration connections](#aws-integration-connections).

For other integrations or operations, [create a connection][2].

## Configuration

Before you begin, ensure that the integration is active and that you have access to edit permissions for the integration account or instance you want to use.

The following example configures a ServiceNow integration connection. You can follow the same general process for supported AWS actions, subject to the [additional AWS requirements](#aws-integration-connections).

### 1. Configure integration permissions

To configure the {{< ui >}}Executor{{< /ui >}} permission for a ServiceNow integration instance:

1. In Datadog, navigate to [**Integrations**][4].
1. Click the {{< ui >}}ServiceNow{{< /ui >}} integration.
1. Select the ServiceNow instance that you want to use to run actions.
1. Click {{< ui >}}Set Permissions{{< /ui >}}.
    - If you see a {{< ui >}}Request Edit Access{{< /ui >}} button instead of a {{< ui >}}Set Permissions{{< /ui >}} button, ask your Datadog organization's admin to add you as an Editor for the instance.
1. Select a user, team, or organization and click {{< ui >}}Add{{< /ui >}}.
1. Under {{< ui >}}People with access{{< /ui >}}, select the {{< ui >}}Executor{{< /ui >}} permission.
1. Click {{< ui >}}Save{{< /ui >}}.

### 2. Add the integration to an action

1. In [Workflow Automation][5], click the workflow you want to edit.
1. Add a ServiceNow action.
1. In the configuration pane, click the {{< ui >}}Connection{{< /ui >}} dropdown and scroll to {{< ui >}}Existing ServiceNow Integrations{{< /ui >}}.
1. Select the ServiceNow instance you configured in the previous step.
1. Click {{< ui >}}Save{{< /ui >}}.

## AWS integration connections

Datadog Workflows and Actions can use your existing Datadog AWS integration credentials to perform read-only operations in your AWS environment. Datadog uses the same AWS credentials that power integrations such as Amazon EC2, RDS, and S3 monitoring to securely execute supported read-only actions.

There are two ways to execute AWS actions in your environment:

- Use the Datadog AWS integration to execute read-only actions allowed under the [`ViewOnlyAccess` permissions][1] policy.
- Use a custom AWS connection linked to a dedicated AWS IAM role with specific permissions for operations not included in the [`ViewOnlyAccess` permissions][1].

### Supported AWS actions

Examples include:

- Listing or describing AWS resources, such as `ListECSClusters`, `DescribeInstances`, and `GetBucketPolicy`
- Reading configurations or metadata from AWS services, such as `GetFunctionConfiguration` and `ListSecrets`
- Inspecting resource tags, metrics, or logs

For other AWS actions, use a [dedicated connection][2] instead.

### AWS requirements

To successfully execute actions with an AWS integration connection:

- The AWS integration IAM role configured for role delegation must have the permissions required for the desired operations, such as `ecs:ListClusters`.
- The selected action must be read-only. Write or mutating actions, such as `Put*`, `Delete*`, and `Update*`, are not supported and fail when running.
- The user, team, or organization running the action must have explicit {{< ui >}}Executor{{< /ui >}} permission on the AWS integration account in Datadog.

<div class="alert alert-info">
Executing actions using the Datadog AWS integration is only available for users that have set up the Datadog AWS integration through <a href="/integrations/guide/aws-manual-setup/?tab=roledelegation" target="_blank">role delegation</a>. Additionally, while operations under the <a href="https://docs.aws.amazon.com/aws-managed-policy/latest/reference/ViewOnlyAccess.html" target="_blank">ViewOnlyAccess permissions</a> are allowed, the IAM role associated with the Datadog AWS integration may not have the permissions needed. Make sure that the role has the correct permissions if you encounter issues.
</div>

Before configuring an AWS integration connection, make sure that:

- The AWS integration is active for your target AWS account and Datadog has not detected any integration issues. If you have not set up the AWS integration, follow the [AWS integration setup guide][6].
- The IAM role associated with the integration has the permissions for the required operations, such as `ecs:ListClusters`.
- You have access to edit permissions for the AWS accounts you want to use.

To configure {{< ui >}}Executor{{< /ui >}} permission for an AWS integration account, follow [the configuration steps](#1-configure-integration-permissions), selecting the {{< ui >}}Amazon Web Services{{< /ui >}} integration and the relevant AWS account instead of ServiceNow.

To add the AWS integration to an action:

1. In [Workflow Automation][5], click the workflow you want to edit.
1. Add an AWS action, such as {{< ui >}}List ECS Clusters{{< /ui >}}.
1. In the configuration pane, click the {{< ui >}}Connection{{< /ui >}} dropdown and scroll to {{< ui >}}Existing AWS Integrations{{< /ui >}}.
1. Select the AWS account you configured.
1. Click {{< ui >}}Save{{< /ui >}}.

[1]: https://docs.aws.amazon.com/aws-managed-policy/latest/reference/ViewOnlyAccess.html
[2]: /actions/connections/?tab=workflowautomation#work-with-connections
[4]: https://app.datadoghq.com/integrations
[5]: https://app.datadoghq.com/workflow
[6]: /integrations/amazon-web-services/#setup
