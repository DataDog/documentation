---
title: Workload Protection がサポートする Linux ディストリビューション
---

Workload Protection は、以下の Linux ディストリビューションをサポートしています:

| Linux ディストリビューション                                           | 対応バージョン      |
|---------------------------------------------------------------|-------------------------|
| Ubuntu LTS                                                    | 18.04、20.04、22.04     |
| Debian                                                        | 10 以降             |
| Amazon Linux 2                                                | Kernel 4.14 以上 |
| Amazon Linux 2023                                             | すべてのバージョン            |
| SUSE Linux Enterprise Server                                  | 12 と 15               |
| Red Hat Enterprise Linux                                      | 7、8、9             |
| Oracle Linux                                                  | 7、8、9             |
| CentOS                                                        | 7                       |
| Google Container Optimized OS (GKE のデフォルト) (Preview)      | 93 以上           |

**注:**

- カスタムカーネルビルドはサポートされていません。
- [eBPF が無効な環境向けの Workload Protection eBPF-less ソリューション][2] では、ptrace ベースの Datadog Agent を使用します。ptrace ベースの Datadog Agent は、Linux kernel 3.4.43 から 4.9.85 までをサポートします。
- Cilium や Calico などのカスタム Kubernetes ネットワーク プラグインとの互換性については、[Workload Protection のトラブルシューティング][1] を参照してください。
- データの収集は eBPF を用いて行われるため、Datadog では最低でも、基盤となる Linux kernel が 4.14.0+ のプラットフォーム、または eBPF 機能がバックポートされているプラットフォームが必要です (例: kernel 3.10 の Centos/RHEL 7 には eBPF 機能がバックポートされているため、サポート対象です)。

[1]: /ja/security/workload_protection/troubleshooting/threats
[2]: /ja/security/cloud_security_management/guide/ebpf-free-agent