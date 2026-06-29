---
title: Composite Monitor Use Cases
description: "Common use cases for composite monitors including error rates, frequent metrics monitoring, step monitoring, and notification delays."
further_reading:
- link: "monitors/types/composite/"
  tag: "Documentation"
  text: "Composite monitor type"
---


## Overview 

This guide lists non-exhaustive use cases for composite monitors. These examples illustrate how composite monitors can be configured to address various use cases in monitoring environments:

- [Error rates](#error-rates)
- [Monitor frequent metrics](#monitor-frequent-metrics)
- [Step monitor](#step-monitor)
- [Renotifying on recovery](#renotifying-on-recovery)
- [Delay on notification](#delay-on-notification)


## Error rates

Alert when the error rate exceeds a threshold only when hits are above a certain number.

Create two monitors:

- **Monitor A**: Alert when `trace.requests.request.errors / trace.requests.request.hits > X`
- **Monitor B**: Alert when `trace.requests.request.hits > Y`

**Composite Monitor C**: Alert when both Monitor A and Monitor B are in alert (A && B).

| Monitor A | Monitor B | Composite Monitor C |
|-----------|-----------|---------------------|
| {{< ui >}}Alert{{< /ui >}} Error rate above threshold | {{< ui >}}Alert{{< /ui >}} Hits above threshold | {{< ui >}}Alert{{< /ui >}} |
| {{< ui >}}Alert{{< /ui >}} Error rate above threshold | {{< ui >}}OK{{< /ui >}} Hits below threshold | {{< ui >}}OK{{< /ui >}} Only 1 condition met, no alert |
| {{< ui >}}OK{{< /ui >}} Error rate below threshold | {{< ui >}}Alert{{< /ui >}} Hits above threshold | {{< ui >}}OK{{< /ui >}} Only 1 condition met, no alert |

For more state combinations, see [Composite Monitor](https://docs.datadoghq.com/monitors/create/types/composite/#computing-trigger-conditions).

## Monitor frequent metrics

Monitor latency for services, ignoring occasional spikes due to low traffic. For example, a period of time during the night where services report very few values.

Create two monitors:

- **Monitor A**: Alert when `latency > X`
- **Monitor B**: Alert when `sum:latency{*}.rollup(count) > Y` over the last 1 hour

**Composite Monitor C**: Alert when both conditions are met.

| Monitor A | Monitor B | Composite Monitor C |
|-----------|-----------|---------------------|
| {{< ui >}}Alert{{< /ui >}} Latency above threshold | {{< ui >}}Alert{{< /ui >}} More than Y metrics | {{< ui >}}Alert{{< /ui >}} |
| {{< ui >}}Alert{{< /ui >}} Latency above threshold | {{< ui >}}OK{{< /ui >}} Less than Y metrics | {{< ui >}}OK{{< /ui >}} Not enough metrics |
| {{< ui >}}OK{{< /ui >}} Latency below threshold | {{< ui >}}Alert{{< /ui >}} More than Y metrics | {{< ui >}}OK{{< /ui >}} Latency below threshold |

## Step monitor

Trigger an alert in the absence of a paired metric. For example, log metrics for sent/received, down/up, or create/resolve. You can adjust the evaluation windows for the monitors if paired metrics are expected to be N minutes apart.

- **Monitor A**: Alert when `action:create` is above 0
- **Monitor B**: Alert when `action:resolve` is above 0

**Composite**: Alert if `a && !b`.

| Monitor A | Monitor B | Composite Monitor C |
|-----------|-----------|---------------------|
| {{< ui >}}Alert{{< /ui >}} Action create above 0 | {{< ui >}}Alert{{< /ui >}} Action resolve above 0 | {{< ui >}}OK{{< /ui >}} |
| {{< ui >}}Alert{{< /ui >}} Action create above 0 | {{< ui >}}OK{{< /ui >}} | {{< ui >}}Alert{{< /ui >}} Action resolve not present |
| {{< ui >}}OK{{< /ui >}} | {{< ui >}}Alert{{< /ui >}} Action resolve above 0 | {{< ui >}}OK{{< /ui >}} |

## Renotifying on recovery

Renotify on recovery using two monitors with a `timeshift`.

- **Monitor A**: Current metric status
- **Monitor B**: Past metric status using `timeshift`

**Composite Monitor**: Logic is `!a && b`.

| Monitor A | Monitor B | Composite Monitor C |
|-----------|-----------|---------------------|
| {{< ui >}}Alert{{< /ui >}} Real-time metric | {{< ui >}}Alert{{< /ui >}} Past metric | {{< ui >}}OK{{< /ui >}} |
| {{< ui >}}Alert{{< /ui >}} Real-time metric | {{< ui >}}OK{{< /ui >}} Metric not triggered | {{< ui >}}OK{{< /ui >}} |
| {{< ui >}}OK{{< /ui >}} Metric not triggered | {{< ui >}}Alert{{< /ui >}} Past metric | {{< ui >}}Alert{{< /ui >}} |

## Delay on notification

Alert after errors persist for a set duration. For example, a set of errors triggered for at least 15 minutes.

- **Monitor A**: Real-time metric
- **Monitor B (timeshifted)**: Metric shifted by X minutes

**Composite Monitor**: Alert if `a && b`.

| Monitor A | Monitor B (timeshifted) | Composite Monitor C |
|-----------|--------------------------|---------------------|
| {{< ui >}}Alert{{< /ui >}} Real-time metric | {{< ui >}}Alert{{< /ui >}} Past metric | {{< ui >}}Alert{{< /ui >}} |
| {{< ui >}}Alert{{< /ui >}} Real-time metric | {{< ui >}}OK{{< /ui >}} Metric not triggered | {{< ui >}}OK{{< /ui >}} |
| {{< ui >}}OK{{< /ui >}} Metric not triggered | {{< ui >}}Alert{{< /ui >}} Past metric | {{< ui >}}OK{{< /ui >}} |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}