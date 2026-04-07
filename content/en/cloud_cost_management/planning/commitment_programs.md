---
title: Commitment Programs
description: Learn how to manage the performance and status of your cloud discount programs.
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Learn about Cloud Cost Management"
---

<div class="alert alert-info">CCM Commitment Programs supports Amazon EC2 and RDS Reserved Instances, Amazon EC2 Savings Plans, and Amazon ElastiCache Reserved Nodes.</div>

## Overview

Cloud providers offer commitment-based discount programs, such as {{< tooltip text="Reserved Instance (RI)" tooltip="A billing discount for committing to use a specific instance configuration for a one- or three-year term." >}} and {{< tooltip text="Savings Plans" tooltip="Flexible cloud discount programs that provide lower prices in exchange for a commitment to a consistent amount of usage (measured in $/hour) over a term." >}}, to help you save on predictable usage. Datadog's Commitment Programs feature helps you monitor, optimize, and maximize the value of these discounts across your cloud environments.

With Commitment Programs, you can:
- Track and address unused or underused commitments
- Target high {{< tooltip text="on-demand" tooltip="Cloud resources billed at standard rates, without any commitment or discount program." >}} spend with additional commitments
- Monitor expirations and plan timely renewals

## Getting started

Use Commitment Programs to understand and optimize your cloud commitments.

