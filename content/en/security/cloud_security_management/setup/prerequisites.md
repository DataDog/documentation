---
title: Prerequisites for Cloud Security Management
kind: documentation
---

## Prerequisites

- The **minimum** Datadog Agent version required for CSM is `7.46` or higher.

### Supported deployment types and features

The following table summarizes the CSM features available relative to each deployment type.

<div class="alert alert-info">For more details, click each of the CSM feature headings to review additional requirements for that feature.</div>

| Deployment type     | Agent Required (7.46+) | CSM Misconfigurations | [CSM Threats][8] | [CSM Vulnerabilities][9] | [CSM Identity Risks][10] | [CSM Agentless Scanning][11] |
|---------------------|------------------------|-----------------------|------------------|--------------------------|--------------------------|------------------------------|
| Docker              | {{< X >}}              | {{< X >}}             | {{< X >}}        |                          |                          |                              |
| Kubernetes          | {{< X >}}              | {{< X >}}             | {{< X >}}        | {{< X >}}                |                          |                              |
| Linux               | {{< X >}}              | {{< X >}}             | {{< X >}}        | {{< X >}}                |                          |                              |
| Amazon ECS/EKS      | {{< X >}}              | {{< X >}}             | {{< X >}}        | {{< X >}}                |                          |                              |
| AWS Account         |                        | {{< X >}}             |                  |                          | {{< X >}}                | beta                         |
| Azure Account       |                        | {{< X >}}             |                  |                          | {{< X >}}                |                              |
| GCP Account         |                        | {{< X >}}             |                  |                          |                          |                              |
| Windows             | {{< X >}}              |                       | {{< X >}}        |                          |                          |                              |
| AWS Fargate ECS/EKS | {{< X >}}              |                       | beta             |                          |                          |                              |
| Terraform           |                        |                       |                  |                          |                          | beta                         |

The following tables represent additional prerequisites relative to each CSM feature.

### CSM Threats 

CSM Threats supports the following Linux distributions:

| Linux Distributions        | Supported Versions                    |
| ---------------------------| --------------------------------------|
| Ubuntu LTS                 | 18.04, 20.04, 22.04                   |
| Debian                      | 10 or later                           |
| Amazon Linux 2              | Kernels 4.15, 5.4, 5.10, and 2023      |
| SUSE Linux Enterprise Server| 12 and 15                              |
| Red Hat Enterprise Linux    | 7, 8, and 9                            |
| Oracle Linux                | 7, 8, and 9                            |
| CentOS                      | 7                                     |

**Notes:**

- Custom kernel builds are not supported.
- For compatibility with a custom Kubernetes network plugin like Cilium or Calico, see the [Troubleshooting page][102].
- Data collection is done using eBPF, so Datadog minimally requires platforms that have underlying Linux kernel versions of 4.15.0+ or have eBPF features backported.

### CSM Vulnerabilities 

| Component         | Version/Requirement                         |
|-------------------|---------------------------------------------|
| [Helm Chart][103] | v3.49.6 or later (Kubernetes only)          |
| [containerd][104] | v1.5.6 or later (Kubernetes and hosts only) |

**Note**: CSM Vulnerabilities is **not** available for CRI-O runtime and podman runtime.

Vulnerability scanning is supported for hosts and containers running the following OS versions:

| OS                       | Supported Versions                                  | Package Managers |
|--------------------------|-----------------------------------------------------|------------------|
| Alpine Linux             | 2.2-2.7, 3.0-3.19 (edge is not supported)           | apk              |
| Wolfi Linux              | N/A                                                 | apk              |
| Chainguard               | N/A                                                 | apk              |
| Red Hat Enterprise Linux | 6, 7, 8                                             | dnf/yum/rpm      |
| CentOS                   | 6, 7, 8                                             | dnf/yum/rpm      |
| AlmaLinux                | 8, 9                                                | dnf/yum/rpm      |
| Rocky Linux              | 8, 9                                                | dnf/yum/rpm      |
| Oracle Linux             | 5, 6, 7, 8                                          | dnf/yum/rpm      |
| CBL-Mariner              | 1.0, 2.0                                            | dnf/yum/rpm      |
| Amazon Linux             | 1, 2, 2023                                          | dnf/yum/rpm      |
| openSUSE Leap            | 42, 15                                              | zypper/rpm       |
| SUSE Enterprise Linux    | 11, 12, 15                                          | zypper/rpm       |
| Photon OS                | 1.0, 2.0, 3.0, 4.0                                  | tndf/yum/rpm     |
| Debian GNU/Linux         | 7, 8, 9, 10, 11, 12 (unstable/sid is not supported) | apt/dpkg         |
| Ubuntu                   | All versions supported by Canonical                 | apt/dpkg         |

### CSM Identity Risks 

<div class="alert alert-info"><strong>Note</strong>: CSM Identity Risks is available for AWS and Azure.</div>

To use CSM Identity Risks, you must [enable resource collection for AWS][105]. If you've already done this, no additional setup is required.

**Notes**: 

- If you've [enabled CSM Misconfigurations for your AWS accounts][106], you already have cloud resource collection enabled.
- Although not required, when you [enable CloudTrail logs forwarding][107], you get additional insights based on the actual usage (or non-usage) of resources in your infrastructure, for example, users and roles with significant gaps between provisioned and used permissions.
</br>

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