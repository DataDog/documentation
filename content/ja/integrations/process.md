---
"app_id": "system"
"app_uuid": "43bff15c-c943-4153-a0dc-25bb557ac763"
"assets":
  "integration":
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "system.processes.cpu.pct"
      "metadata_path": "metadata.csv"
      "prefix": "system."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_name": "Process"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "os & system"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/process/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "process"
"integration_id": "system"
"integration_title": "Processes"
"integration_version": "3.3.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "process"
"public_title": "Processes"
"short_description": "Capture metrics and monitor the status of running processes."
"supported_os":
- "linux"
- "macos"
- "windows"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Supported OS::Windows"
  - "Category::OS & System"
  "configuration": "README.md#Setup"
  "description": "Capture metrics and monitor the status of running processes."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Processes"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

The Process Check lets you:
- Collect resource usage metrics for specific running processes on any host. For example, CPU, memory, I/O, and number of threads.
- Use [Process Monitors][1] to configure thresholds for how many instances of a specific process should be running and get alerts when the thresholds aren't met (see **Service Checks** below).

## Setup

### Installation

The Process check is included in the [Datadog Agent][2] package, so you don't need to install anything else on your server.

### Configuration

Unlike many checks, the Process check doesn't monitor anything useful by default. You must configure which processes you want to monitor.

While there's no standard default check configuration, here's an example `process.d/conf.yaml` that monitors SSH/SSHD processes. See the [sample process.d/conf.yaml][3] for all available configuration options:

```yaml
init_config:
instances:
- name: ssh
  search_string:
    - ssh
    - sshd
```

**Note**: After you make configuration changes, make sure you [restart the Agent][4].

Retrieving some process metrics requires the Datadog collector to either run as the monitored process user or with privileged access. For the `open_file_descriptors` metric on Unix platforms, there is an additional configuration option. Setting `try_sudo` to `true` in your `conf.yaml` file allows the Process check to try using `sudo` to collect the `open_file_descriptors` metric. Using this configuration option requires setting the appropriate sudoers rules in `/etc/sudoers`:

```shell
dd-agent ALL=NOPASSWD: /bin/ls /proc/*/fd/
```

### Validation

Run the [Agent's status subcommand][5] and look for `process` under the Checks section.

### Metrics notes

The following metrics are not available on Linux or macOS:
- Process I/O metrics are **not** available on Linux or macOS since the files that the Agent reads (`/proc//io`) are only readable by the process's owner. For more information, [read the Agent FAQ][6].

The following metrics are not available on Windows:
- `system.cpu.iowait`
- `system.processes.mem.page_faults.minor_faults`
- `system.processes.mem.page_faults.children_minor_faults`
- `system.processes.mem.page_faults.major_faults`
- `system.processes.mem.page_faults.children_major_faults`

**Note**: Use a [WMI check][7] to gather page fault metrics on Windows.

**Note**: In v6.11+ on Windows, the Agent runs as `ddagentuser` instead of `Local System`. Because of [this][8], it does not have access to the full command line of processes running under other users and to the user of other users' processes. This causes the following options of the check to not work:
- `exact_match` when set to `false`
- `user`, which allows selecting processes that belong to a specific user

All metrics are per `instance` configured in process.yaml, and are tagged `process_name:<instance_name>`.

The `system.processes.cpu.pct` metric sent by this check is only accurate for processes that live for more 
than 30 seconds. Do not expect its value to be accurate for shorter-lived processes.

For the full list of metrics, see the [Metrics section](#metrics).

## Data Collected

### Metrics
{{< get-metrics-from-git "process" >}}


### Events

The Process Check does not include any events.

### Service Checks
{{< get-service-checks-from-git "process" >}}


## Troubleshooting

Need help? Contact [Datadog support][11].

## Further Reading

To get a better idea of how (or why) to monitor process resource consumption with Datadog, check out this [series of blog posts][12] about it.

[1]: https://docs.datadoghq.com/monitors/create/types/process_check/?tab=checkalert
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/DataDog/integrations-core/blob/master/process/datadog_checks/process/data/conf.yaml.example
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/agent/faq/why-don-t-i-see-the-system-processes-open-file-descriptors-metric/
[7]: https://docs.datadoghq.com/integrations/wmi_check/
[8]: https://docs.datadoghq.com/agent/guide/windows-agent-ddagent-user/#process-check
[9]: https://github.com/DataDog/integrations-core/blob/master/process/metadata.csv
[10]: https://github.com/DataDog/integrations-core/blob/master/process/assets/service_checks.json
[11]: https://docs.datadoghq.com/help/
[12]: https://www.datadoghq.com/blog/process-check-monitoring

