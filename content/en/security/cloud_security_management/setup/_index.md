---
title: Setting Up Cloud Security Management
kind: documentation
aliases:
  - /security_platform/cloud_workload_security/getting_started
  - /security/cloud_workload_security/getting_started
  - /security/cloud_workload_security/setup
  - /security/threats/setup
  - /security_platform/cspm/getting_started
  - /security/cspm/getting_started
  - /security/cspm/setup
  - /security/misconfigurations/setup
further_reading:
- link: "/getting_started/cloud_security_management"
  tag: "Documentation"
  text: "Getting Started with Cloud Security Management"
- link: "security/default_rules"
  tag: "Documentation"
  text: "Explore default cloud configuration compliance rules"
- link: "https://www.datadoghq.com/blog/datadog-runtime-security/"
  tag: "Blog"
  text: "Learn more about Datadog Cloud Runtime Security"
- link: "https://www.datadoghq.com/blog/linux-security-threat-detection-datadog/"
  tag: "Blog"
  text: "How to detect security threats in your systems' Linux processes"
- link: "https://www.datadoghq.com/blog/pwnkit-vulnerability-overview-and-remediation/"
  tag: "Blog"
  text: "The PwnKit vulnerability: Overview, detection, and remediation"
- link: "https://www.datadoghq.com/blog/dirty-pipe-vulnerability-overview-and-remediation/"
  tag: "Blog"
  text: "The Dirty Pipe vulnerability: Overview, detection, and remediation"
- link: "https://www.datadoghq.com/blog/engineering/dirty-pipe-container-escape-poc/"
  tag: "Blog"
  text: "Using the Dirty Pipe Vulnerability to Break Out from Containers"
- link: "https://www.datadoghq.com/blog/dns-based-threat-detection/"
  tag: "Blog"
  text: "Catch attacks at the network layer with DNS-based threat detection"
---

Cloud Security Management (CSM) delivers real-time threat detection and continuous configuration audits across your entire cloud infrastructure, all in a unified view for seamless collaboration and faster remediation.

CSM is available in three packages: CSM Enterprise, CSM Pro, and CSM Workload Security. Each package includes access to a specific set of features, as shown in the following table:

| Package               | Features                                              |
|-----------------------|-------------------------------------------------------|
| CSM Enterprise        | Threats, Misconfigurations (cloud accounts and Agent) |
| CSM Pro               | Misconfigurations (cloud accounts only)               |
| CSM Workload Security | Threats                                               |

**Note**: You can enable other features that aren't included in your package at any time by following the instructions.

## Prerequisites

{{< tabs >}}
{{% tab "CSM Enterprise" %}}

{{% /tab %}}

{{% tab "CSM Pro" %}}

{{% /tab %}}

{{% tab "CSM Workload Security" %}}

{{% /tab %}}

{{< /tabs >}}

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
* For compatibility with a custom Kubernetes network plugin like Cilium or Calico, see the [Troubleshooting page][3].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[3]: /security/cloud_security_management/troubleshooting
[4]: /agent/remote_config
[5]: /agent/remote_config/?tab=environmentvariable#enabling-remote-configuration
