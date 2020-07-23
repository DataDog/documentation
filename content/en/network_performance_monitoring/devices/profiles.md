---
title: NDM Profiles
kind: documentation
---

## Overview

Network Device Monitoring uses profiles to tell the Datadog Agent the metrics and associated tags to collect. A profile is a collection of OIDs associated with a device.

## Configuration

By default, all profiles shipped by the Agent and in the configuration directory are loaded. To customize the specific profiles for collection, they can be explicitly referenced by filename under `definition_file`, or written inline under `definition`. Any of the OOTB Datadog profiles can be listed by their name. Additional custom profiles can be referenced by the file path in the config, or simply dropped in the configuration directory. **Note**: The generic profile is `generic_router.yaml`, which should work for routers, switches, etc.

### sysOID mapped device profiles

Profiles allow the SNMP check to reuse metric definitions across several device types or instances. Profiles define metrics the same way as instances, either inline in the configuration file or in separate files. Each instance can only match a single profile. For example, you can define a profile in the `init_config` section:

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

Profiles can be used interchangeably, such that devices that share MIB dependencies can reuse the same profiles. For example, the Cisco c3850 profile can be used across many Cisco switches.

* [Generic router][1]
* [Cisco ASA 5525][2]
* [Cisco c3850][3]
* [Cisco Nexus][4]
* [Cisco Meraki][5]
* [Cisco UC Virtual Machine][6]
* [Cisco ICM][7]
* [Cisco ISR 4431][8]
* [Dell iDRAC][9]
* [Dell Poweredge][10]
* [F5 Big IP][11]
* [Fortinet FortiGate][12]
* [HP iLO4][13]
* [HPE Proliant][14]
* [NetApp][15]
* [Palo Alto][16]
* [Checkpoint Firewall][17]
* [Isilon][18]
* [APC UPS][19]



[1]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/generic-router.yaml
[2]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/cisco-asa-5525.yaml
[3]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/cisco-3850.yaml
[4]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/cisco-nexus.yaml
[5]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/meraki-cloud-controller.yaml
[6]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/cisco_uc_virtual_machine.yaml
[7]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/cisco_icm.yaml
[8]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/cisco_isr_4431.yaml
[9]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/idrac.yaml
[10]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/dell-poweredge.yaml
[11]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/f5-big-ip.yaml
[12]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/fortinet-fortigate.yaml
[13]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/hp-ilo4.yaml
[14]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/hpe-proliant.yaml
[15]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/netapp.yaml
[16]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/palo-alto.yaml
[17]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/checkpoint-firewall.yaml
[18]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/isilon.yaml
[19]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/apc-ups.yaml
