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

**Note**: This Agent does not support Windows containerized workloads.

## Installation

### GUI

<div class="alert alert-info">Important: Please make sure you download the installer linked in this document, NOT the installer linked in the Datadog App.</div>

1. Download this Datadog Agent installer.
2. Run the installer (as Administrator) by opening the .msi file.
3. Follow the prompts, accept the license agreement, and enter your Datadog API key. Your Datadog API key can be found in the Datadog App by clicking ‘Select an API Key.’ Any valid API key will work.
4. If you are upgrading from an existing version of the agent, the installer may not prompt you for the API key. 

     When the install finishes, you are given the option to launch the Datadog Agent Manager.

**Note**: It can take up to 15 minutes to complete the installation. In certain cases, Microsoft Defender may cause slow installation progress.

### Command line

<div class="alert alert-info">Important: Please make sure you download the installer linked in this document, NOT the installer linked in the Datadog App.</div>

1. Download the Datadog Agent installer.
2. Follow the instructions for command line installation using Command prompts or Powershell.

### Enable Cloud Security Management Enterprise
For the following steps, you will need access to C:\ProgramData, which is a hidden folder:
While in the File Explorer, click on the View tab
Uncheck the checkbox for Hidden items
The ProgramData folder will now be visible when navigating to the C: drive. The transparent icon indicates it is a Hidden folder that is being displayed.
In the C:\ProgramData\Datadog\system-probe.yaml file, set the runtime_security_config flag

runtime_security_config:
enabled: true


In the C:\ProgramData\Datadog\security-agent.yaml file, set the runtime_security_config flag

runtime_security_config:
enabled: true


Restart the Datadog Agent.
Cloud Security Management will automatically be enabled once the Datadog Agent is successfully configured and restarted.

### Verify that the agent is sending events to Cloud Security Management
Check if the changes were applied by navigating to Logs and searching for: 

@agent.rule_id:ruleset_loaded

The Datadog agent will automatically create and send a log to confirm that the Windows default ruleset has been successfully deployed.

If you would like to manually trigger a Windows Security Signal follow these steps:
Open a command prompt as Administrator and run the follow command : 
schtasks

Visit Threats Explorer to see the generated Windows signals. 
Filter these signals by the hostname using Hosts > Host facet to view signals originating from configured Windows hosts. 
Filter by Windows rules using Workflow > Rule Name, and selecting any of the default Windows rules.


To get alerts whenever a Windows signal is created, make a Notification Rule that focuses on the "host" tag specifically for configured Windows hosts.


[2]: /network_monitoring/performance/setup/?tab=agentwindows#setup