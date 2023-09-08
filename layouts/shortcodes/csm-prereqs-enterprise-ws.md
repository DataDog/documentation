* Datadog Agent 7.44 or later.
* Data collection is done using eBPF, so Datadog minimally requires platforms that have underlying Linux kernel versions of 4.15.0+ or have eBPF features backported. CSM Threats supports the following Linux distributions:
  * Ubuntu LTS (18.04, 20.04, and 22.04)
  * Debian 10 or later
  * Amazon Linux 2 (kernels 4.15, 5.4, and 5.10) and 2023
  * SUSE Linux Enterprise Server 12 and 15
  * Red Hat Enterprise Linux 7, 8, and 9
  * Oracle Linux 7, 8, and 9
  * CentOS 7
  * Custom kernel builds are not supported.
* For compatibility with a custom Kubernetes network plugin like Cilium or Calico, see the [Troubleshooting page][15].

[15]: /security/cloud_security_management/troubleshooting