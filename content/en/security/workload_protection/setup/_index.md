---
title: Setting up Workload Protection
disable_toc: false
---

To get started with Workload Protection, use the Workload Protection [Get Started][1] steps in your Datadog account.

<div class="alert alert-info">Activating Workload Protection requires the Org Management <a href="https://docs.datadoghq.com/account_management/rbac/permissions/">permission</a>.</div>


## Remote configuration

You can enable [Remote Configuration][3] for Workload Protection. 

Remote Configuration can be used to:
- Automatically stay up to date on the latest security detections
- Block attackers and attacks

Remote Configuration can be set up using the Workload Protection [Get Started][1] steps in your Datadog account.

<div class="alert alert-info">To enable Remote Configuration, ask your admin for the <strong>API Keys Write</strong> permission.</div>

## Agent setup options for Workload Protection

Workload Protection supports **Agent-based-only deployments**.

## Supported deployment types

The following table summarizes Workload Protection relative to deployment types.

|          | Docker    | Kubernetes | Linux     | Amazon ECS/EKS | Windows   | AWS Fargate ECS/EKS | AWS Account | Azure Account | GCP Account | Terraform |
|------------------------|-----------|------------|-----------|----------------|-----------|---------------------|-------------|---------------|-------------|-----------|
| Agent Required (7.46+) | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}}      | {{< X >}} | {{< X >}}           |             |               |             |           |
| Workload Protection    | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}}      | {{< X >}} | {{< X >}}           |             |               |             |           |


## Supported Linux distributions

Workload Protection supports the following Linux distributions:

| Linux Distributions                                           | Supported Versions      |
|---------------------------------------------------------------|-------------------------|
| Ubuntu LTS                                                    | 18.04, 20.04, 22.04     |
| Debian                                                        | 10 or later             |
| Amazon Linux 2                                                | Kernels 4.14 and higher |
| Amazon Linux 2023                                             | All versions            |
| SUSE Linux Enterprise Server                                  | 12 and 15               |
| Red Hat Enterprise Linux                                      | 7, 8, and 9             |
| Oracle Linux                                                  | 7, 8, and 9             |
| CentOS                                                        | 7                       |
| Google Container Optimized OS (default on GKE) (Preview)      | 93 and higher           |

**Notes:**

- Custom kernel builds are not supported.
- The [Workload Protection eBPF-less solution for eBPF disabled environments][8] uses a ptrace-based Datadog Agent. The ptrace-based Datadog Agent supports Linux kernel versions from 3.4.43 to 4.9.85.
- For compatibility with a custom Kubernetes network plugin like Cilium or Calico, see [Troubleshooting Workload Protection][9].
- Data collection is done using eBPF, so Datadog requires, at minimum, platforms that have underlying Linux kernel versions of 4.14.0+ or have eBPF features backported (for example, Centos/RHEL 7 with kernel 3.10 has eBPF features backported, so it is supported).


## Deploy the Agent

You can enable Workload Protection on the Datadog Agent using [multiple tools and systems][6]:

- [Kubernetes][8]
- [Docker][9]
- [ECS EC2][10]
- [Windows][11]
- [Linux][12]

## Workload Protection Agent variables

The Datadog Agent has several [environment variables][7] that can be enabled for Workload Protection. This article describes the purpose of each environment variable.

[1]: https://app.datadoghq.com/security/workload-protection/onboarding
[2]: /account_management/rbac/permissions/
[3]: /agent/remote_config/?tab=configurationyamlfile
[6]: /security/workload_protection/setup/agent
[7]: /security/workload_protection/setup/agent_variables
[8]: /security/workload_protection/setup/agent/kubernetes
[9]: /security/workload_protection/setup/agent/docker
[10]: /security/workload_protection/setup/agent/ecs_ec2
[11]: /security/workload_protection/setup/agent/windows
[12]: /security/workload_protection/setup/agent/linux
[8]: /security/workload_protection/guide/ebpf-free-agent
[9]: /security/workload_protection/troubleshooting/threats
