---
title: Agent commands
kind: faq
aliases:
    - /agent/faq/agent-status-and-information
    - /agent/faq/start-stop-restart-the-datadog-agent
---


## Start, Stop, and Restart the Agent 

### Start the Agent

| Platform | Agent v5                                     | Agent v6                                                       |
| :------- | :------------------------------------------- | :------------------------------------------------------------- |
| Linux    | `sudo service datadog-agent start`           | `sudo service datadog-agent start`                             |
| macOS    | `/usr/local/bin/datadog-agent start`         | `launchctl start com.datadoghq.agent` *or* via the systray app |
| Source   | `sudo ~/.datadog-agent/bin/agent start`      | `sudo service datadog-agent start`                             |
| Windows  | [See the dedicated Windows documentation][1] | [See the dedicated Windows documentation][1]                   |

**Note**: If you are using a Linux based system and the `service` wrapper command is not available, [consult the list of alternatives][4].

### Stop the Agent

| Platform | Agent v5                                     | Agent v6                                                      |
| :------- | :------------------------------------------- | :------------------------------------------------------------ |
| Linux    | `sudo service datadog-agent stop`            | `sudo service datadog-agent stop`                             |
| macOS    | `/usr/local/bin/datadog-agent stop`          | `launchctl stop com.datadoghq.agent` *or* via the systray app |
| Source   | `sudo ~/.datadog-agent/bin/agent stop`       | `sudo service datadog-agent stop`                             |
| Windows  | [See the dedicated Windows documentation][1] | [See the dedicated Windows documentation][1]                  |

**Note**: If you are using a Linux based system and the `service` wrapper command is not available, [consult the list of alternatives][4].

### Restart the Agent 

| Platform | Agent v5                                     | Agent v6                                          |
| :------- | :------------------------------------------- | :------------------------------------------------ |
| Linux    | `sudo service datadog-agent restart`         | `sudo service datadog-agent restart`              |
| macOS    | `/usr/local/bin/datadog-agent restart`       | run `stop` then `start`, *or* via the systray app |
| Source   | `sudo ~/.datadog-agent/bin/agent restart`    | n/a                                               |
| Windows  | [See the dedicated Windows documentation][1] | [See the dedicated Windows documentation][1]      |

**Note**: If you are using a Linux based system and the `service` wrapper command is not available, [consult the list of alternatives][4].

## Agent Status and Information

### Service Status

| Platform            | Agent v5                                                                                                 | Agent v6                                                                      |
| :--------           | :-----                                                                                                   | :--------                                                                     |
| Linux               | `sudo service datadog-agent status`                                                                      | `sudo service datadog-agent status`                                           |
| Docker (Debian)     | `sudo docker exec -it <container_name> /etc/init.d/datadog-agent status`                                 | `sudo docker exec -it <container_name> s6-svstat /var/run/s6/services/agent/` |
| Docker (Alpine)     | `sudo docker exec -it <container_name> supervisorctl -c /opt/datadog-agent/agent/supervisor.conf status` | n/a                                                                           |
| Kubernetes          | `kubectl exec -it <pod-name> /etc/init.d/datadog-agent status`                                           | `kubectl exec -it <pod-name> s6-svstat /var/run/s6/services/agent/`           |
| Kubernetes (Alpine) | `kubectl exec -it <pod-name> supervisorctl -c /opt/datadog-agent/agent/supervisor.conf status`           | n/a                                                                           |
| macOS               | `datadog-agent status`                                                                                   | `launchctl list com.datadoghq.agent` *or* via the systray app                 |
| Source              | `sudo ~/.datadog-agent/bin/agent status`                                                                 | `sudo service datadog-agent status`                                           |
| Windows             | [See the dedicated Windows documentation][2]                                                             | [See the dedicated Windows documentation][2]                                  |

**Note**: If you are using a Linux based system and the `service` wrapper command is not available, [consult the list of alternatives][4].

### Agent Information

Running an info command displays the status of your Datadog Agent and enabled integrations.

| Platform            | Agent v5                                                               | Agent v6                                             |
| :--------           | :-----                                                                 | :--------                                            |
| Linux               | `sudo service datadog-agent info`                                      | `sudo datadog-agent status`                          |
| Docker              | `sudo docker exec -it <container_name> /etc/init.d/datadog-agent info` | `sudo docker exec -it <container_name> agent status` |
| Docker (Alpine)     | `docker exec -it <container_name> /opt/datadog-agent/bin/agent info`   | n/a                                                  |
| Kubernetes          | `kubectl exec -it <pod-name> /etc/init.d/datadog-agent info`           | `kubectl exec -it <pod-name> agent status`           |
| Kubernetes (Alpine) | `kubectl exec -it <pod-name> /opt/datadog-agent/bin/agent info`        | n/a                                                  |
| macOS               | `datadog-agent info`                                                   | `datadog-agent status` or via the [web GUI][3]       |
| Source              | `sudo ~/.datadog-agent/bin/info`                                       | `sudo datadog-agent status`                          |
| Windows             | [See the dedicated Windows documentation][2]                           | [See the dedicated Windows documentation][2]         |

On Agent v6, a properly configured integration will be displayed under "Running Checks" with no warnings or errors, as seen below:

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

Equivalent output on Agent v5:

```
  Checks
  ======

   network
   -------
     - instance #0 [OK]
     - Collected 15 metrics, 0 events & 1 service check
```

**Note**: If you are using a Linux based system and the `service` wrapper command is not available, [consult the list of alternatives][4]

[1]: /agent/basic_agent_usage/windows
[2]: /agent/basic_agent_usage/windows/#status-and-information
[3]: /agent/#using-the-gui
[4]: https://github.com/DataDog/datadog-agent/blob/master/docs/agent/changes.md#service-lifecycle-commands
