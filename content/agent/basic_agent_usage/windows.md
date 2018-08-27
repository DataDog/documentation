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

This page outlines the basic features of the Windows Datadog Agent. If you haven't installed the Agent yet, basic installation instructions can be found [in the Datadog Agent Integration page][1].

## Agent installation

Many items can be configured on the command line when installing the Datadog Windows Agent. Each configuration item is added as an install property to the command line. For instance, the following commands install the Agent, configure the Agent configuration file with the `<DATADOG_API_KEY>`, and set the `<HOSTNAME>` and tags.

* (cmd shell) `msiexec /qn /i datadog-agent-6-latest.amd64.msi APIKEY="<DATADOG_API_KEY>" HOSTNAME="<HOSTNAME>" TAGS="key_1:val_1,key_2:val_2"`
* (powershell) `Start-Process msiexec -ArgumentList 'datadog-agent-6-latest.amd64.msi APIKEY="<DATADOG_API_KEY>" HOSTNAME="<HOSTNAME>" TAGS="key_1:val_1,key_2:val_2"'`

The following configuration command line options are available when installing the Agent: 

| Variable          | Type   | Description                                                                                                                                                                                                   |
| ----              | -----  | ----                                                                                                                                                                                                          |
| `APIKEY`          | String | Assigns the Datadog API KEY to string in the configuration file.                                                                                                                                              |
| `TAGS`            | String | Comma separated list of tags to assign in the configuration file.                                                                                                                                             |
| `HOSTNAME`        | String | Configures the hostname reported by the Datadog Agent to Datadog. Overrides any hostname calculated at runtime                                                                                                |
| `LOGS_ENABLED`    | String | Enables (if set to `"true"`) or explicitly disables (if set to `"false"`) the log collection feature in the configuration file.  Logs is disabled by default.                                                 |
| `APM_ENABLED`     | String | Explicitly enables (if set to `"true"`) or disables (if set to `"false"`) the APM Agent in the configuration file.  APM is enabled by default                                                                 |
| `PROCESS_ENABLED` | String | Enables (if set to `"true"`) or explicitly disables (if set to `"false"`) the process Agent in the configuration file.  The process Agent is disabled by default.                                             |
| `CMD_PORT`        | Number | Number is a valid port number between 0 and 65534.  The Datadog Agent uses port 5001 by default for it's control API.  If that port is already in use by another program, the default may be overridden here. |
| `PROXY_HOST`      | String | If using a proxy, sets your proxy host. [Learn more on using a proxy with the Datadog Agent][8].                                                                                                              |
| `PROXY_PORT`      | Number | If using a proxy, sets your proxy port. [Learn more on using a proxy with the Datadog Agent][8].                                                                                                              |
| `PROXY_USER`      | String | If using a proxy, sets your proxy user. [Learn more on using a proxy with the Datadog Agent][8].                                                                                                              |
| `PROXY_PASSWORD`  | String | If using a proxy, sets your proxy password. [Learn more on using a proxy with the Datadog Agent][8].                                                                                                          |

Note: If a valid `datadog.yaml` is found and has an `API_KEY` configured, that file takes precedence over all specified command-line options.

## Agent Commands

The execution of the Agent is controlled by the Windows Service Control Manager.

{{< tabs >}}
{{% tab "Agent v6" %}}

There are a few major changes compared to older Datadog Windows Agent v5:

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
| regimport       | Import the registry settings into `datadog.yaml`                           |
| remove-service  | Removes the Agent from the service control manager                         |
| restart-service | Restarts the Agent within the service control manager                      |
| start           | Start the Agent                                                            |
| start-service   | Starts the Agent within the service control manager                        |
| status          | Print the current status                                                   |
| stopservice     | Stops the Agent within the service control manager                         |
| version         | Print the version info                                                     |

{{% /tab %}}
{{% tab "Agent v5" %}}

Use the Datadog Agent Manager that you can find in the Start Menu.

{{< img src="agent/basic_agent_usage/windows/windows-start-menu.png" alt="windows Start Menu" responsive="true" style="width:75%;">}}

To run `start`, `stop`, and `restart` commands:

{{< img src="agent/basic_agent_usage/windows/manager-snapshot.png" alt="Manager snapshot" responsive="true" style="width:75%;">}}

You can also use Windows Powershell if you are running on a modern version of Windows: `[start|stop|restart]-service datadogagent`

{{% /tab %}}
{{< /tabs >}}

## Agent Configuration

Use the Datadog Agent Manager located in the start menu to enable, disable, and configure checks. 
Restart the Agent in order for your changes to be applied.

### Agent check directory structure

The `checks.d` folder lives in your Agent root, find it at:

    C:\programdata\datadog\checks.d\

The other folder that you need to care about is `conf.d` which lives in the
Agent configuration root, find it at:

    C:\ProgramData\Datadog\conf.d\

OR

    C:\Documents and Settings\All Users\Application Data\Datadog\conf.d\

### Adding a custom python package to the Agent
The current way to do so is to add the package in the library zipped folder that can be found at `C:\Program Files (x86)\Datadog\Datadog Agent\files`, and [restart the Agent][4].

