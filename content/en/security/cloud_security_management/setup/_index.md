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

Cloud Security Management (CSM) delivers real-time threat detection and continuous configuration audits across your entire cloud infrastructure, all in a unified view for seamless collaboration and faster remediation.

## Prerequisites

- Datadog Agent version `7.46` or later.

## Installation methods

text

### Datadog app

text

### Fleet Automation

text

## Select features

On the [Cloud Security Management page][5] in Datadog, 

### Enable CSM

To enable CSM on your infrastructure, complete the following steps:

navigate to the [**Cloud Security Management Setup**][3] page in Datadog, which has detailed steps on how to configure CSM. For detailed setup instructions, see the following articles:

#### Enable resource scanning for cloud accounts

To enable resource scanning for your cloud accounts, you must first set up the integration and then enable CSM for each AWS account, Azure subscription, or Google Cloud project. For detailed instructions, see [Enable Cloud Security Management for Cloud Accounts][2].

#### Set up CloudTrail logs forwarding

Set up AWS CloudTrail logs forwarding to enable CSM Identity Risks and address over-permissive entitlements and risky IAM resources. For detailed instructions, see [Enable Cloud Security Management for Cloud Accounts][2].

#### Enable CSM on the Agent

Select your infrastructure type for details on how to enable [CSM Enterprise on the Agent][1].

{{< partial name="csm/csm-agent-tiles.html" >}}

<br>

[1]: /security/cloud_security_management/setup/agent
[2]: /security/cloud_security_management/setup/cloud_accounts
[3]: https://app.datadoghq.com/security/configuration/csm/setup
[4]: /security/cloud_security_management/setup/agentless_scanning
[5]: https://app.datadoghq.com/security/csm