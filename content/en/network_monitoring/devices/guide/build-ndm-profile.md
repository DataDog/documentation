---
title: Build a NDM Profile
kind: guide
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

Datadog [Network Device Monitoring][1] (NDM) uses profiles for collecting metrics from network devices. These are defined narrowly by a MIB, or to collect metrics from a specific device make and model. This tutorial shows the steps for building a basic NDM profile that collects OID metrics from HP iLO4 devices.

- NDM profiles use SNMP concepts. For basic details on SNMP, see the [NDM terminology][2] documentation.
- To learn more about SNMP profile formatting, see the [NDM Profile Format and Simulation Data Reference][3] documentation.

<div class="alert alert-warning">
This guide is for advanced users. Most devices can be configured using the <a href="/network_monitoring/devices/profiles#metric-definition-by-profile">Datadog profiles</a>.
</div>

## Research

The first step to building an NDM profile is researching the device and determining the metrics to collect.

### Device information

Refer to the manufacturer's website or search the web to find the following information:

- Device name, manufacturer, and [system object identifier][2].

- Understand the device and its use case. Metrics vary between routers, switches, bridges, etc. For example, according to the [HP iLO Wikipedia page][4], iLO4 devices are used by system administrators for remote management of embedded servers.

- Available versions of the device, and the versions to target. For example, HP iLO devices exist in multiple versions. This tutorial is specifically targeting HP iLO4.

- Supported MIBs (ASN1, textual format), OIDs, and associated MIB files. For example, HP provides a MIB package for iLO devices [their website][5]. **Note**: The MIB is not required with the profile to collect metrics.

**Note**: For more details on device use cases, see [Networking hardware][6].

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

### Generate a profile file from a collection of MIBs

You can use [ddev][7], part of the Datadog integrations developer's toolkit, to create a profile from a list of mibs.

```console
$  ddev meta snmp generate-profile-from-mibs --help
```

This script requires a list of ASN1 MIB files as input argument, and copies to the clipboard a list of metrics that can be used to create a profile.

### Options

`-f, --filters` is an option to provide the path to a YAML file containing a collection of MIB names and their list of node names to be included.

For example, include `system`, `interfaces` and `ip` nodes from `RFC1213-MIB`, no node from `CISCO-SYSLOG-MIB`, and node `snmpEngine` from `SNMP-FRAMEWORK-MIB`.


```yaml
RFC1213-MIB:
- system
- interfaces
- ip
CISCO-SYSLOG-MIB: []
SNMP-FRAMEWORK-MIB:
- snmpEngine
```

**Note**: Each `MIB:node_name` correspond to exactly one and only one OID. However, some MIBs report legacy nodes that are overwritten. To resolve, edit the MIB by removing legacy values manually before loading them with this profile generator. If a MIB is fully supported, it can be omitted from the filter as MIBs not found in a filter are fully loaded. If a MIB is **not** fully supported, it can be listed with an empty node list, such as `CISCO-SYSLOG-MIB` in the example.

`-a, --aliases` is an option to provide the path to a YAML file containing a list of aliases to be used as metric tags for tables, in the following format:

```yaml
aliases:
- from:
    MIB: ENTITY-MIB
    name: entPhysicalIndex
  to:
    MIB: ENTITY-MIB
    name: entPhysicalName
```

MIBs tables most of the time define one or more indexes, as columns within the same table, or columns from a different table and even a different MIB. The index value can be used to tag table's metrics. This is defined in the `INDEX` field in `row` nodes.

As an example, `entPhysicalContainsTable` in `ENTITY-MIB` is as follows:

```txt
entPhysicalContainsEntry OBJECT-TYPE
SYNTAX      EntPhysicalContainsEntry
MAX-ACCESS  not-accessible
STATUS      current
DESCRIPTION
        "A single container/'containee' relationship."
INDEX       { entPhysicalIndex, entPhysicalChildIndex }  <== this is the index definition
::= { entPhysicalContainsTable 1 }
```

