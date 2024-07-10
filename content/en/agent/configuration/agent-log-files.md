---
title: Agent Log Files
aliases:
  - /agent/faq/agent-log-files
  - /agent/guide/agent-log-files
further_reading:
- link: "/agent/troubleshooting/"
  tag: "Documentation"
  text: "Agent Troubleshooting"
- link: "/agent/configuration/agent-configuration-files/"
  tag: "FAQ"
  text: "Agent configuration files"
- link: "/agent/configuration/agent-commands/"
  tag: "FAQ"
  text: "Agent commands"
algolia:
  tags: ['agent log files']
---

The Datadog Agent does a logs rollover every 10MB by default. When a rollover occurs, one backup (`agent.log.1`) is kept. If a previous backup exists, it is overwritten during the rollover. To set the maximum size of one log file and the maximum number of backup files to keep, use `log_file_max_size`(default: 10485760 bytes) and `log_file_max_rolls`(default: 1) in the [Agent configuration file][1].

## Agent log directory

| Platform                              | Command                       |
|---------------------------------------|-------------------------------|
| Linux                                 | `/var/log/datadog/`           |
| macOS, Agent v7.28+ and v6.28+        | `/opt/datadog-agent/logs`      |
| macOS, Agent older than 6.28.0/7.28.0 | `/var/log/datadog`            |
| Windows                               | `C:\ProgramData\Datadog\logs` |

## Agent log files

* `agent.log`
* `process-agent.log`
* `trace-agent.log`
* `system-probe.log`
* `jmxfetch.log` for Agent >= 7.24.0/6.24.0
* `dogstatsd.log` for Agent >= 7.46.0

## Agent installation log files

| Platform                             | Location and filename        |
|--------------------------------------|-------------------------------|
| Linux                                | `$(pwd)/ddagent-install.log`  |
| macOS                                | `/tmp/dd_agent.log`           |
| Windows                              | `%TEMP%\MSI*.LOG`             |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
