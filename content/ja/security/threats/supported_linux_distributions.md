---
title: CSM Threats Supported Linux Distributions
---

Cloud Security Management Threats supports the following Linux distributions:

| Linux Distributions          | 対応バージョン                |
|------------------------------|-----------------------------------|
| Ubuntu LTS                   | 18.04, 20.04, 22.04               |
| Debian                       | 10 or later                       |
| Amazon Linux 2               | Kernels 4.15, 5.4, 5.10, and 2023 |
| SUSE Linux Enterprise Server | 12 and 15                         |
| Red Hat Enterprise Linux     | 7, 8, and 9                       |
| Oracle Linux                 | 7, 8, and 9                       |
| CentOS                       | 7                                 |

**注:**

- カスタムカーネルビルドはサポートされていません。
- For compatibility with a custom Kubernetes network plugin like Cilium or Calico, see the [Troubleshooting Cloud Security Management Threats][1].
- データ収集は eBPF を使用して行われるため、Datadog は最低限、基底の Linux カーネルバージョン 4.15.0 以降または eBPF 機能のバックポートを備えたプラットフォームを必要とします。

[1]: /ja/security/cloud_security_management/troubleshooting/threats