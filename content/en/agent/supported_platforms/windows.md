---
title: Windows
description: "Basic functionality of the Datadog Agent on the Windows platform."
platform: Windows
aliases:
    - /guides/basic_agent_usage/windows/
    - /agent/basic_agent_usage/windows/
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
- link: "/agent/architecture/#agent-architecture"
  tag: "Documentation"
  text: "Find out more about the Agent's architecture"
- link: "/agent/configuration/network#configure-ports"
  tag: "Documentation"
  text: "Configure inbound ports"
- link: "/agent/guide/windows-agent-ddagent-user"
  tag: "Documentation"
  text: "Learn more about the Datadog Windows Agent User"
algolia:
  tags: ['install', 'installing', 'uninstall', 'uninstalling', 'windows']
---

## Overview

This page outlines the basic features of the Datadog Agent for Windows. If you haven't installed the Agent yet, see the installation instructions below or [follow the instructions in the app][1].

See [Supported Platforms][15] for the complete list of supported Windows versions.

## Installation

To install the Datadog Agent on your Windows hosts, follow the [guided in-app flow within Fleet Automation][16], then copy and run the installation command. The Datadog Agents run under the `ddagentuser`. See [Datadog Windows Agent User][17] documentation for more information.


{{< img src="/agent/basic_agent_usage/windows_img2_july_25.png" alt="In-app installation steps for the Datadog Agent on a Windows host." style="width:90%;">}}


## Alternative installation methods

### Install with the Agent Manager GUI

<div class="alert alert-info">The default installation location for the Agent is <code>%ProgramFiles%\Datadog\Datadog Agent</code>. If you choose to use a custom installation location, ensure that you specify a <code>Datadog</code> subdirectory for the Datadog files.</div>

1. Download the [Datadog Agent installer][400] to install the latest version of the Agent.
2. Run the installer by opening `datadog-agent-7-latest.amd64.msi`. When prompted, enter your Administrator credentials.
3. Follow the prompts, accept the license agreement, and enter your [Datadog API key][500].

When the install finishes, you are given the option to launch the Datadog Agent Manager.


#### Installation configuration options

