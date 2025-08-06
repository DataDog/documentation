---
title: Commitment Programs
description: Learn how to manage the performance and status of your cloud discount programs.
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Learn about Cloud Cost Management"
---

<div class="alert alert-info">CCM Commitment Programs supports Amazon RDS Reserved Instances and Amazon EC2 Reserved Instances.</div>

## Overview

Cloud providers offer commitment-based discount programs, such as {{< tooltip text="Reserved Instance (RI)" tooltip="A billing discount for committing to use a specific instance configuration for a one- or three-year term." >}} and {{< tooltip text="Savings Plans" tooltip="Flexible cloud discount programs that provide lower prices in exchange for a commitment to a consistent amount of usage (measured in $/hour) over a term." >}}, to help you save on predictable usage. Datadog's Commitment Programs feature helps you monitor, optimize, and maximize the value of these discounts across your cloud environments.

With Commitment Programs, you can:
- Track and address unused or underused commitments
- Target high {{< tooltip text="on-demand" tooltip="Cloud resources billed at standard rates, without any commitment or discount program." >}} spend with additional commitments
- Monitor expirations and plan timely renewals

{{< img src="cloud_cost/planning/planning-commitments-overview.png" alt="Dashboard showing filters, KPIs (Effective Savings Rate, Absolute Savings, Coverage, Utilization), a cost-over-time bar chart, and a table of on-demand hot-spots by region, instance family, and database engine." style="width:100%;" >}}


## Getting started

Use Commitment Programs to understand and optimize your cloud commitments.

