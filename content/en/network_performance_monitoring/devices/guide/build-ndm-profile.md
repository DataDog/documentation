---
title: Build a NDM Profile
kind: guide
---

Datadog Network Device Monitoring uses profiles for certain makes and models of network devices. This tutorial shows the steps from building a basic NDM profile that collects OID metrics from HP iLO4 devices.

**Note**: NDM profiles use SNMP concepts. For basic details on SNMP, refer to the [terminology][1].

## Research

The first step to building a NDM profile is doing basic research about the device and determining the metrics you want to collect.

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

- 10-40 metrics is a good amount already.
- Explore base profiles to see which ones could be applicable to the device.
- Explore manufacturer-specific MIB files looking for metrics such as:
    - General health: status gauges...
    - Network traffic: bytes in/out, errors in/out, ...
    - CPU and memory usage.
    - Temperature: temperature sensors, thermal condition, ...
    - Power supply.
    - Storage.
    - Field-replaceable units ([FRU][5]).
    - ...

## Implementation

It might be tempting to gather as many metrics as possible, and only then start building the profile and writing tests.

But we recommend you **start small**. This will allow you to quickly gain confidence on the various components of the SNMP development workflow:

- Editing profile files.
- Writing tests.
- Building and using simulation data.

### Add a profile file

Add a `.yaml` file for the profile with the `sysobjectid` and a metric (you'll be able to add more later).

For example:

```yaml
sysobjectid: 1.3.6.1.4.1.232.9.4.10

metrics:
  - MIB: CPQHLTH-MIB
    symbol:
      OID: 1.3.6.1.4.1.232.6.2.8.1.0
      name: cpqHeSysUtilLifeTime
```

!!! tip
    `sysobjectid` can also be a wildcard pattern to match a sub-tree of devices, eg `1.3.6.1.131.12.4.*`.

### Add unit tests

Add a unit test in `test_profiles.py` to verify that the metric is successfully collected by the integration when the profile is enabled. (These unit tests are mostly used to prevent regressions and will help with maintenance.)

For example:

```python
def test_hp_ilo4(aggregator):
    run_profile_check('hp_ilo4')

    common_tags = common.CHECK_TAGS + ['snmp_profile:hp-ilo4']

    aggregator.assert_metric('snmp.cpqHeSysUtilLifeTime', metric_type=aggregator.MONOTONIC_COUNT, tags=common_tags, count=1)
    aggregator.assert_all_metrics_covered()
```

We don't have simulation data yet, so the test should fail. Let's make sure it does:

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

Good. Now, onto adding simulation data.

### Add simulation data

Add a `.snmprec` file named after the `community_string`, which is the value we gave to `run_profile_check()`:

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

### Rinse and repeat

We have now covered the basic workflow — add metrics, expand tests, add simulation data. You can now go ahead and add more metrics to the profile!

## Next steps

Congratulations! You should now be able to write a basic SNMP profile.

We kept this tutorial as simple as possible, but profiles offer many more options to collect metrics from SNMP devices.

- To learn more about what can be done in profiles, read the [Profile format reference][6].
- To learn more about `.snmprec` files, see the [Simulation data format reference][7].

[1]: /network_performance_monitoring/devices/troubleshooting#terminology
[2]: https://en.wikipedia.org/wiki/HP_Integrated_Lights-Out
[3]: https://support.hpe.com/hpsc/swd/public/detail?swItemId=MTX_53293d026fb147958b223069b6
[4]: https://en.wikipedia.org/wiki/Networking_hardware
[5]: https://en.wikipedia.org/wiki/Field-replaceable_unit
[6]: ./profile-format.md
[7]: ./sim-format.md
