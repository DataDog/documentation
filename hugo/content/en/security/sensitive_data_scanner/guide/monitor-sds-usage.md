---
title: Monitor Sensitive Data Scanner Usage
description: Use the Sensitive Data Scanner estimated usage metric to track scanned bytes by product, service, and scanning group.
further_reading:
  - link: /account_management/billing/usage_metrics/
    tag: Documentation
    text: Learn more about estimated usage metrics
  - link: /security/sensitive_data_scanner/
    tag: Documentation
    text: Set up Sensitive Data Scanner
  - link: /monitors/types/metric/
    tag: Documentation
    text: Learn to set up metric monitors
---
## Overview

Sensitive Data Scanner reports the volume of data it scans with the `datadog.estimated_usage.sds.scanned_bytes` [estimated usage metric][1]. The metric covers data scanned in Logs, APM, RUM, and Events, in bytes. Use it in dashboards and [metric monitors][2] to track scanning volume.

## Break down usage

The `datadog.estimated_usage.sds.scanned_bytes` metric can be split by the following tags:

- `product`
- `service`
- `scanning_group_id`

### The global scanning group

You can ignore `scanning_group_id:global`. It exists to avoid counting the same event multiple times when the event is scanned by different scanning groups. Ignore or exclude it in your monitors and dashboards. It does not impact billing.

### Data without a service tag

`service:unknown` groups all data that does not have a `service` tag.

## Example query

To view scanned bytes by product and service while excluding the global scanning group, use the following query:

```
sum:datadog.estimated_usage.sds.scanned_bytes{!scanning_group_id:global} by {product,service}.as_count()
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/billing/usage_metrics/
[2]: /monitors/types/metric/
