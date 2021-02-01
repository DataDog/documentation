---
title: NDM Data Collected
kind: documentation
aliases:
    - /network_performance_monitoring/devices/data/
---

## Metrics

Network Device Monitoring submits specified metrics under the `snmp.*` namespace. The metrics collected are determined by the `[configured profile]`.

{{< get-metrics-from-git "snmp" >}}

## Events

Network Device Monitoring does not include any events.

## Service checks

**snmp.can_check**:<br>
Returns `CRITICAL` if the Agent cannot collect SNMP metrics, otherwise returns `OK`.
