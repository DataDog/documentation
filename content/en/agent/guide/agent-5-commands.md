---
title: Agent 5 Commands
disable_toc: false
---

## Overview

This page covers Agent 5 commands. Datadog recommends installing or upgrading to Agent 7 for the latest features. For information on installing the latest version of the Agent, follow the [Agent 7 Installation Instructions][1]. For information on upgrading to Agent 7 from an earlier version, see [Upgrade to Datadog Agent v7][2].

## Start, stop, and restart the Agent

### Start the Agent

List of commands to start the Datadog Agent:

| Platform | Command                                   |
|----------|-------------------------------------------|
| Linux    | `sudo service datadog-agent start`        |
| Docker   | See the [Docker Agent documentation][3].  |
| macOS    | `/usr/local/bin/datadog-agent start`      |
| Source   | `sudo ~/.datadog-agent/bin/agent start`   |
| Windows  | See the [Windows Agent documentation][4]. |

### Stop the Agent

List of commands to stop the Datadog Agent:

| Platform | Command                                   |
|----------|-------------------------------------------|
| Linux    | `sudo service datadog-agent stop`         |
| Docker   | See the [Docker Agent documentation][3].  |
| macOS    | `/usr/local/bin/datadog-agent stop`       |
| Source   | `sudo ~/.datadog-agent/bin/agent stop`    |
| Windows  | See the [Windows Agent documentation][4]. |

### Restart the Agent

List of commands to restart the Datadog Agent:

| Platform | Command                                   |
|----------|-------------------------------------------|
| Linux    | `sudo service datadog-agent restart`      |
| Docker   | See the [Docker Agent documentation][3].  |
| macOS    | `/usr/local/bin/datadog-agent restart`    |
| Source   | `sudo ~/.datadog-agent/bin/agent restart` |
| Windows  | See the [Windows Agent documentation][4]. |

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
| Windows         | See the [Windows Agent documentation][3].                                |

### Agent information

List of commands to display the status of your Datadog Agent and enabled integrations.

| Platform   | Command                                                                |
|------------|------------------------------------------------------------------------|
| Linux      | `sudo service datadog-agent info`                                      |
| Docker     | `sudo docker exec -it <CONTAINER_NAME> /etc/init.d/datadog-agent info` |
| Kubernetes | `kubectl exec -it <POD_NAME> -- /etc/init.d/datadog-agent info`        |
| macOS      | `datadog-agent info`                                                   |
| Source     | `sudo ~/.datadog-agent/bin/info`                                       |
| Windows    | See the [Windows Agent documentation][3].                              |

A properly configured integration is displayed under **Checks** with no warnings or errors, as seen below:

```text
Checks
======
 network
 -------
   - instance #0 [OK]
   - Collected 15 metrics, 0 events & 1 service check
```

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: /agent/versions/upgrade_to_agent_v7/
[3]: https://github.com/DataDog/docker-dd-agent/blob/master/README.md
[4]: /agent/basic_agent_usage/windows/