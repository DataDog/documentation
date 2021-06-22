---
integration_title: System Check
name: system
newhlevel: true
kind: integration
git_integration_title: system
updated_for_agent: 5.8.5
description: 'Track system resource usage: CPU, memory, disk, filesystem, and more.'
is_public: true
public_title: Datadog-System Integration
short_description: 'Track system resource usage: CPU, memory, disk, filesystem, and more.'
categories:
    - os & system
    - configuration & deployment
ddtype: check
aliases:
    - /integrations/system_swap/
    - /integrations/system_core/
supported_os:
    - linux
    - mac_os
    - windows
dependencies:
    ['https://github.com/DataDog/documentation/blob/master/content/en/integrations/system.md']
integration_id: "system"
---

## Overview

Get metrics from your base system about the CPU, IO, load, memory, swap, and uptime. The following checks are also system-related:

- [Directory Check][1] - Capture metrics from the files in given directories.
- [Disk Check][2] - Capture metrics about the disk
- [Process check][3] - Capture metrics from specific running processes on a system.

## Setup

### Installation

The System check is included in the [Datadog Agent][4] package. No additional installation is needed on your server.

## Data Collected

### Metrics

{{< get-metrics-from-git "system" "system.cpu system.fs system.io system.load system.mem system.proc. system.swap system.uptime" >}}

### Events

The System check does not include any events.

### Service checks

The System check does not include any service checks.

### Tags

All system metrics are automatically tagged with `host:<HOST_NAME>`. Additionally, the following namespaces are tagged with `device:<DEVICE_NAME>`.

- `system.disk.*`
- `system.fs.inodes.*`
- `system.io.*`
- `system.net.*`

## System Core

This check collects the number of CPU cores on a host and CPU times (i.e. system, user, idle, etc).

### Setup

#### Installation

The system core check is included in the [Datadog Agent][4] package. No additional installation is needed on your server.

#### Configuration

1. Edit the `system_core.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][5]. See the [sample system_core.d/conf.yaml][6] for all available configuration options. **Note**: At least one entry is required under `instances` to enable the check, for example:

    ```yaml
    init_config:
    instances:
        - foo: bar
        tags:
            - key:value
    ```

2. [Restart the Agent][7].

#### Validation

[Run the Agent's status subcommand][4] and look for `system_core` under the Checks section.

### Data Collected

#### Metrics

{{< get-metrics-from-git "system_core" >}}

Depending on the platform, the check may collect other CPU time metrics, e.g. `system.core.interrupt` on Windows, `system.core.iowait` on Linux, etc.

#### Events

The System Core check does not include any events.

#### Service checks

The System Core check does not include any service checks.

## System Swap

This check monitors the number of bytes a host has swapped in and out.

### Setup

#### Installation

The system swap check is included in the [Datadog Agent][4] package. No additional installation is needed on your server.

#### Configuration

1. Edit the `system_swap.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][5]. See the [sample system_swap.d/conf.yaml][8] for all available configuration options. **Note**: This check takes no initial configuration.

2. [Restart the Agent][7].

#### Validation

[Run the Agent's status subcommand][4] and look for `system_swap` under the Checks section.

### Data Collected

#### Metrics

{{< get-metrics-from-git "system_swap" >}}

#### Events

The System Swap check does not include any events.

#### Service checks

The System Swap check does not include any service checks.

[1]: /integrations/directory/
[2]: /integrations/disk/
[3]: /integrations/process/
[4]: /agent/guide/agent-commands/#agent-status-and-information
[5]: /agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-core/blob/master/system_core/datadog_checks/system_core/data/conf.yaml.example
[7]: /agent/guide/agent-commands/#start-stop-restart-the-agent
[8]: https://github.com/DataDog/integrations-core/blob/master/system_swap/datadog_checks/system_swap/data/conf.yaml.example
