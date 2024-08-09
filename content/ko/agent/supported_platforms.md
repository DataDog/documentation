---
disable_toc: false
further_reading:
- link: agent/basic_agent_usage/
  tag: 설명서
  text: Agent 기본 사용법
title: 지원되는 플랫폼
---

Datadog Agent는 널리 사용되는 다양한 운영 체제 및 플랫폼에서 지원됩니다. 해당 운영 체제가 아래 목록에 없으면 [소스 설치][1]가 적합할 수 있습니다.

{{< tabs >}}
{{% tab "Linux" %}}

## 64-BIT X86

<table>
  <thead>
    <th>운영 시스템</th>
    <th>OS 버전</th>
    <th>Agent 5 버전</th>
    <th>Agent 6 버전</th>
    <th>Agent 7 버전</th>
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
    <th rowspan='2'><a href='/agent/basic_agent_usage/redhat/'>RedHat /<br>CentOS<br></a></th>
    <td>5.0</td>
    <td><i class='icon-check-bold'></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>>= 6.0</td>
    <td><i class='icon-check-bold'></td>
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

확인 표시 ({{< X >}})는 모든 부 버전과 패치 버전이 지원됨을 나타냅니다.

## 64-BIT ARM V8

<table>
  <thead>
    <th>운영 시스템</th>
    <th>OS 버전</th>
    <th>Agent 6 버전</th>
    <th>Agent 7 버전</th>
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
    <th><a href='/agent/basic_agent_usage/redhat/'>RedHat /<br>CentOS<br></a></th>
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

[1]: /ko/agent/basic_agent_usage/amazonlinux/
[2]: /ko/agent/basic_agent_usage/deb/
[3]: /ko/agent/basic_agent_usage/ubuntu/
[4]: /ko/agent/basic_agent_usage/redhat/
[7]: /ko/agent/basic_agent_usage/fedora/

{{% /tab %}}

{{% tab "Windows" %}}

<table>
  <thead>
    <th>운영 시스템</th>
    <th>OS 버전</th>
    <th>Agent 5 버전</th>
    <th>Agent 6 버전</th>
    <th>Agent 7 버전</th>
    <th>참고</th>
  </thead>
  <tr>
    <th rowspan=2><a href='/agent/basic_agent_usage/windows/'>Windows Server</a></th>
    <td>2008 R2</td>
    <td><i class='icon-check-bold'></td>
    <td><= 6.45.1 </td>
    <td><= 7.45.1</td>
    <td>서버 2008 R2는 <a href="https://github.com/golang/go/issues/24489">클럭 드리프트 및 Go와 관련된 알려진 문제</a>의 영향을 받음.</td>
  </tr>
  <tr>
    <td>>= 2012</td>
    <td></td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
    <td></td>
  </tr>
  <tr>
    <td rowspan=4>Windows</td>
    <td>>= 7</td>
    <td><i class='icon-check-bold'></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>>= 8.1</td>
    <td></td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
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

확인 표시 ({{< X >}})는 모든 부 버전과 패치 버전이 지원됨을 나타냅니다.

{{% /tab %}}
{{% tab "macOS" %}}

## 64-BIT X86

| macOS 버전 | Agent 5 | Agent 6 | Agent 7 |
|---------------|---------|---------|---------|
| 10.10 - 10.11 | <= 5.11.3 |||
| 10.12 || <= 6.34.0 | <= 7.34.0 |
| 10.13 || <= 6.38.2 | <= 7.38.2 |
| >= 10.14 ||           | >= 7.39.0 |

## Apple ARM64

| macOS 버전  | Agent 7 |
|----------------|---------|
| >= 11.0 | >= 7.39.0 |

{{% /tab %}}

{{% tab "클라우드 및 컨테이너" %}}

## 64-BIT X86 지원

| Agent | [Docker][5] | [Kubernetes][6] | [Azure Stack HCI OS][7]  |
|-------|-------------|-----------------|--------------------------|
| 5 | >= 1.14 | 1.3 - 1.8 ||
| 6 | >= 1.14 | >= 1.3 | 모든 버전 |
| 7 | >= 1.14 | >= 1.3 | 모든 버전 |


## 64-BIT ARM V8 지원

Agent 6 및 7은 다음과 같은 64-BIT ARM V8 플랫폼을 지원합니다:

| 플랫폼    | 지원되는 버전 | 64-BIT ARM V8 지원 | 64-BIT X86 지원 |
|-------------|--------------------|-----------------------|--------------------|
| [Docker][5] | >= 1.14     | <i class='icon-check-bold'> | <i class='icon-check-bold'> |
| [Kubernetes][6] | >= 1.3   | <i class='icon-check-bold'> | <i class='icon-check-bold'> |


[5]: /ko/agent/docker/
[6]: /ko/agent/basic_agent_usage/kubernetes/
[7]: /ko/agent/basic_agent_usage/windows/

{{% /tab %}}

{{% tab "Unix" %}}

Agent 6 및 7은 다음 [AIX][1] 버전을 지원합니다:

- 6.1 TL9 SP6
- 7.1 TL5 SP3
- 7.2 TL3 SP0


[1]: /ko/agent/basic_agent_usage/aix/
{{% /tab %}}
{{< /tabs >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/agent/basic_agent_usage/source/