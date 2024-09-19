---
title: Track workflows
disable_toc: false
algolia:
  tags: ['workflow', 'workflows', 'workflow automation']
further_reading:
- link: "/service_management/workflows/build"
  tag: "Documentation"
  text: "Build workflows"
- link: "/account_management/audit_trail/"
  tag: "Documentation"
  text: "Datadog Audit Trail"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Workflow Automation is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

This page explains how to track different kinds of workflow activity and workflow costs.

## Out-of-the-box dashboard

The Workflows Overview dashboard provides a high-level overview of your Datadog workflows and executions. To find the dashboard, go to your [Dashboard list][2] and search for **Workflows Overview**.

{{< img src="service_management/workflows/workflows-dashboard.png" alt="The Workflows Overview dashboard" style="width:100%;" >}}


## View editors

To see who edited a workflow, use Audit Trail.

1. From your workflow, click the <i class="icon-cog-2"></i> **(gear)** in the upper right corner and click **View audit events**.<br>An Audit Trail search filtered to your workflow opens.
1. In the left, under the **Core** filters, expand **Action**.
1. Hover over **Modified** and click **Only** to filter the results to show only workflow edits.


## Notify about runs

See [Workflow notifications][3] for instructions on using built-in workflow notifications.

## Track Workflow metrics with a Datadog monitor

To create a monitor that tracks when a workflow starts, perform the following steps:

1. Go to [New Monitor][4] and select the **Metric** monitor type.
1. Under **Define the metric**, for **a**, fill in `datadog.workflows.executions.started`.



Optionally, to restrict a monitor to a specific workflow, for **from**, you can fill in `workflow_id:[WORKFLOW-ID]`, replacing `[WORKFLOW-ID]` with the ID for your workflow.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<br>Do you have questions or feedback? Join the **#workflows** channel on the [Datadog Community Slack][1].


[1]: https://datadoghq.slack.com/
[2]: https://app.datadoghq.com/dashboard/lists
[3]: /service_management/workflows/build/#workflow-notifications
[4]: https://app.datadoghq.com/monitors/create