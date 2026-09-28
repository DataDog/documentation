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
    - link: "/security/cloud_security_management/setup/supported_deployment_types"
      tag: "Documentation"
      text: "Cloud Security Coverage and Collection Methods"
    - link: "/security/guide/aws_fargate_config_guide"
      tag: "Documentation"
      text: "AWS Fargate Configuration Guide for Datadog Security"
    - link: "/security/cloud_security_management/guide/agent_variables/"
      tag: "Guide"
      text: "Cloud Security Agent Variables"
---

## Overview

To get started with Cloud Security, review the following:

- [Choose a coverage and collection method](#choose-a-coverage-and-collection-method)
- [Enable Agentless Scanning](#enable-agentless-scanning) for supported vulnerability discovery without an Agent on every resource
- [Deploy the Unified Datadog Agent](#deploy-the-agent-for-deeper-context) for host and runtime context
- [Deploy using cloud integrations](#deploy-using-cloud-integrations) for cloud configuration and identity assessment
- [Scan container images in CI/CD](#container-image-scanning-in-cicd) before deployment
- [Enable AWS CloudTrail Logs](#aws-cloudtrail-logs) for additional Identity Risks context
- [Disable Cloud Security](#disable-cloud-security)
- [Further reading](#further-reading)

## Choose a coverage and collection method

Cloud Security has three collection families. You can use more than one:

- **Unified Datadog Agent** collects host and runtime context. This includes Host Agent, Cluster Agent, and serverless Agent deployments.
- **Agentless** includes cloud integrations for cloud configuration and identity assessment, and Agentless Scanning for supported vulnerability discovery in AWS, Azure, and GCP.
- **Repository and CI/CD integrations** scan container images before deployment and connect findings to source code.

For a capability-by-asset overview, prerequisites, and exclusions, see [Cloud Security Coverage and Collection Methods][10].

## Enable Agentless Scanning

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Agentless Scanning is not available in the selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

For vulnerability discovery across supported AWS, Azure, and GCP assets, start by [enabling Agentless Scanning][1]. It does not require the Datadog Agent on each scanned resource, but coverage depends on the provider, asset type, and platform. It is not a replacement for cloud integrations, CI/CD image scanning, or runtime threat detection.

To learn more about Agentless Scanning, see [Cloud Security Agentless Scanning][2].

## Deploy the Agent for deeper context

Deploy the Unified Datadog Agent on critical hosts and workloads when you need deeper security context, real-time vulnerability updates, host benchmarks, or runtime threat detection. The following table compares the context available through Agentless Scanning and an Agent-based deployment. For more information, see [Setting up Cloud Security on the Agent][3].

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

## Enable additional features

### Container Image Scanning in CI/CD

Scan container images for vulnerabilities during your CI/CD pipelines, before deploying images to production. The Datadog Security CLI runs directly in your CI jobs, giving you control over when and how scans are executed. For more information, see [Container Image Scanning in CI/CD][9].

### AWS CloudTrail Logs

Maximize the benefits of [Cloud Security Identity Risks][6] with AWS CloudTrail Logs. Gain deeper insights into cloud resource usage, identifying users and roles with significant gaps between provisioned and utilized permissions. For more information, check out [Setting up AWS CloudTrail Logs for Cloud Security][4].

### Deploy using cloud integrations

Monitor your compliance security coverage and secure your cloud infrastructure against IAM-based attacks by enabling resource scanning for AWS, Azure, GCP, and OCI resources. For more information, see [Deploying Cloud Security using Cloud Integrations][7].

## Disable Cloud Security

For information on disabling Cloud Security, see the following:

- [Disable Cloud Security Vulnerabilities][8]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/setup/agentless_scanning/enable
[2]: /security/cloud_security_management/agentless_scanning
[3]: /security/cloud_security_management/setup/agent
[4]: /security/cloud_security_management/setup/cloudtrail_logs
[6]: /security/cloud_security_management/identity_risks
[7]: /security/cloud_security_management/setup/cloud_accounts
[8]: /security/cloud_security_management/troubleshooting/vulnerabilities/#disable-cloud-security-vulnerabilities
[9]: /security/cloud_security_management/setup/ci_cd
[10]: /security/cloud_security_management/setup/supported_deployment_types
