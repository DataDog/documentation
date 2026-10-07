---
description: 상태 페이지에서 빠른 액션, 이벤트 세부 정보 및 문제 해결 도구를 포함한 모니터링 이벤트를 조회 및 관리하세요.
further_reading:
- link: events/
  tag: 설명서
  text: Event Management
title: 상태 이벤트
---
<div class="alert alert-info">상태 이벤트는 <a href="/monitors/status/status_page">임시 모니터링 상태 페이지</a>의 일부입니다. 레거시 상태 페이지를 사용하는 경우 <a href="/monitors/status/status_legacy">상태 페이지(레거시)</a> 설명서를 참조하세요.</div>

## 개요 {#overview}

{{< img src="/monitors/status/status_page_event_details.png" alt="이벤트 세부 정보를 표시하는 모니터링 상태 페이지" style="width:100%;" >}}

모니터링에 의해 생성된 모든 이벤트는 모니터링의 상태 페이지에 나타나며 그룹 이름, 이벤트 유형 및 타임스탬프를 보여줍니다. 이벤트 타임라인에는 가동 중지 및 Audit Trail 이벤트도 포함됩니다.

각 이벤트에 대해 빠른 작업에 액세스하고 Dashboards 및 로그와 같은 관련 자산을 조회할 수 있습니다.

## 이벤트 세부 정보 섹션 {#event-details-section}

연관된 태그 및 작업을 포함하여 더 많은 정보를 얻기 위해 각 개별 이벤트를 탐색하려면 다음을 수행하세요.

1. 모니터링 상태 페이지에서 {{< ui >}}Event timeline{{< /ui >}}으로 스크롤합니다.
2. 타임라인에서 이벤트를 클릭하여 이벤트 세부 정보를 조회합니다.

이벤트 세부 정보를 사용하여 모니터링 경보를 이해하고 근본 원인을 파악합니다. 이 정보는 대응자 워크플로를 지원하며 진행 중인 상황에 대한 정보를 계속 파악할 수 있도록 돕습니다.

### 수정 작업 수행 {#take-action-to-remediate}

빠른 작업을 사용하면 상태 페이지를 떠나지 않고도 조치를 취할 수 있습니다. 컨텍스트가 자동으로 추가되므로 대응자의 시간을 절약할 수 있습니다.

| 작업 | 설명 |
| :---- | :---- |
| {{< ui >}}Mute{{< /ui >}}  | 모니터링 경보를 음소거하려면 [가동 중지][1]를 생성하세요. |
| {{< ui >}}Resolve{{< /ui >}} | 다음 평가까지 모니터링 상태를 `OK` 상태로 일시적으로 설정합니다. |
| {{< ui >}}Declare Incident{{< /ui >}} | [Incident Management][2]로 모니터링 경보를 에스컬레이션합니다. |
| {{< ui >}}Create Work Item{{< /ui >}} | Datadog을 떠나지 않고 이 경보 조사를 추적할 수 있도록 [작업 항목][3]을 생성하세요. |
| {{< ui >}}Run Workflow{{< /ui >}} | 사전 정의된 스니펫을 사용하여 [워크플로][4] 자동화를 실행하고 완화 작업을 수행하세요. |

### 해결 {#resolve}

상태 페이지 [헤더][5] 또는 이벤트 세부 정보 섹션에서 모니터링 경보를 해결할 수 있습니다. 이벤트 세부 정보 섹션에서 해결하면 선택한 이벤트와 관련된 그룹에만 영향을 미치지만, 헤더에서 해결하면 경보의 모든 그룹이 해결되고 모니터링이 `OK`(모든 그룹) 상태로 설정됩니다.

현재 데이터가 `ALERT` 상태에 해당하여 모니터링이 경보 작동 중인 경우, `resolve`를 사용하면 상태가 `ALERT`에서 `OK` 상태로 일시적으로 전환되었다가 다시 `ALERT` 상태로 돌아갑니다. 따라서 `resolve`는 경보를 확인하거나 Datadog에 이를 무시하도록 지시하기 위한 것이 아닙니다.

데이터가 간헐적으로 보고될 때는 모니터링을 수동으로 해결하는 것이 유용합니다. 예를 들어, 경보가 트리거된 후 모니터링이 데이터 수신을 중단하여 경보 조건을 평가하지 못하고 `OK` 상태로 복구되지 않을 수 있습니다. 이러한 경우 `resolve` 기능 또는 {{< ui >}}Automatically resolve monitor after X hours{{< /ui >}}는 모니터링을 `OK` 상태로 되돌립니다.

**일반적인 사용 사례**: 오류가 없는 경우 생성되지 않는 오류 메트릭 기반 모니터링(`aws.elb.httpcode_elb_5xx` 또는 코드에서 _오류가 있는 경우에만_ 오류를 보고하는 DogStatsD 카운터)

## 이벤트 문제 해결 섹션 {#event-troubleshooting-section}

{{< img src="/monitors/status/events/event_troubleshooting.png" alt="예시 종속성 맵을 통한 이벤트 문제 해결" style="width:100%;" >}}

각 이벤트에 대해 문제 해결 정보를 조회하여 대응자가 경보의 컨텍스트를 신속하게 이해할 수 있도록 하세요.

| 문제 해결 구성 요소     | 설명    |
| ---  | ----------- |
| {{< ui >}}Dependency Map{{< /ui >}} | 서비스 태그가 모니터링 태그나 그룹 내에 있을 경우, 종속성의 상태를 보여주는 종속성 맵에 액세스할 수 있습니다. |
| {{< ui >}}Change Tracking{{< /ui >}} | 서비스 태그가 모니터링 태그나 그룹 내에 있을 경우, 서비스 및 해당 종속성에 대한 관련 변경 사항 목록에 액세스할 수 있습니다. 지원되는 특정 변경 유형 및 설정 요구 사항에 대한 자세한 내용은 [변경 추적][6] 설명서를 참조하세요. |


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/monitors/downtimes/?tab=bymonitorname
[2]: /ko/incident_response/incident_management/
[3]: /ko/incident_response/work_management/
[4]: /ko/actions/workflows/trigger/#trigger-a-workflow-from-a-monitor
[5]: /ko/monitors/status/status_page/#header
[6]: /ko/change_tracking