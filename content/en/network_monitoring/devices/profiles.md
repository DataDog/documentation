---
title: NDM Profiles
kind: documentation
aliases:
    - /network_performance_monitoring/devices/profiles/
further_reading:
- link: "/network_monitoring/devices/data"
  tag: "Documentation"
  text: "Data Collected with Network Device Monitoring"
- link: "https://www.datadoghq.com/blog/monitor-snmp-with-datadog/"
  tag: "Blog"
  text: "Monitor SNMP with Datadog"
---

## Overview

Network Device Monitoring uses profiles to tell the Datadog Agent the metrics and associated tags to collect. A profile is a collection of OIDs associated with a device.

## Configuration

By default, all profiles in the Agent configuration directory are loaded. To customize the specific profiles for collection, explicitly reference them by filename under `definition_file`, or provide an inline list under `definition`. Any of the Datadog profiles can be listed by name. Additional custom profiles can be referenced by the file path in the config, or placed in the configuration directory.

**Note**: The generic profile is [generic_router.yaml][1], which supports routers, switches, etc.

### sysOID mapped devices

Profiles allow Network Device Monitoring to reuse metric definitions across several device types or instances. Profiles define metrics the same way as instances, either inline in the configuration file or in separate files. Each instance can only match a single profile. For example, you can define a profile in the `init_config` section:

```yaml
init_config:
  profiles:
    my-profile:
      definition:
        - MIB: IP-MIB
          table: ipSystemStatsTable
          symbols:
            - ipSystemStatsInReceives
          metric_tags:
            - tag: ipversion
          index: 1
      sysobjectid: '1.3.6.1.4.1.8072.3.2.10'
```

Then either reference it explicitly by name, or use sysObjectID detection:

```yaml
instances:
   - ip_address: 192.168.34.10
     profile: my-profile
   - ip_address: 192.168.34.11
     # Don't need anything else here, the check will query the sysObjectID
     # and use the profile if it matches.
```

If necessary, additional metrics can be defined in the instances. These metrics are collected in addition to those in the profile.

### Metric definition by profile

Profiles can be used interchangeably, meaning devices that share MIB dependencies can reuse the same profiles. For example, the [Cisco c3850 profile][2] can be used across many Cisco switches.

For more Datadog provided profiles, see the [Github repository][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/generic-router.yaml
[2]: https://github.com/DataDog/integrations-core/tree/master/snmp/datadog_checks/snmp/data/profiles
