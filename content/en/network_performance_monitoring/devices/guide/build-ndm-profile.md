---
title: Build a NDM Profile
kind: guide
further_reading:
- link: "https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/"
  tag: "Documentation"
  text: "Profile format reference"
- link: "https://datadoghq.dev/integrations-core/tutorials/snmp/sim-format/"
  tag: "Documentation"
  text: "Simulation data format reference"
---

Datadog Network Device Monitoring uses profiles for certain makes and models of network devices. This tutorial shows the steps for building a basic NDM profile that collects OID metrics from HP iLO4 devices.

NDM profiles use SNMP concepts. For basic details on SNMP, refer to the [terminology][1].

<div class="alert alert-warning">
This guide is for advanced users. Most devices can be configured using the <a href="/network_performance_monitoring/devices/profiles#metric-definition-by-profile">Datadog profiles</a>.
</div>

## Research

The first step to building a NDM profile is researching the device and determining the metrics to collect.

### Device information

Refer to the manufacturer's website or search the web to find the following information:

- Device name, manufacturer, and [system object identifier][1].

- Understand the device and its use case. Metrics vary between routers, switches, bridges, etc. For example, according to the [HP iLO wikipedia page][2], iLO4 devices are used by system administrators for remote management of embedded servers.

- Available versions of the device, and the versions to target. For example, HP iLO devices exist in multiple versions. This tutorial is specifically targeting HP iLO4.

- Supported MIBs, OIDs, and associated MIB files. For example, HP provides a MIB package for iLO devices [their website][3].

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
    - Power supply
    - Storage
    - Field-replaceable units ([FRU][5])

## Implementation

Datadog recommends following this development workflow:

- Add a profile
- Write tests
- Use simulation data

### Add a profile

Add a profile by creating a `.yaml` file with the `sysobjectid` and metrics, for example:

```yaml
sysobjectid: 1.3.6.1.4.1.232.9.4.10

metrics:
  - MIB: CPQHLTH-MIB
    symbol:
      OID: 1.3.6.1.4.1.232.6.2.8.1.0
      name: cpqHeSysUtilLifeTime
```

**Note**: `sysobjectid` can be a wildcard pattern to match a sub-tree of devices, for example: `1.3.6.1.131.12.4.*`.

### Write tests

Add a unit test to `test_profiles.py` to verify the metric is successfully collected by the integration when the profile is enabled. Unit tests are used to prevent regressions and help with maintenance.

{{< code-block lang="python" filename="test_profiles.py" wrap="false">}}
def test_hp_ilo4(aggregator):
    run_profile_check('hp_ilo4')
    common_tags = common.CHECK_TAGS + ['snmp_profile:hp-ilo4']
    aggregator.assert_metric('snmp.cpqHeSysUtilLifeTime', metric_type=aggregator.MONOTONIC_COUNT, tags=common_tags, count=1)
    aggregator.assert_all_metrics_covered()
{{< /code-block >}}

If you run this test without simulation data yet, it fails:

{{< code-block lang="console" disable_copy="true" wrap="false">}}
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
{{< /code-block >}}

### Add simulation data

Add a `.snmprec` file named after the `community_string`. This is the same value given to `run_profile_check()` in the example above:

```
$ touch snmp/tests/compose/data/hp_ilo4.snmprec
```

Inside the `.snmprec` file, add lines for the `sysobjectid` and OID listed in the profile:

```console
1.3.6.1.2.1.1.2.0|6|1.3.6.1.4.1.232.9.4.10
1.3.6.1.4.1.232.6.2.8.1.0|2|1051200
```

Run the test again, and make sure it passes this time:

{{< code-block lang="console" disable_copy="true" wrap="false">}}
$ ddev test -k test_hp_ilo4 snmp:py38
[...]

tests/test_profiles.py::test_hp_ilo4 PASSED                       [100%]

================== 1 passed, 107 deselected in 9.87s ===================
__________________________________ summary _____________________________
  py38: commands succeeded
  congratulations :)
{{< /code-block >}}

That covers the basic workflow — add metrics, write tests, and use simulation data. You can add more metrics to the profile by repeating the process.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /network_performance_monitoring/devices/troubleshooting#terminology
[2]: https://en.wikipedia.org/wiki/HP_Integrated_Lights-Out
[3]: https://support.hpe.com/hpsc/swd/public/detail?swItemId=MTX_53293d026fb147958b223069b6
[4]: https://en.wikipedia.org/wiki/Networking_hardware
[5]: https://en.wikipedia.org/wiki/Field-replaceable_unit
