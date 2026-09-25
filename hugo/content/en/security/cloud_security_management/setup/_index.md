---
title: Setting up Cloud Security
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
    - link: "/security/cloud_security_management/setup/choose_deployment_method"
      tag: "Documentation"
      text: "Choose a Deployment Method"
    - link: "/security/guide/aws_fargate_config_guide"
      tag: "Documentation"
      text: "AWS Fargate Configuration Guide for Datadog Security"
    - link: "/security/cloud_security_management/guide/agent_variables/"
      tag: "Guide"
      text: "Cloud Security Agent Variables"
---

## Overview

To get started with Cloud Security, review the following:

- [Choose a deployment method](#choose-a-deployment-method)
- [Agentless setup](#agentless-setup)
- [Agent setup](#agent-setup)
- [CI/CD setup](#cicd-setup)
- [Disable Cloud Security](#disable-cloud-security)
- [Further reading](#further-reading)

## Choose a deployment method

Cloud Security supports agentless, Agent-based, and CI/CD deployments. Each deployment type supports a different set of features. To see which features are available for each deployment type, see [Choose a Deployment Method][10].

## Agentless setup

Agentless setup lets you use Cloud Security without installing anything on individual resources. For an overview of all agentless setup options, see [Agentless Setup][1].

### Agentless Scanning

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Agentless Scanning is not available in the selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Datadog recommends getting started with Cloud Security by [enabling Agentless Scanning][1]. Agentless Scanning provides the broadest coverage across your AWS, Azure, and GCP cloud infrastructure: it scans all hosts, running containers, and other supported workloads without requiring you to install anything on individual resources.

To learn more about Agentless Scanning, see [Cloud Security Agentless Scanning][2].

### Cloud accounts and resource scanning

Monitor your compliance security coverage and secure your cloud infrastructure against IAM-based attacks by enabling resource scanning for AWS, Azure, GCP, and OCI resources. For more information, see [Misconfigurations: Cloud Accounts and Resource Scanning][7].

### AWS CloudTrail logs

Maximize the benefits of [Cloud Security Identity Risks][6] with AWS CloudTrail logs. Gain deeper insights into cloud resource usage, identifying users and roles with significant gaps between provisioned and used permissions. For more information, see [Identity Risks: AWS CloudTrail Logs][4].

## Agent setup

Agentless Scanning covers your entire cloud infrastructure, but deploying the Datadog Agent on critical hosts adds deeper security context such as runtime vulnerability prioritization, real-time updates, and host benchmarks. The following table outlines the improvements offered by Agent-based deployments. For more information, see [Agent Setup][3].

<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Agentless</th>
      <th>Agentless &#43; Agent-based deployment</th>
      <th>Agent-based deployment</th>
    </tr>
  </thead>
  <tr>
    <td><strong><a href="/security/cloud_security_management/identity_risks">Cloud Security Identity Risks</a></strong></td>
    <td>{{< X >}}</td>
    <td>{{< X >}}</td>
    <td></td>
  </tr>
  <tr>
    <td><strong><a href="/security/cloud_security_management/misconfigurations">Cloud Security Misconfigurations</a></strong></td>
    <td>{{< X >}}</td>
    <td>{{< X >}}</td>
    <td>{{< X >}}</td>
  </tr>
  <tr>
    <td style="padding-left: 20px;"><a href="/security/default_rules/?search=host+benchmarks">Host benchmarks</a></td>
    <td></td>
    <td>{{< X >}}</td>
    <td>{{< X >}}</td>
  </tr>
  <tr>
    <td><strong><a href="/security/cloud_security_management/vulnerabilities">Cloud Security Vulnerabilities</a></strong></td>
    <td>{{< X >}}</td>
    <td>{{< X >}}</td>
    <td>{{< X >}}</td>
  </tr>
  <tr>
    <td style="padding-left: 20px;">Vulnerability prioritization</td>
    <td>{{< X >}}</td>
    <td>{{< X >}}<br />With runtime context</td>
    <td>{{< X >}}<br />With runtime context</td>
  </tr>
  <tr>
    <td style="padding-left: 20px;">Vulnerability update frequency</td>
    <td>12 hours</td>
    <td>Real time</td>
    <td>Real time</td>
  </tr>
  <tr>
    <td><strong><a href="/security/security_inbox">Security Inbox</a></strong></td>
    <td>{{< X >}}</td>
    <td>{{< X >}}<br />With more accurate insights</td>
    <td>{{< X >}}<br />With more accurate insights</td>
  </tr>
</table>

## CI/CD setup

### Vulnerability scanning

Scan container images for vulnerabilities during your CI/CD pipelines, before deploying images to production. The Datadog Security CLI runs directly in your CI jobs, giving you control over when and how scans are executed. For more information, see [Container Image Scanning in CI/CD][9].

### IaC mapping

Connect Cloud Security misconfiguration findings to the infrastructure as code (IaC) that defines the affected resource so you can remediate at the source. For more information, see [IaC Mapping][11].

## Disable Cloud Security

For information on disabling Cloud Security, see the following:

- [Disable Cloud Security Vulnerabilities][8]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/setup/agentless
[2]: /security/cloud_security_management/setup/agentless/vulnerabilities
[3]: /security/cloud_security_management/setup/agent
[4]: /security/cloud_security_management/setup/agentless/identity_risks
[6]: /security/cloud_security_management/identity_risks
[7]: /security/cloud_security_management/setup/agentless/misconfigurations
[8]: /security/cloud_security_management/troubleshooting/vulnerabilities/#disable-cloud-security-vulnerabilities
[9]: /security/cloud_security_management/setup/ci_cd/vulnerability_scanning
[10]: /security/cloud_security_management/setup/choose_deployment_method
[11]: /security/cloud_security_management/setup/ci_cd/iac_mapping
