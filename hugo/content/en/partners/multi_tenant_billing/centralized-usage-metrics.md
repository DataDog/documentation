---
title: Centralized Usage Metrics
description: "Monitor usage metrics across all connected customer organizations from an Admin Org."
---

## Overview

Centralized Usage Metrics lets the Partner Admin Organization (Admin Org) oversee usage and estimated usage metrics from every connected customer org. Metrics roll up to the Admin Org tagged by customer, so partners can filter and attribute usage across their entire book of business from a single set of dashboards, monitors, and alerts.

Datadog produces two kinds of usage metrics:

- **Estimated usage metrics** in the `datadog.estimated_usage.*` namespace. These metrics update within minutes and provide a near real-time view of usage. Estimated usage metrics can differ from billable usage by roughly 10-20% on average, with larger variance for low-usage organizations. See [Estimated Usage Metrics][1] for the full metrics reference.
- **Usage metrics** in the {{< ui >}}Usage{{< /ui >}} query source. These metrics come from the same metering and billing pipeline that produces the bill, so they track Plan & Usage closely. Usage metrics are less immediate than estimated usage metrics, but accurate enough for billing conversations.

Use estimated usage metrics to catch usage spikes early, and usage metrics to report numbers that reconcile with the bill.

## Attribution tags

Rolled-up metrics carry two tags:

- `account_name`: The parent org name (the Admin Org).
- `child_org_name`: The child org name (the customer organization), relative to the parent.

## Query usage metrics

When building a dashboard widget or monitor:

- For estimated usage metrics, select {{< ui >}}Metrics{{< /ui >}} as the source and use a `datadog.estimated_usage.*` metric.
- For usage metrics, select {{< ui >}}Usage{{< /ui >}} as the source and choose a usage type, for example, {{< ui >}}Infra Hosts{{< /ui >}}.

For usage metrics, filter by `child_org_name` to scope the query to one customer, or group by `child_org_name` to compare customers.

{{< img src="partners/multi_tenant_billing/usage_source_infra_hosts.png" alt="Usage query source with Infra Hosts selected." style="width:100%;" >}}

For estimated usage metrics, use the `child_org_name` tag to filter or group the query. For example, query estimated infrastructure host usage for every customer:

```
sum:datadog.estimated_usage.hosts{*} by {child_org_name}
```

{{< img src="partners/multi_tenant_billing/usage_metrics_rollup.png" alt="Metrics source showing estimated usage metrics and the child_org_name tag." style="width:100%;" >}}

To match Plan & Usage totals, use a 1-hour rollup for host-style products and graph in UTC, since Plan & Usage reports in UTC.

## Related docs

- [Cost and Usage Visibility][2]: cost and billable usage data across connected customer orgs.

[1]: /account_management/billing/usage_metrics/
[2]: /partners/multi_tenant_billing/cost-and-usage-visibility/
