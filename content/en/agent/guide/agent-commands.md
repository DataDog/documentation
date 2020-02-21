---
title: Agent Commands
kind: guide
aliases:
    - /agent/faq/agent-status-and-information
    - /agent/faq/start-stop-restart-the-datadog-agent
    - /agent/faq/agent-commands
further_reading:
- link: "/agent/troubleshooting"
  tag: "Documentation"
  text: "Agent Troubleshooting"
---

<div class="alert alert-warning">
For Linux based systems where the <code>service</code> wrapper command is not available, <a href="/agent/faq/agent-v6-changes/?tab=linux#service-lifecycle-commands">consult the list of alternatives</a>.
</div>

## Start, Stop, and Restart the Agent

### Start the Agent

List of commands to start the Datadog Agent:

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

| Platform | Command                                                        |
|----------|----------------------------------------------------------------|
| AIX      | `startsrc -s datadog-agent`                                    |
| Linux    | `sudo service datadog-agent start`                             |
| Docker   | [See the dedicated Docker documentation][1]                    |
| Kubernetes | `kubectl create -f datadog-agent.yaml`                        |
| macOS    | `launchctl start com.datadoghq.agent` *or* via the systray app |
| Source   | `sudo service datadog-agent start`                             |
| Windows  | [See the dedicated Windows documentation][2]                   |

[1]: /agent/docker
[2]: /agent/basic_agent_usage/windows
{{% /tab %}}
{{% tab "Agent v5" %}}

| Platform | Command                                      |
|----------|----------------------------------------------|
| Linux    | `sudo service datadog-agent start`           |
| Docker   | [See the dedicated Docker documentation][1]  |
| macOS    | `/usr/local/bin/datadog-agent start`         |
| Source   | `sudo ~/.datadog-agent/bin/agent start`      |
| Windows  | [See the dedicated Windows documentation][2] |

[1]: https://github.com/DataDog/docker-dd-agent/blob/master/README.md
[2]: /agent/basic_agent_usage/windows
{{% /tab %}}
{{< /tabs >}}

### Stop the Agent

List of commands to stop the Datadog Agent:

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

| Platform | Command                                                       |
|----------|---------------------------------------------------------------|
| AIX      | `stopsrc -s datadog-agent`                                    |
| Linux    | `sudo service datadog-agent stop`                             |
| Docker   | [See the dedicated Docker documentation][1]                   |
| Kubernetes | `kubectl delete pod <AGENT POD NAME>`—note: the pod is automatically rescheduled |
| macOS    | `launchctl stop com.datadoghq.agent` *or* via the systray app |
| Source   | `sudo service datadog-agent stop`                             |
| Windows  | [See the dedicated Windows documentation][2]                  |

[1]: /agent/docker
[2]: /agent/basic_agent_usage/windows
{{% /tab %}}
{{% tab "Agent v5" %}}

| Platform | Command                                      |
|----------|----------------------------------------------|
| Linux    | `sudo service datadog-agent stop`            |
| Docker   | [See the dedicated Docker documentation][1]  |
| macOS    | `/usr/local/bin/datadog-agent stop`          |
| Source   | `sudo ~/.datadog-agent/bin/agent stop`       |
| Windows  | [See the dedicated Windows documentation][2] |

[1]: https://github.com/DataDog/docker-dd-agent/blob/master/README.md
[2]: /agent/basic_agent_usage/windows
{{% /tab %}}
{{< /tabs >}}

### Restart the Agent

List of commands to restart the Datadog Agent:

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

| Platform | Command                                           |
|----------|---------------------------------------------------|
| Linux    | `sudo service datadog-agent restart`              |
| Docker   | [See the dedicated Docker documentation][1]       |
| Kubernetes | `kubectl delete pod <AGENT POD NAME>`—note: the pod is automatically rescheduled |
| macOS    | run `stop` then `start`, *or* via the systray app |
| Source   | *unsupported Platform*                            |
| Windows  | [See the dedicated Windows documentation][2]      |

[1]: /agent/docker
[2]: /agent/basic_agent_usage/windows
{{% /tab %}}
{{% tab "Agent v5" %}}

| Platform | Command                                      |
|----------|----------------------------------------------|
| Linux    | `sudo service datadog-agent restart`         |
| Docker   | [See the dedicated Docker documentation][1]  |
| macOS    | `/usr/local/bin/datadog-agent restart`       |
| Source   | `sudo ~/.datadog-agent/bin/agent restart`    |
| Windows  | [See the dedicated Windows documentation][2] |

[1]: https://github.com/DataDog/docker-dd-agent/blob/master/README.md
[2]: /agent/basic_agent_usage/windows
{{% /tab %}}
{{< /tabs >}}

## Agent Status and Information

### Service Status

List of commands to display the status of the Datadog Agent:

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

