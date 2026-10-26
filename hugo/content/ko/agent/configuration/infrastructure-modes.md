---
algolia:
  tags:
  - infrastructure modes
description: Datadog Agent가 호스트에서 수행하는 인프라 모니터링의 수준을 제어하도록 Agent 동작을 변경하세요.
further_reading:
- link: /agent/configuration/agent-configuration-files/
  tag: 가이드
  text: Agent 구성 파일
- link: /agent/guide/upgrade/
  tag: 가이드
  text: Datadog Agent 업그레이드하기
private: true
title: 인프라 모드
---
## 개요 {#overview}

인프라 모드는 Datadog Agent가 호스트에서 활성화하는 인프라 모니터링 기능을 결정합니다. 이 모드를 사용하여 Agent의 동작을 호스트의 역할에 맞추세요. 전체 인프라 모니터링, 기본 시스템 리소스 메트릭, 인프라 모니터링 없음 또는 End User Device 모니터링 중에서 선택할 수 있습니다.

## 사용 가능한 모드 {#available-modes}

Datadog Agent는 네 가지 인프라 모드를 지원합니다. 체크 표시({{< X >}})는 해당 모드에서 기능을 사용할 수 있음을 나타냅니다.

| 기능 | [전체](#full) (기본값) | [기본](#basic) | [최종 사용자 장치](#end-user-device) | [없음](#none) |
|------------|-------------------------|-----------------|-------------------------------------|---------------|
| 시스템 리소스 메트릭 | {{< X >}} | {{< X >}} | {{< X >}} | |
| 인프라 통합 | {{< X >}} (모두) | {{< X >}} ([제한된 세트](#basic)) | {{< X >}} | |
| Container Monitoring | {{< X >}} | | | |
| Live Processes | {{< X >}} | | {{< X >}} | |
| 사용자 지정 검사 및 로그 전용 통합 | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| 사용자 지정 메트릭 | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| 인프라 대시보드에 표시 | {{< X >}} | {{< X >}} | | |

### 전체 {#full}

`full`
: **기본값**: 예<br>
**최소 Agent 버전**: 7.73.0<br>
**권장 대상**: 대부분의 사용 사례<br>
: Agent는 시스템 리소스 메트릭과 프로세스 데이터를 수집하고, 모든 인프라 통합을 실행하며, Container Monitoring 및 Live Processes를 지원합니다. `infrastructure_mode` 값을 설정하지 않은 경우, Agent는 `full` 모드로 실행됩니다.

### 기본 {#basic}

`basic`
: **최소 Datadog Agent 버전**: 7.73.0 (Linux, macOS), 7.76.2 (Windows)<br>
**권장 대상**: 시스템 리소스 메트릭만 필요한 VM 및 물리적 서버<br>
: Agent는 시스템 리소스 메트릭(CPU, 메모리, 디스크, 네트워크)과 제한된 프로세스 및 서비스 데이터를 수집합니다. 다음 통합만 실행됩니다.
  - [Cisco ACI][25] (7.78+)
  - [Cisco SD-WAN][26] (7.78+)
  - [Directory][3] (7.80+)
  - [Disk][2]
  - [Network][4]
  - [NTP][5]
  - [Processes][6]
  - [SNMP][28] (7.78+)
  - [System Check][1]
  - [Systemd][7]
  - [Versa][27] (7.78+)
  - [Windows Certificate Store][8] (7.80+)
  - [Windows Crash Detection][9]
  - [Windows Event Log][17]
  - [Windows Kernel Memory][10]
  - [Windows Performance Counters][11] (7.80+)
  - [Windows Registry][12] (7.80+)
  - [Windows Services][13]
  - [WMI Check][14] (7.80+)
  - [사용자 지정 검사][15] (접두사: `custom_`)

### 최종 사용자 장치 {#end-user-device}

<div class="alert alert-info">최종 사용자 장치 모드는 미리 보기로 제공되고 있습니다. 구성 단계 및 액세스 요청에 대한 내용은 <a href="/infrastructure/end_user_device_monitoring/">End User Device Monitoring</a>을 참조하세요.</div>

`end_user_device`
: **최소 Datadog Agent 버전**: 7.76.2<br>
**권장 대상**: 직원 데스크톱, 노트북 및 워크스테이션<br>
: Agent에는 Container Monitoring을 제외한 모든 [전체 모드](#full) 기능과 다음 기능이 포함됩니다.
  - 장치 성능 모니터링
  - 로그 수집
  - Wi-Fi Monitoring
  - Windows Crash Detection
  - Network Path Monitoring

: 전체 설명은 [주요 기능][18]을 참조하세요.

### 없음 {#none}

`none`
: **최소 Datadog Agent 버전**: 7.77.0<br>
**권장 대상**: [Log Management][19], [APM][20] 또는 [Error Tracking][21] 전용으로 구성된 호스트<br>
: Agent는 인프라 메트릭을 수집하거나 인프라 통합을 실행하지 않습니다. 사용자 지정 메트릭, `custom_` 접두사가 붙은 [사용자 지정 검사][15], [journald][16] 또는 [Windows Event Log][17]와 같은 로그 전용 통합은 계속 사용할 수 있습니다.
: `none` 모드의 호스트는 Agent가 Datadog으로 메타데이터를 계속 전송하기 때문에 [Fleet Automation][22]의 {{< ui >}}View Agents{{< /ui >}} 탭에 표시됩니다. 그러나 이러한 호스트는 인프라 대시보드나 인프라 메트릭에 의존하는 쿼리에는 표시되지 않습니다.

## Agent 인프라 모드 구성 {#configure-agent-infrastructure-mode}

### 새 호스트 {#new-hosts}

Agent를 처음 설치할 때 인프라 모드를 구성하려면 설치 스크립트가 호출되기 전에 `DD_INFRASTRUCTURE_MODE=<MODE>` 환경 변수를 설정하세요.

{{< tabs >}}
{{% tab "Linux" %}}
다음 명령에서 `<API_KEY>`를 조직의 [Datadog API 키](https://app.datadoghq.com/organization-settings/api-keys)로, `<DD_SITE>`를 **로 바꾸고{{< region-param key="dd_site" >}}**, `<MODE>`를 `full`, `basic`, `end_user_device` 또는 `none`으로 바꾸세요.

```shell
DD_API_KEY="<API_KEY>" \
DD_SITE="<DD_SITE>" \
DD_INFRASTRUCTURE_MODE="<MODE>" \
bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```
{{% /tab %}}
{{% tab "Windows" %}}
다음 명령에서 `<API_KEY>`를 조직의 [Datadog API 키](https://app.datadoghq.com/organization-settings/api-keys)로, `<DD_SITE>`를 **로 바꾸고{{< region-param key="dd_site" >}}**, `<MODE>`를 `full`, `basic`, `end_user_device` 또는 `none`으로 바꾸세요.

```powershell
$p = Start-Process -Wait -PassThru msiexec -ArgumentList '/qn /i "https://windows-agent.datadoghq.com/datadog-agent-7-latest.amd64.msi" /log C:\Windows\SystemTemp\install-datadog.log APIKEY="<API_KEY>" SITE="<DD_SITE>" DD_INFRASTRUCTRURE_MODE="<MODE>"'
if ($p.ExitCode -ne 0) {
  Write-Host "msiexec failed with exit code $($p.ExitCode) please check the logs at C:\Windows\SystemTemp\install-datadog.log" -ForegroundColor Red
}
```
{{% /tab %}}
{{< /tabs >}}

### 기존 호스트 {#existing-hosts}

기존 호스트의 인프라 모드를 설정하려면 다음 단계를 따르세요.

1. [Agent configuration file][23]을 열고 루트 수준에 `infrastructure_mode`를 추가합니다. `<MODE>`를 `full`, `basic`, `end_user_device` 또는 `none`으로 바꿉니다.

    {{< code-block lang="yaml" filename="datadog.yaml" disable_copy="true"
      collapsible="true" >}}
infrastructure_mode: <MODE>
    {{< /code-block >}}

2. [Datadog Agent 재시작][24].

## 인프라 모드 검증 {#verify-infrastructure-mode}

호스트에 설정된 인프라 모드를 검증하려면 다음 단계를 따르세요.

1. [Fleet Automation][22]으로 이동하여 {{< ui >}}View Agents{{< /ui >}} 탭을 클릭합니다.
1. {{< ui >}}Group by{{< /ui >}} 드롭다운에서 {{< ui >}}Infrastructure Mode{{< /ui >}}를 선택합니다.
1. 모드 그룹을 클릭하여 확장하고 포함된 호스트를 조회합니다.
1. 필요시 검색 창을 사용하여 특정 호스트 이름으로 필터링합니다(예: `hostname:worker1`).

{{< img src="agent/configuration/fa_group_by_infra_mode-1.png" alt="Group by 드롭다운에서 Infrastructure Mode가 선택된 Fleet Automation의 View Agents 페이지. 311개의 호스트가 포함된 Full 그룹이 펼쳐져 있으며 hostname, Agent, OTEL, integrations, services 및 remote configuration status 열이 표시됩니다." style="width:90%" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/system/
[2]: /ko/integrations/disk/
[3]: /ko/integrations/directory/
[4]: /ko/integrations/network/
[5]: /ko/integrations/ntp/
[6]: /ko/integrations/process/
[7]: /ko/integrations/systemd/
[8]: /ko/integrations/windows-certificate/
[9]: /ko/integrations/wincrashdetect/
[10]: /ko/integrations/winkmem/
[11]: /ko/integrations/windows-performance-counters/
[12]: /ko/integrations/windows-registry/
[13]: /ko/integrations/windows-service/
[14]: /ko/integrations/wmi/
[15]: /ko/extend/custom_checks/
[16]: /ko/integrations/journald/
[17]: /ko/integrations/event-viewer/
[18]: /ko/infrastructure/end_user_device_monitoring/#key-capabilities
[19]: /ko/logs/
[20]: /ko/tracing/
[21]: /ko/error_tracking/
[22]: https://app.datadoghq.com/fleet
[23]: /ko/agent/configuration/agent-configuration-files/
[24]: /ko/agent/configuration/agent-commands/#restart-the-agent
[25]: /ko/integrations/cisco-aci/
[26]: /ko/integrations/cisco-sdwan/
[27]: /ko/integrations/versa/
[28]: /ko/integrations/snmp/