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

The Workflows Overview dashboard provides a high-level overview of your Datadog workflows and executions. To find the dashboard, go to your [Dashboard list][2] and search for {{< ui >}}Workflows Overview{{< /ui >}}.

{{< img src="service_management/workflows/workflows-dashboard.png" alt="The Workflows Overview dashboard" style="width:80%;" >}}


## View workflow edits and runs in Audit Trail

You can view workflow edits and runs using Audit Trail.

For example, to see who edited a workflow:

1. From your workflow, click the <i class="icon-cog-2"></i> **(gear)** in the upper right corner and click {{< ui >}}View audit events{{< /ui >}}.<br>An Audit Trail search filtered to your workflow opens.
1. In the left, under the {{< ui >}}Core{{< /ui >}} filters, expand {{< ui >}}Action{{< /ui >}}.
1. Hover over {{< ui >}}Modified{{< /ui >}} and click {{< ui >}}Only{{< /ui >}} to filter the results to show only workflow edits.<br>The {{< ui >}}User ID{{< /ui >}} column displays the username of the person who performed each edit.


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

1. Go to [New Monitor][4] and select the {{< ui >}}Metric{{< /ui >}} monitor type.
1. Under {{< ui >}}Define the metric{{< /ui >}}, for {{< ui >}}a{{< /ui >}}, fill in `datadog.workflows.executions.started`.
1. _Optionally_, to restrict the monitor to a specific workflow, for {{< ui >}}from{{< /ui >}}, fill in `workflow_id:[WORKFLOW-ID]`, replacing `[WORKFLOW-ID]` with the ID for your workflow.
1. For {{< ui >}}Evaluation Details{{< /ui >}}, use the following values:
    - {{< ui >}}Evaluate the{{< /ui >}}: `sum`
    - {{< ui >}}Of the query over the{{< /ui >}}: `last 1 day`.
1. For {{< ui >}}Set alert conditions{{< /ui >}}, choose {{< ui >}}above{{< /ui >}}, then fill in an alert and warning threshold. For example, you could fill in an {{< ui >}}Alert threshold{{< /ui >}} of `200` and a {{< ui >}}Warning threshold{{< /ui >}} of `150`.
1. Under {{< ui >}}Configure notifications & automations{{< /ui >}}, name your workflow, then fill in message text. For example, you could use message text like the following:

    {{< code-block lang="none" >}}@slack-alert-channel

{{#is_warning}}
Workflow has executed {{warn_threshold}} times in the last day; manual action might be needed to avoid alerting.
{{/is_warning}}
{{#is_alert}}
Workflow has executed {{threshold}} times in the last day, which is our budget threshold for workflows. We should unpublish the workflow to avoid any more automatic executions for the day.
{{/is_alert}}
{{< /code-block >}}
1. Click {{< ui >}}Create{{< /ui >}}.


## View workflow events in Event Manager

You can use [Event Manager][5] to view workflow start and completion events by filtering on `source:workflow_automation`.

To see events for a specific workflow, in the {{< ui >}}Search facets{{< /ui >}} box, search for `workflow.workflow_id`. You can select a specific set of IDs to view only events for those workflows.

You can also filter the output by {{< ui >}}Status{{< /ui >}} to see only `info`, `warn`, or `error` messages.


## Track workflow billing in Usage Attribution

<div class="alert alert-danger">
Usage Attribution is an advanced feature included in the Enterprise plan. For all other plans, contact your account representative or <a href="mailto:success@datadoghq.com">success@datadoghq.com</a> to request this feature.
</div>

To track billing for your workflow executions, perform the following steps:

1. Navigate to the [Usage Attribution][6] page.
1. Under {{< ui >}}Products{{< /ui >}} on the left, search for {{< ui >}}Workflow Executions{{< /ui >}}.
1. Hover over {{< ui >}}Workflow Executions{{< /ui >}} and click {{< ui >}}Only{{< /ui >}} to view usage attribution for only workflows.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<br>Do you have questions or feedback? Join the **#workflows** channel on the [Datadog Community Slack][1].


[1]: https://chat.datadoghq.com/
[2]: https://app.datadoghq.com/dashboard/lists
[3]: /service_management/workflows/build/#workflow-notifications
[4]: https://app.datadoghq.com/monitors/create
[5]: https://app.datadoghq.com/event/explorer?query=source%3Aworkflow_automation
[6]: https://app.datadoghq.com/billing/usage-attribution