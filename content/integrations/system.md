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
---
## Overview

Get metrics from your base system about the CPU, IO, load, memory, swap, and uptime. Other system-related checks can be found here:

* [Directory Check][1] - Capture metrics from the files in given directories.
* [Disk Check][2] - Capture metrics about the disk
* [Process check][3] - Capture metrics from specific running processes on a system.

## Setup
### Configuration

No configuration is necessary for the system.

## Data Collected
### Metrics

{{< get-metrics-from-git "system" "system.cpu system.fs system.io system.load system.mem system.swap system.uptime" >}}

## Agent Check: system cores

## Overview

This check collects the number of CPU cores on a host and CPU times (i.e. system, user, idle, etc).

## Setup
### Installation

The system_core check is packaged with the Agent, so [install the Agent][4] on any host.

### Configuration

Create a file `system_core.yaml` in the Agent's `conf.d` directory. See the [sample system_core.yaml][5] for all available configuration options:

```
init_config:

instances:
  - foo: bar
```

The Agent just needs one item in `instances` in order to enable the check. The content of the item doesn't matter.

Restart the Agent to enable the check.

### Validation

[Run the Agent's `info` subcommand][6] and look for `system_core` under the Checks section:

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
Need help? Contact [Datadog Support][7].

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog][8]

## Agent Check: swap

## Overview

This check monitors the number of bytes a host has swapped in and swapped out.

## Setup
### Installation

The system swap check is packaged with the Agent, so [install the Agent][4] on any host.

### Configuration

Create a blank Agent check configuration file called `system_swap.yaml` in the Agent's `conf.d` directory. See the [sample system_swap.yaml][9] for all available configuration options:

```
# This check takes no initial configuration
init_config:

instances: [{}]
```

Restart the Agent to start collecting swap metrics.

### Validation

[Run the Agent's `info` subcommand][6] and look for `system_swap` under the Checks section:

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
Need help? Contact [Datadog Support][7].

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog][8]

[1]: /integrations/directory
[2]: /integrations/disk
[3]: /integrations/process/
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://github.com/DataDog/integrations-core/blob/master/system_core/conf.yaml.example
[6]: https://help.datadoghq.com/hc/en-us/articles/203764635-Agent-Status-and-Information
[7]: /help/
[8]: https://www.datadoghq.com/blog/
[9]: https://github.com/DataDog/integrations-core/blob/master/system_swap/conf.yaml.example
