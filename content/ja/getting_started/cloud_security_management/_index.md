---
further_reading:
- link: /security/cloud_security_management/
  tag: Documentation
  text: Cloud Security Management
- link: /infrastructure/resource_catalog/schema/
  tag: Documentation
  text: Cloud Resources Schema Reference
- link: https://www.datadoghq.com/blog/automate-end-to-end-processes-with-datadog-workflows/
  tag: Blog
  text: Automate end-to-end processes with Datadog Workflows
- link: https://www.datadoghq.com/blog/csm-at-datadog/
  tag: Blog
  text: How we use Datadog CSM to improve security posture in our cloud infrastructure
- link: https://www.datadoghq.com/blog/detecting-leaked-credentials/
  tag: Blog
  text: How we detect and notify users about leaked Datadog credentials
- link: https://www.datadoghq.com/blog/security-posture-csm/
  tag: Blog
  text: Report on changes to your security posture with Cloud Security Management
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: Join an interactive session to elevate your security and threat detection
- link: https://securitylabs.datadoghq.com/
  tag: Security Labs
  text: Security research, reports, tips, and videos from Datadog
kind: documentation
title: Getting Started with Cloud Security Management
---

## Overview

[Datadog Cloud Security Management][1] (CSM) delivers real-time threat detection and continuous configuration audits across your entire cloud infrastructure. Powered by observability data, CSM includes [Misconfigurations][2] and [Threats][3].

This guide walks you through best practices for getting your team up and running with CSM.

## Phase 1: Deployment

1. Install the [Datadog Agent (version 7.46 or above)][4].
2. [Enable CSM for for your cloud resources and infrastructure][5]:
    - **CSM Threats**: Kubernetes, Docker, and host-based installations.
    - **CSM Misconfigurations**: AWS, Azure, GCP, Kubernetes, and Docker instructions.
    - **CSM Identity Risks**: Enable AWS resource collection and Cloudtrail logs forwarding.
    - **CSM Vulnerabilities**: Container image scanning and host scanning instructions for Kubernetes, ECS EC2 instances, and host-based installations.
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

[1]: /ja/security/cloud_security_management/
[2]: /ja/security/cloud_security_management/misconfigurations/
[3]: /ja/security/threats/
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: /ja/security/cloud_security_management/setup
[13]: https://app.datadoghq.com/security/csm
[14]: /ja/security/default_rules/#cat-cloud-security-management
[15]: /ja/security/cloud_security_management/misconfigurations/signals_explorer/
[16]: /ja/security/cloud_security_management/misconfigurations/findings/
[17]: https://app.datadoghq.com/security/configuration/notification-rules
[18]: /ja/security/cloud_security_management/guide/tuning-rules/
[19]: /ja/security/cloud_security_management/misconfigurations/custom_rules
[20]: /ja/security/threats/agent_expressions
[21]: /ja/security/cloud_security_management/misconfigurations/frameworks_and_benchmarks
[22]: /ja/dashboards/#overview
[25]: https://app.datadoghq.com/containers/images
[26]: /ja/integrations/amazon_web_services/?tab=roledelegation#cloud-security-posture-management
[27]: /ja/integrations/amazon_cloudtrail/#send-logs-to-datadog
[28]: /ja/security/cloud_security_management/identity_risks/
[29]: https://app.datadoghq.com/security/identities
[30]: https://app.datadoghq.com/security/infra-vulnerability
[31]: https://app.datadoghq.com/security/configuration/reports