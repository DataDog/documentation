---
title: Usage Metrics
further_reading:
    - link: "/account_management/billing/usage_metrics/finalized_usage_metrics/"
      tag: "Documentation"
      text: "Finalized Usage Metrics"
    - link: "/account_management/billing/usage_metrics/estimated_usage_metrics/"
      tag: "Documentation"
      text: "Estimated Usage Metrics"
---

The two primary sources for exploring usage as metrics at Datadog are finalized usage metrics and estimated usage metrics (EUMs).

## Finalized usage metrics

{{< img src="account_management/billing/usage_metrics/finalized-usage-query.png" alt="Query using the Usage source for Indexed Logs with an hourly sum rollup." style="width:100%;" >}}

Finalized usage metrics are processed usage that reflects the values you are billed on. Use them in dashboards and usage monitors to view your usage trends over time and keep your usage in line with what you expect. Finalized usage metrics have 4-24 hours of latency, depending on the product.

For more information, see [Finalized Usage Metrics][1].

## Estimated usage metrics

{{< img src="account_management/billing/usage_metrics/estimated-usage-query.png" alt="Metrics query for datadog.estimated_usage.hosts summed across everything." style="width:100%;" >}}

Estimated usage metrics are near real-time estimates of your usage, typically within 10-20% of billed usage. Use EUMs to see how your changes affect your usage and to catch unexpected spikes early.

For more information, see [Estimated Usage Metrics][2].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/billing/usage_metrics/finalized_usage_metrics/
[2]: /account_management/billing/usage_metrics/estimated_usage_metrics/
