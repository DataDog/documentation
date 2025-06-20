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

Cloud providers offer commitment-based discount programs (like {{< tooltip text="Reserved Instance (RI)" tooltip="A billing discount for committing to use a specific instance type for a one- or three-year term." >}} and {{< tooltip text="Savings Plans" tooltip="Flexible cloud discount programs that provide lower prices in exchange for a commitment to a consistent amount of usage (measured in $/hour) over a term." >}}) to help you save on predictable usage. Datadog's Commitment Programs feature helps you monitor, optimize, and maximize the value of these discounts across your cloud environments.

With this feature, you can:

- Track and address unused or underused commitments.
- Target high {{< tooltip text="on-demand" tooltip="Cloud resources billed at standard rates, without any commitment or discount program." >}} spend with additional commitments.
- Monitor expirations and plan timely renewals.
- Reduce waste by right-sizing or reallocating commitments.

{{< img src="cloud_cost/planning/planning-commitments-overview.png" alt="Dashboard showing filters, KPIs (Effective Savings Rate, Absolute Savings, Coverage, Utilization), a cost-over-time bar chart, and a table of on-demand hot-spots by region, instance family, and database engine." style="width:100%;" >}}

This page describes the information available on the [Commitment Programs page][1] so you can better understand how your commitments are being utilized and take the necessary action.

## Getting started

Navigate the Commitment Programs page and take action.

