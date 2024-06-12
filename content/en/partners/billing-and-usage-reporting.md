---
title: Billing and usage reporting
kind: documentation
description: "Monitoring individual client and aggregate usage of the Datadog platform in multi-organization account setups."
private: true
---

Read on for information on how to monitor both individual client and aggregate usage of the Datadog platform in your multiple-organization account.

With a Datadog [admin role][1] in the parent organization, you can view the total and billable usage of all your organizations, both child and parent, as well as how your clients' usage has changed over the past six months. For more information, see [Multi-org usage][2].

Usage is aggregated across all child organizations and billed at the parent organization level. From the parent organization, those with an admin role can view aggregate usage across all child organizations as well as further analyze usage of individual child organizations.

In case existing roles are not flexible enough for you or your client organization, you can create new custom roles. With custom roles, in addition to the general permissions, it is possible to define more granular permissions for specific assets or data types. You can find the list of permissions specific to billing and usage assets [in the Role Based Access Control documentation][3].

In addition to the usage page, here are some additional resources you can use to estimate and manage clients' usage as well as provide easy allocations and chargebacks:
- [Estimated Usage Metrics][4]: Datadog calculates your clients' current estimated usage in near real time. Estimated usage metrics enable you to graph your estimated usage, create monitors or alerts around your estimated usage based on thresholds of your choosing, and get instant alerts on spikes or drops in your usage.
- [Shared Dashboards][5]: Shared dashboards and graphs allow you to display metric, trace, and log visualizations with your users outside of Datadog. You can publish estimated usage metrics dashboards for your clients to track.
- [Usage Attribution][6]:
  - Provides lists to the existing tag keys that usage is being broken down by and provides the ability to change and add new tags.
  - Generates daily .tsv (tab separated values) files for most usage types.
  - Summarizes usage at the end of each month, not only by child organizations, but also by tag.
  Note that usage attribution is an advanced feature included in the Enterprise plan. For all other plans, contact your Datadog partner representative to request this feature.

[1]: /account_management/rbac/
[2]: /account_management/multi_organization/#multi-org-usage
[3]: /account_management/rbac/permissions/?tab=ui#billing-and-usage
[4]: /account_management/billing/usage_metrics/
[5]: /dashboards/sharing/
[6]: /account_management/billing/usage_attribution/
