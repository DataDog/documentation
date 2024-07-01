---
title: Basic Agent Usage for Windows
description: "Basic functionality of the Datadog Agent on the Windows platform."
platform: Windows
aliases:
    - /guides/basic_agent_usage/windows/
further_reading:
- link: "/logs/"
  tag: "Documentation"
  text: "Collect your logs"
- link: "/infrastructure/process/"
  tag: "Documentation"
  text: "Collect your processes"
- link: "/tracing/"
  tag: "Documentation"
  text: "Collect your traces"
- link: "/agent/basic_agent_usage/#agent-architecture"
  tag: "Documentation"
  text: "Find out more about the Agent's architecture"
- link: "/agent/configuration/network#configure-ports"
  tag: "Documentation"
  text: "Configure inbound ports"
algolia:
  tags: ['uninstall', 'uninstalling']
---

## Setup

If you haven't installed the Datadog Agent yet, see below or the [in-app installation instructions][1]. See the Agent Supported Platforms documentation for [supported OS versions][2].

### Installation

The core and APM/trace components of the Windows Agent run under the `ddagentuser` account, which is created at install time. The Live Processes component, if enabled, runs under the `LOCAL_SYSTEM` account. Learn more about the [Datadog Windows Agent User][3].

See installation requirements and special considerations for installing the Datadog Agent on a [domain environment][4], [with a group policy][5], and more. 

{{< tabs >}}
{{% tab "GUI" %}}

1. Download the [Datadog Agent installer][1] to install the latest version of the Agent.

   <div class="alert alert-info">If you need to install a specific version of the Agent, see the <a href="https://ddagent-windows-stable.s3.amazonaws.com/installers_v2.json">installer list</a>.</div>

2. Run the installer by opening `datadog-agent-7-latest.amd64.msi`. When prompted, enter your Administrator credentials.
3. Follow the prompts, accept the license agreement, and enter your [Datadog API key][2].
4. When the install finishes, you are given the option to launch the Datadog Agent Manager.

[1]: https://s3.amazonaws.com/ddagent-windows-stable/datadog-agent-7-latest.amd64.msi
[2]: https://app.datadoghq.com/organization-settings/api-keys

{{% /tab %}}
{{% tab "Command line" %}}

To install the Agent with the command line:

1. Download the [Datadog Agent installer][1].
2. Open Command or Powershell prompt as **Administrator**.
3. Run one of the following commands inside the directory where you downloaded the installer.

**Command prompt**

```shell
start /wait msiexec /qn /i datadog-agent-7-latest.amd64.msi APIKEY="<YOUR_DATADOG_API_KEY>"
```

**PowerShell**

```powershell
Start-Process -Wait msiexec -ArgumentList '/qn /i datadog-agent-7-latest.amd64.msi APIKEY="<YOUR_DATADOG_API_KEY>"'
```

#### Installation Configuration Options 

