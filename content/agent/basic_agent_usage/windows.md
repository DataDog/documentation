---
title: Basic Agent Usage for Windows
kind: documentation
description: "Basic functionality of the Datadog Agent on the Windows platform."
platform: Windows
aliases:
    - /guides/basic_agent_usage/windows/
further_reading:
- link: "logs/"
  tag: "Documentation"
  text: Collect your logs
- link: "graphing/infrastructure/process"
  tag: "Documentation"
  text: Collect your processes
- link: "tracing"
  tag: "Documentation"
  text: Collect your traces
---

## Overview

This page outlines the basic functionality of the Datadog Agent. If you haven't installed the Agent yet, instructions can be found [in the Datadog Agent integration page][1].

### Starting and Stopping the Agent

The execution of the Agent is controlled by a Windows service.

### For version >= 6.0.0

There are a few major changes compare to older Datadog Windows Agent version:

* The main executable name is now `agent.exe` (it was `ddagent.exe` previously)
* Commands should be run with the command line `C:\program files\datadog\datadog agent\embedded\agent.exe <command>`
* The configuration GUI is now a browser based configuration application (for Windows 64-bit only)

The Agent has a new set of command-line options:

| Command         | Notes                                                                      |
| --------------- | -------------------------------------------------------------------------- |
| check           | Run the specified check                                                    |
| diagnose        | Execute some connectivity diagnosis on your system                         |
| flare           | Collect a flare and send it to Datadog                                     |
| help            | Help about any command                                                     |
| hostname        | Print the hostname used by the Agent                                       |
| import          | Import and convert configuration files from previous versions of the Agent |
| installservice  | Installs the Agent within the service control manager                      |
| launch-gui      | Starts the Datadog Agent GUI                                               |
| regimport       | Import the registry settings into datadog.yaml                             |
| remove-service  | Removes the Agent from the service control manager                         |
| restart-service | Restarts the Agent within the service control manager                      |
| start           | Start the Agent                                                            |
| start-service   | Starts the Agent within the service control manager                        |
| status          | Print the current status                                                   |
| stopservice     | Stops the Agent within the service control manager                         |
| version         | Print the version info                                                     |

### For version >= 3.9.1

You can use the Datadog Agent Manager that you can find in the Start Menu.

{{< img src="agent/basic_agent_usage/windows/windows-start-menu.png" alt="windows Start Menu" responsive="true" style="width:40%;">}}

{{< img src="agent/basic_agent_usage/windows/manager-snapshot.png" alt="Manager snapshot" responsive="true" style="width:40%;">}}

You can also use Windows Powershell if you are running on a modern version of Windows:
`[start|stop|restart]-service datadogagent`

### For version < 3.9.1

The Agent can be started, stopped, and restarted from the Services panel. To view the Services panel, execute the following in a `cmd.exe` shell: `services.msc`. Once you're in the console, find the "Datadog Agent" service. Right clicking on the service reveals options to start, stop, and restart the Agent.

## Status and Information
##### Agent >= 6

To check if the Agent is running, check if the `DatadogAgent` service in the Services panel is listed as *Started*. A process called *Datadog Metrics Agent* (`agent.exe`) should also exist in the Task Manager.

To receive more information about the Agent's state, start the Agent GUI by either:

- Right clicking on the Datadog Agent system tray icon -> Configure
- Or: running `& 'C:\program files\datadog\datadog agent\embedded\agent.exe' launch-gui` from an admin Powershell prompt

Then, open the status page by going to *Status* -> *General*. Get more information on the checks that are running on the *Status* -> *Collector* page and the *Checks* -> *Summary* page.

It's also possible to run the status command directly using Powershell:

`& 'C:\program files\datadog\datadog agent\embedded\agent.exe' status`

or `cmd.exe`:

`C:\program files\datadog\datadog agent\embedded\agent.exe" status`

##### Agent < v6

To check if the Agent is running, check if the service status in the Services panel is listed as "Started". A process called `ddagent.exe` should also exist in the Task Manager. To receive more information about the Agent's state, visit the _status page_ by going to *Settings -> Agent Status* in Agent version 5.2 and above and by going to `http://localhost:17125/status` in Agent version 3.9.1 to 5.1.

For 5.2 and later versions of the Agent go to the Datadog Agent *Manager->Settings->Agent Status*

{{< img src="agent/faq/windows_status.png" alt="Windows Status" responsive="true" style="width:50%;" >}}

