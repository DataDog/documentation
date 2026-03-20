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
| **Alert** Error rate above threshold | **Alert** Hits above threshold | **Alert** |
| **Alert** Error rate above threshold | **OK** Hits below threshold | **OK** Only 1 condition met, no alert |
| **OK** Error rate below threshold | **Alert** Hits above threshold | **OK** Only 1 condition met, no alert |

For more state combinations, see [Composite Monitor](https://docs.datadoghq.com/monitors/create/types/composite/#computing-trigger-conditions).

## Monitor frequent metrics

Monitor latency for services, ignoring occasional spikes due to low traffic. For example, a period of time during the night where services report very few values.

Create two monitors:

- **Monitor A**: Alert when `latency > X`
- **Monitor B**: Alert when `sum:latency{*}.rollup(count) > Y` over the last 1 hour

**Composite Monitor C**: Alert when both conditions are met.

| Monitor A | Monitor B | Composite Monitor C |
|-----------|-----------|---------------------|
| **Alert** Latency above threshold | **Alert** More than Y metrics | **Alert** |
| **Alert** Latency above threshold | **OK** Less than Y metrics | **OK** Not enough metrics |
| **OK** Latency below threshold | **Alert** More than Y metrics | **OK** Latency below threshold |

## Step monitor

Trigger an alert in the absence of a paired metric. For example, log metrics for sent/received, down/up, or create/resolve. You can adjust the evaluation windows for the monitors if paired metrics are expected to be N minutes apart.

- **Monitor A**: Alert when `action:create` is above 0
- **Monitor B**: Alert when `action:resolve` is above 0

**Composite**: Alert if `a && !b`.

| Monitor A | Monitor B | Composite Monitor C |
|-----------|-----------|---------------------|
| **Alert** Action create above 0 | **Alert** Action resolve above 0 | **OK** |
| **Alert** Action create above 0 | **OK** | **Alert** Action resolve not present |
| **OK** | **Alert** Action resolve above 0 | **OK** |

## Renotifying on recovery

Renotify on recovery using two monitors with a `timeshift`.

- **Monitor A**: Current metric status
- **Monitor B**: Past metric status using `timeshift`

**Composite Monitor**: Logic is `!a && b`.

| Monitor A | Monitor B | Composite Monitor C |
|-----------|-----------|---------------------|
| **Alert** Real-time metric | **Alert** Past metric | **OK** |
| **Alert** Real-time metric | **OK** Metric not triggered | **OK** |
| **OK** Metric not triggered | **Alert** Past metric | **Alert** |

## Delay on notification

Alert after errors persist for a set duration. For example, a set of errors triggered for at least 15 minutes.

- **Monitor A**: Real-time metric
- **Monitor B (timeshifted)**: Metric shifted by X minutes

**Composite Monitor**: Alert if `a && b`.

| Monitor A | Monitor B (timeshifted) | Composite Monitor C |
|-----------|--------------------------|---------------------|
| **Alert** Real-time metric | **Alert** Past metric | **Alert** |
| **Alert** Real-time metric | **OK** Metric not triggered | **OK** |
| **OK** Metric not triggered | **Alert** Past metric | **OK** |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}