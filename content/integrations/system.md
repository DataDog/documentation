---
title: System Check
integration_title: System Check
newhlevel: true
kind: integration
git_integration_title: system
updated_for_agent: 5.8.5
description: "Track system resource usage: CPU, memory, disk, filesystem, and more."
is_public: true
---
## Overview

Get metrics from your base system about the CPU, IO, load, memory, processes, swap, and uptime. Other system-related checks can be found here:

* [Directory Check](/integrations/directory) - Capture metrics from the files in given directories.
* [Disk Check](/integrations/disk) - Capture metrics about the disk
* [Process check](/integrations/process/) - Capture metrics from specific running processes on a system.

## Setup
### Configuration

No configuration is necessary for the system.

## Data Collected
### Metrics

{{< get-metrics-from-git "system" "system.cpu system.fs system.io system.load system.mem system.proc system.processes system.swap system.uptime" >}}


## Agent Check: system cores

## Overview

This check collects the number of CPU cores on a host and CPU times (i.e. system, user, idle, etc).

## Setup
### Installation

The system_core check is packaged with the Agent, so [install the Agent](https://app.datadoghq.com/account/settings#agent) on any host.

### Configuration

Create a file `system_core.yaml` in the Agent's `conf.d` directory. See the [sample system_core.yaml](https://github.com/DataDog/integrations-core/blob/master/system_core/conf.yaml.example) for all available configuration options:

```
init_config:

instances:
  - foo: bar
```

The Agent just needs one item in `instances` in order to enable the check. The content of the item doesn't matter.

Restart the Agent to enable the check.

### Validation

[Run the Agent's `info` subcommand](https://help.datadoghq.com/hc/en-us/articles/203764635-Agent-Status-and-Information) and look for `system_core` under the Checks section:

```
  Checks
  ======
    [...]

    system_core
    -------
      - instance #0 [OK]
      - Collected 5 metrics, 0 events & 0 service checks

    [...]
```

## Compatibility

The system_core check is compatible with all major platforms.

## Data Collected
### Metrics

{{< get-metrics-from-git "system_core" >}}

Depending on the platform, the check may collect other CPU time metrics, e.g. `system.core.interrupt` on Windows, `system.core.iowait` on Linux, etc.

### Events
The System Core check does not include any event at this time.

### Service Checks
The System Core check does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)

## Agent Check: swap

## Overview

This check monitors the number of bytes a host has swapped in and swapped out.

## Setup
### Installation

The system swap check is packaged with the Agent, so [install the Agent](https://app.datadoghq.com/account/settings#agent) on any host.

### Configuration

Create a blank Agent check configuration file called `system_swap.yaml` in the Agent's `conf.d` directory. See the [sample system_swap.yaml](https://github.com/DataDog/integrations-core/blob/master/system_swap/conf.yaml.example) for all available configuration options:

```
# This check takes no initial configuration
init_config:

instances: [{}]
```

Restart the Agent to start collecting swap metrics.

### Validation

[Run the Agent's `info` subcommand](https://help.datadoghq.com/hc/en-us/articles/203764635-Agent-Status-and-Information) and look for `system_swap` under the Checks section:

```
  Checks
  ======
    [...]

    system_swap
    -------
      - instance #0 [OK]
      - Collected 2 metrics, 0 events & 0 service checks

    [...]
```

## Compatibility

The system_swap check is compatible with all major platforms.

## Data Collected
### Metrics

{{< get-metrics-from-git "system_swap" >}}

### Events
The System Swap check does not include any event at this time.

### Service Checks
The System Swap check does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)