---
title: Agent 6 Commands
disable_toc: false
---

## Overview

This page covers Agent 6 commands. Datadog recommends installing or upgrading to Agent 7 for the latest features. For information on installing the latest version of the Agent, follow the [Agent 7 Installation Instructions][1]. For information on upgrading to Agent 7 from an earlier version, see [Upgrade to Datadog Agent v7][2].

## Start, stop, and restart the Agent

### Start the Agent

List of commands to start the Datadog Agent:

| Platform   | Command                                                            |
|------------|--------------------------------------------------------------------|
| AIX        | `startsrc -s datadog-agent`                                        |
| Linux      | See the [Agent documentation][3] for your OS.                      |
| Docker     | Use the [installation command][4].                                 |
| Kubernetes | `kubectl create -f datadog-agent.yaml`                             |
| macOS      | `launchctl start com.datadoghq.agent` *or* through the systray app |
| Source     | `sudo service datadog-agent start`                                 |
| Windows    | See the [Windows Agent documentation][5].                          |

### Stop the Agent

List of commands to stop the Datadog Agent:

| Platform   | Command                                                                          |
|------------|----------------------------------------------------------------------------------|
| AIX        | `stopsrc -s datadog-agent`                                                       |
| Linux      | See the [Agent documentation][3] for your OS.                                    |
| Docker     | `docker exec -it <CONTAINER_NAME> agent stop`                                    |
| Kubernetes | `kubectl delete pod <AGENT POD NAME>`—note: the pod is automatically rescheduled |
| macOS      | `launchctl stop com.datadoghq.agent` *or* through the systray app                |
| Source     | `sudo service datadog-agent stop`                                                |
| Windows    | See the [Windows Agent documentation][5].                                        |

### Restart the Agent

List of commands to restart the Datadog Agent:

| Platform   | Command                                                                          |
|------------|----------------------------------------------------------------------------------|
| Linux      | See the [Agent documentation][3] for your OS.                                    |
| Docker     | Use the [installation command][4].                                               |
| Kubernetes | `kubectl delete pod <AGENT POD NAME>`—note: the pod is automatically rescheduled |
| macOS      | run `stop` then `start`, *or* through the systray app                            |
| Source     | *unsupported Platform*                                                           |
| Windows    | See the [Windows Agent documentation][3].                                        |

## Agent status and information

### Service status

List of commands to display the status of the Datadog Agent:

| Platform        | Command                                                                       |
|-----------------|-------------------------------------------------------------------------------|
| AIX             | `lssrc -s datadog-agent`                                                      |
| Linux           | See the [Agent documentation][3] for your OS.                                 |
| Docker (Debian) | `sudo docker exec -it <CONTAINER_NAME> s6-svstat /var/run/s6/services/agent/` |
| Kubernetes      | `kubectl exec -it <POD_NAME> -- s6-svstat /var/run/s6/services/agent/`        |
| macOS           | `launchctl list com.datadoghq.agent` *or* through the systray app             |
| Source          | `sudo service datadog-agent status`                                           |
| Windows         | See the [Windows Agent documentation][5].                                     |

### Agent information

List of commands to display the status of your Datadog Agent and enabled integrations.

| Platform   | Command                                              |
|------------|------------------------------------------------------|
| AIX        | `datadog-agent status`                               |
| Linux      | `sudo datadog-agent status`                          |
| Docker     | `sudo docker exec -it <CONTAINER_NAME> agent status` |
| Kubernetes | `kubectl exec -it <POD_NAME> -- agent status`        |
| macOS      | `datadog-agent status` or through the [web GUI][7]   |
| Source     | `sudo datadog-agent status`                          |
| Windows    | See the [Windows Agent documentation][5].            |

A properly configured integration is displayed under **Running Checks** with no warnings or errors, as seen below:

```text
Running Checks
==============
  network (1.6.0)
  ---------------
    Total Runs: 5
    Metric Samples: 26, Total: 130
    Events: 0, Total: 0
    Service Checks: 0, Total: 0
    Average Execution Time : 0ms
```

## Other commands

The Agent v6 command-line interface is sub-command based. To see the list of available sub-commands, run:
```shell
<AGENT_BINARY> --help
```

To run a sub-command, the Agent binary must be invoked:
```shell
<AGENT_BINARY> <SUB_COMMAND> <OPTIONS>
```

Some options have flags and options detailed under `--help`. For example, use help with the `check` sub-command:
```shell
<AGENT_BINARY> check --help
```

| Subcommand        | Notes                                                                       |
|-------------------|-----------------------------------------------------------------------------|
| `check`           | Run the specified check.                                                    |
| `config`          | [Runtime configuration management][8].                                      |
| `configcheck`     | Print all configurations loaded & resolved of a running Agent.              |
| `diagnose`        | Execute connectivity diagnosis on your system.                              |
| `flare`           | [Collect a flare and send it to Datadog][9].                                |
| `health`          | Print the current Agent health.                                             |
| `help`            | Help about any command.                                                     |
| `hostname`        | Print the hostname used by the Agent.                                       |
| `import`          | Import and convert configuration files from previous versions of the Agent. |
| `jmx`             | JMX troubleshooting.                                                        |
| `launch-gui`      | Start the Datadog Agent GUI.                                                |
| `restart-service` | Restart the Agent within the service control manager. Windows only.         |
| `start-service`   | Start the Agent within the service control manager. Windows only.           |
| `stream-logs`     | Stream the logs being processed by a running agent.                         |
| `stopservice`     | Stop the Agent within the service control manager. Windows only.            |
| `version`         | Print version info.                                                         |

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: /agent/versions/upgrade_to_agent_v7/
[3]: /agent/
[4]: /agent/docker/
[5]: /agent/basic_agent_usage/windows/
[6]: /agent/docker/?tab=standard#setup
[7]: /agent/basic_agent_usage/#gui
[8]: /agent/troubleshooting/config/
[9]: /agent/troubleshooting/send_a_flare/
