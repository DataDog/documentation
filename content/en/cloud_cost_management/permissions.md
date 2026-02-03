---
title: Permissions
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Learn about Cloud Cost Management"
- link: "/account_management/rbac/"
  tag: "Documentation"
  text: "Learn about Role Based Access Control"
- link: "/account_management/rbac/data_access/"
  tag: "Documentation"
  text: "Learn about Data Access Control"
---

## Overview

Cloud Cost Management (CCM) uses two permissions to control access to cost data and settings. Configure these permissions through [Role Based Access Control (RBAC)][1] to manage who can view cost data and who can modify CCM configurations.

## Available permissions

| Permission | Description |
|------------|-------------|
| `cloud_cost_management_read` | Grants read-only access to view cost data, budgets, recommendations, and settings across CCM pages and external integrations. |
| `cloud_cost_management_write` | Grants access to modify CCM configurations, including creating budgets, uploading custom costs, and managing cloud accounts. Requires the read permission to access pages. |

## Permission requirements by page

The table below shows the required permissions for each CCM page and related features.

| Page/Functionality                            | Read Permission                                  | Write Permission                                  |
|-----------------------------------------------|--------------------------------------------------|---------------------------------------------------|
| CCM Summary Page                              | Required to view cost summary data               | N/A                                               |
| CCM Containers Page                           | Required to view container cost allocation data  | N/A                                               |
| CCM Recommendations Page                      | Required to view cost recommendations            | N/A                                               |
| CCM Explorer Page                             | Required to query and view cost data             | N/A                                               |
| CCM Plan Page                                 | Required to view budgets                         | Required to modify or create budgets              |
| CCM Settings Page - Custom Costs              | Required to view custom costs settings           | Required to upload custom costs                   |
| CCM Settings Page - Tag Pipelines             | Required to view tag pipelines                   | Required to create tag pipelines                  |
| CCM Settings Page - SaaS Integrations         | Required to view SaaS integration settings       | Required to enable integration for CCM            |
| CCM Settings Page - Accounts                  | Required to view cloud accounts                  | Required to modify or create accounts             |
| CCM Settings Page - Configure Recommendations | Required to view recommendation settings         | Required to customize recommendations             |
| Dashboards/Notebooks (external)               | Required to create widgets and view cost data    | N/A                                               |
| Monitors (external)                           | Required to create CCM monitors                  | N/A                                               |
| Service Catalog (external)                    | Required to view cost data                       | N/A                                               |
| Resource Catalog (external)                   | Required to view cost data                       | N/A                                               |
| API Queries for Cost Data                     | Required to query cost data via API              | N/A                                               |

## Data access control

Use [Data Access Control][2] to restrict access to cost data by specific tags. With this feature, you can limit teams to see only costs relevant to their resources. For example, restricting a team to view only costs tagged with `team:payments` or `env:production`.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/
[2]: /account_management/rbac/data_access/

