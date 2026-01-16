---
title: Track workflows
description: Monitor workflow activity, metrics, and costs using dashboards, audit trails, event management, and usage attribution.
disable_toc: false
aliases:
- /service_management/workflows/track
algolia:
  tags: ['workflow', 'workflows', 'workflow automation']
further_reading:
- link: "/service_management/workflows/build"
  tag: "Documentation"
  text: "Build workflows"
- link: "/account_management/audit_trail/"
  tag: "Documentation"
  text: "Datadog Audit Trail"
- link: "/account_management/billing/usage_attribution/"
  tag: "Documentation"
  text: "Usage Attribution"
---

This page explains how to track different kinds of workflow activity and workflow costs.

## Out-of-the-box dashboard

The Workflows Overview dashboard provides a high-level overview of your Datadog workflows and executions. To find the dashboard, go to your [Dashboard list][2] and search for **Workflows Overview**.

{{< img src="service_management/workflows/workflows-dashboard.png" alt="The Workflows Overview dashboard" style="width:80%;" >}}


## View workflow edits and runs in Audit Trail

You can view workflow edits and runs using Audit Trail.

For example, to see who edited a workflow:

1. From your workflow, click the <i class="icon-cog-2"></i> **(gear)** in the upper right corner and click **View audit events**.<br>An Audit Trail search filtered to your workflow opens.
1. In the left, under the **Core** filters, expand **Action**.
1. Hover over **Modified** and click **Only** to filter the results to show only workflow edits.<br>The **User ID** column displays the username of the person who performed each edit.


## Notify about runs

See [Workflow notifications][3] for instructions on using built-in workflow notifications.


## Track Workflow metrics with a Datadog monitor

You can use Datadog monitors to track various Workflow metrics.

The list of available metrics is:

| Metric | Description |
| ------ | ----------- |
| `datadog.workflows.count`                      | Number of non-deleted workflows.                       |
| `datadog.workflows.executions.started`         | Number of workflow instances that have started.   |
| `datadog.workflows.executions.completed`       | Number of workflow instances that have completed.      |
| `datadog.workflows.steps.executions.started`   | Number of workflow instance steps that have started.   |
| `datadog.workflows.steps.executions.completed` | Number of workflow instance steps that have completed. |

To create a monitor that tracks whether daily workflow executions exceed a certain threshold, perform the following steps:

1. Go to [New Monitor][4] and select the **Metric** monitor type.
1. Under **Define the metric**, for **a**, fill in `datadog.workflows.executions.started`.
1. _Optionally_, to restrict the monitor to a specific workflow, for **from**, fill in `workflow_id:[WORKFLOW-ID]`, replacing `[WORKFLOW-ID]` with the ID for your workflow.
1. For **Evaluation Details**, use the following values:
    - **Evaluate the**: `sum`
    - **Of the query over the**: `last 1 day`.
1. For **Set alert conditions**, choose **above**, then fill in an alert and warning threshold. For example, you could fill in an **Alert threshold** of `200` and a **Warning threshold** of `150`.
1. Under **Configure notifications & automations**, name your workflow, then fill in message text. For example, you could use message text like the following:

    {{< code-block lang="none" >}}@slack-alert-channel

{{#is_warning}}
Workflow has executed {{warn_threshold}} times in the last day; manual action might be needed to avoid alerting.
{{/is_warning}}
{{#is_alert}}
Workflow has executed {{threshold}} times in the last day, which is our budget threshold for workflows. We should unpublish the workflow to avoid any more automatic executions for the day.
{{/is_alert}}
{{< /code-block >}}
1. Click **Create**.


## View workflow events in Event Manager

You can use [Event Manager][5] to view workflow start and completion events by filtering on `source:workflow_automation`.

To see events for a specific workflow, in the **Search facets** box, search for `workflow.workflow_id`. You can select a specific set of IDs to view only events for those workflows.

You can also filter the output by **Status** to see only `info`, `warn`, or `error` messages.


## Track workflow billing in Usage Attribution

<div class="alert alert-danger">
Usage Attribution is an advanced feature included in the Enterprise plan. For all other plans, contact your account representative or <a href="mailto:success@datadoghq.com">success@datadoghq.com</a> to request this feature.
</div>

To track billing for your workflow executions, perform the following steps:

1. Navigate to the [Usage Attribution][6] page.
1. Under **Products** on the left, search for **Workflow Executions**.
1. Hover over **Workflow Executions** and click **Only** to view usage attribution for only workflows.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<br>Do you have questions or feedback? Join the **#workflows** channel on the [Datadog Community Slack][1].


[1]: https://chat.datadoghq.com/
[2]: https://app.datadoghq.com/dashboard/lists
[3]: /service_management/workflows/build/#workflow-notifications
[4]: https://app.datadoghq.com/monitors/create
[5]: https://app.datadoghq.com/event/explorer?query=source%3Aworkflow_automation
[6]: https://app.datadoghq.com/billing/usage-attribution