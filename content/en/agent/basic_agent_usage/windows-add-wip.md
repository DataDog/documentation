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
- link: "/agent/guide/windows-agent-ddagent-user"
  tag: "Documentation"
  text: "Learn more about the Datadog Windows Agent User"
algolia:
  tags: ['install', 'installing', 'uninstall', 'uninstalling', 'windows']
---

## Overview

This page outlines the basic features of the Datadog Agent for Windows. If you haven't installed the Agent yet, see the installation instructions below or [follow the instructions in the app][1].

## Prerequisites
- **Windows version**: Windows Server 2016 or later, or Windows 10 or later. See the Agent Supported Platforms documentation for [supported OS versions][2].
- **Datadog account**: Ensure you have access to a Datadog account and have your Datadog API key.
- **Administrator privileges**: Administrator access is required on the Windows machine.

## Install the Datadog Agent

When deploying the Datadog Agent in an Active Directory environment, Datadog recommends using a Group Managed Service Account (gMSA).

Using gMSA can enhance security and simplify management. Some of the benefits include:
- Deployment across multiple servers: Unlike traditional Managed Service Accounts (MSAs) or standalone Managed Service Accounts (sMSAs), gMSAs can be deployed across multiple servers.
- Automated password management: The passwords for gMSAs are handled at the operating system level, and are rotated on a regular basis without requiring manual intervention.

When running with a gMSA, the core and APM/trace components of the Windows Agent run under the configured account. The Live Processes component, if enabled, runs under the `LOCAL_SYSTEM` account. Learn more about the [Datadog Windows Agent User][3].

### Prerequisites

- An Active Directory environment
- Permission to create and manage gMSAs
- See further [requirements in the Microsoft documentation][4].

**Note**: For a comprehensive understanding of setting up gMSAs, see [Microsoft's Group Managed Service Accounts Overview][5].

### Create and configure a gMSA

1. Create a Security Group:
   1. Open **Active Directory Users and Computers (ADUC)**.
   2. Navigate to the appropriate **Organizational Unit (OU)**.
   3. Right-click and select **New** > **Group**.
   4. Name the group. For example, `DatadogAgentsGroup`.
   5. Set the correct group scope for your organization. For example, **Domain local**.
   6. Set the type to **Security**.


2. Create the gMSA:
   1. Open PowerShell with **Administrator** privileges.
   2. Run the following command to create the gMSA, replacing `<YOUR_DOMAIN_NAME>` with your domain name:
        ```powershell
        New-ADServiceAccount -Name DatadogGMSA -DNSHostName <YOUR_DOMAIN_NAME> -PrincipalsAllowedToRetrieveManagedPassword DatadogAgentsGroup
        ```


3. Verify that the gMSA can be used on the target machine:

   1. Ensure the target machine is part of the `DatadogAgentsGroup`.
   2. On the target machine, open PowerShell and run:
        ```powerhsell
        Install-ADServiceAccount -Identity DatadogGMSA
        ```
      Ensure the command ran without errors.

### Install the Agent

Follow the instructions below to install the latest version of the Datadog Agent. If you need to install a specific version of the Agent, see the [installer list][6].

#### Install via the GUI

<div class="alert alert-info">The default installation location for the Agent is <code>%ProgramFiles%\Datadog\Datadog Agent</code>. If you choose to use a custom installation location, ensure that you specify a <code>Datadog</code> subdirectory for the Datadog files.</div>

1. Download the [Datadog Agent installer][1] to install the latest version of the Agent.
2. Run the installer by opening `datadog-agent-7-latest.amd64.msi`. When prompted, enter your Administrator credentials.
3. Follow the prompts, accept the license agreement, and enter your [Datadog API key][2].
4. When prompted for the "Datadog Agent User Account", enter the username of the gMSA. For example, `<YOUR_DOMAIN_NAME>\DatadogGMSA$` and **no password**.
When the install finishes, you are given the option to launch the Datadog Agent Manager.

#### Install with the command line

1. Open PowerShell with **Administrator** privileges.
2. Run the following command to install the Datadog Agent:

**Note:** Replace `DatadogGMSA$` with the username of your gMSA. The username **must end with a $ symbol.**
  {{< code-block lang="powershell" >}}
$p = Start-Process -Wait -PassThru msiexec -ArgumentList '/qn /i https://windows-agent.datadoghq.com/datadog-agent-7-latest.amd64.msi /log C:\Windows\SystemTemp\install-datadog.log APIKEY="<DATADOG_API_KEY>" DDAGENTUSER_NAME="<YOUR_DOMAIN_NAME>\DatadogGMSA$"'
if ($p.ExitCode -ne 0) {
  Write-Host "msiexec failed with exit code $($p.ExitCode) please check the logs at C:\Windows\SystemTemp\install-datadog.log" -ForegroundColor Red
}
{{< /code-block >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=windows
[2]: /agent/supported_platforms/?tab=windows
[3]: /agent/faq/windows-agent-ddagent-user/
[4]: https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-managed-service-accounts/group-managed-service-accounts/group-managed-service-accounts-overview#software-requirements
[5]: https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-managed-service-accounts/group-managed-service-accounts/getting-started-with-group-managed-service-accounts
[6]: https://windows-agent.datadoghq.com/installers_v2.json

