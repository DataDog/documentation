---
title: Supported Platforms
description: "Complete list of operating systems and platforms supported by the Datadog Agent including Linux, Windows, macOS, and cloud environments."
disable_toc: false
further_reading:
- link: "agent/"
  tag: "Documentation"
  text: "The Datadog Agent"
---

The Datadog Agent is supported on a range of widely used operating systems and platforms. If your operating system is not listed below, [a source installation][1] might work for you.

{{< tabs >}}
{{% tab "Linux" %}}

## 64-BIT X86

<table>
  <thead>
    <th>Operating system</th>
    <th>OS versions</th>
    <th>Agent 5 versions</th>
    <th>Agent 6 versions</th>
    <th>Agent 7 versions</th>
  </thead>
  <tr>
    <th rowspan='3'><a href='/agent/basic_agent_usage/amazonlinux/'>Amazon Linux</a></th>
    <td>2</td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
  </tr>
  <tr>
    <td>2022</td>
    <td></td>
    <td>>= 6.40.0</td>
    <td>>= 7.40.0</td>
  </tr>
  <tr>
    <td>2023</td>
    <td></td>
    <td>>= 6.40.0</td>
    <td>>= 7.40.0</td>
  </tr>
  <tr>
    <th rowspan='2'><a href='/agent/basic_agent_usage/deb/'>Debian</a> (systemd)</th>
    <td>7.0 (wheezy)</td>
    <td><i class='icon-check-bold'></td>
    <td><= 6.35.2</td>
    <td><= 7.35.2</td>
  </tr>
  <tr>
    <td>>= 8.0 (jessie)</td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
  </tr>
  <tr>
    <th rowspan='2'>Debian (SysVinit)</th>
    <td>7.0 (wheezy)</td>
    <td></td>
    <td>6.6.0 - 6.35.2</td>
    <td><= 7.35.2</td>
  </tr>
  <tr>
    <td>>= 8.0 (jessie)</td>
    <td></td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
  </tr>
  <tr>
    <th rowspan='2'><a href='/agent/basic_agent_usage/ubuntu/'>Ubuntu</a></th>
    <td>12.04</td>
    <td><i class='icon-check-bold'></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>>= 14.04</td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
  </tr>
  <tr>
    <th rowspan='3'><a href='/agent/basic_agent_usage/redhat/'>RedHat/<br>CentOS/</a><br>
    <a href="/agent/basic_agent_usage/oracle">Oracle Linux</a><br></th>
    <td>5.0</td>
    <td><i class='icon-check-bold'></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>>= 6.0</td>
    <td><i class='icon-check-bold'></td>
    <td><= 6.51.1</td>
    <td><= 7.51.1</td>
  </tr>
  <tr>
    <td>>= 7.0</td>
    <td></td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
  </tr>
  <tr>
    <th><a href='/agent/basic_agent_usage/redhat/'>AlmaLinux /<br>Rocky</a></th>
    <td>>= 8.0</td>
    <td></td>
    <td>>= 6.33.0</td>
    <td>>= 7.33.0</td>
  </tr>
  <tr>
    <th rowspan='2'><a href='/agent/basic_agent_usage/suse/'>SUSE Enterprise Linux (systemd)</a></th>
    <td>11 SP4</td>
    <td><i class='icon-check-bold'></td>
    <td><= 6.32.4</td>
    <td><= 7.32.4</td>
  </tr>
  <tr>
    <td>>= 12.0</td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
  </tr>
  <tr>
    <th>SUSE Enterprise Linux (SysVinit)</th>
    <td>11 SP4</td>
    <td></td>
    <td>6.16.0 - 6.33.0</td>
    <td>7.16.0 - 7.33.0</td>
  </tr>
  <tr>
    <th><a href='/agent/basic_agent_usage/suse/'>OpenSUSE (systemd)</a></th>
    <td>>= 15.0</td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
  </tr>
  <tr>
    <th><a href='/agent/basic_agent_usage/fedora/'>Fedora</a></th>
    <td>>= 26</td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
  </tr>
</table>

A check mark ({{< X >}}) indicates support for all minor and patch versions.

## 64-BIT ARM V8

<table>
  <thead>
    <th>Operating system</th>
    <th>OS versions</th>
    <th>Agent 6 versions</th>
    <th>Agent 7 versions</th>
  </thead>
  <tr>
    <th rowspan=3><a href='/agent/basic_agent_usage/amazonlinux/'>Amazon Linux</a></th>
    <td>2</td>
    <td>>= 6.16.0</td>
    <td>>= 7.16.0</td>
  </tr>
  <tr>
    <td>2022</td>
    <td>>= 6.40.0</td>
    <td>>= 7.40.0</td>
  </tr>
  <tr>
    <td>2023</td>
    <td>>= 6.40.0</td>
    <td>>= 7.40.0</td>
  </tr>
  <tr>
    <th><a href='/agent/basic_agent_usage/deb/'>Debian</a> (systemd)</th>
    <td>>= 9.0 (stretch)</td>
    <td>>= 6.16.0</td>
    <td>>= 7.16.0</td>
  </tr>
  <tr>
    <th><a href='/agent/basic_agent_usage/ubuntu/'>Ubuntu</a></th>
    <td>>= 16.04</td>
    <td>>= 6.16.0</td>
    <td>>= 7.16.0</td>
  </tr>
  <tr>
    <th><a href='/agent/basic_agent_usage/redhat/'>RedHat /<br>CentOS/</a><br>
    <a href='/agent/basic_agent_usage/oracle/'>Oracle Linux<br></a></th>
    <td>>= 8.0</td>
    <td>>= 6.16.0</td>
    <td>>= 7.16.0</td>
  </tr>
  <tr>
    <th><a href='/agent/basic_agent_usage/redhat/'>AlmaLinux /<br>Rocky</a></th>
    <td>>= 8.0</td>
    <td>>= 6.33.0</td>
    <td>>= 7.33.0</td>
  </tr>
  <tr>
    <th><a href='/agent/basic_agent_usage/fedora/'>Fedora</a></th>
    <td>>= 27</td>
    <td>>= 6.16.0</td>
    <td>>= 7.16.0</td>
  </tr>
