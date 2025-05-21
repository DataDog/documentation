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

You can create two types of budgets:

- [**Basic**](#create-a-basic-budget): A flat, single-level budget for tracking your cloud costs.
- [**Hierarchical**](#create-a-hierarchical-budget): A two-level, parent-child budget for tracking costs in a way that mirrors your organization's structure. For example, if your organization has departments made up of many teams, you can budget on the department (parent) and team (child) levels and track budget health at both levels. In addition, this option allows you to create a single budget instead of needing to create multiple budgets.

## Create a basic budget

To create a basic budget:

1. Navigate to [**Cloud Cost > Plan > Budgets**][1], or create a budget through the [API][2].
1. Click the **Create a New Budget** button.
1. Click **Basic** to a basic budget.
1. You can either add budget information by **uploading a CSV** using the provided template in the UI, or **enter your budget directly** using the details below.

   {{< img src="cloud_cost/budgets/budget-upload-your-csv.mp4" alt="Choose whether to add budget information by uploading a CSV or enter it directly within the UI" video="true">}}

   - **Budget Name**: Enter a name for your budget.
   - **Start Date**: Enter a start date for the budget (this can be a past month). Budgets are set at the month level.
   - **End Date**: Set an end date for the budget (can be in the future).
   - **Provider(s)**: Budget on any combination of AWS, Azure, Google Cloud, or other SaaS (including Datadog or custom costs).
   - **Dimension to budget by**: Specify a dimension to track the budget, along with its corresponding values. For example, if you wanted to create budgets for the top 4 teams, you would select "team" in the first dropdown, and the specific teams in the second dropdown.

1. Fill in all budgets in the table. To apply the same values from the first month to the rest of the months, enter a value in the first column of a row and click the **copy** button.

   {{< img src="cloud_cost/budgets/budget-copy-paste.png" alt="Budget Creation View: fill in budget details." style="width:100%;" >}}

1. Click **Save**.

## Create a hierarchical budget

To create a hierarchical budget:

1. Navigate to [**Cloud Cost > Plan > Budgets**][1], or create a budget through the [API][2].
1. Click the **Create a New Budget** button.
1. Click **Hierarchical** to create a hierarchical budget.
1. Enter your budget information using the details below.

   - **Budget Name**: Enter a name for your budget.
   - **Start Date**: Enter a start date for the budget (this can be a past month). Budgets are set at the month level.
   - **End Date**: Set an end date for the budget (can be in the future).
   - **Scope to Provider(s)**: Budget on any combination of AWS, Azure, Google Cloud, or other SaaS (including Datadog or custom costs).
   - **Parent Level**: Select the parent-level tag.
   - **Child Level**: Select child-level tag.
   - **Dimension to budget by**: Specify a dimension to track the budget, along with its corresponding values. For example, if you wanted to create budgets for the top 4 teams, you would select "team" in the first dropdown, and the specific teams in the second dropdown.

1. Fill in all budgets in the table. To apply the same values from the first month to the rest of the months, enter a value in the first column of a row and click the **copy** button.

   {{< img src="cloud_cost/budgets/budget-copy-paste.png" alt="Budget Creation View: fill in budget details." style="width:100%;" >}}

1. Click **Save**.

## View budget status
The [Budgets page][1] lists all of your organization's budgets, highlighting the budget creator, any budgets that have gone over,
and other relevant details. Click on **View Performance** to investigate the budget, and understand what might be causing you to go over budget.

   {{< img src="cloud_cost/budgets/budget-list-1.png" alt="List all budgets">}}

From a **View Performance** page of an individual budget, you can toggle the view option from the top left:

<div class="alert alert-info">
You cannot view budget versus actuals before 15 months, since cost metrics are retained for 15 months.
</div>

- You can view the budget status for the **current month**:

   {{< img src="cloud_cost/budgets/budget-status-month-2.png" alt="Budget Status View: view current month">}}

- Or can view the budget status for the **entire duration (all)**:

   {{< img src="cloud_cost/budgets/budget-status-all-2.png" alt="Budget Status View: view total budget">}}

## Investigate budgets

   {{< img src="cloud_cost/budgets/budget-investigate-3.png" alt="Use the dropdown filter or Apply Filter option in the table to investigate over-budget dimensions. ">}}

To investigate budgets:
1. From the individual budget page, filter budgets using the dropdown at the top, or "Apply filter" in the table to investigate dimensions that are over budget.
2. Click **Copy Link** to share the budget with others to help understand why budgets are going over. Or, share budgets with finance so that they can understand how you're tracking against budgets.

## Modify a budget
To modify a budget, click the edit icon on the Budgets page.

   {{< img src="cloud_cost/budgets/budget-edit-1.png" alt="Click the edit icon to edit a budget"  style="width:70%;">}}

## Delete budget
To delete a budget, click the trash icon on the Budgets page.

   {{< img src="cloud_cost/budgets/budget-delete-2.png" alt="Click the delete icon to delete a budget"  style="width:70%;">}}

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/plan/budgets
[2]: /api/latest/cloud-cost-management/#create-or-update-a-budget
