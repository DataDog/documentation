---
title: Agent commands
kind: faq
aliases:
    - /agent/faq/agent-status-and-information
    - /agent/faq/start-stop-restart-the-datadog-agent
---


## Start, Stop, and Restart the Agent 

### Start the Agent
{{< tabs >}}
{{% tab "Agent v6" %}}

| Platform | Command                                                        |
| :------- | :------------------------------------------------------------- |
| Linux    | `sudo service datadog-agent start`                             |
| macOS    | `launchctl start com.datadoghq.agent` *or* via the systray app |
| Source   | `sudo service datadog-agent start`                             |
| Windows  | [See the dedicated Windows documentation][1]                   |

[1]: /agent/basic_agent_usage/windows

{{% /tab %}}
{{% tab "Agent v5" %}}

| Platform | Command                                      |
| :------- | :------------------------------------------- |
| Linux    | `sudo service datadog-agent start`           |
| macOS    | `/usr/local/bin/datadog-agent start`         |
| Source   | `sudo ~/.datadog-agent/bin/agent start`      |
| Windows  | [See the dedicated Windows documentation][1] |

[1]: /agent/basic_agent_usage/windows

{{% /tab %}}
{{< /tabs >}}

**Note**: If you are using a Linux based system and the `service` wrapper command is not available, [consult the list of alternatives][4].

### Stop the Agent

{{< tabs >}}
{{% tab "Agent v6" %}}

| Platform | Command                                                       |
| :------- | :------------------------------------------------------------ |
| Linux    | `sudo service datadog-agent stop`                             |
| macOS    | `launchctl stop com.datadoghq.agent` *or* via the systray app |
| Source   | `sudo service datadog-agent stop`                             |
| Windows  | [See the dedicated Windows documentation][1]                  |

[1]: /agent/basic_agent_usage/windows

{{% /tab %}}
{{% tab "Agent v5" %}}

| Platform | Command                                      |
| :------- | :------------------------------------------- |
| Linux    | `sudo service datadog-agent stop`            |
| macOS    | `/usr/local/bin/datadog-agent stop`          |
| Source   | `sudo ~/.datadog-agent/bin/agent stop`       |
| Windows  | [See the dedicated Windows documentation][1] |

[1]: /agent/basic_agent_usage/windows

{{% /tab %}}
{{< /tabs >}}

**Note**: If you are using a Linux based system and the `service` wrapper command is not available, [consult the list of alternatives][4].

### Restart the Agent 

{{< tabs >}}
{{% tab "Agent v6" %}}

| Platform | Command                                           |
| :------- | :------------------------------------------------ |
| Linux    | `sudo service datadog-agent restart`              |
| macOS    | run `stop` then `start`, *or* via the systray app |
| Source   | *unsupported Platform*                                |
| Windows  | [See the dedicated Windows documentation][1]      |

[1]: /agent/basic_agent_usage/windows

{{% /tab %}}
{{% tab "Agent v5" %}}

| Platform | Command                                      |
| :------- | :------------------------------------------- |
| Linux    | `sudo service datadog-agent restart`         |
| macOS    | `/usr/local/bin/datadog-agent restart`       |
| Source   | `sudo ~/.datadog-agent/bin/agent restart`    |
| Windows  | [See the dedicated Windows documentation][1] |

[1]: /agent/basic_agent_usage/windows

{{% /tab %}}
{{< /tabs >}}

**Note**: If you are using a Linux based system and the `service` wrapper command is not available, [consult the list of alternatives][4].

## Agent Status and Information

### Service Status

{{< tabs >}}
{{% tab "Agent v6" %}}

| Platform            | Command                                                                       |
| :--------           | :--------                                                                     |
| Linux               | `sudo service datadog-agent status`                                           |
| Docker (Debian)     | `sudo docker exec -it <container_name> s6-svstat /var/run/s6/services/agent/` |
| Docker (Alpine)     | *unsupported Platform*                                                      |
| Kubernetes          | `kubectl exec -it <pod-name> s6-svstat /var/run/s6/services/agent/`           |
| Kubernetes (Alpine) | *unsupported Platform*                                                      |
| macOS               | `launchctl list com.datadoghq.agent` *or* via the systray app                 |
| Source              | `sudo service datadog-agent status`                                           |


