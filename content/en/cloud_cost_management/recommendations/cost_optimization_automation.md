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

Cost Optimization Automation lets you continuously act on [Cloud Cost Recommendations][1] without manual cleanup. You define an **automation**, scope it to the accounts, regions, and resources you want, and Datadog executes the recommended action on a recurring schedule. Each run can require human approval in Slack or Microsoft Teams before Datadog makes any changes, so your team stays in control of every change.

Each automation targets a single recommendation type and includes the following:

- A schedule (weekly, biweekly, every 30 days, or every 90 days)
- A scope (AWS account, region, tags, and a maximum number of resources per run)
- Safeguards specific to the recommendation type (for example, a pre-deletion snapshot)
- An optional human approval step routed through Slack or Microsoft Teams

Recommendations acted on by an automation move to {{< ui >}}Completed{{< /ui >}} automatically and contribute to realized savings on the [Cloud Cost Recommendations][1] page.

Cost Optimization Automation is different from the 1-click Workflow Automation actions described in [Recommendation action-taking][2]. 1-click actions execute a single change on demand from the recommendation side panel. Automations execute on a recurring schedule and act on every matching resource in scope.

**Note**: Cost Optimization Automation uses Datadog Workflows and incurs additional costs. For detailed pricing information, see the [Workflow Automation pricing page][8].

## Supported recommendation types

Cost Optimization Automation supports the following AWS recommendation types:

| Recommendation type | Built-in safeguards |
|---------------------|---------------------|
| Terminate unattached EBS volume | An EBS snapshot is taken before each volume is deleted. |
| Transition S3 Standard objects to Amazon S3 Intelligent-Tiering | Reversible. The lifecycle configuration can be removed at any time. |
| Terminate unused RDS instance | A final RDS snapshot is taken before each instance is terminated. |
| Delete extra on-demand backups (DynamoDB) | The two most recent backups are preserved on every run. |
| Set CloudWatch logs retention policy | Reversible. The retention period can be adjusted or removed at any time. |
| Delete old EBS snapshots | Snapshots referenced by an AMI are skipped. |

## Prerequisites

- An AWS account configured with [Cloud Cost Recommendations][3] and actively generating recommendations.
- The **Cloud Cost Management - Cloud Cost Management Write** permission to create or edit an automation.
- A [Workflow Automation connection][4] to each AWS account you want an automation to act on. Datadog uses this connection to assume an IAM role with the write permissions needed for the recommended action. Datadog grants only the permissions required for the selected recommendation type.
- (Optional) A Slack or Microsoft Teams connection if you want approval messages routed to a channel.

## Set up an automation

To set up an automation on a recurring schedule for a recommendation type:

1. Navigate to [{{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Optimize{{< /ui >}} > {{< ui >}}Automations{{< /ui >}}][5].
1. On the left side of the page, select the recommendation type.
1. Click **Create New Automation**.
1. In the {{< ui >}}AWS Connection{{< /ui >}} dropdown menu, select or create a [connection][6]. To act across multiple accounts with one automation, select or create a [connection group][7].
1. In the {{< ui >}}Define scope{{< /ui >}} section:
    1. Enter tags to restrict the automation to resources matching those tags, such as `env`, `service`, and `team`.
    1. Enter the maximum resources per run to cap how many resources the automation acts on during a single execution. The automation prioritizes resources by highest potential savings.
1. In the {{< ui >}}Set schedule{{< /ui >}} section, select the automation frequency and execution time.
1. (Optional) Enable the {{< ui >}}Require approval before execution{{< /ui >}} toggle to require human review before execution. If enabled, select {{< ui >}}Slack{{< /ui >}} or {{< ui >}}Microsoft Teams{{< /ui >}}, and fill out the channel notification fields. See [Safeguards](#safeguards).
1. Enter a name for the automation.
1. Click {{< ui >}}Save Policy{{< /ui >}}.

### Safeguards

Each recommendation type has built-in safeguards. For example, the **Terminate Unattached EBS Volume** automation takes an EBS snapshot before deleting each volume. Review the safeguards listed in the automation form and toggle the ones that are optional for your environment.

If {{< ui >}}Require approval before execution{{< /ui >}} is enabled in the [automation setup](#set-up-an-automation), Datadog posts in the designated channel a summary of the resources targeted on each run. The automation only runs after a user approves the request in the channel.

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

## Version history

Datadog records a new version of an automation each time it's created, edited, enabled, disabled, or deleted. Open an automation and select the {{< ui >}}History{{< /ui >}} tab to see who made each change and what changed. Use this view to audit changes or roll back to a previous version.

## Recommendation status

When an automation successfully acts on a resource, the corresponding recommendation moves to {{< ui >}}Completed{{< /ui >}} and is labeled as completed by automation. Its savings count toward the realized savings totals on the [Cloud Cost Recommendations][1] page.

If you set a recommendation to {{< ui >}}Dismissed{{< /ui >}}, automations skip it on future runs until the dismissal expires.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /cloud_cost_management/recommendations/
[2]: /cloud_cost_management/recommendations/#recommendation-action-taking
[3]: /cloud_cost_management/recommendations/#prerequisites
[4]: /service_management/workflows/connections/
[5]: https://app.datadoghq.com/cost/optimize/automations
[6]: /actions/connections/
[7]: /service_management/workflows/connections/#connection-groups
[8]: https://www.datadoghq.com/pricing/?product=workflow-automation#products