or, for example, its JSON dump, where `INDEX` is replaced by `indices`:

```json
"entPhysicalContainsEntry": {
    "name": "entPhysicalContainsEntry",
    "oid": "1.3.6.1.2.1.47.1.3.3.1",
    "nodetype": "row",
    "class": "objecttype",
    "maxaccess": "not-accessible",
    "indices": [
      {
        "module": "ENTITY-MIB",
        "object": "entPhysicalIndex",
        "implied": 0
      },
      {
        "module": "ENTITY-MIB",
        "object": "entPhysicalChildIndex",
        "implied": 0
      }
    ],
    "status": "current",
    "description": "A single container/'containee' relationship."
  },
```

Indexes can be replaced by another MIB symbol that is more human-readable. You might prefer to see the interface name versus its numerical table index. This can be achieved using `metric_tag_aliases`.

### Add unit tests

Add a unit test in `test_profiles.py` to verify that the metric is successfully collected by the integration when the profile is enabled. These unit tests are mostly used to prevent regressions and help with maintenance.

For example:

```python
def test_hp_ilo4(aggregator):
    run_profile_check('hp_ilo4')

    common_tags = common.CHECK_TAGS + ['snmp_profile:hp-ilo4']

    aggregator.assert_metric('snmp.cpqHeSysUtilLifeTime', metric_type=aggregator.MONOTONIC_COUNT, tags=common_tags, count=1)
    aggregator.assert_all_metrics_covered()
```

This test initially fails as there is no simulation data.

```console
$ ddev test -k test_hp_ilo4 snmp:py38
[...]
======================================= FAILURES ========================================
_____________________________________ test_hp_ilo4 ______________________________________
tests/test_profiles.py:1464: in test_hp_ilo4
    aggregator.assert_metric('snmp.cpqHeSysUtilLifeTime', metric_type=aggregator.GAUGE, tags=common.CHECK_TAGS, count=1)
../datadog_checks_base/datadog_checks/base/stubs/aggregator.py:253: in assert_metric
    self._assert(condition, msg=msg, expected_stub=expected_metric, submitted_elements=self._metrics)
../datadog_checks_base/datadog_checks/base/stubs/aggregator.py:295: in _assert
    assert condition, new_msg
E   AssertionError: Needed exactly 1 candidates for 'snmp.cpqHeSysUtilLifeTime', got 0
[...]
```

### Add simulation data

Add a `.snmprec` file named after the `community_string`, which is the value given to `run_profile_check()`:

```
$ touch snmp/tests/compose/data/hp_ilo4.snmprec
```

Add lines to the `.snmprec` file to specify the `sysobjectid` and the OID listed in the profile:

```console
1.3.6.1.2.1.1.2.0|6|1.3.6.1.4.1.232.9.4.10
1.3.6.1.4.1.232.6.2.8.1.0|2|1051200
```

Run the test again, and make sure it passes this time:

```console
$ ddev test -k test_hp_ilo4 snmp:py38
[...]

tests/test_profiles.py::test_hp_ilo4 PASSED                                                                                        [100%]

=================================================== 1 passed, 107 deselected in 9.87s ====================================================
________________________________________________________________ summary _________________________________________________________________
  py38: commands succeeded
  congratulations :)
```

To learn more about simulation data format, see the [Simulation Data Format Reference][3] documentation.

The setup of a basic profile is complete. You can continue to add metrics to expand your SNMP profile or research deeper into SNMP profiles to add additional parameters.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /network_monitoring/devices/
[2]: /network_monitoring/devices/troubleshooting#terminology
[3]: /network_monitoring/devices/guide/profile-and-simulation-data-reference
[4]: https://en.wikipedia.org/wiki/HP_Integrated_Lights-Out
[5]: https://support.hpe.com/hpsc/swd/public/detail?swItemId=MTX_53293d026fb147958b223069b6
[6]: https://en.wikipedia.org/wiki/Networking_hardware
[7]: https://github.com/DataDog/integrations-core/tree/master/datadog_checks_dev
