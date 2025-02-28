---
title: Budgets
description: After starting to ingest costs in Cloud Cost Management, set up budgets and visualize how you're tracking against them.
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Cloud Cost Management"
---

## Overview
After you start ingesting your costs in Cloud Cost Management, set up budgets and visualize how you are tracking against budgets.

## Create a budget

1. Navigate to [**Infrastructure > Cloud Cost > Plan > Budgets**][1].
2. Click the **Create a New Budget** button.
3. Enter the following details:
   - **Budget Name**: Enter a name for your budget.
   - **Start Date**: Enter a start date for the budget (this can be a past month). Budgets are set at the month level.
   - **End Date**: Set an end date for the budget (can be in the future).
   - **Provider(s)**: Budget on any combination of AWS, Azure, Google Cloud, or other SaaS (including Datadog or custom costs).
   - **Dimension to budget by**: Specify a dimension to track the budget, along with its corresponding values. For example, if you wanted to create budgets for the top 4 teams, you would select "team" in the first dropdown, and the specific teams in the second dropdown.

    {{< img src="cloud_cost/budgets/budget-create-define.png" alt="Budget Creation View: fill in budget details." style="width:70%;" >}}

4. Fill in all budgets in the table - you can automatically copy values from the first month to the rest of the months by clicking the copy button.

   {{< img src="cloud_cost/budgets/budget-create-table.png" alt="Budget Creation View: fill in all budgets">}}

5. Click **Save** in the bottom right

   {{< img src="cloud_cost/budgets/budget-create-table-filled.png" alt="Budget Creation View: click save">}}

## View budget status
The [Budgets page][1] lists all of your organization's budgets, highlighting the budget creator, any budgets that have gone over,
and other relevant details. Click on **View Performance** to investigate the budget, and understand what might be causing you to go over budget.

   {{< img src="cloud_cost/budgets/budget-list.png" alt="List all budgets">}}

From a **View Performance** page of an individual budget, you can toggle the view option from the top left:

<div class="alert alert-info">
You cannot view budget versus actuals before 15 months, since cost metrics are retained for 15 months.
</div>

- You can view the budget status for the **current month**:

   {{< img src="cloud_cost/budgets/budget-status-month.png" alt="Budget Status View: view current month">}}

- Or can view the budget status for the **entire duration (all)**:

   {{< img src="cloud_cost/budgets/budget-status-all.png" alt="Budget Status View: view total budget">}}

## Investigate budgets

   {{< img src="cloud_cost/budgets/budget-investigate.png" alt="Use the dropdown filter or Apply Filter option in the table to investigate over-budget dimensions. ">}}

To investigate budgets:
1. From the individual budget page, filter budgets using the dropdown at the top, or "Apply filter" in the table to investigate dimensions that are over budget.
2. Click **Copy Link** to share the budget with others to help understand why budgets are going over. Or, share budgets with finance so that they can understand how you're tracking against budgets.

## Delete budget
To delete a budget, click the trash icon on the Budgets page.

   {{< img src="cloud_cost/budgets/budget-delete.png" alt="List all budgets">}}

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/plan/budgets