Each of the following configuration options can be added as a property to the command line when installing the Agent on Windows. For additional Agent configuration options, see [more Agent configuration options](#more-agent-configuration-options).


| Variable                                    | Type    | Description                                                                                                                                                                                                                         |
|----------------------------                 |---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `APIKEY`                                    | String  | Adds the Datadog API KEY to the configuration file.                                                                                                                                                                                 |
| `SITE`   | String  | Set the Datadog intake site, for example: `SITE=datadoghq.com`     |
| `TAGS`                                      | String  | Comma-separated list of tags to assign in the configuration file. Example: `TAGS="key_1:val_1,key_2:val_2"`                                                                                                                         |
| `HOSTNAME`                                  | String  | Configures the hostname reported by the Agent to Datadog (overrides any hostname calculated at runtime).                                                                                                                            |
| `DDAGENTUSER_NAME`                          | String  | Override the default `ddagentuser` username used during Agent installation _(v6.11.0+)_. [Learn more about the Datadog Windows Agent User][3].                                                                                      |
| `DDAGENTUSER_PASSWORD`                      | String  | Override the cryptographically secure password generated for the `ddagentuser` user during Agent installation _(v6.11.0+)_. Must be provided for installs on domain servers. [Learn more about the Datadog Windows Agent User][3].  |
| `APPLICATIONDATADIRECTORY`                  | Path    | Override the directory to use for the configuration file directory tree. May only be provided on initial install; not valid for upgrades. Default: `C:\ProgramData\Datadog`. _(v6.11.0+)_                                           |
| `PROJECTLOCATION`                           | Path    | Override the directory to use for the binary file directory tree. May only be provided on initial install; not valid for upgrades. Default: `%ProgramFiles%\Datadog\Datadog Agent`. _(v6.11.0+)_<br><br>If you choose to override the default directory, ensure that you specify a `Datadog` subdirectory for the Datadog files.                                    |

**Notes**

- The `/qn` option runs a quiet install. To see the GUI prompts, remove it.
- Some Agent versions may cause a forced reboot. To prevent this, add the parameter: `REBOOT=ReallySuppress`.
- Some Agent components require a kernel driver to collect data. To know if a kernel driver is required for your component, see its documentation page or search for `kernel driver` in the associated Agent configuration files.
- If a valid `datadog.yaml` is found, that file takes precedence over all specified command line options.

#### More Agent configuration options

Each of the following configuration options can be added as a property to the command line when installing the Agent on Windows.

**Note**: If a valid `datadog.yaml` is found, that file takes precedence over all specified command line options.


| Variable                                    | Type    | Description                                                                                                                                                                                                                         |
|----------------------------                 |---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `LOGS_ENABLED`                              | String  | Enable (`"true"`) or disable (`"false"`) the log collection feature in the configuration file. Logs are disabled by default.                                                                                                        |
| `APM_ENABLED`                               | String  | Enable (`"true"`) or disable (`"false"`) the APM Agent in the configuration file. APM is enabled by default.                                                                                                                        |
| `PROCESS_ENABLED`                           | String  | Enable (`"true"`) or disable (`"false"`) the Process Agent in the configuration file. The Process Agent is disabled by default.                                                                                                     |
| `HOSTNAME_FQDN_ENABLED`                     | String  | Enable (`"true"`) or disable (`"false"`) the usage of FQDN for the Agent hostname. It is equivalent to set `hostname_fqdn` in the Agent configuration file. The usage of FQDN for the hostname is disabled by default. _(v6.20.0+)_ |
| `CMD_PORT`                                  | Number  | A valid port number between 0 and 65534. The Datadog Agent exposes a command API on port 5001. If that port is already in use by another program, the default may be overridden here.                                               |
| `PROXY_HOST`                                | String  | (If using a proxy) sets your proxy host. [Learn more about using a proxy with the Datadog Agent][4].                                                                                                                                 |
| `PROXY_PORT`                                | Number  | (If using a proxy) sets your proxy port. [Learn more about using a proxy with the Datadog Agent][4].                                                                                                                                 |
| `PROXY_USER`                                | String  | (If using a proxy) sets your proxy user. [Learn more about using a proxy with the Datadog Agent][4].                                                                                                                                 |
| `PROXY_PASSWORD`                            | String  | (If using a proxy) sets your proxy password. For the process/container Agent, this variable is required for passing in an authentication password and cannot be renamed. [Learn more about using a proxy with the Datadog Agent][4]. |
| `EC2_USE_WINDOWS_PREFIX_DETECTION`          | Boolean | Use the EC2 instance id for Windows hosts on EC2. _(v7.28.0+)_                                            |

#### Installation log files

Set the `/log <FILENAME>` msiexec option to configure an installation log file. If this option is not set, msiexec writes the log to `%TEMP%\MSI*.LOG` by default.


## Configuration

The main Agent configuration file is located at
`C:\ProgramData\Datadog\datadog.yaml`. This file is used for host-wide settings such as the API key, selected Datadog site, proxy parameters, host tags, and log level.

There is also a `datadog.yaml.example` file in the same directory, which is a fully commented reference with all available configuration options, useful for reference and copying specific settings.


Configuration files for integrations are in:
`C:\ProgramData\Datadog\conf.d\` There may also be an alternative legacy location: `C:\Documents and Settings\All Users\Application Data\Datadog\conf.d\`.

Each integration has a subdirectory `<INTEGRATION>.d\` that contains:
- `conf.yaml`: The active settings for the integration
* `conf.yaml.example`: A sample file showing what configuration keys are supported

When making configuration changes, be sure to restart the Agent to ensure the changes take effect.

The [Datadog Agent Manager GUI][6] can be used to enable, disable, and configure checks. You must restart the Agent for your changes to take effect.

**Note**: `ProgramData` is a hidden folder.

## Agent commands

The execution of the Agent is controlled by the Windows Service Control Manager.

* The main executable name is `agent.exe`.
* The configuration GUI is a browser-based configuration application (for Windows 64-bit only).
* Commands can be run from the **elevated (run as Admin)** command line (PowerShell or Command Prompt) using the syntax `<PATH_TO_AGENT.EXE> <COMMAND>`.
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

**Examples**:
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

## Uninstall the Agent

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

## Troubleshooting

For troubleshooting steps, see the [Agent Troubleshooting documentation][18] .


### Agent status and information

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

### Logs location

The Agent logs are located in `C:\ProgramData\Datadog\logs\agent.log`.

**Note**: `ProgramData` is a hidden folder.

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


[1]: https://app.datadoghq.com/fleet/install-agent/latest?platform=windows
[2]: /agent/supported_platforms/?tab=windows
[3]: /agent/faq/windows-agent-ddagent-user/
[4]: /agent/configuration/proxy/
[5]: /network_monitoring/cloud_network_monitoring
[6]: /agent/guide/datadog-agent-manager-windows/
[7]: /integrations/wmi_check/
[8]: https://app.datadoghq.com/monitors/create/integration
[9]: /infrastructure/process/?tab=linuxwindows#installation
[10]: /agent/configuration/agent-configuration-files/#agent-main-configuration-file
[11]: /agent/configuration/agent-commands/#restart-the-agent
[12]: http://127.0.0.1:5002
[13]: /agent/guide/python-3/
[14]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-latest.exe
[15]: https://docs.datadoghq.com/agent/supported_platforms/?tab=windows
[16]: https://app.datadoghq.com/fleet/install-agent/latest?platform=windows
[17]: /agent/faq/windows-agent-ddagent-user/
[18]: https://docs.datadoghq.com/agent/troubleshooting/
[400]: https://windows-agent.datadoghq.com/datadog-agent-7-latest.amd64.msi
[500]: https://app.datadoghq.com/organization-settings/api-keys
