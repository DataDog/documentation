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

placeholder text.

## Getting started

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

To get started setting up CSM, navigate to the [**Cloud Security Management Setup**][4] page in Datadog, which has detailed steps on how to configure CSM. For detailed setup instructions, see the [CSM Enterprise][1], [CSM Pro][2], [CSM Workload Security][3], and [CSM Agentless Scanning][12] setup docs.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/setup/csm_enterprise
[2]: /security/cloud_security_management/setup/csm_pro
[3]: /security/cloud_security_management/setup/csm_cloud_workload_security
[12]: /security/cloud_security_management/setup/agentless_scanning