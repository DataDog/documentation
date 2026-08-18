---
title: Setting up Workload Protection
aliases:
  - /security/workload_protection/setup/agent
  - /security/workload_protection/supported_linux_distributions
  - /security/threats/supported_linux_distributions
disable_toc: false
---

{{< partial name="security-platform/WP-billing-note.html" >}}

Workload Protection collects runtime activity through the Datadog Agent. Setting it up means enabling the product in Datadog, then deploying the Agent to the workloads you want to protect.

After the Agent is running, you can try Workload Protection safely using the playground scripts. Enforcement, which lets the Agent act on the threats it detects, requires separate access.

For what happens to the activity the Agent collects, see [How Workload Protection works][6].

## Requirements

Workload Protection relies on the Datadog Agent to monitor your workloads and collect security relevant events for threats detection and security posture monitoring.

### Agent options

Workload Protection offers 3 different flavors depending on your environment and operating system:
- On **Linux**, install **the eBPF agent**. It offers the best performance and feature support.
- On **AWS Fargate**, install **the eBPF-less agent**. Fargate does not provide eBPF access, so this agent uses ptrace instead. It covers the major features of Workload Protection (File Integrity Monitoring, process execution monitoring).
- On **Windows**, the Workload Protection agent installs a Windows driver to collect events and telemetry.

### Linux support

On Linux, you need to look at the Linux kernel version and distribution version, as well as the underlying Cloud environment (when applicable) since some Cloud computing services prevent access to eBPF.

#### Supported Linux distributions

| Linux Distributions                                           | Supported Versions                    |
|---------------------------------------------------------------|---------------------------------------|
| Ubuntu LTS                                                    | 18.04, 20.04, 22.04, 24.04 and higher |
| Debian                                                        | 10 and higher                         |
| Amazon Linux 2                                                | Kernels 4.14 and higher               |
| Amazon Linux 2023                                             | All versions                          |
| SUSE Linux Enterprise Server                                  | 12 and 15                             |
| Red Hat Enterprise Linux                                      | 7, 8, and 9                           |
| Oracle Linux                                                  | 7, 8, and 9                           |
| CentOS                                                        | 7                                     |
| Google Container Optimized OS (default on GKE) (Preview)      | 93 and higher                         |

**Notes:**

- Custom kernel builds might modify critical hook points that the Agent requires to properly function. Support isn't guaranteed.
- Datadog requires, at minimum, platforms that have underlying Linux kernel versions of 4.14.0+ or have eBPF features backported (for example, Centos/RHEL 7 with kernel 3.10 has eBPF features backported, so it is supported).
- For compatibility issues with a custom Kubernetes network plugin like Cilium or Calico, see [Troubleshooting Workload Protection][2].

#### Supported cloud environments

| Cloud environments                      | Supported | 
|-----------------------------------------|----------------------|
| Amazon Elastic Compute Cloud (EC2)      | ✅                    |
| Amazon Elastic Kubernetes Service (EKS) | ✅                    |
| Amazon Elastic Container Service (ECS)  | ✅                    |
| AWS Fargate                             | ✅ (only using eBPF-less agent)                    |
| Azure Virtual Machines (Azure VMs)      | ✅                    |
| Azure Kubernetes Service (AKS)          | ✅                    | 
| Google Compute Engine (GCE)             | ✅                    |
| Google Kubernetes Engine (GKE)          | ✅                    | 

**Notes:**

- The underlying Linux distribution and system configuration used by these cloud environments are the primary factors determining whether Workload Protection is supported.
- For cloud environments where you can choose the Linux distribution and kernel version, select a configuration that meets the requirements listed above.

### Windows support

Workload Protection's Windows agent supports Windows Server 2019 and higher.

## Enable Workload Protection in Datadog

To get started with Workload Protection, you need to enable the Workload Protection product in Datadog. To do so, log in to your Datadog account, and click [Get Started][1]. You can follow the Agent deployment steps in Datadog, or come back to this page for more details.

<div class="alert alert-info">Activating Workload Protection requires the Org Management <a href="https://docs.datadoghq.com/account_management/rbac/permissions/">permission</a>.</div>

## Deploy the Datadog Agent

### Linux

Use the following instructions to enable the eBPF agent of Workload Protection in the Datadog Agent.

{{< partial name="workload-protection/wp-ebpf-tiles.html" >}}

### AWS Fargate

Use the following instructions to enable the eBPF-less agent of Workload Protection in the Datadog Agent.

{{< partial name="workload-protection/wp-ebpfless-tiles.html" >}}

### Windows

Use the following instructions to enable the Windows agent of Workload Protection in the Datadog Agent.

{{< partial name="workload-protection/wp-windows-tiles.html" >}}

## Next steps

After setup, you can explore Workload Protection, configure the Agent for your environment, or request access to Automated response.

### Explore Workload Protection

Datadog provides a testing playground for discovering Workload Protection and learning its capabilities. The playground offers various scenarios you can run safely in a test environment, simulating threats and real world attacks that Workload Protection can detect and protect you from. See the [playground repository][3] to get started.

### Configure the Agent

The [advanced Agent configuration page][5] describes how to configure and tune the Agent to better fit your environment and needs.

### Enable automated response

<div class="alert alert-danger">Contact <a href="https://docs.datadoghq.com/help/">Datadog Support</a> to enable Automated response.</div>

After you are granted access to Automated response, see the [Automated response][4] page.

[1]: https://app.datadoghq.com/security/workload-protection/onboarding
[2]: /security/workload_protection/troubleshooting/threats
[3]: https://github.com/DataDog/datadog-security-playground
[4]: /security/workload_protection/respond_and_report/#automated-response
[5]: /security/workload_protection/setup/advanced_configuration
[6]: /security/workload_protection/#evaluating-activity
