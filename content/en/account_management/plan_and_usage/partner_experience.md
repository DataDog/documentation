---
title: Plan and Usage Experience for Partners
description: Lorem Ipsum
further_reading:
- link: "https://docs.datadoghq.com/account_management/plan_and_usage/"
  tag: "Documentation"
  text: "Plan & Usage Settings"
- link: "https://docs.datadoghq.com/account_management/plan_and_usage/cost_details/"
  tag: "Documentation"
  text: "Cost Details"
- link: "https://docs.datadoghq.com/account_management/plan_and_usage/usage_details/"
  tag: "Documentation"
  text: "Usage Details"
---

This page describes how the **Plan & Usage** experience looks for **Datadog partners** viewing the UI from a partner admin organization, and highlights how it differs from the experience of direct customers. It covers the following:

- UI capabilities partners get
- Feature gaps vs the direct customer experience
- Per-page behaviors (Plan & Usage, Cost Details, Usage Details)

## UI features for partners

Partners accessing Plan & Usage from their partner admin org automatically get:

### Consolidated Cost & Usage Across Customers
- Partners can view **cost and usage data across all of their customer organizations**.
- This includes visibility into each customer org's hierarchy, even if customers are in *different org hierarchies*.  
- Access to this consolidated view is **automatic** — partners do *not* need to configure additional permissions or make access requests.

### Customer Org Hierarchies
- Partners see each customer's org(s) and the parent/child relationships within those customer orgs.

## Feature Gaps vs Direct Customer UX

While partners can view consolidated cost and usage data, there are **several features available to direct customers that are *not supported*** when viewing from a partner admin org:

| Feature                                                    | Supported for Direct Customers | Supported for Partners |
|------------------------------------------------------------|--------------------------------|------------------------|
| Cost & usage attribution                                   | ✓                              | ❌                      |
| Product-specific usage tables (e.g., custom metrics, logs) | ✓                              | ❌                      |
| Datadog Costs in *Cloud Cost Management*                   | ✓                              | ❌                      |
| Plan, Billing History, Usage Notifications tabs            | ✓                              | ❌                      |


## Partner Experience by Page

### Plan & Usage Settings
- Only the **Usage & Cost** tab is available in the partner view.
- The main **Plan settings**, **Billing History**, and **Usage Notifications** tabs are not available in the partner view.

### Cost Details
- Partners see **aggregated cost summaries** for all their customers.
- Cost is grouped per customer org, with estimated, historical, and projected costs available.
- Partners cannot currently access cost attribution breakdowns or the *Datadog Costs* Cloud Cost Management integration from this view.

### Usage Details
- Partners see **aggregated usage summaries** across their customer orgs.
- Detailed tables such as "Top Custom Metrics" and "Logs Usage by Index" are *not supported* in the partner view.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}