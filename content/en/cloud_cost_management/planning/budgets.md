---
title: Budgets
description: After starting to ingest costs in Cloud Cost Management, set up budgets and visualize how you're tracking against them.
aliases:
- /cloud_cost_management/budgets/
further_reading:
- link: https://www.datadoghq.com/blog/cloud-cost-management-oci
  tag: Blog
  text: Manage and optimize your OCI costs with Datadog Cloud Cost Management
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Cloud Cost Management"
---

## Overview
Set up budgets and enable engineering teams to visualize how they are tracking against budgets.

You can create two types of budgets:

- {{< ui >}}Basic{{< /ui >}}: A flat, single-level budget for tracking your cloud costs.
- {{< ui >}}Hierarchical{{< /ui >}}: A two-level, parent-child budget for tracking costs in a way that mirrors your organization's structure. For example, if your organization has departments made up of many teams, you can budget on the department (parent) and team (child) levels and track budget health at both levels. In addition, this option allows you to create a single budget instead of needing to create multiple budgets.

## Set up budgets

{{< tabs >}}
{{% tab "Basic" %}}

To create a basic budget:

1. Navigate to [**Cloud Cost > Plan > Budgets**][1], or create a budget through the [API][2] or [Terraform][3].
1. Click {{< ui >}}New Budget{{< /ui >}}.
1. Click {{< ui >}}Basic{{< /ui >}} to create a basic budget.
1. You can either add budget information by {{< ui >}}uploading a CSV{{< /ui >}} using the provided template in the UI, or {{< ui >}}enter your budget directly{{< /ui >}} using the details below.

   {{< img src="cloud_cost/budgets/budget-create-basic-1.mp4" alt="Choose whether to add budget information by uploading a CSV or enter it directly within the UI" video="true">}}

   - {{< ui >}}Budget Name{{< /ui >}}: Enter a name for your budget.
   - {{< ui >}}Start Date{{< /ui >}}: Enter a start date for the budget (this can be a past month). Budgets are set at the month level.
   - {{< ui >}}End Date{{< /ui >}}: Set an end date for the budget (can be in the future).
   - {{< ui >}}Provider(s){{< /ui >}}: Budget on any combination of AWS, Azure, Google Cloud, Oracle Cloud, or other SaaS (including Datadog or custom costs).
   - {{< ui >}}Dimension to budget by{{< /ui >}}: Specify the dimension to track (such as team, service, or environment). Then, define the specific values directly in the budget table. For example, to create budgets for the top four teams, select "team" as the dimension, and add the teams as rows in the table. You can select an existing tag value or add a new one to track future spend.

1. Fill in all budgets in the table. To apply the same values from the first month to the rest of the months, enter a value in the first column of a row and click the {{< ui >}}copy{{< /ui >}} button.

   {{< img src="cloud_cost/budgets/budget-copy-paste.png" alt="Budget Creation View: fill in budget details." style="width:100%;" >}}

1. Click {{< ui >}}Save{{< /ui >}}.

[1]: https://app.datadoghq.com/cost/plan/budgets
[2]: /api/latest/cloud-cost-management/#create-or-update-a-budget
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/cost_budget

{{% /tab %}}

{{% tab "Hierarchical" %}}

To create a hierarchical budget:

1. Navigate to [**Cloud Cost > Plan > Budgets**][1], or create a budget through the [API][2].
1. Click {{< ui >}}New Budget{{< /ui >}}.
1. Click {{< ui >}}Hierarchical{{< /ui >}} to create a hierarchical budget.
1. Enter your budget information using the details below.

   - {{< ui >}}Budget Name{{< /ui >}}: Enter a name for your budget.
   - {{< ui >}}Start Date{{< /ui >}}: Enter a start date for the budget (this can be a past month). Budgets are set at the month level.
   - {{< ui >}}End Date{{< /ui >}}: Set an end date for the budget (can be in the future).
   - {{< ui >}}Scope to Provider(s){{< /ui >}}: Budget on any combination of AWS, Azure, Google Cloud, Oracle Cloud, or other SaaS (including Datadog or custom costs).
   - {{< ui >}}Parent Level{{< /ui >}}: Select the parent-level tag.
   - {{< ui >}}Child Level{{< /ui >}}: Select child-level tag.
   - {{< ui >}}Dimension to budget by{{< /ui >}}: Specify the dimension to track (such as team, service, or environment). Then, define the specific values directly in the budget table. For example, to create budgets for the top four teams, select "team" as the dimension, and add the teams as rows in the table. You can select an existing tag value or add a new one to track future spend.

