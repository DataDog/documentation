---
title: Getting started with Workload Protection
disable_toc: false
---

{{< partial name="security-platform/WP-billing-note.html" >}}

This page will guide you through the process of enabling Workload Protection in your environment. You’ll start by activating Workload Protection in the Datadog app, then deploy the Datadog Agent to begin collecting runtime telemetry. Once setup is complete, you can explore Workload Protection’s capabilities using our playground scripts. Optionally, you can also request access to enforcement capabilities to take automated remediation actions directly with the Datadog platform.

## 1) Enable Workload Protection from the Datadog app

To get started with Workload Protection, you need to enable the Workload Protection product from the Datadog App. To do so, log in to your Datadog account, and click on [Get Started][1]. You can follow the deployment steps of the agent in the app, or come back to this page for more details.

<div class="alert alert-info">Activating Workload Protection requires the Org Management <a href="https://docs.datadoghq.com/account_management/rbac/permissions/">permission</a>.</div>

## 2) Deploy the Datadog Agent

Workload Protection relies on the Datadog Agent to monitor your workloads and collect security relevant events for threats detection and security posture monitoring.

### Requirements

Workload Protection offers 3 different flavors depending on your environment and operating system:
- On **Linux**, you can choose between:
  - (recommended) **The eBPF agent** offers the best performance and feature support. When eBPF is available in your environment, this is what you should install.
  - **The eBPF-less agent** is a fallback agent for environments without eBPF support. This agent covers the major features of Workload Protection (File Integrity Monitoring, process execution monitoring, network monitoring).
- On **Windows**, the Workload Protection agent installs a Windows driver to collect events and telemetry.

#### Supported Linux flavors

On Linux, you need to look at the Linux kernel version and distribution version, as well as the underlying Cloud environment (when applicable) since some Cloud computing services prevent access to eBPF.

##### Workload Protection's eBPF agent supports the following Linux flavors

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

- Custom kernel builds might modify critical hook points that our agent requires to properly function. Support isn't guaranteed.
- Datadog requires, at minimum, platforms that have underlying Linux kernel versions of 4.14.0+ or have eBPF features backported (for example, Centos/RHEL 7 with kernel 3.10 has eBPF features backported, so it is supported).
- For compatibility issues with a custom Kubernetes network plugin like Cilium or Calico, see [Troubleshooting Workload Protection][2].

##### Workload Protection's eBPF-less agent supports the following Linux distributions

| Linux Distributions | Supported Versions       |
|---------------------|--------------------------|
| Any                 | Kernel 3.4.43 and higher |

**Notes:**
 
- The Workload Protection eBPF-less solution for eBPF disabled environments uses a ptrace-based Datadog Agent.

##### Supported Cloud environments

| Cloud environments                      | eBPF agent supported | eBPF-less agent supported |
|-----------------------------------------|----------------------|---------------------------|
| Amazon Elastic Compute Cloud (EC2)      | ✅                    | ✅                         |
| Amazon Elastic Kubernetes Service (EKS) | ✅                    | ✅                         |
| Amazon Elastic Container Service (ECS)  | ✅                    | ✅                         |
| Amazon Fargate                          | ❌                    | ✅                         |
| Azure Virtual Machines (Azure VMs)      | ✅                    | ✅                         |
| Azure Kubernetes Service (AKS)          | ✅                    | ✅                         |
| Google Compute Engine (GCE)             | ✅                    | ✅                         |
| Google Kubernetes Engine (GKE)          | ✅                    | ✅                         |
| Google GKE Autopilot                    | ❌                    | ✅                         |
| Google Cloud Run                        | ❌                    | ✅                         |

**Notes:**

- Keep in mind that the underlying Linux distribution and system configuration used by these cloud environments are the primary factors determining whether our solution is supported.
- For cloud environments where you can choose the Linux distribution and kernel version, select a configuration that meets the requirements listed above.

#### Supported Windows flavors

Workload Protection's Windows agent supports the following Windows Server 2019 and higher.

### Deployment methods

#### Workload Protection's eBPF agent (Linux)

Use the following instructions to enable the eBPF agent of Workload Protection in the Datadog Agent.

{{< partial name="workload-protection/wp-ebpf-tiles.html" >}}

#### Workload Protection's eBPF-less agent (Linux)

Use the following instructions to enable the eBPF-less agent of Workload Protection in the Datadog Agent.

{{< partial name="workload-protection/wp-ebpfless-tiles.html" >}}

#### Workload Protection Windows agent

Use the following instructions to enable the Windows agent of Workload Protection in the Datadog Agent.

{{< partial name="workload-protection/wp-windows-tiles.html" >}}

## 3) Discover and explore Workload Protection capabilities

We've put together a testing playground for you to discover Workload Protection and learn its powerful capabilities. The playground proposes various scenarios you can run safely in a test environment, simulating threats and real world attacks that Workload Protection can detect and protect you from. Head over to [our playground's repository][3] to get started.

## 4) (optional) Request access to enforcement capabilities

<div class="alert alert-danger">Please contact <a href="https://docs.datadoghq.com/help/">Datadog Support</a> to enable Active Protection.</div>

Once you've been granted access to Active Protection, head over to the [Blocking threats proactively][4] page.

## 5) (optional) Advanced agent configurations

We've put together an [advanced agent configuration page][5] for power users to learn how to configure and tweak the agent to better fit your environment and needs.

[1]: https://app.datadoghq.com/security/workload-protection/onboarding
[2]: /security/workload_protection/troubleshooting/threats
[3]: https://github.com/DataDog/datadog-security-playground
[4]: /
[5]: /security/workload_protection/getting_started/advanced_configuration