It's also possible to run the info command using Powershell:

```
& 'C:\Program Files\Datadog\Datadog Agent\embedded\python.exe' 'C:\Program Files\Datadog\Datadog Agent\agent\agent.py' info
```

or cmd.exe:

```
C:\"Program Files"\Datadog\"Datadog Agent"\embedded\python.exe" "C:\Program Files\Datadog\Datadog Agent\agent\agent.py" info
```

If you're running on a version older than 5.2 visit the status page in your web browser: `http://localhost:17125/status` The status page is supported in Agent version 3.9.1-5.1.1

## Configuration

### For version >= 3.9.1

You can use the Datadog Agent Manager located in the start menu to enable, disable and configure checks. You have to restart the Agent in order for your changes to be applied.

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

### Agent check directory structure

The `checks.d` folder lives in your Agent root, find it at:

    C:\programdata\datadog\checks.d\

The other folder that you need to care about is `conf.d` which lives in the
Agent configuration root, find it at:

    C:\ProgramData\Datadog\conf.d\

OR

    C:\Documents and Settings\All Users\Application Data\Datadog\conf.d\

## Switch between Agent v5 and v6
### Upgrade to Agent 6

Download the latest version available [from here][2] and run the installation package.

### Downgrade to Agent v5

Run the Agent installer package for the latest 5.x version,  instructions can be found [in the Datadog Agent integration page][1].

## Uninstall the Agent

**It's important that the original account used to install the Agent is also used to remove it, otherwise it’s possible remnants are left behind and it won't be cleanly removed.**

Uninstall the Agent using Add/Remove Programs, alternatively, it's possible to to use Powershell as well. Here is a one liner:

```
(Get-WmiObject -Class Win32_Product -Filter "Name='Datadog Agent'" -ComputerName . ).Uninstall()
```

## Troubleshooting

The Agent logs are located in the `C:\programdata\Datadog\logs` directory and all logs are in the `agent.log` file.

If you're still having trouble, [our support team][3] will be glad to provide further assistance.

### For version >= 3.9.1 to < 6.0

Logs are available at:

  * For Windows Server 2003, XP or older:
`C:\Documents and Settings\All Users\Application Data\Datadog\logs\ddagent.log`
  * For Windows Server 2008, Vista and newer:
`C:\ProgramData\datadog\logs\ddagent.log`

### For version < 3.9.1

Logs for the subsystems are available in Event Viewer, under Windows Logs -> Application.

If you're still having trouble, [our support team][3] will be glad to provide further assistance.

## Adding a custom python package to the Agent
The current way to do so is to add the package in the library zipped folder that can be found at `C:\Program Files (x86)\Datadog\Datadog Agent\files`, and [restart the Agent][4].

{{< img src="agent/faq/add_package_windows.png" alt="Add Package Windows" responsive="true" style="width:75%;">}}

### Send a flare

#### Agent v6

1. Navigate to `localhost:5002` to [display the Agent GUI][5]
2. Select flare tab
  {{< img src="agent/basic_agent_usage/windows/windows_flare_agent_6.png" alt="Windows flare with Agent 6" responsive="true" style="width:75%;">}}
3. Enter your ticket number (if you have one) and email address
4. Press Submit

#### Agent v5

To send Datadog support a copy of your Windows logs and configurations, do the following:

1. Open the Datadog Agent Manager
2. Select Actions
3. Select Flare
4. Enter your ticket number (`<CASE_ID>`)- if you don't have one leave the value as zero
5. Lastly, enter the email address you use to log into Datadog

That's it, you're done!

{{< img src="agent/faq/windows_flare.jpg" alt="Windows Flare" responsive="true" style="width:70%;">}}

It's also possible to run the flare command using Powershell:

```
& 'C:\Program Files\Datadog\Datadog Agent\embedded\python.exe' 'C:\Program Files\Datadog\Datadog Agent\agent\agent.py' flare <CASE_ID>
```
or cmd.exe:
```
C:\"Program Files"\Datadog\"Datadog Agent"\embedded\python.exe "C:\Program Files\Datadog\Datadog Agent\agent\agent.py" flare <CASE_ID>
```

#### Flare Fails to Upload

On Linux and Mac OSX, the output of the flare command tells you where the compressed flare archive is saved. In case the file fails to upload to Datadog, you can retrieve it from this directory and manually add as an attachment to an email.

For Windows, you can find the location of this file by running the following from the Agent's python command prompt:

