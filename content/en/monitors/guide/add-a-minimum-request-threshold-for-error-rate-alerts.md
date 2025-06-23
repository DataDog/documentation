---
title: Add a minimum request threshold for error rate alerts
disable_toc: false
aliases:
- /path-to-old-doc/
further_reading:
- link: "/metrics/nested_queries"
  tag: "Documentation"
  text: "Nested Queries"
---

{{< jqmath-vanilla >}}

## Overview

Monitors keep track of the health of your systems, ensuring that any alerts are sent in real-time. When tracking relative changes or percentages, you might only need an alert when traffic is high enough. To address this use case, you can add [boolean threshold remapping functions][1] in metrics nested queries to establish a minimum threshold.

This ensures that alerts are only triggered when a meaningful number of occurrences are detected, reducing false alarms and making your monitoring system more efficient.

## Example walkthrough

You have two metrics that measure APM span requests:
- `trace.rack.request.errors`
- `trace.rack.request`

With these two metrics you can calculate the error rate percentage:

$$\text"Error Rate" =  \text"trace.rack.request.errors" / \text"trace.rack.request"$$

You want to monitor the error rate, but only if there are at least 15 entries. In the monitor query configuration, take the the error rate and set a minimum threshold on query b (`is_greater(b,15)`).

```((a/b)*100)*is_greater(b,15)```

{{< img src="/monitors/guide/add-a-minimum-request-threshold-for-error-rate-alerts/error_rate_min_threshold.png" alt="Monitor configuration showing error rate calculation with minimum request threshold of 15 requests" style="width:100%;" >}}

The `is_greater` function works as follows:
- Returns `1` when the number of `trace.rack.requests` exceeds 15
- Returns `0` when the number of `trace.rack.requests` is 15 or less

This means your monitor shows a value of `0` when the minimum threshold (15 requests) is not met, and shows the calculated error rate when the threshold is met. This gives you added flexibility in configuring your alerts and allows you to avoid false positives from low-traffic periods while still catching genuine error rate issues when traffic is sufficient.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /metrics/nested_queries/#boolean-threshold-remapping-functions