1. Fill in all budgets in the table. To apply the same values from the first month to the rest of the months, enter a value in the first column of a row and click the {{< ui >}}copy{{< /ui >}} button.

   {{< img src="cloud_cost/budgets/budget-copy-paste.png" alt="Budget Creation View: fill in budget details." style="width:100%;" >}}

1. Click {{< ui >}}Save{{< /ui >}}.

[1]: https://app.datadoghq.com/cost/plan/budgets
[2]: /api/latest/cloud-cost-management/#create-or-update-a-budget

{{% /tab %}}
{{< /tabs >}}

## View budget status
The [Budgets page][1] lists all of your organization's budgets, highlighting the budget creator, any budgets that have gone over,
and other relevant details. Click on {{< ui >}}View Performance{{< /ui >}} to investigate the budget, and understand what might be causing you to go over budget.

   {{< img src="cloud_cost/budgets/budget-list-1.png" alt="List all budgets">}}

From a {{< ui >}}View Performance{{< /ui >}} page of an individual budget, you can toggle the view option from the top left:

<div class="alert alert-info">
You cannot view budget versus actuals before 15 months, since cost metrics are retained for 15 months.
</div>

- You can view the budget status for the {{< ui >}}current month{{< /ui >}}:

   {{< img src="cloud_cost/budgets/budget-status-month-2.png" alt="Budget Status View: view current month">}}

- Or you can view the budget status for the {{< ui >}}entire duration (all){{< /ui >}}:

   {{< img src="cloud_cost/budgets/budget-status-all-2.png" alt="Budget Status View: view total budget">}}

To investigate budgets:
1. From the individual budget page, filter budgets using the dropdown at the top, or {{< ui >}}Apply filter{{< /ui >}} in the table to investigate the dimensions that are over budget.
   {{< img src="cloud_cost/budgets/budget-investigate-3.png" alt="Use the dropdown filter or Apply Filter option in the table to investigate over-budget dimensions.">}}
2. Click {{< ui >}}Copy Link{{< /ui >}} to share the budget with others to help understand why budgets are going over. Or, share budgets with finance so that they can understand how you're tracking against budgets.

## Modify or delete a budget
To modify a budget, click the edit icon on the Budgets page.

{{< img src="cloud_cost/budgets/budget-edit-1.png" alt="Click the edit icon to edit a budget"  style="width:70%;">}}

To delete a budget, click the trash icon on the Budgets page.

{{< img src="cloud_cost/budgets/budget-delete-2.png" alt="Click the delete icon to delete a budget"  style="width:70%;">}}

## Add a budget to a dashboard

You can add a budget to dashboards in two ways:

- Create a budget report and click {{< ui >}}Share{{< /ui >}} > {{< ui >}}Save to dashboard{{< /ui >}}.

  {{< img src="cloud_cost/budgets/budget-share-from-dashboard.png" alt="Click Share and Save to dashboard to add a budget report to a dashboard"  style="width:100%;">}}

- From a dashboard, add the {{< ui >}}Budget Summary{{< /ui >}} widget.

  {{< img src="cloud_cost/budgets/budgets-widgets.png" alt="Search and add the Budget Summary widget from any dashboard"  style="width:100%;">}}

## Create an alert for your budget

Create a [budget-based monitor][2] to alert when actual spend or forecasted spend is projected to exceed a percentage of the budget.

## View forecasts in budgets

Budget cards automatically display forecast information when available, showing projected costs for each budget period. If forecasted costs are projected to exceed your budget, the budget status indicates {{< ui >}}Projected Over{{< /ui >}} to help you take action before going over budget.

