---
title: Build an NDM Profile (Advanced)
aliases:
    - /network_performance_monitoring/devices/guide/build-ndm-profile
further_reading:
- link: "https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/"
  tag: "Documentation"
  text: "Profile format reference"
- link: "https://datadoghq.dev/integrations-core/tutorials/snmp/sim-format/"
  tag: "Documentation"
  text: "Simulation data format reference"
---

Datadog Network Device Monitoring uses profiles for collecting metrics from network devices. These are defined narrowly by a MIB, or to collect metrics from a specific device make and model. This tutorial shows the steps for building a basic NDM profile that collects OID metrics from HP iLO4 devices.

NDM profiles use SNMP concepts. For basic details on SNMP, refer to the [terminology][1].

<div class="alert alert-info">
This guide is for advanced users. Most devices can be configured using the GUI based experience in the <a href="/network_monitoring/devices/guide/device_profiles/">Getting Started with Device Profiles</a> documentation, or by using <a href="/network_monitoring/devices/profiles#metric-definition-by-profile">Datadog profiles</a>.
</div>

## Research

The first step to building an NDM profile is researching the device and determining the metrics to collect.

### Device information

Refer to the manufacturer's website or search the web to find the following information:

- Device name, manufacturer, and [system object identifier][1].

- Understand the device and its use case. Metrics vary between routers, switches, bridges, etc. For example, according to the [HP iLO Wikipedia page][2], iLO4 devices are used by system administrators for remote management of embedded servers.

- Available versions of the device, and the versions to target. For example, HP iLO devices exist in multiple versions. This tutorial is specifically targeting HP iLO4.

- Supported MIBs (ASN1, textual format), OIDs, and associated MIB files. For example, HP provides a MIB package for iLO devices [their website][3]. **Note**: The MIB is not required with the profile to collect metrics.

**Note**: For more details on device use cases, see [Networking hardware][4].

### Metrics selection

Next, decide the metrics to collect. Devices often expose thousands of metrics and OIDs that can span dozens of MIBs.

Some guidelines to help you in this process:

- Keep the number of metrics between 10 and 40.
- Explore base profiles to see which ones could be applicable to the device.
- Explore manufacturer-specific MIB files looking for metrics such as:
    - General health: status gauges
    - Network traffic: bytes in/out, errors in/out
    - CPU and memory usage
    - Temperature: temperature sensors, thermal condition
    - Power supply: on/off or total branch

## Implementation

### Add a profile

First, add a profile by creating a `.yaml` file with the `sysobjectid` and metrics, for example:

```yaml
sysobjectid: 1.3.6.1.4.1.232.9.4.10

metrics:
  - MIB: CPQHLTH-MIB
    symbol:
      OID: 1.3.6.1.4.1.232.6.2.8.1.0
      name: cpqHeSysUtilLifeTime
```

**Note**: `sysobjectid` can be a wildcard pattern to match a sub-tree of devices, for example: `1.3.6.1.131.12.4.*`.

## Test the profile

Second, test the profile by targeting an IP address of a device that will use the profile.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /network_monitoring/devices/troubleshooting#terminology
[2]: https://en.wikipedia.org/wiki/HP_Integrated_Lights-Out
[3]: https://support.hpe.com/hpsc/swd/public/detail?swItemId=MTX_53293d026fb147958b223069b6
[4]: https://en.wikipedia.org/wiki/Networking_hardware
