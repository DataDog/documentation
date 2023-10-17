---
title: Supported platforms
kind: Documentation
disable_toc: false
---

The following table shows which RUM capabilities are supported on each platform:

## Linux

{{< tabs >}}
{{% tab "64-BIT X86" %}}

| Operating System | Agent Version | Description |
| ---  | ----------- | ----------- |
| Amazon Linux | Amazon Linux 2 ||

{{% /tab %}}

{{% tab "64-BIT ARM V8" %}}

|      | Required    | Description |
| ---  | ----------- | ----------- |
||||

{{% /tab %}}
{{< /tabs >}}



## Supported platforms

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

| Platform (64-bit x86)                    | Supported versions                                        |
|------------------------------------------|-----------------------------------------------------------|
| [Amazon Linux][1]                        | Amazon Linux 2                                            |
| [Debian][2] with systemd                 | Debian 7 (wheezy)+ in Agent < 6.36.0/7.36.0, Debian 8 (jessie)+ in Agent 6.36.0+/7.36.0+ |
| [Debian][2] with SysVinit                | Debian 7 (wheezy)+ in Agent 6.6.0 - 6.36.0/7.36.0, Debian 8 (jessie)+ in Agent 6.36.0+/7.36.0+ |
| [Ubuntu][3]                              | Ubuntu 14.04+                                             |
| [RedHat/CentOS/AlmaLinux/Rocky][4]       | RedHat/CentOS 6+, AlmaLinux/Rocky 8+ in Agent 6.33.0+/7.33.0+ |
| [Docker][5]                              | Version 1.12+                                             |
| [Kubernetes][6]                          | Version 1.3+                                              |
| [SUSE Enterprise Linux][7] with systemd  | SUSE 11 SP4+ in Agent < 6.33.0/7.33.0, SUSE 12+ in Agent 6.33.0+/7.33.0+                     |
| [SUSE Enterprise Linux][7] with SysVinit | SUSE 11 SP4 in Agent 6.16.0/7.16.0 - 6.33.0/7.33.0        |
| [OpenSUSE][7] with systemd               | OpenSUSE 15+ in Agent 6.33.0+/7.33.0+                     |
| [Fedora][8]                              | Fedora 26+                                                |
| [macOS][9]                               | macOS 10.12+ in Agent < 6.35.0/7.35.0, macOS 10.13+ in Agent < 7.39.0, macOS 10.14+ in Agent 7.39.0+ |
| [Windows Server][10]                     | Windows Server 2012+ (including Server Core)              |
| [Windows][10]                            | Windows 8.1+                                              |
| [Azure Stack HCI OS][10]                 | All Versions                                              |

| Platform (64-bit Arm v8)                 | Supported versions                                        |
|------------------------------------------|-----------------------------------------------------------|
| [Amazon Linux][1]                        | Amazon Linux 2                                            |
| [Debian][2] with systemd                 | Debian 9 (stretch)+                                       |
| [Ubuntu][3]                              | Ubuntu 16.04+                                             |
| [RedHat/CentOS/AlmaLinux/Rocky][4]       | RedHat/CentOS 8+, AlmaLinux/Rocky 8+ in Agent 6.33.0+/7.33.0+ |
| [Docker][5]                              | Version 1.12+                                             |
| [Kubernetes][6]                          | Version 1.3+                                              |
| [Fedora][8]                              | Fedora 27+                                                |
| [macOS][9]                               | macOS 11.0+                                               |


**Notes**:
- [Source][11] install may work on operating systems not listed here and is supported on a best effort basis.
- Datadog Agent versions previous to 6.46.0 and 7.46.0 support Windows Server 2008 R2 with the most recent Windows updates installed. There is also a [known issue with clock drift and Go][12] that affects Windows Server 2008 R2.

[1]: /agent/basic_agent_usage/amazonlinux/
[2]: /agent/basic_agent_usage/deb/
[3]: /agent/basic_agent_usage/ubuntu/
[4]: /agent/basic_agent_usage/redhat/
[5]: /agent/docker/
[6]: /agent/basic_agent_usage/kubernetes/
[7]: /agent/basic_agent_usage/suse/
[8]: /agent/basic_agent_usage/fedora/
[9]: /agent/basic_agent_usage/osx/
[10]: /agent/basic_agent_usage/windows/
[11]: /agent/basic_agent_usage/source/
[12]: https://github.com/golang/go/issues/24489
{{% /tab %}}
{{% tab "Agent v5" %}}

| Platform                   | Supported versions     |
|----------------------------|------------------------|
| [Amazon Linux][1]          | Amazon Linux 2         |
| [Debian][2]                | Debian 7 (wheezy)+     |
| [Ubuntu][3]                | Ubuntu 12.04+          |
| [RedHat/CentOS][4]         | RedHat/CentOS 5+       |
| [Docker][5]                | Version 1.12+          |
| [Kubernetes][6]            | Version 1.3 to 1.8     |
| [SUSE Enterprise Linux][7] | SUSE 11 SP4+           |
| [Fedora][8]                | Fedora 26+             |
| [macOS][9]                 | macOS 10.10+           |
| [Windows Server][10]       | Windows Server 2008+   |
| [Windows][10]              | Windows 7+             |

**Notes**:

- [Source][11] install may work on operating systems not listed here and is supported on a best effort basis.

[1]: /agent/basic_agent_usage/amazonlinux/?tab=agentv5
[2]: /agent/basic_agent_usage/deb/
[3]: /agent/basic_agent_usage/ubuntu/
[4]: /agent/basic_agent_usage/redhat/
[5]: /agent/docker/
[6]: /agent/basic_agent_usage/kubernetes/
[7]: /agent/basic_agent_usage/suse/
[8]: /agent/basic_agent_usage/fedora/
[9]: /agent/basic_agent_usage/osx/
[10]: /agent/basic_agent_usage/windows/
[11]: /agent/basic_agent_usage/source/
{{% /tab %}}
{{% tab "Unix Agent" %}}

| Platform | Supported versions                        |
|----------|-------------------------------------------|
| [AIX][1] | AIX 6.1 TL9 SP6, 7.1 TL5 SP3, 7.2 TL3 SP0 |

[1]: /agent/basic_agent_usage/aix/
{{% /tab %}}
{{< /tabs >}}