To view detailed forecast information in a budget, click {{< ui >}}View Performance{{< /ui >}} and toggle {{< ui >}}Show Forecast{{< /ui >}} to visualize predicted costs alongside actual spending.

Learn more about how [forecasting][3] works and data requirements.

## Customize your budget forecast

Datadog automatically generates a **Bits forecast** for each budget, projecting future costs from your historical spend. When you have knowledge that the automatic forecast cannot capture, such as a planned product launch, a migration, seasonal demand, or workloads being retired, you can override the Bits forecast with your own values. This override is called a **custom forecast**.

Custom forecast values are:

- Editable with the `ccm_forecast_write` permission (see [Permissions](#permissions)).
- Editable for the current and future months.

For [hierarchical budgets](#set-up-budgets), you edit custom forecast values at the child level. The parent level reflects the sum of its children.

Once set, your custom values take precedence over the Bits forecast on the budget status page, in the forecast totals on the Budgets page, and in [budget monitors][2].

### Add or edit custom forecast values

{{< tabs >}}
{{% tab "When creating a budget" %}}

1. Follow the steps in [Set up budgets](#set-up-budgets) to start creating a budget.
1. Toggle {{< ui >}}Customize Bits Forecast{{< /ui >}} to display forecast columns interleaved with the budget columns. Each month shows a {{< ui >}}Budget{{< /ui >}} column and a {{< ui >}}Forecast{{< /ui >}} column.

  {{< img src="cloud_cost/budgets/cust-fcst-during-create.png" alt="Toggle Customize Bits Forecast to display forecast columns" style="width:100%;">}}

1. Each forecast cell displays the Bits forecast as a gray placeholder. Enter a dollar amount to override it. Negative values are not allowed.

  {{< img src="cloud_cost/budgets/cust-fcst-during-create-table.png" alt="Toggle Customize Bits Forecast to display forecast columns" style="width:100%;">}}

1. The preview chart updates as you edit, so you can review the final forecast before saving.
1. Click {{< ui >}}Save{{< /ui >}}.

{{% /tab %}}
{{% tab "When editing a budget" %}}

1. On the [Budgets page](https://app.datadoghq.com/cost/plan/budgets), click the edit icon for a budget.
1. The forecast columns appear automatically when you have the `ccm_forecast_write` permission. Each forecast cell displays your saved override, or the Bits forecast as a gray placeholder when no override exists.
1. Enter or change a dollar amount in any forecast cell. Negative values are not allowed.
1. To compare your overrides against the original automatic values, toggle {{< ui >}}Show Bits AI forecast{{< /ui >}} to display a read-only Bits AI column next to each forecast column.
1. Click {{< ui >}}Save{{< /ui >}}.

{{% /tab %}}
{{< /tabs >}}

While editing, the appearance of a forecast cell indicates its state:

| Cell appearance | Meaning |
|---|---|
| Gray text | Bits forecast placeholder: no override is set for this cell. |
| Black text | A saved custom forecast override. |
| Black text with a blue outline | An override you entered but have not saved yet. |

To remove an override, clear the cell. The cell reverts to the gray Bits forecast placeholder.

<div class="alert alert-info">Datadog saves the budget first, and then the custom forecast. If the budget saves but the custom forecast does not, a notification prompts you to retry from the edit page.</div>

### How custom forecasts are used

- **Budget status**: The budget status page and the forecast totals on the Budgets page include your custom forecast.
- **Budget monitors**: [Budget monitors][2] when evaluating, a custom forecast takes precedence over the Bits forecast when one is present.
- **CSV export**: Downloading a budget as CSV includes the custom forecast values where it was set.
- **Deleting a budget**: Deleting a budget also deletes its associated custom forecast values.

## Permissions

| Action | Required Permission |
|--------|---------------------|
| View budgets | `cloud_cost_management_read` |
| Create, edit, or delete a budget | `ccm_budget_write` |
| Edit custom forecast values | `ccm_forecast_write` |

For the full list of CCM permissions, see the [Permissions documentation][4].

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/plan/budgets
[2]: /cloud_cost_management/cost_changes/monitors/
[3]: /cloud_cost_management/planning/forecasting
[4]: /cloud_cost_management/setup/permissions
