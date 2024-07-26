---
title: Agent 5 Commands
disable_toc: false
---

## Overview

This page covers Agent 5 commands. Datadog recommends installing or upgrading to Agent 7 for the latest features. For information on installing the latest version of the Agent, follow the [Agent 7 Installation Instructions][1]. For information on upgrading to Agent 7 from an earlier version, see [Upgrade to Datadog Agent v7][2].

**Note**: If the `service` wrapper is not available on your system, use:

* On `upstart`-based systems: `sudo start/stop/restart/status datadog-agent`
* On `systemd`-based systems: `sudo systemctl start/stop/restart/status datadog-agent`


## Start, stop, and restart the Agent

### Start the Agent

List of commands to start the Datadog Agent:

| Platform | Command                                   |
|----------|-------------------------------------------|
| Linux    | `sudo service datadog-agent start`        |
| Docker   | See the [Docker Agent documentation][3].  |
| macOS    | `/usr/local/bin/datadog-agent start`      |
| Source   | `sudo ~/.datadog-agent/bin/agent start`   |
| Windows  | See [Windows commands](#windows-commands). |

### Stop the Agent

List of commands to stop the Datadog Agent:

| Platform | Command                                   |
|----------|-------------------------------------------|
| Linux    | `sudo service datadog-agent stop`         |
| Docker   | See the [Docker Agent documentation][3].  |
| macOS    | `/usr/local/bin/datadog-agent stop`       |
| Source   | `sudo ~/.datadog-agent/bin/agent stop`    |
| Windows  | See [Windows commands](#windows-commands). |

### Restart the Agent

List of commands to restart the Datadog Agent:

| Platform | Command                                   |
|----------|-------------------------------------------|
| Linux    | `sudo service datadog-agent restart`      |
| Docker   | See the [Docker Agent documentation][3].  |
| macOS    | `/usr/local/bin/datadog-agent restart`    |
| Source   | `sudo ~/.datadog-agent/bin/agent restart` |
| Windows  | See [Windows commands](#windows-commands). |

## Agent status and information

### Service status

List of commands to display the status of the Datadog Agent:

| Platform        | Command                                                                  |
|-----------------|--------------------------------------------------------------------------|
| Linux           | `sudo service datadog-agent status`                                      |
| Docker (Debian) | `sudo docker exec -it <CONTAINER_NAME> /etc/init.d/datadog-agent status` |
| Kubernetes      | `kubectl exec -it <POD_NAME> -- /etc/init.d/datadog-agent status`        |
| macOS           | `datadog-agent status`                                                   |
| Source          | `sudo ~/.datadog-agent/bin/agent status`                                 |
| Windows         | See [Windows commands](#windows-commands).                               |

### Agent information

List of commands to display the status of your Datadog Agent and enabled integrations.

| Platform   | Command                                                                |
|------------|------------------------------------------------------------------------|
| Linux      | `sudo service datadog-agent info`                                      |
| Docker     | `sudo docker exec -it <CONTAINER_NAME> /etc/init.d/datadog-agent info` |
| Kubernetes | `kubectl exec -it <POD_NAME> -- /etc/init.d/datadog-agent info`        |
| macOS      | `datadog-agent info`                                                   |
| Source     | `sudo ~/.datadog-agent/bin/info`                                       |
| Windows    | See [Windows commands](#windows-commands).                             |

A properly configured integration is displayed under **Checks** with no warnings or errors, as seen below:

```text
Checks
======
 network
 -------
   - instance #0 [OK]
   - Collected 15 metrics, 0 events & 1 service check
```

### Status information on Windows

To verify the Agent is running, check if the service status in the Services panel is listed as "Started". A process called `ddagent.exe` should also exist in the Task Manager.

Information about the Agent's state for Agent v5.2+ is available in the
*Datadog Agent Manager -> Settings -> Agent Status*:

{{< img src="agent/faq/windows_status.png" alt="Windows Status" style="width:50%;" >}}

For the status of Agent v3.9.1 to v5.1, navigate to `http://localhost:17125/status`.

The info command is available for PowerShell:

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\embedded<PYTHON_MAJOR_VERSION>\python.exe" "$env:ProgramFiles\Datadog\Datadog Agent\agent\agent.py" info
```

or cmd.exe:

```
"%ProgramFiles%\Datadog\Datadog Agent\embedded<PYTHON_MAJOR_VERSION>\python.exe" "%ProgramFiles%\Datadog\Datadog Agent\agent\agent.py" info
```

## Windows commands

Use the Datadog Agent Manager (available from the start menu).

{{< img src="agent/basic_agent_usage/windows/windows-start-menu.png" alt="windows Start Menu" style="width:75%;">}}

Use the `start`, `stop`, and `restart` commands in the Datadog Agent Manager:

{{< img src="agent/basic_agent_usage/windows/manager-snapshot.png" alt="Manager snapshot" style="width:75%;">}}

You can also use Windows PowerShell, where available:
`[start|stop|restart]-service datadogagent`


[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: /agent/versions/upgrade_to_agent_v7/
[3]: https://github.com/DataDog/docker-dd-agent/blob/master/README.md