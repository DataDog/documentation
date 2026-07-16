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

Rollbacks are currently supported for the following vendors and platforms:

- Cisco IOS
- Aruba (EOS)

## Prerequisites

- [Network Configuration Management][2] must be set up for your devices.
- <!-- TODO: minimum Agent version for rollback support -->
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

3. <!-- TODO: additional configuration required for evictions -->

4. The Agent process needs write access to the `run_path` directory, where rollback data is stored locally.

5. Restart the Agent to apply the configuration changes.

### Private Action Runner

1. [Set up a Private Action Runner][1] on a host that the Agent's IPC port can reach.
2. Enable the `com.datadoghq.remoteaction.networkconfigmanagement` remote action bundle on the runner.
3. Register the runner in Datadog and assign it to an execution group that allows the `com.datadoghq.remoteaction.networkconfigmanagement.rollbackConfig` action.

   <!-- TODO: screenshot showing where to assign the execution group/action permission -->

### Permissions

Rollbacks use the following NCM permissions:

| Permission | Allows |
|---|---|
| NCM Read | Viewing device configurations |
| NCM Write | Triggering a rollback |

Users who trigger rollbacks need the NCM Write permission active on their account.

## Trigger a rollback

1. Navigate to the [Configuration tab][2] for a device in the NDM device view.
2. <!-- TODO: fill in the actual UI steps to select a configuration version and trigger the rollback -->

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /actions/private_actions/
[2]: /network_monitoring/devices/config_management/#viewing-configurations
