---
title: Plan and Usage Experience for Partners
description: Explains how Datadog Partners can use the Plan and Usage page to view cost and usage data
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

Datadog partners see a different version of the Plan & Usage page compared to direct customers. This page describes how the Plan & Usage experience looks for Datadog partners viewing the UI from a partner admin organization. 

## UI features for partners

Partners accessing Plan & Usage from their partner admin organization get a high-level overview of their customer data.

### Consolidated cost and usage across customers
Partners can view cost and usage data across all of their customer organizations. Access to the consolidated view is automatic. Partners do not need to configure additional permissions or make access requests.

### Customer organization hierarchies
Partners see each customer's organizations and the parent/child relationships within those customer organizations. Partners have visibility into each customer organization's hierarchy, even if the customers are in different organizational hierarchies. 

## Supported features

While partners can view consolidated cost and usage data, there are several features available to direct customers that are not supported when viewing from a partner admin org. The following table lists each feature in Plan & Usage and describes which users have access.

| Feature                                                             | Supported for Direct Customers | Supported for Partners |
|---------------------------------------------------------------------|--------------------------------|------------------------|
| Cost summary                                                        | {{< X >}}                      | {{< X >}}              |
| Projected costs                                                     | {{< X >}}                      | {{< X >}}              |
| Usage summary                                                       | {{< X >}}                      | {{< X >}}              |
| Cost & usage API endpoints (for all features supported in the UI)   | {{< X >}}                      | {{< X >}}              |
| Cost & usage attribution                                            | {{< X >}}                      |                        |
| Product-specific usage tables (for example: custom metrics or logs) | {{< X >}}                      |                        |
| Datadog costs in Cloud Cost Management                              | {{< X >}}                      |                        |
| Plan, Billing History, and Usage Notifications tabs                 | {{< X >}}                      |                        |

## Partner experience by page

### Plan & Usage settings
Only the **Usage & Cost** tab is available in the partner view. The main **Plan settings**, **Billing History**, and **Usage Notifications** tabs are not available in the partner view.

### Cost details
Partners see aggregated cost summaries for all of their customers. Cost is grouped per customer org, with estimated, historical, and projected costs available. Partners cannot access cost attribution breakdowns or the Datadog costs Cloud Cost Management integration from this view.

### Usage details
Partners see aggregated usage summaries across their customer orgs. Detailed tables such as "Top Custom Metrics" and "Logs Usage by Index" are not supported in the partner view.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}