1. Go to [**Cloud Cost > Planning > Commitment Programs**][1] in Cloud Cost Management.
2. Use filters to focus on specific accounts, regions, or services.
3. Gain insights into your KPIs, commitment costs, and renewal recommendations:
   - Review KPIs in the [Commitments Overview](#commitments-overview) section.
   - Explore the [Costs Overview](#costs-overview) to analyze utilization and coverage.
   - Check expiration dates and renewal recommendations in the [Commitments Explorer](#commitments-explorer).
4. Take action based on these insights:
   - Adjust workloads to better use your commitments and avoid extra on-demand charges.
   - Update commitments by buying or changing them based on your usage data.
   - Plan renewals or retire commitments before they expire.
   - Optimize spend using Datadog's recommendations to save more and reduce waste.

## Commitments overview

Review these Key Performance Indicators (KPIs) for your cloud providers and services:

{{< img src="cloud_cost/planning/commitments-overview.png" alt="Dashboard summarizing cloud commitment KPIs, providing a quick overview of savings performance and highlights areas needing attention." style="width:100%;" >}}

- **Effective Savings Rate (ESR):** Percentage of cost savings achieved by your discount programs compared to on-demand prices, factoring in both utilized and underutilized commitments.
  - _Example: Your RIs may offer a 62% discount, but if your ESR is only 45%, underutilized commitments are reducing your actual savings._
- **Absolute Savings:** Total dollar amount saved by using commitment programs versus on-demand rates.
  - _Example: You spent $10,000 on cloud services last month, but would have spent $14,000 at on-demand rates, so your absolute savings is $4,000._
- **Coverage:** Proportion of your usage protected by a discount program (such as Reserved Instances, Savings Plans, or {{< tooltip text="Committed Use Contracts" tooltip="Agreements with cloud providers to use a certain amount of resources for a discounted rate over a set period." >}}).
  - _Example: If EC2 compute coverage is 50%, half of your usage is on-demand. Increasing coverage to 80% could reduce your bill._
- **Utilization:** How much of your purchased commitments are actually being used.
  - _Example: If a 1-year GCP Committed Use Contract is only 70% utilized, 30% is going unused and may need adjustment._

## Costs overview

Costs overview summarizes your spending on commitment programs, helping you understand where your cloud costs are going and how commitments impact your overall spend. In this section, you can:

{{< img src="cloud_cost/planning/commitments-rds-costs-overview.png" alt="Bar chart of RDS costs from March 1 to March 31, grouped by cost type, region, and instance family, with a highlighted total of $20.55k." style="width:100%;" >}}

- **Show RI fee:** Toggle the display of RI fees to change reserved capacity to commitments making it easier to distinguish between on-demand and commitment-based spending.
- **Group By options:** Organize and analyze your costs by cost type, region, instance family, or database engine. Identify which regions or services are driving the most spend, compare costs, and pinpoint areas for additional commitments or strategy adjustments.
- **Total commitment spend:** View how much you are spending on reserved capacity versus on-demand, helping you assess the effectiveness of your commitment strategy.
- **Savings breakdown:** See the savings achieved through commitment programs compared to on-demand pricing.
- **Service-level details:** Analyze costs by service, region, or account to identify where your commitment programs are delivering the most value and where there may be opportunities for further optimization.

Use this section to make informed decisions about purchasing, renewing, or adjusting your commitments to maximize savings and minimize waste.

## On-demand hot-spots

On-demand hot-spots highlight areas with high on-demand costs, which may indicate opportunities to purchase additional commitments.

{{< img src="cloud_cost/planning/commitments-on-demand.png" alt="Table of AWS RDS on-demand hot spots, listing regions, instance families, and database engines with 0% coverage and their associated high on-demand costs." style="width:100%;" >}}

- **Identify high on-demand usage:** Quickly spot services, regions, or accounts with significant on-demand spend.
- **Estimate potential savings:** See how much you could save by converting on-demand usage to commitment-based pricing.
- **Take action:** Adjust workloads or purchase new commitments to reduce future on-demand costs.

## Commitments Explorer

Commitments Explorer provides a detailed, interactive table of all your cloud commitment contracts, such as database reserved instances. Browse, search, filter, and sort your commitments by key attributes to track your inventory, monitor expiration dates, and identify opportunities to optimize usage and savings.

{{< img src="cloud_cost/planning/commitments-explorer-3.png" alt="Table of AWS RDS Reserved Instance commitments, highlighting the 'Columns' button, an expired commitment, and a commitment that is expiring soon." style="width:100%;" >}}

- Customize the table view to show or hide columns so you can focus on the most relevant information.
- The table highlights commitments that have recently expired or are expiring soon, helping you plan renewals and avoid paying on-demand prices.

The columns displayed in Commitments Explorer vary depending on the product (for example, Amazon RDS or EC2) and the specific commitment program. Here are the available columns:

| Column | Description | Product |
|---|---|---|
| Reservation ARN | Unique Amazon Resource Name (ARN) identifying the Reserved Instance commitment. | All |
| Payment Model | Payment option for the Reserved Instance (for example, No Upfront, Partial Upfront, All Upfront). | All |
| Term | Duration of the Reserved Instance commitment (for example, 1 Year, 3 Years). | All |
| Region | AWS Region where the Reserved Instance is applied. | All |
| Instance Type | Type and size of the instance covered by the commitment (for example, `db.r6g.large` for RDS or `m5.large` for EC2). | All |
| Start Date | Date when the Reserved Instance term begins. | All |
| End Date | Date when the Reserved Instance term ends. | All |
| Instance # | Number of instances covered by the Reserved Instance. | All |
| NFU # | Number of Normalization Factor Units (NFUs) covered, which standardizes instance sizes for comparison. | All |
| Utilization | Percentage of the Reserved Instance used during the selected period. | All |
| DB Engine | Database engine used by the instance (such as PostgreSQL, MySQL, SQL Server). | Amazon RDS |
| Multi-AZ | Indicates whether the Reserved Instance covers a multiple availability zone deployment (Yes/No). | Amazon RDS |
| OS | Operating system of the instance (such as Linux or Windows). | Amazon EC2 |
| Offering Class | Class of Reserved Instance (Standard or Convertible). | Amazon EC2 |
| AZ | Specific Availability Zone where the Reserved Instance is located. | Amazon EC2 |

## Example use cases

### Identify underutilized commitments

**Scenario**: Your Effective Savings Rate (ESR) is lower than expected, even though your coverage is high.

**How to use commitment programs**:  
1. Go to the **Commitments Overview** and check the utilization KPI.
2. Filter by account, region, or instance family to pinpoint which commitments are underutilized.
3. Reallocate workloads to use these commitments more effectively, or consider modifying or selling unused commitments if your cloud provider allows it.

### Plan for expiring commitments

**Scenario**: Several Reserved Instances are set to expire next month, and you want to avoid unexpected on-demand charges.

**How to use commitment programs**: 
1. In the **Commitments Explorer**, review the list of commitments and their expiration dates.
2. Use the filters to focus on soon-to-expire commitments.
3. Plan renewals or replacements in advance to maintain coverage and maximize savings.

### Target high on-demand spend

**Scenario**: Your cloud bill shows consistently high on-demand usage for a particular service or region.

**How to use commitment programs**:
1. Use **On-demand Hot-Spots** to identify which services, regions, or accounts have significant and steady on-demand costs.
2. Analyze usage patterns to confirm they are predictable.
3. Purchase new commitments to cover the consistent usage and reduce costs.

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/plan/commitment-programs