1. Go to [**Cloud Cost > Planning > Commitment Programs**][1] in Cloud Cost Management.
2. Use filters to focus on specific accounts, regions, or services.
3. Gain insights into your KPIs, commitment costs, and renewal recommendations:
   - Review KPIs in the [Commitments overview](#commitments-overview) section.
   - View active commitments by type in the [Commitments inventory](#commitments-inventory) table.
   - Identify savings plans generating the most waste in [Least used savings plans](#least-used-savings-plans).
4. Take action based on these insights:
   - Adjust workloads to better use your commitments and avoid extra on-demand charges.
   - Update commitments by buying or changing them based on your usage data.
   - Plan renewals or retire commitments before they expire.
   - Optimize spend using Datadog's recommendations to save more and reduce waste.

## Commitments overview

Review these Key Performance Indicators (KPIs) for your cloud providers and services:

{{< img src="cloud_cost/planning/commitments-inventory.png" alt="Commitments Overview dashboard showing key savings metrics and a bar chart comparing commitment costs to equivalent on-demand costs over time." style="width:100%;" >}}

- **Effective Savings Rate (ESR)**: Percentage of cost savings achieved by your discount programs compared to on-demand prices, factoring in both utilized and underutilized commitments.
  - _Example: Your RIs may offer a 62% discount, but if your ESR is only 45%, underutilized commitments are reducing your actual savings._
- **Realized Savings**: Total dollar amount saved by using commitment programs versus on-demand rates.
  - _Example: You spent $10,000 on cloud services last month, but would have spent $14,000 at on-demand rates, so your absolute savings is $4,000._

## On-demand hot-spots

On-demand hot-spots highlight areas with high on-demand costs, which may indicate opportunities to purchase additional commitments.

{{< img src="cloud_cost/planning/commitments-on-demand-2.png" alt="On-Demand Hot-Spots table for AWS RDS showing region, instance family, DB engine, coverage percentage, and on-demand cost." style="width:100%;" >}}

Use the **Cost** and **Hours** tabs to toggle between on-demand spend in dollars or usage in hours. Use the **Region** and **Instance Family** filters to narrow results. 

The table shows the following columns:

- **Region**: Region where the on-demand usage is occurring.
- **Instance Family**: Instance family associated with the on-demand usage.
- **DB Engine**: Database engine running on-demand, such as Aurora PostgreSQL, PostgreSQL, SQL Server, or Aurora MySQL.
- **Coverage**: Percentage of usage covered by commitments.
- **On-Demand Cost**: Total on-demand cost, sorted in descending order to surface the highest-spend hot-spots first.

## Commitments inventory

Commitments Inventory provides a detailed view of your active commitments, organized by commitment type.

{{< img src="cloud_cost/planning/commitments-inventory-1.png" alt="Commitments Inventory section showing the Savings Plans tab with a utilization chart and a table of EC2 savings plan commitments." style="width:100%;" >}}

Use the **Savings Plans** and **Reserved Instances** tabs to switch between commitment types. Each tab shows:

- **Utilization**: Percentage of the commitment type being used during the selected period.
- **Unused spend**: Total spend on unused commitments.
- **Daily chart**: Tracks used and unused commitment spend alongside the utilization rate over time.

Use the **Only show Expiring** checkbox to filter the table to commitments nearing their end date.

The table lists your active commitments. Columns vary depending on the product and commitment type, but common columns include:

| Column | Description |
|---|---|
| Savings Plan ARN or Reservation ARN | Unique identifier for the commitment. |
| Payment Model | Payment option (for example, No Upfront, Partial Upfront, All Upfront). |
| Term | Duration of the commitment (for example, 1 Year, 3 Years). |
| Type | The commitment type (for example, `ComputeSavingsPlans`). |
| Committed Spend/HR | Hourly spend committed under the plan. |
| End Date | Date the commitment expires. |
| Utilization | Percentage of the commitment used during the selected period. |

Use the **Columns** button to show or hide additional columns.

## Least used savings plans

Least Used Savings Plans helps you identify which savings plans are generating the most waste. Use this section to determine when that waste occurs and take action to improve utilization.

{{< img src="cloud_cost/planning/commitment-programs-least-used-savings-plans-1.png" alt="Least Used Savings Plans section showing a bar chart of daily average unused savings plan spend by day of week, a table of the most wasteful savings plans with waste amount, utilization, and ARN, and a heat map of hourly unused committed spend percentage by day of week." style="width:100%;" >}}

**Daily average unused Savings Plans**: A bar chart showing the average daily cost of unused savings plan spend for each day of the week. Use this to spot patterns, such as higher waste on weekends when workloads may be lower.

**Savings Plans with most waste**: A table listing underutilized savings plans, sorted by total waste. Columns include:

- **Waste**: Total dollar amount of unused committed spend during the selected period.
- **Utilization**: Percentage of the savings plan being used, shown as a percentage and progress bar.
- **Savings Plan ARN**: Unique identifier for the savings plan.

**Hourly unused committed spend percentage**: A heat map showing the percentage of committed spend that went unused, broken down by hour (UTC) and day of week. Darker cells indicate higher unused percentages, making it possible to identify specific time windows where commitments are consistently underused.

## Example use cases

### Identify underutilized commitments

**Scenario**: Your Effective Savings Rate (ESR) is lower than expected, even though your coverage is high.

**How to use commitment programs**:  
1. Go to the **Commitments Overview** and check the utilization KPI.
2. Filter by account, region, or instance family to pinpoint which commitments are underutilized.
3. Reallocate workloads to use these commitments more effectively, or consider modifying or selling unused commitments if your cloud provider allows it.

### Plan for expiring commitments

**Scenario**: Several Reserved Instances are expiring soon, and you want to avoid unexpected on-demand charges.

**How to use commitment programs**: 
1. In the **Commitments Explorer**, review the list of commitments and their expiration dates.
2. Use the filters to focus on soon-to-expire commitments.
3. Plan renewals or replacements in advance to maintain coverage and maximize savings.

### Target high on-demand spend

**Scenario**: Your cloud costs show consistently high on-demand usage for a particular service or region.

**How to use commitment programs**:
1. Use **On-demand hot-spots** to identify which services, regions, or accounts have significant and steady on-demand costs.
2. Analyze usage patterns to confirm they are predictable.
3. Purchase new commitments to cover the consistent usage and reduce costs.

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/plan/commitment-programs
