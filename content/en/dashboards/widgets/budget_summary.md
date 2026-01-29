---
title: Budget Summary Widget
widget_type: budget_summary
description: "Visualize your Cloud Cost Management budgets and spending in dashboards."
aliases:
    - /graphing/widgets/budget_summary/
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Cloud Cost Management"
- link: "/dashboards/guide/graphing_json/"
  tag: "Documentation"
  text: "Graphing with JSON"

---

Use the Budget Summary widget to track your Cloud Cost budgets and spending directly in your dashboards, helping you monitor costs and stay within limits.

{{< img src="dashboards/widgets/budget_summary/budget-summary-1.png" alt="Budget Summary widget in a dashboard." >}}

## Setup

### Configuration

1. If you do not have one already, create a [Budget][2].
2. Within the widget, select your budget from the dropdown menu.
3. (Optional) Modify the values for each tag to filter the budget view. This does not affect the Budget configuration itself.
4. (Optional) Change the time frame to show your budget and spend across the selected months. The time frame is restricted to what is configured in the Budget.

## API

This widget can be used with the **[Dashboards API][1]**. See the following table for the [widget JSON schema definition][3]:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/latest/dashboards/
[2]: /cloud_cost_management/planning/budgets/
[3]: /dashboards/guide/graphing_json/

