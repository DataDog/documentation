---
title: NDM Data Collected
kind: documentation
disable_toc: true
aliases:
    - /network_performance_monitoring/devices/data/
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Network Device Monitoring is not supported for this site.</div>
{{< /site-region >}}

## Events

Network Device Monitoring does not include any events.

## Service checks

{{< get-service-checks-from-git "snmp" >}}

## Metrics

Network Device Monitoring submits specified metrics under the `snmp.*` namespace. The metrics collected are determined by the `[configured profile]`.
If the metrics you want are not on the following list, search for the OID and its name from the [Global OID reference database][1] to add to your profiles.

{{< get-metrics-from-git "snmp" >}}


[1]: http://oidref.com
