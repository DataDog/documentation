---
title: NDM Troubleshooting
kind: documentation
aliases:
    - /network_performance_monitoring/devices/troubleshooting/
further_reading:
- link: "https://www.datadoghq.com/blog/monitor-snmp-with-datadog/"
  tag: "Blog"
  text: "Monitor SNMP with Datadog"
---

## Overview

Use the information below for troubleshooting Datadog Network Device Monitoring. If you need additional help, contact [Datadog support][1].

## Terminology

**SNMP** - Simple network management protocol - A network protocol that is used to collect information about bare metal networking gear.

**OID** - Object identifier - A unique ID or address on a device that when polled returns the response code of that value. For example, OIDs are CPU or device fan speed.

**sysOID** - System object identifier - A specific address that defines the device type. All devices have a unique ID that defines it. For example, the Meraki base sysOID is `1.3.6.1.4.1.29671`.

**MIB** - Managed information base - A database or list of all the possible OIDs and their definitions that are related to the MIB. For example, the `IF-MIB` (interface MIB) contains all the OIDs for descriptive information about a device's interface.

## FAQ

#### What SNMP versions does Datadog support?

Datadog supports all three versions of SNMP: SNMPv1, SNMPv2, and SNMPv3.

#### What protocol does Datadog use to discover devices?

Datadog uses SNMP to discover devices. During discovery, the SNMP port (default 161) is polled. If there's a response and a profile to match, this is considered a discovered device.

#### Does Datadog do MIB certification? Do I need to send you all my MIBs? How do I convert my MIBs with Python?

The Datadog Agent is MIB-less, meaning you don’t need to do anything with your MIBs. All metrics collected with Datadog device profiles automatically work without the MIB.

To add metrics or a custom configuration, list the MIB name, table name, table OID, symbol, and symbol OID, for example:

```yaml
- MIB: EXAMPLE-MIB
    table:
      # Identification of the table which metrics come from.
      OID: 1.3.6.1.4.1.10
      name: exampleTable
    symbols:
      # List of symbols ('columns') to retrieve.
      # Same format as for a single OID.
      # Each row in the table emits these metrics.
      - OID: 1.3.6.1.4.1.10.1.1
        name: exampleColumn1
```

#### Can I still use Network Device Monitoring if my device-model pair isn't supported?

Datadog collects generic base-line metrics from all devices. If there are unsupported metrics from a vendor MIB, you can write a custom profile, or send a feature request to [Datadog support][1].

If you send a feature request, Datadog support needs a `snmpwalk` from the requested device. Run the following and send the output:

```
snmpwalk -O bentU -v 2c -c <COMMUNITY_STRING> <IP_ADDRESS>:<PORT> 1.3.6
```

#### Why am I only seeing one metric collected for my networks and it’s the number of devices collected at zero?

1. Try loosening ACLs/firewall rules for your devices.
2. Run `snmpwalk -O bentU -v 2c -c <COMMUNITY_STRING> <IP_ADDRESS>:<PORT> 1.3.6` from the host your Agent is running on. If you get a timeout without any response, there is likely something blocking the Datadog Agent from collecting metrics from your device.

#### What do I do if Datadog supports a vendor or device type but my specific model isn’t supported? 

1. Contact [Datadog support][1] to put in a request to support your specific model.
2. Profiles can be extended to support additional `sysobjectid`’s 
    For example, if you want to monitor another type of Cisco CSR, you can modify the ISR profile directly to list another `sysobjectid` like this: 
    
    ```
		snmpwalk -v 2c -c [community string] [ip address] 1.3.6.1.2.1.1.2
    ```

**Note**: If you do not know the `sysobjectid` of your device, first try googling for it, or run a `snmpwalk` on a host that can reach out to your device. Use the output to list the profile to match against. 


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /help
