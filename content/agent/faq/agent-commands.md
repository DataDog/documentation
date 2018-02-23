---
title: Agent commands
kind: faq
aliases:
    - /agent/faq/agent-status-and-information
    - /agent/faq/start-stop-restart-the-datadog-agent
---

## Start/Stop/Restart the Agent 
### Start the Agent

|Platform|Agent v5 |Agent v6|
|:--------|:-----|:--------|
|Linux|`sudo service datadog-agent start`|`sudo service datadog-agent start`|
|MacOS x|`/usr/local/bin/datadog-agent start`|`launchctl start com.datadoghq.agent` or systray app |
|Source|`sudo ~/.datadog-agent/bin/agent start`|`sudo service datadog-agent start`|
|Windows|[Consult our dedicated windows doc](/agent/basic_agent_usage/windows)|[Consult our dedicated windows doc](/agent/basic_agent_usage/windows)|

### Stop the Agent

|Platform|Agent v5 |Agent v6|
|:--------|:-----|:--------|
|Linux|`sudo service datadog-agent stop`|`sudo service datadog-agent stop`|
|MacOS x|`/usr/local/bin/datadog-agent stop` |`launchctl stop com.datadoghq.agent` or systray app  |
|Source|`sudo ~/.datadog-agent/bin/agent stop`|`sudo service datadog-agent stop`|
|Windows|[Consult our dedicated windows doc](/agent/basic_agent_usage/windows)|[Consult our dedicated windows doc](/agent/basic_agent_usage/windows)|
### Restart the Agent 

|Platform|Agent v5 |Agent v6|
|:--------|:-----|:--------|
|Linux|`sudo service datadog-agent restart`|`sudo service datadog-agent restart`|
|MacOS x|`/usr/local/bin/datadog-agent restart `|_run `stop` then `start`_ or systray app|
|Source|`sudo ~/.datadog-agent/bin/agent restart`|`n/a`|
|Windows|[Consult our dedicated windows doc](/agent/basic_agent_usage/windows)|[Consult our dedicated windows doc](/agent/basic_agent_usage/windows)|

## Agent Status and Information

### Service status

|Platform|Agent v5 |Agent v6|
|:--------|:-----|:--------|
|Linux|`sudo service datadog-agent status`|`sudo datadog-agent status`|
|Docker|`sudo docker exec -it dd-agent /etc/init.d/datadog-agent status`|`n/a`|
|MacOS x|`datadog-agent status`             | `launchctl list com.datadoghq.agent` or systray app|
|Source|`sudo ~/.datadog-agent/bin/agent status`|`sudo service datadog-agent status`|
|Windows|[Consult our dedicated windows doc](/agent/basic_agent_usage/windows/#status-and-information)|[Consult our dedicated windows doc](/agent/basic_agent_usage/windows/#status-and-information)|

### Agent Information

Running an info command displays the status of your Datadog agent and enabled integrations.

A properly configured integration will report "OK" as seen below:

```
  Checks
  ======

    network
    -------
      - instance #0 [OK]
      - Collected 15 metrics, 0 events & 1 service check
```

The `[OK]` in the Agent output implies that the check was configured/run correctly but does not refer to the value being returned by your check.  

|Platform|Agent v5 |Agent v6|
|:--------|:-----|:--------|
|Linux|`sudo service datadog-agent info`|`sudo datadog-agent status`|
|Docker|`sudo docker exec -it dd-agent /etc/init.d/datadog-agent info`|`n/a`|
|Docker (Alpine)|`docker exec -it dd-agent /opt/datadog-agent/bin/agent`|`n/a`|
|MacOS x|`datadog-agent info`               | `datadog-agent status` or [web GUI](/agent/v6/#using-the-gui)                    |
|Source|`sudo ~/.datadog-agent/bin/info`|`sudo datadog-agent status`|
|Windows|[Consult our dedicated windows doc](/agent/basic_agent_usage/windows/#status-and-information)|[Consult our dedicated windows doc](/agent/basic_agent_usage/windows/#status-and-information)|