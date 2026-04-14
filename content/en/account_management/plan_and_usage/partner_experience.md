---
title: Plan and Usage Experience for Partners
description: Explains how Datadog Partners can use the Plan and Usage page to view cost and usage data across customer organizations from a partner admin organization.
further_reading:
- link: "https://docs.datadoghq.com/account_management/plan_and_usage/"
  tag: "Documentation"
  text: "Plan & Usage"
- link: "https://docs.datadoghq.com/account_management/plan_and_usage/cost_details/"
  tag: "Documentation"
  text: "Cost Details"
- link: "https://docs.datadoghq.com/account_management/plan_and_usage/usage_details/"
  tag: "Documentation"
  text: "Usage Details"
- link: "https://docs.datadoghq.com/api/latest/usage-metering/"
  tag: "Documentation"
  text: "Usage Metering API"
---

Datadog partners see a tailored version of the Plan & Usage page designed for managing multiple customer organizations. This page describes the Plan & Usage experience available to partners viewing the UI from a **partner admin organization**.

## Prerequisites

To access the partner Plan & Usage experience, your organization must be a **partner admin organization**. A partner admin organization is the top-level organization that Datadog provisions for partners to manage their customer accounts. If your organization was set up through the Datadog Partner Program and you manage customer organizations under it, you are using a partner admin organization. You can also confirm this if you have multiple contracts with Datadog and can view consolidated cost and usage data across all of them in Plan & Usage.

**Note**: If you are a *customer* of a Datadog partner (rather than the partner themselves), you have the standard Plan & Usage experience. Depending on your pricing arrangement with your partner, you may see only usage data and no cost data. See [Plan & Usage][1] for details.

Partners must have the **Datadog Admin** role, or a custom role with `billing_read` and `usage_read` permissions, to view Plan & Usage data. These are the same permissions required for direct customers.

## Overview

Partners accessing Plan & Usage from their partner admin organization see cost and usage data across all of their customer organizations. Only the **Usage & Cost** tab is available in the partner view; the Plan, Billing History, and Usage Notifications tabs are not displayed.

### Cost Details

View estimated, historical, and projected cost data for all customer organizations in one place. Partners can see a total across all customers, or group and filter by customer organization, product, and account. See [Cost Details][2] for full documentation.

{{< img src="account_management/plan_and_usage/partner-cost-details.png" alt="Cost Summary page for a partner admin organization showing estimated and projected costs across customer organizations with a cumulative cost breakdown chart and per-customer cost table" >}}

### Usage Details

View usage data for all customer organizations in one place. Partners can see a total across all customers, or group and filter by customer organization, product, and account. See [Usage Details][3] for full documentation.

{{< img src="account_management/plan_and_usage/partner-usage-details.png" alt="Usage summary page for a partner admin organization showing usage data across customer organizations" >}}

## Feature availability

The following table lists each Plan & Usage feature and its availability for direct customers and partners viewing from a partner admin organization.

| Feature | Direct Customers | Partners | Notes |
|---|---|---|---|
| Cost summary | {{< X >}} | {{< X >}} |  |
| Projected costs | {{< X >}} | {{< X >}} |  |
| Usage summary | {{< X >}} | {{< X >}} |  |
| Cost & usage API endpoints | {{< X >}} | {{< X >}} | See [Supported API endpoints](#supported-api-endpoints) for the full list |
| Cost attribution |  |  |  |
| Usage attribution | {{< X >}} |  | Individual customer organizations can access usage attribution from their own [Plan & Usage][1] page |
| Product-specific usage tables (for example: custom metrics, logs usage by index) | {{< X >}} |  | Individual customer organizations can view these tables from their own [Usage Details][3] page |
| Datadog costs in Cloud Cost Management | {{< X >}} |  | Not available at the partner admin org level or the customer org level for customers purchasing through a partner |
| Plan and Billing History tabs |  |  | Not available at the partner admin org level or the customer org level for customers purchasing through a partner |
| [Bill Overview][4] | {{< X >}} |  | Not available at the partner admin org level |
| Usage Notifications tab | {{< X >}} |  | Individual customer organizations can configure usage notifications from their own [Plan & Usage][1] page |

## Supported API endpoints

Partners can also access cost and usage data programmatically through the following [Usage Metering API][5] endpoints:

| Endpoint | Description |
|---|---|
| [Get estimated cost across your account][6] | Retrieve estimated cost data for the current month |
| [Get billable usage across your account][7] | Retrieve billable usage summaries |
| [Get hourly usage by product family][8] | Retrieve hourly usage data broken down by product family |
| [Get historical cost across your account][9] | Retrieve historical cost data for previous months |
| [Get projected cost across your account][10] | Retrieve projected end-of-month cost data |
| [Get usage across your account][11] | Retrieve usage summary data across your account |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/plan_and_usage/
[2]: /account_management/plan_and_usage/cost_details/
[3]: /account_management/plan_and_usage/usage_details/
[4]: /account_management/plan_and_usage/bill_overview/
[5]: /api/latest/usage-metering/
[6]: /api/latest/usage-metering/#get-estimated-cost-across-your-account
[7]: /api/latest/usage-metering/#get-billable-usage-across-your-account
[8]: /api/latest/usage-metering/#get-hourly-usage-by-product-family
[9]: /api/latest/usage-metering/#get-historical-cost-across-your-account
[10]: /api/latest/usage-metering/#get-projected-cost-across-your-account
[11]: /api/latest/usage-metering/#get-usage-across-your-account
