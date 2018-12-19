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
  text: "Collect your logs"
- link: "graphing/infrastructure/process"
  tag: "Documentation"
  text: "Collect your processes"
- link: "tracing"
  tag: "Documentation"
  text: "Collect your traces"
---

## Overview

This page outlines the basic features of the Windows Datadog Agent. If you haven't installed the Agent yet, basic installation instructions can be found [in the Datadog Agent Integration page][1].

**Note**: Windows 7 and above are supported.

## Agent installation

Many items can be configured on the command line when installing the Datadog Windows Agent. Each configuration item is added as an install property to the command line. For instance, the following commands install the Agent, configure the Agent configuration file with the `<DATADOG_API_KEY>`, and set the `<HOSTNAME>` and tags.

* (cmd shell) `msiexec /qn /i datadog-agent-6-latest.amd64.msi APIKEY="<DATADOG_API_KEY>" HOSTNAME="<HOSTNAME>" TAGS="key_1:val_1,key_2:val_2"`
* (powershell) `Start-Process msiexec -ArgumentList '/qn /i datadog-agent-6-latest.amd64.msi APIKEY="<DATADOG_API_KEY>" HOSTNAME="<HOSTNAME>" TAGS="key_1:val_1,key_2:val_2"'`

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
| `PROXY_HOST`      | String | If using a proxy, sets your proxy host. [Learn more on using a proxy with the Datadog Agent][2].                                                                                                              |
| `PROXY_PORT`      | Number | If using a proxy, sets your proxy port. [Learn more on using a proxy with the Datadog Agent][2].                                                                                                              |
| `PROXY_USER`      | String | If using a proxy, sets your proxy user. [Learn more on using a proxy with the Datadog Agent][2].                                                                                                              |
| `PROXY_PASSWORD`  | String | If using a proxy, sets your proxy password. [Learn more on using a proxy with the Datadog Agent][2].                                                                                                          |

Note: If a valid `datadog.yaml` is found and has an `API_KEY` configured, that file takes precedence over all specified command-line options.

## Agent Commands

The execution of the Agent is controlled by the Windows Service Control Manager.

{{< tabs >}}
{{% tab "Agent v6" %}}

There are a few major changes compared to older Datadog Windows Agent v5:

* The main executable name is now `agent.exe` (it was `ddagent.exe` previously)
* Commands should be run with the command line `"C:\Program Files\Datadog\Datadog Agent\embedded\agent.exe" <command>`
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

## Configuration

Use the Datadog Agent Manager located in the start menu to enable, disable, and configure checks. 
Restart the Agent in order for your changes to be applied.

{{< tabs >}}
{{% tab "Agent v6" %}}
The configuration files and folders for the Agent are located in:

* `C:\ProgramData\Datadog\datadog.yaml` 

Configuration files for [Integrations][1]:

* `C:\ProgramData\Datadog\conf.d\` 

OR

* `C:\Documents and Settings\All Users\Application Data\Datadog\conf.d\`


[1]: /integrations
{{% /tab %}}
{{% tab "Agent v5" %}}

The configuration files and folders for the Agent are located in:

* `C:\ProgramData\Datadog\datadog.conf`  

Configuration files for [Integrations][1]:

* `C:\ProgramData\Datadog\conf.d\` 

OR

* `C:\Documents and Settings\All Users\Application Data\Datadog\conf.d\`


[1]: /integrations
{{% /tab %}}
{{< /tabs >}}

## Troubleshooting
### Agent Status and Information

{{< tabs >}}
{{% tab "Agent v6" %}}

To check if the Agent is running, check if the `DatadogAgent` service in the Services panel is listed as *Started*. A process called *Datadog Metrics Agent* (`agent.exe`) should also exist in the Task Manager.

To receive more information about the Agent's state, start the Agent GUI by either:

- Right clicking on the Datadog Agent system tray icon -> Configure
- Or: running `& "C:\program files\datadog\datadog agent\embedded\agent.exe" launch-gui` from an admin Powershell prompt

Then, open the status page by going to *Status* -> *General*. Get more information on the checks that are running on the *Status* -> *Collector* page and the *Checks* -> *Summary* page.

It's also possible to run the status command directly using Powershell:

`& "C:\Program Files\Datadog\Datadog Agent\embedded\agent.exe" status`

or `cmd.exe`:

`"C:\Program Files\Datadog\Datadog Agent\embedded\agent.exe" status`


{{% /tab %}}
{{% tab "Agent v5" %}}

To check if the Agent is running, check if the service status in the Services panel is listed as "Started". A process called `ddagent.exe` should also exist in the Task Manager. To receive more information about the Agent's state, visit the _status page_ by going to *Settings -> Agent Status* in Agent version 5.2 and above and by going to `http://localhost:17125/status` in Agent version 3.9.1 to 5.1.

For 5.2 and later versions of the Agent go to the Datadog Agent *Manager->Settings->Agent Status*

{{< img src="agent/faq/windows_status.png" alt="Windows Status" responsive="true" style="width:50%;" >}}

It's also possible to run the info command using Powershell:

