---
title: SNMP Metrics Reference
disable_toc: true
aliases:
    - /network_performance_monitoring/devices/data/
---

## Events

{{< prodname >}}Network Device Monitoring{{< /prodname >}} does not include any events.

## Service checks

{{< get-service-checks-from-git "snmp" >}}

## Metrics

{{< prodname >}}Network Device Monitoring{{< /prodname >}} submits specified metrics under the `snmp.*` namespace. The metrics collected are determined by the [configured profile][2].
If the metrics you want are not on the following list, search for the OID and its name from the [Global OID reference database][1] to add to your profiles.

{{< get-metrics-from-git "snmp" >}}


[1]: http://oidref.com
[2]: /network_monitoring/devices/profiles
