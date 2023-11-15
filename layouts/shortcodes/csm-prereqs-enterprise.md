CSM Enterprise requires [Datadog Agent][1] 7.46 or later. Additionally, see the following requirements for CSM Threats and CSM Vulnerabilities:

### CSM Threats

CSM Threats supports the following Linux distributions:

* Ubuntu LTS (18.04, 20.04, and 22.04)
* Debian 10 or later
* Amazon Linux 2 (kernels 4.15, 5.4, and 5.10) and 2023
* SUSE Linux Enterprise Server 12 and 15
* Red Hat Enterprise Linux 7, 8, and 9
* Oracle Linux 7, 8, and 9
* CentOS 7
* Custom kernel builds are not supported.

**Notes**: 

* For compatibility with a custom Kubernetes network plugin like Cilium or Calico, see the [Troubleshooting page][2].
* Data collection is done using eBPF, so Datadog minimally requires platforms that have underlying Linux kernel versions of 4.15.0+ or have eBPF features backported. 

### CSM Vulnerabilities

* [Helm Chart][3] v3.33.6 or later (Kubernetes only).
* [containerd][4] v1.5.6 or later (Kubernetes and hosts only).

**Note**: CSM Vulnerabilities is not available for CRI-O runtime.

[1]: /agent
[2]: /security/cloud_security_management/troubleshooting
[3]: /containers/kubernetes/installation/?tab=helm
[4]: https://kubernetes.io/docs/tasks/administer-cluster/migrating-from-dockershim/find-out-runtime-you-use/