```
& "C:\Program Files\Datadog\Datadog Agent\embedded\python.exe" "C:\Program Files\Datadog\Datadog Agent\agent\agent.py" info
```

or cmd.exe:

```
"C:\Program Files\Datadog\Datadog Agent\embedded\python.exe" "C:\Program Files\Datadog\Datadog Agent\agent\agent.py" info
```

If you're running on a version older than 5.2 visit the status page in your web browser: `http://localhost:17125/status` The status page is supported in Agent version 3.9.1-5.1.1

{{% /tab %}}
{{< /tabs >}}

### Logs location

{{< tabs >}}
{{% tab "Agent v6" %}}

The Agent logs are located in the `C:\ProgramData\Datadog\logs` directory and all logs are in the `agent.log` file.

If you're still having trouble, [our support team][1] is glad to provide further assistance.


[1]: /help
{{% /tab %}}
{{% tab "Agent v5" %}}

For Windows Server 2008, Vista and newer, logs are available at `C:\ProgramData\Datadog\logs\ddagent.log` 

{{% /tab %}}
{{< /tabs >}}

### Send a flare
{{< tabs >}}
{{% tab "Agent v6" %}}

* Navigate to [http://127.0.0.1:5002][1] to [display the Agent GUI][2]

* Select flare tab

* Enter your ticket number (if you have one)

* Enter the email address you use to log in to Datadog

* Press Submit

{{< img src="agent/basic_agent_usage/windows/windows_flare_agent_6.png" alt="Windows flare with Agent 6" responsive="true" style="width:75%;">}}


[1]: http://127.0.0.1:5002
[2]: /agent/#using-the-gui
{{% /tab %}}
{{% tab "Agent v5" %}}

To send Datadog support a copy of your Windows logs and configurations, do the following:

* Open the Datadog Agent Manager

* Select Actions

* Select Flare

* Enter your ticket number (`<CASE_ID>`)—if you don't have one, leave the value as zero

* Lastly, enter the email address you use to log in to Datadog

{{< img src="agent/faq/windows_flare.jpg" alt="Windows Flare" responsive="true" style="width:70%;">}}

It's also possible to run the flare command using Powershell:

```
& "C:\Program Files\Datadog\Datadog Agent\embedded\python.exe" "C:\Program Files\Datadog\Datadog Agent\agent\agent.py" flare <CASE_ID>
```
or cmd.exe:
```
"C:\Program Files\Datadog\Datadog Agent\embedded\python.exe" "C:\Program Files\Datadog\Datadog Agent\agent\agent.py" flare <CASE_ID>
```

#### Flare Fails to Upload

On Linux and macOS, the output of the flare command tells you where the compressed flare archive is saved. In case the file fails to upload to Datadog, you can retrieve it from this directory and manually add as an attachment to an email.

For Windows, you can find the location of this file by running the following from the Agent's Python command prompt:

* Since Agent v5.12:
    `"C:\Program Files\Datadog\Datadog Agent\dist\shell.exe" since`

* On older Agent version:
    `"C:\Program Files (x86)\Datadog\Datadog Agent\files\shell.exe"`

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

First, to get the name of the service, open `services.msc` and locate your target service. Using DHCP as the target, you can see the service name at the top of the service properties window:

{{< img src="agent/faq/DHCP.png" alt="DHCP" responsive="true" style="width:75%;">}}

When adding your own services, be sure to follow the formatting exactly as shown - if formatting is not correct the Integration fails.

{{< img src="agent/faq/windows_DHCP_ service.png" alt="Windows DHCP Service" responsive="true" style="width:75%;">}}

Also, any time you modify an Integration you'll need to restart the Datadog Service. You can do this from services.msc or right from the UI via Actions.

For Services, Datadog doesn't track the metrics, only their availability. (For metrics you'll want to use [Process][3] or [WMI Integration][4]). To set up a Monitor, select the "Integration" then "Windows Service" monitor type. There you can "Pick Monitor Scope" and choose the service you would like to monitor.

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

The `system.load.*` metric is Unix-specific: it conveys the average amount of resources either waiting to use or currently using the CPU. Each process waiting to use or using the CPU increases the load number by 1. The number at the end of the metric name indicates the average number of these processes in the previous X minutes. For example, `system.load.5` is the average over the last 5 minutes. A value of 0 indicates a completely idle CPU, and a number equal to the number of CPU cores in the environment indicates that the CPU can handle every request coming in with no delay. Any number greater than this means that processes are waiting to use the CPU.

#### Where is System Load for Windows?

While Windows does not offer this exact metric, there is an equivalent option that's available by default in the system metrics: `system.proc.queue.length`. The `system.proc.queue.length` metric allows you to see the number of threads that are observed as delayed in the processor ready queue and are waiting to be executed.

### Monitoring Windows Processes

You can monitor Windows processes via the [process Integration][5]. To set this up on Windows, select the "Process" Integration from the list of Integrations in the Datadog Agent Manager and edit the configuration.

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
[2]: /agent/proxy
[3]: /#monitoring-windows-processes
[4]: /integrations/wmi
[5]: /integrations/process