1. Access the Commitment Programs page in Cloud Cost Management by navigating to: [**Cloud Cost > Planning > Commitment Programs**][1].
2. **Review the KPIs** in the [commitments overview](#commitments-overview) section.
3. **Use filters** to focus on specific accounts, regions, or services.
4. **Explore the [costs overview](#costs-overview)** to analyze utilization, coverage, and expiring commitments.
5. **Review expiration dates and renewal recommendations in the [Commitments Explorer](#commitments-explorer)**.
6. **Take action**. Based on the insights from the Commitment Programs page, you can:

   - Adjust workloads to make better use of your existing commitments and avoid extra on-demand charges.
   - Update commitments by buying or changing them based on your usage data.
   - Plan renewals by renewing or retiring commitments before they expire.
   - Optimize spend by using Datadog's tips to save more and reduce waste.

## Commitments overview

The commitments overview section is where you can review the following Key Performance Indicators (KPI) for your cloud providers and services.

{{< img src="cloud_cost/planning/commitments-overview.png" alt="Dashboard summarizing cloud commitment KPIs, providing a quick overview of savings performance and highlights areas needing attention." style="width:100%;" >}}

- **Effective Savings Rate (ESR):** The percentage of cost savings achieved by your discount programs compared to on-demand prices, factoring in both utilized and underutilized commitments.

  _Example: Your RIs may offer a 62% discount, but if your ESR is only 45%, it indicates that underutilized commitments are reducing your actual savings._
- **Absolute Savings:** The total dollar amount saved by using commitment programs versus on-demand rates.

  _Example: You spent $10,000 on cloud services last month, but would have spent $14,000 at on-demand rates, so your absolute savings is $4,000._
- **Coverage:** The proportion of your usage protected by a discount program (such as Reserved Instances, Savings Plans, or {{< tooltip text="Committed Use Contracts" tooltip="Agreements with cloud providers to use a certain amount of resources for a discounted rate over a set period." >}}).

  _Example: If EC2 compute coverage is 50%, half of your usage is on-demand. Increasing coverage to 80% could reduce your bill._
- **Utilization:** How much of your purchased commitments are actually being used.

  _Example: If a 1-year GCP Committed Use Contract is only 70% utilized, 30% is going unused and may need adjustment._

## Costs overview

{{< img src="cloud_cost/planning/commitments-rds-costs-overview.png" alt="Bar chart of RDS costs from March 1 to March 31, grouped by cost type, region, and instance family, with a highlighted total of $20.55k." style="width:100%;" >}}

The **Costs Overview** section provides a comprehensive summary of your spending on commitment programs. It helps you understand where your cloud costs are going and how your commitments are impacting your overall spend. In this section, you can do the following:

- **Show RI fee:** Toggle the display of RI fees to see the direct costs associated with your reserved capacity, making it easier to distinguish between on-demand and commitment-based spending.
- **Group By options:** Organize and analyze your costs by different dimensions, such as cost type, region, instance family, or database engine. This allows you to:
  - Identify which regions or services are driving the most spend
  - Compare costs across different instance families or database engines
  - Pinpoint areas where you may benefit from additional commitments or need to adjust your strategy
- **Total commitment spend:** View how much you are spending on reserved capacity versus on-demand, helping you assess the effectiveness of your commitment strategy.
- **Savings breakdown:** See the savings achieved through commitment programs compared to on-demand pricing, giving you a clear picture of the financial impact of your discount programs.
- **Service-level details:** Analyze costs by service, region, or account to identify where your commitment programs are delivering the most value and where there may be opportunities for further optimization.

By leveraging the Costs Overview section, you can make informed decisions about purchasing, renewing, or adjusting your commitments to maximize savings and minimize waste in your cloud environment.

## On-demand hot-spots

The **On-demand hot-spots** section highlights areas where you are incurring high on-demand costs, which may indicate opportunities to purchase additional commitments.

{{< img src="cloud_cost/planning/commitments-on-demand.png" alt="Table of AWS RDS on-demand hot spots, listing regions, instance families, and database engines with 0% coverage and their associated high on-demand costs." style="width:100%;" >}}

Use this section to:

- **Identify high on-demand usage:** Quickly spot services, regions, or accounts with significant on-demand spend.
- **Estimate potential savings:** See how much you could save by converting on-demand usage to commitment-based pricing.
- **Take action:** Use these insights to adjust workloads or purchase new commitments to reduce future on-demand costs.

## Commitments Explorer

The Commitments Explorer provides a detailed, interactive table of all your cloud commitment contracts, such as database reserved instances. It allows you to browse, search, filter, and sort your commitments by key attributes so you can track your inventory, monitor expiration dates, and identify opportunities to optimize usage and savings. 

{{< img src="cloud_cost/planning/commitments-explorer-3.png" alt="Table of AWS RDS Reserved Instance commitments, highlighting the 'Columns' button, an expired commitment, and a commitment that is expiring soon." style="width:100%;" >}}

- You can customize the table view by showing or hiding columns like Start Date, Multi-AZ, and NFU # (where applicable) to focus on the information most relevant to your needs.
- The table also highlights commitments that have recently expired or are expiring soon, helping you plan renewals and avoid paying on-demand prices.

The columns displayed in the Commitments Explorer are customizable and vary depending on the product (for example, Amazon RDS or EC2) and the specific commitment program. The following table describes the available columns.

| Column | Description | Product |
|---|---|---|
| Reservation ARN | The unique Amazon Resource Name (ARN) that identifies the Reserved Instance commitment. | All |
| Payment Model | The payment option for the Reserved Instance (for example, No Upfront, Partial Upfront, All Upfront). | All |
| Term | The duration of the Reserved Instance commitment (for example, 1 Year, 3 Years). | All |
| Region | The AWS Region where the Reserved Instance is applied. | All |
| Instance Type | The type and size of the instance covered by the commitment (for example, `db.r6g.large` for RDS or `m5.large` for EC2). | All |
| Start Date | The date when the Reserved Instance term begins. | All |
| End Date | The date when the Reserved Instance term ends. | All |
| Instance # | The number of instances covered by the Reserved Instance. | All |
| NFU # | The number of Normalization Factor Units (NFUs) covered, which standardizes instance sizes for comparison. | All |
| Utilization | The percentage of the Reserved Instance that was used during the selected period. | All |
| DB Engine | The database engine used by the instance (such as PostgreSQL, MySQL, SQL Server). | Amazon RDS |
| Multi-AZ | Indicates whether the Reserved Instance covers a multiple availability zone deployment (Yes/No). | Amazon RDS |
| OS | The operating system of the instance (for example, Linux or Windows). | Amazon EC2 |
| Offering Class | The class of Reserved Instance (Standard or Convertible). | Amazon EC2 |
| AZ | The specific Availability Zone where the Reserved Instance is located. | Amazon EC2 |

## Example use cases

### Identify underutilized commitments

**Scenario**  
You notice that your Effective Savings Rate (ESR) is lower than expected, even though your coverage is high.

**How to use commitment programs**  
1. Go to the **Commitments Overview** and check the utilization KPI.
2. Filter by account, region, or instance family to pinpoint which commitments are underutilized.
3. Take action by reallocating workloads to use these commitments more effectively, or consider modifying or selling unused commitments if your cloud provider allows.

### Plan for expiring commitments

**Scenario**  
Several Reserved Instances are set to expire next month, and you want to avoid unexpected on-demand charges.

**How to use Commitment Programs**  
1. In the **Costs Overview**, review the list of commitments and their expiration dates.
2. Use the filters to focus on soon-to-expire commitments.
3. Plan renewals or replacements in advance to maintain coverage and maximize savings.

### Targeting high on-demand spend

**Scenario**  
Your cloud bill shows consistently high on-demand usage for a particular service or region.

**How to use Commitment Programs**  
1. Use the **On-demand Hot-Spots** section to identify which services, regions, or accounts have significant and steady on-demand costs.
2. Analyze the usage patterns to confirm they are predictable.
3. Purchase new commitments to cover the consistent usage and reduce costs.

### Optimize commitment strategy across multiple accounts

**Scenario**  
You manage multiple cloud accounts and want to ensure all are benefiting from commitment programs.

**How to use Commitment Programs**  
1. Use the filters to compare KPIs across different accounts.
2. Identify accounts with low coverage or utilization.
3. Adjust your purchasing strategy to allocate commitments where they have the most impact.

### Analyze savings breakdown

**Scenario**  
You want to report on the financial impact of your commitment programs to stakeholders.

**How to use Commitment Programs**  
1. In the **Costs Overview**, view the savings breakdown compared to on-demand pricing.
2. Group costs by service, region, or account to highlight where the most savings are achieved.
3. Export or screenshot the data for use in reports or presentations.

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/plan/commitment-programs