* Since Agent v5.12:
    `C:\Program Files\Datadog\Datadog Agent\dist\shell.exe since`

* On older Agent version:
    `C:\Program Files (x86)\Datadog\Datadog Agent\files\shell.exe`

```
import tempfile
print tempfile.gettempdir()
```

Example :

{{< img src="agent/faq/flare_fail.png" alt="Flare Fail" responsive="true" style="width:70%;">}}

## Use Cases
###  Monitoring a Windows Service

On your target host, first launch the Datadog Agent Manager and select the "Windows Service" integration from the list (see below)

For the Windows Service Integration, there is an out-of-the-box example, however, this example uses DHCP.

First, to get the name of the service, open services.msc and locate your target service. Using DHCP as our target, you can see the service name at the top of the service properties window:

{{< img src="agent/faq/DHCP.png" alt="DHCP" responsive="true" style="width:75%;">}}

When adding your own services, be sure to follow the formatting exactly as shown - if formatting is not correct the Integration fails.

{{< img src="agent/faq/windows_DHCP_ service.png" alt="Windows DHCP Service" responsive="true" style="width:75%;">}}

Also, any time you modify an Integration you’ll need to restart the Datadog Service. You can do this from services.msc or right from the UI via Actions.

For Services, Datadog doesn't track the metrics, only their availability. (For metrics you’ll want to use [Process](/#monitoring-windows-processes) or [WMI Integration][6]). To set up a Monitor, select the "Integration" then "Windows Service" monitor type. There you can "Pick Monitor Scope" and choose the service you would like to monitor.

### Monitoring system load for Windows

The Datadog Agent collects a large number of system metrics out of the box. One of the more commonly used system metrics is system.load.*.

|                             |                                                                                |
| :----                       | :---                                                                           |
| system.load.1 (gauge)       | The average system load over one minute.                                       |
| system.load.15 (gauge)      | The average system load over fifteen minutes.                                  |
| system.load.5 (gauge)       | The average system load over five minutes.                                     |
| system.load.norm.1 (gauge)  | The average system load over one minute normalized by the number of CPUs.      |
| system.load.norm.15 (gauge) | The average system load over fifteen minutes normalized by the number of CPUs. |
| system.load.norm.5 (gauge)  | The average system load over five minutes normalized by the number of CPUs.    |

The system.load.* metric is Unix specific, it conveys the average amount of resources either waiting to use or currently using the CPU. Each process waiting to use or using the CPU increases the load number by 1. The number at the end of the metric name indicates the average number of these processes in the previous X minutes. For system.load.5, this would be the average over the last 5 minutes. A value of 0 indicates a completely idle CPU, and a number equal to the number of CPU cores in the environment indicates that the CPU can handle every request coming in with no delay. Any number greater than this means that processes are waiting to use the CPU.

#### Where is System Load for Windows?

While Windows does not offer this exact metric, there is an equivalent option that's available by default in the system metrics: `system.proc.queue.length`. The `system.proc.queue.length` metric allows you to see the number of threads that are observed as delayed in the processor ready queue and are waiting to be executed.

### Monitoring Windows Processes

You can monitor Windows processes via the [process integration][7]. To set this up on Windows, select the "Process" integration from the list of integrations in the Datadog Agent Manager and edit the configuration.

For example, to monitor Notepad, your configuration file would include:

```yaml
init_config:
instances:
- name: notepad
  search_string: ['notepad.exe']
```

When adding your own processes, be sure to follow the formatting exactly as shown - if formatting is not correct the integration fails.

When you're done editing the file, press "Save" to save it, then "Enable" to enable it.

Any time you modify a Datadog integration you’ll need to restart the Datadog Agent service. You can do this by clicking the "Actions" button in the top left corner, then selecting "Restart", or you can restart "Datadog Agent" in your Services Management Snap-in Console (services.msc).

To verify that your Process check is working, click on "Logs and Status", then "Agent Status". Scroll down to the "Checks" section and you should see "process" reporting on each process instance you have setup in your configuration file.

Again, due to the sensitivity of yaml, if you've tried the above and cannot get it to work, use the attached file to get yourself started and confirm your syntax.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/windows
[2]: https://s3.amazonaws.com/ddagent-windows-stable/datadog-agent-6-latest.amd64.msi
[3]: /help
[4]: /agent/faq/agent-commands
[5]: /agent/#using-the-gui
[6]: /integrations/wmi
[7]: /integrations/process/
