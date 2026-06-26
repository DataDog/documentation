---
app_id: system
categories:
- os & system
custom_kind: integration
description: Capture metrics and monitor the status of running processes.
further_reading:
- link: https://www.datadoghq.com/blog/process-check-monitoring
  tag: blog
  text: Monitor process resource consumption at a glance
integration_version: 5.5.1
media: []
supported_os:
- linux
- macos
- windows
title: Processes
---
## Overview

The Process Check lets you:

- Collect resource usage metrics for specific running processes on any host. For example, CPU, memory, I/O, and number of threads.
- Use [Process Monitors](https://docs.datadoghq.com/monitors/create/types/process_check/?tab=checkalert) to configure thresholds for how many instances of a specific process should be running and get alerts when the thresholds aren't met (see **Service Checks** below).

**Minimum Agent version:** 6.0.0

## Setup

### Installation

The Process check is included in the [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) package, so you don't need to install anything else on your server.

### Configuration

Unlike many checks, the Process check doesn't monitor anything useful by default. You must configure which processes you want to monitor.

While there's no standard default check configuration, here's an example `process.d/conf.yaml` that monitors SSH/SSHD processes. See the [sample process.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/process/datadog_checks/process/data/conf.yaml.example) for all available configuration options:

```yaml
init_config:
instances:
  - name: ssh
    search_string:
      - ssh
      - sshd
```

**Note**: When `exact_match` is set to `false`, values in `search_string` are interpreted as Python regular expressions using `re.search()`. Regex metacharacters (`. + * ? ( ) [ ] { } ^ $ | \`) must be escaped with a backslash for literal matching.

For example, to match the literal path `/usr/lib/jdk-11.0.10+9/bin/java`, escape the `.` and `+` characters:

Unescaped (does not match literally):

```yaml
instances:
  - exact_match: false
    name: java_jdk11
    search_string:
      - /usr/lib/jdk-11.0.10+9/bin/java
```

Escaped (matches literally):

```yaml
instances:
  - exact_match: false
    name: java_jdk11
    search_string:
      - /usr/lib/jdk-11\.0\.10\+9/bin/java
```

**Note**: After you make configuration changes, make sure you [restart the Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

Retrieving some process metrics requires the Datadog collector to either run as the monitored process user or with privileged access. For the `open_file_descriptors` metric on Unix platforms, there is an additional configuration option. Setting `try_sudo` to `true` in your `conf.yaml` file allows the Process check to try using `sudo` to collect the `open_file_descriptors` metric. Using this configuration option requires setting the appropriate sudoers rules in `/etc/sudoers`:

```shell
dd-agent ALL=NOPASSWD: /bin/ls /proc/*/fd/
```

### Validation

Run the [Agent's status subcommand](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) and look for `process` under the Checks section.

### Metrics notes

The following metrics are not available on Linux or macOS:

- Process I/O metrics are **not** available on Linux or macOS since the files that the Agent reads (`/proc/<PID>/io`) are only readable by the process's owner. For more information, [read the Agent FAQ](https://docs.datadoghq.com/agent/faq/why-don-t-i-see-the-system-processes-open-file-descriptors-metric/).

The following metrics are not available on Windows:

- `system.cpu.iowait`
- `system.processes.mem.page_faults.minor_faults`
- `system.processes.mem.page_faults.children_minor_faults`
- `system.processes.mem.page_faults.major_faults`
- `system.processes.mem.page_faults.children_major_faults`
- `system.processes.mem.real`

**Note**: Use a [WMI check](https://docs.datadoghq.com/integrations/wmi_check/) to gather page fault metrics on Windows.

**Note**: In v6.11+ on Windows, the Agent runs as `ddagentuser` instead of `Local System`. Because of [this](https://docs.datadoghq.com/agent/guide/windows-agent-ddagent-user/#process-check), it does not have access to the full command line of processes running under other users and to the user of other users' processes. This causes the following options of the check to not work:

- `exact_match` when set to `false`
- `user`, which allows selecting processes that belong to a specific user

All metrics are per `instance` configured in process.yaml, and are tagged `process_name:<instance_name>`.

The `system.processes.cpu.pct` metric sent by this check is only accurate for processes that live for more
than 30 seconds. Do not expect its value to be accurate for shorter-lived processes.

For the full list of metrics, see the [Metrics section](#metrics).

## Data Collected

### Metrics

| | |
| --- | --- |
| **system.processes.cpu.pct** <br>(gauge) | The CPU utilization of a process.<br>_Shown as percent_ |
| **system.processes.cpu.normalized_pct** <br>(gauge) | The normalized CPU utilization of a process.<br>_Shown as percent_ |
| **system.processes.involuntary_ctx_switches** <br>(gauge) | The number of involuntary context switches performed by this process.<br>_Shown as event_ |
| **system.processes.ioread_bytes** <br>(gauge) | The number of bytes read from disk by this process. In Windows: the number of bytes read.<br>_Shown as byte_ |
| **system.processes.ioread_bytes_count** <br>(count) | The number of bytes read from disk by this process. In Windows: the number of bytes read.<br>_Shown as byte_ |
| **system.processes.ioread_count** <br>(gauge) | The number of disk reads by this process. In Windows: the number of reads by this process.<br>_Shown as read_ |
| **system.processes.iowrite_bytes** <br>(gauge) | The number of bytes written to disk by this process. In Windows: the number of bytes written by this process.<br>_Shown as byte_ |
| **system.processes.iowrite_bytes_count** <br>(count) | The number of bytes written to disk by this process. In Windows: the number of bytes written by this process.<br>_Shown as byte_ |
| **system.processes.iowrite_count** <br>(gauge) | The number of disk writes by this process. In Windows: the number of writes by this process.<br>_Shown as write_ |
| **system.processes.mem.page_faults.minor_faults** <br>(gauge) | In Unix/Linux and macOS: The number of minor page faults per second for this process.<br>_Shown as occurrence_ |
| **system.processes.mem.page_faults.children_minor_faults** <br>(gauge) | In Unix/Linux and macOS: The number of minor page faults per second for children of this process.<br>_Shown as occurrence_ |
| **system.processes.mem.page_faults.major_faults** <br>(gauge) | In Unix/Linux and macOS: The number of major page faults per second for this process.<br>_Shown as occurrence_ |
| **system.processes.mem.page_faults.children_major_faults** <br>(gauge) | In Unix/Linux and macOS: The number of major page faults per second for children of this process.<br>_Shown as occurrence_ |
| **system.processes.mem.pct** <br>(gauge) | The process memory consumption.<br>_Shown as percent_ |
| **system.processes.mem.real** <br>(gauge) | The non-swapped physical memory a process has used and cannot be shared with another process (Linux only).<br>_Shown as byte_ |
| **system.processes.mem.rss** <br>(gauge) | The non-swapped physical memory a process has used. aka "Resident Set Size".<br>_Shown as byte_ |
| **system.processes.mem.vms** <br>(gauge) | The total amount of virtual memory used by the process. aka "Virtual Memory Size".<br>_Shown as byte_ |
| **system.processes.number** <br>(gauge) | The number of processes.<br>_Shown as process_ |
| **system.processes.open_file_descriptors** <br>(gauge) | The number of file descriptors used by this process (only available for processes run as the dd-agent user)|
| **system.processes.open_handles** <br>(gauge) | The number of handles used by this process.|
| **system.processes.threads** <br>(gauge) | The number of threads used by this process.<br>_Shown as thread_ |
| **system.processes.voluntary_ctx_switches** <br>(gauge) | The number of voluntary context switches performed by this process.<br>_Shown as event_ |
| **system.processes.run_time.avg** <br>(gauge) | The average running time of all instances of this process<br>_Shown as second_ |
| **system.processes.run_time.max** <br>(gauge) | The longest running time of all instances of this process<br>_Shown as second_ |
| **system.processes.run_time.min** <br>(gauge) | The shortest running time of all instances of this process<br>_Shown as second_ |

### Events

The Process Check does not include any events.

### Service Checks

**process.up**

Returns OK if the check is within the warning thresholds, CRITICAL if it's outside of the critical thresholds, and WARNING if it's outside of the warning thresholds.

_Statuses: ok, warning, critical_

## Troubleshooting

Need help? Contact [Datadog support](https://docs.datadoghq.com/help/).
