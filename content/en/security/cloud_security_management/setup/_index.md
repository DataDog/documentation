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

## Select features

On the [Cloud Security Management page][5] in Datadog, 

## Enable CSM

To enable CSM on your infrastructure, complete the following steps:

### Enable resource scanning for cloud accounts

To enable resource scanning for your cloud accounts, you must first set up the integration and then enable CSM for each AWS account, Azure subscription, or Google Cloud project. For detailed instructions, see Enable Cloud Security Management for Cloud Accounts.

### Set up CloudTrail logs forwarding

Set up AWS CloudTrail logs forwarding to enable CSM Identity Risks and address over-permissive entitlements and risky IAM resources. For detailed instructions, see Enable Cloud Security Management for Cloud Accounts.

### Enable CSM on the Agent

Select your infrastructure type for details on how to enable CSM Enterprise on the Agent.

{{< partial name="csm/csm-agent-tiles.html" >}}

<br>

## Next steps

To get started setting up CSM, navigate to the [**Cloud Security Management Setup**][3] page in Datadog, which has detailed steps on how to configure CSM. For detailed setup instructions, see the following articles:

- [Enabling Cloud Security Management on the Agent][1]
- [Enabling Cloud Security Management for Cloud Accounts][2]
- [Setting up CSM Agentless Scanning][4]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/setup/agent
[2]: /security/cloud_security_management/setup/cloud_accounts
[3]: https://app.datadoghq.com/security/configuration/csm/setup
[4]: /security/cloud_security_management/setup/agentless_scanning
[5]: https://app.datadoghq.com/security/csm