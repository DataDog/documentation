---
title: Basic Agent Usage for Windows
kind: documentation
platform: Windows
aliases:
    - /guides/basic_agent_usage/windows/
---

## Overview

This page outlines the basic functionality of the Datadog Agent. If you haven't installed the Agent yet, instructions can be found [here](https://app.datadoghq.com/account/settings#agent/windows).

### Starting and Stopping the Agent

The execution of the Agent is controlled by a Windows service.


### For version >= 3.9.1

You can use the Datadog Agent Manager that you can find in the Start Menu.

{{< img src="agent/basic_agent_usage/windows/windows-start-menu.png" alt="windows Start Menu" responsive="true" popup="true">}}

{{< img src="agent/basic_agent_usage/windows/manager-snapshot.png" alt="Manager snapshot" responsive="true" popup="true">}}

You can also use Windows Powershell if you are running on a modern version of Windows:
`[start|stop|restart]-service datadogagent`


### For version < 3.9.1

The Agent can be started, stopped, and restarted from the Services panel. To view the Services panel, execute the following in a `cmd.exe` shell: `services.msc`. Once you're in the console, find the "Datadog Agent" service. Right clicking on the service reveals options to start, stop, and restart the Agent.

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

Logs for the subsystems are available in Event Viewer, under Windows Logs -> Application.  

If you're still having trouble, [our support team](/help) will be glad to provide further assistance.

## Adding a custom python package to the agent
The current way to do so is to add the package in the library zipped folder that can be found at `C:\Program Files (x86)\Datadog\Datadog Agent\files`, and [restart the agent](/agent/faq/start-stop-restart-the-datadog-agent).

{{< img src="agent/faq/add_package_windows.png" alt="Add Package Windows" responsive="true" popup="true">}}

## Use Cases
###  Monitoring a Windows Service

On your target host, first launch the Datadog Agent Manager and select the "Windows Service" integration from the list (see below)

For the Windows Service Integration, there is an out-of-the-box example, however, in this example we'll use DHCP.

First, to get the name of the service, open services.msc and locate your target service. Using DHCP as our target, you can see the service name at the top of the service properties window:

{{< img src="agent/faq/DHCP.png" alt="DHCP" responsive="true" popup="true">}}

When adding your own services, be sure to follow the formatting exactly as shown - if formatting is not correct the Integration fails.

{{< img src="agent/faq/windows_DHCP_service.png" alt="Windows DHCP Service" responsive="true" popup="true">}}

Also, any time you modify an Integration you’ll need to restart the Datadog Service. You can do this from services.msc or right from the UI via Actions.

For Services, Datadog doesn't track the metrics, only their availability. (For metrics you’ll want to use [Process](/#monitoring-windows-processes) or [WMI Integration](/integrations/wmi)). To set up a Monitor, select the "Integration" then "Windows Service" monitor type. There you can "Pick Monitor Scope" and choose the service you would like to monitor.

### Monitoring system load for Windows

The Datadog Agent collects a large number of system metrics out of the box. One of the more commonly used system metrics is system.load.*.

|||
|:----|:---|
|system.load.1 (gauge)   |The average system load over one minute.|
|system.load.15 (gauge)  |The average system load over fifteen minutes.|
|system.load.5 (gauge)   |The average system load over five minutes.|
|system.load.norm.1 (gauge)  |The average system load over one minute normalized by the number of CPUs.|
|system.load.norm.15 (gauge) |The average system load over fifteen minutes normalized by the number of CPUs.|
|system.load.norm.5 (gauge)  |The average system load over five minutes normalized by the number of CPUs. |
 

The system.load.* metric is Unix specific, it conveys the average amount of resources either waiting to use or currently using the CPU. Each process waiting to use or using the CPU increases the load number by 1. The number at the end of the metric name indicates the average number of these processes in the previous X minutes. For system.load.5, this would be the average over the last 5 minutes. A value of 0 indicates a completely idle CPU, and a number equal to the number of CPU cores in the environment indicates that the CPU can handle every request coming in with no delay. Any number greater than this means that processes are waiting to use the CPU. 

#### Where is System Load for Windows? 

While Windows does not offer this exact metric, there is an equivalent option that's available by default in the system metrics: `system.proc.queue.length`. The `system.proc.queue.length` metric allows you to see the number of threads that are observed as delayed in the processor ready queue and are waiting to be executed. 

### Monitoring Windows Processes

You can monitor Windows processes via the [process integration](/integrations/process/). To set this up on Windows, select the "Process" integration from the list of integrations in the Datadog Agent Manager and edit the configuration.

For example, to monitor Notepad, your configuration file would include:

```yaml
init_config:
instances:
- name: notepad
  search_string: ['notepad.exe']
```

When adding your own processes, be sure to follow the formatting exactly as shown - if formatting is not correct the integration fails.

When you're done editing the file, press "Save" to save it, then "Enable" to enable it.

Any time you modify a Datadog integration you’ll need to restart the Datadog Agent service. You can do this by clicking the "Actions" button in the top left corner, then selecting "Restart", or you can restart "Datadog Agent" in your Services Management Snap-in Console (services.msc).

To verify that your Process check is working, click on "Logs and Status", then "Agent Status". Scroll down to the "Checks" section and you should see "process" reporting on each process instance you have setup in your configuration file.

Again, due to the sensitivity of yaml, if you've tried the above and cannot get it to work, use the attached file to get yourself started and confirm your syntax.