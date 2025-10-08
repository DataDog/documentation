---
title: Add a Minimum Request Threshold for Error Rate Alerts
description: "Learn to set minimum request thresholds for error rate monitors using Boolean functions to reduce false alarms during low-traffic periods."
disable_toc: false
further_reading:
- link: "/metrics/nested_queries"
  tag: "Documentation"
  text: "Nested Queries"
---

{{< jqmath-vanilla >}}

## Overview

When monitoring error rates or other percentage-based metrics, low traffic periods can trigger false alarms. For example, a single error out of two requests shows as a 50% error rate, which might exceed your threshold despite representing minimal impact.

This guide shows you how to add a minimum request threshold to your monitors using boolean threshold remapping functions. By setting a minimum number of requests required before evaluating your error rate, you can reduce noise from low-traffic periods and focus on alerts that represent meaningful issues.

## Example walkthrough

You have two metrics that measure APM span requests:
- `trace.rack.request.errors` (query a)
- `trace.rack.request` (query b)

With these two metrics you can calculate the error rate percentage:

$$\text"Error Rate" =  \text"trace.rack.request.errors" / \text"trace.rack.request"$$

You want to monitor the error rate, but only if there are at least 15 entries. In the monitor query configuration, take the error rate and set a minimum threshold on query b (`is_greater(b,15)`).

```((a/b)*100)*is_greater(b,15)```

{{< img src="/monitors/guide/add-a-minimum-request-threshold-for-error-rate-alerts/error_rate_min_threshold.png" alt="Monitor configuration showing error rate calculation with minimum request threshold of 15 requests" style="width:100%;" >}}

The `is_greater` function works as follows:
- Returns `1` when the number of `trace.rack.requests` exceeds 15
- Returns `0` when the number of `trace.rack.requests` is 15 or less

This means your monitor shows a value of `0` when the minimum threshold (15 requests) is not met, and shows the calculated error rate when the threshold is met. This gives you added flexibility in configuring your alerts and allows you to avoid false positives from low-traffic periods while still catching genuine error rate issues when traffic is sufficient.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /metrics/nested_queries/#boolean-threshold-remapping-functions
