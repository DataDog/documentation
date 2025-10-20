---
title: Forecasts
description: Predict future cloud costs and make informed decisions with Cloud Cost Management Forecasts.
further_reading:
- link: "/cloud_cost_management/reports/"
  tag: "Documentation"
  text: "Learn about Cloud Cost Management Reports"
- link: "/cloud_cost_management/planning/budgets"
  tag: "Documentation"
  text: "Learn about Cloud Cost Management Budgets"
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Cloud Cost Management"
---

## Overview

Cloud Cost Management (CCM) Forecasts help you predict future cloud costs based on historical spending patterns. Use forecasts to anticipate cost trends, plan budgets more effectively, and make data-driven decisions about resource allocation.

Forecasts are available in:
- **Reports**: Enable the forecast toggle to visualize predicted costs alongside your actual spending with daily, weekly, or monthly rollups.
- **Budgets**: View forecasted costs directly on budget cards to see if you're projected to go over budget.

With Forecasts, you can:

- **Predict future costs**: Forecast costs for the next billing period, current month, current year, or a custom date range based on your historical spending data.
- **Understand cost trends**: Visualize projected costs alongside actual spending to identify patterns.
- **Plan budgets**: Use forecast data to set realistic budget targets and avoid cost overruns.
- **Track budget health**: See if forecasted costs are projected to exceed your budget targets.

## View forecasts in reports

Navigate to [**Cloud Cost > Analyze > Reports**][1] in Datadog to enable forecasts in your cost reports.

1. Create a new report or open an existing **Cost** report. Forecasts are available for cost reports only.
2. In the left panel, toggle **Show forecast** to enable forecasting.
3. Select the forecast period from the **Until end of** dropdown (next period, current month, current year, or a custom range).
4. Choose your preferred rollup interval: **Daily**, **Weekly**, or **Monthly**.

{{< img src="cloud_cost/forecasts/report-with-forecast.png" alt="Cost report showing the forecast toggle in the left panel and forecasted costs displayed with historical data" style="width:100%;" >}}

The report displays:
- **Forecast toggle and controls**: Located in the left panel to enable forecasting and select the time period.
- **Historical costs**: Your actual spending shown in solid colors.
- **Forecasted costs**: Predicted costs shown with a hatched pattern.
- **Forecast summary card**: At the top of the page showing the total forecasted cost for the selected period.

## View forecasts in budgets

Navigate to [**Cloud Cost > Plan > Budgets**][2] in Datadog to view forecasts in your budget summaries.

Budget cards automatically display forecast information when available, showing projected costs for each budget period.

If forecasted costs are projected to exceed your budget, the budget status indicates **Projected Over** to help you take action before going over budget.

{{< img src="cloud_cost/forecasts/budget-list-with-forecast.png" alt="Budget list showing forecast values on budget cards" style="width:100%;" >}}

To view detailed forecast information:

1. From the Budgets page, click **View Performance** on any budget to open the detailed budget view.
2. In the budget performance view, toggle **Show Forecast** to enable forecasting.
3. The budget performance chart displays:
   - **Actual costs**: Your current spending shown in solid colors
   - **Forecasted costs**: Predicted costs shown with a hatched pattern extending beyond your actual costs
   - **Forecasted Past**: A vertical line indicating where the forecast begins

{{< img src="cloud_cost/forecasts/budget-performance-with-forecast.png" alt="Budget performance view showing the forecast toggle and forecasted costs displayed with a hatched pattern" style="width:100%;" >}}


## How forecasting works

Cloud Cost Management uses your historical spending data to predict future costs. The forecasting model analyzes patterns in your cloud spending, including:

- **Regular spending patterns**: Recurring costs that happen on a predictable schedule (such as weekly or monthly cycles).
- **Spending trends**: Whether your costs are increasing, decreasing, or staying stable over time.
- **Seasonal variations**: Changes in spending that correspond to specific periods or events.

### Data requirements

To generate accurate forecasts, CCM needs:

- **At least 31 consecutive days of cost data**: This ensures the model has enough information to identify meaningful patterns.
- **Recent data**: The model uses up to the last 100 days of your cost history to generate predictions.

If you have newly created resources or services, forecasts become available once sufficient historical data is collected.

## Troubleshooting

### Forecasts are not available

If you don't see forecasts in your reports or budgets:

- **Check your data**: Ensure you have at least 31 consecutive days of cost data for the resources or services you're analyzing.
- **Verify cost data is flowing**: Confirm that Datadog is receiving cost data from your cloud providers.
- **Select a Cost report**: Forecasts are only available for Cost reports, not Budget reports.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/analyze/reports
[2]: https://app.datadoghq.com/cost/plan/budgets
