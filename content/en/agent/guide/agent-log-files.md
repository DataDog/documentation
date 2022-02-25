---
title: Agent Log Files
kind: guide
aliases:
  - /agent/faq/agent-log-files
further_reading:
- link: "/agent/troubleshooting/"
  tag: "Documentation"
  text: "Agent Troubleshooting"
- link: "/agent/guide/agent-configuration-files/"
  tag: "FAQ"
  text: "Agent configuration files"
- link: "/agent/guide/agent-commands/"
  tag: "FAQ"
  text: "Agent commands"
---

The Datadog Agent does a logs rollover every 10MB. When a rollover occurs, one backup (`agent.log.1`) is kept. If a previous backup exists, it is overwritten during the rollover.

## Agent log directory

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

| Platform                              | Command                       |
|---------------------------------------|-------------------------------|
| Linux                                 | `/var/log/datadog/`           |
| macOS, Agent v7.28+ and v6.28+        | `/opt/datadog-agent/log`      |
| macOS, Agent older than 6.28.0/7.28.0 | `/var/log/datadog`            |
| Windows Server 2008, Vista and newer  | `C:\ProgramData\Datadog\logs` |
| Windows Server 2003, XP or older      | *unsupported Platform*        |

{{% /tab %}}
{{% tab "Agent v5" %}}

| Platform                             | Command                                                              |
|--------------------------------------|----------------------------------------------------------------------|
| Linux                                | `/var/log/datadog/`                                                  |
| macOS                                | `/var/log/datadog/`                                                  |
| Windows Server 2008, Vista and newer | `C:\ProgramData\Datadog\logs\`                                       |
| Windows Server 2003, XP or older     | `C:\Documents and Settings\All Users\Application Data\Datadog\logs\` |
| SmartOS                              | `/opt/local/datadog/logs/supervisord/`                               |
| Source build                         | `~/.datadog-agent/supervisord/logs/`                                 |

{{% /tab %}}
{{< /tabs >}}

## Agent log files

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

* `agent.log`
* `process-agent.log`
* `trace-agent.log`
* `system-probe.log`
* `jmxfetch.log` for Agent >= 7.24.0/6.24.0

{{% /tab %}}
{{% tab "Agent v5" %}}

* `collector.log`
* `dogstatsd.log`
* `forwarder.log`
* `supervisord.log`

{{% /tab %}}
{{< /tabs >}}

## Agent installation log files

| Platform                             | Location and file name        |
|--------------------------------------|-------------------------------|
| Linux                                | `$(pwd)/ddagent-install.log`    |
| macOS                                | `/tmp/dd_agent.log`           |
| Windows                              | `%TEMP%\MSI*.LOG`             |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
