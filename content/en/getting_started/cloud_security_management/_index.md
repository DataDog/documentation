---
title: Getting Started with Cloud Security Management
kind: documentation
further_reading:
- link: "/security/cloud_security_management/"
  tag: "Documentation"
  text: "Cloud Security Management"
- link: "/security/misconfigurations/custom_rules/schema/"
  tag: "Documentation"
  text: "CSM Misconfigurations cloud resources schema"
- link: "https://www.datadoghq.com/blog/automate-end-to-end-processes-with-datadog-workflows/"
  tag: "Blog"
  text: "Automate end-to-end processes with Datadog Workflows"
- link: "https://www.datadoghq.com/blog/csm-at-datadog/"
  tag: "Blog"
  text: "How we use Datadog CSM to improve security posture in our cloud infrastructure"
- link: "https://dtdg.co/fe"
  tag: "Foundation Enablement"
  text: "Join an interactive session to elevate your security and threat detection"
- link: "https://securitylabs.datadoghq.com/"
  tag: "Security Labs"
  text: "Security research, reports, tips, and videos from Datadog"
---

## Overview

[Datadog Cloud Security Management][1] (CSM) delivers real-time threat detection and continuous configuration audits across your entire cloud infrastructure. Powered by observability data, CSM includes [Misconfigurations][2] and [Threats][3].

This guide walks you through best practices for getting your team up and running with CSM.

## Phase 1: Deployment

1. Install the [Datadog Agent (version 7.46 or above)][4].
2. Enable CSM for for your cloud resources and infrastructure:
    - **CSM Threats**: [Kubernetes][5], [Docker][6], and [host-based][7] installations.
    - **CSM Misconfigurations**: [AWS][10], [Azure][11], [GCP][12], [Kubernetes][8], and [Docker][9] instructions.
    - **CSM Identity Risks**: Enable [AWS resource collection][26] and [Cloudtrail logs forwarding][27].
    - **CSM Vulnerabilities**: [Container image scanning][23] and [host scanning][24] instructions for Kubernetes, ECS EC2 instances, and host-based installations.
3. Check out the [CSM homepage][13] to get an overview of your organization's risks and threats.
4. Review [500+ out-of-the-box Threats and Misconfigurations detection rules][14].
5. Explore [security signals][15] and review [CSM Misconfigurations findings][16].
6. Review and remediate [identity risks][28] on the [Identity Risks][29] page.
7. Review container vulnerabilities on the [Container Images][25] page, and a consolidated list of vulnerabilities on the [Infrastructure Vulnerability][30] page.
8. Set up [notification rules][17] and receive alerts using Slack, Jira, email, and more.

## Phase 2: Customization

1. Set up [CSM Threats suppression rules][18] to reduce noise.
2. Create custom detection rules for [CSM Misconfigurations][19] and [CSM Threats][20].

## Phase 3: Reports and dashboards

1. Assess your organization's posture by reviewing [compliance reports][21].
2. Use out-of-the-box dashboards or [create your own][22] for faster investigations, reporting, and monitoring.
3. Subscribe to the weekly [security digest][31] reports to begin investigation and remediation of the most important new security issues discovered in the last seven days. 

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/
[2]: /security/misconfigurations/
[3]: /security/threats/
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: /security/threats/setup/?tab=kuberneteshelm#configure-the-csm-threats-agent
[6]: /security/threats/setup/?tab=docker#configure-the-csm-threats-agent
[7]: /security/threats/setup/?tab=hostothers#configure-the-csm-threats-agent
[8]: /security/misconfigurations/setup?tab=kubernetes
[9]: /security/misconfigurations/setup?tab=docker
[10]: /security/misconfigurations/setup?tab=aws
[11]: /security/misconfigurations/setup?tab=azure
[12]: /security/misconfigurations/setup?tab=googlecloud
[13]: https://app.datadoghq.com/security/csm
[14]: /security/default_rules/#cat-cloud-security-management
[15]: /security/misconfigurations/signals_explorer/
[16]: /security/misconfigurations/findings/
[17]: https://app.datadoghq.com/security/configuration/notification-rules
[18]: /security/cloud_security_management/guide/tuning-rules/
[19]: /security/misconfigurations/custom_rules
[20]: /security/threats/agent_expressions
[21]: /security/misconfigurations/frameworks_and_benchmarks
[22]: /dashboards/#overview
[23]: /security/cloud_security_management/setup/csm_pro?tab=aws#configure-csm-for-container-vulnerabilities
[24]: /security/cloud_security_management/setup/csm_enterprise?tab=aws#configure-csm-for-vulnerabilities
[25]: https://app.datadoghq.com/containers/images
[26]: /integrations/amazon_web_services/?tab=roledelegation#cloud-security-posture-management
[27]: /integrations/amazon_cloudtrail/#send-logs-to-datadog
[28]: /security/identity_risks/
[29]: https://app.datadoghq.com/security/identities
[30]: https://app.datadoghq.com/security/infra-vulnerability
[31]: https://app.datadoghq.com/security/configuration/reports
