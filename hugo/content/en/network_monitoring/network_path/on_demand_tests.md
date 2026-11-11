---
title: Network Path On-Demand Tests
description: "Run a Network Path traceroute from a Datadog Agent host on demand, from Network Path or Bits Chat, using a Private Action Runner."
is_beta: true
further_reading:
  - link: "/network_monitoring/network_path/setup"
    tag: "Documentation"
    text: "Set up Network Path"
  - link: "/actions/private_actions/"
    tag: "Documentation"
    text: "Private Action Runner"
  - link: "/actions/private_actions/execution_policies/"
    tag: "Documentation"
    text: "Execution Policies"
---

<!-- TODO: Confirm the Preview status and replace this alert with the standard Preview callout if needed. -->
<div class="alert alert-info">Network Path on-demand tests are in Preview.</div>

## Overview

Network Path on-demand tests run a `traceroute` from a Datadog Agent host to a destination when you request it. Use on-demand tests to check a path right after a network change, such as a firewall rule or routing update, or to investigate a connectivity issue as it happens.

You can run an on-demand test in two ways:

- **From [Network Path][1]**: Click {{< ui >}}Run Test Now{{< /ui >}} on an existing path.
- **From [Bits Chat][2]**: Ask Bits Chat to run a Network Path test from a source host to a destination. Bits Chat uses the [`run_network_path`][3] tool in the Datadog MCP Server.

On-demand tests run through a [Private Action Runner (PAR)][4] in the Datadog Agent on the source host.

## Prerequisites

- The Datadog Agent on the source host must meet the [Private Action Runner requirements][7].
- A [Private Action Runner][4] in the Datadog Agent on the source host, enrolled as ownerless. An ownerless runner uses an API key with the Private Action Runner capability. See [Enrollment and ownership][5].

## Setup

### Agent

{{< tabs >}}
{{% tab "Linux" %}}

1. Enable the `system-probe` traceroute module in `/etc/datadog-agent/system-probe.yaml` by adding the following:

   ```yaml
   traceroute:
     enabled: true
   ```

2. In `/etc/datadog-agent/datadog.yaml`, enable the Private Action Runner and allow the Network Path action:

   ```yaml
   private_action_runner:
     enabled: true
     ## Enroll as ownerless with an API key that has the Private Action Runner capability.
     api_key_only_enrollment: true
     actions_allowlist:
       - com.datadoghq.remoteaction.networks.runNetworkPath
   ```

   For other runner options, see [Enrollment and ownership][5] and [Change the allowlist][6].

3. Restart the Agent to apply the configuration changes.

{{% /tab %}}
{{% tab "Windows" %}}

1. Enable the `system-probe` traceroute module in `%ProgramData%\Datadog\system-probe.yaml` by adding the following:

   ```yaml
   traceroute:
     enabled: true
   ```

2. In `%ProgramData%\Datadog\datadog.yaml`, enable the Private Action Runner and allow the Network Path action:

   ```yaml
   private_action_runner:
     enabled: true
     ## Enroll as ownerless with an API key that has the Private Action Runner capability.
     api_key_only_enrollment: true
     actions_allowlist:
       - com.datadoghq.remoteaction.networks.runNetworkPath
   ```

   For other runner options, see [Enrollment and ownership][5] and [Change the allowlist][6].

3. Restart the Agent to apply the configuration changes.

{{% /tab %}}
{{< /tabs >}}

After the Agent restarts, the runner enrolls with Datadog. Go to [**Actions > Private Action Runners**][8] and confirm that the runner for the source host is listed.

### Execution policy

[Create an Execution Policy][9] that allows `com.datadoghq.remoteaction.networks.runNetworkPath` for the Agents on the source hosts. Give access to the users and teams that run on-demand tests.

### Permissions

On-demand tests use the following permissions:

| Permission | Allows |
|---|---|
| Network Path Test Run (`network_path_test_run`) | Running on-demand tests |
| Network Path Data Read (`network_path_config_read`) | Viewing test results |
| Connections Resolve (`connections_resolve`) | Running on-demand tests from the Datadog MCP Server, including Bits Chat |
| Private Action Runner Contribute (`on_prem_runner_use`) | Running on-demand tests from the Datadog MCP Server, including Bits Chat |

To use the Datadog MCP Server, users also need the MCP permissions described in [Required permissions][10]. To grant permissions, see [Datadog Role Permissions][11].

## Run an on-demand test

### From Network Path

<!-- TODO: Confirm the UI location and labels after Run Test Now ships. -->

1. Open a path in [Network Path][1].
2. Click {{< ui >}}Run Test Now{{< /ui >}}. Datadog runs the test from the path's source host to its destination with the same protocol and port.

   {{< img src="network_performance_monitoring/network_path/on_demand_run_test_now.png" alt="Network Path view of the path from auth-dotnet to 1.1.1.1, with the Run Test Now button highlighted next to Analyze With Bits AI and Compare" style="width:100%;" >}}

3. Follow the run in the {{< ui >}}Test Runs{{< /ui >}} tab. When the run completes, a notification also appears. Click the test run to open its network path.

### From Bits Chat

Ask [Bits Chat][2] to run a test, and include the source host and the destination. For example:

```text
Run a Network Path test from web-01.example.com to google.com on TCP port 443.
```

Bits Chat asks you to approve the action, runs the test, and replies with the result and an analysis after the test completes.

## View results

On-demand test results appear in the {{< ui >}}Test Runs{{< /ui >}} tab of a particular path along with its other test runs.

{{< img src="network_performance_monitoring/network_path/on_demand_test_runs_tab.png" alt="Test Runs tab for the path from auth-dotnet to 1.1.1.1, listing three reachable runs with the Triggered run type and their RTT, packet loss, hop count, and jitter" style="width:100%;" >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network/path
[2]: /bits_ai/bits_chat/
[3]: /mcp_server/tools/#run_network_path
[4]: /actions/private_actions/
[5]: /actions/private_actions/enroll_runner/#ownerless-runners
[6]: /actions/private_actions/set_up_agent_based/?tab=linux#change-the-allowlist
[7]: /actions/private_actions/set_up_agent_based/#prerequisites
[8]: https://app.datadoghq.com/actions/private-action-runners
[9]: /actions/private_actions/execution_policies/#create-an-execution-policy
[10]: /mcp_server/setup/#required-permissions
[11]: /account_management/rbac/permissions/