[2]: /agent/basic_agent_usage/windows/#status-and-information 

{{% /tab %}}
{{% tab "Agent v5" %}}

| Platform            | Command                                                                                                  |
| :--------           | :-----                                                                                                   |
| Linux               | `sudo service datadog-agent status`                                                                      |
| Docker (Debian)     | `sudo docker exec -it <container_name> /etc/init.d/datadog-agent status`                                 |
| Docker (Alpine)     | `sudo docker exec -it <container_name> supervisorctl -c /opt/datadog-agent/agent/supervisor.conf status` |
| Kubernetes          | `kubectl exec -it <pod-name> /etc/init.d/datadog-agent status`                                           |
| Kubernetes (Alpine) | `kubectl exec -it <pod-name> supervisorctl -c /opt/datadog-agent/agent/supervisor.conf status`           |
| macOS               | `datadog-agent status`                                                                                   |
| Source              | `sudo ~/.datadog-agent/bin/agent status`                                                                 |
| Windows             | [See the dedicated Windows documentation][2]                                                             |

[2]: /agent/basic_agent_usage/windows/#status-and-information

{{% /tab %}}
{{< /tabs >}}

**Note**: If you are using a Linux based system and the `service` wrapper command is not available, [consult the list of alternatives][4].

### Agent Information

Running an info command displays the status of your Datadog Agent and enabled integrations.

{{< tabs >}}
{{% tab "Agent v6" %}}

| Platform            | Command                                              |
| :--------           | :--------                                            |
| Linux               | `sudo datadog-agent status`                          |
| Docker              | `sudo docker exec -it <container_name> agent status` |
| Docker (Alpine)     | *unsupported Platform*                             |
| Kubernetes          | `kubectl exec -it <pod-name> agent status`           |
| Kubernetes (Alpine) | *unsupported Platform*                             |
| macOS               | `datadog-agent status` or via the [web GUI][3]       |
| Source              | `sudo datadog-agent status`                          |
| Windows             | [See the dedicated Windows documentation][2]         |

**Note**: If you are using a Linux based system and the `service` wrapper command is not available, [consult the list of alternatives][4]

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

[2]: /agent/basic_agent_usage/windows/#status-and-information
[3]: /agent/#using-the-gui
[4]: https://github.com/DataDog/datadog-agent/blob/master/docs/agent/changes.md#service-lifecycle-commands

{{% /tab %}}
{{% tab "Agent v5" %}}

| Platform            | Command                                                                |
| :--------           | :-----                                                                 |
| Linux               | `sudo service datadog-agent info`                                      |
| Docker              | `sudo docker exec -it <container_name> /etc/init.d/datadog-agent info` |
| Docker (Alpine)     | `docker exec -it <container_name> /opt/datadog-agent/bin/agent info`   |
| Kubernetes          | `kubectl exec -it <pod-name> /etc/init.d/datadog-agent info`           |
| Kubernetes (Alpine) | `kubectl exec -it <pod-name> /opt/datadog-agent/bin/agent info`        |
| macOS               | `datadog-agent info`                                                   |
| Source              | `sudo ~/.datadog-agent/bin/info`                                       |
| Windows             | [See the dedicated Windows documentation][2]                           |

**Note**: If you are using a Linux based system and the `service` wrapper command is not available, [consult the list of alternatives][4]

A properly configured integration will be displayed under **Checks** with no warnings or errors, as seen below:

```
  Checks
  ======

   network
   -------
     - instance #0 [OK]
     - Collected 15 metrics, 0 events & 1 service check
```

[2]: /agent/basic_agent_usage/windows/#status-and-information
[4]: https://github.com/DataDog/datadog-agent/blob/master/docs/agent/changes.md#service-lifecycle-commands

{{% /tab %}}
{{< /tabs >}}

[4]: https://github.com/DataDog/datadog-agent/blob/master/docs/agent/changes.md#service-lifecycle-commands
