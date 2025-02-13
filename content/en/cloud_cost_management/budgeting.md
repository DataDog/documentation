---
title: Budgeting
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Cloud Cost Management"
---

{{< callout btn_hidden="true" header="Join the Preview!">}}
Budgeting is in Preview.
{{< /callout >}}

## Overview
After you start ingesting your costs in Cloud Cost Management, set up budgets so that you and your engineering teams can track budgets vs actuals throughout the month and year.

## Create a new Budget

1. Enter the following details:
   1. **Budget Name**
   2. **Start Date** - This can be a past month. Budgets are set at the month level.
   3. **End Date** - The end date can be in the future. Note: If both the start and end dates are in the past, you will not be able to view that budget’s status at this time.
   4. **Provider(s)** - Budget on any combination of AWS, Azure, Google Cloud, any SaaS, Custom Costs, and even Datadog costs.
   5. **Dimension to budget by** - Specify a dimension to track the budget, along with the corresponding values. For example, if you have team budgets, for the top 4 teams, you would select “team” in the first dropdown, and the specific teams in the second dropdown.

{{< img src="cloud_cost/budgeting/budget-creation-view.png" alt="Budget Creation View: fill in budget details" >}}

2. Fill in all budgets in the table - you can automatically copy values from the first month to the rest of the months by clicking the copy button.

{{< img src="cloud_cost/budgeting/budget-create-table.png" alt="Budget Creation View: fill in all budgets" >}}

3. Click **Save** in the bottom right

<{{< img src="cloud_cost/budgeting/budget-create-save.png" alt="Budget Creation View: click save" >}}
>

## View Budget Status
The Budgets Page[1] lists all of your organization’s budgets, highlighting budgets that are over budget, who created the budget,
and more details. Click on **View Performance** to investigate the budget, and understand what might be causing you to go over budget.

{{< img src="cloud_cost/budgeting/budget-list.png" alt="List all budgets" >}}

You can view the budget status in the current month or the full duration of the budget.

<div class="alert alert-info">
Note: Cost actuals (such as aws.cost.amortized and similar cost metrics) have a 15 month retention, so you will not be
able to view budget vs actuals before 15 months.
</div>

{{< img src="cloud_cost/budgeting/budget-status-month.png" alt="Budget Status View: view current month">}}
{{< img src="cloud_cost/budgeting/budget-status-year.png" alt="Budget Status View: view total budget">}}

## Investigate Budgets
You can filter budgets using the “Filter to” at the top of the screen, or “Apply filter” in the table to quickly zoom
into dimensions that are over budget. Click on “Copy Link” to send the budget to others in your organization so that
they can help you understand why you may be going over budget. Or, share budgets with finance so that they can understand
how you’re tracking against budgets.

## Delete Budget
Click the trash icon on the Budgets page, or within an individual budget, to delete the budget.

{{< img src="cloud_cost/budgeting/budget-list.png" alt="List all budgets" >}}

## Further Reading

[1]: https://app.datadoghq.com/cost/plan/budgeting
