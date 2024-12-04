---
title: NDM Troubleshooting
aliases:
    - /network_performance_monitoring/devices/troubleshooting/
further_reading:
- link: "https://www.datadoghq.com/blog/monitor-snmp-with-datadog/"
  tag: "Blog"
  text: "Monitor SNMP with Datadog"
---

## Overview

Use the information below for troubleshooting Datadog Network Device Monitoring. If you need additional help, contact [Datadog support][1].


### What SNMP versions does Datadog support?

Datadog supports all three versions of SNMP: SNMPv1, SNMPv2, and SNMPv3.

### What protocol does Datadog use to discover devices?

Datadog uses SNMP to discover devices. During discovery, the SNMP port (default 161) is polled. If there's a response and a profile to match, this is considered a discovered device.

### Device is not visible in Datadog

### Traps not being received for devices

### Why am I only seeing one metric collected for my networks and it's the number of devices collected at zero?

1. Try loosening ACLs/firewall rules for your devices.
2. Run `snmpwalk -O bentU -v 2c -c <COMMUNITY_STRING> <IP_ADDRESS>:<PORT> 1.3.6` from the host your Agent is running on. If you get a timeout without any response, there is likely something blocking the Datadog Agent from collecting metrics from your device.


#### How do I extract information about devices and interfaces of my network devices?

- Use the [Network API][2] to extract the following information about your network devices:
  * [Get the list of interfaces for your devices.][3]
  - [Get the list of tags for your devices.][4]
  - [Update the list of tags for your devices.][5]

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /help
[2]: /api/latest/network-device-monitoring/
[3]: /api/latest/network-device-monitoring/#get-the-list-of-interfaces-of-the-device
[4]: /api/latest/network-device-monitoring/#get-the-list-of-tags-for-a-device
[5]: /api/latest/network-device-monitoring/#update-the-tags-for-a-device
