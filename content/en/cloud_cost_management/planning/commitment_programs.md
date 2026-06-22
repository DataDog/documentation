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
2. Use the product selector to choose a commitment type and the time frame selector to set the reporting period.
3. Gain insights into your KPIs, commitment costs, and renewal recommendations:
   - Review KPIs in the [Commitments overview](#commitments-overview) section.
   - Analyze areas of on-demand spend to understand how to improve your coverage in the [On-demand hot-spots](#on-demand-hot-spots) section.
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

- {{< ui >}}Effective Savings Rate (ESR){{< /ui >}}: Percentage of cost savings achieved by your discount programs compared to on-demand prices, factoring in both utilized and underutilized commitments.
  - _Example: Your RIs may offer a 62% discount, but if your ESR is only 45%, underutilized commitments are reducing your actual savings._
- {{< ui >}}Realized Savings{{< /ui >}}: Total dollar amount saved by using commitment programs versus on-demand rates.
  - _Example: You spent $10,000 on cloud services last month, but would have spent $14,000 at on-demand rates, so your absolute savings is $4,000._

## On-demand hot-spots

On-demand hot-spots highlight areas with high on-demand costs, which may indicate opportunities to purchase additional commitments.

{{< img src="cloud_cost/planning/commitments-on-demand-2.png" alt="On-Demand Hot-Spots table for AWS RDS showing region, instance family, DB engine, coverage percentage, and on-demand cost." style="width:100%;" >}}

Use the {{< ui >}}Cost{{< /ui >}} and {{< ui >}}Hours{{< /ui >}} tabs to toggle between on-demand spend in dollars or usage in hours. Use the available filters to narrow results—filters vary based on the selected product.

The table columns correspond to the filters for the selected product, showing the dimensions that characterize the on-demand usage (such as region, instance family, or database engine), along with {{< ui >}}Coverage{{< /ui >}} (percentage of usage covered by commitments) and {{< ui >}}On-Demand Cost{{< /ui >}} (sorted in descending order to surface the highest-spend hot-spots first).

## Commitments inventory

Commitments Inventory provides a detailed view of commitments active during the selected time frame, organized by commitment type. This includes commitments expiring soon (within 30 days) and commitments that have already expired at the time of viewing.

{{< img src="cloud_cost/planning/commitments-inventory-1.png" alt="Commitments Inventory section showing the Savings Plans tab with a utilization chart and a table of EC2 savings plan commitments." style="width:100%;" >}}

Use the {{< ui >}}Savings Plans{{< /ui >}} and {{< ui >}}Reserved Instances{{< /ui >}} tabs to switch between commitment types. Each tab shows:

- {{< ui >}}Utilization{{< /ui >}}: Percentage of the commitment type being used during the selected period.
- {{< ui >}}Unused spend{{< /ui >}}: Total spend on unused commitments.
- {{< ui >}}Daily chart{{< /ui >}}: Tracks used and unused commitment spend alongside the utilization rate over time.

Use the {{< ui >}}Only show Expiring{{< /ui >}} checkbox to filter the table to commitments nearing their end date.

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

Use the {{< ui >}}Columns{{< /ui >}} button to show or hide additional columns.

## Least used savings plans

Least Used Savings Plans helps you identify which savings plans are generating the most waste. Use this section to determine when that waste occurs and take action to improve utilization.

{{< img src="cloud_cost/planning/commitment-programs-least-used-savings-plans-1.png" alt="Least Used Savings Plans section showing a bar chart of daily average unused savings plan spend by day of week, a table of the most wasteful savings plans with waste amount, utilization, and ARN, and a heat map of hourly unused committed spend percentage by day of week." style="width:100%;" >}}

{{< ui >}}Daily average unused Savings Plans{{< /ui >}}: A bar chart showing the average daily cost of unused savings plan spend for each day of the week. Use this to spot patterns, such as higher waste on weekends when workloads may be lower.

{{< ui >}}Savings Plans with most waste{{< /ui >}}: A table listing underutilized savings plans, sorted by total waste. Columns include:

- {{< ui >}}Waste{{< /ui >}}: Total dollar amount of unused committed spend during the selected period.
- {{< ui >}}Utilization{{< /ui >}}: Percentage of the savings plan being used, shown as a percentage and progress bar.
- {{< ui >}}Savings Plan ARN{{< /ui >}}: Unique identifier for the savings plan.

{{< ui >}}Hourly unused committed spend percentage{{< /ui >}}: A heat map showing the percentage of committed spend that went unused, broken down by hour (UTC) and day of week. Darker cells indicate higher unused percentages, making it possible to identify specific time windows where commitments are consistently underused.

## Savings Plan simulation

<div class="alert alert-info">Savings Plan simulation is in Preview. It supports AWS Savings Plans and runs at the <a href="https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html#management-account">AWS management account</a> level, estimating coverage across the organization's member accounts.</div>

Savings Plan simulation lets you estimate the impact of a new {{< tooltip text="Savings Plan" tooltip="A flexible cloud discount program that provides lower prices in exchange for a commitment to a consistent amount of usage (measured in $/hour) over a term." >}} on your bill before you purchase it. Instead of stitching together Cost Explorer exports and spreadsheets, you can model a commitment directly against your historical usage and see the projected coverage, utilization, and savings.

{{< img src="cloud_cost/planning/commitment-simulation.png" alt="Savings Plan simulation showing input parameters, summary metrics, and a time series chart of projected commitment coverage." style="width:100%;" >}}

### Run a simulation

1. Go to [**Cloud Cost > Planning > Commitment Programs**][1] and open the {{< ui >}}Simulator{{< /ui >}} tab.
2. Set the simulation inputs:
   - {{< ui >}}Commitment amount{{< /ui >}}: The hourly commitment ($/hour) you want to model.
   - {{< ui >}}Savings Plan type{{< /ui >}}: The type of Savings Plan to simulate (for example, Compute Savings Plans).
   - {{< ui >}}Term{{< /ui >}}: The length of the commitment (for example, 1 year or 3 years).
   - {{< ui >}}Payment option{{< /ui >}}: How the commitment is paid (No Upfront, Partial Upfront, or All Upfront).
   - {{< ui >}}Lookback window{{< /ui >}}: The historical period of usage the simulation is evaluated against.
3. Review the projected results in the summary metrics, the time series chart, and the per-service breakdown.

If Datadog has a Savings Plan recommendation for your organization, the simulation is prefilled with the recommended values so you can start from a suggested commitment and adjust from there.

### Interpret the results

All simulation outputs are estimates based on your historical usage over the selected lookback window. Actual savings depend on your future usage and how AWS applies Savings Plan discounts across your accounts.

Savings Plans are shared across a [Consolidated Billing Family][2], so a commitment can apply to usage in multiple accounts. The simulation estimates how the modeled commitment would be distributed across your accounts; actual distribution depends on AWS's application logic.

- {{< ui >}}Summary metrics{{< /ui >}}: High-level estimates for the simulated commitment, such as projected coverage, utilization, and savings compared to on-demand rates.
- {{< ui >}}Projected coverage over time{{< /ui >}}: A time series chart showing how the simulated commitment would apply to your usage over the lookback window, including the portion of usage that would be covered by the commitment versus the portion remaining as on-demand spend.
- {{< ui >}}Coverage by service{{< /ui >}}: A table breaking down the estimated coverage and spend by AWS service, so you can see which services the commitment would apply to.

### Best practices

- Start from a Datadog recommendation when one is available, then adjust the commitment amount to compare scenarios.
- Use a lookback window that reflects your typical usage. Avoid periods with unusual spikes or gaps if you want a representative estimate.
- Treat the results as directional guidance for sizing a commitment, not as a guarantee of future savings.

## Example use cases

### Identify underutilized commitments

**Scenario**: Your Effective Savings Rate (ESR) is lower than expected, even though your coverage is high.

**How to use commitment programs**:  
1. Go to the {{< ui >}}Commitments Overview{{< /ui >}} and check the utilization KPI.
2. In the {{< ui >}}Commitments inventory{{< /ui >}}, sort by utilization in ascending order to identify the least-used commitments. For savings plans, also check the {{< ui >}}Savings Plans with most waste{{< /ui >}} table in the [Least used savings plans](#least-used-savings-plans) section.
3. Reallocate workloads to use these commitments more effectively, or consider modifying or selling unused commitments if your cloud provider allows it.

### Plan for expiring commitments

**Scenario**: Several Reserved Instances are expiring soon, and you want to avoid unexpected on-demand charges.

**How to use commitment programs**: 
1. In the {{< ui >}}Commitments Explorer{{< /ui >}}, review the list of commitments and their expiration dates.
2. Use the filters to focus on soon-to-expire commitments.
3. Plan renewals or replacements in advance to maintain coverage and maximize savings.

### Target high on-demand spend

**Scenario**: Your cloud costs show consistently high on-demand usage for a particular service or region.

**How to use commitment programs**:
1. Use {{< ui >}}On-demand hot-spots{{< /ui >}} to identify which services, regions, or accounts have significant and steady on-demand costs.
2. Analyze usage patterns to confirm they are predictable.
3. Purchase new commitments to cover the consistent usage and reduce costs.

### Reduce waste by shifting workloads to cover unused savings plans

**Scenario**: You have underutilized savings plans and high on-demand costs running in parallel.

**How to use commitment programs**:
1. Use the {{< ui >}}Least used savings plans{{< /ui >}} section to identify recurring patterns of low utilization—for example, consistently unused capacity on certain days or hours.
2. Identify on-demand workloads that could be scheduled during those low-utilization windows to take advantage of unused savings plan coverage.
3. Shift or reschedule those workloads to reduce on-demand spend and improve savings plan utilization.

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/plan/commitment-programs
[2]: https://docs.aws.amazon.com/savingsplans/latest/userguide/sp-applying.html
