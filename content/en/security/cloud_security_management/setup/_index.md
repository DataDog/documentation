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
    - link: "/security/guide/aws_fargate_config_guide"
      tag: "Documentation"
      text: "AWS Fargate Configuration Guide for Datadog Security"
    - link: "/security/cloud_security_management/guide/agent_variables/"
      tag: "Guide"
      text: "Cloud Security Management Agent Variables"
---

## Overview

To get started with Cloud Security Management (CSM), follow these steps:

1. [Enable Agentless Scanning](#enable-agentless-scanning)
1. [Deploy the Agent for additional coverage](#deploy-the-agent-for-additional-coverage)
1. [Enable additional features](#enable-additional-features)

## Enable Agentless Scanning

The simplest way to get started with Cloud Security Management is by [enabling Agentless Scanning][1]. Agentless Scanning provides visibility into vulnerabilities that exist within your AWS hosts, running containers, Lambda functions, and Amazon Machine Images (AMIs) without requiring you to install the Datadog Agent.

To learn more about Agentless Scanning, see [Cloud Security Management Agentless Scanning][2].

## Deploy the Agent for additional coverage

For broader coverage and additional functionalities, deploy the Datadog Agent to your hosts. The following table outlines the improvements offered by Agent-based deployments. For more information, see [Setting up Cloud Security Management on the Agent][3].

<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Agentless</th>
      <th>Agentless &#43; Agent-based deployment</th>
    </tr>
  </thead>
  <tr>
    <td><strong><a href="/security/cloud_security_management/identity_risks">CSM Identity Risks</a></strong></td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td><strong><a href="/security/cloud_security_management/misconfigurations">CSM Misconfigurations</a></strong></td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td style="padding-left: 20px;">Host benchmarks</td>
    <td>No</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td><strong><a href="/security/cloud_security_management/vulnerabilities">CSM Vulnerabilities</a></strong></td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td style="padding-left: 20px;">Vulnerability prioritization</td>
    <td>Yes</td>
    <td>Yes, with runtime context</td>
  </tr>
  <tr>
    <td style="padding-left: 20px;">Vulnerability update frequency</td>
    <td>12 hours</td>
    <td>Real time</td>
  </tr>
  <tr>
    <td><strong><a href="/security/threats">CSM Threats</a></strong></td>
    <td>No</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td style="padding-left: 20px;">Threat detection</td>
    <td>No</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td><strong><a href="/security/security_inbox">Security Inbox</a></strong></td>
    <td>Yes</td>
    <td>Yes, with more accurate insights</td>
  </tr>
</table>

## Enable additional features

### AWS CloudTrail Logs

AWS CloudTrail Logs allows you to get the most out of [CSM Identity Risks][6]. With AWS CloudTrail Logs, you gain additional insights into the actual usage of cloud resources, helping you identify users and roles with significant gaps between provisioned and utilized permissions. For more information, see [Setting up AWS CloudTrail Logs for Cloud Security Management][4].

### IaC remediation

With Infrastructure as Code (IaC) remediation, you can use Terraform to open a pull request in GitHub, applying code changes that fix a misconfiguration or identity risk. For more information, see [Setting up IaC Remediation for Cloud Security Management][5].

### Deploy via cloud integrations

Monitor your compliance security coverage and secure your cloud infrastructure against IAM-based attacks by enabling resource scanning for AWS, Azure, and GCP resources. For more information, see [Deploying Cloud Security Management via Cloud Integrations][7].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/setup/agentless_scanning
[2]: /security/cloud_security_management/agentless_scanning
[3]: /security/cloud_security_management/setup/agent
[4]: /security/cloud_security_management/setup/cloudtrail_logs
[5]: /security/cloud_security_management/setup/iac_remediation
[6]: /security/cloud_security_management/identity_risks
[7]: /security/cloud_security_management/setup/cloud_accounts