{{< img src="agent/faq/add_package_windows.png" alt="Add Package Windows" responsive="true" style="width:75%;">}}

## Switch between Agent v5 and v6
### Upgrade to Agent 6

Download the latest version available [from here][2] and run the installation package.

### Downgrade to Agent v5

Run the Agent installer package for the latest 5.x version,  instructions can be found [in the Datadog Agent Integration page][1].

## Uninstall the Agent

**It's important that the original account used to install the Agent is also used to remove it, otherwise it's possible remnants are left behind and it won't be cleanly removed.**

Uninstall the Agent using Add/Remove Programs, alternatively, it's possible to to use Powershell as well. Here is a one liner:

```
(Get-WmiObject -Class Win32_Product -Filter "Name='Datadog Agent'" -ComputerName . ).Uninstall()
```

## Troubleshooting
### Agent Status and Information

{{< tabs >}}
{{% tab "Agent v6" %}}

To check if the Agent is running, check if the `DatadogAgent` service in the Services panel is listed as *Started*. A process called *Datadog Metrics Agent* (`agent.exe`) should also exist in the Task Manager.

To receive more information about the Agent's state, start the Agent GUI by either:

- Right clicking on the Datadog Agent system tray icon -> Configure
- Or: running `& 'C:\program files\datadog\datadog agent\embedded\agent.exe' launch-gui` from an admin Powershell prompt

Then, open the status page by going to *Status* -> *General*. Get more information on the checks that are running on the *Status* -> *Collector* page and the *Checks* -> *Summary* page.

It's also possible to run the status command directly using Powershell:

`& 'C:\program files\datadog\datadog agent\embedded\agent.exe' status`

or `cmd.exe`:

`C:\program files\datadog\datadog agent\embedded\agent.exe" status`


{{% /tab %}}
{{% tab "Agent v5" %}}

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

{{% /tab %}}
{{< /tabs >}}

### Logs location

{{< tabs >}}
{{% tab "Agent v6" %}}

The Agent logs are located in the `C:\programdata\Datadog\logs` directory and all logs are in the `agent.log` file.

If you're still having trouble, [our support team][3] is glad to provide further assistance.

{{% /tab %}}
{{% tab "Agent v5" %}}

For Windows Server 2008, Vista and newer, logs are available at `C:\ProgramData\datadog\logs\ddagent.log` 

{{% /tab %}}
{{< /tabs >}}

### Send a flare
{{< tabs >}}
{{% tab "Agent v6" %}}

1. Navigate to `localhost:5002` to [display the Agent GUI][5]
2. Select flare tab
  {{< img src="agent/basic_agent_usage/windows/windows_flare_agent_6.png" alt="Windows flare with Agent 6" responsive="true" style="width:75%;">}}
3. Enter your ticket number (if you have one) and email address
4. Press Submit

{{% /tab %}}
{{% tab "Agent v5" %}}

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

On Linux and macOS, the output of the flare command tells you where the compressed flare archive is saved. In case the file fails to upload to Datadog, you can retrieve it from this directory and manually add as an attachment to an email.

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

{{% /tab %}}
{{< /tabs >}}

## Use Cases
###  Monitoring a Windows Service

On your target host, first launch the Datadog Agent Manager and select the "Windows Service" Integration from the list (see below)

For the Windows Service Integration, there is an out-of-the-box example, however, this example uses DHCP.

First, to get the name of the service, open services.msc and locate your target service. Using DHCP as our target, you can see the service name at the top of the service properties window:

{{< img src="agent/faq/DHCP.png" alt="DHCP" responsive="true" style="width:75%;">}}

When adding your own services, be sure to follow the formatting exactly as shown - if formatting is not correct the Integration fails.

{{< img src="agent/faq/windows_DHCP_ service.png" alt="Windows DHCP Service" responsive="true" style="width:75%;">}}

Also, any time you modify an Integration you'll need to restart the Datadog Service. You can do this from services.msc or right from the UI via Actions.

For Services, Datadog doesn't track the metrics, only their availability. (For metrics you'll want to use [Process](/#monitoring-windows-processes) or [WMI Integration][6]). To set up a Monitor, select the "Integration" then "Windows Service" monitor type. There you can "Pick Monitor Scope" and choose the service you would like to monitor.

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

You can monitor Windows processes via the [process Integration][7]. To set this up on Windows, select the "Process" Integration from the list of Integrations in the Datadog Agent Manager and edit the configuration.

For example, to monitor Notepad, your configuration file would include:

```yaml
init_config:
instances:
- name: notepad
  search_string: ['notepad.exe']
```

When adding your own processes, be sure to follow the formatting exactly as shown - if formatting is not correct the Integration fails.

When you're done editing the file, press "Save" to save it, then "Enable" to enable it.

Any time you modify a Datadog Integration you'll need to restart the Datadog Agent service. You can do this by clicking the "Actions" button in the top left corner, then selecting "Restart", or you can restart "Datadog Agent" in your Services Management Snap-in Console (services.msc).

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
[8]: /agent/proxy
