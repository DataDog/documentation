---
title: NDM Terms and Concepts
description: NDM Glossary
further_reading:
    - link: 'https://www.datadoghq.com/knowledge-center/network-monitoring/snmp-monitoring/'
      tag: 'Knowledge Center'
      text: 'SNMP Monitoring Overview'
---

## Overview

Network Device Monitoring (NDM) helps you gain insights into the health and performance of your on-prem routers, switches, and firewalls. 
For additional definitions and descriptions of important NDM terms such as _layer 2_ and _layer 3_, see the main [Glossary][1].

## Terminology

Simple network management protocol (SNMP)
: A network protocol that is used to collect information about bare metal networking gear.

Link Layer Discovery Protocol (LLDP)
: A protocol used by devices to advertise identity and capabilities to neighboring devices. NDM uses LLDP to map topology.

Managed information base (MIB)
: A database or list of all the possible OIDs and their definitions that are related to the MIB. For example, the `IF-MIB` (interface MIB) contains all the OIDs for descriptive information about a device's interface.

Object identifier (OID)
: A unique ID or address on a device that when polled returns the response code of that value. For example, OIDs are CPU or device fan speed.

System object identifier (sysOID)
: A specific address that defines the device type. All devices have a unique ID that defines it. For example, the Meraki base sysOID is `1.3.6.1.4.1.29671`.

Managed information base (MIB)
: A database or list of all the possible OIDs and their definitions that are related to the MIB. For example, the `IF-MIB` (interface MIB) contains all the OIDs for descriptive information about a device's interface.

[Profiles][2]
: A profile is a collection of OIDs associated with a device. Profiles allow NDM to reuse metric definitions across several device types or instances.

Software-defined wide area network (SD-WAN)
: A wide area network (WAN) that uses software-defined networking (SDN). SD-WAN is often used to interconnect remote offices and data centers across different transports (MPLS, broadband, 5G, and so on).

[Device namespaces][3]
: Namespace of the device. Namespaces can be used as tags to differentiate between multiple network devices that may share the same private IP.

[Ping][4]
: A network tool that measures how long it takes for a signal to travel from one device to another over a network and back again.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /glossary/?product=network-device-monitoring
[2]: /network_monitoring/devices/profiles
[3]: /network_monitoring/devices/snmp_traps/?tab=yaml#device-namespaces
[4]: /network_monitoring/devices/ping