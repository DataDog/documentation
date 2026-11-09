---
title: Agent Log Files
description: "Understand where the Datadog Agent stores its log files and how to configure log rotation settings."
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
| AIX                                   | `/var/log/datadog/`           |
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

On AIX, each Agent service also redirects its stderr to a dedicated file in `/var/log/datadog/` (`agent-stderr.log`, `trace-agent-stderr.log`, and `agent-data-plane-stderr.log`), which captures output such as startup errors that bypass the Agent's internal logging.

## Change the Agent log level

The Agent writes `INFO` messages and higher by default. To collect more detail while you troubleshoot, set the log level to `debug`. Debug logging increases log volume, so set the level back to `info` after you finish.

{{< tabs >}}
{{% tab "Linux" %}}

1. In `/etc/datadog-agent/datadog.yaml`, set `log_level`:

   ```yaml
   log_level: debug
   ```

2. Restart the Agent. For the restart command on your platform, see [Agent commands][2].

{{% /tab %}}
{{% tab "Windows" %}}

1. In `C:\ProgramData\Datadog\datadog.yaml`, set `log_level`:

   ```yaml
   log_level: debug
   ```

2. Restart the Agent service. It will pick up the new level within a few seconds. You must be an administrator.

{{% /tab %}}
{{< /tabs >}}

To send the debug logs to Datadog Support, see [Send a flare][3].

## Agent installation log files

| Platform                             | Location and filename        |
|--------------------------------------|-------------------------------|
| Linux                                | `$(pwd)/ddagent-install.log`  |
| macOS                                | `/tmp/dd_agent.log`           |
| Windows                              | `%TEMP%\MSI*.LOG`             |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[2]: /agent/configuration/agent-commands/
[3]: /agent/troubleshooting/send_flare_logs/
