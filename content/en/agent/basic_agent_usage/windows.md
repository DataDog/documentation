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

## Setup
If you haven't installed the Datadog Agent yet, see below or the [in-app installation instructions][1]. See the Agent documentation for [supported OS versions][2].

### Installation
Starting with **Agent v6.11.0**, the core and APM/trace components of the Windows Agent run under the `ddagentuser` account created at install time instead of the `LOCAL_SYSTEM` account. The Live Process component, if enabled, runs under the `LOCAL_SYSTEM` account. Learn more about the [Datadog Windows Agent User][3].

**Note**: There are special considerations for [domain controllers][4].

#### GUI

1. Download the [Datadog Agent installer][5].
2. Run the installer (as **Administrator**) by opening `ddagent-cli-6.13.0.msi`.
3. Follow the prompts, accept the license agreement, and enter your [Datadog API key][6].
4. When the install finishes, you are given the option to launch the Datadog Agent Manager.

#### Command line
Optionally, install the Agent with the command line to add custom settings.

1. Download the [Datadog Agent installer][5].
2. Run one of the following commands inside the directory where you downloaded the installer.  
   **Note**: The `/qn` option runs a quiet install. To see the GUI prompts, remove it.

Command prompt:
```cmd
start /wait msiexec /qn /i ddagent-cli-6.13.0.msi APIKEY="<YOUR_DATADOG_API_KEY>"
```

Powershell:
```powershell
Start-Process -Wait msiexec -ArgumentList '/qn /i ddagent-cli-6.13.0.msi APIKEY="<YOUR_DATADOG_API_KEY>"'
```

Each configuration item is added as a property to the command line. The following configuration command line options are available when installing the Agent on Windows:

| Variable                   | Type   | Description                                                                                                                                                                                                                        |
|----------------------------|--------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `APIKEY`                   | String | Adds the Datadog API KEY to the configuration file.                                                                                                                                                                                |
| `TAGS`                     | String | Comma-separated list of tags to assign in the configuration file. Example: `TAGS="key_1:val_1,key_2:val_2"`                                                                                                                        |
| `HOSTNAME`                 | String | Configures the hostname reported by the Agent to Datadog (overrides any hostname calculated at runtime).                                                                                                                           |
| `LOGS_ENABLED`             | String | Enable (`"true"`) or disable (`"false"`) the log collection feature in the configuration file. Logs are disabled by default.                                                                                                       |
| `APM_ENABLED`              | String | Enable (`"true"`) or disable (`"false"`) the APM Agent in the configuration file. APM is enabled by default.                                                                                                                       |
| `PROCESS_ENABLED`          | String | Enable (`"true"`) or disable (`"false"`) the Process Agent in the configuration file. The Process Agent is disabled by default.                                                                                                    |
| `CMD_PORT`                 | Number | A valid port number between 0 and 65534. The Datadog Agent exposes a command API on port 5001. If that port is already in use by another program, the default may be overridden here.                                              |
| `PROXY_HOST`               | String | If using a proxy, sets your proxy host. [Learn more about using a proxy with the Datadog Agent][7].                                                                                                                                |
| `PROXY_PORT`               | Number | If using a proxy, sets your proxy port. [Learn more about using a proxy with the Datadog Agent][7].                                                                                                                                |
| `PROXY_USER`               | String | If using a proxy, sets your proxy user. [Learn more about using a proxy with the Datadog Agent][7].                                                                                                                                |
| `PROXY_PASSWORD`           | String | If using a proxy, sets your proxy password. For the process/container Agent, this variable is required for passing in an authentication password and cannot be renamed. [Learn more about using a proxy with the Datadog Agent][7].                                                                                                                            |
| `DDAGENTUSER_NAME`         | String | Override the default `ddagentuser` username used during Agent installation _(v6.11.0+)_. [Learn more about the Datadog Windows Agent User][3].                                                                                     |
| `DDAGENTUSER_PASSWORD`     | String | Override the cryptographically secure password generated for the `ddagentuser` user during Agent installation _(v6.11.0+)_. Must be provided for installs on domain servers. [Learn more about the Datadog Windows Agent User][3]. |
| `APPLICATIONDATADIRECTORY` | Path   | Override the directory to use for the configuration file directory tree. May only be provided on initial install; not valid for upgrades. Default: `C:\ProgramData\Datadog`. _(v6.11.0+)_                                          |
| `PROJECTLOCATION`          | Path   | Override the directory to use for the binary file directory tree. May only be provided on initial install; not valid for upgrades. Default: `%PROGRAMFILES%\Datadog\Datadog Agent`. _(v6.11.0+)_                                 |

