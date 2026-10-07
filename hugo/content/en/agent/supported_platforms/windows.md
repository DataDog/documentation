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

Use this page to install, configure, and run the Datadog Agent on Windows. To install the Agent, [follow the instructions in the app][1] or select an installation method below.

See [Supported Platforms][15] for the complete list of supported Windows versions.

## Installation

To install the Datadog Agent on Windows hosts, follow the [guided in-app flow in Fleet Automation][16], then copy and run the generated installation command. By default, the Agent runs under the local `ddagentuser` account. See [Datadog Windows Agent User][17] to learn more about this account and considerations for Active Directory domain environments.

{{< img src="/agent/basic_agent_usage/windows_img2_july_25.png" alt="In-app installation steps for the Datadog Agent on a Windows host." style="width:90%;">}}

### Planning your deployment

This overview highlights the topics to consider when planning an installation. Detailed guidance follows later on this page.

1. **Choose an [installation method](#installation-methods).**

   Install the Agent directly with the executable or MSI installer. For centrally managed deployments, use [Ansible][28], [SCCM][29], the [Azure VM extension][30], or [AWS Systems Manager][31]. For all supported installation methods, [follow the instructions in the app][34].

2. **Choose an [Agent version][32].**

   Choose whether to install the latest Agent release or pin a specific version. To pin a version, use its download URL or use the executable installer's `DD_AGENT_MINOR_VERSION` install-time option.

3. **Choose an [Agent account](#install-time-options).**

   The core Agent and integrations run as the selected Windows account. Choose the account based on host security policies and access requirements. For details, see [Datadog Windows Agent User][17].

   {{< tabs >}}
   {{% tab "Local account" %}}

   By default, the installer creates a local `ddagentuser` account with a generated password. Choose a local account when the Agent does not require a domain identity.

   {{% /tab %}}
   {{% tab "gMSA" %}}

   Choose a group Managed Service Account (gMSA) when the Agent needs a domain identity with automatic password management through Active Directory. Create the gMSA and authorize the host before installation; no password is required.

   {{% /tab %}}
   {{% tab "Domain account" %}}

   Choose a dedicated domain account when the Agent needs a domain identity. Create the account before installation and provide its password.

   {{% /tab %}}
   {{% tab "LocalSystem" %}}

   Choose `LocalSystem` to avoid managing a separate local account or to comply with policies that prohibit local user accounts. With `LocalSystem`, the Agent and its integrations run with elevated local privileges. The Agent uses the computer account to access network resources.

   {{% /tab %}}
   {{< /tabs >}}

4. **Configure [network access](#agent-configuration-options).**

   For hosts that connect through a proxy, pass the proxy settings to the installer. The installer uses the proxy when optional features require additional packages and writes the settings to `datadog.yaml` for Agent runtime traffic. For endpoints and allowlists, see [Network traffic][24].

5. **Choose [Agent features](#configure-additional-features).**

   Decide which Agent features to enable during installation. Use the in-app workflow to select features and generate the installation command, or use [Fleet Automation][33] to enable supported features on installed Agents.

### Installation methods

{{< tabs >}}
{{% tab "Executable" %}}

**When to use**

Use the executable installer for most installations. It provides a simpler interface to the MSI installer, prevents automatic restarts, retains the MSI log, and displays relevant log entries when installation fails.

**Network requirements**

The executable installer requires network access to download the Agent MSI and optional packages. To use a proxy, set the executable installer proxy options.

**Version selection**

* **Latest Agent release**: [`https://install.datadoghq.com/datadog-installer-x86_64.exe`][35]
* **Specific Agent release**: [`https://install.datadoghq.com/datadog-installer-7.84.0-1-x86_64.exe`][36]

The first URL installs the latest Agent release. To pin a specific version, use its download URL or set the `DD_AGENT_MINOR_VERSION` install-time option.

**Upgrades and downgrades**

For upgrades and downgrades, the executable installer removes the installed Agent, preserves its configuration, and installs the requested version. The executable can install Agent 7.72 or later.

[35]: https://install.datadoghq.com/datadog-installer-x86_64.exe
[36]: https://install.datadoghq.com/datadog-installer-7.84.0-1-x86_64.exe

{{% /tab %}}
{{% tab "MSI" %}}

**When to use**

Use the MSI for partially offline installations, interactive installations, or deployment systems that require an MSI package.

**Network requirements**

The MSI contains the core Agent. Optional features can require network access to download additional packages.

**Version selection**

* **Latest Agent release**: [`https://windows-agent.datadoghq.com/datadog-agent-7-latest.amd64.msi`][400]
* **Specific Agent release**: [`https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-7.84.0.msi`][37]

For links to all available MSI versions, see the [Windows installer manifest][25].

Each MSI installs one Agent version. The latest-release URL provides the newest Agent available at download time. To pin a specific version, download that release's MSI.

**Upgrades and downgrades**

The MSI upgrades an installed Agent to a later version. To install an earlier version, uninstall the existing Agent first.

**Installation behavior**

Run the MSI with Windows Installer `msiexec.exe`, or open the file for an interactive installation:

1. Download the [latest Datadog Agent MSI][400].
1. Open `datadog-agent-7-latest.amd64.msi`.
1. Accept the license agreement, enter the [Datadog API key][500], and configure the Agent account.

<div class="alert alert-info">The default installation location is <code>%ProgramFiles%\Datadog\Datadog Agent</code>. When setting a custom location, include a <code>Datadog</code> subdirectory for the Datadog files.</div>

[25]: https://ddagent-windows-stable.s3.amazonaws.com/installers_v2.json
[37]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-7.84.0.msi
[400]: https://windows-agent.datadoghq.com/datadog-agent-7-latest.amd64.msi
[500]: https://app.datadoghq.com/organization-settings/api-keys

{{% /tab %}}
{{< /tabs >}}

#### Install-time options

Install-time options control how the installer runs. Set them when running the installer; they cannot be changed later through the Agent configuration files.

{{< tabs >}}
{{% tab "Executable" %}}

Set executable install-time options as environment variables before running the installer.

| Variable | Type | Description |
|----------|------|-------------|
| `DD_AGENT_MINOR_VERSION` | String | Selects an Agent 7 minor or patch version. For example, `84` selects the latest 7.84 patch, and `84.0` selects 7.84.0. Windows executable installation supports Agent 7.72 or later. |
| `DD_AGENT_USER_NAME` | String | Sets the Agent account. If unset, the installer creates the local `ddagentuser` account. See [Datadog Windows Agent User][3]. |
| `DD_AGENT_USER_PASSWORD` | String | Sets the Agent account password. Domain accounts require a password; gMSAs and built-in service accounts do not. |
| `DD_APPLICATIONDATADIRECTORY` | Path | Sets the configuration directory during an initial installation. Default: `C:\ProgramData\Datadog`. |
| `DD_PROJECTLOCATION` | Path | Sets the binary directory during an initial installation. Default: `%ProgramFiles%\Datadog\Datadog Agent`. Include a `Datadog` subdirectory when overriding the default. |
| `DD_INSTALL_ONLY` | Boolean | **Agent 7.85+**: Installs the Agent without starting its services. |
| `DDAGENTUSER_KEEP_RIGHTS` | Boolean | **Agent 7.85+**: Preserves customized Agent account deny-logon rights during installation and upgrades. The installer still grants the log-on-as-a-service right. |

[3]: /agent/faq/windows-agent-ddagent-user/

{{% /tab %}}
{{% tab "MSI" %}}

Pass MSI install-time options as public properties on the `msiexec` command line.

| Property | Type | Description |
|----------|------|-------------|
| `DDAGENTUSER_NAME` | String | Sets the Agent account. If unset, the installer creates the local `ddagentuser` account. See [Datadog Windows Agent User][3]. |
| `DDAGENTUSER_PASSWORD` | String | Sets the Agent account password. Domain accounts require a password; gMSAs and built-in service accounts do not. |
| `APPLICATIONDATADIRECTORY` | Path | Sets the configuration directory during an initial installation. Default: `C:\ProgramData\Datadog`. |
| `PROJECTLOCATION` | Path | Sets the binary directory during an initial installation. Default: `%ProgramFiles%\Datadog\Datadog Agent`. Include a `Datadog` subdirectory when overriding the default. |
| `DD_INSTALL_ONLY` | Boolean | **Agent 7.74+**: Installs the Agent without starting its services. |
| `DDAGENTUSER_KEEP_RIGHTS` | Boolean | **Agent 7.85+**: Preserves customized Agent account deny-logon rights during installation and upgrades. The installer still grants the log-on-as-a-service right. |

[3]: /agent/faq/windows-agent-ddagent-user/

#### Installation log files

Set the `/log <FILENAME>` msiexec option to configure an installation log file. If this option is not set, msiexec writes the log to `%TEMP%\MSI*.LOG` by default.

**Notes**

- The `/qn` option runs a quiet install. To see the GUI prompts, remove it.
- To suppress automatic reboots, add `REBOOT=ReallySuppress`.

{{% /tab %}}
{{< /tabs >}}

#### Agent configuration options

Provide these options to the installer to initialize Agent settings in configuration files such as `datadog.yaml`. After installation, change these settings in the Agent configuration files or through [Fleet Automation][33].

{{< tabs >}}
{{% tab "Executable" %}}

Set initial Agent configuration as environment variables before running the executable installer.

| Variable | Type | Description |
|----------|------|-------------|
| `DD_API_KEY` | String | Sets the Datadog API key. |
| `DD_SITE` | String | Sets the Datadog site, for example, `datadoghq.com`. |
| `DD_ENV` | String | Sets the Agent's global `env` tag. |
| `DD_TAGS` | String | Sets a comma-separated list of host tags. |
| `DD_EXTRA_TAGS` | String | Adds a comma-separated list of tags to every metric, event, log, trace, and service check. |
| `DD_HOSTNAME` | String | Sets the hostname reported by the Agent. |
| `DD_LOG_LEVEL` | String | Sets the Agent log level. |
| `DD_LOGS_ENABLED` | Boolean | Enables or disables log collection. Default: `false`. |
| `DD_INFRASTRUCTURE_MODE` | String | The monitoring mode the Agent is configured in. Each mode offers a different set of features. |
| `DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED` | Boolean | Enables or disables [Live Process collection][21]. |
| `DD_REMOTE_UPDATES` | Boolean | Enables or disables remote Agent upgrades through Fleet Automation. |
| `DD_URL` | URL | Overrides the metrics intake URL. |
| `DD_PROXY_HTTP` | URL | Sets the proxy URL for HTTP requests. |
| `DD_PROXY_HTTPS` | URL | Sets the proxy URL for HTTPS requests. |
| `DD_PROXY_NO_PROXY` | String | Sets a comma- or space-separated list of hosts that bypass the proxy. |

[21]: /infrastructure/process/

{{% /tab %}}
{{% tab "MSI" %}}

Pass initial Agent configuration as public properties on the `msiexec` command line.

| Property | Type | Description |
|----------|------|-------------|
| `APIKEY` | String | Sets the Datadog API key. |
| `SITE` | String | Sets the Datadog site, for example, `datadoghq.com`. |
| `TAGS` | String | Sets a comma-separated list of host tags. |
| `HOSTNAME` | String | Sets the hostname reported by the Agent. |
| `DD_LOG_LEVEL` | String | Sets the Agent log level. |
| `LOGS_ENABLED` | Boolean | Enables or disables log collection. Default: `false`. |
| `APM_ENABLED` | Boolean | Enables or disables the Trace Agent. Default: `true`. |
| `PROCESS_ENABLED` | Boolean | Enables or disables [Live Process collection][21]. |
| `DD_INFRASTRUCTURE_MODE` | String | The monitoring mode the Agent is configured in. Each mode offers a different set of features. |
| `HOSTNAME_FQDN_ENABLED` | Boolean | Enables or disables using the fully qualified domain name as the Agent hostname. Default: `false`. |
| `CMD_PORT` | Number | Sets the Agent command API port. Default: `5001`. |
| `PROXY_HOST` | String | Sets the proxy host. |
| `PROXY_PORT` | Number | Sets the proxy port. |
| `PROXY_USER` | String | Sets the proxy username. |
| `PROXY_PASSWORD` | String | Sets the proxy password. |
| `EC2_USE_WINDOWS_PREFIX_DETECTION` | Boolean | Uses the EC2 instance ID for Windows hosts on EC2. |

[21]: /infrastructure/process/

{{% /tab %}}
{{< /tabs >}}

#### Configure additional features

To configure additional features during installation, [follow the instructions in the app][1] to select features and generate an installation command. For installed Agents, use [Fleet Automation][33] to enable supported features remotely.

Feature documentation—including [Single Step APM Instrumentation][22], the [DDOT Collector][23], [Private Action Runner][26], and [Cloud Security][27]—provides prerequisites and manual configuration options.

## Configuration

The main Agent configuration file is `C:\ProgramData\Datadog\datadog.yaml`. Use this file to configure host-wide settings such as the API key, Datadog site, proxy settings, host tags, and log level.

For a commented reference of all available settings, use `datadog.yaml.example` in the same directory or see the [example Agent configuration file for Windows][19] on GitHub.

Integration configuration files are located in `C:\ProgramData\Datadog\conf.d\`.

Each integration has a subdirectory `<INTEGRATION>.d\` that contains:
- `conf.yaml`: The active integration configuration
- `conf.yaml.example`: A commented reference of the available integration settings

Use the [Datadog Agent Manager GUI][6] to enable, disable, and configure checks.

Restart the Agent after changing configuration files or integration settings.

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
| stop-service     | Stops the Agent within the service control manager.                              |
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

Use Windows Settings for an interactive uninstall, or use PowerShell for a command-line uninstall. Uninstalling preserves the Agent configuration in `C:\ProgramData\Datadog`.

### Add or remove programs

1. Press **CTRL** and **Esc** or use the Windows key to run Windows Search.
1. Search for `add` and click {{< ui >}}Add or remove programs{{< /ui >}}.
1. Search for `Datadog Agent` and click {{< ui >}}Uninstall{{< /ui >}}.

### PowerShell

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

* Right click on the Datadog Agent system tray icon > {{< ui >}}Configure{{< /ui >}}, or
* Run `launch-gui` command from an **elevated(run as Admin)** command line
	- PowerShell: `& "<PATH_TO_AGENT.EXE>" launch-gui`
	- cmd: `"<PATH_TO_AGENT.EXE>" launch-gui`

Then, open the status page by going to {{< ui >}}Status{{< /ui >}} > {{< ui >}}General{{< /ui >}}.
Get more information on running checks in {{< ui >}}Status{{< /ui >}} > {{< ui >}}Collector{{< /ui >}} and {{< ui >}}Checks{{< /ui >}} > {{< ui >}}Summary{{< /ui >}}.

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

On your target host, launch the Datadog Agent Manager and select the {{< ui >}}Windows Service{{< /ui >}} integration from the list. There is an out-of-the-box example; however, this example uses DHCP.

To get the name of the service, open `services.msc` and locate your target service. Using DHCP as the target, you can see the service name at the top of the service properties window:

{{< img src="agent/faq/DHCP.png" alt="DHCP" style="width:75%;">}}

When adding your own services, be sure to follow the formatting exactly as shown. If formatting is not correct the integration fails. **Note**: Special characters in a service name must be escaped. For example, the name `MSSQL$BILLING` can be added with `MSSQL\$BILLING`.

{{< img src="agent/faq/windows_DHCP_service.png" alt="Windows DHCP Service" style="width:75%;">}}

Also, whenever you modify an integration, the Datadog service needs to be restarted. You can do this from services.msc or from the UI sidebar.

For Services, Datadog doesn't track the metrics—only their availability. (For metrics, use the [Process](#monitoring-windows-processes) or [WMI][7] integration). To set up a Monitor, select the [Integration monitor type][8] then search for {{< ui >}}Windows Service{{< /ui >}}. From {{< ui >}}Integration Status{{< /ui >}} > {{< ui >}}Pick Monitor Scope{{< /ui >}}, choose the service you would like to monitor.

### Monitoring system load for Windows

The Datadog Agent collects a large number of system metrics by default. The most commonly used system metrics are `system.load.*` but these metrics are **Unix** specific.

While Windows does not offer the `system.load.*` metrics, an equivalent option that's available by default is `system.proc.queue.length`. This metric shows the number of threads observed as delayed in the processor ready queue that are waiting to be executed.

### Monitoring Windows processes

You can monitor Windows processes with [Live Process Monitoring][9]. To enable this on Windows, edit the [Agent main configuration file][10] by setting the following parameter to true:

`datadog.yaml`:

```yaml
process_config:
  process_collection:
    enabled: true
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
[19]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_windows.yaml.example
[21]: /infrastructure/process/
[22]: /tracing/trace_collection/single-step-apm/windows/
[23]: /opentelemetry/setup/ddot_collector/install/windows/
[24]: /agent/configuration/network/
[25]: https://ddagent-windows-stable.s3.amazonaws.com/installers_v2.json
[26]: /actions/private_actions/set_up_agent_based/
[27]: /security/cloud_security_management/setup/agent/windows/
[28]: https://github.com/ansible-collections/Datadog
[29]: /agent/supported_platforms/sccm/
[30]: /getting_started/integrations/azure/#install-the-agent-for-greater-visibility-into-your-application
[31]: /integrations/guide/aws-agent-installation/#amazon-ec2-instances
[32]: https://github.com/DataDog/datadog-agent/releases
[33]: /agent/fleet_automation/configure_agents/
[34]: https://app.datadoghq.com/fleet/install-agent/latest?platform=overview
[35]: https://install.datadoghq.com/datadog-installer-x86_64.exe
[36]: https://install.datadoghq.com/datadog-installer-7.84.0-1-x86_64.exe
[37]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-7.84.0.msi
[400]: https://windows-agent.datadoghq.com/datadog-agent-7-latest.amd64.msi
[500]: https://app.datadoghq.com/organization-settings/api-keys
