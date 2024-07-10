
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

| Component                | Version/Requirement                     |
| ------------------------ | ----------------------------------------|
| [Helm Chart][103]            | v3.49.6 or later (Kubernetes only)      |
| [containerd][104]              | v1.5.6 or later (Kubernetes and hosts only)|

**Note**: CSM Vulnerabilities is **not** available for the following container runtimes:

  - CRI-O runtime
  - podman runtime

### CSM Identity Risks

<div class="alert alert-info"><strong>Note</strong>: At this time, CSM Identity Risks is available for AWS only.</div>

To use CSM Identity Risks, you must [enable resource collection for AWS][105]. If you've already done this, no additional setup is required.

**Notes**: 

- If you've [enabled CSM Misconfigurations for your AWS accounts][106], you already have cloud resource collection enabled.
- Although not required, when you [enable CloudTrail logs forwarding][107], you get additional insights based on the actual usage (or non-usage) of resources in your infrastructure, for example, users and roles with significant gaps between provisioned and used permissions.

[102]: /security/cloud_security_management/troubleshooting
[103]: /containers/kubernetes/installation/?tab=helm
[104]: https://kubernetes.io/docs/tasks/administer-cluster/migrating-from-dockershim/find-out-runtime-you-use/
[105]: /integrations/amazon_web_services/?tab=roledelegation#cloud-security-posture-management
[106]: /security/cloud_security_management/setup/csm_enterprise?tab=aws#enable-resource-scanning-for-cloud-accounts
[107]: /security/cloud_security_management/setup/csm_enterprise/?tab=aws#enable-cloudtrail-logs-forwarding