**Note**: If a valid `datadog.yaml` is found and has an API key configured, that file takes precedence over all specified command line options.

### Validation
To verify your installation, follow the instructions in the [Agent Status and Information](#agent-status-and-information) section.

## Agent Commands

The execution of the Agent is controlled by the Windows Service Control Manager.

{{< tabs >}}
{{% tab "Agent v6" %}}

* The main executable name is `agent.exe`.
* The configuration GUI is a browser-based configuration application (for Windows 64-bit only).
* Commands can be run from the command line `"%PROGRAMFILES%\Datadog\Datadog Agent\bin\agent.exe" <command>` for Agent versions >= 6.12 or `"%PROGRAMFILES%\Datadog\Datadog Agent\embedded\agent.exe" <command>` for Agent versions <= 6.11. Command-line options are below:

| Command         | Description                                                                      |
|-----------------|----------------------------------------------------------------------------------|
| check           | Runs the specified check.                                                        |
| diagnose        | Executes some connectivity diagnosis on your system.                             |
| flare           | Collects a flare and send it to Datadog.                                         |
| help            | Gets help about any command.                                                     |
| hostname        | Prints the hostname used by the Agent.                                           |
| import          | Imports and converts configuration files from previous versions of the Agent.    |
| installservice  | Installs the Agent within the service control manager.                           |
| launch-gui      | Starts the Datadog Agent Manager.                                                |
| regimport       | Import the registry settings into `datadog.yaml`.                                |
| remove-service  | Removes the Agent from the service control manager.                              |
| restart-service | Restarts the Agent within the service control manager.                           |
| run             | Starts the Agent.                                                                |
| start           | Starts the Agent. (Being deprecated, but accepted. Use `run` as an alternative.) |
| start-service   | Starts the Agent within the service control manager.                             |
| status          | Print the current status.                                                        |
| stopservice     | Stops the Agent within the service control manager.                              |
| version         | Prints the version info.                                                         |

{{% /tab %}}
{{% tab "Agent v5" %}}

Use the Datadog Agent Manager (available from the start menu).

{{< img src="agent/basic_agent_usage/windows/windows-start-menu.png" alt="windows Start Menu" responsive="true" style="width:75%;">}}

Use the `start`, `stop`, and `restart` commands in the Datadog Agent Manager:

{{< img src="agent/basic_agent_usage/windows/manager-snapshot.png" alt="Manager snapshot" responsive="true" style="width:75%;">}}

You can also use Windows Powershell, where available:
`[start|stop|restart]-service datadogagent`

{{% /tab %}}
{{< /tabs >}}

## Configuration

Use the [Datadog Agent Manager][8] to enable, disable, and configure checks. Restart the Agent for your changes to be applied.

{{< tabs >}}
{{% tab "Agent v6" %}}
The main Agent configuration file is located at:  
`C:\ProgramData\Datadog\datadog.yaml`

Configuration files for [integrations][1] are in:  
`C:\ProgramData\Datadog\conf.d\` OR  
`C:\Documents and Settings\All Users\Application Data\Datadog\conf.d\`

**Note**: `ProgramData` is a hidden folder.

[1]: /integrations
{{% /tab %}}
{{% tab "Agent v5" %}}

The main Agent configuration file is located at:  
`C:\ProgramData\Datadog\datadog.conf`

Configuration files for [integrations][1] are in:  
`C:\ProgramData\Datadog\conf.d\` OR  
`C:\Documents and Settings\All Users\Application Data\Datadog\conf.d\`

**Note**: `ProgramData` is a hidden folder.

[1]: /integrations
{{% /tab %}}
{{< /tabs >}}

## Troubleshooting
### Agent Status and Information

{{< tabs >}}
{{% tab "Agent v6" %}}

To verify the Agent is running, check if the `DatadogAgent` service in the Services panel is listed as *Started*. A process called *Datadog Metrics Agent* (`agent.exe`) should also exist in the Task Manager.

To receive more information about the Agent's state, start the Datadog Agent Manager:

* Right click on the Datadog Agent system tray icon -> Configure, or
* Run  `& "%PROGRAMFILES%\Datadog\Datadog Agent\bin\agent.exe" launch-gui` for agent version >= 6.12 or `& "%PROGRAMFILES%\Datadog\Datadog Agent\embedded\agent.exe" launch-gui` for agent version <= 6.11 from an admin Powershell prompt

Then, open the status page by going to *Status* -> *General*.
Get more information on running checks in *Status* -> *Collector* and *Checks* -> *Summary*.

The status command is available for Powershell:
```powershell
& "%PROGRAMFILES%\Datadog\Datadog Agent\embedded\agent.exe" status
```

or cmd.exe:
```cmd
"%PROGRAMFILES%\Datadog\Datadog Agent\embedded\agent.exe" status
```

{{% /tab %}}
{{% tab "Agent v5" %}}

To verify the Agent is running, check if the service status in the Services panel is listed as "Started". A process called `ddagent.exe` should also exist in the Task Manager.

Information about the Agent's state for Agent v5.2+ is available in the
*Datadog Agent Manager -> Settings -> Agent Status*:

{{< img src="agent/faq/windows_status.png" alt="Windows Status" responsive="true" style="width:50%;" >}}

For the status of Agent v3.9.1 to v5.1, navigate to `http://localhost:17125/status`.

The info command is available for Powershell:

```
& "%PROGRAMFILES%\Datadog\Datadog Agent\embedded<PYTHON_MAJOR_VERSION>\python.exe" "%PROGRAMFILES%\Datadog\Datadog Agent\agent\agent.py" info
```

or cmd.exe:

```
"%PROGRAMFILES%\Datadog\Datadog Agent\embedded<PYTHON_MAJOR_VERSION>\python.exe" "%PROGRAMFILES%\Datadog\Datadog Agent\agent\agent.py" info
```

**Note**: For Agent versions <= 6.11 the path should be `%PROGRAMFILES%\Datadog\Datadog Agent\embedded\python.exe` instead.


{{% /tab %}}
{{< /tabs >}}

### Logs location

{{< tabs >}}
{{% tab "Agent v6" %}}

The Agent logs are located in `C:\ProgramData\Datadog\logs\agent.log`.

**Note**: `ProgramData` is a hidden folder.

Need help? Contact [Datadog support][1].

[1]: /help
{{% /tab %}}
{{% tab "Agent v5" %}}

For Windows Server 2008, Vista, and newer systems, the Agent logs are located in `C:\ProgramData\Datadog\logs`.

**Note**: `ProgramData` is a hidden folder.

Need help? Contact [Datadog support][1].

[1]: /help
{{% /tab %}}
{{< /tabs >}}

### Send a flare
{{< tabs >}}
{{% tab "Agent v6" %}}

* Navigate to [http://127.0.0.1:5002][1] to display the Datadog Agent Manager.

* Select flare tab.

* Enter your ticket number (if you have one).

* Enter the email address you use to log in to Datadog.

* Press Submit.

{{< img src="agent/basic_agent_usage/windows/windows_flare_agent_6.png" alt="Windows flare with Agent 6" responsive="true" style="width:75%;">}}

[1]: http://127.0.0.1:5002
{{% /tab %}}
{{% tab "Agent v5" %}}

To send Datadog support a copy of your Windows logs and configurations, do the following:

* Open the Datadog Agent Manager.

* Select Actions.

* Select Flare.

* Enter your ticket number (if you don't have one, leave the value as zero).

* Enter the email address you use to log in to Datadog.

{{< img src="agent/faq/windows_flare.jpg" alt="Windows Flare" responsive="true" style="width:70%;">}}

The flare command is available for Powershell:

```
& "%PROGRAMFILES%\Datadog\Datadog Agent\embedded\python.exe" "%PROGRAMFILES%\Datadog\Datadog Agent\agent\agent.py" flare <CASE_ID>
```
or cmd.exe:
```
"%PROGRAMFILES%\Datadog\Datadog Agent\embedded\python.exe" "%PROGRAMFILES%\Datadog\Datadog Agent\agent\agent.py" flare <CASE_ID>
```

#### Flare fails to upload

On Linux and macOS, the output of the flare command tells you where the compressed flare archive is saved. In case the file fails to upload to Datadog, you can retrieve it from this directory and manually add as an attachment to an email.

For Windows, you can find the location of this file by running the following from the Agent's Python command prompt:

**Step 1**:

* Agent v5.12+:
    `"%PROGRAMFILES%\Datadog\Datadog Agent\dist\shell.exe" since`

* Older Agent versions:
    `"%PROGRAMFILES%\Datadog\Datadog Agent\files\shell.exe"`

**Step 2**:

```
import tempfile
print tempfile.gettempdir()
```

Example:

{{< img src="agent/faq/flare_fail.png" alt="Flare Fail" responsive="true" style="width:70%;">}}

{{% /tab %}}
{{< /tabs >}}

## Use Cases
###  Monitoring a Windows Service

On your target host, launch the Datadog Agent Manager and select the "Windows Service" Integration from the list. For this, there is an out-of-the-box example; however, this example uses DHCP.

To get the name of the service, open `services.msc` and locate your target service. Using DHCP as the target, you can see the service name at the top of the service properties window:

{{< img src="agent/faq/DHCP.png" alt="DHCP" responsive="true" style="width:75%;">}}

When adding your own services, be sure to follow the formatting exactly as shown. If formatting is not correct the integration fails.

{{< img src="agent/faq/windows_DHCP_service.png" alt="Windows DHCP Service" responsive="true" style="width:75%;">}}

Also, whenever you modify an integration, the Datadog service needs to be restarted. You can do this from services.msc or from the UI sidebar.

For Services, Datadog doesn't track the metrics—only their availability. (For metrics, use the [Process][9] or [WMI][10] integration). To set up a Monitor, select the [Integration monitor type][11] then search for **Windows Service**. From *Integration Status -> Pick Monitor Scope*, choose the service you would like to monitor.

### Monitoring system load for Windows

The Datadog Agent collects a large number of system metrics out of the box. One of the more commonly used system metrics is `system.load.*`.

| Metric                      | Description                                                                    |
|-----------------------------|--------------------------------------------------------------------------------|
| system.load.1 (gauge)       | The average system load over one minute.                                       |
| system.load.15 (gauge)      | The average system load over fifteen minutes.                                  |
| system.load.5 (gauge)       | The average system load over five minutes.                                     |
| system.load.norm.1 (gauge)  | The average system load over one minute normalized by the number of CPUs.      |
| system.load.norm.15 (gauge) | The average system load over fifteen minutes normalized by the number of CPUs. |
| system.load.norm.5 (gauge)  | The average system load over five minutes normalized by the number of CPUs.    |

The `system.load.*` metric is **Unix** specific: it conveys the average amount of resources either waiting to use or currently using the CPU. Each process waiting to use or using the CPU increases the load number by 1. The number at the end of the metric name indicates the average number of these processes in the previous X minutes. For example, `system.load.5` is the average over the last 5 minutes. A value of 0 indicates a completely idle CPU, and a number equal to the number of CPU cores in the environment indicates that the CPU can handle every request coming in with no delay. Any number greater than this means that processes are waiting to use the CPU.

#### Where is System Load for Windows?

While Windows does not offer this exact metric, there is an equivalent option that's available by default in the system metrics: `system.proc.queue.length`. The `system.proc.queue.length` metric allows you to see the number of threads that are observed as delayed in the processor ready queue and are waiting to be executed.

### Monitoring Windows Processes

You can monitor Windows processes with [Live Process Monitoring][12]. To enable this on Windows, edit the [Agent main configuration file][13] by setting the following parameter to true:

`datadog.yaml`:
```yaml
process_config:
  enabled: "true"
```

After configuration is complete, [restart the Agent][14].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/windows
[2]: /agent/basic_agent_usage/#supported-os-versions
[3]: /agent/faq/windows-agent-ddagent-user
[4]: /agent/faq/windows-agent-ddagent-user/#installation-in-a-domain-environment
[5]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-6.13.0.msi
[6]: https://app.datadoghq.com/account/settings#api
[7]: /agent/proxy
[8]: /agent/guide/datadog-agent-manager-windows
[9]: /#monitoring-windows-processes
[10]: /integrations/wmi
[11]: https://app.datadoghq.com/monitors#create/integration
[12]: /graphing/infrastructure/process/?tab=linuxwindows#installation
[13]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[14]: /agent/guide/agent-commands/#restart-the-agent
