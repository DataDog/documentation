---
title: Centralized Usage Metrics
description: "Monitor usage metrics across all connected customer organizations from an Admin Org."
---

## Overview

Centralized Usage Metrics lets the Admin Org oversee usage and estimated usage metrics from every connected customer org. Metrics roll up to the Admin Org tagged by customer, so partners can filter and attribute usage across their entire book of business from a single set of dashboards, monitors, and alerts.

Datadog produces two kinds of usage metrics:

- **Estimated usage metrics**: in the `datadog.estimated_usage.*` namespace, update within minutes and provide a near real-time view of usage. Estimated usage metrics can differ from billable usage by roughly 10-20% on average, with larger variance for low-usage organizations. See [Estimated Usage Metrics][1] for the full metrics reference.
- **Usage metrics**: in the `datadog.usage.*` namespace, come from the same metering and billing pipeline that produces the bill, so they track Plan & Usage closely. Usage metrics are less immediate than estimated usage metrics, but accurate enough for billing conversations.

Use estimated usage metrics to catch usage spikes early, and usage metrics to report numbers that reconcile with the bill.

## Attribution tags

Rolled-up metrics carry two tags:

- `account_name`: the parent org name (the Admin Org).
- `child_org_name`: the child org name (the customer organization), relative to the parent.

## Query usage metrics

When building a dashboard widget or monitor:

- For estimated usage metrics, select {{< ui >}}Metrics{{< /ui >}} as the source and use a `datadog.estimated_usage.*` metric.
- For usage metrics, select {{< ui >}}Usage{{< /ui >}} as the source and choose a usage type, for example Infra Hosts.

| Product | Estimated usage metric | Usage metric |
|---|---|---|
| Infrastructure hosts | `datadog.estimated_usage.hosts` | `datadog.usage.infra.hosts` |
| APM hosts | `datadog.estimated_usage.apm_hosts` | `datadog.usage.apm.hosts` |
| Custom metrics | `datadog.estimated_usage.metrics.custom` | `datadog.usage.metrics.custom` |
| Indexed logs | `datadog.estimated_usage.logs.ingested_events` | `datadog.usage.logs.indexed_logs` |

Scope a query to one customer with `child_org_name`, or break out every customer with `by {child_org_name}`:

```
# Estimated usage metric (Metrics source)
sum:datadog.estimated_usage.hosts{*} by {child_org_name}

# Usage metric (Usage source)
sum:datadog.usage.infra.hosts{*} by {child_org_name}
```

{{< img src="partners/multi_tenant_billing/usage_metrics_rollup.png" alt="Dashboard querying usage metrics rolled up from customer orgs, filtered by child_org_name" style="width:100%;" >}}

To match Plan & Usage totals, use a 1-hour rollup for host-style products and graph in UTC, since Plan & Usage reports in UTC.

## Related pages

- [Cost and Usage Visibility][2]: cost and billable usage data across connected customer orgs.

[1]: /account_management/billing/usage_metrics/
[2]: /partners/multi_tenant_billing/cost-and-usage-visibility/
