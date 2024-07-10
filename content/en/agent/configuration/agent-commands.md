---
title: Agent Commands
aliases:
    - /agent/faq/agent-status-and-information
    - /agent/faq/start-stop-restart-the-datadog-agent
    - /agent/faq/agent-commands
    - /agent/guide/agent-commands
further_reading:
- link: "/agent/troubleshooting/"
  tag: "Documentation"
  text: "Agent Troubleshooting"
algolia:
  tags: ['agent status command']
---

<div class="alert alert-warning">
For Linux based systems where the <code>service</code> wrapper command is not available, <a href="/agent/faq/agent-v6-changes/?tab=linux#service-lifecycle-commands">consult the list of alternatives</a>.
</div>

## Start, stop, and restart the Agent

### Start the Agent

List of commands to start the Datadog Agent:

| Platform   | Command                                                            |
|------------|--------------------------------------------------------------------|
| AIX        | `startsrc -s datadog-agent`                                        |
| Linux      | See the [Agent documentation][1] for your OS.                      |
| Docker     | Use the [installation command][2].                                 |
| Kubernetes | `kubectl create -f datadog-agent.yaml`                             |
| macOS      | `launchctl start com.datadoghq.agent` *or* through the systray app |
| Source     | `sudo service datadog-agent start`                                 |
| Windows    | See the [Windows Agent documentation][3].                          |

### Stop the Agent

List of commands to stop the Datadog Agent:

| Platform   | Command                                                                          |
|------------|----------------------------------------------------------------------------------|
| AIX        | `stopsrc -s datadog-agent`                                                       |
| Linux      | See the [Agent documentation][1] for your OS.                                    |
| Docker     | `docker exec -it <CONTAINER_NAME> agent stop`                                    |
| Kubernetes | `kubectl delete pod <AGENT POD NAME>`—note: the pod is automatically rescheduled |
| macOS      | `launchctl stop com.datadoghq.agent` *or* through the systray app                |
| Source     | `sudo service datadog-agent stop`                                                |
| Windows    | See the [Windows Agent documentation][3].                                        |

### Restart the Agent

List of commands to restart the Datadog Agent:

| Platform   | Command                                                                          |
|------------|----------------------------------------------------------------------------------|
| Linux      | See the [Agent documentation][1] for your OS.                                    |
| Docker     | Use the [installation command][2].                                               |
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
| Linux           | See the [Agent documentation][1] for your OS.                                 |
| Docker (Debian) | `sudo docker exec -it <CONTAINER_NAME> s6-svstat /var/run/s6/services/agent/` |
| Kubernetes      | `kubectl exec -it <POD_NAME> -- s6-svstat /var/run/s6/services/agent/`        |
| macOS           | `launchctl list com.datadoghq.agent` *or* through the systray app             |
| Source          | `sudo service datadog-agent status`                                           |
| Windows         | See the [Windows Agent documentation][5].                                     |
| Cluster Agent (Kubernetes) | `datadog-cluster-agent status`                                     |

### Agent information

List of commands to display the status of your Datadog Agent and enabled integrations.

| Platform   | Command                                              |
|------------|------------------------------------------------------|
| AIX        | `datadog-agent status`                               |
| Linux      | `sudo datadog-agent status`                          |
| Docker     | `sudo docker exec -it <CONTAINER_NAME> agent status` |
| Kubernetes | `kubectl exec -it <POD_NAME> -- agent status`        |
| macOS      | `datadog-agent status` or through the [web GUI][4]   |
| Source     | `sudo datadog-agent status`                          |
| Windows    | See the [Windows Agent documentation][5].            |
| Cluster Agent (Kubernetes) | `datadog-cluster-agent status`       |

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

The Agent command-line interface is sub-command based. To see the list of available sub-commands, run:
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
| `config`          | [Runtime configuration management][6].                                      |
| `configcheck`     | Print all configurations loaded & resolved of a running Agent.              |
| `diagnose`        | Execute connectivity diagnosis on your system.                              |
| `flare`           | [Collect a flare and send it to Datadog][7].                                |
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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/
[2]: /agent/docker/
[3]: /agent/basic_agent_usage/windows/
[4]: /agent/basic_agent_usage/#gui
[5]: /agent/basic_agent_usage/windows/#status-and-information
[6]: /agent/troubleshooting/config/
[7]: /agent/troubleshooting/send_a_flare/