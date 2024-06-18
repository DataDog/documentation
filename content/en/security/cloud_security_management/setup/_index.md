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
further_reading:
- link: "/getting_started/cloud_security_management"
  tag: "Documentation"
  text: "Getting Started with Cloud Security Management"
- link: "/security/cloud_security_management/setup/csm_enterprise"
  tag: "Documentation"
  text: "Setting up CSM Enterprise"
- link: "/security/cloud_security_management/setup/csm_pro"
  tag: "Documentation"
  text: "Setting up CSM Pro"
- link: "/security/cloud_security_management/setup/csm_cloud_workload_security"
  tag: "Documentation"
  text: "Setting up CSM Workload Security"
---

## Overview

Cloud Security Management (CSM) delivers real-time threat detection and continuous configuration audits across your entire infrastructure, all in a unified view for seamless collaboration and faster remediation.

CSM is available in three packages: [CSM Enterprise][1], [CSM Pro][2], and [CSM Workload Security][3]. For more information, see [Changes to Datadog Cloud Security Management][7]. Each package includes access to a specific set of **features**, as shown in the following table:

<table>
    <tr>
        <th>Package</th>
        <th>Features</th>
    </tr>
    <tr>
        <td><a href="/security/cloud_security_management/setup/csm_enterprise">CSM Enterprise</a></td>
        <td><ul><li style="font-size:16px"><a href="/security/threats">Threats</a></li><li style="font-size:16px"><a href="/security/cloud_security_management/misconfigurations">Misconfigurations (cloud accounts, Agent, and KSPM)</a></li><li style="font-size:16px"><a href="/security/cloud_security_management/identity_risks">Identity Risks</a></li><li style="font-size:16px"><a href="/security/cloud_security_management/vulnerabilities">Vulnerabilities (container images and hosts)</a></li><li style="font-size:16px"><a href="/security/cloud_security_management/agentless_scanning">Agentless Scanning (container images and hosts)</a></li></ul></td>
    </tr>
    <tr>
        <td><a href="/security/cloud_security_management/setup/csm_pro">CSM Pro</a></td>
        <td><ul><li style="font-size:16px"><a href="/security/cloud_security_management/misconfigurations">Misconfigurations (cloud accounts, Agent, and KSPM)</a></li><li style="font-size:16px"><a href="/security/cloud_security_management/vulnerabilities">Vulnerabilities (container images)</a></li><li style="font-size:16px"><a href="/security/cloud_security_management/agentless_scanning">Agentless Scanning (container images)</a></li>
    </tr>
    <tr>
        <td><a href="/security/cloud_security_management/setup/csm_cloud_workload_security">CSM Workload Security</a></td>
        <td><ul><li style="font-size:16px"><a href="/security/threats">Threats</a></li></ul></td>
    </tr>
</table>

**Note**: You can enable features that aren't included in your package at any time by following the instructions on the [CSM Setup page][4].

## Prerequisites

- The **minimum** Datadog Agent version required for CSM is `7.46` or higher.

### Supported deployment types and features

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

<div class="alert alert-info"><strong>Note</strong>: CSM Identity Risks is available for AWS, Azure, and GCP.</div>

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
