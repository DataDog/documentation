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
further_reading:
    - link: "/security/cloud_security_management/setup/supported_deployment_types"
      tag: "Documentation"
      text: "Supported Deployment Types"
    - link: "/security/cloud_security_management/setup/agentless_scanning"
      tag: "Documentation"
      text: "Enabling Agentless Scanning"
    - link: "/security/cloud_security_management/setup/custom_onboarding"
      tag: "Documentation"
      text: "Custom Onboarding for Cloud Security Management"
    - link: "/security/cloud_security_management/guide/agent_variables/"
      tag: "Guide"
      text: "Cloud Security Management Agent Variables"
---

## Overview

To get started with Cloud Security Management, follow these steps:

1. [Enable Agentless Scanning](#enable-agentless-scanning)
1. [Deploy the Agent for additional coverage](#deploy-the-agent-for-additional-coverage)

## Enable Agentless Scanning

The simplest way to get started with Cloud Security Management is with [Agentless Scanning][1]. Agentless Scanning provides visibility into vulnerabilities that exist within your AWS hosts, running containers, Lambda functions, and Amazon Machine Images (AMIs) without requiring you to install the Datadog Agent.

For additional coverage, you can [deploy the Agent](#deploy-the-agent-for-additional-coverage) to your **X, Y, and Z**.

## Deploy the Agent for additional coverage

For broader coverage and additional functionalities, deploy the Agent to your **X, Y, and Z**. The following table outlines the improvements offered by Agent-based deployments.

| Feature                          | CSM Pro Agentless | CSM Pro Agentless + Agent          |
|----------------------------------|-------------------|------------------------------------|
| CIEM                             | Yes               | Yes                                |
| Cloud Security Posture Management| Yes               | Yes                                |
| AMI support                      | Yes               | Yes                                |
| Security Inbox                   | Yes               | Yes, with more accurate insights   |
| Vulnerability prioritization     | Yes               | Yes, with runtime context          |
| Serverless support               | AWS Lambda        | AWS Lambda                         |
| Coverage                         | All cloud hosts   | All cloud & non-cloud hosts        |
| Vulnerability freshness          | 12 hours          | Real time                          |
| Threat detection                 | No                | Yes                                |
| Host benchmark                   | No                | Yes                                |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/agentless_scanning
[2]: https://app.datadoghq.com/security/configuration/csm/features
[3]: /security/cloud_security_management/setup/custom_onboarding
[4]: /security/cloud_security_management/agentless_scanning
[5]: /security/cloud_security_management/setup/agentless_scanning
[6]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner
[7]: /security/cloud_security_management/guide/agentless_terraform