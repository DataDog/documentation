---
title: NDM Data Collected
kind: documentation
aliases:
    - /network_performance_monitoring/devices/data/
---

## Metrics

Network Device Monitoring submits specified metrics under the `snmp.*` namespace. The metrics collected are determined by the `[configured profile]`.
If metrics you want is not on the following list, you can search OID and its name from [Global OID reference database](http://oidref.com/) and add your profiles.

{{< get-metrics-from-git "snmp" >}}

## Events

Network Device Monitoring does not include any events.

## Service checks

{{< get-service-checks-from-git "snmp" >}}
