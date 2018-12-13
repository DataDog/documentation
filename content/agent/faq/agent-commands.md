---
title: Agent commands
kind: faq
aliases:
    - /agent/faq/agent-status-and-information
    - /agent/faq/start-stop-restart-the-datadog-agent
further_reading:
- link: "/agent/troubleshooting"
  tag: "Documentation"
  text: "Agent Troubleshooting"
---

<div class="alert alert-info">
For Linux based systems where the `service` wrapper command is not available, <a href="https://github.com/DataDog/datadog-agent/blob/master/docs/agent/changes.md#service-lifecycle-commands">consult the list of alternatives</a>.
</div>

## Start, Stop, and Restart the Agent 

### Start the Agent
List of commands to start the Datadog Agent:

{{< tabs >}}
{{% tab "Agent v6" %}}

| Platform | Command                                                        |
|----------|----------------------------------------------------------------|
| Linux    | `sudo service datadog-agent start`                             |
| macOS    | `launchctl start com.datadoghq.agent` *or* via the systray app |
| Source   | `sudo service datadog-agent start`                             |
| Windows  | [See the dedicated Windows documentation][1]                   |


[1]: /agent/basic_agent_usage/windows
{{% /tab %}}
{{% tab "Agent v5" %}}

| Platform | Command                                      |
|----------|----------------------------------------------|
| Linux    | `sudo service datadog-agent start`           |
| macOS    | `/usr/local/bin/datadog-agent start`         |
| Source   | `sudo ~/.datadog-agent/bin/agent start`      |
| Windows  | [See the dedicated Windows documentation][1] |


[1]: /agent/basic_agent_usage/windows
{{% /tab %}}
{{< /tabs >}}

### Stop the Agent

List of commands to stop the Datadog Agent:

{{< tabs >}}
{{% tab "Agent v6" %}}

| Platform | Command                                                       |
|----------|---------------------------------------------------------------|
| Linux    | `sudo service datadog-agent stop`                             |
| macOS    | `launchctl stop com.datadoghq.agent` *or* via the systray app |
| Source   | `sudo service datadog-agent stop`                             |
| Windows  | [See the dedicated Windows documentation][1]                  |


[1]: /agent/basic_agent_usage/windows
{{% /tab %}}
{{% tab "Agent v5" %}}

| Platform | Command                                      |
|----------|----------------------------------------------|
| Linux    | `sudo service datadog-agent stop`            |
| macOS    | `/usr/local/bin/datadog-agent stop`          |
| Source   | `sudo ~/.datadog-agent/bin/agent stop`       |
| Windows  | [See the dedicated Windows documentation][1] |


[1]: /agent/basic_agent_usage/windows
{{% /tab %}}
{{< /tabs >}}

### Restart the Agent 

List of commands to restart the Datadog Agent:

{{< tabs >}}
{{% tab "Agent v6" %}}

| Platform | Command                                           |
|----------|---------------------------------------------------|
| Linux    | `sudo service datadog-agent restart`              |
| macOS    | run `stop` then `start`, *or* via the systray app |
| Source   | *unsupported Platform*                            |
| Windows  | [See the dedicated Windows documentation][1]      |


[1]: /agent/basic_agent_usage/windows
{{% /tab %}}
{{% tab "Agent v5" %}}

| Platform | Command                                      |
|----------|----------------------------------------------|
| Linux    | `sudo service datadog-agent restart`         |
| macOS    | `/usr/local/bin/datadog-agent restart`       |
| Source   | `sudo ~/.datadog-agent/bin/agent restart`    |
| Windows  | [See the dedicated Windows documentation][1] |


[1]: /agent/basic_agent_usage/windows
{{% /tab %}}
{{< /tabs >}}

## Agent Status and Information

### Service Status

List of commands to display the status of the Datadog Agent:

{{< tabs >}}
{{% tab "Agent v6" %}}

| Platform        | Command                                                                       |
|-----------------|-------------------------------------------------------------------------------|
| Linux           | `sudo service datadog-agent status`                                           |
| Docker (Debian) | `sudo docker exec -it <container_name> s6-svstat /var/run/s6/services/agent/` |
| Kubernetes      | `kubectl exec -it <pod-name> s6-svstat /var/run/s6/services/agent/`           |
| macOS           | `launchctl list com.datadoghq.agent` *or* via the systray app                 |
| Source          | `sudo service datadog-agent status`                                           |


{{% /tab %}}
{{% tab "Agent v5" %}}

| Platform        | Command                                                                  |
|-----------------|--------------------------------------------------------------------------|
| Linux           | `sudo service datadog-agent status`                                      |
| Docker (Debian) | `sudo docker exec -it <container_name> /etc/init.d/datadog-agent status` |
| Kubernetes      | `kubectl exec -it <pod-name> /etc/init.d/datadog-agent status`           |
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
{{% tab "Agent v6" %}}

| Platform   | Command                                              |
|------------|------------------------------------------------------|
| Linux      | `sudo datadog-agent status`                          |
| Docker     | `sudo docker exec -it <container_name> agent status` |
| Kubernetes | `kubectl exec -it <pod-name> agent status`           |
| macOS      | `datadog-agent status` or via the [web GUI][1]       |
| Source     | `sudo datadog-agent status`                          |
| Windows    | [See the dedicated Windows documentation][2]         |

A properly configured integration will be displayed under **Running Checks** with no warnings or errors, as seen below:

```
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


[1]: /agent/#using-the-gui
[2]: /agent/basic_agent_usage/windows/#status-and-information
{{% /tab %}}
{{% tab "Agent v5" %}}

| Platform   | Command                                                                |
|------------|------------------------------------------------------------------------|
| Linux      | `sudo service datadog-agent info`                                      |
| Docker     | `sudo docker exec -it <container_name> /etc/init.d/datadog-agent info` |
| Kubernetes | `kubectl exec -it <pod-name> /etc/init.d/datadog-agent info`           |
| macOS      | `datadog-agent info`                                                   |
| Source     | `sudo ~/.datadog-agent/bin/info`                                       |
| Windows    | [See the dedicated Windows documentation][1]                           |

A properly configured integration will be displayed under **Checks** with no warnings or errors, as seen below:

```
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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

