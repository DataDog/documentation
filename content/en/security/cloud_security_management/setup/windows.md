---
title: Setting up Cloud Security Management on Windows
kind: documentation
---

<div class="alert alert-warning">Cloud Security Management on Windows is in beta and should only be installed on hosts that are not critical to production workloads.</div>

Datadog [Cloud Security Management (CSM)][1] on Windows includes built-in threat detection for Windows process and network events. The out-of-the-box Windows ruleset includes the following default rules:

- Certutil used to transmit or decode a file
- Process memory was dumped using the minidump functions of comsvcs.dll
- NTDS file referenced in command line
- Suspicious ntdsutil usage
- Procdump used to dump process memory
- Scheduled task created
- Bitsadmin used to download or execute a file
- WMI used to remotely execute content
- Known pentesting tool crackmapexec executed

## Prerequisites

- Access to hosts running Windows Server 2016 or newer.
- (Optional) For network events, [NPM][2] must be enabled on the hosts.

**Notes**:

- Windows containerized workloads are not supported.
- Windows support is available for [CSM Enterprise and CSM Workload Security][10] only.

## Installation

<div class="alert alert-info">You must use the installer linked in this document, and <strong>not</strong> the installer available on the <strong>Integrations</strong> &gt; <strong>Agent</strong> page in Datadog.</div>

### Installer

1. Download the [Datadog Agent installer][3].
2. Right-click the downloaded `.msi` file and select **Run as administrator**.
3. Follow the prompts, accept the license agreement, and enter your [Datadog API key][5]. If you are upgrading from an existing version of the Agent, the installer may not prompt you for an API key.

It can take up to 15 minutes to complete the installation. In certain cases, Microsoft Defender may cause slow installation progress. When the install finishes, you are given the option to launch the Datadog Agent Manager.

### Command line

1. Download the [Datadog Agent installer][3].
2. Follow the instructions for command line installation using command prompts or PowerShell.

## Configuration

### Enable CSM

1. Ensure you have access to `C:\ProgramData`, which is a hidden folder.
    - In **File Explorer**, click the **View** tab, and clear the **Hidden items** checkbox. The **ProgramData** folder should now be visible when navigating to the `C:` drive. The transparent icon indicates it is a hidden folder.
2. In `C:\ProgramData\Datadog\system-probe.yaml`, set the `runtime_security_config` flag:<br><br>
    {{< code-block lang="yaml" filename="system-probe.yaml" disable_copy="true" collapsible="true" >}}
    runtime_security_config:
      enabled: true
    {{< /code-block >}}
3. In `C:\ProgramData\Datadog\security-agent.yaml`, set the `runtime_security_config` flag:<br><br>
    {{< code-block lang="yaml" filename="security-agent.yaml" disable_copy="true" collapsible="true" >}}
    runtime_security_config:
      enabled: true
    {{< /code-block >}}
4. [Restart the Datadog Agent][6] to enable CSM.

### Verify that the Agent is sending events to CSM

When you enable CSM on Windows, the Agent sends a log to Datadog to confirm that the Windows default ruleset has been successfully deployed. To view the log, navigate to the [**Logs**][7] page in Datadog and search for `@agent.rule_id:ruleset_loaded`.

Another method to verify that the Agent is sending events to CSM is to manually trigger a Windows security signal.

1. In Windows, open a command prompt as Administrator and run the command `schtasks`.
2. In Datadog, navigate to the [CSM Signals Explorer][8] to view the generated Windows signals.
    - To view signals originating from configured Windows hosts, filter the signals by hostname using the **Hosts** > **Hostnames** facet.
    - To filter by Windows rules, use the **Workflow** > **Rule Name** facet.

To get alerts whenever a Windows signal is created, create a [Notification Rule][9] that focuses on the `host` tag specifically for configured Windows hosts.

[1]: /security/cloud_security_management/
[2]: /network_monitoring/performance/setup/?tab=agentwindows#setup
[3]: https://s3.amazonaws.com/dd-agent-mstesting/builds/beta/ddagent-cli-7.50.0-rc.6.cwsbeta-2.msi
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://docs.datadoghq.com/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[7]: https://app.datadoghq.com/logs
[8]: https://app.datadoghq.com/security?product=cws&_gl=1*yokoae*_gcl_au*MTY0NDMyMDU4Mi4xNjk5Mjg1NDky*_ga*MTA2MDI5Mjg5My4xNzAwNTg2NjI0*_ga_KN80RDFSQK*MTcwMDU4NjYyNC42LjEuMTcwMDU4NzY3MC4wLjAuMA..*_fplc*Z3E3OTgzSExKaFZUcnBtQ0NXbFh2ZmYyQkZjclJjNXpacGZ3TnJiUDhyeG0ySHdwZDVUb0l1RXF2ZU4lMkZiQTV1Q0M3ZUxlN0pjQ3RRZ1V3b1hwd0taTDFPZlk5VDFzbzMyNDB3MUxzUEUyNiUyQlh2Q0FaQ1V5UGVRTmtXVG0lMkJRJTNEJTNE
[9]: https://docs.datadoghq.com/security/notifications/rules/
[10]: /security/cloud_security_management/setup
