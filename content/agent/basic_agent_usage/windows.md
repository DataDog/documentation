---
title: Basic Agent Usage for Windows
kind: documentation
platform: Windows
---

## Overview

This guide will outline the basic functionality of the Datadog Agent. If you haven't installed the Agent yet, instructions can be found [here](https://app.datadoghq.com/account/settings#agent/windows).

### Starting and Stopping the Agent

The execution of the Agent is controlled by a Windows service.


### For version >= 3.9.1

You can use the Datadog Agent Manager that you can find in the Start Menu.

{{< img src="agent/basic_agent_usage/windows/windows-start-menu.png" alt="windows Start Menu" responsive="true" >}}

{{< img src="agent/basic_agent_usage/windows/manager-snapshot.png" alt="Manager snapshot" responsive="true" >}}

You can also use Windows Powershell if you are running on a modern version of Windows:
`[start|stop|restart]-service datadogagent`


### For version < 3.9.1

The Agent can be started, stopped, and restarted from the Services panel. To view the Services panel, execute the following in a `cmd.exe` shell: `services.msc`. Once you're in the console, find the "Datadog Agent" service. Right clicking on the service will reveal options to start, stop, and restart the Agent.

## Status and Information

To check if the Agent is running, check if the service status in the Services panel is listed as "Started". A process called "ddagent.exe" should also exist in the Task Manager. To receive more information about the Agent's state, visit the _status page_ by going to **Settings -> Agent Status** in Agent version 5.2 and above and by going to `http://localhost:17125/status` in Agent version 3.9.1 to 5.1.

## Configuration

### For version >= 3.9.1

You can use the Datadog Agent Manager located in the start menu to enable, disable and configure checks. You have to restart the agent in order for your changes to be applied.

### For version < 3.9.1

The configuration file location depends on the version of Windows on which the Agent is installed. For Windows Server 2003, XP or older:

  * Agent configuration:
`C:\Documents and Settings\All Users\Application Data\Datadog\datadog.conf`
  * Integration configuration:
`C:\Documents and Settings\All Users\Application Data\Datadog\conf.d\`

For Windows Server 2008, Vista and newer:

  * Agent configuration:
`C:\ProgramData\Datadog\datadog.conf`
  * Integration configuration:
`C:\ProgramData\Datadog\conf.d\`

## Troubleshooting

First, check if the Agent is running in the Services panel and in the Task Manager. Next, try opening the status page to see the state of the Agent.

### For version >= 3.9.1

Log is available at:

  * For Windows Server 2003, XP or older:
`C:\Documents and Settings\All Users\Application Data\Datadog\logs\ddagent.log`
  * For Windows Server 2008, Vista and newer:
`C:\ProgramData\datadog\logs\ddagent.log`

### For version < 3.9.1

Logs for the subsystems are available in Event Viewer, under Windows Logs -> Application. <br/> If you're still having trouble, [our support team](/help) will be glad to provide further assistance.

