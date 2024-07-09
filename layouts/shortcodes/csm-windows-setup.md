
Use the following instructions to enable Threat Detection and Vulnerability scanning on Windows.

Datadog Cloud Security Management on Windows includes host vulnerability detection as well as built-in threat detection for Windows process and network events. The out-of-the-box Windows ruleset includes the following default rules:

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

- Agent versions 7.52 and later.
- Access to hosts running Windows Server 2016 or newer.
- (Optional) For network events, [NPM][2] must be enabled on the hosts.

**Note**: Windows containerized workloads are not supported.

## Installation

### Installer

1. [Install the Datadog Windows Agent][3].
2. Right-click the downloaded `.msi` file and select **Run as administrator**.
3. Follow the prompts, accept the license agreement, and enter your [Datadog API key][5]. If you are upgrading from an existing version of the Agent, the installer may not prompt you for an API key.

It can take up to 15 minutes to complete the installation. In certain cases, Microsoft Defender may cause slow installation progress. When the install finishes, you are given the option to launch the Datadog Agent Manager.

### Command line

1. Download the [Datadog Agent installer][4].
2. Follow the instructions for command line installation using command prompts or PowerShell.

## Configuration

### Enable CSM

1. Ensure you have access to `C:\ProgramData`, which is a hidden folder.
    - In **File Explorer**, click the **View** tab, and clear the **Hidden items** checkbox. The **ProgramData** folder should now be visible when navigating to the `C:` drive. The transparent icon indicates it is a hidden folder.
2. In `C:\ProgramData\Datadog\system-probe.yaml`, set the `runtime_security_config` flag:<br><br>
    ```
    runtime_security_config:
      enabled: true
    ```
3. In `C:\ProgramData\Datadog\security-agent.yaml`, set the `runtime_security_config` flag:<br><br>
    ```
    runtime_security_config:
      enabled: true
    ```
4. [Restart the Datadog Agent][6] to enable CSM.

### Verify that the Agent is sending events to CSM

When you enable CSM on Windows, the Agent sends a log to Datadog to confirm that the Windows default ruleset has been successfully deployed. To view the log, navigate to the [**Logs**][7] page in Datadog and search for `@agent.rule_id:ruleset_loaded`.

Another method to verify that the Agent is sending events to CSM is to manually trigger a Windows security signal.

1. In Windows, open a command prompt as Administrator and run the command `schtasks /create /?`.
2. In Datadog, navigate to the [CSM Signals Explorer][8] to view the generated Windows signals.
    - To view signals originating from configured Windows hosts, filter the signals by hostname using the **Hosts** > **Hostnames** facet.
    - To filter by Windows rules, use the **Workflow** > **Rule Name** facet.

To get alerts whenever a Windows signal is created, create a [Notification Rule][9] that focuses on the `host` tag specifically for configured Windows hosts.

### Enable FIM and Registry Monitoring

<div class="alert alert-warning">File Integrity Monitoring (FIM) and Registry Monitoring is in beta and should not be enabled on production workloads.</div>

1. Ensure you have access to `C:\ProgramData`, which is a hidden folder.
    - In **File Explorer**, click the **View** tab, and clear the **Hidden items** checkbox. The **ProgramData** folder should now be visible when navigating to the `C:` drive. The transparent icon indicates it is a hidden folder.
1. In `C:\ProgramData\Datadog\system-probe.yaml`, set the `fim_enabled` flag:<br><br>
    ```
    runtime_security_config:
      fim_enabled: true
    ```
1. In `C:\ProgramData\Datadog\security-agent.yaml`, set the `fim_enabled` flag:<br><br>
    ```
    runtime_security_config:
      fim_enabled: true
    ```
1. [Restart the Datadog Agent][6] to enable CSM.

### Enable Vulnerability scanning
<div class="alert alert-warning">Vulnerability scanning on Windows hosts is available in public beta.</div>

1. Update your Datadog agent to 7.55 or later
2. Ensure you have access to `C:\ProgramData`, which is a hidden folder.
    - In **File Explorer**, click the **View** tab, and clear the **Hidden items** checkbox. The **ProgramData** folder should now be visible when navigating to the `C:` drive. The transparent icon indicates it is a hidden folder.
3. In `C:\ProgramData\Datadog\datadog.yaml`, set the `sbom` and `host` flags:<br><br>
    ```
    sbom:
      enabled: true
      host:
        enabled:true
    
    ```
4. [Restart the Datadog Agent][6] to enable CSM Vulnerability Management.

[1]: /security/cloud_security_management/
[2]: /network_monitoring/performance/setup/?tab=agentwindows#setup
[3]: /agent/basic_agent_usage/windows/?tab=gui
[4]: /agent/basic_agent_usage/windows/?tab=commandline
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://docs.datadoghq.com/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[7]: https://app.datadoghq.com/logs
[8]: https://app.datadoghq.com/security?product=cws&_gl=1*yokoae*_gcl_au*MTY0NDMyMDU4Mi4xNjk5Mjg1NDky*_ga*MTA2MDI5Mjg5My4xNzAwNTg2NjI0*_ga_KN80RDFSQK*MTcwMDU4NjYyNC42LjEuMTcwMDU4NzY3MC4wLjAuMA..*_fplc*Z3E3OTgzSExKaFZUcnBtQ0NXbFh2ZmYyQkZjclJjNXpacGZ3TnJiUDhyeG0ySHdwZDVUb0l1RXF2ZU4lMkZiQTV1Q0M3ZUxlN0pjQ3RRZ1V3b1hwd0taTDFPZlk5VDFzbzMyNDB3MUxzUEUyNiUyQlh2Q0FaQ1V5UGVRTmtXVG0lMkJRJTNEJTNE
[9]: https://docs.datadoghq.com/security/notifications/rules/
[10]: /security/cloud_security_management/setup
[11]: /security/threats
