---
title: Setting up Cloud Security Management
aliases:
  - /security_platform/cloud_workload_security/getting_started
  - /security/cloud_workload_security/getting_started
  - /security/cloud_workload_security/setup
  - /security/threats/setup
  - /security_platform/cspm/getting_started
  - /security/cspm/getting_started
  - /security/cspm/setup
  - /security/misconfigurations/setup
  - /security/vulnerabilities/setup
  - /security/infrastructure_vulnerabilities/setup/
  - /security/cloud_security_management/setup/csm_enterprise
  - /security/cloud_security_management/setup/csm_cloud_workload_security
  - /security/cloud_security_management/setup/csm_pro
---

This article provides step-by-step instructions for setting up [Cloud Security Management (CSM)][6].

## Overview

Datadog provides a guided workflow for enabling CSM. The first step is to select the features you want to enable.

## Select and enable features

The following instructions apply to new CSM users only. If you're an existing user and would like to enable additional CSM features, see [Enable additional features](#enable-additional-features).

1. On the [Intro to Cloud Security Management][10] page, click **Get Started with Cloud Security Management**.
1. On the [Features][11] page, select the features you want to enable.
1. Click **Start Using Cloud Security Management** and confirm your selections.

{{< img src="security/csm/setup/features_selection_new_user.png" alt="CSM Features page" width="100%">}}

## Configure CSM features

After you confirm your selections, the [Setup][3] page appears. CSM customizes the instructions on the page to match the features you selected. For example, if you enable Compliance Scanning, CSM displays only the **Cloud accounts** and **Hosts and containers** sections.

{{< img src="security/csm/setup/settings_page.png" alt="CSM Settings page" width="100%">}}

The following table shows which sections appear on the Setup page for each feature.

| Feature                            | Setup page                                 |
|------------------------------------|--------------------------------------------|
| Compliance Scanning                | Cloud accounts, Source code integrations   |
| Threat Detection                   | Hosts and containers, Serverless resources |
| Identity Risks (CIEM)              | CloudTrail logs                            |
| Host Vulnerability Management      | Hosts and containers                       |
| Container Vulnerability Management | Hosts and containers                       |

**Note**: For instructions for setting up Agentless Scanning, see [Setting up CSM Agentless Scanning][4].

### Cloud accounts

**Available for**: Compliance Scanning

To enable resource scanning for your cloud accounts, set up the AWS, Azure, or Google Cloud integration, and then enable CSM for each AWS account, Azure subscription, or Google Cloud project. For detailed instructions, see [Enabling Cloud Security Management for Cloud Accounts][2].

### Hosts and containers

**Available for**: Threat Detection &#124; Host Vulnerability Management 	&#124; Container Vulnerability Management

Select your infrastructure type for detailed instructions on how to enable CSM on hosts and containers.

[Enabling Cloud Security Management on the Agent][1]

{{< partial name="csm/csm-agent-tiles.html" >}}

<br>

### Serverless resources

**Available for**: Threat Detection

For detailed instructions, see [AWS Fargate Configuration Guide for Datadog Security][7].

### CloudTrail logs

**Available for**: Identity Risks (CIEM)

Set up AWS CloudTrail logs forwarding to enable CSM Identity Risks and address over-permissive entitlements and risky IAM resources. For detailed instructions, see [Enable Cloud Security Management for Cloud Accounts][2].

### Source code integrations

**Available for**: Compliance Scanning

Enable Infrastructure as Code (IaC) remediation for your Github repositories. For detailed instructions, see [Enabling Source Code Integrations for IAC Remediation][8].

## Enable additional features

You can enable additional CSM features at any time by returning to the [Features][11] page and clicking **Enable** for the features you want to enable. This page also serves as a status page that indicates which features are enabled, which features have been enabled but not yet configured, and which features have not been enabled.

[1]: /security/cloud_security_management/setup/agent
[2]: /security/cloud_security_management/setup/cloud_accounts
[3]: https://app.datadoghq.com/security/configuration/csm/setup
[4]: /security/cloud_security_management/setup/agentless_scanning
[5]: https://app.datadoghq.com/security/csm
[6]: /security/cloud_security_management/
[7]: /security/guide/aws_fargate_config_guide/?tab=amazonecs#cloud-security-management
[8]: /security/cloud_security_management/setup/source_code_integrations
[9]: https://app.datadoghq.com/security/getting-started
[10]: https://app.datadoghq.com/security/csm/intro
[11]: https://app.datadoghq.com/security/configuration/csm/features