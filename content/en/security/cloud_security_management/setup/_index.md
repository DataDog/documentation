---
title: Enabling Cloud Security Management
kind: documentation
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
---

This article provides step-by-step instructions for enabling [Cloud Security Management (CSM)][6].

## Prerequisites

- Datadog Agent version `7.46` or later.

## Select CSM features

Datadog provides a guided workflow for enabling CSM. The first step is to select the features you want to enable. Start by clicking **Get Started with Cloud Security Management** on the Overview page to access the **Features** page. 

Next, select the features you want to enable. After making your selections, click **Start Using Cloud Security Management** and confirm your choices.

- Compliance Scanning
- Threat Detection
- Identity Risks (CIEM)
- Host Vulnerability Management
- Container Vulnerability Management

**PLACEHOLDER FOR SCREENSHOT**

## Configure CSM features

After confirming your selections, the [Setup][3] page is displayed. The page customizes the instructions to match the features you selected.

**PLACEHOLDER FOR SCREENSHOT**

For detailed setup instructions, see the following articles:

- [Enabling Cloud Security Management for Cloud Accounts][2]
- [Enabling Cloud Security Management on the Agent][1]
- [Enabling Cloud Security Management for Serverless][7]
- [Enabling Source Code Integrations for IAC Remediation][8]
- [Setting up CSM Agentless Scanning][4]

### Cloud accounts

**Available for**: Threat Detection &#124; Host Vulnerability Management 	&#124; Container Vulnerability Management

To enable resource scanning for your cloud accounts, you must first set up the integration and then enable CSM for each AWS account, Azure subscription, or Google Cloud project. For detailed instructions, see [Enable Cloud Security Management for Cloud Accounts][2].

### Hosts and containers

**Available for**: Compliance Scanning

Select your infrastructure type for detailed instructions on how to enable CSM on hosts and containers.

{{< partial name="csm/csm-agent-tiles.html" >}}

<br>

### Serverless resources

**Available for**: Compliance Scanning

For detailed instructions, see [Enabling Cloud Security Management on Serverless][7].

### CloudTrail logs

**Available for the following features**: Identity Risks (CIEM)

**Applies to the following features**: Identity Risks (CIEM)

Set up AWS CloudTrail logs forwarding to enable CSM Identity Risks and address over-permissive entitlements and risky IAM resources. For detailed instructions, see [Enable Cloud Security Management for Cloud Accounts][2].

### Source code integrations

**Available for**: Compliance Scanning

For detailed instructions, see [Enabling Source Code Integrations for IAC Remediation][8].

[1]: /security/cloud_security_management/setup/agent
[2]: /security/cloud_security_management/setup/cloud_accounts
[3]: https://app.datadoghq.com/security/configuration/csm/setup
[4]: /security/cloud_security_management/setup/agentless_scanning
[5]: https://app.datadoghq.com/security/csm
[6]: /security/cloud_security_management/
[7]: /security/cloud_security_management/setup/serverless
[8]: /security/cloud_security_management/setup/source_code_integrations