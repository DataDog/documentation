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

With Datadog's Commitment Programs, you can take control of your cloud discount strategy. By providing a unified view across cloud providers, Commitment Programs empowers you to make informed decisions, optimize your cloud spend, and ensure you're getting the most value from your discount programs.

With this feature, you can:

- Track and address unused or underused commitments.
- Target high on-demand spend with additional commitments.
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
5. **Review expiration dates** and renewal recommendations.
6. **Take action**. Based on the insights from the Commitment Programs page, you can:

   - Adjust workloads to make better use of your existing commitments and avoid extra on-demand charges.
   - Update commitments by buying or changing them based on your usage data.
   - Plan renewals by renewing or retiring commitments before they expire.
   - Optimize spend by using Datadog's tips to save more and reduce waste.

## Commitments overview

The commitments overview section is where you can review the following Key Performance Indicators (KPI) for your cloud providers and services.

- **Effective Savings Rate (ESR):** The percentage of cost savings achieved by your discount programs compared to on-demand prices, factoring in both utilized and underutilized commitments. _Example: Coverage is 90% but ESR is 65%—you may have underutilized commitments dragging down your savings._
- **Absolute Savings:** The total dollar amount saved by using commitment programs versus on-demand rates. _Example: You spent $10,000 on cloud services last month, but would have spent $14,000 at on-demand rates, so your absolute savings is $4,000._
- **Coverage:** The proportion of your usage protected by a discount program (e.g., Reserved Instances, Savings Plans, or Committed Use Contracts). _Example: If EC2 compute coverage is 50%, half of your usage is on-demand. Increasing coverage to 80% could reduce your bill._
- **Utilization:** How much of your purchased commitments are actually being used. _Example: If a 1-year GCP Committed Use Contract is only 70% utilized, 30% is going unused and may need adjustment._

## Costs overview

The **Costs Overview** section provides a comprehensive summary of your spending on commitment programs. It helps you understand where your cloud costs are going and how your commitments are impacting your overall spend. In this section, you can do the following:

- **Show RI fee:** Toggle the display of Reserved Instance (RI) fees to see the direct costs associated with your reserved capacity, making it easier to distinguish between on-demand and commitment-based spending.
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

Use this section to:

- **Identify high on-demand usage:** Quickly spot services, regions, or accounts with significant on-demand spend.
- **Estimate potential savings:** See how much you could save by converting on-demand usage to commitment-based pricing.
- **Take action:** Use these insights to adjust workloads or purchase new commitments to reduce future on-demand costs.

[1]: https://app.datadoghq.com/cost/plan/commitment-programs
