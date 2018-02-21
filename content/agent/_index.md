---
title: Agent
kind: documentation
description: Install & configure the Agent to collect data
aliases:
    - /agent/faq/agent-status-and-information
    - /agent/faq/start-stop-restart-the-datadog-agent
    - /agent/faq/send-logs-and-configs-to-datadog-via-flare-command
    - /agent/faq/how-to-get-more-logging-from-the-agent
---

<div class="alert alert-info">
    Agent v6 is now available, <a href="https://github.com/DataDog/datadog-agent/blob/master/docs/agent/upgrade.md">upgrade to the newest version </a> to benefit from all new functionalities 
</div>

## What is the Agent?

The Datadog Agent is a piece of software that runs on your hosts. Its job is to faithfully collect events and metrics and bring them to Datadog on
your behalf so that you can do something useful with your monitoring and performance data. The Datadog Agent is open-sourced. You may view the source code on GitHub for [Agent v5](https://github.com/DataDog/dd-agent) and [Agent v6](https://github.com/DataDog/datadog-agent). To see all changes between Agent v5 and v6, [consult our dedicated changes documentation](https://github.com/DataDog/datadog-agent/blob/master/docs/agent/changes.md).

{{< partial name="platforms/platforms.html" >}}

## Start/Stop/Restart the agent 
### Start the agent

|Platform|Agent v5 |Agent v6|
|:--------|:-----|:--------|
|Linux|`sudo service datadog-agent start`|`sudo service datadog-agent start`|
|MacOS x|`/usr/local/bin/datadog-agent start`|`launchctl start com.datadoghq.agent` or systray app |
|SmartOS|`svcadm enable datadog`|`n/a`|
|Source|`sudo ~/.datadog-agent/bin/agent start`|`sudo service datadog-agent start`|
|Windows|[Consult our dedicated windows doc](/agent/basic_agent_usage/windows)|[Consult our dedicated windows doc](/agent/basic_agent_usage/windows)|

### Stop the agent

|Platform|Agent v5 |Agent v6|
|:--------|:-----|:--------|
|Linux|`sudo service datadog-agent stop`|`sudo service datadog-agent stop`|
|MacOS x|`/usr/local/bin/datadog-agent stop` |`launchctl stop com.datadoghq.agent` or systray app  |
|SmartOS|`svcadm disable datadog`|`n/a`|
|Source|`sudo ~/.datadog-agent/bin/agent stop`|`sudo service datadog-agent stop`|
|Windows|[Consult our dedicated windows doc](/agent/basic_agent_usage/windows)|[Consult our dedicated windows doc](/agent/basic_agent_usage/windows)|
### Restart the agent 

|Platform|Agent v5 |Agent v6|
|:--------|:-----|:--------|
|Linux|`sudo service datadog-agent restart`|`sudo service datadog-agent restart`|
|MacOS x|`/usr/local/bin/datadog-agent restart `|_run `stop` then `start`_ or systray app|
|SmartOS|`svcadm restart datadog`|`sudo service datadog-agent restart`|
|Source|`sudo ~/.datadog-agent/bin/agent restart`|`n/a`|
|Windows|[Consult our dedicated windows doc](/agent/basic_agent_usage/windows)|[Consult our dedicated windows doc](/agent/basic_agent_usage/windows)|

## Agent Status and information

### Agent Status

|Platform|Agent v5 |Agent v6|
|:--------|:-----|:--------|
|Linux|`sudo service datadog-agent status`|`sudo datadog-agent status`|
|Docker|`sudo docker exec -it dd-agent /etc/init.d/datadog-agent status`|`n/a`|
|MacOS x|`datadog-agent status`             | `launchctl list com.datadoghq.agent` or systray app|
|SmartOS|`svcs datadog`|`n/a`|
|Source|`sudo ~/.datadog-agent/bin/agent status`|`sudo service datadog-agent status`|
|Windows|[Consult our dedicated windows doc](/agent/basic_agent_usage/windows/#status-and-information)|[Consult our dedicated windows doc](/agent/basic_agent_usage/windows/#status-and-information)|

### Agent information

Running an info command displays the status of your Datadog agent, and the status of all integrations enabled for this Agent:

An Agent integration reports “OK” if it's properly configured as seen below:

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
|SmartOS|`/opt/local/datadog/bin/info`|`n/a`|
|Source|`sudo ~/.datadog-agent/bin/info`|`sudo datadog-agent status`|
|Windows|[Consult our dedicated windows doc](/agent/basic_agent_usage/windows/#status-and-information)|[Consult our dedicated windows doc](/agent/basic_agent_usage/windows/#status-and-information)|

## Agent Troubleshooting

If you ended up at this page and have not yet installed the Datadog Agent, go [to the dedicated agent integration page](https://app.datadoghq.com/account/settings#agent) for installation instructions. If you just installed the Agent, it might take a few moments before you start seeing metrics appear. The first place you should check for metrics is the [Metrics Explorer](https://app.datadoghq.com/metric/explorer).

If you think you might be experiencing issues, the first thing to do is [run the info command](/agent/#agent-status-and-information) and check the [Agent logs](/agent/#log-locations).

If you're still unsure about the issue, you may reach out to [Datadog support team](/help) along with [a flare](#send-a-flare) of your agent.

### Get more logging from the agent

To enable the full debug mode:

1. Modify your local `datadog.yaml` file (see [this page](/agent/v6/#configuration-file) to locate this configuration file on your instance)

2. Replace `# log_level: INFO` with `log_level: DEBUG` (make sure to get rid of # to uncomment the line)

3. Restart your Datadog Agent (see [that page](/agent/#start-stop-restart-the-agent) to find the restart command depending on your OS)

4. Wait a few minutes to generate some logs. [Look here](/agent/#log-locations) to find the location of the logs.

### Send a flare


If you are running the 5.3 version (or higher) of the agent, you're able to send all necessary troubleshooting information to our Support Team, with one flare command!

`flare` gathers all of the agent's configuration files and logs into an archive file. It removes sensitive information including passwords, API keys, Proxy credentials, and SNMP community strings.  
**Confirm the upload of the archive to immediately send it to Datadog support**.  
Since the Datadog Agent is completely open source, you can [verify the code's behavior](https://github.com/DataDog/dd-agent/blob/master/utils/flare.py). You can also review the archive prior to sending as the flare prompts a confirmation before uploading it.  

In the commands below, replace `<CASE_ID>` with your Datadog support case ID, if you don't specify a case ID, the command asks for an email address that is used to login in your organization and creates a new support case.

|Platform|Agent v5 |Agent v6|
|:--------|:-----|:--------|
|Linux| `sudo /etc/init.d/datadog-agent flare <CASE_ID>` | `sudo -u dd-agent -- datadog-agent flare <CASE_ID>`|
|Docker|`docker exec -it dd-agent /etc/init.d/datadog-agent flare <CASE_ID>`|`n/a`|
|Docker (Alpine)|`docker exec -it dd-agent /opt/datadog-agent/bin/agent flare <CASE_ID>`||
|MacOS x|`datadog-agent flare <CASE_ID>`              | `datadog-agent flare <CASE_ID>` or web [web GUI](/agent/v6/#using-the-gui)
|CentOS| `sudo service datadog-agent flare <CASE_ID>`              | `sudo datadog-agent flare <CASE_ID>`              |
|Debian| `sudo service datadog-agent flare <CASE_ID>`              | `sudo datadog-agent flare <CASE_ID>`              |
|Kubernetes|`kubectl exec <pod-name> -it /etc/init.d/datadog-agent flare <CASE_ID>`|`n/a`|
|Fedora|`sudo service datadog-agent flare <CASE_ID>`              | `sudo datadog-agent flare <CASE_ID>`              |
|Redhat|`sudo service datadog-agent flare <CASE_ID>`              | `sudo datadog-agent flare <CASE_ID>`              |
|Suse|`sudo service datadog-agent flare <CASE_ID>`              | `sudo datadog-agent flare <CASE_ID>`              |
|Source|`sudo ~/.datadog-agent/bin/agent flare <CASE_ID>`|`sudo datadog-agent flare <CASE_ID>`|
|Windows|[Consult our dedicated windows doc](/agent/basic_agent_usage/windows/#send-a-flare)|[Consult our dedicated windows doc](/agent/basic_agent_usage/windows/#send-a-flare)|

