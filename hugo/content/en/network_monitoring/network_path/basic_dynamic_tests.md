---
title: Basic Dynamic Tests
description: Automatically run Network Path tests on the highest-traffic paths observed by Cloud Network Monitoring.
is_beta: true
further_reading:
- link: "/network_monitoring/network_path/setup/#dynamic-tests"
  tag: "Documentation"
  text: "Set up standard dynamic tests"
- link: "/network_monitoring/cloud_network_monitoring/setup/"
  tag: "Documentation"
  text: "Set up Cloud Network Monitoring"
- link: "/network_monitoring/network_path/list_view/"
  tag: "Documentation"
  text: "Network Path List View"
---

<div class="alert alert-info">Basic dynamic tests are in Preview and require Agent <code>v7.84+</code>.</div>

## Overview

Basic dynamic tests give hosts with [Cloud Network Monitoring][1] (CNM) hop-by-hop [Network Path][2] visibility into their highest-traffic connections, without configuring individual destinations. Basic dynamic tests are included with CNM at no additional cost.

On each Agent with basic dynamic tests enabled:

1. The Agent tracks the traffic volume (bytes sent and received) of the outgoing connections to other hosts that CNM observes.
2. Five minutes after the Agent starts, and then every hour, the Agent selects up to five paths with the most traffic.
3. The Agent runs one Network Path test on each selected path.

Basic dynamic tests provide representative coverage of your busiest paths, but don't guarantee that a specific connection is tested. For broader coverage of the paths that CNM observes, use [standard dynamic tests][3].

## Prerequisites

- [CNM][4] is enabled on the host.
- Agent `v7.84+` is installed.

## Setup

{{< tabs >}}
{{% tab "Linux" %}}

1. Add the following to `/etc/datadog-agent/datadog.yaml`:

   ```yaml
   network_path:
     connections_monitoring:
       basic_tests_enabled: true
   ```

2. Restart the Agent.

{{% /tab %}}
{{% tab "macOS" %}}

1. Add the following to `/opt/datadog-agent/etc/datadog.yaml`:

   ```yaml
   network_path:
     connections_monitoring:
       basic_tests_enabled: true
   ```

2. Restart the Agent.

{{% /tab %}}
{{% tab "Windows" %}}

1. Add the following to `%ProgramData%\Datadog\datadog.yaml`:

   ```yaml
   network_path:
     connections_monitoring:
       basic_tests_enabled: true
   ```

2. Restart the Agent.

{{% /tab %}}
{{% tab "Helm" %}}

Agent `v7.84+` and Helm chart `v3.109.1+` are required.

Add the following to your `values.yaml` file, then upgrade your Helm release:

```yaml
datadog:
  ## Enable Cloud Network Monitoring, which is required for basic dynamic tests.
  networkMonitoring:
    enabled: true

  ## Enable the traceroute module of the system-probe.
  ## The Helm chart sets this value explicitly, so it must be set to true.
  traceroute:
    enabled: true

  ## Enable basic dynamic tests.
  env:
    - name: DD_NETWORK_PATH_CONNECTIONS_MONITORING_BASIC_TESTS_ENABLED
      value: "true"
```

{{% /tab %}}
{{< /tabs >}}

On Linux, macOS, and Windows hosts, the Agent turns on the system-probe traceroute module automatically when CNM and basic dynamic tests are enabled. If `traceroute.enabled` is set to `false` in your `system-probe.yaml` file, basic dynamic tests don't run. Remove the setting or set it to `true`.

To disable basic dynamic tests, set `basic_tests_enabled` to `false` and restart the Agent.

## View results

After about five minutes, open [Network Path][5] and filter for `origin:network_traffic`. This filter shows paths from both basic and standard dynamic tests.

Each selected path is tested once. A path that remains among the highest-traffic paths is tested again in the next selection.

## Basic and standard dynamic tests

|                    | Basic dynamic tests                                       | Standard dynamic tests                          |
|--------------------|-----------------------------------------------------------|-------------------------------------------------|
| **Coverage**       | Up to five of the highest-traffic paths per Agent         | All eligible paths that CNM observes, up to `pathtest_contexts_limit` (default: 1000) |
| **Test frequency** | Every hour, for the selected paths                        | Every `pathtest_interval` (default: 30 minutes) |
| **Setting**        | `network_path.connections_monitoring.basic_tests_enabled` | `network_path.connections_monitoring.enabled`   |
| **Best for**       | Trying Network Path on your busiest connections           | Broad, predictable coverage                     |

If both settings are enabled, standard dynamic tests take precedence and basic dynamic tests don't run.

Both types of dynamic tests apply the same [filters][6]. Basic dynamic tests only select paths to destinations that your filters allow.

## Troubleshooting

### No paths from basic dynamic tests

If no paths with `origin:network_traffic` appear in [Network Path][5], verify the following:

1. The Agent is version `7.84+`.
2. CNM is enabled and shows connections from the host on the [CNM Analytics][7] page.
3. `network_path.connections_monitoring.basic_tests_enabled` is set to `true`, and at least five minutes have passed since the Agent restarted.
4. `traceroute.enabled` is not set to `false` in `system-probe.yaml`. For Helm, `datadog.traceroute.enabled` is set to `true`.
5. The host has outgoing connections to destinations with a domain name. By default, dynamic tests skip destinations without a domain name. To include these destinations, set `network_path.collector.monitor_ip_without_domain` to `true`.
6. Your [filters][6] don't exclude the destinations you expect to see.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /network_monitoring/cloud_network_monitoring/
[2]: /network_monitoring/network_path/
[3]: /network_monitoring/network_path/setup/#dynamic-tests
[4]: /network_monitoring/cloud_network_monitoring/setup/
[5]: https://app.datadoghq.com/network/path
[6]: /network_monitoring/network_path/setup/#filter-syntax
[7]: https://app.datadoghq.com/network
