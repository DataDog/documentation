---
title: Setting up Workload Protection
aliases:
  - /security/workload_protection/setup/agent
  - /security/workload_protection/supported_linux_distributions
  - /security/threats/supported_linux_distributions
disable_toc: false
---

{{< partial name="security-platform/WP-billing-note.html" >}}

This page guides you through the process of enabling Workload Protection in your environment. Start by activating Workload Protection in Datadog, then deploy the Datadog Agent to begin collecting runtime telemetry. After setup is complete, you can explore Workload Protection's capabilities using the playground scripts. Optionally, you can also request access to enforcement capabilities to take automated response actions directly with the Datadog platform.

## 1) Enable Workload Protection in Datadog

To get started with Workload Protection, you need to enable the Workload Protection product in Datadog. To do so, log in to your Datadog account, and click [Get Started][1]. You can follow the Agent deployment steps in Datadog, or come back to this page for more details.

<div class="alert alert-info">Activating Workload Protection requires the Org Management <a href="https://docs.datadoghq.com/account_management/rbac/permissions/">permission</a>.</div>

## 2) Deploy the Datadog Agent

Workload Protection relies on the Datadog Agent to monitor your workloads and collect security relevant events for threats detection and security posture monitoring.

### Requirements

Workload Protection offers 3 different flavors depending on your environment and operating system:
- On **Linux**, install **the eBPF agent**. It offers the best performance and feature support.
- On **AWS Fargate**, install the Datadog Agent as a sidecar and instrument workloads with the **the cws-instrumentation** tracer. Fargate does not provide eBPF access, so this tracer uses ptrace instead.
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

- Custom kernel builds might modify critical hook points that the Agent requires to properly function. Support isn't guaranteed.
- Datadog requires, at minimum, platforms that have underlying Linux kernel versions of 4.14.0+ or have eBPF features backported (for example, Centos/RHEL 7 with kernel 3.10 has eBPF features backported, so it is supported).
- For compatibility issues with a custom Kubernetes network plugin like Cilium or Calico, see [Troubleshooting Workload Protection][2].

##### Supported cloud environments

| Cloud environments                      | Supported | 
|-----------------------------------------|----------------------|
| Amazon Elastic Compute Cloud (EC2)      | ✅                    |
| Amazon Elastic Kubernetes Service (EKS) | ✅                    |
| Amazon Elastic Container Service (ECS)  | ✅                    |
| AWS Fargate                             | ✅ (using the cws-instrumentation tracer)                    |
| Azure Virtual Machines (Azure VMs)      | ✅                    |
| Azure Kubernetes Service (AKS)          | ✅                    | 
| Google Compute Engine (GCE)             | ✅                    |
| Google Kubernetes Engine (GKE)          | ✅                    | 

**Notes:**

- The underlying Linux distribution and system configuration used by these cloud environments are the primary factors determining whether Workload Protection is supported.
- For cloud environments where you can choose the Linux distribution and kernel version, select a configuration that meets the requirements listed above.

#### Supported Windows flavors

Workload Protection's Windows agent supports Windows Server 2019 and higher.

### Deployment methods

#### Workload Protection's eBPF agent (Linux)

Use the following instructions to enable the eBPF agent of Workload Protection in the Datadog Agent.

{{< partial name="workload-protection/wp-ebpf-tiles.html" >}}

#### Workload Protection's cws-instrumentation tracer (AWS Fargate)

Use the following instructions to setup the cws-instrumentation tracer of Workload Protection on AWS Fargate.
{{< partial name="workload-protection/wp-ebpfless-tiles.html" >}}

#### Workload Protection Windows agent

Use the following instructions to enable the Windows agent of Workload Protection in the Datadog Agent.

{{< partial name="workload-protection/wp-windows-tiles.html" >}}

## 3) Discover and explore Workload Protection capabilities

Datadog provides a testing playground for discovering Workload Protection and learning its capabilities. The playground offers various scenarios you can run safely in a test environment, simulating threats and real world attacks that Workload Protection can detect and protect you from. See the [playground repository][3] to get started.

## 4) (Optional) Request access to enforcement capabilities

<div class="alert alert-danger">Contact <a href="https://docs.datadoghq.com/help/">Datadog Support</a> to enable Automated response.</div>

After you are granted access to Automated response, see the [Automated response][4] page.

## 5) (Optional) Advanced Agent configurations

The [advanced Agent configuration page][5] describes how to configure and tune the Agent to better fit your environment and needs.

[1]: https://app.datadoghq.com/security/workload-protection/onboarding
[2]: /security/workload_protection/troubleshooting/threats
[3]: https://github.com/DataDog/datadog-security-playground
[4]: /security/workload_protection/respond_and_report/#automated-response
[5]: /security/workload_protection/setup/advanced_configuration
