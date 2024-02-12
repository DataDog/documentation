---
title: Setting up CSM Enterprise
kind: documentation
further_reading:
  - link: "/security/cloud_security_management/setup"
    tag: "Documentation"
    text: "Setting up Cloud Security Management"
  - link: "/security/threats/"
    tag: "Documentation"
    text: "Cloud Security Management Threats"
  - link: "/security/misconfigurations/"
    tag: "Documentation"
    text: "Cloud Security Management Misconfigurations"
  - link: "/security/identity_risks/"
    tag: "Documentation"
    text: "Cloud Security Management Identity Risks"
  - link: "/security/vulnerabilities/"
    tag: "Documentation"
    text: "Cloud Security Management Vulnerabilities"
  - link: "/agent/remote_config"
    tag: "Documentation"
    text: "Remote Configuration"
---

The Cloud Security Management (CSM) Enterprise package includes [CSM Threats][1], [CSM Misconfigurations][2] (cloud accounts and Agent), [CSM Identity Risks][3], and [CSM Vulnerabilities][4] (container images and hosts). To learn more about the available CSM packages, see [Setting up Cloud Security Management][8].

## Getting started

To enable CSM Enterprise on your infrastructure, complete the following steps:

### Enable resource scanning for cloud accounts

To enable resource scanning for your cloud accounts, you must first set up the integration and then enable CSM for each AWS account, Azure subscription, or Google Cloud project. For detailed instructions, see [Enable CSM Enterprise for Cloud Accounts][22].

### Set up CloudTrail logs forwarding

Set up AWS CloudTrail logs forwarding to enable CSM Identity Risks and address over-permissive entitlements and risky IAM resources. For detailed instructions, see [Enable CSM Enterprise for Cloud Accounts][22].

### Enable CSM Enterprise on the Agent

Select your infrastructure type for details on how to enable CSM Enterprise on the Agent.

{{< partial name="csm/csm-enterprise-agent-tiles.html" >}}

<br>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/threats
[2]: /security/misconfigurations
[3]: /security/identity_risks
[4]: /security/vulnerabilities
[5]: https://app.datadoghq.com/security/configuration/csm/setup
[6]: /agent/remote_config
[7]: /agent/remote_config/?tab=environmentvariable#enabling-remote-configuration
[8]: /security/cloud_security_management/setup
[11]: https://www.cisa.gov/sbom
[12]: /security/cloud_security_management
[14]: /agent
[15]: /security/cloud_security_management/troubleshooting
[16]: https://kubernetes.io/docs/tasks/administer-cluster/migrating-from-dockershim/find-out-runtime-you-use/
[17]: /containers/kubernetes/installation/?tab=helm
[18]: /integrations/amazon_web_services/
[19]: https://console.aws.amazon.com/cloudtrail/home
[20]: https://console.aws.amazon.com/lambda/home
[21]: https://app.datadoghq.com/logs?query=service%3Acloudtrail
[22]: /security/cloud_security_management/setup/csm_enterprise/cloud_accounts