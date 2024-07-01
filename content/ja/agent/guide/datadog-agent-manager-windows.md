---
title: Datadog Agent Manager for Windows
further_reading:
- link: /agent/basic_agent_usage/windows/
  tag: Documentation
  text: Basic Agent Usage for the Windows Agent
---

## Overview

The Datadog Agent Manager GUI is browser-based. The port the GUI runs on can be configured in your `datadog.yaml` file. Setting the port to `-1` disables the GUI. By default it is enabled on port 5002 for Windows and Mac and is disabled on Linux.

### Requirements

1. Cookies must be enabled in your browser. The GUI generates and saves a token in your browser which is used for authenticating all communications with the GUI server.

2. The GUI is only launched if the user launching it has the correct user permissions. If you are able to open `datadog.yaml`, you are able to use the GUI.

3. For security reasons, the GUI can only be accessed from the local network interface (localhost/127.0.0.1), so you must be on the same host that the Agent is running to use it. In other words, you can't run the Agent on a VM or container and access it from the host machine.

#### Supported browsers

| Browser       | Supported version (or later) | Comment                 |
|---------------|------------------------------|-------------------------|
| IE            | 11                           |                         |
| Edge          | 12                           |  Pre-Chromium Edge |
| Edge-chromium | 79                           |                         |
| Firefox       | 38                           |                         |
| Chrome        | 60                           |                         |
| Safari        | 8                            |                         |
| iOS           | 12                           |  Mobile Safari          |

### Start the Datadog Agent Manager

After the Agent is [installed][1] on your Windows host, start the Datadog Agent Manager to manage the Agent graphically.

From the Windows start menu:

* Click on the Datadog folder.
* Right click on Datadog Agent Manager.
* Choose `Run as Administrator`.

From an elevated PowerShell prompt:
```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" launch-gui
```

The Datadog Agent Manager launches in your default web browser. The web address is `http://127.0.0.1:5002`.

## Options

The following sections provide information on the options in the left navigation bar.

### Status

#### General

The general status page displays by default when launching the Datadog Agent Manager. It contains the following sections:

| Section     | Description                                                                     |
|-------------|---------------------------------------------------------------------------------|
| Agent Info  | Provides information on the Agent including version, log level, and file paths. |
| System Info | Includes information on system time, ntp offset, Go, and Python versions.       |
| Host Info   | Provides information on the host including OS, platform, procs, and uptime.     |
| Hostnames   | Displays the hostnames and host tags found by the Agent.                        |
| JMX Status  | A list of JMX checks with their status.                                         |
| Forwarder   | Information on the Agent's forwarder including the status of your API key.      |
| Endpoints   | Endpoints in use by the Agent.                                                  |
| Logs Agent  | Information on the Logs Agent (if enabled).                                     |
| Aggregator  | Information on the Agent's data aggregator.                                     |
| DogStatsD   | Statistics on data sent with DogStatsD.                                         |

#### Collector

The collector status page displays details on the Agent's running checks, for example:

```text
cpu
   Instance ID: cpu [OK]
   Total Runs: 1,561
   Metric Samples: 7, Total: 10,921
   Events: 0, Total: 0
   Service Checks: 0, Total: 0
   Average Execution Time: 4ms
```

### Log

The log page displays the Agent logs being output to `agent.log`. Logs can be sorted by most recent or oldest first.

```text
2019-07-10 17:46:04 EDT | INFO | (runner.go:246 in work) | Running check cpu
2019-07-10 17:46:04 EDT | INFO | (runner.go:302 in work) | Done running check cpu
2019-07-10 17:46:04 EDT | INFO | (runner.go:246 in work) | Running check disk
2019-07-10 17:46:04 EDT | INFO | (runner.go:302 in work) | Done running check disk
2019-07-10 17:46:04 EDT | INFO | (runner.go:246 in work) | Running check file_handle
2019-07-10 17:46:04 EDT | INFO | (runner.go:302 in work) | Done running check file_handle
2019-07-10 17:46:04 EDT | INFO | (runner.go:246 in work) | Running check io
2019-07-10 17:46:04 EDT | INFO | (runner.go:302 in work) | Done running check io
2019-07-10 17:46:04 EDT | INFO | (runner.go:246 in work) | Running check memory
2019-07-10 17:46:04 EDT | INFO | (runner.go:302 in work) | Done running check memory
2019-07-10 17:46:04 EDT | INFO | (runner.go:246 in work) | Running check network
2019-07-10 17:46:04 EDT | INFO | (runner.go:302 in work) | Done running check network
2019-07-10 17:46:04 EDT | INFO | (runner.go:246 in work) | Running check ntp
2019-07-10 17:46:04 EDT | INFO | (runner.go:302 in work) | Done running check ntp
2019-07-10 17:46:04 EDT | INFO | (runner.go:246 in work) | Running check uptime
2019-07-10 17:46:04 EDT | INFO | (runner.go:302 in work) | Done running check uptime
2019-07-10 17:46:04 EDT | INFO | (runner.go:246 in work) | Running check winproc
2019-07-10 17:46:05 EDT | INFO | (runner.go:302 in work) | Done running check winproc
2019-07-10 17:48:02 EDT | INFO | (transaction.go:114 in Process) | Successfully posted payload to "https://6-2-1-app.agent.datadoghq.com/api/v1/check_run?api_key=*************************12345"
```

### Settings

The settings page displays the contents of the Agent's main configuration file `datadog.yaml`. You can edit this file directly from the Datadog Agent Manager. After making a change, click **Save** in the upper right then [restart the Agent](#restart-agent).

See the [sample config_template.yaml][2] for all available configuration options.

### Checks

#### Manage checks

The manage checks page displays the contents of enabled check configuration files. You can edit these files directly from the Datadog Agent Manager. After making a change, click **Save** in the upper right then [restart the Agent](#restart-agent).

To add a check, select **Add a Check** in the dropdown menu. This displays a list of available checks to install. Reference the specific check's [integration][3] page for configuration details.

#### Checks summary

The checks summary page displays a list of the checks running, number of instances for each check, and the check's status.

### Flare

If you are having issues with the Agent, the flare page assists you with troubleshooting with the [Datadog support][4] team. Enter your ticket number (optional) and email address then click **Submit**. This transmits a copy of your Agent logs and config files to Datadog support. More information on flares is available in the [Agent Flare][5] documentation.

### Restart Agent

Clicking **Restart Agent** from the left navigation bar restarts the Agent immediately. There is no page or confirmation prompt. After restarting the Agent, you are forwarded to the [general status](#general) page.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/basic_agent_usage/windows/#installation
[2]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[3]: /integrations/
[4]: /help/
[5]: /agent/troubleshooting/send_a_flare/