</table>

[1]: /agent/basic_agent_usage/amazonlinux/
[2]: /agent/basic_agent_usage/deb/
[3]: /agent/basic_agent_usage/ubuntu/
[4]: /agent/basic_agent_usage/redhat/
[7]: /agent/basic_agent_usage/fedora/

{{% /tab %}}
{{% tab "Windows" %}}

<table>
  <thead>
    <th>Operating system</th>
    <th>OS versions</th>
    <th>Agent 5 versions</th>
    <th>Agent 6 versions</th>
    <th>Agent 7 versions</th>
    <th>Notes</th>
  </thead>
  <tr>
    <th rowspan=3><a href='/agent/basic_agent_usage/windows/'>Windows Server</a></th>
    <td>2008 R2</td>
    <td><i class='icon-check-bold'></td>
    <td><= 6.45.1</td>
    <td><= 7.45.1</td>
    <td>Server 2008 R2 is affected by a <a href="https://github.com/golang/go/issues/24489">known issue with clock drift and Go</a>.</td>
  </tr>
  <!-- Supported versions intentionally lowered from 7.49.x to 7.46.x, for more information see https://github.com/DataDog/documentation/pull/22642 -->
  <tr>
    <td>2012/R2</td>
    <td></td>
    <td><= 6.46.0</td>
    <td><= 7.46.0</td>
    <td></td>
  </tr>
  <tr>
    <td>2016, 2019, 2022, 2025</td>
    <td></td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
    <td></td>
  </tr>
  <tr>
    <td rowspan=4>Windows</td>
    <td>7</td>
    <td><i class='icon-check-bold'></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>8.1</td>
    <td></td>
    <td><= 6.46.0</td>
    <td><= 7.46.0</td>
    <td></td>
  </tr>
  <tr>
    <td>10</td>
    <td></td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
    <td></td>
  </tr>
  <tr>
    <td>11</td>
    <td></td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
    <td></td>
  </tr>
</table>

A check mark ({{< X >}}) indicates support for all minor and patch versions.

To install a specific version of the Windows Agent, see the [installer list][8].

[8]: https://ddagent-windows-stable.s3.amazonaws.com/installers_v2.json

{{% /tab %}}
{{% tab "macOS" %}}

## 64-BIT X86

| macOS version | Agent 5   | Agent 6   | Agent 7         |
|---------------|-----------|-----------|-----------------|
| 10.10 - 10.11 | <= 5.11.3 |           |                 |
| 10.12         |           | <= 6.34.0 | <= 7.34.0       |
| 10.13         |           | <= 6.38.2 | <= 7.38.2       |
| 10.14         |           |           | 7.39.0 - 7.61.0 |
| >= 11.0       |           |           | >= 7.39.0       |

## Apple ARM64

| macOS version | Agent 7               |
|---------------|-----------------------|
| >= 11.0       | >= 7.70.0*            |

*Earlier versions for 64-BIT X86 may be used on Apple ARM64 through [Rosetta 2](https://support.apple.com/en-us/102527) emulation.

{{% /tab %}}

{{% tab "Cloud and containers" %}}

## 64-BIT X86 support

| Agent | [Docker][5] | [Kubernetes][6] | [Azure Stack HCI OS][7]  |
|-------|-------------|-----------------|--------------------------|
| 5 | >= 1.14 | 1.3 - 1.8 ||
| 6 | >= 1.14 | >= 1.3 | All versions |
| 7 | >= 1.14 | >= 1.3 | All versions |


## 64-BIT ARM V8 support

Agent 6 and 7 support the following 64-BIT ARM V8 platforms:

| Platform    | Supported versions | 64-BIT ARM V8 support | 64-BIT X86 support |
|-------------|--------------------|-----------------------|--------------------|
| [Docker][5] | >= 1.14     | <i class='icon-check-bold'> | <i class='icon-check-bold'> |
| [Kubernetes][6] | >= 1.3   | <i class='icon-check-bold'> | <i class='icon-check-bold'> |


[5]: /agent/docker/
[6]: /agent/basic_agent_usage/kubernetes/
[7]: /agent/basic_agent_usage/windows/

{{% /tab %}}

{{% tab "Unix" %}}

The UNIX Agent supports the following [AIX][1] versions:

- 6.1 TL9 SP6
- 7.1 TL5 SP3
- 7.2 TL3 SP0
- 7.3 TL3 SP0

Note: The Datadog UNIX Agent is developed for specific system architectures, and is not the same as the Windows, Linux, and MacOS Agents.

[1]: /agent/basic_agent_usage/aix/
{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/supported_platforms/source/
