
---
title: Commitment Programs
description: Learn how to manage the performance and status of your cloud discount programs.
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Learn about Cloud Cost Management"
---

## Overview

Cloud providers such as AWS, Azure, and GCP offer significant discounts through commitment-based programs. These programs can help you save substantially on your cloud bills, but managing them effectively can be challenging. Datadog's Commitment Programs feature provides a dedicated page in Cloud Cost Management (CCM) to give you comprehensive visibility into the performance and status of your cloud discount programs so that you make the most of them.

With this feature, you can:
- Track how effectively you are utilizing your commitments
- Identify trends of high on-demand usage that could benefit from additional commitments
- Pinpoint underutilized or expiring commitments so you can plan for renewals
- Take action to optimize your cloud spend

This page describes the information available on the [Commitment Programs page][1] so you can better understand how your commitments are being utilized and take the necessary action.

## Getting Started

1. Access the Commitment Programs page in Cloud Cost Management by navigating to: [**Cloud Cost > Planning > Commitment Programs**][1].
2. **Review the KPIs** in the [commitments overview](#commitments-overview) section for your cloud providers and services.
3. **Explore detailed pages** to analyze utilization, coverage, and expiring commitments.
4. **Use filters** to focus on specific accounts, regions, or services.
5. **Take action** based on insights—adjust workloads, purchase new commitments, or plan renewals to optimize your cloud spend.

## Commitments overview

The commitments overview section is where you can review the following Key Performance Indicators (KPI) for your cloud providers and services.

- **Effective Savings Rate (ESR)**
  - **What it is:** The percentage of cost savings achieved by your discount programs compared to on-demand prices, factoring in both utilized and underutilized commitments.
  - **Why it matters:** ESR gives a holistic view of your savings efficiency. High coverage with low ESR may indicate underutilized commitments.
  - **Example:** If your coverage is 90% but ESR is 65%, you may have underutilized commitments dragging down your savings.

- **Absolute savings**
  - **What it is:** The total dollar amount you have saved by using commitment programs compared to what you would have paid at on-demand rates.
  - **Why it matters:** Absolute savings provides a clear, tangible measure of the financial benefit you are receiving from your discount programs, making it easy to quantify the impact of your commitment strategy.
  - **Example:** If your organization spent $10,000 on cloud services last month, but would have spent $14,000 at on-demand rates, your absolute savings from commitment programs is $4,000 for that month.

- **Coverage**
  - **What it is:** The proportion of your overall usage protected by a discount program (e.g., Reserved Instances, Savings Plans, or Committed Use Contracts).
  - **Why it matters:** Low coverage means more of your usage is billed at higher on-demand rates. Increasing coverage can lead to significant savings.
  - **Example:** If your EC2 compute coverage is 50%, half of your usage is on-demand. Increasing coverage to 80% could reduce your bill.

- **Utilization**
  - **What it is:** How much of your purchased commitments are actually being used.
  - **Why it matters:** Low utilization means you're paying for commitments you aren't fully using, leading to waste. Helps you fine-tune or right-size your commitments.
  - **Example:** If your 1-year GCP Committed Use Contract is only 70% utilized, 30% is going unused. This may indicate a need to adjust workloads or commitment levels.

## Analyze utilization


## Take action



## Costs overview

<div class="alert alert-info">Only Amazon RDS is supported.</div>


## On-demand hot-spots



## Additional Features

- **Detailed Utilization Pages:** View utilization rates for all commitments, see waste breakdowns, and identify specific workloads or services linked to unused commitments.
- **Coverage & On-Demand Spend Trends:** Analyze high on-demand costs by service, region, and account. Get suggestions for additional commitments and projected savings.
- **Expiration Tracker:** List commitments expiring in the next 30/60/90 days, with current utilization rates and renewal recommendations.
- **Easy Filtering & Navigation:** Filter by cloud provider, service, account, region, and more. Navigate easily between AWS, Azure, and GCP services.

[1]: https://app.datadoghq.com/cost/plan/commitment-programs