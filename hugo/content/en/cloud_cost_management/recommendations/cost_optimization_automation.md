---
title: Cost Optimization Automations
description: Set up automations that continuously act on Cloud Cost Recommendations to clean up unused or wasteful cloud resources on a recurring schedule.
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Cloud Cost Management"
- link: "/cloud_cost_management/recommendations/"
  tag: "Documentation"
  text: "Cloud Cost Recommendations"
- link: "/cloud_cost_management/recommendations/automated_notifications/"
  tag: "Documentation"
  text: "Notifications"
- link: "/actions/workflows/"
  tag: "Documentation"
  text: "Workflow Automation"

---

## Overview

The {{< ui >}}Remediation{{< /ui >}} tab lets you continuously act on [Cloud Cost Recommendations][1] without manual cleanup. You define an **automation**, scope it to the accounts, regions, and resources you want, and Datadog executes the recommended action on a recurring schedule. Each run can require human approval in Slack or Microsoft Teams before Datadog makes any changes, so your team stays in control of every change.

Each automation targets a single recommendation type and includes the following:

- A schedule (weekly, biweekly, every 30 days, or every 90 days)
- A scope (account, region, tags, and a maximum number of resources per run)
- Safeguards specific to the recommendation type (for example, a pre-deletion snapshot)
- An optional human approval step routed through Slack or Microsoft Teams

Recommendations acted on by an automation move to {{< ui >}}Completed{{< /ui >}} automatically and contribute to realized savings on the [Cloud Cost Recommendations][1] page.

Remediation automations are different from the 1-click Workflow Automation actions described in [Recommendation action-taking][2]. 1-click actions execute a single change on demand from the recommendation side panel. Automations execute on a recurring schedule and act on every matching resource in scope.

Remediation automations are also different from [Notifications][8], which send a recurring Slack summary of matching recommendations but don't take any action.

**Note**: Remediation automations use Datadog Workflows and incur additional costs. For detailed pricing information, see the [Workflow Automation pricing page][3].

## Supported recommendation types

The {{< ui >}}Remediation{{< /ui >}} tab supports the following recommendation types:

| Provider | Recommendation type | Built-in safeguards |
|----------|---------------------|---------------------|
| AWS | Delete unattached EBS volume | Optional: takes an EBS snapshot before each volume is deleted. |
| AWS | Migrate EBS volume from gp2 to gp3 | Reversible, in-place migration with no data loss. |
| AWS | Delete unused EBS snapshots | Snapshots referenced by an AMI are skipped. |
| AWS | Delete extra on-demand backups (DynamoDB) | The two most recent backups are preserved on every run. |
| AWS | Migrate DynamoDB table to Infrequent Access table class | Reversible. The table class can be changed back at any time. |
| AWS | Delete unused DynamoDB table | A backup is taken before each table is deleted. |
| AWS | Set CloudWatch logs retention policy | Reversible. The retention period can be adjusted or removed at any time. |
| AWS | Delete unused RDS instance | A final RDS snapshot is taken before each instance is deleted. |
| AWS | Delete unused NAT gateway | None. Deletion is irreversible. |
| AWS | Transition S3 Standard objects to Amazon S3 Intelligent-Tiering | Existing lifecycle rules are preserved rather than overwritten. |
| AWS | Delete unused EC2 instance | Optional: creates an AMI before each instance is deleted. |
| AWS | Delete unused Redshift cluster | A final snapshot is taken before each cluster is deleted. |
| GCP | Delete unattached Compute Engine disk | Optional: takes a snapshot before each disk is deleted. |
| GCP | Enable Autoclass on a Cloud Storage bucket | Reversible. Autoclass can be disabled at any time. |
| Azure | Delete unattached managed disk | Optional: takes a snapshot before each disk is deleted. |
| Azure | Delete unused SQL database | None. Deletion is irreversible. |

Safeguards marked "Optional" are enabled by default and can be turned off in the automation form. All other listed safeguards are always applied and can't be disabled.

## Prerequisites

- An AWS, GCP, or Azure account configured with [Cloud Cost Recommendations][4] and actively generating recommendations.
- The **Cloud Cost Management - Cloud Cost Management Write** permission to create or edit an automation.
- A connection to each account you want an automation to act on, set up from {{< ui >}}Manage Connections{{< /ui >}} on the {{< ui >}}Automations{{< /ui >}} page. Datadog uses this connection to assume a role with the write permissions needed for the recommended action, and grants only the permissions required for the selected recommendation type. To act across multiple accounts with one automation, create a [connection group][7].
- (Optional) A Slack or Microsoft Teams connection if you want approval messages routed to a channel.

## Set up an automation

To set up an automation on a recurring schedule for a recommendation type:

1. Navigate to [{{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Optimize{{< /ui >}} > {{< ui >}}Automations{{< /ui >}}][6].
1. Select the {{< ui >}}Remediation{{< /ui >}} tab.
1. On the left side of the page, select the recommendation type.
1. Click **Create New Automation**.
1. In the {{< ui >}}Connection{{< /ui >}} dropdown menu, select a connection or connection group configured in [{{< ui >}}Manage Connections{{< /ui >}}][5].
1. In the {{< ui >}}Define scope{{< /ui >}} section:
    1. Enter tags to restrict the automation to resources matching those tags, such as `env`, `service`, and `team`.
    1. Enter the maximum resources per run to cap how many resources the automation acts on during a single execution. The automation prioritizes resources by highest potential savings.
1. In the {{< ui >}}Set schedule{{< /ui >}} section, select the automation frequency and execution time.
1. (Optional) Enable the {{< ui >}}Require approval before execution{{< /ui >}} toggle to require human review before execution. If enabled, select {{< ui >}}Slack{{< /ui >}} or {{< ui >}}Microsoft Teams{{< /ui >}}, and fill out the channel notification fields. See [Safeguards](#safeguards).
1. Enter a name for the automation.
1. Click {{< ui >}}Save Automation{{< /ui >}}.

### Safeguards

Each recommendation type has built-in safeguards. For example, the **Delete Unattached EBS Volume** automation takes an EBS snapshot before deleting each volume. Review the safeguards listed in the automation form and toggle the ones that are optional for your environment.

If {{< ui >}}Require approval before execution{{< /ui >}} is enabled in the [automation setup](#set-up-an-automation), Datadog posts in the designated channel a summary of the resources targeted on each run. The automation only runs after a user approves the request in the channel.

## Manage automations

The {{< ui >}}Remediation{{< /ui >}} tab lists every automation (labeled as a **policy** in this view) in your organization, grouped by recommendation type. Use the {{< ui >}}Provider{{< /ui >}}, {{< ui >}}Resource Type{{< /ui >}}, and {{< ui >}}Recommendation Type{{< /ui >}} filters at the top of the page to narrow the list. From this page you can:

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
[3]: https://www.datadoghq.com/pricing/?product=workflow-automation#products
[4]: /cloud_cost_management/recommendations/#prerequisites
[5]: /actions/connections/
[6]: https://app.datadoghq.com/cost/optimize/automations
[7]: /actions/connections/#connection-groups
[8]: /cloud_cost_management/recommendations/automated_notifications/
