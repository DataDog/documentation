---
title: Supported platforms
kind: Documentation
disable_toc: false
further_reading:
- link: "agent/basic_agent_usage/"
  tag: "Documentation"
  text: "Basic Agent Usage"
---

The Datadog Agent is supported on most popular operating systems and platforms. If your operating system is not listed below, [a source installation][1] might work for you. Source installations are supported on a best effort basis.

{{< tabs >}}
{{% tab "Linux" %}}

## 64-BIT X86

Datadog Agent version 6 and 7 support the following Linux operating systems on 64-BIT X86:

<table>
  <thead>
    <th>Operating system</th>
    <th>OS versions</th>
    <th>Agent 6 versions</th>
    <th>Agent 7 versions</th>
  </thead>
  <tr>
    <th><a href='/agent/basic_agent_usage/amazonlinux/'>Amazon Linux</a></th>
    <td>Amazon Linux 2</td>
    <td>>= 6.0.0</td>
    <td>>= 7.0.0</td>
  </tr>
  <tr>
    <th rowspan='2'><a href='/agent/basic_agent_usage/deb/'>Debian</a>(systemd)</th>
    <td>>= 7.0 (wheezy)</td>
    <td>< 6.36.0</td>
    <td>< 7.36.0</td>
  </tr>
  <tr>
    <td>>= 8.0 (jessie)</td>
    <td>>= 6.36.0</td>
    <td>>= 7.36.0</td>
  </tr>
  <tr>
    <th rowspan='2'>Debian (SysVinit)</th>
    <td>>= 7.0 (wheezy)</td>
    <td>6.6.0 - 6.36.0</td>
    <td>< 7.36.0</td>
  </tr>
  <tr>
    <td>>= 8.0 (jessie)</td>
    <td>>= 6.36.0</td>
    <td>>= href='' 7.36.0</t</a>d><a>
  </tr>
  <tr>
    <th><a href='/agent/basic_agent_usage/ubuntu/'>Ubuntu</a></th>
    <td>>= 14.05</td>
    <td>>= 6.0.0</td>
    <td>>= 7.0.0</td>
  </tr>
  <tr>
    <th><a href='/agent/basic_agent_usage/redhat/'>RedHat /<br>CentOS<br></a></th>
    <td>>= 6.0</td>
    <td>>= 6.33.0</td>
    <td>>= 7.33.0</td>
  </tr>
  <tr>
    <th><a href='/agent/basic_agent_usage/redhat/'>AlmaLinux /<br>Rocky</a></th>
    <td>>= 8.0</td>
    <td>>= 6.33.0</td>
    <td>>= 7.33.0</td>
  </tr>
  <tr>
    <th rowspan='2'><a href='/agent/basic_agent_usage/suse/'>SUSE Enterprise Linux (systemd)</a></th>
    <td>SUSE 11 SP4</td>
    <td>< 6.33.0</td>
    <td>< 7.33.0</td>
  </tr>
  <tr>
    <td>>= 12.0</td>
    <td>>= 6.33.0</td>
    <td>>= 7.33.0</td>
  </tr>
  <tr>
    <th>SUSE Enterprise Linux (SysVinit)</th>
    <td>SUSE 11 SP4</td>
    <td>6.16.0 - 6.33.0</td>
    <td>7.16.0 - 7.33.0</td>
  </tr>
  <tr>
    <th><a href='/agent/basic_agent_usage/suse/'>OpenSUSE (systemd)</a></th>
    <td>>= 15.0</td>
    <td>>= 6.33.0</td>
    <td>>= 7.33.0</td>
  </tr>
  <tr>
    <th><a href='/agent/basic_agent_usage/fedora/'>Fedora</a></th>
    <td>>= 26.0</td>
    <td>>= 6.0.0</td>
    <td>>= 7.0.0</td>
  </tr>
</table>

A check mark ({{< X >}}) indicates support in all minor and patch versions in a series.

## 64-BIT ARM V8

Datadog Agent version 6 and 7 support the following Linux operating systems on 64-BIT ARM V8:

| Operating system | Supported versions | Agent 6 | Agent 7 |
|------------------|--------------------|---------|---------|
| [Amazon Linux][1] | Amazon Linux 2 | <i class='icon-check-bold'> | <i class='icon-check-bold'> |
| [Debian][2] (systemd) | >= 9.0 (stretch) | <i class='icon-check-bold'> | <i class='icon-check-bold'> |
| [Ubuntu][3] | >= 16.04 | <i class='icon-check-bold'> | <i class='icon-check-bold'> |
| [RedHat/CentOS][4] | >= 8.0 | >= 6.33.0 | >= 7.33.0 |
| [AlmaLinux/Rocky][4] | >= 8.0 | >= 6.33.0 | >= 7.33.0 |
| [Fedora][7] | >= 27 | <i class='icon-check-bold'> | <i class='icon-check-bold'> |

A check mark ({{< X >}}) indicates support in all minor and patch versions in a series.

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
    <th>Agent 6 versions</th>
    <th>Agent 7 versions</th>
    <th>Notes</th>
  </thead>
  <tr>
    <th rowspan=2><a href='/agent/basic_agent_usage/windows/'>Windows Server</a></th>
    <td>2012</td>
    <td>>= 6.0.0</td>
    <td>>= 7.0.0</td>
    <td></td>
  </tr>
  <tr>
    <td>2008 R2</td>
    <td>< 6.46.0 </td>
    <td>< 7.46.0</td>
    <td>Server 2008 R2 is affected by a <a href="https://github.com/golang/go/issues/24489">known issue with clock drift and Go</a>.</td>
  </tr>
  <tr>
    <td>Windows</td>
    <td>>= 8.1</td>
    <td>>= 6.0.0</td>
    <td>>= 7.0.0</td>
    <td></td>
  </tr>
</table>

{{% /tab %}}

{{% tab "Cloud and containers" %}}

Agents >= 6.0 and >= 7.0 support the following platforms:

| Platform    | Supported versions | 64-BIT ARM V8 support | 64-BIT X86 support |
|-------------|--------------------|-----------------------|--------------------|
| [Docker][5] | >= 1.12            | <i class='icon-check-bold'> | <i class='icon-check-bold'> |
| [Kubernetes][6] | >= 1.3 | <i class='icon-check-bold'> | <i class='icon-check-bold'> |
| [Azure Stack HCI OS][7] | All versions | | <i class='icon-check-bold'> |

[5]: /agent/docker/
[6]: /agent/basic_agent_usage/kubernetes/
[7]: /agent/basic_agent_usage/windows/

{{% /tab %}}

{{% tab "Unix" %}}

Agent 6 and 7 support the following [AIX][1] versions:

- 6.1 TL9 SP6
- 7.1 TL5 SP3
- 7.2 TL3 SP0


[1]: /agent/basic_agent_usage/aix/

{{% /tab %}}
{{% tab "MacOS" %}}

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /agent/basic_agent_usage/source/