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

<div class="alert alert-info">Basic dynamic tests are in Preview.</div>

## Overview

Basic dynamic tests give hosts with [Cloud Network Monitoring][1] (CNM) hop-by-hop [Network Path][2] visibility into their highest-traffic connections, without configuring individual destinations. Basic dynamic tests are included with CNM at no additional cost.

Every hour, each Agent selects up to five of its highest-traffic paths and runs one Network Path test on each. The first selection happens five minutes after the Agent starts.

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

Agent `v7.84+` and Helm chart `v3.124.0+` are required.

Add the following to your `values.yaml` file, then upgrade your Helm release:

```yaml
datadog:
  ## Enable Cloud Network Monitoring, which is required for basic dynamic tests.
  networkMonitoring:
    enabled: true

  ## Enable the traceroute module of the system-probe.
  traceroute:
    enabled: true

  ## Enable basic dynamic tests.
  env:
    - name: DD_NETWORK_PATH_CONNECTIONS_MONITORING_BASIC_TESTS_ENABLED
      value: "true"
```

{{% /tab %}}
{{< /tabs >}}

To disable basic dynamic tests, set `basic_tests_enabled` to `false` and restart the Agent.

## View results

After about five minutes, open [Network Path][5] and filter for `test_run_type:dynamic`. This filter shows paths from all dynamic tests, including standard dynamic tests and Dynamic Tests for NetFlow.

## Basic and standard dynamic tests

|                    | Basic dynamic tests                               | Standard dynamic tests                        |
|--------------------|---------------------------------------------------|-----------------------------------------------|
| **Coverage**       | Up to five of the highest-traffic paths per Agent | Broad coverage of the paths that CNM observes |
| **Test frequency** | Every hour, for the selected paths                | Every 30 minutes by default                   |
| **Best for**       | Trying Network Path on your busiest connections   | Predictable coverage of your connections      |

If standard dynamic tests are also enabled, they take precedence and basic dynamic tests don't run.

Basic dynamic tests only select destinations allowed by your [filters][6].

## Troubleshooting

### No paths from basic dynamic tests

If no paths with `test_run_type:dynamic` appear in [Network Path][5], verify the following:

1. The [prerequisites](#prerequisites) are met, `basic_tests_enabled` is set to `true`, and at least five minutes have passed since the Agent restarted.
2. CNM shows connections from the host on the [CNM Analytics][7] page.
3. `traceroute.enabled` is not set to `false` in `system-probe.yaml`. For Helm, `datadog.traceroute.enabled` is set to `true`.
4. The host has outgoing connections to destinations with a domain name. By default, dynamic tests skip destinations without a domain name. To include these destinations, set `network_path.collector.monitor_ip_without_domain` to `true`.
5. Your [filters][6] don't exclude the destinations you expect to see.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /network_monitoring/cloud_network_monitoring/
[2]: /network_monitoring/network_path/
[3]: /network_monitoring/network_path/setup/#dynamic-tests
[4]: /network_monitoring/cloud_network_monitoring/setup/
[5]: https://app.datadoghq.com/network/path
[6]: /network_monitoring/network_path/setup/#filter-syntax
[7]: https://app.datadoghq.com/network
