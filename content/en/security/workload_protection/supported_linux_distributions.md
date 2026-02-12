---
title: Workload Protection Supported Linux Distributions
aliases:
- security/threats/supported_linux_distributions/
---

Workload Protection supports the following Linux distributions:

| Linux Distributions                                           | Supported Versions            |
|---------------------------------------------------------------|-------------------------------|
| Ubuntu LTS                                                    | 18.04, 20.04, 22.04, 24.04    |
| Debian                                                        | 10 or later                   |
| Amazon Linux 2                                                | Kernels 4.14 and higher       |
| Amazon Linux 2023                                             | All versions                  |
| SUSE Linux Enterprise Server                                  | 12 and 15                     |
| Red Hat Enterprise Linux                                      | 7, 8, and 9                   |
| Oracle Linux                                                  | 7, 8, and 9                   |
| CentOS                                                        | 7, 8 and CentOS Stream 9      |
| Google Container Optimized OS (default on GKE) (Preview)      | 93 and higher                 |

**Notes:**

- Custom kernel builds are not supported.
- The [Workload Protection eBPF-less solution for eBPF disabled environments][2] uses a ptrace-based Datadog Agent. The ptrace-based Datadog Agent supports Linux kernel versions from 3.4.43 to 4.9.85.
- For compatibility with a custom Kubernetes network plugin like Cilium or Calico, see [Troubleshooting Workload Protection][1].
- Data collection is done using eBPF, so Datadog requires, at minimum, platforms that have underlying Linux kernel versions of 4.14.0+ or have eBPF features backported (for example, Centos/RHEL 7 with kernel 3.10 has eBPF features backported, so it is supported).

[1]: /security/workload_protection/troubleshooting/threats
[2]: /security/workload_protection/guide/ebpf-free-agent
