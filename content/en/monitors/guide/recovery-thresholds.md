---
title: Recovery thresholds
further_reading:
- link: "/monitors/types/metric/"
  tag: "Documentation"
  text: "Metric monitor"
aliases:
- /monitors/faq/what-are-recovery-thresholds
---

## Definition

Recovery thresholds are optional thresholds added to a monitor to indicate an additional condition to a monitor's recovery from alert or warning states.

## Behavior

The recovery threshold adds a condition to the monitor's recovery such that it only enters recovered state once it has **passed** the recovery threshold. If no recovery threshold is set, the monitor recovers whenever the alert conditions are no longer met.

The recovery threshold is satisfied with the recovery condition is met. The recovery condition varies based on the alert condition:

| Alert condition    | Recovery condition          |
|--------------------|-----------------------------|
| > alert threshold  | <= alert recovery threshold |
| >= alert threshold | < alert recovery threshold  |
| < alert threshold  | >= alert recovery threshold |
| <= alert threshold | > alert recovery threshold  |

## Use case

Recovery thresholds reduce noise of a flapping monitor. This can increase confidence that upon recovery, the alerting metric has recovered and the issue is resolved.

## How to set up recovery thresholds?

### Website UI

Set the alert or warning recovery threshold when creating a monitor under **Set alert conditions** > **Advanced Options**.

### API

When you [create/edit a monitor via the API][1], use the attributes `critical_recovery` and `warning_recovery` in the `options.thresholds` attribute of your JSON monitor:

```text
"thresholds": {
                "critical": 80,
                "warning": 60,
                "critical_recovery": 70,
                "warning_recovery": 50
              }
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/v1/monitors/
