---
integration_title: System Check
name: system
newhlevel: true
kind: integration
git_integration_title: system
updated_for_agent: 5.8.5
description: "Track system resource usage: CPU, memory, disk, filesystem, and more."
is_public: true
public_title: Datadog-System Integration
short_description: "Track system resource usage: CPU, memory, disk, filesystem, and more."
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
---

## Overview

Get metrics from your base system about the CPU, IO, load, memory, swap, and uptime. Other system-related checks can be found here:

* [Directory Check][1] - Capture metrics from the files in given directories.
* [Disk Check][2] - Capture metrics about the disk
* [Process check][3] - Capture metrics from specific running processes on a system.

## Setup

The System check is included in the [Datadog Agent][4] package, so you don't need to install anything else on your server.

## Data Collected
### Metrics

{{< get-metrics-from-git "system" "system.cpu system.fs system.io system.load system.mem system.proc. system.swap system.uptime" >}}

### Tags
All system metrics are automatically tagged with `host:<HOST_NAME>`. Additionally, the following namespaces are tagged with `device:<DEVICE_NAME>`.

* `system.disk.*`
* `system.fs.inodes.*`
* `system.io.*`
* `system.net.*`

## Agent Check: System cores

This check collects the number of CPU cores on a host and CPU times (i.e. system, user, idle, etc).

### Setup
#### Installation

The system_core check is included in the [Datadog Agent][4] package, so you don't need to install anything else on your server.

#### Configuration

1. Edit the `system_core.d/conf.yaml` file in the `conf.d/` folder at the root of your Agent's directory. See the [sample system_core.d/conf.yaml][5] for all available configuration options:

    ```
    init_config:

    instances:
        - {}
    ```

    The Agent just needs one item in `instances` in order to enable the check. The content of the item doesn't matter.

2. [Restart the Agent][6] to enable the check.

### Validation

[Run the Agent's `status` subcommand][4] and look for `system_core` under the Checks section.

### Data Collected
#### Metrics

{{< get-metrics-from-git "system_core" >}}

Depending on the platform, the check may collect other CPU time metrics, e.g. `system.core.interrupt` on Windows, `system.core.iowait` on Linux, etc.

## Agent Check: Swap

This check monitors the number of bytes a host has swapped in and swapped out.

### Installation

The system swap check is included in the [Datadog Agent][4] package, so you don't need to install anything else on your server.

### Configuration

1. Edit the `system_swap.d/conf.yaml` file in the `conf.d/` folder at the root of your Agent's directory. See the [sample system_swap.d/conf.yaml][7] for all available configuration options:

    ```
    # This check takes no initial configuration
    init_config:

    instances: [{}]
    ```

2. [Restart the Agent][6] to start collecting swap metrics.

### Validation

[Run the Agent's `status` subcommand][4] and look for `system_swap` under the Checks section.

### Data Collected
#### Metrics

{{< get-metrics-from-git "system_swap" >}}

[1]: /integrations/directory
[2]: /integrations/disk
[3]: /integrations/process
[4]: /agent/guide/agent-commands/#agent-status-and-information
[5]: https://github.com/DataDog/integrations-core/blob/master/system_core/datadog_checks/system_core/data/conf.yaml.example
[6]: /agent/guide/agent-commands/#start-stop-restart-the-agent
[7]: https://github.com/DataDog/integrations-core/blob/master/system_swap/datadog_checks/system_swap/data/conf.yaml.example