Each of the following configuration options can be added as a property to the command line when installing the Agent on Windows. For additional Agent configuration options, see [more Agent configuration options](#more-agent-configuration-options).  


| Variable                                    | Type    | Description                                                                                                                                                                                                                         |
|----------------------------                 |---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `APIKEY`                                    | String  | Adds the Datadog API KEY to the configuration file.                                                                                                                                                                                 |
| `SITE`                                      | String  | Set the Datadog intake site, for example: `SITE=`{{< region-param key="dd_site" code="true" >}}                                                                                                                                     |
| `TAGS`                                      | String  | Comma-separated list of tags to assign in the configuration file. Example: `TAGS="key_1:val_1,key_2:val_2"`                                                                                                                         |
| `HOSTNAME`                                  | String  | Configures the hostname reported by the Agent to Datadog (overrides any hostname calculated at runtime).                                                                                                                            |
| `DDAGENTUSER_NAME`                          | String  | Override the default `ddagentuser` username used during Agent installation _(v6.11.0+)_. [Learn more about the Datadog Windows Agent User][3].                                                                                      |
| `DDAGENTUSER_PASSWORD`                      | String  | Override the cryptographically secure password generated for the `ddagentuser` user during Agent installation _(v6.11.0+)_. Must be provided for installs on domain servers. [Learn more about the Datadog Windows Agent User][3].  |
| `APPLICATIONDATADIRECTORY`                  | Path    | Override the directory to use for the configuration file directory tree. May only be provided on initial install; not valid for upgrades. Default: `C:\ProgramData\Datadog`. _(v6.11.0+)_                                           |
| `PROJECTLOCATION`                           | Path    | Override the directory to use for the binary file directory tree. May only be provided on initial install; not valid for upgrades. Default: `%ProgramFiles%\Datadog\Datadog Agent`. _(v6.11.0+)_                                    |

**Notes**

- The `/qn` option runs a quiet install. To see the GUI prompts, remove it.
- Some Agent versions may cause a forced reboot. To prevent this, add the parameter: `REBOOT=ReallySuppress`.
- Some Agent components require a kernel driver to collect data. To know if a kernel driver is required for your component, see its documentation page or search for `kernel driver` in the associated Agent configuration files.
- If a valid `datadog.yaml` is found, that file takes precedence over all specified command line options.

### More Agent configuration options

Each of the following configuration options can be added as a property to the command line when installing the Agent on Windows. 

**Note**: If a valid `datadog.yaml` is found, that file takes precedence over all specified command line options.


| Variable                                    | Type    | Description                                                                                                                                                                                                                         |
|----------------------------                 |---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `LOGS_ENABLED`                              | String  | Enable (`"true"`) or disable (`"false"`) the log collection feature in the configuration file. Logs are disabled by default.                                                                                                        |
| `APM_ENABLED`                               | String  | Enable (`"true"`) or disable (`"false"`) the APM Agent in the configuration file. APM is enabled by default.                                                                                                                        |
| `PROCESS_ENABLED`                           | String  | Enable (`"true"`) or disable (`"false"`) the Process Agent in the configuration file. The Process Agent is disabled by default.                                                                                                     |
| `HOSTNAME_FQDN_ENABLED`                     | String  | Enable (`"true"`) or disable (`"false"`) the usage of FQDN for the Agent hostname. It is equivalent to set `hostname_fqdn` in the Agent configuration file. The usage of FQDN for the hostname is disabled by default. _(v6.20.0+)_ |
| `CMD_PORT`                                  | Number  | A valid port number between 0 and 65534. The Datadog Agent exposes a command API on port 5001. If that port is already in use by another program, the default may be overridden here.                                               |
| `PROXY_HOST`                                | String  | If using a proxy, sets your proxy host. [Learn more about using a proxy with the Datadog Agent][2].                                                                                                                                 |
| `PROXY_PORT`                                | Number  | If using a proxy, sets your proxy port. [Learn more about using a proxy with the Datadog Agent][2].                                                                                                                                 |
| `PROXY_USER`                                | String  | If using a proxy, sets your proxy user. [Learn more about using a proxy with the Datadog Agent][2].                                                                                                                                 |
| `PROXY_PASSWORD`                            | String  | If using a proxy, sets your proxy password. For the process/container Agent, this variable is required for passing in an authentication password and cannot be renamed. [Learn more about using a proxy with the Datadog Agent][2]. |
| `EC2_USE_WINDOWS_PREFIX_DETECTION`          | Boolean | Use the EC2 instance id for Windows hosts on EC2. _(v7.28.0+)_                                                                                                                                                                      |
| [DEPRECATED] `ADDLOCAL` | String | Enable additional agent component. Setting to `"MainApplication,NPM"` causes the driver component for [Network Performance Monitoring][4] to be installed. _(version 7.44.0 and previous)_ |


[1]: https://s3.amazonaws.com/ddagent-windows-stable/datadog-agent-7-latest.amd64.msi
[2]: /agent/configuration/proxy/
[3]: /agent/faq/windows-agent-ddagent-user/
[4]: /network_monitoring/performance
{{% /tab %}}
{{% tab "Upgrading" %}}

Agent 7 only supports Python 3. Before upgrading, confirm that your custom checks are compatible with Python 3. See the [Python 3 Custom Check Migration][1] guide for more information. If you're not using custom checks or have already confirmed their compatibility, upgrade using the [GUI](?tab=gui) or [Command line](?tab=commandline) instructions.

If you're upgrading from a Datadog Agent version < 5.12.0, first upgrade to a more recent version of Agent 5 (>= 5.12.0 but < 6.0.0) using the [EXE installer][2] and then upgrade to Datadog Agent version >= 6.

[1]: /agent/guide/python-3/
[2]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-latest.exe
{{% /tab %}}
{{< /tabs >}}

### Installation log files

You can find Agent installation log files at `%TEMP%\MSI*.LOG`.

### Validation

To verify your installation, follow the instructions in the [Agent Status and Information](#agent-status-and-information) section.

## Agent commands

The execution of the Agent is controlled by the Windows Service Control Manager.

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

* The main executable name is `agent.exe`. The location is as follows depending on the Agent version:
    - Agent versions <= 6.11: `"C:\Program Files\Datadog\Datadog Agent\embedded\agent.exe"`
    - Agent versions >= 6.12: `"C:\Program Files\Datadog\Datadog Agent\bin\agent.exe"`
* The configuration GUI is a browser-based configuration application (for Windows 64-bit only).
* Commands can be run from the an **elevated(run as Admin)** command line (PowerShell or Command Prompt) using the syntax `<PATH_TO_AGENT.EXE> <COMMAND>`.
* Command-line options are below:

| Command         | Description                                                                      |
|-----------------|----------------------------------------------------------------------------------|
| check           | Runs the specified check.                                                        |
| diagnose        | Executes some connectivity diagnosis on your system.                             |
| flare           | Collects a flare and send it to Datadog.                                         |
| help            | Gets help about any command.                                                     |
| hostname        | Prints the hostname used by the Agent.                                           |
| import          | Imports and converts configuration files from previous versions of the Agent.    |
| launch-gui      | Starts the Datadog Agent Manager.                                                |
| restart-service | Restarts the Agent within the service control manager.                           |
| run             | Starts the Agent.                                                                |
| start           | Starts the Agent. (Being deprecated, but accepted. Use `run` as an alternative.) |
| start-service   | Starts the Agent within the service control manager.                             |
| status          | Print the current status.                                                        |
| stopservice     | Stops the Agent within the service control manager.                              |
| version         | Prints the version info.                                                         |

* Examples:
  - PowerShell (`powershell.exe`)

    ```powershell
    & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
    & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" launch-gui
    & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" flare
    ```

  - Command Prompt (`cmd.exe`)

    ```cmd
    "%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" status
    "%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" launch-gui
    "%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" flare
    ```

{{% /tab %}}
{{% tab "Agent v5" %}}

Use the Datadog Agent Manager (available from the start menu).

{{< img src="agent/basic_agent_usage/windows/windows-start-menu.png" alt="windows Start Menu" style="width:75%;">}}

Use the `start`, `stop`, and `restart` commands in the Datadog Agent Manager:

{{< img src="agent/basic_agent_usage/windows/manager-snapshot.png" alt="Manager snapshot" style="width:75%;">}}

You can also use Windows PowerShell, where available:
`[start|stop|restart]-service datadogagent`

{{% /tab %}}
{{< /tabs >}}

## Configuration

Use the [Datadog Agent Manager][6] to enable, disable, and configure checks. Restart the Agent for your changes to be applied.

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}
The main Agent configuration file is located at:
`C:\ProgramData\Datadog\datadog.yaml`
{{% /tab %}}
{{% tab "Agent v5" %}}

The main Agent configuration file is located at:
`C:\ProgramData\Datadog\datadog.conf`
{{% /tab %}}
{{< /tabs >}}

Configuration files for integrations are in:
`C:\ProgramData\Datadog\conf.d\` OR
`C:\Documents and Settings\All Users\Application Data\Datadog\conf.d\`

**Note**: `ProgramData` is a hidden folder.

## Uninstall the Agent

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

There are two different methods to uninstall the Agent on Windows. Both methods remove the Agent, but do not remove the `C:\ProgramData\Datadog` configuration folder on the host.

### Add or remove programs

1. Press **CTRL** and **Esc** or use the Windows key to run Windows Search.
1. Search for `add` and click **Add or remove programs**.
1. Search for `Datadog Agent` and click **Uninstall**.

### PowerShell

**Note:** Enable WinRM to use the commands below.

Use the following PowerShell command to uninstall the Agent without rebooting:

{{< code-block lang="powershell" >}}
$productCode = (@(Get-ChildItem -Path "HKLM:SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall" -Recurse) | Where {$_.GetValue("DisplayName") -like "Datadog Agent" }).PSChildName
start-process msiexec -Wait -ArgumentList ('/log', 'C:\uninst.log', '/q', '/x', "$productCode", 'REBOOT=ReallySuppress')
{{< /code-block >}}

{{% /tab %}}

{{% tab "Agent v5" %}}

There are two different methods to uninstall the Agent on Windows. Both methods remove the Agent, but do not remove the `C:\ProgramData\Datadog` configuration folder on the host.

> **Note**: For Agent < v5.12.0, it's important to uninstall the Agent with the **original account** used to install the Agent, otherwise it may not be cleanly removed.

### Add or remove programs

1. Press **CTRL** and **Esc** or use the Windows key to run Windows Search.
1. Search for `add` and click **Add or remove programs**.
1. Search for `Datadog Agent` and click **Uninstall**.

### PowerShell

**Note:** Enable WinRM to use the commands below.

Use the following PowerShell command to uninstall the Agent without rebooting:

```powershell
start-process msiexec -Wait -ArgumentList ('/log', 'C:\uninst.log', '/norestart', '/q', '/x', (Get-CimInstance -ClassName Win32_Product -Filter "Name='Datadog Agent'" -ComputerName .).IdentifyingNumber)
```

{{% /tab %}}
{{< /tabs >}}

## Troubleshooting

### Agent status and information

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

To verify the Agent is running, check if the `DatadogAgent` service in the Services panel is listed as *Started*. A process called *Datadog Metrics Agent* (`agent.exe`) should also exist in the Task Manager.

To receive more information about the Agent's state, start the Datadog Agent Manager:

* Right click on the Datadog Agent system tray icon -> Configure, or
* Run `launch-gui` command from an **elevated(run as Admin)** command line
    - PowerShell: `& "<PATH_TO_AGENT.EXE>" launch-gui`
    - cmd: `"<PATH_TO_AGENT.EXE>" launch-gui`

Then, open the status page by going to *Status* -> *General*.
Get more information on running checks in *Status* -> *Collector* and *Checks* -> *Summary*.

The status command is available for PowerShell:

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
```

or cmd.exe:

```cmd
"%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" status
```

{{% /tab %}}
{{% tab "Agent v5" %}}

To verify the Agent is running, check if the service status in the Services panel is listed as "Started". A process called `ddagent.exe` should also exist in the Task Manager.

Information about the Agent's state for Agent v5.2+ is available in the
*Datadog Agent Manager -> Settings -> Agent Status*:

{{< img src="agent/faq/windows_status.png" alt="Windows Status" style="width:50%;" >}}

For the status of Agent v3.9.1 to v5.1, navigate to `http://localhost:17125/status`.

The info command is available for PowerShell:

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\embedded<PYTHON_MAJOR_VERSION>\python.exe" "$env:ProgramFiles\Datadog\Datadog Agent\agent\agent.py" info
```

or cmd.exe:

```
"%ProgramFiles%\Datadog\Datadog Agent\embedded<PYTHON_MAJOR_VERSION>\python.exe" "%ProgramFiles%\Datadog\Datadog Agent\agent\agent.py" info
```

**Note**: For Agent versions <= 6.11 the path should be `%ProgramFiles%\Datadog\Datadog Agent\embedded\python.exe` instead.

{{% /tab %}}
{{< /tabs >}}

### Logs location

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

The Agent logs are located in `C:\ProgramData\Datadog\logs\agent.log`.

**Note**: `ProgramData` is a hidden folder.

Need help? Contact [Datadog support][1].

[1]: /help/
{{% /tab %}}
{{% tab "Agent v5" %}}

For Windows Server 2008, Vista, and newer systems, the Agent logs are located in `C:\ProgramData\Datadog\logs`.

**Note**: `ProgramData` is a hidden folder.

Need help? Contact [Datadog support][1].

[1]: /help/
{{% /tab %}}
{{< /tabs >}}

### Send a flare

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

* Navigate to [http://127.0.0.1:5002][1] to display the Datadog Agent Manager.

* Select flare tab.

* Enter your ticket number (if you have one).

* Enter the email address you use to log in to Datadog.

* Press Submit.

The flare command is available for PowerShell:

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" flare <CASE_ID>
```

or cmd.exe:

```cmd
"%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" flare <CASE_ID>
```

{{< img src="agent/basic_agent_usage/windows/windows_flare_agent_6.png" alt="Windows flare with Agent 6" style="width:75%;">}}

[1]: http://127.0.0.1:5002
{{% /tab %}}
{{% tab "Agent v5" %}}

To send Datadog support a copy of your Windows logs and configurations, do the following:

* Open the Datadog Agent Manager.

* Select Actions.

* Select Flare.

* Enter your ticket number (if you don't have one, leave the value as zero).

* Enter the email address you use to log in to Datadog.

{{< img src="agent/faq/windows_flare.jpg" alt="Windows Flare" style="width:70%;">}}

The flare command is available for PowerShell:

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\embedded\python.exe" "$env:ProgramFiles\Datadog\Datadog Agent\agent\agent.py" flare <CASE_ID>
```

or cmd.exe:

```
"%ProgramFiles%\Datadog\Datadog Agent\embedded\python.exe" "%ProgramFiles%\Datadog\Datadog Agent\agent\agent.py" flare <CASE_ID>
```

#### Flare fails to upload

The output of the flare command tells you where the compressed flare archive is saved. In case the file fails to upload to Datadog, you can retrieve it from this directory and manually add as an attachment to an email. Common locations flare files are stored:
- Linux: `\tmp\`
- MacOS: `$TMPDIR`
- Windows: `C:\Users\<DDAGENTUSER>\AppData\Local\Temp\`

For older Agent versions on Windows, you can find the location of this file by running the following from the Agent's Python command prompt:

**Step 1**:

* Agent v5.12+:
    `"%ProgramFiles%\Datadog\Datadog Agent\dist\shell.exe" since`

* Older Agent versions:
    `"%ProgramFiles%\Datadog\Datadog Agent\files\shell.exe"`

**Step 2**:

```python
import tempfile
print tempfile.gettempdir()
```

Example:

{{< img src="agent/faq/flare_fail.png" alt="Flare Fail" style="width:70%;">}}

{{% /tab %}}
{{< /tabs >}}

## Use cases

###  Monitoring a Windows service

On your target host, launch the Datadog Agent Manager and select the "Windows Service" integration from the list. There is an out-of-the-box example; however, this example uses DHCP.

To get the name of the service, open `services.msc` and locate your target service. Using DHCP as the target, you can see the service name at the top of the service properties window:

{{< img src="agent/faq/DHCP.png" alt="DHCP" style="width:75%;">}}

When adding your own services, be sure to follow the formatting exactly as shown. If formatting is not correct the integration fails. **Note**: Special characters in a service name must be escaped. For example, the name `MSSQL$BILLING` can be added with `MSSQL\$BILLING`.

{{< img src="agent/faq/windows_DHCP_service.png" alt="Windows DHCP Service" style="width:75%;">}}

Also, whenever you modify an integration, the Datadog service needs to be restarted. You can do this from services.msc or from the UI sidebar.

For Services, Datadog doesn't track the metrics—only their availability. (For metrics, use the [Process](#monitoring-windows-processes) or [WMI][7] integration). To set up a Monitor, select the [Integration monitor type][8] then search for **Windows Service**. From *Integration Status -> Pick Monitor Scope*, choose the service you would like to monitor.

### Monitoring system load for Windows

The Datadog Agent collects a large number of system metrics by default. The most commonly used system metrics are `system.load.*` but these metrics are **Unix** specific.

While Windows does not offer the `system.load.*` metrics, an equivalent option that's available by default is `system.proc.queue.length`. This metric shows the number of threads observed as delayed in the processor ready queue that are waiting to be executed.

### Monitoring Windows processes

You can monitor Windows processes with [Live Process Monitoring][9]. To enable this on Windows, edit the [Agent main configuration file][10] by setting the following parameter to true:

`datadog.yaml`:

```yaml
process_config:
  enabled: "true"
```

After configuration is complete, [restart the Agent][11].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=windows
[2]: /agent/supported_platforms/?tab=windows
[3]: /agent/faq/windows-agent-ddagent-user/
[4]: /agent/guide/windows-agent-ddagent-user/#installation-in-a-domain-environment
[5]: /agent/guide/windows-agent-ddagent-user/#installation-with-group-policy
[6]: /agent/guide/datadog-agent-manager-windows/
[7]: /integrations/wmi_check/
[8]: https://app.datadoghq.com/monitors#create/integration
[9]: /infrastructure/process/?tab=linuxwindows#installation
[10]: /agent/configuration/agent-configuration-files/#agent-main-configuration-file
[11]: /agent/configuration/agent-commands/#restart-the-agent
