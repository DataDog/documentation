---
title: Commitment Programs
description: Choose a cloud provider to review commitment savings, coverage, utilization, and expiration dates.
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Learn about Cloud Cost Management"
---

## Overview

Cloud providers offer commitment-based discounts to help you save on predictable usage. A {{< tooltip text="Reserved Instance (RI)" tooltip="A billing discount for committing to use a specific instance configuration for a one- or three-year term." >}} discounts a specific configuration. {{< tooltip text="Savings Plans" tooltip="Cloud discount programs that lower prices in exchange for a consistent spending commitment (measured in $/hour) over a term." >}} discount usage in exchange for a spending commitment.

Use Datadog's Commitment Programs to monitor savings, address unused commitments, and plan renewals across your cloud environments. Identify predictable {{< tooltip text="on-demand" tooltip="Cloud resources billed at standard rates, without any commitment or discount program." >}} usage that could benefit from additional commitments.

## Getting started

1. Complete [Cloud Cost Management setup][5] for your provider.
2. Open [**Commitment Programs**][1] in Cloud Cost Management.
3. Select your cloud provider in the left navigation. Available views and supported commitment types vary by provider.
4. Follow the provider guide to select billing accounts, a reporting period, and any additional filters.

| Provider guide | Supported commitments | Views |
|---|---|---|
| [AWS][2] | Reserved Instances and Savings Plans for EC2, RDS, and ElastiCache | Overview and Simulator |
| [Azure][3] | Reservations and savings plans for all eligible services; Azure Databricks pre-purchase plans | Overview, Coverage, and Inventory |
| [Google Cloud][4] | Compute flexible committed use discounts (CUDs) | Overview |

Azure utilization, unused costs, and pre-purchase plan balances require [billing account scope exports][6]. Provider guides describe setup requirements and Preview features.

{{< callout header="false" btn_hidden="true" respect-site-support="false" >}}
Screenshot placeholder: Commitment Programs showing the provider navigation and the available pages for the selected provider. Use sanitized example data.
{{< /callout >}}

<span id="costs-overview"></span>

## Commitments overview

Review savings for the selected scope and reporting period:

- **Effective Savings Rate (ESR)**: Percentage saved compared with on-demand prices, accounting for unused commitments. For example, a reservation discount of 62% can produce an ESR of only 45% if commitments are underused.
- **Realized Savings**: The amount saved compared with on-demand rates. For example, spending $10,000 on usage that would cost $14,000 on demand produces $4000 in savings.

Provider guides explain the applicable discounts and savings charts: [AWS][2], [Azure][3], and [Google Cloud][4].

## On-demand hot-spots

Find commitment-eligible usage billed at on-demand rates. Coverage measures how much eligible usage or cost is covered by commitments. Investigate recurring uncovered usage before purchasing additional commitments.

For filters, tables, and charts, see [AWS on-demand hot-spots][7], [Azure Coverage][8], or [Google Cloud on-demand hot-spots][9].

<span id="commitments-explorer"></span>

## Commitments inventory

Review commitments active during the selected period, including their utilization and expiration dates. Utilization measures how much of your purchased commitment you use; unused spend identifies commitment cost that did not cover usage.

For inventory columns and expiration filters, see [AWS inventory][10], [Azure Inventory][11], or [Google Cloud inventory][12].

## Least used savings plans

For daily waste patterns, savings plans ranked by waste, and hourly utilization patterns, see [AWS least used savings plans][13].

## Savings plan simulation

Estimate the effect of an additional AWS Savings Plan using historical usage. For setup, permissions, recommendations, and how to interpret the estimates, see [AWS Savings Plan simulation][14].

<span id="run-a-simulation"></span>
See [Run a simulation][15] for the steps.

<span id="interpret-the-results"></span>
See [Interpret the results][16] for assumptions and result breakdowns.

## Example use cases

### Identify underutilized commitments

If savings are lower than expected despite high coverage, review utilization and unused spend. Adjust workloads to use existing commitments; consider changing commitments where your provider supports it. See the [AWS walkthrough][17] or the inventory guidance for [Azure][11] and [Google Cloud][12].

### Plan for expiring commitments

Review expiration dates and filter for commitments nearing their end date. Plan renewals or replacements to maintain coverage. See the [AWS walkthrough][18] or the inventory guidance for [Azure][11] and [Google Cloud][12].

### Target high on-demand spend

Investigate services, regions, or accounts with significant on-demand costs. Confirm that usage is predictable before purchasing commitments. See the [AWS walkthrough][19], [Azure Coverage][8], or [Google Cloud on-demand hot-spots][9].

### Reduce waste by shifting workloads to cover unused savings plans

Identify recurring periods of unused commitment spend, then assess whether on-demand workloads can run during those periods. See the [AWS walkthrough][20] for using daily waste and hourly utilization patterns.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/plan/commitment-programs
[2]: /cloud_cost_management/planning/aws_commitment_programs/
[3]: /cloud_cost_management/planning/azure_commitment_programs/
[4]: /cloud_cost_management/planning/google_cloud_commitment_programs/
[5]: /cloud_cost_management/setup/
[6]: /cloud_cost_management/setup/azure/#unused-commitment-costs
[7]: /cloud_cost_management/planning/aws_commitment_programs/#on-demand-hot-spots
[8]: /cloud_cost_management/planning/azure_commitment_programs/#investigate-on-demand-spend
[9]: /cloud_cost_management/planning/google_cloud_commitment_programs/#on-demand-hot-spots
[10]: /cloud_cost_management/planning/aws_commitment_programs/#commitments-inventory
[11]: /cloud_cost_management/planning/azure_commitment_programs/#manage-your-commitments
[12]: /cloud_cost_management/planning/google_cloud_commitment_programs/#commitments-inventory
[13]: /cloud_cost_management/planning/aws_commitment_programs/#least-used-savings-plans
[14]: /cloud_cost_management/planning/aws_commitment_programs/#savings-plan-simulation
[15]: /cloud_cost_management/planning/aws_commitment_programs/#run-a-simulation
[16]: /cloud_cost_management/planning/aws_commitment_programs/#interpret-the-results
[17]: /cloud_cost_management/planning/aws_commitment_programs/#identify-underutilized-commitments
[18]: /cloud_cost_management/planning/aws_commitment_programs/#plan-for-expiring-commitments
[19]: /cloud_cost_management/planning/aws_commitment_programs/#target-high-on-demand-spend
[20]: /cloud_cost_management/planning/aws_commitment_programs/#reduce-waste-by-shifting-workloads-to-cover-unused-savings-plans
