---
title: Cost Optimization Automation
description: Set up automations that continuously act on Cloud Cost Recommendations to clean up unused or wasteful cloud resources on a recurring schedule.
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Cloud Cost Management"
- link: "/cloud_cost_management/recommendations/"
  tag: "Documentation"
  text: "Cloud Cost Recommendations"
- link: "/service_management/workflows/"
  tag: "Documentation"
  text: "Workflow Automation"

---

## Overview

Cost Optimization Automation lets you continuously act on [Cloud Cost Recommendations][1] without manual cleanup. You define an **automation**, scope it to the accounts, regions, and resources you want, and Datadog executes the recommended action on a recurring schedule.

Each automation targets a single recommendation type and includes the following:

- A schedule (weekly, biweekly, every 30 days, or every 90 days)
- A scope (AWS account, region, tags, and a maximum number of resources per run)
- Safeguards specific to the recommendation type (for example, a pre-deletion snapshot)
- An optional human approval step routed through Slack or Microsoft Teams

Recommendations acted on by an automation move to {{< ui >}}Completed{{< /ui >}} automatically and contribute to realized savings on the [Cloud Cost Recommendations][1] page.

Cost Optimization Automation is different from the 1-click Workflow Automation actions described in [Recommendation action-taking][6]. 1-click actions execute a single change on demand from the recommendation side panel. Automations execute on a recurring schedule and act on every matching resource in scope.

## Supported recommendation types

Cost Optimization Automation supports the following AWS recommendation types:

| Recommendation type |
|---------------------|
| Terminate unattached EBS volume |
| Transition S3 Standard objects to Amazon S3 Intelligent-Tiering |
| Terminate unused RDS instance |
| Delete extra on-demand backups (DynamoDB) |
| Set CloudWatch logs retention policy |
| Delete old EBS snapshots |

## Prerequisites

- An AWS account configured with [Cloud Cost Recommendations][7] and actively generating recommendations.
- The **Cloud Cost Management - Cloud Cost Management Write** permission to create or edit an automation.
- A [Workflow Automation connection][3] to each AWS account you want an automation to act on. Datadog uses this connection to assume an IAM role with the write permissions needed for the recommended action. Datadog grants only the permissions required for the selected recommendation type.
- (Optional) A Slack or Microsoft Teams connection if you want approval messages routed to a channel.

## Set up an automation

Go to [{{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Optimize{{< /ui >}} > {{< ui >}}Automations{{< /ui >}}][4] and click {{< ui >}}Set Up New Automation{{< /ui >}}.

### Step 1: Choose a recommendation type

Select the recommendation type the automation targets. Datadog displays the AWS accounts that contain applicable resources, the estimated monthly savings, and the number of resources that match.

### Step 2: Connect an AWS account

Select the AWS account the automation executes against. To act across multiple accounts with one automation, select a [connection group][5].

If the selected account does not have a connection with the required write permissions, follow the in-product wizard to create one.

### Step 3: Define the scope

Narrow what the automation acts on:

- **Filters**: Restrict the automation to resources matching tags, regions, or other recommendation attributes. For example, scope an automation to `environment:sandbox` to limit it to non-production resources.
- **Max resources per run**: Cap how many resources the automation acts on during a single execution. The automation prioritizes resources by highest potential savings.

### Step 4: Set the execution schedule

Choose how often the automation runs:

- Weekly
- Biweekly
- Every 30 days
- Every 90 days

You can also specify the day of the week and the time of day the automation executes.

### Step 5: Configure safeguards and approval

Each recommendation type has built-in safeguards. For example, the **Terminate Unattached EBS Volume** automation takes an EBS snapshot before deleting each volume. Review the safeguards listed in the automation form and toggle the ones that are optional for your environment.

To require human review before execution:

1. Turn on {{< ui >}}Require approval before execution{{< /ui >}}.
2. Select a Slack or Microsoft Teams channel to receive the approval message.

When approval is required, Datadog posts a summary of the resources targeted on each run. The automation acts only after a user approves the request in the channel.

### Step 6: Save the automation

Click {{< ui >}}Save Automation{{< /ui >}}. The automation is created in a paused state. Toggle it to {{< ui >}}Active{{< /ui >}} to start the schedule.

## Manage automations

The {{< ui >}}Automations{{< /ui >}} page lists every automation in your organization, grouped by recommendation type. From this page you can:

- Pause or resume an automation
- Edit an automation's scope, schedule, or safeguards
- Rename an automation
- Delete an automation

## Execution history

Open an automation and select the {{< ui >}}Activity{{< /ui >}} tab to see past and upcoming executions. Each execution record includes:

- Execution time and status (success, failure, or pending approval)
- The resources acted on
- Estimated savings realized by the run
- A link to the underlying Workflow Automation execution

Use the filters at the top of the {{< ui >}}Activity{{< /ui >}} view to find executions by status, recommendation type, or date range.

## Change history

Datadog records every create, edit, enable, disable, and delete event for an automation. Open an automation and select the {{< ui >}}History{{< /ui >}} tab to see who made each change and what changed. Use this view to audit changes or roll back to a previous configuration.

## Recommendation status

When an automation successfully acts on a resource, the corresponding recommendation moves to {{< ui >}}Completed{{< /ui >}} and is labeled as completed by automation. Its savings count toward the realized savings totals on the [Cloud Cost Recommendations][1] page.

If you set a recommendation to {{< ui >}}Dismissed{{< /ui >}}, automations skip it on future runs until the dismissal expires.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /cloud_cost_management/recommendations/
[3]: /service_management/workflows/connections/
[4]: https://app.datadoghq.com/cost/optimize/automations
[5]: /service_management/workflows/connections/#connection-groups
[6]: /cloud_cost_management/recommendations/#recommendation-action-taking
[7]: /cloud_cost_management/recommendations/#prerequisites
