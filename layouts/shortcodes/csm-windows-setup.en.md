
Use the following instructions to enable Misconfigurations, Vulnerability Management, and Identity Risks on Windows.

## Prerequisites

- Agent versions 7.52 and later.
- Access to hosts running Windows Server 2016 or newer.

## Limitations

- Windows containerized workloads are not supported.
- Datadog detects vulnerabilities in Windows by identifying the Windows version and installed security knowledge base (KB) updates to address vulnerabilities associated with that version. However, some KB updates are cumulative and contain other KB updates, which might cause Datadog to misidentify which updates have been installed.
- Datadog can't track vulnerability fixes that Windows applies outside of KB updates.
- Datadog can't track vulnerabilities associated with third-party software.

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

### Enable Vulnerability scanning

1. Update your Datadog Agent to 7.58 or later.
2. Ensure you have access to `C:\ProgramData`, which is a hidden folder.
    - In **File Explorer**, click the **View** tab, and clear the **Hidden items** checkbox. The **ProgramData** folder should now be visible when navigating to the `C:` drive. The transparent icon indicates it is a hidden folder.
3. In `C:\ProgramData\Datadog\datadog.yaml`, set the `sbom` and `host` flags:<br><br>
    ```
    sbom:
      enabled: true
      host:
        enabled: true
    
    ```
4. [Restart the Datadog Agent][6] to enable Cloud Security Vulnerability Management.

## Verify that the Agent is sending events to Cloud Security

To verify that the Agent is sending events to Cloud Security, go to [Cloud Security Overview][8] and view the **Security Inbox** and **All Findings** sections.

[1]: /security/cloud_security_management/
[2]: /network_monitoring/performance/setup/?tab=agentwindows#setup
[3]: /agent/basic_agent_usage/windows/?tab=gui
[4]: /agent/basic_agent_usage/windows/?tab=commandline
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: /agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[7]: https://app.datadoghq.com/logs
[8]: https://app.datadoghq.com/security/csm
[9]: /security/notifications/rules/
[10]: /security/cloud_security_management/setup
[11]: /security/threats
