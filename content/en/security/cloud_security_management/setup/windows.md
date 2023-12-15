---
title: Windows
kind: documentation
is_beta: true
private: true
---

## Overview

Thank you for your interest in helping Datadog improve the Datadog Cloud Security product and customer experience. This process involves installation of the Datadog Windows Agent and configuration of the Cloud Security Management product. 

## About the feature

You will be testing Datadog Cloud Security Management on Windows. New features include built-in threat detection for Windows process and network events.

The out of the box Windows ruleset includes the following default rules:

- Certutil used to transmit or decode a file
- Process memory was dumped using the minidump functions of comsvcs.dll
- NTDS file referenced in commandline
- Suspicious ntdsutil usage
- Procdump used to dump process memory
- Scheduled task created
- Bitsadmin used to download or execute a file
- WMI used to remotely execute content
- Known pentesting tool crackmapexec executed

As this feature is still in beta, please only install this version of the Agent on hosts that are not critical to production workloads.

## Prerequisites

- Access to hosts running Windows Server 2016 or newer.
- (Optional) For network events, [NPM][2] must be enabled on the hosts.

**Note**: Windows containerized workloads are not supported.

## Installation

<div class="alert alert-info"><strong>Important</strong>: You must use the installer linked in this document, and <strong>not</strong> the installer available on the <strong>Integrations</strong> &gt; <strong>Agent</strong> page in Datadog.</div>

### Installer

1. Download the [Datadog Agent installer][3].
2. Right-click the downloaded `.msi` file and select **Run as administrator**.
3. Follow the prompts, accept the license agreement, and enter your [Datadog API key][5]. If you are upgrading from an existing version of the Agent, the installer may not prompt you for an API key.

It can take up to 15 minutes to complete the installation. In certain cases, Microsoft Defender may cause slow installation progress. When the install finishes, you are given the option to launch the Datadog Agent Manager.

### Command line

1. Download the [Datadog Agent installer][4].
2. Follow the instructions for command line installation using command prompts or PowerShell.

## Configuration

### Enable Cloud Security Management Enterprise

To enable Cloud Security Management Enterprise (CSM Enterprise), you must have access to `C:\ProgramData`, which is a hidden folder.

1. In **File Explorer**, click the **View** tab.
2. Clear the **Hidden items** checkbox.

The **ProgramData** folder should now be visible when navigating to the C: drive. The transparent icon indicates it is a hidden folder.

Next, enable CSM Enterprise:

1. In the `C:\ProgramData\Datadog\system-probe.yaml` file, set the `runtime_security_config` flag:

```yaml
runtime_security_config:
  enabled: true
```

2. In the `C:\ProgramData\Datadog\security-agent.yaml` file, set the `runtime_security_config` flag:

```yaml
runtime_security_config:
  enabled: true
```

3. [Restart the Datadog Agent][6] to enable CSM.

### Verify that the Agent is sending events to CSM

1. On the [**Logs**][7] page in Datadog, search for `@agent.rule_id:ruleset_loaded`.





The Datadog agent will automatically create and send a log to confirm that the Windows default ruleset has been successfully deployed.

To manually trigger a Windows Security Signal:

1. In Windows, open a command prompt as Administrator and run the command `schtasks`.
2. In Datadog, navigate to the CSM Signals Explorer to view the generated Windows signals.
3. To view signals originating from configured Windows hosts, filter the signals by hostname using the Hosts > Hostnames facet.
4. Filter by Windows rules using the Workflow > Rule Name facet.



Visit Threats Explorer to see the generated Windows signals. 
Filter these signals by the hostname using Hosts > Host facet to view signals originating from configured Windows hosts. 
Filter by Windows rules using Workflow > Rule Name, and selecting any of the default Windows rules.


To get alerts whenever a Windows signal is created, make a Notification Rule that focuses on the "host" tag specifically for configured Windows hosts.


[2]: /network_monitoring/performance/setup/?tab=agentwindows#setup
[3]: https://s3.amazonaws.com/dd-agent-mstesting/builds/beta/ddagent-cli-7.50.0-rc.6.cwsbeta.msi
[4]: https://s3.amazonaws.com/dd-agent-mstesting/builds/beta/ddagent-cli-7.50.0-rc.6.cwsbeta-2.msi
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://docs.datadoghq.com/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[7]: https://app.datadoghq.com/logs
[8]: https://app.datadoghq.com/security?product=cws&_gl=1*yokoae*_gcl_au*MTY0NDMyMDU4Mi4xNjk5Mjg1NDky*_ga*MTA2MDI5Mjg5My4xNzAwNTg2NjI0*_ga_KN80RDFSQK*MTcwMDU4NjYyNC42LjEuMTcwMDU4NzY3MC4wLjAuMA..*_fplc*Z3E3OTgzSExKaFZUcnBtQ0NXbFh2ZmYyQkZjclJjNXpacGZ3TnJiUDhyeG0ySHdwZDVUb0l1RXF2ZU4lMkZiQTV1Q0M3ZUxlN0pjQ3RRZ1V3b1hwd0taTDFPZlk5VDFzbzMyNDB3MUxzUEUyNiUyQlh2Q0FaQ1V5UGVRTmtXVG0lMkJRJTNEJTNE
[9]: https://docs.datadoghq.com/security/notifications/rules/
