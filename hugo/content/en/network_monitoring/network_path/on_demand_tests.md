---
title: On-Demand Tests
description: "Run a Network Path traceroute from a Datadog Agent host on demand from Network Path, using a Private Action Runner."
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

<div class="alert alert-info">On-demand tests on Network Path are in Preview. Contact your Datadog representative to request access.</div>

## Overview

On-demand tests allow you to run a Network Path test from a source host to a destination at any time. Use them to check a path right after a network change, such as a firewall rule or routing update. You can also use them to investigate a connectivity issue as it happens.

You can run an on-demand test from the Network Path UI. On-demand tests run through a [Private Action Runner (PAR)][1] in the Datadog Agent on the source host.

## Setup

### Step 1: Check the Agent and API key

1. The Datadog Agent on the source host meets the [Private Action Runner requirements][2].
2. The Agent uses an API key with the **Private Action Runner** capability. See [Enrollment and ownership][3].

### Step 2: Configure the Agent

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

   See [Change the allowlist][1] for details.

3. Restart the Agent to apply the configuration changes:

   ```shell
   sudo systemctl restart datadog-agent
   ```

[1]: /actions/private_actions/set_up_agent_based/?tab=linux#change-the-allowlist

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

   See [Change the allowlist][1] for details.

3. Restart the Agent to apply the configuration changes. In an elevated PowerShell prompt, run:

   ```powershell
   Restart-Service -Force datadogagent
   ```

[1]: /actions/private_actions/set_up_agent_based/?tab=windows#change-the-allowlist

{{% /tab %}}
{{< /tabs >}}

After the Agent restarts, the runner enrolls with Datadog. Go to [**Actions > Private Action Runners**][4] and confirm that the runner for the source host is listed.

### Step 3: Create an execution policy

Creating an execution policy requires the Datadog Admin role or a custom role with the **Execution Groups Write** (`execution_groups_write`) permission.

[Create an Execution Policy][5] that allows the `Run Network Path` action and sets **Targets** for the Agents on the source hosts. Give access to the users and teams that run on-demand tests.

{{< img src="network_performance_monitoring/network_path/on_demand_execution_policy.png" alt="Execution Policy form with red boxes around the fields to fill in: the Allow effect, the Remote Action integration with the Run network path action selected, a target that matches the Agent with the tag hostname:auth-dotnet, and the Access setting" style="width:60%;" >}}

## Permissions

On-demand tests use the following permissions. To grant permissions, see [Datadog Role Permissions][6].

| Permission | Allows |
|---|---|
| Network Path Test Run (`network_path_test_run`) | Running on-demand tests |
| Network Path Data Read (`network_path_config_read`) | Viewing test results |

## Run an on-demand test

1. Open a path in [Network Path][7].
2. Click {{< ui >}}Run Test Now{{< /ui >}}. Datadog runs the test from the path's source host to its destination with the same protocol and port.

   {{< img src="network_performance_monitoring/network_path/on_demand_run_test_now.png" alt="Network Path view of the path from auth-dotnet to 1.1.1.1, with the Run Test Now button highlighted" style="width:100%;" >}}

3. Follow the run in the {{< ui >}}Test Runs{{< /ui >}} tab. When the run completes, click the test run to open its network path.

## View results

On-demand test results appear in the {{< ui >}}Test Runs{{< /ui >}} tab of a particular path along with its other test runs.

{{< img src="network_performance_monitoring/network_path/on_demand_test_runs_tab.png" alt="Test Runs tab for the path from auth-dotnet to 1.1.1.1, listing three reachable runs with the Triggered run type and their RTT, packet loss, hop count, and jitter" style="width:100%;" >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /actions/private_actions/
[2]: /actions/private_actions/set_up_agent_based/#prerequisites
[3]: /actions/private_actions/enroll_runner/#ownerless-runners
[4]: https://app.datadoghq.com/actions/private-action-runners
[5]: /actions/private_actions/execution_policies/#create-an-execution-policy
[6]: /account_management/rbac/permissions/
[7]: https://app.datadoghq.com/network/path
