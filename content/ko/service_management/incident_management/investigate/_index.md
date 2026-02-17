---
aliases:
- /ko/monitors/incident_management/incident_details
- /ko/service_management/incident_management/incident_details
description: 인시던트의 설정 및 작업을 관리합니다
further_reading:
- link: /service_management/incident_management/declare
  tag: 설명서
  text: 인시던트 선언
- link: /service_management/incident_management/describe
  tag: 설명서
  text: 인시던트 설명
title: 인시던트 조사
---

## 개요

{{< img src="/service_management/incidents/investigate/incidents_overview_tab.png" alt="Overview 탭 - 인시던트 상세 뷰 예시" style="width:100%;" >}}

효과적인 인시던트 조사는 인시던트를 식별하고 분류하는 것부터 시작하며, 포괄적인 데이터를 수집하여 상세한 인시던트 타임라인을 구축합니다. Datadog Incident Details 페이지는 실시간 모니터링, 조사, 문제 해결, 협업, 분석을 한 곳에서 할 수 있는 중앙화된 플랫폼을 제공하여 인시던트 조사에 도움을 줍니다. 대응 담당자는 동적 대시보드와 대화형 타임라인을 통해 인시던트 데이터와 패턴을 시각화할 수 있습니다. 인시던트 세부 정보를 활용하면 다음과 같은 작업을 할 수 있습니다.

- 원인을 파악하고 영향을 효율적으로 평가할 수 있도록 실시간으로 데이터를 집계하고 표시합니다.
- 팀 협업 기능을 활용하여 소통하고, 진행 상황을 추적하며, 문제 해결 작업을 조율할 수 있습니다.
- 다양한 뷰를 전환하며 영향을 받은 서비스와 종속성을 탐색하여 철저하게 문제를 조사하고 해결할 수 있습니다.

## 인시던트 상세 정보

Datadog의 모든 인시던트에는 속성 필드, 신호, 작업, 문서, 대응자, 알림을 관리할 수 있는 자체 Incident Details 페이지가 있습니다. Incident Details 페이지에는 주요 작업에 빠르게 액세스할 수 있는 글로벌 헤더가 포함되어 있습니다. 페이지의 나머지 부분은 관련 인시던트 데이터를 그룹화하는 탭 섹션으로 나뉩니다.

### 글로벌 헤더

글로벌 헤더로 [Status and Severity][1] 선택기와 [Incident Integrations][2] 링크에 액세스할 수 있습니다. 모든 새 인시던트에 Slack 및 Microsoft Teams 자동 링크를 구성하는 방법은 [인시던트 설정][3] 문서를 참고하세요.

인시던트가 해결되면 헤더에 [사후 분석 템플릿][4]을 사용하여 사후 분석 Notebook을 생성하는 옵션이 나타납니다. 앱에서 사후 분석 템플릿을 구성하려면 [Incident Settings][5] 페이지로 이동하여 사후 분석의 구조와 내용을 정의하세요.

### Overview 탭

Overview 탭은 인시던트의 속성을 확인하고 고객에게 미치는 영향을 정의하는 기본 페이지 역할을 합니다. 기본적으로 Root Cause, Services, Teams, Detection Method, Summary 등의 속성이 포함되어 있습니다. 이러한 속성은 What Happened, Why it Happened, Attributes 섹션으로 분류됩니다.

Datadog 메트릭 태그의 `<KEY>:<VALUE>` 쌍을 사용하여 더 많은 속성 필드를 추가하거나 [Incident Settings][6]을 통해 사용자 지정 필드를 생성하세요. 이러한 속성에 값을 할당하여 Incident Homepage 및 Incident Management Analytics에서 검색 및 쿼리를 개선할 수 있습니다. 중요 정보의 우선순위를 지정하려면 속성 필드를 재정렬하고 다양한 제목 아래로 이동할 수 있습니다.

고객에게 영향을 미치는 인시던트는 **Impacts** 섹션에 영향 세부 내용을 추가하여 명시합니다.

{{< img src="/service_management/incidents/investigate/incident_details_impacts.png" alt="이미지 설명" style="width:90%;" >}}

1. **Add**를 클릭합니다.
2. 영향이 시작된 날짜와 시간을 지정합니다.
3. 영향이 계속되는 경우 종료 날짜와 시간을 비워 두고 종료된 경우 날짜 및 시간을 지정합니다.
4. `Scope of impact`에는 고객에게 미치는 영향의 특성을 입력합니다.
5. **Save**을 클릭합니다.

Overview 탭은 속성 필드를 보관하는 것 외에도 다음과 같은 간략한 요약 모듈을 제공합니다.

| 요약 모듈 | 설명 |
|-------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| 요약된 타임라인(Condensed Timeline) | 인시던트 상태가 변경된 타임스탬프와 영향이 시작되고 종료된 시간을 표시합니다. 이를 통해 인시던트의 수명 주기를 간략하게 파악할 수 있습니다. |
| 최신 알림(Latest Notifications)| [Notification 탭][7]에서 전체 알림 목록에 빠르게 액세스할 수 있으며, 인시던트와 관련해 가장 최근에 전송된 알림을 표시합니다.|
| 보류 중인 작업(Pending Tasks) | 가장 최근의 미완료 작업을 표시하며,  Remediation 탭에서 전체 작업 목록에 빠르게 액세스할 수 있습니다. |
| 대응자(Responders) | 현재 인시던트 커맨더와 인시던트에 할당된 다른 대응자의 아바타를 표시합니다. |
| 최근 타임라인 항목(Recent Timeline Entries) | 인시던트 타임라인에서 가장 최근 항목 5개를 표시하며, Timeline 탭 전체를 빠르게 볼 수 있습니다. 자세한 내용은 [타임라인][8] 문서를 참고하세요. |

## 추가 조사 도구

인시던트를 등록한 후, 대응자는 Incident Details 페이지를 활용하여 사용 가능한 정보를 적용함으로써 인시던트를 설명하고 분석할 수 있습니다.

{{< whatsnext desc="다른 조사 도구에 관해 자세히 알아보려면 다음 페이지를 참고하세요:">}}
    {{< nextlink href="/service_management/incident_management/investigate/timeline" >}}<strong>타임라인</strong>: 인시던트 발생 전후의 이벤트 순서를 추적합니다. 시각화 자료와 시간 기반 데이터를 활용하여 이벤트의 시간적 순서와 영향을 이해할 수 있습니다.
{{< /nextlink >}}
{{< /whatsnext >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/service_management/incident_management/describe/#incident-details
[2]: /ko/service_management/incident_management/#integrations
[3]: /ko/service_management/incident_management/incident_settings#integrations
[4]: /ko/service_management/incident_management/incident_settings/templates#postmortems
[5]: https://app.datadoghq.com/incidents/settings#Postmortems
[6]: /ko/service_management/incident_management/incident_settings/property_fields
[7]: /ko/service_management/incident_management/notification/
[8]: /ko/service_management/incident_management/investigate/timeline