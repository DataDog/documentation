---
title: Prerequisites for Cloud Security Management
kind: documentation
---

## Prerequisites

- The **minimum** Datadog Agent version required for CSM is `7.46` or higher.

The following tables represent additional prerequisites relative to each CSM feature.

## CSM Vulnerabilities 

| Component         | Version/Requirement                         |
|-------------------|---------------------------------------------|
| [Helm Chart][103] | v3.49.6 or later (Kubernetes only)          |
| [containerd][104] | v1.5.6 or later (Kubernetes and hosts only) |

**Note**: CSM Vulnerabilities is **not** available for CRI-O runtime and podman runtime.

## CSM Identity Risks 

<div class="alert alert-info"><strong>Note</strong>: CSM Identity Risks is available for AWS and Azure.</div>

To use CSM Identity Risks, you must [enable resource collection for AWS][105]. If you've already done this, no additional setup is required.

**Notes**: 

- If you've [enabled CSM Misconfigurations for your AWS accounts][106], you already have cloud resource collection enabled.
- Although not required, when you [enable CloudTrail logs forwarding][107], you get additional insights based on the actual usage (or non-usage) of resources in your infrastructure, for example, users and roles with significant gaps between provisioned and used permissions.
</br>

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