---
title: Commitment Programs
description: Learn how to manage the performance and status of your cloud discount programs.
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Learn about Cloud Cost Management"
---

<div class="alert alert-info">CCM Commitment Programs supports Amazon RDS Reserved Instances.</div>

## Overview

Cloud providers offer significant discounts through commitment-based programs. These programs can help you save substantially on your cloud bills, but managing them effectively can be challenging. Datadog's Commitment Programs feature provides a dedicated page in Cloud Cost Management (CCM) to give you comprehensive visibility into the performance and status of your cloud discount programs so that you make the most of them.

With this feature, you can:
- Track how effectively you are utilizing your commitments
- Identify trends of high on-demand usage that could benefit from additional commitments
- Pinpoint underutilized or expiring commitments so you can plan for renewals
- Take action to optimize your cloud spend

This page describes the information available on the [Commitment Programs page][1] so you can better understand how your commitments are being utilized and take the necessary action.

## Getting Started

1. Access the Commitment Programs page in Cloud Cost Management by navigating to: [**Cloud Cost > Planning > Commitment Programs**][1].
2. **Review the KPIs** in the [commitments overview](#commitments-overview) section.
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

# Commitment Programs

## Overview

Cloud providers such as AWS, Azure, and GCP offer significant discounts through commitment-based programs like AWS Savings Plans, Reserved Instances, Azure Reservations, and GCP Committed Use Contracts. These programs can help you save substantially on your cloud bills, but managing them effectively can be challenging. Datadog's Commitment Programs feature provides a dedicated page in Cloud Cost Management (CCM) to give you comprehensive visibility into the performance and status of your cloud discount programs.

With this feature, you can:
- Track how effectively you are utilizing your commitments
- Identify trends and areas of opportunity or risk
- Pinpoint underutilized or expiring commitments
- Take action to optimize your cloud spend

## Why Use Commitment Programs?

Without centralized visibility, it's difficult to know if you're making the most of your cloud discount programs. Common challenges include:
- **Understanding Utilization:** Are your commitments being fully used, or are you wasting money on unused capacity?
- **Identifying High On-Demand Spend:** Are there areas where you could save by purchasing more commitments?
- **Tracking Expirations:** Which commitments are about to expire, and how well are they being used?

Datadog's Commitment Programs feature addresses these challenges by providing actionable insights and a unified view across your cloud providers.

## Key Use Cases

- **Track Commitment Utilization Rates:** See how effectively your AWS, Azure, and GCP commitments are being used.
- **Identify Underutilized Commitments:** Quickly spot unused or underused commitments, such as Reserved Instances that are no longer needed due to workload changes.
- **Find High On-Demand Spend:** Identify services or accounts with significant on-demand usage that could benefit from additional commitments.
- **Monitor Expiring Commitments:** Plan for renewals by tracking which commitments are expiring soon and their current utilization rates.

## Objectives

The Commitment Programs feature is designed to:
- **Centralize Visibility:** Provide a unified dashboard for all your cloud discount programs (starting with AWS, expanding to Azure and GCP).
- **Deliver Detailed Insights:** Offer granular data on utilization, coverage, on-demand spend, and expirations.
- **Identify Waste and Risks:** Highlight underutilized commitments, high on-demand spend, and upcoming expirations.
- **Empower Proactive Management:** Give you the insights needed to optimize existing commitments and plan for future purchases or renewals.

## Main Page and Metrics

The Commitment Programs page in CCM is your central hub for managing cloud discount programs. Here's what you'll find:

### Key Performance Indicators (KPIs)
>>>>>>> Stashed changes

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