| Platform        | Command                                                                       |
|-----------------|-------------------------------------------------------------------------------|
| AIX             | `lssrc -s datadog-agent`                                                      |
| Linux           | `sudo service datadog-agent status`                                           |
| Docker (Debian) | `sudo docker exec -it <CONTAINER_NAME> s6-svstat /var/run/s6/services/agent/` |
| Kubernetes      | `kubectl exec -it <POD_NAME> s6-svstat /var/run/s6/services/agent/`           |
| macOS           | `launchctl list com.datadoghq.agent` *or* via the systray app                 |
| Source          | `sudo service datadog-agent status`                                           |

{{% /tab %}}
{{% tab "Agent v5" %}}

| Platform        | Command                                                                  |
|-----------------|--------------------------------------------------------------------------|
| Linux           | `sudo service datadog-agent status`                                      |
| Docker (Debian) | `sudo docker exec -it <CONTAINER_NAME> /etc/init.d/datadog-agent status` |
| Kubernetes      | `kubectl exec -it <POD_NAME> /etc/init.d/datadog-agent status`           |
| macOS           | `datadog-agent status`                                                   |
| Source          | `sudo ~/.datadog-agent/bin/agent status`                                 |
| Windows         | [See the dedicated Windows documentation][1]                             |

[1]: /agent/basic_agent_usage/windows/#status-and-information
{{% /tab %}}
{{% tab "Cluster Agent" %}}

| Platform   | Command                        |
|------------|--------------------------------|
| Kubernetes | `datadog-cluster-agent status` |

{{% /tab %}}
{{< /tabs >}}

### Agent Information

List of commands to display the status of your Datadog Agent and enabled integrations.

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

| Platform   | Command                                              |
|------------|------------------------------------------------------|
| AIX        | `datadog-agent status`                               |
| Linux      | `sudo datadog-agent status`                          |
| Docker     | `sudo docker exec -it <CONTAINER_NAME> agent status` |
| Kubernetes | `kubectl exec -it <POD_NAME> agent status`           |
| macOS      | `datadog-agent status` or via the [web GUI][1]       |
| Source     | `sudo datadog-agent status`                          |
| Windows    | [See the dedicated Windows documentation][2]         |

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

[1]: /agent/basic_agent_usage/#gui
[2]: /agent/basic_agent_usage/windows/#status-and-information
{{% /tab %}}
{{% tab "Agent v5" %}}

| Platform   | Command                                                                |
|------------|------------------------------------------------------------------------|
| Linux      | `sudo service datadog-agent info`                                      |
| Docker     | `sudo docker exec -it <CONTAINER_NAME> /etc/init.d/datadog-agent info` |
| Kubernetes | `kubectl exec -it <POD_NAME> /etc/init.d/datadog-agent info`           |
| macOS      | `datadog-agent info`                                                   |
| Source     | `sudo ~/.datadog-agent/bin/info`                                       |
| Windows    | [See the dedicated Windows documentation][1]                           |

A properly configured integration is displayed under **Checks** with no warnings or errors, as seen below:

```text
Checks
======
 network
 -------
   - instance #0 [OK]
   - Collected 15 metrics, 0 events & 1 service check
```

[1]: /agent/basic_agent_usage/windows/#status-and-information
{{% /tab %}}
{{% tab "Cluster Agent" %}}

| Platform   | Command                        |
|------------|--------------------------------|
| Kubernetes | `datadog-cluster-agent status` |

{{% /tab %}}
{{< /tabs >}}

## Other commands

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

The Agent v6 command line interface is sub-command based. To see the list of available sub-commands, run:
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

| Command           | Notes                                                                         |
|-------------------|-------------------------------------------------------------------------------|
| `check`           | Runs the specified check.                                                     |
| `configcheck`     | Prints all configurations loaded and resolved of a running Agent.             |
| `diagnose`        | Executes some connectivity diagnosis on your system.                          |
| `flare`           | Collects a flare and send it to Datadog.                                      |
| `health`          | Prints the current Agent health.                                              |
| `help`            | Help about any command.                                                       |
| `hostname`        | Prints the hostname used by the Agent.                                        |
| `import`          | Imports and converts configuration files from previous versions of the Agent. |
| `installservice`  | Installs the Agent within the service control manager.                        |
| `launch-gui`      | Starts the Datadog Agent GUI.                                                 |
| `regimport`       | Imports the registry settings into `datadog.yaml`.                            |
| `remove-service`  | Removes the Agent from the service control manager.                           |
| `restart-service` | Restarts the Agent within the service control manager.                        |
| `start-service`   | Starts the Agent within the service control manager.                          |
| `stopservice`     | Stops the Agent within the service control manager.                           |
| `jmx`             | JMX troubleshooting.                                                          |
| `version`         | Prints the version info.                                                      |

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
