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
    - link: "/security/cloud_security_management/guide/agent_variables/"
      tag: "Guide"
      text: "Cloud Security Management Agent Variables"
---

Datadog provides a guided workflow for setting up [Cloud Security Management (CSM)][6]. The first step is to select the features you want to enable. After that, follow the instructions provided to configure the selected features.

<div class="alert alert-info">The following instructions apply to new CSM users only. If you're an existing user and would like to enable additional CSM features, see <a href="/security/cloud_security_management/setup/#enable-additional-features">Enable additional features</a>.</div>

1. On the [Intro to Cloud Security Management][10] page, click **Get Started with Cloud Security Management**.
1. On the [Features][11] page, select the features you want to enable.
1. Click **Start Using Cloud Security Management** and confirm your selections.

{{< img src="security/csm/setup/features_selection_new_user.png" alt="CSM Features page" width="100%">}} 

After you confirm your selections, the [Setup][3] page appears. The instructions on the page are customized to match the features you selected. For example, if you enable **Compliance Scanning**, only the **Cloud accounts** and **Hosts and containers** sections are displayed.

<!-- {{< img src="security/csm/setup/settings_page.png" alt="CSM Settings page" width="100%">}} -->

The following table shows which sections appear on the Setup page for each feature.

<table>
  <thead>
    <tr>
      <th style="width: 50%;">Feature</th>
      <th style="width: 50%;">Setup page</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Misconfigurations</td>
      <td>
        <ul style="font-size: 16px;">
          <li><a href="/security/cloud_security_management/setup/cloud_accounts">Cloud accounts</a></li>
          <li><a href="/security/cloud_security_management/setup/agent">Hosts and containers</a></li>
          <li><a href="/security/guide/aws_fargate_config_guide/?tab=amazonecs#cloud-security-management">Serverless resources</a></li>
          <li><a href="/security/cloud_security_management/setup/cloud_accounts/?tab=aws#set-up-cloudtrail-logs-forwarding">CloudTrail logs</a></li>
          <li><a href="/security/cloud_security_management/setup/source_code_integrations">Source code integrations</a></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Threat Detection</td>
      <td>
        <ul style="font-size: 16px;">
          <li><a href="/security/cloud_security_management/setup/agent">Hosts and containers</a></li>
          <li><a href="/security/guide/aws_fargate_config_guide/?tab=amazonecs#cloud-security-management">Serverless resources</a></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Identity Risks (CIEM)</td>
      <td>
        <ul style="font-size: 16px;">
          <li><a href="/security/cloud_security_management/setup/cloud_accounts/?tab=aws#set-up-cloudtrail-logs-forwarding">CloudTrail logs</a></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Host Vulnerability Management</td>
      <td>
        <ul style="font-size: 16px;">
          <li><a href="/security/cloud_security_management/setup/agent">Hosts and containers</a></li>
          <li><a href="/security/guide/aws_fargate_config_guide/?tab=amazonecs#cloud-security-management">Serverless resources</a></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Container Vulnerability Management</td>
      <td>
        <ul style="font-size: 16px;">
          <li><a href="/security/cloud_security_management/setup/agent">Hosts and containers</a></li>
          <li><a href="/security/guide/aws_fargate_config_guide/?tab=amazonecs#cloud-security-management">Serverless resources</a></li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

<div class="alert alert-info">For instructions on setting up Agentless Scanning, see <a href="/security/cloud_security_management/setup/agentless_scanning">Setting up CSM Agentless Scanning</a>.</div>

## Enable additional features

You can enable additional CSM features at any time by returning to the [Features][11] page and clicking **Enable** for the features you want to add. This page also serves as a status page that indicates which features are enabled, which features are enabled but not yet configured, and which features are not enabled.

{{< img src="security/csm/setup/features_page.png" alt="CSM Features page" width="100%">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/setup/agent
[2]: /security/cloud_security_management/setup/cloud_accounts
[3]: https://app.datadoghq.com/security/configuration/csm/setup
[4]: /security/cloud_security_management/setup/agentless_scanning
[5]: https://app.datadoghq.com/security/csm
[6]: /security/cloud_security_management/
[7]: /security/guide/aws_fargate_config_guide/
[8]: /security/cloud_security_management/setup/source_code_integrations
[9]: https://app.datadoghq.com/security/getting-started
[10]: https://app.datadoghq.com/security/csm/intro
[11]: https://app.datadoghq.com/security/configuration/csm/features
[12]: /security/cloud_security_management/setup/threat_detection
[13]: /security/cloud_security_management/setup/identity_risks_ciem
[14]: /security/cloud_security_management/setup/host_vulnerability_management
[15]: /security/cloud_security_management/setup/container_vulnerability_management
