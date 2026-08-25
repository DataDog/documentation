---
title: Network Configuration Management Rollbacks
description: "Roll back a network device to a previous configuration from NDM."
further_reading:
  - link: "/network_monitoring/devices/config_management"
    tag: "Documentation"
    text: "Network Configuration Management"
  - link: "/actions/private_actions/"
    tag: "Documentation"
    text: "Private Action Runner"
---

## Overview

Network Configuration Management (NCM) rollbacks let you restore a network device to a previous configuration directly from Datadog. Rollbacks use a [Private Action Runner (PAR)][1] to apply the selected configuration back to the device.

Rollbacks are supported for the following vendors and platforms:

- Cisco IOS
- Arista (EOS)

## Prerequisites

- [Network Configuration Management][2] must be set up for your devices.
- The Datadog Agent must be on version `7.83.0` or later.
- A [Private Action Runner][1] that the Agent's IPC port (default `5001`) can reach, either on the same host or over the network.

## Setup

### Agent

1. Add the following to your `datadog.yaml` to enable rollbacks:

   ```yaml
   network_devices:
     config_management:
       rollback:
         enabled: true
   ```

   Alternatively, set the `network_devices.config_management.rollback.enabled` configuration option to `true`.

2. In `conf.d/network_config_management.d/conf.yaml`, optionally set how often the Agent reports its configuration inventory:

   ```yaml
   init_config:
     ## @param inventory_report_max_interval - integer - optional - default: 3600 (1 hour)
     ## Maximum interval, in seconds, between inventory reports.
     inventory_report_max_interval: 3600
   ```

3. Optionally, configure the local store that holds configurations eligible for rollback:

   ```yaml
   init_config:
     store:
       ## @param min_configs_per_device - integer - optional - default: 2
       ## Minimum number of configurations to retain per device, regardless of age.
       min_configs_per_device: 2
       ## @param max_configs_per_device - integer - optional - default: 24
       ## Maximum number of configurations to retain per device before older ones are evicted.
       max_configs_per_device: 24
       ## @param max_raw_config_store_bytes - integer - optional - default: 2000000000 (2 GB)
       ## Maximum size, in bytes, of the local configuration store before older configurations are evicted.
       max_raw_config_store_bytes: 2000000000
   ```

4. The Agent process needs write access to the `run_path` directory where rollback data is stored locally.

5. Restart the Agent to apply the configuration changes.

### Private Action Runner

1. [Set up a Private Action Runner][1] on a host that the Agent's IPC port can reach.
2. Add `com.datadoghq.remoteaction.networkconfigmanagement.rollbackConfig` to the `private_action_runner.actions_allowlist` section of `/etc/datadog-agent/datadog.yaml`. See [Change the allowlist of a runner][3] for details.
3. Register the runner in Datadog and assign it to an execution group. Within that group, create a policy that allows the `com.datadoghq.remoteaction.networkconfigmanagement.rollbackConfig` action.
   - The policy must grant `Editor` access to users with the `NCM Device Config Write` role.

   {{< img src="/network_device_monitoring/config_mgmt/execution_group_policy.png" alt="Screenshot that shows how to add the NCM Write role to an execution group policy" style="width:100%;" >}}

### Permissions

Rollbacks use the following NCM permissions:

| Permission | Allows |
|---|---|
| NCM Read | Viewing device configurations |
| NCM Write | Triggering a rollback |


## Trigger a rollback

1. Navigate to the [Configuration tab][2] for a device in the NDM device view.
2. Select the configuration version you want to roll back to. The side panel displays a {{< ui >}}Rollback{{< /ui >}} button for that version.
3. Click {{< ui >}}Rollback{{< /ui >}}, review the diff in the confirmation modal.
4. Click {{< ui >}}Rollback{{< /ui >}} again to confirm.

   {{< img src="/network_device_monitoring/config_mgmt/config_rollback.png" alt="Screenshot that shows when a rollback has been initiated and what to expect" style="width:100%;" >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /actions/private_actions/
[2]: /network_monitoring/devices/config_management/#viewing-configurations
[3]: /actions/private_actions/use_private_actions/?tab=linux#change-the-allowlist-of-a-runner
