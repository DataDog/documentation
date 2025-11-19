---
title: Forecasting
description: Predict future cloud costs and make informed decisions with Cloud Cost Management Forecasts.
further_reading:
# - link: "/cloud_cost_management/reports/"
#   tag: "Documentation"
#   text: "Learn about Cloud Cost Management Reports"
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
<!-- - [**Reports**](#view-forecasts-in-reports): Enable the forecast toggle to visualize predicted costs alongside your actual spending with daily, weekly, or monthly rollups. -->
- [**Budgets**](#view-forecasts-in-budgets): View forecasted costs directly on budget cards to see if you're projected to go over budget.

With Forecasts, you can:

- Anticipate **spending trends** based on your historical data to predict future costs.
- Visualize **projected costs** alongside actual spending to identify patterns and understand cost trends.
- Use forecast data to set **realistic budget targets** and avoid cost overruns.
- See if forecasted costs are projected to **exceed your budget** targets to track budget health.

## How forecasting works

Cloud Cost Management leverages advanced algorithms to deliver accurate cost predictions. The forecasting model analyzes your historical spending data to identify patterns and trends in your cloud costs, including:

- Recurring costs that happen on a **predictable schedule** (such as weekly or monthly cycles).
- Whether your costs are **increasing, decreasing, or staying stable** over time.
- Changes in spending that correspond to **specific periods or events**.

### Flexible forecasting options

Forecasts can be generated for various time horizons and rollup intervals to match your planning needs:

- **Forecast periods**: Predict costs for the next billing period, current month, current year, or a custom date range based on your historical spending data.
- **Rollup intervals**: View forecasts at daily, weekly, or monthly intervals depending on your analysis requirements.

### Data requirements

To generate accurate forecasts, CCM requires:

- **At least 31 **consecutive** days of cost data**: This ensures the model has sufficient information to identify meaningful patterns.
- **Recent data**: The model uses up to the last 100 days of your cost history to generate predictions.

If you have newly created resources or services, forecasts become available once sufficient historical data is collected.

<!-- ## View forecasts in reports

Navigate to [**Cloud Cost > Analyze > Reports**][1] in Datadog to enable forecasts in your cost reports.

1. Create a report or open an existing **Cost** or **Budget** report.
2. In the left panel, toggle **Show forecast** to enable forecasting.
3. Select the forecast period from the **Until end of** dropdown (next period, current month, current year, or a custom range).
4. Choose your preferred rollup interval: **Daily**, **Weekly**, or **Monthly**.

{{< img src="cloud_cost/forecasts/report-with-forecast.png" alt="Cost report showing the forecast toggle in the left panel and forecasted costs displayed with historical data" style="width:100%;" >}}

The report displays:
- **Forecast toggle and controls**: Located in the left panel to enable forecasting and select the time period.
- **Historical costs**: Your actual spending shown in solid colors.
- **Forecasted costs**: Predicted costs shown with a hatched pattern.
- **Forecast summary card**: At the top of the page showing the total forecasted cost for the selected period. -->

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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<!-- [1]: https://app.datadoghq.com/cost/analyze/reports -->
[2]: https://app.datadoghq.com/cost/plan/budgets
