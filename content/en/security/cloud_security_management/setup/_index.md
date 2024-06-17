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
---

Datadog provides a guided workflow for setting up [Cloud Security Management (CSM)][6]. The first step is to select the features you want to enable. After that, follow the instructions provided to configure the features you selected.

<div class="alert alert-info">The following instructions apply to new CSM users only. If you're an existing user and would like to enable additional CSM features, see <a href="/security/cloud_security_management/setup/#enable-additional-features">Enable additional features</a>.</div>

1. On the [Intro to Cloud Security Management][10] page, click **Get Started with Cloud Security Management**.
1. On the [Features][11] page, select the features you want to enable.
1. Click **Start Using Cloud Security Management** and confirm your selections.

{{< img src="security/csm/setup/features_selection_new_user.png" alt="CSM Features page" width="100%">}}

After you confirm your selections, the [Setup][3] page appears. CSM customizes the instructions on the page to match the features you selected. For example, if you enable **Compliance Scanning**, CSM displays only the **Cloud accounts** and **Hosts and containers** sections.

{{< img src="security/csm/setup/settings_page.png" alt="CSM Settings page" width="100%">}}

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

<<<<<<< HEAD
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
=======
The following table summarizes the CSM features available relative to each deployment type.

<div class="alert alert-info">For more details, click each of the CSM feature headings to review additional requirements for that feature.</div>

| Deployment type            | Agent Required (7.46+) | CSM Misconfigurations | [CSM Threats][8] | [CSM Vulnerabilities][9] | [CSM Identity Risks][10] | [CSM Agentless Scanning][11] |
|------------------|------------------------|-----------------------|------------------|-------------------------|---------------------------|------------------------------|
| Docker           | {{< X >}}              | {{< X >}}             | {{< X >}}        |                         |                           |                    |
| Kubernetes       | {{< X >}}              | {{< X >}}             | {{< X >}}        | {{< X >}}               |                           |                    |
| Linux            | {{< X >}}              | {{< X >}}             | {{< X >}}        | {{< X >}}               |                           |                     |
| Amazon ECS/EKS   | {{< X >}}              | {{< X >}}             | {{< X >}}        | {{< X >}}               |                           |                     |
| AWS Account      |                        | {{< X >}}             |                  |                         | {{< X >}}                 |  beta               |
| Azure Account    |                        | {{< X >}}             |                  |                         | {{< X >}}                         |                     |
| GCP Account      |                        | {{< X >}}             |                  |                         |                           |                     |
| Windows          | {{< X >}}              |                       | {{< X >}}        |                         |                           |                     |
| AWS Fargate ECS/EKS | {{< X >}}           |                       | beta             |                         |                           |                     |
| Terraform           |                     |                       |                  |                         |                           |  beta               |

The following tables represent additional prerequisites relative to each CSM feature.

### CSM Vulnerabilities 

| Component         | Version/Requirement                         |
|-------------------|---------------------------------------------|
| [Helm Chart][103] | v3.49.6 or later (Kubernetes only)          |
| [containerd][104] | v1.5.6 or later (Kubernetes and hosts only) |

**Note**: CSM Vulnerabilities is **not** available for CRI-O runtime and podman runtime.

### CSM Identity Risks 

<div class="alert alert-info"><strong>Note</strong>: CSM Identity Risks is available for AWS and Azure.</div>

To use CSM Identity Risks, you must [enable resource collection for AWS][105]. If you've already done this, no additional setup is required.

**Notes**: 

- If you've [enabled CSM Misconfigurations for your AWS accounts][106], you already have cloud resource collection enabled.
- Although not required, when you [enable CloudTrail logs forwarding][107], you get additional insights based on the actual usage (or non-usage) of resources in your infrastructure, for example, users and roles with significant gaps between provisioned and used permissions.
</br>

## Scope of coverage

The following table summarizes the scope of coverage available relative to each CSM feature.
| Resources monitored                        | CSM Misconfigurations | CSM Threats | CSM Vulnerabilities  | CSM Identity Risks | CSM Agentless scanning |
| ----------------------------------------| --------------------- | ----------- | -------------------- | ------------------- | ----------------------| 
| Resources in AWS Account                | {{< X >}}             |             |                      |                     |  {{< X >}}
| Resources in Azure Subscription         | {{< X >}}             |             |                      |                     | 
| Resources in GCP Project                | {{< X >}}             |             |                      |                     |  
| Kubernetes Cluster                      | {{< X >}}             | {{< X >}}   |                      |                     |  
| Docker Host                             | {{< X >}}             |             |                      |                     |
| Linux Host                              | {{< X >}}             | {{< X >}}   |    {{< X >}}         |                     |  {{< X >}}
| Windows Host                            |                       | {{< X >}}   |                      |                     |  
| Docker Container                        |                       | {{< X >}}   |                      |                     |
| Container Image                         |                       |             |    {{< X >}}         |                     |  {{< X >}}
| IAM in AWS Account                      |                       |             |                      |  {{< X >}}          |

**Note**: CSM Misconfigurations additionally monitors common resources used in your cloud accounts that are running Windows and AWS Fargate, such as EC2 instances, RDS, S3, and ELB.

## Next steps

To get started setting up CSM, navigate to the [**Cloud Security Management Setup**][4] page in Datadog, which has detailed steps on how to configure CSM. For detailed setup instructions, see the [CSM Enterprise][1], [CSM Pro][2], [CSM Workload Security][3], and [CSM Agentless Scanning][12] setup docs.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/setup/csm_enterprise
[2]: /security/cloud_security_management/setup/csm_pro
[3]: /security/cloud_security_management/setup/csm_cloud_workload_security
[4]: https://app.datadoghq.com/security/configuration/csm/setup
[5]: /security/identity_risks/#setup
[6]: /security/cloud_security_management/setup/compatibility
[7]: https://www.datadoghq.com/blog/cloud-security-management-changes/
[8]: /security/cloud_security_management/setup/#csm-threats
[9]: /security/cloud_security_management/setup/#csm-vulnerabilities
[10]: /security/cloud_security_management/setup/#csm-identity-risks
[11]: /security/cloud_security_management/setup/agentless_scanning?tab=crossaccountscanning#prerequisites
[12]: /security/cloud_security_management/setup/agentless_scanning
[102]: /security/cloud_security_management/troubleshooting
[103]: /containers/kubernetes/installation/?tab=helm
[104]: https://kubernetes.io/docs/tasks/administer-cluster/migrating-from-dockershim/find-out-runtime-you-use/
[105]: /integrations/amazon_web_services/?tab=roledelegation#cloud-security-posture-management
[106]: /security/cloud_security_management/setup/csm_enterprise?tab=aws#enable-resource-scanning-for-cloud-accounts
[107]: /security/cloud_security_management/setup/csm_enterprise/?tab=aws#enable-cloudtrail-logs-forwarding
>>>>>>> master
